import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { verifyWebhook } from '@/lib/booking/razorpay';
import { markPaid, handleLatePayment } from '@/lib/booking/service';

/**
 * Razorpay webhook (Dashboard → Webhooks → URL https://surwahi.com/api/webhooks/razorpay,
 * event "payment_link.paid", secret = RAZORPAY_WEBHOOK_SECRET).
 */
export async function POST(request: NextRequest) {
  const raw = await request.text();
  if (!verifyWebhook(raw, request.headers.get('x-razorpay-signature'))) {
    return NextResponse.json({ ok: false }, { status: 401 });
  }
  const event = JSON.parse(raw) as {
    event: string;
    payload?: { payment_link?: { entity?: { id: string; reference_id?: string; amount_paid?: number } } };
  };
  if (event.event !== 'payment_link.paid') return NextResponse.json({ ok: true, ignored: event.event });

  const link = event.payload?.payment_link?.entity;
  if (!link) return NextResponse.json({ ok: true });
  const r = await prisma.reservation.findFirst({ where: { OR: [{ paymentLinkId: link.id }, { code: link.reference_id ?? '' }] } });
  if (!r) return NextResponse.json({ ok: true, unknown: link.id });
  // Webhooks retry: if this exact link was already recorded as paid, do nothing
  const already = await prisma.auditLog.findFirst({ where: { entity: 'reservation', entityId: r.id, action: 'razorpay_paid', data: { path: ['linkId'], equals: link.id } } });
  if (already) return NextResponse.json({ ok: true, duplicate: true });

  const amount = Math.round((link.amount_paid ?? r.total * 100) / 100);
  await prisma.auditLog.create({ data: { action: 'razorpay_paid', entity: 'reservation', entityId: r.id, data: { linkId: link.id, amount } } });
  if (r.status === 'CANCELLED' || r.status === 'DECLINED') {
    // Paid after the hold was released (or after staff cancelled): never silently lose a payment
    const autoReleased = await prisma.auditLog.findFirst({ where: { entity: 'reservation', entityId: r.id, action: 'auto_release_hold' } });
    const outcome = await handleLatePayment(r.id, amount, { allowReinstate: !!autoReleased });
    return NextResponse.json({ ok: true, late: outcome });
  }
  await markPaid(r.id, amount);
  return NextResponse.json({ ok: true });
}
