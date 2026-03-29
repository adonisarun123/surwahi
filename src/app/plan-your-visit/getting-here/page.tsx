import Breadcrumbs from '@/components/Breadcrumbs';
import { generatePageMetadata } from '@/lib/seo';
import Link from 'next/link';
import { Plane, Train, Car, MapPin, CheckCircle } from 'lucide-react';

export const metadata = generatePageMetadata(
    'How to Reach Surwahi Eco Lodge Near Kanha National Park',
    'Directions to Surwahi from Jabalpur, Nagpur, Bhopal & Delhi. Nearest airports, train stations, road routes, and pickup service to our eco lodge near Kanha Tiger Reserve.',
    '/plan-your-visit/getting-here',
    undefined,
    ['How to reach Kanha', 'Jabalpur to Kanha', 'Nagpur to Kanha', 'Surwahi Location', 'Travel to Kanha National Park']
);

export default function GettingHerePage() {
    return (
        <div className="pt-20">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
                <Breadcrumbs />
            </div>

            <section className="bg-sand-50 py-12">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h1 className="font-display text-display-xl text-forest-900 mb-4">
                        How to Reach Surwahi Eco Lodge, Kanha
                    </h1>
                    <p className="text-body-lg text-soil-700 max-w-3xl mx-auto">
                        Located just 12km from the Khatia Gate of Kanha National Park, Surwahi is accessible by air, rail, and road. The journey itself takes you through the beautiful landscapes of Madhya Pradesh.
                    </p>
                    <div className="max-w-3xl mx-auto mt-10 text-left">
                        <h2 className="font-display text-xl md:text-2xl text-forest-900 mb-3">
                            How far is Surwahi from Kanha National Park?
                        </h2>
                        <p className="text-soil-700 leading-relaxed">
                            Surwahi Social Ecoestate is about <strong>12 km from the Khatia gate</strong> of Kanha National Park—close enough for straightforward safari access, yet set in quieter buffer-zone countryside. Most guests drive from Jabalpur (~160 km), Gondia (~145 km), or Nagpur (~270 km), then continue via Mandla toward the park gates.
                        </p>
                    </div>
                </div>
            </section>

            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <div className="max-w-4xl mx-auto space-y-16">

                    {/* By Air */}
                    <section id="by-air" className="scroll-mt-24">
                        <div className="flex items-center mb-6">
                            <div className="w-12 h-12 bg-sky-100 rounded-full flex items-center justify-center mr-4">
                                <Plane className="h-6 w-6 text-sky-600" />
                            </div>
                            <h2 className="font-display text-2xl text-forest-900">By Air</h2>
                        </div>
                        <div className="grid md:grid-cols-2 gap-8">
                            <div className="bg-bone-0 p-6 rounded-card shadow-sm border border-stone-100">
                                <h3 className="font-bold text-lg text-forest-800 mb-2">Jabalpur Airport (JLR)</h3>
                                <p className="text-soil-700 mb-4">~160 km / 3.5 hours drive</p>
                                <ul className="space-y-2 text-sm text-soil-600">
                                    <li className="flex items-start"><CheckCircle className="h-4 w-4 text-green-500 mr-2 mt-0.5" /> Flights from Delhi, Mumbai, Bangalore, Hyderabad</li>
                                    <li className="flex items-start"><CheckCircle className="h-4 w-4 text-green-500 mr-2 mt-0.5" /> Airlines: IndiGo, SpiceJet, Air India</li>
                                </ul>
                            </div>
                            <div className="bg-bone-0 p-6 rounded-card shadow-sm border border-stone-100">
                                <h3 className="font-bold text-lg text-forest-800 mb-2">Nagpur Airport (NAG)</h3>
                                <p className="text-soil-700 mb-4">~270 km / 5.5 hours drive</p>
                                <ul className="space-y-2 text-sm text-soil-600">
                                    <li className="flex items-start"><CheckCircle className="h-4 w-4 text-green-500 mr-2 mt-0.5" /> Better connectivity for South India travelers</li>
                                    <li className="flex items-start"><CheckCircle className="h-4 w-4 text-green-500 mr-2 mt-0.5" /> Airlines: IndiGo, SpiceJet, Air India, Vistara</li>
                                </ul>
                            </div>
                        </div>
                    </section>

                    {/* By Train */}
                    <section id="by-train" className="scroll-mt-24">
                        <div className="flex items-center mb-6">
                            <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center mr-4">
                                <Train className="h-6 w-6 text-amber-600" />
                            </div>
                            <h2 className="font-display text-2xl text-forest-900">By Train</h2>
                        </div>
                        <div className="bg-bone-0 p-6 rounded-card shadow-sm border border-stone-100">
                            <ul className="space-y-4 text-soil-700">
                                <li><strong>Jabalpur Junction (JBP):</strong> Main railhead, well connected to all major cities (Delhi, Mumbai, Kolkata, etc.). ~3.5 hours drive to Surwahi.</li>
                                <li><strong>Gondia Junction (G):</strong> Alternative for travelers from Nagpur/South. ~3 hours drive.</li>
                                <li><strong>Balaghat Station (BTC):</strong> Nearest small station, limited trains. ~1.5 hours drive.</li>
                            </ul>
                        </div>
                    </section>

                    {/* By Road */}
                    <section id="by-road" className="scroll-mt-24">
                        <div className="flex items-center mb-6">
                            <div className="w-12 h-12 bg-stone-200 rounded-full flex items-center justify-center mr-4">
                                <Car className="h-6 w-6 text-stone-600" />
                            </div>
                            <h2 className="font-display text-2xl text-forest-900">By Road</h2>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="bg-sand-100 text-forest-900 border-b border-sand-200">
                                        <th className="p-4 font-semibold">From</th>
                                        <th className="p-4 font-semibold">Distance</th>
                                        <th className="p-4 font-semibold">Drive Time</th>
                                        <th className="p-4 font-semibold">Route</th>
                                    </tr>
                                </thead>
                                <tbody className="text-soil-700">
                                    <tr className="border-b border-sand-50">
                                        <td className="p-4">Jabalpur</td>
                                        <td className="p-4">160 km</td>
                                        <td className="p-4">3.5 hrs</td>
                                        <td className="p-4">NH30 via Mandla</td>
                                    </tr>
                                    <tr className="border-b border-sand-50">
                                        <td className="p-4">Nagpur</td>
                                        <td className="p-4">270 km</td>
                                        <td className="p-4">5.5 hrs</td>
                                        <td className="p-4">NH44 → NH30</td>
                                    </tr>
                                    <tr className="border-b border-sand-50">
                                        <td className="p-4">Raipur</td>
                                        <td className="p-4">220 km</td>
                                        <td className="p-4">4.5 hrs</td>
                                        <td className="p-4">via Chilpi</td>
                                    </tr>
                                    <tr className="border-b border-sand-50">
                                        <td className="p-4">Bhopal</td>
                                        <td className="p-4">480 km</td>
                                        <td className="p-4">9 hrs</td>
                                        <td className="p-4">NH46 → NH30</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </section>

                    {/* Pickup Service */}
                    <section className="bg-moss-50 p-8 rounded-2xl border border-moss-100">
                        <h2 className="font-display text-2xl text-forest-900 mb-4">Surwahi Pickup Service</h2>
                        <p className="text-soil-700 mb-4">
                            We offer reliable and comfortable pickup/drop services from Jabalpur, Nagpur, Gondia, and Raipur. Our drivers are experienced with the forest roads.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4">
                            <Link href="/contact" className="btn btn-primary bg-moss-600 hover:bg-moss-700 text-white">
                                Request Pickup Quote
                            </Link>
                            <a href="tel:+917795207779" className="btn btn-secondary border-moss-600 text-moss-700 hover:bg-moss-100">
                                Call to Book: +91 77952 07779
                            </a>
                        </div>
                    </section>

                    {/* Location Map */}
                    <section id="location" className="scroll-mt-24">
                        <div className="flex items-center mb-6">
                            <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mr-4">
                                <MapPin className="h-6 w-6 text-red-600" />
                            </div>
                            <h2 className="font-display text-2xl text-forest-900">Exact Location</h2>
                        </div>
                        <address className="not-italic text-soil-700 mb-6 bg-sand-50 p-4 rounded-lg inline-block">
                            <strong>Surwahi Social Ecoestate Kanha</strong><br />
                            Village Surwahi, P.O Majgaon,<br />
                            Tehsil Paraswada, District Balaghat,<br />
                            Madhya Pradesh – 481111
                        </address>
                        <div className="w-full h-[400px] rounded-xl overflow-hidden shadow-md">
                            <iframe
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3687.9768656641!2d80.52843731496155!3d22.43000008525624!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a2a0ca75f087ccb%3A0xe89d09f64b652f09!2sSurwahi%20Social%20Ecoestate%20Kanha!5e0!3m2!1sen!2sin!4v1675765432109!5m2!1sen!2sin"
                                width="100%"
                                height="100%"
                                style={{ border: 0 }}
                                allowFullScreen
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                                title="Surwahi Location Map"
                            />
                        </div>
                        <p className="text-sm text-soil-600 mt-4 italic">
                            Note: The final 2km stretch from the main road to Surwahi is an unpaved forest road. It is accessible by all cars, but driving slowly is recommended. We advise arriving before sunset to enjoy the views and avoid navigating the forest road in the dark.
                        </p>
                    </section>

                </div>
            </div>
        </div>
    );
}
