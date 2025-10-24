import Image from 'next/image';
import { Check, Clock, Sun, Leaf } from 'lucide-react';
import Breadcrumbs from '@/components/Breadcrumbs';
import { generatePageMetadata } from '@/lib/seo';

export const metadata = generatePageMetadata(
  'Bird-watching Expeditions',
  'Discover the avian diversity of Surwahi with our specialized bird-watching tours.',
  '/experiences/bird-watching-expeditions'
);

const birdWatchingDetails = {
  title: 'Bird-watching Expeditions',
  description: 'With over 200 species of resident and migratory birds, Surwahi is a paradise for birdwatchers. Join our expert naturalists on an expedition to discover the vibrant avian life that thrives in our diverse habitats, from riverbanks to dense forests.',
  images: [
    { src: 'https://placehold.co/1200x800/A8BA9A/333333?text=Hornbill', alt: 'An Indian Grey Hornbill perched on a branch' },
    { src: 'https://placehold.co/800x600/A8BA9A/333333?text=Kingfisher', alt: 'A vibrant Kingfisher with its catch' },
    { src: 'https://placehold.co/800x600/A8BA9A/333333?text=Birdwatchers', alt: 'Guests on a birdwatching tour with binoculars' },
    { src: 'https://placehold.co/800x600/A8BA9A/333333?text=Owl', alt: 'A Mottled Wood Owl camouflaged in the trees' },
  ],
  keyHighlights: [
    'Explore diverse habitats: riverine, grassland, and forest ecosystems.',
    'Led by passionate and knowledgeable birding guides.',
    'High-quality binoculars and field guides provided.',
    'Opportunity to spot rare and endemic species.',
    'Contribute to our ongoing bird census and conservation efforts.',
  ],
  whatToExpect: 'Our expeditions are tailored to your level of interest, from casual watchers to serious ornithologists. We focus on ethical birding practices, ensuring minimal disturbance. The walks are typically slow-paced, allowing ample time for observation, photography, and learning about bird behaviour and calls.',
  seasonalHighlights: [
    { season: 'Winter (Nov-Feb)', highlight: 'Peak migratory season. Look for various species of ducks, geese, and raptors.', icon: Clock },
    { season: 'Summer (Mar-Jun)', highlight: 'Breeding season for many resident birds. Witness fascinating courtship displays.', icon: Sun },
    { season: 'Monsoon (Jul-Oct)', highlight: 'Lush landscapes and vibrant activity. Great for spotting species like the Indian Pitta.', icon: Leaf },
  ],
  commonSightings: ['Indian Roller', 'Black-hooded Oriole', 'Racket-tailed Drongo', 'Crested Serpent Eagle', 'White-throated Kingfisher', 'Malabar Pied Hornbill'],
};

export default function BirdWatchingPage() {
  return (
    <div className="pt-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <Breadcrumbs />
      </div>

      <section className="bg-sand-50 py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="font-display text-display-xl text-forest-900 mb-4">
            {birdWatchingDetails.title}
          </h1>
          <p className="text-body-lg text-soil-700 max-w-3xl mx-auto">
            {birdWatchingDetails.description}
          </p>
        </div>
      </section>

      {/* Image Gallery */}
      <section className="py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="col-span-2 row-span-2">
              <Image src={birdWatchingDetails.images[0].src} alt={birdWatchingDetails.images[0].alt} width={1200} height={800} className="rounded-lg object-cover w-full h-full" />
            </div>
            {birdWatchingDetails.images.slice(1).map((image, index) => (
              <div key={index}>
                <Image src={image.src} alt={image.alt} width={800} height={600} className="rounded-lg object-cover w-full h-full" />
              </div>
            ))}
          </div>
        </div>
      </section>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid lg:grid-cols-3 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <h2 className="font-display text-3xl text-forest-900 mb-6">Key Highlights</h2>
            <ul className="space-y-4 mb-8">
              {birdWatchingDetails.keyHighlights.map((highlight, index) => (
                <li key={index} className="flex items-start">
                  <Check className="h-6 w-6 text-fern-500 mr-3 flex-shrink-0 mt-1" />
                  <span className="text-lg text-soil-700">{highlight}</span>
                </li>
              ))}
            </ul>

            <h2 className="font-display text-3xl text-forest-900 mb-6">What to Expect</h2>
            <p className="text-lg text-soil-700 mb-8">{birdWatchingDetails.whatToExpect}</p>
            
            <div className="bg-sand-50 p-8 rounded-lg mb-8">
              <h3 className="font-display text-2xl text-forest-900 mb-6">Seasonal Highlights</h3>
              <div className="grid md:grid-cols-3 gap-6">
                {birdWatchingDetails.seasonalHighlights.map((season, index) => (
                  <div key={index} className="flex flex-col items-center text-center">
                    <season.icon className="h-10 w-10 text-moss-500 mb-3" />
                    <h4 className="font-semibold text-xl text-forest-800">{season.season}</h4>
                    <p className="text-sm text-soil-700">{season.highlight}</p>
                  </div>
                ))}
              </div>
            </div>

            <h3 className="font-display text-2xl text-forest-900 mb-4">Common Sightings</h3>
            <div className="flex flex-wrap gap-3">
              {birdWatchingDetails.commonSightings.map((bird, index) => (
                <span key={index} className="bg-fern-100 text-fern-800 text-sm font-medium px-3 py-1 rounded-full">{bird}</span>
              ))}
            </div>
          </div>

          {/* Booking Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <div className="bg-bone-0 p-6 rounded-lg shadow-lg">
                <h3 className="font-display text-xl text-forest-900 mb-4">Book a Birding Expedition</h3>
                <p className="text-soil-700 mb-4 text-sm">Join our naturalists for an unforgettable birding experience. Expeditions are best booked in advance.</p>
                <a href="/contact" className="btn btn-primary w-full">Inquire Now</a>
              </div>
              <div className="mt-6 text-center">
                <a href="/experiences" className="text-moss-600 hover:underline">Explore other experiences</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
