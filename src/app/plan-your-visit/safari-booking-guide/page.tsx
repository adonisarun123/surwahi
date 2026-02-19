import Breadcrumbs from '@/components/Breadcrumbs';
import { generatePageMetadata } from '@/lib/seo';
import Link from 'next/link';
import { Info } from 'lucide-react';

export const metadata = generatePageMetadata(
    'Kanha Safari Booking Guide | Surwahi Eco Lodge',
    'Complete guide to booking safaris in Kanha National Park. Zones, timings, costs, and tips for the best tiger sightings.',
    '/plan-your-visit/safari-booking-guide',
    undefined,
    ['Kanha Safari Booking', 'Safari Zones Kanha', 'Tiger Safari India', 'Kanha Safari Cost']
);

export default function SafariBookingGuidePage() {
    return (
        <div className="pt-20">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
                <Breadcrumbs />
            </div>

            <section className="bg-sand-50 py-12">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h1 className="font-display text-display-xl text-forest-900 mb-4">
                        Kanha Safari Booking Guide
                    </h1>
                    <p className="text-body-lg text-soil-700 max-w-3xl mx-auto">
                        Navigate the zones, timings, and permit process for a seamless wildlife experience at Kanha Tiger Reserve.
                    </p>
                </div>
            </section>

            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <div className="max-w-4xl mx-auto space-y-12">

                    <section>
                        <h2 className="font-display text-2xl text-forest-900 mb-4">Safari Zones</h2>
                        <div className="grid md:grid-cols-2 gap-6">
                            <div className="p-6 bg-white border border-stone-200 rounded-card">
                                <h3 className="font-bold text-lg mb-2">Core Zones</h3>
                                <p className="text-soil-700 text-sm mb-2">Prime wildlife habitat. Requires advance booking.</p>
                                <ul className="list-disc list-inside text-soil-600 text-sm">
                                    <li><strong>Khatia</strong> (Closest to Surwahi)</li>
                                    <li><strong>Kanha</strong> (Iconic grassland)</li>
                                    <li><strong>Mukki</strong> (Southern entrance)</li>
                                    <li><strong>Sarhi</strong> (Northern side)</li>
                                </ul>
                            </div>
                            <div className="p-6 bg-white border border-stone-200 rounded-card">
                                <h3 className="font-bold text-lg mb-2">Buffer Zones</h3>
                                <p className="text-soil-700 text-sm mb-2">Easier availability, good for leopards/bears.</p>
                                <ul className="list-disc list-inside text-soil-600 text-sm">
                                    <li><strong>Khatia Buffer</strong></li>
                                    <li><strong>Khapa</strong></li>
                                    <li><strong>Sijhora</strong></li>
                                </ul>
                            </div>
                        </div>
                    </section>

                    <section>
                        <h2 className="font-display text-2xl text-forest-900 mb-4">Safari Timings</h2>
                        <div className="overflow-x-auto rounded-xl border border-stone-200 shadow-sm">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="bg-sand-100 text-forest-900 border-b border-sand-200">
                                        <th className="p-4 font-semibold">Season</th>
                                        <th className="p-4 font-semibold">Morning Safari</th>
                                        <th className="p-4 font-semibold">Afternoon Safari</th>
                                    </tr>
                                </thead>
                                <tbody className="text-soil-700 bg-white">
                                    <tr className="border-b border-stone-100">
                                        <td className="p-4">Oct 16 – Nov 15</td>
                                        <td className="p-4">6:00 AM – 11:00 AM</td>
                                        <td className="p-4">2:30 PM – 5:30 PM</td>
                                    </tr>
                                    <tr className="border-b border-stone-100">
                                        <td className="p-4">Nov 16 – Feb 15</td>
                                        <td className="p-4">6:30 AM – 11:00 AM</td>
                                        <td className="p-4">2:00 PM – 5:30 PM</td>
                                    </tr>
                                    <tr className="border-b border-stone-100">
                                        <td className="p-4">Feb 16 – Mar 31</td>
                                        <td className="p-4">5:30 AM – 11:00 AM</td>
                                        <td className="p-4">2:30 PM – 6:00 PM</td>
                                    </tr>
                                    <tr>
                                        <td className="p-4">Apr 1 – Jun 30</td>
                                        <td className="p-4">5:00 AM – 10:30 AM</td>
                                        <td className="p-4">3:00 PM – 6:30 PM</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <p className="text-xs text-stone-500 mt-2">*Note: Timings subject to change by MP Forest Department.</p>
                    </section>

                    <section className="bg-moss-50 p-8 rounded-2xl border border-moss-100">
                        <div className="flex items-start gap-4">
                            <Info className="h-6 w-6 text-moss-600 flex-shrink-0 mt-1" />
                            <div>
                                <h2 className="font-display text-2xl text-forest-900 mb-4">How to Book</h2>
                                <ol className="list-decimal list-inside space-y-3 text-soil-700">
                                    <li><strong>Online:</strong> Through the <a href="https://forest.mponline.gov.in" target="_blank" rel="noreferrer" className="text-moss-700 underline">MP Forest Department portal</a>.</li>
                                    <li><strong>Through Surwahi:</strong> We can arrange permits for confirmed guests. <span className="font-semibold">Recommended for hassle-free experience.</span></li>
                                    <li><strong>On-site:</strong> Very limited availability; not recommended.</li>
                                </ol>
                                <div className="mt-6">
                                    <Link href="/contact" className="btn btn-primary bg-moss-600 hover:bg-moss-700 text-white">
                                        Request Safari Booking
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </section>

                    <section>
                        <h2 className="font-display text-2xl text-forest-900 mb-4">Tips for a Great Safari</h2>
                        <div className="bg-bone-0 p-6 rounded-lg text-soil-700 space-y-2 border border-stone-100">
                            <p>✅ <strong>Book morning safaris</strong> for best tiger sighting chances.</p>
                            <p>✅ <strong>Wear neutral colors</strong> (olive, khaki, brown) — avoid bright colors.</p>
                            <p>✅ <strong>Carry binoculars</strong> and a camera with good zoom.</p>
                            <p>✅ <strong>Stay quiet</strong> — wildlife rewards the calm.</p>
                            <p>✅ <strong>Listen to your guide</strong> — they know the forest intimately.</p>
                        </div>
                    </section>

                </div>
            </div>
        </div>
    );
}
