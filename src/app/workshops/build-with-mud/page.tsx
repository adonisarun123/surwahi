import Image from 'next/image';
import { Check, Users, Calendar, Clock, Home, Layers } from 'lucide-react';
import Breadcrumbs from '@/components/Breadcrumbs';
import { generatePageMetadata } from '@/lib/seo';
import ContactForm from '@/components/ContactForm';

export const metadata = generatePageMetadata(
  'Build With Mud (Eco-Architecture)',
  'Get your hands dirty and learn the timeless art of building with mud.',
  '/workshops/build-with-mud'
);

const workshopDetails = {
  title: 'Build With Mud: Eco-Architecture Workshop',
  description: 'Connect with the most fundamental building material known to humankind - Earth. This intensive, hands-on workshop will teach you the principles and techniques of natural building, empowering you to create beautiful, durable, and sustainable structures with your own hands.',
  images: [
    { src: 'https://placehold.co/1200x800/A8BA9A/333333?text=Mud+Wall+Building', alt: 'People working together to build a cob wall' },
    { src: 'https://placehold.co/800x600/A8BA9A/333333?text=Adobe+Bricks', alt: 'Sun-dried adobe bricks ready for construction' },
    { src: 'https://placehold.co/800x600/A8BA9A/333333?text=Natural+Plastering', alt: 'Applying a natural plaster finish to a mud wall' },
    { src: 'https://placehold.co/800x600/A8BA9A/333333?text=Finished+Mud+Structure', alt: 'A beautiful, finished structure built with mud' },
  ],
  keyHighlights: [
    'A comprehensive, hands-on introduction to natural building.',
    'Learn from experienced eco-architects and local artisans.',
    'Understand the science of soil and how to use it for construction.',
    'Build a small structure from foundation to roof as part of the workshop.',
    'An empowering skill for anyone interested in sustainable living and self-sufficiency.',
  ],
  whatYouWillLearn: [
    { title: 'Soil Analysis', description: 'Learn to test and identify the right kind of soil for building.', icon: Layers },
    { title: 'Cob & Adobe Techniques', description: 'Master two of the most common and versatile mud building techniques.', icon: Home },
    { title: 'Natural Foundations & Plasters', description: 'Understand how to create stable foundations and breathable, non-toxic plasters.', icon: Check },
    { title: 'Design Principles', description: 'Learn the basics of designing passive solar and climate-responsive mud structures.', icon: Users },
  ],
  schedule: [
    { date: 'Annual 7-day Workshop', time: 'Full-day immersive experience', availability: 'Limited Seats' },
  ],
};

export default function BuildWithMudPage() {
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
                <span className="px-3 py-1 text-sm rounded-full bg-yellow-100 text-yellow-800">
                  {workshopDetails.schedule[0].availability}
                </span>
              </div>
            </div>
          </div>

          {/* Reservation Form */}
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <div className="bg-bone-0 p-6 rounded-lg shadow-lg">
                <h3 className="font-display text-xl text-forest-900 mb-4">Register for the Workshop</h3>
                <p className="text-soil-700 mb-4 text-sm">Ready to build your dream? Inquire to register for our next Build with Mud workshop.</p>
                <ContactForm subject="Build With Mud Workshop Inquiry" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
