import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Check, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';

gsap.registerPlugin(ScrollTrigger);

const plans = [
  {
    id: 1,
    name: 'Free',
    price: 0,
    period: 'month',
    description: 'Perfect for getting started',
    features: [
      'Basic Thai lessons',
      '5 AI chats per day',
      'Essential phrases guide',
      'Community access',
    ],
    cta: 'Get Started',
    popular: false,
  },
  {
    id: 2,
    name: 'Pro',
    price: 19,
    period: 'month',
    description: 'Best for serious learners',
    features: [
      'Unlimited AI tutoring',
      'Advanced lessons',
      'Slang & culture content',
      'Progress tracking',
      'Offline mode',
      'Priority support',
    ],
    cta: 'Start Pro Trial',
    popular: true,
  },
  {
    id: 3,
    name: 'Enterprise',
    price: null,
    period: '',
    description: 'For teams and organizations',
    features: [
      'Team management',
      'Custom curriculum',
      'API access',
      'Dedicated support',
      'Analytics dashboard',
      'SSO integration',
    ],
    cta: 'Contact Sales',
    popular: false,
  },
];

const Pricing = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const [animatedPrices, setAnimatedPrices] = useState<number[]>([0, 0, 0]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Headline character reveal
      const chars = headlineRef.current?.querySelectorAll('.char');
      if (chars) {
        gsap.fromTo(
          chars,
          { y: 30, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.4,
            stagger: 0.025,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 75%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }

      // Cards 3D flip
      cardsRef.current.forEach((card, index) => {
        if (!card) return;

        gsap.fromTo(
          card,
          { rotateY: -90, opacity: 0 },
          {
            rotateY: 0,
            opacity: 1,
            duration: 0.8,
            ease: 'power4.out',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 60%',
              toggleActions: 'play none none reverse',
            },
            delay: 0.6 + index * 0.15,
          }
        );

        // Parallax
        gsap.to(card, {
          y: -20 - (index === 1 ? 20 : 0),
          ease: 'none',
          scrollTrigger: {
            trigger: card,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 0.5,
          },
        });
      });

      // Price counter animation
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top 60%',
        onEnter: () => {
          plans.forEach((plan, index) => {
            if (plan.price !== null) {
              gsap.to(
                { value: 0 },
                {
                  value: plan.price,
                  duration: 1,
                  ease: 'power3.out',
                  onUpdate: function () {
                    setAnimatedPrices((prev) => {
                      const newPrices = [...prev];
                      newPrices[index] = Math.round(this.targets()[0].value);
                      return newPrices;
                    });
                  },
                }
              );
            }
          });
        },
        once: true,
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const headlineText = 'CHOOSE YOUR PATH';

  return (
    <section
      ref={sectionRef}
      id="pricing"
      className="py-24 bg-[#f0ede8]"
    >
      <div className="w-full px-4 sm:px-6 lg:px-12 xl:px-20">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2
            ref={headlineRef}
            className="font-thunder text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-[#070707] mb-4"
          >
            {headlineText.split('').map((char, index) => (
              <span
                key={index}
                className={`char inline-block ${char === ' ' ? 'w-4' : ''}`}
              >
                {char}
              </span>
            ))}
          </h2>
          <p className="text-[#5e5e5e] text-lg">
            Start free, upgrade when you're ready
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto perspective-1000">
          {plans.map((plan, index) => (
            <div
              key={plan.id}
              ref={(el) => { cardsRef.current[index] = el; }}
              className={`preserve-3d ${plan.popular ? 'md:-mt-4 md:mb-4' : ''}`}
            >
              <div
                className={`h-full rounded-2xl p-6 sm:p-8 transition-all duration-300 hover:-translate-y-3 ${
                  plan.popular
                    ? 'bg-[#070707] text-white scale-105 shadow-2xl hover:shadow-[0_0_50px_rgba(255,58,31,0.3)]'
                    : 'bg-white border-2 border-[#cdcdcd] hover:border-[#ff3a1f]'
                }`}
              >
                {/* Popular Badge */}
                {plan.popular && (
                  <div className="flex items-center gap-2 mb-4">
                    <Sparkles className="w-5 h-5 text-[#ff3a1f]" />
                    <span className="text-sm font-semibold text-[#ff3a1f]">
                      Most Popular
                    </span>
                  </div>
                )}

                {/* Plan Name */}
                <h3
                  className={`font-thunder text-3xl mb-2 ${
                    plan.popular ? 'text-white' : 'text-[#070707]'
                  }`}
                >
                  {plan.name}
                </h3>
                <p
                  className={`text-sm mb-6 ${
                    plan.popular ? 'text-gray-400' : 'text-[#5e5e5e]'
                  }`}
                >
                  {plan.description}
                </p>

                {/* Price */}
                <div className="mb-6">
                  {plan.price !== null ? (
                    <div className="flex items-baseline gap-1">
                      <span
                        className={`text-lg ${
                          plan.popular ? 'text-gray-400' : 'text-[#5e5e5e]'
                        }`}
                      >
                        $
                      </span>
                      <span
                        className={`font-thunder text-5xl ${
                          plan.popular ? 'text-white' : 'text-[#070707]'
                        }`}
                      >
                        {animatedPrices[index]}
                      </span>
                      <span
                        className={`text-sm ${
                          plan.popular ? 'text-gray-400' : 'text-[#5e5e5e]'
                        }`}
                      >
                        /{plan.period}
                      </span>
                    </div>
                  ) : (
                    <span
                      className={`font-thunder text-5xl ${
                        plan.popular ? 'text-white' : 'text-[#070707]'
                      }`}
                    >
                      Custom
                    </span>
                  )}
                </div>

                {/* Features */}
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, fIndex) => (
                    <li key={fIndex} className="flex items-start gap-3">
                      <Check
                        className={`w-5 h-5 flex-shrink-0 mt-0.5 ${
                          plan.popular ? 'text-[#ff3a1f]' : 'text-[#ff3a1f]'
                        }`}
                      />
                      <span
                        className={`text-sm ${
                          plan.popular ? 'text-gray-300' : 'text-[#5e5e5e]'
                        }`}
                      >
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                <Button
                  className={`w-full py-6 text-base font-semibold transition-all duration-300 hover:scale-105 ${
                    plan.popular
                      ? 'bg-[#ff3a1f] hover:bg-white hover:text-[#070707] text-white'
                      : 'bg-[#070707] hover:bg-[#ff3a1f] text-white'
                  }`}
                >
                  {plan.cta}
                </Button>
              </div>
            </div>
          ))}
        </div>

        {/* Trust badges */}
        <div className="flex flex-wrap justify-center gap-6 mt-12 text-sm text-[#5e5e5e]">
          <span className="flex items-center gap-2">
            <Check className="w-4 h-4 text-[#ff3a1f]" />
            No credit card required
          </span>
          <span className="flex items-center gap-2">
            <Check className="w-4 h-4 text-[#ff3a1f]" />
            Cancel anytime
          </span>
          <span className="flex items-center gap-2">
            <Check className="w-4 h-4 text-[#ff3a1f]" />
            14-day free trial
          </span>
        </div>
      </div>
    </section>
  );
};

export default Pricing;
