import { createHmac, timingSafeEqual } from 'node:crypto';
import { NextRequest } from 'next/server';

/**
 * Lightweight bot defences for public form endpoints.
 * NOTE: the rate limiter is in-memory, so on Vercel it is per-instance and best-effort.
 * Pair it with a Vercel Firewall rate-limit rule on /api/newsletter and /api/contact.
 */

const ALLOWED_ORIGIN_HOSTS = new Set(['surwahi.com', 'www.surwahi.com', 'localhost']);

export function getClientIp(request: NextRequest): string {
  const fwd = request.headers.get('x-forwarded-for');
  return (fwd?.split(',')[0] || request.headers.get('x-real-ip') || 'unknown').trim();
}

/** Reject cross-site posts. Browsers always send Origin on fetch POSTs. */
export function isAllowedOrigin(request: NextRequest): boolean {
  const origin = request.headers.get('origin');
  if (!origin) return false;
  try {
    const host = new URL(origin).hostname;
    if (ALLOWED_ORIGIN_HOSTS.has(host)) return true;
    // Preview deployments of this project only
    return host.endsWith('-arun-mahendrans-projects.vercel.app') || host === 'surwahi.vercel.app';
  } catch {
    return false;
  }
}

type Bucket = { count: number; resetAt: number };
const buckets = new Map<string, Bucket>();

/** Returns true if the caller is over the limit. */
export function isRateLimited(key: string, max: number, windowMs: number): boolean {
  const now = Date.now();
  if (buckets.size > 5000) {
    for (const [k, b] of buckets) if (b.resetAt < now) buckets.delete(k);
  }
  const b = buckets.get(key);
  if (!b || b.resetAt < now) {
    buckets.set(key, { count: 1, resetAt: now + windowMs });
    return false;
  }
  b.count += 1;
  return b.count > max;
}

/**
 * Honeypot + minimum fill time. `website` is a hidden field humans never fill;
 * `startedAt` is set when the form mounts. Direct API hits send neither.
 */
export function looksLikeBotSubmission(body: { website?: unknown; startedAt?: unknown }, minMs = 2500): boolean {
  if (typeof body.website === 'string' && body.website.trim() !== '') return true;
  const started = Number(body.startedAt);
  if (!Number.isFinite(started)) return true;
  const elapsed = Date.now() - started;
  return elapsed < minMs || elapsed > 1000 * 60 * 60 * 24;
}

/** Common subscription-bombing pattern: gmail dot-variants like j.o.h.n.d.o.e@gmail.com */
export function isSuspiciousEmail(email: string): boolean {
  const [local, domain] = email.split('@');
  if (!local || !domain) return true;
  const dots = (local.match(/\./g) || []).length;
  if ((domain === 'gmail.com' || domain === 'googlemail.com') && dots >= 3) return true;
  return false;
}

export function escapeHtml(value: unknown): string {
  return String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

/** Signed token for unsubscribe links, so nobody can unsubscribe someone else. */
export function unsubscribeToken(email: string): string | null {
  const secret = process.env.NEWSLETTER_SECRET || process.env.ADMIN_API_SECRET;
  if (!secret || secret.length < 16) return null;
  return createHmac('sha256', secret).update(email.trim().toLowerCase()).digest('hex');
}

export function verifyUnsubscribeToken(email: string, token: string | null): boolean {
  const expected = unsubscribeToken(email);
  if (!expected || !token || token.length !== expected.length) return false;
  return timingSafeEqual(Buffer.from(token), Buffer.from(expected));
}
