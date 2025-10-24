import Image from 'next/image';
import { Check, Users, Calendar, Clock, Leaf, Recycle } from 'lucide-react';
import Breadcrumbs from '@/components/Breadcrumbs';
import { generatePageMetadata } from '@/lib/seo';
import ContactForm from '@/components/ContactForm';

export const metadata = generatePageMetadata(
  'Leaf Plate Making Workshop',
  'Learn the traditional and eco-friendly art of making plates from leaves.',
  '/workshops/leaf-plate-making'
);

const workshopDetails = {
  title: 'Leaf Plate Making Workshop',
  description: 'Discover a beautiful, sustainable alternative to disposable plates. In this hands-on workshop, you will learn the traditional art of crafting sturdy and biodegradable plates from Sal and Banyan leaves, a practice that has been part of the local culture for centuries.',
  images: [
    { src: 'https://placehold.co/1200x800/A8BA9A/333333?text=Stitching+Leaves', alt: 'Hands skillfully stitching leaves together to make a plate' },
    { src: 'https://placehold.co/800x600/A8BA9A/333333?text=Finished+Leaf+Plates', alt: 'A stack of freshly made, beautiful leaf plates' },
    { src: 'https://placehold.co/800x600/A8BA9A/333333?text=Workshop+Participants', alt: 'Guests happily engaged in the leaf plate making workshop' },
    { src: 'https://placehold.co/800x600/A8BA9A/333333?text=Serving+Food', alt: 'Food being served on a natural leaf plate' },
  ],
  keyHighlights: [
    'Learn a zero-waste, traditional craft from local women.',
    'Understand the cultural and ecological significance of using leaf plates.',
    'Create your own set of leaf plates to use or take home.',
    'A fun and practical skill that promotes sustainable living.',
    'Empowers local women artisans who lead these workshops.',
  ],
  whatYouWillLearn: [
    { title: 'Leaf Selection', description: 'Learn to identify and select the right kind of leaves for plate making.', icon: Leaf },
    { title: 'Stitching Technique', description: 'Master the art of stitching the leaves together using small bamboo slivers.', icon: Check },
    { title: 'Shaping and Finishing', description: 'Learn how to shape the plates and bowls for different uses.', icon: Recycle },
    { title: 'Cultural Context', description: 'Hear stories and understand the role of leaf plates in local traditions and festivals.', icon: Users },
  ],
  schedule: [
    { date: 'Available on Request', time: '1.5-hour sessions', availability: 'Book in Advance' },
  ],
};

export default function LeafPlateMakingPage() {
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
                <p className="text-soil-700 mb-4 text-sm">Join us for this unique, eco-friendly craft. Inquire below to book a workshop.</p>
                <ContactForm subject="Leaf Plate Making Workshop Inquiry" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
