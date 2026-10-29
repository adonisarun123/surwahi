import Link from 'next/link';
import { prisma } from '@/lib/prisma';
import { requireUser } from '@/lib/auth/session';
import type { Prisma } from '@/generated/prisma/client';
import { StatusBadge, SOURCE_LABELS } from '@/components/admin/status';
import { formatDateIn, todayIst } from '@/lib/booking/dates';
import { cn } from '@/lib/utils';

const TABS = {
  requests: { label: 'New requests', where: { status: 'REQUESTED' } },
  awaiting: { label: 'Awaiting payment', where: { status: 'AWAITING_PAYMENT' } },
  upcoming: { label: 'Upcoming', where: { status: 'CONFIRMED' } },
  past: { label: 'Past', where: { status: { in: ['COMPLETED', 'NO_SHOW'] } } },
  closed: { label: 'Declined / cancelled', where: { status: { in: ['DECLINED', 'CANCELLED'] } } },
  all: { label: 'All', where: {} },
} satisfies Record<string, { label: string; where: Prisma.ReservationWhereInput }>;

export default async function BookingsPage({ searchParams }: { searchParams: Promise<{ tab?: string; q?: string }> }) {
  await requireUser('bookings');
  const { tab: tabParam, q } = await searchParams;
  const tab = (tabParam && tabParam in TABS ? tabParam : 'requests') as keyof typeof TABS;
  const search: Prisma.ReservationWhereInput = q
    ? { OR: [{ code: { contains: q, mode: 'insensitive' } }, { guestName: { contains: q, mode: 'insensitive' } }, { guestEmail: { contains: q, mode: 'insensitive' } }, { guestPhone: { contains: q } }] }
    : {};
  const upcomingOnly: Prisma.ReservationWhereInput = tab === 'upcoming' ? { checkOut: { gte: todayIst() } } : {};

  const [rows, counts] = await Promise.all([
    prisma.reservation.findMany({
      where: { ...TABS[tab].where, ...search, ...upcomingOnly },
      include: { accommodation: { select: { name: true } } },
      orderBy: tab === 'upcoming' ? { checkIn: 'asc' } : { createdAt: 'desc' },
      take: 200,
    }),
    prisma.reservation.groupBy({ by: ['status'], _count: true }),
  ]);
  const count = (s: string) => counts.find((c) => c.status === s)?._count ?? 0;

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h1 className="font-display text-3xl text-forest-900">Bookings</h1>
        <Link href="/admin/bookings/new" className="rounded-lg bg-forest-700 px-4 py-2 text-sm font-semibold text-white hover:bg-forest-900">+ Add booking</Link>
      </div>
      <div className="flex flex-wrap gap-2">
        {Object.entries(TABS).map(([key, t]) => (
          <Link key={key} href={`/admin/bookings?tab=${key}`} className={cn('rounded-full px-3 py-1 text-sm border', tab === key ? 'bg-forest-700 text-white border-forest-700' : 'bg-white border-mist-200')}>
            {t.label}{key === 'requests' && count('REQUESTED') > 0 ? ` (${count('REQUESTED')})` : key === 'awaiting' && count('AWAITING_PAYMENT') > 0 ? ` (${count('AWAITING_PAYMENT')})` : ''}
          </Link>
        ))}
      </div>
      <form className="flex gap-2">
        <input type="hidden" name="tab" value={tab} />
        <input name="q" defaultValue={q} placeholder="Search code, name, email, phone" className="flex-1 max-w-md rounded-lg border border-mist-200 px-3 py-2 text-sm" />
        <button className="rounded-lg border border-mist-200 bg-white px-3 py-2 text-sm">Search</button>
      </form>

      <div className="bg-white rounded-xl border border-mist-200 overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="text-left text-xs uppercase text-soil-700 bg-sand-50">
            <tr><th className="px-4 py-2">Guest</th><th className="px-4 py-2">Room</th><th className="px-4 py-2">Dates</th><th className="px-4 py-2">Guests</th><th className="px-4 py-2 text-right">Total</th><th className="px-4 py-2">Status</th></tr>
          </thead>
          <tbody className="divide-y divide-mist-200">
            {rows.length === 0 && <tr><td colSpan={6} className="px-4 py-8 text-center text-soil-700">Nothing here.</td></tr>}
            {rows.map((r) => (
              <tr key={r.id} className="hover:bg-sand-50">
                <td className="px-4 py-2"><Link href={`/admin/bookings/${r.id}`} className="font-medium text-forest-700 hover:underline">{r.guestName}</Link><div className="text-xs text-soil-700">{r.code} · {SOURCE_LABELS[r.source]}</div></td>
                <td className="px-4 py-2">{r.accommodation.name}</td>
                <td className="px-4 py-2 whitespace-nowrap">{formatDateIn(r.checkIn, { day: 'numeric', month: 'short' })} → {formatDateIn(r.checkOut, { day: 'numeric', month: 'short', year: 'numeric' })}</td>
                <td className="px-4 py-2">{r.adults + r.children}{r.exclusive ? ' (exclusive)' : ''}</td>
                <td className="px-4 py-2 text-right">₹{r.total.toLocaleString('en-IN')}</td>
                <td className="px-4 py-2"><StatusBadge status={r.status} /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
