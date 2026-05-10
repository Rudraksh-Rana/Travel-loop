'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import {
  LayoutDashboard, Map, PlusCircle, Search, User, Users, CheckSquare,
  FileText, Receipt, LogOut, Settings, Sparkles, Navigation
} from 'lucide-react';

const navItems = [
  { label: 'Chronicle', href: '/dashboard', icon: LayoutDashboard },
  { label: 'Expeditions', href: '/trips', icon: Map },
  { label: 'New Journey', href: '/trips/new', icon: PlusCircle },
  { label: 'Discovery', href: '/search', icon: Search },
  { label: 'Circle', href: '/community', icon: Users },
  { label: 'Identity', href: '/profile', icon: User },
];

export default function Sidebar() {
  const pathname = usePathname();
  const { user, logout } = useAuth();

  return (
    <aside className="fixed left-0 top-0 h-screen w-[280px] bg-black/95 border-r border-white/5 flex flex-col z-50
                       max-lg:hidden shadow-[20px_0_40px_rgba(0,0,0,0.5)]">
      
      {/* Cinematic Logo Area */}
      <div className="h-32 flex items-center px-10 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-br from-primary via-transparent to-terracotta" />
        </div>
        <Link href="/" className="relative z-10 flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center shadow-lg shadow-primary/20">
            <Navigation className="w-4 h-4 text-white fill-white" />
          </div>
          <span className="font-display text-2xl tracking-tighter text-white">
            Travel<span className="text-primary italic">oop</span>
          </span>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 py-10 px-6 space-y-3 overflow-y-auto custom-scrollbar">
        <div className="text-[10px] font-black uppercase tracking-[0.4em] text-white/20 px-4 mb-8 flex items-center gap-3">
          <div className="w-4 h-[1px] bg-white/10" />
          Command
        </div>
        {navItems.map((item) => {
          const isActive = pathname === item.href || (item.href !== '/dashboard' && pathname.startsWith(item.href));
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-5 px-6 py-4 rounded-2xl text-[11px] font-black uppercase tracking-[0.2em] transition-all relative group
                ${isActive
                  ? 'text-white bg-white/10 border border-white/10 shadow-2xl'
                  : 'text-white/30 hover:text-white hover:bg-white/5'
                }`}
            >
              {isActive && (
                <div className="absolute left-0 w-1.5 h-6 bg-primary rounded-r-full shadow-[0_0_15px_rgba(var(--color-primary-rgb),0.8)]" />
              )}
              <Icon className={`w-5 h-5 transition-all duration-500 ${isActive ? 'text-primary' : 'text-white/20 group-hover:text-primary group-hover:scale-110'}`} />
              {item.label}
              {!isActive && (
                <Sparkles className="w-3 h-3 text-primary opacity-0 group-hover:opacity-100 transition-opacity absolute right-6" />
              )}
            </Link>
          );
        })}
      </nav>

      {/* User Identity Section */}
      <div className="p-8 border-t border-white/5 bg-black/50 backdrop-blur-3xl">
        <div className="bg-white/5 rounded-[32px] p-6 border border-white/5 group hover:border-primary/30 transition-all duration-500 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-24 h-24 bg-primary/5 blur-2xl group-hover:bg-primary/10 transition-all" />
          
          <div className="flex items-center gap-5 mb-6">
            <div className="w-12 h-12 rounded-2xl bg-white/10 border border-white/10 flex items-center justify-center text-white text-lg font-black shadow-xl group-hover:scale-105 group-hover:border-primary/40 transition-all duration-500">
              {user?.name?.charAt(0)?.toUpperCase() || '?'}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-black text-white truncate tracking-widest">{user?.name || 'Explorer'}</p>
              <p className="text-[9px] font-bold text-white/20 uppercase tracking-[0.2em] truncate mt-1">Identity Verified</p>
            </div>
          </div>
          
          <button
            onClick={logout}
            className="flex items-center justify-center gap-3 text-[10px] font-black uppercase tracking-[0.3em] text-white/20 hover:text-red-500 transition-all w-full pt-5 border-t border-white/5 group/logout"
          >
            <LogOut className="w-4 h-4 group-hover/logout:-translate-x-1 transition-transform" />
            De-auth
          </button>
        </div>
      </div>
    </aside>
  );
}
