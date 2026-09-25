import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Plus, Minus } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const faqs = [
  {
    id: 1,
    question: 'How does the AI tutor work?',
    answer:
      "Our AI uses advanced language models trained specifically on Thai. It understands context, corrects your mistakes gently, and adapts to your learning style. The more you practice, the better it understands your strengths and weaknesses.",
  },
  {
    id: 2,
    question: 'Can I really learn Thai from zero?',
    answer:
      "Absolutely! We start with the basics—tones, script, and essential phrases—and build up gradually. Many users become conversational in 3-6 months with consistent practice. Our AI tutor is patient and supportive every step of the way.",
  },
  {
    id: 3,
    question: "What's included in the free plan?",
    answer:
      'Free users get access to basic lessons, limited AI conversations per day, and essential phrase guides. It\'s perfect for trying out the platform. Upgrade anytime for unlimited access to all features.',
  },
  {
    id: 4,
    question: 'How is this different from other apps?',
    answer:
      "We focus on real-world Thai, including slang and cultural context. Our AI provides personalized feedback that generic apps can't match. Plus, we teach you when and how to use phrases, not just what to say.",
  },
  {
    id: 5,
    question: 'Can I cancel my subscription anytime?',
    answer:
      "Yes, no contracts or hidden fees. Cancel directly in your account settings, and you'll keep access until the end of your billing period. We believe in earning your business every month.",
  },
];

const FAQ = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const itemsRef = useRef<(HTMLDivElement | null)[]>([]);
  const [openId, setOpenId] = useState<number | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Headline letter stagger
      const letters = headlineRef.current?.querySelectorAll('.letter');
      if (letters) {
        gsap.fromTo(
          letters,
          { y: 20, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.4,
            stagger: 0.02,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 75%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }

      // FAQ items slide in
      itemsRef.current.forEach((item, index) => {
        if (!item) return;

        gsap.fromTo(
          item,
          { x: 50, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 0.5,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 65%',
              toggleActions: 'play none none reverse',
            },
            delay: 0.3 + index * 0.1,
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const toggleItem = (id: number) => {
    setOpenId(openId === id ? null : id);
  };

  const headlineText = 'QUESTIONS? ANSWERED.';

  return (
    <section ref={sectionRef} id="faq" className="py-24 bg-[#f0ede8]">
      <div className="w-full px-4 sm:px-6 lg:px-12 xl:px-20">
        <div className="grid lg:grid-cols-[1fr_2fr] gap-12 lg:gap-20">
          {/* Left Column - Heading */}
          <div className="lg:sticky lg:top-32 lg:self-start">
            <h2
              ref={headlineRef}
              className="font-thunder text-5xl sm:text-6xl md:text-7xl text-[#070707] mb-4"
            >
              {headlineText.split('').map((char, index) => (
                <span
                  key={index}
                  className={`letter inline-block ${char === ' ' ? 'w-3' : ''}`}
                >
                  {char}
                </span>
              ))}
            </h2>
            <p className="text-[#5e5e5e] text-lg">
              Everything you need to know about learning Thai with Rassame.
            </p>
          </div>

          {/* Right Column - Accordion */}
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div
                key={faq.id}
                ref={(el) => { itemsRef.current[index] = el; }}
                className="bg-white rounded-xl overflow-hidden shadow-sm transition-all duration-300 hover:shadow-md"
              >
                <button
                  onClick={() => toggleItem(faq.id)}
                  className="w-full flex items-center justify-between p-6 text-left group"
                >
                  <span className="font-semibold text-[#070707] text-lg pr-4 group-hover:text-[#ff3a1f] transition-colors duration-300">
                    {faq.question}
                  </span>
                  <span
                    className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${
                      openId === faq.id
                        ? 'bg-[#ff3a1f] text-white rotate-180'
                        : 'bg-[#f0ede8] text-[#070707] group-hover:bg-[#ff3a1f] group-hover:text-white'
                    }`}
                  >
                    {openId === faq.id ? (
                      <Minus className="w-5 h-5" />
                    ) : (
                      <Plus className="w-5 h-5" />
                    )}
                  </span>
                </button>

                <div
                  className={`overflow-hidden transition-all duration-400 ease-out ${
                    openId === faq.id ? 'max-h-96' : 'max-h-0'
                  }`}
                >
                  <div className="px-6 pb-6">
                    <p className="text-[#5e5e5e] leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
