import Image from 'next/image';
import { Check, Users, Calendar, Clock, Leaf, AlertTriangle } from 'lucide-react';
import Breadcrumbs from '@/components/Breadcrumbs';
import { generatePageMetadata } from '@/lib/seo';
import ContactForm from '@/components/ContactForm';

export const metadata = generatePageMetadata(
  'Food Foraging Trails',
  'Discover the edible treasures of the forest on our guided foraging trails.',
  '/workshops/food-foraging-trails'
);

const workshopDetails = {
  title: 'Food Foraging Trails',
  description: 'The forest is a natural larder, full of edible plants, fruits, and fungi. Join our expert forager on a guided trail to safely identify and learn about the wild foods that have sustained local communities for generations.',
  images: [
    { src: 'https://placehold.co/1200x800/A8BA9A/333333?text=Foraging+in+Forest', alt: 'A person foraging for wild edibles in the forest' },
    { src: 'https://placehold.co/800x600/A8BA9A/333333?text=Edible+Mushrooms', alt: 'A cluster of edible wild mushrooms' },
    { src: 'https://placehold.co/800x600/A8BA9A/333333?text=Wild+Berries', alt: 'A handful of colorful wild berries' },
    { src: 'https://placehold.co/800x600/A8BA9A/333333?text=Foraged+Meal', alt: 'A meal prepared with foraged ingredients' },
  ],
  keyHighlights: [
    'Learn to safely identify a variety of wild edible plants.',
    'Led by an experienced forager with deep knowledge of local flora.',
    'Understand the principles of sustainable and ethical foraging.',
    'Discover the nutritional and medicinal properties of wild foods.',
    'A unique opportunity to connect with nature’s bounty.',
  ],
  whatToExpect: 'This is a slow-paced, observational walk through different habitats. Your guide will teach you the key identifying features of various plants, and importantly, which ones to avoid. You will learn how to harvest sustainably, ensuring the plant populations continue to thrive. The trail often ends with a small tasting session of some of the foraged items.',
  whatYouWillLearn: [
    { title: 'Plant Identification', description: 'Learn the key characteristics of common edible and medicinal plants.', icon: Leaf },
    { title: 'Sustainable Harvesting', description: 'Understand the do\'s and don\'ts of foraging to protect the ecosystem.', icon: Check },
    { title: 'Safety Guidelines', description: 'Crucial knowledge on how to forage safely and avoid poisonous look-alikes.', icon: AlertTriangle },
    { title: 'Traditional Uses', description: 'Discover how these plants are used in local cuisine and traditional medicine.', icon: Users },
  ],
  schedule: [
    { date: 'Seasonal (Monsoon & Post-Monsoon)', time: '2-hour sessions', availability: 'Book in Advance' },
  ],
};

export default function FoodForagingTrailsPage() {
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
              <h3 className="font-display text-2xl text-forest-900 mb-6">Trail Schedule</h3>
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
                <h3 className="font-display text-xl text-forest-900 mb-4">Book Your Foraging Trail</h3>
                <p className="text-soil-700 mb-4 text-sm">Discover the edible wonders of the forest. Inquire to book a spot on our next foraging trail.</p>
                <ContactForm subject="Food Foraging Trail Inquiry" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
