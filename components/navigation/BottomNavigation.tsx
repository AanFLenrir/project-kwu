'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, ListChecks, Newspaper, TrendingUp, User } from 'lucide-react';
import { cn } from '@/lib/utils';

const navItems = [
  { href: '/dashboard', label: 'Beranda', icon: Home },
  { href: '/priority', label: 'Prioritas', icon: ListChecks },
  { href: '/information', label: 'Informasi', icon: Newspaper },
  { href: '/progress', label: 'Progres', icon: TrendingUp },
  { href: '/profile', label: 'Profil', icon: User },
];

export function BottomNavigation() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 border-t border-border bg-white pb-safe lg:hidden">
      <div className="flex items-center justify-around px-2 pt-2 pb-1">
        {navItems.map(({ href, label, icon: Icon }) => {
          const active = pathname === href || pathname.startsWith(href + '/');
          return (
            <Link
              key={href}
              href={href}
              className={cn(
                'flex flex-col items-center gap-0.5 rounded-xl px-3 py-1.5 text-xs font-medium transition-all duration-200',
                active
                  ? 'text-royal-indigo'
                  : 'text-muted-foreground hover:text-foreground'
              )}
            >
              <span className={cn(
                'flex h-7 w-7 items-center justify-center rounded-full transition-all duration-200',
                active ? 'bg-soft-indigo' : ''
              )}>
                <Icon
                  size={18}
                  strokeWidth={active ? 2.5 : 1.75}
                  className={cn(active ? 'text-royal-indigo' : 'text-muted-foreground')}
                />
              </span>
              <span className={cn(active ? 'text-royal-indigo font-semibold' : '')}>{label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
