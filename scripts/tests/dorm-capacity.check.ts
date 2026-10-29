// Integration check against the real DB, self-cleaning. Run: NODE_OPTIONS=--conditions=react-server npx tsx scripts/tests/dorm-capacity.check.ts
import { config } from 'dotenv';
config({ path: ['.env.local'], quiet: true });
import assert from 'node:assert/strict';

async function main() {
  // Imported after dotenv so DATABASE_URL is set before the Prisma client is created
  const { prisma } = await import('../../src/lib/prisma');
  const { isAvailable } = await import('../../src/lib/booking/availability');
  const { toDate } = await import('../../src/lib/booking/dates');
  const dorm = await prisma.accommodation.findUniqueOrThrow({ where: { slug: 'maikal-express' } });
  const ci = toDate('2027-04-20'), co = toDate('2027-04-22');
  const base = { accommodationId: dorm.id, checkIn: ci, checkOut: co, children: 0, guestEmail: 'test@example.com', guestPhone: '+919999999999', status: 'CONFIRMED' as const, subtotal: 0, gst: 0, total: 0, priceBreakdown: {} };
  const made = await Promise.all([
    prisma.reservation.create({ data: { ...base, code: 'SRW-TESTD1', guestName: 'TEST dorm 1', adults: 3 } }),
    prisma.reservation.create({ data: { ...base, code: 'SRW-TESTD2', guestName: 'TEST dorm 2', adults: 4 } }),
  ]);
  try {
    assert.equal((await isAvailable(prisma, dorm, ci, co, { adults: 1, children: 0, exclusive: false })).ok, true, '8th bed free');
    assert.equal((await isAvailable(prisma, dorm, ci, co, { adults: 2, children: 0, exclusive: false })).ok, false, '2 beds not free');
    assert.equal((await isAvailable(prisma, dorm, ci, co, { adults: 1, children: 0, exclusive: true })).ok, false, 'exclusive not free');
    assert.equal((await isAvailable(prisma, dorm, toDate('2027-04-22'), toDate('2027-04-23'), { adults: 8, children: 0, exclusive: true })).ok, true, 'checkout day free');
    console.log('dorm capacity: 4 checks passed');
  } finally {
    await prisma.reservation.deleteMany({ where: { id: { in: made.map((m) => m.id) } } });
    await prisma.$disconnect();
  }
}
main();
