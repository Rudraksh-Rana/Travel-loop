'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { tripsApi } from '@/lib/api';
import PageWrapper from '@/components/PageWrapper';
import Link from 'next/link';
import { PlusCircle, MapPin, Calendar, ArrowRight, Clock } from 'lucide-react';

export default function DashboardPage() {
  const { user } = useAuth();
  const [trips, setTrips] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    tripsApi.list()
      .then(setTrips)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const now = new Date();
  const ongoing = trips.filter(t => new Date(t.startDate) <= now && new Date(t.endDate) >= now);
  const upcoming = trips.filter(t => new Date(t.startDate) > now);
  const past = trips.filter(t => new Date(t.endDate) < now);

  return (
    <PageWrapper>
      {/* Welcome Hero */}
      <div className="relative rounded-2xl overflow-hidden bg-gradient-to-r from-primary/10 to-accent-gold/10 p-8 mb-8">
        <h1 className="font-display text-3xl md:text-4xl text-text mb-2">
          Where to next, <span className="text-primary">{user?.name?.split(' ')[0]}</span>?
        </h1>
        <p className="text-text-muted max-w-md">
          Plan a new adventure or continue where you left off.
        </p>
        <Link
          href="/trips/new"
          className="inline-flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-lg font-semibold text-sm
                     hover:bg-primary-hover transition-all mt-4"
        >
          <PlusCircle className="w-4 h-4" />
          Plan a Trip
        </Link>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
        {[
          { label: 'Total Trips', value: trips.length, color: 'text-primary' },
          { label: 'Ongoing', value: ongoing.length, color: 'text-green-600' },
          { label: 'Upcoming', value: upcoming.length, color: 'text-accent-gold' },
          { label: 'Completed', value: past.length, color: 'text-text-muted' },
        ].map((stat) => (
          <div key={stat.label} className="bg-surface rounded-xl border border-divider p-5">
            <p className="text-text-muted text-xs uppercase tracking-wider mb-1">{stat.label}</p>
            <p className={`text-2xl font-bold ${stat.color}`}>{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Trip Sections */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {[1,2,3].map(i => (
            <div key={i} className="bg-surface rounded-xl border border-divider p-5 h-48 animate-pulse" />
          ))}
        </div>
      ) : trips.length === 0 ? (
        <div className="text-center py-20">
          <div className="text-5xl mb-4">🗺️</div>
          <h3 className="font-display text-2xl text-text mb-2">No trips yet</h3>
          <p className="text-text-muted mb-6">Create your first adventure to get started</p>
          <Link
            href="/trips/new"
            className="inline-flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-lg font-semibold text-sm hover:bg-primary-hover transition-all"
          >
            <PlusCircle className="w-4 h-4" />
            Create Trip
          </Link>
        </div>
      ) : (
        <>
          {ongoing.length > 0 && <TripSection title="🟢 Ongoing Trips" trips={ongoing} />}
          {upcoming.length > 0 && <TripSection title="🔜 Upcoming Trips" trips={upcoming} />}
          {past.length > 0 && <TripSection title="✅ Previous Trips" trips={past} />}
        </>
      )}
    </PageWrapper>
  );
}

function TripSection({ title, trips }: { title: string; trips: any[] }) {
  return (
    <div className="mb-10">
      <h2 className="font-display text-xl text-text mb-4">{title}</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {trips.map((trip) => (
          <Link
            key={trip._id}
            href={`/trips/${trip._id}`}
            className="group bg-surface rounded-xl border border-divider overflow-hidden hover:shadow-md hover:-translate-y-0.5 transition-all"
          >
            {/* Cover image */}
            <div className="h-36 bg-surface-2 relative overflow-hidden">
              {trip.coverPhotoUrl ? (
                <img src={trip.coverPhotoUrl} alt={trip.title} className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-4xl opacity-40">🏔️</div>
              )}
            </div>
            <div className="p-5">
              <h3 className="font-display text-lg text-text mb-2 group-hover:text-primary transition-colors">
                {trip.title}
              </h3>
              <div className="flex items-center gap-4 text-xs text-text-muted">
                <span className="flex items-center gap-1">
                  <Calendar className="w-3 h-3" />
                  {new Date(trip.startDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}
                  {' – '}
                  {new Date(trip.endDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                </span>
              </div>
              {trip.description && (
                <p className="text-text-muted text-sm mt-2 line-clamp-2">{trip.description}</p>
              )}
              <div className="flex items-center gap-1 text-primary text-xs font-medium mt-3 group-hover:gap-2 transition-all">
                View Details <ArrowRight className="w-3 h-3" />
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
