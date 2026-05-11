'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { MapPin, ArrowRight, Lock, Mail, Sparkles, Landmark } from 'lucide-react';

export default function LoginPage() {
  const { login, isAuthenticated } = useAuth();
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    // Check for remembered email
    const savedEmail = localStorage.getItem('traveloop_remembered_email');
    if (savedEmail) {
      setEmail(savedEmail);
      setRememberMe(true);
    }

    if (isAuthenticated) {
      router.push('/dashboard');
    }
  }, [isAuthenticated, router]);

  if (isAuthenticated) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      if (rememberMe) {
        localStorage.setItem('traveloop_remembered_email', email);
      } else {
        localStorage.removeItem('traveloop_remembered_email');
      }
      await login(email, password);
      router.push('/dashboard');
    } catch (err: any) {
      setError(err.message || 'Login failed. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-[#0D0C0B]">
      {/* Cinematic Background Overlay */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat opacity-[0.55] scale-105"
        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1599661046289-e31897846e41?q=80&w=2000')" }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-[#0D0C0B] via-transparent to-black/30" />
      </div>

      {/* Auth Card */}
      <div className="relative z-10 w-full max-w-[500px] px-6">
        <div className="bg-white/5 backdrop-blur-3xl border border-white/10 rounded-[40px] p-12 shadow-2xl shadow-black/80">
          
          {/* Logo & Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-3 text-primary uppercase tracking-[0.4em] text-[10px] font-black mb-6">
              <Landmark className="w-4 h-4" />
              Heritage Chronicle
            </div>
            <Link href="/">
              <h1 className="font-display text-5xl text-white tracking-tighter mb-4">
                Travel<span className="text-primary italic">oop</span>
              </h1>
            </Link>
            <p className="text-white/40 text-lg font-light italic leading-relaxed">Step into the Indian story.</p>
          </div>

          {error && (
            <div className="mb-8 p-5 bg-red-500/10 border border-red-500/20 rounded-2xl text-red-400 text-xs text-center">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="space-y-3">
              <label className="text-[10px] uppercase tracking-[0.3em] font-black text-white/30 ml-4">Email Identity</label>
              <div className="relative">
                <Mail className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20" />
                <input 
                  type="email" 
                  name="email"
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-white/10 border border-white/20 rounded-[20px] py-5 pl-14 pr-6 text-white outline-none focus:border-primary/50 focus:bg-white/15 transition-all text-sm font-medium placeholder:text-white/40"
                  placeholder="explorer@traveloop.com"
                  required
                />
              </div>
            </div>

            <div className="space-y-3">
              <label className="text-[10px] uppercase tracking-[0.3em] font-black text-white/30 ml-4">Secret Code</label>
              <div className="relative">
                <Lock className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20" />
                <input 
                  type="password" 
                  name="password"
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-white/10 border border-white/20 rounded-[20px] py-5 pl-14 pr-6 text-white outline-none focus:border-primary/50 focus:bg-white/15 transition-all text-sm font-medium placeholder:text-white/40"
                  placeholder="••••••••"
                  required
                />
              </div>
            </div>

            {/* Remember Me & Forgot Password */}
            <div className="flex items-center justify-between px-2">
              <label className="flex items-center gap-3 cursor-pointer group">
                <input 
                  type="checkbox" 
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-4 h-4 rounded border-white/10 bg-white/5 text-primary focus:ring-primary/20 transition-all cursor-pointer"
                />
                <span className="text-[10px] uppercase tracking-widest font-black text-white/30 group-hover:text-white transition-colors">Remember Identity</span>
              </label>
              <button type="button" className="text-[10px] uppercase tracking-widest font-black text-white/20 hover:text-primary transition-colors">Forgot?</button>
            </div>

            <button 
              type="submit" 
              disabled={loading}
              className="w-full bg-terracotta hover:bg-terracotta-hover text-white py-6 rounded-[24px] font-black text-xs uppercase tracking-[0.2em] transition-all shadow-2xl shadow-terracotta/20 flex items-center justify-center gap-4 group mt-12 active:scale-95"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  Enter the Expedition <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
                </>
              )}
            </button>
          </form>

          <div className="mt-12 text-center text-white/30 text-[11px] font-bold uppercase tracking-widest">
            New Explorer?{' '}
            <Link href="/register" className="text-white hover:text-primary transition-colors underline underline-offset-8 decoration-primary/50">
              Create an Identity
            </Link>
          </div>
        </div>

        {/* Footer Note */}
        <div className="mt-12 text-center">
          <p className="text-[10px] text-white/10 uppercase tracking-[0.6em] font-black italic">Modern Heritage · India</p>
        </div>
      </div>
    </div>
  );
}
