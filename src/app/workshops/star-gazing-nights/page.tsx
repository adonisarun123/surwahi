import Image from 'next/image';
import { Check, Users, Calendar, Clock } from 'lucide-react';
import Breadcrumbs from '@/components/Breadcrumbs';
import { generatePageMetadata } from '@/lib/seo';
import ContactForm from '@/components/ContactForm';

export const metadata = generatePageMetadata(
  'Star Gazing Nights',
  'Explore the cosmos from our pristine, light-pollution-free skies.',
  '/workshops/star-gazing-nights'
);

const workshopDetails = {
  title: 'Star Gazing Nights',
  description: 'Unveil the secrets of the night sky. Away from the city glare, Surwahi offers a breathtaking celestial canvas. Our guided stargazing sessions are an enchanting journey through constellations, planets, and galaxies.',
  images: [
    { src: 'https://placehold.co/1200x800/A8BA9A/333333?text=Milky+Way', alt: 'The Milky Way galaxy visible in a clear night sky' },
    { src: 'https://placehold.co/800x600/A8BA9A/333333?text=Telescope', alt: 'A powerful telescope pointed towards the stars' },
    { src: 'https://placehold.co/800x600/A8BA9A/333333?text=Guests+Stargazing', alt: 'Guests looking up at the night sky with wonder' },
    { src: 'https://placehold.co/800x600/A8BA9A/333333?text=Constellations', alt: 'An illustration of a constellation' },
  ],
  keyHighlights: [
    'Guided tour of the night sky by an experienced astronomer.',
    'Learn to identify major constellations, planets, and nebulae.',
    'Use of a high-powered telescope for deep-sky observation.',
    'Learn the myths and legends associated with the stars.',
    'A magical experience for all ages and levels of knowledge.',
  ],
  whatToExpect: 'The session begins with an introduction to the basics of astronomy. Our guide will then take you on a laser-guided tour of the stars, pointing out celestial objects of interest. You\'ll have the opportunity to look through our telescope and witness the craters of the Moon, the rings of Saturn, and distant galaxies with your own eyes. We provide comfortable seating and warm blankets for a cozy experience.',
  schedule: [
    { date: 'Every Saturday', time: '8:00 PM - 9:30 PM', availability: 'Open' },
    { date: 'New Moon Nights', time: '8:30 PM - 10:00 PM', availability: 'Booking essential' },
  ],
  bestSuitedFor: {
    text: 'Anyone with a sense of wonder - from curious kids to seasoned astronomers.',
    icon: Users,
  },
};

export default function StarGazingNightsPage() {
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

            <h2 className="font-display text-3xl text-forest-900 mb-6">What to Expect</h2>
            <p className="text-lg text-soil-700 mb-8">{workshopDetails.whatToExpect}</p>
            
            <div className="bg-sand-50 p-8 rounded-lg">
              <h3 className="font-display text-2xl text-forest-900 mb-6">Upcoming Sessions</h3>
              <div className="space-y-4">
                {workshopDetails.schedule.map((session, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-white rounded-md">
                    <div className="flex items-center">
                      <Calendar className="h-6 w-6 text-moss-500 mr-4" />
                      <div>
                        <p className="font-semibold text-lg text-forest-800">{session.date}</p>
                        <p className="text-sm text-soil-700 flex items-center"><Clock className="h-4 w-4 mr-1"/>{session.time}</p>
                      </div>
                    </div>
                    <span className={`px-3 py-1 text-sm rounded-full ${session.availability === 'Open' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                      {session.availability}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Reservation Form */}
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <div className="bg-bone-0 p-6 rounded-lg shadow-lg">
                <h3 className="font-display text-xl text-forest-900 mb-4">Reserve Your Spot</h3>
                <p className="text-soil-700 mb-4 text-sm">Join us for a magical night under the stars. Please fill out the form to inquire about reservations.</p>
                <ContactForm subject="Star Gazing Nights Inquiry" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
