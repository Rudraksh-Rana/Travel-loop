'use client';

import { useState, useEffect } from 'react';
import { communityApi, tripsApi } from '@/lib/api';
import PageWrapper from '@/components/PageWrapper';
import { 
  Heart, Share2, Users, MessageSquare, 
  MapPin, ArrowRight, PlusCircle, Globe,
  MoreVertical, Compass, Sparkles, Navigation,
  X, Camera
} from 'lucide-react';
import Link from 'next/link';
import AuthGuard from '@/components/AuthGuard';
import SafeImage from '@/components/SafeImage';

export default function CommunityPage() {
  const [posts, setPosts] = useState<any[]>([]);
  const [trips, setTrips] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showShareModal, setShowShareModal] = useState(false);
  const [shareForm, setShareForm] = useState({ tripId: '', caption: '' });

  useEffect(() => {
    refreshPosts();
    tripsApi.list().then(setTrips).catch(console.error);
  }, []);

  async function refreshPosts() {
    setLoading(true);
    try {
      const data = await communityApi.list();
      setPosts(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  async function handleShare(e: React.FormEvent) {
    e.preventDefault();
    if (!shareForm.tripId || !shareForm.caption) return;
    try {
      await communityApi.create(shareForm);
      setShowShareModal(false);
      setShareForm({ tripId: '', caption: '' });
      await refreshPosts();
    } catch (error) {
      console.error(error);
    }
  }

  async function handleLike(postId: string) {
    try {
      const updated = await communityApi.like(postId);
      setPosts(prev => prev.map(p => p._id === postId ? updated : p));
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <AuthGuard>
      <PageWrapper>
        {/* Cinematic Background */}
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none rounded-tl-[40px]">
          <div 
            className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-[0.3] animate-slowZoom"
            style={{ backgroundImage: "url('https://images.unsplash.com/photo-1512100356956-c1227c3317bb?q=80&w=2000')" }}
          />
          <div className="absolute inset-0 overlay-dark" />
          <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-[120px] animate-floatY" />
        </div>

        <div className="relative z-10 text-white min-h-screen pt-4 pb-20 animate-fadeIn">
          
          {/* Header Section */}
          <header className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8 pt-8 animate-fadeIn">
            <div className="space-y-4">
              <div className="flex items-center gap-3 text-primary uppercase tracking-[0.4em] text-[10px] font-black animate-fadeInSlideLeft">
                <div className="w-8 h-[2px] bg-primary" />
                Scout Circle: Online
              </div>
              <h1 className="font-display text-6xl md:text-7xl lg:text-8xl text-white tracking-tighter leading-[0.8] text-shadow animate-fadeInSlideUp">
                The <span className="text-primary italic">Circle</span>
              </h1>
              <p className="text-white/40 text-xl font-light max-w-xl italic animate-fadeIn" style={{ animationDelay: '200ms' }}>
                Extraordinary chronicles shared by fellow explorers from across the subcontinent.
              </p>
            </div>
            
            <button 
              onClick={() => setShowShareModal(true)}
              className="btn-terracotta flex items-center gap-4 group px-10 py-6 animate-pulseGlowTerra"
            >
              <PlusCircle className="w-5 h-5 group-hover:rotate-90 transition-transform duration-500" /> 
              Share Your Journey
            </button>
          </header>

          {/* Share Modal Overlay */}
          {showShareModal && (
            <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 animate-fadeIn">
              <div className="absolute inset-0 bg-black/80 backdrop-blur-xl" onClick={() => setShowShareModal(false)} />
              <div className="bg-white/5 backdrop-blur-3xl border border-white/10 rounded-[48px] w-full max-w-xl p-12 relative z-10 animate-fadeInSlideUp shadow-[0_32px_64px_-16px_rgba(0,0,0,0.5)]">
                <button onClick={() => setShowShareModal(false)} className="absolute top-8 right-8 p-3 text-white/30 hover:text-white transition-colors">
                  <X className="w-6 h-6" />
                </button>
                
                <div className="flex items-center gap-3 text-primary uppercase tracking-[0.4em] text-[10px] font-black mb-6">
                  <div className="w-6 h-[1px] bg-primary" />
                  Initiate Broadcast
                </div>
                <h2 className="font-display text-5xl text-white mb-10 italic">Share Your Chronicle</h2>
                
                <form onSubmit={handleShare} className="space-y-10">
                  <div className="space-y-3">
                    <label className="block text-[10px] font-black text-white/40 uppercase tracking-[0.3em]">Registry Identifier</label>
                    <select 
                      value={shareForm.tripId} 
                      onChange={e => setShareForm(p => ({ ...p, tripId: e.target.value }))}
                      className="w-full px-8 py-6 bg-white/5 border border-white/10 rounded-2xl text-lg text-white outline-none focus:border-primary transition-all appearance-none"
                    >
                      <option value="" className="bg-black text-white">Select a trip from your registry...</option>
                      {trips.map(t => <option key={t._id} value={t._id} className="bg-black text-white">{t.title}</option>)}
                    </select>
                  </div>

                  <div className="space-y-3">
                    <label className="block text-[10px] font-black text-white/40 uppercase tracking-[0.3em]">The Narrative</label>
                    <textarea 
                      value={shareForm.caption} 
                      onChange={e => setShareForm(p => ({ ...p, caption: e.target.value }))}
                      placeholder="Tell us about the magic of this journey..."
                      rows={5}
                      className="w-full px-8 py-6 bg-white/5 border border-white/10 rounded-2xl text-lg text-white outline-none focus:border-primary transition-all resize-none placeholder:text-white/20"
                    />
                  </div>

                  <div className="flex gap-4 pt-6">
                    <button type="submit" className="flex-1 bg-primary hover:bg-primary-hover text-white py-6 rounded-[24px] font-black text-xs uppercase tracking-[0.4em] transition-all shadow-2xl shadow-primary/30 active:scale-95">
                      Post to Circle
                    </button>
                    <button type="button" onClick={() => setShowShareModal(false)} className="px-10 bg-white/5 hover:bg-white/10 text-white py-6 rounded-[24px] font-black text-xs uppercase tracking-[0.4em] transition-all border border-white/10">
                      Abort
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}

          {loading ? (
            <div className="space-y-12">
              {[1, 2].map(i => (
                <div key={i} className="h-[600px] bg-white/5 rounded-[56px] skeleton border border-white/10" />
              ))}
            </div>
          ) : posts.length === 0 ? (
            <div className="text-center py-40 bg-white/5 backdrop-blur-3xl rounded-[64px] border border-dashed border-white/10 group animate-fadeIn">
              <Compass className="w-24 h-24 text-white/10 mx-auto mb-10 group-hover:text-primary group-hover:rotate-45 transition-all duration-1000 animate-floatY" />
              <h3 className="font-display text-5xl text-white mb-6 italic">The Circle is Quiet</h3>
              <p className="text-white/40 text-xl font-light mb-12 max-w-xl mx-auto">
                No chronicles have been shared yet. Be the first to broadcast your expedition rituals.
              </p>
              <button 
                onClick={() => setShowShareModal(true)}
                className="text-primary font-black text-xs uppercase tracking-[0.4em] hover:tracking-[0.6em] transition-all flex items-center justify-center gap-4 mx-auto"
              >
                Broadcast Now <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <div className="space-y-16 reveal-group">
              {posts.map((post, idx) => (
                <div 
                  key={post._id} 
                  className="bg-white/5 backdrop-blur-3xl rounded-[56px] border border-white/10 overflow-hidden hover:border-primary/40 transition-all duration-500 shadow-2xl animate-fadeInSlideUp"
                  style={{ animationDelay: `${idx * 150}ms` }}
                >
                  {/* Visual Preview */}
                  <div className="h-[450px] relative overflow-hidden group">
                    <SafeImage 
                      src={post.tripId?.coverPhotoUrl || 'https://images.unsplash.com/photo-1524492459416-81446b1f315e?q=80&w=1200'} 
                      category="hero"
                      alt="" 
                      fill
                      className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all duration-[4000ms]" 
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
                    
                    <div className="absolute top-10 right-10 flex gap-3">
                      <div className="bg-black/60 backdrop-blur-2xl px-6 py-2.5 rounded-full text-[10px] font-black text-white uppercase tracking-widest border border-white/10">
                        {post.tripId?.title || 'Bespoke Expedition'}
                      </div>
                    </div>

                    <div className="absolute bottom-10 left-10 flex items-center gap-5">
                      <div className="w-14 h-14 rounded-2xl bg-primary flex items-center justify-center text-white text-xl font-black shadow-2xl animate-pulseGlow">
                        {post.userId?.name?.charAt(0) || 'E'}
                      </div>
                      <div>
                        <p className="text-sm font-black text-white tracking-widest uppercase">Broadcast by {post.userId?.name || 'Explorer'}</p>
                        <p className="text-[10px] text-primary font-black uppercase tracking-[0.4em] mt-1.5 flex items-center gap-2">
                          <Sparkles className="w-3 h-3" /> Verified Chronicle
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="p-12">
                    {/* Caption / Narrative */}
                    <p className="text-white/70 text-xl font-light leading-relaxed mb-12 italic border-l-4 border-primary/20 pl-8">
                      "{post.caption}"
                    </p>

                    {/* Interactions */}
                    <div className="flex items-center justify-between pt-10 border-t border-white/5">
                      <div className="flex gap-10">
                        <button 
                          onClick={() => handleLike(post._id)}
                          className={`flex items-center gap-4 text-[10px] font-black uppercase tracking-[0.2em] transition-all group/like ${post.likes > 0 ? 'text-primary' : 'text-white/40 hover:text-primary'}`}
                        >
                          <div className={`p-4 rounded-2xl border ${post.likes > 0 ? 'bg-primary/10 border-primary/40' : 'bg-white/5 border-white/10'} group-hover/like:scale-110 transition-transform`}>
                            <Heart className={`w-5 h-5 ${post.likes > 0 ? 'fill-primary' : ''}`} />
                          </div>
                          {post.likes} Acknowledgements
                        </button>
                        
                        <button className="flex items-center gap-4 text-[10px] font-black uppercase tracking-[0.2em] text-white/40 hover:text-white transition-all group/share">
                          <div className="p-4 rounded-2xl bg-white/5 border border-white/10 group-hover/share:scale-110 transition-transform">
                            <Share2 className="w-5 h-5" />
                          </div>
                          Distribute
                        </button>
                      </div>

                      <Link 
                        href={`/trips/${post.tripId?._id}`}
                        className="flex items-center gap-4 text-[10px] font-black uppercase tracking-[0.4em] text-primary hover:gap-6 transition-all group/view"
                      >
                        Access Archive <ArrowRight className="w-5 h-5 group-hover/view:translate-x-2 transition-transform" />
                      </Link>
                    </div>
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

