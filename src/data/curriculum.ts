import type { Lesson, CurriculumCategory } from '../types/rassa';

export interface CategoryInfo {
  id: CurriculumCategory;
  name: string;
  tagline: string;
  description: string;
  icon: string;
  accentColor: string;
}

export const CURRICULUM_CATEGORIES: CategoryInfo[] = [
  {
    id: 'foundations',
    name: 'Thai Foundations',
    tagline: 'Sounds, Tones & Script Essentials',
    description: 'Master the 5 tones, vowel lengths, and essential building blocks without fear.',
    icon: 'Sparkles',
    accentColor: '#ff3a1f',
  },
  {
    id: 'conversation',
    name: 'Everyday Conversation',
    tagline: 'Connecting with Real People',
    description: 'Introducing yourself, asking curious questions, and handling natural daily exchanges.',
    icon: 'MessageSquare',
    accentColor: '#0ea5e9',
  },
  {
    id: 'travel',
    name: 'Thai for Travel',
    tagline: 'Airports to Night Markets',
    description: 'From Grab rides and ordering at local food carts to bargaining and unexpected detours.',
    icon: 'Compass',
    accentColor: '#10b981',
  },
  {
    id: 'daily_life',
    name: 'Thai for Daily Life',
    tagline: 'Living like a Local Resident',
    description: '7-Eleven essentials, talking with condo staff, laundry, and polite requests.',
    icon: 'Coffee',
    accentColor: '#f59e0b',
  },
  {
    id: 'culture_politeness',
    name: 'Culture & Politeness',
    tagline: 'Wai, Hierarchy & Nuance',
    description: 'Navigate social etiquette, respect forms, and the crucial usage of khráp and kâ.',
    icon: 'HeartHandshake',
    accentColor: '#8b5cf6',
  },
  {
    id: 'slang',
    name: 'Spoken Thai & Slang',
    tagline: 'Natural Bangkok Chat & Trends',
    description: 'Trendy catchphrases, text messages (555+), emotional particles, and what never to say.',
    icon: 'Flame',
    accentColor: '#ec4899',
  },
  {
    id: 'regional',
    name: 'Introductory Regional Thai',
    tagline: 'North, Isan & South Dialects',
    description: 'Warm local hearts in Chiang Mai, Khon Kaen, or Phuket with authentic regional phrasing.',
    icon: 'MapPin',
    accentColor: '#06b6d4',
  },
];

