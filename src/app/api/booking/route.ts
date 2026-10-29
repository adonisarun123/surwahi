import { NextResponse } from 'next/server';

// The old booking endpoint targeted tables that never existed in the database.
// Booking requests are handled by the reservations backend (Phase 2).
export async function POST() {
  return NextResponse.json({ success: false, message: 'Booking requests are temporarily unavailable. Please contact us.' }, { status: 503 });
}

export async function GET() {
  return NextResponse.json({ success: false, message: 'Not available' }, { status: 404 });
}
