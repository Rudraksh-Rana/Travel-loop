'use client';

import { useState, useEffect, useRef, ElementType } from 'react';
import { useAuth } from '@/context/AuthContext';
import { tripsApi, notesApi } from '@/lib/api';
import PageWrapper from '@/components/PageWrapper';
import { 
  Calendar, MapPin, PlusCircle, ArrowRight, 
  Map as MapIcon, Compass, Globe, Clock,
  TrendingUp, Star, Camera, Landmark, 
  LayoutDashboard, Search, Sparkles, Users
} from 'lucide-react';
import Link from 'next/link';
import AuthGuard from '@/components/AuthGuard';
import SafeImage from '@/components/SafeImage';

/* Animated number counter hook */
function useCountUp(target: number, duration = 1200) {
  const [count, setCount] = useState(0);
  const ref = useRef<ReturnType<typeof setInterval> | null>(null);
  useEffect(() => {
    if (target === 0) { setCount(0); return; }
    const steps = 30;
    const step = target / steps;
    let current = 0;
    ref.current = setInterval(() => {
      current += step;
      if (current >= target) { setCount(target); clearInterval(ref.current!); }
      else setCount(Math.floor(current));
    }, duration / steps);
    return () => clearInterval(ref.current!);
  }, [target, duration]);
  return count;
}

