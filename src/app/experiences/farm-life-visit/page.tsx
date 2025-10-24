import Image from 'next/image';
import { Check, Sun, Users, Leaf } from 'lucide-react';
import Breadcrumbs from '@/components/Breadcrumbs';
import { generatePageMetadata } from '@/lib/seo';

export const metadata = generatePageMetadata(
  'Farm Life Visit',
  'Get a firsthand experience of rural life and sustainable farming practices.',
  '/experiences/farm-life-visit'
);

const farmVisitDetails = {
  title: 'A Day at the Farm',
  description: 'Connect with the earth and the hands that feed you. Our Farm Life Visit is an invitation to experience the rhythm of rural life, learn about organic farming, and enjoy the simple pleasures of the countryside.',
  images: [
    { src: 'https://placehold.co/1200x800/A8BA9A/333333?text=Organic+Farm', alt: 'Lush green organic vegetable beds at the farm' },
    { src: 'https://placehold.co/800x600/A8BA9A/333333?text=Farmer+Interaction', alt: 'A smiling local farmer interacting with guests' },
    { src: 'https://placehold.co/800x600/A8BA9A/333333?text=Farm+Animals', alt: 'Guests petting a friendly cow at the farm' },
    { src: 'https://placehold.co/800x600/A8BA9A/333333?text=Harvesting', alt: 'Hands harvesting fresh vegetables from the farm' },
  ],
  keyHighlights: [
    'Tour our organic farms and learn about sustainable agricultural practices.',
    'Participate in seasonal farming activities like sowing, weeding, or harvesting.',
    'Interact with our farm animals, including cows and chickens.',
    'Understand the journey of food from farm to table.',
    'A refreshing and educational experience for all ages.',
  ],
  whatToExpect: 'This is a hands-on experience. You\'ll get to walk through the fields, touch the soil, and maybe even get your hands a little dirty! Our farmers will share their wisdom about local crops, traditional techniques, and the importance of organic farming. The visit often concludes with a refreshing drink made from farm-fresh ingredients.',
  activities: [
    { name: 'Organic Farming 101', description: 'Learn the basics of composting, pest control, and companion planting.', icon: Leaf },
    { name: 'Meet the Animals', description: 'Interact with our cattle and poultry, and learn about their role on the farm.', icon: Users },
    { name: 'Seasonal Harvesting', description: 'Depending on the season, participate in harvesting vegetables, grains, or fruits.', icon: Sun },
  ],
  bestSuitedFor: {
    text: 'Families, students, and anyone interested in sustainable living, agriculture, and rural life.',
    icon: Users,
  },
};

export default function FarmLifeVisitPage() {
  return (
    <div className="pt-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <Breadcrumbs />
      </div>

      <section className="bg-sand-50 py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="font-display text-display-xl text-forest-900 mb-4">
            {farmVisitDetails.title}
          </h1>
          <p className="text-body-lg text-soil-700 max-w-3xl mx-auto">
            {farmVisitDetails.description}
          </p>
        </div>
      </section>

      {/* Image Gallery */}
      <section className="py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="col-span-2 row-span-2">
              <Image src={farmVisitDetails.images[0].src} alt={farmVisitDetails.images[0].alt} width={1200} height={800} className="rounded-lg object-cover w-full h-full" />
            </div>
            {farmVisitDetails.images.slice(1).map((image, index) => (
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
              {farmVisitDetails.keyHighlights.map((highlight, index) => (
                <li key={index} className="flex items-start">
                  <Check className="h-6 w-6 text-fern-500 mr-3 flex-shrink-0 mt-1" />
                  <span className="text-lg text-soil-700">{highlight}</span>
                </li>
              ))}
            </ul>

            <h2 className="font-display text-3xl text-forest-900 mb-6">What to Expect</h2>
            <p className="text-lg text-soil-700 mb-8">{farmVisitDetails.whatToExpect}</p>
            
            <div className="bg-sand-50 p-8 rounded-lg">
              <h3 className="font-display text-2xl text-forest-900 mb-6">Farm Activities</h3>
              <div className="grid md:grid-cols-3 gap-6 text-center">
                {farmVisitDetails.activities.map((activity, index) => (
                  <div key={index} className="flex flex-col items-center">
                    <activity.icon className="h-10 w-10 text-moss-500 mb-3" />
                    <h4 className="font-semibold text-xl text-forest-800">{activity.name}</h4>
                    <p className="text-sm text-soil-700">{activity.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Booking Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <div className="bg-bone-0 p-6 rounded-lg shadow-lg">
                <h3 className="font-display text-xl text-forest-900 mb-4">Book a Farm Visit</h3>
                <p className="text-soil-700 mb-4 text-sm">This experience is complimentary for our guests. Please let us know at the reception a day in advance.</p>
                <a href="/contact" className="btn btn-primary w-full">Inquire for Day Visits</a>
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
