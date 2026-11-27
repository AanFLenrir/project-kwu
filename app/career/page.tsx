'use client';

import { useState } from 'react';
import Link from 'next/link';
import { MapPin, Clock, ChevronRight, Briefcase, Wifi } from 'lucide-react';
import { AppShell } from '@/components/layouts/AppShell';
import { PageHeader } from '@/components/common/PageHeader';
import { EmptyState } from '@/components/common/States';
import { useApp } from '@/lib/context/AppContext';
import { getDaysUntilDeadline, cn } from '@/lib/utils';

type JobType = 'all' | 'internship' | 'full-time' | 'part-time';

const typeConfig: Record<string, { label: string; color: string; bg: string }> = {
  internship: { label: 'Magang', color: '#302A91', bg: '#EAE9FA' },
  'full-time': { label: 'Full-time', color: '#22c55e', bg: '#f0fdf4' },
  'part-time': { label: 'Part-time', color: '#3b82f6', bg: '#eff6ff' },
  freelance: { label: 'Freelance', color: '#f59e0b', bg: '#fffbeb' },
  contract: { label: 'Kontrak', color: '#8b5cf6', bg: '#f5f3ff' },
};

export default function CareerPage() {
  const { state } = useApp();
  const [filter, setFilter] = useState<JobType>('all');

  const filtered = state.careers.filter(c => filter === 'all' || c.type === filter);

  return (
    <AppShell>
      <div className="min-h-screen bg-light-bg">
        <PageHeader
          title="Peluang Karier"
          subtitle="Lowongan magang & kerja terpilih"
          showBack
          backHref="/information"
          showNotification
        />

        <div className="px-4 py-4 lg:px-6 space-y-4">
          {/* Filter */}
          <div className="flex gap-2 overflow-x-auto pb-1 no-scrollbar">
            {(['all', 'internship', 'full-time', 'part-time'] as JobType[]).map(type => (
              <button
                key={type}
                onClick={() => setFilter(type)}
                className={cn(
                  'shrink-0 rounded-full px-3.5 py-1.5 text-xs font-medium transition-all',
                  filter === type
                    ? 'bg-royal-indigo text-white'
                    : 'bg-white text-muted-foreground border border-border hover:border-royal-indigo/50'
                )}
              >
                {type === 'all' ? 'Semua' : typeConfig[type]?.label ?? type}
              </button>
            ))}
          </div>

          {/* Count */}
          <p className="text-xs text-muted-foreground">
            <strong className="text-foreground">{filtered.length}</strong> peluang tersedia
          </p>

          {/* Career List */}
          {filtered.length === 0 ? (
            <EmptyState icon={Briefcase} title="Tidak ada lowongan" description="Coba ubah filter" />
          ) : (
            <div className="space-y-3">
              {filtered.map(career => {
                const days = getDaysUntilDeadline(career.deadline);
                const isUrgent = days <= 7;
                const type = typeConfig[career.type];
                return (
                  <Link key={career.id} href={`/career/${career.id}`}
                    className="block rounded-2xl bg-white shadow-sm hover:shadow-md transition-all duration-200 hover:-translate-y-0.5 overflow-hidden">
                    <div className="p-4">
                      <div className="flex items-start gap-3">
                        {/* Company Logo */}
                        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl"
                          style={{ background: 'linear-gradient(135deg, #171747, #302A91)' }}>
                          <span className="text-sm font-bold text-white">{career.company.slice(0, 2).toUpperCase()}</span>
                        </div>

                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-2">
                            <div>
                              <h3 className="text-sm font-bold text-foreground leading-tight">{career.position}</h3>
                              <p className="text-xs text-muted-foreground mt-0.5">{career.company}</p>
                            </div>
                            <ChevronRight size={16} className="text-muted-foreground shrink-0 mt-1" />
                          </div>

                          <div className="flex flex-wrap gap-2 mt-2">
                            {type && (
                              <span className="rounded-full px-2 py-0.5 text-xs font-medium"
                                style={{ background: type.bg, color: type.color }}>
                                {type.label}
                              </span>
                            )}
                            {career.isRemote && (
                              <span className="flex items-center gap-1 rounded-full bg-green-50 px-2 py-0.5 text-xs font-medium text-green-600">
                                <Wifi size={10} /> Remote
                              </span>
                            )}
                          </div>

                          <div className="flex flex-wrap items-center gap-3 mt-2 text-xs text-muted-foreground">
                            <span className="flex items-center gap-1">
                              <MapPin size={10} /> {career.location}
                            </span>
                            <span className={cn('flex items-center gap-1', isUrgent ? 'text-red-500 font-medium' : '')}>
                              <Clock size={10} /> {days < 0 ? 'Ditutup' : `${days} hari lagi`}
                            </span>
                          </div>

                          {career.salary && (
                            <p className="text-xs font-semibold text-royal-indigo mt-1">{career.salary}</p>
                          )}
                        </div>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </AppShell>
  );
}
