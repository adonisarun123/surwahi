import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft } from 'lucide-react';
import Breadcrumbs from '@/components/Breadcrumbs';
import { generatePageMetadata, defaultMeta } from '@/lib/seo';
import Prose from '@/components/Prose';
import JsonLd from '@/components/schema/JsonLd';
import { knowledgeArticles } from '@/lib/knowledge-hub';
import { KnowledgeArticle } from '@/types';

interface ArticlePageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: ArticlePageProps) {
  const { slug } = await params;
  const article: KnowledgeArticle | undefined = knowledgeArticles[slug];
  if (!article) {
    return {};
  }
  // Override generatePageMetadata's index:true so the layout's noindex actually applies.
  return {
    ...generatePageMetadata(article.title, article.excerpt, `/knowledge-hub/${article.slug}`, article.imageUrl),
    robots: { index: false, follow: true },
  };
}

export default async function KnowledgeArticlePage({ params }: ArticlePageProps) {
  const { slug } = await params;
  const article: KnowledgeArticle | undefined = knowledgeArticles[slug];

  if (!article) {
    notFound();
  }

  const breadcrumbs = [
    { name: 'Home', href: '/' },
    { name: 'Knowledge Hub', href: '/knowledge-hub' },
    { name: article.title, href: `/knowledge-hub/${article.slug}` }
  ];

  return (
    <div className="pt-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex items-center justify-between">
          <Breadcrumbs customBreadcrumbs={breadcrumbs} />
          <Link
            href="/knowledge-hub"
            className="flex items-center gap-2 text-moss-500 hover:text-forest-700 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Knowledge Hub
          </Link>
        </div>
      </div>

      <section className="py-12 lg:py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <h1 className="font-display text-display-xl text-forest-900 mb-6">
              {article.title}
            </h1>
            <p className="text-body-lg text-soil-700 mb-8">{article.excerpt}</p>
            <div className="aspect-[16/9] relative overflow-hidden rounded-card mb-8">
              <Image
                src={article.imageUrl}
                alt={article.title}
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      <section className="py-8">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <Prose md={article.content.replace(/^ {6}/gm, '')} />
          </div>
        </div>
      </section>
      <JsonLd schema={[
        {
          '@context': 'https://schema.org',
          '@type': 'Article',
          headline: article.title,
          description: article.excerpt,
          image: article.imageUrl,
          inLanguage: 'en',
          author: { '@type': 'Organization', name: defaultMeta.siteName, url: defaultMeta.url },
          publisher: { '@id': `${defaultMeta.url}/#org` },
          mainEntityOfPage: `${defaultMeta.url}/knowledge-hub/${article.slug}`,
        },
      ]} />
    </div>
  );
}
