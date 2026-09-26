import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { X, Send, CheckCircle2, MessageSquareHeart } from 'lucide-react';
import { Button } from './ui/button';

export const FeedbackModal: React.FC = () => {
  const { isFeedbackModalOpen, setIsFeedbackModalOpen } = useApp();
  const [category, setCategory] = useState<'feedback' | 'bug' | 'lesson_request'>('feedback');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  if (!isFeedbackModalOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setMessage('');
      setIsFeedbackModalOpen(false);
    }, 1800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in">
      <div className="relative w-full max-w-lg bg-[#faf8f5] rounded-3xl border border-[#e5e0d8] shadow-2xl p-6 sm:p-8 text-[#070707]">
        <button
          onClick={() => setIsFeedbackModalOpen(false)}
          className="absolute top-6 right-6 p-2 text-[#5e5e5e] hover:text-[#070707] hover:bg-[#eadecc] rounded-full transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {submitted ? (
          <div className="text-center py-8 space-y-3">
            <CheckCircle2 className="w-12 h-12 text-[#10b981] mx-auto animate-bounce" />
            <h3 className="text-2xl font-thunder">Khòop-khun khráp / kâ!</h3>
            <p className="text-sm text-[#5e5e5e]">
              Thank you for helping us shape RASSA. Your feedback directly informs our curriculum and Ninny AI updates.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#ff3a1f]">
              <MessageSquareHeart className="w-4 h-4" />
              Learner Feedback
            </div>
            <h2 className="text-2xl sm:text-3xl font-thunder">Share Your Thoughts with the Team</h2>
            <p className="text-xs text-[#5e5e5e]">
              Based in London, our team reads every suggestion to ensure RASSA is the most practical Thai platform available.
            </p>

            <div className="flex gap-2 pt-2">
              {[
                { id: 'feedback', label: 'Suggestion' },
                { id: 'bug', label: 'Report Bug' },
                { id: 'lesson_request', label: 'Request Topic' },
              ].map((c) => (
                <button
                  key={c.id}
                  type="button"
                  onClick={() => setCategory(c.id as any)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all ${
                    category === c.id
                      ? 'bg-[#070707] text-white border-[#070707]'
                      : 'bg-white border-[#e5e0d8] text-[#5e5e5e] hover:border-[#070707]'
                  }`}
                >
                  {c.label}
                </button>
              ))}
            </div>

            <div>
              <textarea
                rows={4}
                required
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Tell us what you loved, what felt confusing, or what phrase you wish Ninny AI could teach..."
                className="w-full p-3.5 bg-white border border-[#e5e0d8] rounded-xl text-sm focus:outline-none focus:border-[#ff3a1f] resize-none"
              />
            </div>

            <Button
              type="submit"
              className="w-full py-4 bg-[#ff3a1f] hover:bg-[#d82a12] text-white rounded-xl font-semibold flex items-center justify-center gap-2"
            >
              Send Feedback <Send className="w-4 h-4" />
            </Button>
          </form>
        )}
      </div>
    </div>
  );
};
