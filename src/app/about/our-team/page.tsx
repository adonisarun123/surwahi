import Breadcrumbs from '@/components/Breadcrumbs';
import { generatePageMetadata } from '@/lib/seo';
import Image from 'next/image';
import Link from 'next/link';
import { Handshake } from 'lucide-react';

export const metadata = generatePageMetadata(
    'Meet the Team | Surwahi Eco Lodge',
    'Meet the visionaries, naturalists, and local community members who make Surwahi a home away from home.',
    '/about/our-team'
);

const teamMembers = [
    {
        name: 'Mr. Sarabdeep Singh',
        role: 'Founder & Visionary',
        image: 'https://ik.imagekit.io/adonisarun/Surwahi%20Social%20Photos/IMG-20240225-WA0004.jpg?updatedAt=1762322336000', // Placeholder
        bio: 'An avid wildlife enthusiast and conservationist at heart, Sarabdeep envisioned Surwahi as a bridge between luxury and sustainability.',
    },
    {
        name: 'Mrs. Simran Kaur',
        role: 'Co-Founder & Host',
        image: 'https://ik.imagekit.io/adonisarun/Surwahi%20Social%20Photos/IMG-20240225-WA0005.jpg?updatedAt=1762322336000', // Placeholder
        bio: 'The soul of Surwahi hospitality, ensuring every guest feels like family while championing local recipes and traditions.',
    },
    {
        name: 'Raju Baiga',
        role: 'Head Naturalist',
        image: 'https://ik.imagekit.io/adonisarun/Surwahi%20Social%20Photos/IMG_20230219_103323.jpg?updatedAt=1762322340576', // Placeholder
        bio: 'Born and raised in the Kanha buffer zone, Raju knows every tiger stripe and bird call in the forest.',
    },
    {
        name: 'Sunita Bai',
        role: 'Housekeeping Lead',
        image: 'https://ik.imagekit.io/adonisarun/Surwahi%20Social%20Photos/IMG_20230219_115049.jpg?updatedAt=1762322340576', // Placeholder
        bio: 'A master of mud-plastering art, she leads the team that keeps our eco-cottages breathing and beautiful.',
    },
];

export default function OurTeamPage() {
    return (
        <div className="pt-20">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
                <Breadcrumbs />
            </div>

            <section className="bg-sand-50 py-12">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h1 className="font-display text-display-xl text-forest-900 mb-4">
                        The People Behind Surwahi
                    </h1>
                    <p className="text-body-lg text-soil-700 max-w-3xl mx-auto">
                        Surwahi is built by people, not just machines. From our founders to the local artisans who crafted every brick, meet the family.
                    </p>
                </div>
            </section>

            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">

                {/* Founders */}
                <section className="mb-24">
                    <h2 className="font-display text-3xl text-forest-900 mb-12 text-center">Visionaries</h2>
                    <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto">
                        {teamMembers.slice(0, 2).map((member) => (
                            <div key={member.name} className="flex flex-col md:flex-row gap-6 items-center md:items-start bg-bone-0 p-6 rounded-2xl shadow-sm border border-stone-100">
                                <div className="w-32 h-32 relative flex-shrink-0 rounded-full overflow-hidden border-4 border-sand-100">
                                    <Image
                                        src={member.image}
                                        alt={member.name}
                                        fill
                                        className="object-cover"
                                    />
                                </div>
                                <div className="text-center md:text-left">
                                    <h3 className="font-display text-xl text-forest-900">{member.name}</h3>
                                    <p className="text-moss-600 font-medium text-sm mb-3 uppercase tracking-wide">{member.role}</p>
                                    <p className="text-soil-700 text-sm leading-relaxed">{member.bio}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* The Team */}
                <section className="mb-24">
                    <h2 className="font-display text-3xl text-forest-900 mb-12 text-center">The Heart of Surwahi</h2>
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {teamMembers.slice(2).map((member) => (
                            <div key={member.name} className="group bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all border border-stone-100">
                                <div className="h-64 relative overflow-hidden">
                                    <Image
                                        src={member.image}
                                        alt={member.name}
                                        fill
                                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                                    />
                                </div>
                                <div className="p-6 text-center">
                                    <h3 className="font-display text-lg text-forest-900 mb-1">{member.name}</h3>
                                    <p className="text-moss-600 text-xs font-bold uppercase tracking-wider mb-3">{member.role}</p>
                                    <p className="text-soil-600 text-sm">{member.bio}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Community Partners */}
                <section className="bg-moss-50 p-8 md:p-12 rounded-3xl text-center">
                    <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-6 text-moss-600 shadow-sm">
                        <Handshake className="h-8 w-8" />
                    </div>
                    <h2 className="font-display text-3xl text-forest-900 mb-6">Built by the Community</h2>
                    <p className="text-soil-700 max-w-3xl mx-auto mb-8 leading-relaxed">
                        90% of our staff comes from the neighboring villages of Surwahi and Majgaon.
                        We are proud to partner with local self-help groups for our produce, laundry, and handicraft sourcing.
                        Your stay directly supports 45+ local families.
                    </p>
                    <Link href="/about/our-story" className="btn btn-primary bg-moss-600 hover:bg-moss-700 text-white border-none">
                        Read Our Full Story
                    </Link>
                </section>

            </div>
        </div>
    );
}
