
import { Quote } from 'lucide-react';

interface TestimonialItem {
    quote: string;
    author: string;
    location?: string;
}

interface TestimonialsProps {
    items: TestimonialItem[];
    className?: string;
}

export default function Testimonials({ items, className = '' }: TestimonialsProps) {
    return (
        <section className={`py-12 ${className}`}>
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <h2 className="font-display text-3xl text-forest-900 mb-12 text-center">Guest Experiences</h2>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {items.map((item, index) => (
                        <div key={index} className="bg-white p-8 rounded-card shadow-sm border border-sand-200 relative">
                            <Quote className="h-8 w-8 text-moss-500/20 absolute top-6 left-6" />
                            <p className="text-soil-700 italic mb-6 relative z-10">&quot;{item.quote}&quot;</p>
                            <div>
                                <p className="font-bold text-forest-900">{item.author}</p>
                                {item.location && <p className="text-sm text-moss-600">{item.location}</p>}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
