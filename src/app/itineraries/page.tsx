import Link from 'next/link';
import Image from 'next/image';
import Breadcrumbs from '@/components/Breadcrumbs';
import { generatePageMetadata } from '@/lib/seo';
import { itineraries } from '@/lib/itineraries';

export const metadata = generatePageMetadata(
  'Itineraries',
  'Discover our curated itineraries for an unforgettable experience at Surwahi Social Ecoestate Kanha.',
  '/itineraries'
);

export default function ItinerariesPage() {
  return (
    <div className="pt-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <Breadcrumbs />
      </div>

      <section className="bg-sand-50 py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="font-display text-display-xl text-forest-900 mb-4">
            Our Curated Itineraries
          </h1>
          <p className="text-body-lg text-soil-700 max-w-2xl mx-auto">
            Discover the perfect blend of adventure, culture, and relaxation with our thoughtfully designed itineraries.
          </p>
        </div>
      </section>

      <section className="py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-8">
            {itineraries.map((itinerary) => (
              <Link href={`/itineraries/${itinerary.slug}`} key={itinerary.slug} className="group block bg-bone-0 rounded-card overflow-hidden shadow-elev-1 hover:shadow-elev-2 transition-all">
                <div className="aspect-[4/3] relative overflow-hidden">
                  <Image
                    src={itinerary.mainImage}
                    alt={itinerary.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3">
                    <span className="bg-moss-500 text-bone-0 px-2 py-1 rounded text-xs font-medium">
                      {itinerary.tag}
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="font-display text-2xl text-forest-900 mb-2 group-hover:text-moss-500 transition-colors">{itinerary.name}</h3>
                  <p className="text-soil-700 text-sm">{itinerary.subText}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
