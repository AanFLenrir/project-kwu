'use client';

import Link from 'next/link';
import { BookOpen, Award, User, ChevronRight, TrendingUp, Trophy } from 'lucide-react';
import { AppShell } from '@/components/layouts/AppShell';
import { PageHeader } from '@/components/common/PageHeader';
import { ProgressBar } from '@/components/common/States';
import { useApp } from '@/lib/context/AppContext';

export function ProgressClient() {
  const { state } = useApp();
  const { courses, certificates } = state;
  const activeCourses = courses.filter(c => c.status === 'active');
  const completedCourses = courses.filter(c => c.status === 'completed');
  const avgProgress = activeCourses.length
    ? Math.round(activeCourses.reduce((s, c) => s + c.progress, 0) / activeCourses.length)
    : 0;

  const categoryColors: Record<string, string> = {
    'Web Development': '#302A91',
    'Data Science': '#3b82f6',
    'UI/UX Design': '#8b5cf6',
    'Database': '#22c55e',
    'Cloud Computing': '#f59e0b',
  };

  return (
    <AppShell>
      <div className="min-h-screen bg-light-bg">
        {/* Header with gradient */}
        <div className="relative overflow-hidden px-4 pt-6 pb-8 lg:px-8"
          style={{ background: 'linear-gradient(135deg, #171747 0%, #302A91 100%)' }}>
          <div className="absolute -top-12 -right-12 h-40 w-40 rounded-full bg-white/5 pointer-events-none" />
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h1 className="text-2xl font-bold text-white font-heading">Progress Tracker</h1>
                <p className="text-xs text-white/60 mt-0.5">Pantau perkembangan belajarmu</p>
              </div>
              <Link href="/notifications" className="relative flex h-10 w-10 items-center justify-center rounded-full bg-white/10">
                <TrendingUp size={18} className="text-white" />
              </Link>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-3">
              {[
                { label: 'Kursus Aktif', value: activeCourses.length, icon: BookOpen, color: '#E8C76A' },
                { label: 'Rata-rata', value: `${avgProgress}%`, icon: TrendingUp, color: '#22c55e' },
                { label: 'Sertifikat', value: certificates.length, icon: Award, color: '#D9B65D' },
              ].map(({ label, value, icon: Icon, color }) => (
                <div key={label} className="rounded-2xl p-3 text-center"
                  style={{ background: 'rgba(255,255,255,0.1)' }}>
                  <Icon size={16} style={{ color }} className="mx-auto mb-1" />
                  <div className="text-xl font-bold text-white font-heading">{value}</div>
                  <div className="text-[10px] text-white/60">{label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="px-4 py-6 lg:px-6 space-y-6">
          {/* Quick Nav */}
          <div className="grid grid-cols-3 gap-3">
            {[
              { href: '/courses', label: 'Kursus', icon: BookOpen, color: '#302A91', bg: '#EAE9FA' },
              { href: '/certificates', label: 'Sertifikat', icon: Award, color: '#D9B65D', bg: '#FBF5E6' },
              { href: '/portfolio', label: 'Portfolio', icon: User, color: '#302A91', bg: '#EAE9FA' },
            ].map(({ href, label, icon: Icon, color, bg }) => (
              <Link key={href} href={href}
                className="flex flex-col items-center gap-2 rounded-2xl bg-white p-4 shadow-sm hover:shadow-md transition-all duration-200 hover:-translate-y-0.5">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl" style={{ background: bg }}>
                  <Icon size={18} style={{ color }} />
                </div>
                <span className="text-xs font-semibold text-foreground">{label}</span>
              </Link>
            ))}
          </div>

          {/* Active Courses */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-base font-bold text-foreground font-heading">Kursus Aktif</h2>
              <Link href="/courses" className="text-xs text-royal-indigo font-medium flex items-center gap-1">
                Lihat semua <ChevronRight size={12} />
              </Link>
            </div>
            <div className="space-y-3">
              {activeCourses.map(course => (
                <Link key={course.id} href={`/courses/${course.id}`}
                  className="block rounded-2xl bg-white shadow-sm p-4 hover:shadow-md transition-all duration-200 hover:-translate-y-0.5">
                  <div className="flex items-start gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl"
                      style={{ background: (categoryColors[course.category] ?? '#302A91') + '20' }}>
                      <BookOpen size={16} style={{ color: categoryColors[course.category] ?? '#302A91' }} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-sm font-semibold text-foreground leading-snug line-clamp-1">{course.title}</h3>
                      <p className="text-xs text-muted-foreground mt-0.5">{course.platform}</p>
                      <div className="flex items-center gap-2 mt-2">
                        <ProgressBar value={course.progress} className="flex-1 h-1.5" />
                        <span className="text-xs font-bold text-foreground shrink-0">{course.progress}%</span>
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">
                        {course.completedModules}/{course.totalModules} modul selesai
                      </p>
                    </div>
                    <ChevronRight size={14} className="text-muted-foreground shrink-0 mt-1" />
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Certificates Preview */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-base font-bold text-foreground font-heading">Sertifikat Terbaru</h2>
              <Link href="/certificates" className="text-xs text-royal-indigo font-medium flex items-center gap-1">
                Lihat semua <ChevronRight size={12} />
              </Link>
            </div>
            <div className="space-y-3">
              {certificates.slice(0, 3).map(cert => (
                <Link key={cert.id} href={`/certificates/${cert.id}`}
                  className="flex items-center gap-3 rounded-2xl bg-white shadow-sm p-4 hover:shadow-md transition-all duration-200">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl"
                    style={{ background: 'linear-gradient(135deg, #D9B65D20, #E8C76A20)' }}>
                    <Award size={18} style={{ color: '#D9B65D' }} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-foreground truncate">{cert.title}</p>
                    <p className="text-xs text-muted-foreground">{cert.issuer}</p>
                  </div>
                  <ChevronRight size={14} className="text-muted-foreground shrink-0" />
                </Link>
              ))}
            </div>
          </div>

          {/* Achievement Banner */}
          {completedCourses.length > 0 && (
            <div className="rounded-2xl p-4 flex items-center gap-3"
              style={{ background: 'linear-gradient(135deg, #FBF5E6, #fff9e6)' }}>
              <Trophy size={24} style={{ color: '#D9B65D' }} />
              <div>
                <p className="text-sm font-bold text-midnight-navy">
                  {completedCourses.length} kursus selesai! 🎉
                </p>
                <p className="text-xs text-muted-foreground">Kerja bagus! Terus tingkatkan kemampuanmu.</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </AppShell>
  );
}
