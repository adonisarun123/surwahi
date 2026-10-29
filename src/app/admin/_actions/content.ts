'use server';

import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import { z } from 'zod';
import { prisma } from '@/lib/prisma';
import { requireUser, audit } from '@/lib/auth/session';
import { toDate } from '@/lib/booking/dates';
import { ALLOWED_IMAGE_HOSTS } from '@/lib/media/imagekit';
import { CONTENT_PATHS } from '@/lib/content-repo';
import type { ActionState } from '@/components/admin/ui';

const revalidate = (paths: string[], extra: string[] = []) => {
  for (const p of [...paths, ...extra]) revalidatePath(p);
  revalidatePath('/admin', 'layout');
};
const issue = (e: z.ZodError) => `Check ${e.issues[0]?.path.join('.')}: ${e.issues[0]?.message}`;
const hostOf = (v: string) => { try { return new URL(v).hostname; } catch { return ''; } };
const imageUrl = z.string().trim().refine((v) => !v || (v.startsWith('https://') && ALLOWED_IMAGE_HOSTS.includes(hostOf(v))), `Image must be an https URL on ${ALLOWED_IMAGE_HOSTS.join(' or ')}`);
const internalPath = z.string().trim().refine((v) => !v || /^\/[\w\-/]*$/.test(v), 'Use a site path like /workshops/vann-vibe');

// ─── Blog ─────────────────────────────────────────────────────────────

const articleSchema = z.object({
  title: z.string().trim().min(5).max(140),
  slug: z.string().trim().toLowerCase().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, 'Lowercase words separated by hyphens').max(100),
  excerpt: z.string().trim().min(20).max(400),
  content: z.string().trim().min(50).max(60000),
  category: z.string().trim().min(2).max(60),
  author: z.string().trim().min(2).max(80),
  authorBio: z.string().trim().max(300),
  coverUrl: imageUrl,
  coverAlt: z.string().trim().max(200),
  tags: z.string().max(400),
  publishedAt: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  status: z.enum(['DRAFT', 'PUBLISHED']),
  seoTitle: z.string().trim().max(70),
  seoDescription: z.string().trim().max(170),
});

export async function saveArticle(id: string | null, _prev: ActionState, form: FormData): Promise<ActionState> {
  const user = await requireUser('content');
  const p = articleSchema.safeParse(Object.fromEntries(form));
  if (!p.success) return { error: issue(p.error) };
  const d = p.data;
  const clash = await prisma.article.findUnique({ where: { slug: d.slug } });
  if (clash && clash.id !== id) return { error: 'Another post already uses that URL slug.' };
  const data = {
    ...d,
    authorBio: d.authorBio || null, coverUrl: d.coverUrl || null, coverAlt: d.coverAlt || null,
    seoTitle: d.seoTitle || null, seoDescription: d.seoDescription || null,
    tags: d.tags.split(',').map((t) => t.trim()).filter(Boolean),
    publishedAt: toDate(d.publishedAt),
  };
  const before = id ? await prisma.article.findUnique({ where: { id }, select: { slug: true } }) : null;
  const a = id ? await prisma.article.update({ where: { id }, data }) : await prisma.article.create({ data });
  await audit(user.id, id ? 'update_article' : 'create_article', 'article', a.id, { status: a.status });
  revalidate(CONTENT_PATHS.blog, [`/blogs/${a.slug}`, ...(before && before.slug !== a.slug ? [`/blogs/${before.slug}`] : [])]);
  if (!id) redirect(`/admin/content/blog/${a.id}`);
  return { message: a.status === 'PUBLISHED' ? 'Saved and live.' : 'Saved as draft (not visible on the site).' };
}

export async function deleteArticle(id: string) {
  const user = await requireUser('content');
  const a = await prisma.article.delete({ where: { id } });
  await audit(user.id, 'delete_article', 'article', id, { slug: a.slug, title: a.title });
  revalidate(CONTENT_PATHS.blog, [`/blogs/${a.slug}`]);
  redirect('/admin/content/blog');
}

// ─── FAQs ─────────────────────────────────────────────────────────────

const faqSchema = z.object({
  category: z.string().trim().min(2).max(60),
  question: z.string().trim().min(5).max(300),
  answer: z.string().trim().min(5).max(3000),
  sortOrder: z.coerce.number().int().min(0).max(100000),
});

export async function saveFaq(id: string | null, _prev: ActionState, form: FormData): Promise<ActionState> {
  const user = await requireUser('content');
  const p = faqSchema.safeParse(Object.fromEntries(form));
  if (!p.success) return { error: issue(p.error) };
  const data = { ...p.data, isPublished: form.get('isPublished') === 'on' };
  const f = id ? await prisma.faq.update({ where: { id }, data }) : await prisma.faq.create({ data });
  await audit(user.id, id ? 'update_faq' : 'create_faq', 'faq', f.id);
  revalidate(CONTENT_PATHS.faqs);
  return { message: id ? 'Saved.' : 'FAQ added.' };
}

export async function deleteFaq(id: string) {
  const user = await requireUser('content');
  await prisma.faq.delete({ where: { id } });
  await audit(user.id, 'delete_faq', 'faq', id);
  revalidate(CONTENT_PATHS.faqs);
}

