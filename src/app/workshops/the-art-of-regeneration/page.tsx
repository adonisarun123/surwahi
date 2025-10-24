import Image from 'next/image';
import { Check, Users, Calendar, Clock, Heart, Recycle, Wind } from 'lucide-react';
import Breadcrumbs from '@/components/Breadcrumbs';
import { generatePageMetadata } from '@/lib/seo';
import ContactForm from '@/components/ContactForm';

export const metadata = generatePageMetadata(
  'The Art of Regeneration',
  'Learn how we can move beyond sustainability to actively regenerate our ecosystems and communities.',
  '/workshops/the-art-of-regeneration'
);

const workshopDetails = {
  title: 'The Art of Regeneration',
  description: 'Sustainability is about maintaining the status quo, but what if we could do more? This thought-provoking workshop explores the principles and practices of regeneration - the art of leaving a place better than we found it. It\'s a journey into a new paradigm of ecological and social thinking.',
  images: [
    { src: 'https://placehold.co/1200x800/A8BA9A/333333?text=Regenerated+Land', alt: 'A once-barren land now thriving with new life and biodiversity' },
    { src: 'https://placehold.co/800x600/A8BA9A/333333?text=Permaculture+Design', alt: 'A design sketch of a permaculture system' },
    { src: 'https://placehold.co/800x600/A8BA9A/333333?text=Community+Dialogue', alt: 'A group engaged in a deep dialogue about regeneration' },
    { src: 'https://placehold.co/800x600/A8BA9A/333333?text=Seed+Ball+Making', alt: 'Hands rolling seed balls for a reforestation project' },
  ],
  keyHighlights: [
    'Shift your perspective from "doing less harm" to "creating more good".',
    'Learn about principles of permaculture, agroforestry, and watershed management.',
    'Explore the social and economic dimensions of regeneration.',
    'Participate in hands-on activities that contribute to our regeneration projects.',
    'A deeply inspiring and empowering workshop for changemakers.',
  ],
  whatYouWillLearn: [
    { title: 'Principles of Living Systems', description: 'Understand how nature’s patterns can inform our designs for a regenerative future.', icon: Recycle },
    { title: 'Soil to Soul', description: 'Learn about the critical importance of soil health and how to regenerate it.', icon: Heart },
    { title: 'Social Permaculture', description: 'Explore how to apply regenerative principles to our communities and social structures.', icon: Users },
    { title: 'Designing for Regeneration', description: 'Get an introduction to designing systems that are self-sustaining and generative.', icon: Wind },
  ],
  schedule: [
    { date: 'Quarterly Workshops', time: 'Full-day immersive experience', availability: 'Limited Seats' },
  ],
};

export default function TheArtOfRegenerationPage() {
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
                <h3 className="font-display text-xl text-forest-900 mb-4">Join the Movement</h3>
                <p className="text-soil-700 mb-4 text-sm">Be a part of the solution. Inquire to register for our next Art of Regeneration workshop.</p>
                <ContactForm subject="The Art of Regeneration Inquiry" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
