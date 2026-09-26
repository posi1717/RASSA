import React, { useState, useRef, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import {
  NINNY_ROLEPLAY_SCENARIOS,
  askNinnyAI,
} from '../services/ninnyAi';
import type { RolePlayScenario, ChatMessage } from '../types/rassa';
import {
  Send,
  Volume2,
  Lock,
  Crown,
  MapPin,
  RefreshCw,
  Lightbulb,
} from 'lucide-react';
import { Button } from './ui/button';

export const NinnyAITutorView: React.FC = () => {
  const {
    subscriptionTier,
    setIsSubscriptionModalOpen,
    canUseNinnyAI,
    aiMessageCount,
    incrementAIMessageCount,
    speakThai,
  } = useApp();

  const isPaid = subscriptionTier === 'monthly' || subscriptionTier === 'yearly';

  const [selectedScenario, setSelectedScenario] = useState<RolePlayScenario | undefined>(
    NINNY_ROLEPLAY_SCENARIOS[0]
  );

  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'msg-welcome',
      sender: 'ninny',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      content: `Sawàt-dee khráp/kâ! I am **Ninny AI**, your personal Thai tutor and learning companion from London.

I'm here to help you speak with natural confidence in real life. You can:
- Ask me how to say anything in Thai with tone markers and polite particles (**khráp / kâ**).
- Practise the **"${NINNY_ROLEPLAY_SCENARIOS[0].title}"** role-play scenario below.
- Explore modern slang (**ปังมาก**, **ช็อตฟีล**) or regional dialects (**คำเมือง, อีสาน, ใต้**)!

What would you like to practise first?`,
    },
  ]);

  const [inputPrompt, setInputPrompt] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  const handleSendMessage = async (textToSend?: string) => {
    const text = (textToSend || inputPrompt).trim();
    if (!text || isLoading) return;

    if (!canUseNinnyAI) {
      setIsSubscriptionModalOpen(true);
      return;
    }

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      content: text,
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputPrompt('');
    setIsLoading(true);
    incrementAIMessageCount();

    try {
      const reply = await askNinnyAI(text, messages, selectedScenario);
      const ninnyMsg: ChatMessage = {
        id: `ninny-${Date.now()}`,
        sender: 'ninny',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        content: reply.text,
      };
      setMessages((prev) => [...prev, ninnyMsg]);
    } catch {
      const errorMsg: ChatMessage = {
        id: `err-${Date.now()}`,
        sender: 'ninny',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        content: 'Apologies, I encountered a brief network hitch. Please try asking again!',
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleScenarioChange = (scenario: RolePlayScenario) => {
    setSelectedScenario(scenario);
    const starterMsg: ChatMessage = {
      id: `scenario-${Date.now()}`,
      sender: 'ninny',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      content: `🎭 **Role-Play Mode Activated:** ${scenario.title} (${scenario.location})

${scenario.starterPrompt}

💡 *Suggested learner phrases you could try replying with:*
${scenario.suggestedPhrases
  .map((p) => `- **${p.thai}** (${p.roman}) — *"${p.english}"*`)
  .join('\n')}`,
    };
    setMessages((prev) => [...prev, starterMsg]);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-in fade-in space-y-6">
      {/* Top Banner & Free Quota Status */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-[#e5e0d8] shadow-sm">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-[#ff3a1f] to-[#ff7d66] text-white flex items-center justify-center font-thunder text-2xl shadow-md">
            N
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-2xl font-thunder text-[#070707]">Ninny AI Language Tutor</h2>
              <span className="px-2 py-0.5 text-[10px] font-bold bg-[#8b5cf6]/10 text-[#8b5cf6] rounded-full uppercase tracking-wider">
                Google Gemini Engine
              </span>
            </div>
            <p className="text-xs text-[#5e5e5e]">
              Personalized Thai pronunciation, tones, etiquette, slang & regional dialects.
            </p>
          </div>
        </div>

        {/* Free Quota vs Paid Badge */}
        <div className="flex items-center gap-3">
          {isPaid ? (
            <div className="flex items-center gap-1.5 px-3 py-1.5 bg-amber-50 border border-amber-300 rounded-xl text-xs font-bold text-amber-800">
              <Crown className="w-3.5 h-3.5 text-amber-600 fill-amber-600" />
              <span>Unlimited Subscriber Access</span>
            </div>
          ) : (
            <div className="flex items-center gap-3 bg-[#faf8f5] p-2 rounded-2xl border border-[#e5e0d8]">
              <div className="text-right">
                <div className="text-[11px] font-bold text-[#070707]">
                  Free Preview: {Math.min(aiMessageCount, 5)} / 5 Messages
                </div>
                <div className="text-[10px] text-[#777]">Upgrade for unlimited practice</div>
              </div>
              <Button
                size="sm"
                onClick={() => setIsSubscriptionModalOpen(true)}
                className="bg-[#ff3a1f] hover:bg-[#d82a12] text-white text-xs px-3 py-1.5 rounded-xl font-semibold"
              >
                Upgrade (£19.60/mo)
              </Button>
            </div>
          )}
        </div>
      </div>

      {/* Main Grid: Scenarios Sidebar + Chat Box */}
      <div className="grid lg:grid-cols-4 gap-6">
        {/* Scenarios Sidebar */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-[#070707]">
              Role-Play Scenarios
            </span>
            <span className="text-[10px] text-[#777]">Real life practice</span>
          </div>

          <div className="space-y-2">
            {NINNY_ROLEPLAY_SCENARIOS.map((sc) => {
              const isSelected = selectedScenario?.id === sc.id;
              return (
                <button
                  key={sc.id}
                  onClick={() => handleScenarioChange(sc)}
                  className={`w-full text-left p-3.5 rounded-2xl border transition-all ${
                    isSelected
                      ? 'bg-[#070707] text-white border-[#070707] shadow-md'
                      : 'bg-white border-[#e5e0d8] text-[#070707] hover:border-[#ff3a1f]'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-bold text-xs">{sc.title}</span>
                    <span
                      className={`text-[9px] px-1.5 py-0.5 rounded font-bold ${
                        isSelected ? 'bg-white/20 text-white' : 'bg-[#f0ede8] text-[#5e5e5e]'
                      }`}
                    >
                      {sc.difficulty}
                    </span>
                  </div>
                  <div
                    className={`text-[11px] flex items-center gap-1 ${
                      isSelected ? 'text-neutral-300' : 'text-[#777]'
                    }`}
                  >
                    <MapPin className="w-3 h-3 shrink-0" />
                    <span className="truncate">{sc.location}</span>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Quick Learning Chips */}
          <div className="p-4 bg-white rounded-2xl border border-[#e5e0d8] space-y-2">
            <div className="flex items-center gap-1.5 text-xs font-bold text-[#ff3a1f]">
              <Lightbulb className="w-3.5 h-3.5" /> Quick Prompts
            </div>
            <div className="space-y-1.5">
              {[
                'How do I order iced tea not too sweet?',
                'Explain how to use khráp and kâ naturally',
                'What is the difference between A-roi and Sàep?',
                'Teach me 3 modern Thai slang words',
                'How do I say "No plastic bag" at 7-Eleven?',
              ].map((qp, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSendMessage(qp)}
                  className="w-full text-left text-[11px] text-[#555] hover:text-[#070707] hover:bg-[#faf8f5] p-1.5 rounded-lg transition-colors border border-transparent hover:border-[#e5e0d8]"
                >
                  • {qp}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Chat Window */}
        <div className="lg:col-span-3 bg-white rounded-3xl border border-[#e5e0d8] shadow-md flex flex-col h-[650px] overflow-hidden">
          {/* Messages Stream */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
            {messages.map((msg) => {
              const isNinny = msg.sender === 'ninny';
              return (
                <div
                  key={msg.id}
                  className={`flex gap-3 ${isNinny ? 'justify-start' : 'justify-end'}`}
                >
                  {isNinny && (
                    <div className="w-8 h-8 rounded-xl bg-[#070707] text-white flex items-center justify-center font-thunder text-lg shrink-0 mt-1">
                      N
                    </div>
                  )}

                  <div
                    className={`max-w-[85%] sm:max-w-[75%] p-4 rounded-3xl text-xs sm:text-sm leading-relaxed ${
                      isNinny
                        ? 'bg-[#faf8f5] border border-[#e5e0d8] text-[#070707] rounded-tl-sm'
                        : 'bg-[#ff3a1f] text-white rounded-tr-sm shadow-sm'
                    }`}
                  >
                    <div className="whitespace-pre-line">{msg.content}</div>

                    <div
                      className={`text-[10px] mt-2 flex items-center justify-between ${
                        isNinny ? 'text-[#888]' : 'text-white/70'
                      }`}
                    >
                      <span>{msg.timestamp}</span>
                      {isNinny && (
                        <button
                          onClick={() => {
                            // Extract any Thai characters to speak
                            const thaiMatch = msg.content.match(/[\u0E00-\u0E7F]+/g);
                            if (thaiMatch) {
                              speakThai(thaiMatch.join(' '));
                            }
                          }}
                          className="flex items-center gap-1 hover:text-[#ff3a1f] transition-colors ml-3"
                          title="Listen to Thai text in this response"
                        >
                          <Volume2 className="w-3.5 h-3.5" /> Listen
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}

            {isLoading && (
              <div className="flex gap-3 items-center text-xs text-[#777]">
                <div className="w-8 h-8 rounded-xl bg-[#070707] text-white flex items-center justify-center font-thunder text-lg">
                  N
                </div>
                <div className="bg-[#faf8f5] p-3 rounded-2xl border border-[#e5e0d8] flex items-center gap-2">
                  <RefreshCw className="w-3.5 h-3.5 animate-spin text-[#ff3a1f]" />
                  <span>Ninny AI is preparing your explanation...</span>
                </div>
              </div>
            )}
            <div ref={chatEndRef} />
          </div>

          {/* Paywall Banner if Quota Exceeded */}
          {!canUseNinnyAI && (
            <div className="p-3 bg-amber-50 border-t border-amber-200 flex items-center justify-between gap-3 text-xs text-amber-900">
              <div className="flex items-center gap-2">
                <Lock className="w-4 h-4 text-amber-600" />
                <span>You've completed your free preview messages. Unlock unlimited tutor access!</span>
              </div>
              <Button
                size="sm"
                onClick={() => setIsSubscriptionModalOpen(true)}
                className="bg-[#ff3a1f] text-white text-xs px-3 py-1 rounded-xl"
              >
                Subscribe (£19.60)
              </Button>
            </div>
          )}

          {/* Chat Input Bar */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="p-3 sm:p-4 border-t border-[#e5e0d8] bg-white flex gap-2"
          >
            <input
              type="text"
              value={inputPrompt}
              onChange={(e) => setInputPrompt(e.target.value)}
              placeholder="Ask Ninny AI anything about Thai, polite particles, slang, or role-play..."
              disabled={!canUseNinnyAI || isLoading}
              className="flex-1 px-4 py-3 bg-[#faf8f5] border border-[#e5e0d8] rounded-2xl text-xs sm:text-sm focus:outline-none focus:border-[#ff3a1f] disabled:opacity-50"
            />
            <Button
              type="submit"
              disabled={!canUseNinnyAI || isLoading || !inputPrompt.trim()}
              className="bg-[#070707] hover:bg-[#ff3a1f] text-white px-5 py-3 rounded-2xl transition-all shadow-sm shrink-0"
            >
              <Send className="w-4 h-4" />
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};
