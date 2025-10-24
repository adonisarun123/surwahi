import Link from 'next/link';
import Image from 'next/image';
import Breadcrumbs from '@/components/Breadcrumbs';
import { generatePageMetadata } from '@/lib/seo';

export const metadata = generatePageMetadata(
  'Our Eco Accommodations',
  'Explore our range of sustainable stays, from luxurious suites to communal dormitories and adventurous camping tents.',
  '/accommodations'
);

const categories = [
  { 
    name: 'Suites', 
    description: 'Luxurious and private, our suites offer the perfect blend of comfort and nature.',
    imageUrl: 'https://placehold.co/800x600/A8BA9A/333333?text=Suites',
    slug: 'suites'
  },
  { 
    name: 'Dormitory', 
    description: 'Affordable and social, our dormitory is ideal for solo travelers and groups.',
    imageUrl: 'https://placehold.co/800x600/A8BA9A/333333?text=Dormitory',
    slug: 'dormitory'
  },
  { 
    name: 'Camping Tents', 
    description: 'Immerse yourself in nature with our comfortable and well-equipped safari tents.',
    imageUrl: 'https://placehold.co/800x600/A8BA9A/333333?text=Camping+Tents',
    slug: 'camping-tents'
  }
];

export default function AccommodationsPage() {
  return (
    <div className="pt-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <Breadcrumbs />
      </div>

      <section className="bg-sand-50 py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="font-display text-display-xl text-forest-900 mb-4">
            Our Accommodations
          </h1>
          <p className="text-body-lg text-soil-700 max-w-2xl mx-auto">
            We offer a variety of unique, eco-conscious accommodations designed to connect you with nature.
          </p>
        </div>
      </section>

      <section className="py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {categories.map((category) => (
              <Link href={`/accommodations/${category.slug}`} key={category.name} className="group block bg-bone-0 rounded-card overflow-hidden shadow-elev-1 hover:shadow-elev-2 transition-all">
                <div className="aspect-w-4 aspect-h-3 relative overflow-hidden">
                  <Image
                    src={category.imageUrl}
                    alt={category.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-6">
                  <h3 className="font-display text-2xl text-forest-900 mb-2">{category.name}</h3>
                  <p className="text-soil-700 text-sm">{category.description}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
