import { NextResponse } from 'next/server';
import { getServiceClient } from '@/lib/supabase';
import { demoWorkingHours } from '@/lib/demo-data';

export const dynamic = 'force-dynamic';

// NOTE: prototype only — add authentication (Supabase Auth) before production.

// Demo fallback store (in-memory, resets on restart)
const demo = globalThis.__demoAvailability || {
  workingHours: demoWorkingHours.map((w, i) => ({ id: `demo-${i}`, ...w })),
  blockedDates: [],
};
globalThis.__demoAvailability = demo;

/** GET → { workingHours, blockedDates } */
export async function GET() {
  const db = getServiceClient();
  if (db) {
    const [{ data: wh }, { data: bd }] = await Promise.all([
      db.from('working_hours').select('*').order('day_of_week'),
      db.from('blocked_dates').select('*').order('date'),
    ]);
    return NextResponse.json({ workingHours: wh || [], blockedDates: bd || [] });
  }
  return NextResponse.json(demo);
}

/**
 * POST { workingHours: [{day_of_week,start_time,end_time}], blockedDates: [{date,reason}] }
 * Replaces both sets.
 */
export async function POST(request) {
  let body;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 });
  }
  const { workingHours = [], blockedDates = [] } = body || {};

  for (const w of workingHours) {
    if (
      typeof w.day_of_week !== 'number' || w.day_of_week < 0 || w.day_of_week > 6 ||
      !/^\d{2}:\d{2}/.test(w.start_time) || !/^\d{2}:\d{2}/.test(w.end_time) ||
      w.start_time >= w.end_time
    ) {
      return NextResponse.json({ error: 'Invalid working hours entry.' }, { status: 400 });
    }
  }
  for (const b of blockedDates) {
    if (!/^\d{4}-\d{2}-\d{2}$/.test(b.date)) {
      return NextResponse.json({ error: 'Invalid blocked date.' }, { status: 400 });
    }
  }

  const db = getServiceClient();
  if (db) {
    await db.from('working_hours').delete().neq('day_of_week', -1);
    if (workingHours.length) {
      const { error } = await db.from('working_hours').insert(
        workingHours.map(({ day_of_week, start_time, end_time }) => ({ day_of_week, start_time, end_time }))
      );
      if (error) return NextResponse.json({ error: error.message }, { status: 500 });
    }
    await db.from('blocked_dates').delete().gte('date', '1900-01-01');
    if (blockedDates.length) {
      const { error } = await db.from('blocked_dates').insert(
        blockedDates.map(({ date, reason }) => ({ date, reason: reason || null }))
      );
      if (error) return NextResponse.json({ error: error.message }, { status: 500 });
    }
    return NextResponse.json({ ok: true });
  }

  demo.workingHours = workingHours.map((w, i) => ({ id: `demo-${i}`, ...w }));
  demo.blockedDates = blockedDates.map((b, i) => ({ id: `demo-b-${i}`, ...b }));
  return NextResponse.json({ ok: true });
}
