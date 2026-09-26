import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { X, Sparkles, Check, ArrowRight } from 'lucide-react';
import { Button } from './ui/button';

export const OnboardingModal: React.FC = () => {
  const { isOnboardingModalOpen, setIsOnboardingModalOpen, updateUserProfile, setCurrentView } = useApp();

  const [step, setStep] = useState(1);
  const [name, setName] = useState('');
  const [thaiLevel, setThaiLevel] = useState<'beginner' | 'elementary' | 'intermediate'>('beginner');
  const [goal, setGoal] = useState<'travel' | 'daily_life' | 'business' | 'culture' | 'relationships'>('travel');
  const [dailyMinutes, setDailyMinutes] = useState(15);

  if (!isOnboardingModalOpen) return null;

  const handleFinish = () => {
    updateUserProfile({
      name: name.trim() || 'Fellow Learner',
      thaiLevel,
      learningGoal: goal,
      dailyTargetMinutes: dailyMinutes,
    });
    setIsOnboardingModalOpen(false);
    setCurrentView('dashboard');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in">
      <div className="relative w-full max-w-xl bg-[#faf8f5] rounded-3xl border border-[#e5e0d8] shadow-2xl p-6 sm:p-10 text-[#070707]">
        {/* Close Button */}
        <button
          onClick={() => setIsOnboardingModalOpen(false)}
          className="absolute top-6 right-6 p-2 text-[#5e5e5e] hover:text-[#070707] hover:bg-[#eadecc] rounded-full transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Step Indicator */}
        <div className="flex items-center gap-2 mb-6">
          {[1, 2, 3].map((s) => (
            <div
              key={s}
              className={`h-1.5 flex-1 rounded-full transition-all ${
                s <= step ? 'bg-[#ff3a1f]' : 'bg-[#e5e0d8]'
              }`}
            />
          ))}
        </div>

        {/* Step 1: Name & Current Level */}
        {step === 1 && (
          <div className="space-y-6">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#ff3a1f]">Step 1 of 3</span>
              <h2 className="text-2xl sm:text-3xl font-thunder mt-1">Welcome to RASSA! What should we call you?</h2>
              <p className="text-sm text-[#5e5e5e] mt-1">Ninny AI will personalize your lessons and daily exercises.</p>
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#070707] mb-1">Your Name or Nickname</label>
              <input
                type="text"
                placeholder="e.g. Liam, Sarah, James"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-3 bg-white border border-[#e5e0d8] rounded-xl text-sm focus:outline-none focus:border-[#ff3a1f]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#070707] mb-2">What is your current Thai level?</label>
              <div className="space-y-2">
                {[
                  { id: 'beginner', title: 'Complete Beginner', desc: 'Starting from scratch (zero Thai knowledge)' },
                  { id: 'elementary', title: 'Know a Few Words', desc: 'Can say Sawasdee and order simple drinks' },
                  { id: 'intermediate', title: 'Conversation Practice', desc: 'Understand basics, want natural fluency and slang' },
                ].map((lvl) => (
                  <button
                    key={lvl.id}
                    type="button"
                    onClick={() => setThaiLevel(lvl.id as any)}
                    className={`w-full text-left p-3.5 rounded-xl border transition-all flex items-center justify-between ${
                      thaiLevel === lvl.id
                        ? 'bg-white border-[#ff3a1f] shadow-sm'
                        : 'bg-white/50 border-[#e5e0d8] hover:bg-white'
                    }`}
                  >
                    <div>
                      <div className="font-semibold text-sm text-[#070707]">{lvl.title}</div>
                      <div className="text-xs text-[#5e5e5e]">{lvl.desc}</div>
                    </div>
                    {thaiLevel === lvl.id && <Check className="w-4 h-4 text-[#ff3a1f]" />}
                  </button>
                ))}
              </div>
            </div>

            <Button
              onClick={() => setStep(2)}
              className="w-full py-5 bg-[#070707] hover:bg-[#ff3a1f] text-white rounded-xl font-semibold flex items-center justify-center gap-2"
            >
              Continue to Goals <ArrowRight className="w-4 h-4" />
            </Button>
          </div>
        )}

        {/* Step 2: Learning Goal */}
        {step === 2 && (
          <div className="space-y-6">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#ff3a1f]">Step 2 of 3</span>
              <h2 className="text-2xl sm:text-3xl font-thunder mt-1">What is your main motivation?</h2>
              <p className="text-sm text-[#5e5e5e] mt-1">We’ll tailor your starting lessons and conversation prompts.</p>
            </div>

            <div className="space-y-2">
              {[
                { id: 'travel', title: '🏝️ Travelling & Exploring Thailand', desc: 'Markets, Grab rides, islands, ordering food, local greetings' },
                { id: 'daily_life', title: '🏙️ Expat & Living in Thailand', desc: '7-Eleven, condos, talking with neighbors, local services' },
                { id: 'culture', title: '🍲 Thai Culture, Food & Arts', desc: 'Traditional food, etiquette, regional dialects, modern slang' },
                { id: 'relationships', title: '❤️ Connecting with Friends & Family', desc: 'Natural conversations, polite nuances, playful teasing' },
                { id: 'business', title: '💼 Business & Professional Growth', desc: 'Workplace manners, polite forms of address, networking' },
              ].map((g) => (
                <button
                  key={g.id}
                  type="button"
                  onClick={() => setGoal(g.id as any)}
                  className={`w-full text-left p-3 rounded-xl border transition-all flex items-center justify-between ${
                    goal === g.id
                      ? 'bg-white border-[#ff3a1f] shadow-sm'
                      : 'bg-white/50 border-[#e5e0d8] hover:bg-white'
                  }`}
                >
                  <div>
                    <div className="font-semibold text-sm text-[#070707]">{g.title}</div>
                    <div className="text-xs text-[#5e5e5e]">{g.desc}</div>
                  </div>
                  {goal === g.id && <Check className="w-4 h-4 text-[#ff3a1f]" />}
                </button>
              ))}
            </div>

            <div className="flex gap-3">
              <Button
                variant="outline"
                onClick={() => setStep(1)}
                className="w-1/3 py-5 rounded-xl border-[#e5e0d8]"
              >
                Back
              </Button>
              <Button
                onClick={() => setStep(3)}
                className="w-2/3 py-5 bg-[#070707] hover:bg-[#ff3a1f] text-white rounded-xl font-semibold flex items-center justify-center gap-2"
              >
                Set Daily Habit <ArrowRight className="w-4 h-4" />
              </Button>
            </div>
          </div>
        )}

        {/* Step 3: Daily Target & Summary */}
        {step === 3 && (
          <div className="space-y-6">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#ff3a1f]">Step 3 of 3</span>
              <h2 className="text-2xl sm:text-3xl font-thunder mt-1">Set your daily commitment</h2>
              <p className="text-sm text-[#5e5e5e] mt-1">Even 10-15 minutes a day builds rapid real-world confidence.</p>
            </div>

            <div className="grid grid-cols-3 gap-3">
              {[
                { min: 10, label: 'Casual', badge: '10 min/day' },
                { min: 15, label: 'Standard', badge: '15 min/day' },
                { min: 30, label: 'Immersion', badge: '30 min/day' },
              ].map((item) => (
                <button
                  key={item.min}
                  type="button"
                  onClick={() => setDailyMinutes(item.min)}
                  className={`p-4 rounded-xl border text-center transition-all ${
                    dailyMinutes === item.min
                      ? 'bg-white border-[#ff3a1f] shadow-md text-[#ff3a1f]'
                      : 'bg-white/50 border-[#e5e0d8] hover:bg-white text-[#070707]'
                  }`}
                >
                  <div className="font-thunder text-2xl">{item.min} min</div>
                  <div className="text-xs text-[#5e5e5e]">{item.label}</div>
                </button>
              ))}
            </div>

            {/* Generated Plan Highlight */}
            <div className="p-4 bg-white rounded-2xl border border-[#e5e0d8] space-y-2">
              <div className="flex items-center gap-2 text-xs font-bold text-[#ff3a1f] uppercase tracking-wider">
                <Sparkles className="w-4 h-4" />
                Personalized Route Ready
              </div>
              <div className="text-sm font-semibold text-[#070707]">
                Welcome aboard, {name || 'Learner'}! Ninny AI has curated your initial path:
              </div>
              <ul className="text-xs text-[#5e5e5e] space-y-1 list-disc pl-4">
                <li>Primary Focus: {goal.replace('_', ' ').toUpperCase()}</li>
                <li>Recommended Starting Point: Thai Foundations & Politeness Particles</li>
                <li>Exclusive Feature: Regional Dialects & Slang Hub unlocked</li>
              </ul>
            </div>

            <div className="flex gap-3">
              <Button
                variant="outline"
                onClick={() => setStep(2)}
                className="w-1/3 py-5 rounded-xl border-[#e5e0d8]"
              >
                Back
              </Button>
              <Button
                onClick={handleFinish}
                className="w-2/3 py-5 bg-[#ff3a1f] hover:bg-[#d82a12] text-white rounded-xl font-semibold shadow-md flex items-center justify-center gap-2"
              >
                Start Learning Now <Sparkles className="w-4 h-4" />
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
