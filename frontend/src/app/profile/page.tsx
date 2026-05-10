'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { usersApi, tripsApi } from '@/lib/api';
import PageWrapper from '@/components/PageWrapper';
import { 
  User, Mail, MapPin, Phone, Edit3, 
  Save, X, Award, Map, Compass, 
  Settings, Camera, Shield, LogOut,
  Sparkles, Globe, Heart, History
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
      {/* Cinematic Background */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none rounded-tl-[40px]">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-[0.85] scale-105"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?q=80&w=2000')" }}
        />
        <div className="absolute inset-0 bg-gradient-to-br from-black/95 via-black/40 to-black/90" />
      </div>

      <div className="max-w-[1400px] mx-auto relative z-10 text-white min-h-[calc(100vh-4rem)] pt-8 pb-20">
        
        {/* Header */}
        <header className="mb-16 animate-fadeIn">
          <div className="flex items-center gap-3 text-primary uppercase tracking-[0.4em] text-[10px] font-black mb-4">
            <div className="w-8 h-[2px] bg-primary" />
            Explorer Identity
          </div>
          <h1 className="font-display text-7xl md:text-8xl text-white tracking-tighter leading-[0.8]">
            Travel <span className="text-primary italic">Persona</span>
          </h1>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
          
          {/* Stats & Identity Card */}
          <div className="lg:col-span-1 space-y-8 animate-fadeIn">
            <div className="bg-white/5 backdrop-blur-3xl border border-white/10 rounded-[48px] p-10 relative overflow-hidden group shadow-2xl">
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 blur-[60px] -mr-16 -mt-16" />
              
              <div className="relative z-10 flex flex-col items-center text-center">
                <div className="w-32 h-32 rounded-[40px] bg-primary/20 backdrop-blur-md border-2 border-primary/30 flex items-center justify-center text-5xl font-black text-white mb-6 shadow-xl group-hover:scale-105 transition-transform duration-500">
                  {user?.name?.charAt(0)?.toUpperCase()}
                </div>
                <h2 className="font-display text-4xl text-white italic mb-2">{user?.name}</h2>
                <p className="text-white/40 text-[10px] font-black uppercase tracking-[0.3em] flex items-center gap-2 mb-10">
                  <MapPin className="w-3 h-3 text-primary" /> 
                  {form.city ? `${form.city}, ${form.country}` : 'Global Explorer'}
                </p>
                
                <div className="w-full pt-10 border-t border-white/10 grid grid-cols-2 gap-8">
                  <div className="text-center space-y-2">
                    <p className="text-4xl font-display text-primary italic leading-none">{trips.length}</p>
                    <p className="text-[10px] font-black uppercase tracking-widest text-white/20">Chronicles</p>
                  </div>
                  <div className="text-center space-y-2">
                    <p className="text-4xl font-display text-terracotta italic leading-none">{citiesVisited}</p>
                    <p className="text-[10px] font-black uppercase tracking-widest text-white/20">Mapped Cities</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white/5 backdrop-blur-3xl border border-white/10 rounded-[32px] p-4 space-y-2">
              <ProfileLink icon={Camera} label="Heritage Gallery" sub="Archived moments" />
              <ProfileLink icon={History} label="Expedition Log" sub="Full trip history" />
              <ProfileLink icon={Shield} label="Security Core" sub="Vault settings" />
              <button onClick={logout} className="w-full flex items-center justify-between p-6 rounded-2xl hover:bg-red-500/10 transition-all group">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-red-500/10 flex items-center justify-center border border-red-500/20 group-hover:bg-red-500 group-hover:text-white transition-all">
                    <LogOut className="w-5 h-5" />
                  </div>
                  <div className="text-left">
                    <p className="text-xs font-black uppercase tracking-widest text-red-500">De-authenticate</p>
                    <p className="text-[10px] font-bold text-red-500/40 uppercase tracking-widest mt-1">End active session</p>
                  </div>
                </div>
              </button>
            </div>
          </div>

          {/* Profile Details */}
          <div className="lg:col-span-2 space-y-8 animate-fadeInSlideUp">
            <div className="bg-white/5 backdrop-blur-3xl border border-white/10 rounded-[48px] p-12 shadow-2xl relative overflow-hidden">
              <div className="flex items-center justify-between mb-12">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center border border-white/10">
                    <Edit3 className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="font-display text-4xl text-white italic leading-none">Core Data</h3>
                </div>
                
                {!editing ? (
                  <button onClick={() => setEditing(true)} className="bg-white/10 hover:bg-white/20 text-white px-8 py-4 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all border border-white/10">
                    Modify Profile
                  </button>
                ) : (
                  <div className="flex gap-4">
                    <button onClick={handleSave} disabled={saving} className="bg-primary text-white px-8 py-4 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all shadow-xl shadow-primary/20">
                      {saving ? 'Syncing...' : 'Save Changes'}
                    </button>
                    <button onClick={() => setEditing(false)} className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-white/40 hover:text-white transition-all">
                      Cancel
                    </button>
                  </div>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                <ProfileField 
                  label="Nom de Guerre" 
                  value={form.name} 
                  editing={editing} 
                  onChange={(v) => setForm(p => ({ ...p, name: v }))}
                  icon={User}
                />
                <ProfileField 
                  label="Registry Email" 
                  value={user?.email || ''} 
                  editing={false} 
                  icon={Mail}
                />
                <ProfileField 
                  label="Secure Line" 
                  value={form.phone} 
                  editing={editing} 
                  onChange={(v) => setForm(p => ({ ...p, phone: v }))}
                  icon={Phone}
                  placeholder="+91 00000 00000"
                />
                <ProfileField 
                  label="Home Base" 
                  value={form.city} 
                  editing={editing} 
                  onChange={(v) => setForm(p => ({ ...p, city: v }))}
                  icon={MapPin}
                  placeholder="e.g. Mumbai"
                />
                <div className="md:col-span-2">
                  <ProfileField 
                    label="Explorer's Manifesto" 
                    value={form.bio} 
                    editing={editing} 
                    onChange={(v) => setForm(p => ({ ...p, bio: v }))}
                    icon={Compass}
                    placeholder="Define your journey..."
                    isTextArea
                  />
                </div>
              </div>
            </div>

            {/* Travel Preferences */}
            <div className="bg-white/5 backdrop-blur-3xl border border-white/10 rounded-[48px] p-12 shadow-2xl">
              <div className="flex items-center gap-4 mb-10">
                <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center border border-white/10">
                  <Sparkles className="w-6 h-6 text-terracotta" />
                </div>
                <h3 className="font-display text-4xl text-white italic leading-none">Expedition DNA</h3>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {['Heritage', 'Adventure', 'Luxury', 'Budget', 'Nature', 'Spiritual', 'Culinary', 'Relaxation'].map(style => (
                  <label key={style} className="flex flex-col items-start gap-4 p-6 bg-white/5 rounded-3xl border border-white/10 cursor-pointer hover:border-primary/40 transition-all group relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-16 h-16 bg-primary/5 blur-2xl group-hover:bg-primary/20 transition-all" />
                    <input type="checkbox" className="w-5 h-5 accent-primary bg-white/10 border-white/20 rounded" />
                    <span className="text-xs font-black uppercase tracking-widest text-white/60 group-hover:text-white transition-colors">{style}</span>
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

function ProfileLink({ icon: Icon, label, sub }: any) {
  return (
    <button className="w-full flex items-center justify-between p-6 rounded-2xl hover:bg-white/5 transition-all group">
      <div className="flex items-center gap-4">
        <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center border border-white/10 group-hover:bg-primary group-hover:text-white transition-all">
          <Icon className="w-5 h-5" />
        </div>
        <div className="text-left">
          <p className="text-xs font-black uppercase tracking-widest text-white">{label}</p>
          <p className="text-[10px] font-bold text-white/20 uppercase tracking-widest mt-1">{sub}</p>
        </div>
      </div>
    </button>
  );
}

function ProfileField({ label, value, editing, onChange, icon: Icon, placeholder, isTextArea }: any) {
  return (
    <div className="space-y-3">
      <label className="text-[10px] font-black uppercase tracking-widest text-white/30 ml-2 flex items-center gap-2">
        <Icon className="w-3.5 h-3.5 text-primary" /> {label}
      </label>
      {editing ? (
        isTextArea ? (
          <textarea 
            value={value} 
            onChange={e => onChange(e.target.value)}
            placeholder={placeholder}
            rows={4}
            className="w-full px-6 py-5 bg-white/5 border border-white/10 rounded-2xl text-white placeholder:text-white/20 focus:outline-none focus:border-primary/50 transition-all text-sm font-medium resize-none"
          />
        ) : (
          <input 
            type="text" 
            value={value} 
            onChange={e => onChange(e.target.value)}
            placeholder={placeholder}
            className="w-full px-6 py-5 bg-white/5 border border-white/10 rounded-2xl text-white placeholder:text-white/20 focus:outline-none focus:border-primary/50 transition-all text-sm font-medium"
          />
        )
      ) : (
        <div className="px-6 py-5 bg-white/5 border border-transparent rounded-2xl text-sm font-medium text-white/80">
          {value || <span className="text-white/20 italic">Not defined in registry</span>}
        </div>
      )}
    </div>
  );
}
