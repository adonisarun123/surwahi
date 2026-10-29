import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { prisma } from '@/lib/prisma';
import { createReservation, toMail, BookingError } from '@/lib/booking/service';
import { emailOwnerNewRequest, emailRequestReceived } from '@/lib/booking/emails';
import { toDate } from '@/lib/booking/dates';
import { getClientIp, isAllowedOrigin, isRateLimited, looksLikeBotSubmission } from '@/lib/spam-guard';

const schema = z.object({
  room: z.string().min(1).max(80),
  checkIn: z.string(),
  checkOut: z.string(),
  adults: z.coerce.number().int().min(1).max(20),
  children: z.coerce.number().int().min(0).max(20).default(0),
  guestName: z.string().trim().min(2).max(100),
  guestEmail: z.string().trim().toLowerCase().max(254).email(),
  guestPhone: z.string().trim().min(8).max(20).regex(/^[+\d][\d\s-]{7,19}$/, 'Enter a valid phone number'),
  specialRequests: z.string().trim().max(1000).optional(),
  website: z.string().max(200).optional(), // honeypot
  startedAt: z.union([z.number(), z.string()]).optional(),
});

/** Public booking request. Creates a REQUESTED reservation (dates are not held until staff approve). */
export async function POST(request: NextRequest) {
  if (!isAllowedOrigin(request)) return NextResponse.json({ success: false, message: 'Forbidden' }, { status: 403 });
  const ip = getClientIp(request);
  if (isRateLimited(`reserve:${ip}`, 5, 60 * 60 * 1000)) {
    return NextResponse.json({ success: false, message: 'Too many requests. Please WhatsApp us instead.' }, { status: 429 });
  }

  let data: z.infer<typeof schema>;
  try {
    data = schema.parse(await request.json());
  } catch (e) {
    const msg = e instanceof z.ZodError ? e.issues[0]?.message : 'Invalid request';
    return NextResponse.json({ success: false, message: msg }, { status: 400 });
  }
  if (looksLikeBotSubmission(data, 4000)) {
    return NextResponse.json({ success: true, code: 'SRW-RECEIVED', message: 'Request received.' }); // silently drop bots
  }

  const acc = await prisma.accommodation.findUnique({ where: { slug: data.room } });
  if (!acc) return NextResponse.json({ success: false, message: 'Unknown room' }, { status: 404 });

  try {
    const r = await createReservation({
      accommodationId: acc.id,
      checkIn: toDate(data.checkIn),
      checkOut: toDate(data.checkOut),
      adults: data.adults,
      children: data.children,
      guestName: data.guestName,
      guestEmail: data.guestEmail,
      guestPhone: data.guestPhone,
      specialRequests: data.specialRequests,
      source: 'WEBSITE',
    });
    const site = process.env.NEXT_PUBLIC_SITE_URL || request.nextUrl.origin;
    await Promise.all([emailRequestReceived(toMail(r)), emailOwnerNewRequest(toMail(r), `${site}/admin/bookings/${r.id}`)]);
    return NextResponse.json({ success: true, code: r.code, total: r.total });
  } catch (e) {
    if (e instanceof BookingError) return NextResponse.json({ success: false, message: e.message }, { status: 409 });
    if (e instanceof Error && e.message.startsWith('Bad date')) return NextResponse.json({ success: false, message: 'Invalid dates' }, { status: 400 });
    console.error('Reservation request failed', e);
    return NextResponse.json({ success: false, message: 'Something went wrong. Please WhatsApp +91 77952 07779.' }, { status: 500 });
  }
}
