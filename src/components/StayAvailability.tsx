'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { formatPrice } from '@/lib/utils';
import { parseStaySearch, staySearchQuery } from '@/lib/stay-search';

export type StayRoom = { slug: string; name: string; maxOccupancy: number };
type RoomResult = { available?: boolean; total?: number; minNights?: number; nights?: number; error?: string };

const pretty = (iso: string) => new Date(`${iso}T00:00:00Z`).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', timeZone: 'UTC' });

/** Shown on /stay when the booking widget sent dates: live availability + price per room, with a Book link. */
export default function StayAvailability({ rooms }: { rooms: StayRoom[] }) {
  const search = parseStaySearch(useSearchParams());
  const query = search ? staySearchQuery(search) : '';
  const [results, setResults] = useState<{ query: string; byRoom: Record<string, RoomResult> } | null>(null);

  useEffect(() => {
    if (!search) return;
    const ctrl = new AbortController();
    const guests = search.adults + search.children;
    Promise.all(rooms.map(async (r): Promise<[string, RoomResult]> => {
      if (guests > r.maxOccupancy) return [r.slug, { error: `Sleeps up to ${r.maxOccupancy}` }];
      try {
        const res = await fetch(`/api/availability?room=${r.slug}&${query}`, { signal: ctrl.signal });
        const json = await res.json();
        if (!res.ok) return [r.slug, { error: json.error ?? 'Could not check' }];
        return [r.slug, { available: json.available, total: json.quote?.total, minNights: json.quote?.minNights, nights: json.quote?.nights }];
      } catch {
        return [r.slug, { error: 'Could not check' }];
      }
    })).then((entries) => { if (!ctrl.signal.aborted) setResults({ query, byRoom: Object.fromEntries(entries) }); });
    return () => ctrl.abort();
    // `query` encodes `search`; rooms come from the server and don't change.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query, rooms]);

  if (!search) return null;
  const byRoom = results?.query === query ? results.byRoom : null;
  const guests = search.adults + search.children;

  return (
    <section aria-live="polite" className="max-w-3xl mx-auto mb-10 rounded-card border border-mist-200 bg-sand-50 p-6">
      <h2 className="font-display text-2xl text-forest-900 mb-1">Availability for your dates</h2>
      <p className="text-sm text-soil-700 mb-4">
        {pretty(search.checkIn)} → {pretty(search.checkOut)} · {guests} guest{guests === 1 ? '' : 's'} · prices include GST and all meals
      </p>
      <ul className="divide-y divide-mist-200">
        {rooms.map((r) => {
          const res = byRoom?.[r.slug];
          const tooShort = res?.minNights != null && res.nights != null && res.nights < res.minNights;
          const bookable = !!res?.available && !tooShort;
          return (
            <li key={r.slug} className="flex flex-wrap items-center justify-between gap-3 py-3">
              <div>
                <div className="font-medium text-ink-900">{r.name}</div>
                <div className="text-sm text-soil-700">
                  {!res ? 'Checking…'
                    : res.error ? res.error
                    : tooShort ? `Minimum stay ${res.minNights} nights for these dates`
                    : res.available ? `Available · ${res.total != null ? formatPrice(res.total) : 'price on next step'}`
                    : 'Not available on these dates'}
                </div>
              </div>
              <Link
                href={`/stay/${r.slug}?${query}#book`}
                className={bookable ? 'btn btn-primary text-sm' : 'text-sm text-moss-600 underline underline-offset-2'}
              >
                {bookable ? `Book ${r.name}` : 'View room'}
              </Link>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
