import type { AdminRole } from '@/generated/prisma/client';

export type Capability = 'bookings' | 'calendar' | 'rates' | 'rooms' | 'media' | 'content' | 'users';

const ROLE_CAPS: Record<AdminRole, Capability[]> = {
  OWNER: ['bookings', 'calendar', 'rates', 'rooms', 'media', 'content', 'users'],
  MANAGER: ['bookings', 'calendar', 'rates', 'rooms'],
  EDITOR: ['rooms', 'media', 'content'],
};

export function can(role: AdminRole, cap: Capability): boolean {
  return ROLE_CAPS[role].includes(cap);
}

export const ROLE_LABELS: Record<AdminRole, string> = {
  OWNER: 'Owner - everything, including users',
  MANAGER: 'Manager - bookings, calendar, rates',
  EDITOR: 'Editor - photos and content',
};
