import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const CTA = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subheadlineRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Headline words 3D rotate in
      const words = headlineRef.current?.querySelectorAll('.word');
      if (words) {
        gsap.fromTo(
          words,
          { rotateX: -40, y: 60, opacity: 0 },
          {
            rotateX: 0,
            y: 0,
            opacity: 1,
            duration: 0.7,
            stagger: 0.1,
            ease: 'power4.out',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 70%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }

      // Subheadline
      gsap.fromTo(
        subheadlineRef.current,
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.5,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 60%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // CTA button
      gsap.fromTo(
        ctaRef.current,
        { scale: 0.5, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 0.6,
          ease: 'elastic.out(1, 0.5)',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 50%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Parallax on headline
      gsap.to(headlineRef.current, {
        y: -30,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 0.5,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const scrollToPricing = () => {
    const element = document.querySelector('#pricing');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const headlineWords = ['READY', 'TO', 'START', 'YOUR', 'THAI', 'JOURNEY?'];

  return (
    <section
      ref={sectionRef}
      className="py-24 bg-gradient-to-br from-[#fcf3d9] via-[#f0ede8] to-[#fcf3d9] relative overflow-hidden"
    >
      {/* Animated background shapes */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-[#ff3a1f]/5 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#ff3a1f]/5 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }} />
      </div>

      <div className="w-full px-4 sm:px-6 lg:px-12 xl:px-20 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Headline */}
          <h2
            ref={headlineRef}
            className="font-thunder text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-[#070707] mb-6 perspective-1000"
          >
            {headlineWords.map((word, index) => (
              <span
                key={index}
                className="word inline-block mr-3 sm:mr-4 preserve-3d"
              >
                {word}
              </span>
            ))}
          </h2>

          {/* Subheadline */}
          <p
            ref={subheadlineRef}
            className="text-lg sm:text-xl text-[#5e5e5e] mb-10 max-w-2xl mx-auto"
          >
            Join thousands of learners mastering Thai with AI. Start free today.
          </p>

          {/* CTA Buttons */}
          <div ref={ctaRef} className="flex flex-wrap justify-center gap-4">
            <Button
              onClick={scrollToPricing}
              className="bg-[#ff3a1f] hover:bg-[#070707] text-white px-10 py-7 text-lg font-semibold transition-all duration-300 hover:scale-110 animate-pulse-glow"
            >
              Get Started Free
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
            <Button
              variant="outline"
              onClick={scrollToPricing}
              className="border-2 border-[#070707] text-[#070707] hover:bg-[#070707] hover:text-white px-10 py-7 text-lg font-semibold transition-all duration-300"
            >
              View Pricing
            </Button>
          </div>

          {/* Trust indicators */}
          <div className="flex flex-wrap justify-center gap-8 mt-12">
            <div className="text-center">
              <p className="font-thunder text-3xl text-[#ff3a1f]">10K+</p>
              <p className="text-sm text-[#5e5e5e]">Active Learners</p>
            </div>
            <div className="text-center">
              <p className="font-thunder text-3xl text-[#ff3a1f]">4.9</p>
              <p className="text-sm text-[#5e5e5e]">App Store Rating</p>
            </div>
            <div className="text-center">
              <p className="font-thunder text-3xl text-[#ff3a1f]">50+</p>
              <p className="text-sm text-[#5e5e5e]">Lessons</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTA;
