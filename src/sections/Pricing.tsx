import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Check, Sparkles, ShieldCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';

gsap.registerPlugin(ScrollTrigger);

const plans = [
  {
    id: 'free',
    name: 'Free Preview',
    price: '0',
    period: 'forever',
    description: 'Start with a free preview of practical Thai',
    features: [
      'Foundations starter lessons',
      'Preview travel & daily conversation',
      '5 free Ninny AI practice interactions',
      'Pronunciation & culture guide',
      'Personal progress preview',
    ],
    cta: 'Try Free Preview',
    popular: false,
  },
  {
    id: 'monthly',
    name: 'RASSA Thai Monthly',
    price: '19.60',
    period: 'month',
    description: 'Full Phase 1 commercial subscription via Stripe',
    features: [
      'Full Phase 1 Thai learning library',
      'Unlimited Ninny AI Thai tutor access',
      'Role-play scenario conversation practice',
      'Modern Thai Slang & Regional Dialects',
      'Politeness particles & tone doctor',
      'Personal Vocab Vault & streak tracker',
      'Cancel anytime with one click',
    ],
    cta: 'Subscribe Monthly (£19.60)',
    popular: false,
  },
  {
    id: 'yearly',
    name: 'RASSA Thai Yearly',
    price: '190.60',
    period: 'year',
    description: 'Equivalent to 10 months (Save ~20%)',
    features: [
      'Everything included in Monthly',
      'Two full months free equivalent',
      'Uninterrupted annual access',
      'Priority Ninny AI updates',
      'VIP Learner community status',
      'Early access to Phase 2 travel guides',
    ],
    cta: 'Subscribe Yearly (£190.60)',
    popular: true,
  },
];

const Pricing: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Headline reveal
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

      // Cards reveal
      cardsRef.current.forEach((card) => {
        if (!card) return;
        gsap.fromTo(
          card,
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.6,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 85%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handlePlanClick = (planId: string) => {
    const event = new CustomEvent('open-subscription-plan', { detail: { planId } });
    window.dispatchEvent(event);
  };

  const headlineText = 'START FREE. UNLOCK EVERYTHING.';

  return (
    <section ref={sectionRef} id="pricing" className="py-24 bg-[#f0ede8]">
      <div className="w-full px-4 sm:px-6 lg:px-12 xl:px-20">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#ff3a1f]/10 text-[#ff3a1f] text-xs font-bold rounded-full uppercase tracking-wider mb-4">
            <span>Stripe Powered Subscriptions</span>
          </div>
          <h2
            ref={headlineRef}
            className="font-thunder text-4xl sm:text-6xl md:text-7xl lg:text-8xl text-[#070707] mb-4"
          >
            {headlineText.split('').map((char, index) => (
              <span
                key={index}
                className={`char inline-block ${char === ' ' ? 'w-3 sm:w-4' : ''}`}
              >
                {char}
              </span>
            ))}
          </h2>
          <p className="text-[#5e5e5e] text-base sm:text-lg">
            Start with a free preview. Unlock the full RASSA Thai learning experience for <strong>£19.60/month</strong> or <strong>£190.60/year</strong>.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto items-stretch">
          {plans.map((plan, index) => (
            <div
              key={plan.id}
              ref={(el) => {
                cardsRef.current[index] = el;
              }}
              className={`flex flex-col justify-between rounded-3xl p-6 sm:p-8 transition-all duration-300 ${
                plan.popular
                  ? 'bg-[#070707] text-white scale-105 shadow-2xl border-2 border-[#ff3a1f] md:-mt-4 md:mb-4'
                  : 'bg-white border border-[#e5e0d8] text-[#070707] shadow-sm hover:border-[#ff3a1f]'
              }`}
            >
              <div>
                {/* Popular Badge */}
                {plan.popular ? (
                  <div className="flex items-center gap-2 mb-4">
                    <Sparkles className="w-4 h-4 text-[#ff3a1f]" />
                    <span className="text-xs font-bold uppercase tracking-wider text-[#ff3a1f]">
                      Save ~20% (Pay for 10 Months)
                    </span>
                  </div>
                ) : (
                  <div className="h-6 mb-4" />
                )}

                {/* Plan Name */}
                <h3
                  className={`font-thunder text-3xl mb-1 ${
                    plan.popular ? 'text-white' : 'text-[#070707]'
                  }`}
                >
                  {plan.name}
                </h3>
                <p
                  className={`text-xs mb-6 ${
                    plan.popular ? 'text-gray-300' : 'text-[#5e5e5e]'
                  }`}
                >
                  {plan.description}
                </p>

                {/* Price */}
                <div className="mb-6 flex items-baseline gap-1">
                  <span className="text-2xl font-thunder">£</span>
                  <span
                    className={`font-thunder text-5xl sm:text-6xl ${
                      plan.popular ? 'text-[#ff3a1f]' : 'text-[#070707]'
                    }`}
                  >
                    {plan.price}
                  </span>
                  <span
                    className={`text-xs ml-1 ${
                      plan.popular ? 'text-gray-400' : 'text-[#5e5e5e]'
                    }`}
                  >
                    /{plan.period}
                  </span>
                </div>

                {/* Features */}
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, fIndex) => (
                    <li key={fIndex} className="flex items-start gap-3">
                      <Check className="w-4 h-4 text-[#ff3a1f] flex-shrink-0 mt-0.5" />
                      <span
                        className={`text-xs sm:text-sm ${
                          plan.popular ? 'text-gray-200' : 'text-[#444]'
                        }`}
                      >
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* CTA */}
              <Button
                onClick={() => handlePlanClick(plan.id)}
                className={`w-full py-6 text-sm font-semibold rounded-2xl transition-all duration-300 hover:scale-105 ${
                  plan.popular
                    ? 'bg-[#ff3a1f] hover:bg-[#d82a12] text-white shadow-lg'
                    : 'bg-[#070707] hover:bg-[#ff3a1f] text-white'
                }`}
              >
                {plan.cta}
              </Button>
            </div>
          ))}
        </div>

        {/* Trust Badges */}
        <div className="flex flex-wrap justify-center items-center gap-6 mt-12 text-xs text-[#5e5e5e]">
          <span className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-[#10b981]" />
            Encrypted Stripe Checkout
          </span>
          <span className="flex items-center gap-2">
            <Check className="w-4 h-4 text-[#ff3a1f]" />
            Cancel anytime with 1-click portal
          </span>
          <span className="flex items-center gap-2">
            <Check className="w-4 h-4 text-[#ff3a1f]" />
            Billed in GBP (£) from London, UK
          </span>
        </div>
      </div>
    </section>
  );
};

export default Pricing;
