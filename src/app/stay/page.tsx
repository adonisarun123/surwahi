import Link from 'next/link';
import Image from 'next/image';
import { Wifi, Wind, Sun, Coffee, Users, ArrowRight } from 'lucide-react';
import Breadcrumbs from '@/components/Breadcrumbs';
import { generatePageMetadata } from '@/lib/seo';
import { accommodationImages } from '@/lib/images';

export const metadata = generatePageMetadata(
    'Eco Accommodations Near Kanha | Suites, Mudhouses & Camping | Surwahi',
    'Stay in eco-friendly suites, traditional mudhouses, or under the stars near Kanha Tiger Reserve. Sustainable accommodation crafted from local materials.',
    '/stay',
    undefined,
    ['Eco Friendly Accommodation Kanha', 'Sustainable Stays India', 'Mud Cottages', 'Camping Kanha', 'Forest Stay']
);

const roomTypes = [
    {
        title: 'Suites',
        description: 'Luxurious and private, offering forest views and premium amenities.',
        price: 'From ₹8,500/night',
        capacity: '2 guests',
        features: ['Private bathroom', 'Forest view', 'King size bed'],
        image: accommodationImages.suites.category,
        href: '/stay/suites',
        cta: 'View Suites'
    },
    {
        title: 'Mudhouses & Dormitories',
        description: 'Traditional mud-built cottages perfect for groups and families.',
        price: 'From ₹2,500/night',
        capacity: '2-8 guests',
        features: ['Shared/Private', 'Courtyard access', 'Traditional decor'],
        image: accommodationImages.dormitory.category,
        href: '/stay/mudhouses',
        cta: 'View Mudhouses'
    },
    {
        title: 'Camping & Tents',
        description: 'Experience the wild up close in our comfortable safari tents.',
        price: 'From ₹1,500/night',
        capacity: '2 guests',
        features: ['Under the stars', 'Shared facilities', 'Nature immersive'],
        image: accommodationImages.camping.category,
        href: '/stay/camping',
        cta: 'View Tents'
    }
];

const amenities = [
    { icon: Sun, label: 'Solar Powered' },
    { icon: Wind, label: 'Natural Ventilation' },
    { icon: Wifi, label: 'WiFi in Common Areas' },
    { icon: Coffee, label: 'Organic Coffee/Tea' },
];

