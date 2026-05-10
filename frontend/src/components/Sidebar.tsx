'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import {
  LayoutDashboard, Map, PlusCircle, Search, User, Users, CheckSquare,
  FileText, Receipt, LogOut, Settings
} from 'lucide-react';

const navItems = [
  { label: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  { label: 'My Trips', href: '/trips', icon: Map },
  { label: 'New Trip', href: '/trips/new', icon: PlusCircle },
  { label: 'Search', href: '/search', icon: Search },
  { label: 'Community', href: '/community', icon: Users },
  { label: 'Profile', href: '/profile', icon: User },
];

export default function Sidebar() {
  const pathname = usePathname();
  const { user, logout } = useAuth();

  return (
    <aside className="fixed left-0 top-0 h-screen w-[240px] bg-surface border-r border-divider flex flex-col z-40
                       max-lg:hidden">
      {/* Logo */}
      <div className="h-16 flex items-center px-6 border-b border-divider">
        <Link href="/dashboard" className="flex items-center gap-2">
          <span className="text-primary text-lg">✈</span>
          <span className="font-display text-xl text-text tracking-tight">Traveloop</span>
        </Link>
      </div>

      {/* Nav Links */}
      <nav className="flex-1 py-4 px-3 space-y-1 overflow-y-auto">
        {navItems.map((item) => {
          const isActive = pathname === item.href || pathname.startsWith(item.href + '/');
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all
                ${isActive
                  ? 'bg-primary/10 text-primary'
                  : 'text-text-muted hover:bg-surface-2 hover:text-text'
                }`}
            >
              <Icon className="w-[18px] h-[18px]" />
              {item.label}
            </Link>
          );
        })}
      </nav>

      {/* User & Logout */}
      <div className="p-4 border-t border-divider">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary text-xs font-semibold">
            {user?.name?.charAt(0)?.toUpperCase() || '?'}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-text truncate">{user?.name || 'User'}</p>
            <p className="text-xs text-text-faint truncate">{user?.email}</p>
          </div>
        </div>
        <button
          onClick={logout}
          className="flex items-center gap-2 text-sm text-text-muted hover:text-primary transition-colors w-full px-1"
        >
          <LogOut className="w-4 h-4" />
          Sign out
        </button>
      </div>
    </aside>
  );
}
