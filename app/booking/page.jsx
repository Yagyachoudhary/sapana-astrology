import Link from 'next/link';
import { getServices } from '@/lib/queries';
import { ServiceIcon } from '@/components/CelestialArt';

export const revalidate = 60;

export const metadata = {
  title: 'Book a Consultation — Sapana Astrology',
  description: 'Choose a consultation type and book your session with Sapana.',
};

export default async function BookingPage() {
  const services = await getServices();

  return (
    <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
      <div className="text-center">
        <p className="eyebrow">Step 1 of 3 — choose a service</p>
        <h1 className="mt-3 text-4xl sm:text-5xl">Book a consultation</h1>
        <p className="mx-auto mt-5 max-w-xl text-sm text-cocoa-700 sm:text-base">
          Every session is one-on-one with Sapana, online over video call.
          Pick the reading that fits your question.
        </p>
      </div>

      <div className="mt-14 grid gap-6 md:grid-cols-2">
        {services.map((s) => (
          <div
            key={s.id}
            className="flex flex-col rounded-sm border border-cream-200 p-8 transition hover:shadow-lg sm:flex-row sm:items-center sm:gap-6"
          >
            <ServiceIcon icon={s.icon} className="h-24 w-24 shrink-0 text-cocoa-700" />
            <div className="mt-4 flex-1 sm:mt-0">
              <h2 className="text-2xl">{s.name}</h2>
              <p className="mt-2 text-sm leading-relaxed text-cocoa-700">{s.description}</p>
              <div className="mt-4 flex flex-wrap items-center gap-4">
                <span className="rounded-full bg-cream-100 px-3 py-1 text-xs font-medium">
                  {s.duration_minutes} minutes
                </span>
                <span className="text-lg font-semibold">
                  ₹{Number(s.price_inr).toLocaleString('en-IN')}
                </span>
              </div>
              <Link href={`/booking/${s.id}`} className="btn-primary mt-5 !px-6 !py-2">
                Select & pick a slot
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
