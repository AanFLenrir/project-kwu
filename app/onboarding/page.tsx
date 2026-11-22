'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ChevronRight, ListChecks, Newspaper, TrendingUp, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';

const slides = [
  {
    icon: Sparkles,
    color: '#D9B65D',
    bg: 'from-[#171747] to-[#302A91]',
    title: 'Selamat Datang di KAIROS',
    subtitle: 'Right Priority. Right Moment.',
    description: 'Platform produktivitas untuk mahasiswa yang ingin mengelola akademik, karier, dan perkembangan diri dengan lebih efektif.',
  },
  {
    icon: ListChecks,
    color: '#E8C76A',
    bg: 'from-[#211B70] to-[#302A91]',
    title: 'Smart Priority Dashboard',
    subtitle: 'Prioritaskan yang Penting',
    description: 'Kelola tugas akademik dengan sistem prioritas cerdas berdasarkan deadline, bobot, dan urgensi. Tidak ada lagi tugas yang terlupakan.',
  },
  {
    icon: Newspaper,
    color: '#D9B65D',
    bg: 'from-[#171747] to-[#211B70]',
    title: 'Centralized Information Hub',
    subtitle: 'Semua Informasi di Satu Tempat',
    description: 'Akses pengumuman akademik, beasiswa, magang, kompetisi, dan sertifikasi profesional dalam satu platform terpadu.',
  },
  {
    icon: TrendingUp,
    color: '#E8C76A',
    bg: 'from-[#302A91] to-[#171747]',
    title: 'Progress Tracker & Portfolio',
    subtitle: 'Pantau Perkembanganmu',
    description: 'Lacak progres belajar, kumpulkan sertifikat, dan bangun portofolio profesional secara otomatis.',
  },
];

export default function OnboardingPage() {
  const [current, setCurrent] = useState(0);
  const router = useRouter();
  const slide = slides[current];
  const Icon = slide.icon;

  const handleNext = () => {
    if (current < slides.length - 1) {
      setCurrent(c => c + 1);
    } else {
      router.push('/login');
    }
  };

  const handleSkip = () => router.push('/login');

  return (
    <div className={cn('fixed inset-0 flex flex-col bg-gradient-to-b', slide.bg, 'transition-all duration-500')}>
      {/* Background decorative */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-16 -right-16 h-48 w-48 rounded-full bg-white/5" />
        <div className="absolute bottom-32 -left-12 h-40 w-40 rounded-full bg-white/5" />
      </div>

      {/* Skip button */}
      {current < slides.length - 1 && (
        <button
          onClick={handleSkip}
          className="absolute top-12 right-6 text-sm text-white/50 hover:text-white/80 transition-colors z-10"
        >
          Lewati
        </button>
      )}

      {/* Content */}
      <div className="flex flex-1 flex-col items-center justify-center px-8 text-center relative z-10">
        {/* Icon illustration */}
        <div className="mb-10 flex h-32 w-32 items-center justify-center rounded-3xl"
          style={{
            background: 'rgba(255,255,255,0.1)',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(255,255,255,0.15)',
          }}>
          <Icon size={56} style={{ color: slide.color }} />
        </div>

        <div className="animate-fade-up" key={current}>
          <p className="text-xs font-semibold uppercase tracking-widest mb-3" style={{ color: slide.color }}>
            {slide.subtitle}
          </p>
          <h2 className="text-3xl font-bold text-white mb-4 font-heading leading-tight">{slide.title}</h2>
          <p className="text-sm text-white/65 leading-relaxed max-w-sm">{slide.description}</p>
        </div>
      </div>

      {/* Bottom controls */}
      <div className="px-6 pb-12 flex flex-col items-center gap-6 relative z-10">
        {/* Dots */}
        <div className="flex gap-2">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={cn(
                'rounded-full transition-all duration-300',
                i === current ? 'w-6 h-2 bg-champagne-gold' : 'w-2 h-2 bg-white/30'
              )}
            />
          ))}
        </div>

        {/* Button */}
        <button
          onClick={handleNext}
          className="flex w-full max-w-xs items-center justify-center gap-2 rounded-2xl py-4 text-sm font-semibold text-midnight-navy transition-all duration-200 hover:scale-105 active:scale-95"
          style={{ background: 'linear-gradient(135deg, #D9B65D, #E8C76A)' }}
        >
          {current === slides.length - 1 ? 'Mulai Sekarang' : 'Selanjutnya'}
          <ChevronRight size={18} />
        </button>
      </div>
    </div>
  );
}
