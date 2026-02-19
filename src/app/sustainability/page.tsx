import Breadcrumbs from '@/components/Breadcrumbs';
import { generatePageMetadata } from '@/lib/seo';
import Link from 'next/link';
import Image from 'next/image';
import { sustainabilityImages } from '@/lib/images';

export const metadata = generatePageMetadata(
  'Sustainability at Surwahi',
  'Learn about our commitment to sustainability, including our innovative eco-friendly practices and alignment with UN SDGs.',
  '/sustainability',
  undefined,
  ['Sustainability Kanha', 'Eco Tourism India', 'Green Practices', 'Sustainable Lodge', 'Carbon Neutral Travel']
);

const sustainabilityTopics = [
  {
    name: 'Evapo-Transpiration Toilets',
    href: '/sustainability/evapo-transpiration-toilets',
    imageUrl: sustainabilityImages.evapotranspirationToilets,
    description: 'Innovative water-saving sanitation.'
  },
  {
    name: 'Tree Census & Biodiversity Report',
    href: '/sustainability/tree-census-and-biodiversity-reports',
    imageUrl: sustainabilityImages.treeCensus,
    description: 'Understanding our local ecosystem.'
  },
  {
    name: 'Eco-Friendly Construction Practices',
    href: '/sustainability/eco-friendly-construction-practices',
    imageUrl: sustainabilityImages.ecoConstruction,
    description: 'Building in harmony with nature.'
  },
  {
    name: 'Sustainable Development Goals (SDGs) Alignment',
    href: '/sustainability/sdg-alignment',
    imageUrl: sustainabilityImages.sdgAlignment,
    description: 'Our commitment to global goals.'
  }
];

import { Trees, Sun, Recycle, Users, Globe } from 'lucide-react';

const impactMetrics = [
  { number: "500+", label: "Trees in Census", icon: Trees },
  { number: "100%", label: "Solar Powered", icon: Sun },
  { number: "Zero", label: "Waste to Landfill", icon: Recycle },
  { number: "30+", label: "Local Jobs Created", icon: Users },
  { number: "4", label: "UN SDGs Aligned", icon: Globe },
];

export default function SustainabilityPage() {
  return (
    <div className="pt-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <Breadcrumbs />
      </div>

      {/* Impact Metrics Hero */}
      <section className="bg-moss-900 text-white py-16 mb-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="font-display text-display-xl mb-4 text-center">Sustainability at Surwahi</h1>
          <p className="text-center text-moss-100 mb-12 max-w-2xl mx-auto text-lg">
            Sustainability isn&apos;t a feature — it&apos;s our foundation. Every decision at Surwahi
            is made with the earth, the community, and future generations in mind.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-8 max-w-5xl mx-auto">
            {impactMetrics.map((m) => (
              <div key={m.label} className="text-center">
                <div className="flex justify-center mb-3">
                  <m.icon className="hidden md:block h-6 w-6 text-moss-300" />
                </div>
                <div className="text-3xl md:text-4xl font-bold mb-1 text-white">{m.number}</div>
                <div className="text-sm text-moss-200 uppercase tracking-wider font-medium">{m.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h2 className="font-display text-3xl text-forest-900 mb-8 text-center">Our Core Initiatives</h2>
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
