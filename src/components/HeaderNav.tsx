import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import type { AppView } from '../context/AppContext';
import {
  Sparkles,
  Flame,
  BookOpen,
  MessageSquare,
  Bookmark,
  MapPin,
  Menu,
  X,
  MessageSquareHeart,
  Home,
  Crown,
} from 'lucide-react';
import { Button } from './ui/button';

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

  const navItems: { view: AppView; label: string; icon: React.ReactNode }[] = [
    { view: 'landing', label: 'Home', icon: <Home className="w-4 h-4" /> },
    { view: 'dashboard', label: 'My Progress', icon: <Flame className="w-4 h-4 text-[#ff3a1f]" /> },
    { view: 'courses', label: 'Courses', icon: <BookOpen className="w-4 h-4" /> },
    { view: 'regional-slang', label: 'Slang & Regional', icon: <MapPin className="w-4 h-4 text-[#0ea5e9]" /> },
    { view: 'tutor', label: 'Ninny AI Tutor', icon: <MessageSquare className="w-4 h-4 text-[#8b5cf6]" /> },
    { view: 'vocab', label: 'Vocab Vault', icon: <Bookmark className="w-4 h-4 text-[#f59e0b]" /> },
  ];

  const handleNavClick = (view: AppView) => {
    setCurrentView(view);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const isPaid = subscriptionTier === 'monthly' || subscriptionTier === 'yearly';

  return (
    <header className="sticky top-0 z-40 w-full bg-[#f0ede8]/90 backdrop-blur-md border-b border-[#e5e0d8] transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between">
        {/* Brand Logo & London Subtext */}
        <div
          onClick={() => handleNavClick('landing')}
          className="flex items-center gap-3 cursor-pointer group"
        >
          <div className="w-10 h-10 rounded-xl bg-[#070707] text-white flex items-center justify-center font-thunder text-2xl tracking-tighter shadow-md group-hover:bg-[#ff3a1f] transition-colors">
            R
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-thunder text-2xl tracking-wider text-[#070707]">RASSA</span>
              <span className="px-1.5 py-0.5 text-[10px] font-bold bg-[#e5e0d8] text-[#5e5e5e] rounded uppercase tracking-wider">
                London
              </span>
            </div>
            <p className="text-[10px] text-[#777] font-medium leading-none">Practical Thai Learning</p>
          </div>
        </div>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-1 bg-white/70 p-1 rounded-2xl border border-[#e5e0d8] shadow-sm">
          {navItems.map((item) => {
            const isActive = currentView === item.view;
            return (
              <button
                key={item.view}
                onClick={() => handleNavClick(item.view)}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 ${
                  isActive
                    ? 'bg-[#070707] text-white shadow-sm'
                    : 'text-[#5e5e5e] hover:text-[#070707] hover:bg-[#eadecc]/60'
                }`}
              >
                {item.icon}
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Right Action Icons & Membership Status */}
        <div className="hidden sm:flex items-center gap-3">
          {/* Streak Badge */}
          <div
            onClick={() => handleNavClick('dashboard')}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-white border border-[#e5e0d8] rounded-xl text-xs font-bold text-[#070707] shadow-sm cursor-pointer hover:border-[#ff3a1f] transition-colors"
            title="Daily Learning Streak"
          >
            <Flame className="w-4 h-4 text-[#ff3a1f] fill-[#ff3a1f]" />
            <span>{userProfile.streakDays}d Streak</span>
          </div>

          {/* Subscription Tier Button */}
          {isPaid ? (
            <div
              onClick={() => setIsSubscriptionModalOpen(true)}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-gradient-to-r from-amber-500/10 to-orange-500/10 border border-amber-400/40 rounded-xl text-xs font-bold text-amber-900 cursor-pointer shadow-sm hover:scale-105 transition-all"
            >
              <Crown className="w-3.5 h-3.5 text-amber-600 fill-amber-600" />
              <span>{subscriptionTier === 'yearly' ? 'Yearly Member' : 'Monthly Member'}</span>
            </div>
          ) : (
            <Button
              onClick={() => setIsSubscriptionModalOpen(true)}
              className="bg-[#ff3a1f] hover:bg-[#d82a12] text-white text-xs font-semibold px-4 py-2 rounded-xl shadow-md transition-all hover:scale-105 flex items-center gap-1.5"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Unlock All (£19.60/mo)</span>
            </Button>
          )}

          {/* Feedback Button */}
          <button
            onClick={() => setIsFeedbackModalOpen(true)}
            className="p-2 text-[#5e5e5e] hover:text-[#070707] hover:bg-white rounded-xl border border-transparent hover:border-[#e5e0d8] transition-all"
            title="Share Feedback"
          >
            <MessageSquareHeart className="w-4 h-4" />
          </button>
        </div>

        {/* Mobile Hamburger Button */}
        <div className="flex items-center gap-2 lg:hidden">
          <Button
            size="sm"
            onClick={() => setIsSubscriptionModalOpen(true)}
            className="bg-[#ff3a1f] text-white text-xs px-2.5 py-1 rounded-lg"
          >
            {isPaid ? 'Member' : 'Upgrade'}
          </Button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-[#070707] bg-white border border-[#e5e0d8] rounded-xl"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-[#e5e0d8] bg-[#f0ede8] p-4 space-y-2 animate-in slide-in-from-top duration-200">
          {navItems.map((item) => (
            <button
              key={item.view}
              onClick={() => handleNavClick(item.view)}
              className={`w-full flex items-center gap-3 p-3 rounded-xl text-sm font-semibold transition-all ${
                currentView === item.view
                  ? 'bg-[#070707] text-white'
                  : 'bg-white/60 text-[#070707]'
              }`}
            >
              {item.icon}
              <span>{item.label}</span>
            </button>
          ))}
          <div className="pt-2 flex gap-2">
            <Button
              onClick={() => {
                setIsSubscriptionModalOpen(true);
                setMobileMenuOpen(false);
              }}
              className="flex-1 py-3 bg-[#ff3a1f] text-white text-xs font-semibold rounded-xl"
            >
              Membership & Billing
            </Button>
            <Button
              variant="outline"
              onClick={() => {
                setIsFeedbackModalOpen(true);
                setMobileMenuOpen(false);
              }}
              className="py-3 text-xs rounded-xl border-[#e5e0d8]"
            >
              Feedback
            </Button>
          </div>
        </div>
      )}
    </header>
  );
};
