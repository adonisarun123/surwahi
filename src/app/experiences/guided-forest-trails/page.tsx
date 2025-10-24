import Image from 'next/image';
import { Check, Clock, Sun, Users, Mountain, Leaf } from 'lucide-react';
import Breadcrumbs from '@/components/Breadcrumbs';
import { generatePageMetadata } from '@/lib/seo';
import BookingWidget from '@/components/BookingWidget';

export const metadata = generatePageMetadata(
  'Guided Forest Trails',
  'Explore the rich biodiversity of the forest with our expert guides.',
  '/experiences/guided-forest-trails'
);

const trailDetails = {
  title: 'Guided Forest Trails',
  description: 'Step into the living classroom of the forest. Our guided trails, led by resident naturalists, are a journey of discovery, revealing the intricate connections of the ecosystem, from the smallest insects to ancient trees.',
  images: [
    { src: 'https://placehold.co/1200x800/A8BA9A/333333?text=Forest+Trail', alt: 'A winding trail through a dense, sunlit forest' },
    { src: 'https://placehold.co/800x600/A8BA9A/333333?text=Naturalist+Guide', alt: 'A naturalist guide pointing out flora to guests' },
    { src: 'https://placehold.co/800x600/A8BA9A/333333?text=Unique+Flora', alt: 'Close-up of a unique flower found on the trail' },
    { src: 'https://placehold.co/800x600/A8BA9A/333333?text=Animal+Tracks', alt: 'Animal tracks imprinted on the muddy forest floor' },
  ],
  keyHighlights: [
    'Learn to identify medicinal plants, animal tracks, and bird calls.',
    'Trails tailored to different interests and fitness levels (easy, moderate).',
    'Gain a deeper appreciation for the forest\'s biodiversity.',
    'Perfect for mindful walks and nature photography.',
    'Safe and educational experience for all ages.',
  ],
  whatToExpect: 'Your naturalist guide will equip you with a new way of seeing the forest. You\'ll learn the stories of the trees, the language of the birds, and the secrets of the undergrowth. These walks are slow-paced, focusing on observation and learning. Comfortable walking shoes and a curious mind are all you need.',
  trails: [
    { name: 'Herbal Walk', duration: '1.5 Hours', difficulty: 'Easy', focus: 'Medicinal plants and their traditional uses.', icon: Leaf },
    { name: 'Riverine Trail', duration: '2 Hours', difficulty: 'Easy', focus: 'Ecosystem of the river banks, birdwatching.', icon: Mountain },
    { name: 'Woodland Exploration', duration: '3 Hours', difficulty: 'Moderate', focus: 'Deeper forest exploration, animal tracking.', icon: Users },
  ],
  bestSuitedFor: {
    text: 'Nature lovers, curious minds, families, and those seeking a peaceful, educational experience.',
    icon: Users,
  },
};

export default function GuidedForestTrailsPage() {
  return (
    <div className="pt-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <Breadcrumbs />
      </div>

      <section className="bg-sand-50 py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="font-display text-display-xl text-forest-900 mb-4">
            {trailDetails.title}
          </h1>
          <p className="text-body-lg text-soil-700 max-w-3xl mx-auto">
            {trailDetails.description}
          </p>
        </div>
      </section>

      {/* Image Gallery */}
      <section className="py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="col-span-2 row-span-2">
              <Image src={trailDetails.images[0].src} alt={trailDetails.images[0].alt} width={1200} height={800} className="rounded-lg object-cover w-full h-full" />
            </div>
            {trailDetails.images.slice(1).map((image, index) => (
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
              {trailDetails.keyHighlights.map((highlight, index) => (
                <li key={index} className="flex items-start">
                  <Check className="h-6 w-6 text-fern-500 mr-3 flex-shrink-0 mt-1" />
                  <span className="text-lg text-soil-700">{highlight}</span>
                </li>
              ))}
            </ul>

            <h2 className="font-display text-3xl text-forest-900 mb-6">What to Expect</h2>
            <p className="text-lg text-soil-700 mb-8">{trailDetails.whatToExpect}</p>
            
            <div className="bg-sand-50 p-8 rounded-lg">
              <h3 className="font-display text-2xl text-forest-900 mb-6">Our Signature Trails</h3>
              <div className="space-y-6">
                {trailDetails.trails.map((trail, index) => (
                  <div key={index} className="flex items-start">
                    <trail.icon className="h-8 w-8 text-moss-500 mr-4 flex-shrink-0 mt-1" />
                    <div>
                      <h4 className="font-semibold text-xl text-forest-800">{trail.name}</h4>
                      <p className="text-soil-700 mb-1">{trail.duration} | {trail.difficulty}</p>
                      <p className="text-sm text-soil-700">{trail.focus}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Booking Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <div className="bg-bone-0 p-6 rounded-lg shadow-lg">
                <h3 className="font-display text-xl text-forest-900 mb-4">Book a Guided Walk</h3>
                <p className="text-soil-700 mb-4 text-sm">Our guided walks are complimentary for all resident guests. Please contact the reception to schedule your walk.</p>
                <a href="/contact" className="btn btn-primary w-full">Contact Us</a>
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
