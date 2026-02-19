import Link from 'next/link';
import { Heart, Globe, Users, Award } from 'lucide-react';
import Breadcrumbs from '@/components/Breadcrumbs';
import { generatePageMetadata } from '@/lib/seo';

export const metadata = generatePageMetadata(
    'Why Surwahi? | Sustainable Tourism & Community Impact',
    'More than just a stay. Discover how your visit contributes to forest regeneration, local employment, and preserving the Baiga culture.',
    '/about/why-surwahi',
    undefined,
    ['Sustainable Impact', 'Community Tourism', 'Regenerative Travel', 'Eco Friendly Stay', 'Social Impact India']
);

const impactMetrics = [
    { label: 'Trees Planted', value: '1,500+', icon: Globe },
    { label: 'Local Jobs Created', value: '45+', icon: Users },
    { label: 'Water Conserved', value: '1M+ Liters', icon: Heart },
    { label: 'Awards Won', value: '5+', icon: Award },
];

export default function WhySurwahiPage() {
    return (
        <div className="pt-20">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
                <Breadcrumbs />
            </div>

            <section className="bg-sand-50 py-12">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h1 className="font-display text-display-xl text-forest-900 mb-4">
                        Why Surwahi?
                    </h1>
                    <p className="text-body-lg text-soil-700 max-w-3xl mx-auto">
                        Because your stay matters. Surwahi is built on the belief that tourism can be a force for good—restoring nature, empowering communities, and enriching the soul.
                    </p>
                </div>
            </section>

            {/* Impact Metrics */}
            <section className="py-16 bg-white">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                        {impactMetrics.map((metric) => (
                            <div key={metric.label} className="text-center p-6 bg-sand-50 rounded-lg">
                                <div className="flex justify-center mb-4">
                                    <metric.icon className="h-8 w-8 text-moss-500" />
                                </div>
                                <div className="text-3xl font-bold text-forest-900 mb-2">{metric.value}</div>
                                <div className="text-soil-600 font-medium">{metric.label}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* The Core Reasons */}
            <section className="py-16">
                <div className="container mx-auto px-4 max-w-4xl">
                    <div className="space-y-16">
                        <div className="flex flex-col md:flex-row gap-8 items-center">
                            <div className="flex-1">
                                <h2 className="font-display text-3xl text-forest-900 mb-4">Regeneration over Consumption</h2>
                                <p className="text-soil-700 leading-relaxed">
                                    Unlike traditional resorts that consume resources, Surwahi gives back. We generate our own power, harvest our own rain, and grow our own food. By staying here, you actively support the regeneration of a once-degraded landscape into a thriving forest ecosystem.
                                </p>
                            </div>
                            {/* Placeholder for illustration/image */}
                            <div className="w-full md:w-1/3 bg-moss-100 aspect-square rounded-full flex items-center justify-center">
                                <Globe className="w-24 h-24 text-moss-500 opacity-50" />
                            </div>
                        </div>

                        <div className="flex flex-col md:flex-row-reverse gap-8 items-center">
                            <div className="flex-1">
                                <h2 className="font-display text-3xl text-forest-900 mb-4">Community at the Core</h2>
                                <p className="text-soil-700 leading-relaxed">
                                    We are proud partners with the local indigenous Baiga and Gond communities. Your visit helps sustain traditional livelihoods, supports local artisans, and funds community development projects. Surwahi isn&apos;t just in the community; it is OF the community.
                                </p>
                            </div>
                            <div className="w-full md:w-1/3 bg-sand-200 aspect-square rounded-full flex items-center justify-center">
                                <Users className="w-24 h-24 text-soil-500 opacity-50" />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="py-16 bg-moss-900 text-white text-center">
                <div className="container mx-auto px-4">
                    <h2 className="font-display text-3xl mb-6">Become a Part of the Solution</h2>
                    <p className="max-w-2xl mx-auto mb-8 text-moss-100">
                        Choose a vacation that aligns with your values. Experience the joy of conscious travel.
                    </p>
                    <Link href="/stay" className="btn bg-white text-moss-900 hover:bg-sand-100 border-none">
                        Book Your Conscious Stay
                    </Link>
                </div>
            </section>

        </div>
    );
}
