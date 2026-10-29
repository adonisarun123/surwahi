// Inserts the international-intent blog posts as DRAFTS. Re-running refreshes existing drafts; published posts are never touched.
// Usage: npm run db:seed-intl-blogs   → then review and publish each one in /admin.
import { config } from 'dotenv';
config({ path: ['.env.local', '.env'], quiet: true });

async function main() {
  const { prisma } = await import('../src/lib/prisma');
  const { intlBlogPosts } = await import('./content/intl-blog-posts');
  // House rule: no blog post under 1,200 words of reading text (markdown syntax and URLs excluded).
  const MIN_WORDS = 1200;
  const readingWords = (md: string) =>
    md.replace(/\]\([^)]*\)/g, ']').replace(/[#*|\[\]>-]/g, ' ').split(/\s+/).filter((w) => /[A-Za-z0-9]/.test(w)).length;
  const short = intlBlogPosts.filter((p) => readingWords(p.content) < MIN_WORDS);
  if (short.length) {
    for (const p of short) console.error(`too short (${readingWords(p.content)} words): ${p.slug}`);
    throw new Error(`Every post must be at least ${MIN_WORDS} words.`);
  }

  for (const p of intlBlogPosts) {
    const existing = await prisma.article.findUnique({ where: { slug: p.slug }, select: { id: true, status: true } });
    if (existing) {
      if (existing.status === 'DRAFT') {
        await prisma.article.update({ where: { id: existing.id }, data: { ...p, content: p.content.trim() } });
        console.log(`draft updated: ${p.slug}`);
      } else console.log(`skip (already ${existing.status}): ${p.slug}`);
      continue;
    }
    await prisma.article.create({ data: { ...p, content: p.content.trim(), status: 'DRAFT' } });
    console.log(`draft created: ${p.slug}`);
  }
  await prisma.$disconnect();
}

main().catch((e) => { console.error(e); process.exit(1); });
