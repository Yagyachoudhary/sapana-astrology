import { NextResponse } from 'next/server';
import { getServiceClient } from '@/lib/supabase';
import { demoGetBooking, demoUpdateBooking } from '@/lib/demo-store';

export const dynamic = 'force-dynamic';

/**
 * POST /api/bookings/:id/pay — MOCK payment.
 * Replace with a real Razorpay order + webhook flow later:
 *   1. Create Razorpay order server-side, return order_id to client
 *   2. Open Razorpay Checkout on client
 *   3. Verify signature in webhook → mark booking 'confirmed'
 */
export async function POST(_request, { params }) {
  const { id } = params;
  const meetingLink = `https://meet.jit.si/sapana-${String(id).slice(0, 12)}`;
  const patch = {
    status: 'confirmed',
    payment_id: `mockpay_${Date.now().toString(36)}`,
    meeting_link: meetingLink,
    confirmed_at: new Date().toISOString(),
  };

  const db = getServiceClient();
  if (db && !String(id).startsWith('demo-')) {
    const { data, error } = await db
      .from('bookings')
      .update(patch)
      .eq('id', id)
      .eq('status', 'reserved')
      .select('*')
      .single();
    if (error || !data) {
      return NextResponse.json({ error: 'Booking not found or already paid.' }, { status: 409 });
    }
    notifyMock(data);
    return NextResponse.json({ booking: data });
  }

  const existing = demoGetBooking(id);
  if (!existing) {
    return NextResponse.json({ error: 'Booking not found.' }, { status: 404 });
  }
  const booking = demoUpdateBooking(id, patch);
  notifyMock(booking);
  return NextResponse.json({ booking });
}

/** Placeholder for email + WhatsApp confirmations (US-007 / US-021). */
function notifyMock(booking) {
  console.log(
    `[notify] email → ${booking.customer_email}: booking confirmed for ${booking.service_name} on ${booking.slot_date} ${booking.slot_time}, link ${booking.meeting_link}`
  );
  if (booking.customer_phone) {
    console.log(`[notify] whatsapp → ${booking.customer_phone}: confirmation sent`);
  }
}
