import { notFound } from 'next/navigation';
import Image from 'next/image';
import { kanhaData } from '@/lib/kanha';
import { generatePageMetadata } from '@/lib/seo';
import Breadcrumbs from '@/components/Breadcrumbs';

export async function generateStaticParams() {
  return kanhaData.map((item) => ({
    slug: item.slug,
  }));
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const item = kanhaData.find(p => p.slug === params.slug);

  if (!item) {
    return {
      title: 'Article Not Found',
      description: 'The requested article could not be found.'
    };
  }

  return generatePageMetadata(item.metaTitle, item.metaDescription, `/kanha/${item.slug}`);
}

export default function KanhaArticlePage({ params }: { params: { slug: string } }) {
  const item = kanhaData.find(p => p.slug === params.slug);

  if (!item) {
    notFound();
  }

  return (
    <div className="pt-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <Breadcrumbs />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <article className="max-w-4xl mx-auto">
          <h1 className="font-display text-display-xl text-forest-900 mb-6">{item.name}</h1>
          <div className="aspect-[16/9] relative overflow-hidden rounded-card mb-8">
            <Image
              src={item.bannerImage}
              alt={item.name}
              fill
              className="object-cover"
              priority
            />
          </div>
          <div className="prose prose-lg max-w-none" dangerouslySetInnerHTML={{ __html: item.postBody }} />
        </article>
      </div>
    </div>
  );
}
