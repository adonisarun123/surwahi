import Breadcrumbs from '@/components/Breadcrumbs';
import { generatePageMetadata } from '@/lib/seo';
import Link from 'next/link';
import Image from 'next/image';

import { workshopGroups } from '@/lib/data';
import { ArrowRight } from 'lucide-react';

export const metadata = generatePageMetadata(
  'Workshops & Learning',
  'Engage in hands-on workshops and learning experiences, from pottery and tribal art to stargazing and eco-construction.',
  '/workshops',
  undefined,
  ['Workshops Kanha', 'Skill Learning', 'Nature Workshops', 'Sustainable Living Workshops', 'Art Workshops India']
);

export default function WorkshopsPage() {
  return (
    <div className="pt-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <Breadcrumbs />
      </div>

      <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
        <h1 className="font-display text-display-xl text-forest-900 mb-6">Workshops & Learning</h1>
        <p className="text-body-lg text-soil-700 max-w-2xl mx-auto mb-16">
          Immerse yourself in hands-on learning experiences that connect you with nature, culture, and new skills.
        </p>

        <div className="space-y-20">
          {workshopGroups.map((group) => (
            <div key={group.category} className="text-left">
              <div className="flex items-end justify-between border-b border-stone-200 pb-4 mb-8">
                <div>
                  <h2 className="font-display text-3xl text-forest-900 mb-2">{group.category}</h2>
                  <p className="text-soil-600">{group.description}</p>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {group.items.map((workshop) => (
                  <Link href={workshop.href} key={workshop.name} className="group block bg-bone-0 rounded-card overflow-hidden shadow-elev-1 hover:shadow-elev-2 transition-all">
                    <div className="aspect-w-4 aspect-h-3 relative overflow-hidden">
                      <Image
                        src={workshop.imageUrl}
                        alt={`${workshop.name} at Surwahi`}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                    <div className="p-6">
                      <h3 className="font-display text-xl text-forest-900 mb-2 group-hover:text-moss-700 transition-colors">{workshop.name}</h3>
                      <p className="text-soil-700 text-sm mb-4">{workshop.description}</p>
                      <span className="inline-flex items-center text-moss-600 text-sm font-medium group-hover:translate-x-1 transition-transform">
                        Explore <ArrowRight className="ml-1 h-4 w-4" />
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

