import Breadcrumbs from '@/components/Breadcrumbs';
import { generatePageMetadata } from '@/lib/seo';
import Link from 'next/link';
import Image from 'next/image';

export const metadata = generatePageMetadata(
  'Experiences at Surwahi',
  'Discover a wide range of experiences, from wilderness safaris and guided walks to cultural interactions and outdoor adventures.',
  '/experiences'
);

const experiences = [
    {
        name: 'Wildlife Safaris',
        href: '/experiences/wildlife-safaris',
        imageUrl: 'https://placehold.co/600x400/A8BA9A/333333?text=Wildlife+Safari',
        description: 'Explore the wild side of Kanha.'
    },
    {
        name: 'Guided Forest Trails',
        href: '/experiences/guided-forest-trails',
        imageUrl: 'https://placehold.co/600x400/A8BA9A/333333?text=Forest+Trail',
        description: 'Walk through the serene forest paths.'
    },
    {
        name: 'Bird-watching Expeditions',
        href: '/experiences/bird-watching-expeditions',
        imageUrl: 'https://placehold.co/600x400/A8BA9A/333333?text=Bird+Watching',
        description: 'Discover the diverse avian life.'
    },
    {
        name: 'Farm Life Visit',
        href: '/experiences/farm-life-visit',
        imageUrl: 'https://placehold.co/600x400/A8BA9A/333333?text=Farm+Visit',
        description: 'Experience authentic rural life.'
    },
    {
        name: 'Know Your Crop',
        href: '/experiences/know-your-crop',
        imageUrl: 'https://placehold.co/600x400/A8BA9A/333333?text=Organic+Farming',
        description: 'Learn about organic farming.'
    },
    {
        name: 'Play @ Surwahi',
        href: '/experiences/play-at-surwahi',
        imageUrl: 'https://placehold.co/600x400/A8BA9A/333333?text=Kids+Zone',
        description: 'Fun and games in nature for all ages.'
    },
    {
        name: 'Outdoor Sports & Nature Games',
        href: '/experiences/outdoor-sports-and-nature-games',
        imageUrl: 'https://placehold.co/600x400/A8BA9A/333333?text=Outdoor+Sports',
        description: 'Get active in the great outdoors.'
    },
    {
        name: 'Eco Volunteering Programs',
        href: '/experiences/eco-volunteering-programs',
        imageUrl: 'https://placehold.co/600x400/A8BA9A/333333?text=Volunteering',
        description: 'Contribute to our conservation efforts.'
    },
    {
        name: 'Cultural Immersion & Local Life',
        href: '/experiences/cultural-immersion-and-local-life',
        imageUrl: 'https://placehold.co/600x400/A8BA9A/333333?text=Local+Culture',
        description: 'Connect with the local community.'
    },
    {
        name: 'Live Tribal Cooking Experiences',
        href: '/experiences/live-tribal-cooking-experiences',
        imageUrl: 'https://placehold.co/600x400/A8BA9A/333333?text=Tribal+Cooking',
        description: 'Learn the secrets of local cuisine.'
    },
];

export default function ExperiencesPage() {
  return (
    <div className="pt-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <Breadcrumbs />
      </div>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="font-display text-display-xl text-forest-900 mb-8 text-center">Our Experiences</h1>
        <p className="text-center text-body-lg text-soil-700 max-w-2xl mx-auto mb-12">
            We offer a variety of unique, eco-conscious experiences designed to connect you with nature, culture, and yourself.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {experiences.map((experience) => (
                <Link href={experience.href} key={experience.name} className="group block bg-bone-0 rounded-card overflow-hidden shadow-elev-1 hover:shadow-elev-2 transition-all">
                    <div className="aspect-w-4 aspect-h-3 relative overflow-hidden">
                        <Image
                            src={experience.imageUrl}
                            alt={experience.name}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                    </div>
                    <div className="p-6">
                        <h3 className="font-display text-2xl text-forest-900 mb-2">{experience.name}</h3>
                        <p className="text-soil-700 text-sm">{experience.description}</p>
                    </div>
                </Link>
            ))}
        </div>
      </div>
    </div>
  );
}
