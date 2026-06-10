import { NextResponse } from 'next/server';
import { getServiceClient } from '@/lib/supabase';
import { demoGetBooking } from '@/lib/demo-store';

export const dynamic = 'force-dynamic';

/** GET /api/bookings/:id → booking details */
export async function GET(_request, { params }) {
  const { id } = params;
  const db = getServiceClient();

  if (db && !String(id).startsWith('demo-')) {
    const { data, error } = await db.from('bookings').select('*').eq('id', id).single();
    if (error || !data) {
      return NextResponse.json({ error: 'Booking not found.' }, { status: 404 });
    }
    return NextResponse.json({ booking: data });
  }

  const booking = demoGetBooking(id);
  if (!booking) {
    return NextResponse.json({ error: 'Booking not found.' }, { status: 404 });
  }
  return NextResponse.json({ booking });
}
