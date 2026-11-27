'use client';

import { useState } from 'react';
import { 
  CreditCard, 
  Check, 
  Sparkles, 
  Building2, 
  TrendingUp, 
  ShieldCheck, 
  Clock, 
  HelpCircle, 
  ArrowRight, 
  CheckCircle2, 
  FileText, 
  Download,
  AlertCircle,
  Zap,
  Users,
  ChevronRight,
  School,
  Briefcase
} from 'lucide-react';
import { AppShell } from '@/components/layouts/AppShell';
import { PageHeader } from '@/components/common/PageHeader';
import { useApp } from '@/lib/context/AppContext';
import { subscriptionPlans } from '@/lib/data/defaults';
import type { SubscriptionPlan } from '@/types';
import { formatDate } from '@/lib/utils';

export function PricingClient() {
  const { state, subscribePlan, cancelSubscription } = useApp();
  const { subscription, invoices, user } = state;

  const [activeTab, setActiveTab] = useState<'student' | 'campus' | 'bep'>('student');
  const [selectedPlan, setSelectedPlan] = useState<SubscriptionPlan | null>(null);
  const [paymentMethod, setPaymentMethod] = useState('qris');
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [checkoutSuccess, setCheckoutSuccess] = useState(false);

  // BEP Interactive Simulator State
  const [simulatedCampuses, setSimulatedCampuses] = useState(15);
  const [simulatedStudents, setSimulatedStudents] = useState(334);
  const [bepModel, setBepModel] = useState<'b2b2c' | 'b2c'>('b2b2c');

  // BEP calculations
  const fixedCost = 60000000; // Rp60 Juta / tahun

  // B2B2C calculations (per kampus)
  const b2b2cPrice = 5000000;
  const b2b2cVarCost = 1000000;
  const b2b2cMargin = 4000000;
  const b2b2cTotalRevenue = simulatedCampuses * b2b2cPrice;
  const b2b2cTotalCost = fixedCost + (simulatedCampuses * b2b2cVarCost);
  const b2b2cProfit = b2b2cTotalRevenue - b2b2cTotalCost;
  const b2b2cIsBEP = simulatedCampuses >= 15;

  // B2C calculations (per mahasiswa per tahun = 12 bulan)
  const b2cPriceAnnual = 20000 * 12; // 240.000 / thn
  const b2cVarCostAnnual = 5000 * 12; // 60.000 / thn
  const b2cTotalRevenue = simulatedStudents * b2cPriceAnnual;
  const b2cTotalCost = fixedCost + (simulatedStudents * b2cVarCostAnnual);
  const b2cProfit = b2cTotalRevenue - b2cTotalCost;
  const b2cIsBEP = simulatedStudents >= 334;

  const studentPlans = subscriptionPlans.filter(p => p.target === 'mahasiswa');
  const campusPlan = subscriptionPlans.find(p => p.target === 'kampus');

  const handleOpenCheckout = (plan: SubscriptionPlan) => {
    setSelectedPlan(plan);
    setIsCheckoutOpen(true);
    setCheckoutSuccess(false);
  };

  const handleConfirmPayment = () => {
    if (!selectedPlan) return;
    const methodNames: Record<string, string> = {
      qris: 'QRIS (GoPay / ShopeePay / OVO)',
      bca: 'BCA Virtual Account',
      mandiri: 'Mandiri Virtual Account',
      bri: 'BRI Virtual Account',
      card: 'Kartu Debit / Kredit Online',
    };
    subscribePlan(selectedPlan.id, methodNames[paymentMethod] || 'Transfer Virtual Account');
    setCheckoutSuccess(true);
    setTimeout(() => {
      setIsCheckoutOpen(false);
      setCheckoutSuccess(false);
    }, 1800);
  };

  return (
    <AppShell>
      <div className="min-h-screen bg-light-bg pb-12">
        <PageHeader
          title="Paket & Model Bisnis Keuangan"
          subtitle="Pilihan paket langganan mahasiswa, lisensi institusi kampus, & analisis titik impas (BEP)"
          showNotification
        />

        <div className="px-4 py-6 lg:px-8 max-w-6xl mx-auto space-y-6">
          {/* Active Subscription Banner */}
          <div className="rounded-3xl p-6 text-white shadow-md relative overflow-hidden"
            style={{ background: 'linear-gradient(135deg, #171747 0%, #211B70 60%, #302A91 100%)' }}>
            <div className="absolute -top-12 -right-12 h-44 w-44 rounded-full bg-white/5 pointer-events-none" />
            <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-2xl bg-white/10 backdrop-blur-md flex items-center justify-center shrink-0 border border-white/20">
                  <Sparkles size={24} className="text-champagne-gold" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-champagne-gold/20 text-champagne-gold border border-champagne-gold/30">
                      Status Aktif
                    </span>
                    <span className="text-xs text-white/60">Pengguna Terverifikasi</span>
                  </div>
                  <h2 className="text-xl font-bold font-heading mt-1">{subscription.planName}</h2>
                  <p className="text-xs text-white/70 mt-0.5">
                    Masa berlaku hingga: <strong>{formatDate(subscription.expiryDate)}</strong> · Metode: {subscription.paymentMethod}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={() => {
                    const plan6m = subscriptionPlans.find(p => p.id === 'plan-6m') || subscriptionPlans[3];
                    handleOpenCheckout(plan6m);
                  }}
                  className="px-4 py-2.5 rounded-xl bg-white text-midnight-navy font-bold text-xs hover:bg-champagne-gold transition-colors shadow-sm"
                >
                  Ubah / Perpanjang Paket
                </button>
                {subscription.autoRenew ? (
                  <button
                    onClick={cancelSubscription}
                    className="px-3.5 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white/80 text-xs font-semibold transition-colors"
                  >
                    Nonaktifkan Perpanjangan
                  </button>
                ) : (
                  <span className="text-xs text-white/50 italic px-2">Perpanjangan Otomatis Mati</span>
                )}
              </div>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="flex bg-white p-1.5 rounded-2xl border border-border shadow-2xs max-w-lg mx-auto">
            <button
              onClick={() => setActiveTab('student')}
              className={`flex-1 py-2.5 text-xs font-bold rounded-xl transition-all flex items-center justify-center gap-2 ${
                activeTab === 'student'
                  ? 'bg-royal-indigo text-white shadow-sm'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              <Zap size={14} /> Paket Mahasiswa (B2C)
            </button>
            <button
              onClick={() => setActiveTab('campus')}
              className={`flex-1 py-2.5 text-xs font-bold rounded-xl transition-all flex items-center justify-center gap-2 ${
                activeTab === 'campus'
                  ? 'bg-royal-indigo text-white shadow-sm'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              <Building2 size={14} /> Lisensi Kampus (B2B2C)
            </button>
            <button
              onClick={() => setActiveTab('bep')}
              className={`flex-1 py-2.5 text-xs font-bold rounded-xl transition-all flex items-center justify-center gap-2 ${
                activeTab === 'bep'
                  ? 'bg-royal-indigo text-white shadow-sm'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              <TrendingUp size={14} /> Simulator Titik Impas (BEP)
            </button>
          </div>

          {/* TAB 1: PAKET MAHASISWA (BERBAGAI DURASI BULAN) */}
          {activeTab === 'student' && (
            <div className="space-y-8 animate-fade-up">
              <div className="text-center max-w-xl mx-auto">
                <h3 className="text-2xl font-bold text-midnight-navy font-heading">
                  Pilih Durasi Paket Mahasiswa
                </h3>
                <p className="text-xs text-muted-foreground mt-1.5 leading-relaxed">
                  Tersedia opsi 1 bulan, 3 bulan, 6 bulan (1 semester), hingga 12 bulan dengan diskon bundling hingga 25%.
                </p>
              </div>

              {/* Plans Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {studentPlans.slice(1).map(plan => {
                  const isCurrent = subscription.planId === plan.id;
                  return (
                    <div
                      key={plan.id}
                      className={`bg-white rounded-3xl p-6 border-2 transition-all duration-200 flex flex-col justify-between relative ${
                        plan.popular
                          ? 'border-royal-indigo shadow-lg -translate-y-1'
                          : 'border-border shadow-xs hover:border-royal-indigo/40'
                      }`}
                    >
                      {plan.popular && (
                        <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full text-[10px] font-bold text-white shadow-sm"
                          style={{ background: 'linear-gradient(135deg, #171747, #302A91)' }}>
                          🔥 PILIHAN PALING POPULER
                        </div>
                      )}

                      <div>
                        <div className="flex items-center justify-between gap-2 mb-2">
                          <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-soft-indigo text-royal-indigo">
                            {plan.badge}
                          </span>
                          {plan.discountPercent && (
                            <span className="text-[10px] font-bold text-green-600 bg-green-50 px-2 py-0.5 rounded-full">
                              Hemat {plan.discountPercent}%
                            </span>
                          )}
                        </div>

                        <h4 className="text-base font-bold text-midnight-navy font-heading">{plan.name}</h4>
                        <p className="text-xs text-muted-foreground mt-0.5">{plan.durationLabel}</p>

                        <div className="my-4 pb-4 border-b border-border">
                          {plan.originalPrice && (
                            <div className="text-xs text-muted-foreground line-through">
                              Rp {plan.originalPrice.toLocaleString('id-ID')}
                            </div>
                          )}
                          <div className="flex items-baseline gap-1">
                            <span className="text-2xl font-bold text-midnight-navy font-heading">
                              Rp {plan.price.toLocaleString('id-ID')}
                            </span>
                            <span className="text-xs text-muted-foreground">/ {plan.months} bulan</span>
                          </div>
                          <p className="text-[11px] text-royal-indigo font-semibold mt-1">
                            Setara Rp {plan.monthlyEquivalent.toLocaleString('id-ID')} / bulan
                          </p>
                        </div>

                        <ul className="space-y-2.5 text-xs text-foreground/80 mb-6">
                          {plan.features.map((feat, i) => (
                            <li key={i} className="flex items-start gap-2">
                              <Check size={14} className="text-green-600 shrink-0 mt-0.5" />
                              <span>{feat}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <button
                        onClick={() => handleOpenCheckout(plan)}
                        className={`w-full py-3 rounded-xl font-bold text-xs transition-all flex items-center justify-center gap-1.5 shadow-xs ${
                          isCurrent
                            ? 'bg-green-100 text-green-700 cursor-default'
                            : plan.popular
                            ? 'bg-royal-indigo text-white hover:bg-deep-navy shadow-md'
                            : 'bg-light-bg text-royal-indigo border border-border hover:bg-soft-indigo'
                        }`}
                      >
                        {isCurrent ? (
                          <>
                            <CheckCircle2 size={14} /> Paket Sedang Aktif
                          </>
                        ) : (
                          <>
                            Pilih Paket Ini <ArrowRight size={14} />
                          </>
                        )}
                      </button>
                    </div>
                  );
                })}
              </div>

              {/* Free Plan Comparison */}
              <div className="bg-white rounded-3xl p-6 border border-border shadow-xs flex flex-col md:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-gray-100 flex items-center justify-center text-muted-foreground">
                    <Clock size={22} />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-midnight-navy">Paket Mahasiswa Gratis (Freemium)</h4>
                    <p className="text-xs text-muted-foreground">
                      Maksimal 5 tugas aktif, 2 kursus online, dan 1 dokumen portofolio. Bebas biaya selamanya sebagai pintu adopsi awal.
                    </p>
                  </div>
                </div>
                <span className="text-xs font-semibold px-4 py-2 rounded-xl bg-gray-100 text-muted-foreground shrink-0">
                  Paket Dasar Otomatis
                </span>
              </div>

              {/* Invoices History */}
              <div className="bg-white rounded-3xl p-6 border border-border shadow-xs space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-border">
                  <div className="flex items-center gap-2">
                    <FileText size={18} className="text-royal-indigo" />
                    <h4 className="text-sm font-bold text-midnight-navy font-heading">Riwayat Transaksi & Bukti Pembayaran</h4>
                  </div>
                  <span className="text-xs text-muted-foreground">{invoices.length} Faktur Tercatat</span>
                </div>

                <div className="divide-y divide-border overflow-x-auto">
                  <table className="w-full text-xs text-left">
                    <thead>
                      <tr className="text-muted-foreground font-semibold">
                        <th className="pb-2">No. Faktur</th>
                        <th className="pb-2">Paket Langganan</th>
                        <th className="pb-2">Tanggal</th>
                        <th className="pb-2">Metode Bayar</th>
                        <th className="pb-2">Total Biaya</th>
                        <th className="pb-2">Status</th>
                        <th className="pb-2 text-right">Aksi</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border">
                      {invoices.map(inv => (
                        <tr key={inv.id} className="text-foreground">
                          <td className="py-3 font-mono font-medium">{inv.invoiceNumber}</td>
                          <td className="py-3 font-semibold">{inv.planName}</td>
                          <td className="py-3 text-muted-foreground">{formatDate(inv.date)}</td>
                          <td className="py-3">{inv.paymentMethod}</td>
                          <td className="py-3 font-bold">Rp {inv.amount.toLocaleString('id-ID')}</td>
                          <td className="py-3">
                            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-green-50 text-green-700">
                              Lunas
                            </span>
                          </td>
                          <td className="py-3 text-right">
                            <button
                              onClick={() => alert(`Unduhan bukti pembayaran ${inv.invoiceNumber} berhasil disimulasikan!`)}
                              className="text-royal-indigo hover:underline font-semibold inline-flex items-center gap-1"
                            >
                              <Download size={12} /> Unduh
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: LISENSI KAMPUS (B2B2C - SESUAI LAPORAN BISNIS UTS) */}
          {activeTab === 'campus' && (
            <div className="space-y-6 animate-fade-up">
              <div className="bg-white rounded-3xl p-6 lg:p-10 border border-border shadow-xs">
                <div className="max-w-2xl">
                  <span className="text-xs uppercase font-bold tracking-widest text-royal-indigo px-2.5 py-1 rounded-full bg-soft-indigo">
                    Model Pendapatan Terpilih (Laporan UTS Hal 12)
                  </span>
                  <h3 className="text-2xl font-bold text-midnight-navy font-heading mt-3">
                    Lisensi B2B2C Institusi Kampus
                  </h3>
                  <p className="text-xs text-muted-foreground mt-2 leading-relaxed">
                    Sesuai riset validasi bisnis KAIROS: 9 dari 10 responden mahasiswa hanya memakai versi gratis. Karena itu, model B2B2C dipilih karena pembayar jelas (Institusi Kampus / Biro Kemahasiswaan / Career Center) dengan pendapatan berulang tahunan yang stabil.
                  </p>
                </div>

                <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
                  {/* Card 1: Paket Kampus Standar */}
                  <div className="rounded-3xl p-6 border-2 border-royal-indigo bg-soft-indigo/20 flex flex-col justify-between">
                    <div>
                      <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-royal-indigo text-white">
                        Rekomendasi Utama
                      </span>
                      <h4 className="text-lg font-bold text-midnight-navy font-heading mt-2">
                        Lisensi Program Studi (D4/S1 TI)
                      </h4>
                      <p className="text-xs text-muted-foreground mt-0.5">Kapasitas hingga 500 Mahasiswa</p>

                      <div className="my-4 pb-4 border-b border-royal-indigo/20">
                        <div className="text-2xl font-bold text-midnight-navy font-heading">
                          Rp 5.000.000
                        </div>
                        <span className="text-xs text-muted-foreground">/ tahun / prodi (Setara Rp10.000 / mahasiswa / tahun)</span>
                      </div>

                      <ul className="space-y-2 text-xs text-foreground/80 mb-6">
                        <li className="flex items-start gap-2">
                          <Check size={14} className="text-royal-indigo shrink-0 mt-0.5" />
                          <span>500 Akun Mahasiswa KAIROS Pro Aktif</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <Check size={14} className="text-royal-indigo shrink-0 mt-0.5" />
                          <span>Dasbor Pemantauan Progres Magang & Karier</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <Check size={14} className="text-royal-indigo shrink-0 mt-0.5" />
                          <span>Broadcast Terverifikasi Kalender Akademik</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <Check size={14} className="text-royal-indigo shrink-0 mt-0.5" />
                          <span>Laporan Kesiapan Kerja Lulusan untuk Akreditasi</span>
                        </li>
                      </ul>
                    </div>

                    <button
                      onClick={() => alert('Permintaan informasi penawaran lisensi institusi kampus diteruskan ke tim partnership KAIROS.')}
                      className="w-full py-3 rounded-xl bg-royal-indigo text-white font-bold text-xs hover:bg-deep-navy transition-colors"
                    >
                      Ajukan Kemitraan Kampus
                    </button>
                  </div>

                  {/* Card 2: Paket Fakultas */}
                  <div className="bg-white rounded-3xl p-6 border border-border shadow-xs flex flex-col justify-between">
                    <div>
                      <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-light-bg text-muted-foreground">
                        Multi-Prodi
                      </span>
                      <h4 className="text-lg font-bold text-midnight-navy font-heading mt-2">
                        Lisensi Fakultas Vokasi / Teknik
                      </h4>
                      <p className="text-xs text-muted-foreground mt-0.5">Kapasitas hingga 1.500 Mahasiswa</p>

                      <div className="my-4 pb-4 border-b border-border">
                        <div className="text-2xl font-bold text-midnight-navy font-heading">
                          Rp 12.000.000
                        </div>
                        <span className="text-xs text-muted-foreground">/ tahun / fakultas</span>
                      </div>

                      <ul className="space-y-2 text-xs text-foreground/80 mb-6">
                        <li className="flex items-start gap-2">
                          <Check size={14} className="text-green-600 shrink-0 mt-0.5" />
                          <span>1.500 Akun Mahasiswa Multi-Prodi</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <Check size={14} className="text-green-600 shrink-0 mt-0.5" />
                          <span>Integrasi Single Sign-On (SSO) Kampus</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <Check size={14} className="text-green-600 shrink-0 mt-0.5" />
                          <span>Dukungan Teknis Prioritas 24/7</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <Check size={14} className="text-green-600 shrink-0 mt-0.5" />
                          <span>Pelatihan Admin & Dosen Pembimbing</span>
                        </li>
                      </ul>
                    </div>

                    <button
                      onClick={() => alert('Proposal kemitraan tingkat fakultas berhasil dikirimkan ke email kontak.')}
                      className="w-full py-3 rounded-xl border border-border text-foreground font-bold text-xs hover:bg-light-bg transition-colors"
                    >
                      Hubungi Sales Institusi
                    </button>
                  </div>

                  {/* Card 3: Talent Pool Access Perusahaan */}
                  <div className="bg-white rounded-3xl p-6 border border-border shadow-xs flex flex-col justify-between">
                    <div>
                      <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-amber-50 text-amber-700">
                        B2B2C Talent
                      </span>
                      <h4 className="text-lg font-bold text-midnight-navy font-heading mt-2">
                        Kemitraan Perusahaan & HRD
                      </h4>
                      <p className="text-xs text-muted-foreground mt-0.5">Akses Talenta IT Terverifikasi</p>

                      <div className="my-4 pb-4 border-b border-border">
                        <div className="text-2xl font-bold text-midnight-navy font-heading">
                          Rp 15.000.000
                        </div>
                        <span className="text-xs text-muted-foreground">/ tahun / mitra industri</span>
                      </div>

                      <ul className="space-y-2 text-xs text-foreground/80 mb-6">
                        <li className="flex items-start gap-2">
                          <Check size={14} className="text-amber-600 shrink-0 mt-0.5" />
                          <span>Akses Database Portofolio Mahasiswa Siap Kerja</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <Check size={14} className="text-amber-600 shrink-0 mt-0.5" />
                          <span>Posting Lowongan Magang Prioritas Utama</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <Check size={14} className="text-amber-600 shrink-0 mt-0.5" />
                          <span>Direct Message / Undangan Wawancara Cepat</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <Check size={14} className="text-amber-600 shrink-0 mt-0.5" />
                          <span>Branding Booth pada Event Virtual KAIROS</span>
                        </li>
                      </ul>
                    </div>

                    <button
                      onClick={() => alert('Formulir kemitraan rekrutmen perusahaan telah dicatat.')}
                      className="w-full py-3 rounded-xl border border-border text-foreground font-bold text-xs hover:bg-light-bg transition-colors"
                    >
                      Bermitra sebagai Perusahaan
                    </button>
                  </div>
                </div>
              </div>

              {/* Data Ukuran Pasar Sesuai Laporan UTS */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
                <div className="p-4 rounded-2xl bg-white border border-border">
                  <span className="text-xs text-muted-foreground block">Total PT Informatika (TAM)</span>
                  <strong className="text-lg font-bold text-midnight-navy font-heading">± 620 Kampus</strong>
                  <span className="text-[10px] text-muted-foreground block">Data APTIKOM</span>
                </div>
                <div className="p-4 rounded-2xl bg-white border border-border">
                  <span className="text-xs text-muted-foreground block">Target Pasar (SAM)</span>
                  <strong className="text-lg font-bold text-midnight-navy font-heading">124 Kampus</strong>
                  <span className="text-[10px] text-muted-foreground block">20% dari TAM (Akreditasi Unggul)</span>
                </div>
                <div className="p-4 rounded-2xl bg-white border border-border">
                  <span className="text-xs text-muted-foreground block">Titik Impas (SOM)</span>
                  <strong className="text-lg font-bold text-royal-indigo font-heading">15 Kampus</strong>
                  <span className="text-[10px] text-muted-foreground block">12,1% dari SAM (Rp75 Juta)</span>
                </div>
                <div className="p-4 rounded-2xl bg-white border border-border">
                  <span className="text-xs text-muted-foreground block">Kapasitas Akun Terlayani</span>
                  <strong className="text-lg font-bold text-green-600 font-heading">7.500 Mahasiswa</strong>
                  <span className="text-[10px] text-muted-foreground block">15 Kampus × 500 Akun</span>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: SIMULATOR TITIK IMPAS (BEP) INTERAKTIF */}
          {activeTab === 'bep' && (
            <div className="space-y-6 animate-fade-up">
              {/* Header Box */}
              <div className="bg-white rounded-3xl p-6 lg:p-8 border border-border shadow-xs">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-border">
                  <div>
                    <span className="text-xs uppercase font-bold tracking-wider px-2.5 py-1 rounded-full bg-soft-indigo text-royal-indigo">
                      Simulasi Bisnis & Keuangan (Hal 12 Laporan UTS)
                    </span>
                    <h3 className="text-2xl font-bold text-midnight-navy font-heading mt-2">
                      Kalkulator Interaktif Titik Impas (Break-Even Point)
                    </h3>
                    <p className="text-xs text-muted-foreground mt-1">
                      Uji sensitivitas model pendapatan KAIROS antara B2B2C (Lisensi Kampus) dan B2C (Langganan Mahasiswa).
                    </p>
                  </div>

                  <div className="flex bg-light-bg p-1 rounded-xl border border-border shrink-0">
                    <button
                      onClick={() => setBepModel('b2b2c')}
                      className={`px-4 py-2 text-xs font-bold rounded-lg transition-all ${
                        bepModel === 'b2b2c' ? 'bg-royal-indigo text-white shadow-xs' : 'text-muted-foreground'
                      }`}
                    >
                      Model 2: B2B2C (Terpilih)
                    </button>
                    <button
                      onClick={() => setBepModel('b2c')}
                      className={`px-4 py-2 text-xs font-bold rounded-lg transition-all ${
                        bepModel === 'b2c' ? 'bg-royal-indigo text-white shadow-xs' : 'text-muted-foreground'
                      }`}
                    >
                      Model 1: B2C (Langganan)
                    </button>
                  </div>
                </div>

                {/* Simulator Body */}
                <div className="pt-6 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                  {/* Left Column: Sliders & Controls */}
                  <div className="lg:col-span-5 space-y-6">
                    {bepModel === 'b2b2c' ? (
                      <div>
                        <div className="flex justify-between items-center mb-2">
                          <label className="text-xs font-bold text-midnight-navy">
                            Simulasi Jumlah Kampus Mitra:
                          </label>
                          <span className="text-base font-bold text-royal-indigo font-heading px-3 py-1 bg-soft-indigo rounded-xl">
                            {simulatedCampuses} Kampus
                          </span>
                        </div>
                        <input
                          type="range"
                          min={1}
                          max={30}
                          step={1}
                          value={simulatedCampuses}
                          onChange={e => setSimulatedCampuses(Number(e.target.value))}
                          className="w-full accent-royal-indigo cursor-pointer"
                        />
                        <div className="flex justify-between text-[11px] text-muted-foreground mt-1">
                          <span>1 Kampus</span>
                          <span className="font-bold text-royal-indigo">15 Kampus (BEP)</span>
                          <span>30 Kampus</span>
                        </div>

                        <div className="mt-4 p-4 rounded-2xl bg-light-bg border border-border space-y-2 text-xs">
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Harga Lisensi:</span>
                            <span className="font-semibold">Rp 5.000.000 / kampus / tahun</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Biaya Variabel:</span>
                            <span className="font-semibold">Rp 1.000.000 / kampus / tahun</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Margin Kontribusi:</span>
                            <span className="font-bold text-royal-indigo">Rp 4.000.000 / kampus</span>
                          </div>
                          <div className="flex justify-between border-t border-border pt-2">
                            <span className="text-muted-foreground">Biaya Tetap (Server & Tim):</span>
                            <span className="font-semibold">Rp 60.000.000 / tahun</span>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div>
                        <div className="flex justify-between items-center mb-2">
                          <label className="text-xs font-bold text-midnight-navy">
                            Simulasi Mahasiswa Langganan 12 Bulan:
                          </label>
                          <span className="text-base font-bold text-royal-indigo font-heading px-3 py-1 bg-soft-indigo rounded-xl">
                            {simulatedStudents} Mahasiswa
                          </span>
                        </div>
                        <input
                          type="range"
                          min={50}
                          max={600}
                          step={10}
                          value={simulatedStudents}
                          onChange={e => setSimulatedStudents(Number(e.target.value))}
                          className="w-full accent-royal-indigo cursor-pointer"
                        />
                        <div className="flex justify-between text-[11px] text-muted-foreground mt-1">
                          <span>50 Mahasiswa</span>
                          <span className="font-bold text-royal-indigo">334 Mahasiswa (BEP)</span>
                          <span>600 Mahasiswa</span>
                        </div>

                        <div className="mt-4 p-4 rounded-2xl bg-light-bg border border-border space-y-2 text-xs">
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Harga per Bulan:</span>
                            <span className="font-semibold">Rp 20.000 / mahasiswa</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Biaya Variabel:</span>
                            <span className="font-semibold">Rp 5.000 / mahasiswa</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Margin Kontribusi:</span>
                            <span className="font-bold text-royal-indigo">Rp 15.000 / bulan</span>
                          </div>
                          <div className="flex justify-between border-t border-border pt-2">
                            <span className="text-muted-foreground">Biaya Tetap Tahunan:</span>
                            <span className="font-semibold">Rp 60.000.000 / tahun</span>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Right Column: Visual Metrics & Status */}
                  <div className="lg:col-span-7 bg-light-bg rounded-3xl p-6 border border-border space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                        Hasil Perhitungan Finansial
                      </span>
                      {bepModel === 'b2b2c' ? (
                        b2b2cIsBEP ? (
                          <span className="px-3 py-1 rounded-full text-xs font-bold bg-green-100 text-green-700 flex items-center gap-1">
                            <CheckCircle2 size={14} /> Di Atas Titik Impas (Profit)
                          </span>
                        ) : (
                          <span className="px-3 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-800 flex items-center gap-1">
                            <AlertCircle size={14} /> Belum Capai Titik Impas (Defisit)
                          </span>
                        )
                      ) : (
                        b2cIsBEP ? (
                          <span className="px-3 py-1 rounded-full text-xs font-bold bg-green-100 text-green-700 flex items-center gap-1">
                            <CheckCircle2 size={14} /> Di Atas Titik Impas (Profit)
                          </span>
                        ) : (
                          <span className="px-3 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-800 flex items-center gap-1">
                            <AlertCircle size={14} /> Belum Capai Titik Impas (Defisit)
                          </span>
                        )
                      )}
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div className="p-4 rounded-2xl bg-white border border-border">
                        <span className="text-xs text-muted-foreground block">Total Pendapatan</span>
                        <strong className="text-lg font-bold text-midnight-navy font-heading">
                          Rp {bepModel === 'b2b2c' ? b2b2cTotalRevenue.toLocaleString('id-ID') : b2cTotalRevenue.toLocaleString('id-ID')}
                        </strong>
                      </div>
                      <div className="p-4 rounded-2xl bg-white border border-border">
                        <span className="text-xs text-muted-foreground block">Total Biaya Operasional</span>
                        <strong className="text-lg font-bold text-foreground font-heading">
                          Rp {bepModel === 'b2b2c' ? b2b2cTotalCost.toLocaleString('id-ID') : b2cTotalCost.toLocaleString('id-ID')}
                        </strong>
                      </div>
                    </div>

                    <div className={`p-4 rounded-2xl border ${
                      (bepModel === 'b2b2c' ? b2b2cProfit >= 0 : b2cProfit >= 0)
                        ? 'bg-green-50 border-green-200'
                        : 'bg-red-50 border-red-200'
                    }`}>
                      <div className="flex justify-between items-center">
                        <div>
                          <span className="text-xs font-semibold block text-foreground">
                            { (bepModel === 'b2b2c' ? b2b2cProfit >= 0 : b2cProfit >= 0) ? 'Laba Bersih Tahunan' : 'Kekurangan Pendapatan' }
                          </span>
                          <span className="text-xs text-muted-foreground">
                            {bepModel === 'b2b2c' ? `${simulatedCampuses} dari target 15 kampus` : `${simulatedStudents} dari target 334 mahasiswa`}
                          </span>
                        </div>
                        <div className={`text-xl font-bold font-heading ${
                          (bepModel === 'b2b2c' ? b2b2cProfit >= 0 : b2cProfit >= 0) ? 'text-green-700' : 'text-red-600'
                        }`}>
                          {bepModel === 'b2b2c' 
                            ? `${b2b2cProfit >= 0 ? '+' : ''}Rp ${b2b2cProfit.toLocaleString('id-ID')}`
                            : `${b2cProfit >= 0 ? '+' : ''}Rp ${b2cProfit.toLocaleString('id-ID')}`
                          }
                        </div>
                      </div>
                    </div>

                    {/* Quick Explanation from Report */}
                    <p className="text-xs text-muted-foreground leading-relaxed pt-2 border-t border-border">
                      💡 <strong>Kesimpulan Laporan:</strong> Model B2B2C hanya membutuhkan 15 kontrak kampus (cukup 2,4% dari total kampus TI Indonesia) untuk mencapai BEP Rp75 Juta, sementara model B2C membutuhkan 11.100 pengguna aktif dengan tingkat konversi 3% yang jauh lebih berisiko.
                    </p>
                  </div>
                </div>
              </div>

              {/* Comparison Table direct from Page 12 Report */}
              <div className="bg-white rounded-3xl p-6 border border-border shadow-xs overflow-x-auto">
                <h4 className="text-sm font-bold text-midnight-navy font-heading mb-4">
                  Tabel 17. Perbandingan Dua Alternatif Model Pendapatan (Laporan UTS)
                </h4>
                <table className="w-full text-xs text-left">
                  <thead>
                    <tr className="border-b border-border text-muted-foreground font-bold">
                      <th className="py-2.5">Komponen</th>
                      <th className="py-2.5">Alternatif 1 · B2C (Langganan Mahasiswa)</th>
                      <th className="py-2.5 bg-soft-indigo/50 text-royal-indigo rounded-t-xl px-3">Alternatif 2 · B2B2C (Lisensi Kampus)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    <tr>
                      <td className="py-2.5 font-semibold text-muted-foreground">Pembayar</td>
                      <td className="py-2.5">Mahasiswa (langganan premium)</td>
                      <td className="py-2.5 bg-soft-indigo/20 px-3 font-semibold text-royal-indigo">Kampus (lisensi institusi, ≤ 500 mahasiswa)</td>
                    </tr>
                    <tr>
                      <td className="py-2.5 font-semibold text-muted-foreground">Harga</td>
                      <td className="py-2.5">Rp20.000 / bulan / mahasiswa</td>
                      <td className="py-2.5 bg-soft-indigo/20 px-3 font-bold text-royal-indigo">Rp5.000.000 / tahun / kampus</td>
                    </tr>
                    <tr>
                      <td className="py-2.5 font-semibold text-muted-foreground">Biaya Variabel</td>
                      <td className="py-2.5">Rp5.000 / bulan / mahasiswa</td>
                      <td className="py-2.5 bg-soft-indigo/20 px-3">Rp1.000.000 / tahun / kampus</td>
                    </tr>
                    <tr>
                      <td className="py-2.5 font-semibold text-muted-foreground">Margin Kontribusi</td>
                      <td className="py-2.5">Rp15.000 / bulan / mahasiswa</td>
                      <td className="py-2.5 bg-soft-indigo/20 px-3 font-bold">Rp4.000.000 / tahun / kampus</td>
                    </tr>
                    <tr>
                      <td className="py-2.5 font-semibold text-muted-foreground">Biaya Tetap</td>
                      <td className="py-2.5">Rp60.000.000 / tahun</td>
                      <td className="py-2.5 bg-soft-indigo/20 px-3">Rp60.000.000 / tahun</td>
                    </tr>
                    <tr>
                      <td className="py-2.5 font-semibold text-muted-foreground">Titik Impas (BEP)</td>
                      <td className="py-2.5">4.000 langganan-bulan ≈ 334 mahasiswa (12 bln)</td>
                      <td className="py-2.5 bg-soft-indigo/20 px-3 font-bold text-royal-indigo">15 Kampus (Rp75.000.000)</td>
                    </tr>
                    <tr>
                      <td className="py-2.5 font-semibold text-muted-foreground">Basis Pengguna Dibutuhkan</td>
                      <td className="py-2.5">≈ 11.100 pengguna aktif (konversi 3%)</td>
                      <td className="py-2.5 bg-soft-indigo/20 px-3">≈ 7.500 akun (15 kampus × 500)</td>
                    </tr>
                    <tr className="border-t-2 border-border">
                      <td className="py-3 font-bold">Keputusan Tim</td>
                      <td className="py-3 font-bold text-red-600">TIDAK DIPILIH</td>
                      <td className="py-3 bg-green-100 text-green-800 font-bold px-3 rounded-b-xl">
                        DIPILIH (MODEL FINAL)
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* CHECKOUT & PAYMENT MODAL */}
      {isCheckoutOpen && selectedPlan && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-fade-in">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-border animate-slide-up">
            {checkoutSuccess ? (
              <div className="text-center py-8 space-y-3">
                <div className="w-16 h-16 rounded-full bg-green-100 text-green-600 flex items-center justify-center mx-auto">
                  <CheckCircle2 size={36} />
                </div>
                <h3 className="text-xl font-bold text-midnight-navy font-heading">Pembayaran Berhasil!</h3>
                <p className="text-xs text-muted-foreground max-w-xs mx-auto">
                  Selamat, <strong>{selectedPlan.name}</strong> Anda kini telah aktif. Invoice dan rincian transaksi telah disimpan.
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-border">
                  <div>
                    <h3 className="text-base font-bold text-midnight-navy font-heading">Konfirmasi Langganan</h3>
                    <p className="text-xs text-muted-foreground">Pilih metode pembayaran yang mudah</p>
                  </div>
                  <button
                    onClick={() => setIsCheckoutOpen(false)}
                    className="text-muted-foreground hover:text-foreground text-sm font-bold p-1"
                  >
                    ✕
                  </button>
                </div>

                {/* Plan Summary */}
                <div className="p-4 rounded-2xl bg-soft-indigo/30 border border-soft-indigo space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-sm text-midnight-navy">{selectedPlan.name}</span>
                    <span className="text-xs font-bold text-royal-indigo">{selectedPlan.durationLabel}</span>
                  </div>
                  <div className="flex justify-between items-baseline pt-1">
                    <span className="text-xs text-muted-foreground">Total Tagihan:</span>
                    <span className="text-lg font-bold text-royal-indigo font-heading">
                      Rp {selectedPlan.price.toLocaleString('id-ID')}
                    </span>
                  </div>
                </div>

                {/* Payment Method Selector */}
                <div className="space-y-2">
                  <label className="text-xs font-bold text-midnight-navy block">Metode Pembayaran:</label>
                  <div className="space-y-1.5">
                    {[
                      { id: 'qris', name: 'QRIS (GoPay, OVO, ShopeePay, Dana, LinkAja)', badge: 'Instan' },
                      { id: 'bca', name: 'BCA Virtual Account', badge: 'Otomatis' },
                      { id: 'mandiri', name: 'Mandiri Virtual Account', badge: 'Otomatis' },
                      { id: 'bri', name: 'BRI Virtual Account', badge: 'Otomatis' },
                      { id: 'card', name: 'Kartu Debit / Kredit (Visa / Mastercard)', badge: 'Aman' },
                    ].map(method => (
                      <label
                        key={method.id}
                        className={`flex items-center justify-between p-3 rounded-xl border cursor-pointer transition-all ${
                          paymentMethod === method.id
                            ? 'border-royal-indigo bg-soft-indigo/20 shadow-2xs'
                            : 'border-border hover:border-royal-indigo/40'
                        }`}
                      >
                        <div className="flex items-center gap-2.5">
                          <input
                            type="radio"
                            name="payment"
                            value={method.id}
                            checked={paymentMethod === method.id}
                            onChange={() => setPaymentMethod(method.id)}
                            className="accent-royal-indigo"
                          />
                          <span className="text-xs font-medium text-foreground">{method.name}</span>
                        </div>
                        <span className="text-[10px] font-semibold text-royal-indigo px-2 py-0.5 rounded bg-white border border-border">
                          {method.badge}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Action buttons */}
                <div className="pt-3 flex gap-2">
                  <button
                    onClick={() => setIsCheckoutOpen(false)}
                    className="flex-1 py-3 rounded-xl border border-border text-xs font-semibold text-muted-foreground hover:bg-light-bg transition-colors"
                  >
                    Batal
                  </button>
                  <button
                    onClick={handleConfirmPayment}
                    className="flex-2 py-3 rounded-xl bg-royal-indigo text-white text-xs font-bold hover:bg-deep-navy transition-colors shadow-sm flex items-center justify-center gap-1.5"
                  >
                    <ShieldCheck size={16} /> Bayar Rp {selectedPlan.price.toLocaleString('id-ID')}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </AppShell>
  );
}
