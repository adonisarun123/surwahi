import { NextResponse, type NextRequest } from 'next/server';

// Cheap gate: bounce /admin/* to login when there is no session cookie.
// Real verification (session lookup + role) happens in requireUser() on every page and action.
export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  if (pathname === '/admin/login') return NextResponse.next();
  if (!request.cookies.has('srw_admin')) {
    return NextResponse.redirect(new URL('/admin/login', request.url));
  }
  const res = NextResponse.next();
  res.headers.set('X-Robots-Tag', 'noindex, nofollow');
  res.headers.set('Cache-Control', 'no-store');
  return res;
}

export const config = { matcher: ['/admin/:path*'] };
