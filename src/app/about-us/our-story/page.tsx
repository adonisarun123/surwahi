import Image from 'next/image';
import Breadcrumbs from '@/components/Breadcrumbs';
import { generatePageMetadata } from '@/lib/seo';

export const metadata = generatePageMetadata(
  'Our Story',
  'The journey of how Surwahi Social was born from a dream of sustainable, community-centric tourism.',
  '/about-us/our-story'
);

const ourStoryDetails = {
  title: 'Our Story: A Dream Takes Root',
  description: 'Surwahi Social is more than just an eco-lodge; it is the culmination of a lifelong dream and a deep-seated belief in the power of tourism to be a force for good. It is a story of passion, perseverance, and partnership with the land and its people.',
  images: [
    { src: 'https://placehold.co/1200x800/A8BA9A/333333?text=Founders+Vision', alt: 'The founders overlooking the land, envisioning the project' },
    { src: 'https://placehold.co/800x600/A8BA9A/333333?text=Early+Construction', alt: 'The early days of construction, using local materials and techniques' },
    { src: 'https://placehold.co/800x600/A8BA9A/333333?text=Community+Meeting', alt: 'A meeting with the local community to discuss the project' },
    { src: 'https://placehold.co/800x600/A8BA9A/333333?text=Lodge+Today', alt: 'A beautiful shot of the completed lodge in harmony with nature' },
  ],
  sections: [
    {
      title: 'The Spark of an Idea',
      content: 'Our founders, driven by a love for wildlife and a concern for the environmental impact of conventional tourism, envisioned a different kind of hospitality. They dreamed of a place where guests could experience the magic of the wild, not as passive observers, but as active participants in its conservation. The search for the perfect location led them to this beautiful patch of land on the edge of Kanha National Park, a place that was both serene and in need of healing.',
    },
    {
      title: 'Building with a Conscience',
      content: 'From the very beginning, the principle was to build with, not on, the land. The construction of Surwahi was a labor of love, employing local artisans and reviving traditional, eco-friendly building techniques. Every brick made of mud, every piece of reclaimed wood, and every drop of harvested rainwater tells a story of our commitment to sustainability. We chose to build slowly, thoughtfully, and in constant dialogue with the local ecosystem.',
    },
    {
      title: 'Growing with the Community',
      content: 'Our story is inextricably linked with the story of the local community. We believe that true sustainability is a three-legged stool: ecological, economic, and social. We have actively partnered with the surrounding villages, creating livelihoods, fostering local enterprises, and ensuring that the benefits of tourism are shared equitably. Surwahi is not just our creation; it is a co-creation with the community that has embraced our vision.',
    },
    {
      title: 'An Evolving Dream',
      content: 'Today, Surwahi Social stands as a testament to the idea that a more beautiful, just, and sustainable world is possible. But our story is far from over. It is an evolving dream, a living laboratory for regeneration, and a continuous journey of learning and growing. We invite you to be a part of our story, to experience our vision firsthand, and to join us in writing the next chapter.',
    },
  ],
};

export default function OurStoryPage() {
  return (
    <div className="pt-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <Breadcrumbs />
      </div>

      <section className="bg-sand-50 py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="font-display text-display-xl text-forest-900 mb-4">
            {ourStoryDetails.title}
          </h1>
          <p className="text-body-lg text-soil-700 max-w-3xl mx-auto">
            {ourStoryDetails.description}
          </p>
        </div>
      </section>

      {/* Image Gallery */}
      <section className="py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="col-span-2 row-span-2">
              <Image src={ourStoryDetails.images[0].src} alt={ourStoryDetails.images[0].alt} width={1200} height={800} className="rounded-lg object-cover w-full h-full" />
            </div>
            {ourStoryDetails.images.slice(1).map((image, index) => (
              <div key={index}>
                <Image src={image.src} alt={image.alt} width={800} height={600} className="rounded-lg object-cover w-full h-full" />
              </div>
            ))}
          </div>
        </div>
      </section>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="max-w-3xl mx-auto">
          <div className="space-y-10">
            {ourStoryDetails.sections.map((section, index) => (
              <div key={index}>
                <h2 className="font-display text-3xl text-forest-900 mb-4">{section.title}</h2>
                <p className="text-lg text-soil-700 leading-relaxed">{section.content}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
