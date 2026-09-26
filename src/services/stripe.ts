import type { SubscriptionTier } from '../types/rassa';
import { localStore } from '../lib/supabase';

export interface PricingPlan {
  id: SubscriptionTier;
  name: string;
  priceFormatted: string;
  pricePence: number;
  period: string;
  description: string;
  savingsBadge?: string;
  features: string[];
  stripePriceId: string;
  popular?: boolean;
}

export const STRIPE_PLANS: PricingPlan[] = [
  {
    id: 'free',
    name: 'Free Preview',
    priceFormatted: '£0',
    pricePence: 0,
    period: 'forever',
    description: 'Experience practical Thai basics and preview Ninny AI with no credit card required.',
    features: [
      'Beginner Thai Foundations starter lessons',
      'Preview travel & everyday conversation phrases',
      '5 free Ninny AI practice interactions',
      'Basic pronunciation & culture guide',
      'Personal progress preview',
    ],
    stripePriceId: 'price_free_tier',
  },
  {
    id: 'monthly',
    name: 'RASSA Thai Monthly',
    priceFormatted: '£19.60',
    pricePence: 1960,
    period: 'month',
    description: 'Full flexible access to the complete Phase 1 Thai language learning library.',
    features: [
      'Full Phase 1 Thai learning library (All 7 Areas)',
      'Unlimited Ninny AI Thai personal tutor access',
      'Real-world role-play conversation practice',
      'Modern Thai Slang & Regional Dialects (North, Isan, South)',
      'Sentence doctor & politeness particle analysis',
      'Personal Vocab Vault & daily streak tracker',
      'Continuous new cultural and language content',
      'Cancel anytime with one click',
    ],
    stripePriceId: 'price_rassa_thai_monthly_1960',
  },
  {
    id: 'yearly',
    name: 'RASSA Thai Yearly',
    priceFormatted: '£190.60',
    pricePence: 19060,
    period: 'year',
    popular: true,
    savingsBadge: 'Save ~20% (Pay for 10 months)',
    description: 'Best value for learners committed to real Thai-speaking confidence throughout the year.',
    features: [
      'Everything in RASSA Thai Monthly',
      'Two months completely free equivalent',
      'Uninterrupted annual access to all lessons & updates',
      'Priority access to Ninny AI updates & future Phase 2 travel previews',
      'VIP Learner Badge in community discussions',
    ],
    stripePriceId: 'price_rassa_thai_yearly_19060',
  },
];

export async function initiateStripeCheckout(tier: SubscriptionTier): Promise<boolean> {
  if (tier === 'free') {
    localStore.setSubscriptionTier('free');
    return true;
  }

  // Check if live Stripe backend endpoint is configured
  const stripeEndpoint = import.meta.env.VITE_STRIPE_CHECKOUT_ENDPOINT;
  if (stripeEndpoint) {
    try {
      const response = await fetch(stripeEndpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ tier }),
      });
      const data = await response.json();
      if (data?.url) {
        window.location.href = data.url;
        return true;
      }
    } catch (e) {
      console.warn('Live Stripe redirect error:', e);
    }
  }

  // Interactive Test Simulation Mode:
  // Instantly upgrade tier in localStore so the user can immediately experience the unlocked features
  localStore.setSubscriptionTier(tier);
  return true;
}

export function openCustomerPortal(): void {
  const portalUrl = import.meta.env.VITE_STRIPE_PORTAL_URL;
  if (portalUrl) {
    window.location.href = portalUrl;
  } else {
    alert('Stripe Customer Portal: In production, this securely redirects to Stripe to manage billing, download invoices, or cancel.');
  }
}
