import Breadcrumbs from '@/components/Breadcrumbs';
import { generatePageMetadata } from '@/lib/seo';
import Link from 'next/link';
import Image from 'next/image';

export const metadata = generatePageMetadata(
  'Sustainability at Surwahi',
  'Learn about our commitment to sustainability, including our innovative eco-friendly practices and alignment with UN SDGs.',
  '/sustainability'
);

const sustainabilityTopics = [
  {
    name: 'Evapo-Transpiration Toilets',
    href: '/sustainability/evapo-transpiration-toilets',
    imageUrl: 'https://placehold.co/600x400/A8BA9A/333333?text=ETT',
    description: 'Innovative water-saving sanitation.'
  },
  {
    name: 'Tree Census & Biodiversity Report',
    href: '/sustainability/tree-census-and-biodiversity-reports',
    imageUrl: 'https://placehold.co/600x400/A8BA9A/333333?text=Biodiversity',
    description: 'Understanding our local ecosystem.'
  },
  {
    name: 'Eco-Friendly Construction Practices',
    href: '/sustainability/eco-friendly-construction-practices',
    imageUrl: 'https://placehold.co/600x400/A8BA9A/333333?text=Eco-Construction',
    description: 'Building in harmony with nature.'
  },
  {
    name: 'Sustainable Development Goals (SDGs) Alignment',
    href: '/sustainability/sustainable-development-goals-alignment',
    imageUrl: 'https://placehold.co/600x400/A8BA9A/333333?text=SDGs',
    description: 'Our commitment to global goals.'
  }
];

export default function SustainabilityPage() {
  return (
    <div className="pt-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <Breadcrumbs />
      </div>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="font-display text-display-xl text-forest-900 mb-8 text-center">Our Sustainability Practices</h1>
        <p className="text-center text-body-lg text-soil-700 max-w-2xl mx-auto mb-12">
            We are deeply committed to pioneering and practicing a sustainable way of life, ensuring our footprint is light and our impact is positive.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
            {sustainabilityTopics.map((topic) => (
                <Link href={topic.href} key={topic.name} className="group block bg-bone-0 rounded-card overflow-hidden shadow-elev-1 hover:shadow-elev-2 transition-all">
                    <div className="aspect-w-4 aspect-h-3 relative overflow-hidden">
                        <Image
                            src={topic.imageUrl}
                            alt={topic.name}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                    </div>
                    <div className="p-6">
                        <h3 className="font-display text-2xl text-forest-900 mb-2">{topic.name}</h3>
                        <p className="text-soil-700 text-sm">{topic.description}</p>
                    </div>
                </Link>
            ))}
        </div>
      </div>
    </div>
  );
}
