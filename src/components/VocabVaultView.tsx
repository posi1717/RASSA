import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  Bookmark,
  Volume2,
  Trash2,
  RotateCw,
} from 'lucide-react';
import { Button } from './ui/button';

export const VocabVaultView: React.FC = () => {
  const { savedVocab, toggleSaveVocab, speakThai, setCurrentView } = useApp();
  const [flashcardIndex, setFlashcardIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [viewMode, setViewMode] = useState<'list' | 'flashcards'>('list');

  const currentCard = savedVocab[flashcardIndex];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-in fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-500/10 text-amber-800 text-xs font-semibold rounded-full uppercase tracking-wider mb-2">
            <Bookmark className="w-3.5 h-3.5 text-amber-600" />
            <span>Personal Memory Vault</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-thunder tracking-tight text-[#070707]">
            Saved Vocabulary & Phrases
          </h1>
          <p className="text-sm text-[#5e5e5e] font-manrope">
            {savedVocab.length} practical expressions saved from your lessons and Ninny AI chats.
          </p>
        </div>

        {savedVocab.length > 0 && (
          <div className="flex gap-2">
            <Button
              variant={viewMode === 'list' ? 'default' : 'outline'}
              onClick={() => setViewMode('list')}
              className="text-xs rounded-xl"
            >
              List View
            </Button>
            <Button
              variant={viewMode === 'flashcards' ? 'default' : 'outline'}
              onClick={() => {
                setViewMode('flashcards');
                setIsFlipped(false);
              }}
              className="text-xs rounded-xl"
            >
              <RotateCw className="w-3.5 h-3.5 mr-1" /> Flashcard Drill
            </Button>
          </div>
        )}
      </div>

      {savedVocab.length === 0 ? (
        <div className="bg-white rounded-3xl p-12 text-center border border-[#e5e0d8] space-y-4 max-w-lg mx-auto">
          <div className="w-16 h-16 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center mx-auto">
            <Bookmark className="w-8 h-8" />
          </div>
          <h3 className="text-2xl font-thunder">Your Vault is Currently Empty</h3>
          <p className="text-xs text-[#5e5e5e] leading-relaxed">
            As you study lessons or explore slang and regional phrases, click the bookmark icon to collect them here for quick flashcard revision.
          </p>
          <div className="flex justify-center gap-3 pt-2">
            <Button
              onClick={() => setCurrentView('courses')}
              className="bg-[#070707] text-white text-xs rounded-xl"
            >
              Explore Lessons
            </Button>
            <Button
              onClick={() => setCurrentView('regional-slang')}
              className="bg-[#ff3a1f] text-white text-xs rounded-xl"
            >
              Save Thai Slang
            </Button>
          </div>
        </div>
      ) : viewMode === 'flashcards' && currentCard ? (
        /* Flashcard Practice Mode */
        <div className="max-w-xl mx-auto space-y-6">
          <div className="text-center text-xs text-[#5e5e5e] font-semibold">
            Card {flashcardIndex + 1} of {savedVocab.length}
          </div>

          <div
            onClick={() => setIsFlipped(!isFlipped)}
            className="cursor-pointer min-h-[300px] bg-white rounded-3xl border-2 border-[#e5e0d8] hover:border-[#ff3a1f] shadow-lg p-8 flex flex-col justify-between items-center text-center transition-all duration-300"
          >
            <span className="text-[10px] font-bold px-3 py-1 rounded-full bg-[#f0ede8] text-[#5e5e5e] uppercase">
              {currentCard.category || 'General'}
            </span>

            {!isFlipped ? (
              <div className="space-y-3">
                <div className="text-5xl font-thunder text-[#070707]">{currentCard.thai}</div>
                <div className="text-sm font-semibold text-[#ff3a1f]">{currentCard.roman}</div>
                <div className="text-xs text-[#777] pt-2">Click to flip & reveal meaning</div>
              </div>
            ) : (
              <div className="space-y-3 animate-in fade-in">
                <div className="text-2xl font-bold text-[#070707]">"{currentCard.english}"</div>
                <div className="text-xs text-[#5e5e5e]">
                  Thai: {currentCard.thai} ({currentCard.roman})
                </div>
              </div>
            )}

            <div className="flex items-center gap-3">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  speakThai(currentCard.thai);
                }}
                className="p-3 bg-[#faf8f5] hover:bg-[#ff3a1f] hover:text-white rounded-2xl text-[#070707] transition-all"
                title="Listen to native pronunciation"
              >
                <Volume2 className="w-5 h-5" />
              </button>
            </div>
          </div>

          <div className="flex justify-between items-center">
            <Button
              variant="outline"
              disabled={flashcardIndex === 0}
              onClick={() => {
                setFlashcardIndex(flashcardIndex - 1);
                setIsFlipped(false);
              }}
              className="rounded-xl border-[#e5e0d8] text-xs"
            >
              Previous Card
            </Button>
            <Button
              disabled={flashcardIndex === savedVocab.length - 1}
              onClick={() => {
                setFlashcardIndex(flashcardIndex + 1);
                setIsFlipped(false);
              }}
              className="bg-[#070707] hover:bg-[#ff3a1f] text-white rounded-xl text-xs"
            >
              Next Card
            </Button>
          </div>
        </div>
      ) : (
        /* List Mode */
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {savedVocab.map((item) => (
            <div
              key={item.id}
              className="bg-white p-5 rounded-2xl border border-[#e5e0d8] shadow-sm hover:border-[#ff3a1f] transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#f0ede8] text-[#5e5e5e] uppercase">
                    {item.category || 'General'}
                  </span>
                  <button
                    onClick={() => toggleSaveVocab(item)}
                    className="text-[#999] hover:text-rose-600 transition-colors p-1"
                    title="Remove from vault"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="flex items-baseline gap-2 mb-1">
                  <h4 className="text-2xl font-thunder text-[#070707]">{item.thai}</h4>
                  <button
                    onClick={() => speakThai(item.thai)}
                    className="text-[#ff3a1f] hover:bg-[#faf8f5] p-1 rounded-lg transition-colors"
                  >
                    <Volume2 className="w-4 h-4" />
                  </button>
                </div>
                <div className="text-xs font-semibold text-[#ff3a1f] mb-1">{item.roman}</div>
                <div className="text-xs text-[#333]">"{item.english}"</div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
