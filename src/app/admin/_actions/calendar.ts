'use server';

import { revalidatePath } from 'next/cache';
import { z } from 'zod';
import { prisma } from '@/lib/prisma';
import { requireUser, audit } from '@/lib/auth/session';
import { syncFeed } from '@/lib/booking/ical';
import { addDaysUtc, toDate } from '@/lib/booking/dates';
import { ROOM_PATHS } from '@/lib/rooms-repo';
import type { ActionState } from '@/components/admin/ui';

const done = (msg: string): ActionState => { revalidatePath('/admin', 'layout'); return { message: msg }; };

export async function addBlock(_prev: ActionState, form: FormData): Promise<ActionState> {
  const user = await requireUser('calendar');
  const p = z.object({ accommodationId: z.string().uuid(), from: z.string(), to: z.string(), reason: z.string().trim().max(200) }).safeParse(Object.fromEntries(form));
  if (!p.success) return { error: 'Pick a room and dates.' };
  try {
    const start = toDate(p.data.from);
    const lastNight = toDate(p.data.to);
    if (lastNight < start) return { error: 'End date is before start date.' };
    const b = await prisma.calendarBlock.create({
      data: { accommodationId: p.data.accommodationId, startDate: start, endDate: addDaysUtc(lastNight, 1), reason: p.data.reason || 'Blocked', source: 'MANUAL' },
    });
    await audit(user.id, 'add_block', 'calendar_block', b.id, p.data);
    return done('Dates blocked.');
  } catch { return { error: 'Invalid dates.' }; }
}

export async function deleteBlock(id: string) {
  const user = await requireUser('calendar');
  const b = await prisma.calendarBlock.findUnique({ where: { id } });
  if (!b || b.source !== 'MANUAL') return; // OTA blocks are removed by syncing
  await prisma.calendarBlock.delete({ where: { id } });
  await audit(user.id, 'delete_block', 'calendar_block', id);
  revalidatePath('/admin', 'layout');
}

export async function addFeed(_prev: ActionState, form: FormData): Promise<ActionState> {
  const user = await requireUser('calendar');
  const p = z.object({ accommodationId: z.string().uuid(), name: z.string().trim().min(2).max(60), url: z.string().trim().url().startsWith('https://') }).safeParse(Object.fromEntries(form));
  if (!p.success) return { error: 'Enter a name and the https:// calendar link.' };
  const feed = await prisma.icalFeed.create({ data: p.data });
  await audit(user.id, 'add_ical_feed', 'ical_feed', feed.id, { name: feed.name });
  const r = await syncFeed(feed.id);
  revalidatePath('/admin', 'layout');
  return r.ok ? { message: `Connected. ${r.count} upcoming bookings imported.` } : { error: `Saved, but the first sync failed: ${r.error}` };
}

export async function removeFeed(id: string) {
  const user = await requireUser('calendar');
  await prisma.icalFeed.delete({ where: { id } }); // cascades its blocks
  await audit(user.id, 'remove_ical_feed', 'ical_feed', id);
  revalidatePath('/admin', 'layout');
}

export async function syncNow(id: string) {
  await requireUser('calendar');
  await syncFeed(id);
  revalidatePath('/admin', 'layout');
}

// ─── Seasonal rates ───────────────────────────────────────────────────

const optInt = z.preprocess((v) => (v === '' || v == null ? null : Number(v)), z.number().int().min(0).max(1_000_000).nullable());

export async function addRateRule(accommodationId: string, _prev: ActionState, form: FormData): Promise<ActionState> {
  const user = await requireUser('rates');
  const p = z.object({
    name: z.string().trim().min(2).max(60),
    from: z.string(),
    to: z.string(),
    basePrice: z.coerce.number().int().min(1).max(1_000_000),
    extraAdultPrice: optInt,
    minNights: optInt,
    priority: z.coerce.number().int().min(0).max(100).default(0),
  }).safeParse(Object.fromEntries(form));
  if (!p.success) return { error: `Check ${p.error.issues[0]?.path.join('.')}: ${p.error.issues[0]?.message}` };
  try {
    const startDate = toDate(p.data.from), endDate = toDate(p.data.to);
    if (endDate < startDate) return { error: 'End date is before start date.' };
    const rule = await prisma.rateRule.create({
      data: { accommodationId, name: p.data.name, startDate, endDate, basePrice: p.data.basePrice, extraAdultPrice: p.data.extraAdultPrice, minNights: p.data.minNights, priority: p.data.priority },
    });
    await audit(user.id, 'add_rate_rule', 'accommodation', accommodationId, { rule: rule.id, ...p.data });
  } catch { return { error: 'Invalid dates.' }; }
  for (const path of ROOM_PATHS) revalidatePath(path);
  revalidatePath('/admin', 'layout');
  return { message: 'Seasonal rate added.' };
}

export async function deleteRateRule(id: string) {
  const user = await requireUser('rates');
  const rule = await prisma.rateRule.delete({ where: { id } });
  await audit(user.id, 'delete_rate_rule', 'accommodation', rule.accommodationId, { rule: id, name: rule.name });
  revalidatePath('/admin', 'layout');
}