export const LESSONS_DATABASE: Lesson[] = [
  // 1. Foundations
  {
    id: 'foundations-1',
    categoryId: 'foundations',
    categoryName: 'Thai Foundations',
    title: 'The Magic of 5 Tones & Polite Particles',
    subtitle: 'Why tone matters and how khráp/kâ instantly wins smiles',
    estimatedMinutes: 8,
    level: 'Beginner',
    isFreeTier: true,
    steps: [
      {
        id: 'f1-s1',
        title: 'Polite Greetings & Particles',
        thaiScript: 'สวัสดีครับ / สวัสดีค่ะ',
        romanization: 'Sa-wàt-dee khráp (male) / Sa-wàt-dee kâ (female)',
        naturalEnglish: 'Hello / Good day (polite)',
        toneInfo: 'Mid - Low - Mid (Sa-wat-dee)',
        breakdown: [
          { thai: 'สวัสดี', roman: 'sa-wàt-dee', meaning: 'greeting/hello' },
          { thai: 'ครับ', roman: 'khráp', meaning: 'male polite ending particle (high tone)' },
          { thai: 'ค่ะ', roman: 'kâ', meaning: 'female polite statement particle (falling tone)' },
        ],
        culturalTip:
          'In Thai, polite particles define your warmth. Men finish sentences with "khráp" (often heard naturally as "kháp"), and women use "kâ" for statements and "khá" for questions.',
        politeVariant: {
          male: 'Sa-wàt-dee khráp (สวัสดีครับ)',
          female: 'Sa-wàt-dee kâ (สวัสดีค่ะ)',
        },
      },
      {
        id: 'f1-s2',
        title: 'Asking "How are you?"',
        thaiScript: 'สบายดีไหมครับ / สบายดีไหมคะ',
        romanization: 'Sa-baai dee mǎi khráp / khá?',
        naturalEnglish: 'How are you? / Are you well?',
        toneInfo: 'Mid - Mid - Rising (Sa-baai dee mai)',
        breakdown: [
          { thai: 'สบาย', roman: 'sa-baai', meaning: 'comfortable/at ease' },
          { thai: 'ดี', roman: 'dee', meaning: 'good' },
          { thai: 'ไหม', roman: 'mǎi', meaning: 'question marker (rising tone)' },
        ],
        culturalTip:
          'Often Thais will simply greet with "Gin khao reu yang?" (Have you eaten rice yet?) as a gesture of care instead of "how are you".',
      },
      {
        id: 'f1-s3',
        title: 'Responding Positively',
        thaiScript: 'สบายดีครับ ขอบคุณครับ',
        romanization: 'Sa-baai dee khráp, khòop-khun khráp',
        naturalEnglish: "I'm doing well, thank you.",
        breakdown: [
          { thai: 'ขอบคุณ', roman: 'khòop-khun', meaning: 'thank you (low - mid)' },
        ],
      },
    ],
    quiz: [
      {
        id: 'q-f1-1',
        question: 'Which particle should a female speaker use when making a polite statement in Thai?',
        options: [
          { id: 'opt1', text: 'khráp (ครับ)', isCorrect: false, explanation: 'Used by male speakers.' },
          { id: 'opt2', text: 'kâ (ค่ะ)', isCorrect: true, explanation: 'Correct! "kâ" with falling tone is the standard polite statement ending for women.' },
          { id: 'opt3', text: 'na (นะ)', isCorrect: false, explanation: 'This is a softening particle, not gendered polite.' },
        ],
      },
      {
        id: 'q-f1-2',
        question: 'What does "Sa-baai dee" literally describe?',
        options: [
          { id: 'opt2-1', text: 'To be rich and healthy', isCorrect: false, explanation: 'Not the direct meaning.' },
          { id: 'opt2-2', text: 'Comfortable and good / at ease', isCorrect: true, explanation: 'Correct! "Sa-baai" translates to relaxed, comfortable, or at ease.' },
          { id: 'opt2-3', text: 'Have you arrived yet?', isCorrect: false, explanation: 'That would be "Theung reu yang".' },
        ],
      },
    ],
  },

  // 2. Travel & Street Food (Free Tier showcase)
  {
    id: 'travel-1',
    categoryId: 'travel',
    categoryName: 'Thai for Travel',
    title: 'Ordering Food Like a Bangkokian',
    subtitle: 'From chicken fried rice to dialling down the spice level',
    estimatedMinutes: 10,
    level: 'Beginner',
    isFreeTier: true,
    steps: [
      {
        id: 'tr1-s1',
        title: 'Polite Order Starter',
        thaiScript: 'ขอข้าวผัดไก่หนึ่งจานครับ',
        romanization: 'Khǒr khâo phàt gài nèung jaan khráp',
        naturalEnglish: 'May I please have one plate of chicken fried rice.',
        toneInfo: 'Rising - Falling - Low - Low - Low - Mid - High',
        breakdown: [
          { thai: 'ขอ', roman: 'khǒr', meaning: 'may I request / please give' },
          { thai: 'ข้าวผัด', roman: 'khâo-phàt', meaning: 'fried rice' },
          { thai: 'ไก่', roman: 'gài', meaning: 'chicken' },
          { thai: 'หนึ่ง', roman: 'nèung', meaning: 'one (1)' },
          { thai: 'จาน', roman: 'jaan', meaning: 'plate (classifier)' },
        ],
        culturalTip:
          'Thai grammar places the classifier after the number: [Item] + [Number] + [Classifier] -> Khâo phàt + nèung + jaan.',
      },
      {
        id: 'tr1-s2',
        title: 'Controlling Spice Level',
        thaiScript: 'ไม่เผ็ดนะครับ / เผ็ดนิดหน่อยค่ะ',
        romanization: 'Mái phèt ná khráp / Phèt nít nòi kâ',
        naturalEnglish: 'Not spicy, please / A little bit spicy.',
        breakdown: [
          { thai: 'ไม่', roman: 'mái', meaning: 'not / no' },
          { thai: 'เผ็ด', roman: 'phèt', meaning: 'spicy' },
          { thai: 'นิดหน่อย', roman: 'nít-nòi', meaning: 'a little bit' },
          { thai: 'นะ', roman: 'ná', meaning: 'softener (softens request into friendly tone)' },
        ],
        culturalTip:
          'Street food default in Thailand is genuinely fiery! "Phèt nít nòi" (a little spicy) usually still gets 1-2 bird-eye chilies. If you cannot eat spice at all, emphasize "Mái phèt loey" (not spicy at all).',
      },
      {
        id: 'tr1-s3',
        title: 'Asking for the Bill',
        thaiScript: 'เช็คบิลด้วยครับ / เก็บเงินด้วยค่ะ',
        romanization: 'Check-bill dûay khráp / Gèp-ngern dûay kâ',
        naturalEnglish: 'Could we have the bill, please?',
        breakdown: [
          { thai: 'เช็คบิล', roman: 'check-bill', meaning: 'check bill (widely used loan phrase)' },
          { thai: 'เก็บเงิน', roman: 'gèp-ngern', meaning: 'collect money (traditional Thai)' },
          { thai: 'ด้วย', roman: 'dûay', meaning: 'as well / please include' },
        ],
      },
    ],
    quiz: [
      {
        id: 'q-tr1-1',
        question: 'How do you say "Not spicy please" politely?',
        options: [
          { id: 'tr-o1', text: 'Mái phèt ná khráp/kâ', isCorrect: true, explanation: 'Perfect! "Mái phèt" means not spicy and "ná" makes it a gentle request.' },
          { id: 'tr-o2', text: 'A-roi mak khráp', isCorrect: false, explanation: 'That means "Very delicious!".' },
          { id: 'tr-o3', text: 'Check-bill khráp', isCorrect: false, explanation: 'That asks for the bill.' },
        ],
      },
    ],
  },

  // 3. Spoken Thai & Slang (Requested specifically by user)
  {
    id: 'slang-1',
    categoryId: 'slang',
    categoryName: 'Spoken Thai & Slang',
    title: 'Essential Modern Bangkok Slang & Social Chat',
    subtitle: 'From "Pang Mâak" (stunning) to "Shot Feel" and "555"',
    estimatedMinutes: 12,
    level: 'Elementary',
    isFreeTier: false,
    steps: [
      {
        id: 'sl1-s1',
        title: 'Expressing Pure Excellence: ปังมาก (Pang Mâak)',
        thaiScript: 'ปังมากแม่!',
        romanization: 'Pang mâak mâe!',
        naturalEnglish: 'Slaying so hard! / Utterly fabulous!',
        breakdown: [
          { thai: 'ปัง', roman: 'pang', meaning: 'bang/fabulous/stunning (onomatopoeic success)' },
          { thai: 'มาก', roman: 'mâak', meaning: 'very / so much' },
          { thai: 'แม่', roman: 'mâe', meaning: 'mother (affectionate LGBTQ+/trendy slang like "queen" or "mother")' },
        ],
        culturalTip:
          'Born from Thai LGBTQ+ subculture and now ubiquitous nationwide among Gen Z and millennials. Use it when someone looks amazing or an event goes exceptionally well.',
      },
      {
        id: 'sl1-s2',
        title: 'When Someone Ruins the Vibe: ช็อตฟีล (Shot Feel)',
        thaiScript: 'โดนช็อตฟีลเลย',
        romanization: 'Dohn shot feel loey',
        naturalEnglish: 'Total buzzkill! / Completely killed the mood.',
        breakdown: [
          { thai: 'โดน', roman: 'dohn', meaning: 'to be hit by / suffer' },
          { thai: 'ช็อต', roman: 'shot', meaning: 'short-circuit (from electric shock)' },
          { thai: 'ฟีล', roman: 'feel', meaning: 'feeling / vibe' },
        ],
        culturalTip:
          'A modern hybrid loanword. When you tell a joke and someone responds with dry awkward silence, they just "shot feel" you.',
      },
      {
        id: 'sl1-s3',
        title: 'Thai Texting Code: 555+',
        thaiScript: '55555',
        romanization: 'Hâa hâa hâa hâa hâa',
        naturalEnglish: 'Hahaha / LOL',
        breakdown: [
          { thai: '๕ (5)', roman: 'hâa', meaning: 'The number 5 sounds identical to "Haa" (laughing)' },
        ],
        culturalTip:
          'In Thai social messages (LINE, WhatsApp, Instagram), you will see "555" everywhere. Writing "555+" means laughing hysterically!',
      },
    ],
    quiz: [
      {
        id: 'q-sl-1',
        question: 'Why do Thai people text "555" when laughing?',
        options: [
          { id: 'sl-o1', text: 'It represents five fingers covering a smile', isCorrect: false, explanation: 'Inventive, but not the reason!' },
          { id: 'sl-o2', text: 'The number 5 in Thai is pronounced "hâa"', isCorrect: true, explanation: 'Spot on! 5 = hâa, so 555 sounds like haha!' },
          { id: 'sl-o3', text: 'It stands for an abbreviation in Bangkok dialect', isCorrect: false, explanation: 'Incorrect.' },
        ],
      },
    ],
  },

  // 4. Regional Thai (Requested specifically by user)
  {
    id: 'regional-1',
    categoryId: 'regional',
    categoryName: 'Introductory Regional Thai',
    title: 'Northern, Isan & Southern Thai Local Phrases',
    subtitle: 'Charm locals in Chiang Mai, Udon Thani, or Krabi',
    estimatedMinutes: 15,
    level: 'Elementary',
    isFreeTier: false,
    steps: [
      {
        id: 'rg1-s1',
        title: 'Northern Thai (Lanna / คำเมือง): Sweet & Melodic',
        thaiScript: 'สวัสดีเจ้า / ลำแต้ๆ',
        romanization: 'Sa-wàt-dee Jâo / Lam tàe-tàe',
        naturalEnglish: 'Hello (Northern female polite) / Truly delicious!',
        breakdown: [
          { thai: 'เจ้า', roman: 'jâo', meaning: 'Northern female polite particle (equivalent to kâ)' },
          { thai: 'ลำ', roman: 'lam', meaning: 'delicious (equivalent to central a-roi)' },
          { thai: 'แต้ๆ', roman: 'tàe-tàe', meaning: 'truly/really (equivalent to jing-jing)' },
        ],
        culturalTip:
          'Northern speech is spoken with elongated, singing cadences. Saying "Lam tàe-tàe jâo" at a Khao Soi shop in Chiang Mai will earn immediate warmth from the auntie cooking.',
      },
      {
        id: 'rg1-s2',
        title: 'Isan (Northeastern / ภาษาอีสาน): Hearty & Spirited',
        thaiScript: 'แซ่บอีหลี! / เฮ็ดหยังอยู่',
        romanization: 'Sàep ee-lěe! / Hèt nyǎng yòo?',
        naturalEnglish: 'Extremely tasty! / What are you up to?',
        breakdown: [
          { thai: 'แซ่บ', roman: 'sàep', meaning: 'delicious/spicy-tasty' },
          { thai: 'อีหลี', roman: 'ee-lěe', meaning: 'really/genuinely' },
          { thai: 'เฮ็ด', roman: 'hèt', meaning: 'to do (central: tham)' },
          { thai: 'หยัง', roman: 'nyǎng', meaning: 'what (central: a-rai)' },
        ],
        culturalTip:
          'Isan food (Som Tum, Larb, Sticky rice) is loved across the world. When you eat Som Tum in Bangkok and tell the vendor "Sàep ee-lěe!", they will be delighted because most street vendors originally hail from the Isan region.',
      },
      {
        id: 'rg1-s3',
        title: 'Southern Thai (ภาษาใต้): Rapid & Punchy',
        thaiScript: 'หรอยจังฮู้! / แหลงใต้ได้ม่าย',
        romanization: 'Ròy jang-hûu! / Lǎeng dtâi dâi mâai?',
        naturalEnglish: 'So unbelievably delicious! / Can you speak Southern?',
        breakdown: [
          { thai: 'หรอย', roman: 'ròy', meaning: 'delicious/satisfying' },
          { thai: 'จังฮู้', roman: 'jang-hûu', meaning: 'very much / intensely' },
          { thai: 'แหลง', roman: 'lǎeng', meaning: 'to speak (central: phûut)' },
        ],
        culturalTip:
          'Southern speech is famous for fast contractions and truncated words. If you travel to Phuket, Krabi, or Koh Samui, shouting "Ròy jang-hûu" after a spicy Southern curry is the ultimate compliment.',
      },
    ],
    quiz: [
      {
        id: 'q-rg-1',
        question: 'In Isan, which phrase is famously used to declare that food is delicious?',
        options: [
          { id: 'rg-o1', text: 'Lam tàe-tàe (ลำแต้ๆ)', isCorrect: false, explanation: 'That is Northern (Lanna) speech!' },
          { id: 'rg-o2', text: 'Sàep ee-lěe (แซ่บอีหลี)', isCorrect: true, explanation: 'Yes! "Sàep" = delicious, "ee-lěe" = truly/really in Isan.' },
          { id: 'rg-o3', text: 'Ròy jang-hûu (หรอยจังฮู้)', isCorrect: false, explanation: 'That is Southern Thai!' },
        ],
      },
    ],
  },

  // 5. Daily Life
  {
    id: 'daily-1',
    categoryId: 'daily_life',
    categoryName: 'Thai for Daily Life',
    title: 'Surviving 7-Eleven & Neighborhood Errands',
    subtitle: 'Bags, warm-ups, condiments, and payment apps',
    estimatedMinutes: 9,
    level: 'Beginner',
    isFreeTier: false,
    steps: [
      {
        id: 'dl1-s1',
        title: 'Heating up meals at the counter',
        thaiScript: 'เวฟด้วยครับ',
        romanization: 'Wave dûay khráp',
        naturalEnglish: 'Please microwave / heat this up for me.',
        breakdown: [
          { thai: 'เวฟ', roman: 'wave', meaning: 'microwave (short for microwave)' },
          { thai: 'ด้วย', roman: 'dûay', meaning: 'please include' },
        ],
        culturalTip:
          'Staff will usually ask: "Wèp mái khá?" (Do you want this microwaved?) You can simply reply "Wèp khráp" or "Mái wèp khráp".',
      },
      {
        id: 'dl1-s2',
        title: 'Declining a plastic bag',
        thaiScript: 'ไม่รับถุงครับ ขอบคุณครับ',
        romanization: 'Mái ráp thǔng khráp, khòop-khun khráp',
        naturalEnglish: 'No plastic bag for me, thank you.',
        breakdown: [
          { thai: 'ไม่รับ', roman: 'mái ráp', meaning: 'not accept' },
          { thai: 'ถุง', roman: 'thǔng', meaning: 'bag' },
        ],
      },
    ],
    quiz: [
      {
        id: 'q-dl-1',
        question: 'What does "Mái ráp thǔng" mean at the counter?',
        options: [
          { id: 'dl-o1', text: 'I don’t want to pay now', isCorrect: false, explanation: 'Not correct.' },
          { id: 'dl-o2', text: 'I do not need a plastic bag', isCorrect: true, explanation: 'Correct! Great for the environment too.' },
          { id: 'dl-o3', text: 'Warm it up extra hot', isCorrect: false, explanation: 'Not correct.' },
        ],
      },
    ],
  },

  // 6. Culture & Politeness
  {
    id: 'culture-1',
    categoryId: 'culture_politeness',
    categoryName: 'Culture & Politeness',
    title: 'Mastering the Wai & Social Etiquette',
    subtitle: 'Chest, nose, or forehead? When to initiate and when not to Wai',
    estimatedMinutes: 11,
    level: 'Beginner',
    isFreeTier: false,
    steps: [
      {
        id: 'cp1-s1',
        title: 'The Wai Levels',
        thaiScript: 'การไหว้',
        romanization: 'Gaan Wâi',
        naturalEnglish: 'The traditional Thai gesture of respect and greeting',
        breakdown: [
          { thai: 'ระดับอก', roman: 'chest level', meaning: 'For peers, colleagues, and casual respect' },
          { thai: 'ระดับจมูก', roman: 'nose level (thumbs at nose tip)', meaning: 'For elders, teachers, parents, and respected superiors' },
          { thai: 'ระดับหว่างคิ้ว', roman: 'eyebrow level', meaning: 'For monks, royalty, and sacred shrines' },
        ],
        culturalTip:
          'Rule of thumb: You do not need to Wai service staff (e.g. hotel bellboys, taxi drivers) or younger people first; a warm smile and "khòop-khun khráp/kâ" is considered respectful and socially appropriate.',
      },
    ],
    quiz: [
      {
        id: 'q-cp-1',
        question: 'Who should your thumbs reach the tip of your nose for when performing a Wai?',
        options: [
          { id: 'cp-o1', text: 'Peers of your exact age', isCorrect: false, explanation: 'Peers use chest level.' },
          { id: 'cp-o2', text: 'Elders, parents, and respected teachers', isCorrect: true, explanation: 'Correct! Thumbs touch the tip of the nose with a gentle bow of the head.' },
          { id: 'cp-o3', text: 'Younger siblings', isCorrect: false, explanation: 'You do not wai younger people first.' },
        ],
      },
    ],
  },
];
