'use client';

import Link from 'next/link';
import { User, Settings, Bell, Shield, HelpCircle, Info, LogOut, ChevronRight, Edit3, Award, BookOpen, ListChecks } from 'lucide-react';
import { AppShell } from '@/components/layouts/AppShell';
import { PageHeader } from '@/components/common/PageHeader';
import { useApp } from '@/lib/context/AppContext';

export default function ProfilePage() {
  const { state } = useApp();
  const { user, tasks, courses, certificates } = state;

  const completedTasksCount = tasks.filter(t => t.status === 'completed').length;

  const menuSections = [
    {
      title: 'Pengaturan Akun',
      items: [
        { href: '/profile/edit', label: 'Ubah Data Profil', icon: Edit3, desc: 'Nama, NIM, program studi, kontak' },
        { href: '/settings', label: 'Pengaturan Akun', icon: Settings, desc: 'Kata sandi, preferensi bahasa, sesi' },
        { href: '/settings/notifications', label: 'Preferensi Notifikasi', icon: Bell, desc: 'Pengingat deadline, info baru' },
        { href: '/settings/privacy', label: 'Privasi & Data', icon: Shield, desc: 'Visibilitas portofolio, cadangan data' },
      ]
    },
    {
      title: 'Dukungan & Informasi',
      items: [
        { href: '/help', label: 'Pusat Bantuan (FAQ)', icon: HelpCircle, desc: 'Panduan penggunaan platform KAIROS' },
        { href: '/about', label: 'Tentang KAIROS', icon: Info, desc: 'Latar belakang riset, tim pengembang, visi' },
      ]
    }
  ];

  return (
    <AppShell>
      <div className="min-h-screen bg-light-bg">
        <PageHeader title="Profil Saya" showNotification />

        <div className="px-4 py-6 lg:px-8 max-w-4xl space-y-6">
          {/* Profile Card */}
          <div className="bg-white rounded-3xl p-6 lg:p-8 border border-border shadow-xs">
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 text-center sm:text-left">
              {/* Avatar */}
              <div className="w-24 h-24 rounded-3xl bg-midnight-navy flex items-center justify-center text-white font-bold text-3xl font-heading shadow-md shrink-0 border-4 border-soft-indigo">
                {user.name.charAt(0)}
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <h2 className="text-2xl font-bold text-midnight-navy font-heading">{user.name}</h2>
                    <p className="text-sm text-muted-foreground mt-0.5">{user.email}</p>
                  </div>
                  <Link
                    href="/profile/edit"
                    className="inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl border border-border text-xs font-semibold hover:border-royal-indigo hover:text-royal-indigo transition-colors"
                  >
                    <Edit3 size={14} /> Edit Profil
                  </Link>
                </div>

                <div className="mt-4 grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                  <div className="p-3 rounded-2xl bg-light-bg border border-border">
                    <span className="text-muted-foreground block text-[11px]">NIM</span>
                    <strong className="text-foreground">{user.nim}</strong>
                  </div>
                  <div className="p-3 rounded-2xl bg-light-bg border border-border">
                    <span className="text-muted-foreground block text-[11px]">Program Studi</span>
                    <strong className="text-foreground truncate block">{user.program}</strong>
                  </div>
                  <div className="p-3 rounded-2xl bg-light-bg border border-border">
                    <span className="text-muted-foreground block text-[11px]">Universitas</span>
                    <strong className="text-foreground truncate block">{user.university}</strong>
                  </div>
                  <div className="p-3 rounded-2xl bg-light-bg border border-border">
                    <span className="text-muted-foreground block text-[11px]">Semester</span>
                    <strong className="text-foreground">Semester {user.semester}</strong>
                  </div>
                </div>
              </div>
            </div>

            {/* Achievement Mini Dashboard */}
            <div className="mt-6 pt-6 border-t border-border grid grid-cols-3 gap-3">
              <div className="text-center p-3 rounded-2xl bg-soft-indigo/40">
                <div className="text-lg font-bold text-royal-indigo font-heading">{completedTasksCount}</div>
                <div className="text-[11px] text-muted-foreground font-medium">Tugas Selesai</div>
              </div>
              <div className="text-center p-3 rounded-2xl bg-amber-50">
                <div className="text-lg font-bold text-amber-700 font-heading">{certificates.length}</div>
                <div className="text-[11px] text-muted-foreground font-medium">Sertifikat</div>
              </div>
              <div className="text-center p-3 rounded-2xl bg-blue-50">
                <div className="text-lg font-bold text-blue-700 font-heading">{courses.length}</div>
                <div className="text-[11px] text-muted-foreground font-medium">Kursus Diikuti</div>
              </div>
            </div>
          </div>

          {/* Menu Sections */}
          {menuSections.map(section => (
            <div key={section.title} className="bg-white rounded-3xl p-6 border border-border shadow-xs space-y-3">
              <h3 className="text-xs font-bold text-midnight-navy uppercase tracking-wider px-1">
                {section.title}
              </h3>
              <div className="divide-y divide-border">
                {section.items.map(item => {
                  const Icon = item.icon;
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="py-3.5 first:pt-1 last:pb-1 flex items-center justify-between gap-4 hover:translate-x-1 transition-transform group"
                    >
                      <div className="flex items-center gap-3.5">
                        <div className="w-10 h-10 rounded-xl bg-light-bg border border-border flex items-center justify-center text-royal-indigo group-hover:bg-soft-indigo transition-colors shrink-0">
                          <Icon size={18} />
                        </div>
                        <div>
                          <h4 className="text-sm font-semibold text-foreground group-hover:text-royal-indigo transition-colors">
                            {item.label}
                          </h4>
                          <p className="text-xs text-muted-foreground">{item.desc}</p>
                        </div>
                      </div>
                      <ChevronRight size={16} className="text-muted-foreground group-hover:text-royal-indigo transition-colors" />
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}

          {/* Logout Button */}
          <Link
            href="/logout"
            className="w-full py-4 rounded-2xl bg-white border border-red-200 text-red-600 font-semibold text-sm flex items-center justify-center gap-2 hover:bg-red-50 transition-colors shadow-xs"
          >
            <LogOut size={16} /> Keluar dari Akun KAIROS
          </Link>
        </div>
      </div>
    </AppShell>
  );
}
