'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState, useTransition } from 'react';
import { ArrowLeft, ArrowRight, X, Plus } from 'lucide-react';
import { attachToRoom, detachFromRoom, moveRoomPhoto } from '../../../_actions/media';
import { Card } from '@/components/admin/ui';

type Photo = { mediaId: string; url: string; alt: string };

export default function RoomPhotos({ accommodationId, photos, library }: { accommodationId: string; photos: Photo[]; library: Photo[] }) {
  const [pending, start] = useTransition();
  const [picking, setPicking] = useState(false);
  const run = (fn: () => Promise<unknown>) => start(async () => { await fn(); });
  const btn = 'w-7 h-7 rounded-full bg-white/90 flex items-center justify-center shadow disabled:opacity-40';

  return (
    <Card title="Photos" actions={<Link href="/admin/photos" className="text-sm text-forest-700 hover:underline">Photo library →</Link>}>
      <p className="text-xs text-soil-700 mb-3">The first photo is the cover on listings and search results.</p>
      <div className={`grid grid-cols-2 sm:grid-cols-4 gap-3 ${pending ? 'opacity-60' : ''}`}>
        {photos.map((p, i) => (
          <div key={p.mediaId} className="relative aspect-[4/3] rounded-lg overflow-hidden bg-sand-50">
            <Image src={p.url} alt={p.alt} fill sizes="200px" className="object-cover" />
            {i === 0 && <span className="absolute top-1 left-1 bg-forest-700 text-white text-[10px] px-1.5 py-0.5 rounded">Cover</span>}
            <div className="absolute bottom-1 inset-x-1 flex justify-between">
              <button type="button" aria-label="Move earlier" disabled={i === 0 || pending} onClick={() => run(() => moveRoomPhoto(accommodationId, p.mediaId, -1))} className={btn}><ArrowLeft className="h-4 w-4" /></button>
              <button type="button" aria-label="Remove from room" disabled={pending} onClick={() => run(() => detachFromRoom(accommodationId, p.mediaId))} className={btn}><X className="h-4 w-4 text-red-700" /></button>
              <button type="button" aria-label="Move later" disabled={i === photos.length - 1 || pending} onClick={() => run(() => moveRoomPhoto(accommodationId, p.mediaId, 1))} className={btn}><ArrowRight className="h-4 w-4" /></button>
            </div>
          </div>
        ))}
        <button type="button" onClick={() => setPicking((v) => !v)} className="aspect-[4/3] rounded-lg border-2 border-dashed border-mist-200 flex flex-col items-center justify-center text-sm text-soil-700 hover:border-moss-500">
          <Plus className="h-5 w-5" /> Add photos
        </button>
      </div>
      {picking && (
        <div className="mt-4 border-t border-mist-200 pt-4">
          {library.length === 0 ? <p className="text-sm text-soil-700">No other photos in the library. <Link href="/admin/photos" className="underline">Upload some</Link>.</p> : (
            <div className="grid grid-cols-3 sm:grid-cols-6 gap-2 max-h-80 overflow-y-auto">
              {library.map((p) => (
                <button key={p.mediaId} type="button" disabled={pending} title={p.alt} onClick={() => run(() => attachToRoom(accommodationId, p.mediaId))} className="relative aspect-square rounded overflow-hidden group">
                  <Image src={p.url} alt={p.alt} fill sizes="120px" className="object-cover" />
                  <span className="absolute inset-0 bg-forest-900/0 group-hover:bg-forest-900/50 flex items-center justify-center text-white text-xs opacity-0 group-hover:opacity-100">Add</span>
                </button>
              ))}
            </div>
          )}
        </div>
      )}
    </Card>
  );
}
