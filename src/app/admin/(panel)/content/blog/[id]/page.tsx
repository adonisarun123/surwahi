import Link from 'next/link';
import { notFound } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import { requireUser } from '@/lib/auth/session';
import { todayIst, toIso } from '@/lib/booking/dates';
import ArticleForm from './ArticleForm';

export default async function EditArticle({ params }: { params: Promise<{ id: string }> }) {
  await requireUser('content');
  const { id } = await params;
  const isNew = id === 'new';
  const a = isNew ? null : await prisma.article.findUnique({ where: { id } }).catch(() => null);
  if (!isNew && !a) notFound();
  const [library, categories] = await Promise.all([
    prisma.mediaAsset.findMany({ orderBy: { createdAt: 'desc' }, take: 120, select: { url: true, alt: true } }),
    prisma.article.findMany({ distinct: ['category'], select: { category: true } }),
  ]);
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div><Link href="/admin/content/blog" className="text-sm text-soil-700 hover:underline">← Blog</Link><h1 className="font-display text-3xl text-forest-900">{a?.title ?? 'New post'}</h1></div>
        {a?.status === 'PUBLISHED' && <a href={`/blogs/${a.slug}`} target="_blank" rel="noreferrer" className="text-sm text-forest-700 hover:underline">View on site ↗</a>}
      </div>
      <ArticleForm
        id={a?.id ?? null}
        categories={categories.map((c) => c.category)}
        library={library}
        initial={{
          title: a?.title ?? '', slug: a?.slug ?? '', excerpt: a?.excerpt ?? '', content: a?.content ?? '', category: a?.category ?? '',
          author: a?.author ?? 'Surwahi Team', authorBio: a?.authorBio ?? '', coverUrl: a?.coverUrl ?? '', coverAlt: a?.coverAlt ?? '',
          tags: a?.tags.join(', ') ?? '', status: a?.status ?? 'DRAFT', publishedAt: toIso(a?.publishedAt ?? todayIst()),
          seoTitle: a?.seoTitle ?? '', seoDescription: a?.seoDescription ?? '',
        }}
      />
    </div>
  );
}
