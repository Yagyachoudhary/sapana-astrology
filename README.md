# Sapana — Astrology Platform

Website + booking system for astrologer Sapana. Built with Next.js (App Router), Tailwind CSS and Supabase. Deployed on Vercel.

**Current scope (Epics 1 & 2):** personal website with services, about, testimonials and contact form; blog; appointment booking with date/slot selection, mock payment and confirmation; astrologer availability admin.

## Demo mode

The app runs **without any configuration** — when Supabase env vars are missing it serves built-in demo content and keeps bookings in memory. Configure Supabase (below) to switch to real data automatically.

```bash
npm install
npm run dev        # http://localhost:3000
```

## Supabase setup

1. Create a project at [supabase.com](https://supabase.com).
2. In the Dashboard, open **SQL Editor** and run, in order:
   - `supabase/migrations/001_initial_schema.sql`
   - `supabase/seed.sql`
3. Copy `.env.example` to `.env.local` and fill in values from **Project Settings → API**:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY` (server-only; never expose to the browser)
4. Restart the dev server.

## Deploy to Vercel

1. Push this repo to GitHub.
2. Import the repo at [vercel.com/new](https://vercel.com/new) (framework auto-detected).
3. Add the three environment variables from `.env.local` in **Project → Settings → Environment Variables**.
4. Deploy.

## Project structure

```
app/
  page.jsx                     # Homepage (hero, services, about, testimonials, CTA)
  blog/                        # Blog listing + article pages
  contact/                     # Contact form
  booking/                     # Service list → slot picker → payment → confirmation
  admin/availability/          # Astrologer working hours + blocked dates
  api/                         # contact, slots, bookings, admin endpoints
components/                    # Header, Footer, SlotPicker, celestial SVG art
lib/                           # Supabase clients, queries, slot logic, demo data
supabase/                      # Schema migration + seed SQL
```

## Routes

| Route | Purpose |
|---|---|
| `/` | Homepage |
| `/blog`, `/blog/[slug]` | Blog listing and articles |
| `/contact` | Contact form |
| `/booking` | Consultation types (duration, price, description) |
| `/booking/[serviceId]` | Date + time slot picker |
| `/booking/payment/[id]` | Mock payment (Razorpay placeholder) |
| `/booking/confirmation/[id]` | Booking confirmation with meeting link |
| `/admin/availability` | Manage working hours and blocked dates |

## Known prototype limitations

- **Payment is mocked.** `app/api/bookings/[id]/pay/route.js` documents the real Razorpay order + webhook flow to implement.
- **Admin page is unprotected.** Add Supabase Auth before going live.
- **Email/WhatsApp confirmations are logged, not sent.** Wire up Resend/SendGrid and the WhatsApp Business API in `notifyMock()`.
- Reserved slots are not auto-expired; add a cleanup job (e.g. Supabase cron) to release stale `reserved` bookings.

## Roadmap (remaining epics)

Tarot Learning Academy (courses, enrollment, progress), Gemstone Shop (catalog, cart, orders), CRM (client profiles, notes, search), WhatsApp & Email automation (reminders, follow-ups).
