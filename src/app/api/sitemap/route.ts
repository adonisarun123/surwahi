import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { blogPosts, experienceGroups, workshopGroups } from '@/lib/data';

const baseUrl = process.env.SITE_URL || 'https://surwahi.com';

/** URLs that exist in the App Router (canonical paths; avoid 301-only or missing routes). */
const staticPages: Array<{ url: string; priority: number; changefreq: string }> = [
  { url: '', priority: 1.0, changefreq: 'weekly' },
  { url: '/about', priority: 0.9, changefreq: 'monthly' },
  { url: '/about/our-story', priority: 0.85, changefreq: 'monthly' },
  { url: '/about/our-team', priority: 0.85, changefreq: 'monthly' },
  { url: '/about/why-surwahi', priority: 0.85, changefreq: 'monthly' },
  { url: '/about/the-lodge-and-philosophy', priority: 0.85, changefreq: 'monthly' },
  { url: '/about/our-residents', priority: 0.8, changefreq: 'monthly' },
  { url: '/stay', priority: 0.95, changefreq: 'weekly' },
  { url: '/stay/suites', priority: 0.9, changefreq: 'weekly' },
  { url: '/stay/mudhouses', priority: 0.9, changefreq: 'weekly' },
  { url: '/stay/camping', priority: 0.9, changefreq: 'weekly' },
  { url: '/stay/dining', priority: 0.85, changefreq: 'monthly' },
  { url: '/stay/fact-sheet', priority: 0.85, changefreq: 'monthly' },
  { url: '/experiences', priority: 0.9, changefreq: 'weekly' },
  { url: '/workshops', priority: 0.9, changefreq: 'weekly' },
  { url: '/sustainability', priority: 0.85, changefreq: 'monthly' },
  { url: '/sustainability/evapo-transpiration-toilets', priority: 0.75, changefreq: 'monthly' },
  { url: '/sustainability/tree-census-and-biodiversity-reports', priority: 0.75, changefreq: 'monthly' },
  { url: '/sustainability/eco-friendly-construction-practices', priority: 0.75, changefreq: 'monthly' },
  { url: '/sustainability/sdg-alignment', priority: 0.75, changefreq: 'monthly' },
  { url: '/plan-your-visit', priority: 0.85, changefreq: 'monthly' },
  { url: '/plan-your-visit/getting-here', priority: 0.85, changefreq: 'monthly' },
  { url: '/plan-your-visit/best-time-to-visit', priority: 0.8, changefreq: 'monthly' },
  { url: '/plan-your-visit/safari-booking-guide', priority: 0.8, changefreq: 'monthly' },
  { url: '/plan-your-visit/faqs', priority: 0.8, changefreq: 'monthly' },
  { url: '/stories', priority: 0.8, changefreq: 'monthly' },
  { url: '/stories/guest-reviews', priority: 0.8, changefreq: 'monthly' },
  { url: '/blogs', priority: 0.85, changefreq: 'weekly' },
  { url: '/praises/awards-and-accolades', priority: 0.75, changefreq: 'monthly' },
  { url: '/praises/press-mentions-and-recognitions', priority: 0.75, changefreq: 'monthly' },
  { url: '/gallery', priority: 0.7, changefreq: 'monthly' },
  { url: '/contact', priority: 0.85, changefreq: 'monthly' },
  { url: '/privacy', priority: 0.4, changefreq: 'yearly' },
  { url: '/terms', priority: 0.4, changefreq: 'yearly' },
  { url: '/accessibility', priority: 0.4, changefreq: 'yearly' },
  { url: '/cancellation', priority: 0.4, changefreq: 'yearly' },
  { url: '/house-rules', priority: 0.5, changefreq: 'yearly' },
];

interface SitemapUrl {
  url: string;
  lastmod?: string;
  priority: number;
  changefreq: string;
}

function generateSitemapXml(urls: SitemapUrl[]) {
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map(({ url, lastmod, priority, changefreq }) => `  <url>
    <loc>${baseUrl}${url}</loc>
    ${lastmod ? `<lastmod>${lastmod}</lastmod>` : ''}
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`).join('\n')}
</urlset>`;
}

export async function GET() {
  try {
    const urlMap = new Map<string, SitemapUrl>();

    staticPages.forEach(({ url, priority, changefreq }) => {
      urlMap.set(url, { url, priority, changefreq });
    });

    blogPosts.forEach((post) => {
      const path = `/blogs/${post.slug}`;
      if (!urlMap.has(path)) {
        urlMap.set(path, { url: path, priority: 0.7, changefreq: 'monthly' });
      }
    });

    experienceGroups.flatMap((g) => g.items).forEach((item) => {
      if (!urlMap.has(item.href)) {
        urlMap.set(item.href, { url: item.href, priority: 0.8, changefreq: 'weekly' });
      }
    });

    workshopGroups.flatMap((g) => g.items).forEach((item) => {
      if (!urlMap.has(item.href)) {
        urlMap.set(item.href, { url: item.href, priority: 0.8, changefreq: 'weekly' });
      }
    });

    try {
      const dbBlogPosts = await prisma.blogPost.findMany({
        where: { isPublished: true },
        select: { slug: true, updatedAt: true },
        orderBy: { publishedAt: 'desc' }
      });

      dbBlogPosts.forEach((post: { slug: string; updatedAt: Date }) => {
        const path = `/blogs/${post.slug}`;
        urlMap.set(path, {
          url: path,
          lastmod: post.updatedAt.toISOString().split('T')[0],
          priority: 0.7,
          changefreq: 'monthly'
        });
      });
    } catch (error) {
      console.warn('Could not fetch blog posts for sitemap:', error);
    }

    try {
      const rooms = await prisma.room.findMany({
        where: { isActive: true },
        select: { slug: true, updatedAt: true }
      });

      rooms.forEach((room: { slug: string; updatedAt: Date }) => {
        const path = `/stay/${room.slug}`;
        urlMap.set(path, {
          url: path,
          lastmod: room.updatedAt.toISOString().split('T')[0],
          priority: 0.85,
          changefreq: 'weekly'
        });
      });
    } catch (error) {
      console.warn('Could not fetch rooms for sitemap:', error);
    }

    const urls = Array.from(urlMap.values()).sort((a, b) => a.url.localeCompare(b.url));
    const sitemap = generateSitemapXml(urls);

    return new NextResponse(sitemap, {
      headers: {
        'Content-Type': 'application/xml',
        'Cache-Control': 'public, max-age=3600, stale-while-revalidate=86400'
      },
    });

  } catch (error) {
    console.error('Error generating sitemap:', error);

    const fallbackUrls: SitemapUrl[] = staticPages.map(({ url, priority, changefreq }) => ({
      url,
      priority,
      changefreq
    }));

    return new NextResponse(generateSitemapXml(fallbackUrls), {
      headers: {
        'Content-Type': 'application/xml',
      },
    });
  }
}
