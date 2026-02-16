import Image from 'next/image';
import { Leaf, Heart, Briefcase, Droplets, Zap, LifeBuoy } from 'lucide-react';
import Breadcrumbs from '@/components/Breadcrumbs';
import { generatePageMetadata } from '@/lib/seo';
import { getImageKitUrl } from '@/lib/images';

export const metadata = generatePageMetadata(
  'Sustainable Development Goals (SDGs) Alignment',
  'See how our practices align with the UN’s SDGs.',
  '/sustainability/sdg-alignment',
  undefined,
  ['SDG Alignment', 'Sustainable Development Goals', 'UN SDG Tourism', 'Responsible Business', 'Global Goals']
);

const sdgDetails = {
  title: 'Alignment with UN Sustainable Development Goals',
  description: 'Our commitment to sustainability extends beyond our estate. We are proud to align our practices with the United Nations\' Sustainable Development Goals (SDGs), contributing to a global blueprint for peace and prosperity for people and the planet.',
  images: [
    { src: getImageKitUrl('Website Photos/surwahi edit.png'), alt: 'The colorful grid of the 17 UN Sustainable Development Goals' },
    { src: getImageKitUrl('Surwahi Social Photos/IMG_20200217_095015 (2).jpg'), alt: 'A local community member empowered through our initiatives' },
    { src: getImageKitUrl('Surwahi Social Photos/Eathen Swimming Pool/WhatsApp Image 2025-04-14 at 10.03.48_5a837a8d.jpg'), alt: 'A clean water source provided for the community' },
    { src: getImageKitUrl('Website Photos/IMG20231020171008.jpg'), alt: 'A reforestation project in progress' },
  ],
  sdgAlignments: [
    { sdg: 'SDG 6: Clean Water and Sanitation', ourAction: 'Implementation of Evapo-Transpiration Toilets and rainwater harvesting, ensuring responsible water management.', icon: Droplets },
    { sdg: 'SDG 7: Affordable and Clean Energy', ourAction: 'Use of solar power for lighting and water heating, reducing our reliance on fossil fuels.', icon: Zap },
    { sdg: 'SDG 8: Decent Work and Economic Growth', ourAction: 'Employing over 80% of our staff from local villages and promoting local artisans, fostering inclusive economic growth.', icon: Briefcase },
    { sdg: 'SDG 11: Sustainable Cities and Communities', ourAction: 'Championing eco-friendly construction and preserving local culture and heritage.', icon: Heart },
    { sdg: 'SDG 12: Responsible Consumption and Production', ourAction: 'Practicing a farm-to-table philosophy, minimizing food waste, and eliminating single-use plastics.', icon: Leaf },
    { sdg: 'SDG 15: Life on Land', ourAction: 'Conducting biodiversity surveys, undertaking reforestation drives, and promoting conservation awareness.', icon: LifeBuoy },
  ],
};

export default function SdgsAlignmentPage() {
  return (
    <div className="pt-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <Breadcrumbs />
      </div>

      <section className="bg-sand-50 py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="font-display text-display-xl text-forest-900 mb-4">
            {sdgDetails.title}
          </h1>
          <p className="text-body-lg text-soil-700 max-w-3xl mx-auto">
            {sdgDetails.description}
          </p>
        </div>
      </section>

      {/* Image Gallery */}
      <section className="py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="col-span-2 row-span-2">
              <Image src={sdgDetails.images[0].src} alt={sdgDetails.images[0].alt} width={1200} height={800} className="rounded-lg object-cover w-full h-full" />
            </div>
            {sdgDetails.images.slice(1).map((image, index) => (
              <div key={index}>
                <Image src={image.src} alt={image.alt} width={800} height={600} className="rounded-lg object-cover w-full h-full" />
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-display text-3xl text-forest-900 mb-8 text-center">Our Contribution to the Global Goals</h2>
          <div className="space-y-8">
            {sdgDetails.sdgAlignments.map((alignment, index) => (
              <div key={index} className="flex items-start bg-sand-50 p-6 rounded-lg">
                <alignment.icon className="h-12 w-12 text-moss-500 mr-6 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-xl text-forest-900">{alignment.sdg}</h3>
                  <p className="text-soil-700">{alignment.ourAction}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
