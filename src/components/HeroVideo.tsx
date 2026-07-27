'use client';

import { useEffect, useState } from 'react';

const VIMEO_ID = '1212571733';

/**
 * Video OVERLAY only (the hero image lives in page.tsx as a server-rendered
 * <Image priority> so it stays a clean, measurable LCP element).
 * The Vimeo iframe is heavy: never mounted on mobile (<768px) or with reduced
 * motion, and on desktop only mounted AFTER load, then faded in once playing.
 */
export default function HeroVideo() {
  const [enabled, setEnabled] = useState(false);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isDesktop = window.matchMedia('(min-width: 768px)').matches;
    if (reduce || !isDesktop) return; // mobile & reduced-motion: no video at all

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

  if (!enabled) return null;

  return (
    <div className="hidden md:block absolute inset-0 z-0 overflow-hidden pointer-events-none" aria-hidden="true">
      <iframe
        src={`https://player.vimeo.com/video/${VIMEO_ID}?background=1&autoplay=1&loop=1&muted=1&autopause=0&dnt=1`}
        title="Surwahi Social Ecoestate — a glimpse"
        allow="autoplay; fullscreen"
        tabIndex={-1}
        className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transition-opacity duration-1000 ${
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
    </div>
  );
}
