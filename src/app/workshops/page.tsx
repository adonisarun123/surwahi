import Breadcrumbs from '@/components/Breadcrumbs';
import { generatePageMetadata } from '@/lib/seo';
import Link from 'next/link';
import Image from 'next/image';

export const metadata = generatePageMetadata(
  'Workshops & Learning',
  'Engage in hands-on workshops and learning experiences, from pottery and tribal art to stargazing and eco-construction.',
  '/workshops'
);

const workshops = [
    { name: 'Star Gazing Nights', href: '/workshops/star-gazing-nights', imageUrl: 'https://placehold.co/600x400/A8BA9A/333333?text=Star+Gazing', description: 'Explore the cosmos from our dark sky location.' },
    { name: 'Astro-Photography', href: '/workshops/astro-photography', imageUrl: 'https://placehold.co/600x400/A8BA9A/333333?text=Astro-Photography', description: 'Capture the beauty of the night sky.' },
    { name: 'Earthen Pottery', href: '/workshops/earthen-pottery', imageUrl: 'https://placehold.co/600x400/A8BA9A/333333?text=Pottery', description: 'Craft your own pottery from local clay.' },
    { name: 'Gond Art Workshops', href: '/workshops/gond-art-workshops', imageUrl: 'https://placehold.co/600x400/A8BA9A/333333?text=Gond+Art', description: 'Learn the intricate art of the Gond tribe.' },
    { name: 'Bamboo & Lantana Crafting', href: '/workshops/bamboo-and-lantana-crafting', imageUrl: 'https://placehold.co/600x400/A8BA9A/333333?text=Crafting', description: 'Create beautiful objects from natural materials.' },
    { name: 'Forest Bathing (Shinrin-Yoku)', href: '/workshops/forest-bathing', imageUrl: 'https://placehold.co/600x400/A8BA9A/333333?text=Forest+Bathing', description: 'Reconnect with nature and yourself.' },
    { name: 'Leaf Plate Making', href: '/workshops/leaf-plate-making', imageUrl: 'https://placehold.co/600x400/A8BA9A/333333?text=Leaf+Plates', description: 'Learn the traditional art of making leaf plates.' },
    { name: 'Food Foraging Trails', href: '/workshops/food-foraging-trails', imageUrl: 'https://placehold.co/600x400/A8BA9A/333333?text=Foraging', description: 'Discover the edible treasures of the forest.' },
    { name: 'Herping Walks (Amphibian Study)', href: '/workshops/herping-walks', imageUrl: 'https://placehold.co/600x400/A8BA9A/333333?text=Herping', description: 'Explore the world of reptiles and amphibians.' },
    { name: 'The Art of Regeneration', href: '/workshops/the-art-of-regeneration', imageUrl: 'https://placehold.co/600x400/A8BA9A/333333?text=Regeneration', description: 'Learn about ecological restoration.' },
    { name: 'Grassroots Governance & Local Democracy', href: '/workshops/grassroots-governance-and-local-democracy', imageUrl: 'https://placehold.co/600x400/A8BA9A/333333?text=Governance', description: 'Understand local community structures.' },
    { name: 'Nature’s Pharmacy (Herbal Healing)', href: '/workshops/natures-pharmacy', imageUrl: 'https://placehold.co/600x400/A8BA9A/333333?text=Herbal+Healing', description: 'Discover the medicinal properties of local plants.' },
    { name: 'Build With Mud (Eco-Architecture)', href: '/workshops/build-with-mud', imageUrl: 'https://placehold.co/600x400/A8BA9A/333333?text=Mud+Building', description: 'Learn the art of sustainable construction.' },
];

export default function WorkshopsPage() {
  return (
    <div className="pt-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <Breadcrumbs />
      </div>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="font-display text-display-xl text-forest-900 mb-8 text-center">Workshops & Learning</h1>
        <p className="text-center text-body-lg text-soil-700 max-w-2xl mx-auto mb-12">
          Immerse yourself in hands-on learning experiences that connect you with nature, culture, and new skills.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {workshops.map((workshop) => (
                <Link href={workshop.href} key={workshop.name} className="group block bg-bone-0 rounded-card overflow-hidden shadow-elev-1 hover:shadow-elev-2 transition-all">
                    <div className="aspect-w-4 aspect-h-3 relative overflow-hidden">
                        <Image
                            src={workshop.imageUrl}
                            alt={workshop.name}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                    </div>
                    <div className="p-6">
                        <h3 className="font-display text-2xl text-forest-900 mb-2">{workshop.name}</h3>
                        <p className="text-soil-700 text-sm">{workshop.description}</p>
                    </div>
                </Link>
            ))}
        </div>
      </div>
    </div>
  );
}
