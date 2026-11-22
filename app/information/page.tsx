'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Search, Bookmark, ChevronRight, Clock, Filter, X } from 'lucide-react';
import { AppShell } from '@/components/layouts/AppShell';
import { PageHeader } from '@/components/common/PageHeader';
import { CategoryBadge } from '@/components/common/Badges';
import { EmptyState } from '@/components/common/States';
import { useApp } from '@/lib/context/AppContext';
import { formatRelativeTime, cn } from '@/lib/utils';
import type { InfoCategory } from '@/types';

const categories: { value: InfoCategory | 'all'; label: string }[] = [
  { value: 'all', label: 'Semua' },
  { value: 'announcement', label: 'Pengumuman' },
  { value: 'scholarship', label: 'Beasiswa' },
  { value: 'internship', label: 'Magang' },
  { value: 'competition', label: 'Kompetisi' },
  { value: 'certification', label: 'Sertifikasi' },
  { value: 'academic', label: 'Akademik' },
];

export default function InformationPage() {
  const { state, toggleBookmark } = useApp();
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState<InfoCategory | 'all'>('all');
  const [showBookmarked, setShowBookmarked] = useState(false);

  const filtered = state.information.filter(info => {
    const matchSearch = !search || info.title.toLowerCase().includes(search.toLowerCase()) || info.summary.toLowerCase().includes(search.toLowerCase());
    const matchCategory = category === 'all' || info.category === category;
    const matchBookmark = !showBookmarked || info.isBookmarked;
    return matchSearch && matchCategory && matchBookmark;
  });

  return (
    <AppShell>
      <div className="min-h-screen bg-light-bg">
        <PageHeader
          title="Information Hub"
          subtitle="Informasi akademik & karier terpusat"
          showNotification
        />

        <div className="px-4 py-4 lg:px-6 space-y-4">
          {/* Search Bar */}
          <div className="flex gap-2">
            <div className="relative flex-1">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <input
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="Cari informasi..."
                className="w-full rounded-xl border border-border bg-white pl-9 pr-4 py-2.5 text-sm focus:border-royal-indigo focus:outline-none focus:ring-2 focus:ring-royal-indigo/20"
              />
              {search && (
                <button onClick={() => setSearch('')} className="absolute right-3 top-1/2 -translate-y-1/2">
                  <X size={14} className="text-muted-foreground" />
                </button>
              )}
            </div>
            <button
              onClick={() => setShowBookmarked(s => !s)}
              className={cn(
                'flex h-10 w-10 items-center justify-center rounded-xl border transition-all',
                showBookmarked ? 'border-royal-indigo bg-soft-indigo text-royal-indigo' : 'border-border bg-white text-muted-foreground hover:border-royal-indigo/50'
              )}
            >
              <Bookmark size={16} fill={showBookmarked ? 'currentColor' : 'none'} />
            </button>
          </div>

          {/* Category Filter */}
          <div className="flex gap-2 overflow-x-auto pb-1 no-scrollbar">
            {categories.map(cat => (
              <button
                key={cat.value}
                onClick={() => setCategory(cat.value)}
                className={cn(
                  'shrink-0 rounded-full px-3.5 py-1.5 text-xs font-medium transition-all',
                  category === cat.value
                    ? 'bg-royal-indigo text-white'
                    : 'bg-white text-muted-foreground border border-border hover:border-royal-indigo/50'
                )}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Career Link */}
          <Link href="/career"
            className="flex items-center gap-3 rounded-2xl p-4 shadow-sm"
            style={{ background: 'linear-gradient(135deg, #171747, #302A91)' }}>
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/15">
              <ChevronRight size={18} className="text-white" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-semibold text-white">Peluang Karier</p>
              <p className="text-xs text-white/60">{state.careers.length} lowongan tersedia</p>
            </div>
            <ChevronRight size={16} className="text-white/60" />
          </Link>

          {/* Info Count */}
          <p className="text-xs text-muted-foreground">
            Menampilkan <strong className="text-foreground">{filtered.length}</strong> informasi
          </p>

          {/* Information List */}
          {filtered.length === 0 ? (
            <EmptyState
              icon={Search}
              title="Tidak ada informasi"
              description="Coba ubah filter pencarian"
            />
          ) : (
            <div className="space-y-3">
              {filtered.map(info => (
                <div key={info.id} className="rounded-2xl bg-white shadow-sm overflow-hidden hover:shadow-md transition-all duration-200 hover:-translate-y-0.5">
                  <Link href={`/information/${info.id}`} className="block p-4">
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <CategoryBadge category={info.category} />
                      {info.deadline && (
                        <div className="flex items-center gap-1 text-xs text-orange-600">
                          <Clock size={10} />
                          <span>Deadline {new Date(info.deadline).toLocaleDateString('id-ID', { day: 'numeric', month: 'short' })}</span>
                        </div>
                      )}
                    </div>
                    <h3 className="text-sm font-semibold text-foreground mb-1 leading-snug line-clamp-2">{info.title}</h3>
                    <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed">{info.summary}</p>
                    <div className="flex items-center justify-between mt-2">
                      <span className="text-[10px] text-muted-foreground/70">{info.source} · {formatRelativeTime(info.publishedAt)}</span>
                      <button
                        onClick={e => { e.preventDefault(); toggleBookmark(info.id); }}
                        className="p-1 hover:scale-110 transition-transform"
                      >
                        <Bookmark size={14} className={info.isBookmarked ? 'text-royal-indigo fill-royal-indigo' : 'text-muted-foreground'} />
                      </button>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </AppShell>
  );
}
