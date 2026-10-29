import 'server-only';
import { revalidatePath } from 'next/cache';
import { prisma } from '@/lib/prisma';
import type { Reservation, Accommodation, ReservationSource } from '@/generated/prisma/client';
import { isAvailable, lockAccommodation } from './availability';
import { buildQuote, type Quote } from './pricing';
import { reservationCode } from './codes';
import { nightsBetween, todayIst } from './dates';
import { createPaymentLink, cancelPaymentLink, extendPaymentLink } from './razorpay';
import * as mail from './emails';

export class BookingError extends Error {}

/** Unpaid approved bookings hold dates this long (matches the Razorpay link validity). */
export const HOLD_HOURS = 72;
const holdUntil = (from = new Date()) => new Date(from.getTime() + HOLD_HOURS * 3600e3);

export interface StayRequest {
  accommodationId: string;
  checkIn: Date;
  checkOut: Date;
  adults: number;
  children: number;
  exclusive?: boolean;
  guestName: string;
  guestEmail: string;
  guestPhone: string;
  specialRequests?: string | null;
  source?: ReservationSource;
  createdById?: string | null;
  status?: 'REQUESTED' | 'CONFIRMED';
  internalNotes?: string | null;
}

export function toMail(r: Reservation & { accommodation: Accommodation }): mail.MailReservation {
  const q = r.priceBreakdown as unknown as Quote;
  return {
    code: r.code,
    guestName: r.guestName,
    guestEmail: r.guestEmail,
    guestPhone: r.guestPhone,
    roomName: r.accommodation.name,
    checkIn: r.checkIn,
    checkOut: r.checkOut,
    adults: r.adults,
    children: r.children,
    specialRequests: r.specialRequests,
    quote: { lines: q.lines, subtotal: r.subtotal, gst: r.gst, gstPercent: q.gstPercent, total: r.total, notes: q.notes ?? [] },
    paymentLinkUrl: r.paymentLinkUrl,
  };
}

function validateStay(acc: Accommodation, req: StayRequest, quote: Quote, allowPast = false) {
  const nights = nightsBetween(req.checkIn, req.checkOut);
  if (nights < 1) throw new BookingError('Check-out must be after check-in.');
  if (nights > 30) throw new BookingError('For stays longer than 30 nights, please contact us.');
  if (!allowPast && req.checkIn < todayIst()) throw new BookingError('Check-in date is in the past.');
  if (!acc.isActive) throw new BookingError('This room is not available for booking.');
  if (req.adults < 1) throw new BookingError('At least one adult is required.');
  if (req.adults + req.children > acc.maxOccupancy) throw new BookingError(`${acc.name} sleeps up to ${acc.maxOccupancy}.`);
  if (nights < quote.minNights) throw new BookingError(`Minimum stay for these dates is ${quote.minNights} nights.`);
}

/** Creates a reservation. Website requests start as REQUESTED; staff-entered bookings can be CONFIRMED directly. */
export async function createReservation(req: StayRequest, { allowPast = false } = {}) {
  const result = await prisma.$transaction(async (tx) => {
    await lockAccommodation(tx, req.accommodationId);
    const acc = await tx.accommodation.findUniqueOrThrow({ where: { id: req.accommodationId } });
    const rules = await tx.rateRule.findMany({ where: { accommodationId: acc.id, isActive: true, startDate: { lt: req.checkOut }, endDate: { gte: req.checkIn } } });
    const quote = buildQuote(acc, rules, req.checkIn, req.checkOut, req.adults, req.children, req.exclusive);
    validateStay(acc, req, quote, allowPast);

    const avail = await isAvailable(tx, acc, req.checkIn, req.checkOut, { adults: req.adults, children: req.children, exclusive: !!req.exclusive });
    if (!avail.ok) throw new BookingError(`Not available on ${avail.unavailableNights.slice(0, 3).join(', ')}${avail.unavailableNights.length > 3 ? '…' : ''}.`);

    return tx.reservation.create({
      data: {
        code: reservationCode(),
        accommodationId: acc.id,
        checkIn: req.checkIn,
        checkOut: req.checkOut,
        adults: req.adults,
        children: req.children,
        exclusive: !!req.exclusive,
        guestName: req.guestName,
        guestEmail: req.guestEmail,
        guestPhone: req.guestPhone,
        specialRequests: req.specialRequests || null,
        source: req.source ?? 'WEBSITE',
        status: req.status ?? 'REQUESTED',
        subtotal: quote.subtotal,
        gst: quote.gst,
        total: quote.total,
        priceBreakdown: JSON.parse(JSON.stringify(quote)),
        createdById: req.createdById ?? null,
        internalNotes: req.internalNotes ?? null,
      },
      include: { accommodation: true },
    });
  });
  revalidateCalendar();
  return result;
}

