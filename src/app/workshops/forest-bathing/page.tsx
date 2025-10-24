import Image from 'next/image';
import { Check, Users, Heart, Wind, Waves } from 'lucide-react';
import Breadcrumbs from '@/components/Breadcrumbs';
import { generatePageMetadata } from '@/lib/seo';
import ContactForm from '@/components/ContactForm';

export const metadata = generatePageMetadata(
  'Forest Bathing (Shinrin-yoku)',
  'Immerse your senses in the healing atmosphere of the forest.',
  '/workshops/forest-bathing'
);

const workshopDetails = {
  title: 'Forest Bathing (Shinrin-yoku)',
  description: 'Slow down, awaken your senses, and connect with nature on a deeper level. Forest Bathing, or Shinrin-yoku, is the Japanese practice of immersing oneself in the forest atmosphere. It is a gentle, meditative experience that has proven benefits for mental and physical well-being.',
  images: [
    { src: 'https://placehold.co/1200x800/A8BA9A/333333?text=Forest+Path', alt: 'A serene path winding through a sun-dappled forest' },
    { src: 'https://placehold.co/800x600/A8BA9A/333333?text=Meditating+in+Nature', alt: 'A person meditating peacefully by a stream in the forest' },
    { src: 'https://placehold.co/800x600/A8BA9A/333333?text=Sunlight+Through+Trees', alt: 'Sunlight filtering through the canopy of tall trees' },
    { src: 'https://placehold.co/800x600/A8BA9A/333333?text=Barefoot+on+Moss', alt: 'A close-up of bare feet on soft, green moss' },
  ],
  keyBenefits: [
    'Reduces stress, anxiety, and blood pressure.',
    'Boosts the immune system.',
    'Improves mood and enhances feelings of well-being.',
    'Increases creativity and problem-solving abilities.',
    'Fosters a deeper connection with the natural world.',
  ],
  whatToExpect: 'This is not a hike or a naturalist walk. It is a slow, guided journey of sensory immersion. Your certified guide will offer a series of invitations to help you connect with the forest through your senses of sight, sound, smell, touch, and taste. The experience is gentle, quiet, and deeply restorative. No fitness level is required.',
  sensoryInvitations: [
    { title: 'Sense of Sight', description: 'Notice the play of light and shadow, the different shades of green, and the intricate patterns of nature.', icon: Waves },
    { title: 'Sense of Sound', description: 'Listen to the symphony of the forest - the rustling leaves, the birdsong, the gentle breeze.', icon: Wind },
    { title: 'Sense of Smell', description: 'Inhale the earthy fragrance of the soil, the sweet scent of flowers, and the fresh aroma of the trees.', icon: Users },
    { title: 'Sense of Touch', description: 'Feel the texture of the bark, the coolness of a stone, and the softness of moss.', icon: Heart },
  ],
  schedule: [
    { date: 'Offered weekly', time: '2-hour sessions', availability: 'Booking Required' },
  ],
};

export default function ForestBathingPage() {
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
            <h2 className="font-display text-3xl text-forest-900 mb-6">Key Benefits</h2>
            <ul className="space-y-4 mb-8">
              {workshopDetails.keyBenefits.map((benefit, index) => (
                <li key={index} className="flex items-start">
                  <Check className="h-6 w-6 text-fern-500 mr-3 flex-shrink-0 mt-1" />
                  <span className="text-lg text-soil-700">{benefit}</span>
                </li>
              ))}
            </ul>

            <h2 className="font-display text-3xl text-forest-900 mb-6">What to Expect</h2>
            <p className="text-lg text-soil-700 mb-8">{workshopDetails.whatToExpect}</p>
            
            <div className="bg-sand-50 p-8 rounded-lg">
              <h3 className="font-display text-2xl text-forest-900 mb-6">Sensory Invitations</h3>
              <div className="grid md:grid-cols-2 gap-8">
                {workshopDetails.sensoryInvitations.map((item, index) => (
                  <div key={index} className="flex items-start">
                    <item.icon className="h-8 w-8 text-moss-500 mr-4 flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="font-semibold text-xl text-forest-800">{item.title}</h3>
                      <p className="text-soil-700">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Reservation Form */}
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <div className="bg-bone-0 p-6 rounded-lg shadow-lg">
                <h3 className="font-display text-xl text-forest-900 mb-4">Book Your Session</h3>
                <p className="text-soil-700 mb-4 text-sm">Join us for a journey of sensory awakening. Book your Forest Bathing session with our certified guide.</p>
                <ContactForm subject="Forest Bathing Inquiry" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
