import { NextResponse } from 'next/server';
import { getServiceClient } from '@/lib/supabase';
import { getService } from '@/lib/queries';
import { demoCreateBooking } from '@/lib/demo-store';

export const dynamic = 'force-dynamic';

/**
 * POST /api/bookings
 * Creates a booking with status 'reserved' (slot held during payment).
 */
export async function POST(request) {
  let body;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 });
  }

  const { serviceId, slotDate, slotTime, name, email, phone } = body || {};
  if (!serviceId || !slotDate || !slotTime || !name?.trim() || !email?.trim()) {
    return NextResponse.json({ error: 'Missing required fields.' }, { status: 400 });
  }
  if (!/^\S+@\S+\.\S+$/.test(email)) {
    return NextResponse.json({ error: 'Invalid email address.' }, { status: 400 });
  }

  const service = await getService(serviceId);
  if (!service) {
    return NextResponse.json({ error: 'Unknown service.' }, { status: 404 });
  }

  const record = {
    service_id: String(serviceId),
    service_name: service.name,
    duration_minutes: service.duration_minutes,
    amount_inr: service.price_inr,
    slot_date: slotDate,
    slot_time: slotTime,
    customer_name: name.trim(),
    customer_email: email.trim(),
    customer_phone: phone?.trim() || null,
  };

  const db = getServiceClient();
  if (db) {
    // Refuse double-booking
    const { data: clash } = await db
      .from('bookings')
      .select('id')
      .eq('slot_date', slotDate)
      .eq('slot_time', slotTime)
      .in('status', ['reserved', 'confirmed'])
      .limit(1);
    if (clash?.length) {
      return NextResponse.json({ error: 'This slot was just taken. Please pick another.' }, { status: 409 });
    }
    const { data, error } = await db
      .from('bookings')
      .insert({ ...record, status: 'reserved' })
      .select('id')
      .single();
    if (error) {
      console.error('booking insert failed:', error.message);
      return NextResponse.json({ error: 'Could not create booking.' }, { status: 500 });
    }
    return NextResponse.json({ bookingId: data.id });
  }

  // Demo mode
  const booking = demoCreateBooking(record);
  return NextResponse.json({ bookingId: booking.id });
}
