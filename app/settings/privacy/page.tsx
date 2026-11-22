'use client';

import { useState } from 'react';
import { Shield, Eye, Database, Lock, Download, Trash2, CheckCircle2 } from 'lucide-react';
import { AppShell } from '@/components/layouts/AppShell';
import { PageHeader } from '@/components/common/PageHeader';

export default function PrivacySettingsPage() {
  const [publicPortfolio, setPublicPortfolio] = useState(true);
  const [shareAchievements, setShareAchievements] = useState(true);
  const [analyticsConsent, setAnalyticsConsent] = useState(false);
  const [cleared, setCleared] = useState(false);

  const handleExportData = () => {
    const data = localStorage.getItem('kairos-app-data') || '{}';
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `kairos-backup-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
  };

  const handleClearDemoData = () => {
    if (confirm('Yakin ingin mereset data lokal ke bawaan demo?')) {
      localStorage.removeItem('kairos-app-data');
      setCleared(true);
      setTimeout(() => window.location.reload(), 1000);
    }
  };

  return (
    <AppShell>
      <div className="min-h-screen bg-light-bg">
        <PageHeader title="Privasi & Data" showBack backHref="/settings" />

        <div className="px-4 py-6 lg:px-8 max-w-3xl space-y-6">
          {cleared && (
            <div className="p-3.5 rounded-2xl bg-green-50 border border-green-200 text-green-700 text-xs flex items-center gap-2">
              <CheckCircle2 size={16} /> Data berhasil direset! Memuat ulang...
            </div>
          )}

          {/* Visibility */}
          <div className="bg-white rounded-3xl p-6 lg:p-8 border border-border shadow-xs space-y-4">
            <h2 className="text-sm font-bold text-midnight-navy font-heading uppercase tracking-wider mb-2">
              Visibilitas Portofolio Publik
            </h2>

            <div className="space-y-4">
              <div className="flex items-center justify-between py-2 border-b border-border">
                <div>
                  <h3 className="text-xs font-bold text-foreground">Izinkan Akses Publik Portofolio</h3>
                  <p className="text-[11px] text-muted-foreground">Siapa saja yang memiliki link dapat melihat ringkasan portofoliomu</p>
                </div>
                <input
                  type="checkbox"
                  checked={publicPortfolio}
                  onChange={() => setPublicPortfolio(!publicPortfolio)}
                  className="w-5 h-5 accent-royal-indigo cursor-pointer"
                />
              </div>

              <div className="flex items-center justify-between py-2">
                <div>
                  <h3 className="text-xs font-bold text-foreground">Tampilkan Sertifikasi Terverifikasi</h3>
                  <p className="text-[11px] text-muted-foreground">Tampilkan lencana sertifikat pada halaman preview portofolio</p>
                </div>
                <input
                  type="checkbox"
                  checked={shareAchievements}
                  onChange={() => setShareAchievements(!shareAchievements)}
                  className="w-5 h-5 accent-royal-indigo cursor-pointer"
                />
              </div>
            </div>
          </div>

          {/* Data Management */}
          <div className="bg-white rounded-3xl p-6 lg:p-8 border border-border shadow-xs space-y-4">
            <h2 className="text-sm font-bold text-midnight-navy font-heading uppercase tracking-wider mb-2">
              Manajemen Data Lokal (LocalStorage)
            </h2>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Seluruh data aktivitas demo disimpan secara aman di peramban lokal perangkatmu tanpa ketergantungan API eksternal berbayar.
            </p>

            <div className="pt-2 flex flex-col sm:flex-row gap-3">
              <button
                onClick={handleExportData}
                className="flex-1 py-3 rounded-xl border border-border bg-white text-xs font-semibold text-foreground hover:bg-light-bg flex items-center justify-center gap-2 transition-colors"
              >
                <Download size={15} /> Cadangkan Data (JSON)
              </button>
              <button
                onClick={handleClearDemoData}
                className="flex-1 py-3 rounded-xl border border-red-200 bg-red-50 text-xs font-semibold text-red-600 hover:bg-red-100 flex items-center justify-center gap-2 transition-colors"
              >
                <Trash2 size={15} /> Reset ke Data Default Demo
              </button>
            </div>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
