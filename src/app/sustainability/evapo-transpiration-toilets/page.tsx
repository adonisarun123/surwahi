import Image from 'next/image';
import { Check, Droplets, Recycle, BarChart2 } from 'lucide-react';
import Breadcrumbs from '@/components/Breadcrumbs';
import { generatePageMetadata } from '@/lib/seo';

export const metadata = generatePageMetadata(
  'Evapo-Transpiration Toilets (ETT)',
  'Learn about our innovative and water-saving toilet systems.',
  '/sustainability/evapo-transpiration-toilets'
);

const ettDetails = {
  title: 'Evapo-Transpiration Toilets (ETT)',
  description: 'At the forefront of our sustainability initiatives is the innovative Evapo-Transpiration Toilet system. This is a closed-loop, zero-discharge system that treats wastewater onsite, conserves water, and prevents pollution of local water bodies.',
  images: [
    { src: 'https://placehold.co/1200x800/A8BA9A/333333?text=ETT+System+Diagram', alt: 'A clear diagram explaining the ETT process' },
    { src: 'https://placehold.co/800x600/A8BA9A/333333?text=Banana+Platation', alt: 'A lush banana plantation thriving on the recycled water from the ETT' },
    { src: 'https://placehold.co/800x600/A8BA9A/333333?text=Constructed+Wetland', alt: 'The constructed wetland that is part of the ETT system' },
    { src: 'https://placehold.co/800x600/A8BA9A/333333?text=Clean+Water', alt: 'A symbol of clean water and conservation' },
  ],
  howItWorks: [
    { step: 1, title: 'Collection', description: 'Wastewater from toilets is collected in a sealed, underground tank.' },
    { step: 2, title: 'Anaerobic Digestion', description: 'In the tank, anaerobic bacteria break down the solid waste, turning it into nutrient-rich sludge.' },
    { step: 3, title: 'Natural Filtration', description: 'The liquid effluent then flows through a constructed wetland, a bed of specific plants and gravel that naturally filter and purify the water.' },
    { step: 4, title: 'Evapo-transpiration', description: 'The plants in the wetland absorb the nutrient-rich water, using it for their growth and releasing clean water vapor into the atmosphere through transpiration.' },
  ],
  keyBenefits: [
    { title: 'Zero Discharge', description: 'No wastewater is released into the environment, preventing contamination of groundwater and rivers.', icon: Recycle },
    { title: 'Water Conservation', description: 'The system is completely water-efficient, saving thousands of liters of fresh water.', icon: Droplets },
    { title: 'Nutrient Recycling', description: 'The system creates a mini-ecosystem where nutrients are recycled, supporting a lush plantation of bananas and other plants.', icon: Check },
    { title: 'Low Maintenance', description: 'The ETT is a self-sustaining system that requires minimal energy and maintenance.', icon: BarChart2 },
  ],
  ourImpact: {
    waterSaved: 'Over 1 million liters of water saved annually',
    wasteRecycled: '100% of our blackwater is recycled onsite',
    plantationsSupported: 'Supports a thriving plantation of over 100 banana trees',
  },
};

export default function EttPage() {
  return (
    <div className="pt-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <Breadcrumbs />
      </div>

      <section className="bg-sand-50 py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="font-display text-display-xl text-forest-900 mb-4">
            {ettDetails.title}
          </h1>
          <p className="text-body-lg text-soil-700 max-w-3xl mx-auto">
            {ettDetails.description}
          </p>
        </div>
      </section>

      {/* Image Gallery */}
      <section className="py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="col-span-2 row-span-2">
              <Image src={ettDetails.images[0].src} alt={ettDetails.images[0].alt} width={1200} height={800} className="rounded-lg object-cover w-full h-full" />
            </div>
            {ettDetails.images.slice(1).map((image, index) => (
              <div key={index}>
                <Image src={image.src} alt={image.alt} width={800} height={600} className="rounded-lg object-cover w-full h-full" />
              </div>
            ))}
          </div>
        </div>
      </section>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-display text-3xl text-forest-900 mb-8 text-center">How It Works</h2>
          <div className="relative">
            <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gray-300 hidden md:block" />
            {ettDetails.howItWorks.map((step, index) => (
              <div key={index} className="md:flex items-center mb-8">
                <div className={`md:w-1/2 ${index % 2 === 0 ? 'md:pr-8' : 'md:pl-8 md:text-right'}`}>
                  <h3 className="font-display text-2xl text-forest-800 mb-2">{step.title}</h3>
                  <p className="text-soil-700">{step.description}</p>
                </div>
                <div className="absolute left-1/2 -translate-x-1/2 w-10 h-10 bg-white border-2 border-gray-300 rounded-full flex items-center justify-center font-bold text-moss-600 hidden md:flex">
                  {step.step}
                </div>
                <div className="md:w-1/2" />
              </div>
            ))}
          </div>

          <h2 className="font-display text-3xl text-forest-900 my-12 text-center">Key Benefits</h2>
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            {ettDetails.keyBenefits.map((benefit, index) => (
              <div key={index} className="flex items-start">
                <benefit.icon className="h-10 w-10 text-moss-500 mr-4 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-xl text-forest-800">{benefit.title}</h3>
                  <p className="text-soil-700">{benefit.description}</p>
                </div>
              </div>
            ))}
          </div>

          <h2 className="font-display text-3xl text-forest-900 mb-8 text-center">Our Impact in Numbers</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="bg-sand-50 p-6 rounded-lg">
              <BarChart2 className="h-12 w-12 text-moss-500 mx-auto mb-4" />
              <p className="text-2xl font-bold text-forest-900">{ettDetails.ourImpact.waterSaved}</p>
            </div>
            <div className="bg-sand-50 p-6 rounded-lg">
              <Recycle className="h-12 w-12 text-moss-500 mx-auto mb-4" />
              <p className="text-2xl font-bold text-forest-900">{ettDetails.ourImpact.wasteRecycled}</p>
            </div>
            <div className="bg-sand-50 p-6 rounded-lg">
              <Droplets className="h-12 w-12 text-moss-500 mx-auto mb-4" />
              <p className="text-2xl font-bold text-forest-900">{ettDetails.ourImpact.plantationsSupported}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
