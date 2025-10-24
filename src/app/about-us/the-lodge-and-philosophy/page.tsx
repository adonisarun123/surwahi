import Image from 'next/image';
import { Leaf, Users, Heart, Home } from 'lucide-react';
import Breadcrumbs from '@/components/Breadcrumbs';
import { generatePageMetadata } from '@/lib/seo';
import Link from 'next/link';

export const metadata = generatePageMetadata(
  'The Lodge & Philosophy',
  'Learn about the design, architecture, and guiding principles of Surwahi.',
  '/about-us/the-lodge-and-philosophy'
);

const lodgeDetails = {
  title: 'The Lodge & Our Philosophy',
  intro: 'Surwahi is more than a building; it is a living, breathing entity, designed in harmony with the principles of sustainability, community, and deep respect for nature. Our philosophy is simple: to create a space that is regenerative, not extractive, and to offer an experience that is authentic, not artificial.',
  images: [
    { src: 'https://placehold.co/1200x800/A8BA9A/333333?text=Aerial+View+of+Lodge', alt: 'An aerial view of the lodge nestled in the lush landscape' },
    { src: 'https://placehold.co/800x600/A8BA9A/333333?text=Earthen+Architecture', alt: 'A close-up of the beautiful earthen walls of the lodge' },
    { src: 'https://placehold.co/800x600/A8BA9A/333333?text=Common+Area', alt: 'The warm and inviting common area, built with natural materials' },
    { src: 'https://placehold.co/800x600/A8BA9A/333333?text=Lodge+at+Dusk', alt: 'The lodge glowing warmly at dusk' },
  ],
  philosophy: [
    {
      title: 'Ecological Harmony',
      description: 'We believe in building with nature, not against it. Our architecture is climate-responsive, using local, natural materials to create spaces that are comfortable without being dependent on heavy energy consumption. From our mud walls to our green roofs, every element is designed to blend seamlessly with the landscape.',
      icon: Leaf,
    },
    {
      title: 'Community Centric',
      description: 'Our lodge was built by and for the community. We are deeply committed to empowering local artisans, employing local staff, and ensuring that the benefits of tourism are shared equitably. Surwahi is a place of cultural exchange and mutual respect.',
      icon: Users,
    },
    {
      title: 'Conscious Hospitality',
      description: 'We offer a form of luxury that is mindful, not mindless. It is the luxury of fresh air, clean water, wholesome food, and genuine human connection. We encourage our guests to slow down, disconnect from the digital world, and reconnect with themselves and nature.',
      icon: Heart,
    },
    {
      title: 'A Living Laboratory',
      description: 'Surwahi is a space for learning and experimentation. We are constantly exploring new ways to live more sustainably, from our zero-discharge toilets to our organic farms. We invite our guests to be a part of this journey of discovery.',
      icon: Home,
    },
  ],
};

export default function LodgeAndPhilosophyPage() {
  return (
    <div className="pt-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <Breadcrumbs />
      </div>

      <section className="bg-sand-50 py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="font-display text-display-xl text-forest-900 mb-4">
            {lodgeDetails.title}
          </h1>
          <p className="text-body-lg text-soil-700 max-w-3xl mx-auto">
            {lodgeDetails.intro}
          </p>
        </div>
      </section>

      {/* Image Gallery */}
      <section className="py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="col-span-2 row-span-2">
              <Image src={lodgeDetails.images[0].src} alt={lodgeDetails.images[0].alt} width={1200} height={800} className="rounded-lg object-cover w-full h-full" />
            </div>
            {lodgeDetails.images.slice(1).map((image, index) => (
              <div key={index}>
                <Image src={image.src} alt={image.alt} width={800} height={600} className="rounded-lg object-cover w-full h-full" />
              </div>
            ))}
          </div>
        </div>
      </section>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-display text-3xl text-forest-900 mb-8 text-center">Our Guiding Philosophy</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {lodgeDetails.philosophy.map((item, index) => (
              <div key={index} className="flex items-start">
                <item.icon className="h-10 w-10 text-moss-500 mr-4 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-xl text-forest-800 mb-2">{item.title}</h3>
                  <p className="text-soil-700">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-12">
            <h3 className="font-display text-2xl text-forest-900 mb-4">Experience Our Philosophy in Action</h3>
            <p className="text-soil-700 max-w-2xl mx-auto mb-6">
              The best way to understand our philosophy is to experience it. We invite you to stay with us and be a part of our living, breathing world.
            </p>
            <Link href="/accommodations" className="btn btn-primary">
              Explore Our Stays
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
