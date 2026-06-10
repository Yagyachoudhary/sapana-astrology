'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { formatTime } from '@/lib/slots';

export default function SlotPicker({ service }) {
  const router = useRouter();
  const [dates, setDates] = useState(null);
  const [date, setDate] = useState(null);
  const [slots, setSlots] = useState(null);
  const [slot, setSlot] = useState(null);
  const [form, setForm] = useState({ name: '', email: '', phone: '' });
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetch(`/api/slots?serviceId=${service.id}`)
      .then((r) => r.json())
      .then((d) => setDates(d.dates || []))
      .catch(() => setDates([]));
  }, [service.id]);

  useEffect(() => {
    if (!date) return;
    setSlots(null);
    setSlot(null);
    fetch(`/api/slots?serviceId=${service.id}&date=${date}`)
      .then((r) => r.json())
      .then((d) => setSlots(d.slots || []))
      .catch(() => setSlots([]));
  }, [date, service.id]);

  async function reserve(e) {
    e.preventDefault();
    setError('');
    if (!form.name.trim() || !form.email.trim()) {
      setError('Please enter your name and email.');
      return;
    }
    if (!/^\S+@\S+\.\S+$/.test(form.email)) {
      setError('Please enter a valid email address.');
      return;
    }
    setSubmitting(true);
    try {
      const res = await fetch('/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          serviceId: service.id,
          slotDate: date,
          slotTime: slot,
          ...form,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Could not reserve the slot.');
      router.push(`/booking/payment/${data.bookingId}`);
    } catch (err) {
      setError(err.message);
      setSubmitting(false);
    }
  }

  const chip = (active) =>
    `rounded-full border px-4 py-2 text-sm transition ${
      active
        ? 'border-terracotta-500 bg-terracotta-500 text-white'
        : 'border-cream-300 bg-white hover:border-terracotta-400'
    }`;

  const field =
    'mt-1 w-full rounded-sm border border-cream-300 bg-white px-4 py-3 text-sm focus:border-terracotta-500 focus:outline-none focus:ring-1 focus:ring-terracotta-500';

  return (
    <div className="mt-12">
      {/* Dates */}
      <h2 className="text-xl">1. Choose a date</h2>
      {!dates ? (
        <p className="mt-4 text-sm text-cocoa-700">Loading available dates…</p>
      ) : dates.length === 0 ? (
        <p className="mt-4 text-sm text-cocoa-700">No dates available right now — please check back soon.</p>
      ) : (
        <div className="mt-4 flex flex-wrap gap-3">
          {dates.map((d) => (
            <button key={d} className={chip(d === date)} onClick={() => setDate(d)}>
              {new Date(`${d}T00:00:00`).toLocaleDateString('en-IN', {
                weekday: 'short', day: 'numeric', month: 'short',
              })}
            </button>
          ))}
        </div>
      )}

      {/* Slots */}
      {date && (
        <>
          <h2 className="mt-10 text-xl">2. Choose a time</h2>
          {!slots ? (
            <p className="mt-4 text-sm text-cocoa-700">Loading slots…</p>
          ) : slots.length === 0 ? (
            <p className="mt-4 text-sm text-cocoa-700">All slots are booked for this date.</p>
          ) : (
            <div className="mt-4 flex flex-wrap gap-3">
              {slots.map((t) => (
                <button key={t} className={chip(t === slot)} onClick={() => setSlot(t)}>
                  {formatTime(t)}
                </button>
              ))}
            </div>
          )}
        </>
      )}

      {/* Details */}
      {slot && (
        <form onSubmit={reserve} className="mt-10 rounded-sm bg-cream-50 p-8">
          <h2 className="text-xl">3. Your details</h2>
          <div className="mt-5 grid gap-5 sm:grid-cols-2">
            <label className="block text-sm font-medium">
              Name *
              <input
                type="text"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className={field}
              />
            </label>
            <label className="block text-sm font-medium">
              Email *
              <input
                type="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className={field}
              />
            </label>
            <label className="block text-sm font-medium sm:col-span-2">
              Phone / WhatsApp (optional)
              <input
                type="tel"
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                className={field}
              />
            </label>
          </div>

          {error && <p className="mt-4 text-sm text-red-600" role="alert">{error}</p>}

          <button type="submit" disabled={submitting} className="btn-primary mt-6 disabled:opacity-60">
            {submitting ? 'Reserving slot…' : 'Reserve & continue to payment'}
          </button>
          <p className="mt-3 text-xs text-cocoa-700">
            Your slot is held while you complete payment.
          </p>
        </form>
      )}
    </div>
  );
}
