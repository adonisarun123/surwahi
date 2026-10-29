/** All booking dates are calendar dates (YYYY-MM-DD), stored as Postgres DATE and handled in UTC. */

export const ISO_DATE = /^\d{4}-\d{2}-\d{2}$/;

export function toDate(iso: string): Date {
  if (!ISO_DATE.test(iso)) throw new Error(`Bad date: ${iso}`);
  const d = new Date(`${iso}T00:00:00Z`);
  if (Number.isNaN(d.getTime()) || d.toISOString().slice(0, 10) !== iso) throw new Error(`Bad date: ${iso}`);
  return d;
}

export const toIso = (d: Date) => d.toISOString().slice(0, 10);

export function addDaysUtc(d: Date, n: number): Date {
  const x = new Date(d);
  x.setUTCDate(x.getUTCDate() + n);
  return x;
}

export function nightsBetween(checkIn: Date, checkOut: Date): number {
  return Math.round((checkOut.getTime() - checkIn.getTime()) / 864e5);
}

/** Each night from checkIn (inclusive) to checkOut (exclusive). */
export function eachNight(checkIn: Date, checkOut: Date): Date[] {
  const out: Date[] = [];
  for (let d = checkIn; d < checkOut; d = addDaysUtc(d, 1)) out.push(d);
  return out;
}

/** Today's date in India, as a UTC-midnight Date. */
export function todayIst(): Date {
  return toDate(new Date(Date.now() + 5.5 * 3600e3).toISOString().slice(0, 10));
}

export function formatDateIn(d: Date | string, opts: Intl.DateTimeFormatOptions = { day: 'numeric', month: 'short', year: 'numeric' }) {
  const date = typeof d === 'string' ? toDate(d) : d;
  return date.toLocaleDateString('en-IN', { ...opts, timeZone: 'UTC' });
}
