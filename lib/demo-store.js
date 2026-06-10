// In-memory booking store used ONLY when Supabase is not configured.
// Lets the full booking flow work in demo mode (data resets on server restart).

const store = globalThis.__demoBookingStore || { bookings: new Map(), seq: 1 };
globalThis.__demoBookingStore = store;

export function demoCreateBooking(data) {
  const id = `demo-${store.seq++}-${Date.now().toString(36)}`;
  const booking = {
    id,
    status: 'reserved',
    created_at: new Date().toISOString(),
    ...data,
  };
  store.bookings.set(id, booking);
  return booking;
}

export function demoGetBooking(id) {
  return store.bookings.get(id) || null;
}

export function demoUpdateBooking(id, patch) {
  const b = store.bookings.get(id);
  if (!b) return null;
  Object.assign(b, patch);
  return b;
}

export function demoBookedTimes(date) {
  return [...store.bookings.values()]
    .filter((b) => b.slot_date === date && ['reserved', 'confirmed'].includes(b.status))
    .map((b) => b.slot_time);
}
