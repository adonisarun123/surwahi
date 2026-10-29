import 'server-only';
import { cache } from 'react';
import { prisma } from '@/lib/prisma';
import { legacyBlogPosts, legacyFaqs, legacyGallery } from '@/lib/legacy-content';
import { todayIst } from '@/lib/booking/dates';

// ─── Settings ─────────────────────────────────────────────────────────

export interface HomeHero { title: string; subtitle: string; primaryCta: string; primaryHref: string; secondaryCta: string; secondaryHref: string }
export interface Announcement { enabled: boolean; text: string; linkText?: string; href?: string; startsOn?: string; endsOn?: string }
export interface GalleryVideo { title: string; youtubeUrl: string; thumbnailUrl?: string }

export const SETTING_DEFAULTS = {
  home_hero: {
    title: 'Award-Winning Eco Stay near Kanha National Park',
    subtitle: 'Nestled about 20km from Kanha National Park (Khatia Gate), Surwahi Social Ecoestate invites you to slow down, reconnect with nature, and experience the art of sustainable living.',
    primaryCta: 'Book Your Eco Stay', primaryHref: '/stay',
    secondaryCta: 'Explore the Story', secondaryHref: '/about/our-story',
  } as HomeHero,
  announcement: { enabled: false, text: '' } as Announcement,
  gallery_videos: [] as GalleryVideo[],
};
/** Object-valued settings (merged over defaults so new fields always have a value). */
export type SettingKey = 'home_hero' | 'announcement';

export const getSetting = cache(async <K extends SettingKey>(key: K): Promise<(typeof SETTING_DEFAULTS)[K]> => {
  try {
    const row = await prisma.siteSetting.findUnique({ where: { key } });
    if (row && row.value && typeof row.value === 'object' && !Array.isArray(row.value)) {
      return { ...SETTING_DEFAULTS[key], ...(row.value as object) } as (typeof SETTING_DEFAULTS)[K];
    }
  } catch (e) { console.error('content-repo: settings unavailable', e); }
  return SETTING_DEFAULTS[key];
});

export async function getGalleryVideos(): Promise<GalleryVideo[]> {
  try {
    const row = await prisma.siteSetting.findUnique({ where: { key: 'gallery_videos' } });
    return Array.isArray(row?.value) ? (row!.value as unknown as GalleryVideo[]) : [];
  } catch { return []; }
}

/** Active announcement for today, or null. */
export async function getActiveAnnouncement(): Promise<Announcement | null> {
  const a = await getSetting('announcement');
  if (!a.enabled || !a.text) return null;
  const today = todayIst().toISOString().slice(0, 10);
  if (a.startsOn && today < a.startsOn) return null;
  if (a.endsOn && today > a.endsOn) return null;
  return a;
}

// ─── Blog ─────────────────────────────────────────────────────────────

export interface PublicArticle {
  slug: string; title: string; excerpt: string; content: string; category: string; author: string; authorBio?: string | null;
  coverUrl: string; coverAlt: string; tags: string[]; publishedAt: string; updatedAt: string; readingTime: number;
  seoTitle?: string | null; seoDescription?: string | null;
}

const readingTime = (md: string) => Math.max(1, Math.round(md.split(/\s+/).length / 200));

function fromLegacy(): PublicArticle[] {
  return Object.values(legacyBlogPosts).filter((p) => p.isPublished).map((p) => ({
    slug: p.slug, title: p.title, excerpt: p.excerpt, content: p.content, category: p.category, author: p.author,
    coverUrl: p.featuredImage.url, coverAlt: p.featuredImage.alt, tags: p.tags, publishedAt: p.publishedAt, updatedAt: p.updatedAt,
    readingTime: p.readingTime, seoTitle: p.seoTitle, seoDescription: p.seoDescription,
  }));
}

export const getPublishedArticles = cache(async (): Promise<PublicArticle[]> => {
  try {
    const rows = await prisma.article.findMany({ where: { status: 'PUBLISHED' }, orderBy: { publishedAt: 'desc' } });
    return rows.map((a) => ({
      slug: a.slug, title: a.title, excerpt: a.excerpt, content: a.content, category: a.category, author: a.author, authorBio: a.authorBio,
      coverUrl: a.coverUrl ?? '', coverAlt: a.coverAlt ?? a.title, tags: a.tags,
      publishedAt: (a.publishedAt ?? a.createdAt).toISOString().slice(0, 10), updatedAt: a.updatedAt.toISOString().slice(0, 10),
      readingTime: readingTime(a.content), seoTitle: a.seoTitle, seoDescription: a.seoDescription,
    }));
  } catch (e) {
    console.error('content-repo: articles unavailable, using built-in posts', e);
    return fromLegacy();
  }
});

export async function getArticle(slug: string) {
  return (await getPublishedArticles()).find((a) => a.slug === slug) ?? null;
}

// ─── FAQs ─────────────────────────────────────────────────────────────

export const getFaqs = cache(async (): Promise<{ question: string; answer: string; category: string }[]> => {
  try {
    const rows = await prisma.faq.findMany({ where: { isPublished: true }, orderBy: [{ sortOrder: 'asc' }, { createdAt: 'asc' }] });
    return rows.map(({ question, answer, category }) => ({ question, answer, category }));
  } catch (e) {
    console.error('content-repo: faqs unavailable, using built-in', e);
    return legacyFaqs;
  }
});

// ─── Gallery ──────────────────────────────────────────────────────────

export const GALLERY_CATEGORIES = ['Lodge & Architecture', 'Flora & Fauna', 'Experiences', 'Cuisine'];

export async function getGalleryImages(): Promise<{ src: string; alt: string; category: string }[]> {
  try {
    const rows = await prisma.mediaAsset.findMany({ where: { galleryCategory: { not: null } }, orderBy: [{ gallerySort: 'asc' }, { createdAt: 'asc' }] });
    return rows.map((m) => ({ src: m.url, alt: m.alt, category: m.galleryCategory! }));
  } catch (e) {
    console.error('content-repo: gallery unavailable, using built-in', e);
    return legacyGallery;
  }
}

// ─── Events ───────────────────────────────────────────────────────────

export async function getUpcomingEvents(limit = 6) {
  try {
    return await prisma.event.findMany({ where: { isPublished: true, endDate: { gte: todayIst() } }, orderBy: { startDate: 'asc' }, take: limit });
  } catch { return []; }
}

export const CONTENT_PATHS = { blog: ['/blogs', '/sitemap.xml'], faqs: ['/plan-your-visit/faqs'], gallery: ['/gallery'], home: ['/'], events: ['/', '/workshops'] };
