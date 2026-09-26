import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { User, Send, Sparkles, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

gsap.registerPlugin(ScrollTrigger);

interface Message {
  id: number;
  type: 'ai' | 'user';
  text: string;
  thai?: string;
}

const initialMessages: Message[] = [
  {
    id: 1,
    type: 'ai',
    text: "Sawàt-dee khráp/kâ! I'm Ninny AI, your personal Thai tutor from London. What real-life situation would you like to master today?",
    thai: 'สวัสดีครับ/ค่ะ!',
  },
  {
    id: 2,
    type: 'user',
    text: 'I want to order chicken fried rice politely at a local shop.',
  },
  {
    id: 3,
    type: 'ai',
    text: `You can say:

“Khǒr khâo phàt gài nèung jaan khráp/kâ.”
(ขอข้าวผัดไก่หนึ่งจานครับ/ค่ะ)

If you would like it not spicy, add:
“Mái phèt ná khráp/kâ.” (ไม่เผ็ดนะครับ/ค่ะ)`,
    thai: 'Chicken Fried Rice Order',
  },
  {
    id: 4,
    type: 'user',
    text: 'And how would an Isan person say it was delicious?',
  },
  {
    id: 5,
    type: 'ai',
    text: `In Isan, tell the cook with a big smile:

“Sàep ee-lěe dêr!” (แซ่บอีหลีเด้อ!)
It means mind-blowingly tasty, and they will absolutely adore you for saying it!`,
    thai: 'Isan Dialect (ภาษาอีสาน)',
  },
];

const AIChatDemo: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const messagesRef = useRef<(HTMLDivElement | null)[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      messagesRef.current.forEach((msg, index) => {
        if (!msg) return;
        const isUser = msg.classList.contains('user-message');

        gsap.fromTo(
          msg,
          { x: isUser ? 40 : -40, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 0.5,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: `${10 + index * 12}% center`,
              toggleActions: 'play none none reverse',
            },
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleSend = () => {
    if (!inputValue.trim()) return;

    const newMessage: Message = {
      id: messages.length + 1,
      type: 'user',
      text: inputValue,
    };

    setMessages([...messages, newMessage]);
    setInputValue('');
    setIsTyping(true);

    setTimeout(() => {
      const aiResponse: Message = {
        id: messages.length + 2,
        type: 'ai',
        text: `Excellent question! In Thai, you can say: "Tham-dâi dee mâak!" (ทำได้ดีมาก - Well done!). Remember to add "khráp" or "kâ" for polite warmth.`,
        thai: 'Ninny AI Instant Correction',
      };
      setMessages((prev) => [...prev, aiResponse]);
      setIsTyping(false);
    }, 1200);
  };

  const handleOpenFullTutor = () => {
    const event = new CustomEvent('open-ninny-tutor');
    window.dispatchEvent(event);
  };

  return (
    <section ref={sectionRef} id="ninny-ai" className="py-24 bg-[#070707] min-h-screen text-white">
      <div className="w-full px-4 sm:px-6 lg:px-12 xl:px-20">
        {/* Section Header */}
        <div className="text-center mb-12 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#ff3a1f]/20 text-[#ff3a1f] text-xs font-bold rounded-full uppercase tracking-wider mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Meet Ninny AI</span>
          </div>
          <h2 className="font-thunder text-4xl sm:text-6xl md:text-7xl lg:text-8xl mb-4">
            YOUR PERSONAL LEARNING COMPANION
          </h2>
          <p className="text-neutral-400 text-base sm:text-lg">
            Ninny AI adapts to your level, explains tones & politeness, corrects mistakes, and guides you through real-world Thai scenarios.
          </p>
        </div>

        {/* Chat Interface */}
        <div className="max-w-3xl mx-auto">
          <div className="bg-[#141414] rounded-3xl overflow-hidden shadow-2xl border border-neutral-800">
            {/* Chat Header */}
            <div className="bg-gradient-to-r from-[#ff3a1f] to-[#ff6644] px-6 py-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white rounded-2xl flex items-center justify-center font-thunder text-2xl text-[#ff3a1f] shadow-md">
                  N
                </div>
                <div>
                  <p className="text-white font-bold text-sm">Ninny AI Language Companion</p>
                  <p className="text-white/80 text-xs">London Hub • Real-time Thai Tutor</p>
                </div>
              </div>
              <Button
                size="sm"
                onClick={handleOpenFullTutor}
                className="bg-[#070707] hover:bg-neutral-900 text-white text-xs font-semibold px-3 py-1.5 rounded-xl flex items-center gap-1.5 shadow"
              >
                <span>Launch Full Room</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Button>
            </div>

            {/* Messages */}
            <div className="p-6 space-y-4 max-h-[480px] overflow-y-auto">
              {messages.map((message, index) => (
                <div
                  key={message.id}
                  ref={(el) => {
                    messagesRef.current[index] = el;
                  }}
                  className={`flex gap-3 ${
                    message.type === 'user' ? 'user-message flex-row-reverse' : 'ai-message'
                  }`}
                >
                  <div
                    className={`w-9 h-9 rounded-xl flex-shrink-0 flex items-center justify-center ${
                      message.type === 'user' ? 'bg-[#ff3a1f] text-white' : 'bg-[#222] text-[#ff3a1f]'
                    }`}
                  >
                    {message.type === 'user' ? (
                      <User className="w-4 h-4" />
                    ) : (
                      <span className="font-thunder text-lg">N</span>
                    )}
                  </div>

                  <div
                    className={`max-w-[85%] rounded-3xl px-5 py-3.5 ${
                      message.type === 'user'
                        ? 'bg-[#ff3a1f] text-white rounded-tr-sm shadow-md'
                        : 'bg-[#1f1f1f] text-neutral-100 rounded-tl-sm border border-neutral-800'
                    }`}
                  >
                    {message.thai && (
                      <p className="text-[11px] font-bold text-[#ff3a1f] uppercase tracking-wider mb-1">
                        {message.thai}
                      </p>
                    )}
                    <p className="text-xs sm:text-sm leading-relaxed whitespace-pre-line">
                      {message.text}
                    </p>
                  </div>
                </div>
              ))}

              {isTyping && (
                <div className="flex gap-3 items-center text-xs text-neutral-400">
                  <div className="w-8 h-8 rounded-xl bg-[#222] text-[#ff3a1f] flex items-center justify-center font-thunder text-sm">
                    N
                  </div>
                  <div className="bg-[#1f1f1f] px-4 py-2.5 rounded-2xl border border-neutral-800">
                    Ninny AI is formulating response...
                  </div>
                </div>
              )}
            </div>

            {/* Input Bar */}
            <div className="p-4 border-t border-neutral-800 bg-[#141414] flex gap-2">
              <input
                type="text"
                placeholder="Ask Ninny AI a question (e.g. How do I order iced tea not too sweet?)..."
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                className="flex-1 bg-[#1f1f1f] border border-neutral-700 rounded-2xl px-4 py-3 text-xs sm:text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-[#ff3a1f]"
              />
              <Button
                onClick={handleSend}
                className="bg-[#ff3a1f] hover:bg-[#d82a12] text-white px-5 rounded-2xl"
              >
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AIChatDemo;