// ─── Events ───────────────────────────────────────────────────────────

const eventSchema = z.object({
  title: z.string().trim().min(3).max(120),
  summary: z.string().trim().min(10).max(400),
  startDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  endDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  linkPath: internalPath,
  priceText: z.string().trim().max(80),
  imageUrl: imageUrl,
});

export async function saveEvent(id: string | null, _prev: ActionState, form: FormData): Promise<ActionState> {
  const user = await requireUser('content');
  const p = eventSchema.safeParse(Object.fromEntries(form));
  if (!p.success) return { error: issue(p.error) };
  if (p.data.endDate < p.data.startDate) return { error: 'End date is before start date.' };
  const data = {
    ...p.data, startDate: toDate(p.data.startDate), endDate: toDate(p.data.endDate),
    linkPath: p.data.linkPath || null, priceText: p.data.priceText || null, imageUrl: p.data.imageUrl || null,
    isPublished: form.get('isPublished') === 'on',
  };
  const e = id ? await prisma.event.update({ where: { id }, data }) : await prisma.event.create({ data });
  await audit(user.id, id ? 'update_event' : 'create_event', 'event', e.id);
  revalidate(CONTENT_PATHS.events, e.linkPath ? [e.linkPath] : []);
  return { message: id ? 'Saved.' : 'Event added.' };
}

export async function deleteEvent(id: string) {
  const user = await requireUser('content');
  await prisma.event.delete({ where: { id } });
  await audit(user.id, 'delete_event', 'event', id);
  revalidate(CONTENT_PATHS.events);
}

// ─── Homepage & site settings ─────────────────────────────────────────

const heroSchema = z.object({
  title: z.string().trim().min(5).max(90),
  subtitle: z.string().trim().min(10).max(300),
  primaryCta: z.string().trim().min(2).max(30),
  primaryHref: internalPath.pipe(z.string().min(1)),
  secondaryCta: z.string().trim().min(2).max(30),
  secondaryHref: internalPath.pipe(z.string().min(1)),
});

export async function saveHero(_prev: ActionState, form: FormData): Promise<ActionState> {
  const user = await requireUser('content');
  const p = heroSchema.safeParse(Object.fromEntries(form));
  if (!p.success) return { error: issue(p.error) };
  await prisma.siteSetting.upsert({ where: { key: 'home_hero' }, create: { key: 'home_hero', value: p.data }, update: { value: p.data } });
  await audit(user.id, 'update_home_hero', 'site_setting', 'home_hero', p.data);
  revalidate(CONTENT_PATHS.home);
  return { message: 'Homepage updated.' };
}

const announcementSchema = z.object({
  text: z.string().trim().max(160),
  linkText: z.string().trim().max(30),
  href: internalPath,
  startsOn: z.string().refine((v) => !v || /^\d{4}-\d{2}-\d{2}$/.test(v)),
  endsOn: z.string().refine((v) => !v || /^\d{4}-\d{2}-\d{2}$/.test(v)),
});

export async function saveAnnouncement(_prev: ActionState, form: FormData): Promise<ActionState> {
  const user = await requireUser('content');
  const p = announcementSchema.safeParse(Object.fromEntries(form));
  if (!p.success) return { error: issue(p.error) };
  const enabled = form.get('enabled') === 'on';
  if (enabled && !p.data.text) return { error: 'Write the announcement text.' };
  const value = { enabled, text: p.data.text, linkText: p.data.linkText || undefined, href: p.data.href || undefined, startsOn: p.data.startsOn || undefined, endsOn: p.data.endsOn || undefined };
  await prisma.siteSetting.upsert({ where: { key: 'announcement' }, create: { key: 'announcement', value }, update: { value } });
  await audit(user.id, 'update_announcement', 'site_setting', 'announcement', value);
  revalidatePath('/', 'layout'); // bar shows on every page
  return { message: enabled ? 'Announcement is live (within its dates).' : 'Announcement turned off.' };
}

export async function saveGalleryVideos(_prev: ActionState, form: FormData): Promise<ActionState> {
  const user = await requireUser('content');
  const titles = form.getAll('title').map(String);
  const urls = form.getAll('youtubeUrl').map(String);
  const videos = titles.map((title, i) => ({ title: title.trim(), youtubeUrl: (urls[i] ?? '').trim() })).filter((v) => v.title || v.youtubeUrl);
  for (const v of videos) {
    if (!v.title) return { error: 'Every video needs a title.' };
    if (!/^https:\/\/(www\.)?(youtube\.com\/(watch\?v=|shorts\/)|youtu\.be\/)[\w-]{11}/.test(v.youtubeUrl)) return { error: `"${v.title}": use a YouTube link (youtube.com/watch?v=… or youtu.be/…).` };
  }
  await prisma.siteSetting.upsert({ where: { key: 'gallery_videos' }, create: { key: 'gallery_videos', value: videos }, update: { value: videos } });
  await audit(user.id, 'update_gallery_videos', 'site_setting', 'gallery_videos', { count: videos.length });
  revalidate(CONTENT_PATHS.gallery);
  return { message: videos.length ? `${videos.length} video(s) saved.` : 'Video section hidden (no videos).' };
}
