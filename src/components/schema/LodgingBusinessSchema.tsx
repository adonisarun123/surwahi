import { generateLodgingBusinessSchema } from '@/lib/seo';

export default function LodgingBusinessSchema() {
    const schema = generateLodgingBusinessSchema();

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
    );
}
