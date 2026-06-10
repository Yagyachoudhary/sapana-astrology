import { createClient } from '@supabase/supabase-js';

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

/** True when Supabase env vars are configured. */
export const isSupabaseConfigured = Boolean(url && anonKey);

/** Browser/SSR client (anon key). Null when not configured — callers fall back to demo data. */
export const supabase = isSupabaseConfigured ? createClient(url, anonKey) : null;

/** Server-only client (service role). Use ONLY in API routes / server actions. */
export function getServiceClient() {
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !serviceKey) return null;
  return createClient(url, serviceKey, { auth: { persistSession: false } });
}
