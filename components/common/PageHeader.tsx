'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Bell, ChevronLeft } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useApp } from '@/lib/context/AppContext';

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  showBack?: boolean;
  backHref?: string;
  showNotification?: boolean;
  actions?: React.ReactNode;
  className?: string;
}

export function PageHeader({
  title,
  subtitle,
  showBack = false,
  backHref,
  showNotification = false,
  actions,
  className,
}: PageHeaderProps) {
  const router = useRouter();
  const { state } = useApp();
  const unreadCount = state.notifications.filter(n => !n.isRead).length;

  const handleBack = () => {
    if (backHref) router.push(backHref);
    else router.back();
  };

  return (
    <header className={cn(
      'sticky top-0 z-30 flex items-center gap-3 border-b border-border bg-white/95 px-4 py-3 backdrop-blur-sm lg:px-6',
      className
    )}>
      {showBack && (
        <button
          onClick={handleBack}
          className="flex h-9 w-9 items-center justify-center rounded-full hover:bg-muted transition-colors shrink-0"
        >
          <ChevronLeft size={20} className="text-foreground" />
        </button>
      )}

      <div className="flex-1 min-w-0">
        <h1 className="text-lg font-bold text-foreground font-heading truncate">{title}</h1>
        {subtitle && <p className="text-xs text-muted-foreground truncate">{subtitle}</p>}
      </div>

      <div className="flex items-center gap-2 shrink-0">
        {actions}
        {showNotification && (
          <Link
            href="/notifications"
            className="relative flex h-9 w-9 items-center justify-center rounded-full hover:bg-muted transition-colors"
          >
            <Bell size={20} className="text-foreground" />
            {unreadCount > 0 && (
              <span className="absolute -top-0.5 -right-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-champagne-gold text-[10px] font-bold text-midnight-navy">
                {unreadCount > 9 ? '9+' : unreadCount}
              </span>
            )}
          </Link>
        )}
      </div>
    </header>
  );
}
