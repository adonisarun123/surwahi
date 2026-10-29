import 'server-only';
import { transporter } from '@/lib/email';
import { escapeHtml as h } from '@/lib/spam-guard';
import type { Quote } from './pricing';
import { formatDateIn } from './dates';

const FROM = () => `"Surwahi Social Ecoestate" <${process.env.SMTP_USER}>`;
const SITE = () => process.env.NEXT_PUBLIC_SITE_URL || 'https://surwahi.com';
const inr = (n: number) => `₹${n.toLocaleString('en-IN')}`;

export interface MailReservation {
  code: string;
  guestName: string;
  guestEmail: string;
  guestPhone: string;
  roomName: string;
  checkIn: Date;
  checkOut: Date;
  adults: number;
  children: number;
  specialRequests?: string | null;
  quote: Pick<Quote, 'lines' | 'subtotal' | 'gst' | 'gstPercent' | 'total' | 'notes'>;
  paymentLinkUrl?: string | null;
}

function shell(title: string, body: string) {
  return `<!doctype html><html><body style="font-family:Arial,sans-serif;color:#222;line-height:1.55;background:#F7F3EE;padding:24px">
  <div style="max-width:600px;margin:0 auto;background:#fff;border-radius:10px;overflow:hidden">
    <div style="background:#1E5741;color:#fff;padding:20px 24px"><div style="font-size:20px">${h(title)}</div></div>
    <div style="padding:24px">${body}
      <p style="margin-top:28px;font-size:13px;color:#555">Surwahi Social Ecoestate · Village Surwahi, Balaghat, MP 481111<br>+91 77952 07779 · contact@surwahi.com</p>
    </div>
  </div></body></html>`;
}

function summary(r: MailReservation) {
  const rows = r.quote.lines.map((l) => `<tr><td style="padding:4px 0">${h(l.label)}</td><td align="right">${inr(l.amount)}</td></tr>`).join('');
  return `<table style="width:100%;border-collapse:collapse;font-size:14px;margin:12px 0">
    <tr><td style="padding:4px 0;color:#555">Booking reference</td><td align="right"><b>${h(r.code)}</b></td></tr>
    <tr><td style="padding:4px 0;color:#555">Stay</td><td align="right">${h(r.roomName)}</td></tr>
    <tr><td style="padding:4px 0;color:#555">Dates</td><td align="right">${formatDateIn(r.checkIn)} → ${formatDateIn(r.checkOut)}</td></tr>
    <tr><td style="padding:4px 0;color:#555">Guests</td><td align="right">${r.adults} adult${r.adults === 1 ? '' : 's'}${r.children ? `, ${r.children} child${r.children === 1 ? '' : 'ren'}` : ''}</td></tr>
    <tr><td colspan="2"><hr style="border:0;border-top:1px solid #eee"></td></tr>
    ${rows}
    <tr><td style="padding:4px 0">GST (${r.quote.gstPercent}%)</td><td align="right">${inr(r.quote.gst)}</td></tr>
    <tr><td style="padding:6px 0"><b>Total</b></td><td align="right"><b>${inr(r.quote.total)}</b></td></tr>
  </table>
  <p style="font-size:13px;color:#555">All meals included (APAI).${r.quote.notes.length ? ' ' + r.quote.notes.map(h).join(' ') : ''}</p>`;
}

async function send(to: string, subject: string, html: string, replyTo?: string) {
  try {
    await transporter.sendMail({ from: FROM(), to, subject, html, replyTo });
  } catch (e) {
    console.error('Booking email failed:', subject, e);
  }
}

export async function emailRequestReceived(r: MailReservation) {
  await send(r.guestEmail, `We received your booking request - ${r.code}`, shell('Booking request received', `
    <p>Dear ${h(r.guestName)},</p>
    <p>Thank you for choosing Surwahi. Your dates are <b>not confirmed yet</b> - our team checks every request personally and will reply within 24 hours with confirmation and a payment link.</p>
    ${summary(r)}
    <p>Questions? Just reply to this email or WhatsApp us on +91 77952 07779.</p>`));
}

