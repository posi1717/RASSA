import React, { createContext, useContext, useState, useEffect } from 'react';
import type { UserProfile, SubscriptionTier, Lesson } from '../types/rassa';
import { localStore, type SavedVocabItem } from '../lib/supabase';
import { supabase } from '../lib/supabase';
import type { User } from '@supabase/supabase-js';
import { LESSONS_DATABASE } from '../data/curriculum';

export type AppView =
  | 'landing'
  | 'dashboard'
  | 'courses'
  | 'lesson'
  | 'tutor'
  | 'regional-slang'
  | 'vocab'
  | 'billing';

interface AppContextType {
  currentView: AppView;
  setCurrentView: (view: AppView) => void;
  activeLessonId: string | null;
  setActiveLessonId: (id: string | null) => void;
  activeLesson: Lesson | undefined;
  userProfile: UserProfile;
  updateUserProfile: (updates: Partial<UserProfile>) => void;
  subscriptionTier: SubscriptionTier;
  setSubscriptionTier: (tier: SubscriptionTier) => void;
  completedLessonIds: string[];
  markLessonComplete: (lessonId: string) => void;
  savedVocab: SavedVocabItem[];
  toggleSaveVocab: (item: SavedVocabItem) => void;
  isVocabSaved: (id: string) => boolean;
  aiMessageCount: number;
  incrementAIMessageCount: () => number;
  canUseNinnyAI: boolean;
  canAccessLesson: (lesson: Lesson) => boolean;
  isSubscriptionModalOpen: boolean;
  setIsSubscriptionModalOpen: (open: boolean) => void;
  isOnboardingModalOpen: boolean;
  setIsOnboardingModalOpen: (open: boolean) => void;
  isFeedbackModalOpen: boolean;
  setIsFeedbackModalOpen: (open: boolean) => void;
  speakThai: (text: string) => void;
  speakEnglish: (text: string) => void;
  authUser: User | null;
  isAuthModalOpen: boolean;
  setIsAuthModalOpen: (open: boolean) => void;
  signOut: () => Promise<void>;
}

