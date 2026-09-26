import type { RolePlayScenario, ChatMessage } from '../types/rassa';

const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY || '';

export const NINNY_ROLEPLAY_SCENARIOS: RolePlayScenario[] = [
  {
    id: 'food-stall',
    title: 'Street Food Stall Order',
    location: 'Yaowarat Night Market, Bangkok',
    difficulty: 'Easy',
    description: 'Order your favourite noodles or fried rice, specify your spice tolerance, and ask for the bill.',
    starterPrompt: 'Sawàt-dee khráp/kâ! Welcome to our noodle stall. What would you like to eat today?',
    suggestedPhrases: [
      { thai: 'ขอข้าวผัดไก่หนึ่งจานครับ', roman: 'Khǒr khâo phàt gài nèung jaan khráp', english: 'One plate of chicken fried rice, please.' },
      { thai: 'ไม่เผ็ดนะครับ', roman: 'Mái phèt ná khráp', english: 'Not spicy at all, please.' },
      { thai: 'เก็บเงินด้วยครับ', roman: 'Gèp-ngern dûay khráp', english: 'The bill, please.' },
    ],
  },
  {
    id: 'market-bargain',
    title: 'Polite Bargaining at Chatuchak',
    location: 'Chatuchak Weekend Market, Bangkok',
    difficulty: 'Medium',
    description: 'Ask the price of an elephant shirt or silk souvenir, and ask politely if a discount is possible.',
    starterPrompt: 'Sawàt-dee jâ! Have a look at our shirts. This one is 350 Baht.',
    suggestedPhrases: [
      { thai: 'อันนี้ราคาเท่าไหร่ครับ', roman: 'An née raa-khaa thâo-rài khráp?', english: 'How much is this one?' },
      { thai: 'ลดหน่อยได้ไหมครับ', roman: 'Lót nòi dâi mǎi khráp?', english: 'Could you lower the price a little bit?' },
      { thai: 'ถ้าซื้อสองตัวคิดเท่าไหร่ครับ', roman: 'Thâa séu sǒrng dtua khít thâo-rài khráp?', english: 'If I buy two, how much will you charge?' },
    ],
  },
  {
    id: 'grab-taxi',
    title: 'Directing a Grab Driver',
    location: 'Sukhumvit Road, Bangkok',
    difficulty: 'Easy',
    description: 'Confirm the destination, tell the driver where to turn, or ask to stop here.',
    starterPrompt: 'Sawàt-dee khráp! Heading to Asoke BTS station, right?',
    suggestedPhrases: [
      { thai: 'เลี้ยวซ้ายข้างหน้าครับ', roman: 'Líao sáai khâang-nâa khráp', english: 'Turn left ahead.' },
      { thai: 'ตรงไปเรื่อยๆ ครับ', roman: 'Dtrong bpai rêuay-rêuay khráp', english: 'Go straight on.' },
      { thai: 'จอดตรงนี้ได้เลยครับ', roman: 'Jòrt dtrong née dâi loey khráp', english: 'You can stop right here.' },
    ],
  },
  {
    id: 'seven-eleven',
    title: '7-Eleven Midnight Snack',
    location: 'Local Neighborhood 7-Eleven',
    difficulty: 'Easy',
    description: 'Buy toasties, request them to be heated up, and politely decline a plastic bag.',
    starterPrompt: 'Sawàt-dee khá, 7-Eleven welcomes you! 120 Baht total.',
    suggestedPhrases: [
      { thai: 'เวฟด้วยครับ', roman: 'Wave dûay khráp', english: 'Please microwave this.' },
      { thai: 'ไม่รับถุงครับ', roman: 'Mái ráp thǔng khráp', english: 'No plastic bag for me.' },
      { thai: 'สแกนจ่ายได้ไหมครับ', roman: 'Scan jàai dâi mǎi khráp?', english: 'Can I pay by scanning QR code?' },
    ],
  },
];

const SYSTEM_INSTRUCTION = `
You are Ninny AI, RASSA's signature AI learning companion and personal Thai language tutor, launched from London, United Kingdom.
Your goal is to help English-speaking learners build genuine confidence speaking practical, real-life Thai.

Tone & Style:
- Warm, polite, encouraging, articulate British-English educational tone.
- Clear and structured formatting.

Whenever teaching or correcting Thai, always provide:
1. Thai Script (e.g. ขอข้าวผัดไก่)
2. Romanization with tone markers (e.g. Khǒr khâo phàt gài)
3. Word-by-word breakdown and natural English translation.
4. Polite particle context (Explain when to use "khráp" for males and "kâ/khá" for females).
5. Cultural note or etiquette tip (e.g. street food ordering norms, body language).
6. When relevant, offer a fun modern slang phrase or regional equivalent (Northern, Isan, or Southern) to enrich their learning!

Keep explanations clear, engaging, and directly applicable in real conversations.
`;

