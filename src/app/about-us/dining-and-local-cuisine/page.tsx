import Image from 'next/image';
import { Leaf, Sun, Wheat, Fish } from 'lucide-react';
import Breadcrumbs from '@/components/Breadcrumbs';
import { generatePageMetadata } from '@/lib/seo';
import Link from 'next/link';

export const metadata = generatePageMetadata(
  'Dining & Local Cuisine',
  'Discover our farm-to-table dining experience and the flavors of local cuisine.',
  '/about-us/dining-and-local-cuisine'
);

const diningDetails = {
  title: 'Dining & Local Cuisine',
  intro: 'At Surwahi, dining is an experience that nourishes the body and soul. Our kitchen is a celebration of the land, serving fresh, seasonal, and locally sourced cuisine that tells the story of our region. We believe in the power of food to connect us to nature and to each other.',
  images: [
    { src: 'https://placehold.co/1200x800/A8BA9A/333333?text=Dining+Area', alt: 'The communal dining area with views of the forest' },
    { src: 'https://placehold.co/800x600/A8BA9A/333333?text=Farm-Fresh+Thali', alt: 'A vibrant and colorful thali made with fresh, local ingredients' },
    { src: 'https://placehold.co/800x600/A8BA9A/333333?text=Organic+Garden', alt: 'Our on-site organic garden, bustling with fresh vegetables' },
    { src: 'https://placehold.co/800x600/A8BA9A/333333?text=Local+Chef', alt: 'Our chef preparing a traditional dish with a smile' },
  ],
  philosophy: [
    {
      title: 'Farm-to-Table',
      description: 'The journey of our food is short and transparent. Most of our ingredients are harvested from our own organic gardens or sourced from local farmers within a 15km radius. This ensures freshness, supports the local economy, and reduces our carbon footprint.',
      icon: Leaf,
    },
    {
      title: 'Seasonal & Slow',
      description: 'Our menu changes with the seasons, reflecting the natural rhythms of the land. We practice slow cooking methods, using traditional techniques to enhance the natural flavors of the ingredients and preserve their nutritional value.',
      icon: Sun,
    },
    {
      title: 'Hyperlocal Cuisine',
      description: 'We specialize in the indigenous cuisine of the Baiga and Gond tribes, offering a unique culinary journey into the heart of Central India. Discover forgotten grains, wild edibles, and traditional recipes passed down through generations.',
      icon: Wheat,
    },
    {
      title: 'Zero-Waste Kitchen',
      description: 'We are committed to minimizing waste. Our kitchen follows a nose-to-tail, root-to-leaf philosophy. All food scraps are composted and returned to the soil, creating a closed-loop system that enriches our gardens.',
      icon: Fish,
    },
  ],
  sampleDishes: [
    'Baiga-style chicken curry with wild herbs',
    'Kodo millet khichdi with foraged greens',
    'Smoked baingan bharta with fresh-ground spices',
    'Mahua flower pancakes with local honey',
  ]
};

export default function DiningPage() {
  return (
    <div className="pt-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <Breadcrumbs />
      </div>

      <section className="bg-sand-50 py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="font-display text-display-xl text-forest-900 mb-4">
            {diningDetails.title}
          </h1>
          <p className="text-body-lg text-soil-700 max-w-3xl mx-auto">
            {diningDetails.intro}
          </p>
        </div>
      </section>

      {/* Image Gallery */}
      <section className="py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="col-span-2 row-span-2">
              <Image src={diningDetails.images[0].src} alt={diningDetails.images[0].alt} width={1200} height={800} className="rounded-lg object-cover w-full h-full" />
            </div>
            {diningDetails.images.slice(1).map((image, index) => (
              <div key={index}>
                <Image src={image.src} alt={image.alt} width={800} height={600} className="rounded-lg object-cover w-full h-full" />
              </div>
            ))}
          </div>
        </div>
      </section>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="font-display text-3xl text-forest-900 mb-6">Our Culinary Philosophy</h2>
            <div className="space-y-6">
              {diningDetails.philosophy.map((item, index) => (
                <div key={index} className="flex items-start">
                  <item.icon className="h-8 w-8 text-moss-500 mr-4 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold text-xl text-forest-800">{item.title}</h3>
                    <p className="text-soil-700">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="bg-sand-50 p-8 rounded-lg">
            <h3 className="font-display text-2xl text-forest-900 mb-6 text-center">A Taste of Surwahi</h3>
            <p className="text-soil-700 text-center mb-6">Our menu is a dynamic reflection of the day's harvest. Here are some of the experiences that await you:</p>
            <ul className="space-y-3">
              {diningDetails.sampleDishes.map((dish, index) => (
                <li key={index} className="flex items-center">
                  <Wheat className="h-5 w-5 text-fern-500 mr-3 flex-shrink-0" />
                  <span className="text-lg text-soil-700">{dish}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="text-center mt-16">
          <h3 className="font-display text-2xl text-forest-900 mb-4">Savor the Experience</h3>
          <p className="text-soil-700 max-w-2xl mx-auto mb-6">
            All meals are included for our resident guests. We invite you to our table to share stories, break bread, and create memories.
          </p>
          <Link href="/accommodations" className="btn btn-primary">
            Book Your Culinary Retreat
          </Link>
        </div>
      </div>
    </div>
  );
}
