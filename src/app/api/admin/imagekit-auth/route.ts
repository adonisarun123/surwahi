import { NextResponse } from 'next/server';
import { getCurrentUser } from '@/lib/auth/session';
import { can } from '@/lib/auth/permissions';
import { imagekitEnabled, uploadAuth } from '@/lib/media/imagekit';

export const dynamic = 'force-dynamic';

export async function GET() {
  const user = await getCurrentUser();
  if (!user || !can(user.role, 'media')) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  if (!imagekitEnabled()) return NextResponse.json({ error: 'ImageKit keys not configured' }, { status: 503 });
  return NextResponse.json(uploadAuth(), { headers: { 'Cache-Control': 'no-store' } });
}
