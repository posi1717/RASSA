import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  Volume2,
  Bookmark,
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  Sparkles,
  Lightbulb,
  XCircle,
  MessageSquare,
  Send,
} from 'lucide-react';
import { Button } from './ui/button';
import { askNinnyAI } from '../services/ninnyAi';

export const LessonPlayerView: React.FC = () => {
  const {
    activeLesson,
    setCurrentView,
    markLessonComplete,
    toggleSaveVocab,
    isVocabSaved,
    speakThai,
  } = useApp();

  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, string>>({});

  // Mini Ninny AI in-lesson question state
  const [miniPrompt, setMiniPrompt] = useState('');
  const [miniReply, setMiniReply] = useState<string | null>(null);
  const [isMiniLoading, setIsMiniLoading] = useState(false);

  if (!activeLesson) {
    return (
      <div className="max-w-xl mx-auto py-20 text-center space-y-4">
        <h2 className="text-3xl font-thunder">No Active Lesson Selected</h2>
        <Button onClick={() => setCurrentView('courses')}>Browse Course Catalogue</Button>
      </div>
    );
  }

  const totalSteps = activeLesson.steps.length;
  const isQuizStage = currentStepIndex >= totalSteps;
  const currentStep = activeLesson.steps[currentStepIndex];

  const handleNext = () => {
    if (currentStepIndex < totalSteps) {
      setCurrentStepIndex(currentStepIndex + 1);
    } else {
      // Completed lesson
      markLessonComplete(activeLesson.id);
      setCurrentView('dashboard');
    }
  };

  const handlePrev = () => {
    if (currentStepIndex > 0) {
      setCurrentStepIndex(currentStepIndex - 1);
    }
  };

  const handleAnswerSelect = (questionId: string, optionId: string) => {
    setSelectedAnswers((prev) => ({ ...prev, [questionId]: optionId }));
  };

  const handleAskMiniNinny = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!miniPrompt.trim() || isMiniLoading) return;
    setIsMiniLoading(true);
    setMiniReply(null);
    try {
      const res = await askNinnyAI(
        `In lesson "${activeLesson.title}": ${miniPrompt}`,
        []
      );
      setMiniReply(res.text);
    } catch {
      setMiniReply('Could not connect to Ninny AI right now. Please try again.');
    } finally {
      setIsMiniLoading(false);
      setMiniPrompt('');
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 space-y-6 animate-in fade-in">
      {/* Top Bar Navigation */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => setCurrentView('courses')}
          className="flex items-center gap-1.5 text-xs font-semibold text-[#5e5e5e] hover:text-[#070707] transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Catalogue</span>
        </button>

        <span className="text-xs font-bold text-[#ff3a1f] uppercase tracking-wider">
          {activeLesson.categoryName}
        </span>
      </div>

      {/* Progress Stepper */}
      <div className="space-y-2">
        <div className="flex justify-between items-center text-xs text-[#5e5e5e]">
          <span className="font-semibold text-[#070707]">{activeLesson.title}</span>
          <span>
            {isQuizStage ? 'Knowledge Check' : `Step ${currentStepIndex + 1} of ${totalSteps}`}
          </span>
        </div>
        <div className="w-full bg-[#e5e0d8] h-2 rounded-full overflow-hidden flex">
          {Array.from({ length: totalSteps + 1 }).map((_, i) => (
            <div
              key={i}
              className={`h-full flex-1 border-r border-white/50 transition-all duration-300 ${
                i <= currentStepIndex ? 'bg-[#ff3a1f]' : 'bg-transparent'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Step Content Card */}
      {!isQuizStage ? (
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-[#e5e0d8] shadow-md space-y-8">
          {/* Main Phrase Showcase */}
          <div className="space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-[#ff3a1f]">
              {currentStep.title}
            </span>

            {currentStep.thaiScript && (
              <div className="flex flex-wrap items-center gap-4">
                <h2 className="text-4xl sm:text-5xl font-thunder tracking-wide text-[#070707]">
                  {currentStep.thaiScript}
                </h2>
                <button
                  onClick={() => speakThai(currentStep.thaiScript || '')}
                  className="p-3 bg-[#f0ede8] hover:bg-[#ff3a1f] hover:text-white rounded-2xl text-[#070707] transition-all"
                  title="Listen to native Thai pronunciation"
                >
                  <Volume2 className="w-5 h-5" />
                </button>
                <button
                  onClick={() =>
                    toggleSaveVocab({
                      id: currentStep.id,
                      thai: currentStep.thaiScript,
                      roman: currentStep.romanization,
                      english: currentStep.naturalEnglish,
                      category: activeLesson.categoryName,
                    })
                  }
                  className={`p-3 rounded-2xl border transition-all ${
                    isVocabSaved(currentStep.id)
                      ? 'bg-amber-100 border-amber-300 text-amber-700'
                      : 'bg-white border-[#e5e0d8] text-[#5e5e5e] hover:border-[#070707]'
                  }`}
                  title="Save word to Vocab Vault"
                >
                  <Bookmark className="w-5 h-5" />
                </button>
              </div>
            )}

            {currentStep.romanization && (
              <p className="text-lg font-semibold text-[#ff3a1f]">
                {currentStep.romanization}
              </p>
            )}

            <p className="text-base sm:text-lg text-[#333] font-medium">
              "{currentStep.naturalEnglish}"
            </p>

            {currentStep.toneInfo && (
              <div className="inline-block px-3 py-1 bg-[#f0ede8] rounded-xl text-xs font-semibold text-[#5e5e5e]">
                Tone Contour: <span className="text-[#070707]">{currentStep.toneInfo}</span>
              </div>
            )}
          </div>

          {/* Word-by-word Breakdown Table */}
          {currentStep.breakdown && currentStep.breakdown.length > 0 && (
            <div className="space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#070707]">
                Word-by-Word Breakdown
              </h4>
              <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-3">
                {currentStep.breakdown.map((part, idx) => (
                  <div key={idx} className="p-3 bg-[#faf8f5] rounded-xl border border-[#e5e0d8]">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-sm text-[#070707]">{part.thai}</span>
                      <button
                        onClick={() => speakThai(part.thai)}
                        className="text-[#ff3a1f] p-1 hover:bg-white rounded-lg transition-colors"
                      >
                        <Volume2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                    <div className="text-xs font-semibold text-[#ff3a1f] mt-0.5">{part.roman}</div>
                    <div className="text-xs text-[#5e5e5e] mt-1">{part.meaning}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Cultural Tip Box */}
          {currentStep.culturalTip && (
            <div className="p-4 sm:p-5 bg-gradient-to-r from-amber-500/10 to-orange-500/10 rounded-2xl border border-amber-300/40 flex items-start gap-3">
              <Lightbulb className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
              <div className="text-xs sm:text-sm text-neutral-800 leading-relaxed">
                <span className="font-bold text-[#070707]">Cultural & Politeness Etiquette: </span>
                {currentStep.culturalTip}
              </div>
            </div>
          )}

          {/* Mini Ninny AI In-Lesson Assistant */}
          <div className="pt-4 border-t border-[#f0ede8] space-y-3">
            <div className="flex items-center gap-2 text-xs font-bold text-[#8b5cf6] uppercase tracking-wider">
              <Sparkles className="w-4 h-4" />
              <span>Ask Ninny AI about this phrase</span>
            </div>
            <form onSubmit={handleAskMiniNinny} className="flex gap-2">
              <input
                type="text"
                value={miniPrompt}
                onChange={(e) => setMiniPrompt(e.target.value)}
                placeholder="e.g. Can I use this in an email? or Why do we say ná here?"
                className="flex-1 px-4 py-2.5 bg-[#faf8f5] border border-[#e5e0d8] rounded-xl text-xs sm:text-sm focus:outline-none focus:border-[#8b5cf6]"
              />
              <Button
                type="submit"
                disabled={isMiniLoading}
                className="bg-[#8b5cf6] hover:bg-[#7c3aed] text-white px-4 py-2.5 rounded-xl text-xs font-semibold"
              >
                {isMiniLoading ? 'Thinking...' : <Send className="w-4 h-4" />}
              </Button>
            </form>

            {miniReply && (
              <div className="p-4 bg-purple-50 rounded-2xl border border-purple-200 text-xs sm:text-sm text-purple-950 space-y-1">
                <div className="font-bold flex items-center gap-1.5 text-purple-800">
                  <MessageSquare className="w-3.5 h-3.5" /> Ninny AI explanation:
                </div>
                <div className="whitespace-pre-line leading-relaxed">{miniReply}</div>
              </div>
            )}
          </div>
        </div>
      ) : (
        /* Quiz Stage */
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-[#e5e0d8] shadow-md space-y-8">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-[#10b981]">
              Knowledge Check
            </span>
            <h2 className="text-3xl font-thunder text-[#070707] mt-1">Let's verify your confidence</h2>
            <p className="text-xs text-[#5e5e5e]">Select the most contextually and culturally accurate answers.</p>
          </div>

          <div className="space-y-6">
            {activeLesson.quiz.map((q, qIdx) => (
              <div key={q.id} className="p-5 bg-[#faf8f5] rounded-2xl border border-[#e5e0d8] space-y-3">
                <div className="font-semibold text-sm text-[#070707]">
                  {qIdx + 1}. {q.question}
                </div>
                <div className="space-y-2">
                  {q.options.map((opt) => {
                    const isSelected = selectedAnswers[q.id] === opt.id;
                    return (
                      <button
                        key={opt.id}
                        onClick={() => handleAnswerSelect(q.id, opt.id)}
                        className={`w-full text-left p-3.5 rounded-xl border text-xs sm:text-sm font-medium transition-all ${
                          isSelected
                            ? opt.isCorrect
                              ? 'bg-emerald-50 border-emerald-500 text-emerald-900'
                              : 'bg-rose-50 border-rose-500 text-rose-900'
                            : 'bg-white border-[#e5e0d8] hover:border-[#070707]'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span>{opt.text}</span>
                          {isSelected && (
                            <span>
                              {opt.isCorrect ? (
                                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                              ) : (
                                <XCircle className="w-4 h-4 text-rose-600" />
                              )}
                            </span>
                          )}
                        </div>
                        {isSelected && (
                          <div className="text-xs mt-2 pt-2 border-t border-black/10 opacity-90">
                            {opt.explanation}
                          </div>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Navigation Buttons Footer */}
      <div className="flex items-center justify-between pt-2">
        <Button
          variant="outline"
          onClick={handlePrev}
          disabled={currentStepIndex === 0}
          className="rounded-xl border-[#e5e0d8] text-xs"
        >
          Previous Step
        </Button>

        <Button
          onClick={handleNext}
          className="bg-[#070707] hover:bg-[#ff3a1f] text-white px-6 py-5 rounded-xl text-xs font-semibold shadow-md flex items-center gap-2"
        >
          <span>{isQuizStage ? 'Complete Lesson & Save Progress' : 'Next Step'}</span>
          <ArrowRight className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
};
