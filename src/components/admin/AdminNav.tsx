'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { CalendarDays, Home, BedDouble, Image as ImageIcon, FileText, Users, ClipboardList, UserCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { Capability } from '@/lib/auth/permissions';

const ITEMS: { href: string; label: string; icon: React.ElementType; cap?: Capability; ready: boolean }[] = [
  { href: '/admin', label: 'Dashboard', icon: Home, ready: true },
  { href: '/admin/bookings', label: 'Bookings', icon: ClipboardList, cap: 'bookings', ready: true },
  { href: '/admin/calendar', label: 'Calendar', icon: CalendarDays, cap: 'calendar', ready: true },
  { href: '/admin/rooms', label: 'Rooms & Rates', icon: BedDouble, cap: 'rooms', ready: true },
  { href: '/admin/photos', label: 'Photos', icon: ImageIcon, cap: 'media', ready: true },
  { href: '/admin/content', label: 'Content', icon: FileText, cap: 'content', ready: true },
  { href: '/admin/users', label: 'Users', icon: Users, cap: 'users', ready: true },
  { href: '/admin/account', label: 'My account', icon: UserCircle, ready: true },
];

export default function AdminNav({ caps }: { caps: Capability[] }) {
  const pathname = usePathname();
  const items = ITEMS.filter((i) => i.ready && (!i.cap || caps.includes(i.cap)));
  return (
    <nav className="flex lg:flex-col gap-1 overflow-x-auto lg:overflow-visible">
      {items.map(({ href, label, icon: Icon }) => {
        const active = href === '/admin' ? pathname === '/admin' : pathname.startsWith(href);
        return (
          <Link
            key={href}
            href={href}
            className={cn(
              'flex items-center gap-2 whitespace-nowrap rounded-lg px-3 py-2 text-sm font-medium',
              active ? 'bg-forest-700 text-white' : 'text-ink-900 hover:bg-sand-50'
            )}
          >
            <Icon className="h-4 w-4" />
            {label}
          </Link>
        );
      })}
    </nav>
  );
}
