'use client';

import { use } from 'react';
import { notFound } from 'next/navigation';
import { BookOpen, Clock, ExternalLink, CheckCircle, PlayCircle } from 'lucide-react';
import { AppShell } from '@/components/layouts/AppShell';
import { PageHeader } from '@/components/common/PageHeader';
import { ProgressBar } from '@/components/common/States';
import { useApp } from '@/lib/context/AppContext';
import { formatDate } from '@/lib/utils';

export default function CourseDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const { state, updateCourse } = useApp();
  const course = state.courses.find(c => c.id === id);
  if (!course) return notFound();

  const categoryColors: Record<string, string> = {
    'Web Development': '#302A91', 'Data Science': '#3b82f6', 'UI/UX Design': '#8b5cf6',
    'Database': '#22c55e', 'Cloud Computing': '#f59e0b',
  };
  const color = categoryColors[course.category] ?? '#302A91';

  const handleUpdateProgress = (newProgress: number) => {
    const completedModules = Math.round((newProgress / 100) * course.totalModules);
    updateCourse(id, {
      progress: newProgress,
      completedModules,
      status: newProgress >= 100 ? 'completed' : 'active',
    });
  };

  return (
    <AppShell>
      <div className="min-h-screen bg-light-bg">
        <PageHeader title="Detail Kursus" showBack backHref="/courses" />

        <div className="px-4 py-6 lg:px-6 space-y-4">
          {/* Course Header */}
          <div className="rounded-2xl bg-white shadow-sm p-5">
            <div className="flex items-center gap-4 mb-4">
              <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl"
                style={{ background: `${color}15` }}>
                <BookOpen size={28} style={{ color }} />
              </div>
              <div>
                <h1 className="text-lg font-bold text-foreground font-heading leading-tight">{course.title}</h1>
                <p className="text-sm text-muted-foreground">{course.platform}</p>
                {course.instructor && <p className="text-xs text-muted-foreground">{course.instructor}</p>}
              </div>
            </div>

            {course.description && (
              <p className="text-sm text-muted-foreground leading-relaxed">{course.description}</p>
            )}
          </div>

          {/* Progress */}
          <div className="rounded-2xl bg-white shadow-sm p-5">
            <div className="flex justify-between items-center mb-3">
              <h3 className="text-sm font-bold text-foreground font-heading">Progress Belajar</h3>
              <span className="text-2xl font-bold font-heading" style={{ color }}>{course.progress}%</span>
            </div>
            <ProgressBar value={course.progress} className="h-3 mb-3" />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>{course.completedModules} modul selesai</span>
              <span>{course.totalModules - course.completedModules} modul tersisa</span>
            </div>

            {/* Progress Adjuster */}
            <div className="mt-4">
              <label className="text-xs text-muted-foreground mb-1.5 block">Perbarui Progress</label>
              <input
                type="range" min={0} max={100} step={5}
                value={course.progress}
                onChange={e => handleUpdateProgress(parseInt(e.target.value))}
                className="w-full accent-royal-indigo"
              />
              <div className="flex justify-between text-xs text-muted-foreground mt-1">
                <span>0%</span><span>50%</span><span>100%</span>
              </div>
            </div>
          </div>

          {/* Details */}
          <div className="grid grid-cols-2 gap-3">
            <div className="rounded-xl bg-white shadow-sm p-4">
              <div className="flex items-center gap-2 mb-1">
                <Clock size={14} style={{ color }} />
                <span className="text-xs text-muted-foreground">Estimasi</span>
              </div>
              <p className="text-sm font-semibold text-foreground">{course.estimatedHours} jam</p>
            </div>
            <div className="rounded-xl bg-white shadow-sm p-4">
              <div className="flex items-center gap-2 mb-1">
                <CheckCircle size={14} className="text-green-500" />
                <span className="text-xs text-muted-foreground">Status</span>
              </div>
              <p className="text-sm font-semibold text-foreground">
                {course.status === 'active' ? 'Aktif' : course.status === 'completed' ? 'Selesai' : 'Dijeda'}
              </p>
            </div>
          </div>

          {/* Category */}
          <div className="rounded-xl bg-white shadow-sm p-4">
            <p className="text-xs text-muted-foreground mb-1">Kategori</p>
            <span className="rounded-full px-3 py-1 text-xs font-medium"
              style={{ background: `${color}20`, color }}>
              {course.category}
            </span>
          </div>

          {/* Started */}
          <div className="rounded-xl bg-white shadow-sm p-4">
            <p className="text-xs text-muted-foreground mb-1">Dimulai</p>
            <p className="text-sm font-semibold text-foreground">{formatDate(course.startedAt)}</p>
          </div>

          {/* CTA */}
          {course.url ? (
            <a href={course.url} target="_blank" rel="noopener noreferrer"
              className="flex w-full items-center justify-center gap-2 rounded-xl py-3.5 text-sm font-semibold text-white"
              style={{ background: `linear-gradient(135deg, ${color}, ${color}cc)` }}>
              <PlayCircle size={16} /> Lanjutkan Belajar
            </a>
          ) : (
            <button
              className="flex w-full items-center justify-center gap-2 rounded-xl py-3.5 text-sm font-semibold text-white"
              style={{ background: `linear-gradient(135deg, ${color}, ${color}cc)` }}>
              <PlayCircle size={16} /> Lanjutkan Belajar
            </button>
          )}
        </div>
      </div>
    </AppShell>
  );
}
