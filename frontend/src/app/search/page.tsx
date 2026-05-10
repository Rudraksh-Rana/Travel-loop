'use client';

import { useState, useEffect } from 'react';
import { exploreApi } from '@/lib/api';
import PageWrapper from '@/components/PageWrapper';
import { Search as SearchIcon, MapPin, Star, Tag, Clock, ArrowRight } from 'lucide-react';
import Link from 'next/link';

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
      <div className="max-w-[1000px] mx-auto">
        <h1 className="font-display text-4xl text-text mb-2">Discover India</h1>
        <p className="text-text-muted mb-8">Uncover extraordinary places and curated local experiences.</p>

        {/* Search Bar */}
        <div className="relative mb-8">
          <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-text-faint" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={`Search ${activeTab}...`}
            className="w-full pl-12 pr-4 py-4 bg-surface border border-divider rounded-2xl text-text
                       placeholder:text-text-faint focus:outline-none focus:ring-2 focus:ring-primary/30 
                       transition-all shadow-sm text-lg"
          />
        </div>

        {/* Tabs */}
        <div className="flex gap-4 mb-8 border-b border-divider pb-px">
          <button
            onClick={() => setActiveTab('destinations')}
            className={`pb-4 px-2 text-sm font-semibold transition-all relative ${
              activeTab === 'destinations' ? 'text-primary' : 'text-text-muted hover:text-text'
            }`}
          >
            Destinations
            {activeTab === 'destinations' && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary rounded-full" />}
          </button>
          <button
            onClick={() => setActiveTab('activities')}
            className={`pb-4 px-2 text-sm font-semibold transition-all relative ${
              activeTab === 'activities' ? 'text-primary' : 'text-text-muted hover:text-text'
            }`}
          >
            Activities
            {activeTab === 'activities' && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary rounded-full" />}
          </button>
        </div>

        {/* Results Grid */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[1, 2, 3, 4].map(i => (
              <div key={i} className="h-64 bg-surface animate-pulse rounded-2xl border border-divider" />
            ))}
          </div>
        ) : results.length === 0 ? (
          <div className="text-center py-20">
            <div className="text-5xl mb-4">🏜️</div>
            <h3 className="font-display text-2xl text-text mb-2">No results found</h3>
            <p className="text-text-muted">Try searching for "Rajasthan", "Temple", or "Adventure"</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {results.map((item) => (
              <div key={item._id} className="group bg-surface rounded-2xl border border-divider overflow-hidden hover:shadow-md transition-all">
                <div className="h-48 overflow-hidden relative">
                  <img src={item.image} alt={item.name || item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-lg text-xs font-bold flex items-center gap-1 text-primary">
                    <Star className="w-3 h-3 fill-primary" /> {item.rating}
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h3 className="font-display text-xl text-text group-hover:text-primary transition-colors">
                        {item.name || item.title}
                      </h3>
                      <p className="text-sm text-text-muted flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5" /> {item.state || item.location}
                      </p>
                    </div>
                  </div>
                  
                  <p className="text-text-muted text-sm line-clamp-2 mb-4">
                    {item.description}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-6">
                    {activeTab === 'destinations' ? (
                      item.tags?.map((tag: string) => (
                        <span key={tag} className="px-2.5 py-1 bg-surface-2 rounded-full text-[10px] font-bold text-text-muted uppercase tracking-wider flex items-center gap-1">
                          <Tag className="w-3 h-3" /> {tag}
                        </span>
                      ))
                    ) : (
                      <>
                        <span className="px-2.5 py-1 bg-primary/10 rounded-full text-[10px] font-bold text-primary uppercase tracking-wider flex items-center gap-1">
                          {item.priceRange}
                        </span>
                        <span className="px-2.5 py-1 bg-surface-2 rounded-full text-[10px] font-bold text-text-muted uppercase tracking-wider flex items-center gap-1">
                          <Clock className="w-3 h-3" /> {item.duration}
                        </span>
                      </>
                    )}
                  </div>

                  <button className="w-full py-3 border border-primary text-primary rounded-xl text-sm font-semibold hover:bg-primary hover:text-white transition-all flex items-center justify-center gap-2">
                    Add to Trip <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </PageWrapper>
  );
}
