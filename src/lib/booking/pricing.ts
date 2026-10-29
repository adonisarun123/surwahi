import 'server-only';
import { prisma } from '@/lib/prisma';
import type { Accommodation, RateRule } from '@/generated/prisma/client';
import { eachNight, nightsBetween, toIso } from './dates';

export interface NightRate { date: string; base: number; extraAdult: number | null; rule?: string }
export interface Quote {
  nights: number;
  nightly: NightRate[];
  lines: { label: string; amount: number }[];
  subtotal: number;
  gstPercent: number;
  gst: number;
  total: number;
  minNights: number;
  notes: string[];
}

/** Rule that applies to a given night: highest priority, then most recently created. */
function ruleFor(rules: RateRule[], night: Date): RateRule | undefined {
  return rules
    .filter((r) => r.isActive && r.startDate <= night && r.endDate >= night)
    .sort((a, b) => b.priority - a.priority || b.createdAt.getTime() - a.createdAt.getTime())[0];
}

export function buildQuote(acc: Accommodation, rules: RateRule[], checkIn: Date, checkOut: Date, adults: number, children: number, exclusive = false): Quote {
  const nights = nightsBetween(checkIn, checkOut);
  const nightly: NightRate[] = eachNight(checkIn, checkOut).map((n) => {
    const r = ruleFor(rules, n);
    return { date: toIso(n), base: r?.basePrice ?? acc.basePrice, extraAdult: r?.extraAdultPrice ?? acc.extraAdultPrice, rule: r?.name };
  });
  const minNights = Math.max(1, ...eachNight(checkIn, checkOut).map((n) => ruleFor(rules, n)?.minNights ?? 1));
  const notes: string[] = [];
  const lines: Quote['lines'] = [];
  const sumBase = nightly.reduce((s, n) => s + n.base, 0);
  const plural = (n: number, w: string) => `${n} ${w}${n === 1 ? '' : 's'}`;

  if (acc.pricingModel === 'PER_PERSON') {
    const people = exclusive ? acc.maxOccupancy : adults + (acc.childPrice == null ? children : 0);
    lines.push({ label: `${exclusive ? 'Exclusive use, ' : ''}${plural(people, 'guest')} × ${plural(nights, 'night')}`, amount: sumBase * people });
    if (!exclusive && children > 0 && acc.childPrice != null) {
      lines.push({ label: `${plural(children, 'child')} × ${plural(nights, 'night')}`, amount: acc.childPrice * children * nights });
    }
  } else {
    const included = acc.includedAdults ?? 2;
    lines.push({ label: `Room (${included} adults) × ${plural(nights, 'night')}`, amount: sumBase });
    const extra = Math.max(0, adults - included);
    if (extra > 0) {
      const sumExtra = nightly.reduce((s, n) => s + (n.extraAdult ?? 0), 0);
      if (nightly.some((n) => n.extraAdult == null)) notes.push('Extra-adult rate to be confirmed.');
      lines.push({ label: `Extra adult × ${extra} × ${plural(nights, 'night')}`, amount: sumExtra * extra });
    }
    if (children > 0) {
      if (acc.childPrice != null) lines.push({ label: `${plural(children, 'child')} × ${plural(nights, 'night')}`, amount: acc.childPrice * children * nights });
      else notes.push("Children's rate confirmed at booking.");
    }
  }

  const subtotal = lines.reduce((s, l) => s + l.amount, 0);
  const gstPercent = Number(acc.gstPercent);
  const gst = Math.round((subtotal * gstPercent) / 100);
  if (nightly.some((n) => n.rule)) notes.push('Seasonal rates apply to some nights.');
  return { nights, nightly, lines, subtotal, gstPercent, gst, total: subtotal + gst, minNights, notes };
}

export async function quoteFor(accommodationId: string, checkIn: Date, checkOut: Date, adults: number, children: number, exclusive = false) {
  const acc = await prisma.accommodation.findUniqueOrThrow({ where: { id: accommodationId } });
  const rules = await prisma.rateRule.findMany({
    where: { accommodationId, isActive: true, startDate: { lt: checkOut }, endDate: { gte: checkIn } },
  });
  return { acc, quote: buildQuote(acc, rules, checkIn, checkOut, adults, children, exclusive) };
}
