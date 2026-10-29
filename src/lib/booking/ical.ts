import 'server-only';
import { prisma } from '@/lib/prisma';
import { HOLDING } from './availability';
import { addDaysUtc, toIso, todayIst } from './dates';

// ─── Parsing (import from Airbnb / Booking.com) ───────────────────────

export interface IcsEvent { uid: string; start: Date; end: Date; summary: string }

function parseIcsDate(value: string): Date | null {
  const m = value.match(/^(\d{4})(\d{2})(\d{2})/); // DATE or DATE-TIME; we only need the calendar date
  return m ? new Date(Date.UTC(+m[1], +m[2] - 1, +m[3])) : null;
}

export function parseIcs(text: string): IcsEvent[] {
  const lines = text.replace(/\r\n[ \t]/g, '').replace(/\n[ \t]/g, '').split(/\r?\n/); // unfold
  const events: IcsEvent[] = [];
  let cur: Record<string, string> | null = null;
  for (const line of lines) {
    if (line === 'BEGIN:VEVENT') cur = {};
    else if (line === 'END:VEVENT' && cur) {
      const start = cur.DTSTART ? parseIcsDate(cur.DTSTART) : null;
      let end = cur.DTEND ? parseIcsDate(cur.DTEND) : null;
      if (start && (!end || end <= start)) end = addDaysUtc(start, 1);
      if (start && end) events.push({ uid: cur.UID || `${toIso(start)}-${toIso(end)}`, start, end, summary: (cur.SUMMARY || 'Blocked').slice(0, 200) });
      cur = null;
    } else if (cur) {
      const idx = line.indexOf(':');
      if (idx > 0) cur[line.slice(0, idx).split(';')[0].toUpperCase()] = line.slice(idx + 1).trim();
    }
  }
  return events;
}

/** Fetches one OTA calendar and mirrors its events as calendar blocks. */
export async function syncFeed(feedId: string) {
  const feed = await prisma.icalFeed.findUniqueOrThrow({ where: { id: feedId } });
  try {
    const res = await fetch(feed.url, { signal: AbortSignal.timeout(15000), headers: { 'User-Agent': 'SurwahiCalendarSync/1.0' }, cache: 'no-store' });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const text = await res.text();
    if (text.length > 3_000_000) throw new Error('Calendar file too large');
    if (!text.includes('BEGIN:VCALENDAR')) throw new Error('Not an iCal file - check the link');
    const cutoff = addDaysUtc(todayIst(), -1);
    const events = parseIcs(text).filter((e) => e.end > cutoff);

    await prisma.$transaction(async (tx) => {
      const uids = events.map((e) => e.uid);
      await tx.calendarBlock.deleteMany({ where: { icalFeedId: feed.id, externalUid: { notIn: uids } } });
      for (const e of events) {
        await tx.calendarBlock.upsert({
          where: { icalFeedId_externalUid: { icalFeedId: feed.id, externalUid: e.uid } },
          create: { accommodationId: feed.accommodationId, icalFeedId: feed.id, externalUid: e.uid, source: 'ICAL', startDate: e.start, endDate: e.end, reason: `${feed.name}: ${e.summary}` },
          update: { startDate: e.start, endDate: e.end, reason: `${feed.name}: ${e.summary}` },
        });
      }
    });
    await prisma.icalFeed.update({ where: { id: feed.id }, data: { lastSyncedAt: new Date(), lastStatus: `ok · ${events.length} upcoming`, lastError: null } });
    return { ok: true as const, count: events.length };
  } catch (e) {
    const msg = e instanceof Error ? e.message : String(e);
    await prisma.icalFeed.update({ where: { id: feed.id }, data: { lastSyncedAt: new Date(), lastStatus: 'error', lastError: msg.slice(0, 500) } });
    return { ok: false as const, error: msg };
  }
}

export async function syncAllFeeds() {
  const feeds = await prisma.icalFeed.findMany({ where: { isActive: true }, select: { id: true } });
  const results = [];
  for (const f of feeds) results.push({ id: f.id, ...(await syncFeed(f.id)) });
  return results;
}

// ─── Export (our availability → Airbnb / Booking.com) ─────────────────

const esc = (s: string) => s.replace(/[\\;,]/g, (c) => `\\${c}`).replace(/\n/g, '\\n');
const icsDate = (d: Date) => toIso(d).replace(/-/g, '');

/** Busy dates for one room. `excludeFeedId` leaves out blocks that came from the channel reading this feed. */
export async function exportIcs(token: string, excludeFeedId?: string | null) {
  const acc = await prisma.accommodation.findUnique({ where: { icalExportToken: token } });
  if (!acc) return null;
  const since = addDaysUtc(todayIst(), -30);
  const [reservations, blocks] = await Promise.all([
    prisma.reservation.findMany({ where: { accommodationId: acc.id, status: { in: [...HOLDING] }, checkOut: { gte: since } } }),
    prisma.calendarBlock.findMany({
      where: { accommodationId: acc.id, endDate: { gte: since }, ...(excludeFeedId ? { OR: [{ icalFeedId: null }, { icalFeedId: { not: excludeFeedId } }] } : {}) },
    }),
  ]);
  const stamp = new Date().toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, '');
  // Dormitory: only export nights where the whole dorm is taken
  const isDorm = acc.category === 'DORMITORY';
  const events: string[] = [];
  const push = (uid: string, start: Date, end: Date, summary: string) =>
    events.push(['BEGIN:VEVENT', `UID:${uid}@surwahi.com`, `DTSTAMP:${stamp}`, `DTSTART;VALUE=DATE:${icsDate(start)}`, `DTEND;VALUE=DATE:${icsDate(end)}`, `SUMMARY:${esc(summary)}`, 'END:VEVENT'].join('\r\n'));

  for (const r of reservations) {
    if (isDorm && !r.exclusive && r.adults + r.children < acc.maxOccupancy) continue;
    push(`res-${r.id}`, r.checkIn, r.checkOut, 'Booked (Surwahi)');
  }
  for (const b of blocks) push(`blk-${b.id}`, b.startDate, b.endDate, 'Not available');

  return [
    'BEGIN:VCALENDAR', 'VERSION:2.0', 'PRODID:-//Surwahi//Availability//EN', 'CALSCALE:GREGORIAN', 'METHOD:PUBLISH',
    `X-WR-CALNAME:${esc(`Surwahi - ${acc.name}`)}`, ...events, 'END:VCALENDAR', '',
  ].join('\r\n');
}
