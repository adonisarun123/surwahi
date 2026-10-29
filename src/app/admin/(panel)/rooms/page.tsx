import Link from 'next/link';
import Image from 'next/image';
import { prisma } from '@/lib/prisma';
import { requireUser } from '@/lib/auth/session';
import { Badge } from '@/components/admin/ui';
import { priceWithGstLabel } from '@/lib/accommodations';

export default async function RoomsPage() {
  await requireUser('rooms');
  const rooms = await prisma.accommodation.findMany({
    orderBy: { sortOrder: 'asc' },
    include: { images: { include: { media: true }, orderBy: { sortOrder: 'asc' }, take: 1 } },
  });
  return (
    <div className="space-y-6">
      <h1 className="font-display text-3xl text-forest-900">Rooms &amp; Rates</h1>
      <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-4">
        {rooms.map((r) => (
          <Link key={r.id} href={`/admin/rooms/${r.id}`} className="block bg-white rounded-xl border border-mist-200 overflow-hidden hover:shadow-md transition">
            <div className="relative aspect-[16/9] bg-sand-50">
              {r.images[0] && <Image src={r.images[0].media.url} alt={r.images[0].media.alt} fill sizes="400px" className="object-cover" />}
            </div>
            <div className="p-4 space-y-1">
              <div className="flex items-center justify-between">
                <span className="font-semibold text-forest-900">{r.name}</span>
                {r.isActive ? <Badge tone="green">Live</Badge> : <Badge tone="red">Hidden</Badge>}
              </div>
              <div className="text-sm text-soil-700">{priceWithGstLabel(r.basePrice)} {r.pricingModel === 'PER_PERSON' ? 'per person / night' : `/ night · ${r.includedAdults ?? 2} adults`}</div>
              {r.extraAdultPrice && <div className="text-xs text-soil-700">Extra adult {priceWithGstLabel(r.extraAdultPrice)}</div>}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
