import Breadcrumbs from '@/components/Breadcrumbs';
import { generatePageMetadata } from '@/lib/seo';
import Link from 'next/link';
import Image from 'next/image';

import { experienceGroups } from '@/lib/data';
import { ArrowRight } from 'lucide-react';

export const metadata = generatePageMetadata(
    'Kanha Jungle Safaris & Nature Experiences | Surwahi Eco-Lodge',
    'Book Kanha National Park jungle safaris, guided forest walks, and Gond art workshops. Authentic eco-tourism experiences at Surwahi near Khatia Gate.',
    '/experiences',
    undefined,
    ['Jungle Safari Kanha', 'Eco Tourism India', 'Nature Walks Kanha', 'Bird Watching Madhya Pradesh', 'Sustainable Travel Experiences', 'Kanha Activities']
);

export default function ExperiencesPage() {
    return (
        <div className="pt-20">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
                <Breadcrumbs />
            </div>

            <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
                <h1 className="font-display text-display-xl text-forest-900 mb-6">Kanha Jungle Safari & Eco Experiences</h1>
                <p className="text-body-lg text-soil-700 max-w-2xl mx-auto mb-16">
                    We offer a variety of unique, eco-conscious experiences designed to connect you with nature, culture, and yourself.
                </p>

                <div className="space-y-20">
                    {experienceGroups.map((group) => (
                        <div key={group.category} className="text-left">
                            <div className="flex items-end justify-between border-b border-stone-200 pb-4 mb-8">
                                <div>
                                    <h2 className="font-display text-3xl text-forest-900 mb-2">{group.category}</h2>
                                    <p className="text-soil-600">{group.description}</p>
                                </div>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                {group.items.map((experience) => (
                                    <Link href={experience.href} key={experience.name} className="group block bg-bone-0 rounded-card overflow-hidden shadow-elev-1 hover:shadow-elev-2 transition-all">
                                        <div className="aspect-w-4 aspect-h-3 relative overflow-hidden">
                                            <Image
                                                src={experience.imageUrl}
                                                alt={`${experience.name} at Surwahi`}
                                                fill
                                                className="object-cover group-hover:scale-105 transition-transform duration-500"
                                            />
                                        </div>
                                        <div className="p-6">
                                            <h3 className="font-display text-xl text-forest-900 mb-2 group-hover:text-moss-700 transition-colors">{experience.name}</h3>
                                            <p className="text-soil-700 text-sm mb-4">{experience.description}</p>
                                            <span className="inline-flex items-center text-moss-600 text-sm font-medium group-hover:translate-x-1 transition-transform">
                                                Explore <ArrowRight className="ml-1 h-4 w-4" />
                                            </span>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
}

