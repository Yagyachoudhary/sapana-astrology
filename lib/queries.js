import { supabase, isSupabaseConfigured } from './supabase';
import {
  demoServices,
  demoTestimonials,
  demoPosts,
  demoWorkingHours,
} from './demo-data';

// Each query falls back to demo data when Supabase isn't configured,
// so the prototype works out of the box.

export async function getServices() {
  if (!isSupabaseConfigured) return demoServices;
  const { data, error } = await supabase
    .from('consultation_types')
    .select('*')
    .eq('is_active', true)
    .order('price_inr');
  if (error || !data?.length) return demoServices;
  return data;
}

export async function getService(id) {
  const services = await getServices();
  return services.find((s) => String(s.id) === String(id)) || null;
}

export async function getTestimonials() {
  if (!isSupabaseConfigured) return demoTestimonials;
  const { data, error } = await supabase
    .from('testimonials')
    .select('*')
    .eq('is_published', true)
    .order('created_at', { ascending: false });
  if (error || !data?.length) return demoTestimonials;
  return data;
}

export async function getPosts() {
  if (!isSupabaseConfigured) return demoPosts;
  const { data, error } = await supabase
    .from('posts')
    .select('id, slug, title, excerpt, cover_image, author, published_at')
    .eq('is_published', true)
    .order('published_at', { ascending: false });
  if (error || !data?.length) return demoPosts;
  return data;
}

export async function getPost(slug) {
  if (isSupabaseConfigured) {
    const { data } = await supabase
      .from('posts')
      .select('*')
      .eq('slug', slug)
      .eq('is_published', true)
      .single();
    if (data) return data;
  }
  return demoPosts.find((p) => p.slug === slug) || null;
}

export async function getWorkingHours() {
  if (!isSupabaseConfigured) return demoWorkingHours;
  const { data, error } = await supabase.from('working_hours').select('*');
  if (error || !data?.length) return demoWorkingHours;
  return data;
}

export async function getBlockedDates() {
  if (!isSupabaseConfigured) return [];
  const { data } = await supabase.from('blocked_dates').select('date');
  return (data || []).map((d) => d.date);
}

/** Bookings already taken for a given date (to hide those slots). */
export async function getBookedSlots(date) {
  if (!isSupabaseConfigured) return [];
  const { data } = await supabase
    .from('bookings')
    .select('slot_time')
    .eq('slot_date', date)
    .in('status', ['reserved', 'confirmed']);
  return (data || []).map((b) => b.slot_time);
}
