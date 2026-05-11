'use client';

import { ReactNode } from 'react';
import { usePathname } from 'next/navigation';
import Sidebar from './Sidebar';
import AuthGuard from './AuthGuard';
import TopHeader from './TopHeader';
import { LayoutDashboard, Map, Plus, Search, User } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

export default function PageWrapper({ children }: { children: ReactNode }) {
  return (
    <AuthGuard>
      <div className="min-h-screen bg-bg transition-colors duration-500">
        <Sidebar />
        
        {/* Mobile bottom nav */}
        <MobileNav />

        {/* Global Top Header */}
        <TopHeader />

        {/* Main content area offset by sidebar width and top header */}
        <main className="lg:ml-[280px] min-h-screen flex flex-col">
          <div className="flex-1 w-full px-4 sm:px-8 lg:px-12 py-8 animate-fadeIn">
            {children}
          </div>
        </main>
      </div>
    </AuthGuard>
  );
}

const mobileNavItems = [
  { href: '/dashboard', label: 'Home',    icon: LayoutDashboard },
  { href: '/trips',     label: 'Trips',   icon: Map },
  { href: '/search',    label: 'Search',  icon: Search },
  { href: '/profile',   label: 'Profile', icon: User },
];

function MobileNav() {
  const pathname = usePathname();

  return (
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-50 safe-area-bottom">
      {/* Hanging Bottom Pill */}
      <div className="bg-black/95 backdrop-blur-3xl border-t border-white/10 shadow-[0_-20px_40px_rgba(0,0,0,0.5)] flex items-center justify-around h-[72px] px-2 relative">

        {/* Floating New Expedition button - Integrated */}
        <a
          href="/trips/new"
          className={`absolute left-1/2 -translate-x-1/2 -top-6 w-14 h-14 rounded-2xl flex items-center justify-center shadow-2xl transition-all duration-300 active:scale-90 border-4 border-[#0D0C0B]
            ${pathname === '/trips/new'
              ? 'bg-primary shadow-primary/40 scale-110'
              : 'bg-terracotta hover:bg-terracotta-hover shadow-terracotta/40'}`}
        >
          <Plus className="w-6 h-6 text-white" strokeWidth={2.5} />
        </a>

        {/* Left items */}
        {mobileNavItems.slice(0, 2).map(({ href, label, icon: Icon }) => {
          const isActive = pathname === href || (href !== '/dashboard' && pathname.startsWith(href));
          return (
            <a
              key={href}
              href={href}
              className={`flex flex-col items-center gap-1 px-4 py-2 rounded-2xl transition-all duration-200 min-w-[56px]
                ${isActive ? 'text-primary' : 'text-white/30 hover:text-white/70'}`}
            >
              <Icon className={`w-5 h-5 transition-all duration-300 ${isActive ? 'scale-110' : ''}`} />
              <span className={`text-[9px] font-black uppercase tracking-widest transition-all ${isActive ? 'opacity-100' : 'opacity-50'}`}>
                {label}
              </span>
            </a>
          );
        })}

        {/* Center spacer for the floating button */}
        <div className="w-14" />

        {/* Right items */}
        {mobileNavItems.slice(2).map(({ href, label, icon: Icon }) => {
          const isActive = pathname === href || (href !== '/dashboard' && pathname.startsWith(href));
          return (
            <a
              key={href}
              href={href}
              className={`flex flex-col items-center gap-1 px-4 py-2 rounded-2xl transition-all duration-200 min-w-[56px]
                ${isActive ? 'text-primary' : 'text-white/30 hover:text-white/70'}`}
            >
              <Icon className={`w-5 h-5 transition-all duration-300 ${isActive ? 'scale-110' : ''}`} />
              <span className={`text-[9px] font-black uppercase tracking-widest transition-all ${isActive ? 'opacity-100' : 'opacity-50'}`}>
                {label}
              </span>
            </a>
          );
        })}
      </div>
    </nav>
  );
}

