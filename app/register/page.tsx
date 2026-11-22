'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Eye, EyeOff, Sparkles, ArrowRight, Check } from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/utils';

export default function RegisterPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [form, setForm] = useState({
    name: '',
    email: '',
    nim: '',
    program: 'D4 Teknik Informatika',
    university: 'Universitas Airlangga',
    semester: '5',
    password: '',
    confirmPassword: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.name.trim()) e.name = 'Nama wajib diisi';
    if (!form.email.trim()) e.email = 'Email wajib diisi';
    if (!form.nim.trim()) e.nim = 'NIM wajib diisi';
    if (!form.password) e.password = 'Password wajib diisi';
    else if (form.password.length < 8) e.password = 'Password minimal 8 karakter';
    if (form.password !== form.confirmPassword) e.confirmPassword = 'Password tidak cocok';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
      setTimeout(() => router.push('/login'), 2000);
    }, 1200);
  };

  if (success) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-light-bg px-6">
        <div className="text-center animate-fade-up">
          <div className="mb-4 mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-green-100">
            <Check size={40} className="text-green-600" />
          </div>
          <h2 className="text-xl font-bold text-midnight-navy mb-2 font-heading">Registrasi Berhasil!</h2>
          <p className="text-sm text-muted-foreground">Mengarahkan ke halaman login...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col justify-center px-6 py-12 bg-light-bg lg:px-24">
      <div className="max-w-lg w-full mx-auto">
        {/* Logo */}
        <div className="flex items-center gap-3 mb-8">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl"
            style={{ background: 'linear-gradient(135deg, #171747, #302A91)' }}>
            <Sparkles size={22} style={{ color: '#D9B65D' }} />
          </div>
          <span className="text-xl font-bold text-midnight-navy font-heading">KAIROS</span>
        </div>

        <h2 className="text-2xl font-bold text-midnight-navy mb-1 font-heading">Buat Akun Baru</h2>
        <p className="text-sm text-muted-foreground mb-6">Daftar dan mulai perjalanan produktivitasmu</p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className="text-sm font-medium text-foreground mb-1.5 block">Nama Lengkap</label>
              <input
                value={form.name}
                onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                placeholder="Anhaz"
                className={cn(
                  'w-full rounded-xl border bg-white px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-royal-indigo/20 transition-all',
                  errors.name ? 'border-red-300 focus:border-red-400' : 'border-border focus:border-royal-indigo'
                )}
              />
              {errors.name && <p className="text-xs text-red-500 mt-1">{errors.name}</p>}
            </div>
            <div>
              <label className="text-sm font-medium text-foreground mb-1.5 block">NIM</label>
              <input
                value={form.nim}
                onChange={e => setForm(f => ({ ...f, nim: e.target.value }))}
                placeholder="5220321001"
                className={cn(
                  'w-full rounded-xl border bg-white px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-royal-indigo/20 transition-all',
                  errors.nim ? 'border-red-300' : 'border-border focus:border-royal-indigo'
                )}
              />
              {errors.nim && <p className="text-xs text-red-500 mt-1">{errors.nim}</p>}
            </div>
          </div>

          <div>
            <label className="text-sm font-medium text-foreground mb-1.5 block">Email</label>
            <input
              type="email"
              value={form.email}
              onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
              placeholder="email@student.unair.ac.id"
              className={cn(
                'w-full rounded-xl border bg-white px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-royal-indigo/20 transition-all',
                errors.email ? 'border-red-300' : 'border-border focus:border-royal-indigo'
              )}
            />
            {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email}</p>}
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className="text-sm font-medium text-foreground mb-1.5 block">Program Studi</label>
              <select
                value={form.program}
                onChange={e => setForm(f => ({ ...f, program: e.target.value }))}
                className="w-full rounded-xl border border-border bg-white px-4 py-3 text-sm focus:border-royal-indigo focus:outline-none focus:ring-2 focus:ring-royal-indigo/20"
              >
                <option>D4 Teknik Informatika</option>
                <option>S1 Sistem Informasi</option>
                <option>S1 Ilmu Komputer</option>
              </select>
            </div>
            <div>
              <label className="text-sm font-medium text-foreground mb-1.5 block">Semester</label>
              <select
                value={form.semester}
                onChange={e => setForm(f => ({ ...f, semester: e.target.value }))}
                className="w-full rounded-xl border border-border bg-white px-4 py-3 text-sm focus:border-royal-indigo focus:outline-none focus:ring-2 focus:ring-royal-indigo/20"
              >
                {[1,2,3,4,5,6,7,8].map(s => <option key={s} value={s}>Semester {s}</option>)}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className="text-sm font-medium text-foreground mb-1.5 block">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={form.password}
                  onChange={e => setForm(f => ({ ...f, password: e.target.value }))}
                  placeholder="Min. 8 karakter"
                  className={cn(
                    'w-full rounded-xl border bg-white px-4 py-3 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-royal-indigo/20 transition-all',
                    errors.password ? 'border-red-300' : 'border-border focus:border-royal-indigo'
                  )}
                />
                <button type="button" onClick={() => setShowPassword(s => !s)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
              {errors.password && <p className="text-xs text-red-500 mt-1">{errors.password}</p>}
            </div>
            <div>
              <label className="text-sm font-medium text-foreground mb-1.5 block">Konfirmasi Password</label>
              <input
                type="password"
                value={form.confirmPassword}
                onChange={e => setForm(f => ({ ...f, confirmPassword: e.target.value }))}
                placeholder="Ulangi password"
                className={cn(
                  'w-full rounded-xl border bg-white px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-royal-indigo/20 transition-all',
                  errors.confirmPassword ? 'border-red-300' : 'border-border focus:border-royal-indigo'
                )}
              />
              {errors.confirmPassword && <p className="text-xs text-red-500 mt-1">{errors.confirmPassword}</p>}
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className={cn(
              'flex w-full items-center justify-center gap-2 rounded-xl py-3.5 text-sm font-semibold text-white transition-all duration-200 mt-2',
              loading ? 'opacity-70 cursor-not-allowed' : 'hover:scale-[1.02] active:scale-[0.98]'
            )}
            style={{ background: 'linear-gradient(135deg, #302A91, #171747)' }}
          >
            {loading ? <div className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" /> : <>Daftar <ArrowRight size={16} /></>}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-muted-foreground">
          Sudah punya akun?{' '}
          <Link href="/login" className="font-medium text-royal-indigo hover:underline">Masuk</Link>
        </p>
      </div>
    </div>
  );
}
