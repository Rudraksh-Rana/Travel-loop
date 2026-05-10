'use client';

import { ReactNode } from 'react';
import Sidebar from './Sidebar';
import AuthGuard from './AuthGuard';

export default function PageWrapper({ children }: { children: ReactNode }) {
  return (
    <AuthGuard>
      <div className="min-h-screen bg-bg">
        <Sidebar />
        {/* Mobile bottom nav */}
        <MobileNav />
        {/* Main content area offset by sidebar width */}
        <main className="lg:ml-[240px] min-h-screen">
          <div className="max-w-[1200px] mx-auto px-6 py-8 animate-fadeIn">
            {children}
          </div>
        </main>
      </div>
    </AuthGuard>
  );
}

function MobileNav() {
  return (
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 h-16 bg-surface border-t border-divider flex items-center justify-around z-40">
      {/* Mobile nav implemented via icons — linked to same routes as sidebar */}
      <a href="/dashboard" className="flex flex-col items-center gap-1 text-text-muted text-xs">
        <span className="text-base">🏠</span>
        Home
      </a>
      <a href="/trips" className="flex flex-col items-center gap-1 text-text-muted text-xs">
        <span className="text-base">🗺</span>
        Trips
      </a>
      <a href="/trips/new" className="flex flex-col items-center gap-1 text-primary text-xs font-semibold">
        <span className="text-base">➕</span>
        New
      </a>
      <a href="/search" className="flex flex-col items-center gap-1 text-text-muted text-xs">
        <span className="text-base">🔍</span>
        Search
      </a>
      <a href="/profile" className="flex flex-col items-center gap-1 text-text-muted text-xs">
        <span className="text-base">👤</span>
        Profile
      </a>
    </nav>
  );
}
