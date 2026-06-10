'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { formatTime } from '@/lib/slots';

export default function MockPaymentPage() {
  const { bookingId } = useParams();
  const router = useRouter();
  const [booking, setBooking] = useState(null);
  const [error, setError] = useState('');
  const [paying, setPaying] = useState(false);

  useEffect(() => {
    fetch(`/api/bookings/${bookingId}`)
      .then((r) => r.json())
      .then((d) => (d.booking ? setBooking(d.booking) : setError(d.error || 'Booking not found.')))
      .catch(() => setError('Could not load booking.'));
  }, [bookingId]);

  async function pay() {
    setPaying(true);
    setError('');
    try {
      const res = await fetch(`/api/bookings/${bookingId}/pay`, { method: 'POST' });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Payment failed.');
      router.push(`/booking/confirmation/${bookingId}`);
    } catch (err) {
      setError(err.message);
      setPaying(false);
    }
  }

  if (error && !booking) {
    return <p className="px-4 py-24 text-center text-sm text-red-600">{error}</p>;
  }
  if (!booking) {
    return <p className="px-4 py-24 text-center text-sm text-cocoa-700">Loading…</p>;
  }

  return (
    <div className="mx-auto max-w-lg px-4 py-16 sm:px-6">
      <p className="eyebrow text-center">Step 3 of 3 — payment</p>
      <h1 className="mt-3 text-center text-4xl">Complete payment</h1>

      <div className="mt-10 rounded-sm border border-cream-200 p-8">
        <dl className="space-y-3 text-sm">
          <div className="flex justify-between"><dt className="text-cocoa-700">Service</dt><dd className="font-medium">{booking.service_name}</dd></div>
          <div className="flex justify-between"><dt className="text-cocoa-700">Date</dt><dd className="font-medium">
            {new Date(`${booking.slot_date}T00:00:00`).toLocaleDateString('en-IN', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}
          </dd></div>
          <div className="flex justify-between"><dt className="text-cocoa-700">Time</dt><dd className="font-medium">{formatTime(booking.slot_time.slice(0, 5))}</dd></div>
          <div className="flex justify-between"><dt className="text-cocoa-700">Duration</dt><dd className="font-medium">{booking.duration_minutes} minutes</dd></div>
          <div className="flex justify-between border-t border-cream-200 pt-3 text-base"><dt>Total</dt><dd className="font-semibold">₹{Number(booking.amount_inr).toLocaleString('en-IN')}</dd></div>
        </dl>

        <div className="mt-8 rounded-sm bg-cream-100 p-4 text-xs leading-relaxed text-cocoa-700">
          <strong>Demo payment.</strong> This simulates the Razorpay checkout.
          In production this button opens Razorpay and the booking is confirmed
          by a payment webhook.
        </div>

        {error && <p className="mt-4 text-sm text-red-600" role="alert">{error}</p>}

        <button onClick={pay} disabled={paying} className="btn-primary mt-6 w-full disabled:opacity-60">
          {paying ? 'Processing…' : `Pay ₹${Number(booking.amount_inr).toLocaleString('en-IN')} (mock)`}
        </button>
      </div>
    </div>
  );
}
