import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Image mask reveal
      gsap.fromTo(
        imageRef.current,
        { clipPath: 'inset(0 100% 0 0)' },
        {
          clipPath: 'inset(0 0% 0 0)',
          duration: 1,
          ease: 'power4.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Headline letter stagger
      const letters = headlineRef.current?.querySelectorAll('.letter');
      if (letters) {
        gsap.fromTo(
          letters,
          { y: 50, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.6,
            stagger: 0.03,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 65%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }

      // Body text lines
      const lines = bodyRef.current?.querySelectorAll('.body-line');
      if (lines) {
        gsap.fromTo(
          lines,
          { y: 20, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.4,
            stagger: 0.1,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 60%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }

      // Red dot
      gsap.fromTo(
        dotRef.current,
        { scale: 0, rotate: 180 },
        {
          scale: 1,
          rotate: 0,
          duration: 0.4,
          ease: 'back.out(2)',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 55%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Parallax effects
      gsap.to(imageRef.current, {
        y: -50,
        scale: 1.05,
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

  const headlineText = 'WHY RASSAME?';

  return (
    <section
      ref={sectionRef}
      id="about"
      className="py-24 bg-[#f0ede8] overflow-hidden"
    >
      <div className="w-full px-4 sm:px-6 lg:px-12 xl:px-20">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Image */}
          <div className="relative order-2 lg:order-1">
            <div
              ref={imageRef}
              className="relative overflow-hidden rounded-2xl shadow-2xl"
            >
              <img
                src="/about-image.jpg"
                alt="Why Rassame"
                className="w-full h-auto object-cover transition-all duration-500 hover:scale-[1.03] hover:contrast-105"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-[#ff3a1f]/10 to-transparent pointer-events-none" />
            </div>

            {/* Accent dot */}
            <div
              ref={dotRef}
              className="absolute -bottom-4 -right-4 w-12 h-12 bg-[#ff3a1f] rounded-full z-10"
            />

            {/* Decorative shape */}
            <div className="absolute -z-10 -top-8 -left-8 w-32 h-32 bg-[#fcf3d9] rounded-full blur-2xl opacity-60" />
          </div>

          {/* Content */}
          <div className="order-1 lg:order-2">
            <h2
              ref={headlineRef}
              className="font-thunder text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-[#070707] mb-8"
            >
              {headlineText.split('').map((char, index) => (
                <span
                  key={index}
                  className={`letter inline-block ${char === ' ' ? 'w-4' : ''}`}
                >
                  {char}
                </span>
              ))}
            </h2>

            <div ref={bodyRef} className="space-y-4 mb-8">
              <p className="body-line text-lg sm:text-xl text-[#5e5e5e] leading-relaxed">
                We combine cutting-edge AI with authentic Thai culture. Our
                platform doesn't just teach words—it opens doors to meaningful
                connections.
              </p>
              <p className="body-line text-lg sm:text-xl text-[#5e5e5e] leading-relaxed">
                Experience deeper travel, genuine understanding of Thai people,
                and their way of life. From ancient traditions to modern slang,
                we cover it all.
              </p>
            </div>

            <a
              href="#services"
              onClick={(e) => {
                e.preventDefault();
                document.querySelector('#services')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="inline-flex items-center gap-2 text-[#070707] font-semibold group"
            >
              <span className="relative">
                Learn More About Us
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#ff3a1f] transition-all duration-300 group-hover:w-full" />
              </span>
              <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-2" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
