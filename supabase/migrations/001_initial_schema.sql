-- Sapana Astrology — initial schema (Epics 1 & 2)
-- Run in Supabase Dashboard → SQL Editor, or via `supabase db push`.

create extension if not exists "pgcrypto";

-- ── Blog ────────────────────────────────────────────────────────────
create table if not exists posts (
  id           uuid primary key default gen_random_uuid(),
  slug         text unique not null,
  title        text not null,
  excerpt      text,
  content      text not null,
  cover_image  text,
  author       text not null default 'Sapana',
  is_published boolean not null default false,
  published_at date,
  created_at   timestamptz not null default now()
);

-- ── Contact requests ────────────────────────────────────────────────
create table if not exists contact_requests (
  id         uuid primary key default gen_random_uuid(),
  name       text not null,
  email      text not null,
  phone      text,
  message    text not null,
  is_read    boolean not null default false,
  created_at timestamptz not null default now()
);

-- ── Consultation types ──────────────────────────────────────────────
create table if not exists consultation_types (
  id               text primary key,            -- slug-style id, e.g. 'palm-reading'
  name             text not null,
  tagline          text,
  description      text,
  duration_minutes int  not null default 30,
  price_inr        numeric(10,2) not null,
  icon             text default 'moon',         -- palm | zodiac | lock | moon
  accent           text default 'bg-cream-100', -- card background class
  is_active        boolean not null default true,
  created_at       timestamptz not null default now()
);

-- ── Availability ────────────────────────────────────────────────────
create table if not exists working_hours (
  id          uuid primary key default gen_random_uuid(),
  day_of_week int  not null check (day_of_week between 0 and 6), -- 0 = Sunday
  start_time  time not null,
  end_time    time not null,
  unique (day_of_week, start_time)
);

create table if not exists blocked_dates (
  id     uuid primary key default gen_random_uuid(),
  date   date unique not null,
  reason text
);

-- ── Bookings ────────────────────────────────────────────────────────
create table if not exists bookings (
  id               uuid primary key default gen_random_uuid(),
  service_id       text references consultation_types(id),
  service_name     text not null,
  duration_minutes int  not null,
  amount_inr       numeric(10,2) not null,
  slot_date        date not null,
  slot_time        time not null,
  customer_name    text not null,
  customer_email   text not null,
  customer_phone   text,
  status           text not null default 'reserved'
                   check (status in ('reserved','confirmed','cancelled','completed')),
  payment_id       text,
  meeting_link     text,
  notes            text,                         -- astrologer's consultation notes (CRM, US-019)
  confirmed_at     timestamptz,
  created_at       timestamptz not null default now()
);

-- one active booking per slot
create unique index if not exists bookings_unique_slot
  on bookings (slot_date, slot_time)
  where status in ('reserved','confirmed');

-- ── Testimonials ────────────────────────────────────────────────────
create table if not exists testimonials (
  id           uuid primary key default gen_random_uuid(),
  name         text not null,
  location     text,
  quote        text not null,
  rating       int  not null default 5 check (rating between 1 and 5),
  is_published boolean not null default true,
  created_at   timestamptz not null default now()
);

-- ── Row Level Security ──────────────────────────────────────────────
-- Public (anon key) may READ published content and availability.
-- All writes go through API routes using the service-role key.

alter table posts              enable row level security;
alter table contact_requests   enable row level security;
alter table consultation_types enable row level security;
alter table working_hours      enable row level security;
alter table blocked_dates      enable row level security;
alter table bookings           enable row level security;
alter table testimonials       enable row level security;

create policy "public read published posts"
  on posts for select using (is_published = true);

create policy "public read active services"
  on consultation_types for select using (is_active = true);

create policy "public read working hours"
  on working_hours for select using (true);

create policy "public read blocked dates"
  on blocked_dates for select using (true);

create policy "public read published testimonials"
  on testimonials for select using (is_published = true);

-- Booked-slot visibility (only date + time leak, via column selection in the app)
create policy "public read bookings"
  on bookings for select using (true);

-- No anon insert/update/delete policies: service-role key bypasses RLS.
