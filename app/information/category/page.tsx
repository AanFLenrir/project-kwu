'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Filter, ChevronRight, Bookmark } from 'lucide-react';
import { AppShell } from '@/components/layouts/AppShell';
import { PageHeader } from '@/components/common/PageHeader';
import { CategoryBadge } from '@/components/common/Badges';
import { useApp } from '@/lib/context/AppContext';
import type { InfoCategory } from '@/types';

const categoryList: { key: InfoCategory; title: string; desc: string; icon: string; bg: string }[] = [
  { key: 'academic', title: 'Akademik', desc: 'Jadwal kuliah, praktikum, KRS, dan pengumuman jurusan', icon: '🎓', bg: 'bg-blue-50' },
  { key: 'announcement', title: 'Pengumuman Kampus', desc: 'Edaran rektorat, dekanat, kalender akademik', icon: '📢', bg: 'bg-purple-50' },
  { key: 'scholarship', title: 'Beasiswa', desc: 'Peluang beasiswa dalam dan luar negeri untuk mahasiswa IT', icon: '💰', bg: 'bg-green-50' },
  { key: 'internship', title: 'Magang & MBKM', desc: 'Lowongan magang tech, startup, BUMN, dan program MSIB', icon: '💼', bg: 'bg-orange-50' },
  { key: 'competition', title: 'Kompetisi & Hackathon', desc: 'GEMASTIK, lomba software development, UI/UX, data science', icon: '🏆', bg: 'bg-red-50' },
  { key: 'certification', title: 'Sertifikasi Profesional', desc: 'Voucher dan pelatihan sertifikasi AWS, Google, Dicoding', icon: '📜', bg: 'bg-indigo-50' },
  { key: 'career', title: 'Karier & Lowongan', desc: 'Peluang kerja fresh graduate dan part-time project', icon: '🚀', bg: 'bg-teal-50' },
];

export default function CategoryFilterPage() {
  const { state, toggleBookmark } = useApp();
  const [selectedCategory, setSelectedCategory] = useState<InfoCategory>('academic');

  const filteredItems = state.information.filter(i => i.category === selectedCategory);

  return (
    <AppShell>
      <div className="min-h-screen bg-light-bg">
        <PageHeader
          title="Kategori Informasi"
          subtitle="Jelajahi informasi berdasarkan bidang peminatan"
          showBack
          backHref="/information"
        />

        <div className="px-4 py-6 lg:px-8 max-w-6xl space-y-6">
          {/* Categories Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
            {categoryList.map(cat => {
              const isSelected = selectedCategory === cat.key;
              const count = state.information.filter(i => i.category === cat.key).length;

              return (
                <div
                  key={cat.key}
                  onClick={() => setSelectedCategory(cat.key)}
                  className={`p-4 rounded-2xl border-2 cursor-pointer transition-all ${
                    isSelected
                      ? 'border-royal-indigo bg-white shadow-md -translate-y-0.5'
                      : 'border-border bg-white hover:border-royal-indigo/30'
                  }`}
                >
                  <div className="text-2xl mb-2">{cat.icon}</div>
                  <h3 className="text-sm font-bold text-midnight-navy">{cat.title}</h3>
                  <p className="text-[11px] text-muted-foreground mt-1 line-clamp-1">{cat.desc}</p>
                  <div className="mt-3 flex items-center justify-between text-[11px] font-semibold text-royal-indigo">
                    <span>{count} postingan</span>
                    <ChevronRight size={14} />
                  </div>
                </div>
              );
            })}
          </div>

          {/* Category Content List */}
          <div className="bg-white rounded-3xl p-6 border border-border shadow-xs">
            <div className="flex items-center justify-between pb-4 border-b border-border mb-4">
              <div>
                <h2 className="text-lg font-bold text-midnight-navy font-heading">
                  {categoryList.find(c => c.key === selectedCategory)?.title}
                </h2>
                <p className="text-xs text-muted-foreground">
                  {categoryList.find(c => c.key === selectedCategory)?.desc}
                </p>
              </div>
              <span className="text-xs px-2.5 py-1 rounded-full bg-soft-indigo text-royal-indigo font-bold">
                {filteredItems.length} Konten
              </span>
            </div>

            {filteredItems.length === 0 ? (
              <div className="py-12 text-center text-sm text-muted-foreground">
                Belum ada postingan untuk kategori ini saat ini.
              </div>
            ) : (
              <div className="divide-y divide-border">
                {filteredItems.map(item => (
                  <div key={item.id} className="py-4 first:pt-0 last:pb-0 flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1.5">
                        <span className="text-[11px] font-semibold text-muted-foreground">{item.source}</span>
                        <span className="text-muted-foreground text-xs">•</span>
                        <span className="text-[11px] text-muted-foreground">{new Date(item.publishedAt).toLocaleDateString('id-ID')}</span>
                      </div>
                      <Link href={`/information/${item.id}`} className="font-bold text-foreground text-sm hover:text-royal-indigo transition-colors">
                        {item.title}
                      </Link>
                      <p className="text-xs text-muted-foreground mt-1 line-clamp-2 leading-relaxed">
                        {item.summary}
                      </p>
                    </div>

                    <button
                      onClick={() => toggleBookmark(item.id)}
                      className="p-2 text-muted-foreground hover:text-royal-indigo shrink-0"
                    >
                      <Bookmark size={18} fill={item.isBookmarked ? '#302A91' : 'none'} className={item.isBookmarked ? 'text-royal-indigo' : ''} />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </AppShell>
  );
}
