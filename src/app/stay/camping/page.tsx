import Link from 'next/link';
import { Tent } from 'lucide-react';
import Breadcrumbs from '@/components/Breadcrumbs';
import { generatePageMetadata } from '@/lib/seo';

export const metadata = generatePageMetadata(
    'Camping Tents',
    'Seasonal camping under 6,000 trees at Surwahi, 21 km from Kanha\'s Khatia gate - shared eco washrooms, fresh meals and full estate access.',
    '/stay/camping',
    undefined,
    ['Camping Kanha', 'Tent Stay Kanha', 'Glamping India', 'Jungle Camping']
);

export default function CampingTentsPage() {
    return (
        <div className="pt-20">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
                <Breadcrumbs />
            </div>

            <section className="bg-sand-50 py-12">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h1 className="font-display text-display-xl text-forest-900 mb-4">
                        Camping Under the Trees
                    </h1>
                    <p className="text-body-lg text-soil-700 max-w-2xl mx-auto">
                        Seasonal tents pitched within the estate - the closest you can sleep to the forest itself.
                    </p>
                </div>
            </section>

            <section className="py-12">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl">
                    <div className="bg-bone-0 rounded-card shadow-elev-1 p-8">
                        <div className="flex items-center gap-3 mb-4">
                            <Tent className="h-6 w-6 text-moss-500" />
                            <h2 className="font-display text-2xl text-forest-900">The Camp Area</h2>
                        </div>
                        <p className="text-soil-700 mb-4">
                            For travellers who want nothing but canvas between themselves and the night sounds of Kanha. Campers share the estate&apos;s
                            eco-friendly washrooms with wood-fired hot water, eat from the open Kodo Kutki Kitchen, and have full access to Satkon and the grounds.
                        </p>
                        <p className="text-soil-700 mb-6">
                            Camping runs seasonally, so dates and rates are shared on enquiry.
                        </p>
                        <div className="flex flex-wrap gap-3">
                            <Link href="/contact" className="btn btn-primary">Enquire about camping</Link>
                            <Link href="/stay" className="btn btn-secondary">See rooms &amp; dormitory</Link>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
