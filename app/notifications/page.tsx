'use client';

import Link from 'next/link';
import { Bell, CheckCheck, Clock, Newspaper, Briefcase, Award, ChevronRight } from 'lucide-react';
import { AppShell } from '@/components/layouts/AppShell';
import { PageHeader } from '@/components/common/PageHeader';
import { EmptyState } from '@/components/common/States';
import { useApp } from '@/lib/context/AppContext';
import { formatRelativeTime } from '@/lib/utils';

export default function NotificationsPage() {
  const { state, markNotificationRead, markAllNotificationsRead } = useApp();
  const { notifications } = state;

  const getIcon = (type: string) => {
    switch (type) {
      case 'reminder':
      case 'task':
        return <Clock size={16} className="text-red-500" />;
      case 'info':
        return <Newspaper size={16} className="text-royal-indigo" />;
      case 'achievement':
        return <Award size={16} className="text-amber-500" />;
      default:
        return <Bell size={16} className="text-royal-indigo" />;
    }
  };

  return (
    <AppShell>
      <div className="min-h-screen bg-light-bg">
        <PageHeader
          title="Pusat Notifikasi"
          subtitle="Pemberitahuan tenggat waktu, info, dan pencapaian"
          showBack
          backHref="/dashboard"
          actions={
            notifications.some(n => !n.isRead) ? (
              <button
                onClick={markAllNotificationsRead}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-border bg-white text-xs font-semibold text-royal-indigo hover:bg-soft-indigo/50 transition-colors"
              >
                <CheckCheck size={14} /> Tandai Semua Dibaca
              </button>
            ) : null
          }
        />

        <div className="px-4 py-6 lg:px-8 max-w-4xl space-y-4">
          {notifications.length === 0 ? (
            <EmptyState
              icon={Bell}
              title="Belum Ada Notifikasi"
              description="Semua pemberitahuan deadline dan informasi akan muncul di sini."
            />
          ) : (
            <div className="bg-white rounded-3xl border border-border shadow-xs overflow-hidden divide-y divide-border">
              {notifications.map(notif => {
                const isUnread = !notif.isRead;
                return (
                  <div
                    key={notif.id}
                    onClick={() => markNotificationRead(notif.id)}
                    className={`p-4 sm:p-5 flex items-start gap-3.5 transition-colors cursor-pointer ${
                      isUnread ? 'bg-soft-indigo/25' : 'hover:bg-light-bg/40'
                    }`}
                  >
                    <div className="p-2.5 rounded-2xl bg-white border border-border shadow-2xs shrink-0 mt-0.5">
                      {getIcon(notif.type)}
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2 mb-1">
                        <h3 className={`text-sm ${isUnread ? 'font-bold text-midnight-navy' : 'font-semibold text-foreground'}`}>
                          {notif.title}
                        </h3>
                        <span className="text-[11px] text-muted-foreground shrink-0">
                          {formatRelativeTime(notif.createdAt)}
                        </span>
                      </div>

                      <p className="text-xs text-muted-foreground leading-relaxed">
                        {notif.message}
                      </p>

                      {notif.link && (
                        <Link
                          href={notif.link}
                          className="mt-2.5 inline-flex items-center gap-1 text-xs font-bold text-royal-indigo hover:gap-1.5 transition-all"
                        >
                          Lihat Rincian <ChevronRight size={13} />
                        </Link>
                      )}
                    </div>

                    {isUnread && (
                      <span className="w-2.5 h-2.5 rounded-full bg-royal-indigo shrink-0 mt-1.5" />
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </AppShell>
  );
}
