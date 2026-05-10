'use client';

import { Suspense, useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { tripsApi } from '@/lib/api';
import PageWrapper from '@/components/PageWrapper';
import { 
  MapPin, Calendar, ArrowRight, Compass, 
  Globe, Sparkles, LayoutPanelLeft, Info
} from 'lucide-react';
import Link from 'next/link';

function NewTripForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const [form, setForm] = useState({
    title: '', description: '', startDate: '', endDate: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const city = searchParams.get('city');
    if (city) {
      setForm(prev => ({
        ...prev,
        title: `Expedition to ${city}`,
        description: `A customized journey to discover the heritage and activities in ${city}.`
      }));
    }
  }, [searchParams]);

  function updateField(field: string, value: string) {
    setForm(prev => ({ ...prev, [field]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');

    if (!form.title || !form.startDate || !form.endDate) {
      setError('Title, start date, and end date are required');
      return;
    }

    if (new Date(form.endDate) < new Date(form.startDate)) {
      setError('End date must be after start date');
      return;
    }

    setLoading(true);
    try {
      const trip = await tripsApi.create({
        title: form.title,
        description: form.description || undefined,
        startDate: form.startDate,
        endDate: form.endDate,
      });
      router.push(`/trips/${trip._id}`);
    } catch (err: any) {
      setError(err.message || 'Failed to create trip');
    } finally {
      setLoading(false);
    }
  }

  return (
    <PageWrapper>
      {/* Cinematic Background */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none rounded-tl-[40px]">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-[0.85] scale-105"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?q=80&w=2000')" }}
        />
        <div className="absolute inset-0 bg-gradient-to-br from-black/95 via-black/40 to-black/90" />
      </div>

      <div className="max-w-[1200px] mx-auto relative z-10 text-white min-h-[calc(100vh-4rem)] pt-8 pb-20 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
        
        {/* Left: Branding & Info */}
        <div className="space-y-10 animate-fadeIn">
          <div className="space-y-4">
            <div className="flex items-center gap-3 text-primary uppercase tracking-[0.4em] text-[10px] font-black">
              <div className="w-8 h-[2px] bg-primary" />
              Chronicle Creation
            </div>
            <h1 className="font-display text-8xl md:text-9xl text-white tracking-tighter leading-[0.8]">
              Map Your <span className="text-primary italic">Soul</span>
            </h1>
            <p className="text-white/40 mt-8 text-2xl font-light leading-relaxed italic">
              "The journey of a thousand miles begins with a single mapped route."
            </p>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div className="bg-white/5 backdrop-blur-3xl border border-white/10 p-8 rounded-[32px] space-y-4">
              <div className="w-12 h-12 bg-primary/20 rounded-2xl flex items-center justify-center border border-primary/30">
                <Globe className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xs font-black uppercase tracking-widest text-white">Global Routes</h3>
              <p className="text-[10px] text-white/40 font-bold uppercase tracking-widest leading-loose">Access 200+ curated heritage circuits.</p>
            </div>
            <div className="bg-white/5 backdrop-blur-3xl border border-white/10 p-8 rounded-[32px] space-y-4">
              <div className="w-12 h-12 bg-terracotta/20 rounded-2xl flex items-center justify-center border border-terracotta/30">
                <Sparkles className="w-6 h-6 text-terracotta" />
              </div>
              <h3 className="text-xs font-black uppercase tracking-widest text-white">AI Synthesis</h3>
              <p className="text-[10px] text-white/40 font-bold uppercase tracking-widest leading-loose">Intelligent itinerary generation.</p>
            </div>
          </div>
        </div>

        {/* Right: Premium Form */}
        <div className="bg-white/5 backdrop-blur-3xl border border-white/10 p-12 rounded-[48px] shadow-2xl relative overflow-hidden group animate-fadeInSlideUp">
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 blur-[120px] -mr-32 -mt-32" />
          
          <div className="relative z-10">
            <h2 className="font-display text-3xl text-white mb-8 italic">Expedition Parameters</h2>
            
            {error && (
              <div className="bg-red-500/10 border border-red-500/20 text-red-400 text-[10px] font-black uppercase tracking-widest rounded-2xl px-6 py-4 mb-8 flex items-center gap-3">
                <Info className="w-4 h-4" /> {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="space-y-3">
                <label className="text-[10px] font-black uppercase tracking-widest text-white/30 ml-2">Expedition Title</label>
                <div className="relative">
                  <MapPin className="absolute left-6 top-1/2 -translate-y-1/2 w-4 h-4 text-primary" />
                  <input
                    type="text"
                    value={form.title}
                    onChange={(e) => updateField('title', e.target.value)}
                    placeholder="e.g. The Varanasi Ritual Trail"
                    className="w-full pl-14 pr-6 py-5 bg-white/5 border border-white/10 rounded-2xl text-white placeholder:text-white/20 focus:outline-none focus:border-primary/50 transition-all text-sm font-medium"
                  />
                </div>
              </div>

              <div className="space-y-3">
                <label className="text-[10px] font-black uppercase tracking-widest text-white/30 ml-2">Objective <span className="italic text-white/10">(Optional)</span></label>
                <textarea
                  value={form.description}
                  onChange={(e) => updateField('description', e.target.value)}
                  placeholder="Define the soul of this journey..."
                  rows={4}
                  className="w-full px-6 py-5 bg-white/5 border border-white/10 rounded-2xl text-white placeholder:text-white/20 focus:outline-none focus:border-primary/50 transition-all text-sm font-medium resize-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-3">
                  <label className="text-[10px] font-black uppercase tracking-widest text-white/30 ml-2">Departure</label>
                  <div className="relative">
                    <Calendar className="absolute left-6 top-1/2 -translate-y-1/2 w-4 h-4 text-primary" />
                    <input
                      type="date"
                      value={form.startDate}
                      onChange={(e) => updateField('startDate', e.target.value)}
                      className="w-full pl-14 pr-6 py-5 bg-white/5 border border-white/10 rounded-2xl text-white focus:outline-none focus:border-primary/50 transition-all text-sm font-medium"
                    />
                  </div>
                </div>
                <div className="space-y-3">
                  <label className="text-[10px] font-black uppercase tracking-widest text-white/30 ml-2">Return</label>
                  <div className="relative">
                    <Calendar className="absolute left-6 top-1/2 -translate-y-1/2 w-4 h-4 text-primary" />
                    <input
                      type="date"
                      value={form.endDate}
                      onChange={(e) => updateField('endDate', e.target.value)}
                      className="w-full pl-14 pr-6 py-5 bg-white/5 border border-white/10 rounded-2xl text-white focus:outline-none focus:border-primary/50 transition-all text-sm font-medium"
                    />
                  </div>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-terracotta hover:bg-terracotta-hover text-white py-6 rounded-2xl font-black text-xs uppercase tracking-[0.3em] transition-all shadow-2xl shadow-terracotta/30 disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-4 group"
              >
                {loading ? (
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  <>Begin Chronicle <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" /></>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </PageWrapper>
  );
}

export default function NewTripPage() {
  return (
    <Suspense fallback={
      <PageWrapper>
        <div className="flex items-center justify-center min-h-[50vh]">
          <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin" />
        </div>
      </PageWrapper>
    }>
      <NewTripForm />
    </Suspense>
  );
}
