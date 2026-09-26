import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

export const isSupabaseConfigured = Boolean(supabaseUrl && supabaseAnonKey);

export const supabase = isSupabaseConfigured
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

/**
 * Local storage fallback keys for offline/demo operation
 */
const STORAGE_KEYS = {
  PROFILE: 'rassa_user_profile',
  PROGRESS: 'rassa_completed_lessons',
  SAVED_VOCAB: 'rassa_vocab_vault',
  STREAK: 'rassa_streak_info',
  SUBSCRIPTION: 'rassa_subscription_tier',
  AI_QUOTA: 'rassa_ai_message_count',
};

export const localStore = {
  getProfile: () => {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.PROFILE);
      return data ? JSON.parse(data) : null;
    } catch {
      return null;
    }
  },
  saveProfile: (profile: any) => {
    localStorage.setItem(STORAGE_KEYS.PROFILE, JSON.stringify(profile));
  },
  getCompletedLessons: (): string[] => {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.PROGRESS);
      return data ? JSON.parse(data) : [];
    } catch {
      return [];
    }
  },
  addCompletedLesson: (lessonId: string): string[] => {
    const list = localStore.getCompletedLessons();
    if (!list.includes(lessonId)) {
      list.push(lessonId);
      localStorage.setItem(STORAGE_KEYS.PROGRESS, JSON.stringify(list));
    }
    return list;
  },
  getSavedVocab: (): any[] => {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.SAVED_VOCAB);
      return data ? JSON.parse(data) : [];
    } catch {
      return [];
    }
  },
  saveVocabItem: (item: any): any[] => {
    const list = localStore.getSavedVocab();
    const existing = list.findIndex((i: any) => i.id === item.id);
    if (existing >= 0) {
      list.splice(existing, 1);
    } else {
      list.unshift(item);
    }
    localStorage.setItem(STORAGE_KEYS.SAVED_VOCAB, JSON.stringify(list));
    return list;
  },
  getSubscriptionTier: (): 'free' | 'monthly' | 'yearly' => {
    return (localStorage.getItem(STORAGE_KEYS.SUBSCRIPTION) as any) || 'free';
  },
  setSubscriptionTier: (tier: 'free' | 'monthly' | 'yearly') => {
    localStorage.setItem(STORAGE_KEYS.SUBSCRIPTION, tier);
  },
  getAIMessageCount: (): number => {
    const val = localStorage.getItem(STORAGE_KEYS.AI_QUOTA);
    return val ? parseInt(val, 10) : 0;
  },
  incrementAIMessageCount: (): number => {
    const current = localStore.getAIMessageCount();
    const next = current + 1;
    localStorage.setItem(STORAGE_KEYS.AI_QUOTA, next.toString());
    return next;
  },
  resetAIMessageCount: () => {
    localStorage.setItem(STORAGE_KEYS.AI_QUOTA, '0');
  },
};
