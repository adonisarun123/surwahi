'use server';

import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import { z } from 'zod';
import { prisma } from '@/lib/prisma';
import { requireUser, audit } from '@/lib/auth/session';
import { approveReservation, createReservation, markPaid, setStatus, extendHold, BookingError } from '@/lib/booking/service';
import { toDate } from '@/lib/booking/dates';
import type { ActionState } from '@/components/admin/ui';

const fail = (e: unknown): ActionState => {
  if (e instanceof BookingError) return { error: e.message };
  console.error(e);
  return { error: e instanceof Error ? e.message : 'Something went wrong.' };
};

export async function approve(id: string, _prev: ActionState, form: FormData): Promise<ActionState> {
  const user = await requireUser('bookings');
  const manual = String(form.get('paymentUrl') ?? '').trim();
  if (manual && !/^https:\/\/\S+$/.test(manual)) return { error: 'Payment link must start with https://' };
  const paidOffline = form.get('paidOffline') === 'on';
  try {
    const r = await approveReservation(id, { manualPaymentUrl: manual || null, markPaid: paidOffline });
    await audit(user.id, paidOffline ? 'approve_paid' : 'approve', 'reservation', id, { paymentLinkUrl: r.paymentLinkUrl });
    revalidatePath(`/admin/bookings/${id}`);
    return { message: paidOffline ? 'Confirmed and confirmation emailed.' : r.paymentLinkUrl ? 'Approved. Payment link emailed to the guest.' : 'Approved and dates held. No payment link yet - add one or mark paid when received.' };
  } catch (e) { return fail(e); }
}

export async function recordPayment(id: string, _prev: ActionState, form: FormData): Promise<ActionState> {
  const user = await requireUser('bookings');
  const amount = form.get('amount') ? Number(form.get('amount')) : undefined;
  if (amount != null && (!Number.isFinite(amount) || amount < 0)) return { error: 'Enter a valid amount.' };
  try {
    await markPaid(id, amount);
    await audit(user.id, 'mark_paid', 'reservation', id, { amount });
    revalidatePath(`/admin/bookings/${id}`);
    return { message: 'Marked paid and confirmation emailed.' };
  } catch (e) { return fail(e); }
}

export async function changeStatus(id: string, _prev: ActionState, form: FormData): Promise<ActionState> {
  const user = await requireUser('bookings');
  const status = z.enum(['DECLINED', 'CANCELLED', 'COMPLETED', 'NO_SHOW']).safeParse(form.get('status'));
  if (!status.success) return { error: 'Pick a status.' };
  try {
    await setStatus(id, status.data, { notify: form.get('notify') === 'on', reason: String(form.get('reason') ?? '').trim() || undefined });
    await audit(user.id, `set_${status.data.toLowerCase()}`, 'reservation', id);
    revalidatePath(`/admin/bookings/${id}`);
    return { message: `Marked ${status.data.toLowerCase().replace('_', '-')}.` };
  } catch (e) { return fail(e); }
}

export async function saveNotes(id: string, _prev: ActionState, form: FormData): Promise<ActionState> {
  await requireUser('bookings');
  await prisma.reservation.update({ where: { id }, data: { internalNotes: String(form.get('notes') ?? '').slice(0, 4000) } });
  revalidatePath(`/admin/bookings/${id}`);
  return { message: 'Notes saved.' };
}

const manualSchema = z.object({
  accommodationId: z.string().uuid(),
  checkIn: z.string(),
  checkOut: z.string(),
  adults: z.coerce.number().int().min(1).max(50),
  children: z.coerce.number().int().min(0).max(50),
  guestName: z.string().trim().min(2).max(100),
  guestEmail: z.string().trim().toLowerCase().email(),
  guestPhone: z.string().trim().min(6).max(20),
  source: z.enum(['PHONE', 'WHATSAPP', 'WALK_IN', 'AIRBNB', 'BOOKING_COM', 'WEBSITE', 'OTHER']),
  status: z.enum(['REQUESTED', 'CONFIRMED']),
  specialRequests: z.string().trim().max(1000).optional(),
  internalNotes: z.string().trim().max(4000).optional(),
});

export async function createManualBooking(_prev: ActionState, form: FormData): Promise<ActionState> {
  const user = await requireUser('bookings');
  const parsed = manualSchema.safeParse(Object.fromEntries(form));
  if (!parsed.success) return { error: `Check ${parsed.error.issues[0]?.path.join('.')}: ${parsed.error.issues[0]?.message}` };
  let id: string;
  try {
    const d = parsed.data;
    const r = await createReservation(
      { ...d, checkIn: toDate(d.checkIn), checkOut: toDate(d.checkOut), exclusive: form.get('exclusive') === 'on', createdById: user.id },
      { allowPast: true }
    );
    if (d.status === 'CONFIRMED' && form.get('paid') === 'on') await prisma.reservation.update({ where: { id: r.id }, data: { amountPaid: r.total, paidAt: new Date() } });
    await audit(user.id, 'create_manual', 'reservation', r.id, { source: d.source });
    id = r.id;
  } catch (e) { return fail(e); }
  redirect(`/admin/bookings/${id}`);
}

export async function extendBookingHold(id: string, _prev: ActionState, form: FormData): Promise<ActionState> {
  const user = await requireUser('bookings');
  const hours = Number(form.get('hours'));
  if (![24, 48, 72].includes(hours)) return { error: 'Pick 24, 48 or 72 hours.' };
  try {
    const until = await extendHold(id, hours);
    await audit(user.id, 'extend_hold', 'reservation', id, { hours, until });
    revalidatePath(`/admin/bookings/${id}`);
    return { message: `Hold extended to ${until.toLocaleString('en-IN', { timeZone: 'Asia/Kolkata', dateStyle: 'medium', timeStyle: 'short' })}.` };
  } catch (e) { return fail(e); }
}
