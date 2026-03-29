import { NextResponse } from 'next/server';

export async function GET() {
  const robotsTxt = `
User-agent: *
Allow: /

# Block admin and API routes
Disallow: /api/
Disallow: /admin/
Disallow: /_next/
Disallow: /static/

# Allow specific important sections
Allow: /stay
Allow: /experiences
Allow: /workshops
Allow: /blogs
Allow: /sustainability
Allow: /plan-your-visit
Allow: /gallery
Allow: /contact

# Sitemap location
Sitemap: ${process.env.SITE_URL || 'https://surwahi.com'}/sitemap.xml

# Crawl delay for respectful crawling
Crawl-delay: 1
  `.trim();

  return new NextResponse(robotsTxt, {
    headers: {
      'Content-Type': 'text/plain',
    },
  });
}
