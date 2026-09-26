import React, { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import { AppProvider, useApp } from './context/AppContext';
import { HeaderNav } from './components/HeaderNav';
import { DashboardView } from './components/DashboardView';
import { CourseCatalogView } from './components/CourseCatalogView';
import { LessonPlayerView } from './components/LessonPlayerView';
import { RegionalSlangHub } from './components/RegionalSlangHub';
import { NinnyAITutorView } from './components/NinnyAITutorView';
import { VocabVaultView } from './components/VocabVaultView';
import { SubscriptionModal } from './components/SubscriptionModal';
import { OnboardingModal } from './components/OnboardingModal';
import { FeedbackModal } from './components/FeedbackModal';

// Landing Page Sections
import Hero from './sections/Hero';
import LogoCarousel from './sections/LogoCarousel';
import Features from './sections/Features';
import About from './sections/About';
import Services from './sections/Services';
import AIChatDemo from './sections/AIChatDemo';
import Pricing from './sections/Pricing';
import Testimonials from './sections/Testimonials';
import FAQ from './sections/FAQ';
import CTA from './sections/CTA';
import Footer from './sections/Footer';

import './App.css';

gsap.registerPlugin(ScrollTrigger);

const AppContent: React.FC = () => {
  const {
    currentView,
    setCurrentView,
    setIsSubscriptionModalOpen,
    setIsOnboardingModalOpen,
    setSubscriptionTier,
  } = useApp();

  useEffect(() => {
    ScrollTrigger.defaults({
      toggleActions: 'play none none reverse',
    });
    ScrollTrigger.refresh();

    // Custom event listeners dispatched from sections
    const handleOpenOnboarding = () => setIsOnboardingModalOpen(true);
    const handleOpenPreview = () => setCurrentView('courses');
    const handleOpenNinnyTutor = () => setCurrentView('tutor');
    const handleOpenSubscriptionPlan = (e: any) => {
      if (e?.detail?.planId) {
        setSubscriptionTier(e.detail.planId);
      }
      setIsSubscriptionModalOpen(true);
    };

    window.addEventListener('open-onboarding', handleOpenOnboarding);
    window.addEventListener('open-preview', handleOpenPreview);
    window.addEventListener('open-ninny-tutor', handleOpenNinnyTutor);
    window.addEventListener('open-subscription-plan', handleOpenSubscriptionPlan);

    return () => {
      window.removeEventListener('open-onboarding', handleOpenOnboarding);
      window.removeEventListener('open-preview', handleOpenPreview);
      window.removeEventListener('open-ninny-tutor', handleOpenNinnyTutor);
      window.removeEventListener('open-subscription-plan', handleOpenSubscriptionPlan);
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, [setIsOnboardingModalOpen, setCurrentView, setIsSubscriptionModalOpen, setSubscriptionTier]);

  return (
    <div className="min-h-screen bg-[#f0ede8] text-[#070707] flex flex-col font-manrope selection:bg-[#ff3a1f] selection:text-white">
      {/* Top Navigation */}
      <HeaderNav />

      {/* Main Content Router */}
      <main className="flex-1">
        {currentView === 'landing' && (
          <>
            <Hero />
            <LogoCarousel />
            <Features />
            <About />
            <Services />
            <AIChatDemo />
            <Pricing />
            <Testimonials />
            <FAQ />
            <CTA />
            <Footer />
          </>
        )}

        {currentView === 'dashboard' && <DashboardView />}
        {currentView === 'courses' && <CourseCatalogView />}
        {currentView === 'lesson' && <LessonPlayerView />}
        {currentView === 'regional-slang' && <RegionalSlangHub />}
        {currentView === 'tutor' && <NinnyAITutorView />}
        {currentView === 'vocab' && <VocabVaultView />}
      </main>

      {/* Persistent Global Modals */}
      <SubscriptionModal />
      <OnboardingModal />
      <FeedbackModal />
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}
