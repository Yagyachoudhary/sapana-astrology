'use client';

import Link from 'next/link';
import { useState } from 'react';

const nav = [
  { href: '/#services', label: 'Services' },
  { href: '/booking', label: 'Book a Session' },
  { href: '/blog', label: 'Blog' },
  { href: '/#about', label: 'About' },
  { href: '/contact', label: 'Contact' },
];

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-cream-200 bg-cream-50/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6">
        <Link href="/" className="flex items-center gap-3">
          <span className="flex h-10 w-10 items-center justify-center rounded-full border border-cocoa-800">
            {/* moon-in-hand mark */}
            <svg viewBox="0 0 24 24" className="h-5 w-5 stroke-cocoa-800" fill="none" strokeWidth="1.2">
              <path d="M12 3a7 7 0 1 0 7 9 6 6 0 0 1-7-9Z" />
              <circle cx="16.5" cy="7.5" r="0.8" fill="currentColor" stroke="none" />
            </svg>
          </span>
          <span className="text-sm font-medium leading-tight">
            Tarot &<br />Numerology
          </span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm text-cocoa-800 transition hover:text-terracotta-600"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden md:block">
          <Link href="/booking" className="btn-outline !px-5 !py-2">
            Get Prediction
          </Link>
        </div>

        <button
          className="md:hidden"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          <svg viewBox="0 0 24 24" className="h-6 w-6 stroke-cocoa-800" fill="none" strokeWidth="1.5">
            {open ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
          </svg>
        </button>
      </div>

      {open && (
        <nav className="border-t border-cream-200 bg-cream-50 px-6 py-4 md:hidden">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className="block py-2 text-sm text-cocoa-800"
            >
              {item.label}
            </Link>
          ))}
          <Link href="/booking" onClick={() => setOpen(false)} className="btn-primary mt-3 !px-5 !py-2">
            Get Prediction
          </Link>
        </nav>
      )}
    </header>
  );
}
