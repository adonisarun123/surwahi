'use client';

import { useMemo, useState } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export interface AwardImage {
  src: string;
  alt: string;
}

interface AwardsCarouselProps {
  images: AwardImage[];
}

export default function AwardsCarousel({ images }: AwardsCarouselProps) {
  const validImages = useMemo(() => images.filter(i => i && i.src), [images]);
  const [index, setIndex] = useState(0);

  const count = validImages.length;
  const visible = 4; // show 4 at a time

  const next = () => setIndex((i) => (i + visible) % count);
  const prev = () => setIndex((i) => (i - visible + count) % count);

  // Compute current window of 4 items (wrap-around)
  const windowImages = useMemo(() => {
    if (count === 0) return [] as AwardImage[];
    const out: AwardImage[] = [];
    for (let k = 0; k < Math.min(visible, count); k++) {
      out.push(validImages[(index + k) % count]);
    }
    return out;
  }, [index, count, validImages]);

  // Preload next set subtly by rendering off-screen with lazy loading
  const nextWindow = useMemo(() => {
    if (count === 0) return [] as AwardImage[];
    const out: AwardImage[] = [];
    for (let k = 0; k < Math.min(visible, count); k++) {
      out.push(validImages[(index + visible + k) % count]);
    }
    return out;
  }, [index, count, validImages]);

  return (
    <div className="relative">
      {/* Slides */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-0">
        {windowImages.map((img, i) => (
          <div key={`${img.src}-${i}`} className="flex items-center justify-center">
            <Image
              src={img.src}
              alt={img.alt}
              width={1600}
              height={1200}
              sizes="(min-width: 1024px) 20vw, (min-width: 768px) 25vw, 50vw"
              className="block h-auto w-full"
              loading={i < 2 ? 'eager' : 'lazy'}
            />
          </div>
        ))}
      </div>

      {/* Arrows overlay */}
      <button
        type="button"
        aria-label="Previous"
        onClick={prev}
        className="absolute left-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/80 hover:bg-white shadow border disabled:opacity-50"
        disabled={count <= visible}
      >
        <ChevronLeft className="h-5 w-5" />
      </button>
      <button
        type="button"
        aria-label="Next"
        onClick={next}
        className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/80 hover:bg-white shadow border disabled:opacity-50"
        disabled={count <= visible}
      >
        <ChevronRight className="h-5 w-5" />
      </button>

      {/* Preload next set invisibly to keep navigation snappy; still lazy-loads */}
      <div className="sr-only" aria-hidden="true">
        {nextWindow.map((img, i) => (
          <Image
            key={`${img.src}-pre-${i}`}
            src={img.src}
            alt=""
            width={10}
            height={10}
            loading="lazy"
          />
        ))}
      </div>
    </div>
  );
}
