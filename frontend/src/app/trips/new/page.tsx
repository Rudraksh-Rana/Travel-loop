'use client';

import { Suspense, useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { tripsApi } from '@/lib/api';
import PageWrapper from '@/components/PageWrapper';
import MapModule from '@/components/MapModule';
import { 
  MapPin, Calendar, ArrowRight, Compass, 
  Globe, Sparkles, LayoutPanelLeft, Info,
  Plane, Train, Navigation
} from 'lucide-react';
import Link from 'next/link';

function NewTripForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const [form, setForm] = useState({
    title: '', description: '', startDate: '', endDate: '', pickupLocation: '', destination: ''
  });
  const [transitData, setTransitData] = useState<{ flights: number; trains: number } | null>(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const city = searchParams.get('city');
    if (city) {
      setForm(prev => ({
        ...prev,
        title: `Expedition to ${city}`,
        destination: city,
        description: `A customized journey to discover the heritage and activities in ${city}.`
      }));
    }
  }, [searchParams]);

  // Simulate transit route calculation
  useEffect(() => {
    if (form.pickupLocation && form.destination) {
      const timer = setTimeout(() => {
        setTransitData({
          flights: Math.floor(Math.random() * 12) + 1,
          trains: Math.floor(Math.random() * 8) + 2
        });
      }, 1000);
      return () => clearTimeout(timer);
    } else {
      setTransitData(null);
    }
  }, [form.pickupLocation, form.destination]);

  function updateField(field: string, value: string) {
    setForm(prev => ({ ...prev, [field]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');

    if (!form.title || !form.startDate || !form.endDate || !form.pickupLocation || !form.destination) {
      setError('All fields including pickup and destination are required');
      return;
    }

    if (new Date(form.endDate) < new Date(form.startDate)) {
      setError('End date must be after start date');
      return;
    }

    setLoading(true);
    try {
      const trip = await tripsApi.create(form);
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

      <div className="relative z-10 text-white min-h-screen pt-4 pb-20 grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">
        
        {/* Left: Branding & Map Visualization */}
        <div className="space-y-12 animate-fadeIn sticky top-4">
          <div className="space-y-4">
            <div className="flex items-center gap-3 text-primary uppercase tracking-[0.4em] text-[10px] font-black">
              <div className="w-8 h-[2px] bg-primary" />
              Expedition Mapping Module
            </div>
            <h1 className="font-display text-8xl md:text-9xl text-white tracking-tighter leading-[0.8]">
              Route <span className="text-primary italic">Synthesis</span>
            </h1>
            <p className="text-white/40 mt-8 text-2xl font-light leading-relaxed italic max-w-xl">
              Visualize your heritage path across the subcontinent and analyze transit accessibility.
            </p>
          </div>

          <MapModule pickup={form.pickupLocation} destination={form.destination} />

          {/* Transit Analytics Card */}
          {transitData && (
            <div className="bg-white/5 backdrop-blur-3xl border border-white/10 p-10 rounded-[48px] animate-fadeInSlideUp relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 blur-[60px] -mr-16 -mt-16" />
              <div className="flex items-center gap-4 mb-8">
                <div className="w-10 h-10 bg-primary/20 rounded-xl flex items-center justify-center border border-primary/30">
                  <Navigation className="w-5 h-5 text-primary" />
                </div>
                <h3 className="text-sm font-black uppercase tracking-widest text-white">Transit Analytics</h3>
              </div>
              
              <div className="grid grid-cols-2 gap-8">
                <div className="space-y-4">
                  <div className="flex items-center gap-3 text-[10px] font-black uppercase tracking-widest text-white/30">
                    <Plane className="w-4 h-4 text-primary" /> Air Routes
                  </div>
                  <div className="flex items-baseline gap-2">
                    <span className="text-5xl font-display text-white italic">{transitData.flights}</span>
                    <span className="text-[10px] font-black text-primary uppercase">Available</span>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center gap-3 text-[10px] font-black uppercase tracking-widest text-white/30">
                    <Train className="w-4 h-4 text-terracotta" /> Railway
                  </div>
                  <div className="flex items-baseline gap-2">
                    <span className="text-5xl font-display text-white italic">{transitData.trains}</span>
                    <span className="text-[10px] font-black text-terracotta uppercase">Express</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Right: Premium Parameters Form */}
        <div className="bg-white/5 backdrop-blur-3xl border border-white/10 p-12 rounded-[48px] shadow-2xl relative overflow-hidden group animate-fadeInSlideRight">
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 blur-[120px] -mr-32 -mt-32" />
          
          <div className="relative z-10">
            <h2 className="font-display text-3xl text-white mb-8 italic">Define Parameters</h2>
            
            {error && (
              <div className="bg-red-500/10 border border-red-500/20 text-red-400 text-[10px] font-black uppercase tracking-widest rounded-2xl px-6 py-4 mb-8 flex items-center gap-3">
                <Info className="w-4 h-4" /> {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="space-y-3">
                <label className="text-[10px] font-black uppercase tracking-widest text-white/30 ml-2">Expedition Title</label>
                <input
                  type="text"
                  value={form.title}
                  onChange={(e) => updateField('title', e.target.value)}
                  placeholder="e.g. Rajasthan Heritage Ritual"
                  className="w-full px-8 py-5 bg-white/5 border border-white/10 rounded-2xl text-white placeholder:text-white/20 focus:outline-none focus:border-primary/50 transition-all text-sm font-medium"
                />
              </div>

              <div className="grid grid-cols-2 gap-8">
                <div className="space-y-3">
                  <label className="text-[10px] font-black uppercase tracking-widest text-white/30 ml-2">Origin Point</label>
                  <div className="relative">
                    <Navigation className="absolute left-6 top-1/2 -translate-y-1/2 w-4 h-4 text-primary" />
                    <input
                      type="text"
                      value={form.pickupLocation}
                      onChange={(e) => updateField('pickupLocation', e.target.value)}
                      placeholder="Pickup City"
                      className="w-full pl-14 pr-6 py-5 bg-white/5 border border-white/10 rounded-2xl text-white placeholder:text-white/20 focus:outline-none focus:border-primary/50 transition-all text-sm font-medium"
                    />
                  </div>
                </div>
                <div className="space-y-3">
                  <label className="text-[10px] font-black uppercase tracking-widest text-white/30 ml-2">Target Sanctum</label>
                  <div className="relative">
                    <MapPin className="absolute left-6 top-1/2 -translate-y-1/2 w-4 h-4 text-terracotta" />
                    <input
                      type="text"
                      value={form.destination}
                      onChange={(e) => updateField('destination', e.target.value)}
                      placeholder="Destination"
                      className="w-full pl-14 pr-6 py-5 bg-white/5 border border-white/10 rounded-2xl text-white placeholder:text-white/20 focus:outline-none focus:border-terracotta/50 transition-all text-sm font-medium"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-8">
                <div className="space-y-3">
                  <label className="text-[10px] font-black uppercase tracking-widest text-white/30 ml-2">Departure</label>
                  <input
                    type="date"
                    value={form.startDate}
                    onChange={(e) => updateField('startDate', e.target.value)}
                    className="w-full px-6 py-5 bg-white/5 border border-white/10 rounded-2xl text-white focus:outline-none focus:border-primary/50 transition-all text-sm font-medium"
                  />
                </div>
                <div className="space-y-3">
                  <label className="text-[10px] font-black uppercase tracking-widest text-white/30 ml-2">Return</label>
                  <input
                    type="date"
                    value={form.endDate}
                    onChange={(e) => updateField('endDate', e.target.value)}
                    className="w-full px-6 py-5 bg-white/5 border border-white/10 rounded-2xl text-white focus:outline-none focus:border-primary/50 transition-all text-sm font-medium"
                  />
                </div>
              </div>

              <div className="space-y-3">
                <label className="text-[10px] font-black uppercase tracking-widest text-white/30 ml-2">Objective <span className="italic text-white/10">(Optional)</span></label>
                <textarea
                  value={form.description}
                  onChange={(e) => updateField('description', e.target.value)}
                  placeholder="Define the narrative of this journey..."
                  rows={4}
                  className="w-full px-6 py-5 bg-white/5 border border-white/10 rounded-2xl text-white placeholder:text-white/20 focus:outline-none focus:border-primary/50 transition-all text-sm font-medium resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="btn-terracotta w-full py-7 disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-4 group"
              >
                {loading ? (
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  <>Begin Route Synthesis <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" /></>
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
