import { Badge } from './ui';
import type { ReservationStatus } from '@/generated/prisma/client';

const MAP: Record<ReservationStatus, { label: string; tone: 'neutral' | 'green' | 'amber' | 'red' | 'blue' }> = {
  REQUESTED: { label: 'New request', tone: 'blue' },
  AWAITING_PAYMENT: { label: 'Awaiting payment', tone: 'amber' },
  CONFIRMED: { label: 'Confirmed', tone: 'green' },
  DECLINED: { label: 'Declined', tone: 'neutral' },
  CANCELLED: { label: 'Cancelled', tone: 'red' },
  COMPLETED: { label: 'Completed', tone: 'neutral' },
  NO_SHOW: { label: 'No-show', tone: 'red' },
};

export function StatusBadge({ status }: { status: ReservationStatus }) {
  const s = MAP[status];
  return <Badge tone={s.tone}>{s.label}</Badge>;
}

export const SOURCE_LABELS: Record<string, string> = {
  WEBSITE: 'Website', PHONE: 'Phone', WHATSAPP: 'WhatsApp', WALK_IN: 'Walk-in', AIRBNB: 'Airbnb', BOOKING_COM: 'Booking.com', OTHER: 'Other',
};
