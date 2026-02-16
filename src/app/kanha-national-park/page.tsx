
import Image from 'next/image';
import Link from 'next/link';
import { generatePageMetadata } from '@/lib/seo';
import Breadcrumbs from '@/components/Breadcrumbs';
import BookingCTA from '@/components/BookingCTA';
import FAQ from '@/components/FAQ';
import { getImageKitUrl } from '@/lib/images';

export const metadata = generatePageMetadata(
    'Kanha National Park Guide | Stay Near Kanha Core Zones',
    'Your ultimate guide to Kanha National Park including safari zones, best time to visit, and flora & fauna. Stay at Surwahi Eco-Lodge for a sustainable wildlife experience.',
    '/kanha-national-park',
    undefined,
    ['Kanha National Park', 'Kanha Safari Zones', 'Best Time to Visit Kanha', 'Kanha Resorts', 'Tiger Reserve Madhya Pradesh']
);

export default function KanhaNationalParkPage() {
    const faqs = [
        {
            question: "When is the best time to visit Kanha National Park?",
            answer: "The park is open from October 1st to June 30th. The best time for tiger sightings is typically the summer months (April to June) when animals gather near water bodies. However, the winter months (November to February) offer pleasant weather and lush landscapes perfect for birdwatching."
        },
        {
            question: "How many safari zones are there in Kanha?",
            answer: "Kanha has four core zones (Kanha, Kisli, Mukki, and Sarhi) and several buffer zones including Khapa, where Surwahi Eco-Lodge is located. Buffer zone safaris offer a unique, less crowded experience with excellent wildlife sighting opportunities."
        },
        {
            question: "How far is Surwahi Eco-Lodge from the park gates?",
            answer: "Surwahi is conveniently located near the Khapa gate of the buffer zone and is a short drive from the Mukki gate of the core zone, making it an ideal base for your safari adventures."
        }
    ];

    return (
        <div className="pt-20">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
                <Breadcrumbs />
            </div>

            {/* Hero Section */}
            <section className="relative h-[60vh] min-h-[500px] flex items-center justify-center">
                <Image
                    src={getImageKitUrl('Website Photos/IMG_5090.JPG')}
                    alt="Tiger in Kanha National Park"
                    fill
                    className="object-cover"
                    priority
                />
                <div className="absolute inset-0 bg-black/40" />
                <div className="relative z-10 text-center text-white px-4 max-w-4xl mx-auto">
                    <h1 className="font-display text-4xl md:text-6xl mb-6">Kanha National Park</h1>
                    <p className="text-xl md:text-2xl font-light">The Land of the Jungle Book</p>
                </div>
            </section>

            {/* Intro Section */}
            <section className="py-16 bg-sand-50">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="max-w-3xl mx-auto text-center">
                        <h2 className="font-display text-3xl text-forest-900 mb-6">A Biodiversity Hotspot</h2>
                        <p className="text-lg text-soil-700 leading-relaxed mb-8">
                            Spanning over 940 sq km, Kanha National Park is one of India&apos;s largest and most scenic tiger reserves. Known for its significant population of Royal Bengal Tigers, Indian Leopards, and Sloth Bears, it is also the only place in the world where you can find the Hard Ground Barasingha (Swamp Deer), which was brought back from the brink of extinction here.
                        </p>
                    </div>
                </div>
            </section>

            {/* Flora & Fauna Grid */}
            <section className="py-16">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="font-display text-3xl text-forest-900 mb-12 text-center">Wildlife of Kanha</h2>
                    <div className="grid md:grid-cols-3 gap-8">
                        <div className="bg-sand-50 rounded-lg overflow-hidden shadow-sm">
                            <div className="relative h-64">
                                <Image src={getImageKitUrl('Website Photos/IMG_5090.JPG')} alt="Royal Bengal Tiger" fill className="object-cover" />
                            </div>
                            <div className="p-6">
                                <h3 className="font-display text-xl text-forest-900 mb-2">Royal Bengal Tiger</h3>
                                <p className="text-soil-700">The apex predator and the star attraction of Kanha.</p>
                            </div>
                        </div>
                        <div className="bg-sand-50 rounded-lg overflow-hidden shadow-sm">
                            <div className="relative h-64">
                                <Image src={getImageKitUrl('Website Photos/IMG20231020170019.jpg')} alt="Barasingha" fill className="object-cover" />
                            </div>
                            <div className="p-6">
                                <h3 className="font-display text-xl text-forest-900 mb-2">Barasingha</h3>
                                <p className="text-soil-700">The &quot;Jewel of Kanha,&quot; these swamp deer are found nowhere else.</p>
                            </div>
                        </div>
                        <div className="bg-sand-50 rounded-lg overflow-hidden shadow-sm">
                            <div className="relative h-64">
                                <Image src={getImageKitUrl('Website Photos/IMG_5091.JPG')} alt="Indian Roller" fill className="object-cover" />
                            </div>
                            <div className="p-6">
                                <h3 className="font-display text-xl text-forest-900 mb-2">Birdlife</h3>
                                <p className="text-soil-700">Over 300 species of birds make Kanha a birder&apos;s paradise.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Zones Section */}
            <section className="py-16 bg-forest-900 text-white">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid md:grid-cols-2 gap-12 items-center">
                        <div>
                            <h2 className="font-display text-3xl mb-6">Safari Zones</h2>
                            <p className="text-lg text-sand-100 mb-6">
                                Kanha is divided into Core and Buffer zones. While Core zones like Kanha and Mukki involve stricter regulations, Buffer zones offer a fantastic, less crowded alternative with high biodiversity.
                            </p>
                            <ul className="space-y-3">
                                <li className="flex items-center gap-3">
                                    <div className="w-2 h-2 bg-moss-500 rounded-full"></div>
                                    <span><strong>Core Zones:</strong> Kanha, Kisli, Mukki, Sarhi</span>
                                </li>
                                <li className="flex items-center gap-3">
                                    <div className="w-2 h-2 bg-moss-500 rounded-full"></div>
                                    <span><strong>Buffer Zones:</strong> Khapa, Khatia, Sijhora, Phen</span>
                                </li>
                            </ul>
                            <div className="mt-8">
                                <Link href="/experiences/wildlife-safaris" className="btn bg-moss-500 text-white hover:bg-moss-600 inline-block px-8 py-3 rounded-full">
                                    Book a Safari
                                </Link>
                            </div>
                        </div>
                        <div className="relative h-[400px] rounded-lg overflow-hidden">
                            <Image src={getImageKitUrl('Website Photos/IMG_4330 (1).JPG')} alt="Safari Vehicle" fill className="object-cover" />
                        </div>
                    </div>
                </div>
            </section>

            <FAQ items={faqs} />

            <BookingCTA
                title="Stay Close to nature"
                description="Experience the best of Kanha National Park with a sustainable stay at Surwahi Eco-Lodge, located right in the Khapa buffer zone."
            />
        </div>
    );
}
