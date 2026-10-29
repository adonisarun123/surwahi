import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { verifyWebhook } from '@/lib/booking/razorpay';
import { markPaid } from '@/lib/booking/service';

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
  if (r.status === 'CONFIRMED' && r.amountPaid > 0) return NextResponse.json({ ok: true, duplicate: true }); // webhooks retry

  await markPaid(r.id, Math.round((link.amount_paid ?? r.total * 100) / 100));
  await prisma.auditLog.create({ data: { action: 'razorpay_paid', entity: 'reservation', entityId: r.id, data: { linkId: link.id } } });
  return NextResponse.json({ ok: true });
}
