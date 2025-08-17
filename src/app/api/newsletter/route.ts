import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { prisma } from '@/lib/prisma';

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
    const existingSubscription = await prisma.newsletterSubscription.findUnique({
      where: { email: validatedData.email }
    });
    
    if (existingSubscription) {
      if (existingSubscription.isActive) {
        return NextResponse.json({
          success: false,
          message: 'This email is already subscribed to our newsletter.'
        }, { status: 400 });
      } else {
        // Reactivate subscription
        await prisma.newsletterSubscription.update({
          where: { email: validatedData.email },
          data: {
            isActive: true,
            source: validatedData.source,
            preferences: validatedData.preferences,
            updatedAt: new Date()
          }
        });
        
        return NextResponse.json({
          success: true,
          message: 'Welcome back! Your newsletter subscription has been reactivated.'
        });
      }
    }
    
    // Create new subscription
    const subscription = await prisma.newsletterSubscription.create({
      data: {
        email: validatedData.email,
        source: validatedData.source,
        preferences: validatedData.preferences,
        isActive: true
      }
    });

    // In production, you would:
    // 1. Send a confirmation email with double opt-in
    // 2. Add to email marketing service (Mailchimp, ConvertKit, etc.)
    // await sendConfirmationEmail(subscription);
    
    return NextResponse.json({
      success: true,
      message: 'Thank you for subscribing! Please check your email to confirm your subscription.',
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
    await prisma.newsletterSubscription.update({
      where: { email },
      data: { isActive: false, updatedAt: new Date() }
    });
    
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
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '50');
    const isActive = searchParams.get('active') === 'true';
    
    const where = isActive !== undefined ? { isActive } : {};
    
    const [subscriptions, total] = await Promise.all([
      prisma.newsletterSubscription.findMany({
        where,
        orderBy: { createdAt: 'desc' },
        skip: (page - 1) * limit,
        take: limit,
        select: {
          id: true,
          email: true,
          source: true,
          isActive: true,
          createdAt: true,
          updatedAt: true
          // Don't return preferences for privacy
        }
      }),
      prisma.newsletterSubscription.count({ where }),
    ]);
    
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