export default function DashboardPage() {
  const { user } = useAuth();
  const [trips, setTrips] = useState<any[]>([]);
  const [notes, setNotes] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;
    
    Promise.all([
      tripsApi.list(),
      notesApi.listAll ? notesApi.listAll() : Promise.resolve([]) 
    ]).then(([tripsData, notesData]) => {
      setTrips(tripsData);
      setNotes(notesData || []);
    })
    .catch(console.error)
    .finally(() => setLoading(false));
  }, [user]);

  const upcomingTrips = trips.filter(t => new Date(t.startDate) > new Date()).slice(0, 3);
  const citiesVisited = new Set(trips.flatMap(t => t.stops?.map((s: any) => s.cityName) || [])).size;

  return (
    <AuthGuard>
      <PageWrapper>
        {/* Cinematic Background */}
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none rounded-tl-[40px]">
          <div 
            className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-[0.8] animate-slowZoom"
            style={{ backgroundImage: "url('https://images.unsplash.com/photo-1488646953014-85cb44e25828?q=80&w=2000')" }}
          />
          <div className="absolute inset-0 overlay-dark" />
          <div className="absolute top-1/4 left-1/3 w-96 h-96 bg-primary/10 rounded-full blur-[120px] animate-floatY" />
        </div>

        <div className="relative z-10 text-white min-h-screen pt-4 pb-20 animate-fadeIn px-4 md:px-8 lg:px-0">
          
          {/* Header Section - Inspired by Pipe's minimalist clarity */}
          <header className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8 pt-8">
            <div className="space-y-4">
              <div className="flex items-center gap-3 text-primary uppercase tracking-[0.4em] text-[10px] font-black">
                <div className="w-8 h-[2px] bg-primary" />
                Registry Status: Active
              </div>
              <h1 className="font-display text-6xl md:text-8xl text-white tracking-tighter leading-[0.8] text-shadow">
                Namaste, <span className="text-primary italic">{user?.name?.split(' ')[0] || 'Traveler'}</span>
              </h1>
              <p className="text-white/40 mt-6 text-xl font-light max-w-xl leading-relaxed italic">
                The chronicle continues. Your bento planning deck is synchronized.
              </p>
            </div>
            
            <Link href="/trips/new" className="btn-terracotta flex items-center gap-4 group px-10 py-6 shadow-2xl shadow-terracotta/20 animate-pulseGlowTerra">
              <PlusCircle className="w-5 h-5 group-hover:rotate-90 transition-transform duration-500" /> 
              New Expedition
            </Link>
          </header>

          {/* Bento Grid Container */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-10 pb-20">
            
            {/* 1. Feature Anchor (Bento Large) */}
            <section className="lg:col-span-8 lg:row-span-2 relative rounded-[56px] overflow-hidden group shadow-2xl border border-white/10 p-12 min-h-[600px] flex flex-col justify-end">
              <SafeImage 
                src="https://images.unsplash.com/photo-1599661046289-e31897846e41?q=80&w=1200" 
                category="hero" alt="Jaipur" fill priority
                className="object-cover group-hover:scale-110 transition-transform duration-[4000ms] opacity-80"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
              
              <div className="relative z-10 space-y-8 max-w-xl">
                <div className="flex flex-wrap gap-3">
                  <span className="bg-primary/90 backdrop-blur-2xl text-white text-[10px] font-black px-5 py-2.5 rounded-full uppercase tracking-widest border border-white/20">
                    Curated Blueprint
                  </span>
                  <span className="bg-black/60 backdrop-blur-2xl text-white/80 text-[10px] font-bold px-5 py-2.5 rounded-full uppercase tracking-widest border border-white/10">
                    High Demand
                  </span>
                </div>
                <h2 className="font-display text-5xl md:text-7xl text-white leading-[0.9]">Jaipur: The <span className="italic text-primary">Royal</span> Protocol</h2>
                <p className="text-white/70 text-lg font-light leading-relaxed">
                  Optimized heritage routes through the Pink City. Ready to engage?
                </p>
                <div className="pt-4 flex items-center gap-8">
                  <Link href="/trips/new?city=Jaipur" className="bg-white text-black px-10 py-5 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-primary hover:text-white transition-all shadow-xl active:scale-95">
                    Start Mapping
                  </Link>
                  <button className="text-white/40 hover:text-white text-[10px] font-black uppercase tracking-widest flex items-center gap-3 group/sub transition-colors">
                    Preview Trace <ArrowRight className="w-4 h-4 group-hover/sub:translate-x-2 transition-transform" />
                  </button>
                </div>
              </div>
            </section>

            {/* 2. Metrics Cluster (Bento Sub-grid) */}
            <div className="lg:col-span-4 lg:row-span-2 grid grid-cols-2 lg:grid-cols-1 gap-6">
              <StatWidget icon={MapIcon}   label="Plans"   value={trips.length}   color="text-primary"    delay={0}   />
              <StatWidget icon={Globe}     label="Cities"  value={citiesVisited}  color="text-orange-500" delay={100} />
              <StatWidget icon={TrendingUp} label="Budget"  value="92%"            color="text-terracotta" delay={200} />
              <StatWidget icon={Camera}    label="Archive" value={notes.length}   color="text-blue-400"   delay={300} />
            </div>

            {/* 3. Expedition Registry (Bento Medium-Wide) */}
            <section className="lg:col-span-7 bg-white/[0.03] backdrop-blur-3xl border border-white/10 rounded-[56px] p-12 relative overflow-hidden group">
               <div className="flex items-center justify-between mb-12">
                  <h2 className="font-display text-4xl text-white italic">Registry</h2>
                  <Link href="/trips" className="text-white/30 hover:text-white text-[10px] uppercase tracking-[0.3em] font-black flex items-center gap-3 transition-all">
                    All Trips <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>

                {trips.length === 0 ? (
                  <div className="py-12 text-center">
                    <Compass className="w-12 h-12 text-white/10 mx-auto mb-4 animate-floatY" />
                    <p className="text-white/20 text-sm">No active expeditions found.</p>
                  </div>
                ) : (
                  <div className="space-y-6">
                    {trips.slice(0, 2).map((trip) => (
                      <Link href={`/trips/${trip._id}`} key={trip._id} className="flex items-center gap-6 p-6 bg-white/[0.05] rounded-3xl border border-white/5 hover:border-primary/30 hover:bg-white/[0.08] transition-all group/item">
                        <div className="w-20 h-20 rounded-2xl overflow-hidden relative shrink-0">
                          <SafeImage src={trip.coverPhotoUrl || ''} category="hero" alt="" fill className="object-cover" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="text-white font-display text-xl mb-1 truncate">{trip.title}</h4>
                          <p className="text-white/30 text-[10px] uppercase font-black tracking-widest">{trip.stops?.length || 0} Map Points</p>
                        </div>
                        <ChevronRight className="w-5 h-5 text-white/20 group-hover/item:text-primary group-hover/item:translate-x-2 transition-all" />
                      </Link>
                    ))}
                  </div>
                )}
            </section>

            {/* 4. Action Console (Bento Medium-Compact) */}
            <section className="lg:col-span-5 bg-terracotta/[0.05] backdrop-blur-3xl border border-terracotta/20 rounded-[56px] p-12 relative overflow-hidden group">
              <Star className="absolute -right-10 -top-10 w-48 h-48 text-terracotta/5 group-hover:scale-110 transition-transform duration-[3000ms]" />
              <h3 className="font-display text-4xl text-white mb-10 relative z-10 italic">Console</h3>
              <div className="grid grid-cols-2 gap-4 relative z-10">
                <QuickAction label="Bookings" icon={Star}       delay={0}   />
                <QuickAction label="Guides"   icon={Users}      delay={80}  />
                <QuickAction label="Tracing"  icon={Sparkles}   delay={160} />
                <QuickAction label="Finances" icon={TrendingUp}  delay={240} />
              </div>
            </section>

            {/* 5. Discovery Feed (Bento Wide) */}
            <section className="lg:col-span-8 space-y-10">
              <div className="flex items-center justify-between">
                <h2 className="font-display text-4xl text-white italic">Discovery Feed</h2>
                <Link href="/discovery" className="text-white/30 hover:text-white text-[10px] uppercase tracking-[0.3em] font-black flex items-center gap-3 transition-all">
                  Full Map <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <SampleCityCard title="Varanasi" img="https://images.unsplash.com/photo-1561359313-0639aad49ca6?q=80&w=800" tags={['Heritage']} />
                <SampleCityCard title="Munnar" img="https://images.unsplash.com/photo-1593181629936-11c609b8db9b?q=80&w=800" tags={['Nature']} />
              </div>
            </section>

            {/* 6. Insights (Bento Vertical) */}
            <section className="lg:col-span-4 bg-primary/[0.03] backdrop-blur-3xl border border-primary/20 rounded-[56px] p-12 relative overflow-hidden group">
              <Landmark className="absolute -right-8 -top-8 w-40 h-40 text-primary/5 group-hover:rotate-12 transition-transform duration-[3000ms]" />
              <h3 className="font-display text-4xl text-white mb-10 relative z-10 italic">Insights</h3>
              <div className="space-y-10 relative z-10">
                <CoverageItem label="Efficiency"   percentage={88} color="bg-primary"    delay={400} />
                <CoverageItem label="Logistics"    percentage={65} color="bg-blue-500"   delay={600} />
                <CoverageItem label="Experience"   percentage={92} color="bg-terracotta" delay={800} />
              </div>
            </section>

          </div>
        </div>
      </PageWrapper>
    </AuthGuard>
  );
}

