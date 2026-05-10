'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { budgetApi } from '@/lib/api';
import PageWrapper from '@/components/PageWrapper';
import { 
  PlusCircle, Trash2, ArrowLeft, Receipt, 
  IndianRupee, PieChart, TrendingUp, Filter,
  ShoppingBag, Coffee, Home, Plane, MoreHorizontal
} from 'lucide-react';
import Link from 'next/link';

const CATEGORIES = [
  { name: 'Transport', icon: Plane, color: 'bg-blue-500' },
  { name: 'Accommodation', icon: Home, color: 'bg-purple-500' },
  { name: 'Food', icon: Coffee, color: 'bg-orange-500' },
  { name: 'Activities', icon: TrendingUp, color: 'bg-green-500' },
  { name: 'Shopping', icon: ShoppingBag, color: 'bg-pink-500' },
  { name: 'Other', icon: MoreHorizontal, color: 'bg-gray-500' },
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
    if (!confirm('Delete this expense?')) return;
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
      <div className="max-w-[1100px] mx-auto">
        {/* Navigation */}
        <Link href={`/trips/${id}`} className="flex items-center gap-1 text-sm text-text-muted hover:text-primary transition-colors mb-6">
          <ArrowLeft className="w-4 h-4" /> Back to Overview
        </Link>

        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="font-display text-3xl text-text flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                <Receipt className="w-6 h-6 text-primary" />
              </div>
              Expense Ledger
            </h1>
            <p className="text-text-muted text-sm mt-1">Track your spending across categories</p>
          </div>
          <button onClick={() => setShowAdd(!showAdd)}
            className="flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-xl text-sm font-semibold hover:bg-primary-hover transition-all shadow-md shadow-primary/20">
            <PlusCircle className="w-4 h-4" /> Record Expense
          </button>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-10">
          {/* Main Total */}
          <div className="lg:col-span-1 bg-primary rounded-3xl p-8 text-white shadow-xl shadow-primary/20 relative overflow-hidden group">
            <IndianRupee className="absolute -right-4 -bottom-4 w-32 h-32 text-white/10 group-hover:rotate-12 transition-transform duration-700" />
            <p className="text-white/70 text-xs uppercase tracking-widest font-bold mb-2">Total Expedition Cost</p>
            <h2 className="text-5xl font-display mb-4">₹{total.toLocaleString('en-IN')}</h2>
            <div className="flex items-center gap-2 text-xs bg-white/10 w-fit px-3 py-1.5 rounded-full">
              <TrendingUp className="w-3 h-3" /> Within Budget
            </div>
          </div>

          {/* Category Breakdown */}
          <div className="lg:col-span-2 bg-surface rounded-3xl border border-divider p-8">
            <h3 className="text-sm font-bold text-text mb-6 flex items-center gap-2 uppercase tracking-wider">
              <PieChart className="w-4 h-4" /> Spending by Category
            </h3>
            <div className="space-y-5">
              {categoryTotals.map(cat => (
                <div key={cat.name}>
                  <div className="flex justify-between text-sm mb-2">
                    <div className="flex items-center gap-2">
                      <div className={`w-2 h-2 rounded-full ${cat.color}`} />
                      <span className="font-medium text-text">{cat.name}</span>
                    </div>
                    <span className="text-text-muted">₹{cat.total.toLocaleString('en-IN')} ({Math.round(cat.percentage)}%)</span>
                  </div>
                  <div className="h-2 bg-divider rounded-full overflow-hidden">
                    <div 
                      className={`h-full ${cat.color} rounded-full transition-all duration-1000`} 
                      style={{ width: `${cat.percentage}%` }} 
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {showAdd && (
          <form onSubmit={handleAdd} className="bg-surface rounded-2xl border border-primary/20 p-8 mb-10 shadow-lg animate-fadeIn">
            <h3 className="font-display text-xl text-text mb-6">New Expense Entry</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              <div>
                <label className="block text-[10px] font-bold text-text-muted uppercase mb-1.5">Category</label>
                <select value={form.category} onChange={(e) => setForm(p => ({ ...p, category: e.target.value }))}
                  className="w-full px-4 py-3 bg-surface-2 border border-divider rounded-xl text-sm text-text focus:outline-none focus:ring-2 focus:ring-primary/30">
                  {CATEGORIES.map(c => <option key={c.name}>{c.name}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-[10px] font-bold text-text-muted uppercase mb-1.5">Description</label>
                <input type="text" placeholder="e.g. Dinner at Chokhi Dhani" value={form.description}
                  onChange={(e) => setForm(p => ({ ...p, description: e.target.value }))}
                  className="w-full px-4 py-3 bg-surface-2 border border-divider rounded-xl text-sm text-text focus:outline-none focus:ring-2 focus:ring-primary/30" />
              </div>
              <div>
                <label className="block text-[10px] font-bold text-text-muted uppercase mb-1.5">Amount (₹)</label>
                <input type="number" placeholder="0" value={form.amount}
                  onChange={(e) => setForm(p => ({ ...p, amount: e.target.value }))}
                  className="w-full px-4 py-3 bg-surface-2 border border-divider rounded-xl text-sm text-text focus:outline-none focus:ring-2 focus:ring-primary/30" />
              </div>
              <div>
                <label className="block text-[10px] font-bold text-text-muted uppercase mb-1.5">Quantity</label>
                <input type="number" placeholder="1" value={form.qty} min="1"
                  onChange={(e) => setForm(p => ({ ...p, qty: e.target.value }))}
                  className="w-full px-4 py-3 bg-surface-2 border border-divider rounded-xl text-sm text-text focus:outline-none focus:ring-2 focus:ring-primary/30" />
              </div>
            </div>
            <div className="flex gap-2">
              <button type="submit" className="bg-primary text-white px-6 py-2.5 rounded-xl text-sm font-semibold hover:bg-primary-hover transition-all">Save Entry</button>
              <button type="button" onClick={() => setShowAdd(false)} className="px-6 py-2.5 text-sm text-text-muted hover:text-text transition-colors">Cancel</button>
            </div>
          </form>
        )}

        {/* Expense List */}
        <div className="bg-surface rounded-3xl border border-divider overflow-hidden">
          <div className="px-8 py-5 bg-surface-2/50 border-b border-divider flex items-center justify-between">
            <h3 className="font-semibold text-text flex items-center gap-2">
              <Filter className="w-4 h-4" /> All Transactions
            </h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left bg-surface-2/20">
                  <th className="px-8 py-4 text-[10px] font-bold text-text-muted uppercase">Category</th>
                  <th className="px-8 py-4 text-[10px] font-bold text-text-muted uppercase">Description</th>
                  <th className="px-8 py-4 text-[10px] font-bold text-text-muted uppercase">Qty</th>
                  <th className="px-8 py-4 text-[10px] font-bold text-text-muted uppercase text-right">Amount</th>
                  <th className="px-8 py-4"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-divider">
                {items.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="px-8 py-20 text-center text-text-muted">
                      No transactions recorded for this trip yet.
                    </td>
                  </tr>
                ) : (
                  items.map((item) => (
                    <tr key={item._id} className="hover:bg-surface-2/30 transition-colors group">
                      <td className="px-8 py-4">
                        <span className="px-3 py-1 bg-surface-2 rounded-full text-[10px] font-bold text-text-muted uppercase">
                          {item.category}
                        </span>
                      </td>
                      <td className="px-8 py-4 font-medium text-text">{item.description}</td>
                      <td className="px-8 py-4 text-text-muted">{item.qty}</td>
                      <td className="px-8 py-4 text-right font-bold text-text">₹{(item.amount * item.qty).toLocaleString('en-IN')}</td>
                      <td className="px-8 py-4 text-right">
                        <button onClick={() => handleDelete(item._id)} className="opacity-0 group-hover:opacity-100 p-2 text-text-faint hover:text-red-500 transition-all">
                          <Trash2 className="w-4 h-4" />
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
