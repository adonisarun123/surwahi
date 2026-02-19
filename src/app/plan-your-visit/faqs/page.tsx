import Breadcrumbs from '@/components/Breadcrumbs';
import { generatePageMetadata } from '@/lib/seo';
import { FAQAccordion } from '@/components/FAQAccordion';
import Link from 'next/link';
import FAQSchema from '@/components/schema/FAQSchema';

export const metadata = generatePageMetadata(
    'Frequently Asked Questions | Surwahi Eco Lodge',
    'Answers to common questions about booking, getting here, safaris, food, and facilities at Surwahi Eco Lodge.',
    '/plan-your-visit/faqs',
    undefined,
    ['Surwahi FAQ', 'Kanha Safari FAQ', 'Eco Lodge Amenities', 'Travel Tips Kanha']
);

interface FAQ {
    question: string;
    answer: string;
    category: string;
}

const faqs: FAQ[] = [
    // ─── Booking & Payments ───
    {
        category: "Booking & Payments",
        question: "How do I book a stay at Surwahi?",
        answer: "You can book directly through our website or contact us via WhatsApp at +91 77952 07779 or email contact@surwahi.com. We recommend booking at least 2 weeks in advance during peak season (November–March).",
    },
    {
        category: "Booking & Payments",
        question: "What is the cancellation policy?",
        answer: "Please refer to our detailed cancellation policy page. Generally, cancellations made 15+ days before check-in receive a full refund. See /cancellation for complete details.",
    },
    {
        category: "Booking & Payments",
        question: "What payment methods do you accept?",
        answer: "We accept UPI, bank transfers, credit/debit cards, and cash on arrival. A 50% advance is required at the time of booking.",
    },

    // ─── Getting Here ───
    {
        category: "Getting Here",
        question: "What is the nearest airport to Surwahi?",
        answer: "Jabalpur Airport (JLR) is the nearest at ~160 km / 3.5 hours by road. Nagpur Airport (NAG) is an alternative at ~270 km / 5.5 hours. We offer pickup services from both airports.",
    },
    {
        category: "Getting Here",
        question: "Do you provide pickup from the airport or train station?",
        answer: "Yes, we arrange pickup and drop from Jabalpur Airport/Station. Please book in advance. The cost is approximately ₹4,000 - ₹6,000 one way depending on the vehicle.",
    },
    {
        category: "Getting Here",
        question: "Is the road to Surwahi suitable for regular cars?",
        answer: "Yes, the main road to Kanha is well-maintained. The last stretch is an unpaved forest road but is accessible by all vehicle types. We recommend arriving before sunset.",
    },

    // ─── Safari & Wildlife ───
    {
        category: "Safari & Wildlife",
        question: "Can you arrange safari permits for us?",
        answer: "Yes, we can arrange Kanha safari permits for our in-house guests. We recommend informing us at least 1 week in advance, especially during peak season when permits sell out quickly.",
    },
    {
        category: "Safari & Wildlife",
        question: "What wildlife can I expect to see?",
        answer: "Kanha is home to Bengal tigers, leopards, wild dogs (dhole), barasingha (hard ground swamp deer), gaur (Indian bison), sloth bears, and 300+ bird species. Tiger sightings are most common in March–May.",
    },
    {
        category: "Safari & Wildlife",
        question: "Is Kanha National Park open year-round?",
        answer: "No. Kanha closes during monsoon from July 1 to October 15 approximately. However, Surwahi estate remains open year-round with estate-based activities and workshops available even when the park is closed.",
    },

    // ─── Accommodation ───
    {
        category: "Accommodation",
        question: "What types of rooms are available?",
        answer: "We offer eco-built suites with forest views, traditional mudhouses and dormitories for groups, and (seasonal) camping options. All rooms feature natural ventilation, solar-powered amenities, and organic toiletries.",
    },
    {
        category: "Accommodation",
        question: "Is WiFi available?",
        answer: "Limited WiFi is available in common areas. We encourage guests to disconnect and enjoy the natural surroundings. If you need reliable connectivity for work, please let us know in advance.",
    },
    {
        category: "Accommodation",
        question: "Do rooms have air conditioning?",
        answer: "No. Our mud-built architecture is naturally climate-responsive — rooms stay cool in summer and warm in winter. Fans and cross-ventilation are provided in all rooms.",
    },

    // ─── Food & Dietary ───
    {
        category: "Food & Dietary",
        question: "What kind of food is served?",
        answer: "We serve organic, locally sourced meals featuring tribal and regional cuisine. Meals are primarily vegetarian with some non-vegetarian options available. Our farm-to-table approach means ingredients come from our own gardens and local farms.",
    },
    {
        category: "Food & Dietary",
        question: "Can you accommodate dietary restrictions?",
        answer: "Yes. We can accommodate vegetarian, vegan, Jain, gluten-free, and other dietary requirements. Please inform us at the time of booking so our kitchen can prepare accordingly.",
    },

    // ─── Children & Families ───
    {
        category: "Children & Families",
        question: "Is Surwahi suitable for children?",
        answer: "Absolutely! We have a dedicated Play @ Surwahi zone, family-friendly workshops (pottery, leaf plate making), and nature walks suitable for all ages. Children must be supervised at all times, especially near water bodies.",
    },
    {
        category: "Children & Families",
        question: "Is there a minimum age for safari?",
        answer: "Children above 5 years are generally allowed on safaris. Infants and toddlers may not be permitted in core zones. Buffer zone safaris are more flexible. Check with us for the latest park regulations.",
    },

    // ─── Sustainability ───
    {
        category: "Sustainability",
        question: "What makes Surwahi eco-friendly?",
        answer: "Everything — from our mud-built architecture and solar power to evapo-transpiration toilets, rainwater harvesting, organic farming, and zero-waste practices. We're certified by TOFT Tigers and aligned with 4 UN Sustainable Development Goals.",
    },
];

const categories = Array.from(new Set(faqs.map((faq) => faq.category)));

export default function FAQsPage() {
    return (
        <div className="pt-20">
            <FAQSchema faqs={faqs} />
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
                <Breadcrumbs />
            </div>

            <section className="bg-sand-50 py-12">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h1 className="font-display text-display-xl text-forest-900 mb-4">
                        Frequently Asked Questions
                    </h1>
                    <p className="text-body-lg text-soil-700 max-w-2xl mx-auto">
                        Find answers to common questions about your stay, travel, and experience at Surwahi.
                    </p>
                </div>
            </section>

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
                        We're here to help. Reach out to us directly.
                    </p>
                    <Link href="/contact" className="btn btn-primary">
                        Contact Us
                    </Link>
                </div>
            </section>
        </div>
    );
}
