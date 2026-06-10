// Demo data used when Supabase is not yet configured.
// Once NEXT_PUBLIC_SUPABASE_URL / ANON_KEY are set, real data is used instead.

export const demoServices = [
  {
    id: 'tarot-reading',
    name: 'Tarot Card Reading',
    tagline: 'Know yourself better',
    description:
      'A one-on-one session with a certified tarot reader to gain clarity on love, career and life decisions, guided by intuitive card interpretation.',
    duration_minutes: 45,
    price_inr: 1299,
    icon: 'moon',
    accent: 'bg-cream-100',
  },
  {
    id: 'numerology',
    name: 'Numerology Consultation',
    tagline: 'Decode your numbers',
    description:
      'Your name and date of birth carry a unique vibration. A certified numerology reading reveals your life path, destiny number and the years that matter most.',
    duration_minutes: 45,
    price_inr: 1499,
    icon: 'zodiac',
    accent: 'bg-cream-200',
  },
  {
    id: 'psychic-reading',
    name: 'Psychic Reading',
    tagline: 'Hear your inner voice',
    description:
      'An intuitive psychic session to sense the energies around your question — relationships, career or a crossroads — and bring hidden patterns to light.',
    duration_minutes: 30,
    price_inr: 1199,
    icon: 'eye',
    accent: 'bg-blush',
  },
  {
    id: 'face-reading',
    name: 'Face Reading',
    tagline: 'Find out the fate',
    description:
      'Face reading interprets the features of your face to understand personality, strengths and life tendencies — an art refined over centuries.',
    duration_minutes: 30,
    price_inr: 999,
    icon: 'face',
    accent: 'bg-sand',
  },
  {
    id: 'nadi-reading',
    name: 'Nadi Reading',
    tagline: 'Ancient leaf wisdom',
    description:
      'Nadi is a time-honored practice of revealing your life story and karmic patterns, offering remedies and direction rooted in ancient Indian tradition.',
    duration_minutes: 60,
    price_inr: 1999,
    icon: 'palm',
    accent: 'bg-cream-100',
  },
  {
    id: 'life-coaching',
    name: 'Life Coaching',
    tagline: 'Heal and grow',
    description:
      'A compassionate coaching session combining spiritual insight with practical guidance — to release negativity, set intentions and move forward with positivity.',
    duration_minutes: 60,
    price_inr: 1799,
    icon: 'lock',
    accent: 'bg-blush',
  },
];

export const demoTestimonials = [
  {
    id: 1,
    name: 'Priya Sharma',
    location: 'Jaipur',
    quote:
      'Sapana ji’s tarot reading was astonishingly accurate. Her guidance helped me make a career decision I had been struggling with for months.',
    rating: 5,
  },
  {
    id: 2,
    name: 'Rahul Verma',
    location: 'Mumbai',
    quote:
      'The numerology consultation gave me so much clarity about my name and business launch date. Warm, patient and deeply insightful.',
    rating: 5,
  },
  {
    id: 3,
    name: 'Ananya Iyer',
    location: 'Bengaluru',
    quote:
      'I joined her session out of curiosity and left feeling lighter and genuinely positive. She explains everything without jargon or fear-mongering.',
    rating: 5,
  },
];

export const demoPosts = [
  {
    id: 1,
    slug: 'life-path-number-explained',
    title: 'Your Life Path Number, Explained',
    excerpt:
      'The single most important number in numerology comes from your date of birth. Here is how to calculate it — and what it reveals about your journey.',
    cover_image:
      'https://images.unsplash.com/photo-1532968961962-8a0cb3a2d4f5?w=1200&q=80',
    author: 'Sapana',
    published_at: '2026-05-18',
    content: `In numerology, your Life Path number is the blueprint of your journey — the lessons you came to learn and the strengths you carry.\n\n**How to calculate it**\n\nAdd every digit of your full date of birth and keep reducing until you reach a single digit (or a master number 11, 22 or 33). For example, 14 August 1995 → 1+4+8+1+9+9+5 = 37 → 3+7 = 10 → 1.\n\n**What the numbers mean**\n\nOnes are leaders and initiators. Twos are peacemakers. Threes are creative communicators. Fours build foundations. Fives crave freedom. Sixes nurture. Sevens seek truth. Eights master the material world. Nines serve humanity.\n\n**Master numbers**\n\nIf your total lands on 11, 22 or 33, you carry a master number — higher potential, and higher sensitivity. These souls often feel "different" from childhood.\n\nYour Life Path is not a cage; it is a compass. Knowing it helps you stop swimming against your own current.`,
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
    slug: 'healing-through-positivity',
    title: 'Healing Through Positivity: A Spiritual Practice',
    excerpt:
      'True healing begins when we stop feeding our fears. Simple spiritual practices to release negativity and invite light into your daily life.',
    cover_image:
      'https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?w=1200&q=80',
    author: 'Sapana',
    published_at: '2026-03-12',
    content: `Healing is not about pretending pain doesn't exist. It is about refusing to let pain write your story.\n\n**Begin with gratitude**\n\nEvery morning, before reaching for your phone, name three things you are grateful for. Gratitude is the fastest way to shift your vibration from lack to abundance.\n\n**Guard your energy**\n\nNotice which people, places and habits leave you drained. You do not need to judge them — simply choose how much access they have to you.\n\n**Trust the divine timing**\n\nWhat is meant for you will not pass you by. When we surrender the need to control every outcome, anxiety loosens its grip and faith takes its place.\n\nMaterial things come and go; the peace you build within is the only possession that travels with you. My motive in every reading is the same — to heal, and to leave you more positive than I found you.`,
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
  title: 'Tarot & Numerology',
  email: 'hello@sapana-astrology.com',
  phone: '+91 98765 43210',
  address: 'Jaipur, Rajasthan, India',
  instagram: 'https://instagram.com/sapana.astrology',
  photo: '/sapana.jpg',
  about:
    'I am a certified Tarot card reader and Numerologist. I was very intuitive as a child. I am very hardworking and passionate about my profession. I am a very spiritual person and I believe in God and his miracles — materialistic things are secondary for me. My main motive is to heal people and make them positive. I hope to be compassionate and kind to everyone.',
  skills: ['Numerology', 'Tarot', 'Life Coach', 'Face Reading', 'Psychic', 'Nadi'],
};
