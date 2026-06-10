import Link from 'next/link';
import { siteInfo } from '@/lib/demo-data';

export default function Footer() {
  return (
    <footer className="border-t border-cream-200 bg-cream-50">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-12 sm:px-6 md:grid-cols-3">
        <div>
          <h3 className="text-xl">Sapana</h3>
          <p className="mt-3 max-w-xs text-sm leading-relaxed text-cocoa-700">
            Live palmistry, horoscope, tarot and compatibility readings —
            guidance rooted in tradition, delivered with warmth.
          </p>
        </div>

        <div>
          <h4 className="text-sm font-semibold uppercase tracking-wide text-cocoa-700">Explore</h4>
          <ul className="mt-3 space-y-2 text-sm">
            <li><Link href="/#services" className="hover:text-terracotta-600">Services</Link></li>
            <li><Link href="/booking" className="hover:text-terracotta-600">Book a Consultation</Link></li>
            <li><Link href="/blog" className="hover:text-terracotta-600">Blog</Link></li>
            <li><Link href="/contact" className="hover:text-terracotta-600">Contact</Link></li>
          </ul>
        </div>

        <div id="contact-info">
          <h4 className="text-sm font-semibold uppercase tracking-wide text-cocoa-700">Contact</h4>
          <ul className="mt-3 space-y-2 text-sm text-cocoa-700">
            <li>{siteInfo.email}</li>
            <li>{siteInfo.phone}</li>
            <li>{siteInfo.address}</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-cream-200 py-4 text-center text-xs text-cocoa-700">
        © {new Date().getFullYear()} Sapana Astrology. All rights reserved.
      </div>
    </footer>
  );
}
