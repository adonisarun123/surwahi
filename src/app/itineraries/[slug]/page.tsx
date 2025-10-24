import { notFound } from 'next/navigation';
import Image from 'next/image';

import { itineraries } from '@/lib/itineraries';
import { generatePageMetadata } from '@/lib/seo';
import Breadcrumbs from '@/components/Breadcrumbs';
import ContactForm from '@/components/ContactForm';

export async function generateStaticParams() {
  return itineraries.map((itinerary) => ({
    slug: itinerary.slug,
  }));
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const itinerary = itineraries.find(p => p.slug === params.slug);

  if (!itinerary) {
    return {
      title: 'Itinerary Not Found',
      description: 'The requested itinerary could not be found.'
    };
  }

  return generatePageMetadata(itinerary.title, itinerary.metaDescription, `/itineraries/${itinerary.slug}`);
}


export default function ItineraryPage({ params }: { params: { slug: string } }) {
  const itinerary = itineraries.find(p => p.slug === params.slug);

  if (!itinerary) {
    notFound();
  }

  return (
    <div className="pt-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <Breadcrumbs />
      </div>

      {/* Hero */}
      <section className="relative h-96">
        <Image
          src={itinerary.mainImage}
          alt={itinerary.title}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <span className="bg-moss-500 text-bone-0 px-3 py-1 rounded-full text-sm font-medium mb-2 inline-block">
              {itinerary.tag}
            </span>
            <h1 className="font-display text-display-lg">{itinerary.title}</h1>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid lg:grid-cols-3 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <div className="prose prose-lg max-w-none">
              <p className="lead">{itinerary.summary}</p>
            </div>

            <div className="mt-12">
              <h2 className="font-display text-3xl text-forest-900 mb-6">Daily Plan</h2>
              <div className="space-y-8 border-l-2 border-mist-200 ml-4">
                {itinerary.days.map((day) => (
                  <div key={day.day} className="relative pl-8">
                    <div className="absolute -left-4 top-2 h-8 w-8 bg-moss-500 rounded-full text-white flex items-center justify-center font-bold">
                      {day.day}
                    </div>
                    <h3 className="font-display text-2xl text-forest-800 mb-2">{day.title}</h3>
                    <div className="prose" dangerouslySetInnerHTML={{ __html: day.description }} />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <ContactForm subject={`Inquiry about ${itinerary.title}`} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
