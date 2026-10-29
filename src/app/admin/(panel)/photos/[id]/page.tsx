import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import { requireUser } from '@/lib/auth/session';
import { GALLERY_CATEGORIES } from '@/lib/content-repo';
import { Card } from '@/components/admin/ui';
import { MediaForm, DeleteMedia } from './MediaForm';

export default async function PhotoPage({ params }: { params: Promise<{ id: string }> }) {
  await requireUser('media');
  const { id } = await params;
  const m = await prisma.mediaAsset.findUnique({ where: { id }, include: { accommodations: { include: { accommodation: true } } } }).catch(() => null);
  if (!m) notFound();
  return (
    <div className="space-y-6">
      <Link href="/admin/photos" className="text-sm text-soil-700 hover:underline">← Photos</Link>
      <div className="grid lg:grid-cols-2 gap-6">
        <div className="relative aspect-[4/3] bg-white rounded-xl overflow-hidden border border-mist-200">
          <Image src={m.url} alt={m.alt} fill sizes="600px" className="object-contain" />
        </div>
        <div className="space-y-6">
          <Card title="Details">
            <MediaForm media={{ id: m.id, alt: m.alt, caption: m.caption ?? '', tags: m.tags.join(', '), galleryCategory: m.galleryCategory ?? '', gallerySort: m.gallerySort }} categories={GALLERY_CATEGORIES} />
          </Card>
          <Card title="Used in">
            {m.accommodations.length === 0 && !m.galleryCategory ? <p className="text-sm text-soil-700">Not used anywhere yet. Add it to the gallery above, or to a room from Rooms & Rates.</p> : (
              <ul className="text-sm space-y-1">
                {m.galleryCategory && <li>Gallery · {m.galleryCategory}</li>}
                {m.accommodations.map((a) => <li key={a.accommodationId}><Link className="text-forest-700 hover:underline" href={`/admin/rooms/${a.accommodationId}`}>{a.accommodation.name}</Link></li>)}
              </ul>
            )}
            <p className="text-xs text-soil-700 mt-3 break-all">{m.url}</p>
          </Card>
          <DeleteMedia id={m.id} />
        </div>
      </div>
    </div>
  );
}
