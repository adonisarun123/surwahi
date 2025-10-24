import Image from 'next/image';
import { Check, Clock, Sun, Users, BookOpen, Leaf } from 'lucide-react';
import Breadcrumbs from '@/components/Breadcrumbs';
import { generatePageMetadata } from '@/lib/seo';

export const metadata = generatePageMetadata(
  'Know Your Crop',
  'Learn about the crops we grow and their journey from seed to harvest.',
  '/experiences/know-your-crop'
);

const knowYourCropDetails = {
  title: 'Know Your Crop: Agri-Learning Walks',
  description: 'Trace the journey of your food from the soil to your plate. Our Agri-Learning Walks are a deep dive into the world of agriculture, offering insights into the seasonal crops we cultivate, the science of organic farming, and the importance of biodiversity in our food systems.',
  images: [
    { src: 'https://placehold.co/1200x800/A8BA9A/333333?text=Rice+Paddy', alt: 'Golden rice paddies ready for harvest' },
    { src: 'https://placehold.co/800x600/A8BA9A/333333?text=Vegetable+Patch', alt: 'A diverse patch of organic vegetables' },
    { src: 'https://placehold.co/800x600/A8BA9A/333333?text=Farmer+Explaining', alt: 'A farmer explaining the details of a plant to a guest' },
    { src: 'https://placehold.co/800x600/A8BA9A/333333?text=Spices', alt: 'A collection of freshly harvested spices' },
  ],
  keyHighlights: [
    'In-depth knowledge about local and seasonal crops.',
    'Understand the principles of organic and regenerative agriculture.',
    'Learn about pest management and soil health.',
    'See firsthand how we grow the food served at our lodge.',
    'Engaging for all, from curious foodies to aspiring farmers.',
  ],
  whatToExpect: 'This is an educational walk led by our agricultural experts. You will visit different sections of our farm, each dedicated to various types of produce. The walk is interactive, with opportunities to ask questions, and even taste some fresh produce straight from the plant. You\'ll leave with a greater understanding and appreciation for the food you eat.',
  seasonalFocus: [
    { season: 'Kharif (Monsoon)', crops: 'Rice, Maize, Soyabean, Millets', icon: Sun },
    { season: 'Rabi (Winter)', crops: 'Wheat, Mustard, Lentils, Seasonal Vegetables', icon: Leaf },
    { season: 'Zaid (Summer)', crops: 'Cucumber, Watermelon, Leafy Greens', icon: Clock },
  ],
  bestSuitedFor: {
    text: 'Eco-tourists, culinary enthusiasts, students, and anyone with an interest in agriculture and sustainable food systems.',
    icon: Users,
  },
};

export default function KnowYourCropPage() {
  return (
    <div className="pt-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <Breadcrumbs />
      </div>

      <section className="bg-sand-50 py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="font-display text-display-xl text-forest-900 mb-4">
            {knowYourCropDetails.title}
          </h1>
          <p className="text-body-lg text-soil-700 max-w-3xl mx-auto">
            {knowYourCropDetails.description}
          </p>
        </div>
      </section>

      {/* Image Gallery */}
      <section className="py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="col-span-2 row-span-2">
              <Image src={knowYourCropDetails.images[0].src} alt={knowYourCropDetails.images[0].alt} width={1200} height={800} className="rounded-lg object-cover w-full h-full" />
            </div>
            {knowYourCropDetails.images.slice(1).map((image, index) => (
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
              {knowYourCropDetails.keyHighlights.map((highlight, index) => (
                <li key={index} className="flex items-start">
                  <Check className="h-6 w-6 text-fern-500 mr-3 flex-shrink-0 mt-1" />
                  <span className="text-lg text-soil-700">{highlight}</span>
                </li>
              ))}
            </ul>

            <h2 className="font-display text-3xl text-forest-900 mb-6">What to Expect</h2>
            <p className="text-lg text-soil-700 mb-8">{knowYourCropDetails.whatToExpect}</p>
            
            <div className="bg-sand-50 p-8 rounded-lg">
              <h3 className="font-display text-2xl text-forest-900 mb-6">Seasonal Focus</h3>
              <div className="grid md:grid-cols-3 gap-6">
                {knowYourCropDetails.seasonalFocus.map((season, index) => (
                  <div key={index} className="flex flex-col items-center text-center">
                    <season.icon className="h-10 w-10 text-moss-500 mb-3" />
                    <h4 className="font-semibold text-xl text-forest-800">{season.season}</h4>
                    <p className="text-sm text-soil-700"><strong>Crops:</strong> {season.crops}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Booking Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <div className="bg-bone-0 p-6 rounded-lg shadow-lg">
                <h3 className="font-display text-xl text-forest-900 mb-4">Book Your Agri-Walk</h3>
                <p className="text-soil-700 mb-4 text-sm">This insightful walk is available to all guests. Please schedule with our reception to ensure guide availability.</p>
                <a href="/contact" className="btn btn-primary w-full">Schedule Your Walk</a>
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
