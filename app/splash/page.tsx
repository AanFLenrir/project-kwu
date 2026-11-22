'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Sparkles } from 'lucide-react';

export default function SplashPage() {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push('/onboarding');
    }, 2500);
    return () => clearTimeout(timer);
  }, [router]);

  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center"
      style={{ background: 'linear-gradient(160deg, #171747 0%, #211B70 50%, #302A91 100%)' }}>
      {/* Background decorative circles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-24 -right-24 h-64 w-64 rounded-full bg-white/5" />
        <div className="absolute top-1/3 -left-16 h-48 w-48 rounded-full bg-white/5" />
        <div className="absolute bottom-24 right-16 h-32 w-32 rounded-full bg-white/5" />
        <div className="absolute -bottom-16 -left-16 h-56 w-56 rounded-full bg-white/5" />
      </div>

      {/* Logo */}
      <div className="relative z-10 flex flex-col items-center gap-6 animate-fade-up">
        <div className="flex h-24 w-24 items-center justify-center rounded-3xl shadow-2xl"
          style={{ background: 'rgba(255,255,255,0.12)', backdropFilter: 'blur(20px)', border: '1px solid rgba(255,255,255,0.2)' }}>
          <Sparkles size={48} style={{ color: '#D9B65D' }} />
        </div>

        <div className="text-center">
          <h1 className="text-5xl font-bold text-white tracking-tight font-heading mb-2">KAIROS</h1>
          <p className="text-sm font-medium tracking-widest uppercase text-white/60">Right Priority. Right Moment.</p>
        </div>

        {/* Loading dots */}
        <div className="flex gap-2 mt-4">
          {[0, 1, 2].map(i => (
            <div
              key={i}
              className="h-2 w-2 rounded-full bg-white/30"
              style={{
                animation: 'pulse 1.5s ease-in-out infinite',
                animationDelay: `${i * 0.3}s`,
              }}
            />
          ))}
        </div>
      </div>

      {/* Bottom tagline */}
      <div className="absolute bottom-12 text-center animate-fade-up" style={{ animationDelay: '0.5s' }}>
        <p className="text-xs text-white/40">Platform Produktivitas Mahasiswa</p>
        <p className="text-xs text-white/30 mt-1">D4 Teknik Informatika · Universitas Airlangga</p>
      </div>
    </div>
  );
}
