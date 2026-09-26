import React, { createContext, useContext, useState, useEffect } from 'react';
import type { UserProfile, SubscriptionTier, Lesson } from '../types/rassa';
import { localStore } from '../lib/supabase';
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
  savedVocab: any[];
  toggleSaveVocab: (item: any) => void;
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
  const [savedVocab, setSavedVocab] = useState<any[]>(() => localStore.getSavedVocab());
  const [userProfile, setUserProfile] = useState<UserProfile>(() => {
    return localStore.getProfile() || DEFAULT_PROFILE;
  });
  const [aiMessageCount, setAIMessageCount] = useState<number>(() =>
    localStore.getAIMessageCount()
  );

  const [isSubscriptionModalOpen, setIsSubscriptionModalOpen] = useState(false);
  const [isOnboardingModalOpen, setIsOnboardingModalOpen] = useState(false);
  const [isFeedbackModalOpen, setIsFeedbackModalOpen] = useState(false);

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

  const toggleSaveVocab = (item: any) => {
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
      utterance.rate = 0.85; // Slightly slower for clear pedagogical listening
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
