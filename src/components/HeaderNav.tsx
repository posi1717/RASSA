import React, { useState } from 'react';
import { BookOpen, Bookmark, Flame, Home, MapPin, Menu, MessageSquare, MessageSquareHeart, Sparkles, X, Crown } from 'lucide-react';
import { useApp } from '../context/AppContext';
import type { AppView } from '../context/AppContext';
import { Button } from './ui/button';

const navItems: { view: AppView; label: string; icon: React.ReactNode }[] = [
  { view: 'dashboard', label: 'Learn', icon: <Home className="h-4 w-4" /> },
  { view: 'courses', label: 'Lessons', icon: <BookOpen className="h-4 w-4" /> },
  { view: 'tutor', label: 'Ninny AI', icon: <MessageSquare className="h-4 w-4" /> },
  { view: 'vocab', label: 'Saved words', icon: <Bookmark className="h-4 w-4" /> },
];

export const HeaderNav: React.FC = () => {
  const {
    currentView,
    setCurrentView,
    subscriptionTier,
    setIsSubscriptionModalOpen,
    setIsFeedbackModalOpen,
    userProfile,
  } = useApp();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const isPaid = subscriptionTier === 'monthly' || subscriptionTier === 'yearly';

  const handleNavClick = (view: AppView) => {
    setCurrentView(view);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-[#e7e1d8] bg-[#f7f4ef]/95 backdrop-blur-xl">
      <div className="mx-auto flex h-[72px] max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <button onClick={() => handleNavClick('landing')} className="flex shrink-0 items-center gap-3 text-left" aria-label="Go to RASSA home">
          <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[#111111] font-thunder text-2xl text-white shadow-sm">R</span>
          <span className="hidden sm:block">
            <span className="block font-thunder text-2xl tracking-wide text-[#111111]">RASSA</span>
            <span className="block text-[10px] font-semibold uppercase tracking-[0.14em] text-[#8a837b]">Practical Thai</span>
          </span>
        </button>

        {currentView !== 'landing' && (
          <nav className="hidden items-center gap-1 rounded-2xl border border-[#e7e1d8] bg-white/75 p-1 lg:flex" aria-label="Primary">
            {navItems.map((item) => (
              <button
                key={item.view}
                onClick={() => handleNavClick(item.view)}
                className={`flex items-center gap-2 rounded-xl px-3.5 py-2 text-xs font-bold transition-colors ${currentView === item.view ? 'bg-[#111111] text-white' : 'text-[#6f6962] hover:bg-[#f0ebe4] hover:text-[#111111]'}`}
              >
                {item.icon}
                {item.label}
              </button>
            ))}
            <button onClick={() => handleNavClick('regional-slang')} className={`flex items-center gap-2 rounded-xl px-3.5 py-2 text-xs font-bold transition-colors ${currentView === 'regional-slang' ? 'bg-[#111111] text-white' : 'text-[#6f6962] hover:bg-[#f0ebe4] hover:text-[#111111]'}`}>
              <MapPin className="h-4 w-4" />
              Culture
            </button>
          </nav>
        )}

        <div className="flex items-center gap-2">
          {currentView !== 'landing' && (
            <button onClick={() => handleNavClick('dashboard')} className="hidden items-center gap-1.5 rounded-xl border border-[#e7e1d8] bg-white px-3 py-2 text-xs font-bold text-[#111111] sm:flex" title="Learning streak">
              <Flame className="h-4 w-4 fill-[#ff5638] text-[#ff5638]" />
              {userProfile.streakDays} day streak
            </button>
          )}
          <Button onClick={() => setIsSubscriptionModalOpen(true)} className="hidden rounded-xl bg-[#ff5638] px-4 text-xs font-bold text-white hover:bg-[#111111] sm:flex">
            {isPaid ? <><Crown className="mr-1.5 h-3.5 w-3.5" /> Member</> : <><Sparkles className="mr-1.5 h-3.5 w-3.5" /> Unlock full access</>}
          </Button>
          {currentView !== 'landing' && (
            <button onClick={() => setIsFeedbackModalOpen(true)} className="hidden rounded-xl p-2 text-[#77716a] hover:bg-white hover:text-[#111111] sm:block" title="Share feedback" aria-label="Share feedback">
              <MessageSquareHeart className="h-4 w-4" />
            </button>
          )}
          <button onClick={() => setMobileMenuOpen((open) => !open)} className="rounded-xl border border-[#e7e1d8] bg-white p-2 text-[#111111] lg:hidden" aria-label={mobileMenuOpen ? 'Close navigation' : 'Open navigation'}>
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {mobileMenuOpen && currentView !== 'landing' && (
        <div className="border-t border-[#e7e1d8] bg-[#f7f4ef] p-4 lg:hidden">
          <div className="grid grid-cols-2 gap-2">
            {[...navItems, { view: 'regional-slang' as AppView, label: 'Culture', icon: <MapPin className="h-4 w-4" /> }].map((item) => (
              <button key={item.view} onClick={() => handleNavClick(item.view)} className={`flex items-center gap-2 rounded-xl p-3 text-left text-xs font-bold ${currentView === item.view ? 'bg-[#111111] text-white' : 'bg-white text-[#111111]'}`}>
                {item.icon}
                {item.label}
              </button>
            ))}
          </div>
          <div className="mt-3 flex gap-2">
            <Button onClick={() => { setIsSubscriptionModalOpen(true); setMobileMenuOpen(false); }} className="flex-1 rounded-xl bg-[#ff5638] text-xs font-bold text-white">Membership</Button>
            <Button variant="outline" onClick={() => { setIsFeedbackModalOpen(true); setMobileMenuOpen(false); }} className="rounded-xl border-[#e7e1d8] text-xs">Feedback</Button>
          </div>
        </div>
      )}
    </header>
  );
};
