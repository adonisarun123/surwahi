import { Trophy, Star } from 'lucide-react';
import Breadcrumbs from '@/components/Breadcrumbs';
import { generatePageMetadata } from '@/lib/seo';
import AwardsCarousel from '@/components/AwardsCarousel';

export const metadata = generatePageMetadata(
  'Awards & Accolades',
  'We are humbled and honored by the recognition we have received for our commitment to sustainable tourism.',
  '/praises/awards-and-accolades'
);

const awardsDetails = {
  title: 'Awards & Accolades',
  description: 'Our journey towards creating a model for sustainable and responsible tourism has been recognized by esteemed organizations. These accolades motivate us to continue our work with greater passion and dedication.',
  images: [
    { src: 'https://ik.imagekit.io/surwahi/Website%20Photos/awards/Certificate/AEN%20award.jpg', alt: 'Award certificate' },
    { src: 'https://ik.imagekit.io/surwahi/Website%20Photos/awards/Certificate/MP%20Award%202025.jpg', alt: 'MP Award 2025 certificate' },
    { src: 'https://ik.imagekit.io/surwahi/Website%20Photos/awards/Certificate/Toft%20award.png', alt: 'TOFT award' },
    { src: 'https://ik.imagekit.io/surwahi/Website%20Photos/awards/Certificate/Screenshot%202025-10-28%20174400.png', alt: 'Award recognition screenshot 1' },
    { src: 'https://ik.imagekit.io/surwahi/Website%20Photos/awards/Certificate/Screenshot%202025-10-28%20175016.png', alt: 'Award recognition screenshot 2' },
    { src: 'https://ik.imagekit.io/surwahi/Website%20Photos/awards/Certificate/Silver%20Winner%20Badge.jpg', alt: 'Silver winner badge' },
    { src: 'https://ik.imagekit.io/surwahi/Website%20Photos/awards/Certificate/Surwahi%20Social%20Ecostate%20Kanha.png', alt: 'Surwahi Social Ecoestate Kanha certificate' },
    { src: 'https://ik.imagekit.io/surwahi/Website%20Photos/awards/Certificate/WhatsApp%20Image%202025-06-20%20at%2010.30.53_92a9d914.jpg', alt: 'Award announcement photo' },
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

      {/* Awards Carousel */}
      <section className="py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <AwardsCarousel images={awardsDetails.images} />
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
                  <h3 className="font-display text-2xl text-forest-900">{award.title}</h3>
                  <p className="font-semibold text-moss-500 mb-2">by {award.by} - {award.category}</p>
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
