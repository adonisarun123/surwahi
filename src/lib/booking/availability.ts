import 'server-only';
import { prisma } from '@/lib/prisma';
import type { Accommodation, Prisma } from '@/generated/prisma/client';
import { addDaysUtc, eachNight, toIso } from './dates';

/** Statuses that hold inventory. REQUESTED does not - staff decide on confirmation. */
export const HOLDING = ['AWAITING_PAYMENT', 'CONFIRMED'] as const;

/** Reservations that currently hold dates: confirmed, or awaiting payment with an unexpired hold. */
export function holdingWhere(now = new Date()): Prisma.ReservationWhereInput {
  return {
    OR: [
      { status: 'CONFIRMED' },
      { status: 'AWAITING_PAYMENT', OR: [{ holdExpiresAt: null }, { holdExpiresAt: { gt: now } }] },
    ],
  };
}

type Db = Prisma.TransactionClient | typeof prisma;

/** Units in use per night. Suites: capacity 1. Dormitory: capacity = beds (maxOccupancy). */
export function capacityOf(acc: Pick<Accommodation, 'category' | 'maxOccupancy'>) {
  return acc.category === 'DORMITORY' ? acc.maxOccupancy : 1;
}

export function unitsFor(acc: Pick<Accommodation, 'category' | 'maxOccupancy'>, r: { adults: number; children: number; exclusive: boolean }) {
  if (acc.category !== 'DORMITORY') return 1;
  return r.exclusive ? acc.maxOccupancy : r.adults + r.children;
}

/** Map of night (YYYY-MM-DD) -> units used, for nights in [from, to). */
export async function usageByNight(db: Db, acc: Accommodation, from: Date, to: Date, ignoreReservationId?: string) {
  const [reservations, blocks] = await Promise.all([
    db.reservation.findMany({
      where: {
        accommodationId: acc.id,
        ...holdingWhere(),
        checkIn: { lt: to },
        checkOut: { gt: from },
        ...(ignoreReservationId ? { id: { not: ignoreReservationId } } : {}),
      },
    }),
    db.calendarBlock.findMany({ where: { accommodationId: acc.id, startDate: { lt: to }, endDate: { gt: from } } }),
  ]);
  const cap = capacityOf(acc);
  const used = new Map<string, number>();
  const add = (d: Date, n: number) => used.set(toIso(d), Math.min(cap, (used.get(toIso(d)) ?? 0) + n));
  for (const r of reservations) for (const n of eachNight(r.checkIn, r.checkOut)) if (n >= from && n < to) add(n, unitsFor(acc, r));
  // Blocks (manual or OTA) close the whole room/dorm for those nights
  for (const b of blocks) for (const n of eachNight(b.startDate, b.endDate)) if (n >= from && n < to) add(n, cap);
  return used;
}

export async function isAvailable(
  db: Db,
  acc: Accommodation,
  checkIn: Date,
  checkOut: Date,
  req: { adults: number; children: number; exclusive: boolean },
  ignoreReservationId?: string
) {
  const used = await usageByNight(db, acc, checkIn, checkOut, ignoreReservationId);
  const need = unitsFor(acc, req);
  const cap = capacityOf(acc);
  const full = eachNight(checkIn, checkOut).filter((n) => (used.get(toIso(n)) ?? 0) + need > cap).map(toIso);
  return { ok: full.length === 0, unavailableNights: full };
}

/** Nights with no room for even one guest - for disabling dates in the public date picker. */
export async function fullyBookedNights(acc: Accommodation, from: Date, days: number) {
  const to = addDaysUtc(from, days);
  const used = await usageByNight(prisma, acc, from, to);
  const cap = capacityOf(acc);
  return [...used.entries()].filter(([, n]) => n >= cap).map(([d]) => d).sort();
}

/** Serialise availability checks per room inside a transaction (prevents double-confirming). */
export async function lockAccommodation(tx: Prisma.TransactionClient, accommodationId: string) {
  await tx.$executeRaw`SELECT pg_advisory_xact_lock(hashtext(${accommodationId}))`;
}
