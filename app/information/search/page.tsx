'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Search, X, ArrowLeft, ArrowUpDown, ChevronRight, Bookmark, Calendar } from 'lucide-react';
import { AppShell } from '@/components/layouts/AppShell';
import { PageHeader } from '@/components/common/PageHeader';
import { CategoryBadge } from '@/components/common/Badges';
import { EmptyState } from '@/components/common/States';
import { useApp } from '@/lib/context/AppContext';
import { formatRelativeTime } from '@/lib/utils';
import type { InfoCategory } from '@/types';

export default function InformationSearchPage() {
  const { state, toggleBookmark } = useApp();
  const [query, setQuery] = useState('');
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  // Extract all unique tags
  const allTags = Array.from(new Set(state.information.flatMap(i => i.tags)));

  const filtered = state.information.filter(item => {
    const matchesQuery = !query || 
      item.title.toLowerCase().includes(query.toLowerCase()) ||
      item.summary.toLowerCase().includes(query.toLowerCase()) ||
      item.content.toLowerCase().includes(query.toLowerCase()) ||
      item.source.toLowerCase().includes(query.toLowerCase());

    const matchesTag = !selectedTag || item.tags.includes(selectedTag);

    return matchesQuery && matchesTag;
  });

  return (
    <AppShell>
      <div className="min-h-screen bg-light-bg">
        <PageHeader 
          title="Pencarian Informasi" 
          subtitle="Telusuri seluruh arsip informasi akademik & karier"
          showBack 
          backHref="/information" 
        />

        <div className="px-4 py-6 lg:px-8 max-w-5xl space-y-6">
          {/* Search Box */}
          <div className="bg-white p-4 rounded-2xl shadow-sm border border-border">
            <div className="relative">
              <Search size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <input
                type="text"
                autoFocus
                value={query}
                onChange={e => setQuery(e.target.value)}
                placeholder="Ketik kata kunci (misal: Beasiswa, Magang Gojek, Praktikum, dsb)..."
                className="w-full pl-11 pr-10 py-3 rounded-xl border border-border bg-light-bg/50 text-sm focus:border-royal-indigo focus:bg-white focus:outline-none focus:ring-2 focus:ring-royal-indigo/20 transition-all"
              />
              {query && (
                <button 
                  onClick={() => setQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-muted-foreground hover:text-foreground"
                >
                  <X size={16} />
                </button>
              )}
            </div>

            {/* Popular tags */}
            <div className="mt-4 flex flex-wrap items-center gap-2">
              <span className="text-xs text-muted-foreground font-medium mr-1">Tag Populer:</span>
              {allTags.map(tag => (
                <button
                  key={tag}
                  onClick={() => setSelectedTag(selectedTag === tag ? null : tag)}
                  className={`text-xs px-2.5 py-1 rounded-full transition-colors ${
                    selectedTag === tag
                      ? 'bg-royal-indigo text-white font-medium'
                      : 'bg-soft-indigo/60 text-royal-indigo hover:bg-soft-indigo'
                  }`}
                >
                  #{tag}
                </button>
              ))}
              {selectedTag && (
                <button
                  onClick={() => setSelectedTag(null)}
                  className="text-xs text-red-500 hover:underline ml-2"
                >
                  Reset Tag
                </button>
              )}
            </div>
          </div>

          {/* Results Summary */}
          <div className="flex items-center justify-between text-xs text-muted-foreground px-1">
            <span>Ditemukan <strong className="text-foreground">{filtered.length}</strong> informasi</span>
            {query && <span>Kata kunci: &ldquo;{query}&rdquo;</span>}
          </div>

          {/* Result Cards */}
          {filtered.length === 0 ? (
            <EmptyState
              icon={Search}
              title="Informasi Tidak Ditemukan"
              description="Coba cari dengan kata kunci lain atau pilih tag yang relevan."
            />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filtered.map(info => (
                <div
                  key={info.id}
                  className="bg-white rounded-2xl p-5 border border-border shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-2.5">
                      <CategoryBadge category={info.category} />
                      <button
                        onClick={() => toggleBookmark(info.id)}
                        className="text-muted-foreground hover:text-royal-indigo transition-colors"
                      >
                        <Bookmark size={16} fill={info.isBookmarked ? '#302A91' : 'none'} className={info.isBookmarked ? 'text-royal-indigo' : ''} />
                      </button>
                    </div>

                    <Link href={`/information/${info.id}`}>
                      <h3 className="font-bold text-midnight-navy text-sm sm:text-base leading-snug hover:text-royal-indigo transition-colors mb-2">
                        {info.title}
                      </h3>
                    </Link>

                    <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed mb-4">
                      {info.summary}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-border flex items-center justify-between text-xs">
                    <span className="text-muted-foreground truncate max-w-[150px]">{info.source}</span>
                    <Link
                      href={`/information/${info.id}`}
                      className="inline-flex items-center gap-1 font-semibold text-royal-indigo hover:gap-1.5 transition-all"
                    >
                      Buka Detail <ChevronRight size={14} />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </AppShell>
  );
}
