'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { tripsApi } from '@/lib/api';
import PageWrapper from '@/components/PageWrapper';
import { MapPin, Calendar, ArrowRight } from 'lucide-react';

export default function NewTripPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    title: '', description: '', startDate: '', endDate: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  function updateField(field: string, value: string) {
    setForm(prev => ({ ...prev, [field]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');

    if (!form.title || !form.startDate || !form.endDate) {
      setError('Title, start date, and end date are required');
      return;
    }

    if (new Date(form.endDate) < new Date(form.startDate)) {
      setError('End date must be after start date');
      return;
    }

    setLoading(true);
    try {
      const trip = await tripsApi.create({
        title: form.title,
        description: form.description || undefined,
        startDate: form.startDate,
        endDate: form.endDate,
      });
      router.push(`/trips/${trip._id}`);
    } catch (err: any) {
      setError(err.message || 'Failed to create trip');
    } finally {
      setLoading(false);
    }
  }

  return (
    <PageWrapper>
      <div className="max-w-[600px] mx-auto">
        <h1 className="font-display text-3xl text-text mb-2">Plan a New Trip</h1>
        <p className="text-text-muted mb-8">Where will your next adventure take you?</p>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 text-sm rounded-lg px-4 py-3 mb-6">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-text mb-1.5">Trip Name</label>
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-faint" />
              <input
                type="text"
                value={form.title}
                onChange={(e) => updateField('title', e.target.value)}
                placeholder="e.g. Rajasthan Heritage Tour"
                className="w-full pl-10 pr-4 py-2.5 bg-surface border border-divider rounded-lg text-text
                           placeholder:text-text-faint focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary
                           transition-all text-sm"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-text mb-1.5">Description <span className="text-text-faint">(optional)</span></label>
            <textarea
              value={form.description}
              onChange={(e) => updateField('description', e.target.value)}
              placeholder="A brief description of your trip..."
              rows={3}
              className="w-full px-4 py-2.5 bg-surface border border-divider rounded-lg text-text
                         placeholder:text-text-faint focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary
                         transition-all text-sm resize-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-text mb-1.5">Start Date</label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-faint" />
                <input
                  type="date"
                  value={form.startDate}
                  onChange={(e) => updateField('startDate', e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 bg-surface border border-divider rounded-lg text-text
                             focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary
                             transition-all text-sm"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-text mb-1.5">End Date</label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-faint" />
                <input
                  type="date"
                  value={form.endDate}
                  onChange={(e) => updateField('endDate', e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 bg-surface border border-divider rounded-lg text-text
                             focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary
                             transition-all text-sm"
                />
              </div>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-primary text-white py-3 rounded-lg font-semibold text-sm hover:bg-primary-hover
                       transition-all disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {loading ? 'Creating...' : (
              <>Save & Continue <ArrowRight className="w-4 h-4" /></>
            )}
          </button>
        </form>
      </div>
    </PageWrapper>
  );
}
