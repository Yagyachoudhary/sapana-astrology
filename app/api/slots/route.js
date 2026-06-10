import { NextResponse } from 'next/server';
import { isSupabaseConfigured } from '@/lib/supabase';
import { getWorkingHours, getBlockedDates, getBookedSlots, getService } from '@/lib/queries';
import { getBookableDates, getSlotsForDate } from '@/lib/slots';
import { demoBookedTimes } from '@/lib/demo-store';

export const dynamic = 'force-dynamic';

/**
 * GET /api/slots?serviceId=...            → { dates: [...] }
 * GET /api/slots?serviceId=...&date=...   → { slots: ['10:00', ...] }
 */
export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const serviceId = searchParams.get('serviceId');
  const date = searchParams.get('date');

  const service = await getService(serviceId);
  if (!service) {
    return NextResponse.json({ error: 'Unknown service' }, { status: 404 });
  }

  const [workingHours, blockedDates] = await Promise.all([
    getWorkingHours(),
    getBlockedDates(),
  ]);

  if (!date) {
    return NextResponse.json({ dates: getBookableDates(workingHours, blockedDates) });
  }

  const booked = isSupabaseConfigured ? await getBookedSlots(date) : demoBookedTimes(date);
  const slots = getSlotsForDate(date, workingHours, service.duration_minutes, booked);
  return NextResponse.json({ slots });
}
