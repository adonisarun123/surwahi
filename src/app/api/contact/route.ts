import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { query } from '@/lib/db';
import { sendContactFormNotification, sendContactFormConfirmation } from '@/lib/email';

// Validation schema for contact form
const contactFormSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters').max(100),
  email: z.string().email('Invalid email address'),
  phone: z.string().optional(),
  city: z.string().optional(),
  message: z.string().min(10, 'Message must be at least 10 characters').max(2000),
  inquiryType: z.enum([
    'GENERAL',
    'BOOKING',
    'SUSTAINABILITY',
    'ACTIVITIES',
    'PRESS',
    'VANN_VIBE',
  ]),
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
    const result = await query(
      `INSERT INTO contact_submissions 
       (name, email, phone, city, message, inquiry_type, preferred_dates, party_size, status) 
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) 
       RETURNING *`,
      [
        validatedData.name,
        validatedData.email,
        validatedData.phone || null,
        validatedData.city || null,
        validatedData.message,
        validatedData.inquiryType,
        validatedData.preferredDates || null,
        validatedData.partySize || null,
        isSpam ? 'spam' : 'new',
      ]
    );
    const contactForm = result.rows[0] as { id: string };

    // Send email notifications (only if not spam)
    if (!isSpam) {
      try {
        await Promise.all([
          sendContactFormNotification(validatedData),
          sendContactFormConfirmation(validatedData.email, validatedData.name)
        ]);
      } catch (emailError) {
        console.error('Failed to send emails:', emailError);
        // Continue even if email fails - form is saved
      }
    }
    
    return NextResponse.json({
      success: true,
      message: 'Thank you for contacting us! We\'ll get back to you within 24 hours.',
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
    
    const offset = (page - 1) * limit;
    
    const whereClause = status ? 'WHERE status = $1' : '';
    const params = status ? [status] : [];
    
    const [formsResult, totalResult] = await Promise.all([
      query(
        `SELECT * FROM contact_submissions 
         ${whereClause} 
         ORDER BY submitted_at DESC 
         LIMIT $${params.length + 1} OFFSET $${params.length + 2}`,
        [...params, limit, offset]
      ),
      query(
        `SELECT COUNT(*) FROM contact_submissions ${whereClause}`,
        params
      ),
    ]);
    
    const contactForms = formsResult.rows;
    const total = parseInt(totalResult.rows[0].count);
    
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
