'use client';

import { useState, useEffect, useRef, ElementType } from 'react';
import { useAuth } from '@/context/AuthContext';
import { tripsApi, notesApi } from '@/lib/api';
import PageWrapper from '@/components/PageWrapper';
import { 
  Calendar, MapPin, PlusCircle, ArrowRight, 
  Map as MapIcon, Compass, Globe, Clock,
  TrendingUp, Star, Camera, Landmark, 
  Palmtree, Mountain, Info, LayoutDashboard,
  Search, ShieldCheck, Sparkles, Users
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
  const loopPoints = trips.length * 150 + notes.length * 50;

  let recommendationText = "";
  if (trips.length === 0) {
    if (user?.city) {
      recommendationText = `"As a traveler from ${user.city}, we recommend beginning your chronicle with the royal heritage of Rajasthan or the serene backwaters of Kerala."`;
    } else {
      recommendationText = `"Ready for your first expedition? We recommend starting with the majestic forts of Jaipur or the spiritual ghats of Varanasi."`;
    }
  } else {
    const lastCity = trips[0]?.stops?.[0]?.cityName || 'your last destination';
    recommendationText = `"Since you recently explored ${lastCity}, we recommend the high-altitude passes of Leh or the vibrant culture of Hampi for your next soul-seeking journey."`;
  }

  return (
    <AuthGuard>
      <PageWrapper>
        {/* Dynamic Background */}
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none rounded-tl-[40px]">
          <div 
            className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-[0.8] animate-slowZoom"
            style={{ backgroundImage: "url('https://images.unsplash.com/photo-1488646953014-85cb44e25828?q=80&w=2000')" }}
          />
          <div className="absolute inset-0 overlay-dark" />
          {/* Floating ambient orbs */}
          <div className="absolute top-1/4 left-1/3 w-96 h-96 bg-primary/10 rounded-full blur-[120px] animate-floatY" />
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-terracotta/10 rounded-full blur-[100px] animate-floatY" style={{ animationDelay: '2.5s' }} />
        </div>

        <div className="relative z-10 text-white min-h-screen pt-4 pb-20 animate-fadeIn">
          
          {/* Header Section */}
          <header className="flex flex-col md:flex-row md:items-end justify-between mb-12 md:mb-16 gap-6 md:gap-8 pt-6 md:pt-8 animate-fadeIn">
            <div className="space-y-3 md:space-y-4">
              <div className="flex items-center gap-3 text-primary uppercase tracking-[0.4em] text-[9px] md:text-[10px] font-black animate-fadeInSlideLeft" style={{ animationDelay: '100ms' }}>
                <div className="w-6 md:w-8 h-[2px] bg-primary" />
                Planning Identity: Active
              </div>
              <h1 className="font-display text-5xl md:text-7xl lg:text-8xl text-white tracking-tighter leading-[0.8] text-shadow animate-fadeInSlideUp" style={{ animationDelay: '150ms' }}>
                Namaste, <span className="text-primary italic">{user?.name?.split(' ')[0] || 'Traveler'}</span>
              </h1>
              <p className="text-white/40 mt-4 md:mt-6 text-base md:text-xl font-light max-w-xl leading-relaxed italic animate-fadeIn" style={{ animationDelay: '300ms' }}>
                Where shall the chronicle lead you next? Your planning deck is ready.
              </p>
            </div>
            
            <div className="flex gap-2 md:gap-4 animate-fadeIn" style={{ animationDelay: '400ms' }}>
              <Link href="/trips/new" className="btn-terracotta flex items-center gap-4 group px-10 py-6 animate-pulseGlowTerra">
                <PlusCircle className="w-5 h-5 group-hover:rotate-90 transition-transform duration-500" /> 
                New Expedition
              </Link>
            </div>
          </header>

          {/* Stats & Quick Pulse */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16 reveal-group">
            <StatWidget icon={MapIcon}   label="Active Plans"    value={trips.length}   color="text-primary"    delay={0}   />
            <StatWidget icon={Globe}     label="Mapped Cities"   value={citiesVisited}  color="text-orange-500" delay={90}  />
            <StatWidget icon={TrendingUp} label="Budget Sync"    value="92%"            color="text-primary"    delay={180} />
            <StatWidget icon={Camera}    label="Archived Stays"  value={notes.length}   color="text-blue-400"   delay={270} />
          </div>

          {/* Main Planning Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 pb-20">
            
            {/* Left Column: Planning Center */}
            <div className="lg:col-span-8 space-y-16">
              
              {/* Featured Planning Card */}
              <section className="relative rounded-[48px] overflow-hidden group shadow-2xl border border-white/10 p-12 min-h-[500px] flex flex-col justify-end animate-fadeIn" style={{ animationDelay: '200ms' }}>
                <SafeImage 
                  src="https://images.unsplash.com/photo-1599661046289-e31897846e41?q=80&w=1200" 
                  category="hero"
                  alt="Jaipur" 
                  fill
                  priority
                  className="object-cover group-hover:scale-110 transition-transform duration-[3000ms]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
                
                <div className="relative z-10 space-y-6 max-w-lg">
                  <div className="flex items-center gap-3">
                    <span className="bg-primary/90 backdrop-blur-xl text-white text-[10px] font-black px-4 py-2 rounded-full uppercase tracking-widest border border-white/20 animate-pulseGlow">
                      Top Recommendation
                    </span>
                    <span className="bg-black/40 backdrop-blur-xl text-white/80 text-[10px] font-bold px-4 py-2 rounded-full uppercase tracking-widest border border-white/10">
                      7 Day Plan Available
                    </span>
                  </div>
                  <h2 className="font-display text-6xl text-white leading-tight">Jaipur: The <span className="italic text-primary">Royal</span> Blueprint</h2>
                  <p className="text-white/70 text-lg font-light leading-relaxed">
                    Our AI has scoured the Pink City for hidden stepwells and boutique havelis. Ready to finalize your route?
                  </p>
                  <div className="pt-6 flex items-center gap-6">
                    <Link href="/trips/new?city=Jaipur" className="bg-white text-black px-10 py-5 rounded-xl font-black text-xs uppercase tracking-widest hover:bg-primary hover:text-white transition-all shadow-xl group/cta">
                      Begin Route Planning
                    </Link>
                    <button className="text-white/60 hover:text-white text-xs font-black uppercase tracking-widest flex items-center gap-2 transition-all group/sub">
                      View Sample Itinerary <ArrowRight className="w-4 h-4 group-hover/sub:translate-x-2 transition-transform" />
                    </button>
                  </div>
                </div>
              </section>

              {/* Recent Expeditions */}
              <section>
                <div className="flex items-center justify-between mb-10">
                  <h2 className="font-display text-4xl text-white italic">My Expeditions</h2>
                  <Link href="/trips" className="text-white/40 hover:text-white text-[10px] uppercase tracking-[0.3em] font-black flex items-center gap-3 transition-all group">
                    View Registry <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
                  </Link>
                </div>

                {trips.length === 0 ? (
                  <div className="bg-white/5 backdrop-blur-3xl border border-dashed border-white/10 rounded-[48px] p-20 text-center group animate-borderPulse">
                    <Compass className="w-16 h-16 text-white/10 mx-auto mb-6 group-hover:text-primary group-hover:rotate-45 transition-all duration-700 animate-floatY" />
                    <p className="text-white/40 text-lg font-light">No expeditions recorded yet.</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {trips.slice(0, 2).map((trip, i) => (
                      <Link href={`/trips/${trip._id}`} key={trip._id}
                        className="group relative h-[350px] rounded-[40px] overflow-hidden border border-white/10 hover:border-primary/40 transition-all shadow-2xl animate-fadeInSlideUp"
                        style={{ animationDelay: `${i * 120 + 300}ms` }}
                      >
                        <SafeImage 
                          src={trip.coverPhotoUrl || 'https://images.unsplash.com/photo-1524492459416-81446b1f315e?q=80&w=800'} 
                          category="hero"
                          alt="" 
                          fill
                          className="object-cover group-hover:scale-110 transition-transform duration-[2000ms]" 
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
                        <div className="absolute bottom-8 left-8 right-8">
                          <div className="flex items-center gap-2 mb-3">
                            <span className="text-[9px] font-black uppercase tracking-widest text-white/60 bg-primary/20 backdrop-blur-md px-3 py-1 rounded-full border border-primary/20">
                              {trip.stops?.length || 0} Stops
                            </span>
                          </div>
                          <h3 className="font-display text-2xl text-white group-hover:text-primary transition-colors mb-4 line-clamp-1 italic">{trip.title}</h3>
                          <div className="flex items-center gap-2 text-[9px] font-black uppercase tracking-widest text-white/40">
                            <Calendar className="w-3 h-3 text-primary" />
                            {new Date(trip.startDate).toLocaleDateString('en-IN', { month: 'short', day: 'numeric' })}
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                )}
              </section>

              {/* Suggested Destinations */}
              <section>
                <div className="flex items-center justify-between mb-10">
                  <h2 className="font-display text-4xl text-white italic">Suggested Destinations</h2>
                  <Link href="/discovery" className="text-white/40 hover:text-white text-[10px] uppercase tracking-[0.3em] font-black flex items-center gap-3 transition-all group">
                    Explore Global Map <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
                  </Link>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <SampleCityCard 
                    title="Varanasi: Ghats & Silk" 
                    img="https://images.unsplash.com/photo-1561359313-0639aad49ca6?q=80&w=800"
                    tags={['Heritage', 'Spirituality']}
                    delay={0}
                  />
                  <SampleCityCard 
                    title="Munnar: Tea Sanctuaries" 
                    img="https://images.unsplash.com/photo-1593181629936-11c609b8db9b?q=80&w=800"
                    tags={['Wellness', 'Nature']}
                    delay={100}
                  />
                </div>
              </section>
            </div>

            {/* Right Column: Planning Insights */}
            <div className="lg:col-span-4 space-y-10">
              
              {/* Route Pulse Widget */}
              <div className="bg-white/5 backdrop-blur-3xl border border-white/10 rounded-[40px] p-10 relative overflow-hidden group shadow-2xl animate-fadeInSlideLeft" style={{ animationDelay: '350ms' }}>
                <div className="absolute -right-10 -top-10 w-40 h-40 bg-primary/20 blur-[100px] group-hover:bg-primary/30 transition-all duration-1000" />
                <Landmark className="absolute -right-6 -top-6 w-32 h-32 text-white/5 group-hover:rotate-12 group-hover:scale-110 transition-all duration-1000" />
                
                <h3 className="font-display text-3xl text-white mb-10 relative z-10 italic">Planning Insights</h3>
                
                <div className="space-y-10 relative z-10">
                  <CoverageItem label="Route Efficiency"   percentage={88} color="bg-primary"    delay={600} />
                  <CoverageItem label="Logistics Sync"     percentage={65} color="bg-blue-500"   delay={750} />
                  <CoverageItem label="Experience Density" percentage={92} color="bg-terracotta" delay={900} />
                </div>

                <div className="mt-12 p-6 bg-white/5 backdrop-blur-2xl rounded-3xl border border-white/10 relative z-10 hover:bg-white/10 transition-colors group/tip">
                  <div className="flex gap-5 items-start">
                    <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center shrink-0 border border-primary/30 shadow-lg group-hover/tip:bg-primary/40 transition-all">
                      <Sparkles className="w-5 h-5 text-primary animate-floatY" style={{ animationDelay: '1s' }} />
                    </div>
                    <p className="text-xs text-white/70 leading-relaxed italic font-light">
                      Your current route through Rajasthan has a high "Heritage Density". We suggest adding a 2-day stop in Udaipur for optimal pacing.
                    </p>
                  </div>
                </div>
              </div>

              {/* Planning Quick Actions */}
              <div className="bg-terracotta/90 backdrop-blur-3xl rounded-[40px] p-10 text-white relative overflow-hidden group border border-white/10 shadow-2xl shadow-terracotta/20 animate-fadeInSlideLeft" style={{ animationDelay: '500ms' }}>
                <Star className="absolute -right-6 -top-6 w-32 h-32 text-white/10 group-hover:scale-125 group-hover:rotate-12 transition-all duration-1000" />
                <p className="text-[10px] uppercase font-black tracking-[0.3em] text-white/50 mb-3 relative z-10">Expedition Toolkit</p>
                <h4 className="font-display text-4xl mb-8 relative z-10 leading-tight">Elite Planning Console</h4>
                
                <div className="grid grid-cols-2 gap-4 relative z-10">
                  <QuickAction label="Book Hotel"  icon={Star}       delay={0}   />
                  <QuickAction label="Hire Guide"  icon={Users}      delay={80}  />
                  <QuickAction label="Add Activity" icon={PlusCircle} delay={160} />
                  <QuickAction label="Track Spend" icon={TrendingUp}  delay={240} />
                </div>
              </div>

            </div>
          </div>
        </div>
      </PageWrapper>
    </AuthGuard>
  );
}

function SampleCityCard({ title, img, tags, delay = 0 }: { title: string; img: string; tags: string[]; delay?: number }) {
  return (
    <div
      className="group relative h-[350px] rounded-[40px] overflow-hidden border border-white/10 hover:border-primary/40 transition-all shadow-2xl animate-fadeInSlideUp"
      style={{ animationDelay: `${delay + 400}ms` }}
    >
      <SafeImage src={img} category="city" alt="" fill className="object-cover group-hover:scale-110 transition-transform duration-[2000ms]" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
      <div className="absolute bottom-8 left-8 right-8">
        <div className="flex gap-2 mb-3">
          {tags.map((tag: string) => (
            <span key={tag} className="text-[9px] font-black uppercase tracking-widest text-white/60 bg-white/5 backdrop-blur-md px-3 py-1 rounded-full border border-white/10">
              {tag}
            </span>
          ))}
        </div>
        <h3 className="font-display text-2xl text-white group-hover:text-primary transition-colors mb-4">{title}</h3>
        <button className="text-white/40 group-hover:text-white text-[10px] font-black uppercase tracking-widest flex items-center gap-2 transition-all">
          Build Route <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
    </div>
  );
}

function QuickAction({ label, icon: Icon, delay = 0 }: { label: string; icon: ElementType; delay?: number }) {
  return (
    <button
      className="flex flex-col items-center justify-center gap-3 p-6 bg-white/5 hover:bg-white/15 rounded-3xl border border-white/10 transition-all hover:scale-105 active:scale-95 group animate-fadeIn"
      style={{ animationDelay: `${delay + 500}ms` }}
    >
      <div className="p-3 bg-white/5 rounded-xl border border-white/10 group-hover:bg-white group-hover:border-white transition-all shadow-lg">
        <Icon className="w-5 h-5 text-white/60 group-hover:text-terracotta transition-colors" />
      </div>
      <span className="text-[10px] font-black uppercase tracking-widest text-white/40 group-hover:text-white transition-colors">{label}</span>
    </button>
  );
}

function StatWidget({ icon: Icon, label, value, color, delay = 0 }: { icon: ElementType; label: string; value: number | string; color: string; delay?: number }) {
  const numericTarget = typeof value === 'number' ? value : 0;
  const count = useCountUp(numericTarget);
  const displayValue = typeof value === 'number' ? count : value;

  return (
    <div
      className="bg-white/5 backdrop-blur-3xl border border-white/10 rounded-[32px] p-8 flex items-center gap-6 hover:bg-white/10 transition-all group shadow-2xl hover:border-primary/30 hover:-translate-y-1 animate-fadeInSlideUp"
      style={{ animationDelay: `${delay + 100}ms` }}
    >
      <div className={`w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center ${color} shadow-inner border border-white/10 group-hover:scale-110 group-hover:bg-white/10 transition-all duration-500`}>
        <Icon className="w-8 h-8" />
      </div>
      <div>
        <p className="text-[10px] font-black text-white/30 uppercase tracking-[0.3em] mb-2">{label}</p>
        <p className="text-4xl font-display text-white tracking-tighter animate-countUp">{displayValue}</p>
      </div>
    </div>
  );
}

function CoverageItem({ label, percentage, color, delay = 0 }: { label: string; percentage: number; color: string; delay?: number }) {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between text-[10px] font-black uppercase tracking-[0.3em]">
        <span className="text-white/40">{label}</span>
        <span className="text-white">{percentage}%</span>
      </div>
      <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden border border-white/5">
        <div 
          className={`h-full ${color} rounded-full animate-progressFill shadow-[0_0_12px_rgba(0,136,204,0.4)]`}
          style={{ width: `${percentage}%`, animationDelay: `${delay}ms` }}
        />
      </div>
    </div>
  );
}