export async function emailOwnerNewRequest(r: MailReservation, adminUrl: string) {
  const to = process.env.SALES_EMAIL;
  if (!to) return;
  await send(to, `New booking request ${r.code}: ${r.roomName}, ${formatDateIn(r.checkIn, { day: 'numeric', month: 'short' })}`, shell('New booking request', `
    <p><b>${h(r.guestName)}</b> · ${h(r.guestEmail)} · ${h(r.guestPhone)}</p>
    ${summary(r)}
    ${r.specialRequests ? `<p><b>Requests:</b> ${h(r.specialRequests)}</p>` : ''}
    <p><a href="${h(adminUrl)}" style="background:#1E5741;color:#fff;padding:10px 18px;border-radius:6px;text-decoration:none">Review in admin</a></p>`), r.guestEmail);
}

export async function emailPaymentLink(r: MailReservation) {
  await send(r.guestEmail, `Your Surwahi booking is approved - complete payment (${r.code})`, shell('Your dates are held for you', `
    <p>Dear ${h(r.guestName)},</p>
    <p>Good news - we can host you. Please complete payment to confirm your booking.</p>
    ${summary(r)}
    ${r.paymentLinkUrl ? `<p style="text-align:center;margin:24px 0"><a href="${h(r.paymentLinkUrl)}" style="background:#1E5741;color:#fff;padding:12px 22px;border-radius:6px;text-decoration:none;font-weight:bold">Pay ${inr(r.quote.total)} securely</a></p>` : ''}
    <p style="font-size:13px;color:#555">Please see our <a href="${SITE()}/cancellation">cancellation policy</a>.</p>`));
}

export async function emailConfirmed(r: MailReservation) {
  await send(r.guestEmail, `Booking confirmed - see you at Surwahi (${r.code})`, shell('Your booking is confirmed', `
    <p>Dear ${h(r.guestName)},</p>
    <p>Your stay is confirmed. We look forward to welcoming you to the forest.</p>
    ${summary(r)}
    <p>Getting here: <a href="${SITE()}/plan-your-visit/getting-here">directions and transfers</a> · <a href="${SITE()}/house-rules">house rules</a></p>`));
}

export async function emailDeclined(r: MailReservation, reason?: string) {
  await send(r.guestEmail, `About your Surwahi booking request (${r.code})`, shell("We're sorry", `
    <p>Dear ${h(r.guestName)},</p>
    <p>Unfortunately we can't accommodate your request for ${h(r.roomName)} from ${formatDateIn(r.checkIn)} to ${formatDateIn(r.checkOut)}.</p>
    ${reason ? `<p>${h(reason)}</p>` : ''}
    <p>We'd love to find you other dates - reply to this email or WhatsApp +91 77952 07779.</p>`));
}

export async function emailCancelled(r: MailReservation) {
  await send(r.guestEmail, `Booking cancelled (${r.code})`, shell('Booking cancelled', `
    <p>Dear ${h(r.guestName)},</p>
    <p>Your booking ${h(r.code)} for ${h(r.roomName)} (${formatDateIn(r.checkIn)} → ${formatDateIn(r.checkOut)}) has been cancelled. Any refund follows our <a href="${SITE()}/cancellation">cancellation policy</a>.</p>`));
}

export async function emailHoldReleased(r: MailReservation) {
  await send(r.guestEmail, `Your Surwahi booking request has expired (${r.code})`, shell('Your hold has expired', `
    <p>Dear ${h(r.guestName)},</p>
    <p>We held ${h(r.roomName)} for ${formatDateIn(r.checkIn)} → ${formatDateIn(r.checkOut)} but didn't receive payment in time, so the dates have been released.</p>
    <p>If you'd still like to come, reply to this email or WhatsApp +91 77952 07779 and we'll check availability again.</p>`));
}

export async function emailOwnerAlert(subject: string, lines: string[]) {
  const to = process.env.SALES_EMAIL;
  if (!to) return;
  await send(to, `[Surwahi admin] ${subject}`, shell(subject, lines.map((l) => `<p>${h(l)}</p>`).join('') + `<p><a href="${SITE()}/admin/bookings">Open bookings</a></p>`));
}
