// Seeds the three real rooms (and their photos) from src/lib/accommodations.ts.
// Idempotent and NON-destructive: rooms that already exist are left alone, so admin edits are never overwritten.
// Usage: npm run db:seed
import { config } from 'dotenv';
config({ path: ['.env.local', '.env'], quiet: true });

import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '../src/generated/prisma/client';
import { rooms } from '../src/lib/accommodations';

const prisma = new PrismaClient({ adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL }) });

const CATEGORY = { Suites: 'SUITE', Dormitory: 'DORMITORY' } as const;

async function main() {
  let order = 0;
  for (const room of Object.values(rooms)) {
    order += 1;
    const existing = await prisma.accommodation.findUnique({ where: { slug: room.slug } });
    if (existing) { console.log(`exists  ${room.slug} (left unchanged)`); continue; }

    const acc = await prisma.accommodation.create({
      data: {
        slug: room.slug,
        name: room.name,
        category: CATEGORY[room.category],
        shortDescription: room.description,
        longDescription: room.longDescription,
        bedConfiguration: room.bedConfiguration,
        size: room.size ?? null,
        view: room.view,
        location: room.location,
        maxOccupancy: room.maxOccupancy,
        pricingModel: room.pricing === 'per-person' ? 'PER_PERSON' : 'PER_UNIT',
        basePrice: room.basePrice,
        extraAdultPrice: room.extraAdultPrice ?? null,
        includedAdults: room.includedAdults ?? null,
        childPrice: null,
        mealPlan: 'APAI - all meals included',
        amenities: room.amenities,
        ecoFeatures: room.ecoFeatures,
        accessibility: room.accessibility,
        included: room.included,
        policies: room.policies,
        keywords: room.keywords,
        sortOrder: order,
      },
    });

    let i = 0;
    for (const img of room.images) {
      const media =
        (await prisma.mediaAsset.findFirst({ where: { url: img.url } })) ??
        (await prisma.mediaAsset.create({ data: { url: img.url, alt: img.alt, caption: img.caption, tags: ['room', room.slug] } }));
      await prisma.accommodationImage.create({
        data: { accommodationId: acc.id, mediaId: media.id, sortOrder: i++, caption: img.caption },
      });
    }
    console.log(`created ${room.slug} with ${room.images.length} photos`);
  }
}

main().finally(() => prisma.$disconnect());
