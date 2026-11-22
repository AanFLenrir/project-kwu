'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Sparkles, ArrowRight, CheckCircle2, ChevronLeft } from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/utils';

const goals = [
  {
    id: 'g1',
    title: 'Manajemen Prioritas & Deadline',
    desc: 'Atur tugas kuliah, praktikum, dan proyek tanpa rasa kewalahan.',
    icon: '🎯',
    badge: 'Akademik'
  },
  {
    id: 'g2',
    title: 'Persiapan Magang & Karier IT',
    desc: 'Bangun portofolio rapi dan temukan info magang teknologi terbaru.',
    icon: '💼',
    badge: 'Karier'
  },
  {
    id: 'g3',
    title: 'Sertifikasi & Kursus Tambahan',
    desc: 'Pantau target belajar Cloud, Data Science, Web Dev, dan sertifikasi.',
    icon: '🏆',
    badge: 'Pengembangan Diri'
  },
  {
    id: 'g4',
    title: 'Keseimbangan Organisasi & Kuliah',
    desc: 'Sinkronisasi jadwal rapat divisi, kegiatan BEM/HMIF, dan UTS/UAS.',
    icon: '⚖️',
    badge: 'Produktivitas'
  }
];

export default function GoalSelectionPage() {
  const router = useRouter();
  const [selectedGoals, setSelectedGoals] = useState<string[]>(['g1', 'g2']);

  const toggleGoal = (id: string) => {
    setSelectedGoals(prev => 
      prev.includes(id) ? prev.filter(g => g !== id) : [...prev, id]
    );
  };

  const handleContinue = () => {
    router.push('/login');
  };

  return (
    <div className="min-h-screen bg-light-bg flex flex-col justify-center px-4 py-8 lg:px-12">
      <div className="max-w-xl w-full mx-auto bg-white rounded-3xl p-6 lg:p-10 shadow-sm border border-border">
        {/* Step Indicator */}
        <div className="flex items-center justify-between mb-6">
          <Link href="/onboarding" className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-royal-indigo transition-colors">
            <ChevronLeft size={16} /> Kembali
          </Link>
          <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-soft-indigo text-royal-indigo font-mono">
            Langkah 3 dari 3
          </span>
        </div>

        <div className="mb-6">
          <div className="inline-flex p-2.5 rounded-2xl bg-soft-indigo text-royal-indigo mb-3">
            <Sparkles size={24} />
          </div>
          <h1 className="text-2xl lg:text-3xl font-bold text-midnight-navy font-heading">
            Apa Fokus Utama Kamu?
          </h1>
          <p className="text-sm text-muted-foreground mt-1.5">
            Pilih tujuan belajar dan produktivitasmu agar KAIROS dapat menyesuaikan dashboard dan rekomendasi prioritas.
          </p>
        </div>

        {/* Goals Grid */}
        <div className="space-y-3 mb-8">
          {goals.map(goal => {
            const isSelected = selectedGoals.includes(goal.id);
            return (
              <div
                key={goal.id}
                onClick={() => toggleGoal(goal.id)}
                className={cn(
                  'flex items-start gap-4 p-4 rounded-2xl border-2 cursor-pointer transition-all duration-200 select-none',
                  isSelected
                    ? 'border-royal-indigo bg-soft-indigo/40 shadow-sm'
                    : 'border-border bg-white hover:border-royal-indigo/40'
                )}
              >
                <div className="text-2xl p-2 rounded-xl bg-white shadow-xs shrink-0">{goal.icon}</div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <h3 className="text-sm font-bold text-midnight-navy">{goal.title}</h3>
                    <span className="text-[10px] font-semibold uppercase px-2 py-0.5 rounded-md bg-white border border-border text-muted-foreground">
                      {goal.badge}
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1 leading-relaxed">{goal.desc}</p>
                </div>
                <div className={cn(
                  'w-5 h-5 rounded-full border flex items-center justify-center shrink-0 mt-0.5 transition-colors',
                  isSelected ? 'border-royal-indigo bg-royal-indigo text-white' : 'border-border bg-white'
                )}>
                  {isSelected && <CheckCircle2 size={14} className="stroke-[3]" />}
                </div>
              </div>
            );
          })}
        </div>

        <button
          onClick={handleContinue}
          className="w-full py-4 rounded-2xl text-sm font-semibold text-white flex items-center justify-center gap-2 shadow-lg transition-transform hover:scale-[1.01] active:scale-[0.99]"
          style={{ background: 'linear-gradient(135deg, #171747, #302A91)' }}
        >
          Lanjutkan ke Dashboard <ArrowRight size={16} />
        </button>
      </div>
    </div>
  );
}
