'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { tripsApi } from '@/lib/api';
import { Calendar, MapPin, Globe, Clock, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function PublicTripPage() {
  const { id } = useParams();
  const [data, setData] = useState<{ trip: any; stops: any[] } | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (id) {
      tripsApi.getPublic(id as string)
        .then(setData)
        .catch(err => setError(err.message))
        .finally(() => setLoading(false));
    }
  }, [id]);

  if (loading) return (
    <div className="min-h-screen bg-bg flex items-center justify-center">
      <div className="animate-pulse flex flex-col items-center gap-4">
        <div className="w-12 h-12 bg-primary/20 rounded-full" />
        <div className="h-4 w-32 bg-divider rounded-full" />
      </div>
    </div>
  );

  if (error || !data) return (
    <div className="min-h-screen bg-bg flex flex-col items-center justify-center p-4 text-center">
      <h1 className="font-display text-4xl text-text mb-4">Journey Not Found</h1>
      <p className="text-text-muted mb-8 max-w-md">This trip may be private or the link might be incorrect.</p>
      <Link href="/" className="bg-primary text-white px-8 py-3 rounded-full font-semibold">Visit Traveloop</Link>
    </div>
  );

  const { trip, stops } = data;

  return (
    <div className="min-h-screen bg-bg">
      {/* Cinematic Hero */}
      <div className="h-[60vh] relative overflow-hidden">
        {trip.coverPhotoUrl ? (
          <img src={trip.coverPhotoUrl} alt="" className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full bg-surface-2" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-bg via-transparent to-black/20" />
        <div className="absolute bottom-0 left-0 right-0 p-8 md:p-16 max-w-6xl mx-auto">
          <div className="flex items-center gap-2 mb-4">
            <span className="px-3 py-1 bg-primary text-white text-[10px] font-bold uppercase tracking-widest rounded-full">
              Public Itinerary
            </span>
          </div>
          <h1 className="font-display text-5xl md:text-7xl text-text mb-4">{trip.title}</h1>
          <div className="flex flex-wrap gap-6 text-sm font-medium text-text-muted">
            <span className="flex items-center gap-2"><Calendar className="w-4 h-4" /> 
              {new Date(trip.startDate).toLocaleDateString('en-IN', { month: 'long', day: 'numeric' })} – {new Date(trip.endDate).toLocaleDateString('en-IN', { month: 'long', day: 'numeric', year: 'numeric' })}
            </span>
            <span className="flex items-center gap-2"><Globe className="w-4 h-4" /> India</span>
          </div>
        </div>
      </div>

      {/* Itinerary Body */}
      <div className="max-w-4xl mx-auto p-8 md:p-16">
        <div className="mb-16">
          <h2 className="font-display text-3xl text-text mb-4">About this trip</h2>
          <p className="text-text-muted text-lg leading-relaxed">{trip.description || "An extraordinary journey through the heart of India's cultural heritage."}</p>
        </div>

        <div className="relative">
          <div className="absolute left-6 top-0 bottom-0 w-px bg-divider" />
          
          <div className="space-y-16">
            {stops.map((stop, i) => (
              <div key={stop._id} className="relative pl-16">
                <div className="absolute left-4 top-1.5 w-4 h-4 rounded-full bg-primary border-4 border-bg" />
                <div className="mb-6">
                  <span className="text-xs font-bold text-primary uppercase tracking-widest block mb-1">Day {i + 1}</span>
                  <h3 className="font-display text-3xl text-text">{stop.cityName}</h3>
                </div>

                <div className="grid gap-4">
                  {stop.activities?.map((activity: any) => (
                    <div key={activity._id} className="bg-surface rounded-2xl border border-divider p-6 flex items-center gap-6">
                      <div className="w-12 h-12 rounded-xl bg-surface-2 flex items-center justify-center text-2xl">
                        {getActivityIcon(activity.type)}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-1">
                          <h4 className="font-bold text-text">{activity.title}</h4>
                        </div>
                        <div className="flex items-center gap-3 text-xs text-text-muted">
                          <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {activity.duration} mins</span>
                          <span className="uppercase tracking-wider">{activity.type}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                  {(!stop.activities || stop.activities.length === 0) && (
                    <p className="text-text-faint italic text-sm">Exploration of the local city and its hidden gems.</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="mt-24 pt-16 border-t border-divider text-center">
          <p className="text-text-muted mb-6">Plan your own extraordinary journey with Traveloop</p>
          <Link href="/register" className="inline-flex items-center gap-2 bg-primary text-white px-8 py-4 rounded-full font-bold shadow-lg shadow-primary/20 hover:-translate-y-1 transition-all">
            Start Planning Now <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </div>
  );
}

function getActivityIcon(type: string) {
  switch (type.toLowerCase()) {
    case 'sightseeing': return '🏛️';
    case 'transport': return '🚕';
    case 'dining': return '🍽️';
    case 'adventure': return '🧗';
    case 'rest': return '🏨';
    default: return '📍';
  }
}
