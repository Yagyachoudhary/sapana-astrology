// Slot generation helpers shared by the booking UI and API.

/** 'HH:MM' → minutes since midnight */
export function toMinutes(t) {
  const [h, m] = t.split(':').map(Number);
  return h * 60 + m;
}

/** minutes since midnight → 'HH:MM' */
export function toHHMM(min) {
  return `${String(Math.floor(min / 60)).padStart(2, '0')}:${String(min % 60).padStart(2, '0')}`;
}

/** 'HH:MM' → '2:30 PM' for display */
export function formatTime(t) {
  const [h, m] = t.split(':').map(Number);
  const ampm = h >= 12 ? 'PM' : 'AM';
  const hr = h % 12 || 12;
  return `${hr}:${String(m).padStart(2, '0')} ${ampm}`;
}

/** 'YYYY-MM-DD' in local time */
export function toDateString(date) {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}

/**
 * Next `count` bookable dates (skips days with no working hours and blocked dates).
 */
export function getBookableDates(workingHours, blockedDates, count = 14) {
  const activeDays = new Set(workingHours.map((w) => w.day_of_week));
  const blocked = new Set(blockedDates);
  const dates = [];
  const cursor = new Date();
  cursor.setDate(cursor.getDate() + 1); // bookings start tomorrow
  while (dates.length < count && dates.length < 60) {
    const ds = toDateString(cursor);
    if (activeDays.has(cursor.getDay()) && !blocked.has(ds)) {
      dates.push(ds);
    }
    cursor.setDate(cursor.getDate() + 1);
  }
  return dates;
}

/**
 * Generate start times for a date given working hours, service duration and
 * already-booked slot times.
 */
export function getSlotsForDate(dateStr, workingHours, durationMinutes, bookedTimes = []) {
  const day = new Date(`${dateStr}T00:00:00`).getDay();
  const hours = workingHours.filter((w) => w.day_of_week === day);
  const booked = new Set(bookedTimes.map((t) => t.slice(0, 5)));
  const slots = [];
  for (const w of hours) {
    const start = toMinutes(w.start_time.slice(0, 5));
    const end = toMinutes(w.end_time.slice(0, 5));
    for (let t = start; t + durationMinutes <= end; t += Math.max(durationMinutes, 30)) {
      const hhmm = toHHMM(t);
      if (!booked.has(hhmm)) slots.push(hhmm);
    }
  }
  return slots;
}
