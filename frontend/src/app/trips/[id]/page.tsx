'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { tripsApi } from '@/lib/api';
import PageWrapper from '@/components/PageWrapper';
import Link from 'next/link';
import { 
  Calendar, MapPin, PlusCircle, Trash2, ArrowLeft, 
  FileText, Receipt, CheckSquare, Edit, Share2, 
  Globe, Copy, Check, LayoutPanelLeft 
} from 'lucide-react';

export default function TripDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  const [data, setData] = useState<{ trip: any; stops: any[] } | null>(null);
  const [loading, setLoading] = useState(true);
  const [newStop, setNewStop] = useState({ cityName: '', country: '', arrivalDate: '', departureDate: '' });
  const [showAddStop, setShowAddStop] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (id) {
      tripsApi.get(id as string)
        .then(setData)
        .catch(console.error)
        .finally(() => setLoading(false));
    }
  }, [id]);

  async function handleAddStop(e: React.FormEvent) {
    e.preventDefault();
    if (!newStop.cityName || !newStop.country || !newStop.arrivalDate || !newStop.departureDate) return;

    const stop = await tripsApi.addStop(id as string, {
      ...newStop,
      orderIndex: (data?.stops?.length || 0) + 1,
    });

    setData(prev => prev ? { ...prev, stops: [...prev.stops, stop] } : prev);
    setNewStop({ cityName: '', country: '', arrivalDate: '', departureDate: '' });
    setShowAddStop(false);
  }

  async function handleDeleteStop(stopId: string) {
    if (!confirm('Delete this stop?')) return;
    await tripsApi.deleteStop(stopId);
    setData(prev => prev ? { ...prev, stops: prev.stops.filter(s => s._id !== stopId) } : prev);
  }

  async function togglePublic() {
    if (!data) return;
    const updated = await tripsApi.update(id as string, { isPublic: !data.trip.isPublic });
    setData({ ...data, trip: updated });
  }

  function copyPublicLink() {
    const url = `${window.location.origin}/public/trips/${id}`;
    navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  if (loading) return (
    <PageWrapper>
      <div className="space-y-4">
        <div className="h-8 w-64 bg-surface animate-pulse rounded-lg" />
        <div className="h-48 bg-surface animate-pulse rounded-xl" />
      </div>
    </PageWrapper>
  );

  if (!data) return (
    <PageWrapper>
      <div className="text-center py-20">
        <h2 className="font-display text-2xl text-text">Trip not found</h2>
        <Link href="/trips" className="text-primary text-sm mt-2 inline-block hover:underline">← Back to trips</Link>
      </div>
    </PageWrapper>
  );

  const { trip, stops } = data;

  return (
    <PageWrapper>
      <Link href="/trips" className="flex items-center gap-1 text-sm text-text-muted hover:text-primary transition-colors mb-6">
        <ArrowLeft className="w-4 h-4" /> Back to My Trips
      </Link>

      {/* Trip Header */}
      <div className="bg-surface rounded-3xl border border-divider p-8 mb-8 relative overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 relative z-10">
          <div>
            <h1 className="font-display text-4xl text-text mb-2">{trip.title}</h1>
            <div className="flex items-center gap-4 text-sm text-text-muted mb-4">
              <span className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                {new Date(trip.startDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'long' })}
                {' → '}
                {new Date(trip.endDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}
              </span>
            </div>
            {trip.description && <p className="text-text-muted text-sm max-w-xl">{trip.description}</p>}
          </div>

          <div className="flex flex-wrap gap-2">
            <button 
              onClick={togglePublic}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all
                ${trip.isPublic 
                  ? 'bg-green-50 text-green-600 border border-green-200' 
                  : 'bg-surface-2 text-text-muted border border-divider hover:text-text'}`}
            >
              <Globe className="w-4 h-4" />
              {trip.isPublic ? 'Public' : 'Private'}
            </button>
            {trip.isPublic && (
              <button 
                onClick={copyPublicLink}
                className="flex items-center gap-2 px-5 py-2.5 bg-primary text-white rounded-xl text-sm font-semibold hover:bg-primary-hover transition-all"
              >
                {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                {copied ? 'Copied' : 'Share Link'}
              </button>
            )}
          </div>
        </div>

        {/* Quick Tools */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-8 pt-8 border-t border-divider">
          <Link href={`/trips/${id}/itinerary`} className="flex items-center gap-3 p-4 bg-white rounded-2xl border border-divider hover:border-primary/30 transition-all group">
            <LayoutPanelLeft className="w-5 h-5 text-primary group-hover:scale-110 transition-transform" />
            <span className="text-sm font-bold text-text">Itinerary</span>
          </Link>
          <Link href={`/trips/${id}/notes`} className="flex items-center gap-3 p-4 bg-white rounded-2xl border border-divider hover:border-primary/30 transition-all group">
            <FileText className="w-5 h-5 text-orange-500 group-hover:scale-110 transition-transform" />
            <span className="text-sm font-bold text-text">Journal</span>
          </Link>
          <Link href={`/trips/${id}/budget`} className="flex items-center gap-3 p-4 bg-white rounded-2xl border border-divider hover:border-primary/30 transition-all group">
            <Receipt className="w-5 h-5 text-green-500 group-hover:scale-110 transition-transform" />
            <span className="text-sm font-bold text-text">Ledger</span>
          </Link>
          <Link href={`/trips/${id}/checklist`} className="flex items-center gap-3 p-4 bg-white rounded-2xl border border-divider hover:border-primary/30 transition-all group">
            <CheckSquare className="w-5 h-5 text-blue-500 group-hover:scale-110 transition-transform" />
            <span className="text-sm font-bold text-text">Packing</span>
          </Link>
        </div>
      </div>

      {/* Stops Section */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-display text-2xl text-text">Route Details</h2>
        <button onClick={() => setShowAddStop(!showAddStop)}
          className="flex items-center gap-2 text-sm font-bold text-primary hover:underline">
          <PlusCircle className="w-4 h-4" /> Add Destination Stop
        </button>
      </div>

      {showAddStop && (
        <form onSubmit={handleAddStop} className="bg-white rounded-3xl border border-primary/20 p-8 mb-8 shadow-lg animate-fadeIn">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <input type="text" placeholder="City name" value={newStop.cityName}
              onChange={(e) => setNewStop(p => ({ ...p, cityName: e.target.value }))}
              className="px-4 py-3 bg-surface-2 border border-divider rounded-xl text-sm focus:ring-2 focus:ring-primary/20" />
            <input type="text" placeholder="Country" value={newStop.country}
              onChange={(e) => setNewStop(p => ({ ...p, country: e.target.value }))}
              className="px-4 py-3 bg-surface-2 border border-divider rounded-xl text-sm focus:ring-2 focus:ring-primary/20" />
            <input type="date" value={newStop.arrivalDate}
              onChange={(e) => setNewStop(p => ({ ...p, arrivalDate: e.target.value }))}
              className="px-4 py-3 bg-surface-2 border border-divider rounded-xl text-sm focus:ring-2 focus:ring-primary/20" />
            <input type="date" value={newStop.departureDate}
              onChange={(e) => setNewStop(p => ({ ...p, departureDate: e.target.value }))}
              className="px-4 py-3 bg-surface-2 border border-divider rounded-xl text-sm focus:ring-2 focus:ring-primary/20" />
          </div>
          <div className="flex gap-2">
            <button type="submit" className="bg-primary text-white px-8 py-2.5 rounded-xl text-sm font-semibold">Add Stop</button>
            <button type="button" onClick={() => setShowAddStop(false)} className="px-6 py-2.5 text-sm text-text-muted">Cancel</button>
          </div>
        </form>
      )}

      {stops.length === 0 ? (
        <div className="text-center py-20 bg-surface/50 rounded-3xl border border-dashed border-divider">
          <MapPin className="w-12 h-12 text-divider mx-auto mb-4" />
          <p className="text-text-muted">No stops added to this journey yet.</p>
        </div>
      ) : (
        <div className="grid gap-4">
          {stops.map((stop, i) => (
            <div key={stop._id} className="bg-surface rounded-2xl border border-divider p-6 flex items-center gap-6 group hover:border-primary/20 transition-all">
              <div className="w-12 h-12 rounded-full bg-primary/10 text-primary font-bold flex items-center justify-center shrink-0">
                {i + 1}
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-text text-lg">{stop.cityName}, {stop.country}</h3>
                <p className="text-xs text-text-muted uppercase tracking-widest font-bold">
                  {new Date(stop.arrivalDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}
                  {' → '}
                  {new Date(stop.departureDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}
                </p>
              </div>
              <button onClick={() => handleDeleteStop(stop._id)} className="opacity-0 group-hover:opacity-100 p-2 text-text-faint hover:text-red-500 transition-all">
                <Trash2 className="w-5 h-5" />
              </button>
            </div>
          ))}
        </div>
      )}
    </PageWrapper>
  );
}
