import 'server-only';
import { cache } from 'react';
import { prisma } from '@/lib/prisma';
import { rooms as staticRooms, type Room } from '@/lib/accommodations';
import type { Prisma } from '@/generated/prisma/client';

/** Pages that show room data - revalidated whenever an admin edits rooms or rates. */
export const ROOM_PATHS = ['/', '/stay', '/stay/suites', '/stay/mudhouses', '/sitemap.xml'];

const withImages = { images: { include: { media: true }, orderBy: { sortOrder: 'asc' } } } satisfies Prisma.AccommodationInclude;
type DbRoom = Prisma.AccommodationGetPayload<{ include: typeof withImages }>;

function toRoom(a: DbRoom): Room | null {
  if (a.category === 'CAMPING') return null; // camping has no public room page yet
  const policies = (a.policies ?? {}) as Partial<Room['policies']>;
  return {
    id: a.id,
    name: a.name,
    slug: a.slug,
    category: a.category === 'SUITE' ? 'Suites' : 'Dormitory',
    description: a.shortDescription,
    longDescription: a.longDescription,
    images: a.images.map((i) => ({ url: i.media.url, alt: i.media.alt, caption: i.caption ?? i.media.caption ?? '' })),
    basePrice: a.basePrice,
    pricing: a.pricingModel === 'PER_PERSON' ? 'per-person' : 'double-occupancy',
    extraAdultPrice: a.extraAdultPrice ?? undefined,
    includedAdults: a.includedAdults ?? undefined,
    maxOccupancy: a.maxOccupancy,
    bedConfiguration: a.bedConfiguration,
    size: a.size ?? undefined,
    view: a.view ?? '',
    amenities: a.amenities,
    ecoFeatures: a.ecoFeatures,
    included: a.included,
    accessibility: a.accessibility,
    location: a.location ?? '',
    policies: { pets: policies.pets ?? '', extraBed: policies.extraBed ?? '', children: policies.children ?? '' },
    keywords: a.keywords,
  };
}

/** Active rooms in display order. Falls back to built-in data if the DB is unreachable. */
export const getPublicRooms = cache(async (): Promise<Room[]> => {
  try {
    const rows = await prisma.accommodation.findMany({
      where: { isActive: true },
      orderBy: { sortOrder: 'asc' },
      include: withImages,
    });
    const mapped = rows.map(toRoom).filter((r): r is Room => r !== null);
    if (mapped.length) return mapped;
  } catch (e) {
    console.error('rooms-repo: DB unavailable, using built-in room data', e);
  }
  return Object.values(staticRooms);
});

export async function getPublicRoom(slug: string): Promise<Room | null> {
  return (await getPublicRooms()).find((r) => r.slug === slug) ?? null;
}

export async function getStartingPrice(): Promise<number> {
  const all = await getPublicRooms();
  return Math.min(...all.map((r) => r.basePrice));
}

export async function getRoomsByCategory(category: Room['category']) {
  return (await getPublicRooms()).filter((r) => r.category === category);
}
