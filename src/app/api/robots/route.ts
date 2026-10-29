import { NextResponse } from 'next/server';

const SITE = process.env.SITE_URL || 'https://surwahi.com';

// Notes:
// - Never block /_next/: Google must fetch the CSS/JS chunks to render pages.
// - AI search/answer crawlers are allowed explicitly so the lodge can be cited
//   by ChatGPT, Claude, Perplexity and Google AI features. llms.txt summarises the site for them.
export async function GET() {
  const robotsTxt = `
User-agent: *
Allow: /
Disallow: /api/
Disallow: /admin/

User-agent: GPTBot
User-agent: OAI-SearchBot
User-agent: ChatGPT-User
User-agent: ClaudeBot
User-agent: Claude-SearchBot
User-agent: Claude-User
User-agent: PerplexityBot
User-agent: Google-Extended
User-agent: Applebot-Extended
Allow: /
Disallow: /api/
Disallow: /admin/

Sitemap: ${SITE}/sitemap.xml
`.trim();

  return new NextResponse(robotsTxt + '\n', {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
}
