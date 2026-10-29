import Link from 'next/link';
import { prisma } from '@/lib/prisma';
import { requireUser } from '@/lib/auth/session';
import { Card } from '@/components/admin/ui';
import { priceWithGstLabel } from '@/lib/accommodations';

export default async function Dashboard({ searchParams }: { searchParams: Promise<{ denied?: string }> }) {
  const user = await requireUser();
  const { denied } = await searchParams;
  const rooms = await prisma.accommodation.findMany({ orderBy: { sortOrder: 'asc' } });
  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-3xl text-forest-900">Hello, {user.name.split(' ')[0]}</h1>
        <p className="text-sm text-soil-700">Bookings and calendar arrive in the next phase. Rooms, rates and users are live now.</p>
      </div>
      {denied && <p className="rounded-lg bg-amber-50 border border-amber-200 px-3 py-2 text-sm text-amber-800">Your role does not have access to that section.</p>}
      <Card title="Rooms" actions={<Link href="/admin/rooms" className="text-sm text-forest-700 hover:underline">Manage →</Link>}>
        <ul className="divide-y divide-mist-200">
          {rooms.map((r) => (
            <li key={r.id} className="py-2 flex items-center justify-between text-sm">
              <span className="font-medium">{r.name} {!r.isActive && <span className="text-xs text-red-700">(hidden)</span>}</span>
              <span className="text-soil-700">{priceWithGstLabel(r.basePrice)} {r.pricingModel === 'PER_PERSON' ? 'per person' : `· ${r.includedAdults ?? 2} adults`}</span>
            </li>
          ))}
        </ul>
      </Card>
    </div>
  );
}
