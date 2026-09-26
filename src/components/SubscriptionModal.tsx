import React from 'react';
import { useApp } from '../context/AppContext';
import { STRIPE_PLANS, initiateStripeCheckout } from '../services/stripe';
import { Check, Sparkles, X, ShieldCheck } from 'lucide-react';
import { Button } from './ui/button';

export const SubscriptionModal: React.FC = () => {
  const { isSubscriptionModalOpen, setIsSubscriptionModalOpen, subscriptionTier, setSubscriptionTier } = useApp();

  if (!isSubscriptionModalOpen) return null;

  const handleSelectPlan = async (tier: 'free' | 'monthly' | 'yearly') => {
    await initiateStripeCheckout(tier);
    setSubscriptionTier(tier);
    setIsSubscriptionModalOpen(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in">
      <div className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-[#faf8f5] rounded-3xl border border-[#e5e0d8] shadow-2xl p-6 sm:p-10 text-[#070707]">
        {/* Close Button */}
        <button
          onClick={() => setIsSubscriptionModalOpen(false)}
          className="absolute top-6 right-6 p-2 text-[#5e5e5e] hover:text-[#070707] hover:bg-[#eadecc] rounded-full transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="text-center max-w-xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#ff3a1f]/10 text-[#ff3a1f] text-xs font-semibold rounded-full uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            RASSA Phase 1 Membership
          </div>
          <h2 className="text-3xl sm:text-4xl font-thunder tracking-tight text-[#070707] mb-3">
            Unlock the Full Practical Thai Experience
          </h2>
          <p className="text-sm sm:text-base text-[#5e5e5e] font-manrope">
            Start with a free preview or join as a subscriber with unlimited Ninny AI tutor access, all 7 curriculum areas, slang, and regional dialects.
          </p>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid md:grid-cols-3 gap-6">
          {STRIPE_PLANS.map((plan) => {
            const isCurrent = subscriptionTier === plan.id;
            return (
              <div
                key={plan.id}
                className={`relative flex flex-col justify-between p-6 rounded-2xl transition-all duration-300 ${
                  plan.popular
                    ? 'bg-white border-2 border-[#ff3a1f] shadow-xl md:-translate-y-2'
                    : 'bg-white/80 border border-[#e5e0d8] shadow-sm'
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-3 py-0.5 bg-[#ff3a1f] text-white text-xs font-bold rounded-full uppercase tracking-wider">
                    {plan.savingsBadge || 'Most Popular'}
                  </div>
                )}

                <div>
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="font-bold text-lg text-[#070707]">{plan.name}</h3>
                      <p className="text-xs text-[#5e5e5e] mt-1">{plan.description}</p>
                    </div>
                  </div>

                  <div className="mb-6">
                    <span className="text-4xl font-thunder text-[#070707]">{plan.priceFormatted}</span>
                    <span className="text-xs text-[#5e5e5e] ml-1">/{plan.period}</span>
                  </div>

                  <div className="space-y-3 mb-6">
                    {plan.features.map((feat, idx) => (
                      <div key={idx} className="flex items-start text-xs sm:text-sm text-[#333]">
                        <Check className="w-4 h-4 text-[#ff3a1f] shrink-0 mr-2 mt-0.5" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <Button
                  onClick={() => handleSelectPlan(plan.id)}
                  className={`w-full py-5 text-sm font-semibold rounded-xl transition-all ${
                    isCurrent
                      ? 'bg-[#e5e0d8] text-[#5e5e5e] cursor-default'
                      : plan.popular
                      ? 'bg-[#ff3a1f] hover:bg-[#d82a12] text-white shadow-md'
                      : 'bg-[#070707] hover:bg-[#222] text-white'
                  }`}
                  disabled={isCurrent}
                >
                  {isCurrent ? 'Current Plan' : plan.id === 'free' ? 'Choose Free Preview' : `Subscribe (${plan.priceFormatted})`}
                </Button>
              </div>
            );
          })}
        </div>

        {/* Security / Stripe Trust Footer */}
        <div className="mt-8 pt-6 border-t border-[#e5e0d8] flex flex-wrap items-center justify-between gap-4 text-xs text-[#5e5e5e]">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-[#10b981]" />
            <span>Guaranteed secure payment powered by Stripe. Cancel anytime with one click.</span>
          </div>
          <div>Billed in GBP (£) from London, UK. Taxes included where applicable.</div>
        </div>
      </div>
    </div>
  );
};
