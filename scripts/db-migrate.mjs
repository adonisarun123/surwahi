#!/usr/bin/env node
// Applies db/migrations/*.sql in order, once each, tracked in schema_migrations.
// Safety: refuses to run a migration whose CREATE TABLE targets already exist
// (protects the hand-made legacy tables). Usage: node scripts/db-migrate.mjs [--dry-run]
import { readdirSync, readFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { config } from 'dotenv';
import pg from 'pg';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
config({ path: [join(root, '.env.local'), join(root, '.env')], quiet: true });
const dryRun = process.argv.includes('--dry-run');
const dir = join(root, 'db/migrations');

const client = new pg.Client({ connectionString: process.env.DATABASE_URL });
await client.connect();
try {
  await client.query(`CREATE TABLE IF NOT EXISTS schema_migrations (
    name text PRIMARY KEY, applied_at timestamptz NOT NULL DEFAULT now())`);
  const done = new Set((await client.query('SELECT name FROM schema_migrations')).rows.map((r) => r.name));
  const files = readdirSync(dir).filter((f) => f.endsWith('.sql')).sort();

  for (const file of files) {
    if (done.has(file)) { console.log(`skip    ${file}`); continue; }
    const sql = readFileSync(join(dir, file), 'utf8');
    const tables = [...sql.matchAll(/CREATE TABLE "([^"]+)"/g)].map((m) => m[1]);
    const types = [...sql.matchAll(/CREATE TYPE "([^"]+)"/g)].map((m) => m[1]);
    const clashT = (await client.query(
      `SELECT table_name FROM information_schema.tables WHERE table_schema='public' AND table_name = ANY($1)`, [tables])).rows;
    const clashE = (await client.query(`SELECT typname FROM pg_type WHERE typname = ANY($1)`, [types])).rows;
    if (clashT.length || clashE.length) {
      throw new Error(`${file}: refusing, already exists: ${[...clashT.map((r) => r.table_name), ...clashE.map((r) => r.typname)].join(', ')}`);
    }
    if (dryRun) { console.log(`would apply ${file} (${tables.length} tables)`); continue; }
    await client.query('BEGIN');
    try {
      await client.query(sql);
      await client.query('INSERT INTO schema_migrations (name) VALUES ($1)', [file]);
      await client.query('COMMIT');
      console.log(`applied ${file} (${tables.length} tables)`);
    } catch (e) {
      await client.query('ROLLBACK');
      throw e;
    }
  }
} finally {
  await client.end();
}
