// Inserts the international-intent blog posts as DRAFTS (never overwrites an existing slug).
// Usage: npm run db:seed-intl-blogs   → then review and publish each one in /admin.
import { config } from 'dotenv';
config({ path: ['.env.local', '.env'], quiet: true });

async function main() {
  const { prisma } = await import('../src/lib/prisma');
  const { intlBlogPosts } = await import('./content/intl-blog-posts');
  for (const p of intlBlogPosts) {
    if (await prisma.article.findUnique({ where: { slug: p.slug }, select: { id: true } })) {
      console.log(`skip (exists): ${p.slug}`);
      continue;
    }
    await prisma.article.create({ data: { ...p, content: p.content.trim(), status: 'DRAFT' } });
    console.log(`draft created: ${p.slug}`);
  }
  await prisma.$disconnect();
}

main().catch((e) => { console.error(e); process.exit(1); });