export async function askNinnyAI(
  userMessage: string,
  history: ChatMessage[],
  scenario?: RolePlayScenario
): Promise<{ text: string; breakdown?: any }> {
  // If Gemini API Key is provided, call Google Gemini 1.5 Flash
  if (GEMINI_API_KEY) {
    try {
      const recentHistory = (history || []).slice(-4).map((m) => ({
        role: m.sender === 'ninny' ? 'model' : 'user',
        parts: [{ text: m.content }],
      }));

      const contents = [
        ...recentHistory,
        {
          role: 'user',
          parts: [
            {
              text: `${SYSTEM_INSTRUCTION}\n${
                scenario ? `Current Active Scenario: ${scenario.title} (${scenario.description})\n` : ''
              }Learner query: ${userMessage}`,
            },
          ],
        },
      ];

      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ contents }),
        }
      );

      if (response.ok) {
        const data = await response.json();
        const replyText =
          data.candidates?.[0]?.content?.parts?.[0]?.text ||
          'Sorry, I could not generate a response right now.';
        return { text: replyText };
      }
    } catch (e) {
      console.warn('Gemini API call failed, falling back to built-in Ninny AI tutor:', e);
    }
  }

  // Smart Built-in Fallback Engine for instant offline/demo testing
  const lower = userMessage.toLowerCase();

  if (lower.includes('hello') || lower.includes('hi') || lower.includes('sawasdee')) {
    return {
      text: `Sawàt-dee khráp/kâ! Welcome to RASSA. I'm **Ninny AI**, your personal Thai tutor. 

To say hello in Thai:
- If you are male: **"Sa-wàt-dee khráp"** (สวัสดีครับ)
- If you are female: **"Sa-wàt-dee kâ"** (สวัสดีค่ะ)

✨ *Pro Tip:* If you are in Chiang Mai, you can say **"Sa-wàt-dee jâo"** (สวัสดีเจ้า) in the Northern Lanna dialect! What skill or phrase would you like to master today?`,
    };
  }

  if (lower.includes('fried rice') || lower.includes('order') || lower.includes('food') || lower.includes('spicy')) {
    return {
      text: `Splendid! Ordering food is one of the most rewarding skills in Thailand. Here is the natural, polite way to ask for chicken fried rice:

**"Khǒr khâo phàt gài nèung jaan khráp / kâ."**
*(ขอข้าวผัดไก่หนึ่งจานครับ/ค่ะ)*

Breakdown:
- **Khǒr** (ขอ) = May I please have...
- **Khâo phàt** (ข้าวผัด) = Fried rice
- **Gài** (ไก่) = Chicken
- **Nèung jaan** (หนึ่งจาน) = One plate

🌶️ **Controlling Spice:**
- If you want no spice: **"Mái phèt ná khráp/kâ"** (ไม่เผ็ดนะครับ/ค่ะ)
- If you want a little spice: **"Phèt nít-nòi kâ"** (เผ็ดนิดหน่อยค่ะ)
- In Isan, if it's extraordinarily tasty, tell the chef: **"Sàep ee-lěe dêr!"** (แซ่บอีหลีเด้อ)`,
    };
  }

  if (lower.includes('slang') || lower.includes('shot feel') || lower.includes('pang')) {
    return {
      text: `Let's dive into modern Bangkok slang!

1. **"Pang mâak!"** (ปังมาก!)
- *Meaning:* Slaying / Utter perfection.
- *Example:* "Chút née pang mâak!" (This outfit is killing it!)

2. **"Shot feel"** (ช็อตฟีล)
- *Meaning:* A total buzzkill when someone ruins the mood.
- *Example:* "Dohn shot feel loey" (I just got totally vibe-checked/buzzkilled).

3. **"555+"**
- Thai people text "555" because the number 5 is pronounced **"Hâa"**, meaning "hahaha"!`,
    };
  }

  if (lower.includes('regional') || lower.includes('north') || lower.includes('isan') || lower.includes('south')) {
    return {
      text: `Regional Thai dialects add incredible warmth to your travels! Here are the 3 big ones:

🌸 **Northern (คำเมือง):**
- Delicious: **"Lam tàe-tàe"** (ลำแต้ๆ) instead of *A-roi*.
- Female polite ending: **"Jâo"** (เจ้า).

🌶️ **Isan (ภาษาอีสาน):**
- Incredible flavor: **"Sàep ee-lěe"** (แซ่บอีหลี)!
- What are you doing?: **"Hèt nyǎng yòo?"** (เฮ็ดหยังอยู่)

🌊 **Southern (ภาษาใต้):**
- Unbelievably tasty: **"Ròy jang-hûu!"** (หรอยจังฮู้)!
- Can you speak Southern?: **"Lǎeng dtâi dâi mâai?"** (แหลงใต้ได้ม่าย)`,
    };
  }

  // Default thoughtful response
  return {
    text: `That is an excellent practical Thai question!

Here is how you can express that naturally in real life:

1. **Natural Thai:**
"Tham-dâi sabaai mâak khráp / kâ" (ทำได้สบายมากครับ/ค่ะ)
*Meaning:* "You can do this with complete ease!"

💡 **Politeness Note:**
Remember to finish with **khráp** (for men) or **kâ** (for women). Adding a gentle **"ná"** before it softens your sentence, making you sound like a welcoming local!

Would you like to try a role-play practice, test a sentence, or explore slang and regional expressions?`,
  };
}
