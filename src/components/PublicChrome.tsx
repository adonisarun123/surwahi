'use client';

import { usePathname } from 'next/navigation';

/** Renders public site chrome (header, footer, floating bars) everywhere except /admin. */
export default function PublicChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  if (pathname?.startsWith('/admin')) return null;
  return <>{children}</>;
}
