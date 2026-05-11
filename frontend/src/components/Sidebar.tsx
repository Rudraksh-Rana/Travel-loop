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
                       max-lg:hidden shadow-[20px_0_40px_rgba(0,0,0,0.5)] animate-fadeIn">
      
      {/* Cinematic Logo Area */}
      <div className="h-32 flex items-center px-10 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-br from-primary via-transparent to-terracotta animate-gradientShift" />
        </div>
        <Link href="/" className="relative z-10 flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center shadow-lg shadow-primary/20 group-hover:scale-110 transition-transform duration-500 animate-pulseGlow">
            <Navigation className="w-5 h-5 text-white fill-white" />
          </div>
          <span className="font-display text-2xl tracking-tighter text-white">
            Travel<span className="text-primary italic">oop</span>
          </span>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 py-10 px-6 space-y-3 overflow-y-auto no-scrollbar">
        <div className="text-[10px] font-black uppercase tracking-[0.4em] text-white/20 px-4 mb-8 flex items-center gap-3 animate-fadeInSlideLeft" style={{ animationDelay: '100ms' }}>
          <div className="w-4 h-[1px] bg-white/10" />
          Command Center
        </div>
        
        <div className="space-y-1">
          {navItems.map((item, idx) => {
            const isActive = pathname === item.href || (item.href !== '/dashboard' && pathname.startsWith(item.href));
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-5 px-6 py-4 rounded-2xl text-[11px] font-black uppercase tracking-[0.2em] transition-all duration-300 relative group animate-fadeInSlideLeft
                  ${isActive
                    ? 'text-white bg-white/10 border border-white/10 shadow-[0_0_20px_rgba(0,136,204,0.15)]'
                    : 'text-white/30 hover:text-white hover:bg-white/5'
                  }`}
                style={{ animationDelay: `${idx * 50 + 200}ms` }}
              >
                {isActive && (
                  <div className="absolute left-0 w-1.5 h-6 bg-primary rounded-r-full shadow-[0_0_15px_rgba(0,136,204,0.8)] animate-pulse" />
                )}
                
                <div className={`relative flex items-center justify-center w-8 h-8 rounded-lg transition-all duration-500
                  ${isActive ? 'bg-primary/20 shadow-lg shadow-primary/10' : 'group-hover:bg-white/5'}`}>
                  <Icon className={`w-5 h-5 transition-all duration-500 ${isActive ? 'text-primary scale-110' : 'text-white/20 group-hover:text-primary group-hover:scale-110'}`} />
                  {isActive && (
                    <div className="absolute inset-0 bg-primary/20 blur-lg rounded-full animate-pulse" />
                  )}
                </div>

                <span className="relative z-10 transition-all duration-300 group-hover:tracking-[0.3em]">
                  {item.label}
                </span>

                {!isActive && (
                  <Sparkles className="w-3 h-3 text-primary opacity-0 group-hover:opacity-100 transition-all duration-500 absolute right-6 group-hover:-translate-y-1" />
                )}
                
                {/* Subtle hover background glow */}
                <div className="absolute inset-0 bg-gradient-to-r from-primary/0 via-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none rounded-2xl" />
              </Link>
            );
          })}
        </div>
      </nav>

      {/* Aesthetic Footer - Minimalist */}
      <div className="p-10 border-t border-white/5 flex flex-col items-center">
        <div className="flex gap-4 mb-4">
          <div className="w-1.5 h-1.5 rounded-full bg-white/10" />
          <div className="w-1.5 h-1.5 rounded-full bg-primary/40 animate-pulse" />
          <div className="w-1.5 h-1.5 rounded-full bg-white/10" />
        </div>
        <p className="text-[8px] font-black uppercase tracking-[0.5em] text-white/10 text-center leading-relaxed">
          Expedition Core <br/> Registry V4.2.1
        </p>
      </div>
    </aside>
  );
}

