'use client';

import { useState } from 'react';
import Link from 'next/link';
import { HelpCircle, ChevronDown, MessageSquare, Mail, Search, BookOpen } from 'lucide-react';
import { AppShell } from '@/components/layouts/AppShell';
import { PageHeader } from '@/components/common/PageHeader';

const faqs = [
  {
    q: 'Apa itu KAIROS dan bagaimana sistem prioritasnya bekerja?',
    a: 'KAIROS ("saat yang tepat") adalah platform manajemen terpusat bagi mahasiswa IT. Sistem Smart Priority menghitung bobot nilai tugas, kedekatan tenggat waktu (deadline), dan estimasi pengerjaan sehingga kamu tahu persis tugas apa yang harus diselesaikan lebih dahulu.'
  },
  {
    q: 'Apakah data saya tersimpan jika browser ditutup?',
    a: 'Ya. Seluruh data (tugas, sertifikat, kursus, dan profil) disimpan secara otomatis di LocalStorage perambanmu. Kamu juga dapat mengunduh salinan cadangan JSON melalui menu Pengaturan > Privasi & Data.'
  },
  {
    q: 'Bagaimana cara menambahkan sertifikat baru?',
    a: 'Buka menu Progres > pilih tab Sertifikat atau klik tombol "+", lalu isi nama sertifikat, lembaga penerbit, tanggal terbit, dan keahlian yang relevan. Sertifikat akan langsung tersinkronisasi ke Portfolio Builder.'
  },
  {
    q: 'Apakah KAIROS dapat digunakan di laptop dan smartphone?',
    a: 'Tentu saja. KAIROS dirancang dengan standar Desktop-First (sidebar menu, grid proporsional) serta responsif untuk tablet dan smartphone (bottom navigation otomatis).'
  },
  {
    q: 'Bagaimana cara membagikan link portofolio ke rekruter?',
    a: 'Masuk ke menu Progres > Portfolio Builder, kemudian klik tombol "Preview Portofolio" atau "Bagikan". Kamu bisa membagikan link publik atau menyimpannya dalam format PDF.'
  }
];

export default function HelpCenterPage() {
  const [openIdx, setOpenIdx] = useState<number | null>(0);
  const [search, setSearch] = useState('');

  const filteredFaqs = faqs.filter(f => 
    !search || f.q.toLowerCase().includes(search.toLowerCase()) || f.a.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <AppShell>
      <div className="min-h-screen bg-light-bg">
        <PageHeader title="Pusat Bantuan" showBack backHref="/profile" />

        <div className="px-4 py-6 lg:px-8 max-w-4xl space-y-6">
          {/* Hero Banner */}
          <div className="bg-white rounded-3xl p-6 lg:p-8 border border-border shadow-xs text-center space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-soft-indigo text-royal-indigo mx-auto flex items-center justify-center">
              <HelpCircle size={26} />
            </div>
            <h1 className="text-xl lg:text-2xl font-bold text-midnight-navy font-heading">
              Ada yang Bisa Kami Bantu?
            </h1>
            <p className="text-xs text-muted-foreground max-w-md mx-auto">
              Temukan jawaban atas pertanyaan umum seputar cara penggunaan fitur Smart Priority, Information Hub, dan Portfolio Builder.
            </p>

            <div className="max-w-md mx-auto pt-2 relative">
              <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <input
                type="text"
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="Cari kendala atau panduan..."
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-border bg-light-bg/50 text-xs focus:border-royal-indigo focus:outline-none focus:bg-white"
              />
            </div>
          </div>

          {/* FAQ Accordion */}
          <div className="bg-white rounded-3xl p-6 lg:p-8 border border-border shadow-xs space-y-3">
            <h2 className="text-sm font-bold text-midnight-navy font-heading uppercase tracking-wider mb-4">
              Pertanyaan yang Sering Diajukan (FAQ)
            </h2>

            <div className="space-y-2.5">
              {filteredFaqs.map((faq, i) => {
                const isOpen = openIdx === i;
                return (
                  <div key={i} className="rounded-2xl border border-border overflow-hidden">
                    <button
                      onClick={() => setOpenIdx(isOpen ? null : i)}
                      className="w-full p-4 text-left flex items-center justify-between gap-3 bg-light-bg/30 hover:bg-light-bg/70 transition-colors"
                    >
                      <span className="text-xs font-bold text-foreground">{faq.q}</span>
                      <ChevronDown
                        size={16}
                        className={`text-muted-foreground transition-transform duration-200 shrink-0 ${isOpen ? 'rotate-180 text-royal-indigo' : ''}`}
                      />
                    </button>
                    {isOpen && (
                      <div className="p-4 bg-white border-t border-border text-xs text-muted-foreground leading-relaxed">
                        {faq.a}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Contact Support */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-5 rounded-3xl bg-white border border-border flex items-center gap-4 shadow-xs">
              <div className="w-10 h-10 rounded-xl bg-soft-indigo text-royal-indigo flex items-center justify-center shrink-0">
                <Mail size={18} />
              </div>
              <div>
                <h4 className="text-xs font-bold text-midnight-navy">Email Dukungan Kampus</h4>
                <p className="text-[11px] text-muted-foreground">kairos.support@unair.ac.id</p>
              </div>
            </div>

            <div className="p-5 rounded-3xl bg-white border border-border flex items-center gap-4 shadow-xs">
              <div className="w-10 h-10 rounded-xl bg-soft-indigo text-royal-indigo flex items-center justify-center shrink-0">
                <BookOpen size={18} />
              </div>
              <div>
                <h4 className="text-xs font-bold text-midnight-navy">Dokumentasi Proyek</h4>
                <p className="text-[11px] text-muted-foreground">Kelompok 11 Kelas C2 · D4 TI UNAIR</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
