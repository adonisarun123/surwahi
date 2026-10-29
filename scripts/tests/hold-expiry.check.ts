// Integration check against the real DB, self-cleaning (dates in May 2027, guest "TEST hold").
// Run: NODE_OPTIONS=--conditions=react-server npx tsx scripts/tests/hold-expiry.check.ts
import { config } from 'dotenv';
config({ path: ['.env.local'], quiet: true });
import assert from 'node:assert/strict';

async function main() {
  const { prisma } = await import('../../src/lib/prisma');
  const { isAvailable } = await import('../../src/lib/booking/availability');
  const { releaseExpiredHolds, handleLatePayment, extendHold } = await import('../../src/lib/booking/service');
  const { toDate } = await import('../../src/lib/booking/dates');

  const room = await prisma.accommodation.findUniqueOrThrow({ where: { slug: 'kariwah' } });
  const ci = toDate('2027-05-01'), co = toDate('2027-05-03');
  const base = { accommodationId: room.id, checkIn: ci, checkOut: co, adults: 2, children: 0, guestEmail: 'test@example.com', guestPhone: '+919999999999', subtotal: 21600, gst: 3888, total: 25488, priceBreakdown: { lines: [], gstPercent: 18, notes: [] } };
  const ids: string[] = [];
  const mk = async (code: string, data: object) => { const r = await prisma.reservation.create({ data: { ...base, code, guestName: 'TEST hold', ...data } }); ids.push(r.id); return r; };
  const req = { adults: 2, children: 0, exclusive: false };
  let n = 0; const ok = (m: string) => { n++; console.log('ok', m); };

  try {
    const live = await mk('SRW-TSTH01', { status: 'AWAITING_PAYMENT', holdExpiresAt: new Date(Date.now() + 3600e3) });
    assert.equal((await isAvailable(prisma, room, ci, co, req)).ok, false); ok('unexpired hold blocks dates');

    await prisma.reservation.update({ where: { id: live.id }, data: { holdExpiresAt: new Date(Date.now() - 60e3) } });
    assert.equal((await isAvailable(prisma, room, ci, co, req)).ok, true); ok('expired hold stops blocking immediately');

    assert.equal(await releaseExpiredHolds(), 1); ok('release job released 1');
    const released = await prisma.reservation.findUniqueOrThrow({ where: { id: live.id } });
    assert.equal(released.status, 'CANCELLED'); assert.ok(released.internalNotes?.includes('released automatically')); ok('status cancelled + note');
    assert.ok(await prisma.auditLog.findFirst({ where: { entityId: live.id, action: 'auto_release_hold' } })); ok('audit recorded');

    assert.equal(await handleLatePayment(live.id, 25488), 'reinstated');
    const back = await prisma.reservation.findUniqueOrThrow({ where: { id: live.id } });
    assert.equal(back.status, 'CONFIRMED'); assert.equal(back.amountPaid, 25488); ok('late payment on free dates -> reinstated & confirmed');

    const other = await mk('SRW-TSTH02', { status: 'CANCELLED' }); // released earlier, same dates now taken by SRW-TSTH01
    assert.equal(await handleLatePayment(other.id, 25488), 'refund_needed');
    const flagged = await prisma.reservation.findUniqueOrThrow({ where: { id: other.id } });
    assert.equal(flagged.status, 'CANCELLED'); assert.ok(flagged.internalNotes?.includes('REFUND NEEDED')); ok('late payment on taken dates -> refund flagged, not double-booked');

    const staffCancelled = await mk('SRW-TSTH03', { status: 'CANCELLED', checkIn: toDate('2027-06-01'), checkOut: toDate('2027-06-02') });
    assert.equal(await handleLatePayment(staffCancelled.id, 100, { allowReinstate: false }), 'refund_needed'); ok('staff-cancelled booking is never auto-reinstated');

    const hold = await mk('SRW-TSTH04', { status: 'AWAITING_PAYMENT', holdExpiresAt: new Date(Date.now() + 10 * 3600e3), checkIn: toDate('2027-07-01'), checkOut: toDate('2027-07-02') });
    const until = await extendHold(hold.id, 48);
    assert.ok(Math.abs(until.getTime() - (hold.holdExpiresAt!.getTime() + 48 * 3600e3)) < 1000); ok('extend adds to the existing expiry');
    console.log(`\n${n} checks passed`);
  } finally {
    await prisma.auditLog.deleteMany({ where: { entity: 'reservation', entityId: { in: ids } } });
    await prisma.reservation.deleteMany({ where: { id: { in: ids } } });
    console.log('cleaned up', ids.length, 'test reservations');
    await prisma.$disconnect();
  }
}
main();
