import Link from 'next/link';
import { notFound } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import { requireUser } from '@/lib/auth/session';
import { Card } from '@/components/admin/ui';
import { StatusBadge, SOURCE_LABELS } from '@/components/admin/status';
import { formatDateIn, nightsBetween, todayIst } from '@/lib/booking/dates';
import { razorpayEnabled } from '@/lib/booking/razorpay';
import type { Quote } from '@/lib/booking/pricing';
import { ApproveForm, PaymentForm, StatusForm, NotesForm } from './BookingActions';

const inr = (n: number) => `₹${n.toLocaleString('en-IN')}`;

export default async function BookingDetail({ params }: { params: Promise<{ id: string }> }) {
  await requireUser('bookings');
  const { id } = await params;
  const r = await prisma.reservation.findUnique({ where: { id }, include: { accommodation: true } }).catch(() => null);
  if (!r) notFound();
  const q = r.priceBreakdown as unknown as Quote;
  const history = await prisma.auditLog.findMany({ where: { entity: 'reservation', entityId: id }, orderBy: { createdAt: 'desc' }, include: { user: { select: { name: true } } } });
  const past = r.checkOut <= todayIst();
  const nights = nightsBetween(r.checkIn, r.checkOut);

  return (
    <div className="space-y-6">
      <div>
        <Link href="/admin/bookings" className="text-sm text-soil-700 hover:underline">← Bookings</Link>
        <div className="flex flex-wrap items-center gap-3">
          <h1 className="font-display text-3xl text-forest-900">{r.guestName}</h1>
          <StatusBadge status={r.status} />
        </div>
        <p className="text-sm text-soil-700">{r.code} · {SOURCE_LABELS[r.source]} · received {r.createdAt.toLocaleString('en-IN', { timeZone: 'Asia/Kolkata', dateStyle: 'medium', timeStyle: 'short' })}</p>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Card title="Stay">
            <dl className="grid sm:grid-cols-2 gap-x-6 gap-y-3 text-sm">
              <div><dt className="text-soil-700">Room</dt><dd className="font-medium">{r.accommodation.name}{r.exclusive && ' (exclusive use)'}</dd></div>
              <div><dt className="text-soil-700">Dates</dt><dd className="font-medium">{formatDateIn(r.checkIn)} → {formatDateIn(r.checkOut)} ({nights} night{nights === 1 ? '' : 's'})</dd></div>
              <div><dt className="text-soil-700">Guests</dt><dd>{r.adults} adult{r.adults === 1 ? '' : 's'}{r.children ? `, ${r.children} child${r.children === 1 ? '' : 'ren'}` : ''}</dd></div>
              <div><dt className="text-soil-700">Contact</dt><dd><a className="text-forest-700 hover:underline" href={`mailto:${r.guestEmail}`}>{r.guestEmail}</a><br />
                <a className="text-forest-700 hover:underline" href={`tel:${r.guestPhone}`}>{r.guestPhone}</a> · <a className="text-forest-700 hover:underline" href={`https://wa.me/${r.guestPhone.replace(/\D/g, '').replace(/^(\d{10})$/, '91$1')}`} target="_blank" rel="noreferrer">WhatsApp</a></dd></div>
            </dl>
            {r.specialRequests && <p className="mt-4 text-sm bg-sand-50 rounded-lg p-3"><b>Guest note:</b> {r.specialRequests}</p>}
          </Card>

          <Card title="Price">
            <table className="w-full text-sm">
              <tbody>
                {q.lines.map((l) => <tr key={l.label}><td className="py-1 text-soil-700">{l.label}</td><td className="py-1 text-right">{inr(l.amount)}</td></tr>)}
                <tr><td className="py-1 text-soil-700">GST ({q.gstPercent}%)</td><td className="py-1 text-right">{inr(r.gst)}</td></tr>
                <tr className="font-bold"><td className="py-2">Total</td><td className="py-2 text-right">{inr(r.total)}</td></tr>
                <tr><td className="py-1 text-soil-700">Paid</td><td className="py-1 text-right">{inr(r.amountPaid)}{r.paidAt && <span className="text-xs text-soil-700"> on {r.paidAt.toLocaleDateString('en-IN')}</span>}</td></tr>
              </tbody>
            </table>
            {q.notes?.length > 0 && <p className="text-xs text-soil-700 mt-2">{q.notes.join(' ')}</p>}
            {r.paymentLinkUrl && <p className="text-sm mt-3">Payment link: <a href={r.paymentLinkUrl} target="_blank" rel="noreferrer" className="text-forest-700 underline break-all">{r.paymentLinkUrl}</a></p>}
          </Card>

          <Card title="Internal notes"><NotesForm id={r.id} notes={r.internalNotes ?? ''} /></Card>
        </div>

        <div className="space-y-6">
          {r.status === 'REQUESTED' && (
            <Card title="Approve"><ApproveForm id={r.id} razorpay={razorpayEnabled()} total={r.total} /></Card>
          )}
          {r.status === 'AWAITING_PAYMENT' && (
            <>
              <Card title="Payment received?"><PaymentForm id={r.id} total={r.total} /></Card>
              <Card title="Resend payment link"><ApproveForm id={r.id} razorpay={razorpayEnabled()} total={r.total} resend /></Card>
            </>
          )}
          {['REQUESTED', 'AWAITING_PAYMENT', 'CONFIRMED'].includes(r.status) && (
            <Card title="Other actions"><StatusForm id={r.id} status={r.status} past={past} /></Card>
          )}
          {history.length > 0 && (
            <Card title="History">
              <ul className="space-y-1 text-xs text-soil-700">
                {history.map((h) => <li key={h.id}>{h.createdAt.toLocaleString('en-IN', { timeZone: 'Asia/Kolkata', dateStyle: 'short', timeStyle: 'short' })} · {h.user?.name ?? 'System'} · {h.action.replace(/_/g, ' ')}</li>)}
              </ul>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
