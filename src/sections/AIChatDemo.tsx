import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Bot, User, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

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
    text: "สวัสดี! I'm your Thai AI tutor. Ready to practice some conversation? 😊",
    thai: 'Hello!',
  },
  {
    id: 2,
    type: 'user',
    text: 'Yes! How do I order food at a street stall?',
  },
  {
    id: 3,
    type: 'ai',
    text: "Great question! You can say: 'ขอ...หนึ่งจานค่ะ/ครับ' (kor...nung jan ka/krap) which means 'One plate of...please.' Want to try?",
  },
  {
    id: 4,
    type: 'user',
    text: 'ขอผัดไทยหนึ่งจานค่ะ',
    thai: 'One plate of Pad Thai, please.',
  },
  {
    id: 5,
    type: 'ai',
    text: "Perfect! 🎉 That's exactly right. You said 'One plate of Pad Thai, please.' The 'ค่ะ' (ka) at the end is the polite particle for women. Men would say 'ครับ' (krap).",
  },
];

const AIChatDemo = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const messagesRef = useRef<(HTMLDivElement | null)[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Messages reveal on scroll
      messagesRef.current.forEach((msg, index) => {
        if (!msg) return;

        const isUser = msg.classList.contains('user-message');

        gsap.fromTo(
          msg,
          { x: isUser ? 50 : -50, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 0.5,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: `${10 + index * 15}% center`,
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

    // Simulate AI response
    setTimeout(() => {
      const aiResponse: Message = {
        id: messages.length + 2,
        type: 'ai',
        text: 'Excellent effort! Keep practicing and you\'ll master Thai in no time. 🇹🇭',
      };
      setMessages((prev) => [...prev, aiResponse]);
      setIsTyping(false);
    }, 1500);
  };

  return (
    <section
      ref={sectionRef}
      className="py-24 bg-[#070707] min-h-screen"
    >
      <div className="w-full px-4 sm:px-6 lg:px-12 xl:px-20">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="font-thunder text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-white mb-4">
            MEET YOUR AI TUTOR
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Practice real conversations, get instant feedback, and learn at your
            own pace.
          </p>
        </div>

        {/* Chat Interface */}
        <div className="max-w-3xl mx-auto">
          <div className="bg-[#1a1a1a] rounded-2xl overflow-hidden shadow-2xl border border-gray-800">
            {/* Chat Header */}
            <div className="bg-[#ff3a1f] px-6 py-4 flex items-center gap-3">
              <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
                <Bot className="w-6 h-6 text-[#ff3a1f]" />
              </div>
              <div>
                <p className="text-white font-semibold">Rassame AI Tutor</p>
                <p className="text-white/70 text-sm">Online • Ready to help</p>
              </div>
            </div>

            {/* Messages */}
            <div className="p-6 space-y-4 max-h-[500px] overflow-y-auto">
              {messages.map((message, index) => (
                <div
                  key={message.id}
                  ref={(el) => { messagesRef.current[index] = el; }}
                  className={`flex gap-3 ${
                    message.type === 'user'
                      ? 'user-message flex-row-reverse'
                      : 'ai-message'
                  }`}
                >
                  {/* Avatar */}
                  <div
                    className={`w-10 h-10 rounded-full flex-shrink-0 flex items-center justify-center ${
                      message.type === 'user'
                        ? 'bg-[#f0ede8]'
                        : 'bg-[#ff3a1f]'
                    }`}
                  >
                    {message.type === 'user' ? (
                      <User className="w-5 h-5 text-[#070707]" />
                    ) : (
                      <Bot className="w-5 h-5 text-white" />
                    )}
                  </div>

                  {/* Message Bubble */}
                  <div
                    className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                      message.type === 'user'
                        ? 'bg-[#ff3a1f] text-white rounded-tr-sm'
                        : 'bg-gray-800 text-white rounded-tl-sm'
                    }`}
                  >
                    {message.thai && (
                      <p className="text-xs text-gray-400 mb-1">
                        {message.thai}
                      </p>
                    )}
                    <p className="text-sm leading-relaxed">{message.text}</p>
                  </div>
                </div>
              ))}

              {/* Typing indicator */}
              {isTyping && (
                <div className="flex gap-3 ai-message">
                  <div className="w-10 h-10 rounded-full bg-[#ff3a1f] flex-shrink-0 flex items-center justify-center">
                    <Bot className="w-5 h-5 text-white" />
                  </div>
                  <div className="bg-gray-800 rounded-2xl rounded-tl-sm px-4 py-3">
                    <div className="flex gap-1">
                      <span
                        className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"
                        style={{ animationDelay: '0ms' }}
                      />
                      <span
                        className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"
                        style={{ animationDelay: '150ms' }}
                      />
                      <span
                        className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"
                        style={{ animationDelay: '300ms' }}
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Input Area */}
            <div className="p-4 border-t border-gray-800 bg-[#1a1a1a]">
              <div className="flex gap-3">
                <Input
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                  placeholder="Type your message in Thai or English..."
                  className="flex-1 bg-gray-800 border-gray-700 text-white placeholder:text-gray-500 focus:border-[#ff3a1f] focus:ring-[#ff3a1f]"
                />
                <Button
                  onClick={handleSend}
                  className="bg-[#ff3a1f] hover:bg-[#ff5533] text-white px-4"
                >
                  <Send className="w-5 h-5" />
                </Button>
              </div>
              <p className="text-xs text-gray-500 mt-2 text-center">
                Try typing in Thai! The AI understands both languages.
              </p>
            </div>
          </div>
        </div>

        {/* Features */}
        <div className="grid sm:grid-cols-3 gap-6 mt-12 max-w-3xl mx-auto">
          {[
            { label: '24/7 Availability', desc: 'Learn anytime, anywhere' },
            { label: 'Instant Feedback', desc: 'Correct mistakes in real-time' },
            { label: 'Personalized', desc: 'Adapts to your learning style' },
          ].map((feature, index) => (
            <div key={index} className="text-center">
              <p className="text-white font-semibold mb-1">{feature.label}</p>
              <p className="text-gray-400 text-sm">{feature.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AIChatDemo;
