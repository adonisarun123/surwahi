import { NextRequest } from 'next/server';
import { exportIcs } from '@/lib/booking/ical';

export const dynamic = 'force-dynamic';

/** Public secret calendar URL for OTAs: /api/ical/<token>.ics[?exclude=<feedId>] */
export async function GET(request: NextRequest, { params }: { params: Promise<{ token: string }> }) {
  const { token } = await params;
  const ics = await exportIcs(token.replace(/\.ics$/, ''), request.nextUrl.searchParams.get('exclude'));
  if (!ics) return new Response('Not found', { status: 404 });
  return new Response(ics, {
    headers: { 'Content-Type': 'text/calendar; charset=utf-8', 'Cache-Control': 'no-store', 'X-Robots-Tag': 'noindex' },
  });
}
