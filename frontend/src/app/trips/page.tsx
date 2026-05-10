'use client';

import { useState, useEffect } from 'react';
import { tripsApi } from '@/lib/api';
import PageWrapper from '@/components/PageWrapper';
import Link from 'next/link';
import { Search, Calendar, ArrowRight, Trash2, PlusCircle } from 'lucide-react';

export default function TripsListPage() {
  const [trips, setTrips] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  useEffect(() => {
    tripsApi.list()
      .then(setTrips)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const now = new Date();
  const filtered = trips.filter(t =>
    t.title.toLowerCase().includes(search.toLowerCase())
  );

  const categorize = (list: any[]) => ({
    ongoing: list.filter(t => new Date(t.startDate) <= now && new Date(t.endDate) >= now),
    upcoming: list.filter(t => new Date(t.startDate) > now),
    completed: list.filter(t => new Date(t.endDate) < now),
  });

  const { ongoing, upcoming, completed } = categorize(filtered);

  async function handleDelete(id: string) {
    if (!confirm('Delete this trip? This cannot be undone.')) return;
    await tripsApi.delete(id);
    setTrips(prev => prev.filter(t => t._id !== id));
  }

  function statusBadge(trip: any) {
    const start = new Date(trip.startDate);
    const end = new Date(trip.endDate);
    if (start <= now && end >= now) return <span className="px-2 py-0.5 text-[10px] font-semibold rounded-full bg-green-100 text-green-700 uppercase">Ongoing</span>;
    if (start > now) return <span className="px-2 py-0.5 text-[10px] font-semibold rounded-full bg-amber-100 text-amber-700 uppercase">Upcoming</span>;
    return <span className="px-2 py-0.5 text-[10px] font-semibold rounded-full bg-gray-100 text-gray-500 uppercase">Completed</span>;
  }

  return (
    <PageWrapper>
      <div className="flex items-center justify-between mb-6">
        <h1 className="font-display text-3xl text-text">My Trips</h1>
        <Link
          href="/trips/new"
          className="flex items-center gap-2 bg-primary text-white px-5 py-2.5 rounded-lg text-sm font-semibold hover:bg-primary-hover transition-all"
        >
          <PlusCircle className="w-4 h-4" /> New Trip
        </Link>
      </div>

      {/* Search */}
      <div className="relative mb-8">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-faint" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search trips..."
          className="w-full pl-10 pr-4 py-2.5 bg-surface border border-divider rounded-lg text-text
                     placeholder:text-text-faint focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary
                     transition-all text-sm"
        />
      </div>

      {loading ? (
        <div className="space-y-4">
          {[1,2,3].map(i => (
            <div key={i} className="bg-surface rounded-xl border border-divider p-5 h-24 animate-pulse" />
          ))}
        </div>
      ) : filtered.length === 0 ? (
        <div className="text-center py-20">
          <div className="text-5xl mb-4">📭</div>
          <h3 className="font-display text-2xl text-text mb-2">
            {search ? 'No matching trips' : 'No trips yet'}
          </h3>
          <p className="text-text-muted">
            {search ? 'Try a different search term' : 'Create your first trip to get started'}
          </p>
        </div>
      ) : (
        <>
          {ongoing.length > 0 && <TripGroup title="Ongoing" trips={ongoing} badge={statusBadge} onDelete={handleDelete} />}
          {upcoming.length > 0 && <TripGroup title="Upcoming" trips={upcoming} badge={statusBadge} onDelete={handleDelete} />}
          {completed.length > 0 && <TripGroup title="Completed" trips={completed} badge={statusBadge} onDelete={handleDelete} />}
        </>
      )}
    </PageWrapper>
  );
}

function TripGroup({ title, trips, badge, onDelete }: {
  title: string; trips: any[]; badge: (t: any) => React.ReactNode; onDelete: (id: string) => void;
}) {
  return (
    <div className="mb-8">
      <h2 className="text-sm font-semibold text-text-muted uppercase tracking-wider mb-3">{title}</h2>
      <div className="space-y-3">
        {trips.map((trip) => (
          <div key={trip._id} className="bg-surface rounded-xl border border-divider p-5 flex items-center gap-5 group hover:shadow-sm transition-all">
            {/* Cover */}
            <div className="w-16 h-16 rounded-lg bg-surface-2 overflow-hidden shrink-0">
              {trip.coverPhotoUrl ? (
                <img src={trip.coverPhotoUrl} alt="" className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-2xl opacity-30">🏔️</div>
              )}
            </div>

            {/* Info */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <h3 className="font-medium text-text truncate">{trip.title}</h3>
                {badge(trip)}
              </div>
              <div className="flex items-center gap-1 text-xs text-text-muted">
                <Calendar className="w-3 h-3" />
                {new Date(trip.startDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}
                {' – '}
                {new Date(trip.endDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2 shrink-0">
              <Link
                href={`/trips/${trip._id}`}
                className="px-4 py-2 text-sm font-medium text-primary border border-primary rounded-lg hover:bg-primary hover:text-white transition-all"
              >
                View
              </Link>
              <button
                onClick={() => onDelete(trip._id)}
                className="p-2 text-text-faint hover:text-red-500 transition-colors"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
