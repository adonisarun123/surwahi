import Link from 'next/link';
import { prisma } from '@/lib/prisma';
import { requireUser } from '@/lib/auth/session';
import { Card } from '@/components/admin/ui';
import { addDaysUtc, eachNight, formatDateIn, toIso, todayIst } from '@/lib/booking/dates';
import { capacityOf, unitsFor } from '@/lib/booking/availability';
import { cn } from '@/lib/utils';
import { deleteBlock, removeFeed, syncNow } from '../../_actions/calendar';
import { BlockForm, FeedForm, CopyField } from './CalendarForms';

type Cell = { kind: 'free' | 'requested' | 'awaiting' | 'confirmed' | 'blocked' | 'ota'; label?: string; href?: string; used?: number; title?: string };

export default async function CalendarPage({ searchParams }: { searchParams: Promise<{ month?: string }> }) {
  await requireUser('calendar');
  const { month } = await searchParams;
  const today = todayIst();
  const m = /^\d{4}-\d{2}$/.test(month ?? '') ? month! : toIso(today).slice(0, 7);
  const first = new Date(`${m}-01T00:00:00Z`);
  const next = new Date(Date.UTC(first.getUTCFullYear(), first.getUTCMonth() + 1, 1));
  const prev = new Date(Date.UTC(first.getUTCFullYear(), first.getUTCMonth() - 1, 1));
  const days = eachNight(first, next);

  const rooms = await prisma.accommodation.findMany({
    orderBy: { sortOrder: 'asc' },
    include: {
      reservations: { where: { status: { in: ['REQUESTED', 'AWAITING_PAYMENT', 'CONFIRMED'] }, checkIn: { lt: next }, checkOut: { gt: first } } },
      blocks: { where: { startDate: { lt: next }, endDate: { gt: first } }, include: { icalFeed: { select: { name: true } } } },
      icalFeeds: { orderBy: { createdAt: 'asc' } },
    },
  });
  const upcomingBlocks = await prisma.calendarBlock.findMany({
    where: { source: 'MANUAL', endDate: { gt: today } }, orderBy: { startDate: 'asc' }, include: { accommodation: { select: { name: true } } },
  });
  const site = process.env.NEXT_PUBLIC_SITE_URL || 'https://surwahi.com';

  const grid = rooms.map((room) => {
    const cap = capacityOf(room);
    return days.map((d): Cell => {
      const iso = toIso(d);
      const block = room.blocks.find((b) => b.startDate <= d && b.endDate > d);
      if (block) return { kind: block.source === 'ICAL' ? 'ota' : 'blocked', label: block.startDate.getTime() === d.getTime() || d.getTime() === first.getTime() ? (block.icalFeed?.name ?? 'Blocked') : undefined, title: block.reason ?? '' };
      const res = room.reservations.filter((r) => r.checkIn <= d && r.checkOut > d);
      const holding = res.filter((r) => r.status !== 'REQUESTED');
      const used = holding.reduce((s, r) => s + unitsFor(room, r), 0);
      const top = holding.find((r) => r.status === 'CONFIRMED') ?? holding[0] ?? res[0];
      if (!top) return { kind: 'free' };
      const startsHere = top.checkIn.getTime() === d.getTime() || d.getTime() === first.getTime();
      return {
        kind: top.status === 'CONFIRMED' ? 'confirmed' : top.status === 'AWAITING_PAYMENT' ? 'awaiting' : 'requested',
        label: startsHere ? top.guestName.split(' ')[0] : undefined,
        href: `/admin/bookings/${top.id}`,
        used: cap > 1 ? used : undefined,
        title: `${iso}: ${res.map((r) => `${r.guestName} (${r.status.toLowerCase()})`).join(', ')}`,
      };
    });
  });

  const tone: Record<Cell['kind'], string> = {
    free: 'bg-white',
    requested: 'bg-blue-50 border-2 border-dashed border-blue-300',
    awaiting: 'bg-amber-200',
    confirmed: 'bg-green-300',
    blocked: 'bg-stone-300',
    ota: 'bg-rose-200',
  };
  const monthLabel = first.toLocaleDateString('en-IN', { month: 'long', year: 'numeric', timeZone: 'UTC' });

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h1 className="font-display text-3xl text-forest-900">Calendar</h1>
        <div className="flex items-center gap-2 text-sm">
          <Link href={`/admin/calendar?month=${toIso(prev).slice(0, 7)}`} className="rounded-lg border border-mist-200 bg-white px-3 py-1">←</Link>
          <span className="font-medium w-36 text-center">{monthLabel}</span>
          <Link href={`/admin/calendar?month=${toIso(next).slice(0, 7)}`} className="rounded-lg border border-mist-200 bg-white px-3 py-1">→</Link>
          <Link href="/admin/calendar" className="text-forest-700 hover:underline ml-2">Today</Link>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-mist-200 overflow-x-auto">
        <table className="text-xs border-collapse">
          <thead>
            <tr>
              <th className="sticky left-0 bg-white z-10 px-3 py-2 text-left min-w-[120px]">Room</th>
              {days.map((d) => {
                const dow = d.getUTCDay();
                return (
                  <th key={toIso(d)} className={cn('px-0 py-1 w-9 min-w-[36px] font-normal text-center', (dow === 0 || dow === 6) && 'bg-sand-50', toIso(d) === toIso(today) && 'text-white bg-forest-700 rounded-t')}>
                    <div>{'SMTWTFS'[dow]}</div><div className="font-semibold">{d.getUTCDate()}</div>
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody>
            {rooms.map((room, i) => (
              <tr key={room.id} className="border-t border-mist-200">
                <td className="sticky left-0 bg-white z-10 px-3 py-2 font-medium whitespace-nowrap">{room.name}{capacityOf(room) > 1 && <span className="text-soil-700 font-normal"> ({capacityOf(room)} beds)</span>}</td>
                {grid[i].map((c, j) => {
                  const inner = (
                    <div title={c.title} className={cn('h-10 border-l border-mist-200 px-0.5 overflow-hidden leading-tight', tone[c.kind])}>
                      {c.label && <div className="truncate font-medium">{c.label}</div>}
                      {c.used != null && c.used > 0 && <div className="text-[10px]">{c.used}/{capacityOf(room)}</div>}
                    </div>
                  );
                  return <td key={j} className="p-0">{c.href ? <Link href={c.href}>{inner}</Link> : inner}</td>;
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex flex-wrap gap-3 text-xs text-soil-700">
        <span className="flex items-center gap-1"><span className="w-3 h-3 bg-green-300 inline-block" />Confirmed</span>
        <span className="flex items-center gap-1"><span className="w-3 h-3 bg-amber-200 inline-block" />Awaiting payment (dates held)</span>
        <span className="flex items-center gap-1"><span className="w-3 h-3 bg-blue-50 border border-dashed border-blue-300 inline-block" />Request (not held)</span>
        <span className="flex items-center gap-1"><span className="w-3 h-3 bg-rose-200 inline-block" />Airbnb / Booking.com</span>
        <span className="flex items-center gap-1"><span className="w-3 h-3 bg-stone-300 inline-block" />Blocked by you</span>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <Card title="Block dates">
          <BlockForm rooms={rooms.map((r) => ({ id: r.id, name: r.name }))} />
          {upcomingBlocks.length > 0 && (
            <ul className="mt-5 divide-y divide-mist-200 text-sm">
              {upcomingBlocks.map((b) => (
                <li key={b.id} className="py-2 flex items-center justify-between gap-3">
                  <span>{b.accommodation.name}: {formatDateIn(b.startDate, { day: 'numeric', month: 'short' })} – {formatDateIn(addDaysUtc(b.endDate, -1), { day: 'numeric', month: 'short' })} <span className="text-soil-700">· {b.reason}</span></span>
                  <form action={deleteBlock.bind(null, b.id)}><button className="text-xs text-red-700 hover:underline">Unblock</button></form>
                </li>
              ))}
            </ul>
          )}
        </Card>

        <Card title="Airbnb / Booking.com sync">
          <p className="text-xs text-soil-700 mb-4">Import each channel&apos;s calendar so their bookings block our dates, and give each channel its own export link so our bookings block theirs. Syncs every 30 minutes; channels poll our link on their own schedule (often hourly).</p>
          <div className="space-y-6">
            {rooms.map((room) => (
              <div key={room.id} className="space-y-2">
                <div className="font-medium text-forest-900">{room.name}</div>
                {room.icalFeeds.map((f) => (
                  <div key={f.id} className="rounded-lg border border-mist-200 p-3 space-y-2 text-sm">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <span className="font-medium">{f.name}</span>
                      <span className={cn('text-xs', f.lastStatus === 'error' ? 'text-red-700' : 'text-soil-700')}>
                        {f.lastSyncedAt ? `${f.lastStatus === 'error' ? `Error: ${f.lastError}` : f.lastStatus} · ${f.lastSyncedAt.toLocaleString('en-IN', { timeZone: 'Asia/Kolkata', timeStyle: 'short', dateStyle: 'short' })}` : 'never synced'}
                      </span>
                    </div>
                    <CopyField label={`Paste this into ${f.name} (import calendar):`} value={`${site}/api/ical/${room.icalExportToken}.ics?exclude=${f.id}`} />
                    <div className="flex gap-3">
                      <form action={syncNow.bind(null, f.id)}><button className="text-xs text-forest-700 hover:underline">Sync now</button></form>
                      <form action={removeFeed.bind(null, f.id)}><button className="text-xs text-red-700 hover:underline">Disconnect</button></form>
                    </div>
                  </div>
                ))}
                <FeedForm accommodationId={room.id} />
                <CopyField label="Generic export link (any other calendar):" value={`${site}/api/ical/${room.icalExportToken}.ics`} />
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
