import Link from 'next/link';
import { requireUser } from '@/lib/auth/session';
import { can, type Capability } from '@/lib/auth/permissions';
import { logout } from '../_actions/auth';
import AdminNav from '@/components/admin/AdminNav';

export const dynamic = 'force-dynamic';

const ALL_CAPS: Capability[] = ['bookings', 'calendar', 'rates', 'rooms', 'media', 'content', 'users'];

export default async function PanelLayout({ children }: { children: React.ReactNode }) {
  const user = await requireUser();
  const caps = ALL_CAPS.filter((c) => can(user.role, c));
  return (
    <div className="min-h-screen lg:flex">
      <aside className="lg:w-60 lg:min-h-screen bg-white border-b lg:border-b-0 lg:border-r border-mist-200 p-4 lg:sticky lg:top-0">
        <div className="flex items-center justify-between lg:block mb-3 lg:mb-6">
          <Link href="/admin" className="font-display text-xl text-forest-900">Surwahi Admin</Link>
          <a href="/" target="_blank" rel="noreferrer" className="text-xs text-soil-700 hover:underline lg:block lg:mt-1">View site ↗</a>
        </div>
        <AdminNav caps={caps} />
        <div className="hidden lg:block mt-8 pt-4 border-t border-mist-200 text-sm">
          <div className="font-medium text-ink-900">{user.name}</div>
          <div className="text-xs text-soil-700 mb-2">{user.email} · {user.role.toLowerCase()}</div>
          <form action={logout}><button className="text-sm text-red-700 hover:underline">Sign out</button></form>
        </div>
      </aside>
      <main className="flex-1 p-4 lg:p-8 max-w-6xl">
        {children}
        <form action={logout} className="lg:hidden mt-10 text-center"><button className="text-sm text-red-700">Sign out ({user.email})</button></form>
      </main>
    </div>
  );
}
