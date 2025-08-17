import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { prisma } from '@/lib/prisma';

// Validation schema for contact form
const contactFormSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters').max(100),
  email: z.string().email('Invalid email address'),
  phone: z.string().optional(),
  city: z.string().optional(),
  message: z.string().min(10, 'Message must be at least 10 characters').max(1000),
  inquiryType: z.enum(['GENERAL', 'BOOKING', 'SUSTAINABILITY', 'ACTIVITIES', 'PRESS']),
  preferredDates: z.string().optional(),
  partySize: z.number().min(1).max(20).optional(),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validate the request body
    const validatedData = contactFormSchema.parse(body);
    
    // Check for spam (simple checks)
    const message = validatedData.message.toLowerCase();
    const spamKeywords = ['casino', 'loan', 'crypto', 'investment', 'winner'];
    const isSpam = spamKeywords.some(keyword => message.includes(keyword));
    
    // Save to database
    const contactForm = await prisma.contactForm.create({
      data: {
        name: validatedData.name,
        email: validatedData.email,
        phone: validatedData.phone,
        city: validatedData.city,
        message: validatedData.message,
        inquiryType: validatedData.inquiryType,
        preferredDates: validatedData.preferredDates,
        partySize: validatedData.partySize,
        status: isSpam ? 'SPAM' : 'NEW',
      },
    });

    // In production, you would send email notifications here
    // await sendContactFormNotification(contactForm);
    
    return NextResponse.json({
      success: true,
      message: 'Thank you for your inquiry. We\'ll get back to you within 24 hours.',
      data: { id: contactForm.id }
    });

  } catch (error) {
    console.error('Contact form submission error:', error);
    
    if (error instanceof z.ZodError) {
      return NextResponse.json({
        success: false,
        message: 'Please check your form data',
        errors: error.issues
      }, { status: 400 });
    }
    
    return NextResponse.json({
      success: false,
      message: 'Something went wrong. Please try again later.'
    }, { status: 500 });
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const status = searchParams.get('status');
    
    const where = status ? { status: status as 'NEW' | 'IN_PROGRESS' | 'RESOLVED' | 'SPAM' } : {};
    
    const [contactForms, total] = await Promise.all([
      prisma.contactForm.findMany({
        where,
        orderBy: { createdAt: 'desc' },
        skip: (page - 1) * limit,
        take: limit,
      }),
      prisma.contactForm.count({ where }),
    ]);
    
    return NextResponse.json({
      success: true,
      data: {
        items: contactForms,
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
    console.error('Error fetching contact forms:', error);
    return NextResponse.json({
      success: false,
      message: 'Failed to fetch contact forms'
    }, { status: 500 });
  }
}
