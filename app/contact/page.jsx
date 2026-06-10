'use client';

import { useState } from 'react';
import { siteInfo } from '@/lib/demo-data';

const initial = { name: '', email: '', phone: '', message: '' };

export default function ContactPage() {
  const [form, setForm] = useState(initial);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle'); // idle | sending | success | error

  function validate() {
    const e = {};
    if (!form.name.trim()) e.name = 'Please enter your name.';
    if (!form.email.trim()) e.email = 'Please enter your email.';
    else if (!/^\S+@\S+\.\S+$/.test(form.email)) e.email = 'Please enter a valid email.';
    if (!form.message.trim()) e.message = 'Please enter a message.';
    return e;
  }

  async function handleSubmit(ev) {
    ev.preventDefault();
    const e = validate();
    setErrors(e);
    if (Object.keys(e).length) return;

    setStatus('sending');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error('Request failed');
      setStatus('success');
      setForm(initial);
    } catch {
      setStatus('error');
    }
  }

  const field =
    'mt-1 w-full rounded-sm border border-cream-300 bg-white px-4 py-3 text-sm focus:border-terracotta-500 focus:outline-none focus:ring-1 focus:ring-terracotta-500';

  return (
    <div className="mx-auto grid max-w-6xl gap-12 px-4 py-16 sm:px-6 lg:grid-cols-2">
      <div>
        <p className="eyebrow">Contact</p>
        <h1 className="mt-3 text-4xl sm:text-5xl">Get in touch</h1>
        <p className="mt-5 max-w-md text-sm leading-relaxed text-cocoa-700 sm:text-base">
          Have a question about consultations, courses or gemstones? Send a
          message and Sapana will get back to you within one working day.
        </p>
        <ul className="mt-8 space-y-3 text-sm text-cocoa-800">
          <li><strong>Email:</strong> {siteInfo.email}</li>
          <li><strong>Phone / WhatsApp:</strong> {siteInfo.phone}</li>
          <li><strong>Location:</strong> {siteInfo.address}</li>
        </ul>
      </div>

      <div className="rounded-sm bg-cream-50 p-8">
        {status === 'success' ? (
          <div className="py-12 text-center" role="status">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-terracotta-500 text-2xl text-white">✓</div>
            <h2 className="mt-5 text-2xl">Message sent</h2>
            <p className="mt-2 text-sm text-cocoa-700">
              Thank you for reaching out. Sapana will contact you soon.
            </p>
            <button onClick={() => setStatus('idle')} className="btn-outline mt-8">
              Send another message
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} noValidate>
            <label className="block text-sm font-medium">
              Name *
              <input
                type="text"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className={field}
                placeholder="Your full name"
              />
              {errors.name && <span className="mt-1 block text-xs text-red-600">{errors.name}</span>}
            </label>

            <label className="mt-5 block text-sm font-medium">
              Email *
              <input
                type="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className={field}
                placeholder="you@example.com"
              />
              {errors.email && <span className="mt-1 block text-xs text-red-600">{errors.email}</span>}
            </label>

            <label className="mt-5 block text-sm font-medium">
              Phone (optional)
              <input
                type="tel"
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                className={field}
                placeholder="+91 ..."
              />
            </label>

            <label className="mt-5 block text-sm font-medium">
              Message *
              <textarea
                rows={5}
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                className={field}
                placeholder="How can Sapana help you?"
              />
              {errors.message && <span className="mt-1 block text-xs text-red-600">{errors.message}</span>}
            </label>

            {status === 'error' && (
              <p className="mt-4 text-sm text-red-600" role="alert">
                Something went wrong. Please try again.
              </p>
            )}

            <button type="submit" disabled={status === 'sending'} className="btn-primary mt-7 w-full disabled:opacity-60">
              {status === 'sending' ? 'Sending…' : 'Send Message'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
