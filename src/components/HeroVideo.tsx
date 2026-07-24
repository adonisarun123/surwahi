'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';

const VIMEO_ID = '1212571733';

interface HeroVideoProps {
  image: string;
  alt: string;
}

/**
 * Homepage hero background: shows the still image immediately, then fades in a
 * muted, looping Vimeo background video once it actually starts playing.
 * If the video never loads (offline / network issue) the image stays as the
 * fallback. Honors prefers-reduced-motion by keeping the still image only.
 */
export default function HeroVideo({ image, alt }: HeroVideoProps) {
  const [enabled, setEnabled] = useState(false); // becomes true only if motion is allowed
  const [playing, setPlaying] = useState(false);  // true once Vimeo reports playback

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    setEnabled(true);

    function onMessage(e: MessageEvent) {
      if (typeof e.origin !== 'string' || e.origin.indexOf('vimeo.com') === -1) return;
      let data: { event?: string; method?: string } | undefined;
      try {
        data = typeof e.data === 'string' ? JSON.parse(e.data) : e.data;
      } catch {
        return;
      }
      if (!data) return;
      // When the player is ready, subscribe to its play events.
      if (data.event === 'ready' && e.source) {
        const w = e.source as Window;
        w.postMessage(JSON.stringify({ method: 'addEventListener', value: 'play' }), '*');
        w.postMessage(JSON.stringify({ method: 'addEventListener', value: 'playing' }), '*');
      }
      if (data.event === 'play' || data.event === 'playing') setPlaying(true);
    }

    window.addEventListener('message', onMessage);
    return () => window.removeEventListener('message', onMessage);
  }, []);

  return (
    <div className="absolute inset-0 z-0 overflow-hidden bg-forest-900">
      {/* Still image — always rendered; the fallback and the "until loaded" state */}
      <Image src={image} alt={alt} fill className="object-cover" priority />

      {/* Vimeo background video — mounts only when motion is allowed, fades in on play */}
      {enabled && (
        <iframe
          src={`https://player.vimeo.com/video/${VIMEO_ID}?background=1&autoplay=1&loop=1&muted=1&autopause=0&dnt=1`}
          title="Surwahi Social Ecoestate — a glimpse"
          allow="autoplay; fullscreen"
          aria-hidden="true"
          tabIndex={-1}
          onLoad={() => {
            // Backstop: if the player loaded but the play event was missed,
            // reveal after a short delay. Never fires if the network failed.
            window.setTimeout(() => setPlaying(true), 3000);
          }}
          className={`pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transition-opacity duration-1000 ${
            playing ? 'opacity-100' : 'opacity-0'
          }`}
          style={{ width: '100vw', height: '56.25vw', minWidth: '177.78vh', minHeight: '100vh' }}
        />
      )}
    </div>
  );
}
