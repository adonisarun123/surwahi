import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { fullyBookedNights, isAvailable } from '@/lib/booking/availability';
import { quoteFor } from '@/lib/booking/pricing';
import { nightsBetween, toDate, todayIst } from '@/lib/booking/dates';
import { getClientIp, isRateLimited } from '@/lib/spam-guard';

export const dynamic = 'force-dynamic';

/**
 * GET /api/availability?room=jholar                         -> fully booked nights for the next 365 days
 * GET /api/availability?room=jholar&checkIn=…&checkOut=…&adults=2&children=0 -> availability + live quote
 */
export async function GET(request: NextRequest) {
  if (isRateLimited(`avail:${getClientIp(request)}`, 120, 60 * 1000)) {
    return NextResponse.json({ error: 'Too many requests' }, { status: 429 });
  }
  const p = request.nextUrl.searchParams;
  const acc = await prisma.accommodation.findUnique({ where: { slug: p.get('room') ?? '' } });
  if (!acc || !acc.isActive) return NextResponse.json({ error: 'Unknown room' }, { status: 404 });

  try {
    if (!p.get('checkIn')) {
      const nights = await fullyBookedNights(acc, todayIst(), 365);
      return NextResponse.json({ fullyBooked: nights }, { headers: { 'Cache-Control': 'public, s-maxage=60' } });
    }
    const checkIn = toDate(p.get('checkIn')!);
    const checkOut = toDate(p.get('checkOut') ?? '');
    const adults = Math.max(1, Number(p.get('adults')) || 1);
    const children = Math.max(0, Number(p.get('children')) || 0);
    if (nightsBetween(checkIn, checkOut) < 1 || nightsBetween(checkIn, checkOut) > 30) {
      return NextResponse.json({ error: 'Choose between 1 and 30 nights' }, { status: 400 });
    }
    const [avail, { quote }] = await Promise.all([
      isAvailable(prisma, acc, checkIn, checkOut, { adults, children, exclusive: false }),
      quoteFor(acc.id, checkIn, checkOut, adults, children),
    ]);
    return NextResponse.json({ available: avail.ok, unavailableNights: avail.unavailableNights, quote });
  } catch {
    return NextResponse.json({ error: 'Invalid dates' }, { status: 400 });
  }
}
