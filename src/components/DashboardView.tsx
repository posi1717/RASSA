import React from 'react';
import { useApp } from '../context/AppContext';
import { CURRICULUM_CATEGORIES, LESSONS_DATABASE } from '../data/curriculum';
import { THAI_SLANG_COLLECTION, REGIONAL_PHRASES_COLLECTION } from '../data/regionalAndSlang';
import {
  Flame,
  Sparkles,
  MessageSquare,
  Bookmark,
  MapPin,
  ArrowRight,
  Crown,
  Play,
  Volume2,
} from 'lucide-react';
import { Button } from './ui/button';

export const DashboardView: React.FC = () => {
  const {
    userProfile,
    setCurrentView,
    setActiveLessonId,
    completedLessonIds,
    savedVocab,
    subscriptionTier,
    setIsSubscriptionModalOpen,
    speakThai,
  } = useApp();

  const isPaid = subscriptionTier === 'monthly' || subscriptionTier === 'yearly';

  // Find next uncompleted lesson, or default to first
  const nextLesson =
    LESSONS_DATABASE.find((l) => !completedLessonIds.includes(l.id)) || LESSONS_DATABASE[0];

  const handleStartLesson = (id: string) => {
    setActiveLessonId(id);
    setCurrentView('lesson');
  };

  // Sample quick slang for the day
  const dailySlang = THAI_SLANG_COLLECTION[0];
  const sampleRegional = REGIONAL_PHRASES_COLLECTION[4]; // Isan delicious

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-in fade-in">
      {/* Welcome Banner */}
      <div className="relative overflow-hidden bg-gradient-to-br from-[#070707] to-[#1f1f1f] text-white rounded-3xl p-6 sm:p-10 shadow-xl">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-xl">
            <div className="flex items-center gap-2 text-xs font-semibold text-[#ff3a1f] uppercase tracking-wider">
              <Sparkles className="w-4 h-4" />
              <span>Personalized Learning Portal</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-thunder tracking-tight">
              Yin-dee Dtôn-ráp, {userProfile.name}!
            </h1>
            <p className="text-sm text-neutral-300 font-manrope leading-relaxed">
              Targeting <span className="text-white font-semibold capitalize">{userProfile.learningGoal.replace('_', ' ')}</span> with{' '}
              <span className="text-[#ff3a1f] font-semibold">{userProfile.dailyTargetMinutes} minutes/day</span>. Let's build real Thai-speaking confidence.
            </p>
          </div>

          <div className="flex items-center gap-4 bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/10 shrink-0">
            <div className="text-center px-3 border-r border-white/20">
              <div className="flex items-center justify-center gap-1 text-[#ff3a1f]">
                <Flame className="w-6 h-6 fill-[#ff3a1f]" />
                <span className="text-3xl font-thunder text-white">{userProfile.streakDays}</span>
              </div>
              <span className="text-[11px] text-neutral-400 font-medium">Day Streak</span>
            </div>
            <div className="text-center px-3">
              <div className="text-3xl font-thunder text-white">{completedLessonIds.length}</div>
              <span className="text-[11px] text-neutral-400 font-medium">Completed</span>
            </div>
            <div className="text-center px-3 border-l border-white/20">
              <div className="text-3xl font-thunder text-[#f59e0b]">{savedVocab.length}</div>
              <span className="text-[11px] text-neutral-400 font-medium">Saved Words</span>
            </div>
            {!isPaid && (
              <div className="pl-3 border-l border-white/20">
                <Button
                  size="sm"
                  onClick={() => setIsSubscriptionModalOpen(true)}
                  className="bg-[#ff3a1f] hover:bg-[#d82a12] text-white text-xs rounded-xl shadow-md flex items-center gap-1.5 py-1 px-3"
                >
                  <Crown className="w-3.5 h-3.5" />
                  <span>Upgrade</span>
                </Button>
              </div>
            )}
          </div>
        </div>

        {/* Ambient decorative gradient */}
        <div className="absolute -right-20 -bottom-20 w-80 h-80 bg-[#ff3a1f]/20 rounded-full blur-3xl pointer-events-none" />
      </div>

      {/* Up Next: Recommended Lesson */}
      {nextLesson && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#e5e0d8] shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6 hover:border-[#ff3a1f] transition-all">
          <div className="space-y-2 max-w-2xl">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 text-[11px] font-bold bg-[#ff3a1f]/10 text-[#ff3a1f] rounded-full uppercase tracking-wider">
                Recommended Next Step
              </span>
              <span className="text-xs text-[#5e5e5e]">• {nextLesson.estimatedMinutes} mins</span>
              {nextLesson.isFreeTier ? (
                <span className="text-xs font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
                  Free Preview
                </span>
              ) : (
                <span className="text-xs font-semibold text-amber-600 bg-amber-50 px-2 py-0.5 rounded-full flex items-center gap-1">
                  <Crown className="w-3 h-3" /> Subscriber
                </span>
              )}
            </div>
            <h2 className="text-2xl sm:text-3xl font-thunder text-[#070707]">{nextLesson.title}</h2>
            <p className="text-sm text-[#5e5e5e]">{nextLesson.subtitle}</p>
          </div>

          <Button
            onClick={() => handleStartLesson(nextLesson.id)}
            className="bg-[#ff3a1f] hover:bg-[#d82a12] text-white px-8 py-6 rounded-2xl font-semibold shadow-md flex items-center gap-2 text-base shrink-0 group"
          >
            <Play className="w-5 h-5 fill-white group-hover:scale-110 transition-transform" />
            <span>Continue Lesson</span>
          </Button>
        </div>
      )}

      {/* Quick Launch Cards (Ninny AI, Slang & Regional, Vocab) */}
      <div className="grid md:grid-cols-3 gap-6">
        {/* Card 1: Ninny AI */}
        <div
          onClick={() => setCurrentView('tutor')}
          className="group cursor-pointer bg-white rounded-3xl p-6 border border-[#e5e0d8] shadow-sm hover:shadow-md hover:border-[#8b5cf6] transition-all flex flex-col justify-between"
        >
          <div>
            <div className="w-12 h-12 rounded-2xl bg-[#8b5cf6]/10 text-[#8b5cf6] flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <MessageSquare className="w-6 h-6" />
            </div>
            <span className="text-xs font-bold text-[#8b5cf6] uppercase tracking-wider">AI Companion</span>
            <h3 className="text-2xl font-thunder text-[#070707] mt-1 mb-2">Ninny AI Personal Tutor</h3>
            <p className="text-xs text-[#5e5e5e] leading-relaxed">
              Practise ordering street food, polish polite particles (khráp/kâ), or run realistic scenario role-plays.
            </p>
          </div>
          <div className="mt-6 flex items-center text-xs font-bold text-[#8b5cf6] group-hover:translate-x-1 transition-transform">
            <span>Open Practice Chat</span>
            <ArrowRight className="w-4 h-4 ml-1" />
          </div>
        </div>

        {/* Card 2: Regional & Slang Hub */}
        <div
          onClick={() => setCurrentView('regional-slang')}
          className="group cursor-pointer bg-white rounded-3xl p-6 border border-[#e5e0d8] shadow-sm hover:shadow-md hover:border-[#0ea5e9] transition-all flex flex-col justify-between"
        >
          <div>
            <div className="w-12 h-12 rounded-2xl bg-[#0ea5e9]/10 text-[#0ea5e9] flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <MapPin className="w-6 h-6" />
            </div>
            <span className="text-xs font-bold text-[#0ea5e9] uppercase tracking-wider">Culture & Trends</span>
            <h3 className="text-2xl font-thunder text-[#070707] mt-1 mb-2">Regional Dialects & Slang</h3>
            <p className="text-xs text-[#5e5e5e] leading-relaxed">
              Master Northern "Lam tàe-tàe", Isan "Sàep ee-lěe", Southern "Ròy jang-hûu", and Bangkok buzzwords.
            </p>
          </div>
          <div className="mt-6 flex items-center text-xs font-bold text-[#0ea5e9] group-hover:translate-x-1 transition-transform">
            <span>Explore Dialects & Slang</span>
            <ArrowRight className="w-4 h-4 ml-1" />
          </div>
        </div>

        {/* Card 3: Vocab Vault */}
        <div
          onClick={() => setCurrentView('vocab')}
          className="group cursor-pointer bg-white rounded-3xl p-6 border border-[#e5e0d8] shadow-sm hover:shadow-md hover:border-[#f59e0b] transition-all flex flex-col justify-between"
        >
          <div>
            <div className="w-12 h-12 rounded-2xl bg-[#f59e0b]/10 text-[#f59e0b] flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <Bookmark className="w-6 h-6" />
            </div>
            <span className="text-xs font-bold text-[#f59e0b] uppercase tracking-wider">Flashcard Deck</span>
            <h3 className="text-2xl font-thunder text-[#070707] mt-1 mb-2">Personal Vocab Vault</h3>
            <p className="text-xs text-[#5e5e5e] leading-relaxed">
              Review words saved from lessons with built-in pronunciation and spaced repetition drills.
            </p>
          </div>
          <div className="mt-6 flex items-center text-xs font-bold text-[#f59e0b] group-hover:translate-x-1 transition-transform">
            <span>Review {savedVocab.length} Saved Words</span>
            <ArrowRight className="w-4 h-4 ml-1" />
          </div>
        </div>
      </div>

      {/* Cultural Spotlight of the Day */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Slang Spotlight */}
        <div className="bg-gradient-to-br from-[#fcf3d9]/40 to-white rounded-3xl p-6 border border-[#e5e0d8] shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold uppercase tracking-wider text-[#ff3a1f]">Bangkok Slang Spotlight</span>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-pink-100 text-pink-700">
              {dailySlang.vibe}
            </span>
          </div>
          <div className="flex items-baseline gap-3 mb-1">
            <h4 className="text-3xl font-thunder text-[#070707]">{dailySlang.slangThai}</h4>
            <span className="text-sm font-semibold text-[#5e5e5e]">({dailySlang.slangRoman})</span>
            <button
              onClick={() => speakThai(dailySlang.slangThai)}
              className="p-1 text-[#ff3a1f] hover:bg-white rounded-full transition-colors"
              title="Listen to Thai pronunciation"
            >
              <Volume2 className="w-4 h-4" />
            </button>
          </div>
          <p className="text-xs text-[#070707] font-semibold mb-2">Meaning: {dailySlang.actualMeaning}</p>
          <p className="text-xs text-[#5e5e5e] italic mb-3">"{dailySlang.exampleThai}" ({dailySlang.exampleEnglish})</p>
          <div className="text-[11px] text-[#555] bg-white/70 p-2.5 rounded-xl border border-[#e5e0d8]">
            <span className="font-bold text-[#070707]">When to use: </span>
            {dailySlang.whenToUse}
          </div>
        </div>

        {/* Regional Spotlight */}
        <div className="bg-gradient-to-br from-cyan-50 to-white rounded-3xl p-6 border border-[#e5e0d8] shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold uppercase tracking-wider text-cyan-600">Regional Phrase Spotlight</span>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-cyan-100 text-cyan-800">
              {sampleRegional.region}
            </span>
          </div>
          <div className="flex items-baseline gap-3 mb-1">
            <h4 className="text-3xl font-thunder text-[#070707]">{sampleRegional.phraseThai}</h4>
            <span className="text-sm font-semibold text-[#5e5e5e]">({sampleRegional.phraseRoman})</span>
            <button
              onClick={() => speakThai(sampleRegional.phraseThai)}
              className="p-1 text-cyan-600 hover:bg-white rounded-full transition-colors"
              title="Listen to Thai pronunciation"
            >
              <Volume2 className="w-4 h-4" />
            </button>
          </div>
          <p className="text-xs text-[#070707] font-semibold mb-2">English: {sampleRegional.english}</p>
          <div className="text-[11px] text-[#555] bg-white/70 p-2.5 rounded-xl border border-[#e5e0d8]">
            <span className="font-bold text-[#070707]">Cultural Context: </span>
            {sampleRegional.culturalNote}
          </div>
        </div>
      </div>

      {/* Curriculum Overview (7 Areas) */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-2xl font-thunder text-[#070707]">Curriculum Pathways (Phase 1)</h3>
            <p className="text-xs text-[#5e5e5e]">Seven structured areas covering language, culture, slang, and regions.</p>
          </div>
          <Button
            variant="outline"
            onClick={() => setCurrentView('courses')}
            className="text-xs rounded-xl border-[#e5e0d8]"
          >
            View All Courses <ArrowRight className="w-3.5 h-3.5 ml-1" />
          </Button>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {CURRICULUM_CATEGORIES.map((cat) => {
            const catLessons = LESSONS_DATABASE.filter((l) => l.categoryId === cat.id);
            const completedCount = catLessons.filter((l) => completedLessonIds.includes(l.id)).length;
            const progressPercent = catLessons.length > 0 ? (completedCount / catLessons.length) * 100 : 0;

            return (
              <div
                key={cat.id}
                onClick={() => setCurrentView('courses')}
                className="cursor-pointer bg-white p-5 rounded-2xl border border-[#e5e0d8] shadow-sm hover:border-[#070707] transition-all"
              >
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-bold text-sm text-[#070707]">{cat.name}</h4>
                  <span className="text-[11px] text-[#5e5e5e] font-medium">
                    {completedCount}/{catLessons.length} Done
                  </span>
                </div>
                <p className="text-xs text-[#5e5e5e] line-clamp-2 mb-3">{cat.description}</p>
                <div className="w-full bg-[#f0ede8] h-1.5 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-[#ff3a1f] transition-all duration-500"
                    style={{ width: `${progressPercent}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
