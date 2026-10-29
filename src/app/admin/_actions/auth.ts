'use server';

import { redirect } from 'next/navigation';
import { headers } from 'next/headers';
import { z } from 'zod';
import { prisma } from '@/lib/prisma';
import { createSession, destroySession, requireUser, audit } from '@/lib/auth/session';
import { hashPassword, passwordProblem, verifyPassword } from '@/lib/auth/password';
import { isRateLimited } from '@/lib/spam-guard';
import type { ActionState } from '@/components/admin/ui';

const loginSchema = z.object({
  email: z.string().trim().toLowerCase().email(),
  password: z.string().min(1).max(200),
});

export async function login(_prev: ActionState, form: FormData): Promise<ActionState> {
  const parsed = loginSchema.safeParse({ email: form.get('email'), password: form.get('password') });
  if (!parsed.success) return { error: 'Enter your email and password.', email: String(form.get('email') ?? '') };
  const { email, password } = parsed.data;

  const ip = (await headers()).get('x-forwarded-for')?.split(',')[0]?.trim() ?? 'unknown';
  if (isRateLimited(`login:${ip}`, 10, 15 * 60 * 1000) || isRateLimited(`login:${email}`, 5, 15 * 60 * 1000)) {
    return { error: 'Too many attempts. Try again in 15 minutes.', email };
  }

  const user = await prisma.adminUser.findUnique({ where: { email } });
  // Always run a hash comparison so response time doesn't reveal whether the email exists
  const ok = await verifyPassword(password, user?.passwordHash ?? 'scrypt$16384$8$1$AAAAAAAAAAAAAAAAAAAAAA==$AAAA');
  if (!user || !ok || !user.isActive) return { error: 'Wrong email or password.', email };

  await createSession(user.id);
  await audit(user.id, 'login', 'admin_user', user.id);
  redirect('/admin');
}

export async function logout() {
  await destroySession();
  redirect('/admin/login');
}

export async function changePassword(_prev: ActionState, form: FormData): Promise<ActionState> {
  const user = await requireUser();
  const current = String(form.get('current') ?? '');
  const next = String(form.get('next') ?? '');
  if (next !== String(form.get('confirm') ?? '')) return { error: 'New passwords do not match.' };
  const problem = passwordProblem(next);
  if (problem) return { error: problem };

  const row = await prisma.adminUser.findUniqueOrThrow({ where: { id: user.id } });
  if (!(await verifyPassword(current, row.passwordHash))) return { error: 'Current password is wrong.' };

  await prisma.adminUser.update({ where: { id: user.id }, data: { passwordHash: await hashPassword(next) } });
  await audit(user.id, 'change_password', 'admin_user', user.id);
  return { message: 'Password updated.' };
}
