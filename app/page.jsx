import Link from 'next/link';
import { getServices, getTestimonials, getPosts } from '@/lib/queries';
import { siteInfo } from '@/lib/demo-data';
import {
  SunWithMoon,
  SunFace,
  ServiceIcon,
  Sparkles,
} from '@/components/CelestialArt';

export const revalidate = 60;

export default async function HomePage() {
  const [services, testimonials, posts] = await Promise.all([
    getServices(),
    getTestimonials(),
    getPosts(),
  ]);

  return (
    <>
      {/* ── Hero ───────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-cream-100">
        {/* decorative circles */}
        <div className="absolute left-[12%] top-16 h-12 w-12 rounded-full bg-indigo-400/70" aria-hidden="true" />
        <div className="absolute left-[18%] bottom-24 h-16 w-16 rounded-full bg-gold/50" aria-hidden="true" />
        <div className="absolute right-[16%] bottom-32 h-14 w-14 rounded-full bg-rose-300/70" aria-hidden="true" />
        <div className="absolute right-[6%] top-24 h-10 w-10 rounded-full bg-amber-300/60" aria-hidden="true" />

        <SunWithMoon className="pointer-events-none absolute -left-24 top-1/2 hidden w-[420px] -translate-y-1/2 text-cocoa-700/70 lg:block" />
        <SunFace className="pointer-events-none absolute -right-20 top-1/2 hidden w-[440px] -translate-y-1/2 text-cocoa-700/70 lg:block" />
        <Sparkles className="pointer-events-none absolute inset-x-0 top-6 mx-auto w-full max-w-3xl text-cocoa-700/40" />

        <div className="relative mx-auto max-w-3xl px-4 py-24 text-center sm:px-6 lg:py-36">
          <h1 className="text-4xl leading-tight sm:text-5xl lg:text-6xl">
            Find peace of mind and<br className="hidden sm:block" /> know yourself better
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-sm text-cocoa-700 sm:text-base">
            Tarot, numerology, psychic and face readings — intuitive,
            compassionate guidance to heal and bring positivity into your life.
          </p>
          <div className="mt-10">
            <Link href="/booking" className="btn-primary">
              Book Consultation
            </Link>
          </div>
        </div>
      </section>

      {/* ── Services ───────────────────────────────────────── */}
      <section id="services" className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
        <div className="text-center">
          <p className="eyebrow">Choose by intention</p>
          <h2 className="mt-3 text-3xl sm:text-4xl lg:text-5xl">
            Choose a way to know your future
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-sm leading-relaxed text-cocoa-700 sm:text-base">
            From the cards to the numbers in your birth date, every reading is a
            doorway to self-knowledge. Choose the practice that speaks to your
            question — each session is personal, intuitive and judgment-free.
          </p>
        </div>

        <div className="mt-14 grid gap-6 sm:grid-cols-2">
          {services.map((s) => (
            <div
              key={s.id}
              className={`${s.accent || 'bg-cream-100'} group rounded-sm px-8 py-12 text-center transition hover:-translate-y-1 hover:shadow-lg`}
            >
              <ServiceIcon icon={s.icon} className="mx-auto h-28 w-28 text-cocoa-700" />
              <h3 className="mt-6 text-2xl">{s.name}</h3>
              <p className="mx-auto mt-3 max-w-sm text-sm text-cocoa-700">{s.description}</p>
              <p className="mt-4 text-sm font-medium text-cocoa-800">
                {s.duration_minutes} min · ₹{Number(s.price_inr).toLocaleString('en-IN')}
              </p>
              <Link href={`/booking/${s.id}`} className="link-underline mt-5 inline-block">
                {s.tagline || 'Book now'}
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* ── About ──────────────────────────────────────────── */}
      <section id="about" className="bg-cream-50">
        <div className="mx-auto grid max-w-6xl items-center gap-12 px-4 py-20 sm:px-6 lg:grid-cols-2">
          <div>
            <p className="eyebrow">Meet Sapana</p>
            <h2 className="mt-3 text-3xl sm:text-4xl">
              Because we believe it’s time for us to give a second look on what we
              already have in our life
            </h2>
            <p className="mt-6 text-sm leading-relaxed text-cocoa-700 sm:text-base">
              {siteInfo.about}
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              {siteInfo.skills.map((skill) => (
                <span
                  key={skill}
                  className="rounded-full border border-terracotta-400 px-4 py-1.5 text-xs font-medium text-terracotta-600"
                >
                  {skill}
                </span>
              ))}
            </div>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link href="/booking" className="btn-primary">Book Consultation</Link>
              <Link href="/contact" className="btn-outline">Get in Touch</Link>
            </div>
          </div>
          <div className="relative mx-auto w-full max-w-md">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={siteInfo.photo}
              alt="Sapana — certified tarot card reader and numerologist"
              className="w-full rounded-sm object-cover shadow-lg"
            />
          </div>
        </div>
      </section>

      {/* ── Testimonials ───────────────────────────────────── */}
      <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
        <div className="text-center">
          <p className="eyebrow">Kind words</p>
          <h2 className="mt-3 text-3xl sm:text-4xl">What clients say</h2>
        </div>
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {testimonials.map((t) => (
            <figure key={t.id} className="rounded-sm bg-cream-100 p-8">
              <div className="text-gold" aria-label={`${t.rating} star rating`}>
                {'★'.repeat(t.rating || 5)}
              </div>
              <blockquote className="mt-4 text-sm leading-relaxed text-cocoa-800">
                “{t.quote}”
              </blockquote>
              <figcaption className="mt-5 text-sm font-semibold">
                {t.name}
                {t.location && <span className="font-normal text-cocoa-700"> · {t.location}</span>}
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      {/* ── Quote band ─────────────────────────────────────── */}
      <section className="bg-cream-100">
        <div className="mx-auto max-w-3xl px-4 py-16 text-center sm:px-6">
          <p className="font-serif text-2xl leading-relaxed sm:text-3xl">
            “You cannot change your future. But you can change your habits. And
            surely your habits will change your future.”
          </p>
          <p className="mt-4 text-sm text-cocoa-700">— A.P.J. Abdul Kalam</p>
        </div>
      </section>

      {/* ── Latest from blog ───────────────────────────────── */}
      <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
        <div className="flex items-end justify-between">
          <div>
            <p className="eyebrow">From the journal</p>
            <h2 className="mt-3 text-3xl sm:text-4xl">Latest articles</h2>
          </div>
          <Link href="/blog" className="link-underline hidden sm:inline-block">
            View all
          </Link>
        </div>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {posts.slice(0, 3).map((p) => (
            <Link
              key={p.slug}
              href={`/blog/${p.slug}`}
              className="group overflow-hidden rounded-sm border border-cream-200 transition hover:shadow-lg"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={p.cover_image}
                alt=""
                className="h-44 w-full object-cover transition group-hover:scale-105"
              />
              <div className="p-6">
                <p className="text-xs text-cocoa-700">
                  {new Date(p.published_at).toLocaleDateString('en-IN', {
                    day: 'numeric', month: 'long', year: 'numeric',
                  })}
                </p>
                <h3 className="mt-2 text-xl leading-snug group-hover:text-terracotta-600">
                  {p.title}
                </h3>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ── CTA ────────────────────────────────────────────── */}
      <section className="bg-cocoa-800 text-cream-50">
        <div className="mx-auto max-w-3xl px-4 py-16 text-center sm:px-6">
          <h2 className="text-3xl sm:text-4xl">Ready to look at the stars together?</h2>
          <p className="mt-4 text-sm text-cream-200">
            Book a one-on-one session with Sapana — online or in person.
          </p>
          <Link href="/booking" className="btn-primary mt-8">
            Book Consultation
          </Link>
        </div>
      </section>
    </>
  );
}
