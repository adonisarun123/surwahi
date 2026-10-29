// Seeds blog posts, FAQs, gallery photos, the Vann Vibe event and homepage settings from src/lib/legacy-content.ts.
// Non-destructive: each section is skipped if it already has data. Usage: npm run db:seed-content
import { config } from 'dotenv';
config({ path: ['.env.local', '.env'], quiet: true });

async function main() {
  const { prisma } = await import('../src/lib/prisma');
  const { legacyBlogPosts, legacyFaqs, legacyGallery } = await import('../src/lib/legacy-content');
  const { SETTING_DEFAULTS } = await import('../src/lib/content-repo');

  if ((await prisma.article.count()) === 0) {
    for (const p of Object.values(legacyBlogPosts)) {
      await prisma.article.create({
        data: {
          slug: p.slug, title: p.title, excerpt: p.excerpt, content: p.content.trim(), category: p.category, author: p.author,
          coverUrl: p.featuredImage.url, coverAlt: p.featuredImage.alt, tags: p.tags,
          status: p.isPublished ? 'PUBLISHED' : 'DRAFT', publishedAt: new Date(`${p.publishedAt}T00:00:00Z`),
          seoTitle: p.seoTitle, seoDescription: p.seoDescription,
        },
      });
    }
    console.log(`articles: ${Object.keys(legacyBlogPosts).length} imported`);
  } else console.log('articles: exist, skipped');

  if ((await prisma.faq.count()) === 0) {
    await prisma.faq.createMany({ data: legacyFaqs.map((f, i) => ({ ...f, sortOrder: i * 10 })) });
    console.log(`faqs: ${legacyFaqs.length} imported`);
  } else console.log('faqs: exist, skipped');

  if ((await prisma.mediaAsset.count({ where: { galleryCategory: { not: null } } })) === 0) {
    let i = 0;
    for (const g of legacyGallery) {
      const existing = await prisma.mediaAsset.findFirst({ where: { url: g.src } });
      if (existing) await prisma.mediaAsset.update({ where: { id: existing.id }, data: { galleryCategory: g.category, gallerySort: i * 10 } });
      else await prisma.mediaAsset.create({ data: { url: g.src, alt: g.alt, galleryCategory: g.category, gallerySort: i * 10, tags: ['gallery'] } });
      i++;
    }
    console.log(`gallery: ${legacyGallery.length} photos`);
  } else console.log('gallery: exists, skipped');

  if ((await prisma.event.count()) === 0) {
    await prisma.event.create({
      data: {
        title: 'Vann Vibe - 3-night forest retreat',
        summary: 'Forest bathing, ethno-astronomy, sound meditation, Gond art, mindful making and vegan fusion meals.',
        startDate: new Date('2026-04-03T00:00:00Z'), endDate: new Date('2026-04-06T00:00:00Z'),
        linkPath: '/workshops/vann-vibe',
      },
    });
    console.log('events: Vann Vibe (Apr 2026, past) imported');
  } else console.log('events: exist, skipped');

  for (const key of ['home_hero', 'announcement'] as const) {
    await prisma.siteSetting.upsert({ where: { key }, create: { key, value: SETTING_DEFAULTS[key] as object }, update: {} });
  }
  await prisma.siteSetting.upsert({ where: { key: 'gallery_videos' }, create: { key: 'gallery_videos', value: [] }, update: {} });
  console.log('settings: ok');
  await prisma.$disconnect();
}
main();
