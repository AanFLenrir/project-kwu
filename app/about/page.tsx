'use client';

import { Sparkles, Users } from 'lucide-react';
import { AppShell } from '@/components/layouts/AppShell';
import { PageHeader } from '@/components/common/PageHeader';

const teamMembers = [
  { name: 'Iraino Syamsi Irfan L.', nim: '434241131', role: 'Refleksi & Penutup' },
  { name: 'Kholis Abdi Pamungkas', nim: '434241109', role: 'Problem & Bukti Lapangan' },
  { name: 'Mohammad Anhaz Abdilah', nim: '434241102', role: 'Tingkat Keyakinan & BEP' },
  { name: 'Muhammad Faris Sabiq', nim: '434241067', role: 'Segmen & Value Proposition' },
  { name: 'Rozan Aiman Ramadani', nim: '434241069', role: '9 Blok BMC & Cross-Check' },
];

export default function AboutKairosPage() {
  return (
    <AppShell>
      <div className="min-h-screen bg-light-bg">
        <PageHeader title="Tentang KAIROS" showBack backHref="/profile" />

        <div className="px-4 py-6 lg:px-8 max-w-4xl space-y-6">
          {/* Hero Identity */}
          <div className="bg-white rounded-3xl p-6 lg:p-10 border border-border shadow-xs text-center space-y-4">
            <div className="w-16 h-16 rounded-3xl bg-midnight-navy text-champagne-gold mx-auto flex items-center justify-center shadow-md">
              <Sparkles size={32} />
            </div>

            <div>
              <h1 className="text-3xl font-bold text-midnight-navy font-heading tracking-tight">KAIROS</h1>
              <p className="text-xs font-semibold uppercase tracking-widest text-champagne-gold mt-1">
                Right Priority. Right Moment.
              </p>
            </div>

            <p className="text-sm text-foreground/80 max-w-xl mx-auto leading-relaxed">
              KAIROS (berasal dari bahasa Yunani: <span className="font-semibold italic">kairos</span>, &ldquo;saat yang tepat&rdquo;) adalah platform manajemen terpusat bagi mahasiswa IT. Misinya sederhana: tidak ada lagi peluang penting yang hilang hanya karena tertimbun di ratusan pesan grup chat.
            </p>

            <div className="pt-2 flex flex-wrap justify-center gap-2 text-xs">
              <span className="px-3 py-1 rounded-full bg-soft-indigo text-royal-indigo font-semibold">
                D4 Teknik Informatika UNAIR
              </span>
              <span className="px-3 py-1 rounded-full bg-amber-50 text-amber-700 font-semibold">
                Kewirausahaan Bidang TI 2026
              </span>
              <span className="px-3 py-1 rounded-full bg-blue-50 text-blue-700 font-semibold">
                Versi 1.0.0 Stable
              </span>
            </div>
          </div>

          {/* Three Pillars */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white p-6 rounded-3xl border border-border shadow-xs space-y-2">
              <div className="text-2xl mb-2">🎯</div>
              <h3 className="font-bold text-sm text-midnight-navy">1. Smart Priority Dashboard</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Rekomendasi prioritas harian terotomasi berdasarkan bobot mata kuliah, estimasi durasi, dan urgensi tenggat.
              </p>
            </div>

            <div className="bg-white p-6 rounded-3xl border border-border shadow-xs space-y-2">
              <div className="text-2xl mb-2">🌐</div>
              <h3 className="font-bold text-sm text-midnight-navy">2. Centralized Information Hub</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Mengintegrasikan info lomba, beasiswa, jadwal praktikum, dan lowongan magang dalam satu jendela terkurasi.
              </p>
            </div>

            <div className="bg-white p-6 rounded-3xl border border-border shadow-xs space-y-2">
              <div className="text-2xl mb-2">🚀</div>
              <h3 className="font-bold text-sm text-midnight-navy">3. Progress & Portfolio Builder</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Pelacak kursus terpadu dan penyusun portofolio mahasiswa siap kirim ke industri teknologi dan mitra kampus.
              </p>
            </div>
          </div>

          {/* Academic Attribution & Team */}
          <div className="bg-white rounded-3xl p-6 lg:p-8 border border-border shadow-xs space-y-4">
            <div className="flex items-center gap-2.5 text-midnight-navy pb-3 border-b border-border">
              <Users size={20} className="text-royal-indigo" />
              <div>
                <h2 className="text-sm font-bold font-heading">Tim Pengembang (Kelompok 11 Kelas C2)</h2>
                <p className="text-xs text-muted-foreground">Mata Kuliah Kewirausahaan Bidang TI · Dosen Pengampu: Nambi Sembilu, S.Kom., M.Kom.</p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {teamMembers.map(m => (
                <div key={m.nim} className="p-3.5 rounded-2xl bg-light-bg border border-border flex items-center justify-between">
                  <div>
                    <h4 className="text-xs font-bold text-foreground">{m.name}</h4>
                    <p className="text-[11px] text-muted-foreground font-mono">NIM: {m.nim}</p>
                  </div>
                  <span className="text-[10px] font-semibold px-2 py-0.5 rounded-md bg-white border border-border text-royal-indigo">
                    {m.role}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
