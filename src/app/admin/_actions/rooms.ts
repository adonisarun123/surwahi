'use server';

import { revalidatePath } from 'next/cache';
import { z } from 'zod';
import { prisma } from '@/lib/prisma';
import { requireUser, audit } from '@/lib/auth/session';
import { can } from '@/lib/auth/permissions';
import { ROOM_PATHS } from '@/lib/rooms-repo';
import type { ActionState } from '@/components/admin/ui';

const lines = (v: FormDataEntryValue | null) =>
  String(v ?? '').split('\n').map((s) => s.trim()).filter(Boolean);
const optInt = z.preprocess((v) => (v === '' || v == null ? null : Number(v)), z.number().int().min(0).max(1_000_000).nullable());

const contentSchema = z.object({
  name: z.string().trim().min(2).max(80),
  shortDescription: z.string().trim().min(10).max(400),
  longDescription: z.string().trim().min(20).max(6000),
  bedConfiguration: z.string().trim().min(2).max(120),
  size: z.string().trim().max(60),
  view: z.string().trim().max(80),
  location: z.string().trim().max(80),
  maxOccupancy: z.coerce.number().int().min(1).max(50),
  mealPlan: z.string().trim().min(2).max(120),
  sortOrder: z.coerce.number().int().min(0).max(999),
});

const rateSchema = z.object({
  basePrice: z.coerce.number().int().min(1).max(1_000_000),
  extraAdultPrice: optInt,
  includedAdults: optInt,
  childPrice: optInt,
});

export async function updateRoom(id: string, _prev: ActionState, form: FormData): Promise<ActionState> {
  const user = await requireUser('rooms');
  const before = await prisma.accommodation.findUnique({ where: { id } });
  if (!before) return { error: 'Room not found.' };

  const content = contentSchema.safeParse(Object.fromEntries(form));
  if (!content.success) return { error: `Check the form: ${content.error.issues[0]?.path.join('.')} - ${content.error.issues[0]?.message}` };

  const data: Record<string, unknown> = {
    ...content.data,
    size: content.data.size || null,
    view: content.data.view || null,
    location: content.data.location || null,
    amenities: lines(form.get('amenities')),
    ecoFeatures: lines(form.get('ecoFeatures')),
    accessibility: lines(form.get('accessibility')),
    included: lines(form.get('included')),
    keywords: String(form.get('keywords') ?? '').split(',').map((s) => s.trim()).filter(Boolean),
    policies: {
      pets: String(form.get('policyPets') ?? '').trim(),
      extraBed: String(form.get('policyExtraBed') ?? '').trim(),
      children: String(form.get('policyChildren') ?? '').trim(),
    },
    isActive: form.get('isActive') === 'on',
  };

  // Only roles with the 'rates' capability may change prices
  if (can(user.role, 'rates')) {
    const rates = rateSchema.safeParse(Object.fromEntries(form));
    if (!rates.success) return { error: `Check the rates: ${rates.error.issues[0]?.path.join('.')} - ${rates.error.issues[0]?.message}` };
    if (before.pricingModel === 'PER_UNIT' && !rates.data.includedAdults) return { error: 'Set how many adults the base price covers.' };
    Object.assign(data, rates.data);
  }

  const after = await prisma.accommodation.update({ where: { id }, data });
  const priceChanged = before.basePrice !== after.basePrice || before.extraAdultPrice !== after.extraAdultPrice;
  await audit(user.id, priceChanged ? 'update_room_rates' : 'update_room', 'accommodation', id, {
    from: { basePrice: before.basePrice, extraAdultPrice: before.extraAdultPrice },
    to: { basePrice: after.basePrice, extraAdultPrice: after.extraAdultPrice },
  });

  for (const p of ROOM_PATHS) revalidatePath(p);
  revalidatePath(`/stay/${after.slug}`);
  revalidatePath('/', 'layout'); // "starting from" price in the mobile bar
  return { message: 'Saved. The website updates within a few seconds.' };
}
