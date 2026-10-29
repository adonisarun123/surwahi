import Link from 'next/link';
import Image from 'next/image';
import { prisma } from '@/lib/prisma';
import { requireUser } from '@/lib/auth/session';
import type { Prisma } from '@/generated/prisma/client';
import { imagekitEnabled } from '@/lib/media/imagekit';
import { Badge, Card } from '@/components/admin/ui';
import { cn } from '@/lib/utils';
import { Uploader } from './Uploader';

const FILTERS = {
  all: { label: 'All', where: {} },
  gallery: { label: 'In gallery', where: { galleryCategory: { not: null } } },
  rooms: { label: 'In rooms', where: { accommodations: { some: {} } } },
  unused: { label: 'Not used', where: { galleryCategory: null, accommodations: { none: {} } } },
} satisfies Record<string, { label: string; where: Prisma.MediaAssetWhereInput }>;

export default async function PhotosPage({ searchParams }: { searchParams: Promise<{ f?: string }> }) {
  await requireUser('media');
  const { f } = await searchParams;
  const filter = (f && f in FILTERS ? f : 'all') as keyof typeof FILTERS;
  const media = await prisma.mediaAsset.findMany({
    where: FILTERS[filter].where,
    orderBy: { createdAt: 'desc' },
    include: { accommodations: { include: { accommodation: { select: { name: true } } } } },
  });
  return (
    <div className="space-y-6">
      <h1 className="font-display text-3xl text-forest-900">Photos</h1>
      <Card><Uploader enabled={imagekitEnabled()} /></Card>
      <div className="flex flex-wrap gap-2">
        {Object.entries(FILTERS).map(([k, v]) => (
          <Link key={k} href={`/admin/photos?f=${k}`} className={cn('rounded-full px-3 py-1 text-sm border', filter === k ? 'bg-forest-700 text-white border-forest-700' : 'bg-white border-mist-200')}>{v.label}</Link>
        ))}
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3">
        {media.map((m) => (
          <Link key={m.id} href={`/admin/photos/${m.id}`} className="group block bg-white rounded-xl border border-mist-200 overflow-hidden hover:shadow-md">
            <div className="relative aspect-square bg-sand-50">
              <Image src={m.url} alt={m.alt} fill sizes="240px" className="object-cover" />
            </div>
            <div className="p-2 space-y-1">
              <p className="text-xs line-clamp-2 text-ink-900">{m.alt}</p>
              <div className="flex flex-wrap gap-1">
                {m.galleryCategory && <Badge tone="green">Gallery</Badge>}
                {m.accommodations.map((a) => <Badge key={a.accommodationId} tone="blue">{a.accommodation.name}</Badge>)}
              </div>
            </div>
          </Link>
        ))}
      </div>
      {media.length === 0 && <p className="text-sm text-soil-700">No photos here yet.</p>}
    </div>
  );
}
