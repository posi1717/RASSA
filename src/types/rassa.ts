export type SubscriptionTier = 'free' | 'monthly' | 'yearly';

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  nativeLanguage: string;
  thaiLevel: 'beginner' | 'elementary' | 'intermediate';
  learningGoal: 'travel' | 'daily_life' | 'business' | 'culture' | 'relationships';
  dailyTargetMinutes: number;
  subscriptionTier: SubscriptionTier;
  subscriptionActiveUntil?: string;
  streakDays: number;
  lastActiveDate: string;
  completedLessonIds: string[];
  savedVocabIds: string[];
}

export type CurriculumCategory =
  | 'foundations'
  | 'conversation'
  | 'travel'
  | 'daily_life'
  | 'culture_politeness'
  | 'slang'
  | 'regional';

export interface QuizOption {
  id: string;
  text: string;
  isCorrect: boolean;
  explanation: string;
}

export interface QuizQuestion {
  id: string;
  question: string;
  thaiScript?: string;
  romanization?: string;
  options: QuizOption[];
}

export interface LessonStep {
  id: string;
  title: string;
  thaiScript?: string;
  romanization?: string;
  literalEnglish?: string;
  naturalEnglish: string;
  toneInfo?: string;
  audioText?: string;
  breakdown?: {
    thai: string;
    roman: string;
    meaning: string;
  }[];
  culturalTip?: string;
  politeVariant?: {
    male: string;
    female: string;
  };
}

export interface Lesson {
  id: string;
  categoryId: CurriculumCategory;
  categoryName: string;
  title: string;
  subtitle: string;
  estimatedMinutes: number;
  level: 'Beginner' | 'Elementary' | 'Intermediate';
  isFreeTier: boolean;
  steps: LessonStep[];
  quiz: QuizQuestion[];
}

export interface SlangItem {
  id: string;
  slangThai: string;
  slangRoman: string;
  literalMeaning: string;
  actualMeaning: string;
  vibe: 'Fun & Trendy' | 'Dramatic' | 'Praise' | 'Chat Slang';
  exampleThai: string;
  exampleRoman: string;
  exampleEnglish: string;
  whenToUse: string;
  whenNotToUse: string;
}

export interface RegionalPhrase {
  id: string;
  region: 'Northern (คำเมือง)' | 'Isan (ภาษาอีสาน)' | 'Southern (ภาษาใต้)';
  phraseThai: string;
  phraseRoman: string;
  standardThai: string;
  standardRoman: string;
  english: string;
  culturalNote: string;
  audioPronunciationText: string;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'ninny';
  timestamp: string;
  content: string;
  breakdown?: {
    thai: string;
    roman: string;
    english: string;
    toneNotes?: string;
    politeParticleNote?: string;
  };
  audioText?: string;
}

export interface RolePlayScenario {
  id: string;
  title: string;
  location: string;
  difficulty: 'Easy' | 'Medium' | 'Challenge';
  description: string;
  starterPrompt: string;
  suggestedPhrases: {
    thai: string;
    roman: string;
    english: string;
  }[];
}
