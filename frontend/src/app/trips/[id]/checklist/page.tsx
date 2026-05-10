'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { checklistApi } from '@/lib/api';
import PageWrapper from '@/components/PageWrapper';
import { 
  PlusCircle, Trash2, ArrowLeft, CheckSquare,
  Package, ShoppingBag, Laptop, FileText,
  Briefcase, MoreHorizontal, Check
} from 'lucide-react';
import Link from 'next/link';

const CATEGORIES = [
  { name: 'Documents', icon: FileText, color: 'text-blue-500', bg: 'bg-blue-50' },
  { name: 'Clothing', icon: ShoppingBag, color: 'text-orange-500', bg: 'bg-orange-50' },
  { name: 'Electronics', icon: Laptop, color: 'text-purple-500', bg: 'bg-purple-50' },
  { name: 'Toiletries', icon: Package, color: 'text-teal-500', bg: 'bg-teal-50' },
  { name: 'Miscellaneous', icon: MoreHorizontal, color: 'text-gray-500', bg: 'bg-gray-50' },
];

export default function ChecklistPage() {
  const { id } = useParams();
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [newItem, setNewItem] = useState({ name: '', category: 'Clothing' });
  const [showAdd, setShowAdd] = useState(false);

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
    if (!confirm('Remove this item?')) return;
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
      <div className="max-w-[800px] mx-auto">
        <Link href={`/trips/${id}`} className="flex items-center gap-1 text-sm text-text-muted hover:text-primary transition-colors mb-6">
          <ArrowLeft className="w-4 h-4" /> Back to Overview
        </Link>

        {/* Hero Section */}
        <div className="bg-surface rounded-3xl border border-divider p-8 mb-8 relative overflow-hidden">
          <Briefcase className="absolute -right-4 -bottom-4 w-32 h-32 text-divider/20" />
          <div className="relative z-10">
            <h1 className="font-display text-4xl text-text mb-2 flex items-center gap-3">
              <CheckSquare className="w-9 h-9 text-primary" />
              Packing Essentials
            </h1>
            <p className="text-text-muted text-sm mb-6 max-w-md">Segmented list to ensure you don't leave anything behind for your expedition.</p>
            
            <div className="space-y-2">
              <div className="flex justify-between text-xs font-bold uppercase tracking-widest">
                <span className="text-text-muted">Readiness Level</span>
                <span className="text-primary">{progress}% Ready</span>
              </div>
              <div className="h-2.5 bg-divider rounded-full overflow-hidden">
                <div 
                  className="h-full bg-primary rounded-full transition-all duration-700" 
                  style={{ width: `${progress}%` }} 
                />
              </div>
            </div>
          </div>
        </div>

        {/* Quick Add */}
        <form onSubmit={handleAdd} className="flex gap-3 mb-10">
          <div className="flex-1 flex gap-2">
            <select 
              value={newItem.category} 
              onChange={e => setNewItem(p => ({ ...p, category: e.target.value }))}
              className="px-4 py-3 bg-surface border border-divider rounded-xl text-sm text-text focus:outline-none focus:ring-2 focus:ring-primary/20"
            >
              {CATEGORIES.map(c => <option key={c.name}>{c.name}</option>)}
            </select>
            <input 
              type="text" 
              value={newItem.name} 
              onChange={e => setNewItem(p => ({ ...p, name: e.target.value }))}
              placeholder="What else to pack?" 
              className="flex-1 px-4 py-3 bg-surface border border-divider rounded-xl text-sm text-text placeholder:text-text-faint
                         focus:outline-none focus:ring-2 focus:ring-primary/20" 
            />
          </div>
          <button type="submit" className="bg-primary text-white px-6 py-3 rounded-xl text-sm font-semibold hover:bg-primary-hover transition-all shadow-lg shadow-primary/20">
            Add to List
          </button>
        </form>

        {loading ? (
          <div className="space-y-4">
            {[1, 2, 3].map(i => <div key={i} className="h-16 bg-surface animate-pulse rounded-2xl" />)}
          </div>
        ) : items.length === 0 ? (
          <div className="text-center py-20 bg-surface/50 rounded-3xl border border-dashed border-divider">
            <Package className="w-16 h-16 text-divider mx-auto mb-4" />
            <h3 className="font-display text-xl text-text mb-1">Your suitcase is empty</h3>
            <p className="text-text-muted">Start adding essentials for your journey.</p>
          </div>
        ) : (
          <div className="space-y-8">
            {grouped.map(group => (
              <div key={group.name} className="animate-fadeIn">
                <div className="flex items-center gap-2 mb-4">
                  <div className={`p-1.5 rounded-lg ${group.bg}`}>
                    <group.icon className={`w-4 h-4 ${group.color}`} />
                  </div>
                  <h3 className="text-sm font-bold text-text uppercase tracking-widest">{group.name}</h3>
                  <div className="flex-1 h-px bg-divider ml-2" />
                </div>
                
                <div className="grid gap-2">
                  {group.items.map(item => (
                    <div 
                      key={item._id} 
                      onClick={() => handleToggle(item._id, item.isChecked)}
                      className={`group flex items-center gap-4 px-5 py-4 rounded-2xl border transition-all cursor-pointer
                                 ${item.isChecked 
                                   ? 'bg-surface/50 border-divider opacity-60' 
                                   : 'bg-surface border-divider hover:border-primary/30 hover:shadow-sm'}`}
                    >
                      <div className={`w-6 h-6 rounded-lg border-2 flex items-center justify-center transition-all
                                      ${item.isChecked 
                                        ? 'bg-primary border-primary text-white' 
                                        : 'border-divider bg-white group-hover:border-primary/50'}`}>
                        {item.isChecked && <Check className="w-4 h-4" />}
                      </div>
                      
                      <span className={`flex-1 text-sm font-medium transition-all ${item.isChecked ? 'line-through text-text-faint' : 'text-text'}`}>
                        {item.name}
                      </span>

                      <button 
                        onClick={(e) => { e.stopPropagation(); handleDelete(item._id); }}
                        className="opacity-0 group-hover:opacity-100 p-2 text-text-faint hover:text-red-500 transition-all"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                  {group.items.length === 0 && (
                    <div className="text-xs text-text-faint italic py-2 pl-10">No items added yet.</div>
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
