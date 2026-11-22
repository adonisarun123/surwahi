import Link from 'next/link';
import Image from 'next/image';
import Breadcrumbs from '@/components/Breadcrumbs';
import { generatePageMetadata } from '@/lib/seo';
import { knowledgeArticles } from '@/lib/knowledge-hub';

export const metadata = generatePageMetadata(
  'Knowledge Hub',
  'A curated collection of educational articles that celebrate the natural, cultural, and ecological heritage of the Kanha landscape.',
  '/knowledge-hub'
);

const articles = Object.values(knowledgeArticles);

export default function KnowledgeHubPage() {
  return (
    <div className="pt-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <Breadcrumbs />
      </div>

      <section className="bg-sand-50 py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="font-display text-display-xl text-forest-900 mb-4">
            Surwahi Knowledge Hub
          </h1>
          <p className="text-body-lg text-soil-700 max-w-3xl mx-auto">
            A curated collection of educational articles that celebrate the natural, cultural, and ecological heritage of the Kanha landscape.
          </p>
        </div>
      </section>

      <section className="py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {articles.map((article) => (
              <Link href={`/knowledge-hub/${article.slug}`} key={article.slug} className="group block bg-bone-0 rounded-card overflow-hidden shadow-elev-1 hover:shadow-elev-2 transition-all">
                <div className="aspect-w-4 aspect-h-3 relative overflow-hidden">
                  <Image
                    src={article.imageUrl}
                    alt={article.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-6">
                  <h3 className="font-display text-2xl text-forest-900 mb-2 group-hover:text-moss-500 transition-colors">{article.title}</h3>
                  <p className="text-soil-700 text-sm">{article.excerpt}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
