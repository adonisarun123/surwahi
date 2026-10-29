import 'server-only';
import { createHmac, randomUUID } from 'node:crypto';

/** Uploads need IMAGEKIT_PUBLIC_KEY + IMAGEKIT_PRIVATE_KEY (ImageKit dashboard → Developer options). */
export function imagekitEnabled() {
  return Boolean(process.env.IMAGEKIT_PUBLIC_KEY && process.env.IMAGEKIT_PRIVATE_KEY);
}

/** Short-lived signature for a direct browser → ImageKit upload. */
export function uploadAuth() {
  const token = randomUUID();
  const expire = Math.floor(Date.now() / 1000) + 10 * 60;
  const signature = createHmac('sha1', process.env.IMAGEKIT_PRIVATE_KEY!).update(token + String(expire)).digest('hex');
  return { token, expire, signature, publicKey: process.env.IMAGEKIT_PUBLIC_KEY! };
}

export async function deleteImagekitFile(fileId: string) {
  if (!imagekitEnabled()) return;
  const auth = Buffer.from(`${process.env.IMAGEKIT_PRIVATE_KEY}:`).toString('base64');
  const res = await fetch(`https://api.imagekit.io/v1/files/${encodeURIComponent(fileId)}`, { method: 'DELETE', headers: { Authorization: `Basic ${auth}` } });
  if (!res.ok && res.status !== 404) throw new Error(`ImageKit delete failed (${res.status})`);
}

/** Hosts next/image is configured to serve (next.config.ts remotePatterns). */
export const ALLOWED_IMAGE_HOSTS = ['ik.imagekit.io', 'surwahi.com'];
