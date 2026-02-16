import Breadcrumbs from '@/components/Breadcrumbs';
import { generatePageMetadata } from '@/lib/seo';
import Link from 'next/link';
import Image from 'next/image';
import { experienceImages } from '@/lib/images';

export const metadata = generatePageMetadata(
    'Kanha Jungle Safaris & Nature Experiences | Surwahi Eco-Lodge',
    'Book Kanha National Park jungle safaris, guided forest walks, and Gond art workshops. Authentic eco-tourism experiences at Surwahi near Khatia Gate.',
    '/experiences',
    undefined,
    ['Jungle Safari Kanha', 'Eco Tourism India', 'Nature Walks Kanha', 'Bird Watching Madhya Pradesh', 'Sustainable Travel Experiences', 'Kanha Activities']
);

const experiences = [
    {
        name: 'Wildlife Safaris',
        href: '/experiences/wildlife-safaris',
        imageUrl: experienceImages.wildlifeSafaris,
        description: 'Explore the wild side of Kanha.'
    },
    {
        name: 'Guided Forest Trails',
        href: '/experiences/guided-forest-trails',
        imageUrl: experienceImages.guidedForestTrails,
        description: 'Walk through the serene forest paths.'
    },
    {
        name: 'Bird-watching Expeditions',
        href: '/experiences/bird-watching-expeditions',
        imageUrl: experienceImages.birdWatching,
        description: 'Discover the diverse avian life.'
    },
    {
        name: 'Farm Life Visit',
        href: '/experiences/farm-life-visit',
        imageUrl: experienceImages.farmLife,
        description: 'Experience authentic rural life.'
    },
    {
        name: 'Know Your Crop',
        href: '/experiences/know-your-crop',
        imageUrl: experienceImages.knowYourCrop,
        description: 'Learn about organic farming.'
    },
    {
        name: 'Play @ Surwahi',
        href: '/experiences/play-at-surwahi',
        imageUrl: experienceImages.playAtSurwahi,
        description: 'Fun and games in nature for all ages.'
    },
    {
        name: 'Outdoor Sports & Nature Games',
        href: '/experiences/outdoor-sports-and-nature-games',
        imageUrl: experienceImages.outdoorSports,
        description: 'Get active in the great outdoors.'
    },
    {
        name: 'Eco Volunteering Programs',
        href: '/experiences/eco-volunteering-programs',
        imageUrl: experienceImages.ecoVolunteering,
        description: 'Contribute to our conservation efforts.'
    },
    {
        name: 'Cultural Immersion & Local Life',
        href: '/experiences/cultural-immersion',
        imageUrl: experienceImages.culturalImmersion,
        description: 'Connect with the local community.'
    },
    {
        name: 'Live Tribal Cooking Experiences',
        href: '/experiences/live-tribal-cooking-experiences',
        imageUrl: experienceImages.tribalCooking,
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
                <h1 className="font-display text-display-xl text-forest-900 mb-8 text-center">Kanha Jungle Safari & Eco Experiences</h1>
                <p className="text-center text-body-lg text-soil-700 max-w-2xl mx-auto mb-12">
                    We offer a variety of unique, eco-conscious experiences designed to connect you with nature, culture, and yourself.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {experiences.map((experience) => (
                        <Link href={experience.href} key={experience.name} className="group block bg-bone-0 rounded-card overflow-hidden shadow-elev-1 hover:shadow-elev-2 transition-all">
                            <div className="aspect-w-4 aspect-h-3 relative overflow-hidden">
                                <Image
                                    src={experience.imageUrl}
                                    alt={`${experience.name} experience at Kanha National Park`}
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
