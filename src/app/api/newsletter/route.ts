import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { query } from '@/lib/db';
import { sendNewsletterConfirmation } from '@/lib/email';
import { adminListApiUnauthorized } from '@/lib/admin-api-auth';

// Validation schema for newsletter subscription
const newsletterSchema = z.object({
  email: z.string().email('Invalid email address'),
  source: z.string().optional().default('website'),
  preferences: z.object({
    frequency: z.enum(['weekly', 'monthly']).optional().default('monthly'),
    topics: z.array(z.string()).optional().default(['conservation', 'community', 'activities'])
  }).optional()
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validate the request body
    const validatedData = newsletterSchema.parse(body);
    
    // Check if email already exists
    const existingResult = await query(
      'SELECT * FROM newsletter_subscriptions WHERE email = $1',
      [validatedData.email]
    );
    const existingSubscription = existingResult.rows[0];
    
    if (existingSubscription) {
      if (existingSubscription.status === 'active') {
        return NextResponse.json({
          success: false,
          message: 'This email is already subscribed to our newsletter.'
        }, { status: 400 });
      } else {
        // Reactivate subscription
        await query(
          'UPDATE newsletter_subscriptions SET status = $1, source = $2, updated_at = NOW() WHERE email = $3',
          ['active', validatedData.source, validatedData.email]
        );
        
        // Send confirmation email
        await sendNewsletterConfirmation(validatedData.email);
        
        return NextResponse.json({
          success: true,
          message: 'Welcome back! Your newsletter subscription has been reactivated.'
        });
      }
    }
    
    // Create new subscription
    const result = await query(
      'INSERT INTO newsletter_subscriptions (email, source, status) VALUES ($1, $2, $3) RETURNING *',
      [validatedData.email, validatedData.source, 'active']
    );
    const subscription = result.rows[0];

    // Send confirmation email
    await sendNewsletterConfirmation(validatedData.email);
    
    return NextResponse.json({
      success: true,
      message: 'Thanks for subscribing! Check your email for confirmation.',
      data: { id: subscription.id }
    });

  } catch (error) {
    console.error('Newsletter subscription error:', error);
    
    if (error instanceof z.ZodError) {
      return NextResponse.json({
        success: false,
        message: 'Please provide a valid email address',
        errors: error.issues
      }, { status: 400 });
    }
    
    return NextResponse.json({
      success: false,
      message: 'Something went wrong. Please try again later.'
    }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const email = searchParams.get('email');
    
    if (!email) {
      return NextResponse.json({
        success: false,
        message: 'Email address is required'
      }, { status: 400 });
    }
    
    // Deactivate subscription instead of deleting
    await query(
      'UPDATE newsletter_subscriptions SET status = $1, unsubscribed_at = NOW(), updated_at = NOW() WHERE email = $2',
      ['unsubscribed', email]
    );
    
    return NextResponse.json({
      success: true,
      message: 'You have been successfully unsubscribed from our newsletter.'
    });

  } catch (error) {
    console.error('Newsletter unsubscribe error:', error);
    return NextResponse.json({
      success: false,
      message: 'Failed to unsubscribe. Please try again later.'
    }, { status: 500 });
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
