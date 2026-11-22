'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Eye, EyeOff, Sparkles, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/utils';

export default function LoginPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ email: 'anhaz@student.unair.ac.id', password: 'kairos2024' });
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (!form.email || !form.password) {
      setError('Email dan password wajib diisi.');
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      router.push('/dashboard');
    }, 1200);
  };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row">
      {/* Left Panel - Desktop only */}
      <div className="hidden lg:flex lg:w-1/2 flex-col items-center justify-center relative overflow-hidden p-12"
        style={{ background: 'linear-gradient(160deg, #171747 0%, #211B70 60%, #302A91 100%)' }}>
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-24 -right-24 h-72 w-72 rounded-full bg-white/5" />
          <div className="absolute bottom-24 -left-16 h-56 w-56 rounded-full bg-white/5" />
          <div className="absolute top-1/2 right-16 h-32 w-32 rounded-full bg-white/5" />
        </div>
        <div className="relative z-10 text-center">
          <div className="mb-8 flex h-24 w-24 mx-auto items-center justify-center rounded-3xl"
            style={{ background: 'rgba(255,255,255,0.12)', border: '1px solid rgba(255,255,255,0.2)' }}>
            <Sparkles size={48} style={{ color: '#D9B65D' }} />
          </div>
          <h1 className="text-5xl font-bold text-white mb-3 font-heading">KAIROS</h1>
          <p className="text-sm tracking-widest uppercase text-white/50 mb-8">Right Priority. Right Moment.</p>
          <div className="space-y-4 text-left max-w-sm">
            {['Smart Priority Dashboard', 'Centralized Information Hub', 'Progress Tracker & Portfolio'].map(f => (
              <div key={f} className="flex items-center gap-3 text-white/70">
                <div className="h-2 w-2 rounded-full flex-shrink-0" style={{ background: '#D9B65D' }} />
                <span className="text-sm">{f}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right Panel / Full Mobile */}
      <div className="flex-1 flex flex-col justify-center px-6 py-12 bg-light-bg lg:px-16">
        {/* Mobile logo */}
        <div className="lg:hidden flex items-center gap-3 mb-8">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl"
            style={{ background: 'linear-gradient(135deg, #171747, #302A91)' }}>
            <Sparkles size={22} style={{ color: '#D9B65D' }} />
          </div>
          <span className="text-xl font-bold text-midnight-navy font-heading">KAIROS</span>
        </div>

        <div className="max-w-sm w-full mx-auto lg:mx-0">
          <h2 className="text-2xl font-bold text-midnight-navy mb-1 font-heading">Selamat Datang Kembali</h2>
          <p className="text-sm text-muted-foreground mb-8">Masuk ke akun KAIROS Anda</p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-sm font-medium text-foreground mb-1.5 block">Email</label>
              <input
                type="email"
                value={form.email}
                onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                placeholder="email@student.unair.ac.id"
                className="w-full rounded-xl border border-border bg-white px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-royal-indigo focus:outline-none focus:ring-2 focus:ring-royal-indigo/20 transition-all"
              />
            </div>

            <div>
              <label className="text-sm font-medium text-foreground mb-1.5 block">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={form.password}
                  onChange={e => setForm(f => ({ ...f, password: e.target.value }))}
                  placeholder="Masukkan password"
                  className="w-full rounded-xl border border-border bg-white px-4 py-3 pr-12 text-sm text-foreground placeholder:text-muted-foreground focus:border-royal-indigo focus:outline-none focus:ring-2 focus:ring-royal-indigo/20 transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(s => !s)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <div className="flex justify-end">
              <Link href="/forgot-password" className="text-xs text-royal-indigo hover:underline">
                Lupa password?
              </Link>
            </div>

            {error && (
              <div className="rounded-lg bg-red-50 border border-red-100 px-3 py-2 text-xs text-red-600">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className={cn(
                'flex w-full items-center justify-center gap-2 rounded-xl py-3.5 text-sm font-semibold text-white transition-all duration-200',
                loading ? 'opacity-70 cursor-not-allowed' : 'hover:scale-[1.02] active:scale-[0.98]'
              )}
              style={{ background: 'linear-gradient(135deg, #302A91, #171747)' }}
            >
              {loading ? (
                <div className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
              ) : (
                <>Masuk <ArrowRight size={16} /></>
              )}
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-muted-foreground">
            Belum punya akun?{' '}
            <Link href="/register" className="font-medium text-royal-indigo hover:underline">
              Daftar sekarang
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
