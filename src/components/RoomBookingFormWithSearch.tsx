'use client';

import { useSearchParams } from 'next/navigation';
import RoomBookingForm from '@/components/RoomBookingForm';
import { parseStaySearch } from '@/lib/stay-search';
import type { Room } from '@/lib/accommodations';

/**
 * Room booking form pre-filled from ?checkIn=…&checkOut=…&adults=…&children=… (sent by the booking
 * widget and the /stay availability panel). Render inside <Suspense> with a plain <RoomBookingForm>
 * fallback so the page stays statically generated.
 */
export default function RoomBookingFormWithSearch({ room, className }: { room: Room; className?: string }) {
  const search = parseStaySearch(useSearchParams());
  // key: a different search in the URL starts a fresh form.
  return <RoomBookingForm key={search ? JSON.stringify(search) : 'none'} room={room} className={className} initial={search ?? undefined} />;
}
