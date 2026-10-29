'use server';

import { revalidatePath } from 'next/cache';
import { z } from 'zod';
import { prisma } from '@/lib/prisma';
import { requireUser, audit } from '@/lib/auth/session';
import { ALLOWED_IMAGE_HOSTS, deleteImagekitFile } from '@/lib/media/imagekit';
import { ROOM_PATHS } from '@/lib/rooms-repo';
import { GALLERY_CATEGORIES } from '@/lib/content-repo';
import type { ActionState } from '@/components/admin/ui';

function revalidateMediaUsers(roomSlugs: string[] = []) {
  revalidatePath('/gallery');
  for (const p of ROOM_PATHS) revalidatePath(p);
  for (const s of roomSlugs) revalidatePath(`/stay/${s}`);
  revalidatePath('/admin', 'layout');
}

/** Called by the browser after a successful direct upload to ImageKit. */
export async function registerUpload(file: { url: string; fileId: string; filePath: string; width?: number; height?: number; name: string }) {
  const user = await requireUser('media');
  if (new URL(file.url).hostname !== 'ik.imagekit.io') throw new Error('Unexpected upload host');
  const alt = file.name.replace(/\.[a-z0-9]+$/i, '').replace(/[_-]+/g, ' ').trim();
  const m = await prisma.mediaAsset.create({
    data: { url: file.url, providerFileId: file.fileId, filePath: file.filePath, width: file.width, height: file.height, alt, tags: [], uploadedById: user.id },
  });
  await audit(user.id, 'upload_photo', 'media_asset', m.id, { filePath: file.filePath });
  revalidatePath('/admin/photos');
  return m.id;
}

export async function addByUrl(_prev: ActionState, form: FormData): Promise<ActionState> {
  const user = await requireUser('media');
  const url = String(form.get('url') ?? '').trim();
  const alt = String(form.get('alt') ?? '').trim();
  let host = '';
  try { host = new URL(url).hostname; } catch { /* invalid */ }
  if (!url.startsWith('https://') || !ALLOWED_IMAGE_HOSTS.includes(host)) return { error: `Use an https:// image URL from ${ALLOWED_IMAGE_HOSTS.join(' or ')}.` };
  if (alt.length < 3) return { error: 'Describe the photo (alt text) - it helps SEO and screen readers.' };
  if (await prisma.mediaAsset.findFirst({ where: { url } })) return { error: 'That photo is already in the library.' };
  const m = await prisma.mediaAsset.create({ data: { url, alt, tags: [], uploadedById: user.id } });
  await audit(user.id, 'add_photo_url', 'media_asset', m.id);
  revalidatePath('/admin/photos');
  return { message: 'Added to the library.' };
}

const editSchema = z.object({
  alt: z.string().trim().min(3).max(200),
  caption: z.string().trim().max(300),
  tags: z.string().max(300),
  galleryCategory: z.string().max(60),
  gallerySort: z.coerce.number().int().min(0).max(100000),
});

export async function updateMedia(id: string, _prev: ActionState, form: FormData): Promise<ActionState> {
  const user = await requireUser('media');
  const p = editSchema.safeParse(Object.fromEntries(form));
  if (!p.success) return { error: `Check ${p.error.issues[0]?.path.join('.')}: ${p.error.issues[0]?.message}` };
  const cat = p.data.galleryCategory && GALLERY_CATEGORIES.includes(p.data.galleryCategory) ? p.data.galleryCategory : null;
  const m = await prisma.mediaAsset.update({
    where: { id },
    data: { alt: p.data.alt, caption: p.data.caption || null, tags: p.data.tags.split(',').map((t) => t.trim()).filter(Boolean), galleryCategory: cat, gallerySort: p.data.gallerySort },
    include: { accommodations: { include: { accommodation: { select: { slug: true } } } } },
  });
  await audit(user.id, 'update_photo', 'media_asset', id);
  revalidateMediaUsers(m.accommodations.map((a) => a.accommodation.slug));
  return { message: 'Saved.' };
}

export async function deleteMedia(id: string): Promise<ActionState> {
  const user = await requireUser('media');
  const m = await prisma.mediaAsset.findUnique({ where: { id }, include: { accommodations: { include: { accommodation: { select: { slug: true, name: true } } } } } });
  if (!m) return { error: 'Not found.' };
  if (m.accommodations.length) return { error: `Used by ${m.accommodations.map((a) => a.accommodation.name).join(', ')}. Remove it from the room first.` };
  if (m.providerFileId) {
    try { await deleteImagekitFile(m.providerFileId); } catch (e) { return { error: (e as Error).message }; }
  }
  await prisma.mediaAsset.delete({ where: { id } });
  await audit(user.id, 'delete_photo', 'media_asset', id, { url: m.url });
  revalidateMediaUsers();
  return { message: 'Deleted.' };
}

// ─── Room photos ──────────────────────────────────────────────────────

async function roomSlug(accommodationId: string) {
  return (await prisma.accommodation.findUniqueOrThrow({ where: { id: accommodationId }, select: { slug: true } })).slug;
}

export async function attachToRoom(accommodationId: string, mediaId: string) {
  const user = await requireUser('rooms');
  const max = await prisma.accommodationImage.aggregate({ where: { accommodationId }, _max: { sortOrder: true } });
  await prisma.accommodationImage.upsert({
    where: { accommodationId_mediaId: { accommodationId, mediaId } },
    create: { accommodationId, mediaId, sortOrder: (max._max.sortOrder ?? -1) + 1 },
    update: {},
  });
  await audit(user.id, 'room_add_photo', 'accommodation', accommodationId, { mediaId });
  revalidateMediaUsers([await roomSlug(accommodationId)]);
}

export async function detachFromRoom(accommodationId: string, mediaId: string) {
  const user = await requireUser('rooms');
  await prisma.accommodationImage.delete({ where: { accommodationId_mediaId: { accommodationId, mediaId } } });
  await audit(user.id, 'room_remove_photo', 'accommodation', accommodationId, { mediaId });
  revalidateMediaUsers([await roomSlug(accommodationId)]);
}

/** Moves a photo one place up/down; the first photo is the room's cover image. */
export async function moveRoomPhoto(accommodationId: string, mediaId: string, dir: -1 | 1) {
  await requireUser('rooms');
  const list = await prisma.accommodationImage.findMany({ where: { accommodationId }, orderBy: { sortOrder: 'asc' } });
  const i = list.findIndex((x) => x.mediaId === mediaId);
  const j = i + dir;
  if (i < 0 || j < 0 || j >= list.length) return;
  [list[i], list[j]] = [list[j], list[i]];
  await prisma.$transaction(list.map((x, k) => prisma.accommodationImage.update({ where: { accommodationId_mediaId: { accommodationId, mediaId: x.mediaId } }, data: { sortOrder: k } })));
  revalidateMediaUsers([await roomSlug(accommodationId)]);
}
