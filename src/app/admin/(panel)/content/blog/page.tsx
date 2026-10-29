import Link from 'next/link';
import { prisma } from '@/lib/prisma';
import { requireUser } from '@/lib/auth/session';
import { Badge } from '@/components/admin/ui';

export default async function BlogAdmin() {
  await requireUser('content');
  const posts = await prisma.article.findMany({ orderBy: [{ status: 'asc' }, { publishedAt: 'desc' }] });
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div><Link href="/admin/content" className="text-sm text-soil-700 hover:underline">← Content</Link><h1 className="font-display text-3xl text-forest-900">Blog</h1></div>
        <Link href="/admin/content/blog/new" className="rounded-lg bg-forest-700 px-4 py-2 text-sm font-semibold text-white">+ New post</Link>
      </div>
      <div className="bg-white rounded-xl border border-mist-200 divide-y divide-mist-200">
        {posts.map((p) => (
          <Link key={p.id} href={`/admin/content/blog/${p.id}`} className="flex flex-wrap items-center justify-between gap-2 p-4 hover:bg-sand-50">
            <div>
              <div className="font-medium text-forest-900">{p.title}</div>
              <div className="text-xs text-soil-700">/blogs/{p.slug} · {p.category} · {p.author}</div>
            </div>
            <div className="flex items-center gap-2 text-xs text-soil-700">
              {p.publishedAt?.toISOString().slice(0, 10)}
              {p.status === 'PUBLISHED' ? <Badge tone="green">Live</Badge> : <Badge>Draft</Badge>}
            </div>
          </Link>
        ))}
        {posts.length === 0 && <p className="p-6 text-sm text-soil-700">No posts yet.</p>}
      </div>
    </div>
  );
}
