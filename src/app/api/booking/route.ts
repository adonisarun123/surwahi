import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { prisma } from '@/lib/prisma';

// Validation schema for booking
const bookingSchema = z.object({
  guestName: z.string().min(2, 'Guest name must be at least 2 characters').max(100),
  guestEmail: z.string().email('Invalid email address'),
  guestPhone: z.string().min(10, 'Phone number must be at least 10 digits'),
  checkIn: z.string().refine((date) => !isNaN(Date.parse(date)), 'Invalid check-in date'),
  checkOut: z.string().refine((date) => !isNaN(Date.parse(date)), 'Invalid check-out date'),
  adults: z.number().min(1, 'At least 1 adult required').max(8),
  children: z.number().min(0).max(6).default(0),
  roomId: z.string().uuid('Invalid room ID'),
  specialRequests: z.string().max(500).optional(),
  source: z.string().optional().default('website')
}).refine((data) => {
  const checkIn = new Date(data.checkIn);
  const checkOut = new Date(data.checkOut);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  return checkIn >= today && checkOut > checkIn;
}, {
  message: 'Check-out date must be after check-in date and check-in must be today or later',
  path: ['checkOut']
});

// Function to calculate booking price
async function calculateBookingPrice(roomId: string, checkIn: Date, checkOut: Date, adults: number, children: number) {
  const room = await prisma.room.findUnique({
    where: { id: roomId },
    select: { basePrice: true, maxOccupancy: true }
  });
  
  if (!room) {
    throw new Error('Room not found');
  }
  
  if (adults + children > room.maxOccupancy) {
    throw new Error(`Room capacity exceeded. Maximum occupancy: ${room.maxOccupancy}`);
  }
  
  const nights = Math.ceil((checkOut.getTime() - checkIn.getTime()) / (1000 * 60 * 60 * 24));
  
  // Simple pricing logic - in production this would be more complex
  let basePrice = Number(room.basePrice) * nights;
  
  // Add extra charges for additional adults (after 2)
  if (adults > 2) {
    basePrice += (adults - 2) * 1000 * nights; // ₹1000 per extra adult per night
  }
  
  // Children under 5 are free, 5-12 are 50% of adult rate
  const chargeableChildren = children; // Assume all children are 5-12 for simplicity
  basePrice += chargeableChildren * 500 * nights; // ₹500 per child per night
  
  // Add taxes (12% GST)
  const tax = basePrice * 0.12;
  const totalPrice = basePrice + tax;
  
  return {
    basePrice,
    tax,
    totalPrice,
    nights,
    priceBreakdown: {
      roomRate: Number(room.basePrice),
      nights,
      extraAdults: Math.max(0, adults - 2),
      extraAdultRate: 1000,
      children: chargeableChildren,
      childRate: 500,
      taxRate: 0.12
    }
  };
}

// Function to check room availability
async function checkRoomAvailability(roomId: string, checkIn: Date, checkOut: Date) {
  const conflictingBookings = await prisma.booking.findMany({
    where: {
      roomId,
      status: { in: ['PENDING', 'CONFIRMED'] },
      OR: [
        {
          checkIn: { lt: checkOut },
          checkOut: { gt: checkIn }
        }
      ]
    }
  });
  
  return conflictingBookings.length === 0;
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validate the request body
    const validatedData = bookingSchema.parse(body);
    
    const checkIn = new Date(validatedData.checkIn);
    const checkOut = new Date(validatedData.checkOut);
    
    // Check room availability
    const isAvailable = await checkRoomAvailability(validatedData.roomId, checkIn, checkOut);
    
    if (!isAvailable) {
      return NextResponse.json({
        success: false,
        message: 'Sorry, this room is not available for the selected dates. Please choose different dates.'
      }, { status: 400 });
    }
    
    // Calculate pricing
    const pricing = await calculateBookingPrice(
      validatedData.roomId,
      checkIn,
      checkOut,
      validatedData.adults,
      validatedData.children
    );
    
    // Create booking
    const booking = await prisma.booking.create({
      data: {
        guestName: validatedData.guestName,
        guestEmail: validatedData.guestEmail,
        guestPhone: validatedData.guestPhone,
        checkIn,
        checkOut,
        adults: validatedData.adults,
        children: validatedData.children,
        totalPrice: pricing.totalPrice,
        roomId: validatedData.roomId,
        specialRequests: validatedData.specialRequests,
        source: validatedData.source,
        status: 'PENDING'
      },
      include: {
        room: {
          select: {
            name: true,
            description: true
          }
        }
      }
    });

    // In production, you would:
    // 1. Send confirmation email to guest
    // 2. Send notification to hotel staff
    // 3. Integrate with payment gateway
    // 4. Create calendar entries
    // await sendBookingConfirmation(booking);
    // await notifyHotelStaff(booking);
    
    return NextResponse.json({
      success: true,
      message: 'Booking request submitted successfully! We\'ll confirm availability and send you payment details within 2 hours.',
      data: {
        bookingId: booking.id,
        guestName: booking.guestName,
        roomName: booking.room.name,
        checkIn: booking.checkIn,
        checkOut: booking.checkOut,
        totalPrice: booking.totalPrice,
        nights: pricing.nights,
        priceBreakdown: pricing.priceBreakdown
      }
    });

  } catch (error) {
    console.error('Booking submission error:', error);
    
    if (error instanceof z.ZodError) {
      return NextResponse.json({
        success: false,
        message: 'Please check your booking details',
        errors: error.issues
      }, { status: 400 });
    }
    
    if (error instanceof Error) {
      return NextResponse.json({
        success: false,
        message: error.message
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
    const email = searchParams.get('email');
    
    const where: Record<string, unknown> = {};
    if (status) where.status = status as 'PENDING' | 'CONFIRMED' | 'CANCELLED';
    if (email) where.guestEmail = email;
    
    const [bookings, total] = await Promise.all([
      prisma.booking.findMany({
        where,
        include: {
          room: {
            select: {
              name: true,
              description: true,
              images: true
            }
          }
        },
        orderBy: { createdAt: 'desc' },
        skip: (page - 1) * limit,
        take: limit,
      }),
      prisma.booking.count({ where }),
    ]);
    
    return NextResponse.json({
      success: true,
      data: {
        items: bookings,
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
    console.error('Error fetching bookings:', error);
    return NextResponse.json({
      success: false,
      message: 'Failed to fetch bookings'
    }, { status: 500 });
  }
}

// Check availability endpoint
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { roomId, checkIn, checkOut } = body;
    
    if (!roomId || !checkIn || !checkOut) {
      return NextResponse.json({
        success: false,
        message: 'Room ID, check-in and check-out dates are required'
      }, { status: 400 });
    }
    
    const checkInDate = new Date(checkIn);
    const checkOutDate = new Date(checkOut);
    
    const isAvailable = await checkRoomAvailability(roomId, checkInDate, checkOutDate);
    
    return NextResponse.json({
      success: true,
      data: {
        available: isAvailable,
        message: isAvailable ? 'Room is available for selected dates' : 'Room is not available for selected dates'
      }
    });

  } catch (error) {
    console.error('Availability check error:', error);
    return NextResponse.json({
      success: false,
      message: 'Failed to check availability'
    }, { status: 500 });
  }
}
