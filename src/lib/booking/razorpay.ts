import 'server-only';
import { createHmac, timingSafeEqual } from 'node:crypto';

/** Razorpay Payment Links. Disabled (returns null) until RAZORPAY_KEY_ID / RAZORPAY_KEY_SECRET are set. */
export function razorpayEnabled() {
  return Boolean(process.env.RAZORPAY_KEY_ID && process.env.RAZORPAY_KEY_SECRET);
}

export async function createPaymentLink(opts: {
  code: string;
  amountInr: number;
  description: string;
  name: string;
  email: string;
  phone: string;
  expireHours?: number;
}): Promise<{ id: string; url: string } | null> {
  if (!razorpayEnabled()) return null;
  const auth = Buffer.from(`${process.env.RAZORPAY_KEY_ID}:${process.env.RAZORPAY_KEY_SECRET}`).toString('base64');
  const res = await fetch('https://api.razorpay.com/v1/payment_links', {
    method: 'POST',
    headers: { Authorization: `Basic ${auth}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      amount: Math.round(opts.amountInr * 100),
      currency: 'INR',
      accept_partial: false,
      reference_id: opts.code,
      description: opts.description.slice(0, 2048),
      customer: { name: opts.name, email: opts.email, contact: opts.phone },
      notify: { sms: false, email: false }, // we send our own email
      reminder_enable: true,
      expire_by: Math.floor(Date.now() / 1000) + (opts.expireHours ?? 72) * 3600,
      notes: { reservation: opts.code },
    }),
  });
  if (!res.ok) throw new Error(`Razorpay ${res.status}: ${(await res.text()).slice(0, 300)}`);
  const json = (await res.json()) as { id: string; short_url: string };
  return { id: json.id, url: json.short_url };
}

export function verifyWebhook(rawBody: string, signature: string | null): boolean {
  const secret = process.env.RAZORPAY_WEBHOOK_SECRET;
  if (!secret || !signature) return false;
  const expected = createHmac('sha256', secret).update(rawBody).digest('hex');
  return expected.length === signature.length && timingSafeEqual(Buffer.from(expected), Buffer.from(signature));
}
