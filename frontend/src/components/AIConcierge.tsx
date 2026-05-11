'use client';

import { useState } from 'react';
import { aiApi } from '@/lib/api';
import { Sparkles, Send, X, Bot, User } from 'lucide-react';

export default function AIConcierge() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [messages, setMessages] = useState<{ role: 'ai' | 'user'; text: string }[]>([]);
  const [loading, setLoading] = useState(false);

  async function handleSend() {
    if (!query.trim()) return;
    
    const userMsg = query;
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setQuery('');
    setLoading(true);

    try {
      const response = await aiApi.query(userMsg);
      setMessages(prev => [...prev, { role: 'ai', text: response.answer }]);
    } catch (err) {
      setMessages(prev => [...prev, { role: 'ai', text: "I'm having trouble connecting to my travel brain right now." }]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="fixed bottom-8 right-8 z-[100]">
      {isOpen ? (
        <div className="bg-white rounded-3xl shadow-2xl border border-divider w-[350px] overflow-hidden animate-fadeIn">
          {/* Header */}
          <div className="bg-gradient-to-r from-primary to-primary-hover p-4 flex items-center justify-between text-white relative overflow-hidden">
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-0 right-0 w-20 h-20 bg-white rounded-full blur-2xl" />
            </div>
            <div className="flex items-center gap-2 relative z-10">
              <div className="w-8 h-8 rounded-lg bg-white/20 flex items-center justify-center border border-white/30 shadow-lg shadow-white/20">
                <Sparkles className="w-4 h-4 text-white" />
              </div>
              <div>
                <span className="font-display font-bold block leading-tight">Travel Concierge</span>
                <span className="text-[10px] text-white/70 block">AI Travel Assistant</span>
              </div>
            </div>
            <button 
              onClick={() => setIsOpen(false)}
              className="p-1 hover:bg-white/20 rounded-lg transition-all z-10"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Messages */}
          <div className="h-[400px] overflow-y-auto p-4 space-y-4 bg-surface-2 custom-scrollbar">
            {messages.length === 0 && (
              <div className="text-center py-10 animate-fadeIn">
                <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-3 border border-primary/20">
                  <Bot className="w-6 h-6 text-primary" />
                </div>
                <p className="text-xs text-text-muted font-medium">Hi there! I'm your AI travel companion</p>
                <p className="text-xs text-text-faint mt-1">Ask me about your trips, budget, or recommendations!</p>
              </div>
            )}
            {messages.map((m, i) => (
              <div key={i} className={`flex gap-2 animate-fadeIn ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                {m.role === 'ai' && (
                  <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 border border-primary/20">
                    <Bot className="w-3.5 h-3.5 text-primary" />
                  </div>
                )}
                <div className={`max-w-[75%] p-3 rounded-2xl text-sm ${
                  m.role === 'user' 
                    ? 'bg-primary text-white rounded-br-none shadow-md shadow-primary/20' 
                    : 'bg-white text-text border border-divider rounded-bl-none shadow-sm'
                }`}>
                  {m.text}
                </div>
                {m.role === 'user' && (
                  <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 border border-primary/20">
                    <User className="w-3.5 h-3.5 text-primary" />
                  </div>
                )}
              </div>
            ))}
            {loading && (
              <div className="flex gap-2 justify-start">
                <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 border border-primary/20">
                  <Bot className="w-3.5 h-3.5 text-primary" />
                </div>
                <div className="bg-white p-3 rounded-2xl border border-divider rounded-bl-none shadow-sm">
                  <div className="flex gap-1">
                    <div className="w-2 h-2 bg-text-muted rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                    <div className="w-2 h-2 bg-text-muted rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                    <div className="w-2 h-2 bg-text-muted rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Input */}
          <div className="p-4 bg-white border-t border-divider">
            <div className="relative group">
              <input 
                type="text" 
                value={query}
                onChange={e => setQuery(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && !loading && handleSend()}
                placeholder="Ask about trips..."
                disabled={loading}
                className="w-full pl-4 pr-10 py-3 bg-surface border border-divider rounded-xl text-sm focus:border-primary focus:ring-1 focus:ring-primary/20 outline-none transition-all disabled:opacity-50"
              />
              <button 
                onClick={handleSend}
                disabled={loading || !query.trim()}
                className="absolute right-2 top-1/2 -translate-y-1/2 p-2 text-primary hover:bg-primary/10 rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      ) : (
        <button 
          onClick={() => setIsOpen(true)}
          className="w-16 h-16 bg-gradient-to-br from-primary to-primary-hover rounded-2xl shadow-xl shadow-primary/40 flex items-center justify-center text-white hover:scale-110 active:scale-95 transition-all group relative"
        >
          <Sparkles className="w-8 h-8 group-hover:rotate-12 group-hover:text-white transition-all" />
          <div className="absolute -top-1 -right-1 bg-orange-500 text-[10px] font-black px-2 py-0.5 rounded-full animate-bounce text-white shadow-lg shadow-orange-500/50">AI</div>
        </button>
      )}
    </div>
  );
}
