'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Sparkles, Mail, CheckCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function ForgotPasswordPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) { setError('Email wajib diisi.'); return; }
    setLoading(true);
    setError('');
    setTimeout(() => {
      setLoading(false);
      setSent(true);
    }, 1500);
  };

  return (
    <div className="min-h-screen flex flex-col justify-center px-6 py-12 bg-light-bg">
      <div className="max-w-sm w-full mx-auto">
        <button onClick={() => router.back()} className="mb-8 flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
          <ArrowLeft size={16} /> Kembali
        </button>

        <div className="flex items-center gap-3 mb-8">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl"
            style={{ background: 'linear-gradient(135deg, #171747, #302A91)' }}>
            <Sparkles size={22} style={{ color: '#D9B65D' }} />
          </div>
          <span className="text-xl font-bold text-midnight-navy font-heading">KAIROS</span>
        </div>

        {!sent ? (
          <>
            <h2 className="text-2xl font-bold text-midnight-navy mb-1 font-heading">Lupa Password?</h2>
            <p className="text-sm text-muted-foreground mb-8">
              Masukkan email Anda dan kami akan mengirimkan link untuk mengatur ulang password.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="text-sm font-medium text-foreground mb-1.5 block">Email</label>
                <div className="relative">
                  <Mail size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                  <input
                    type="email"
                    value={email}
                    onChange={e => { setEmail(e.target.value); setError(''); }}
                    placeholder="email@student.unair.ac.id"
                    className={cn(
                      'w-full rounded-xl border bg-white pl-10 pr-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-royal-indigo/20 transition-all',
                      error ? 'border-red-300' : 'border-border focus:border-royal-indigo'
                    )}
                  />
                </div>
                {error && <p className="text-xs text-red-500 mt-1">{error}</p>}
              </div>

              <button
                type="submit"
                disabled={loading}
                className={cn(
                  'flex w-full items-center justify-center gap-2 rounded-xl py-3.5 text-sm font-semibold text-white transition-all duration-200',
                  loading ? 'opacity-70 cursor-not-allowed' : 'hover:scale-[1.02] active:scale-[0.98]'
                )}
                style={{ background: 'linear-gradient(135deg, #302A91, #171747)' }}
              >
                {loading ? <div className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" /> : 'Kirim Link Reset'}
              </button>
            </form>
          </>
        ) : (
          <div className="text-center animate-fade-up">
            <div className="mb-4 mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-green-100">
              <CheckCircle size={40} className="text-green-600" />
            </div>
            <h2 className="text-xl font-bold text-midnight-navy mb-2 font-heading">Email Terkirim!</h2>
            <p className="text-sm text-muted-foreground mb-6">
              Kami telah mengirimkan link reset password ke <strong>{email}</strong>. Periksa inbox Anda.
            </p>
            <button
              onClick={() => router.push('/login')}
              className="rounded-xl px-6 py-3 text-sm font-semibold text-white transition-all"
              style={{ background: 'linear-gradient(135deg, #302A91, #171747)' }}
            >
              Kembali ke Login
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
