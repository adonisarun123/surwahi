import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

const baseUrl = process.env.SITE_URL || 'https://surwahi.com';

// Static pages with their priorities and change frequencies
const staticPages = [
  { url: '', priority: 1.0, changefreq: 'monthly' }, // Homepage
  { url: '/accommodations', priority: 0.9, changefreq: 'weekly' },
  { url: '/sustainability', priority: 0.8, changefreq: 'monthly' },
  { url: '/things-to-do', priority: 0.8, changefreq: 'monthly' },
  { url: '/around-surwahi', priority: 0.7, changefreq: 'monthly' },
  { url: '/blog', priority: 0.8, changefreq: 'weekly' },
  { url: '/gallery', priority: 0.6, changefreq: 'monthly' },
  { url: '/contact', priority: 0.7, changefreq: 'monthly' },
  { url: '/itineraries', priority: 0.6, changefreq: 'monthly' },
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
    const urls: SitemapUrl[] = [...staticPages];

    // Add dynamic blog posts
    try {
      const blogPosts = await prisma.blogPost.findMany({
        where: { isPublished: true },
        select: { slug: true, updatedAt: true },
        orderBy: { publishedAt: 'desc' }
      });

      blogPosts.forEach((post: { slug: string; updatedAt: Date }) => {
        urls.push({
          url: `/blog/${post.slug}`,
          lastmod: post.updatedAt.toISOString().split('T')[0],
          priority: 0.7,
          changefreq: 'monthly'
        });
      });
    } catch (error) {
      console.warn('Could not fetch blog posts for sitemap:', error);
    }

    // Add dynamic room pages
    try {
      const rooms = await prisma.room.findMany({
        where: { isActive: true },
        select: { slug: true, updatedAt: true }
      });

      rooms.forEach((room: { slug: string; updatedAt: Date }) => {
        urls.push({
          url: `/accommodations/${room.slug}`,
          lastmod: room.updatedAt.toISOString().split('T')[0],
          priority: 0.8,
          changefreq: 'weekly'
        });
      });
    } catch (error) {
      console.warn('Could not fetch rooms for sitemap:', error);
    }

    // Add dynamic activity pages
    try {
      const activities = await prisma.activity.findMany({
        where: { isActive: true },
        select: { slug: true, updatedAt: true }
      });

      activities.forEach((activity: { slug: string; updatedAt: Date }) => {
        urls.push({
          url: `/things-to-do/${activity.slug}`,
          lastmod: activity.updatedAt.toISOString().split('T')[0],
          priority: 0.6,
          changefreq: 'monthly'
        });
      });
    } catch (error) {
      console.warn('Could not fetch activities for sitemap:', error);
    }

    const sitemap = generateSitemapXml(urls);

    return new NextResponse(sitemap, {
      headers: {
        'Content-Type': 'application/xml',
        'Cache-Control': 'public, max-age=3600, stale-while-revalidate=86400'
      },
    });

  } catch (error) {
    console.error('Error generating sitemap:', error);
    
    // Fallback sitemap with just static pages
    const fallbackSitemap = generateSitemapXml(staticPages);
    
    return new NextResponse(fallbackSitemap, {
      headers: {
        'Content-Type': 'application/xml',
      },
    });
  }
}