/** Staff approves a request: re-checks availability, holds dates, creates/attaches a payment link and emails the guest. */
export async function approveReservation(id: string, opts: { manualPaymentUrl?: string | null; markPaid?: boolean }) {
  const r = await prisma.$transaction(async (tx) => {
    const current = await tx.reservation.findUniqueOrThrow({ where: { id }, include: { accommodation: true } });
    if (!['REQUESTED', 'AWAITING_PAYMENT'].includes(current.status)) throw new BookingError(`Can't approve a ${current.status.toLowerCase()} booking.`);
    await lockAccommodation(tx, current.accommodationId);
    const avail = await isAvailable(tx, current.accommodation, current.checkIn, current.checkOut, current, current.id);
    if (!avail.ok) throw new BookingError(`Those dates are no longer free (${avail.unavailableNights.slice(0, 3).join(', ')}).`);
    const resend = current.status === 'AWAITING_PAYMENT';
    if (resend && current.paymentLinkId && !opts.markPaid) await cancelPaymentLink(current.paymentLinkId);
    return tx.reservation.update({
      where: { id },
      data: opts.markPaid
        ? { status: 'CONFIRMED', amountPaid: current.total, paidAt: new Date(), holdExpiresAt: null }
        : {
            status: 'AWAITING_PAYMENT',
            holdExpiresAt: holdUntil(),
            // a resend gets a fresh Razorpay link (the old one may be expired); manual links are kept
            ...(resend && current.paymentLinkId ? { paymentLinkId: null, paymentLinkUrl: opts.manualPaymentUrl || null } : { paymentLinkUrl: opts.manualPaymentUrl || current.paymentLinkUrl }),
          },
      include: { accommodation: true },
    });
  });

  let res = r;
  if (!opts.markPaid && !r.paymentLinkUrl) {
    const link = await createPaymentLink({
      code: r.code,
      amountInr: r.total,
      description: `${r.accommodation.name}, ${r.checkIn.toISOString().slice(0, 10)} to ${r.checkOut.toISOString().slice(0, 10)} (${r.code})`,
      name: r.guestName,
      email: r.guestEmail,
      phone: r.guestPhone,
    });
    if (link) res = await prisma.reservation.update({ where: { id }, data: { paymentLinkUrl: link.url, paymentLinkId: link.id }, include: { accommodation: true } });
  }

  if (opts.markPaid) await mail.emailConfirmed(toMail(res));
  else await mail.emailPaymentLink(toMail(res));
  revalidateCalendar();
  return res;
}

export async function markPaid(id: string, amount?: number) {
  const r = await prisma.reservation.update({
    where: { id },
    data: { status: 'CONFIRMED', paidAt: new Date(), holdExpiresAt: null, ...(amount != null ? { amountPaid: amount } : {}) },
    include: { accommodation: true },
  });
  if (amount == null) await prisma.reservation.update({ where: { id }, data: { amountPaid: r.total } });
  await mail.emailConfirmed(toMail(r));
  revalidateCalendar();
  return r;
}

export async function setStatus(id: string, status: 'DECLINED' | 'CANCELLED' | 'COMPLETED' | 'NO_SHOW', opts: { notify?: boolean; reason?: string } = {}) {
  const before = await prisma.reservation.findUniqueOrThrow({ where: { id } });
  if (before.paymentLinkId && before.status === 'AWAITING_PAYMENT') await cancelPaymentLink(before.paymentLinkId);
  const r = await prisma.reservation.update({ where: { id }, data: { status, holdExpiresAt: null }, include: { accommodation: true } });
  if (opts.notify && status === 'DECLINED') await mail.emailDeclined(toMail(r), opts.reason);
  if (opts.notify && status === 'CANCELLED') await mail.emailCancelled(toMail(r));
  revalidateCalendar();
  return r;
}

