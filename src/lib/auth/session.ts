import 'server-only';
import { createHash, randomBytes } from 'node:crypto';
import { cookies, headers } from 'next/headers';
import { redirect } from 'next/navigation';
import { cache } from 'react';
import { prisma } from '@/lib/prisma';
import { can, type Capability } from './permissions';

export const SESSION_COOKIE = 'srw_admin';
const SESSION_DAYS = 14;

const sha256 = (v: string) => createHash('sha256').update(v).digest('hex');

export async function createSession(userId: string) {
  const token = randomBytes(32).toString('base64url');
  const expiresAt = new Date(Date.now() + SESSION_DAYS * 864e5);
  const h = await headers();
  await prisma.adminSession.create({
    data: {
      userId,
      tokenHash: sha256(token),
      expiresAt,
      ip: h.get('x-forwarded-for')?.split(',')[0]?.trim() ?? null,
      userAgent: h.get('user-agent')?.slice(0, 300) ?? null,
    },
  });
  await prisma.adminUser.update({ where: { id: userId }, data: { lastLoginAt: new Date() } });
  (await cookies()).set(SESSION_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    expires: expiresAt,
  });
}

export async function destroySession() {
  const jar = await cookies();
  const token = jar.get(SESSION_COOKIE)?.value;
  if (token) await prisma.adminSession.deleteMany({ where: { tokenHash: sha256(token) } });
  jar.delete(SESSION_COOKIE);
}

/** Current admin user, or null. Cached per request. */
export const getCurrentUser = cache(async () => {
  const token = (await cookies()).get(SESSION_COOKIE)?.value;
  if (!token) return null;
  const session = await prisma.adminSession.findUnique({
    where: { tokenHash: sha256(token) },
    include: { user: true },
  });
  if (!session || session.expiresAt < new Date() || !session.user.isActive) return null;
  const { passwordHash: _omit, ...user } = session.user;
  return user;
});

export type CurrentUser = NonNullable<Awaited<ReturnType<typeof getCurrentUser>>>;

/** Use at the top of every admin page and server action. */
export async function requireUser(cap?: Capability): Promise<CurrentUser> {
  const user = await getCurrentUser();
  if (!user) redirect('/admin/login');
  if (cap && !can(user.role, cap)) redirect('/admin?denied=1');
  return user;
}

export async function audit(userId: string | null, action: string, entity: string, entityId?: string, data?: unknown) {
  await prisma.auditLog.create({
    data: { userId, action, entity, entityId, data: data === undefined ? undefined : JSON.parse(JSON.stringify(data)) },
  });
}
