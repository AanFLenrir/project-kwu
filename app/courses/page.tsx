'use client';

import Link from 'next/link';
import { ChevronRight, BookOpen, Clock, CheckCircle } from 'lucide-react';
import { AppShell } from '@/components/layouts/AppShell';
import { PageHeader } from '@/components/common/PageHeader';
import { ProgressBar } from '@/components/common/States';
import { useApp } from '@/lib/context/AppContext';
import { cn } from '@/lib/utils';

export default function CoursesPage() {
  const { state } = useApp();
  const { courses } = state;

  const categoryColors: Record<string, string> = {
    'Web Development': '#302A91',
    'Data Science': '#3b82f6',
    'UI/UX Design': '#8b5cf6',
    'Database': '#22c55e',
    'Cloud Computing': '#f59e0b',
  };

  const statusConfig = {
    active: { label: 'Aktif', className: 'bg-blue-50 text-blue-600' },
    completed: { label: 'Selesai', className: 'bg-green-50 text-green-600' },
    paused: { label: 'Dijeda', className: 'bg-gray-50 text-gray-600' },
  };

  return (
    <AppShell>
      <div className="min-h-screen bg-light-bg">
        <PageHeader title="Daftar Kursus" showBack backHref="/progress" showNotification />

        <div className="px-4 py-4 lg:px-6 space-y-3">
          {/* Stats */}
          <div className="grid grid-cols-3 gap-2 mb-2">
            {[
              { label: 'Aktif', value: courses.filter(c => c.status === 'active').length, color: 'text-blue-600 bg-blue-50' },
              { label: 'Selesai', value: courses.filter(c => c.status === 'completed').length, color: 'text-green-600 bg-green-50' },
              { label: 'Total', value: courses.length, color: 'text-royal-indigo bg-soft-indigo' },
            ].map(({ label, value, color }) => (
              <div key={label} className={cn('rounded-xl p-3 text-center', color)}>
                <div className="text-xl font-bold font-heading">{value}</div>
                <div className="text-xs font-medium">{label}</div>
              </div>
            ))}
          </div>

          {courses.map(course => {
            const color = categoryColors[course.category] ?? '#302A91';
            const status = statusConfig[course.status];
            return (
              <Link key={course.id} href={`/courses/${course.id}`}
                className="block rounded-2xl bg-white shadow-sm p-4 hover:shadow-md transition-all duration-200 hover:-translate-y-0.5">
                <div className="flex items-start gap-3">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl"
                    style={{ background: `${color}15` }}>
                    <BookOpen size={20} style={{ color }} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <h3 className="text-sm font-semibold text-foreground leading-snug line-clamp-2">{course.title}</h3>
                      <span className={cn('shrink-0 rounded-full px-2 py-0.5 text-[10px] font-medium', status.className)}>
                        {status.label}
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground mt-0.5">{course.platform}</p>
                    <div className="flex items-center gap-2 mt-2">
                      <ProgressBar value={course.progress} className="flex-1 h-1.5" />
                      <span className="text-xs font-bold shrink-0" style={{ color }}>{course.progress}%</span>
                    </div>
                    <div className="flex items-center gap-3 mt-1 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <CheckCircle size={10} /> {course.completedModules}/{course.totalModules} modul
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock size={10} /> {course.estimatedHours}j
                      </span>
                    </div>
                  </div>
                  <ChevronRight size={14} className="text-muted-foreground shrink-0 mt-1" />
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </AppShell>
  );
}