// Utility Components with optimized animations
function SampleCityCard({ title, img, tags }: { title: string; img: string; tags: string[] }) {
  return (
    <Link href={`/discovery?q=${title}`} className="group relative h-[380px] rounded-[48px] overflow-hidden border border-white/10 hover:border-primary/40 transition-all shadow-2xl">
      <SafeImage src={img} category="city" alt={title} fill className="object-cover group-hover:scale-110 transition-transform duration-[3000ms]" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
      <div className="absolute bottom-10 left-10 right-10">
        <h3 className="font-display text-3xl text-white mb-2 italic">{title}</h3>
        <div className="flex gap-2">
          {tags.map(t => <span key={t} className="text-[8px] font-black uppercase tracking-widest text-primary bg-primary/10 px-3 py-1 rounded-full border border-primary/20">{t}</span>)}
        </div>
      </div>
    </Link>
  );
}

function StatWidget({ icon: Icon, label, value, color, delay }: { icon: ElementType; label: string; value: number | string; color: string; delay: number }) {
  const numericTarget = typeof value === 'number' ? value : 0;
  const count = useCountUp(numericTarget);
  const displayValue = typeof value === 'number' ? count : value;

  return (
    <div className="bg-white/[0.03] backdrop-blur-3xl border border-white/10 rounded-[32px] p-8 flex items-center gap-6 hover:bg-white/[0.08] transition-all group hover:-translate-y-1 animate-fadeInSlideUp" style={{ animationDelay: `${delay}ms` }}>
      <div className={`w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center ${color} border border-white/10 group-hover:scale-110 transition-all duration-500`}>
        <Icon className="w-7 h-7" />
      </div>
      <div>
        <p className="text-[9px] font-black text-white/30 uppercase tracking-[0.3em] mb-1">{label}</p>
        <p className="text-3xl font-display text-white tracking-tighter">{displayValue}</p>
      </div>
    </div>
  );
}

function QuickAction({ label, icon: Icon, delay }: { label: string; icon: ElementType; delay: number }) {
  return (
    <button className="flex flex-col items-center justify-center gap-3 p-6 bg-white/[0.03] hover:bg-white/[0.1] rounded-3xl border border-white/10 transition-all group animate-fadeIn" style={{ animationDelay: `${delay}ms` }}>
      <Icon className="w-6 h-6 text-white/40 group-hover:text-terracotta transition-colors" />
      <span className="text-[9px] font-black uppercase tracking-widest text-white/30 group-hover:text-white transition-colors">{label}</span>
    </button>
  );
}

function CoverageItem({ label, percentage, color, delay }: { label: string; percentage: number; color: string; delay: number }) {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between text-[10px] font-black uppercase tracking-widest">
        <span className="text-white/30">{label}</span>
        <span className="text-white">{percentage}%</span>
      </div>
      <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
        <div className={`h-full ${color} rounded-full transition-all duration-1000 ease-out`} style={{ width: `${percentage}%`, transitionDelay: `${delay}ms` }} />
      </div>
    </div>
  );
}

function ChevronRight(props: any) {
  return <svg {...props} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>;
}
