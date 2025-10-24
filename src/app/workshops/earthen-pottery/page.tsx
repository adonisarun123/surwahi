import Image from 'next/image';
import { Check, Users, Calendar, Clock, Hand } from 'lucide-react';
import Breadcrumbs from '@/components/Breadcrumbs';
import { generatePageMetadata } from '@/lib/seo';
import ContactForm from '@/components/ContactForm';

export const metadata = generatePageMetadata(
  'Earthen Pottery Workshop',
  'Connect with the earth and your creativity in our hands-on pottery workshop.',
  '/workshops/earthen-pottery'
);

const workshopDetails = {
  title: 'Earthen Pottery Workshop',
  description: 'Get your hands dirty and your spirit centered. Our earthen pottery workshop is a therapeutic and creative journey, where you\'ll learn the ancient art of shaping clay, guided by skilled local artisans.',
  images: [
    { src: 'https://placehold.co/1200x800/A8BA9A/333333?text=Pottery+Wheel', alt: 'Hands shaping a pot on a pottery wheel' },
    { src: 'https://placehold.co/800x600/A8BA9A/333333?text=Local+Artisan', alt: 'A local artisan demonstrating pottery techniques' },
    { src: 'https://placehold.co/800x600/A8BA9A/333333?text=Finished+Pottery', alt: 'A collection of beautifully crafted earthen pottery' },
    { src: 'https://placehold.co/800x600/A8BA9A/333333?text=Guests+at+Work', alt: 'Guests enjoying the hands-on experience of making pottery' },
  ],
  keyHighlights: [
    'Learn the entire process, from preparing the clay to shaping it on the wheel.',
    'Taught by traditional potters from the local community.',
    'A meditative and grounding experience.',
    'Create your own unique piece of pottery to take home as a souvenir.',
    'Suitable for all ages and skill levels, no prior experience needed.',
  ],
  whatYouWillLearn: [
    { title: 'Clay Preparation', description: 'Understand the process of sourcing and preparing the local clay.', icon: Hand },
    { title: 'Wheel Throwing', description: 'Get a feel for the potter\'s wheel and learn to center and shape the clay.', icon: Check },
    { title: 'Hand Building', description: 'Explore techniques like pinching, coiling, and slab building.', icon: Users },
    { title: 'Finishing', description: 'Learn about the drying and firing process (firing is done after you leave and can be shipped).', icon: Clock },
  ],
  schedule: [
    { date: 'Daily Sessions', time: '10:00 AM - 12:00 PM & 3:00 PM - 5:00 PM', availability: 'Booking Required' },
  ],
};

export default function EarthenPotteryPage() {
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
              <h3 className="font-display text-2xl text-forest-900 mb-6">Workshop Schedule</h3>
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
                <h3 className="font-display text-xl text-forest-900 mb-4">Book Your Session</h3>
                <p className="text-soil-700 mb-4 text-sm">Come, shape your imagination. Book your pottery session with our local artisans.</p>
                <ContactForm subject="Earthen Pottery Workshop Inquiry" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
