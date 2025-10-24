import Image from 'next/image';
import { Check, Clock, Sun, Users } from 'lucide-react';
import Breadcrumbs from '@/components/Breadcrumbs';
import { generatePageMetadata } from '@/lib/seo';
import BookingWidget from '@/components/BookingWidget';

export const metadata = generatePageMetadata(
  'Wildlife Safaris',
  'Experience the thrill of a wildlife safari in the buffer zone of Kanha National Park.',
  '/experiences/wildlife-safaris'
);

const safariDetails = {
  title: 'Kanha Buffer Zone Wildlife Safari',
  description: 'Embark on an unforgettable journey into the wild heart of India. Our expert-guided safaris take you through the diverse landscapes of the Kanha buffer zone, offering a chance to witness majestic tigers, elusive leopards, and a rich array of flora and fauna in their natural habitat.',
  images: [
    { src: 'https://placehold.co/1200x800/A8BA9A/333333?text=Tiger+in+Kanha', alt: 'A majestic tiger in the Kanha National Park' },
    { src: 'https://placehold.co/800x600/A8BA9A/333333?text=Safari+Jeep', alt: 'An open-top safari jeep on a forest trail' },
    { src: 'https://placehold.co/800x600/A8BA9A/333333?text=Spotted+Deer', alt: 'A herd of spotted deer grazing in the grasslands' },
    { src: 'https://placehold.co/800x600/A8BA9A/333333?text=Diverse+Birdlife', alt: 'A colorful bird perched on a branch' },
  ],
  keyHighlights: [
    'Chance to spot Royal Bengal Tigers, leopards, sloth bears, and more.',
    'Guided by experienced naturalists with deep knowledge of the local ecosystem.',
    'Explore the pristine buffer zones of Kanha National Park.',
    'Customized 4x4 safari vehicles for optimal viewing and photography.',
    'Ethical and responsible wildlife viewing practices.',
  ],
  whatToExpect: 'Our safari is more than just a drive; it\'s an immersive educational experience. Your guide will interpret the sounds and signs of the jungle, from alarm calls to pugmarks, enriching your understanding of this complex ecosystem. We prioritize minimal disturbance to the wildlife, ensuring a respectful and authentic encounter with nature. Refreshments are included.',
  timings: [
    { session: 'Morning Safari', time: '6:00 AM - 10:00 AM', icon: Sun },
    { session: 'Afternoon Safari', time: '3:00 PM - 6:00 PM', icon: Clock },
  ],
  bestSuitedFor: {
    text: 'Wildlife enthusiasts, photographers, families, and anyone seeking a thrilling connection with nature.',
    icon: Users,
  },
};

export default function WildlifeSafarisPage() {
  return (
    <div className="pt-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <Breadcrumbs />
      </div>

      <section className="bg-sand-50 py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="font-display text-display-xl text-forest-900 mb-4">
            {safariDetails.title}
          </h1>
          <p className="text-body-lg text-soil-700 max-w-3xl mx-auto">
            {safariDetails.description}
          </p>
        </div>
      </section>

      {/* Image Gallery */}
      <section className="py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="col-span-2 row-span-2">
              <Image src={safariDetails.images[0].src} alt={safariDetails.images[0].alt} width={1200} height={800} className="rounded-lg object-cover w-full h-full" />
            </div>
            {safariDetails.images.slice(1).map((image, index) => (
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
              {safariDetails.keyHighlights.map((highlight, index) => (
                <li key={index} className="flex items-start">
                  <Check className="h-6 w-6 text-fern-500 mr-3 flex-shrink-0 mt-1" />
                  <span className="text-lg text-soil-700">{highlight}</span>
                </li>
              ))}
            </ul>

            <h2 className="font-display text-3xl text-forest-900 mb-6">What to Expect</h2>
            <p className="text-lg text-soil-700 mb-8">{safariDetails.whatToExpect}</p>
            
            <div className="grid md:grid-cols-2 gap-8 bg-sand-50 p-8 rounded-lg">
              <div>
                <h3 className="font-display text-2xl text-forest-900 mb-4">Safari Timings</h3>
                <div className="space-y-4">
                  {safariDetails.timings.map((timing, index) => (
                    <div key={index} className="flex items-center">
                      <timing.icon className="h-6 w-6 text-moss-500 mr-3" />
                      <div>
                        <p className="font-semibold text-lg text-forest-800">{timing.session}</p>
                        <p className="text-soil-700">{timing.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <h3 className="font-display text-2xl text-forest-900 mb-4">Best Suited For</h3>
                <div className="flex items-start">
                  <safariDetails.bestSuitedFor.icon className="h-6 w-6 text-moss-500 mr-3 flex-shrink-0 mt-1" />
                  <p className="text-soil-700">{safariDetails.bestSuitedFor.text}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Booking Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <BookingWidget variant="page" />
              <div className="mt-6 text-center">
                <a href="/contact" className="btn btn-secondary w-full">Inquire for Group Bookings</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
