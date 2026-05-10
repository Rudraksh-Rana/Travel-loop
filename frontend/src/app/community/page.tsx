'use client';

import { useState, useEffect } from 'react';
import { communityApi, tripsApi } from '@/lib/api';
import PageWrapper from '@/components/PageWrapper';
import { 
  Heart, Share2, Users, MessageSquare, 
  MapPin, ArrowRight, PlusCircle, Globe,
  MoreVertical, Compass
} from 'lucide-react';
import Link from 'next/link';

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
    <PageWrapper>
      <div className="max-w-[800px] mx-auto">
        <div className="flex items-center justify-between mb-10">
          <div>
            <h1 className="font-display text-4xl text-text flex items-center gap-3">
              <Globe className="w-9 h-9 text-primary" />
              Community Stories
            </h1>
            <p className="text-text-muted text-sm mt-1">Inspired journeys shared by fellow travellers.</p>
          </div>
          <button 
            onClick={() => setShowShareModal(true)}
            className="flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-xl text-sm font-semibold hover:bg-primary-hover transition-all shadow-lg shadow-primary/20"
          >
            <PlusCircle className="w-4 h-4" /> Share My Trip
          </button>
        </div>

        {/* Share Modal */}
        {showShareModal && (
          <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-3xl w-full max-w-md p-8 animate-fadeIn">
              <h2 className="font-display text-2xl text-text mb-6">Share Your Journey</h2>
              <form onSubmit={handleShare} className="space-y-4">
                <div>
                  <label className="block text-[10px] font-bold text-text-muted uppercase mb-1.5">Select Trip</label>
                  <select 
                    value={shareForm.tripId} 
                    onChange={e => setShareForm(p => ({ ...p, tripId: e.target.value }))}
                    className="w-full px-4 py-3 bg-surface-2 border border-divider rounded-xl text-sm text-text"
                  >
                    <option value="">Choose a trip...</option>
                    {trips.map(t => <option key={t._id} value={t._id}>{t.title}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-text-muted uppercase mb-1.5">Your Story</label>
                  <textarea 
                    value={shareForm.caption} 
                    onChange={e => setShareForm(p => ({ ...p, caption: e.target.value }))}
                    placeholder="Tell us about the magic of this trip..."
                    rows={4}
                    className="w-full px-4 py-3 bg-surface-2 border border-divider rounded-xl text-sm text-text resize-none"
                  />
                </div>
                <div className="flex gap-2 pt-4">
                  <button type="submit" className="flex-1 bg-primary text-white py-3 rounded-xl font-semibold hover:bg-primary-hover transition-all">Post Story</button>
                  <button type="button" onClick={() => setShowShareModal(false)} className="px-6 py-3 text-sm text-text-muted font-medium">Cancel</button>
                </div>
              </form>
            </div>
          </div>
        )}

        {loading ? (
          <div className="space-y-8">
            {[1, 2].map(i => <div key={i} className="h-[400px] bg-surface animate-pulse rounded-3xl" />)}
          </div>
        ) : posts.length === 0 ? (
          <div className="text-center py-24 bg-surface/50 rounded-3xl border border-divider">
            <Compass className="w-16 h-16 text-divider mx-auto mb-4" />
            <h3 className="font-display text-xl text-text mb-1">No stories yet</h3>
            <p className="text-text-muted mb-6">Be the first to share your travel memories.</p>
            <button onClick={() => setShowShareModal(true)} className="text-primary font-bold hover:underline">Share a trip</button>
          </div>
        ) : (
          <div className="space-y-12">
            {posts.map(post => (
              <div key={post._id} className="bg-white rounded-3xl border border-divider overflow-hidden hover:shadow-lg transition-all duration-500">
                {/* Post Image / Trip Preview */}
                <div className="h-64 relative overflow-hidden group">
                  {post.tripId?.coverPhotoUrl ? (
                    <img src={post.tripId.coverPhotoUrl} alt="" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                  ) : (
                    <div className="w-full h-full bg-surface-2 flex items-center justify-center">
                      <Globe className="w-12 h-12 text-divider" />
                    </div>
                  )}
                  <div className="absolute top-6 right-6 px-4 py-2 bg-white/90 backdrop-blur-sm rounded-full text-xs font-bold text-primary shadow-sm">
                    {post.tripId?.title || 'Adventure'}
                  </div>
                </div>

                <div className="p-8">
                  {/* Author */}
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary text-sm font-bold">
                        {post.userId?.name?.charAt(0) || 'A'}
                      </div>
                      <div>
                        <p className="text-sm font-bold text-text">{post.userId?.name || 'Anonymous Explorer'}</p>
                        <p className="text-[10px] text-text-muted uppercase tracking-widest">Shared {new Date(post.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}</p>
                      </div>
                    </div>
                    <button className="text-text-faint hover:text-text">
                      <MoreVertical className="w-5 h-5" />
                    </button>
                  </div>

                  {/* Caption */}
                  <p className="text-text text-base leading-relaxed mb-8">
                    {post.caption}
                  </p>

                  {/* Actions */}
                  <div className="flex items-center justify-between pt-6 border-t border-divider/50">
                    <div className="flex gap-6">
                      <button 
                        onClick={() => handleLike(post._id)}
                        className={`flex items-center gap-2 text-sm font-medium transition-colors ${post.likes > 0 ? 'text-primary' : 'text-text-muted hover:text-primary'}`}
                      >
                        <Heart className={`w-5 h-5 ${post.likes > 0 ? 'fill-primary' : ''}`} />
                        {post.likes}
                      </button>
                      <button className="flex items-center gap-2 text-sm font-medium text-text-muted hover:text-primary transition-colors">
                        <MessageSquare className="w-5 h-5" />
                        0
                      </button>
                      <button className="flex items-center gap-2 text-sm font-medium text-text-muted hover:text-primary transition-colors">
                        <Share2 className="w-5 h-5" />
                      </button>
                    </div>
                    <Link 
                      href={`/trips/${post.tripId?._id}`}
                      className="flex items-center gap-1 text-xs font-bold text-primary uppercase tracking-widest hover:gap-2 transition-all"
                    >
                      View Trip <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </PageWrapper>
  );
}
