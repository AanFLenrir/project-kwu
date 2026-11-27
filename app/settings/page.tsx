'use client';

import { useState } from 'react';
import Link from 'next/link';
import { KeyRound, Smartphone, Globe, Moon, Bell, Shield, ChevronRight, CheckCircle2, CreditCard } from 'lucide-react';
import { AppShell } from '@/components/layouts/AppShell';
import { PageHeader } from '@/components/common/PageHeader';
import { useApp } from '@/lib/context/AppContext';

export default function AccountSettingsPage() {
  const { state } = useApp();
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [success, setSuccess] = useState(false);

  const handlePasswordChange = (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword && newPassword === confirmPassword) {
      setSuccess(true);
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
      setTimeout(() => setSuccess(false), 3000);
    }
  };

  return (
    <AppShell>
      <div className="min-h-screen bg-light-bg">
        <PageHeader title="Pengaturan Akun" showBack backHref="/profile" />

        <div className="px-4 py-6 lg:px-8 max-w-4xl space-y-6">
          {/* Quick links */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <Link
              href="/pricing"
              className="p-4 rounded-2xl bg-white border border-border shadow-xs hover:border-royal-indigo/50 transition-colors flex items-center justify-between"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-soft-indigo text-royal-indigo flex items-center justify-center">
                  <CreditCard size={18} />
                </div>
                <div>
                  <h3 className="font-bold text-xs text-foreground">Paket & Keuangan</h3>
                  <p className="text-[11px] text-muted-foreground">{state.subscription.planName.split('(')[0]}</p>
                </div>
              </div>
              <ChevronRight size={16} className="text-muted-foreground" />
            </Link>

            <Link
              href="/settings/notifications"
              className="p-4 rounded-2xl bg-white border border-border shadow-xs hover:border-royal-indigo/50 transition-colors flex items-center justify-between"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-soft-indigo text-royal-indigo flex items-center justify-center">
                  <Bell size={18} />
                </div>
                <div>
                  <h3 className="font-bold text-xs text-foreground">Notifikasi</h3>
                  <p className="text-[11px] text-muted-foreground">Pengingat deadline & info</p>
                </div>
              </div>
              <ChevronRight size={16} className="text-muted-foreground" />
            </Link>

            <Link
              href="/settings/privacy"
              className="p-4 rounded-2xl bg-white border border-border shadow-xs hover:border-royal-indigo/50 transition-colors flex items-center justify-between"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-soft-indigo text-royal-indigo flex items-center justify-center">
                  <Shield size={18} />
                </div>
                <div>
                  <h3 className="font-bold text-xs text-foreground">Privasi</h3>
                  <p className="text-[11px] text-muted-foreground">Keamanan & data akun</p>
                </div>
              </div>
              <ChevronRight size={16} className="text-muted-foreground" />
            </Link>
          </div>

          {/* Change Password Form */}
          <form onSubmit={handlePasswordChange} className="bg-white rounded-3xl p-6 lg:p-8 border border-border shadow-xs space-y-4">
            <div className="flex items-center gap-3 text-midnight-navy pb-3 border-b border-border">
              <KeyRound size={20} className="text-royal-indigo" />
              <div>
                <h2 className="text-sm font-bold font-heading">Ubah Kata Sandi</h2>
                <p className="text-xs text-muted-foreground">Pastikan menggunakan kombinasi kata sandi yang aman</p>
              </div>
            </div>

            {success && (
              <div className="p-3 rounded-xl bg-green-50 border border-green-200 text-green-700 text-xs flex items-center gap-2">
                <CheckCircle2 size={16} /> Kata sandi Anda berhasil diperbarui!
              </div>
            )}

            <div>
              <label className="text-xs font-semibold text-muted-foreground block mb-1.5">Kata Sandi Saat Ini</label>
              <input
                type="password"
                value={currentPassword}
                onChange={e => setCurrentPassword(e.target.value)}
                className="w-full rounded-xl border border-border p-3 text-sm focus:border-royal-indigo focus:outline-none"
                placeholder="••••••••"
                required
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-semibold text-muted-foreground block mb-1.5">Kata Sandi Baru</label>
                <input
                  type="password"
                  value={newPassword}
                  onChange={e => setNewPassword(e.target.value)}
                  className="w-full rounded-xl border border-border p-3 text-sm focus:border-royal-indigo focus:outline-none"
                  placeholder="Min. 8 karakter"
                  required
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-muted-foreground block mb-1.5">Konfirmasi Sandi Baru</label>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={e => setConfirmPassword(e.target.value)}
                  className="w-full rounded-xl border border-border p-3 text-sm focus:border-royal-indigo focus:outline-none"
                  placeholder="Ulangi sandi baru"
                  required
                />
              </div>
            </div>

            <div className="flex justify-end pt-2">
              <button
                type="submit"
                className="px-5 py-2.5 rounded-xl bg-royal-indigo text-white font-semibold text-xs hover:bg-deep-navy transition-colors"
              >
                Perbarui Kata Sandi
              </button>
            </div>
          </form>

          {/* Preferences */}
          <div className="bg-white rounded-3xl p-6 border border-border shadow-xs space-y-4">
            <h3 className="text-sm font-bold text-midnight-navy font-heading">Preferensi Aplikasi</h3>
            <div className="divide-y divide-border text-sm">
              <div className="py-3 flex items-center justify-between">
                <div>
                  <h4 className="font-semibold text-xs text-foreground">Bahasa Tampilan</h4>
                  <p className="text-[11px] text-muted-foreground">Bahasa sistem dan format tanggal</p>
                </div>
                <span className="text-xs font-bold text-royal-indigo px-3 py-1 rounded-lg bg-soft-indigo">
                  Bahasa Indonesia
                </span>
              </div>

              <div className="py-3 flex items-center justify-between">
                <div>
                  <h4 className="font-semibold text-xs text-foreground">Sinkronisasi Kalender</h4>
                  <p className="text-[11px] text-muted-foreground">Ekspor event ke Google Calendar</p>
                </div>
                <span className="text-xs font-semibold text-green-600 bg-green-50 px-2.5 py-1 rounded-lg">
                  Tersambung
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
