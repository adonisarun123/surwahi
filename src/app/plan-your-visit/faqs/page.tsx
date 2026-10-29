import Breadcrumbs from '@/components/Breadcrumbs';
import PageHero from '@/components/PageHero';
import { generatePageMetadata } from '@/lib/seo';
import { FAQAccordion } from '@/components/FAQAccordion';
import Link from 'next/link';
import FAQSchema from '@/components/schema/FAQSchema';
import { getFaqs } from '@/lib/content-repo';

export const metadata = generatePageMetadata(
    'Frequently Asked Questions | Surwahi Social Ecoestate',
    'Answers to common questions about booking, getting here, safaris, food, and facilities at Surwahi Social Ecoestate.',
    '/plan-your-visit/faqs',
    undefined,
    ['Surwahi FAQ', 'Kanha Safari FAQ', 'Eco Lodge Amenities', 'Travel Tips Kanha']
);


export const revalidate = 3600;

export default async function FAQsPage() {
    const faqs = await getFaqs();
    const categories = Array.from(new Set(faqs.map((faq) => faq.category)));
    return (
        <div className="pt-20">
            <FAQSchema faqs={faqs} />
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
                <Breadcrumbs />
            </div>

            <PageHero title={"Frequently Asked Questions"} subtitle={"Find answers to common questions about your stay, travel, and experience at Surwahi."} />

            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <div className="max-w-4xl mx-auto space-y-16">
                    {categories.map((category) => (
                        <section key={category} id={category.toLowerCase().replace(/\s+/g, '-')} className="scroll-mt-24">
                            <h2 className="font-display text-2xl text-forest-900 mb-6 border-b border-stone-200 pb-2">
                                {category}
                            </h2>
                            <FAQAccordion items={faqs.filter((f) => f.category === category)} />
                        </section>
                    ))}
                </div>
            </div>

            <section className="bg-moss-50 py-16">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h2 className="font-display text-2xl text-forest-900 mb-4">Still have questions?</h2>
                    <p className="text-soil-700 mb-6">
                        We&apos;re here to help. Reach out to us directly.
                    </p>
                    <Link href="/contact" className="btn btn-primary">
                        Contact Us
                    </Link>
                </div>
            </section>
        </div>
    );
}
