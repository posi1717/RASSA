import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Brain, MessageCircle, Users } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const features = [
  {
    id: 1,
    title: 'AI-POWERED LEARNING',
    description:
      'Personalized lessons that adapt to your pace and style. Our AI understands your strengths and weaknesses.',
    image: '/feature-1.jpg',
    icon: Brain,
  },
  {
    id: 2,
    title: 'CULTURE & SLANG',
    description:
      'Learn real Thai, not just textbook Thai. Master everyday expressions and cultural nuances.',
    image: '/feature-2.jpg',
    icon: MessageCircle,
  },
  {
    id: 3,
    title: 'SPEAK LIKE A LOCAL',
    description:
      'Practice conversations with AI that sounds natural. Build confidence for real-world interactions.',
    image: '/feature-3.jpg',
    icon: Users,
  },
];

const Features = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      cardsRef.current.forEach((card, index) => {
        if (!card) return;

        const image = card.querySelector('.feature-image');
        const dot = card.querySelector('.feature-dot');

        gsap.fromTo(
          card,
          { y: 100, rotateX: 15, opacity: 0 },
          {
            y: 0,
            rotateX: 0,
            opacity: 1,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 85%',
              toggleActions: 'play none none reverse',
            },
            delay: index * 0.15,
          }
        );

        if (image) {
          gsap.fromTo(
            image,
            { scale: 1.2, clipPath: 'inset(100% 0 0 0)' },
            {
              scale: 1,
              clipPath: 'inset(0% 0 0 0)',
              duration: 1,
              ease: 'power4.out',
              scrollTrigger: {
                trigger: card,
                start: 'top 80%',
                toggleActions: 'play none none reverse',
              },
              delay: index * 0.15 + 0.2,
            }
          );
        }

        if (dot) {
          gsap.fromTo(
            dot,
            { scale: 0 },
            {
              scale: 1,
              duration: 0.3,
              ease: 'back.out(2)',
              scrollTrigger: {
                trigger: card,
                start: 'top 75%',
                toggleActions: 'play none none reverse',
              },
              delay: index * 0.15 + 0.6,
            }
          );
        }

        // Parallax on scroll
        gsap.to(card, {
          y: -30 - index * 20,
          ease: 'none',
          scrollTrigger: {
            trigger: card,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 0.5,
          },
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="features"
      className="py-24 bg-[#f0ede8]"
    >
      <div className="w-full px-4 sm:px-6 lg:px-12 xl:px-20">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="font-thunder text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-[#070707] mb-4">
            THREE PILLARS
          </h2>
          <p className="text-[#5e5e5e] text-lg max-w-2xl mx-auto">
            Our approach combines cutting-edge AI with authentic Thai culture for
            the most effective learning experience.
          </p>
        </div>

        {/* Feature Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 perspective-1000">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={feature.id}
                ref={(el) => { cardsRef.current[index] = el; }}
                className={`group preserve-3d ${
                  index === 1 ? 'lg:mt-16' : index === 2 ? 'lg:mt-32' : ''
                }`}
              >
                <div className="bg-white rounded-2xl overflow-hidden shadow-lg transition-all duration-500 hover:shadow-2xl hover:-translate-y-3">
                  {/* Image */}
                  <div className="relative overflow-hidden aspect-square">
                    <img
                      src={feature.image}
                      alt={feature.title}
                      className="feature-image w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#070707]/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    
                    {/* Icon overlay */}
                    <div className="absolute top-4 right-4 w-12 h-12 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg">
                      <Icon className="w-6 h-6 text-[#ff3a1f]" />
                    </div>

                    {/* Accent dot */}
                    <div className="feature-dot absolute -bottom-3 -left-3 w-8 h-8 bg-[#ff3a1f] rounded-full" />
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <h3 className="font-thunder text-2xl sm:text-3xl text-[#070707] mb-3 transition-all duration-300 group-hover:text-[#ff3a1f] group-hover:tracking-wider">
                      {feature.title}
                    </h3>
                    <p className="text-[#5e5e5e] text-sm sm:text-base leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Features;
