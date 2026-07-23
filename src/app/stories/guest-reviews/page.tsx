import Breadcrumbs from '@/components/Breadcrumbs';
import { generatePageMetadata } from '@/lib/seo';
import { Star, User } from 'lucide-react';
import { getGoogleReviews } from '@/lib/google-reviews';

export const metadata = generatePageMetadata(
    'Guest Reviews | Surwahi Social Ecoestate',
    'See what our guests say about their sustainable stay, wildlife experiences and warm hospitality at Surwahi near Kanha.',
    '/stories/guest-reviews',
    undefined,
    ['Surwahi reviews', 'Kanha eco lodge reviews', 'Sustainable travel testimonials']
);

// Real guest reviews (from Airbnb) shown until the live Google feed is configured.
const fallbackReviews = [
    { author: 'Vikas', rating: 5, meta: 'via Airbnb', text: `My stay at Surwahi was incredibly comfortable and memorable. The serene environment allowed me to keep my mind at peace — the whole place is a sanctuary of tranquility. The food was authentic and the entire staff incredibly kind and welcoming.` },
    { author: 'Samarjeet', rating: 5, meta: 'via Airbnb · July 2024', text: `We visited Kanha with our pet dog and were warmly welcomed. We loved the play area and the naturally built swimming pool, and how well they took care of our dog. Mr. Ankit is undoubtedly the best host I've come across.` },
    { author: 'Sharmistha', rating: 5, meta: 'via Airbnb · July 2024', text: `THE best place to stay in Kanha. Huge rooms and dorms, spotlessly clean with eco-toilets, and a water-harvesting system you can watch working when it rains. The open kitchen, where food is cooked right in front of you, is a joy.` },
    { author: 'Sanket', rating: 5, meta: 'via Airbnb · June 2024', text: `A beautiful property about 23km from Khatia Gate. Mr. Ankit is an outstanding host — they even arranged a candlelight dinner by the pool. The kitchen staff Pradeep is incredible, and manager Narendra took care of everything.` },
    { author: 'Rushant', rating: 5, meta: 'via Airbnb · June 2024', text: `Unforgettable. Ankit was responsive and passionate about sustainability, with Pradeep Ji's meals a highlight and Narendra ji the caretaker very helpful. Rustic design, a natural swimming pool, and waking to birdsong near the Banjar River.` },
];

export default async function GuestReviewsPage() {
    const g = await getGoogleReviews();
    const googleData = g && g.reviews.length > 0 ? g : null;
    const reviews = googleData
        ? googleData.reviews.map((r) => ({ author: r.author, rating: r.rating, text: r.text, meta: `via Google · ${r.relativeTime}` }))
        : fallbackReviews;

    return (
        <div className="pt-20">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
                <Breadcrumbs />
            </div>

            <section className="bg-sand-50 py-12">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h1 className="font-display text-display-xl text-forest-900 mb-4">Guest Love</h1>
                    <p className="text-body-lg text-soil-700 max-w-2xl mx-auto">
                        We don&rsquo;t just host guests; we make friends. Here&rsquo;s what travellers from around the world say about their Surwahi experience.
                    </p>
                </div>
            </section>

            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">

                {googleData && (
                    <div className="flex justify-center mb-16">
                        <div className="text-center p-6 bg-white rounded-xl shadow-sm border border-stone-100 min-w-[220px]">
                            <div className="text-4xl font-bold text-forest-900 mb-1">{googleData.rating.toFixed(1)}/5</div>
                            <div className="flex justify-center mb-2">
                                {[1, 2, 3, 4, 5].map((s) => (
                                    <Star key={s} className={`h-5 w-5 ${s <= Math.round(googleData.rating) ? 'text-amber-500 fill-current' : 'text-stone-300'}`} />
                                ))}
                            </div>
                            <div className="text-sm text-soil-600">From {googleData.total} Google reviews</div>
                        </div>
                    </div>
                )}

                <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
                    {reviews.map((review, i) => (
                        <div key={i} className="bg-bone-0 p-8 rounded-card shadow-sm border border-stone-100 flex flex-col">
                            <div className="flex justify-between items-start mb-4">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 bg-sand-200 rounded-full flex items-center justify-center text-soil-600">
                                        <User className="h-5 w-5" />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-forest-900">{review.author}</h3>
                                        <p className="text-xs text-soil-500">{review.meta}</p>
                                    </div>
                                </div>
                                <div className="flex">
                                    {[...Array(review.rating)].map((_, idx) => (
                                        <Star key={idx} className="h-4 w-4 text-amber-500 fill-current" />
                                    ))}
                                </div>
                            </div>
                            <p className="text-soil-700 italic leading-relaxed flex-1">&quot;{review.text}&quot;</p>
                        </div>
                    ))}
                </div>

                <div className="text-center mt-16">
                    <a href="https://share.google/lZTlmDOBcNAF8eHUC" target="_blank" rel="noreferrer" className="btn btn-primary">
                        Write a Review on Google
                    </a>
                </div>
            </div>
        </div>
    );
}
