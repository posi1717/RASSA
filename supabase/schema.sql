-- ==============================================================================
-- RASSA Platform: Supabase PostgreSQL Schema with Row Level Security (RLS)
-- Phase 1: Practical Thai Language Learning Launch (London, UK)
-- ==============================================================================

-- 1. Profiles Table
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID REFERENCES auth.users ON DELETE CASCADE PRIMARY KEY,
  full_name TEXT,
  email TEXT UNIQUE,
  native_language TEXT DEFAULT 'English',
  thai_level TEXT DEFAULT 'beginner', -- 'beginner' | 'elementary' | 'intermediate'
  learning_goal TEXT DEFAULT 'travel', -- 'travel' | 'daily_life' | 'business' | 'culture'
  subscription_tier TEXT DEFAULT 'free', -- 'free' | 'monthly' | 'yearly'
  stripe_customer_id TEXT,
  stripe_subscription_id TEXT,
  subscription_active BOOLEAN DEFAULT false,
  streak_days INTEGER DEFAULT 1,
  last_active_at TIMESTAMPTZ DEFAULT NOW(),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can read own profile"
  ON public.profiles FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Users can update own profile"
  ON public.profiles FOR UPDATE
  USING (auth.uid() = id);

-- 2. User Lesson Progress Table
CREATE TABLE IF NOT EXISTS public.user_progress (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users ON DELETE CASCADE NOT NULL,
  lesson_id TEXT NOT NULL,
  completed BOOLEAN DEFAULT false,
  score INTEGER DEFAULT 100,
  completed_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE (user_id, lesson_id)
);

ALTER TABLE public.user_progress ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users manage own progress"
  ON public.user_progress FOR ALL
  USING (auth.uid() = id);

-- 3. Vocab Vault (Saved Words & Phrases)
CREATE TABLE IF NOT EXISTS public.vocab_vault (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users ON DELETE CASCADE NOT NULL,
  thai_script TEXT NOT NULL,
  romanization TEXT NOT NULL,
  english TEXT NOT NULL,
  category TEXT DEFAULT 'general',
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.vocab_vault ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users manage own vocab"
  ON public.vocab_vault FOR ALL
  USING (auth.uid() = id);

-- 4. Ninny AI Chat History
CREATE TABLE IF NOT EXISTS public.chat_messages (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users ON DELETE CASCADE NOT NULL,
  role TEXT NOT NULL, -- 'user' | 'assistant'
  content TEXT NOT NULL,
  breakdown JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.chat_messages ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users access own chat history"
  ON public.chat_messages FOR ALL
  USING (auth.uid() = id);
