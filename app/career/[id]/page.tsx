'use client';

import { use, useState } from 'react';
import { notFound } from 'next/navigation';
import { MapPin, Clock, Wifi, CheckCircle, Briefcase, DollarSign, ChevronRight } from 'lucide-react';
import { AppShell } from '@/components/layouts/AppShell';
import { PageHeader } from '@/components/common/PageHeader';
import { useApp } from '@/lib/context/AppContext';
import { formatDate, getDaysUntilDeadline, cn } from '@/lib/utils';

export default function CareerDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const { state } = useApp();
  const [applied, setApplied] = useState(false);
  const career = state.careers.find(c => c.id === id);
  if (!career) return notFound();

  const days = getDaysUntilDeadline(career.deadline);
  const typeLabels: Record<string, string> = {
    internship: 'Magang', 'full-time': 'Full-time', 'part-time': 'Part-time', freelance: 'Freelance', contract: 'Kontrak',
  };

  return (
    <AppShell>
      <div className="min-h-screen bg-light-bg">
        <PageHeader title="Detail Karier" showBack backHref="/career" />

        <div className="px-4 py-6 lg:px-6 space-y-4">
          {/* Company Header */}
          <div className="rounded-2xl bg-white shadow-sm p-5">
            <div className="flex items-center gap-4 mb-4">
              <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl"
                style={{ background: 'linear-gradient(135deg, #171747, #302A91)' }}>
                <span className="text-xl font-bold text-white">{career.company.slice(0, 2).toUpperCase()}</span>
              </div>
              <div>
                <h1 className="text-lg font-bold text-foreground font-heading">{career.position}</h1>
                <p className="text-sm text-muted-foreground">{career.company}</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 text-sm">
              <div className="flex items-center gap-2 text-muted-foreground">
                <MapPin size={14} /> <span className="text-xs">{career.location}</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Briefcase size={14} /> <span className="text-xs">{typeLabels[career.type] ?? career.type}</span>
              </div>
              {career.isRemote && (
                <div className="flex items-center gap-2 text-green-600">
                  <Wifi size={14} /> <span className="text-xs font-medium">Remote</span>
                </div>
              )}
              <div className={cn('flex items-center gap-2', days <= 7 ? 'text-red-500' : 'text-muted-foreground')}>
                <Clock size={14} />
                <span className="text-xs">{days < 0 ? 'Ditutup' : `${days} hari lagi`}</span>
              </div>
            </div>

            {career.salary && (
              <div className="mt-3 flex items-center gap-2 rounded-xl bg-soft-indigo px-3 py-2">
                <DollarSign size={14} className="text-royal-indigo" />
                <span className="text-sm font-semibold text-royal-indigo">{career.salary}</span>
              </div>
            )}
          </div>

          {/* Description */}
          <div className="rounded-2xl bg-white shadow-sm p-5">
            <h3 className="text-sm font-bold text-foreground mb-3 font-heading">Deskripsi Pekerjaan</h3>
            <p className="text-sm text-foreground/80 leading-relaxed">{career.description}</p>
          </div>

          {/* Requirements */}
          <div className="rounded-2xl bg-white shadow-sm p-5">
            <h3 className="text-sm font-bold text-foreground mb-3 font-heading">Persyaratan</h3>
            <ul className="space-y-2">
              {career.requirements.map((req, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-foreground/80">
                  <div className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-royal-indigo" />
                  {req}
                </li>
              ))}
            </ul>
          </div>

          {/* Benefits */}
          {career.benefits && career.benefits.length > 0 && (
            <div className="rounded-2xl bg-white shadow-sm p-5">
              <h3 className="text-sm font-bold text-foreground mb-3 font-heading">Keuntungan</h3>
              <ul className="space-y-2">
                {career.benefits.map((b, i) => (
                  <li key={i} className="flex items-center gap-2 text-sm text-foreground/80">
                    <CheckCircle size={14} className="text-green-500 shrink-0" />
                    {b}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Tags */}
          <div className="flex flex-wrap gap-2">
            {career.tags.map(tag => (
              <span key={tag} className="rounded-full bg-soft-indigo px-2.5 py-1 text-xs font-medium text-royal-indigo">
                #{tag}
              </span>
            ))}
          </div>

          {/* Apply Button */}
          <div className="sticky bottom-20 lg:static">
            {!applied ? (
              <button
                onClick={() => setApplied(true)}
                className="flex w-full items-center justify-center gap-2 rounded-xl py-4 text-sm font-semibold text-white transition-all hover:scale-[1.02] active:scale-[0.98] shadow-lg"
                style={{ background: 'linear-gradient(135deg, #302A91, #171747)', boxShadow: '0 4px 20px rgba(48, 42, 145, 0.4)' }}>
                Lamar Sekarang <ChevronRight size={16} />
              </button>
            ) : (
              <div className="flex items-center justify-center gap-2 rounded-xl py-4 text-sm font-semibold bg-green-500 text-white">
                <CheckCircle size={16} /> Lamaran Terkirim!
              </div>
            )}
          </div>
        </div>
      </div>
    </AppShell>
  );
}
