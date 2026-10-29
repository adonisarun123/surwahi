import Link from 'next/link';
import { prisma } from '@/lib/prisma';
import { requireUser } from '@/lib/auth/session';
import ManualBookingForm from './ManualBookingForm';

export default async function NewBookingPage() {
  await requireUser('bookings');
  const rooms = await prisma.accommodation.findMany({ orderBy: { sortOrder: 'asc' }, select: { id: true, name: true, maxOccupancy: true, category: true } });
  return (
    <div className="space-y-6 max-w-3xl">
      <div>
        <Link href="/admin/bookings" className="text-sm text-soil-700 hover:underline">← Bookings</Link>
        <h1 className="font-display text-3xl text-forest-900">Add a booking</h1>
        <p className="text-sm text-soil-700">For phone, WhatsApp, walk-in or OTA bookings. Price is calculated from current rates; availability is checked.</p>
      </div>
      <ManualBookingForm rooms={rooms} />
    </div>
  );
}
