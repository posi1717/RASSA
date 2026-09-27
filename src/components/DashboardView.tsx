import React from 'react';
import { ArrowRight, Bookmark, BookOpen, CheckCircle2, Clock3, Flame, MapPin, MessageSquare, Play, Sparkles, Volume2 } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { CURRICULUM_CATEGORIES, LESSONS_DATABASE } from '../data/curriculum';
import { REGIONAL_PHRASES_COLLECTION, THAI_SLANG_COLLECTION } from '../data/regionalAndSlang';
import { Button } from './ui/button';

export const DashboardView: React.FC = () => {
  const { userProfile, setCurrentView, setActiveLessonId, completedLessonIds, savedVocab, speakThai } = useApp();
  const nextLesson = LESSONS_DATABASE.find((lesson) => !completedLessonIds.includes(lesson.id)) || LESSONS_DATABASE[0];
  const dailySlang = THAI_SLANG_COLLECTION[0];
  const regionalPhrase = REGIONAL_PHRASES_COLLECTION[4];

  const startLesson = () => {
    setActiveLessonId(nextLesson.id);
    setCurrentView('lesson');
  };

  return (
    <div className="mx-auto max-w-7xl space-y-8 px-4 py-8 sm:px-6 lg:px-8 lg:py-10">
      <section className="grid gap-5 lg:grid-cols-[1.45fr_0.8fr]">
        <div className="relative overflow-hidden rounded-[28px] bg-[#111111] p-6 text-white shadow-[0_18px_50px_rgba(17,17,17,0.12)] sm:p-9">
          <div className="relative z-10 max-w-xl">
            <div className="mb-3 flex items-center gap-2 text-xs font-bold uppercase tracking-[0.14em] text-[#ff9d86]"><Sparkles className="h-4 w-4" /> Your next best step</div>
            <h1 className="max-w-lg text-4xl leading-[0.95] sm:text-6xl">Good to see you, {userProfile.name}.</h1>
            <p className="mt-4 max-w-lg text-sm leading-6 text-white/70">Keep your {userProfile.dailyTargetMinutes}-minute habit going. One short practice today is enough to move forward.</p>
            <Button onClick={startLesson} className="mt-7 rounded-xl bg-[#ff5638] px-5 py-6 text-sm font-bold text-white hover:bg-white hover:text-[#111111]"><Play className="mr-2 h-4 w-4 fill-current" /> Continue learning</Button>
          </div>
          <div className="pointer-events-none absolute -bottom-20 -right-12 h-64 w-64 rounded-full border-[36px] border-[#ff5638]/20" />
          <div className="pointer-events-none absolute right-7 top-7 hidden text-right sm:block"><span className="block font-thunder text-6xl text-[#ff5638]">{userProfile.streakDays}</span><span className="text-xs font-bold uppercase tracking-widest text-white/60">day streak</span></div>
        </div>

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-2">
          <StatCard icon={<Flame className="h-4 w-4 text-[#ff5638]" />} value={`${userProfile.streakDays}`} label="Day streak" />
          <StatCard icon={<CheckCircle2 className="h-4 w-4 text-emerald-600" />} value={`${completedLessonIds.length}`} label="Lessons done" />
          <StatCard icon={<Bookmark className="h-4 w-4 text-amber-600" />} value={`${savedVocab.length}`} label="Saved words" />
          <StatCard icon={<Clock3 className="h-4 w-4 text-sky-600" />} value={`${userProfile.dailyTargetMinutes}m`} label="Daily goal" />
        </div>
      </section>

      <section className="grid gap-5 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="rounded-[24px] border border-[#e7e1d8] bg-white p-6 sm:p-7">
          <div className="flex items-start justify-between gap-4">
            <div><p className="text-xs font-bold uppercase tracking-[0.14em] text-[#ff5638]">Pick up where you left off</p><h2 className="mt-2 text-3xl">{nextLesson.title}</h2><p className="mt-2 max-w-lg text-sm leading-6 text-[#706a63]">{nextLesson.subtitle}</p></div>
            <span className="hidden rounded-full bg-[#f7f4ef] px-3 py-1 text-xs font-bold text-[#706a63] sm:block">{nextLesson.estimatedMinutes} min</span>
          </div>
          <div className="mt-6 flex flex-wrap items-center gap-3"><span className="flex items-center gap-1.5 text-xs font-semibold text-[#706a63]"><BookOpen className="h-4 w-4" /> {nextLesson.steps.length} interactive steps</span><span className="h-1 w-1 rounded-full bg-[#cfc6bb]" /><span className="text-xs font-semibold capitalize text-[#706a63]">{nextLesson.level}</span></div>
          <Button onClick={startLesson} className="mt-6 rounded-xl bg-[#111111] px-5 py-5 text-xs font-bold text-white hover:bg-[#ff5638]">Start this lesson <ArrowRight className="ml-2 h-4 w-4" /></Button>
        </div>
        <div className="rounded-[24px] border border-[#e7e1d8] bg-[#fff8e8] p-6 sm:p-7">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.14em] text-[#a66a00]"><MessageSquare className="h-4 w-4" /> Practice with Ninny</div>
          <h2 className="mt-3 text-3xl">Ask anything in Thai.</h2>
          <p className="mt-2 text-sm leading-6 text-[#706a63]">Get a natural phrase, pronunciation help, or a quick real-life role-play.</p>
          <Button onClick={() => setCurrentView('tutor')} variant="outline" className="mt-6 rounded-xl border-[#d9c89f] bg-transparent px-5 py-5 text-xs font-bold text-[#111111] hover:bg-white">Open AI tutor <ArrowRight className="ml-2 h-4 w-4" /></Button>
        </div>
      </section>

      <section>
        <div className="mb-4 flex items-end justify-between gap-4"><div><p className="text-xs font-bold uppercase tracking-[0.14em] text-[#8a837b]">Explore at your pace</p><h2 className="mt-2 text-3xl">More ways to practise</h2></div><button onClick={() => setCurrentView('courses')} className="hidden items-center gap-1 text-xs font-bold text-[#ff5638] sm:flex">View all lessons <ArrowRight className="h-4 w-4" /></button></div>
        <div className="grid gap-4 md:grid-cols-3">
          <ActionCard icon={<BookOpen className="h-5 w-5" />} title="Lessons" text="Build a practical foundation with guided, bite-sized practice." onClick={() => setCurrentView('courses')} />
          <ActionCard icon={<MapPin className="h-5 w-5" />} title="Culture & slang" text="Learn the expressions locals actually use across Thailand." onClick={() => setCurrentView('regional-slang')} />
          <ActionCard icon={<Bookmark className="h-5 w-5" />} title="Saved words" text="Review the phrases you want to remember and use." onClick={() => setCurrentView('vocab')} />
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-2">
        <Spotlight title="Today's slang" accent="text-[#ff5638]" thai={dailySlang.slangThai} roman={dailySlang.slangRoman} meaning={dailySlang.actualMeaning} onSpeak={() => speakThai(dailySlang.slangThai)} />
        <Spotlight title="Regional phrase" accent="text-sky-600" thai={regionalPhrase.phraseThai} roman={regionalPhrase.phraseRoman} meaning={regionalPhrase.english} onSpeak={() => speakThai(regionalPhrase.phraseThai)} />
      </section>

      <section>
        <div className="mb-4 flex items-end justify-between"><div><p className="text-xs font-bold uppercase tracking-[0.14em] text-[#8a837b]">Your learning map</p><h2 className="mt-2 text-3xl">Course progress</h2></div><button onClick={() => setCurrentView('courses')} className="text-xs font-bold text-[#ff5638] sm:hidden">View all</button></div>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">{CURRICULUM_CATEGORIES.map((category) => { const lessons = LESSONS_DATABASE.filter((lesson) => lesson.categoryId === category.id); const complete = lessons.filter((lesson) => completedLessonIds.includes(lesson.id)).length; const progress = lessons.length ? (complete / lessons.length) * 100 : 0; return <button key={category.id} onClick={() => setCurrentView('courses')} className="rounded-2xl border border-[#e7e1d8] bg-white p-5 text-left transition hover:-translate-y-0.5 hover:border-[#111111]"><div className="flex items-center justify-between gap-3"><span className="text-sm font-bold text-[#111111]">{category.name}</span><span className="text-[11px] font-semibold text-[#8a837b]">{complete}/{lessons.length}</span></div><p className="mt-2 line-clamp-2 text-xs leading-5 text-[#77716a]">{category.description}</p><div className="mt-4 h-1.5 overflow-hidden rounded-full bg-[#eee8df]"><div className="h-full rounded-full bg-[#ff5638]" style={{ width: `${progress}%` }} /></div></button>; })}</div>
      </section>
    </div>
  );
};

const StatCard = ({ icon, value, label }: { icon: React.ReactNode; value: string; label: string }) => <div className="rounded-2xl border border-[#e7e1d8] bg-white p-4"><div className="flex items-center justify-between"><span className="rounded-lg bg-[#f7f4ef] p-2">{icon}</span><span className="font-thunder text-3xl text-[#111111]">{value}</span></div><p className="mt-3 text-xs font-semibold text-[#77716a]">{label}</p></div>;
const ActionCard = ({ icon, title, text, onClick }: { icon: React.ReactNode; title: string; text: string; onClick: () => void }) => <button onClick={onClick} className="group rounded-[22px] border border-[#e7e1d8] bg-white p-5 text-left transition hover:-translate-y-1 hover:border-[#111111] hover:shadow-[0_14px_30px_rgba(17,17,17,0.08)]"><span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#f7f4ef] text-[#111111] transition group-hover:bg-[#111111] group-hover:text-white">{icon}</span><h3 className="mt-5 text-2xl">{title}</h3><p className="mt-2 text-xs leading-5 text-[#77716a]">{text}</p><span className="mt-5 flex items-center gap-1 text-xs font-bold text-[#ff5638]">Open <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" /></span></button>;
const Spotlight = ({ title, accent, thai, roman, meaning, onSpeak }: { title: string; accent: string; thai: string; roman: string; meaning: string; onSpeak: () => void }) => <div className="rounded-[22px] border border-[#e7e1d8] bg-white p-5"><div className={`text-xs font-bold uppercase tracking-[0.14em] ${accent}`}>{title}</div><div className="mt-4 flex items-center gap-3"><h3 className="text-3xl">{thai}</h3><button onClick={onSpeak} className="rounded-lg p-2 text-[#77716a] hover:bg-[#f7f4ef]" title="Play pronunciation" aria-label={`Play pronunciation for ${thai}`}><Volume2 className="h-4 w-4" /></button></div><p className="mt-1 text-xs font-semibold text-[#77716a]">{roman}</p><p className="mt-4 text-sm font-semibold text-[#111111]">{meaning}</p></div>;
