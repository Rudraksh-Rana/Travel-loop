'use client';

import { useState, useEffect } from 'react';
import { exploreApi } from '@/lib/api';
import PageWrapper from '@/components/PageWrapper';
import { 
  Search as SearchIcon, MapPin, Star, Tag, 
  Clock, ArrowRight, Compass, Landmark,
  Palmtree, Mountain, Filter, Sparkles,
  ChevronRight
} from 'lucide-react';
import Link from 'next/link';
import SafeImage from '@/components/SafeImage';

export default function SearchPage() {
  const [query, setQuery] = useState('');
  const [activeTab, setActiveTab] = useState<'destinations' | 'activities'>('destinations');
  const [results, setResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      handleSearch();
    }, 300);
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
    <PageWrapper>
      {/* Cinematic Background */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none rounded-tl-[40px]">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-[0.85] scale-105"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1548013146-72479768bbaa?q=80&w=2000')" }}
        />
        <div className="absolute inset-0 bg-gradient-to-br from-black/95 via-black/40 to-black/90" />
      </div>

      <div className="max-w-[1400px] mx-auto relative z-10 text-white min-h-[calc(100vh-4rem)] pt-8 pb-20 animate-fadeIn">
        
        {/* Cinematic Header */}
        <header className="mb-16">
          <div className="flex items-center gap-3 text-primary uppercase tracking-[0.4em] text-[10px] font-black mb-4">
            <div className="w-8 h-[2px] bg-primary" />
            Heritage Discovery
          </div>
          <h1 className="font-display text-7xl md:text-9xl text-white tracking-tighter leading-[0.8] mb-8">
            Seek the <span className="text-primary italic">Soul</span>
          </h1>
          <p className="text-white/40 text-2xl font-light max-w-3xl leading-relaxed italic">
            Uncover extraordinary monuments, hidden sanctuaries, and curated local rituals designed for the discerning traveler.
          </p>
        </header>

        {/* Premium Search & Filter Bar */}
        <div className="sticky top-4 z-30 mb-16">
          <div className="bg-white/5 backdrop-blur-3xl border border-white/10 rounded-[32px] p-3 flex flex-col md:flex-row items-center gap-4 shadow-2xl">
            <div className="flex-1 flex items-center gap-6 pl-8 w-full">
              <SearchIcon className="w-6 h-6 text-primary" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={`Search for ${activeTab === 'destinations' ? 'cities, states, or regions' : 'heritage walks, safaris, or rituals'}...`}
                className="w-full py-5 bg-transparent text-white outline-none placeholder:text-white/20 text-lg font-medium"
              />
            </div>
            
            <div className="flex items-center gap-3 pr-3 w-full md:w-auto">
              <button 
                onClick={() => setActiveTab('destinations')}
                className={`flex-1 md:flex-none px-10 py-5 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all ${activeTab === 'destinations' ? 'bg-primary text-white shadow-xl shadow-primary/20' : 'bg-white/5 text-white/40 hover:bg-white/10'}`}
              >
                Destinations
              </button>
              <button 
                onClick={() => setActiveTab('activities')}
                className={`flex-1 md:flex-none px-10 py-5 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all ${activeTab === 'activities' ? 'bg-primary text-white shadow-xl shadow-primary/20' : 'bg-white/5 text-white/40 hover:bg-white/10'}`}
              >
                Experiences
              </button>
            </div>
          </div>
        </div>

        {/* Results Info */}
        <div className="flex items-center justify-between mb-12 text-[10px] font-black uppercase tracking-[0.4em] text-white/30 px-4">
          <span className="flex items-center gap-3">
            <Sparkles className="w-3.5 h-3.5 text-primary" />
            Isolated {results.length} extraordinary {activeTab}
          </span>
          <button className="flex items-center gap-3 hover:text-primary transition-colors group">
            <Filter className="w-3.5 h-3.5 group-hover:rotate-180 transition-transform duration-500" /> Refine Parameters
          </button>
        </div>

        {/* Results Grid - Traveloop Style */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            {[1, 2, 3, 4, 5, 6].map(i => (
              <div key={i} className="h-[550px] bg-white/5 animate-pulse rounded-[48px] border border-white/10" />
            ))}
          </div>
        ) : results.length === 0 ? (
          <div className="text-center py-40 bg-white/5 backdrop-blur-3xl rounded-[48px] border border-dashed border-white/10 group">
            <Compass className="w-24 h-24 text-white/10 mx-auto mb-8 group-hover:text-primary group-hover:rotate-90 transition-all duration-1000" />
            <h3 className="font-display text-5xl text-white mb-6 italic">No chronicles found</h3>
            <p className="text-white/40 text-xl font-light">Try searching for "Rajasthan Heritage", "Varanasi Rituals", or "Kerala Backwaters".</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            {results.map((item) => (
              <div key={item._id} className="group relative h-[600px] rounded-[48px] overflow-hidden border border-white/10 hover:border-primary/40 transition-all shadow-2xl bg-white/5 backdrop-blur-3xl">
                <div className="absolute inset-0">
                  <SafeImage 
                    src={item.image || 'https://images.unsplash.com/photo-1524492459416-81446b1f315e?q=80&w=800'} 
                    category={activeTab === 'destinations' ? 'city' : 'activity'}
                    alt={item.name || item.title} 
                    fill
                    className="w-full h-full object-cover opacity-60 group-hover:opacity-80 group-hover:scale-110 transition-all duration-[3000ms]" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
                </div>

                {/* Badges */}
                <div className="absolute top-8 right-8 flex flex-col gap-3">
                  <div className="bg-white/90 backdrop-blur-xl px-4 py-2 rounded-xl text-[10px] font-black flex items-center gap-2 text-primary shadow-2xl border border-white">
                    <Star className="w-3.5 h-3.5 fill-primary" /> {item.rating || '4.9'}
                  </div>
                </div>

                <div className="absolute top-8 left-8">
                  <div className="bg-black/40 backdrop-blur-xl px-5 py-2 rounded-full text-[10px] font-black text-white uppercase tracking-widest border border-white/10">
                    {activeTab === 'destinations' ? (item.state || 'India') : (item.category || 'Curated')}
                  </div>
                </div>
                
                {/* Content */}
                <div className="absolute bottom-10 left-10 right-10">
                  <h3 className="font-display text-4xl text-white group-hover:text-primary transition-colors leading-tight mb-6 italic">
                    {item.name || item.title}
                  </h3>
                  
                  <p className="text-white/50 text-sm font-light leading-relaxed mb-8 line-clamp-2 italic">
                    {item.description}
                  </p>

                  <div className="flex flex-wrap gap-3 mb-10">
                    {activeTab === 'destinations' ? (
                      item.tags?.slice(0, 3).map((tag: string) => (
                        <span key={tag} className="px-4 py-2 bg-white/5 rounded-xl text-[10px] font-black text-white/40 uppercase tracking-widest flex items-center gap-2 border border-white/10">
                          <Tag className="w-3.5 h-3.5" /> {tag}
                        </span>
                      ))
                    ) : (
                      <>
                        <span className="px-4 py-2 bg-primary/10 rounded-xl text-[10px] font-black text-primary uppercase tracking-widest flex items-center gap-2 border border-primary/20">
                          {item.priceRange}
                        </span>
                        <span className="px-4 py-2 bg-white/5 rounded-xl text-[10px] font-black text-white/40 uppercase tracking-widest flex items-center gap-2 border border-white/10">
                          <Clock className="w-3.5 h-3.5" /> {item.duration}
                        </span>
                      </>
                    )}
                  </div>

                  <Link 
                    href={`/trips/new?city=${encodeURIComponent(item.name || item.title)}`}
                    className="w-full py-6 bg-terracotta text-white rounded-2xl text-[10px] font-black uppercase tracking-[0.3em] hover:bg-terracotta-hover transition-all flex items-center justify-center gap-4 shadow-2xl shadow-terracotta/30 active:scale-95 group/btn"
                  >
                    Initiate Expedition <ChevronRight className="w-4 h-4 group-hover/btn:translate-x-2 transition-transform" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </PageWrapper>
  );
}
