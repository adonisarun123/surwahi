import Image from 'next/image';
import { Check, Users, Hand, Mic, Home } from 'lucide-react';
import Breadcrumbs from '@/components/Breadcrumbs';
import { generatePageMetadata } from '@/lib/seo';

export const metadata = generatePageMetadata(
  'Cultural Immersion & Local Life',
  'Experience the local culture and traditions of the communities around Surwahi.',
  '/experiences/cultural-immersion-and-local-life'
);

const culturalDetails = {
  title: 'Cultural Immersion & Local Life',
  description: 'Journey beyond the wilderness and into the heart of the community. Our cultural immersion experiences offer a genuine connection to the people, traditions, and rhythms of daily life in the villages surrounding Surwahi.',
  images: [
    { src: 'https://placehold.co/1200x800/A8BA9A/333333?text=Village+Visit', alt: 'Guests interacting with local villagers in a courtyard' },
    { src: 'https://placehold.co/800x600/A8BA9A/333333?text=Local+Artisan', alt: 'A local artisan showcasing their craft' },
    { src: 'https://placehold.co/800x600/A8BA9A/333333?text=Traditional+Dance', alt: 'Local community members performing a traditional dance' },
    { src: 'https://placehold.co/800x600/A8BA9A/333333?text=Local+Cuisine', alt: 'A traditional meal being prepared in a village home' },
  ],
  keyHighlights: [
    'Authentic and respectful interactions with the local Baiga and Gond communities.',
    'Visit a local village to understand their way of life.',
    'Meet talented artisans and see their craft firsthand.',
    'Learn about local customs, traditions, and folklore.',
    'A humbling and heartwarming experience that fosters mutual respect.',
  ],
  whatToExpect: 'Our cultural tours are designed to be sensitive and non-intrusive. You will be accompanied by a local guide who acts as a cultural bridge, facilitating meaningful conversations and ensuring a respectful exchange. You\'ll visit homes, see schools, and understand the challenges and joys of village life. It\'s an opportunity to listen, learn, and broaden your perspective.',
  activities: [
    { name: 'Village Walk', description: 'A guided tour through a nearby village, offering a glimpse into daily life.', icon: Home },
    { name: 'Artisan Connect', description: 'Meet local potters, weavers, and painters, and perhaps even try your hand at their craft.', icon: Hand },
    { name: 'Folklore & Music', description: 'An evening of traditional music, dance, and storytelling with community elders.', icon: Mic },
  ],
  bestSuitedFor: {
    text: 'Culturally curious travelers, families, students, and anyone seeking a deeper connection with the place they are visiting.',
    icon: Users,
  },
};

export default function CulturalImmersionPage() {
  return (
    <div className="pt-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <Breadcrumbs />
      </div>

      <section className="bg-sand-50 py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="font-display text-display-xl text-forest-900 mb-4">
            {culturalDetails.title}
          </h1>
          <p className="text-body-lg text-soil-700 max-w-3xl mx-auto">
            {culturalDetails.description}
          </p>
        </div>
      </section>

      {/* Image Gallery */}
      <section className="py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="col-span-2 row-span-2">
              <Image src={culturalDetails.images[0].src} alt={culturalDetails.images[0].alt} width={1200} height={800} className="rounded-lg object-cover w-full h-full" />
            </div>
            {culturalDetails.images.slice(1).map((image, index) => (
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
              {culturalDetails.keyHighlights.map((highlight, index) => (
                <li key={index} className="flex items-start">
                  <Check className="h-6 w-6 text-fern-500 mr-3 flex-shrink-0 mt-1" />
                  <span className="text-lg text-soil-700">{highlight}</span>
                </li>
              ))}
            </ul>

            <h2 className="font-display text-3xl text-forest-900 mb-6">What to Expect</h2>
            <p className="text-lg text-soil-700 mb-8">{culturalDetails.whatToExpect}</p>
            
            <div className="bg-sand-50 p-8 rounded-lg">
              <h3 className="font-display text-2xl text-forest-900 mb-6">Immersion Activities</h3>
              <div className="grid md:grid-cols-3 gap-6 text-center">
                {culturalDetails.activities.map((activity, index) => (
                  <div key={index} className="flex flex-col items-center">
                    <activity.icon className="h-10 w-10 text-moss-500 mb-3" />
                    <h4 className="font-semibold text-xl text-forest-800">{activity.name}</h4>
                    <p className="text-sm text-soil-700">{activity.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <div className="bg-bone-0 p-6 rounded-lg shadow-lg">
                <h3 className="font-display text-xl text-forest-900 mb-4">Book a Cultural Tour</h3>
                <p className="text-soil-700 mb-4 text-sm">To ensure a meaningful and respectful experience for both our guests and the community, these tours are arranged on request. Please contact us to know more.</p>
                <a href="/contact" className="btn btn-primary w-full">Inquire Now</a>
              </div>
              <div className="mt-6 text-center">
                <a href="/experiences" className="text-moss-600 hover:underline">Explore other experiences</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
