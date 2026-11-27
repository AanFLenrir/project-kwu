'use client';

import Link from 'next/link';
import { useApp } from '@/lib/context/AppContext';
import { AppShell } from '@/components/layouts/AppShell';
import { Bell, Calendar, ChevronRight, ListChecks, Newspaper, TrendingUp, Clock, AlertCircle, CheckCircle2, Sparkles, BookOpen, Briefcase, CreditCard, ShieldCheck } from 'lucide-react';
import { formatRelativeTime, getDaysUntilDeadline, getPriorityLabel } from '@/lib/utils';

export function DashboardClient() {
  const { state } = useApp();
  const { user, tasks, notifications, information, courses, certificates, subscription } = state;

  const unreadNotifs = notifications.filter(n => !n.isRead).length;
  const pendingTasks = tasks.filter(t => t.status !== 'completed');
  const completedTasks = tasks.filter(t => t.status === 'completed');
  const urgentTasks = pendingTasks.filter(t => getDaysUntilDeadline(t.deadline) <= 2);
  const latestInfo = information.slice(0, 3);
  const activeCourses = courses.filter(c => c.status === 'active').slice(0, 3);
  const avgProgress = activeCourses.length
    ? Math.round(activeCourses.reduce((s, c) => s + c.progress, 0) / activeCourses.length)
    : 0;

  const hour = new Date().getHours();
  const greeting = hour < 12 ? 'Selamat Pagi' : hour < 17 ? 'Selamat Siang' : 'Selamat Malam';

  return (
    <AppShell>
      <div className="min-h-screen bg-light-bg">
        {/* Hero Header */}
        <div className="relative overflow-hidden px-4 pt-6 pb-8 lg:px-8"
          style={{ background: 'linear-gradient(135deg, #171747 0%, #211B70 60%, #302A91 100%)' }}>
          {/* Decorative */}
          <div className="absolute -top-12 -right-12 h-40 w-40 rounded-full bg-white/5 pointer-events-none" />
          <div className="absolute bottom-0 left-1/4 h-24 w-24 rounded-full bg-white/5 pointer-events-none" />

          <div className="relative z-10 flex items-start justify-between mb-6">
            <div>
              <p className="text-xs font-medium text-white/60 uppercase tracking-wider mb-1">{greeting}</p>
              <h1 className="text-2xl font-bold text-white font-heading">{user.name} 👋</h1>
              <p className="text-xs text-white/50 mt-0.5">{user.program} · Semester {user.semester}</p>
            </div>
            <Link href="/notifications" className="relative flex h-10 w-10 items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition-colors">
              <Bell size={18} className="text-white" />
              {unreadNotifs > 0 && (
                <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full text-[9px] font-bold"
                  style={{ background: '#D9B65D', color: '#171747' }}>
                  {unreadNotifs}
                </span>
              )}
            </Link>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-3 gap-3">
            {[
              { label: 'Tugas Aktif', value: pendingTasks.length, icon: ListChecks, color: '#E8C76A' },
              { label: 'Mendesak', value: urgentTasks.length, icon: AlertCircle, color: '#ef4444' },
              { label: 'Selesai', value: completedTasks.length, icon: CheckCircle2, color: '#22c55e' },
            ].map(({ label, value, icon: Icon, color }) => (
              <div key={label} className="rounded-2xl p-3 text-center"
                style={{ background: 'rgba(255,255,255,0.1)', backdropFilter: 'blur(10px)' }}>
                <Icon size={16} style={{ color }} className="mx-auto mb-1" />
                <div className="text-xl font-bold text-white font-heading">{value}</div>
                <div className="text-[10px] text-white/60">{label}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="px-4 py-6 lg:px-8 space-y-6 lg:grid lg:grid-cols-2 lg:gap-6 lg:space-y-0">
          {/* Subscription Banner */}
          <div className="lg:col-span-2">
            <Link href="/pricing"
              className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-2xl border border-champagne-gold/40 bg-gradient-to-r from-soft-indigo/50 via-white to-amber-50/50 shadow-xs hover:shadow-md transition-all group">
              <div className="flex items-center gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-midnight-navy text-champagne-gold flex items-center justify-center shrink-0 shadow-xs">
                  <CreditCard size={18} />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-champagne-gold/20 text-midnight-navy">
                      Langganan Aktif
                    </span>
                    <span className="text-xs font-bold text-midnight-navy">{subscription.planName}</span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    Masa berlaku hingga {new Date(subscription.expiryDate).toLocaleDateString('id-ID')}. Lihat paket 1, 3, 6, 12 bulan & kalkulator BEP bisnis.
                  </p>
                </div>
              </div>
              <span className="text-xs font-bold text-royal-indigo group-hover:translate-x-1 transition-transform flex items-center gap-1 shrink-0">
                Kelola Paket & Keuangan <ChevronRight size={14} />
              </span>
            </Link>
          </div>

          {/* Quick Actions */}
          <div className="lg:col-span-2">
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
              {[
                { href: '/priority', icon: ListChecks, label: 'Prioritas', color: '#302A91', bg: '#EAE9FA' },
                { href: '/calendar', icon: Calendar, label: 'Kalender', color: '#171747', bg: '#e8e8f0' },
                { href: '/information', icon: Newspaper, label: 'Informasi', color: '#302A91', bg: '#EAE9FA' },
                { href: '/progress', icon: TrendingUp, label: 'Progres', color: '#D9B65D', bg: '#FBF5E6' },
                { href: '/pricing', icon: CreditCard, label: 'Paket & Keuangan', color: '#2563eb', bg: '#eff6ff' },
              ].map(({ href, icon: Icon, label, color, bg }) => (
                <Link key={href} href={href}
                  className="flex flex-col items-center gap-2 rounded-2xl bg-white p-3 shadow-sm hover:shadow-md transition-all duration-200 hover:-translate-y-0.5">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl" style={{ background: bg }}>
                    <Icon size={18} style={{ color }} />
                  </div>
                  <span className="text-xs font-medium text-foreground text-center truncate w-full">{label}</span>
                </Link>
              ))}
            </div>
          </div>

          {/* Priority Tasks */}
          <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
            <div className="flex items-center justify-between px-4 pt-4 pb-3 border-b border-border">
              <div className="flex items-center gap-2">
                <div className="h-6 w-6 rounded-lg flex items-center justify-center bg-soft-indigo">
                  <ListChecks size={14} className="text-royal-indigo" />
                </div>
                <h2 className="text-sm font-bold text-foreground font-heading">Tugas Prioritas</h2>
              </div>
              <Link href="/priority" className="text-xs text-royal-indigo font-medium flex items-center gap-1 hover:gap-1.5 transition-all">
                Lihat semua <ChevronRight size={12} />
              </Link>
            </div>
            <div className="divide-y divide-border">
              {pendingTasks.slice(0, 4).map(task => {
                const days = getDaysUntilDeadline(task.deadline);
                const isUrgent = days <= 1;
                return (
                  <Link key={task.id} href={`/tasks/${task.id}`}
                    className="flex items-start gap-3 px-4 py-3 hover:bg-muted/50 transition-colors">
                    <div className={`mt-0.5 h-2 w-2 shrink-0 rounded-full ${
                      task.priority === 'high' ? 'bg-red-500' : task.priority === 'medium' ? 'bg-amber-500' : 'bg-green-500'
                    }`} />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-foreground truncate">{task.title}</p>
                      <div className="flex items-center gap-2 mt-0.5">
                        <Clock size={10} className={isUrgent ? 'text-red-500' : 'text-muted-foreground'} />
                        <span className={`text-xs ${isUrgent ? 'text-red-500 font-medium' : 'text-muted-foreground'}`}>
                          {days < 0 ? 'Terlambat' : days === 0 ? 'Hari ini' : `${days} hari lagi`}
                        </span>
                        <span className="text-xs text-muted-foreground">· {getPriorityLabel(task.priority)}</span>
                      </div>
                    </div>
                    <ChevronRight size={14} className="text-muted-foreground shrink-0 mt-1" />
                  </Link>
                );
              })}
              {pendingTasks.length === 0 && (
                <div className="px-4 py-6 text-center text-sm text-muted-foreground">
                  🎉 Semua tugas selesai!
                </div>
              )}
            </div>
          </div>

          {/* Information Hub */}
          <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
            <div className="flex items-center justify-between px-4 pt-4 pb-3 border-b border-border">
              <div className="flex items-center gap-2">
                <div className="h-6 w-6 rounded-lg flex items-center justify-center bg-soft-indigo">
                  <Newspaper size={14} className="text-royal-indigo" />
                </div>
                <h2 className="text-sm font-bold text-foreground font-heading">Informasi Terbaru</h2>
              </div>
              <Link href="/information" className="text-xs text-royal-indigo font-medium flex items-center gap-1 hover:gap-1.5 transition-all">
                Lihat semua <ChevronRight size={12} />
              </Link>
            </div>
            <div className="divide-y divide-border">
              {latestInfo.map(info => (
                <Link key={info.id} href={`/information/${info.id}`}
                  className="flex items-start gap-3 px-4 py-3 hover:bg-muted/50 transition-colors">
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-foreground line-clamp-1">{info.title}</p>
                    <p className="text-xs text-muted-foreground mt-0.5 line-clamp-1">{info.summary}</p>
                    <p className="text-[10px] text-muted-foreground/70 mt-0.5">{formatRelativeTime(info.publishedAt)}</p>
                  </div>
                  <ChevronRight size={14} className="text-muted-foreground shrink-0 mt-1" />
                </Link>
              ))}
            </div>
          </div>

          {/* Progress Overview */}
          <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
            <div className="flex items-center justify-between px-4 pt-4 pb-3 border-b border-border">
              <div className="flex items-center gap-2">
                <div className="h-6 w-6 rounded-lg flex items-center justify-center" style={{ background: '#FBF5E6' }}>
                  <TrendingUp size={14} style={{ color: '#D9B65D' }} />
                </div>
                <h2 className="text-sm font-bold text-foreground font-heading">Progres Belajar</h2>
              </div>
              <Link href="/progress" className="text-xs text-royal-indigo font-medium flex items-center gap-1">
                Detail <ChevronRight size={12} />
              </Link>
            </div>
            <div className="p-4">
              {/* Average Progress */}
              <div className="mb-4 flex items-center gap-4 p-3 rounded-xl bg-soft-indigo">
                <div className="relative h-14 w-14">
                  <svg className="h-14 w-14 -rotate-90" viewBox="0 0 48 48">
                    <circle cx="24" cy="24" r="20" fill="none" stroke="#e2e1f0" strokeWidth="4" />
                    <circle cx="24" cy="24" r="20" fill="none" stroke="#302A91" strokeWidth="4"
                      strokeDasharray={`${2 * Math.PI * 20}`}
                      strokeDashoffset={`${2 * Math.PI * 20 * (1 - avgProgress / 100)}`}
                      strokeLinecap="round" />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-xs font-bold text-royal-indigo">{avgProgress}%</span>
                  </div>
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground">Rata-rata Progres</p>
                  <p className="text-xs text-muted-foreground">{activeCourses.length} kursus aktif</p>
                  <p className="text-xs text-muted-foreground">{certificates.length} sertifikat</p>
                </div>
              </div>
              {activeCourses.map(course => (
                <div key={course.id} className="mb-3 last:mb-0">
                  <div className="flex justify-between items-center mb-1">
                    <div className="flex items-center gap-2">
                      <BookOpen size={12} className="text-muted-foreground" />
                      <span className="text-xs font-medium text-foreground truncate max-w-[160px]">{course.title}</span>
                    </div>
                    <span className="text-xs font-semibold text-royal-indigo">{course.progress}%</span>
                  </div>
                  <div className="h-1.5 w-full rounded-full bg-muted overflow-hidden">
                    <div className="h-full rounded-full transition-all duration-500"
                      style={{ width: `${course.progress}%`, background: 'linear-gradient(90deg, #302A91, #E8C76A)' }} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Career Opportunities teaser */}
          <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
            <div className="flex items-center justify-between px-4 pt-4 pb-3 border-b border-border">
              <div className="flex items-center gap-2">
                <div className="h-6 w-6 rounded-lg flex items-center justify-center bg-teal-50">
                  <Briefcase size={14} className="text-teal-600" />
                </div>
                <h2 className="text-sm font-bold text-foreground font-heading">Peluang Karier</h2>
              </div>
              <Link href="/career" className="text-xs text-royal-indigo font-medium flex items-center gap-1">
                Lihat <ChevronRight size={12} />
              </Link>
            </div>
            <div className="p-4">
              <div className="rounded-xl p-3 mb-3"
                style={{ background: 'linear-gradient(135deg, #EAE9FA, #ffffff)' }}>
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-xl bg-midnight-navy flex items-center justify-center shrink-0">
                    <span className="text-xs font-bold text-white">TO</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-foreground">Software Engineer Intern</p>
                    <p className="text-xs text-muted-foreground">Tokopedia · Jakarta</p>
                  </div>
                  <ChevronRight size={14} className="text-muted-foreground shrink-0" />
                </div>
              </div>
              <p className="text-xs text-muted-foreground text-center">
                <span className="font-semibold text-foreground">{state.careers.length}</span> peluang tersedia
              </p>
            </div>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
