'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { formatTime } from '@/lib/slots';

export default function ConfirmationPage() {
  const { bookingId } = useParams();
  const [booking, setBooking] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    fetch(`/api/bookings/${bookingId}`)
      .then((r) => r.json())
      .then((d) => (d.booking ? setBooking(d.booking) : setError(d.error || 'Booking not found.')))
      .catch(() => setError('Could not load booking.'));
  }, [bookingId]);

  if (error) return <p className="px-4 py-24 text-center text-sm text-red-600">{error}</p>;
  if (!booking) return <p className="px-4 py-24 text-center text-sm text-cocoa-700">Loading…</p>;

  return (
    <div className="mx-auto max-w-lg px-4 py-16 text-center sm:px-6">
      <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-terracotta-500 text-3xl text-white">✓</div>
      <h1 className="mt-6 text-4xl">Booking confirmed!</h1>
      <p className="mt-3 text-sm text-cocoa-700">
        A confirmation email has been sent to <strong>{booking.customer_email}</strong>
        {booking.customer_phone && <> and a WhatsApp message to <strong>{booking.customer_phone}</strong></>}.
      </p>

      <div className="mt-10 rounded-sm border border-cream-200 p-8 text-left">
        <dl className="space-y-3 text-sm">
          <div className="flex justify-between"><dt className="text-cocoa-700">Booking ID</dt><dd className="font-mono text-xs">{booking.id}</dd></div>
          <div className="flex justify-between"><dt className="text-cocoa-700">Service</dt><dd className="font-medium">{booking.service_name}</dd></div>
          <div className="flex justify-between"><dt className="text-cocoa-700">Date</dt><dd className="font-medium">
            {new Date(`${booking.slot_date}T00:00:00`).toLocaleDateString('en-IN', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}
          </dd></div>
          <div className="flex justify-between"><dt className="text-cocoa-700">Time</dt><dd className="font-medium">{formatTime(booking.slot_time.slice(0, 5))} IST</dd></div>
          <div className="flex justify-between"><dt className="text-cocoa-700">Paid</dt><dd className="font-medium">₹{Number(booking.amount_inr).toLocaleString('en-IN')}</dd></div>
        </dl>

        {booking.meeting_link && (
          <a
            href={booking.meeting_link}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary mt-8 block w-full text-center"
          >
            Join meeting at session time
          </a>
        )}
      </div>

      <Link href="/" className="link-underline mt-8 inline-block">Back to home</Link>
    </div>
  );
}
