-- Sapana Astrology — seed data
-- Run after 001_initial_schema.sql

insert into consultation_types (id, name, tagline, description, duration_minutes, price_inr, icon, accent) values
  ('palm-reading', 'Palm Reading', 'Find out the fate',
   'Palmistry is the art of analyzing the physical features of the hands to interpret personality characteristics and predict future happenings. Chiromancy analyses are time-honored.',
   30, 999, 'palm', 'bg-sand'),
  ('horoscope', 'Horoscope Reading', 'Read daily prediction',
   'Plan your day accordingly and stay away from things that bring negativity. Know precisely what needs to be done today with a personalised horoscope reading.',
   45, 1499, 'zodiac', 'bg-cream-200'),
  ('compatibility', 'Compatibility Analysis', 'Find your soulmate',
   'A zodiac compatibility reading lets you see how compatible you are with another person. Gain critical insight into the world of zodiac compatibility.',
   60, 1999, 'lock', 'bg-blush'),
  ('tarot-session', 'Tarot Card Reading', 'Know yourself better',
   'A one-on-one tarot session to gain clarity on love, career and life decisions, guided by intuitive card interpretation refined over years of practice.',
   45, 1299, 'moon', 'bg-cream-100')
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
   'Sapana ji''s reading was astonishingly accurate. Her guidance helped me make a career decision I had been struggling with for months.', 5),
  ('Rahul Verma', 'Mumbai',
   'The compatibility analysis before my marriage gave my family so much peace of mind. Warm, patient and deeply insightful.', 5),
  ('Ananya Iyer', 'Bengaluru',
   'I joined her tarot session out of curiosity and left with real clarity. She explains everything without jargon or fear-mongering.', 5);

insert into posts (slug, title, excerpt, content, cover_image, author, is_published, published_at) values
  ('mercury-retrograde-survival-guide',
   'Mercury Retrograde: A Practical Survival Guide',
   'Mercury retrograde gets blamed for everything from lost keys to broken relationships. Here is what it actually means — and how to use the period to your advantage.',
   E'Mercury retrograde is perhaps the most talked-about astrological event, and also the most misunderstood.\n\nWhen Mercury appears to move backwards in the sky, astrologers traditionally read this as a period where communication, travel and technology become unpredictable. But retrograde is not a curse — it is an invitation to slow down.\n\n**What to do during retrograde**\n\nRe-read messages before sending. Back up important files. Revisit old projects you abandoned — retrograde energy favours the prefix "re": review, reflect, reconnect, repair.\n\n**What not to fear**\n\nSigning contracts is not doomed; it simply asks for extra attention to the fine print.\n\nUsed wisely, these three weeks become a quarterly review the cosmos schedules for you.',
   'https://images.unsplash.com/photo-1532968961962-8a0cb3a2d4f5?w=1200&q=80',
   'Sapana', true, '2026-05-18'),
  ('beginners-guide-to-tarot',
   'A Beginner''s Guide to Reading Tarot',
   'You do not need psychic powers to read tarot. You need curiosity, a deck, and a willingness to listen to your own intuition. Start here.',
   E'The tarot is a mirror, not a crystal ball. Each of the 78 cards holds an archetype — a pattern of human experience you already recognise.\n\n**Start with the Major Arcana**\n\nThe 22 Major Arcana cards tell the Fool''s Journey, from innocent beginnings (The Fool) to completion (The World).\n\n**A simple daily practice**\n\nDraw one card each morning. Before reading any book meaning, look at the image. What do you notice first? That detail is your intuition speaking.\n\nTarot rewards consistency over talent.',
   'https://images.unsplash.com/photo-1601024445121-e5b82f020549?w=1200&q=80',
   'Sapana', true, '2026-04-29'),
  ('understanding-your-birth-chart',
   'Understanding Your Birth Chart: Sun, Moon and Rising',
   'Your sun sign is just the beginning. The moon and rising signs complete the three pillars of your astrological identity.',
   E'When someone asks "what''s your sign?", they mean your sun sign — where the sun was when you were born. But a birth chart is a snapshot of the entire sky.\n\n**The Sun: your core self**\n\nThe sun represents your essential identity, ego and life force.\n\n**The Moon: your inner world**\n\nThe moon governs emotions, instincts and what you need to feel safe.\n\n**The Rising: your outer mask**\n\nThe ascendant shapes first impressions and your approach to new situations.\n\nYour chart is as unique as your fingerprint; the exact minute and city of birth matter.',
   'https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?w=1200&q=80',
   'Sapana', true, '2026-03-12')
on conflict (slug) do nothing;
