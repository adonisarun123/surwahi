import { config } from 'dotenv';
import { defineConfig } from 'prisma/config';

// Prisma 7 no longer auto-loads env files. Next.js uses .env.local locally;
// on Vercel the variables are already in process.env.
config({ path: ['.env.local', '.env'], quiet: true });

export default defineConfig({
  schema: 'prisma/schema.prisma',
  datasource: {
    url: process.env.DATABASE_URL ?? '',
  },
});
