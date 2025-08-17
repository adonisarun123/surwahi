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

# Allow specific important pages
Allow: /accommodations
Allow: /sustainability
Allow: /things-to-do
Allow: /around-surwahi
Allow: /blog
Allow: /gallery
Allow: /contact
Allow: /itineraries

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
