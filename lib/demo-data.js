// Demo data used when Supabase is not yet configured.
// Once NEXT_PUBLIC_SUPABASE_URL / ANON_KEY are set, real data is used instead.

export const demoServices = [
  {
    id: 'palm-reading',
    name: 'Palm Reading',
    tagline: 'Find out the fate',
    description:
      'Palmistry is the art of analyzing the physical features of the hands to interpret personality characteristics and predict future happenings. Chiromancy analyses are time-honored.',
    duration_minutes: 30,
    price_inr: 999,
    icon: 'palm',
    accent: 'bg-sand',
  },
  {
    id: 'horoscope',
    name: 'Horoscope Reading',
    tagline: 'Read daily prediction',
    description:
      'Plan your day accordingly and stay away from things that bring negativity. Know precisely what needs to be done today with a personalised horoscope reading.',
    duration_minutes: 45,
    price_inr: 1499,
    icon: 'zodiac',
    accent: 'bg-cream-200',
  },
  {
    id: 'compatibility',
    name: 'Compatibility Analysis',
    tagline: 'Find your soulmate',
    description:
      'A zodiac compatibility reading lets you see how compatible you are with another person. Gain critical insight into the world of zodiac compatibility.',
    duration_minutes: 60,
    price_inr: 1999,
    icon: 'lock',
    accent: 'bg-blush',
  },
  {
    id: 'tarot-session',
    name: 'Tarot Card Reading',
    tagline: 'Know yourself better',
    description:
      'A one-on-one tarot session to gain clarity on love, career and life decisions, guided by intuitive card interpretation refined over years of practice.',
    duration_minutes: 45,
    price_inr: 1299,
    icon: 'moon',
    accent: 'bg-cream-100',
  },
];

export const demoTestimonials = [
  {
    id: 1,
    name: 'Priya Sharma',
    location: 'Jaipur',
    quote:
      'Sapana ji’s reading was astonishingly accurate. Her guidance helped me make a career decision I had been struggling with for months.',
    rating: 5,
  },
  {
    id: 2,
    name: 'Rahul Verma',
    location: 'Mumbai',
    quote:
      'The compatibility analysis before my marriage gave my family so much peace of mind. Warm, patient and deeply insightful.',
    rating: 5,
  },
  {
    id: 3,
    name: 'Ananya Iyer',
    location: 'Bengaluru',
    quote:
      'I joined her tarot session out of curiosity and left with real clarity. She explains everything without jargon or fear-mongering.',
    rating: 5,
  },
];

export const demoPosts = [
  {
    id: 1,
    slug: 'mercury-retrograde-survival-guide',
    title: 'Mercury Retrograde: A Practical Survival Guide',
    excerpt:
      'Mercury retrograde gets blamed for everything from lost keys to broken relationships. Here is what it actually means — and how to use the period to your advantage.',
    cover_image:
      'https://images.unsplash.com/photo-1532968961962-8a0cb3a2d4f5?w=1200&q=80',
    author: 'Sapana',
    published_at: '2026-05-18',
    content: `Mercury retrograde is perhaps the most talked-about astrological event, and also the most misunderstood.\n\nWhen Mercury appears to move backwards in the sky, astrologers traditionally read this as a period where communication, travel and technology become unpredictable. But retrograde is not a curse — it is an invitation to slow down.\n\n**What to do during retrograde**\n\nRe-read messages before sending. Back up important files. Revisit old projects you abandoned — retrograde energy favours the prefix "re": review, reflect, reconnect, repair.\n\n**What not to fear**\n\nSigning contracts is not doomed; it simply asks for extra attention to the fine print. Old friends or partners may resurface — that is a chance for closure, not necessarily reunion.\n\nUsed wisely, these three weeks become a quarterly review the cosmos schedules for you.`,
  },
  {
    id: 2,
    slug: 'beginners-guide-to-tarot',
    title: 'A Beginner’s Guide to Reading Tarot',
    excerpt:
      'You do not need psychic powers to read tarot. You need curiosity, a deck, and a willingness to listen to your own intuition. Start here.',
    cover_image:
      'https://images.unsplash.com/photo-1601024445121-e5b82f020549?w=1200&q=80',
    author: 'Sapana',
    published_at: '2026-04-29',
    content: `The tarot is a mirror, not a crystal ball. Each of the 78 cards holds an archetype — a pattern of human experience you already recognise.\n\n**Start with the Major Arcana**\n\nThe 22 Major Arcana cards tell the Fool's Journey, from innocent beginnings (The Fool) to completion (The World). Learn these first; they carry the deepest themes.\n\n**A simple daily practice**\n\nDraw one card each morning. Before reading any book meaning, look at the image. What do you notice first? That detail is your intuition speaking.\n\n**The three-card spread**\n\nPast, present, future. Or situation, obstacle, advice. Three cards are enough for remarkably deep readings — resist the urge to use big spreads too early.\n\nTarot rewards consistency over talent. Six months of daily draws will teach you more than any masterclass.`,
  },
  {
    id: 3,
    slug: 'understanding-your-birth-chart',
    title: 'Understanding Your Birth Chart: Sun, Moon and Rising',
    excerpt:
      'Your sun sign is just the beginning. The moon and rising signs complete the three pillars of your astrological identity.',
    cover_image:
      'https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?w=1200&q=80',
    author: 'Sapana',
    published_at: '2026-03-12',
    content: `When someone asks "what's your sign?", they mean your sun sign — where the sun was when you were born. But a birth chart is a snapshot of the entire sky.\n\n**The Sun: your core self**\n\nThe sun represents your essential identity, ego and life force. It is who you are becoming over a lifetime.\n\n**The Moon: your inner world**\n\nThe moon governs emotions, instincts and what you need to feel safe. People often feel "more like" their moon sign in private.\n\n**The Rising: your outer mask**\n\nThe ascendant — the sign rising on the eastern horizon at your birth — shapes first impressions and your approach to new situations.\n\nRead together, these three pillars explain why two people with the same sun sign can be utterly different. Your chart is as unique as your fingerprint; the exact minute and city of birth matter.`,
  },
];

// Default weekly availability used by the booking demo (0 = Sunday).
export const demoWorkingHours = [
  { day_of_week: 1, start_time: '10:00', end_time: '18:00' },
  { day_of_week: 2, start_time: '10:00', end_time: '18:00' },
  { day_of_week: 3, start_time: '10:00', end_time: '18:00' },
  { day_of_week: 4, start_time: '10:00', end_time: '18:00' },
  { day_of_week: 5, start_time: '10:00', end_time: '18:00' },
  { day_of_week: 6, start_time: '11:00', end_time: '16:00' },
];

export const siteInfo = {
  name: 'Sapana',
  title: 'Live Palmistry & Horoscope',
  email: 'hello@sapana-astrology.com',
  phone: '+91 98765 43210',
  address: 'Jaipur, Rajasthan, India',
  instagram: 'https://instagram.com/sapana.astrology',
  about:
    'Sapana is a practising astrologer and tarot reader with over a decade of experience in Vedic astrology, palmistry and tarot. She has guided more than 5,000 clients through career moves, relationships and life transitions — blending time-honoured techniques with a warm, practical approach. Because we believe it’s time for us to give a second look on what we already have in our life.',
};
