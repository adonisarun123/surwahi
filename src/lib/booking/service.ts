import 'server-only';
import { revalidatePath } from 'next/cache';
import { prisma } from '@/lib/prisma';
import type { Reservation, Accommodation, ReservationSource } from '@/generated/prisma/client';
import { isAvailable, lockAccommodation } from './availability';
import { buildQuote, type Quote } from './pricing';
import { reservationCode } from './codes';
import { nightsBetween, todayIst } from './dates';
import { createPaymentLink } from './razorpay';
import * as mail from './emails';

export class BookingError extends Error {}

export interface StayRequest {
  accommodationId: string;
  checkIn: Date;
  checkOut: Date;
  adults: number;
  children: number;
  exclusive?: boolean;
  guestName: string;
  guestEmail: string;
  guestPhone: string;
  specialRequests?: string | null;
  source?: ReservationSource;
  createdById?: string | null;
  status?: 'REQUESTED' | 'CONFIRMED';
  internalNotes?: string | null;
}

export function toMail(r: Reservation & { accommodation: Accommodation }): mail.MailReservation {
  const q = r.priceBreakdown as unknown as Quote;
  return {
    code: r.code,
    guestName: r.guestName,
    guestEmail: r.guestEmail,
    guestPhone: r.guestPhone,
    roomName: r.accommodation.name,
    checkIn: r.checkIn,
    checkOut: r.checkOut,
    adults: r.adults,
    children: r.children,
    specialRequests: r.specialRequests,
    quote: { lines: q.lines, subtotal: r.subtotal, gst: r.gst, gstPercent: q.gstPercent, total: r.total, notes: q.notes ?? [] },
    paymentLinkUrl: r.paymentLinkUrl,
  };
}

function validateStay(acc: Accommodation, req: StayRequest, quote: Quote, allowPast = false) {
  const nights = nightsBetween(req.checkIn, req.checkOut);
  if (nights < 1) throw new BookingError('Check-out must be after check-in.');
  if (nights > 30) throw new BookingError('For stays longer than 30 nights, please contact us.');
  if (!allowPast && req.checkIn < todayIst()) throw new BookingError('Check-in date is in the past.');
  if (!acc.isActive) throw new BookingError('This room is not available for booking.');
  if (req.adults < 1) throw new BookingError('At least one adult is required.');
  if (req.adults + req.children > acc.maxOccupancy) throw new BookingError(`${acc.name} sleeps up to ${acc.maxOccupancy}.`);
  if (nights < quote.minNights) throw new BookingError(`Minimum stay for these dates is ${quote.minNights} nights.`);
}

/** Creates a reservation. Website requests start as REQUESTED; staff-entered bookings can be CONFIRMED directly. */
export async function createReservation(req: StayRequest, { allowPast = false } = {}) {
  const result = await prisma.$transaction(async (tx) => {
    await lockAccommodation(tx, req.accommodationId);
    const acc = await tx.accommodation.findUniqueOrThrow({ where: { id: req.accommodationId } });
    const rules = await tx.rateRule.findMany({ where: { accommodationId: acc.id, isActive: true, startDate: { lt: req.checkOut }, endDate: { gte: req.checkIn } } });
    const quote = buildQuote(acc, rules, req.checkIn, req.checkOut, req.adults, req.children, req.exclusive);
    validateStay(acc, req, quote, allowPast);

    const avail = await isAvailable(tx, acc, req.checkIn, req.checkOut, { adults: req.adults, children: req.children, exclusive: !!req.exclusive });
    if (!avail.ok) throw new BookingError(`Not available on ${avail.unavailableNights.slice(0, 3).join(', ')}${avail.unavailableNights.length > 3 ? '…' : ''}.`);

    return tx.reservation.create({
      data: {
        code: reservationCode(),
        accommodationId: acc.id,
        checkIn: req.checkIn,
        checkOut: req.checkOut,
        adults: req.adults,
        children: req.children,
        exclusive: !!req.exclusive,
        guestName: req.guestName,
        guestEmail: req.guestEmail,
        guestPhone: req.guestPhone,
        specialRequests: req.specialRequests || null,
        source: req.source ?? 'WEBSITE',
        status: req.status ?? 'REQUESTED',
        subtotal: quote.subtotal,
        gst: quote.gst,
        total: quote.total,
        priceBreakdown: JSON.parse(JSON.stringify(quote)),
        createdById: req.createdById ?? null,
        internalNotes: req.internalNotes ?? null,
      },
      include: { accommodation: true },
    });
  });
  revalidateCalendar();
  return result;
}

/** Staff approves a request: re-checks availability, holds dates, creates/attaches a payment link and emails the guest. */
export async function approveReservation(id: string, opts: { manualPaymentUrl?: string | null; markPaid?: boolean }) {
  const r = await prisma.$transaction(async (tx) => {
    const current = await tx.reservation.findUniqueOrThrow({ where: { id }, include: { accommodation: true } });
    if (!['REQUESTED', 'AWAITING_PAYMENT'].includes(current.status)) throw new BookingError(`Can't approve a ${current.status.toLowerCase()} booking.`);
    await lockAccommodation(tx, current.accommodationId);
    const avail = await isAvailable(tx, current.accommodation, current.checkIn, current.checkOut, current, current.id);
    if (!avail.ok) throw new BookingError(`Those dates are no longer free (${avail.unavailableNights.slice(0, 3).join(', ')}).`);
    return tx.reservation.update({
      where: { id },
      data: opts.markPaid
        ? { status: 'CONFIRMED', amountPaid: current.total, paidAt: new Date() }
        : { status: 'AWAITING_PAYMENT', paymentLinkUrl: opts.manualPaymentUrl || current.paymentLinkUrl },
      include: { accommodation: true },
    });
  });

  let res = r;
  if (!opts.markPaid && !r.paymentLinkUrl) {
    const link = await createPaymentLink({
      code: r.code,
      amountInr: r.total,
      description: `${r.accommodation.name}, ${r.checkIn.toISOString().slice(0, 10)} to ${r.checkOut.toISOString().slice(0, 10)} (${r.code})`,
      name: r.guestName,
      email: r.guestEmail,
      phone: r.guestPhone,
    });
    if (link) res = await prisma.reservation.update({ where: { id }, data: { paymentLinkUrl: link.url, paymentLinkId: link.id }, include: { accommodation: true } });
  }

  if (opts.markPaid) await mail.emailConfirmed(toMail(res));
  else await mail.emailPaymentLink(toMail(res));
  revalidateCalendar();
  return res;
}

export async function markPaid(id: string, amount?: number) {
  const r = await prisma.reservation.update({
    where: { id },
    data: { status: 'CONFIRMED', paidAt: new Date(), ...(amount != null ? { amountPaid: amount } : {}) },
    include: { accommodation: true },
  });
  if (amount == null) await prisma.reservation.update({ where: { id }, data: { amountPaid: r.total } });
  await mail.emailConfirmed(toMail(r));
  revalidateCalendar();
  return r;
}

export async function setStatus(id: string, status: 'DECLINED' | 'CANCELLED' | 'COMPLETED' | 'NO_SHOW', opts: { notify?: boolean; reason?: string } = {}) {
  const r = await prisma.reservation.update({ where: { id }, data: { status }, include: { accommodation: true } });
  if (opts.notify && status === 'DECLINED') await mail.emailDeclined(toMail(r), opts.reason);
  if (opts.notify && status === 'CANCELLED') await mail.emailCancelled(toMail(r));
  revalidateCalendar();
  return r;
}

export function revalidateCalendar() {
  try { revalidatePath('/admin', 'layout'); } catch { /* outside a request */ }
}
