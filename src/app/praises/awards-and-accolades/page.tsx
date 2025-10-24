import Image from 'next/image';
import { Trophy, Star } from 'lucide-react';
import Breadcrumbs from '@/components/Breadcrumbs';
import { generatePageMetadata } from '@/lib/seo';

export const metadata = generatePageMetadata(
  'Awards & Accolades',
  'We are humbled and honored by the recognition we have received for our commitment to sustainable tourism.',
  '/praises/awards-and-accolades'
);

const awardsDetails = {
  title: 'Awards & Accolades',
  description: 'Our journey towards creating a model for sustainable and responsible tourism has been recognized by esteemed organizations. These accolades motivate us to continue our work with greater passion and dedication.',
  images: [
    { src: 'https://placehold.co/1200x800/A8BA9A/333333?text=Award+Ceremony', alt: 'Receiving an award at a formal ceremony' },
    { src: 'https://placehold.co/800x600/A8BA9A/333333?text=Award+Trophy', alt: 'A close-up of a prestigious award trophy' },
    { src: 'https://placehold.co/800x600/A8BA9A/333333?text=Team+Celebration', alt: 'The Surwahi team celebrating an achievement' },
    { src: 'https://placehold.co/800x600/A8BA9A/333333?text=Certificate+of+Excellence', alt: 'A certificate of excellence on display' },
  ],
  awards: [
    {
      title: 'John Wakefield Memorial Award 2024',
      by: 'TOFTigers',
      category: 'Most Inspirational Eco Lodge of the Year',
      description: 'This prestigious award recognizes our innovative approach to sustainability, community engagement, and creating an inspiring model for eco-tourism in India.',
      icon: Trophy,
    },
    {
      title: 'Eco-Friendly Homestay Certification',
      by: 'Madhya Pradesh Tourism Board',
      category: 'Gold Category',
      description: 'Awarded after a rigorous audit of our sustainable practices, this certification validates our commitment to minimizing our environmental footprint.',
      icon: Star,
    },
  ],
};

export default function AwardsAndAccoladesPage() {
  return (
    <div className="pt-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <Breadcrumbs />
      </div>

      <section className="bg-sand-50 py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="font-display text-display-xl text-forest-900 mb-4">
            {awardsDetails.title}
          </h1>
          <p className="text-body-lg text-soil-700 max-w-3xl mx-auto">
            {awardsDetails.description}
          </p>
        </div>
      </section>

      {/* Image Gallery */}
      <section className="py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="col-span-2 row-span-2">
              <Image src={awardsDetails.images[0].src} alt={awardsDetails.images[0].alt} width={1200} height={800} className="rounded-lg object-cover w-full h-full" />
            </div>
            {awardsDetails.images.slice(1).map((image, index) => (
              <div key={index}>
                <Image src={image.src} alt={image.alt} width={800} height={600} className="rounded-lg object-cover w-full h-full" />
              </div>
            ))}
          </div>
        </div>
      </section>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-display text-3xl text-forest-900 mb-8 text-center">Our Recognitions</h2>
          <div className="space-y-8">
            {awardsDetails.awards.map((award, index) => (
              <div key={index} className="flex flex-col md:flex-row items-center bg-sand-50 p-6 rounded-lg">
                <award.icon className="h-16 w-16 text-yellow-500 md:mr-6 mb-4 md:mb-0 flex-shrink-0" />
                <div className="text-center md:text-left">
                  <h3 className="font-display text-2xl text-forest-800">{award.title}</h3>
                  <p className="font-semibold text-moss-600 mb-2">by {award.by} - {award.category}</p>
                  <p className="text-soil-700">{award.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
