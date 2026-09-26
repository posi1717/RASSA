import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { THAI_SLANG_COLLECTION, REGIONAL_PHRASES_COLLECTION } from '../data/regionalAndSlang';
import {
  Flame,
  MapPin,
  Volume2,
  Bookmark,
  Sparkles,
  AlertTriangle,
  CheckCircle,
  Search,
  MessageSquare,
} from 'lucide-react';
import { Button } from './ui/button';

export const RegionalSlangHub: React.FC = () => {
  const { speakThai, toggleSaveVocab, isVocabSaved, setCurrentView } = useApp();

  const [activeTab, setActiveTab] = useState<'slang' | 'regional'>('slang');
  const [selectedRegion, setSelectedRegion] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Filter slang
  const filteredSlang = THAI_SLANG_COLLECTION.filter((item) => {
    const q = searchQuery.toLowerCase();
    return (
      item.slangThai.includes(q) ||
      item.slangRoman.toLowerCase().includes(q) ||
      item.actualMeaning.toLowerCase().includes(q)
    );
  });

  // Filter regional phrases
  const filteredRegional = REGIONAL_PHRASES_COLLECTION.filter((item) => {
    const matchesRegion = selectedRegion === 'all' || item.region.includes(selectedRegion);
    const q = searchQuery.toLowerCase();
    const matchesQuery =
      item.phraseThai.includes(q) ||
      item.phraseRoman.toLowerCase().includes(q) ||
      item.english.toLowerCase().includes(q);
    return matchesRegion && matchesQuery;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-in fade-in">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-2 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-cyan-500/10 text-cyan-700 text-xs font-semibold rounded-full uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-cyan-600" />
            <span>Living Thai Beyond Textbooks</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-thunder tracking-tight text-[#070707]">
            Spoken Slang & Regional Dialects
          </h1>
          <p className="text-sm text-[#5e5e5e] font-manrope">
            Speak like an authentic local across Bangkok, Chiang Mai (คำเมือง), Isan (ภาษาอีสาน), and the South (ภาษาใต้).
          </p>
        </div>

        {/* Ask Ninny AI Shortcut */}
        <Button
          onClick={() => setCurrentView('tutor')}
          className="bg-[#8b5cf6] hover:bg-[#7c3aed] text-white px-5 py-5 rounded-2xl text-xs font-semibold shadow-md flex items-center gap-2 shrink-0"
        >
          <MessageSquare className="w-4 h-4" />
          <span>Ask Ninny AI to Practise Slang</span>
        </Button>
      </div>

      {/* Main Mode Tabs */}
      <div className="flex items-center gap-3 border-b border-[#e5e0d8] pb-4">
        <button
          onClick={() => setActiveTab('slang')}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-2xl text-sm font-bold transition-all ${
            activeTab === 'slang'
              ? 'bg-[#ff3a1f] text-white shadow-md'
              : 'bg-white border border-[#e5e0d8] text-[#5e5e5e] hover:border-[#070707]'
          }`}
        >
          <Flame className="w-4 h-4" />
          <span>Modern Bangkok Slang ({THAI_SLANG_COLLECTION.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('regional')}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-2xl text-sm font-bold transition-all ${
            activeTab === 'regional'
              ? 'bg-[#0ea5e9] text-white shadow-md'
              : 'bg-white border border-[#e5e0d8] text-[#5e5e5e] hover:border-[#070707]'
          }`}
        >
          <MapPin className="w-4 h-4" />
          <span>Regional Dialects: North, Isan & South ({REGIONAL_PHRASES_COLLECTION.length})</span>
        </button>
      </div>

      {/* Search & Region Sub-filters */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        {activeTab === 'regional' && (
          <div className="flex items-center gap-2 w-full sm:w-auto overflow-x-auto pb-1 scrollbar-none">
            {[
              { id: 'all', label: 'All Regions' },
              { id: 'Northern', label: '🌸 Northern (คำเมือง)' },
              { id: 'Isan', label: '🌶️ Isan (ภาษาอีสาน)' },
              { id: 'Southern', label: '🌊 Southern (ภาษาใต้)' },
            ].map((reg) => (
              <button
                key={reg.id}
                onClick={() => setSelectedRegion(reg.id)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold shrink-0 transition-all ${
                  selectedRegion === reg.id
                    ? 'bg-[#070707] text-white'
                    : 'bg-white border border-[#e5e0d8] text-[#5e5e5e] hover:border-[#070707]'
                }`}
              >
                {reg.label}
              </button>
            ))}
          </div>
        )}

        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#999]" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search words, English, or Roman..."
            className="w-full pl-9 pr-4 py-2 bg-white border border-[#e5e0d8] rounded-xl text-xs focus:outline-none focus:border-[#070707]"
          />
        </div>
      </div>

      {/* Tab A: Modern Slang Grid */}
      {activeTab === 'slang' && (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredSlang.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-3xl p-6 border border-[#e5e0d8] shadow-sm hover:shadow-md hover:border-[#ff3a1f] transition-all flex flex-col justify-between"
            >
              <div>
                {/* Vibe badge */}
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-[#ff3a1f]/10 text-[#ff3a1f] uppercase tracking-wider">
                    {item.vibe}
                  </span>
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => speakThai(item.slangThai)}
                      className="p-2 text-[#5e5e5e] hover:text-[#ff3a1f] hover:bg-[#f0ede8] rounded-xl transition-colors"
                      title="Listen to native pronunciation"
                    >
                      <Volume2 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() =>
                        toggleSaveVocab({
                          id: item.id,
                          thai: item.slangThai,
                          roman: item.slangRoman,
                          english: item.actualMeaning,
                          category: 'Thai Slang',
                        })
                      }
                      className={`p-2 rounded-xl border transition-all ${
                        isVocabSaved(item.id)
                          ? 'bg-amber-100 border-amber-300 text-amber-700'
                          : 'bg-white border-[#e5e0d8] text-[#5e5e5e] hover:border-[#070707]'
                      }`}
                      title="Save to Vocab Vault"
                    >
                      <Bookmark className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Slang Title */}
                <h3 className="text-3xl font-thunder text-[#070707] mb-1">{item.slangThai}</h3>
                <p className="text-xs font-semibold text-[#ff3a1f] mb-2">{item.slangRoman}</p>
                <div className="text-xs text-[#070707] font-semibold mb-1">
                  Actual Meaning: {item.actualMeaning}
                </div>
                <div className="text-[11px] text-[#777] mb-4">
                  Literal: {item.literalMeaning}
                </div>

                {/* Example sentence */}
                <div className="p-3 bg-[#faf8f5] rounded-2xl border border-[#e5e0d8] space-y-1 mb-4">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-xs text-[#070707]">{item.exampleThai}</span>
                    <button
                      onClick={() => speakThai(item.exampleThai)}
                      className="text-[#ff3a1f] p-1 hover:bg-white rounded-lg transition-colors"
                    >
                      <Volume2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                  <div className="text-[11px] text-[#ff3a1f]">{item.exampleRoman}</div>
                  <div className="text-[11px] text-[#5e5e5e]">"{item.exampleEnglish}"</div>
                </div>
              </div>

              {/* Etiquette / When to use & Not use */}
              <div className="pt-3 border-t border-[#f0ede8] space-y-2 text-[11px]">
                <div className="flex items-start gap-1.5 text-emerald-800">
                  <CheckCircle className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                  <span>
                    <strong className="text-emerald-950">When to use: </strong>
                    {item.whenToUse}
                  </span>
                </div>
                <div className="flex items-start gap-1.5 text-rose-800">
                  <AlertTriangle className="w-3.5 h-3.5 text-rose-600 shrink-0 mt-0.5" />
                  <span>
                    <strong className="text-rose-950">When NOT to use: </strong>
                    {item.whenNotToUse}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Tab B: Regional Dialects Grid */}
      {activeTab === 'regional' && (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredRegional.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-3xl p-6 border border-[#e5e0d8] shadow-sm hover:shadow-md hover:border-[#0ea5e9] transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-cyan-100 text-cyan-800">
                    {item.region}
                  </span>
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => speakThai(item.audioPronunciationText)}
                      className="p-2 text-[#5e5e5e] hover:text-cyan-600 hover:bg-[#f0ede8] rounded-xl transition-colors"
                      title="Listen to native regional audio"
                    >
                      <Volume2 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() =>
                        toggleSaveVocab({
                          id: item.id,
                          thai: item.phraseThai,
                          roman: item.phraseRoman,
                          english: item.english,
                          category: item.region,
                        })
                      }
                      className={`p-2 rounded-xl border transition-all ${
                        isVocabSaved(item.id)
                          ? 'bg-amber-100 border-amber-300 text-amber-700'
                          : 'bg-white border-[#e5e0d8] text-[#5e5e5e] hover:border-[#070707]'
                      }`}
                      title="Save to Vocab Vault"
                    >
                      <Bookmark className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <h3 className="text-3xl font-thunder text-[#070707] mb-1">{item.phraseThai}</h3>
                <p className="text-xs font-semibold text-cyan-700 mb-2">{item.phraseRoman}</p>
                <div className="text-xs text-[#070707] font-semibold mb-4">
                  English: "{item.english}"
                </div>

                {/* Comparison with Standard Central Thai */}
                <div className="p-3 bg-cyan-50/60 rounded-2xl border border-cyan-200/60 space-y-1 mb-4">
                  <div className="text-[10px] font-bold uppercase tracking-wider text-cyan-800">
                    Standard Central Thai Equivalent:
                  </div>
                  <div className="font-bold text-xs text-[#070707]">{item.standardThai}</div>
                  <div className="text-[11px] text-[#5e5e5e]">({item.standardRoman})</div>
                </div>
              </div>

              {/* Cultural nuance note */}
              <div className="pt-3 border-t border-[#f0ede8] text-[11px] text-[#555] leading-relaxed">
                <span className="font-bold text-[#070707]">Cultural Heart: </span>
                {item.culturalNote}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
