'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Camera, Video } from 'lucide-react';
import Breadcrumbs from '@/components/Breadcrumbs';
// We will use a client component for the gallery, so we can't use generatePageMetadata here
// SEO metadata can be set in a parent layout or a separate metadata export if needed.

const allImages = [
  { src: 'https://placehold.co/800x600/A8BA9A/333333?text=Lodge+Exterior', alt: 'The beautiful exterior of the eco-lodge', category: 'Lodge & Architecture' },
  { src: 'https://placehold.co/800x600/A8BA9A/333333?text=River+Suite', alt: 'Interior of the River View Suite', category: 'Lodge & Architecture' },
  { src: 'https://placehold.co/800x600/A8BA9A/333333?text=Hornbill', alt: 'A Malabar Pied Hornbill perched on a branch', category: 'Flora & Fauna' },
  { src: 'https://placehold.co/800x600/A8BA9A/333333?text=Tiger+Safari', alt: 'A tiger spotted during a wildlife safari', category: 'Experiences' },
  { src: 'https://placehold.co/800x600/A8BA9A/333333?text=Dining+Experience', alt: 'A beautifully prepared farm-to-table meal', category: 'Cuisine' },
  { src: 'https://placehold.co/800x600/A8BA9A/333333?text=Forest+Trail', alt: 'A serene trail winding through the forest', category: 'Experiences' },
  { src: 'https://placehold.co/800x600/A8BA9A/333333?text=Common+Area', alt: 'The cozy common area of the lodge', category: 'Lodge & Architecture' },
  { src: 'https://placehold.co/800x600/A8BA9A/333333?text=Wild+Mushrooms', alt: 'A cluster of wild mushrooms on the forest floor', category: 'Flora & Fauna' },
  { src: 'https://placehold.co/800x600/A8BA9A/333333?text=Gond+Art', alt: 'A guest learning Gond art from a local artist', category: 'Experiences' },
  { src: 'https://placehold.co/800x600/A8BA9A/333333?text=Organic+Farm', alt: 'Fresh vegetables growing in the organic farm', category: 'Cuisine' },
  { src: 'https://placehold.co/800x600/A8BA9A/333333?text=Starry+Night', alt: 'The Milky Way visible in the clear night sky', category: 'Experiences' },
  { src: 'https://placehold.co/800x600/A8BA9A/333333?text=Earthen+Pottery', alt: 'Hands shaping a pot on a pottery wheel', category: 'Experiences' },
];

const videos = [
  { id: '1', title: 'A Glimpse into Surwahi Social', thumbnailUrl: 'https://placehold.co/800x450/A8BA9A/333333?text=Surwahi+Intro+Video', videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ' },
  { id: '2', title: 'The Making of an Eco-Lodge', thumbnailUrl: 'https://placehold.co/800x450/A8BA9A/333333?text=Construction+Video', videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ' },
  { id: '3', title: 'Voices from the Community', thumbnailUrl: 'https://placehold.co/800x450/A8BA9A/333333?text=Community+Video', videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ' },
];

const categories = ['All', ...Array.from(new Set(allImages.map(img => img.category)))];

export default function GalleryPage() {
  const [filter, setFilter] = useState('All');

  const filteredImages = filter === 'All'
    ? allImages
    : allImages.filter(image => image.category === filter);

  return (
    <div className="pt-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <Breadcrumbs />
      </div>

      <section className="bg-sand-50 py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="font-display text-display-xl text-forest-900 mb-4">
                Gallery
            </h1>
            <p className="text-body-lg text-soil-700 max-w-3xl mx-auto">
                A visual journey through the experiences, landscapes, and life at Surwahi Social. Explore the beauty that awaits you.
            </p>
        </div>
      </section>

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
                className={`px-4 py-2 text-sm font-medium rounded-full transition-colors ${
                  filter === category
                    ? 'bg-forest-700 text-white'
                    : 'bg-sand-100 text-forest-800 hover:bg-sand-200'
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
      
      {/* Video Stories */}
      <section id="video-stories" className="bg-sand-50 py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-display text-3xl text-forest-900 mb-8 text-center flex items-center justify-center">
            <Video className="h-8 w-8 mr-3 text-moss-500" />
            Video Stories
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {videos.map(video => (
              <a key={video.id} href={video.videoUrl} target="_blank" rel="noopener noreferrer" className="group block">
                <div className="relative aspect-video overflow-hidden rounded-lg shadow-lg">
                  <Image
                    src={video.thumbnailUrl}
                    alt={video.title}
                    fill
                    className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                    <Video className="h-12 w-12 text-white/80" />
                  </div>
                </div>
                <h3 className="font-semibold text-lg text-forest-800 mt-4">{video.title}</h3>
              </a>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
