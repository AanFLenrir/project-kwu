'use client';

import { use } from 'react';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Clock, Calendar, BookOpen, Target, CheckCircle2, Edit2, Trash2, ChevronRight } from 'lucide-react';
import { AppShell } from '@/components/layouts/AppShell';
import { PageHeader } from '@/components/common/PageHeader';
import { PriorityBadge, StatusBadge } from '@/components/common/Badges';
import { useApp } from '@/lib/context/AppContext';
import { formatDate, getDaysUntilDeadline, cn } from '@/lib/utils';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function TaskDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const { state, completeTask, deleteTask } = useApp();
  const router = useRouter();
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showCompleteModal, setShowCompleteModal] = useState(false);

  const task = state.tasks.find(t => t.id === id);
  if (!task) return notFound();

  const days = getDaysUntilDeadline(task.deadline);
  const isCompleted = task.status === 'completed';

  const handleDelete = () => {
    deleteTask(task.id);
    router.push('/priority');
  };

  const handleComplete = () => {
    completeTask(task.id);
    setShowCompleteModal(false);
  };

  return (
    <AppShell>
      <div className="min-h-screen bg-light-bg">
        <PageHeader
          title="Detail Tugas"
          showBack
          backHref="/priority"
          actions={
            <div className="flex gap-1">
              <Link href={`/tasks/${task.id}/edit`}
                className="flex h-9 w-9 items-center justify-center rounded-full hover:bg-muted transition-colors">
                <Edit2 size={16} className="text-foreground" />
              </Link>
              <button
                onClick={() => setShowDeleteModal(true)}
                className="flex h-9 w-9 items-center justify-center rounded-full hover:bg-red-50 transition-colors">
                <Trash2 size={16} className="text-red-500" />
              </button>
            </div>
          }
        />

        <div className="px-4 py-6 lg:px-6 space-y-4">
          {/* Task Card */}
          <div className="rounded-2xl bg-white shadow-sm p-5">
            <div className="flex flex-wrap gap-2 mb-3">
              <PriorityBadge priority={task.priority} />
              <StatusBadge status={task.status} />
              {!isCompleted && (
                <div className={cn(
                  'flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-medium',
                  days < 0 ? 'bg-red-50 text-red-600' : days <= 1 ? 'bg-orange-50 text-orange-600' : 'bg-muted text-muted-foreground'
                )}>
                  <Clock size={10} />
                  {days < 0 ? `${Math.abs(days)} hari terlambat` : days === 0 ? 'Hari ini' : `${days} hari lagi`}
                </div>
              )}
            </div>
            <h2 className="text-xl font-bold text-foreground font-heading mb-2">{task.title}</h2>
            {task.description && (
              <p className="text-sm text-muted-foreground leading-relaxed">{task.description}</p>
            )}
          </div>

          {/* Task Details Grid */}
          <div className="grid grid-cols-2 gap-3">
            {[
              { icon: BookOpen, label: 'Mata Kuliah', value: task.subject },
              { icon: Calendar, label: 'Deadline', value: formatDate(task.deadline, { day: 'numeric', month: 'short', year: 'numeric' }) },
              { icon: Clock, label: 'Estimasi', value: `${task.estimatedHours} jam` },
              { icon: Target, label: 'Bobot Nilai', value: `${task.weight}%` },
            ].map(({ icon: Icon, label, value }) => (
              <div key={label} className="rounded-xl bg-white p-4 shadow-sm">
                <div className="flex items-center gap-2 mb-1">
                  <Icon size={14} className="text-royal-indigo" />
                  <span className="text-xs text-muted-foreground">{label}</span>
                </div>
                <p className="text-sm font-semibold text-foreground">{value}</p>
              </div>
            ))}
          </div>

          {/* Tags */}
          {task.tags && task.tags.length > 0 && (
            <div className="rounded-xl bg-white p-4 shadow-sm">
              <p className="text-xs text-muted-foreground mb-2">Tag</p>
              <div className="flex flex-wrap gap-2">
                {task.tags.map(tag => (
                  <span key={tag} className="rounded-full bg-soft-indigo px-2.5 py-1 text-xs font-medium text-royal-indigo">
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Timeline */}
          <div className="rounded-xl bg-white p-4 shadow-sm">
            <p className="text-xs font-semibold text-muted-foreground mb-3">Timeline</p>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Dibuat</span>
                <span className="font-medium text-foreground">{formatDate(task.createdAt)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Diperbarui</span>
                <span className="font-medium text-foreground">{formatDate(task.updatedAt)}</span>
              </div>
              {task.completedAt && (
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Diselesaikan</span>
                  <span className="font-medium text-green-600">{formatDate(task.completedAt)}</span>
                </div>
              )}
            </div>
          </div>

          {/* Actions */}
          {!isCompleted && (
            <div className="grid grid-cols-2 gap-3">
              <Link href={`/tasks/${task.id}/edit`}
                className="flex items-center justify-center gap-2 rounded-xl border border-border bg-white py-3 text-sm font-medium text-foreground hover:bg-muted transition-colors">
                <Edit2 size={16} /> Edit Tugas
              </Link>
              <button
                onClick={() => setShowCompleteModal(true)}
                className="flex items-center justify-center gap-2 rounded-xl py-3 text-sm font-semibold text-white transition-all hover:scale-[1.02]"
                style={{ background: 'linear-gradient(135deg, #302A91, #171747)' }}>
                <CheckCircle2 size={16} /> Tandai Selesai
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Complete Confirmation */}
      {showCompleteModal && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/50"
          onClick={() => setShowCompleteModal(false)}>
          <div className="w-full max-w-sm rounded-t-3xl sm:rounded-2xl bg-white p-6 shadow-xl animate-slide-up"
            onClick={e => e.stopPropagation()}>
            <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-green-100 mx-auto">
              <CheckCircle2 size={28} className="text-green-600" />
            </div>
            <h3 className="text-lg font-bold text-center text-foreground mb-2 font-heading">Tandai Selesai?</h3>
            <p className="text-sm text-muted-foreground text-center mb-6">Konfirmasi bahwa tugas ini telah diselesaikan.</p>
            <div className="grid grid-cols-2 gap-3">
              <button onClick={() => setShowCompleteModal(false)}
                className="rounded-xl border border-border py-3 text-sm font-medium hover:bg-muted transition-colors">Batal</button>
              <button onClick={handleComplete}
                className="rounded-xl bg-green-500 py-3 text-sm font-semibold text-white hover:bg-green-600 transition-colors">Selesai!</button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation */}
      {showDeleteModal && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/50"
          onClick={() => setShowDeleteModal(false)}>
          <div className="w-full max-w-sm rounded-t-3xl sm:rounded-2xl bg-white p-6 shadow-xl animate-slide-up"
            onClick={e => e.stopPropagation()}>
            <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-red-100 mx-auto">
              <Trash2 size={28} className="text-red-600" />
            </div>
            <h3 className="text-lg font-bold text-center text-foreground mb-2 font-heading">Hapus Tugas?</h3>
            <p className="text-sm text-muted-foreground text-center mb-6">Data tugas akan dihapus permanen.</p>
            <div className="grid grid-cols-2 gap-3">
              <button onClick={() => setShowDeleteModal(false)}
                className="rounded-xl border border-border py-3 text-sm font-medium hover:bg-muted transition-colors">Batal</button>
              <button onClick={handleDelete}
                className="rounded-xl bg-red-500 py-3 text-sm font-semibold text-white hover:bg-red-600 transition-colors">Hapus</button>
            </div>
          </div>
        </div>
      )}
    </AppShell>
  );
}
