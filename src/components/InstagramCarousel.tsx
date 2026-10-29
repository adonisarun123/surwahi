'use client';

import { useRef } from 'react';
import Image from 'next/image';
import { Instagram, ChevronLeft, ChevronRight } from 'lucide-react';
import { galleryImages } from '@/lib/images';

const IG_URL = 'https://www.instagram.com/surwahisocialecoestatekanha';
const IG_HANDLE = '@surwahisocialecoestatekanha';

interface Post {
  image: string;
  caption: string;
  href: string;
}

/**
 * Instagram feed carousel.
 * NOTE: seeded with real lodge photos as a placeholder feed, each linking to the
 * Instagram profile. To show ACTUAL live posts in this same custom UI, replace
 * `posts` with data from either:
 *   (a) a Behold.so JSON feed (free; connect IG once, fetch the feed URL), or
 *   (b) the Instagram Graph API (Business/Creator account + Meta app + token).
 * Each item just needs { image, caption, href(permalink) }.
 */
const posts: Post[] = [
  { image: galleryImages.lodgeExterior, caption: 'Earthen suites at golden hour', href: IG_URL },
  { image: galleryImages.starryNight, caption: 'Starlit skies over Surwahi', href: IG_URL },
  { image: galleryImages.tigerSafari, caption: 'Safari mornings in Kanha', href: IG_URL },
  { image: galleryImages.diningExperience, caption: 'Farm-to-table, cooked fresh', href: IG_URL },
  { image: galleryImages.gondArt, caption: 'Gond art with local artisans', href: IG_URL },
  { image: galleryImages.forestTrail, caption: 'Walking the forest trails', href: IG_URL },
  { image: galleryImages.hornbill, caption: 'A Malabar Pied Hornbill visits', href: IG_URL },
  { image: galleryImages.commonArea, caption: 'Evenings in the common lounge', href: IG_URL },
  { image: galleryImages.organicFarm, caption: 'From our kitchen garden', href: IG_URL },
  { image: galleryImages.riverSuite, caption: 'Inside the Jholar family suite', href: IG_URL },
  { image: galleryImages.wildMushrooms, caption: 'Monsoon wild mushrooms', href: IG_URL },
  { image: galleryImages.earthenPottery, caption: 'Hands in clay — pottery days', href: IG_URL },
];

export default function InstagramCarousel() {
  const trackRef = useRef<HTMLDivElement>(null);

  const scroll = (dir: 1 | -1) => {
    const el = trackRef.current;
    if (!el) return;
    el.scrollBy({ left: dir * el.clientWidth * 0.85, behavior: 'smooth' });
  };

  return (
    <section className="py-16 lg:py-24 bg-sand-50 overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col items-center text-center mb-10">
          <span className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-tr from-[#feda75] via-[#d62976] to-[#4f5bd5] text-white shadow-elev-1 mb-5">
            <Instagram className="h-7 w-7" />
          </span>
          <h2 className="font-display text-display-lg text-forest-900 mb-3">Follow Our Journey</h2>
          <p className="text-body-lg text-soil-700 max-w-xl">
            Sunlit mornings, tribal art, forest trails and starlit nights — a glimpse of everyday life at Surwahi.
          </p>
          <a
            href={IG_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 font-ui font-semibold text-clay-600 hover:text-clay-500 transition-colors"
          >
            {IG_HANDLE}
          </a>
        </div>

        {/* Carousel */}
        <div className="relative">
          {/* Arrows (desktop) */}
          <button
            type="button"
            onClick={() => scroll(-1)}
            aria-label="Previous posts"
            className="hidden md:flex absolute -left-4 top-1/2 -translate-y-1/2 z-20 w-11 h-11 items-center justify-center rounded-full bg-bone-0 text-forest-900 shadow-elev-2 hover:bg-white hover:scale-105 transition-all"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            type="button"
            onClick={() => scroll(1)}
            aria-label="Next posts"
            className="hidden md:flex absolute -right-4 top-1/2 -translate-y-1/2 z-20 w-11 h-11 items-center justify-center rounded-full bg-bone-0 text-forest-900 shadow-elev-2 hover:bg-white hover:scale-105 transition-all"
          >
            <ChevronRight className="h-5 w-5" />
          </button>

          {/* Track */}
          <div
            ref={trackRef}
            className="flex gap-4 sm:gap-5 overflow-x-auto snap-x snap-mandatory scroll-smooth pb-4 -mx-1 px-1 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
          >
            {posts.map((post, i) => (
              <a
                key={i}
                href={post.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`View on Instagram: ${post.caption}`}
                className="group relative shrink-0 snap-start w-[240px] sm:w-[280px] aspect-square rounded-card overflow-hidden shadow-elev-1 hover:shadow-elev-2 transition-shadow"
              >
                <Image
                  src={post.image}
                  alt={post.caption}
                  fill
                  sizes="(max-width: 640px) 240px, 280px"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                {/* Hover overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-forest-900/80 via-forest-900/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <Instagram className="absolute top-3 right-3 h-5 w-5 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 drop-shadow" />
                <p className="absolute bottom-0 left-0 right-0 p-4 text-sm font-medium text-bone-0 translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                  {post.caption}
                </p>
              </a>
            ))}
          </div>
        </div>

        {/* Follow CTA */}
        <div className="text-center mt-10">
          <a
            href={IG_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-ui font-semibold text-white bg-gradient-to-r from-[#feda75] via-[#d62976] to-[#4f5bd5] shadow-elev-1 hover:shadow-elev-2 hover:opacity-95 transition-all"
          >
            <Instagram className="h-5 w-5" />
            Follow on Instagram
          </a>
        </div>
      </div>
    </section>
  );
}