const DEFAULT_PROFILE: UserProfile = {
  id: 'guest-learner-1',
  name: 'Learner',
  email: 'learner@rassa.uk',
  nativeLanguage: 'English',
  thaiLevel: 'beginner',
  learningGoal: 'travel',
  dailyTargetMinutes: 15,
  subscriptionTier: 'free',
  streakDays: 3,
  lastActiveDate: new Date().toISOString(),
  completedLessonIds: [],
  savedVocabIds: [],
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentView, setCurrentView] = useState<AppView>('landing');
  const [activeLessonId, setActiveLessonId] = useState<string | null>(null);
  const [subscriptionTier, setSubscriptionTierState] = useState<SubscriptionTier>(() =>
    localStore.getSubscriptionTier()
  );
  const [completedLessonIds, setCompletedLessonIds] = useState<string[]>(() =>
    localStore.getCompletedLessons()
  );
  const [savedVocab, setSavedVocab] = useState<SavedVocabItem[]>(() => localStore.getSavedVocab());
  const [userProfile, setUserProfile] = useState<UserProfile>(() => {
    return localStore.getProfile() || DEFAULT_PROFILE;
  });
  const [aiMessageCount, setAIMessageCount] = useState<number>(() =>
    localStore.getAIMessageCount()
  );

  const [isSubscriptionModalOpen, setIsSubscriptionModalOpen] = useState(false);
  const [isOnboardingModalOpen, setIsOnboardingModalOpen] = useState(false);
  const [isFeedbackModalOpen, setIsFeedbackModalOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authUser, setAuthUser] = useState<User | null>(null);

  useEffect(() => {
    if (!supabase) return;
    void supabase.auth.getUser().then(({ data }) => setAuthUser(data.user));
    const { data } = supabase.auth.onAuthStateChange((_event, session) => {
      setAuthUser(session?.user ?? null);
    });
    return () => data.subscription.unsubscribe();
  }, []);

  const signOut = async () => {
    if (!supabase) return;
    await supabase.auth.signOut();
    setAuthUser(null);
  };

  useEffect(() => {
    localStore.setSubscriptionTier(subscriptionTier);
  }, [subscriptionTier]);

  const setSubscriptionTier = (tier: SubscriptionTier) => {
    setSubscriptionTierState(tier);
    localStore.setSubscriptionTier(tier);
    updateUserProfile({ subscriptionTier: tier });
  };

  const updateUserProfile = (updates: Partial<UserProfile>) => {
    setUserProfile((prev) => {
      const next = { ...prev, ...updates };
      localStore.saveProfile(next);
      return next;
    });
  };

  const markLessonComplete = (lessonId: string) => {
    const updated = localStore.addCompletedLesson(lessonId);
    setCompletedLessonIds([...updated]);
    updateUserProfile({ completedLessonIds: updated });
  };

  const toggleSaveVocab = (item: SavedVocabItem) => {
    const updated = localStore.saveVocabItem(item);
    setSavedVocab([...updated]);
  };

  const isVocabSaved = (id: string) => {
    return savedVocab.some((v) => v.id === id);
  };

  const incrementAIMessage = () => {
    const count = localStore.incrementAIMessageCount();
    setAIMessageCount(count);
    return count;
  };

  const isPaidSubscriber = subscriptionTier === 'monthly' || subscriptionTier === 'yearly';

  // Free tier has 5 preview messages
  const canUseNinnyAI = isPaidSubscriber || aiMessageCount < 5;

  const canAccessLesson = (lesson: Lesson) => {
    if (isPaidSubscriber) return true;
    return lesson.isFreeTier;
  };

  const activeLesson = LESSONS_DATABASE.find((l) => l.id === activeLessonId);

  // Audio pronunciation helper using Web Speech API (with graceful fallback)
  const speakThai = (text: string) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'th-TH';
      utterance.rate = 0.9;
      utterance.pitch = 1.05;

      const voices = window.speechSynthesis.getVoices();
      const thaiVoices = voices.filter((voice) => voice.lang.toLowerCase().startsWith('th'));
      const femaleVoice = thaiVoices.find((voice) =>
        /female|woman|premwada|kanya|nattaya|google/i.test(voice.name)
      );
      utterance.voice = femaleVoice || thaiVoices[0] || voices.find((voice) => voice.lang.startsWith('en')) || null;
      window.speechSynthesis.speak(utterance);
    }
  };

  const speakEnglish = (text: string) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'en-GB';
      utterance.rate = 0.94;
      utterance.pitch = 1.04;

      const voices = window.speechSynthesis.getVoices();
      const EnglishVoices = voices.filter((voice) => /^en(-|_)/i.test(voice.lang));
      const femaleVoice = EnglishVoices.find((voice) =>
        /female|woman|susan|samantha|sara|libby|hazel|google uk english/i.test(voice.name)
      );
      utterance.voice = femaleVoice || EnglishVoices.find((voice) => /GB|UK/i.test(voice.lang)) || EnglishVoices[0] || null;
      window.speechSynthesis.speak(utterance);
    }
  };

  return (
    <AppContext.Provider
      value={{
        currentView,
        setCurrentView,
        activeLessonId,
        setActiveLessonId,
        activeLesson,
        userProfile,
        updateUserProfile,
        subscriptionTier,
        setSubscriptionTier,
        completedLessonIds,
        markLessonComplete,
        savedVocab,
        toggleSaveVocab,
        isVocabSaved,
        aiMessageCount,
        incrementAIMessageCount: incrementAIMessage,
        canUseNinnyAI,
        canAccessLesson,
        isSubscriptionModalOpen,
        setIsSubscriptionModalOpen,
        isOnboardingModalOpen,
        setIsOnboardingModalOpen,
        isFeedbackModalOpen,
        setIsFeedbackModalOpen,
        speakThai,
        speakEnglish,
        authUser,
        isAuthModalOpen,
        setIsAuthModalOpen,
        signOut,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
