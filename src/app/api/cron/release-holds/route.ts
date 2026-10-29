import { NextRequest, NextResponse } from 'next/server';
import { timingSafeEqual } from 'node:crypto';
import { releaseExpiredHolds } from '@/lib/booking/service';

export const dynamic = 'force-dynamic';

/** Vercel Cron (vercel.json): releases unpaid holds past their expiry. Auth: Bearer $CRON_SECRET. */
export async function GET(request: NextRequest) {
  const secret = process.env.CRON_SECRET;
  const got = request.headers.get('authorization') ?? '';
  const want = `Bearer ${secret}`;
  if (!secret || got.length !== want.length || !timingSafeEqual(Buffer.from(got), Buffer.from(want))) {
    return NextResponse.json({ ok: false }, { status: 401 });
  }
  return NextResponse.json({ ok: true, released: await releaseExpiredHolds() });
}
