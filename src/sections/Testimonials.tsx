import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import { Button } from '@/components/ui/button';

gsap.registerPlugin(ScrollTrigger);

const testimonials = [
  {
    id: 1,
    name: 'Sarah M.',
    role: 'Marketing Director',
    image: '/testimonial-1.jpg',
    quote:
      "Rassame transformed my Thai learning. The AI tutor feels like having a patient native speaker available 24/7.",
    rating: 5,
  },
  {
    id: 2,
    name: 'James K.',
    role: 'Expat in Bangkok',
    image: '/testimonial-2.jpg',
    quote:
      "Finally, an app that teaches real Thai, not just textbook phrases. The slang lessons are gold!",
    rating: 5,
  },
  {
    id: 3,
    name: 'Lisa T.',
    role: 'Travel Blogger',
    image: '/testimonial-3.jpg',
    quote:
      "I went from zero to confident traveler in 3 months. The cultural context makes all the difference.",
    rating: 5,
  },
  {
    id: 4,
    name: 'Michael R.',
    role: 'Business Owner',
    image: '/testimonial-4.jpg',
    quote:
      "My Thai staff noticed the difference immediately. Worth every penny for the Pro plan.",
    rating: 5,
  },
];

const Testimonials = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Headline word split
      const words = headlineRef.current?.querySelectorAll('.word');
      if (words) {
        gsap.fromTo(
          words,
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.5,
            stagger: 0.08,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 75%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const goToSlide = (index: number) => {
    if (isAnimating || index === currentIndex) return;
    setIsAnimating(true);

    const direction = index > currentIndex ? 1 : -1;

    gsap.to('.testimonial-card', {
      x: -direction * 100,
      opacity: 0,
      duration: 0.3,
      ease: 'power2.in',
      onComplete: () => {
        setCurrentIndex(index);
        gsap.fromTo(
          '.testimonial-card',
          { x: direction * 100, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 0.5,
            ease: 'power3.out',
            onComplete: () => setIsAnimating(false),
          }
        );
      },
    });
  };

  const nextSlide = () => {
    const next = (currentIndex + 1) % testimonials.length;
    goToSlide(next);
  };

  const prevSlide = () => {
    const prev =
      (currentIndex - 1 + testimonials.length) % testimonials.length;
    goToSlide(prev);
  };

  const currentTestimonial = testimonials[currentIndex];

  return (
    <section
      ref={sectionRef}
      id="testimonials"
      className="py-24 bg-[#f0ede8] overflow-hidden"
    >
      <div className="w-full px-4 sm:px-6 lg:px-12 xl:px-20">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2
            ref={headlineRef}
            className="font-thunder text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-[#070707] mb-4"
          >
            <span className="word inline-block mr-4">WHAT</span>
            <span className="word inline-block mr-4">LEARNERS</span>
            <span className="word inline-block">SAY</span>
          </h2>
        </div>

        {/* Testimonial Card */}
        <div className="max-w-4xl mx-auto">
          <div className="testimonial-card bg-white rounded-3xl shadow-xl p-8 sm:p-12 relative overflow-hidden">
            {/* Quote icon */}
            <div className="absolute top-6 right-6 opacity-10">
              <Quote className="w-24 h-24 text-[#ff3a1f]" />
            </div>

            <div className="grid md:grid-cols-[200px_1fr] gap-8 items-center">
              {/* Image */}
              <div className="relative mx-auto md:mx-0">
                <div className="w-32 h-32 sm:w-40 sm:h-40 rounded-full overflow-hidden border-4 border-[#ff3a1f] shadow-lg">
                  <img
                    src={currentTestimonial.image}
                    alt={currentTestimonial.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                {/* Decorative ring */}
                <div className="absolute -inset-2 border-2 border-dashed border-[#cdcdcd] rounded-full animate-spin" style={{ animationDuration: '20s' }} />
              </div>

              {/* Content */}
              <div>
                {/* Stars */}
                <div className="flex gap-1 mb-4">
                  {[...Array(currentTestimonial.rating)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-5 h-5 fill-[#ff3a1f] text-[#ff3a1f]"
                      style={{ animationDelay: `${i * 100}ms` }}
                    />
                  ))}
                </div>

                {/* Quote */}
                <blockquote className="text-xl sm:text-2xl text-[#070707] font-medium leading-relaxed mb-6">
                  "{currentTestimonial.quote}"
                </blockquote>

                {/* Author */}
                <div>
                  <p className="font-semibold text-[#070707]">
                    {currentTestimonial.name}
                  </p>
                  <p className="text-sm text-[#5e5e5e]">
                    {currentTestimonial.role}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-between mt-8">
            {/* Progress dots */}
            <div className="flex gap-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentIndex
                      ? 'bg-[#ff3a1f] w-8'
                      : 'bg-[#cdcdcd] hover:bg-[#5e5e5e]'
                  }`}
                />
              ))}
            </div>

            {/* Arrows */}
            <div className="flex gap-3">
              <Button
                variant="outline"
                size="icon"
                onClick={prevSlide}
                className="w-12 h-12 rounded-full border-2 border-[#070707] hover:bg-[#070707] hover:text-white transition-all duration-300"
              >
                <ChevronLeft className="w-5 h-5" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                onClick={nextSlide}
                className="w-12 h-12 rounded-full border-2 border-[#070707] hover:bg-[#070707] hover:text-white transition-all duration-300"
              >
                <ChevronRight className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
