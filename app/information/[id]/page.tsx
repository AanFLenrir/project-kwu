'use client';

import { use } from 'react';
import { notFound } from 'next/navigation';
import { Clock, Bookmark, ExternalLink, Calendar, Tag } from 'lucide-react';
import { AppShell } from '@/components/layouts/AppShell';
import { PageHeader } from '@/components/common/PageHeader';
import { CategoryBadge } from '@/components/common/Badges';
import { useApp } from '@/lib/context/AppContext';
import { formatDate, formatRelativeTime } from '@/lib/utils';

export default function InformationDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const { state, toggleBookmark } = useApp();
  const info = state.information.find(i => i.id === id);
  if (!info) return notFound();

  return (
    <AppShell>
      <div className="min-h-screen bg-light-bg">
        <PageHeader
          title="Detail Informasi"
          showBack
          backHref="/information"
          actions={
            <button onClick={() => toggleBookmark(info.id)} className="flex h-9 w-9 items-center justify-center rounded-full hover:bg-muted transition-colors">
              <Bookmark size={18} className={info.isBookmarked ? 'text-royal-indigo fill-royal-indigo' : 'text-muted-foreground'} />
            </button>
          }
        />

        <div className="px-4 py-6 lg:px-6 space-y-4">
          {/* Category & Source */}
          <div className="flex items-center gap-2">
            <CategoryBadge category={info.category} />
            <span className="text-xs text-muted-foreground">{info.source}</span>
          </div>

          {/* Title */}
          <div className="rounded-2xl bg-white shadow-sm p-5">
            <h1 className="text-xl font-bold text-foreground font-heading mb-2 leading-tight">{info.title}</h1>
            <p className="text-sm text-muted-foreground leading-relaxed">{info.summary}</p>
          </div>

          {/* Meta info */}
          <div className="grid grid-cols-2 gap-3">
            <div className="rounded-xl bg-white p-4 shadow-sm flex items-center gap-2">
              <Calendar size={14} className="text-royal-indigo shrink-0" />
              <div>
                <p className="text-xs text-muted-foreground">Diterbitkan</p>
                <p className="text-xs font-semibold text-foreground">{formatRelativeTime(info.publishedAt)}</p>
              </div>
            </div>
            {info.deadline && (
              <div className="rounded-xl bg-orange-50 p-4 shadow-sm flex items-center gap-2">
                <Clock size={14} className="text-orange-600 shrink-0" />
                <div>
                  <p className="text-xs text-orange-600/70">Deadline</p>
                  <p className="text-xs font-semibold text-orange-700">
                    {formatDate(info.deadline, { day: 'numeric', month: 'short' })}
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Content */}
          <div className="rounded-2xl bg-white shadow-sm p-5">
            <h3 className="text-sm font-bold text-foreground mb-3 font-heading">Konten Lengkap</h3>
            <p className="text-sm text-foreground/80 leading-relaxed">{info.content}</p>
          </div>

          {/* Tags */}
          {info.tags.length > 0 && (
            <div className="rounded-xl bg-white shadow-sm p-4">
              <div className="flex items-center gap-2 mb-2">
                <Tag size={14} className="text-muted-foreground" />
                <span className="text-xs font-medium text-muted-foreground">Tag</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {info.tags.map(tag => (
                  <span key={tag} className="rounded-full bg-soft-indigo px-2.5 py-1 text-xs font-medium text-royal-indigo">
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* CTA */}
          {info.link && (
            <a href={info.link} target="_blank" rel="noopener noreferrer"
              className="flex w-full items-center justify-center gap-2 rounded-xl py-3.5 text-sm font-semibold text-white transition-all hover:scale-[1.02]"
              style={{ background: 'linear-gradient(135deg, #302A91, #171747)' }}>
              <ExternalLink size={16} /> Kunjungi Sumber
            </a>
          )}
        </div>
      </div>
    </AppShell>
  );
}
