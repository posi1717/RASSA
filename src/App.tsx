import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import Navigation from './sections/Navigation';
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

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

function App() {
  useEffect(() => {
    // Configure ScrollTrigger defaults
    ScrollTrigger.defaults({
      toggleActions: 'play none none reverse',
    });

    // Refresh ScrollTrigger on load
    ScrollTrigger.refresh();

    // Cleanup on unmount
    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <div className="min-h-screen bg-[#f0ede8]">
      <Navigation />
      <main>
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
      </main>
      <Footer />
    </div>
  );
}

export default App;
