'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { checklistApi } from '@/lib/api';
import PageWrapper from '@/components/PageWrapper';
import { 
  PlusCircle, Trash2, ArrowLeft, CheckSquare,
  Package, ShoppingBag, Laptop, FileText,
  Briefcase, MoreHorizontal, Check, Sparkles,
  Navigation
} from 'lucide-react';
import Link from 'next/link';

const CATEGORIES = [
  { name: 'Documents', icon: FileText, color: 'text-blue-400', bg: 'bg-blue-500/10' },
  { name: 'Clothing', icon: ShoppingBag, color: 'text-orange-400', bg: 'bg-orange-500/10' },
  { name: 'Electronics', icon: Laptop, color: 'text-purple-400', bg: 'bg-purple-500/10' },
  { name: 'Toiletries', icon: Package, color: 'text-blue-400', bg: 'bg-blue-500/10' },
  { name: 'Miscellaneous', icon: MoreHorizontal, color: 'text-gray-400', bg: 'bg-gray-500/10' },
];

export default function ChecklistPage() {
  const { id } = useParams();
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [newItem, setNewItem] = useState({ name: '', category: 'Clothing' });

  useEffect(() => {
    if (id) {
      checklistApi.list(id as string).then(setItems).catch(console.error).finally(() => setLoading(false));
    }
  }, [id]);

  async function handleAdd(e: React.FormEvent) {
    e.preventDefault();
    if (!newItem.name.trim()) return;
    const item = await checklistApi.create({ tripId: id, name: newItem.name, category: newItem.category });
    setItems(prev => [...prev, item]);
    setNewItem(p => ({ ...p, name: '' }));
  }

  async function handleToggle(itemId: string, checked: boolean) {
    const updated = await checklistApi.toggle(itemId, { isChecked: !checked });
    setItems(prev => prev.map(i => i._id === itemId ? updated : i));
  }

  async function handleDelete(itemId: string) {
    if (!confirm('Discard this item?')) return;
    await checklistApi.delete(itemId);
    setItems(prev => prev.filter(i => i._id !== itemId));
  }

  const doneCount = items.filter(i => i.isChecked).length;
  const totalCount = items.length;
  const progress = totalCount > 0 ? Math.round((doneCount / totalCount) * 100) : 0;

  const grouped = CATEGORIES.map(cat => ({
    ...cat,
    items: items.filter(i => i.category === cat.name)
  })).filter(g => g.items.length > 0 || g.name === 'Clothing');

  return (
    <PageWrapper>
      {/* Cinematic Background */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none rounded-tl-[40px]">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-[0.85] scale-105"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1552083375-1447ce886485?q=80&w=2000')" }}
        />
        <div className="absolute inset-0 bg-gradient-to-br from-black/95 via-black/40 to-black/90" />
      </div>

      <div className="max-w-[1200px] mx-auto relative z-10 text-white min-h-[calc(100vh-4rem)] pt-8 pb-20 animate-fadeIn">
        
        {/* Header */}
        <header className="flex flex-col md:flex-row md:items-end justify-between gap-10 mb-16">
          <div className="space-y-4">
            <Link href={`/trips/${id}`} className="inline-flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.3em] text-white/30 hover:text-primary transition-all group mb-4">
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-2 transition-transform" /> Back to Chronicle
            </Link>
            <div className="flex items-center gap-3 text-primary uppercase tracking-[0.4em] text-[10px] font-black">
              <div className="w-8 h-[2px] bg-primary" />
              Expedition Readiness
            </div>
            <h1 className="font-display text-7xl md:text-8xl text-white tracking-tighter leading-[0.8]">
              Packing <span className="text-primary italic">Essentials</span>
            </h1>
            <p className="text-white/40 mt-6 text-xl font-light italic flex items-center gap-3">
              <Briefcase className="w-5 h-5 text-terracotta" /> Segregate your gear for the rituals ahead.
            </p>
          </div>

          <div className="bg-white/5 backdrop-blur-3xl border border-white/10 p-10 rounded-[40px] shadow-2xl relative overflow-hidden group min-w-[300px]">
             <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 blur-[60px] -mr-16 -mt-16" />
             <div className="relative z-10 space-y-4">
                <div className="flex justify-between text-[10px] font-black uppercase tracking-widest">
                  <span className="text-white/30">Readiness Coefficient</span>
                  <span className="text-primary">{progress}% Optimized</span>
                </div>
                <div className="h-3 bg-white/5 rounded-full overflow-hidden border border-white/5">
                  <div 
                    className="h-full bg-primary rounded-full transition-all duration-1000 shadow-[0_0_20px_rgba(var(--color-primary-rgb),0.5)]" 
                    style={{ width: `${progress}%` }} 
                  />
                </div>
                <p className="text-[10px] font-black uppercase tracking-widest text-white/20 text-right">{doneCount} / {totalCount} Items Accounted</p>
             </div>
          </div>
        </header>

        {/* Quick Add Interface */}
        <form onSubmit={handleAdd} className="bg-white/5 backdrop-blur-3xl border border-primary/30 rounded-[32px] p-4 flex flex-col md:flex-row items-center gap-4 shadow-2xl mb-16 group">
          <div className="flex-1 flex flex-col md:flex-row items-center gap-4 w-full">
            <select 
              value={newItem.category} 
              onChange={e => setNewItem(p => ({ ...p, category: e.target.value }))}
              className="w-full md:w-64 px-8 py-5 bg-white/5 border border-white/10 rounded-2xl text-[10px] font-black uppercase tracking-widest text-white/60 focus:border-primary/50 outline-none transition-all appearance-none"
            >
              {CATEGORIES.map(c => <option key={c.name} className="bg-neutral-900">{c.name}</option>)}
            </select>
            <input 
              type="text" 
              value={newItem.name} 
              onChange={e => setNewItem(p => ({ ...p, name: e.target.value }))}
              placeholder="What essential shall we add to the manifest?" 
              className="flex-1 px-8 py-5 bg-transparent text-white outline-none placeholder:text-white/10 text-lg font-medium" 
            />
          </div>
          <button type="submit" className="w-full md:w-auto bg-primary text-white px-10 py-5 rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-2xl shadow-primary/20 hover:scale-105 active:scale-95 transition-all">
            Append to Manifest
          </button>
        </form>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {[1, 2, 3, 4].map(i => <div key={i} className="h-24 bg-white/5 animate-pulse rounded-[32px] border border-white/10" />)}
          </div>
        ) : items.length === 0 ? (
          <div className="text-center py-40 bg-white/5 backdrop-blur-3xl rounded-[48px] border border-dashed border-white/10 group">
            <Package className="w-24 h-24 text-white/10 mx-auto mb-8 group-hover:text-primary transition-all duration-1000" />
            <h3 className="font-display text-5xl text-white mb-4 italic">Suitcase of Air</h3>
            <p className="text-white/40 text-xl font-light">Every expedition requires curated tools. Begin your manifest.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            {grouped.map(group => (
              <div key={group.name} className="bg-white/5 backdrop-blur-3xl border border-white/10 rounded-[48px] p-10 shadow-2xl relative overflow-hidden animate-fadeIn">
                <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 blur-3xl group-hover:bg-primary/10 transition-all" />
                
                <div className="flex items-center gap-4 mb-8 relative z-10">
                  <div className={`p-3 rounded-2xl ${group.bg} border border-white/10`}>
                    <group.icon className={`w-5 h-5 ${group.color}`} />
                  </div>
                  <h3 className="font-display text-3xl text-white italic leading-none">{group.name}</h3>
                  <div className="flex-1 h-px bg-white/10 ml-4" />
                </div>
                
                <div className="space-y-4 relative z-10">
                  {group.items.map(item => (
                    <div 
                      key={item._id} 
                      onClick={() => handleToggle(item._id, item.isChecked)}
                      className={`group flex items-center gap-6 px-8 py-6 rounded-[24px] border transition-all cursor-pointer
                                 ${item.isChecked 
                                   ? 'bg-white/5 border-transparent opacity-40' 
                                   : 'bg-white/5 border-white/10 hover:border-primary/40 hover:bg-white/10'}`}
                    >
                      <div className={`w-8 h-8 rounded-xl border-2 flex items-center justify-center transition-all
                                      ${item.isChecked 
                                        ? 'bg-primary border-primary text-white shadow-xl shadow-primary/20' 
                                        : 'border-white/10 bg-black/20 group-hover:border-primary/50'}`}>
                        {item.isChecked && <Check className="w-5 h-5" />}
                      </div>
                      
                      <span className={`flex-1 text-lg font-medium transition-all ${item.isChecked ? 'line-through text-white/30' : 'text-white'}`}>
                        {item.name}
                      </span>

                      <button 
                        onClick={(e) => { e.stopPropagation(); handleDelete(item._id); }}
                        className="opacity-0 group-hover:opacity-100 p-3 bg-white/5 rounded-xl border border-white/10 text-white/20 hover:text-red-500 hover:bg-red-500/10 transition-all"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  ))}
                  {group.items.length === 0 && (
                    <div className="text-[10px] font-black uppercase tracking-widest text-white/10 py-6 text-center border border-dashed border-white/10 rounded-[24px]">
                      No assets allocated to this sector.
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </PageWrapper>
  );
}
