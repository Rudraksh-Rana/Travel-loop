'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { notesApi } from '@/lib/api';
import PageWrapper from '@/components/PageWrapper';
import { 
  PlusCircle, Trash2, Edit2, ArrowLeft, 
  BookOpen, Clock, Calendar, PenTool,
  Bookmark, Share2, Sparkles, Navigation
} from 'lucide-react';
import Link from 'next/link';

export default function TripNotesPage() {
  const { id } = useParams();
  const [notes, setNotes] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAdd, setShowAdd] = useState(false);
  const [newContent, setNewContent] = useState('');
  const [editId, setEditId] = useState<string | null>(null);
  const [editContent, setEditContent] = useState('');

  useEffect(() => {
    if (id) {
      notesApi.list(id as string).then(setNotes).catch(console.error).finally(() => setLoading(false));
    }
  }, [id]);

  async function handleAdd(e: React.FormEvent) {
    e.preventDefault();
    if (!newContent.trim()) return;
    const note = await notesApi.create({ tripId: id, content: newContent });
    setNotes(prev => [note, ...prev]);
    setNewContent('');
    setShowAdd(false);
  }

  async function handleUpdate(noteId: string) {
    const updated = await notesApi.update(noteId, { content: editContent });
    setNotes(prev => prev.map(n => n._id === noteId ? updated : n));
    setEditId(null);
  }

  async function handleDelete(noteId: string) {
    if (!confirm('Discard this memory?')) return;
    await notesApi.delete(noteId);
    setNotes(prev => prev.filter(n => n._id !== noteId));
  }

  return (
    <PageWrapper>
      {/* Cinematic Background */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none rounded-tl-[40px]">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-[0.85] scale-105"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?q=80&w=2000')" }}
        />
        <div className="absolute inset-0 bg-gradient-to-br from-black/95 via-black/40 to-black/90" />
      </div>

      <div className="relative z-10 text-white min-h-screen pt-8 pb-20 animate-fadeIn">
        
        {/* Header */}
        <header className="flex flex-col md:flex-row md:items-end justify-between gap-10 mb-16">
          <div className="space-y-4">
            <Link href={`/trips/${id}`} className="inline-flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.3em] text-white/30 hover:text-primary transition-all group mb-4">
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-2 transition-transform" /> Back to Chronicle
            </Link>
            <div className="flex items-center gap-3 text-primary uppercase tracking-[0.4em] text-[10px] font-black">
              <div className="w-8 h-[2px] bg-primary" />
              Memory Archive
            </div>
            <h1 className="font-display text-7xl md:text-8xl text-white tracking-tighter leading-[0.8]">
              Travel <span className="text-primary italic">Journal</span>
            </h1>
            <p className="text-white/40 mt-6 text-xl font-light italic flex items-center gap-3">
              Capture every ritual, scent, and golden hour of your expedition.
            </p>
          </div>

          <button 
            onClick={() => setShowAdd(!showAdd)}
            className="bg-terracotta hover:bg-terracotta-hover text-white px-10 py-6 rounded-2xl font-black text-xs uppercase tracking-[0.2em] flex items-center gap-4 shadow-2xl shadow-terracotta/30 transition-all hover:scale-105 active:scale-95 group"
          >
            <PenTool className="w-5 h-5 group-hover:rotate-12 transition-transform duration-500" /> 
            Write Entry
          </button>
        </header>

        {showAdd && (
          <form onSubmit={handleAdd} className="bg-white/5 backdrop-blur-3xl border border-primary/30 rounded-[48px] p-12 mb-16 shadow-2xl animate-fadeIn relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 blur-[120px] -mr-32 -mt-32" />
            <textarea 
              value={newContent} 
              onChange={(e) => setNewContent(e.target.value)} 
              rows={8}
              placeholder="The golden dust over Varanasi, the smell of fresh cardamom in Munnar..."
              className="w-full px-0 py-3 bg-transparent border-none text-3xl text-white placeholder:text-white/10
                         focus:outline-none resize-none mb-10 font-display italic leading-relaxed relative z-10" 
            />
            <div className="flex justify-end gap-6 relative z-10">
              <button type="button" onClick={() => setShowAdd(false)} className="px-8 py-4 text-[10px] font-black uppercase tracking-widest text-white/40 hover:text-white transition-all">Discard Draft</button>
              <button type="submit" className="bg-primary text-white px-12 py-5 rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-2xl shadow-primary/20 hover:scale-105 transition-all">Save to Chronicle</button>
            </div>
          </form>
        )}

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {[1, 2, 3, 4].map(i => <div key={i} className="h-[400px] bg-white/5 animate-pulse rounded-[48px] border border-white/10" />)}
          </div>
        ) : notes.length === 0 ? (
          <div className="text-center py-40 bg-white/5 backdrop-blur-3xl rounded-[48px] border border-dashed border-white/10 group">
            <BookOpen className="w-24 h-24 text-white/10 mx-auto mb-8 group-hover:text-primary transition-all duration-1000" />
            <h3 className="font-display text-5xl text-white mb-4 italic">Empty Pages</h3>
            <p className="text-white/40 text-xl font-light mb-12">Every extraordinary journey deserves a chronicle.</p>
            <button onClick={() => setShowAdd(true)} className="bg-white text-black px-10 py-5 rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-primary hover:text-white transition-all">Begin Writing</button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {notes.map(note => (
              <div key={note._id} className="group bg-white/5 backdrop-blur-3xl rounded-[48px] border border-white/10 p-12 hover:border-primary/40 transition-all relative overflow-hidden shadow-2xl">
                <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 blur-3xl group-hover:bg-primary/10 transition-all" />
                
                {editId === note._id ? (
                  <div className="animate-fadeIn relative z-10">
                    <textarea 
                      value={editContent} 
                      onChange={(e) => setEditContent(e.target.value)} 
                      rows={6}
                      className="w-full px-6 py-6 bg-white/5 border border-white/20 rounded-3xl text-2xl text-white font-display italic mb-8 focus:outline-none focus:border-primary/50 resize-none" 
                    />
                    <div className="flex gap-4">
                      <button onClick={() => handleUpdate(note._id)} className="bg-primary text-white px-8 py-4 rounded-xl text-[10px] font-black uppercase tracking-widest">Update Entry</button>
                      <button onClick={() => setEditId(null)} className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-white/40 hover:text-white">Cancel</button>
                    </div>
                  </div>
                ) : (
                  <>
                    <div className="flex items-center justify-between mb-10 relative z-10">
                      <div className="flex items-center gap-6 text-[10px] font-black uppercase tracking-widest text-white/20">
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4 text-primary" />
                          {new Date(note.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="w-4 h-4 text-primary" />
                          {new Date(note.createdAt).toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })}
                        </div>
                      </div>
                      <div className="flex gap-3 opacity-0 group-hover:opacity-100 transition-all translate-x-4 group-hover:translate-x-0">
                        <button onClick={() => { setEditId(note._id); setEditContent(note.content); }}
                          className="p-3 bg-white/5 rounded-xl border border-white/10 text-white/40 hover:text-primary transition-all">
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button onClick={() => handleDelete(note._id)}
                          className="p-3 bg-white/5 rounded-xl border border-white/10 text-white/40 hover:text-red-500 transition-all">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                    
                    <p className="text-3xl text-white font-display italic leading-relaxed mb-10 relative z-10">
                      "{note.content}"
                    </p>

                    <div className="flex items-center justify-between pt-10 border-t border-white/10 relative z-10">
                      <div className="flex gap-6">
                        <button className="text-white/20 hover:text-primary transition-colors">
                          <Bookmark className="w-5 h-5" />
                        </button>
                        <button className="text-white/20 hover:text-primary transition-colors">
                          <Share2 className="w-5 h-5" />
                        </button>
                      </div>
                      <div className="flex items-center gap-3 text-[10px] font-black uppercase tracking-widest text-white/10">
                        <Navigation className="w-4 h-4" /> Entry #{note._id.slice(-4)}
                      </div>
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </PageWrapper>
  );
}
