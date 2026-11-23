// Writes src/config/sitemap-lastmod.json: { "/route": "YYYY-MM-DD" } for every static App Router page,
// using the date of the last git commit that touched that route's own folder (page, layout, local files).
// Sitemap <lastmod> must be truthful or Google ignores it, so we never invent "today".
//
// Runs automatically before `next build`. On shallow clones (Vercel builds) git history is incomplete,
// so the script exits without touching the committed file — commit the refreshed JSON from a local build.
import { execSync } from 'node:child_process';
import { readdirSync, statSync, writeFileSync, existsSync } from 'node:fs';
import { join, relative, sep } from 'node:path';

const APP = 'src/app';
const OUT = 'src/config/sitemap-lastmod.json';
const SKIP = new Set(['api', 'admin']);

const git = (cmd) => execSync(`git ${cmd}`, { encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'] }).trim();

try {
  if (git('rev-parse --is-shallow-repository') === 'true') {
    console.log('[sitemap-lastmod] shallow clone — keeping committed', OUT);
    process.exit(0);
  }
} catch {
  console.log('[sitemap-lastmod] no git — keeping committed', OUT);
  process.exit(0);
}

const routes = {};
function walk(dir) {
  for (const name of readdirSync(dir)) {
    const full = join(dir, name);
    if (!statSync(full).isDirectory()) continue;
    if (SKIP.has(name) || name.startsWith('_')) continue;
    walk(full);
  }
  if (!existsSync(join(dir, 'page.tsx'))) return;
  const segs = relative(APP, dir).split(sep).filter(Boolean);
  // Dynamic templates (e.g. /stay/[slug]) are recorded under their bracket path; the sitemap uses
  // them for pages whose layout lives in the template (rooms). Blog posts use their DB updatedAt instead.
  const route = '/' + segs.filter((s) => !s.startsWith('(')).join('/');
  // Only this folder's direct files, so a parent page isn't "updated" every time a child page changes.
  const files = readdirSync(dir).filter((f) => statSync(join(dir, f)).isFile()).map((f) => `"${join(dir, f)}"`);
  const date = git(`log -1 --format=%cs -- ${files.join(' ')}`);
  if (date) routes[route === '/' ? '' : route] = date;
}
walk(APP);

const sorted = Object.fromEntries(Object.entries(routes).sort(([a], [b]) => a.localeCompare(b)));
writeFileSync(OUT, JSON.stringify(sorted, null, 2) + '\n');
console.log(`[sitemap-lastmod] wrote ${Object.keys(sorted).length} routes to ${OUT}`);
