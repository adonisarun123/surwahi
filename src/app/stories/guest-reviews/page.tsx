import Breadcrumbs from '@/components/Breadcrumbs';
import { generatePageMetadata } from '@/lib/seo';
import { Star, User } from 'lucide-react';

export const metadata = generatePageMetadata(
    'Guest Reviews | Surwahi Eco Lodge',
    'See what our guests say about their sustainable stay, wildlife experiences, and the warm hospitality at Surwahi.',
    '/stories/guest-reviews',
    undefined,
    ['Surwahi reviews', 'Kanha eco lodge reviews', 'Sustainable travel testimonials']
);

// Placeholder data - replace with real API/DB data later
const reviews = [
    {
        id: 1,
        name: 'Sarah Jenkins',
        location: 'United Kingdom',
        rating: 5,
        date: 'February 2024',
        content: "Surwahi is a magical place. The silence, the stars, and the warmth of the staff made our stay unforgettable. We saw a tiger on our safari, but honestly, just walking the nature trails with the naturalist was the highlight.",
        source: 'Google',
    },
    {
        id: 2,
        name: 'Amit & Priya',
        location: 'Mumbai, India',
        rating: 5,
        date: 'January 2024',
        content: "If you want to disconnect from city chaos, this is the place. The mud houses are surprisingly comfortable and cool. The food is simple, organic, and delicious. Highly recommend the village walk!",
        source: 'TripAdvisor',
    },
    {
        id: 3,
        name: 'David Schmidt',
        location: 'Germany',
        rating: 5,
        date: 'December 2023',
        content: "A true example of sustainable tourism. Seeing how they empower the local community was inspiring. The lodge is beautiful, blending perfectly with the forest.",
        source: 'Direct',
    },
    {
        id: 4,
        name: 'The Kapoor Family',
        location: 'Delhi, India',
        rating: 4,
        date: 'November 2023',
        content: "Great place for kids to learn about nature. The staff organized a pottery workshop which our children loved. Safari arrangements were seamless.",
        source: 'Google',
    },
];

export default function GuestReviewsPage() {
    return (
        <div className="pt-20">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
                <Breadcrumbs />
            </div>

            <section className="bg-sand-50 py-12">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h1 className="font-display text-display-xl text-forest-900 mb-4">
                        Guest Love
                    </h1>
                    <p className="text-body-lg text-soil-700 max-w-2xl mx-auto">
                        We don&apos;t just host guests; we make friends. Here&apos;s what travelers from around the world have to say about their Surwahi experience.
                    </p>
                </div>
            </section>

            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">

                {/* Aggregate Stats (Placeholder) */}
                <div className="flex flex-col md:flex-row justify-center items-center gap-8 mb-16">
                    <div className="text-center p-6 bg-white rounded-xl shadow-sm border border-stone-100 min-w-[200px]">
                        <div className="text-4xl font-bold text-forest-900 mb-1">4.8/5</div>
                        <div className="flex justify-center mb-2">
                            {[1, 2, 3, 4, 5].map((s) => (
                                <Star key={s} className="h-5 w-5 text-amber-500 fill-current" />
                            ))}
                        </div>
                        <div className="text-sm text-soil-600">On Google Reviews</div>
                    </div>
                    <div className="text-center p-6 bg-white rounded-xl shadow-sm border border-stone-100 min-w-[200px]">
                        <div className="text-4xl font-bold text-forest-900 mb-1">5.0/5</div>
                        <div className="flex justify-center mb-2">
                            {[1, 2, 3, 4, 5].map((s) => (
                                <Star key={s} className="h-5 w-5 text-green-500 fill-current" />
                            ))}
                        </div>
                        <div className="text-sm text-soil-600">On TripAdvisor</div>
                    </div>
                </div>

                {/* Reviews Grid */}
                <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
                    {reviews.map((review) => (
                        <div key={review.id} className="bg-bone-0 p-8 rounded-card shadow-sm border border-stone-100 flex flex-col">
                            <div className="flex justify-between items-start mb-4">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 bg-sand-200 rounded-full flex items-center justify-center text-soil-600">
                                        <User className="h-5 w-5" />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-forest-900">{review.name}</h3>
                                        <p className="text-xs text-soil-500">{review.location}</p>
                                    </div>
                                </div>
                                <div className="flex">
                                    {[...Array(review.rating)].map((_, i) => (
                                        <Star key={i} className="h-4 w-4 text-amber-500 fill-current" />
                                    ))}
                                </div>
                            </div>
                            <p className="text-soil-700 italic mb-6 leading-relaxed flex-1">&quot;{review.content}&quot;</p>
                            <div className="flex justify-between items-center text-xs text-soil-500 pt-4 border-t border-stone-100">
                                <span>Visited in {review.date}</span>
                                <span className="px-2 py-1 bg-sand-100 rounded-md">via {review.source}</span>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="text-center mt-16">
                    <a href="https://g.page/r/CfaPZfadd50IEBM/review" target="_blank" rel="noreferrer" className="btn btn-primary">
                        Write a Review
                    </a>
                </div>
            </div>
        </div>
    );
}
