'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';

const VIMEO_ID = '1212571733';

// Tiny blurred preview of the hero image, applied as a CSS background on the
// CONTAINER (not the <img>) so it paints instantly for a no-blank first render
// WITHOUT interfering with the real image's Largest Contentful Paint measurement.
const BLUR =
  'data:image/jpeg;base64,/9j/2wBDABIMDRANCxIQDhAUExIVGywdGxgYGzYnKSAsQDlEQz85Pj1HUGZXR0thTT0+WXlaYWltcnNyRVV9hnxvhWZwcm7/2wBDARMUFBsXGzQdHTRuST5Jbm5ubm5ubm5ubm5ubm5ubm5ubm5ubm5ubm5ubm5ubm5ubm5ubm5ubm5ubm5ubm5ubm7/wAARCAAQABwDASIAAhEBAxEB/8QAFwABAAMAAAAAAAAAAAAAAAAAAwABAv/EABgQAQEBAQEAAAAAAAAAAAAAAAABAhES/8QAFgEBAQEAAAAAAAAAAAAAAAAAAgEE/8QAFREBAQAAAAAAAAAAAAAAAAAAAAH/2gAMAwEAAhEDEQA/AA6uaH1JWGCaaa9BlJCV/9k=';

interface HeroVideoProps {
  image: string;
  alt: string;
}

/**
 * Homepage hero background.
 * - The <Image> is a clean `priority` image => it is the measurable LCP element.
 * - The blur preview is a CSS background on the CONTAINER (instant paint, no blank),
 *   so it does NOT alter the <img> and break LCP (which `placeholder="blur"` did).
 * - The Vimeo iframe is HEAVY: never loaded on mobile (< 768px) or with reduced
 *   motion, and on desktop only mounted AFTER load so it can't block first paint.
 */
export default function HeroVideo({ image, alt }: HeroVideoProps) {
  const [enabled, setEnabled] = useState(false); // desktop + after-load only
  const [playing, setPlaying] = useState(false);  // true once Vimeo reports playback

  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isDesktop = window.matchMedia('(min-width: 768px)').matches;
    if (reduce || !isDesktop) return; // mobile & reduced-motion: static image only

    function onMessage(e: MessageEvent) {
      if (typeof e.origin !== 'string' || e.origin.indexOf('vimeo.com') === -1) return;
      let data: { event?: string; method?: string } | undefined;
      try {
        data = typeof e.data === 'string' ? JSON.parse(e.data) : e.data;
      } catch {
        return;
      }
      if (!data) return;
      if (data.event === 'ready' && e.source) {
        const w = e.source as Window;
        w.postMessage(JSON.stringify({ method: 'addEventListener', value: 'play' }), '*');
        w.postMessage(JSON.stringify({ method: 'addEventListener', value: 'playing' }), '*');
      }
      if (data.event === 'play' || data.event === 'playing') setPlaying(true);
    }
    window.addEventListener('message', onMessage);

    const enable = () => {
      const ric = (window as typeof window & {
        requestIdleCallback?: (cb: () => void) => number;
      }).requestIdleCallback;
      if (ric) ric(() => setEnabled(true));
      else window.setTimeout(() => setEnabled(true), 200);
    };
    if (document.readyState === 'complete') enable();
    else window.addEventListener('load', enable, { once: true });

    return () => {
      window.removeEventListener('message', onMessage);
      window.removeEventListener('load', enable);
    };
  }, []);

  return (
    <div
      className="absolute inset-0 z-0 overflow-hidden bg-forest-900"
      style={{ backgroundImage: `url("${BLUR}")`, backgroundSize: 'cover', backgroundPosition: 'center' }}
    >
      {/* Clean priority image — the LCP element (no blur placeholder on the <img>). */}
      <Image src={image} alt={alt} fill priority sizes="100vw" className="object-cover" />

      {/* Vimeo background video — desktop only, mounted after load, fades in on play */}
      {enabled && (
        <iframe
          src={`https://player.vimeo.com/video/${VIMEO_ID}?background=1&autoplay=1&loop=1&muted=1&autopause=0&dnt=1`}
          title="Surwahi Social Ecoestate — a glimpse"
          allow="autoplay; fullscreen"
          aria-hidden="true"
          tabIndex={-1}
          className={`pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transition-opacity duration-1000 ${
            playing ? 'opacity-100' : 'opacity-0'
          }`}
          style={{
            width: '100vw',
            height: '56.25vw',
            minWidth: '177.78vh',
            minHeight: '100vh',
            filter: 'brightness(1.08) saturate(1.08)',
          }}
        />
      )}
    </div>
  );
}
