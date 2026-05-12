'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { budgetApi } from '@/lib/api';
import PageWrapper from '@/components/PageWrapper';
import { 
  PlusCircle, Trash2, ArrowLeft, Receipt, 
  IndianRupee, PieChart, TrendingUp, Filter,
  ShoppingBag, Coffee, Home, Plane, MoreHorizontal,
  Sparkles, Navigation
} from 'lucide-react';
import Link from 'next/link';

const CATEGORIES = [
  { name: 'Transport', icon: Plane, color: 'bg-blue-500', glow: 'shadow-blue-500/20' },
  { name: 'Accommodation', icon: Home, color: 'bg-purple-500', glow: 'shadow-purple-500/20' },
  { name: 'Food', icon: Coffee, color: 'bg-orange-500', glow: 'shadow-orange-500/20' },
  { name: 'Activities', icon: TrendingUp, color: 'bg-primary', glow: 'shadow-primary/20' },
  { name: 'Shopping', icon: ShoppingBag, color: 'bg-pink-500', glow: 'shadow-pink-500/20' },
  { name: 'Other', icon: MoreHorizontal, color: 'bg-gray-500', glow: 'shadow-gray-500/20' },
];

export default function TripBudgetPage() {
  const { id } = useParams();
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAdd, setShowAdd] = useState(false);
  const [form, setForm] = useState({ category: 'Transport', description: '', amount: '', qty: '1' });

  useEffect(() => {
    if (id) {
      budgetApi.list(id as string).then(setItems).catch(console.error).finally(() => setLoading(false));
    }
  }, [id]);

  async function handleAdd(e: React.FormEvent) {
    e.preventDefault();
    if (!form.description || !form.amount) return;
    const item = await budgetApi.create({
      tripId: id, category: form.category, description: form.description,
      amount: parseFloat(form.amount), qty: parseInt(form.qty) || 1
    });
    setItems(prev => [...prev, item]);
    setForm({ category: 'Transport', description: '', amount: '', qty: '1' });
    setShowAdd(false);
  }

  async function handleDelete(itemId: string) {
    if (!confirm('Discard this record?')) return;
    await budgetApi.delete(itemId);
    setItems(prev => prev.filter(i => i._id !== itemId));
  }

  const total = items.reduce((sum, i) => sum + (i.amount * i.qty), 0);
  
  const categoryTotals = CATEGORIES.map(cat => {
    const sum = items.filter(i => i.category === cat.name).reduce((s, i) => s + i.amount * i.qty, 0);
    return { ...cat, total: sum, percentage: total > 0 ? (sum / total) * 100 : 0 };
  }).filter(c => c.total > 0 || c.name === 'Transport');

  return (
    <PageWrapper>
      {/* Cinematic Background */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none rounded-tl-[40px]">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-[0.85] scale-105"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1590523277543-a94d2e4eb00b?q=80&w=2000')" }}
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
              Financial Audit
            </div>
            <h1 className="font-display text-7xl md:text-8xl text-white tracking-tighter leading-[0.8]">
              Expense <span className="text-primary italic">Ledger</span>
            </h1>
            <p className="text-white/40 mt-6 text-xl font-light italic flex items-center gap-3">
              <Receipt className="w-5 h-5 text-terracotta" /> Tracking the resource allocation of your journey.
            </p>
          </div>

          <button 
            onClick={() => setShowAdd(!showAdd)}
            className="bg-terracotta hover:bg-terracotta-hover text-white px-10 py-6 rounded-2xl font-black text-xs uppercase tracking-[0.2em] flex items-center gap-4 shadow-2xl shadow-terracotta/30 transition-all hover:scale-105 active:scale-95 group"
          >
            <PlusCircle className="w-5 h-5 group-hover:rotate-90 transition-transform duration-500" /> 
            Record Transaction
          </button>
        </header>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 mb-16">
          {/* Main Total Card */}
          <div className="lg:col-span-1 bg-white/5 backdrop-blur-3xl border border-primary/30 rounded-[48px] p-12 text-white shadow-2xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 blur-[100px] -mr-32 -mt-32 transition-all group-hover:scale-150 duration-700" />
            <IndianRupee className="absolute -right-4 -bottom-4 w-40 h-40 text-primary/10 group-hover:rotate-12 transition-transform duration-700" />
            
            <div className="relative z-10 space-y-2">
              <p className="text-primary/60 text-[10px] font-black uppercase tracking-[0.3em] mb-4">Total Expedition Impact</p>
              <h2 className="text-7xl font-display italic leading-none mb-6 group-hover:translate-x-2 transition-transform duration-500">₹{total.toLocaleString('en-IN')}</h2>
              <div className="flex items-center gap-3 text-[10px] font-black uppercase tracking-widest bg-white/5 w-fit px-5 py-2.5 rounded-full border border-white/10">
                <Sparkles className="w-3.5 h-3.5 text-primary" /> Fiscal Integrity Maintained
              </div>
            </div>
          </div>

          {/* Category Breakdown Card */}
          <div className="lg:col-span-2 bg-white/5 backdrop-blur-3xl border border-white/10 rounded-[48px] p-12 shadow-2xl relative overflow-hidden">
            <h3 className="font-display text-3xl text-white mb-10 italic flex items-center gap-4">
              <PieChart className="w-6 h-6 text-primary" /> Sector Allocation
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
              {categoryTotals.map(cat => (
                <div key={cat.name} className="space-y-4 group">
                  <div className="flex justify-between items-end mb-2">
                    <div className="flex items-center gap-3">
                      <div className={`w-3 h-3 rounded-full ${cat.color} ${cat.glow} shadow-lg`} />
                      <span className="text-[10px] font-black uppercase tracking-widest text-white/40 group-hover:text-white transition-colors">{cat.name}</span>
                    </div>
                    <span className="text-sm font-bold text-white/80">₹{cat.total.toLocaleString('en-IN')} <span className="text-[10px] text-white/20 font-black ml-1">({Math.round(cat.percentage)}%)</span></span>
                  </div>
                  <div className="h-2 bg-white/5 rounded-full overflow-hidden border border-white/5">
                    <div 
                      className={`h-full ${cat.color} rounded-full transition-all duration-1000 group-hover:brightness-125`} 
                      style={{ width: `${cat.percentage}%` }} 
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {showAdd && (
          <form onSubmit={handleAdd} className="bg-white/5 backdrop-blur-3xl border border-primary/30 rounded-[48px] p-12 mb-16 shadow-2xl animate-fadeIn relative overflow-hidden group">
            <div className="absolute top-0 left-0 w-64 h-64 bg-primary/10 blur-[100px] -ml-32 -mt-32" />
            <h3 className="font-display text-4xl text-white mb-10 italic relative z-10">Inject Resource Record</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-10 relative z-10">
              <div className="space-y-3">
                <label className="text-[10px] font-black uppercase tracking-widest text-white/30 ml-2">Category</label>
                <select value={form.category} onChange={(e) => setForm(p => ({ ...p, category: e.target.value }))}
                  className="w-full px-6 py-5 bg-white/5 border border-white/10 rounded-2xl text-white focus:border-primary/50 outline-none transition-all text-sm font-medium appearance-none">
                  {CATEGORIES.map(c => <option key={c.name} className="bg-neutral-900">{c.name}</option>)}
                </select>
              </div>
              <div className="space-y-3">
                <label className="text-[10px] font-black uppercase tracking-widest text-white/30 ml-2">Description</label>
                <input type="text" placeholder="e.g. Ritual Dinner" value={form.description}
                  onChange={(e) => setForm(p => ({ ...p, description: e.target.value }))}
                  className="w-full px-6 py-5 bg-white/5 border border-white/10 rounded-2xl text-white focus:border-primary/50 outline-none transition-all text-sm font-medium" />
              </div>
              <div className="space-y-3">
                <label className="text-[10px] font-black uppercase tracking-widest text-white/30 ml-2">Value (₹)</label>
                <input type="number" placeholder="0" value={form.amount}
                  onChange={(e) => setForm(p => ({ ...p, amount: e.target.value }))}
                  className="w-full px-6 py-5 bg-white/5 border border-white/10 rounded-2xl text-white focus:border-primary/50 outline-none transition-all text-sm font-medium" />
              </div>
              <div className="space-y-3">
                <label className="text-[10px] font-black uppercase tracking-widest text-white/30 ml-2">Quantity</label>
                <input type="number" placeholder="1" value={form.qty} min="1"
                  onChange={(e) => setForm(p => ({ ...p, qty: e.target.value }))}
                  className="w-full px-6 py-5 bg-white/5 border border-white/10 rounded-2xl text-white focus:border-primary/50 outline-none transition-all text-sm font-medium" />
              </div>
            </div>
            <div className="flex gap-6 relative z-10">
              <button type="submit" className="bg-primary text-white px-12 py-5 rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-2xl shadow-primary/20 hover:scale-105 active:scale-95 transition-all">Audit Record</button>
              <button type="button" onClick={() => setShowAdd(false)} className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-white/40 hover:text-white">Discard</button>
            </div>
          </form>
        )}

        {/* Transaction History Table */}
        <div className="bg-white/5 backdrop-blur-3xl border border-white/10 rounded-[48px] overflow-hidden shadow-2xl relative">
          <div className="px-12 py-8 bg-white/5 border-b border-white/10 flex items-center justify-between">
            <h3 className="font-display text-3xl text-white italic flex items-center gap-4">
              <Filter className="w-5 h-5 text-primary" /> Full Ledger
            </h3>
            <span className="text-[10px] font-black uppercase tracking-widest text-white/20">{items.length} Entries Archived</span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-left bg-black/20">
                  <th className="px-12 py-6 text-[10px] font-black text-white/30 uppercase tracking-[0.2em]">Sector</th>
                  <th className="px-12 py-6 text-[10px] font-black text-white/30 uppercase tracking-[0.2em]">Provenance</th>
                  <th className="px-12 py-6 text-[10px] font-black text-white/30 uppercase tracking-[0.2em]">Vol</th>
                  <th className="px-12 py-6 text-[10px] font-black text-white/30 uppercase tracking-[0.2em] text-right">Value Impact</th>
                  <th className="px-12 py-6"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {items.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="px-12 py-40 text-center">
                      <div className="flex flex-col items-center gap-6 opacity-20">
                        <IndianRupee className="w-20 h-20" />
                        <p className="font-display text-4xl italic">No Fiscal Data Found</p>
                      </div>
                    </td>
                  </tr>
                ) : (
                  items.map((item) => (
                    <tr key={item._id} className="hover:bg-white/5 transition-all group">
                      <td className="px-12 py-8">
                        <span className="px-4 py-2 bg-white/5 border border-white/10 rounded-full text-[10px] font-black text-primary uppercase tracking-widest group-hover:border-primary/40 transition-all">
                          {item.category}
                        </span>
                      </td>
                      <td className="px-12 py-8 font-display text-xl text-white italic group-hover:text-primary transition-all">{item.description}</td>
                      <td className="px-12 py-8 text-white/40 text-[10px] font-black uppercase tracking-widest">{item.qty} units</td>
                      <td className="px-12 py-8 text-right font-display text-2xl text-white italic">₹{(item.amount * item.qty).toLocaleString('en-IN')}</td>
                      <td className="px-12 py-8 text-right">
                        <button onClick={() => handleDelete(item._id)} className="opacity-0 group-hover:opacity-100 p-4 bg-white/5 rounded-2xl border border-white/10 text-white/20 hover:text-red-500 hover:bg-red-500/10 transition-all">
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </PageWrapper>
  );
}