export function revalidateCalendar() {
  try { revalidatePath('/admin', 'layout'); } catch { /* outside a request */ }
}

/** Staff extend an unpaid hold (e.g. guest asked for more time). Also extends the Razorpay link. */
export async function extendHold(id: string, hours: number) {
  const r = await prisma.reservation.findUniqueOrThrow({ where: { id } });
  if (r.status !== 'AWAITING_PAYMENT') throw new BookingError('Only bookings awaiting payment have a hold.');
  const base = r.holdExpiresAt && r.holdExpiresAt > new Date() ? r.holdExpiresAt : new Date();
  const until = new Date(base.getTime() + hours * 3600e3);
  if (r.paymentLinkId) await extendPaymentLink(r.paymentLinkId, until);
  await prisma.reservation.update({ where: { id }, data: { holdExpiresAt: until } });
  revalidateCalendar();
  return until;
}

/** Releases unpaid holds past their expiry. Called by cron. */
export async function releaseExpiredHolds() {
  const expired = await prisma.reservation.findMany({
    where: { status: 'AWAITING_PAYMENT', holdExpiresAt: { lt: new Date() } },
    include: { accommodation: true },
  });
  for (const r of expired) {
    if (r.paymentLinkId) await cancelPaymentLink(r.paymentLinkId);
    const note = `[${new Date().toISOString().slice(0, 16).replace('T', ' ')} UTC] Hold released automatically: no payment within ${HOLD_HOURS}h.`;
    const updated = await prisma.reservation.update({
      where: { id: r.id },
      data: { status: 'CANCELLED', holdExpiresAt: null, internalNotes: [r.internalNotes, note].filter(Boolean).join('\n') },
      include: { accommodation: true },
    });
    await prisma.auditLog.create({ data: { action: 'auto_release_hold', entity: 'reservation', entityId: r.id } });
    await mail.emailHoldReleased(toMail(updated));
  }
  if (expired.length) {
    await mail.emailOwnerAlert(`${expired.length} unpaid hold(s) released`, expired.map((r) => `${r.code} · ${r.guestName} · ${r.accommodation.name} · ${r.checkIn.toISOString().slice(0, 10)}`));
    revalidateCalendar();
  }
  return expired.length;
}

/**
 * A payment arrived for a booking whose hold was already released.
 * Reinstate it if the dates are still free; otherwise record the payment and flag a refund.
 */
export async function handleLatePayment(id: string, amountInr: number, { allowReinstate = true } = {}) {
  const r = await prisma.reservation.findUniqueOrThrow({ where: { id }, include: { accommodation: true } });
  const avail = await isAvailable(prisma, r.accommodation, r.checkIn, r.checkOut, r, r.id);
  if (allowReinstate && avail.ok) {
    await prisma.$transaction(async (tx) => {
      await lockAccommodation(tx, r.accommodationId);
      await tx.reservation.update({ where: { id }, data: { status: 'AWAITING_PAYMENT' } });
    });
    await markPaid(id, amountInr);
    await prisma.auditLog.create({ data: { action: 'late_payment_reinstated', entity: 'reservation', entityId: id } });
    await mail.emailOwnerAlert(`Late payment reinstated ${r.code}`, [`${r.guestName} paid ₹${amountInr.toLocaleString('en-IN')} after the hold expired. Dates were still free, so the booking is confirmed.`]);
    return 'reinstated' as const;
  }
  const note = allowReinstate
    ? `PAID ₹${amountInr} AFTER HOLD RELEASE - dates no longer free. REFUND NEEDED.`
    : `PAID ₹${amountInr} AFTER BOOKING WAS CANCELLED BY STAFF. Refund or reinstate manually.`;
  await prisma.reservation.update({ where: { id }, data: { amountPaid: amountInr, paidAt: new Date(), internalNotes: [r.internalNotes, note].filter(Boolean).join('\n') } });
  await prisma.auditLog.create({ data: { action: 'late_payment_refund_needed', entity: 'reservation', entityId: id } });
  await mail.emailOwnerAlert(`REFUND NEEDED ${r.code}`, [`${r.guestName} (${r.guestEmail}, ${r.guestPhone}) paid ₹${amountInr.toLocaleString('en-IN')} after the hold on ${r.accommodation.name} was released, and the dates are now taken.`, 'Refund from the Razorpay dashboard and contact the guest.']);
  return 'refund_needed' as const;
}
