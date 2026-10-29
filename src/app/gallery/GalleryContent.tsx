'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Camera, Video } from 'lucide-react';
import Breadcrumbs from '@/components/Breadcrumbs';
import PageHero from '@/components/PageHero';
import { galleryImages } from '@/lib/images';
// We will use a client component for the gallery, so we can't use generatePageMetadata here
// SEO metadata can be set in a parent layout or a separate metadata export if needed.

type GalleryImage = { src: string; alt: string; category: string };
type GalleryVideo = { title: string; youtubeUrl: string; thumbnailUrl?: string };

function youtubeThumb(url: string) {
  const id = url.match(/(?:v=|youtu\.be\/|shorts\/|embed\/)([\w-]{11})/)?.[1];
  return id ? `https://i.ytimg.com/vi/${id}/hqdefault.jpg` : undefined;
}

export default function GalleryContent({ images: allImages, videos }: { images: GalleryImage[]; videos: GalleryVideo[] }) {
  const categories = ['All', ...Array.from(new Set(allImages.map(img => img.category)))];
  const [filter, setFilter] = useState('All');

  const filteredImages = filter === 'All'
    ? allImages
    : allImages.filter(image => image.category === filter);

  return (
    <div className="pt-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <Breadcrumbs />
      </div>

      <PageHero
        title="Gallery"
        subtitle="A visual journey through the experiences, landscapes, and life at Surwahi Social Ecoestate. Explore the beauty that awaits you."
        image={galleryImages.lodgeExterior}
      />

      {/* Photo Gallery */}
      <section id="photo-gallery" className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-display text-3xl text-forest-900 mb-8 text-center flex items-center justify-center">
            <Camera className="h-8 w-8 mr-3 text-moss-500" />
            Photo Gallery
          </h2>

          <div className="flex justify-center flex-wrap gap-2 mb-8">
            {categories.map(category => (
              <button
                key={category}
                onClick={() => setFilter(category)}
                className={`px-4 py-2 text-sm font-medium rounded-full transition-colors ${filter === category
                  ? 'bg-forest-700 text-white'
                  : 'bg-sand-50 text-forest-700 hover:bg-mist-200'
                  }`}
              >
                {category}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {filteredImages.map((image, index) => (
              <div key={index} className="group relative aspect-square overflow-hidden rounded-lg">
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/20 flex items-end p-4 opacity-0 group-hover:opacity-100 transition-opacity">
                  <p className="text-white text-sm">{image.alt}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Video Stories - only shown when real videos are added in /admin */}
      {videos.length > 0 && (
      <section id="video-stories" className="bg-sand-50 py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-display text-3xl text-forest-900 mb-8 text-center flex items-center justify-center">
            <Video className="h-8 w-8 mr-3 text-moss-500" />
            Video Stories
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {videos.map(video => (
              <a key={video.youtubeUrl} href={video.youtubeUrl} target="_blank" rel="noopener noreferrer" className="group block">
                <div className="relative aspect-video overflow-hidden rounded-lg shadow-lg">
                  <Image
                    src={video.thumbnailUrl || youtubeThumb(video.youtubeUrl) || galleryImages.lodgeExterior}
                    alt={video.title}
                    fill
                    className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                    <Video className="h-12 w-12 text-white/80" />
                  </div>
                </div>
                <h3 className="font-semibold text-lg text-forest-900 mt-4">{video.title}</h3>
              </a>
            ))}
          </div>
        </div>
      </section>
      )}
    </div>
  );
}
