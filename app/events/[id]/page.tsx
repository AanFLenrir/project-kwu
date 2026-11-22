'use client';

import { use } from 'react';
import { notFound } from 'next/navigation';
import { Calendar, Clock, MapPin, Tag } from 'lucide-react';
import { AppShell } from '@/components/layouts/AppShell';
import { PageHeader } from '@/components/common/PageHeader';
import { useApp } from '@/lib/context/AppContext';
import { formatDate } from '@/lib/utils';

const eventTypeConfig = {
  class: { label: 'Kuliah', color: '#302A91', bg: '#EAE9FA' },
  exam: { label: 'Ujian', color: '#ef4444', bg: '#fef2f2' },
  deadline: { label: 'Deadline', color: '#f59e0b', bg: '#fffbeb' },
  event: { label: 'Acara', color: '#22c55e', bg: '#f0fdf4' },
  meeting: { label: 'Rapat', color: '#3b82f6', bg: '#eff6ff' },
};

export default function EventDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const { state } = useApp();
  const event = state.events.find(e => e.id === id);
  if (!event) return notFound();

  const config = eventTypeConfig[event.type as keyof typeof eventTypeConfig] ?? { label: event.type, color: '#6b7280', bg: '#f9fafb' };

  return (
    <AppShell>
      <div className="min-h-screen bg-light-bg">
        <PageHeader title="Detail Jadwal" showBack backHref="/calendar" />

        <div className="px-4 py-6 lg:px-6 space-y-4">
          {/* Type Badge */}
          <div>
            <span className="inline-flex items-center rounded-full px-3 py-1 text-sm font-medium"
              style={{ background: config.bg, color: config.color }}>
              {config.label}
            </span>
          </div>

          {/* Title Card */}
          <div className="rounded-2xl bg-white shadow-sm p-5" style={{ borderLeft: `4px solid ${config.color}` }}>
            <h2 className="text-xl font-bold text-foreground font-heading mb-2">{event.title}</h2>
            {event.description && (
              <p className="text-sm text-muted-foreground leading-relaxed">{event.description}</p>
            )}
          </div>

          {/* Details */}
          <div className="rounded-2xl bg-white shadow-sm p-5 space-y-4">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl" style={{ background: config.bg }}>
                <Calendar size={16} style={{ color: config.color }} />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Tanggal</p>
                <p className="text-sm font-semibold text-foreground">
                  {formatDate(event.date, { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}
                </p>
              </div>
            </div>

            {(event.startTime || event.endTime) && (
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-muted">
                  <Clock size={16} className="text-muted-foreground" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Waktu</p>
                  <p className="text-sm font-semibold text-foreground">
                    {event.startTime}{event.endTime ? ` – ${event.endTime} WIB` : ' WIB'}
                  </p>
                </div>
              </div>
            )}

            {event.location && (
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-muted">
                  <MapPin size={16} className="text-muted-foreground" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Lokasi</p>
                  <p className="text-sm font-semibold text-foreground">{event.location}</p>
                </div>
              </div>
            )}

            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-muted">
                <Tag size={16} className="text-muted-foreground" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Jenis</p>
                <p className="text-sm font-semibold text-foreground">{config.label}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
