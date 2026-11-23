// Dates + guests carried in the URL from the booking widget (/stay?checkIn=…) to the room page.
// Everything is validated: anything malformed or in the past is treated as "no search".

export type StaySearch = { checkIn: string; checkOut: string; adults: number; children: number };

const ISO = /^\d{4}-\d{2}-\d{2}$/;
const MAX_NIGHTS = 30; // matches /api/availability
const MAX_GUESTS = 8;

/** Today's date in India (YYYY-MM-DD), the calendar the lodge books against. */
export const istToday = () => new Date(Date.now() + 5.5 * 3600e3).toISOString().slice(0, 10);

const nights = (a: string, b: string) => Math.round((Date.parse(`${b}T00:00:00Z`) - Date.parse(`${a}T00:00:00Z`)) / 86400e3);

export function parseStaySearch(params: { get(name: string): string | null } | null, today = istToday()): StaySearch | null {
  if (!params) return null;
  const checkIn = params.get('checkIn') ?? '';
  const checkOut = params.get('checkOut') ?? '';
  if (!ISO.test(checkIn) || !ISO.test(checkOut) || Number.isNaN(Date.parse(checkIn)) || Number.isNaN(Date.parse(checkOut))) return null;
  if (checkIn < today) return null;
  const n = nights(checkIn, checkOut);
  if (n < 1 || n > MAX_NIGHTS) return null;
  const int = (v: string | null, min: number, fallback: number) => {
    const x = Number.parseInt(v ?? '', 10);
    return Number.isFinite(x) ? Math.min(MAX_GUESTS, Math.max(min, x)) : fallback;
  };
  return { checkIn, checkOut, adults: int(params.get('adults'), 1, 2), children: int(params.get('children'), 0, 0) };
}

export const staySearchQuery = (s: StaySearch) =>
  new URLSearchParams({ checkIn: s.checkIn, checkOut: s.checkOut, adults: String(s.adults), children: String(s.children) }).toString();