export default function StayPage() {
    return (
        <div className="pt-20">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
                <Breadcrumbs />
            </div>

            {/* Hero Section */}
            <section className="relative h-[60vh] min-h-[400px] flex items-center justify-center text-center text-white">
                <Image
                    src={accommodationImages.suites.hero} // Using suites hero as main hero
                    alt="Interior of a luxury eco-suite at Surwahi"
                    fill
                    className="object-cover"
                    priority
                />
                <div className="absolute inset-0 bg-black/40" />
                <div className="relative z-10 px-6 max-w-3xl mx-auto">
                    <h1 className="font-display text-4xl md:text-5xl lg:text-6xl mb-4">
                        Your Eco Stay at Surwahi
                    </h1>
                    <p className="text-lg md:text-xl text-white/90 font-light">
                        Rooms crafted from mud, bamboo, stone — and love
                    </p>
                </div>
            </section>

            {/* Room Comparison Grid */}
            <section className="py-20 bg-white">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="font-display text-3xl text-forest-900 text-center mb-12">Choose Your Sanctuary</h2>
                    <div className="grid md:grid-cols-3 gap-8">
                        {roomTypes.map((room) => (
                            <div key={room.title} className="bg-sand-50 rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 group flex flex-col">
                                <div className="relative h-64 overflow-hidden">
                                    <Image
                                        src={room.image}
                                        alt={room.title}
                                        fill
                                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                                    />
                                </div>
                                <div className="p-6 flex-1 flex flex-col">
                                    <div className="flex justify-between items-start mb-2">
                                        <h3 className="font-display text-2xl text-forest-900">{room.title}</h3>
                                    </div>
                                    <p className="text-sm text-soil-700 mb-4 flex-1">{room.description}</p>

                                    <div className="border-t border-mist-200 pt-4 mb-6">
                                        <div className="flex items-center gap-2 text-sm text-soil-600 mb-2">
                                            <Users className="w-4 h-4" /> {room.capacity}
                                        </div>
                                        <ul className="space-y-1">
                                            {room.features.map(feature => (
                                                <li key={feature} className="text-xs text-soil-500 flex items-center gap-2">
                                                    <span className="w-1 h-1 bg-moss-500 rounded-full" /> {feature}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>

                                    <div className="mt-auto">
                                        <div className="text-lg font-bold text-forest-900 mb-4">{room.price}</div>
                                        <Link href={room.href} className="flex items-center justify-center w-full py-3 border-2 border-forest-900 text-forest-900 font-semibold rounded-lg hover:bg-forest-900 hover:text-white transition-colors">
                                            {room.cta}
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* What's Included & Amenities */}
            <section className="py-16 bg-sand-50">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                        <div>
                            <h2 className="font-display text-3xl text-forest-900 mb-6">Experience Sustainable Luxury</h2>
                            <p className="text-soil-700 mb-8 leading-relaxed">
                                At Surwahi, luxury isn&apos;t about excess; it&apos;s about access. Access to fresh air, organic food, and the silence of the forest.
                                Our rooms are designed to keep you comfortable while minimizing your environmental footprint.
                            </p>

                            <div className="grid grid-cols-2 gap-6 mb-8">
                                {amenities.map(amenity => (
                                    <div key={amenity.label} className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-sm text-moss-600">
                                            <amenity.icon className="w-5 h-5" />
                                        </div>
                                        <span className="text-soil-800 font-medium">{amenity.label}</span>
                                    </div>
                                ))}
                            </div>

                            <div className="bg-white p-6 rounded-lg shadow-sm">
                                <h4 className="font-bold text-forest-900 mb-3">Your Stay Includes:</h4>
                                <ul className="space-y-2 text-sm text-soil-700">
                                    <li className="flex items-start gap-2">✓ All-inclusive organic meals (Breakfast, Lunch, Dinner)</li>
                                    <li className="flex items-start gap-2">✓ Guided nature walks within the estate</li>
                                    <li className="flex items-start gap-2">✓ Stargazing from our watchtower</li>
                                    <li className="flex items-start gap-2">✓ Access to community areas and library</li>
                                </ul>
                            </div>
                        </div>
                        <div className="relative h-[500px] rounded-2xl overflow-hidden shadow-2xl">
                            <Image
                                src="https://ik.imagekit.io/adonisarun/Surwahi%20Social%20Photos/Dining%20Area/Serving_Table_From_Entrance_with_Kitchen_Satkon.JPG"
                                alt="Dining experience at Surwahi"
                                fill
                                className="object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-8">
                                <div className="text-white">
                                    <h3 className="font-display text-2xl mb-2">Farm-to-Table Dining</h3>
                                    <p className="text-white/90 mb-4">Experience authentic tribal cuisine made from ingredients grown right here.</p>
                                    <Link href="/stay/dining" className="inline-flex items-center text-sand-100 hover:text-white transition-colors">
                                        Explore Our Cuisine <ArrowRight className="ml-2 w-4 h-4" />
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTAs */}
            <section className="py-16">
                <div className="container mx-auto px-4 text-center">
                    <h2 className="font-display text-3xl text-forest-900 mb-8">Ready to Plan Your Escape?</h2>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link href="/plan-your-visit/itineraries" className="px-8 py-4 bg-white border border-forest-900 text-forest-900 font-semibold rounded-lg hover:bg-sand-50 transition-colors">
                            View Curated Itineraries
                        </Link>
                        <Link href="/stay/fact-sheet" className="px-8 py-4 bg-moss-600 text-white font-semibold rounded-lg hover:bg-moss-700 transition-colors">
                            Download Fact Sheet
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
}
