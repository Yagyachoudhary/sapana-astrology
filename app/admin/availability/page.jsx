'use client';

import { useEffect, useState } from 'react';

const DAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

export default function AvailabilityAdminPage() {
  const [hours, setHours] = useState(null); // [{day_of_week,start_time,end_time}]
  const [blocked, setBlocked] = useState([]);
  const [newBlock, setNewBlock] = useState({ date: '', reason: '' });
  const [status, setStatus] = useState('');

  useEffect(() => {
    fetch('/api/admin/availability')
      .then((r) => r.json())
      .then((d) => {
        setHours(
          (d.workingHours || []).map((w) => ({
            ...w,
            start_time: w.start_time.slice(0, 5),
            end_time: w.end_time.slice(0, 5),
          }))
        );
        setBlocked(d.blockedDates || []);
      });
  }, []);

  function dayEntry(day) {
    return hours?.find((h) => h.day_of_week === day);
  }

  function toggleDay(day) {
    const entry = dayEntry(day);
    if (entry) setHours(hours.filter((h) => h.day_of_week !== day));
    else setHours([...hours, { day_of_week: day, start_time: '10:00', end_time: '18:00' }]);
  }

  function updateDay(day, field, value) {
    setHours(hours.map((h) => (h.day_of_week === day ? { ...h, [field]: value } : h)));
  }

  function addBlockedDate() {
    if (!newBlock.date) return;
    if (blocked.some((b) => b.date === newBlock.date)) return;
    setBlocked([...blocked, { ...newBlock }].sort((a, b) => a.date.localeCompare(b.date)));
    setNewBlock({ date: '', reason: '' });
  }

  async function save() {
    setStatus('saving');
    const res = await fetch('/api/admin/availability', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ workingHours: hours, blockedDates: blocked }),
    });
    setStatus(res.ok ? 'saved' : 'error');
    if (res.ok) setTimeout(() => setStatus(''), 2500);
  }

  const field =
    'rounded-sm border border-cream-300 bg-white px-3 py-2 text-sm focus:border-terracotta-500 focus:outline-none';

  if (!hours) return <p className="px-4 py-24 text-center text-sm text-cocoa-700">Loading…</p>;

  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
      <p className="eyebrow">Astrologer admin</p>
      <h1 className="mt-3 text-4xl">Manage availability</h1>
      <p className="mt-3 text-sm text-cocoa-700">
        Clients can only book within these working hours, excluding blocked dates.
      </p>

      {/* Working hours */}
      <section className="mt-10 rounded-sm border border-cream-200 p-6">
        <h2 className="text-2xl">Weekly working hours</h2>
        <div className="mt-5 space-y-3">
          {DAYS.map((label, day) => {
            const entry = dayEntry(day);
            return (
              <div key={day} className="flex flex-wrap items-center gap-3">
                <label className="flex w-32 items-center gap-2 text-sm font-medium">
                  <input type="checkbox" checked={!!entry} onChange={() => toggleDay(day)} className="accent-terracotta-500" />
                  {label}
                </label>
                {entry ? (
                  <>
                    <input type="time" value={entry.start_time} onChange={(e) => updateDay(day, 'start_time', e.target.value)} className={field} />
                    <span className="text-sm text-cocoa-700">to</span>
                    <input type="time" value={entry.end_time} onChange={(e) => updateDay(day, 'end_time', e.target.value)} className={field} />
                  </>
                ) : (
                  <span className="text-sm text-cocoa-700/60">Unavailable</span>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* Blocked dates */}
      <section className="mt-8 rounded-sm border border-cream-200 p-6">
        <h2 className="text-2xl">Blocked dates</h2>
        <div className="mt-5 flex flex-wrap items-end gap-3">
          <label className="block text-sm font-medium">
            Date
            <input type="date" value={newBlock.date} onChange={(e) => setNewBlock({ ...newBlock, date: e.target.value })} className={`${field} mt-1 block`} />
          </label>
          <label className="block flex-1 text-sm font-medium">
            Reason (optional)
            <input type="text" value={newBlock.reason} onChange={(e) => setNewBlock({ ...newBlock, reason: e.target.value })} className={`${field} mt-1 block w-full`} placeholder="Holiday, travel…" />
          </label>
          <button onClick={addBlockedDate} className="btn-outline !px-5 !py-2">Add</button>
        </div>
        {blocked.length > 0 && (
          <ul className="mt-5 space-y-2">
            {blocked.map((b) => (
              <li key={b.date} className="flex items-center justify-between rounded-sm bg-cream-50 px-4 py-2 text-sm">
                <span>
                  {new Date(`${b.date}T00:00:00`).toLocaleDateString('en-IN', { weekday: 'short', day: 'numeric', month: 'long', year: 'numeric' })}
                  {b.reason && <span className="text-cocoa-700"> — {b.reason}</span>}
                </span>
                <button onClick={() => setBlocked(blocked.filter((x) => x.date !== b.date))} className="text-xs text-red-600 hover:underline">
                  Remove
                </button>
              </li>
            ))}
          </ul>
        )}
      </section>

      <div className="mt-8 flex items-center gap-4">
        <button onClick={save} disabled={status === 'saving'} className="btn-primary disabled:opacity-60">
          {status === 'saving' ? 'Saving…' : 'Save changes'}
        </button>
        {status === 'saved' && <span className="text-sm text-green-700">Saved ✓</span>}
        {status === 'error' && <span className="text-sm text-red-600">Could not save. Try again.</span>}
      </div>

      <p className="mt-6 text-xs text-cocoa-700">
        Note: this admin page is unprotected in the prototype. Add Supabase Auth before going live.
      </p>
    </div>
  );
}
