'use client';

import { useState, useEffect } from 'react';
import { tripsApi } from '@/lib/api';
import PageWrapper from '@/components/PageWrapper';
import Link from 'next/link';
import SafeImage from '@/components/SafeImage';
import { SkeletonLoader } from '@/components/ui/skeleton';
import { 
  Search, Calendar, ArrowRight, Trash2, 
  PlusCircle, Compass, MapPin, Globe, 
  Sparkles, Filter, ChevronRight
} from 'lucide-react';

export default function TripsListPage() {
  const [trips, setTrips] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  useEffect(() => {
    tripsApi.list()
      .then(setTrips)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const now = new Date();
  const filtered = trips.filter(t =>
    t.title.toLowerCase().includes(search.toLowerCase())
  );

  const categorize = (list: any[]) => ({
    ongoing: list.filter(t => new Date(t.startDate) <= now && new Date(t.endDate) >= now),
    upcoming: list.filter(t => new Date(t.startDate) > now),
    completed: list.filter(t => new Date(t.endDate) < now),
  });

  const { ongoing, upcoming, completed } = categorize(filtered);

  async function handleDelete(id: string) {
    if (!confirm('Delete this trip? This cannot be undone.')) return;
    await tripsApi.delete(id);
    setTrips(prev => prev.filter(t => t._id !== id));
  }

  return (
    <PageWrapper>
      {/* Cinematic Background - Heritage Texture */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none rounded-tl-[40px]">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-[0.85] scale-105"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1548013146-72479768bbaa?q=80&w=2000')" }}
        />
        <div className="absolute inset-0 overlay-dark" />
      </div>

      <div className="relative z-10 text-white min-h-screen pt-4 pb-20 animate-fadeIn">
        
        {/* Refined Header */}
        <header className="flex flex-col md:flex-row md:items-end justify-between mb-12 md:mb-16 gap-6 md:gap-8 animate-fadeIn">
          <div className="space-y-3 md:space-y-4">
            <div className="flex items-center gap-3 text-primary uppercase tracking-[0.4em] text-[9px] md:text-[10px] font-black">
              <div className="w-6 md:w-8 h-[2px] bg-primary" />
              Expedition Registry
            </div>
            <h1 className="font-display text-5xl md:text-7xl lg:text-8xl text-white tracking-tighter leading-[0.8] text-shadow">
              My <span className="text-primary italic">Chronicles</span>
            </h1>
            <p className="text-white/40 mt-4 md:mt-6 text-base md:text-xl font-light max-w-xl leading-relaxed italic">
              Access your personalized archive of mapped journeys and future expeditions.
            </p>
          </div>
          
          <div className="flex flex-col md:flex-row gap-3 md:gap-4 w-full md:w-auto">
            <div className="relative group min-w-full md:min-w-[300px]">
              <Search className="absolute left-4 md:left-6 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30 group-focus-within:text-primary transition-colors" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search expeditions..."
                className="w-full pl-12 md:pl-14 pr-4 md:pr-6 py-4 md:py-6 bg-white/5 backdrop-blur-3xl border border-white/10 rounded-2xl text-white placeholder:text-white/20 focus:outline-none focus:border-primary/50 transition-all text-sm"
              />
            </div>
            <Link href="/trips/new" className="btn-terracotta flex items-center gap-4 group px-8 md:px-10 py-4 md:py-6 w-full md:w-auto justify-center">
              <PlusCircle className="w-5 h-5 group-hover:rotate-90 transition-transform duration-500" /> 
              <span className="hidden md:inline">New Expedition</span>
              <span className="md:hidden">New</span>
            </Link>
          </div>
        </header>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {[1, 2, 3, 4, 5, 6].map(i => (
              <div key={i} className="h-[500px] bg-white/5 rounded-[48px] animate-shimmer border border-white/10 overflow-hidden">
                <div className="h-1/2 bg-gradient-to-r from-white/5 via-white/10 to-white/5 animate-shimmer" />
                <div className="p-6 space-y-3">
                  <div className="h-4 w-3/4 bg-white/10 rounded-lg animate-shimmer" />
                  <div className="h-3 w-full bg-white/10 rounded-lg animate-shimmer" />
                  <div className="h-3 w-2/3 bg-white/10 rounded-lg animate-shimmer" />
                </div>
              </div>
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-40 bg-white/5 backdrop-blur-3xl rounded-[48px] border border-dashed border-white/10 group">
            <Compass className="w-24 h-24 text-white/10 mx-auto mb-8 group-hover:text-primary group-hover:rotate-45 transition-all duration-1000" />
            <h3 className="font-display text-4xl text-white mb-4 italic">The map is silent</h3>
            <p className="text-white/40 text-lg mb-12 font-light">Your chronicle awaits its next extraordinary chapter.</p>
            <Link href="/discovery" className="btn-primary inline-flex items-center gap-4 px-10 py-5">
              Explore Destinations <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        ) : (
          <div className="space-y-24">
            {ongoing.length > 0 && <TripGrid title="Active Expeditions" trips={ongoing} onDelete={handleDelete} />}
            {upcoming.length > 0 && <TripGrid title="Planned Journeys" trips={upcoming} onDelete={handleDelete} />}
            {completed.length > 0 && <TripGrid title="Archived Stays" trips={completed} onDelete={handleDelete} />}
          </div>
        )}
      </div>
    </PageWrapper>
  );
}

function TripGrid({ title, trips, onDelete }: {
  title: string; trips: any[]; onDelete: (id: string) => void;
}) {
  return (
    <section>
      <div className="flex items-center justify-between mb-10">
        <h2 className="font-display text-4xl text-white italic">{title}</h2>
        <div className="h-[1px] flex-1 mx-10 bg-white/10" />
        <span className="text-white/20 text-[10px] font-black uppercase tracking-widest">{trips.length} Total</span>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {trips.map((trip, index) => (
          <div key={trip._id} className="group relative h-[500px] rounded-[48px] overflow-hidden border border-white/10 hover:border-primary/50 transition-all duration-300 shadow-2xl hover:shadow-2xl hover:shadow-primary/20 bg-white/5 backdrop-blur-3xl hover:scale-105" style={{
            animation: `cardEnter 0.6s ease forwards ${index * 100}ms`
          }}>
            {/* Trip Cover */}
              <div className="absolute inset-0">
                <SafeImage 
                  src={trip.coverPhotoUrl || 'https://images.unsplash.com/photo-1524492459416-81446b1f315e?q=80&w=800'} 
                  alt="" 
                  fill
                  className="w-full h-full object-cover opacity-60 group-hover:opacity-85 group-hover:scale-110 transition-all duration-[3000ms]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent group-hover:via-black/20 transition-all duration-300" />
              </div>

            {/* Trip Content */}
            <div className="absolute bottom-10 left-10 right-10">
              <div className="flex items-center gap-3 mb-6">
                <span className="bg-primary/90 backdrop-blur-xl text-white text-[10px] font-black px-4 py-2 rounded-full uppercase tracking-widest border border-white/20 group-hover:shadow-lg group-hover:shadow-primary/30 transition-all duration-300">
                  {trip.stops?.length || 0} Stops
                </span>
                <span className="bg-black/40 backdrop-blur-xl text-white/80 text-[10px] font-bold px-4 py-2 rounded-full uppercase tracking-widest border border-white/10 flex items-center gap-2 group-hover:bg-black/50 transition-all duration-300">
                  <Calendar className="w-3.5 h-3.5 text-primary" />
                  {new Date(trip.startDate).toLocaleDateString('en-IN', { month: 'short', day: 'numeric' })}
                </span>
              </div>
              
              <h3 className="font-display text-4xl text-white group-hover:text-primary transition-colors leading-tight mb-4 line-clamp-2 italic">
                {trip.title}
              </h3>

              <div className="flex items-center justify-between pt-6 border-t border-white/10">
                <Link 
                  href={`/trips/${trip._id}`}
                  className="flex items-center gap-3 text-[10px] font-black uppercase tracking-widest text-white group-hover:text-primary transition-all duration-300"
                >
                  View Chronicle <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform duration-300" />
                </Link>
                <button 
                  onClick={() => onDelete(trip._id)}
                  className="p-3 bg-white/5 rounded-xl border border-white/10 text-white/20 hover:text-red-500 hover:bg-red-500/10 hover:border-red-500/30 transition-all duration-300"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
