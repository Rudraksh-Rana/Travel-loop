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
        <div className="bg-white rounded-3xl shadow-2xl border border-divider w-[350px] overflow-hidden animate-slideInUp">
          {/* Header */}
          <div className="bg-primary p-4 flex items-center justify-between text-white">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-white/20 flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-white" />
              </div>
              <span className="font-display font-bold">Travel Concierge</span>
            </div>
            <button onClick={() => setIsOpen(false)}><X className="w-5 h-5" /></button>
          </div>

          {/* Messages */}
          <div className="h-[400px] overflow-y-auto p-4 space-y-4 bg-surface-2">
            {messages.length === 0 && (
              <div className="text-center py-10">
                <Bot className="w-10 h-10 text-divider mx-auto mb-2" />
                <p className="text-xs text-text-muted">Ask me anything about your trips or budget!</p>
              </div>
            )}
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[80%] p-3 rounded-2xl text-sm ${
                  m.role === 'user' 
                    ? 'bg-primary text-white rounded-br-none' 
                    : 'bg-white text-text border border-divider rounded-bl-none shadow-sm'
                }`}>
                  {m.text}
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex justify-start">
                <div className="bg-white p-3 rounded-2xl border border-divider animate-pulse">
                  <div className="flex gap-1">
                    <div className="w-1 h-1 bg-text-faint rounded-full animate-bounce" />
                    <div className="w-1 h-1 bg-text-faint rounded-full animate-bounce delay-75" />
                    <div className="w-1 h-1 bg-text-faint rounded-full animate-bounce delay-150" />
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Input */}
          <div className="p-4 bg-white border-t border-divider">
            <div className="relative">
              <input 
                type="text" 
                value={query}
                onChange={e => setQuery(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && handleSend()}
                placeholder="Ask your concierge..."
                className="w-full pl-4 pr-10 py-3 bg-surface border border-divider rounded-xl text-sm focus:border-primary outline-none"
              />
              <button 
                onClick={handleSend}
                className="absolute right-2 top-1/2 -translate-y-1/2 p-2 text-primary hover:bg-primary/10 rounded-lg transition-all"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      ) : (
        <button 
          onClick={() => setIsOpen(true)}
          className="w-16 h-16 bg-primary rounded-2xl shadow-xl shadow-primary/30 flex items-center justify-center text-white hover:scale-105 transition-all group"
        >
          <Sparkles className="w-8 h-8 group-hover:rotate-12 transition-transform" />
          <div className="absolute -top-2 -right-2 bg-orange-500 text-[10px] font-bold px-2 py-1 rounded-full animate-bounce">AI</div>
        </button>
      )}
    </div>
  );
}
