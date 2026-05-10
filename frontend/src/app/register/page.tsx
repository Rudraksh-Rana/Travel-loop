'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { User, Mail, Lock, Phone, MapPin, ArrowRight, Sparkles, Compass, Landmark } from 'lucide-react';

export default function RegisterPage() {
  const { register, isAuthenticated } = useAuth();
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    phone: '',
    city: '',
    country: 'India'
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
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
      await register(formData);
      router.push('/dashboard');
    } catch (err: any) {
      setError(err.message || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-[#0D0C0B] py-16">
      {/* Cinematic Background Overlay */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat opacity-[0.5] scale-105"
        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1548013146-72479768bbaa?q=80&w=2000')" }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-[#0D0C0B] via-transparent to-black/30" />
      </div>

      {/* Auth Card */}
      <div className="relative z-10 w-full max-w-[700px] px-6">
        <div className="bg-white/5 backdrop-blur-3xl border border-white/10 rounded-[40px] p-12 shadow-2xl shadow-black/80">
          
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-3 text-primary uppercase tracking-[0.4em] text-[10px] font-black mb-6">
              <Compass className="w-4 h-4" />
              Begin Your Chronicle
            </div>
            <Link href="/">
              <h1 className="font-display text-5xl text-white tracking-tighter mb-4">
                Join Travel<span className="text-primary italic">oop</span>
              </h1>
            </Link>
            <p className="text-white/40 text-lg font-light italic leading-relaxed">Create your traveler identity for the Indian subcontinent.</p>
          </div>

          {error && (
            <div className="mb-8 p-5 bg-red-500/10 border border-red-500/20 rounded-2xl text-red-400 text-xs text-center">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-3">
              <label className="text-[10px] uppercase tracking-[0.3em] font-black text-white/30 ml-4">Full Name</label>
              <div className="relative">
                <User className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20" />
                <input 
                  type="text" 
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="w-full bg-white/5 border border-white/10 rounded-[20px] py-4.5 pl-14 pr-6 text-white outline-none focus:border-primary/50 focus:bg-white/10 transition-all text-sm font-medium"
                  placeholder="Aryan Sharma"
                  required
                />
              </div>
            </div>

            <div className="space-y-3">
              <label className="text-[10px] uppercase tracking-[0.3em] font-black text-white/30 ml-4">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20" />
                <input 
                  type="email" 
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className="w-full bg-white/5 border border-white/10 rounded-[20px] py-4.5 pl-14 pr-6 text-white outline-none focus:border-primary/50 focus:bg-white/10 transition-all text-sm font-medium"
                  placeholder="aryan@explore.com"
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
                  value={formData.password}
                  onChange={(e) => setFormData({...formData, password: e.target.value})}
                  className="w-full bg-white/5 border border-white/10 rounded-[20px] py-4.5 pl-14 pr-6 text-white outline-none focus:border-primary/50 focus:bg-white/10 transition-all text-sm font-medium"
                  placeholder="••••••••"
                  required
                />
              </div>
            </div>

            <div className="space-y-3">
              <label className="text-[10px] uppercase tracking-[0.3em] font-black text-white/30 ml-4">Phone (Optional)</label>
              <div className="relative">
                <Phone className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20" />
                <input 
                  type="text" 
                  value={formData.phone}
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  className="w-full bg-white/5 border border-white/10 rounded-[20px] py-4.5 pl-14 pr-6 text-white outline-none focus:border-primary/50 focus:bg-white/10 transition-all text-sm font-medium"
                  placeholder="+91 98765 43210"
                />
              </div>
            </div>

            <div className="space-y-3">
              <label className="text-[10px] uppercase tracking-[0.3em] font-black text-white/30 ml-4">Home City</label>
              <div className="relative">
                <MapPin className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20" />
                <input 
                  type="text" 
                  value={formData.city}
                  onChange={(e) => setFormData({...formData, city: e.target.value})}
                  className="w-full bg-white/5 border border-white/10 rounded-[20px] py-4.5 pl-14 pr-6 text-white outline-none focus:border-primary/50 focus:bg-white/10 transition-all text-sm font-medium"
                  placeholder="e.g. Jaipur"
                />
              </div>
            </div>

            <div className="flex flex-col justify-end">
              <button 
                type="submit" 
                disabled={loading}
                className="w-full bg-terracotta hover:bg-terracotta-hover text-white py-5 rounded-[24px] font-black text-xs uppercase tracking-[0.2em] transition-all shadow-2xl shadow-terracotta/20 flex items-center justify-center gap-4 group active:scale-95"
              >
                {loading ? (
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <>
                    Begin Journey <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
                  </>
                )}
              </button>
            </div>
          </form>

          <div className="mt-12 text-center text-white/30 text-[11px] font-bold uppercase tracking-widest">
            Already part of the chronicle?{' '}
            <Link href="/login" className="text-white hover:text-primary transition-colors underline underline-offset-8 decoration-primary/50">
              Sign In to Identity
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
