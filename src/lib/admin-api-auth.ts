import { timingSafeEqual } from 'node:crypto';
import { NextRequest, NextResponse } from 'next/server';

const MIN_SECRET_LENGTH = 16;

/**
 * Validates `Authorization: Bearer <ADMIN_API_SECRET>` using a timing-safe compare.
 * Set `ADMIN_API_SECRET` in the environment (at least 16 characters).
 */
export function verifyAdminApiBearer(request: NextRequest): boolean {
  const secret = process.env.ADMIN_API_SECRET;
  if (!secret || secret.length < MIN_SECRET_LENGTH) {
    return false;
  }

  const auth = request.headers.get('authorization');
  if (!auth || !auth.startsWith('Bearer ')) {
    return false;
  }

  const token = auth.slice(7);
  try {
    const a = Buffer.from(token, 'utf8');
    const b = Buffer.from(secret, 'utf8');
    if (a.length !== b.length) {
      return false;
    }
    return timingSafeEqual(a, b);
  } catch {
    return false;
  }
}

/**
 * Returns a JSON error response if the request is not allowed to access admin list APIs.
 * Use at the start of GET handlers that return PII or operational data.
 */
export function adminListApiUnauthorized(request: NextRequest): NextResponse | null {
  const secret = process.env.ADMIN_API_SECRET;

  if (!secret || secret.length < MIN_SECRET_LENGTH) {
    return NextResponse.json(
      {
        success: false,
        message:
          'This endpoint is disabled. Set ADMIN_API_SECRET (at least 16 characters) on the server, then call with header Authorization: Bearer <your-secret>.',
      },
      { status: 503 }
    );
  }

  if (!verifyAdminApiBearer(request)) {
    return NextResponse.json(
      { success: false, message: 'Unauthorized' },
      { status: 401 }
    );
  }

  return null;
}
