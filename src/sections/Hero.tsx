import { useEffect, useRef } from 'react';
import { ArrowRight, MessageCircle, Play } from 'lucide-react';
import { Button } from '@/components/ui/button';
import gsap from 'gsap';

const Hero = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.hero-copy', { opacity: 0, y: 22 }, { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out' });
      gsap.fromTo('.hero-visual', { opacity: 0, x: 28 }, { opacity: 1, x: 0, duration: 0.8, delay: 0.15, ease: 'power3.out' });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative overflow-hidden bg-[#f7f4ef]">
      <div className="mx-auto grid min-h-[calc(100vh-72px)] max-w-7xl items-center gap-12 px-4 py-12 sm:px-6 lg:grid-cols-[0.95fr_1.05fr] lg:px-8 lg:py-16">
        <div className="hero-copy max-w-xl">
          <p className="mb-5 text-sm font-bold uppercase tracking-[0.18em] text-[#ff5638]">Practical Thai for real life</p>
          <h1 className="max-w-2xl text-6xl leading-[0.88] sm:text-8xl">Speak Thai with confidence.</h1>
          <p className="mt-7 max-w-lg text-base leading-7 text-[#68615a] sm:text-lg">Short lessons, useful phrases, and a patient AI tutor that helps you practise what you will actually say in Thailand.</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button onClick={() => window.dispatchEvent(new CustomEvent('open-onboarding'))} className="rounded-xl bg-[#ff5638] px-5 py-6 text-sm font-bold text-white shadow-lg shadow-[#ff5638]/15 hover:bg-[#111111]">Start learning <ArrowRight className="ml-2 h-4 w-4" /></Button>
            <Button variant="outline" onClick={() => window.dispatchEvent(new CustomEvent('open-preview'))} className="rounded-xl border-[#cfc5b8] bg-transparent px-5 py-6 text-sm font-bold text-[#111111] hover:bg-white"><Play className="mr-2 h-4 w-4" /> Explore lessons</Button>
          </div>
          <div className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-2 text-xs font-semibold text-[#817970]"><span className="flex items-center gap-2"><MessageCircle className="h-4 w-4 text-[#ff5638]" /> AI conversation practice</span><span>Thai tones & polite particles</span></div>
        </div>

        <div className="hero-visual relative">
          <div className="relative overflow-hidden rounded-[32px] bg-[#111111] shadow-[0_24px_70px_rgba(17,17,17,0.16)]">
            <img src="/hero-image.jpg" alt="Practising Thai conversation with RASSA" className="aspect-[4/3] w-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#111111]/75 via-transparent to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-6 text-white sm:p-8"><p className="text-xs font-bold uppercase tracking-[0.16em] text-[#ffad9c]">Your everyday Thai companion</p><p className="mt-2 max-w-sm text-2xl leading-tight sm:text-3xl">Learn the phrase. Understand the moment. Say it naturally.</p></div>
          </div>
          <div className="absolute -bottom-5 -left-4 hidden rounded-2xl border border-[#e4d7c7] bg-white p-4 shadow-xl sm:block"><p className="text-[10px] font-bold uppercase tracking-[0.14em] text-[#8b8178]">Meet your tutor</p><p className="mt-1 font-thunder text-2xl text-[#111111]">Ninny AI</p><p className="mt-1 text-xs text-[#6f6962]">Ask. Practise. Improve.</p></div>
        </div>
      </div>
      <div className="absolute -right-24 top-20 h-64 w-64 rounded-full border-[40px] border-[#ff5638]/10" />
    </section>
  );
};

export default Hero;
