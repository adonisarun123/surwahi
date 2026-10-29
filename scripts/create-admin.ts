// Creates (or resets the password of) an admin user and prints a one-time password.
// Usage: npm run admin:create -- you@example.com "Your Name" OWNER
import { config } from 'dotenv';
config({ path: ['.env.local', '.env'], quiet: true });

import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient, type AdminRole } from '../src/generated/prisma/client';
import { generatePassword, hashPassword } from '../src/lib/auth/password';

const prisma = new PrismaClient({ adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL }) });

async function main() {
  const [emailArg, name = 'Admin', role = 'OWNER'] = process.argv.slice(2);
  const email = emailArg?.trim().toLowerCase();
  if (!email || !['OWNER', 'MANAGER', 'EDITOR'].includes(role)) {
    console.error('Usage: npm run admin:create -- email "Name" OWNER|MANAGER|EDITOR');
    process.exit(1);
  }
  const password = generatePassword();
  const passwordHash = await hashPassword(password);
  await prisma.adminUser.upsert({
    where: { email },
    create: { email, name, role: role as AdminRole, passwordHash },
    update: { passwordHash, isActive: true },
  });
  console.log(`Admin ready: ${email} (${role})\nTemporary password: ${password}\nChange it after first login at /admin/account.`);
}

main().finally(() => prisma.$disconnect());
