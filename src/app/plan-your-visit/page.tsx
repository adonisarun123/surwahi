import Link from 'next/link';
import { MapPin, Calendar, Route, Binoculars, HelpCircle, ArrowRight } from 'lucide-react';
import Breadcrumbs from '@/components/Breadcrumbs';
import { generatePageMetadata } from '@/lib/seo';
import Image from 'next/image';

export const metadata = generatePageMetadata(
    'Plan Your Visit | Surwahi Eco Lodge',
    'Everything you need to know before your eco-escape to Kanha. Getting here, best time to visit, safari guides, and FAQs.',
    '/plan-your-visit',
    undefined,
    ['Plan trip to Kanha', 'Kanha travel guide', 'Surwahi location', 'Kanha Safari Booking']
);

const planningResources = [
    {
        title: 'Getting Here',
        description: 'Airports, trains, roads & pickup service.',
        icon: MapPin,
        href: '/plan-your-visit/getting-here',
        color: 'text-red-500 bg-red-50',
    },
    {
        title: 'Best Time to Visit',
        description: 'Season guide, weather & wildlife calendar.',
        icon: Calendar,
        href: '/plan-your-visit/best-time-to-visit',
        color: 'text-amber-500 bg-amber-50',
    },
    {
        title: 'Safari Booking Guide',
        description: 'Zones, timings, costs & how to book permits.',
        icon: Binoculars,
        href: '/plan-your-visit/safari-booking-guide',
        color: 'text-green-600 bg-green-50',
    },
    {
        title: 'FAQs',
        description: 'Common questions about stay, food & facilities.',
        icon: HelpCircle,
        href: '/plan-your-visit/faqs',
        color: 'text-blue-500 bg-blue-50',
    },
    {
        title: 'Curated Itineraries',
        description: 'Weekend escapades, 5-day retreats & festive plans.',
        icon: Route,
        href: '/plan-your-visit/itineraries',
        color: 'text-purple-500 bg-purple-50',
    },
];

export default function PlanYourVisitPage() {
    return (
        <div className="pt-20">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
                <Breadcrumbs />
            </div>

            <section className="relative bg-forest-900 text-white py-20 overflow-hidden">
                <div className="absolute inset-0 z-0 opacity-40">
                    <Image
                        src="https://ik.imagekit.io/adonisarun/Surwahi%20Social%20Photos/IMG_5224.JPG?updatedAt=1762322336000" // Generic nature/road img
                        alt="Path to Surwahi"
                        fill
                        className="object-cover"
                    />
                </div>
                <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h1 className="font-display text-display-xl mb-4 text-bone-0">
                        Plan Your Visit to Surwahi
                    </h1>
                    <p className="text-xl text-bone-0/90 max-w-2xl mx-auto">
                        Everything you need to know to craft your perfect eco-escape. From travel logistics to safari bookings, we&apos;ve got you covered.
                    </p>
                </div>
            </section>

            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
                    {planningResources.map((resource) => (
                        <Link key={resource.title} href={resource.href} className="group bg-bone-0 p-8 rounded-card shadow-sm hover:shadow-md transition-all border border-stone-100 flex flex-col items-start relative overflow-hidden">
                            <div className={`w-14 h-14 rounded-xl flex items-center justify-center mb-6 transition-transform group-hover:scale-110 ${resource.color}`}>
                                <resource.icon className="h-7 w-7" />
                            </div>
                            <h2 className="font-display text-2xl text-forest-900 mb-3 group-hover:text-moss-600 transition-colors">
                                {resource.title}
                            </h2>
                            <p className="text-soil-700 mb-6 leading-relaxed">
                                {resource.description}
                            </p>
                            <div className="mt-auto flex items-center text-moss-600 font-medium group-hover:translate-x-1 transition-transform">
                                Start Planning <ArrowRight className="ml-2 h-4 w-4" />
                            </div>
                        </Link>
                    ))}
                </div>
            </div>

            <section className="bg-sand-50 py-16">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h2 className="font-display text-3xl text-forest-900 mb-4">Still have questions?</h2>
                    <p className="text-soil-700 mb-8 max-w-xl mx-auto">
                        Our team is happy to help you plan a customized itinerary or answer specific queries about your stay.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link href="/contact" className="btn btn-primary">
                            Contact Us
                        </Link>
                        <Link href="/stay" className="btn btn-secondary bg-white">
                            Ready to Book?
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
}
