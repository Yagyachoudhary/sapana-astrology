import { NextResponse } from 'next/server';
import { getServiceClient } from '@/lib/supabase';

export async function POST(request) {
  let body;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 });
  }

  const { name, email, phone, message } = body || {};
  if (!name?.trim() || !email?.trim() || !message?.trim()) {
    return NextResponse.json(
      { error: 'Name, email and message are required.' },
      { status: 400 }
    );
  }
  if (!/^\S+@\S+\.\S+$/.test(email)) {
    return NextResponse.json({ error: 'Invalid email address.' }, { status: 400 });
  }

  const db = getServiceClient();
  if (db) {
    const { error } = await db.from('contact_requests').insert({
      name: name.trim(),
      email: email.trim(),
      phone: phone?.trim() || null,
      message: message.trim(),
    });
    if (error) {
      console.error('contact insert failed:', error.message);
      return NextResponse.json({ error: 'Could not save your message.' }, { status: 500 });
    }
  } else {
    // Demo mode: Supabase not configured yet — accept and log only.
    console.log('[demo] contact request:', { name, email, phone, message });
  }

  return NextResponse.json({ ok: true });
}
