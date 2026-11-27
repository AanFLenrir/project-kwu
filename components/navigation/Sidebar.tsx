'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, ListChecks, Newspaper, TrendingUp, User, Sparkles, Bell, Settings, HelpCircle, LogOut, CreditCard } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useApp } from '@/lib/context/AppContext';

const mainNav = [
  { href: '/dashboard', label: 'Beranda', icon: Home },
  { href: '/priority', label: 'Prioritas', icon: ListChecks },
  { href: '/information', label: 'Informasi', icon: Newspaper },
  { href: '/progress', label: 'Progres', icon: TrendingUp },
  { href: '/pricing', label: 'Paket & Keuangan', icon: CreditCard },
  { href: '/profile', label: 'Profil', icon: User },
];

const secondaryNav = [
  { href: '/notifications', label: 'Notifikasi', icon: Bell },
  { href: '/settings', label: 'Pengaturan', icon: Settings },
  { href: '/help', label: 'Bantuan', icon: HelpCircle },
];

export function Sidebar() {
  const pathname = usePathname();
  const { state } = useApp();
  const unreadCount = state.notifications.filter(n => !n.isRead).length;

  return (
    <aside className="hidden lg:flex fixed left-0 top-0 h-full w-64 flex-col z-40"
      style={{ background: 'linear-gradient(180deg, #171747 0%, #211B70 100%)' }}>
      {/* Logo */}
      <div className="flex items-center gap-3 px-6 py-6 border-b border-white/10">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/15 backdrop-blur-sm">
          <Sparkles size={22} className="text-champagne-gold" />
        </div>
        <div>
          <h1 className="text-xl font-bold text-white tracking-tight font-heading">KAIROS</h1>
          <p className="text-xs text-white/50">Right Priority. Right Moment.</p>
        </div>
      </div>

      {/* Main Navigation */}
      <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-1">
        <p className="px-3 text-xs font-semibold uppercase tracking-widest text-white/30 mb-2">Menu Utama</p>
        {mainNav.map(({ href, label, icon: Icon }) => {
          const active = pathname === href || pathname.startsWith(href + '/');
          return (
            <Link
              key={href}
              href={href}
              className={cn(
                'flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-200',
                active
                  ? 'bg-royal-indigo text-white shadow-lg shadow-royal-indigo/30'
                  : 'text-white/70 hover:bg-white/10 hover:text-white'
              )}
            >
              <Icon size={18} strokeWidth={active ? 2.5 : 1.75} />
              {label}
            </Link>
          );
        })}

        <div className="pt-4">
          <p className="px-3 text-xs font-semibold uppercase tracking-widest text-white/30 mb-2">Lainnya</p>
          {secondaryNav.map(({ href, label, icon: Icon }) => {
            const active = pathname === href || pathname.startsWith(href + '/');
            return (
              <Link
                key={href}
                href={href}
                className={cn(
                  'flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-200 relative',
                  active
                    ? 'bg-royal-indigo text-white'
                    : 'text-white/70 hover:bg-white/10 hover:text-white'
                )}
              >
                <Icon size={18} strokeWidth={1.75} />
                {label}
                {href === '/notifications' && unreadCount > 0 && (
                  <span className="ml-auto flex h-5 min-w-5 items-center justify-center rounded-full bg-champagne-gold px-1.5 text-xs font-bold text-midnight-navy">
                    {unreadCount}
                  </span>
                )}
              </Link>
            );
          })}
        </div>
      </nav>

      {/* User Profile & Subscription Status */}
      <div className="border-t border-white/10 p-4 space-y-2">
        <Link href="/profile" className="flex items-center gap-3 rounded-xl p-2 hover:bg-white/10 transition-all duration-200">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-champagne-gold to-warm-gold text-midnight-navy font-bold text-sm">
            {state.user.name.charAt(0).toUpperCase()}
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-sm font-semibold text-white truncate">{state.user.name}</p>
            <p className="text-xs text-white/50 truncate">Semester {state.user.semester} · {state.user.program.split(' ')[1]}</p>
          </div>
        </Link>

        {/* Subscription Plan Badge */}
        <Link
          href="/pricing"
          className="flex items-center justify-between rounded-xl px-3 py-2 text-xs font-medium bg-white/10 text-champagne-gold hover:bg-white/15 transition-all"
        >
          <div className="flex items-center gap-2 truncate">
            <CreditCard size={14} className="shrink-0" />
            <span className="truncate">{state.subscription.planName}</span>
          </div>
          <span className="text-[10px] uppercase font-bold text-white/60 bg-white/10 px-1.5 py-0.5 rounded shrink-0">
            Kelola
          </span>
        </Link>

        <Link
          href="/logout"
          className="flex items-center gap-3 rounded-xl px-3 py-1.5 text-xs text-white/50 hover:bg-white/10 hover:text-white transition-all duration-200"
        >
          <LogOut size={14} />
          Keluar
        </Link>
      </div>
    </aside>
  );
}
