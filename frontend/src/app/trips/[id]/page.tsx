'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { tripsApi } from '@/lib/api';
import PageWrapper from '@/components/PageWrapper';
import Link from 'next/link';
import { 
  Calendar, MapPin, PlusCircle, Trash2, ArrowLeft, 
  FileText, Receipt, CheckSquare, Edit, Share2, 
  Globe, Copy, Check, LayoutPanelLeft, Compass, ArrowRight
} from 'lucide-react';
import SafeImage from '@/components/SafeImage';

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
      <div className="animate-fadeIn pb-20">
        <Link href="/trips" className="inline-flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.3em] text-text-faint hover:text-primary transition-all mb-8 group">
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-2 transition-transform" /> Back to Chronicle
        </Link>

        <div className="relative h-[500px] rounded-[48px] overflow-hidden shadow-2xl mb-12 border border-white/10 group">
          <SafeImage 
            src={`https://images.unsplash.com/photo-1524492459416-81446b1f315e?q=80&w=2000&auto=format&fit=crop`} 
            category="hero"
            alt={trip.title} 
            fill
            className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-[4000ms]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />
          
          <div className="absolute bottom-12 left-12 right-12 flex flex-col md:flex-row md:items-end justify-between gap-10">
            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <span className="bg-primary/90 backdrop-blur-xl text-white text-[10px] font-black px-4 py-2 rounded-full uppercase tracking-widest border border-white/20">
                  {trip.stops?.length || 0} Destination Expedition
                </span>
                <span className="bg-black/40 backdrop-blur-xl text-white/80 text-[10px] font-bold px-4 py-2 rounded-full uppercase tracking-widest border border-white/10 flex items-center gap-2">
                  <Calendar className="w-3.5 h-3.5 text-primary" />
                  {new Date(trip.startDate).toLocaleDateString('en-IN', { month: 'short', day: 'numeric' })} — {new Date(trip.endDate).toLocaleDateString('en-IN', { month: 'short', day: 'numeric', year: 'numeric' })}
                </span>
              </div>
              <h1 className="font-display text-7xl text-white tracking-tighter leading-tight drop-shadow-2xl">{trip.title}</h1>
              {trip.description && <p className="text-white/70 text-xl font-light max-w-2xl leading-relaxed italic">{trip.description}</p>}
            </div>

            <div className="flex flex-wrap gap-4">
              <button 
                onClick={togglePublic}
                className={`flex items-center gap-3 px-8 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all backdrop-blur-xl border
                  ${trip.isPublic 
                    ? 'bg-primary/20 text-primary border-primary/30' 
                    : 'bg-white/5 text-white/60 border-white/10 hover:text-white'}`}
              >
                <Globe className="w-4 h-4" />
                {trip.isPublic ? 'Public Record' : 'Private Journal'}
              </button>
              {trip.isPublic && (
                <button 
                  onClick={copyPublicLink}
                  className="flex items-center gap-3 px-8 py-4 bg-terracotta text-white rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-terracotta-hover transition-all shadow-xl shadow-terracotta/30"
                >
                  {copied ? <Check className="w-4 h-4" /> : <Share2 className="w-4 h-4" />}
                  {copied ? 'Link Copied' : 'Share Route'}
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Planning Command Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          <DetailTool 
            href={`/trips/${id}/itinerary`} 
            icon={LayoutPanelLeft} 
            label="Daily Itinerary" 
            sub="Route & Timings" 
            color="text-primary" 
          />
          <DetailTool 
            href={`/trips/${id}/notes`} 
            icon={FileText} 
            label="Travel Journal" 
            sub="Memories & Photos" 
            color="text-orange-500" 
          />
          <DetailTool 
            href={`/trips/${id}/budget`} 
            icon={Receipt} 
            label="Expedition Ledger" 
            sub="Budget Tracking" 
            color="text-primary" 
          />
          <DetailTool 
            href={`/trips/${id}/checklist`} 
            icon={CheckSquare} 
            label="Packing List" 
            sub="Essential Gear" 
            color="text-blue-500" 
          />
        </div>

        {/* Route Details Section */}
        <div className="flex items-center justify-between mb-10">
          <div>
            <h2 className="font-display text-4xl text-text italic">Route Details</h2>
            <p className="text-text-muted text-sm mt-2 font-light tracking-tight">The step-by-step chronicle of your journey.</p>
          </div>
          <button onClick={() => setShowAddStop(!showAddStop)}
            className="flex items-center gap-3 bg-white border border-divider hover:border-primary/50 text-text px-6 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all shadow-sm">
            <PlusCircle className="w-4 h-4 text-primary" /> Add Destination
          </button>
        </div>

        {showAddStop && (
          <form onSubmit={handleAddStop} className="bg-white rounded-[32px] border border-primary/20 p-10 mb-12 shadow-2xl animate-fadeIn relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 blur-3xl" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8 relative z-10">
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-text-faint ml-2">City Name</label>
                <input type="text" placeholder="e.g. Udaipur" value={newStop.cityName}
                  onChange={(e) => setNewStop(p => ({ ...p, cityName: e.target.value }))}
                  className="w-full px-5 py-4 bg-bg border border-divider rounded-2xl text-sm focus:border-primary/50 outline-none transition-all" />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-text-faint ml-2">Country</label>
                <input type="text" placeholder="e.g. India" value={newStop.country}
                  onChange={(e) => setNewStop(p => ({ ...p, country: e.target.value }))}
                  className="w-full px-5 py-4 bg-bg border border-divider rounded-2xl text-sm focus:border-primary/50 outline-none transition-all" />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-text-faint ml-2">Arrival</label>
                <input type="date" value={newStop.arrivalDate}
                  onChange={(e) => setNewStop(p => ({ ...p, arrivalDate: e.target.value }))}
                  className="w-full px-5 py-4 bg-bg border border-divider rounded-2xl text-sm focus:border-primary/50 outline-none transition-all" />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-text-faint ml-2">Departure</label>
                <input type="date" value={newStop.departureDate}
                  onChange={(e) => setNewStop(p => ({ ...p, departureDate: e.target.value }))}
                  className="w-full px-5 py-4 bg-bg border border-divider rounded-2xl text-sm focus:border-primary/50 outline-none transition-all" />
              </div>
            </div>
            <div className="flex gap-4 relative z-10">
              <button type="submit" className="bg-primary text-white px-10 py-4 rounded-xl text-xs font-black uppercase tracking-widest shadow-xl shadow-primary/20 hover:scale-105 active:scale-95 transition-all">Add Stop to Route</button>
              <button type="button" onClick={() => setShowAddStop(false)} className="px-6 py-4 text-xs font-black uppercase tracking-widest text-text-faint hover:text-text transition-all">Cancel</button>
            </div>
          </form>
        )}

        {stops.length === 0 ? (
          <div className="text-center py-32 bg-bg rounded-[48px] border border-dashed border-divider">
            <Compass className="w-20 h-20 text-text-faint mx-auto mb-8 animate-pulse" />
            <h3 className="font-display text-3xl text-text mb-4">No stops added yet</h3>
            <p className="text-text-muted text-lg font-light italic">Your chronicle begins with the first destination.</p>
          </div>
        ) : (
          <div className="space-y-6">
            {stops.map((stop, i) => (
              <div key={stop._id} className="bg-white rounded-[32px] border border-divider p-8 flex flex-col md:flex-row items-center gap-10 group hover:border-primary/40 transition-all shadow-xl hover:shadow-2xl">
                <div className="relative w-full md:w-48 h-32 rounded-2xl overflow-hidden shrink-0 shadow-lg border border-divider">
                  <SafeImage 
                    src={`https://images.unsplash.com/photo-1593693397690-362ae9666ec2?q=80&w=400&auto=format&fit=crop`} 
                    category="city"
                    alt={stop.cityName} 
                    fill
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-[2000ms]"
                  />
                  <div className="absolute top-3 left-3 w-8 h-8 rounded-full bg-white/90 backdrop-blur-md text-primary font-black text-xs flex items-center justify-center border border-divider shadow-sm">
                    {i + 1}
                  </div>
                </div>
                <div className="flex-1 text-center md:text-left space-y-2">
                  <h3 className="font-display text-3xl text-text group-hover:text-primary transition-colors leading-tight">{stop.cityName}, <span className="text-text-muted font-light">{stop.country}</span></h3>
                  <div className="flex items-center justify-center md:justify-start gap-4 text-[10px] font-black uppercase tracking-[0.2em] text-text-faint">
                    <Calendar className="w-3.5 h-3.5 text-primary" />
                    <span>
                      {new Date(stop.arrivalDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}
                      {' — '}
                      {new Date(stop.departureDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <button onClick={() => handleDeleteStop(stop._id)} className="p-4 bg-bg hover:bg-red-50 text-text-faint hover:text-red-500 rounded-2xl transition-all border border-divider hover:border-red-200">
                    <Trash2 className="w-5 h-5" />
                  </button>
                  <Link href={`/trips/${id}/itinerary?stop=${stop._id}`} className="bg-bg hover:bg-primary/5 border border-divider hover:border-primary/30 p-4 rounded-2xl transition-all">
                    <ArrowRight className="w-5 h-5 text-primary" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </PageWrapper>
  );
}

function DetailTool({ href, icon: Icon, label, sub, color }: any) {
  return (
    <Link href={href} className="bg-white rounded-[32px] border border-divider p-8 flex flex-col items-center text-center group hover:border-primary/40 hover:-translate-y-2 transition-all shadow-xl hover:shadow-2xl">
      <div className={`p-5 bg-bg rounded-2xl mb-6 group-hover:scale-110 transition-transform shadow-inner border border-divider ${color}`}>
        <Icon className="w-7 h-7" />
      </div>
      <h4 className="text-sm font-black uppercase tracking-widest text-text mb-2">{label}</h4>
      <p className="text-[10px] font-bold text-text-faint uppercase tracking-[0.2em]">{sub}</p>
    </Link>
  );
}
