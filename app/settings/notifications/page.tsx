'use client';

import { useState } from 'react';
import { Bell, Clock, Calendar, Briefcase, Award, Check } from 'lucide-react';
import { AppShell } from '@/components/layouts/AppShell';
import { PageHeader } from '@/components/common/PageHeader';

export default function NotificationSettingsPage() {
  const [settings, setSettings] = useState({
    deadlineH1: true,
    deadlineH3: true,
    newInfo: true,
    newCareer: true,
    courseReminders: true,
    weeklyReport: false,
    sound: true,
  });

  const toggle = (key: keyof typeof settings) => {
    setSettings(prev => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <AppShell>
      <div className="min-h-screen bg-light-bg">
        <PageHeader title="Preferensi Notifikasi" showBack backHref="/settings" />

        <div className="px-4 py-6 lg:px-8 max-w-3xl space-y-6">
          <div className="bg-white rounded-3xl p-6 lg:p-8 border border-border shadow-xs space-y-6">
            <div>
              <h2 className="text-sm font-bold text-midnight-navy font-heading uppercase tracking-wider mb-1">
                Pengingat Tugas & Deadline
              </h2>
              <p className="text-xs text-muted-foreground">KAIROS memberi alert agar tidak ada tugas penting yang terlewat</p>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between py-2 border-b border-border">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-red-50 text-red-600 flex items-center justify-center">
                    <Clock size={16} />
                  </div>
                  <div>
                    <h3 className="text-xs font-bold text-foreground">Pengingat H-1 Deadline</h3>
                    <p className="text-[11px] text-muted-foreground">Notifikasi 24 jam sebelum tenggat waktu tugas berakhir</p>
                  </div>
                </div>
                <input
                  type="checkbox"
                  checked={settings.deadlineH1}
                  onChange={() => toggle('deadlineH1')}
                  className="w-5 h-5 accent-royal-indigo cursor-pointer"
                />
              </div>

              <div className="flex items-center justify-between py-2 border-b border-border">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
                    <Calendar size={16} />
                  </div>
                  <div>
                    <h3 className="text-xs font-bold text-foreground">Pengingat H-3 Deadline</h3>
                    <p className="text-[11px] text-muted-foreground">Alert perencanaan pengerjaan tugas berbobot besar</p>
                  </div>
                </div>
                <input
                  type="checkbox"
                  checked={settings.deadlineH3}
                  onChange={() => toggle('deadlineH3')}
                  className="w-5 h-5 accent-royal-indigo cursor-pointer"
                />
              </div>
            </div>

            <div className="pt-2">
              <h2 className="text-sm font-bold text-midnight-navy font-heading uppercase tracking-wider mb-1">
                Informasi & Peluang Karier
              </h2>
              <p className="text-xs text-muted-foreground">Notifikasi instan saat ada pengumuman atau magang baru</p>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between py-2 border-b border-border">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                    <Bell size={16} />
                  </div>
                  <div>
                    <h3 className="text-xs font-bold text-foreground">Pengumuman Akademik Baru</h3>
                    <p className="text-[11px] text-muted-foreground">Info jadwal UTS/UAS, KRS, beasiswa, dan kompetisi</p>
                  </div>
                </div>
                <input
                  type="checkbox"
                  checked={settings.newInfo}
                  onChange={() => toggle('newInfo')}
                  className="w-5 h-5 accent-royal-indigo cursor-pointer"
                />
              </div>

              <div className="flex items-center justify-between py-2 border-b border-border">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-teal-50 text-teal-600 flex items-center justify-center">
                    <Briefcase size={16} />
                  </div>
                  <div>
                    <h3 className="text-xs font-bold text-foreground">Lowongan Magang Rekomendasi</h3>
                    <p className="text-[11px] text-muted-foreground">Peluang magang IT yang sesuai dengan keahlianmu</p>
                  </div>
                </div>
                <input
                  type="checkbox"
                  checked={settings.newCareer}
                  onChange={() => toggle('newCareer')}
                  className="w-5 h-5 accent-royal-indigo cursor-pointer"
                />
              </div>

              <div className="flex items-center justify-between py-2">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center">
                    <Award size={16} />
                  </div>
                  <div>
                    <h3 className="text-xs font-bold text-foreground">Evaluasi Progres Mingguan</h3>
                    <p className="text-[11px] text-muted-foreground">Ringkasan produktivitas setiap hari Senin pagi</p>
                  </div>
                </div>
                <input
                  type="checkbox"
                  checked={settings.weeklyReport}
                  onChange={() => toggle('weeklyReport')}
                  className="w-5 h-5 accent-royal-indigo cursor-pointer"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
