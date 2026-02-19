import Breadcrumbs from '@/components/Breadcrumbs';
import { generatePageMetadata } from '@/lib/seo';
import Link from 'next/link';

export const metadata = generatePageMetadata(
    'Best Time to Visit Kanha National Park | Surwahi Eco Lodge',
    'Month-by-month guide to weather, wildlife sightings, and what to pack for your trip to Kanha National Park.',
    '/plan-your-visit/best-time-to-visit',
    undefined,
    ['Kanha weather', 'Best time for tiger sighting', 'Kanha safari season', 'Packing list Kanha']
);

const months = [
    { name: 'Oct', temp: '20-30°C', safari: '✅ Opens mid-Oct', highlights: 'Lush green, fewer crowds, fresh after monsoon' },
    { name: 'Nov', temp: '15-28°C', safari: '✅', highlights: 'Pleasant weather, good sighting, Diwali special itinerary' },
    { name: 'Dec', temp: '8-25°C', safari: '✅', highlights: 'Peak tourist season, cold mornings, excellent safaris' },
    { name: 'Jan', temp: '5-22°C', safari: '✅', highlights: 'Coldest month, misty mornings, bird watching at best' },
    { name: 'Feb', temp: '10-28°C', safari: '✅', highlights: 'Warming up, sal trees in bloom, great photography' },
    { name: 'Mar', temp: '15-35°C', safari: '✅', highlights: 'Holi festival, trees shedding, tiger sighting improves' },
    { name: 'Apr', temp: '22-40°C', safari: '✅', highlights: 'Hot days, best tiger sighting, waterholes active' },
    { name: 'May', temp: '28-42°C', safari: '✅', highlights: 'Hottest, water scarcity brings animals to open areas' },
    { name: 'Jun', temp: '30-40°C', safari: '⚠️ Closes end June', highlights: 'Last chance before monsoon' },
    { name: 'Jul', temp: '25-35°C', safari: '❌ Closed', highlights: 'Monsoon, heavy rains, park closed' },
    { name: 'Aug', temp: '24-33°C', safari: '❌ Closed', highlights: 'Peak monsoon' },
    { name: 'Sep', temp: '23-32°C', safari: '❌ Closed', highlights: 'Rains easing, park still closed' },
];

export default function BestTimeToVisitPage() {
    return (
        <div className="pt-20">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
                <Breadcrumbs />
            </div>

            <section className="bg-sand-50 py-12">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h1 className="font-display text-display-xl text-forest-900 mb-4">
                        Best Time to Visit Kanha
                    </h1>
                    <p className="text-body-lg text-soil-700 max-w-3xl mx-auto">
                        Kanha National Park offers a different magic in every season. Whether you seek lush greenery, winter mists, or the drama of tiger sightings in summer, we have a guide for you.
                    </p>
                </div>
            </section>

            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="max-w-5xl mx-auto">

                    <div className="grid md:grid-cols-2 gap-8 mb-16">
                        <div className="bg-bone-0 p-6 rounded-card shadow-sm border border-stone-100">
                            <h2 className="font-display text-xl text-forest-800 mb-4">Quick Summary</h2>
                            <ul className="space-y-3 text-soil-700">
                                <li><strong>Best Overall:</strong> October–March (cool, dry, excellent wildlife)</li>
                                <li><strong>Peak Tiger Sighting:</strong> March–May (animals at waterholes)</li>
                                <li><strong>Park Closed:</strong> July 1 – October 15 (Monsoon)</li>
                                <li><strong>Surwahi Open:</strong> Year-round (Activities available)</li>
                            </ul>
                        </div>
                        <div className="bg-moss-50 p-6 rounded-card shadow-sm border border-moss-100">
                            <h2 className="font-display text-xl text-forest-800 mb-4">Festivals at Surwahi</h2>
                            <ul className="space-y-3 text-soil-700">
                                <li><strong>Holi (March):</strong> Special itinerary with tribal celebrations</li>
                                <li><strong>Diwali (Oct/Nov):</strong> Lantern-lit evenings, rangoli workshops</li>
                                <li><strong>New Year:</strong> Bonfire celebrations under the stars</li>
                            </ul>
                        </div>
                    </div>

                    <h2 className="font-display text-2xl text-forest-900 mb-6">Month-by-Month Guide</h2>
                    <div className="overflow-x-auto mb-16 rounded-xl border border-stone-200 shadow-sm">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-sand-100 text-forest-900 border-b border-sand-200">
                                    <th className="p-4 font-semibold">Month</th>
                                    <th className="p-4 font-semibold">Temp</th>
                                    <th className="p-4 font-semibold">Safari Status</th>
                                    <th className="p-4 font-semibold">Highlights</th>
                                </tr>
                            </thead>
                            <tbody className="text-soil-700 bg-white">
                                {months.map((m) => (
                                    <tr key={m.name} className="border-b border-stone-100 hover:bg-stone-50 transition-colors">
                                        <td className="p-4 font-medium">{m.name}</td>
                                        <td className="p-4">{m.temp}</td>
                                        <td className="p-4">{m.safari}</td>
                                        <td className="p-4">{m.highlights}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    <section className="bg-stone-100 p-8 rounded-2xl">
                        <h2 className="font-display text-2xl text-forest-900 mb-6">What to Pack</h2>
                        <div className="grid md:grid-cols-3 gap-8">
                            <div>
                                <h3 className="font-bold text-lg text-forest-800 mb-2">Oct – Feb (Winter)</h3>
                                <p className="text-soil-700 text-sm">Light layers for day, warm jacket/fleece for morning safaris (can drop to 5°C), beanie, gloves, comfortable shoes.</p>
                            </div>
                            <div>
                                <h3 className="font-bold text-lg text-forest-800 mb-2">Mar – Jun (Summer)</h3>
                                <p className="text-soil-700 text-sm">Light cotton clothes, hat/cap, sunglasses, sunscreen, scarf for dust protection, plenty of hydration.</p>
                            </div>
                            <div>
                                <h3 className="font-bold text-lg text-forest-800 mb-2">Year-round Essentials</h3>
                                <p className="text-soil-700 text-sm">Binoculars, camera with zoom lens, insect repellent, neutral-colored clothing (camo, olive, khaki, brown) for safaris.</p>
                            </div>
                        </div>
                    </section>

                </div>
            </div>
        </div>
    );
}
