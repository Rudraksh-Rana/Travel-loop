'use client';

import { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { User, Mail, Lock, Phone, MapPin, Globe } from 'lucide-react';

export default function RegisterPage() {
  const { register, isAuthenticated } = useAuth();
  const router = useRouter();
  const [form, setForm] = useState({
    name: '', email: '', password: '', confirmPassword: '',
    phone: '', city: '', country: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  if (isAuthenticated) {
    router.push('/dashboard');
    return null;
  }

  function updateField(field: string, value: string) {
    setForm(prev => ({ ...prev, [field]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');

    if (!form.name || !form.email || !form.password) {
      setError('Name, email, and password are required');
      return;
    }
    if (form.password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }
    if (form.password !== form.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    setLoading(true);
    try {
      await register({
        name: form.name,
        email: form.email,
        password: form.password,
        phone: form.phone || undefined,
        city: form.city || undefined,
        country: form.country || undefined,
      });
      router.push('/dashboard');
    } catch (err: any) {
      setError(err.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-bg flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-[480px] animate-fadeIn">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-3">
            <span className="text-primary text-2xl">✈</span>
            <h1 className="font-display text-3xl text-text">Traveloop</h1>
          </div>
          <p className="text-text-muted text-sm italic">Start your journey</p>
        </div>

        {/* Card */}
        <div className="bg-surface rounded-2xl border border-divider p-8 shadow-md">
          <h2 className="font-display text-2xl text-text mb-1">Create Account</h2>
          <p className="text-text-muted text-sm mb-6">Join thousands of travellers</p>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 text-sm rounded-lg px-4 py-3 mb-4">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Name */}
            <div>
              <label className="block text-sm font-medium text-text mb-1.5">Full Name</label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-faint" />
                <input
                  type="text"
                  value={form.name}
                  onChange={(e) => updateField('name', e.target.value)}
                  placeholder="Your full name"
                  className="w-full pl-10 pr-4 py-2.5 bg-surface-2 border border-divider rounded-lg text-text
                             placeholder:text-text-faint focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary
                             transition-all text-sm"
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-text mb-1.5">Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-faint" />
                <input
                  type="email"
                  value={form.email}
                  onChange={(e) => updateField('email', e.target.value)}
                  placeholder="you@example.com"
                  className="w-full pl-10 pr-4 py-2.5 bg-surface-2 border border-divider rounded-lg text-text
                             placeholder:text-text-faint focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary
                             transition-all text-sm"
                />
              </div>
            </div>

            {/* Password row */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-sm font-medium text-text mb-1.5">Password</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-faint" />
                  <input
                    type="password"
                    value={form.password}
                    onChange={(e) => updateField('password', e.target.value)}
                    placeholder="••••••••"
                    className="w-full pl-10 pr-4 py-2.5 bg-surface-2 border border-divider rounded-lg text-text
                               placeholder:text-text-faint focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary
                               transition-all text-sm"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-text mb-1.5">Confirm</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-faint" />
                  <input
                    type="password"
                    value={form.confirmPassword}
                    onChange={(e) => updateField('confirmPassword', e.target.value)}
                    placeholder="••••••••"
                    className="w-full pl-10 pr-4 py-2.5 bg-surface-2 border border-divider rounded-lg text-text
                               placeholder:text-text-faint focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary
                               transition-all text-sm"
                  />
                </div>
              </div>
            </div>

            {/* Phone */}
            <div>
              <label className="block text-sm font-medium text-text mb-1.5">Phone <span className="text-text-faint">(optional)</span></label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-faint" />
                <input
                  type="tel"
                  value={form.phone}
                  onChange={(e) => updateField('phone', e.target.value)}
                  placeholder="+91 98765 43210"
                  className="w-full pl-10 pr-4 py-2.5 bg-surface-2 border border-divider rounded-lg text-text
                             placeholder:text-text-faint focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary
                             transition-all text-sm"
                />
              </div>
            </div>

            {/* City & Country */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-sm font-medium text-text mb-1.5">City <span className="text-text-faint">(optional)</span></label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-faint" />
                  <input
                    type="text"
                    value={form.city}
                    onChange={(e) => updateField('city', e.target.value)}
                    placeholder="Mumbai"
                    className="w-full pl-10 pr-4 py-2.5 bg-surface-2 border border-divider rounded-lg text-text
                               placeholder:text-text-faint focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary
                               transition-all text-sm"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-text mb-1.5">Country <span className="text-text-faint">(optional)</span></label>
                <div className="relative">
                  <Globe className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-faint" />
                  <input
                    type="text"
                    value={form.country}
                    onChange={(e) => updateField('country', e.target.value)}
                    placeholder="India"
                    className="w-full pl-10 pr-4 py-2.5 bg-surface-2 border border-divider rounded-lg text-text
                               placeholder:text-text-faint focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary
                               transition-all text-sm"
                  />
                </div>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-primary text-white py-3 rounded-lg font-semibold text-sm hover:bg-primary-hover
                         transition-all disabled:opacity-60 disabled:cursor-not-allowed mt-2"
            >
              {loading ? 'Creating account...' : 'Create Account'}
            </button>
          </form>
        </div>

        <p className="text-center text-sm text-text-muted mt-6">
          Already have an account?{' '}
          <Link href="/login" className="text-primary font-medium hover:underline">
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
}
