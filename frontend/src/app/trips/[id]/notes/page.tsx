'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { notesApi } from '@/lib/api';
import PageWrapper from '@/components/PageWrapper';
import { 
  PlusCircle, Trash2, Edit2, ArrowLeft, 
  BookOpen, Clock, Calendar, PenTool,
  Bookmark, Share2
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
      <div className="max-w-[900px] mx-auto">
        <Link href={`/trips/${id}`} className="flex items-center gap-1 text-sm text-text-muted hover:text-primary transition-colors mb-6">
          <ArrowLeft className="w-4 h-4" /> Back to Overview
        </Link>

        <div className="flex items-center justify-between mb-10">
          <div>
            <h1 className="font-display text-4xl text-text flex items-center gap-3">
              <BookOpen className="w-9 h-9 text-primary" />
              Travel Journal
            </h1>
            <p className="text-text-muted text-sm mt-1 italic font-serif">Capture moments, thoughts, and memories from the road.</p>
          </div>
          <button onClick={() => setShowAdd(!showAdd)}
            className="flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-full text-sm font-semibold hover:bg-primary-hover transition-all shadow-lg shadow-primary/20">
            <PenTool className="w-4 h-4" /> Write Entry
          </button>
        </div>

        {showAdd && (
          <form onSubmit={handleAdd} className="bg-white rounded-3xl border border-divider p-8 mb-10 shadow-sm animate-fadeIn relative">
            <div className="absolute top-0 left-0 w-full h-2 bg-primary rounded-t-3xl" />
            <textarea 
              value={newContent} 
              onChange={(e) => setNewContent(e.target.value)} 
              rows={6}
              placeholder="What's on your mind? The smell of tea, the golden hour, the local stories..."
              className="w-full px-0 py-3 bg-transparent border-none text-lg text-text placeholder:text-text-faint
                         focus:outline-none resize-none mb-6 font-serif italic" 
            />
            <div className="flex justify-end gap-3">
              <button type="button" onClick={() => setShowAdd(false)} className="px-6 py-2.5 text-sm text-text-muted hover:text-text font-medium">Cancel</button>
              <button type="submit" className="bg-primary text-white px-8 py-2.5 rounded-full text-sm font-semibold hover:bg-primary-hover transition-all">Save Entry</button>
            </div>
          </form>
        )}

        {loading ? (
          <div className="space-y-6">
            {[1, 2, 3].map(i => <div key={i} className="h-40 bg-surface animate-pulse rounded-3xl" />)}
          </div>
        ) : notes.length === 0 ? (
          <div className="text-center py-24 bg-surface/50 rounded-3xl border border-dashed border-divider">
            <div className="text-6xl mb-6 opacity-30">✍️</div>
            <h3 className="font-display text-2xl text-text mb-2">The pages are empty</h3>
            <p className="text-text-muted mb-8">Every journey is a story. Start writing yours.</p>
            <button onClick={() => setShowAdd(true)} className="text-primary font-bold hover:underline">Write your first entry</button>
          </div>
        ) : (
          <div className="grid gap-8">
            {notes.map(note => (
              <div key={note._id} className="group bg-surface rounded-3xl border border-divider p-8 hover:shadow-md transition-all relative">
                {editId === note._id ? (
                  <div className="animate-fadeIn">
                    <textarea 
                      value={editContent} 
                      onChange={(e) => setEditContent(e.target.value)} 
                      rows={5}
                      className="w-full px-4 py-3 bg-white border border-divider rounded-2xl text-lg text-text font-serif italic mb-4 focus:outline-none focus:ring-2 focus:ring-primary/20" 
                    />
                    <div className="flex gap-2">
                      <button onClick={() => handleUpdate(note._id)} className="bg-primary text-white px-6 py-2 rounded-full text-sm font-semibold">Update Entry</button>
                      <button onClick={() => setEditId(null)} className="px-6 py-2 text-sm text-text-muted hover:text-text font-medium">Cancel</button>
                    </div>
                  </div>
                ) : (
                  <>
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3 text-xs text-text-muted">
                        <div className="flex items-center gap-1 bg-surface-2 px-2 py-1 rounded-md">
                          <Calendar className="w-3 h-3" />
                          {new Date(note.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {new Date(note.createdAt).toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })}
                        </div>
                      </div>
                      <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button onClick={() => { setEditId(note._id); setEditContent(note.content); }}
                          className="p-2 text-text-faint hover:text-primary transition-colors hover:bg-white rounded-full">
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button onClick={() => handleDelete(note._id)}
                          className="p-2 text-text-faint hover:text-red-500 transition-colors hover:bg-white rounded-full">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                    
                    <p className="text-lg text-text font-serif italic leading-relaxed whitespace-pre-wrap mb-6">
                      "{note.content}"
                    </p>

                    <div className="flex items-center justify-between pt-6 border-t border-divider/50">
                      <div className="flex gap-4">
                        <button className="text-text-faint hover:text-primary transition-colors">
                          <Bookmark className="w-4 h-4" />
                        </button>
                        <button className="text-text-faint hover:text-primary transition-colors">
                          <Share2 className="w-4 h-4" />
                        </button>
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
