import Link from 'next/link';
import { prisma } from '@/lib/prisma';
import { requireUser } from '@/lib/auth/session';
import { can } from '@/lib/auth/permissions';
import { Card } from '@/components/admin/ui';
import { StatusBadge } from '@/components/admin/status';
import { priceWithGstLabel } from '@/lib/accommodations';
import { addDaysUtc, formatDateIn, todayIst } from '@/lib/booking/dates';

function Stat({ label, value, href, tone }: { label: string; value: number; href: string; tone?: string }) {
  return (
    <Link href={href} className="block bg-white rounded-xl border border-mist-200 p-4 hover:shadow-md transition">
      <div className={`text-3xl font-bold ${tone ?? 'text-forest-900'}`}>{value}</div>
      <div className="text-sm text-soil-700">{label}</div>
    </Link>
  );
}

export default async function Dashboard({ searchParams }: { searchParams: Promise<{ denied?: string }> }) {
  const user = await requireUser();
  const { denied } = await searchParams;
  const today = todayIst();
  const week = addDaysUtc(today, 7);
  const bookings = can(user.role, 'bookings');

  const [requests, awaiting, arrivals, departuresToday, feedErrors, rooms] = await Promise.all([
    bookings ? prisma.reservation.count({ where: { status: 'REQUESTED' } }) : 0,
    bookings ? prisma.reservation.count({ where: { status: 'AWAITING_PAYMENT' } }) : 0,
    bookings ? prisma.reservation.findMany({ where: { status: { in: ['CONFIRMED', 'AWAITING_PAYMENT'] }, checkIn: { gte: today, lt: week } }, orderBy: { checkIn: 'asc' }, include: { accommodation: { select: { name: true } } } }) : [],
    bookings ? prisma.reservation.count({ where: { status: 'CONFIRMED', checkOut: today } }) : 0,
    can(user.role, 'calendar') ? prisma.icalFeed.findMany({ where: { lastStatus: 'error' }, include: { accommodation: { select: { name: true } } } }) : [],
    prisma.accommodation.findMany({ orderBy: { sortOrder: 'asc' } }),
  ]);

  return (
    <div className="space-y-6">
      <h1 className="font-display text-3xl text-forest-900">Hello, {user.name.split(' ')[0]}</h1>
      {denied && <p className="rounded-lg bg-amber-50 border border-amber-200 px-3 py-2 text-sm text-amber-800">Your role does not have access to that section.</p>}
      {feedErrors.map((f) => (
        <p key={f.id} className="rounded-lg bg-red-50 border border-red-200 px-3 py-2 text-sm text-red-700">
          {f.name} calendar for {f.accommodation.name} failed to sync: {f.lastError}. <Link href="/admin/calendar" className="underline">Fix</Link>
        </p>
      ))}

      {bookings && (
        <>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <Stat label="New requests" value={requests} href="/admin/bookings?tab=requests" tone={requests ? 'text-blue-700' : undefined} />
            <Stat label="Awaiting payment" value={awaiting} href="/admin/bookings?tab=awaiting" tone={awaiting ? 'text-amber-700' : undefined} />
            <Stat label="Arrivals in 7 days" value={arrivals.length} href="/admin/calendar" />
            <Stat label="Departures today" value={departuresToday} href="/admin/bookings?tab=upcoming" />
          </div>
          <Card title="Arriving this week" actions={<Link href="/admin/calendar" className="text-sm text-forest-700 hover:underline">Calendar →</Link>}>
            {arrivals.length === 0 ? <p className="text-sm text-soil-700">No arrivals in the next 7 days.</p> : (
              <ul className="divide-y divide-mist-200">
                {arrivals.map((r) => (
                  <li key={r.id} className="py-2 flex flex-wrap items-center justify-between gap-2 text-sm">
                    <Link href={`/admin/bookings/${r.id}`} className="font-medium text-forest-700 hover:underline">{r.guestName}</Link>
                    <span className="text-soil-700">{r.accommodation.name} · {formatDateIn(r.checkIn, { weekday: 'short', day: 'numeric', month: 'short' })} · {r.adults + r.children} guests</span>
                    <StatusBadge status={r.status} />
                  </li>
                ))}
              </ul>
            )}
          </Card>
        </>
      )}

      <Card title="Rooms" actions={can(user.role, 'rooms') ? <Link href="/admin/rooms" className="text-sm text-forest-700 hover:underline">Manage →</Link> : undefined}>
        <ul className="divide-y divide-mist-200">
          {rooms.map((r) => (
            <li key={r.id} className="py-2 flex items-center justify-between text-sm">
              <span className="font-medium">{r.name} {!r.isActive && <span className="text-xs text-red-700">(hidden)</span>}</span>
              <span className="text-soil-700">{priceWithGstLabel(r.basePrice)} {r.pricingModel === 'PER_PERSON' ? 'per person' : `· ${r.includedAdults ?? 2} adults`}</span>
            </li>
          ))}
        </ul>
      </Card>
    </div>
  );
}
