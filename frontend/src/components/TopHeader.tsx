'use client';

import { Bell, ChevronDown } from 'lucide-react';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';

export default function TopHeader() {
  const { user } = useAuth();

  return (
    <div className="fixed top-0 right-0 z-50 p-6 sm:p-10 pointer-events-none">
      <div className="flex items-center gap-4 pointer-events-auto animate-fadeInSlideDown">
        {/* Notifications - Hanging Pill */}
        <button className="w-12 h-12 rounded-2xl bg-black/40 backdrop-blur-3xl border border-white/10 flex items-center justify-center text-white/40 hover:text-primary hover:bg-black/60 transition-all group hidden sm:flex shadow-2xl">
          <Bell className="w-5 h-5 group-hover:animate-pulse" />
        </button>

        {/* Profile Section - Hanging Tag Style */}
        <Link 
          href="/profile" 
          className="flex items-center gap-4 bg-black/60 backdrop-blur-3xl border border-white/10 p-2 pl-5 rounded-[24px] rounded-tr-none hover:border-primary/40 hover:bg-black/80 transition-all group shadow-[0_20px_40px_-15px_rgba(0,0,0,0.5)] border-t-0"
        >
          <div className="hidden sm:block text-right">
            <p className="text-[9px] font-black text-white uppercase tracking-[0.2em] leading-none mb-1.5">{user?.name?.split(' ')[0] || 'Explorer'}</p>
            <div className="flex items-center justify-end gap-1.5">
              <div className="w-1 h-1 rounded-full bg-primary animate-pulse" />
              <p className="text-[7px] font-bold text-primary uppercase tracking-widest leading-none">Online</p>
            </div>
          </div>
          <div className="w-11 h-11 rounded-xl bg-primary flex items-center justify-center text-white text-base font-black shadow-lg shadow-primary/20 group-hover:scale-105 transition-transform duration-500 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent" />
            {user?.name?.charAt(0)?.toUpperCase() || '?'}
          </div>
          <ChevronDown className="w-3.5 h-3.5 text-white/20 mr-2 group-hover:text-primary transition-colors" />
        </Link>
      </div>
    </div>
  );
}
