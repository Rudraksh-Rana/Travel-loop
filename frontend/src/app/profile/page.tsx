'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { usersApi, tripsApi } from '@/lib/api';
import PageWrapper from '@/components/PageWrapper';
import { 
  User, Mail, MapPin, Phone, Edit3, 
  Save, X, Award, Map, Compass, 
  Settings, Camera, Shield, LogOut
} from 'lucide-react';

export default function ProfilePage() {
  const { user, logout } = useAuth();
  const [editing, setEditing] = useState(false);
  const [trips, setTrips] = useState<any[]>([]);
  const [form, setForm] = useState({ 
    name: user?.name || '', 
    city: '', 
    country: '', 
    phone: '', 
    bio: '' 
  });
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    tripsApi.list().then(setTrips).catch(console.error);
    if (user) {
      setForm({
        name: user.name || '',
        city: (user as any).city || '',
        country: (user as any).country || '',
        phone: (user as any).phone || '',
        bio: (user as any).bio || '',
      });
    }
  }, [user]);

  async function handleSave() {
    if (!user) return;
    setSaving(true);
    try {
      await usersApi.update(user.id, form);
      setEditing(false);
    } catch (e) { 
      console.error(e); 
    } finally {
      setSaving(false);
    }
  }

  const citiesVisited = new Set(trips.flatMap(t => t.stops?.map((s: any) => s.cityName) || [])).size;

  return (
    <PageWrapper>
      <div className="max-w-[1000px] mx-auto">
        <h1 className="font-display text-4xl text-text mb-8">Travel Identity</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column: Stats & Identity Card */}
          <div className="lg:col-span-1 space-y-6">
            {/* Identity Card */}
            <div className="bg-primary rounded-3xl p-8 text-white shadow-xl shadow-primary/20 relative overflow-hidden group">
              <Award className="absolute -right-4 -bottom-4 w-32 h-32 text-white/10 group-hover:rotate-12 transition-transform duration-700" />
              <div className="relative z-10 flex flex-col items-center text-center">
                <div className="w-24 h-24 rounded-full bg-white/20 backdrop-blur-md border-4 border-white/30 flex items-center justify-center text-4xl font-bold mb-4">
                  {user?.name?.charAt(0)?.toUpperCase()}
                </div>
                <h2 className="font-display text-2xl mb-1">{user?.name}</h2>
                <p className="text-white/70 text-sm mb-6 flex items-center gap-1 justify-center">
                  <MapPin className="w-3.5 h-3.5" /> 
                  {form.city ? `${form.city}, ${form.country}` : 'Explorer'}
                </p>
                <div className="w-full pt-6 border-t border-white/10 flex justify-around">
                  <div className="text-center">
                    <p className="text-xl font-bold">{trips.length}</p>
                    <p className="text-[10px] uppercase tracking-widest text-white/60">Trips</p>
                  </div>
                  <div className="text-center">
                    <p className="text-xl font-bold">{citiesVisited}</p>
                    <p className="text-[10px] uppercase tracking-widest text-white/60">Cities</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Links */}
            <div className="bg-surface rounded-3xl border border-divider p-6 space-y-1">
              <button className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-surface-2 transition-colors text-sm font-medium text-text">
                <div className="flex items-center gap-3"><Camera className="w-4 h-4 text-primary" /> Photos</div>
                <div className="bg-divider text-[10px] px-2 py-0.5 rounded-full">Coming soon</div>
              </button>
              <button className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-surface-2 transition-colors text-sm font-medium text-text">
                <div className="flex items-center gap-3"><Shield className="w-4 h-4 text-primary" /> Security</div>
              </button>
              <button onClick={logout} className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-red-50 text-red-600 transition-colors text-sm font-medium">
                <div className="flex items-center gap-3"><LogOut className="w-4 h-4" /> Logout</div>
              </button>
            </div>
          </div>

          {/* Right Column: Profile Details */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-3xl border border-divider p-8 shadow-sm">
              <div className="flex items-center justify-between mb-8">
                <h3 className="font-display text-2xl text-text">Personal Details</h3>
                {!editing ? (
                  <button onClick={() => setEditing(true)} className="flex items-center gap-2 text-sm font-bold text-primary hover:underline">
                    <Edit3 className="w-4 h-4" /> Edit Profile
                  </button>
                ) : (
                  <div className="flex gap-4">
                    <button onClick={handleSave} disabled={saving} className="flex items-center gap-2 text-sm font-bold text-primary hover:underline">
                      <Save className="w-4 h-4" /> {saving ? 'Saving...' : 'Save'}
                    </button>
                    <button onClick={() => setEditing(false)} className="flex items-center gap-2 text-sm font-bold text-text-muted hover:underline">
                      <X className="w-4 h-4" /> Cancel
                    </button>
                  </div>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <ProfileItem 
                  label="Full Name" 
                  value={form.name} 
                  editing={editing} 
                  onChange={(v) => setForm(p => ({ ...p, name: v }))}
                  icon={User}
                />
                <ProfileItem 
                  label="Email Address" 
                  value={user?.email || ''} 
                  editing={false} 
                  icon={Mail}
                />
                <ProfileItem 
                  label="Phone Number" 
                  value={form.phone} 
                  editing={editing} 
                  onChange={(v) => setForm(p => ({ ...p, phone: v }))}
                  icon={Phone}
                  placeholder="+91 00000 00000"
                />
                <ProfileItem 
                  label="City" 
                  value={form.city} 
                  editing={editing} 
                  onChange={(v) => setForm(p => ({ ...p, city: v }))}
                  icon={MapPin}
                  placeholder="Mumbai"
                />
                <div className="md:col-span-2">
                  <ProfileItem 
                    label="Travel Bio" 
                    value={form.bio} 
                    editing={editing} 
                    onChange={(v) => setForm(p => ({ ...p, bio: v }))}
                    icon={Compass}
                    placeholder="Tell us about your travel style..."
                    isTextArea
                  />
                </div>
              </div>
            </div>

            {/* Travel Preferences */}
            <div className="bg-surface rounded-3xl border border-divider p-8">
              <h3 className="font-display text-2xl text-text mb-6">Travel Style</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {['Heritage', 'Adventure', 'Luxury', 'Budget', 'Nature', 'Spiritual', 'Culinary', 'Relaxation'].map(style => (
                  <label key={style} className="flex items-center gap-3 p-4 bg-white rounded-2xl border border-divider cursor-pointer hover:border-primary/30 transition-all group">
                    <input type="checkbox" className="w-4 h-4 accent-[var(--color-primary)]" />
                    <span className="text-sm font-medium text-text group-hover:text-primary transition-colors">{style}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageWrapper>
  );
}

function ProfileItem({ label, value, editing, onChange, icon: Icon, placeholder, isTextArea }: any) {
  return (
    <div>
      <label className="block text-[10px] font-bold text-text-muted uppercase tracking-widest mb-2 flex items-center gap-1.5">
        <Icon className="w-3 h-3 text-primary" /> {label}
      </label>
      {editing ? (
        isTextArea ? (
          <textarea 
            value={value} 
            onChange={e => onChange(e.target.value)}
            placeholder={placeholder}
            rows={3}
            className="w-full px-4 py-3 bg-surface-2 border border-divider rounded-xl text-sm text-text focus:outline-none focus:ring-2 focus:ring-primary/20 resize-none"
          />
        ) : (
          <input 
            type="text" 
            value={value} 
            onChange={e => onChange(e.target.value)}
            placeholder={placeholder}
            className="w-full px-4 py-3 bg-surface-2 border border-divider rounded-xl text-sm text-text focus:outline-none focus:ring-2 focus:ring-primary/20"
          />
        )
      ) : (
        <p className={`text-sm ${value ? 'text-text' : 'text-text-faint italic'} font-medium px-1`}>
          {value || `No ${label.toLowerCase()} added`}
        </p>
      )}
    </div>
  );
}
