import { useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import gsap from 'gsap';

const Hero = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const subheadlineRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Initial states
      gsap.set('.headline-word', { rotateX: -90, y: 50, opacity: 0 });
      gsap.set(subheadlineRef.current, { filter: 'blur(20px)', opacity: 0 });
      gsap.set(ctaRef.current, { scale: 0.8, opacity: 0 });
      gsap.set(imageRef.current, { x: 200, rotateY: 15, opacity: 0 });
      gsap.set(dotRef.current, { scale: 0, rotate: -180 });

      // Animation timeline
      const tl = gsap.timeline({ delay: 0.3 });

      tl.to('.headline-word', {
        rotateX: 0,
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.12,
        ease: 'power4.out',
      })
        .to(
          subheadlineRef.current,
          {
            filter: 'blur(0px)',
            opacity: 1,
            duration: 0.6,
            ease: 'power2.out',
          },
          '-=0.4'
        )
        .to(
          ctaRef.current,
          {
            scale: 1,
            opacity: 1,
            duration: 0.5,
            ease: 'back.out(1.7)',
          },
          '-=0.3'
        )
        .to(
          imageRef.current,
          {
            x: 0,
            rotateY: 0,
            opacity: 1,
            duration: 1,
            ease: 'power3.out',
          },
          '-=0.8'
        )
        .to(
          dotRef.current,
          {
            scale: 1,
            rotate: 0,
            duration: 0.4,
            ease: 'back.out(2)',
          },
          '-=0.5'
        );

      // Floating animation for dot
      gsap.to(dotRef.current, {
        y: -20,
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen w-full overflow-hidden bg-[#f0ede8] pt-24 lg:pt-0"
    >
      {/* Background Pattern */}
      <div className="absolute top-0 right-0 w-[400px] h-[400px] opacity-10 pointer-events-none">
        <svg viewBox="0 0 400 400" className="w-full h-full">
          <pattern
            id="hero-pattern"
            x="0"
            y="0"
            width="40"
            height="40"
            patternUnits="userSpaceOnUse"
          >
            <circle cx="20" cy="20" r="2" fill="#070707" />
          </pattern>
          <rect width="400" height="400" fill="url(#hero-pattern)" />
        </svg>
      </div>

      <div className="w-full px-4 sm:px-6 lg:px-12 xl:px-20 min-h-screen flex items-center">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center w-full py-12 lg:py-0">
          {/* Content */}
          <div className="order-2 lg:order-1 perspective-1000">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#ff3a1f]/10 text-[#ff3a1f] text-xs font-bold rounded-full uppercase tracking-wider mb-4">
              <span>🇬🇧 Launched from London</span>
              <span>•</span>
              <span>Phase 1 Commercial Launch</span>
            </div>

            <div ref={headlineRef} className="mb-6">
              <h1 className="font-thunder text-5xl sm:text-7xl md:text-8xl lg:text-[105px] xl:text-[120px] leading-[0.9] text-[#070707] preserve-3d">
                <span className="headline-word inline-block origin-bottom">LEARN PRACTICAL THAI.</span>
                <br />
                <span className="headline-word inline-block origin-bottom text-[#ff3a1f]">
                  SPEAK WITH CONFIDENCE.
                </span>
              </h1>
            </div>

            <p
              ref={subheadlineRef}
              className="text-base sm:text-xl text-[#5e5e5e] max-w-lg mb-4 font-manrope leading-relaxed"
            >
              Learn Thai for real life with guided lessons, conversation practice, and <strong>Ninny AI</strong> — your personal Thai learning companion.
            </p>

            <p className="text-xs sm:text-sm text-[#777] max-w-lg mb-8 italic">
              "Build the confidence to speak practical Thai through structured lessons, real-life practice, and personalised support from Ninny AI."
            </p>

            <div ref={ctaRef} className="flex flex-wrap gap-4">
              <Button
                onClick={() => {
                  const event = new CustomEvent('open-onboarding');
                  window.dispatchEvent(event);
                }}
                className="bg-[#ff3a1f] hover:bg-[#070707] text-white px-8 py-6 text-base sm:text-lg font-semibold transition-all duration-300 hover:scale-105 shadow-lg group"
              >
                Start Learning Thai
                <ArrowRight className="ml-2 w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
              </Button>
              <Button
                variant="outline"
                onClick={() => {
                  const event = new CustomEvent('open-preview');
                  window.dispatchEvent(event);
                }}
                className="border-2 border-[#070707] text-[#070707] hover:bg-[#070707] hover:text-white px-8 py-6 text-base sm:text-lg font-semibold transition-all duration-300"
              >
                Try the Free Preview
              </Button>
            </div>
          </div>

          {/* Image */}
          <div className="order-1 lg:order-2 relative perspective-1000">
            <div
              ref={imageRef}
              className="relative z-10 preserve-3d"
            >
              <div className="relative overflow-hidden rounded-2xl shadow-2xl">
                <img
                  src="/hero-image.jpg"
                  alt="Learn Thai with AI"
                  className="w-full h-auto object-cover transition-all duration-500 hover:scale-[1.02] hover:brightness-105"
                />
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#070707]/20 to-transparent pointer-events-none" />
              </div>

              {/* Floating accent dot */}
              <div
                ref={dotRef}
                className="absolute -bottom-6 -left-6 w-16 h-16 bg-[#ff3a1f] rounded-full z-20 flex items-center justify-center"
              >
                <span className="text-white font-thunder text-2xl">AI</span>
              </div>

              {/* Stats badge */}
              <div className="absolute -top-4 -right-4 bg-white rounded-xl shadow-xl p-4 z-20 animate-float">
                <div className="text-center">
                  <p className="font-thunder text-3xl text-[#ff3a1f]">10K+</p>
                  <p className="text-xs text-[#5e5e5e] font-medium">Active Learners</p>
                </div>
              </div>
            </div>

            {/* Decorative elements */}
            <div className="absolute -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-gradient-to-br from-[#fcf3d9]/50 to-transparent rounded-full blur-3xl" />
          </div>
        </div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#f0ede8] to-transparent pointer-events-none" />
    </section>
  );
};

export default Hero;
