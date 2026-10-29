import { NextRequest, NextResponse } from 'next/server';
import { timingSafeEqual } from 'node:crypto';
import { syncAllFeeds } from '@/lib/booking/ical';

export const dynamic = 'force-dynamic';
export const maxDuration = 60;

/** Called by Vercel Cron (vercel.json). Vercel sends Authorization: Bearer $CRON_SECRET. */
export async function GET(request: NextRequest) {
  const secret = process.env.CRON_SECRET;
  const got = request.headers.get('authorization') ?? '';
  const want = `Bearer ${secret}`;
  if (!secret || got.length !== want.length || !timingSafeEqual(Buffer.from(got), Buffer.from(want))) {
    return NextResponse.json({ ok: false }, { status: 401 });
  }
  const results = await syncAllFeeds();
  return NextResponse.json({ ok: true, synced: results.length, failed: results.filter((r) => !r.ok).length });
}
