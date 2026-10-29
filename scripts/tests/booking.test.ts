// Run: NODE_OPTIONS=--conditions=react-server npx tsx scripts/tests/booking.test.ts
import assert from 'node:assert/strict';
import { buildQuote } from '../../src/lib/booking/pricing';
import { parseIcs } from '../../src/lib/booking/ical';
import { toDate, nightsBetween } from '../../src/lib/booking/dates';

const suite = { id: 's', category: 'SUITE', pricingModel: 'PER_UNIT', basePrice: 10800, extraAdultPrice: 4000, includedAdults: 2, childPrice: null, gstPercent: 18, maxOccupancy: 6 } as never;
const dorm = { id: 'd', category: 'DORMITORY', pricingModel: 'PER_PERSON', basePrice: 4000, extraAdultPrice: null, includedAdults: null, childPrice: null, gstPercent: 18, maxOccupancy: 8 } as never;
const ci = toDate('2027-03-10'), co = toDate('2027-03-12');
let n = 0; const t = (name: string, fn: () => void) => { fn(); n++; console.log('ok', name); };

t('suite 2 adults 2 nights', () => { const q = buildQuote(suite, [], ci, co, 2, 0); assert.equal(q.subtotal, 21600); assert.equal(q.gst, 3888); assert.equal(q.total, 25488); });
t('suite 3 adults adds extra adult', () => { const q = buildQuote(suite, [], ci, co, 3, 0); assert.equal(q.subtotal, 21600 + 8000); });
t('suite children flagged, not charged', () => { const q = buildQuote(suite, [], ci, co, 2, 1); assert.equal(q.subtotal, 21600); assert.ok(q.notes.some((x) => x.includes('Children'))); });
t('dorm per person incl. children', () => { const q = buildQuote(dorm, [], ci, co, 3, 1); assert.equal(q.subtotal, 4000 * 4 * 2); });
t('dorm exclusive charges all beds', () => { const q = buildQuote(dorm, [], ci, co, 3, 0, true); assert.equal(q.subtotal, 4000 * 8 * 2); });
const rule = (o: object) => ({ id: 'r', name: 'Peak', isActive: true, priority: 0, minNights: null, extraAdultPrice: null, createdAt: new Date(), startDate: toDate('2027-03-11'), endDate: toDate('2027-03-11'), basePrice: 15000, ...o }) as never;
t('seasonal rule applies to its nights only', () => { const q = buildQuote(suite, [rule({})], ci, co, 2, 0); assert.equal(q.subtotal, 10800 + 15000); });
t('higher priority rule wins', () => { const q = buildQuote(suite, [rule({}), rule({ priority: 5, basePrice: 20000 })], ci, co, 2, 0); assert.equal(q.subtotal, 10800 + 20000); });
t('min nights from rule', () => { const q = buildQuote(suite, [rule({ minNights: 3 })], ci, co, 2, 0); assert.equal(q.minNights, 3); });
t('nights between', () => assert.equal(nightsBetween(ci, co), 2));
t('bad date rejected', () => assert.throws(() => toDate('2027-02-30')));

const airbnb = ['BEGIN:VCALENDAR', 'PRODID:-//Airbnb Inc//Hosting Calendar 1.0//EN', 'BEGIN:VEVENT', 'DTEND;VALUE=DATE:20270315', 'DTSTART;VALUE=DATE:20270312',
  'UID:1418fb94e984-abc@airbnb.com', 'DESCRIPTION:Reservation URL: https://www.airbnb.com/hosting/reservations/details/HMXXX\\nPhone', ' Number (Last 4 Digits): 1234', 'SUMMARY:Reserved', 'END:VEVENT',
  'BEGIN:VEVENT', 'DTSTART:20270401T140000Z', 'UID:x2', 'SUMMARY:Airbnb (Not available)', 'END:VEVENT', 'END:VCALENDAR'].join('\r\n');
t('parse airbnb ics', () => {
  const ev = parseIcs(airbnb);
  assert.equal(ev.length, 2);
  assert.equal(ev[0].uid, '1418fb94e984-abc@airbnb.com');
  assert.equal(ev[0].start.toISOString().slice(0, 10), '2027-03-12');
  assert.equal(ev[0].end.toISOString().slice(0, 10), '2027-03-15');
  assert.equal(ev[1].end.toISOString().slice(0, 10), '2027-04-02'); // missing DTEND -> 1 night
});
console.log(`\n${n} tests passed`);
