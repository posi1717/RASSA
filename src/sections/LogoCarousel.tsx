import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const logos = [
  { name: 'TechCrunch', text: 'TECHCRUNCH' },
  { name: 'Forbes', text: 'FORBES' },
  { name: 'Wired', text: 'WIRED' },
  { name: 'The Verge', text: 'THE VERGE' },
  { name: 'Bloomberg', text: 'BLOOMBERG' },
];

const LogoCarousel = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLParagraphElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Heading animation
      gsap.fromTo(
        headingRef.current,
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Track slide in
      gsap.fromTo(
        trackRef.current,
        { x: '-100%', opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="py-16 bg-[#f0ede8] overflow-hidden"
    >
      <div className="w-full px-4 sm:px-6 lg:px-12 xl:px-20 mb-10">
        <p
          ref={headingRef}
          className="text-center text-[#5e5e5e] text-sm sm:text-base font-medium uppercase tracking-wider"
        >
          Trusted by 100+ companies around the world for top-tier language education
        </p>
      </div>

      {/* Logo Track */}
      <div className="relative">
        {/* Gradient masks */}
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-[#f0ede8] to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-[#f0ede8] to-transparent z-10 pointer-events-none" />

        <div ref={trackRef} className="flex animate-slide-infinite">
          {/* Double the logos for seamless loop */}
          {[...logos, ...logos].map((logo, index) => (
            <div
              key={`${logo.name}-${index}`}
              className="flex-shrink-0 px-12 py-4 group cursor-pointer"
            >
              <span className="font-thunder text-3xl sm:text-4xl text-[#cdcdcd] grayscale transition-all duration-300 group-hover:grayscale-0 group-hover:text-[#ff3a1f] group-hover:scale-110 inline-block">
                {logo.text}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LogoCarousel;
