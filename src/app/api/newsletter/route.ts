import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { query } from '@/lib/db';
import { sendNewsletterConfirmation } from '@/lib/email';
import { adminListApiUnauthorized } from '@/lib/admin-api-auth';

import {
  getClientIp,
  isAllowedOrigin,
  isRateLimited,
  isSuspiciousEmail,
  looksLikeBotSubmission,
  verifyUnsubscribeToken,
} from '@/lib/spam-guard';

// Validation schema for newsletter subscription
const newsletterSchema = z.object({
  email: z.string().trim().toLowerCase().max(254).email('Invalid email address'),
  source: z.string().max(40).regex(/^[a-z0-9_-]+$/i).optional().default('website'),
  website: z.string().max(200).optional(), // honeypot
  startedAt: z.union([z.number(), z.string()]).optional(),
});

// Same response whether new, existing or silently dropped: no email enumeration,
// and bots get no signal about which defence caught them.
const OK_RESPONSE = {
  success: true,
  message: 'Thanks for subscribing! Check your email for confirmation.',
};

export async function POST(request: NextRequest) {
  try {
    if (!isAllowedOrigin(request)) {
      return NextResponse.json({ success: false, message: 'Forbidden' }, { status: 403 });
    }

    const ip = getClientIp(request);
    if (isRateLimited(`newsletter:${ip}`, 3, 10 * 60 * 1000)) {
      return NextResponse.json(
        { success: false, message: 'Too many attempts. Please try again later.' },
        { status: 429 }
      );
    }

    const body = await request.json();
    const validatedData = newsletterSchema.parse(body);

    if (looksLikeBotSubmission(validatedData) || isSuspiciousEmail(validatedData.email)) {
      console.warn('Newsletter: dropped suspected bot signup', { ip, email: validatedData.email });
      return NextResponse.json(OK_RESPONSE);
    }

    const existingResult = await query(
      'SELECT status FROM newsletter_subscriptions WHERE email = $1',
      [validatedData.email]
    );
    const existing = existingResult.rows[0];

    if (existing) {
      if (existing.status !== 'active') {
        await query(
          'UPDATE newsletter_subscriptions SET status = $1, source = $2, updated_at = NOW() WHERE email = $3',
          ['active', validatedData.source, validatedData.email]
        );
        await sendNewsletterConfirmation(validatedData.email);
      }
      // Already active: do NOT re-send mail (stops repeat-mailing a victim's inbox)
      return NextResponse.json(OK_RESPONSE);
    }

    await query(
      'INSERT INTO newsletter_subscriptions (email, source, status) VALUES ($1, $2, $3)',
      [validatedData.email, validatedData.source, 'active']
    );
    await sendNewsletterConfirmation(validatedData.email);

    return NextResponse.json(OK_RESPONSE);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { success: false, message: 'Please provide a valid email address' },
        { status: 400 }
      );
    }
    console.error('Newsletter subscription error:', error);
    return NextResponse.json(
      { success: false, message: 'Something went wrong. Please try again later.' },
      { status: 500 }
    );
  }
}

// Unsubscribe requires a signed token (see unsubscribeToken in lib/spam-guard),
// otherwise anyone could unsubscribe any address.
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const email = searchParams.get('email')?.trim().toLowerCase();
    const token = searchParams.get('token');

    if (!email || !verifyUnsubscribeToken(email, token)) {
      return NextResponse.json(
        { success: false, message: 'Invalid or expired unsubscribe link.' },
        { status: 400 }
      );
    }

    await query(
      'UPDATE newsletter_subscriptions SET status = $1, unsubscribed_at = NOW(), updated_at = NOW() WHERE email = $2',
      ['unsubscribed', email]
    );

    return NextResponse.json({
      success: true,
      message: 'You have been successfully unsubscribed from our newsletter.',
    });
  } catch (error) {
    console.error('Newsletter unsubscribe error:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to unsubscribe. Please try again later.' },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  const denied = adminListApiUnauthorized(request);
  if (denied) return denied;

  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '50');
    const status = searchParams.get('active') === 'true' ? 'active' : null;
    
    const offset = (page - 1) * limit;
    
    const whereClause = status ? 'WHERE status = $1' : '';
    const params = status ? [status] : [];
    
    const [subscriptionsResult, totalResult] = await Promise.all([
      query(
        `SELECT id, email, source, status, subscribed_at, created_at, updated_at 
         FROM newsletter_subscriptions 
         ${whereClause} 
         ORDER BY created_at DESC 
         LIMIT $${params.length + 1} OFFSET $${params.length + 2}`,
        [...params, limit, offset]
      ),
      query(
        `SELECT COUNT(*) FROM newsletter_subscriptions ${whereClause}`,
        params
      ),
    ]);
    
    const subscriptions = subscriptionsResult.rows;
    const total = parseInt(totalResult.rows[0].count);
    
    return NextResponse.json({
      success: true,
      data: {
        items: subscriptions,
        pagination: {
          page,
          limit,
          total,
          totalPages: Math.ceil(total / limit),
          hasNext: page * limit < total,
          hasPrev: page > 1,
        }
      }
    });

  } catch (error) {
    console.error('Error fetching newsletter subscriptions:', error);
    return NextResponse.json({
      success: false,
      message: 'Failed to fetch subscriptions'
    }, { status: 500 });
  }
}
