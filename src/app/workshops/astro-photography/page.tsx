import Image from 'next/image';
import { Check, Users, Calendar, Clock, Camera } from 'lucide-react';
import Breadcrumbs from '@/components/Breadcrumbs';
import { generatePageMetadata } from '@/lib/seo';
import ContactForm from '@/components/ContactForm';

export const metadata = generatePageMetadata(
  'Astro-Photography Workshop',
  'Capture the cosmos with your camera in our hands-on astrophotography workshop.',
  '/workshops/astro-photography'
);

const workshopDetails = {
  title: 'Astro-Photography Workshop',
  description: 'Learn to capture the breathtaking beauty of the night sky. Our astrophotography workshop, designed for both beginners and enthusiasts, will guide you through the techniques of shooting stars, the Milky Way, and other celestial wonders.',
  images: [
    { src: 'https://placehold.co/1200x800/A8BA9A/333333?text=Starry+Night+Photo', alt: 'A stunning long-exposure photograph of the starry night sky' },
    { src: 'https://placehold.co/800x600/A8BA9A/333333?text=Camera+Setup', alt: 'A DSLR camera on a tripod set up for astrophotography' },
    { src: 'https://placehold.co/800x600/A8BA9A/333333?text=Workshop+in+Action', alt: 'Participants learning astrophotography techniques in a field' },
    { src: 'https://placehold.co/800x600/A8BA9A/333333?text=Moon+Photography', alt: 'A detailed close-up shot of the moon' },
  ],
  keyHighlights: [
    'Hands-on guidance from an experienced astrophotographer.',
    'Learn about camera settings, composition, and post-processing.',
    'Access to our dark-sky location for optimal shooting conditions.',
    'Suitable for DSLR and mirrorless camera users.',
    'Small group size to ensure personalized attention.',
  ],
  whatYouWillLearn: [
    { title: 'The Basics', description: 'Understanding your camera, lenses, and tripod for night photography.', icon: Camera },
    { title: 'Shooting Techniques', description: 'Mastering focus, exposure, and ISO for capturing stars and the Milky Way.', icon: Check },
    { title: 'Composition', description: 'Framing your shots with foreground elements to create stunning images.', icon: Users },
    { title: 'Post-Processing', description: 'An introduction to editing your astro photos to bring out their full potential.', icon: Clock },
  ],
  schedule: [
    { date: 'Monthly, on New Moon Weekends', time: '7:00 PM - 11:00 PM', availability: 'Limited Spots' },
  ],
};

export default function AstroPhotographyPage() {
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
              <h3 className="font-display text-2xl text-forest-900 mb-6">Upcoming Workshop</h3>
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
                <h3 className="font-display text-xl text-forest-900 mb-4">Book Your Spot</h3>
                <p className="text-soil-700 mb-4 text-sm">Seats are limited to ensure a quality learning experience. Register now to avoid disappointment.</p>
                <ContactForm subject="Astro-Photography Workshop Inquiry" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
