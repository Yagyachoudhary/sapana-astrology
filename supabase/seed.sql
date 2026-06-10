-- Sapana Astrology — seed data
-- Run after 001_initial_schema.sql

insert into consultation_types (id, name, tagline, description, duration_minutes, price_inr, icon, accent) values
  ('tarot-reading', 'Tarot Card Reading', 'Know yourself better',
   'A one-on-one session with a certified tarot reader to gain clarity on love, career and life decisions, guided by intuitive card interpretation.',
   45, 1299, 'moon', 'bg-cream-100'),
  ('numerology', 'Numerology Consultation', 'Decode your numbers',
   'Your name and date of birth carry a unique vibration. A certified numerology reading reveals your life path, destiny number and the years that matter most.',
   45, 1499, 'zodiac', 'bg-cream-200'),
  ('psychic-reading', 'Psychic Reading', 'Hear your inner voice',
   'An intuitive psychic session to sense the energies around your question — relationships, career or a crossroads — and bring hidden patterns to light.',
   30, 1199, 'eye', 'bg-blush'),
  ('face-reading', 'Face Reading', 'Find out the fate',
   'Face reading interprets the features of your face to understand personality, strengths and life tendencies — an art refined over centuries.',
   30, 999, 'face', 'bg-sand'),
  ('nadi-reading', 'Nadi Reading', 'Ancient leaf wisdom',
   'Nadi is a time-honored practice of revealing your life story and karmic patterns, offering remedies and direction rooted in ancient Indian tradition.',
   60, 1999, 'palm', 'bg-cream-100'),
  ('life-coaching', 'Life Coaching', 'Heal and grow',
   'A compassionate coaching session combining spiritual insight with practical guidance — to release negativity, set intentions and move forward with positivity.',
   60, 1799, 'lock', 'bg-blush')
on conflict (id) do nothing;

insert into working_hours (day_of_week, start_time, end_time) values
  (1, '10:00', '18:00'),
  (2, '10:00', '18:00'),
  (3, '10:00', '18:00'),
  (4, '10:00', '18:00'),
  (5, '10:00', '18:00'),
  (6, '11:00', '16:00')
on conflict do nothing;

insert into testimonials (name, location, quote, rating) values
  ('Priya Sharma', 'Jaipur',
   'Sapana ji''s tarot reading was astonishingly accurate. Her guidance helped me make a career decision I had been struggling with for months.', 5),
  ('Rahul Verma', 'Mumbai',
   'The numerology consultation gave me so much clarity about my name and business launch date. Warm, patient and deeply insightful.', 5),
  ('Ananya Iyer', 'Bengaluru',
   'I joined her session out of curiosity and left feeling lighter and genuinely positive. She explains everything without jargon or fear-mongering.', 5);

insert into posts (slug, title, excerpt, content, cover_image, author, is_published, published_at) values
  ('life-path-number-explained',
   'Your Life Path Number, Explained',
   'The single most important number in numerology comes from your date of birth. Here is how to calculate it — and what it reveals about your journey.',
   E'In numerology, your Life Path number is the blueprint of your journey — the lessons you came to learn and the strengths you carry.\n\n**How to calculate it**\n\nAdd every digit of your full date of birth and keep reducing until you reach a single digit (or a master number 11, 22 or 33). For example, 14 August 1995 → 1+4+8+1+9+9+5 = 37 → 3+7 = 10 → 1.\n\n**What the numbers mean**\n\nOnes are leaders and initiators. Twos are peacemakers. Threes are creative communicators. Fours build foundations. Fives crave freedom. Sixes nurture. Sevens seek truth. Eights master the material world. Nines serve humanity.\n\n**Master numbers**\n\nIf your total lands on 11, 22 or 33, you carry a master number — higher potential, and higher sensitivity.\n\nYour Life Path is not a cage; it is a compass. Knowing it helps you stop swimming against your own current.',
   'https://images.unsplash.com/photo-1532968961962-8a0cb3a2d4f5?w=1200&q=80',
   'Sapana', true, '2026-05-18'),
  ('beginners-guide-to-tarot',
   'A Beginner''s Guide to Reading Tarot',
   'You do not need psychic powers to read tarot. You need curiosity, a deck, and a willingness to listen to your own intuition. Start here.',
   E'The tarot is a mirror, not a crystal ball. Each of the 78 cards holds an archetype — a pattern of human experience you already recognise.\n\n**Start with the Major Arcana**\n\nThe 22 Major Arcana cards tell the Fool''s Journey, from innocent beginnings (The Fool) to completion (The World).\n\n**A simple daily practice**\n\nDraw one card each morning. Before reading any book meaning, look at the image. What do you notice first? That detail is your intuition speaking.\n\nTarot rewards consistency over talent.',
   'https://images.unsplash.com/photo-1601024445121-e5b82f020549?w=1200&q=80',
   'Sapana', true, '2026-04-29'),
  ('healing-through-positivity',
   'Healing Through Positivity: A Spiritual Practice',
   'True healing begins when we stop feeding our fears. Simple spiritual practices to release negativity and invite light into your daily life.',
   E'Healing is not about pretending pain doesn''t exist. It is about refusing to let pain write your story.\n\n**Begin with gratitude**\n\nEvery morning, before reaching for your phone, name three things you are grateful for. Gratitude is the fastest way to shift your vibration from lack to abundance.\n\n**Guard your energy**\n\nNotice which people, places and habits leave you drained. You do not need to judge them — simply choose how much access they have to you.\n\n**Trust the divine timing**\n\nWhat is meant for you will not pass you by. When we surrender the need to control every outcome, anxiety loosens its grip and faith takes its place.\n\nMaterial things come and go; the peace you build within is the only possession that travels with you.',
   'https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?w=1200&q=80',
   'Sapana', true, '2026-03-12')
on conflict (slug) do nothing;
