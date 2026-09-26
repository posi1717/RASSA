import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { CURRICULUM_CATEGORIES, LESSONS_DATABASE } from '../data/curriculum';
import type { CurriculumCategory, Lesson } from '../types/rassa';
import {
  Lock,
  Play,
  CheckCircle2,
  Clock,
  Crown,
  BookOpen,
} from 'lucide-react';
import { Button } from './ui/button';

export const CourseCatalogView: React.FC = () => {
  const {
    completedLessonIds,
    canAccessLesson,
    setActiveLessonId,
    setCurrentView,
    setIsSubscriptionModalOpen,
  } = useApp();

  const [selectedCategory, setSelectedCategory] = useState<CurriculumCategory | 'all'>('all');

  const filteredLessons =
    selectedCategory === 'all'
      ? LESSONS_DATABASE
      : LESSONS_DATABASE.filter((l) => l.categoryId === selectedCategory);

  const handleLessonClick = (lesson: Lesson) => {
    if (canAccessLesson(lesson)) {
      setActiveLessonId(lesson.id);
      setCurrentView('lesson');
    } else {
      setIsSubscriptionModalOpen(true);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-in fade-in">
      {/* Header */}
      <div className="max-w-2xl space-y-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#ff3a1f]/10 text-[#ff3a1f] text-xs font-semibold rounded-full uppercase tracking-wider">
          <BookOpen className="w-3.5 h-3.5" />
          <span>Curriculum Catalogue</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-thunder tracking-tight text-[#070707]">
          Structured Pathways for Real-Life Thai
        </h1>
        <p className="text-sm text-[#5e5e5e] font-manrope">
          Progress from foundational sounds and polite particles to street market banter, authentic regional dialects, and modern slang.
        </p>
      </div>

      {/* Category Pills Filter */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        <button
          onClick={() => setSelectedCategory('all')}
          className={`px-4 py-2 rounded-xl text-xs font-semibold shrink-0 transition-all ${
            selectedCategory === 'all'
              ? 'bg-[#070707] text-white shadow-sm'
              : 'bg-white border border-[#e5e0d8] text-[#5e5e5e] hover:border-[#070707]'
          }`}
        >
          All Pathways ({LESSONS_DATABASE.length})
        </button>
        {CURRICULUM_CATEGORIES.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setSelectedCategory(cat.id)}
            className={`px-4 py-2 rounded-xl text-xs font-semibold shrink-0 transition-all ${
              selectedCategory === cat.id
                ? 'bg-[#070707] text-white shadow-sm'
                : 'bg-white border border-[#e5e0d8] text-[#5e5e5e] hover:border-[#070707]'
            }`}
          >
            {cat.name}
          </button>
        ))}
      </div>

      {/* Lessons Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredLessons.map((lesson) => {
          const isCompleted = completedLessonIds.includes(lesson.id);
          const hasAccess = canAccessLesson(lesson);

          return (
            <div
              key={lesson.id}
              onClick={() => handleLessonClick(lesson)}
              className={`group cursor-pointer bg-white rounded-3xl p-6 border transition-all duration-300 flex flex-col justify-between ${
                hasAccess
                  ? 'border-[#e5e0d8] hover:border-[#ff3a1f] hover:shadow-lg'
                  : 'border-[#e5e0d8] bg-white/70 hover:border-amber-400'
              }`}
            >
              <div>
                {/* Header tags */}
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[#ff3a1f]">
                    {lesson.categoryName}
                  </span>
                  <div className="flex items-center gap-1.5">
                    {isCompleted ? (
                      <span className="flex items-center gap-1 text-[11px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
                        <CheckCircle2 className="w-3.5 h-3.5" /> Completed
                      </span>
                    ) : lesson.isFreeTier ? (
                      <span className="text-[11px] font-bold text-emerald-600 bg-emerald-50 px-2.5 py-0.5 rounded-full">
                        Free Preview
                      </span>
                    ) : (
                      <span className="flex items-center gap-1 text-[11px] font-bold text-amber-700 bg-amber-50 px-2.5 py-0.5 rounded-full">
                        <Crown className="w-3 h-3 text-amber-600" /> Subscribers
                      </span>
                    )}
                  </div>
                </div>

                <h3 className="text-2xl font-thunder text-[#070707] group-hover:text-[#ff3a1f] transition-colors mb-2">
                  {lesson.title}
                </h3>
                <p className="text-xs text-[#5e5e5e] line-clamp-2 mb-4 leading-relaxed">
                  {lesson.subtitle}
                </p>
              </div>

              <div>
                {/* Steps count & Estimated time */}
                <div className="flex items-center justify-between text-xs text-[#777] pt-4 border-t border-[#f0ede8] mb-4">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" />
                    {lesson.estimatedMinutes} mins
                  </span>
                  <span>{lesson.steps.length} interactive steps</span>
                  <span>{lesson.level}</span>
                </div>

                {/* Action button */}
                <Button
                  className={`w-full py-5 rounded-xl font-semibold text-xs flex items-center justify-center gap-2 transition-all ${
                    hasAccess
                      ? 'bg-[#070707] group-hover:bg-[#ff3a1f] text-white shadow-sm'
                      : 'bg-amber-500 hover:bg-amber-600 text-white'
                  }`}
                >
                  {hasAccess ? (
                    <>
                      <Play className="w-4 h-4 fill-white" />
                      <span>{isCompleted ? 'Review Lesson' : 'Start Lesson'}</span>
                    </>
                  ) : (
                    <>
                      <Lock className="w-4 h-4" />
                      <span>Unlock with Membership (£19.60/mo)</span>
                    </>
                  )}
                </Button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
