import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';

interface RelatedItem {
    title: string;
    href: string;
    image: string;
    category?: string;
}

interface RelatedContentProps {
    title?: string;
    items: RelatedItem[];
}

export default function RelatedContent({ title = "Explore More", items }: RelatedContentProps) {
    if (!items || items.length === 0) return null;

    return (
        <section className="py-12 bg-sand-50">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <h2 className="font-display text-3xl text-forest-900 mb-8 text-center">{title}</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
                    {items.map((item) => (
                        <Link key={item.title} href={item.href} className="group flex flex-col bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all border border-stone-100">
                            <div className="relative h-48 overflow-hidden">
                                <Image
                                    src={item.image}
                                    alt={item.title}
                                    fill
                                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                                />
                                {item.category && (
                                    <span className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider text-moss-700">
                                        {item.category}
                                    </span>
                                )}
                            </div>
                            <div className="p-5 flex flex-col flex-1">
                                <h3 className="font-display text-lg text-forest-900 mb-2 group-hover:text-moss-600 transition-colors">
                                    {item.title}
                                </h3>
                                <div className="mt-auto pt-4 flex items-center text-sm font-medium text-moss-600 group-hover:translate-x-1 transition-transform">
                                    View Details <ArrowRight className="ml-1 h-3 w-3" />
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
}
