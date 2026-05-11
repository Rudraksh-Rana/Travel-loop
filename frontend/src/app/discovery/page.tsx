'use client';

import { useState, useEffect } from 'react';
import { exploreApi } from '@/lib/api';
import PageWrapper from '@/components/PageWrapper';
import { 
  Search as SearchIcon, MapPin, Star, Tag, 
  Clock, ArrowRight, Compass, Landmark,
  Palmtree, Mountain, Filter, Sparkles,
  ChevronRight, Navigation
} from 'lucide-react';
import Link from 'next/link';
import SafeImage from '@/components/SafeImage';
import AuthGuard from '@/components/AuthGuard';

export default function DiscoveryPage() {
  const [query, setQuery] = useState('');
  const [activeTab, setActiveTab] = useState<'destinations' | 'activities'>('destinations');
  const [results, setResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      handleSearch();
    }, 400);
    return () => clearTimeout(timer);
  }, [query, activeTab]);

  async function handleSearch() {
    setLoading(true);
    try {
      const data = activeTab === 'destinations' 
        ? await exploreApi.searchDestinations(query)
        : await exploreApi.searchActivities(query);
      setResults(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <AuthGuard>
      <PageWrapper>
        {/* Cinematic Background */}
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none rounded-tl-[40px]">
          <div 
            className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-[0.35] animate-slowZoom"
            style={{ backgroundImage: "url('https://images.unsplash.com/photo-1548013146-72479768bbaa?q=80&w=2000')" }}
          />
          <div className="absolute inset-0 overlay-dark" />
          {/* Floating Glow Orbs */}
          <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-primary/10 rounded-full blur-[120px] animate-floatY" />
          <div className="absolute bottom-1/4 left-1/3 w-80 h-80 bg-terracotta/10 rounded-full blur-[100px] animate-floatY" style={{ animationDelay: '3s' }} />
        </div>

        <div className="relative z-10 text-white min-h-screen pt-4 pb-20 animate-fadeIn">
          
          {/* Cinematic Header */}
          <header className="mb-20 space-y-6">
            <div className="flex items-center gap-4 text-primary uppercase tracking-[0.6em] text-[10px] font-black animate-fadeInSlideLeft">
              <div className="w-10 h-[2px] bg-primary" />
              Discovery Module
            </div>
            <h1 className="font-display text-7xl md:text-9xl text-white tracking-tighter leading-[0.8] text-shadow animate-fadeInSlideUp">
              Seek the <span className="text-primary italic">Soul</span>
            </h1>
            <p className="text-white/40 text-xl md:text-2xl font-light max-w-3xl leading-relaxed italic animate-fadeIn" style={{ animationDelay: '200ms' }}>
              Uncover extraordinary monuments, hidden sanctuaries, and curated local rituals designed for the discerning explorer.
            </p>
          </header>

          {/* Premium Search & Filter Bar */}
          <div className="sticky top-6 z-30 mb-20 animate-fadeIn" style={{ animationDelay: '400ms' }}>
            <div className="bg-black/80 backdrop-blur-3xl border border-white/10 rounded-[32px] p-4 flex flex-col md:flex-row items-center gap-6 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.5)]">
              <div className="flex-1 flex items-center gap-8 pl-8 w-full group/search">
                <SearchIcon className="w-6 h-6 text-primary group-focus-within:scale-110 transition-transform" />
                <input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder={`Scour for ${activeTab === 'destinations' ? 'cities, states, or heritage regions' : 'heritage walks, safaris, or ancient rituals'}...`}
                  className="w-full py-5 bg-transparent text-white outline-none placeholder:text-white/40 text-xl font-medium tracking-tight"
                />
              </div>
              
              <div className="flex items-center gap-4 pr-2 w-full md:w-auto">
                <button 
                  onClick={() => setActiveTab('destinations')}
                  className={`flex-1 md:flex-none px-12 py-5 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] transition-all relative overflow-hidden group
                    ${activeTab === 'destinations' 
                      ? 'bg-primary text-white shadow-2xl shadow-primary/30' 
                      : 'bg-white/5 text-white/40 hover:bg-white/10'}`}
                >
                  Destinations
                </button>
                <button 
                  onClick={() => setActiveTab('activities')}
                  className={`flex-1 md:flex-none px-12 py-5 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] transition-all relative overflow-hidden group
                    ${activeTab === 'activities' 
                      ? 'bg-primary text-white shadow-2xl shadow-primary/30' 
                      : 'bg-white/5 text-white/40 hover:bg-white/10'}`}
                >
                  Experiences
                </button>
              </div>
            </div>
          </div>

          {/* Results Info Header */}
          <div className="flex items-center justify-between mb-12 text-[10px] font-black uppercase tracking-[0.5em] text-white/20 px-8 animate-fadeIn" style={{ animationDelay: '600ms' }}>
            <span className="flex items-center gap-4">
              <Sparkles className="w-4 h-4 text-primary animate-pulse" />
              Isolated {results.length} extraordinary {activeTab}
            </span>
            <div className="flex items-center gap-8">
              <button className="flex items-center gap-3 hover:text-primary transition-all group">
                <Filter className="w-4 h-4 group-hover:rotate-180 transition-transform duration-700" /> 
                Refine Parameters
              </button>
              <div className="w-px h-4 bg-white/10 hidden md:block" />
              <span className="hidden md:block">Registry V4.2</span>
            </div>
          </div>

          {/* Results Grid - Cinematic Cards */}
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 pb-20">
              {[1, 2, 3, 4, 5, 6].map(i => (
                <div key={i} className="h-[600px] bg-white/5 rounded-[56px] skeleton border border-white/10" />
              ))}
            </div>
          ) : results.length === 0 ? (
            <div className="text-center py-40 bg-white/5 backdrop-blur-3xl rounded-[64px] border border-dashed border-white/10 group animate-fadeIn">
              <Compass className="w-24 h-24 text-white/10 mx-auto mb-10 group-hover:text-primary group-hover:rotate-45 transition-all duration-1000 animate-floatY" />
              <h3 className="font-display text-5xl text-white mb-6 italic">The Archive is Silent</h3>
              <p className="text-white/40 text-xl font-light mb-12 max-w-xl mx-auto">
                No chronicles match your current scour parameters. Try searching for "Rajasthan Heritage" or "Ganges Rituals".
              </p>
              <button 
                onClick={() => setQuery('')}
                className="text-primary font-black text-xs uppercase tracking-[0.4em] hover:tracking-[0.6em] transition-all flex items-center justify-center gap-4 mx-auto"
              >
                Reset Scour <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 pb-20 reveal-group">
              {results.map((item, idx) => (
                <div 
                  key={item._id} 
                  className="group relative h-[650px] rounded-[56px] overflow-hidden border border-white/10 hover:border-primary/40 transition-all shadow-2xl bg-black/40 animate-fadeInSlideUp"
                  style={{ animationDelay: `${idx * 80}ms` }}
                >
                  <div className="absolute inset-0">
                    <SafeImage 
                      src={item.image || 'https://images.unsplash.com/photo-1524492459416-81446b1f315e?q=80&w=800'} 
                      category={activeTab === 'destinations' ? 'city' : 'activity'}
                      alt={item.name || item.title} 
                      fill
                      className="w-full h-full object-cover opacity-60 group-hover:opacity-100 group-hover:scale-110 transition-all duration-[4000ms]" 
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent group-hover:from-black/90 transition-all duration-500" />
                  </div>

                  {/* Top Badges */}
                  <div className="absolute top-10 right-10 flex flex-col gap-4 z-10">
                    <div className="bg-white text-primary px-5 py-2.5 rounded-2xl text-[11px] font-black flex items-center gap-3 shadow-2xl animate-pulseGlow">
                      <Star className="w-4 h-4 fill-primary" /> {item.rating || '4.9'}
                    </div>
                  </div>

                  <div className="absolute top-10 left-10 z-10">
                    <div className="bg-black/40 backdrop-blur-3xl px-6 py-2.5 rounded-full text-[10px] font-black text-white uppercase tracking-widest border border-white/10 group-hover:bg-primary transition-all duration-500">
                      {activeTab === 'destinations' ? (item.state || 'Heritage Region') : (item.category || 'Curated Ritual')}
                    </div>
                  </div>
                  
                  {/* Card Content */}
                  <div className="absolute bottom-12 left-12 right-12">
                    <div className="flex items-center gap-4 text-primary uppercase tracking-[0.4em] text-[9px] font-black mb-6">
                      <div className="w-8 h-[1px] bg-primary" />
                      Expedition Vetting: Passed
                    </div>
                    
                    <h3 className="font-display text-5xl text-white group-hover:text-primary transition-colors leading-tight mb-8 line-clamp-2 italic">
                      {item.name || item.title}
                    </h3>
                    
                    <p className="text-white/50 text-base font-light leading-relaxed mb-10 line-clamp-2 italic">
                      {item.description}
                    </p>

                    <div className="flex flex-wrap gap-3 mb-12">
                      {activeTab === 'destinations' ? (
                        item.tags?.slice(0, 3).map((tag: string) => (
                          <span key={tag} className="px-5 py-2.5 bg-white/5 backdrop-blur-2xl rounded-2xl text-[10px] font-black text-white/40 uppercase tracking-widest flex items-center gap-3 border border-white/5">
                            <Tag className="w-4 h-4" /> {tag}
                          </span>
                        ))
                      ) : (
                        <>
                          <span className="px-5 py-2.5 bg-primary/10 backdrop-blur-2xl rounded-2xl text-[10px] font-black text-primary uppercase tracking-widest flex items-center gap-3 border border-primary/20">
                            {item.priceRange}
                          </span>
                          <span className="px-5 py-2.5 bg-white/5 backdrop-blur-2xl rounded-2xl text-[10px] font-black text-white/40 uppercase tracking-widest flex items-center gap-3 border border-white/5">
                            <Clock className="w-4 h-4" /> {item.duration}
                          </span>
                        </>
                      )}
                    </div>

                    <Link 
                      href={`/trips/new?city=${encodeURIComponent(item.name || item.title)}`}
                      className="w-full py-7 bg-terracotta text-white rounded-[28px] text-[11px] font-black uppercase tracking-[0.4em] hover:bg-terracotta-hover transition-all flex items-center justify-center gap-5 shadow-2xl shadow-terracotta/40 hover:scale-[1.02] active:scale-95 group/btn"
                    >
                      Begin Route Mapping <ChevronRight className="w-5 h-5 group-hover/btn:translate-x-3 transition-transform" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </PageWrapper>
    </AuthGuard>
  );
}

