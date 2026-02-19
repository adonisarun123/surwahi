import { generateFAQSchema } from '@/lib/seo';

export default function FAQSchema({ faqs }: { faqs: Array<{ question: string; answer: string }> }) {
    const schema = generateFAQSchema(faqs);

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
    );
}
