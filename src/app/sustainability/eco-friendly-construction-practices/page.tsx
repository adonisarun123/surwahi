import Image from 'next/image';
import { Check, Wind, Sun, Home, Layers } from 'lucide-react';
import Breadcrumbs from '@/components/Breadcrumbs';
import { generatePageMetadata } from '@/lib/seo';

export const metadata = generatePageMetadata(
  'Eco-Friendly Construction Practices',
  'Learn how we build in harmony with nature.',
  '/sustainability/eco-friendly-construction-practices'
);

const constructionDetails = {
  title: 'Eco-Friendly Construction',
  description: 'Our lodge is built not just on the land, but with it. We believe in an architecture that respects the local ecology, culture, and climate. Our construction practices are a testament to this philosophy, blending traditional wisdom with modern sustainable innovations.',
  images: [
    { src: 'https://placehold.co/1200x800/A8BA9A/333333?text=Mud+House+Construction', alt: 'Workers building a house with mud and natural materials' },
    { src: 'https://placehold.co/800x600/A8BA9A/333333?text=Local+Materials', alt: 'A showcase of local materials used in construction like bamboo, stone, and clay' },
    { src: 'https://placehold.co/800x600/A8BA9A/333333?text=Natural+Ventilation', alt: 'An interior shot showing the design for natural light and ventilation' },
    { src: 'https://placehold.co/800x600/A8BA9A/333333?text=Finished+Eco-Lodge', alt: 'The beautiful exterior of a finished eco-friendly building' },
  ],
  keyPrinciples: [
    'Minimizing the carbon footprint by sourcing materials locally.',
    'Designing for natural light and cross-ventilation to reduce energy consumption.',
    'Reviving and adapting traditional building techniques for modern comfort.',
    'Creating structures that are biodegradable and have a low environmental impact.',
    'Prioritizing the health and well-being of our guests and the planet.',
  ],
  ourMaterials: [
    { name: 'Mud (Cob & Adobe)', description: 'The primary building material, providing excellent thermal insulation, keeping the interiors cool in summer and warm in winter.', icon: Home },
    { name: 'Bamboo', description: 'A fast-growing, renewable resource used for structural elements and roofing.', icon: Layers },
    { name: 'Local Stone', description: 'Used for foundations and flooring, sourced from nearby quarries to reduce transport emissions.', icon: Check },
    { name: 'Reclaimed Wood', description: 'Used for doors, windows, and furniture, giving a second life to old timber.', icon: Wind },
    { name: 'Natural Plasters & Finishes', description: 'Using lime, clay, and cow dung for breathable, non-toxic wall finishes.', icon: Sun },
  ],
};

export default function EcoFriendlyConstructionPage() {
  return (
    <div className="pt-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <Breadcrumbs />
      </div>

      <section className="bg-sand-50 py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="font-display text-display-xl text-forest-900 mb-4">
            {constructionDetails.title}
          </h1>
          <p className="text-body-lg text-soil-700 max-w-3xl mx-auto">
            {constructionDetails.description}
          </p>
        </div>
      </section>

      {/* Image Gallery */}
      <section className="py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="col-span-2 row-span-2">
              <Image src={constructionDetails.images[0].src} alt={constructionDetails.images[0].alt} width={1200} height={800} className="rounded-lg object-cover w-full h-full" />
            </div>
            {constructionDetails.images.slice(1).map((image, index) => (
              <div key={index}>
                <Image src={image.src} alt={image.alt} width={800} height={600} className="rounded-lg object-cover w-full h-full" />
              </div>
            ))}
          </div>
        </div>
      </section>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="font-display text-3xl text-forest-900 mb-6">Our Guiding Principles</h2>
            <ul className="space-y-4">
              {constructionDetails.keyPrinciples.map((principle, index) => (
                <li key={index} className="flex items-start">
                  <Check className="h-6 w-6 text-fern-500 mr-3 flex-shrink-0 mt-1" />
                  <span className="text-lg text-soil-700">{principle}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-sand-50 p-8 rounded-lg">
            <h3 className="font-display text-2xl text-forest-900 mb-6 text-center">The Elements of Our Buildings</h3>
            <div className="space-y-6">
              {constructionDetails.ourMaterials.map((material, index) => (
                <div key={index} className="flex items-start">
                  <material.icon className="h-8 w-8 text-moss-500 mr-4 flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="font-semibold text-xl text-forest-800">{material.name}</h4>
                    <p className="text-sm text-soil-700">{material.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
