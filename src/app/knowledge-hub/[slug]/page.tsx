import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, BookOpen } from 'lucide-react';
import Breadcrumbs from '@/components/Breadcrumbs';
import { generatePageMetadata } from '@/lib/seo';
import { knowledgeArticles } from '@/lib/knowledge-hub';

interface ArticlePageProps {
  params: { slug: string };
}

export async function generateMetadata({ params }: ArticlePageProps) {
  const article = (knowledgeArticles as any)[params.slug];
  if (!article) {
    return {};
  }
  return generatePageMetadata(article.title, article.excerpt, `/knowledge-hub/${article.slug}`);
}

export default function KnowledgeArticlePage({ params }: ArticlePageProps) {
  const article = (knowledgeArticles as any)[params.slug];

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
            Back to Hub
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
            <div className="prose prose-lg max-w-none">
              {article.content.split('## ').map((section:any, index:any) => {
                if (!section.trim()) return null;
                const lines = section.trim().split('\\n');
                const heading = lines.shift().trim();
                const content = lines.join('\\n').trim();

                return (
                  <div key={index} className="mb-12">
                    <h2 className="font-display text-2xl text-forest-900 mt-12 mb-6 first:mt-0">
                      {heading}
                    </h2>
                    <div className="text-ink-900 leading-relaxed" dangerouslySetInnerHTML={{ __html: content.replace(/\\n/g, '<br />').replace(/\- /g, '• ').replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }} />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
