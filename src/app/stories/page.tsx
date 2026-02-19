import Link from 'next/link';
import { BookOpen, Star, Newspaper, ArrowRight } from 'lucide-react';
import Breadcrumbs from '@/components/Breadcrumbs';
import { generatePageMetadata } from '@/lib/seo';
import Image from 'next/image';

export const metadata = generatePageMetadata(
    'Stories from Surwahi | Reviews, Blogs & Press',
    'Read inspiring stories from our guests, updates from the forest, and press features about Surwahi Eco Lodge.',
    '/stories'
);

const storySections = [
    {
        title: 'Guest Reviews',
        description: 'Hear from fellow travelers about their sustainable stay experience.',
        icon: Star,
        href: '/stories/guest-reviews',
        image: 'https://ik.imagekit.io/adonisarun/Surwahi%20Social%20Photos/IMG_20230219_103323.jpg?updatedAt=1762322340576', // Guests enjoying
        color: 'bg-amber-50 text-amber-600',
    },
    {
        title: 'Journal & Blog',
        description: 'Deep dives into wildlife, conservation, and local culture.',
        icon: BookOpen,
        href: '/blogs', // Keeping existing blog route for now, maybe migrate later
        image: 'https://ik.imagekit.io/adonisarun/Surwahi%20Social%20Photos/IMG_5091.JPG?updatedAt=1762322336000', // Nature/Bird
        color: 'bg-moss-50 text-moss-600',
    },
    {
        title: 'Press & Recognition',
        description: 'Surwahi in the news and awards we have received.',
        icon: Newspaper,
        href: '/praises/press-mentions-and-recognitions', // Keeping existing route
        image: 'https://ik.imagekit.io/adonisarun/Surwahi%20Social%20Photos/DJI_20250819094744_0109_D.JPG?updatedAt=1762322336000', // Aerial view/Award
        color: 'bg-blue-50 text-blue-600',
    },
];

export default function StoriesPage() {
    return (
        <div className="pt-20">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
                <Breadcrumbs />
            </div>

            <section className="bg-sand-50 py-16">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h1 className="font-display text-display-xl text-forest-900 mb-6">
                        Stories from the Wild
                    </h1>
                    <p className="text-body-lg text-soil-700 max-w-3xl mx-auto">
                        Every guest leaves behind a story, and the forest whispers new ones every day. Explore the experiences that make Surwahi unique.
                    </p>
                </div>
            </section>

            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                    {storySections.map((section) => (
                        <Link key={section.title} href={section.href} className="group bg-bone-0 rounded-2xl shadow-md border border-stone-100 overflow-hidden hover:shadow-xl transition-all flex flex-col">
                            <div className="relative h-64 w-full overflow-hidden">
                                <Image
                                    src={section.image}
                                    alt={section.title}
                                    fill
                                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                                <div className="absolute bottom-4 left-4 text-white flex items-center gap-2">
                                    <div className={`p-2 rounded-full ${section.color.replace('text-', 'bg-white text-')}`}>
                                        <section.icon className="h-5 w-5" />
                                    </div>
                                    <h2 className="font-display text-xl">{section.title}</h2>
                                </div>
                            </div>
                            <div className="p-6 flex-1 flex flex-col">
                                <p className="text-soil-700 mb-6 leading-relaxed flex-1">
                                    {section.description}
                                </p>
                                <div className="flex items-center text-moss-600 font-medium group-hover:translate-x-1 transition-transform">
                                    Read More <ArrowRight className="ml-2 h-4 w-4" />
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
}
