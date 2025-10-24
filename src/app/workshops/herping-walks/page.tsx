import Image from 'next/image';
import { Check, Users, Calendar, Clock, Eye, AlertTriangle } from 'lucide-react';
import Breadcrumbs from '@/components/Breadcrumbs';
import { generatePageMetadata } from '@/lib/seo';
import ContactForm from '@/components/ContactForm';

export const metadata = generatePageMetadata(
  'Herping Walks (Amphibian & Reptile Study)',
  'Discover the fascinating and often unseen world of amphibians and reptiles on our guided night walks.',
  '/workshops/herping-walks'
);

const workshopDetails = {
  title: 'Herping Walks: Amphibian & Reptile Study',
  description: 'As dusk falls, a different world awakens. Our herping walks are a unique adventure into the nocturnal realm of frogs, snakes, lizards, and other fascinating herpetofauna. Led by an expert naturalist, this is a chance to see and learn about these often-misunderstood creatures.',
  images: [
    { src: 'https://placehold.co/1200x800/A8BA9A/333333?text=Night+Walk', alt: 'A group on a guided night walk with flashlights' },
    { src: 'https://placehold.co/800x600/A8BA9A/333333?text=Tree+Frog', alt: 'A vibrant green tree frog on a leaf' },
    { src: 'https://placehold.co/800x600/A8BA9A/333333?text=Chameleon', alt: 'A chameleon camouflaged on a branch' },
    { src: 'https://placehold.co/800x600/A8BA9A/333333?text=Non-venomous+Snake', alt: 'A naturalist safely handling a non-venomous snake' },
  ],
  keyHighlights: [
    'Explore the nocturnal ecosystem with a trained herpetologist.',
    'Learn to identify different species of amphibians and reptiles.',
    'Understand their behavior, ecology, and importance in the ecosystem.',
    'A thrilling and educational experience for nature enthusiasts.',
    'Strict adherence to safety and ethical handling protocols.',
  ],
  whatToExpect: 'Equipped with flashlights, we will venture into habitats where these creatures are most active. Your guide will help you spot them and will share fascinating insights about their life. This is a catch-and-release study walk, where some non-venomous species may be handled gently for educational purposes before being released back into their habitat.',
  whatYouWillLearn: [
    { title: 'Species Identification', description: 'Learn to distinguish between different frogs, geckos, and snakes.', icon: Eye },
    { title: 'Nocturnal Adaptation', description: 'Discover the unique ways these animals have adapted to life in the dark.', icon: Users },
    { title: 'Ecological Role', description: 'Understand the vital role herpetofauna play in maintaining a healthy ecosystem.', icon: Check },
    { title: 'Safety & First Aid', description: 'Learn how to be safe in snake-prone areas and basic first aid for snake bites.', icon: AlertTriangle },
  ],
  schedule: [
    { date: 'Seasonal (Best during Monsoon)', time: '7:30 PM - 9:00 PM', availability: 'Book in Advance' },
  ],
};

export default function HerpingWalksPage() {
  return (
    <div className="pt-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <Breadcrumbs />
      </div>

      <section className="bg-sand-50 py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="font-display text-display-xl text-forest-900 mb-4">
            {workshopDetails.title}
          </h1>
          <p className="text-body-lg text-soil-700 max-w-3xl mx-auto">
            {workshopDetails.description}
          </p>
        </div>
      </section>

      {/* Image Gallery */}
      <section className="py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="col-span-2 row-span-2">
              <Image src={workshopDetails.images[0].src} alt={workshopDetails.images[0].alt} width={1200} height={800} className="rounded-lg object-cover w-full h-full" />
            </div>
            {workshopDetails.images.slice(1).map((image, index) => (
              <div key={index}>
                <Image src={image.src} alt={image.alt} width={800} height={600} className="rounded-lg object-cover w-full h-full" />
              </div>
            ))}
          </div>
        </div>
      </section>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid lg:grid-cols-3 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <h2 className="font-display text-3xl text-forest-900 mb-6">Key Highlights</h2>
            <ul className="space-y-4 mb-8">
              {workshopDetails.keyHighlights.map((highlight, index) => (
                <li key={index} className="flex items-start">
                  <Check className="h-6 w-6 text-fern-500 mr-3 flex-shrink-0 mt-1" />
                  <span className="text-lg text-soil-700">{highlight}</span>
                </li>
              ))}
            </ul>

            <h2 className="font-display text-3xl text-forest-900 mb-6">What You Will Learn</h2>
            <div className="grid md:grid-cols-2 gap-8 mb-8">
              {workshopDetails.whatYouWillLearn.map((item, index) => (
                <div key={index} className="flex items-start">
                  <item.icon className="h-8 w-8 text-moss-500 mr-4 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold text-xl text-forest-800">{item.title}</h3>
                    <p className="text-soil-700">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-sand-50 p-8 rounded-lg">
              <h3 className="font-display text-2xl text-forest-900 mb-6">Walk Schedule</h3>
              <div className="flex items-center justify-between p-4 bg-white rounded-md">
                <div className="flex items-center">
                  <Calendar className="h-6 w-6 text-moss-500 mr-4" />
                  <div>
                    <p className="font-semibold text-lg text-forest-800">{workshopDetails.schedule[0].date}</p>
                    <p className="text-sm text-soil-700 flex items-center"><Clock className="h-4 w-4 mr-1"/>{workshopDetails.schedule[0].time}</p>
                  </div>
                </div>
                <span className="px-3 py-1 text-sm rounded-full bg-blue-100 text-blue-800">
                  {workshopDetails.schedule[0].availability}
                </span>
              </div>
            </div>
          </div>

          {/* Reservation Form */}
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <div className="bg-bone-0 p-6 rounded-lg shadow-lg">
                <h3 className="font-display text-xl text-forest-900 mb-4">Book Your Herping Walk</h3>
                <p className="text-soil-700 mb-4 text-sm">Ready for a unique nocturnal adventure? Inquire to book your spot on our next herping walk.</p>
                <ContactForm subject="Herping Walk Inquiry" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
