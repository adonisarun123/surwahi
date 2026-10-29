'use server';

import { revalidatePath } from 'next/cache';
import { z } from 'zod';
import { prisma } from '@/lib/prisma';
import { requireUser, audit } from '@/lib/auth/session';
import { generatePassword, hashPassword } from '@/lib/auth/password';
import type { ActionState } from '@/components/admin/ui';

const createSchema = z.object({
  email: z.string().trim().toLowerCase().email(),
  name: z.string().trim().min(2).max(80),
  role: z.enum(['OWNER', 'MANAGER', 'EDITOR']),
});

export async function createUser(_prev: ActionState, form: FormData): Promise<ActionState> {
  const me = await requireUser('users');
  const parsed = createSchema.safeParse(Object.fromEntries(form));
  if (!parsed.success) return { error: 'Enter a name, a valid email and a role.' };
  if (await prisma.adminUser.findUnique({ where: { email: parsed.data.email } })) return { error: 'That email already has an account.' };

  const password = generatePassword();
  const user = await prisma.adminUser.create({ data: { ...parsed.data, passwordHash: await hashPassword(password) } });
  await audit(me.id, 'create_user', 'admin_user', user.id, { email: user.email, role: user.role });
  revalidatePath('/admin/users');
  return { message: `Created. Share this temporary password privately: ${password}  (they can change it under My account)` };
}

export async function resetPassword(userId: string, _prev: ActionState): Promise<ActionState> {
  const me = await requireUser('users');
  const password = generatePassword();
  await prisma.adminUser.update({ where: { id: userId }, data: { passwordHash: await hashPassword(password) } });
  await prisma.adminSession.deleteMany({ where: { userId } }); // sign them out everywhere
  await audit(me.id, 'reset_password', 'admin_user', userId);
  return { message: `New temporary password: ${password}` };
}

export async function setUserActive(userId: string, active: boolean) {
  const me = await requireUser('users');
  if (userId === me.id) return;
  const target = await prisma.adminUser.findUniqueOrThrow({ where: { id: userId } });
  if (!active && target.role === 'OWNER' && (await prisma.adminUser.count({ where: { role: 'OWNER', isActive: true } })) <= 1) return;
  await prisma.adminUser.update({ where: { id: userId }, data: { isActive: active } });
  if (!active) await prisma.adminSession.deleteMany({ where: { userId } });
  await audit(me.id, active ? 'activate_user' : 'deactivate_user', 'admin_user', userId);
  revalidatePath('/admin/users');
}

export async function setUserRole(userId: string, form: FormData) {
  const me = await requireUser('users');
  const role = z.enum(['OWNER', 'MANAGER', 'EDITOR']).parse(form.get('role'));
  if (userId === me.id) return; // can't demote yourself
  await prisma.adminUser.update({ where: { id: userId }, data: { role } });
  await audit(me.id, 'change_role', 'admin_user', userId, { role });
  revalidatePath('/admin/users');
}
