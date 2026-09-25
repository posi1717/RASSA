import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { BookOpen, MessageSquare, Globe, Zap, Briefcase, Plane } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const services = [
  {
    id: 1,
    title: 'Thai Language Basics',
    description: 'Master the fundamentals: tones, script, and essential grammar.',
    icon: BookOpen,
  },
  {
    id: 2,
    title: 'Conversation Practice',
    description: 'Real dialogue scenarios with AI that responds naturally.',
    icon: MessageSquare,
  },
  {
    id: 3,
    title: 'Cultural Immersion',
    description: 'Understand customs, etiquette, and social context.',
    icon: Globe,
  },
  {
    id: 4,
    title: 'Slang & Expressions',
    description: 'Sound like a local with everyday Thai expressions.',
    icon: Zap,
  },
  {
    id: 5,
    title: 'Business Thai',
    description: 'Professional language for work and formal situations.',
    icon: Briefcase,
  },
  {
    id: 6,
    title: 'Travel Thai',
    description: 'Essential phrases for confident travel experiences.',
    icon: Plane,
  },
];

const Services = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Headline word cascade
      const words = headlineRef.current?.querySelectorAll('.word');
      if (words) {
        gsap.fromTo(
          words,
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.5,
            stagger: 0.06,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 75%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }

      // Cards animation
      cardsRef.current.forEach((card, index) => {
        if (!card) return;

        const rotation = index % 2 === 0 ? -3 : 2;

        gsap.fromTo(
          card,
          { y: 80, rotateZ: rotation, opacity: 0 },
          {
            y: 0,
            rotateZ: 0,
            opacity: 1,
            duration: 0.7,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 85%',
              toggleActions: 'play none none reverse',
            },
            delay: index * 0.1,
          }
        );

        // Parallax
        gsap.to(card, {
          y: -40,
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

  const headlineText = 'WHAT WE OFFER';

  return (
    <section
      ref={sectionRef}
      id="services"
      className="py-24 bg-[#f0ede8]"
    >
      <div className="w-full px-4 sm:px-6 lg:px-12 xl:px-20">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2
            ref={headlineRef}
            className="font-thunder text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-[#070707] mb-4"
          >
            {headlineText.split(' ').map((word, index) => (
              <span key={index} className="word inline-block mr-4">
                {word}
              </span>
            ))}
          </h2>
          <p className="text-[#5e5e5e] text-lg max-w-2xl mx-auto">
            Comprehensive Thai learning programs designed for every goal and
            skill level.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <div
                key={service.id}
                ref={(el) => { cardsRef.current[index] = el; }}
                className="group"
              >
                <div className="h-full bg-white border-2 border-[#cdcdcd] rounded-xl p-6 transition-all duration-300 hover:border-[#ff3a1f] hover:-translate-y-4 hover:shadow-xl hover:scale-[1.02]">
                  {/* Number and Icon */}
                  <div className="flex items-start justify-between mb-4">
                    <span className="font-thunder text-4xl text-[#070707] transition-all duration-300 group-hover:text-[#ff3a1f] group-hover:scale-120">
                      0{service.id}
                    </span>
                    <div className="w-12 h-12 bg-[#f0ede8] rounded-lg flex items-center justify-center transition-all duration-300 group-hover:bg-[#ff3a1f]">
                      <Icon className="w-6 h-6 text-[#5e5e5e] transition-colors duration-300 group-hover:text-white" />
                    </div>
                  </div>

                  {/* Content */}
                  <h3 className="font-thunder text-2xl text-[#070707] mb-2 transition-colors duration-300 group-hover:text-[#ff3a1f]">
                    {service.title}
                  </h3>
                  <p className="text-[#5e5e5e] text-sm leading-relaxed">
                    {service.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Services;
