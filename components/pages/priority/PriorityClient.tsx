'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Plus, Search, Filter, Clock, CheckCircle2, Circle, AlertCircle, ArrowUpDown, Trash2 } from 'lucide-react';
import { AppShell } from '@/components/layouts/AppShell';
import { PageHeader } from '@/components/common/PageHeader';
import { EmptyState } from '@/components/common/States';
import { PriorityBadge, StatusBadge } from '@/components/common/Badges';
import { useApp } from '@/lib/context/AppContext';
import { formatDateShort, getDaysUntilDeadline, cn } from '@/lib/utils';
import type { Task } from '@/types';

type FilterStatus = 'all' | 'todo' | 'in-progress' | 'completed';
type SortBy = 'deadline' | 'priority' | 'weight';

export function PriorityClient() {
  const { state, completeTask, deleteTask } = useApp();
  const [search, setSearch] = useState('');
  const [filterStatus, setFilterStatus] = useState<FilterStatus>('all');
  const [sortBy, setSortBy] = useState<SortBy>('deadline');
  const [showDeleteId, setShowDeleteId] = useState<string | null>(null);

  const priorityOrder = { high: 0, medium: 1, low: 2 };

  const filtered = state.tasks
    .filter(t => {
      const matchSearch = t.title.toLowerCase().includes(search.toLowerCase()) ||
        t.subject.toLowerCase().includes(search.toLowerCase());
      const matchStatus = filterStatus === 'all' || t.status === filterStatus;
      return matchSearch && matchStatus;
    })
    .sort((a, b) => {
      if (sortBy === 'deadline') return new Date(a.deadline).getTime() - new Date(b.deadline).getTime();
      if (sortBy === 'priority') return priorityOrder[a.priority] - priorityOrder[b.priority];
      return b.weight - a.weight;
    });

  const handleComplete = (id: string) => {
    completeTask(id);
  };

  const handleDelete = (id: string) => {
    deleteTask(id);
    setShowDeleteId(null);
  };

  return (
    <AppShell>
      <div className="min-h-screen bg-light-bg">
        <PageHeader
          title="Smart Priority"
          subtitle="Kelola tugas berdasarkan prioritas"
          showNotification
          actions={
            <Link href="/tasks/new"
              className="flex h-9 w-9 items-center justify-center rounded-full text-white transition-all hover:scale-110"
              style={{ background: 'linear-gradient(135deg, #302A91, #171747)' }}>
              <Plus size={18} />
            </Link>
          }
        />

        <div className="px-4 py-4 lg:px-6 space-y-4">
          {/* Search */}
          <div className="relative">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <input
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Cari tugas..."
              className="w-full rounded-xl border border-border bg-white pl-9 pr-4 py-2.5 text-sm focus:border-royal-indigo focus:outline-none focus:ring-2 focus:ring-royal-indigo/20"
            />
          </div>

          {/* Filters Row */}
          <div className="flex gap-2 overflow-x-auto pb-1 no-scrollbar">
            {(['all', 'todo', 'in-progress', 'completed'] as FilterStatus[]).map(s => (
              <button key={s} onClick={() => setFilterStatus(s)}
                className={cn(
                  'shrink-0 rounded-full px-3 py-1.5 text-xs font-medium transition-all',
                  filterStatus === s
                    ? 'bg-royal-indigo text-white'
                    : 'bg-white text-muted-foreground border border-border hover:border-royal-indigo/50'
                )}>
                {s === 'all' ? 'Semua' : s === 'todo' ? 'Belum' : s === 'in-progress' ? 'Dikerjakan' : 'Selesai'}
              </button>
            ))}
            <button
              onClick={() => setSortBy(s => s === 'deadline' ? 'priority' : s === 'priority' ? 'weight' : 'deadline')}
              className="shrink-0 flex items-center gap-1.5 rounded-full border border-border bg-white px-3 py-1.5 text-xs font-medium text-muted-foreground hover:border-royal-indigo/50 transition-all"
            >
              <ArrowUpDown size={12} />
              {sortBy === 'deadline' ? 'Deadline' : sortBy === 'priority' ? 'Prioritas' : 'Bobot'}
            </button>
          </div>

          {/* Task Summary */}
          <div className="grid grid-cols-3 gap-2">
            {[
              { label: 'Belum', count: state.tasks.filter(t => t.status === 'todo').length, color: 'text-gray-600 bg-gray-50' },
              { label: 'Proses', count: state.tasks.filter(t => t.status === 'in-progress').length, color: 'text-blue-600 bg-blue-50' },
              { label: 'Selesai', count: state.tasks.filter(t => t.status === 'completed').length, color: 'text-green-600 bg-green-50' },
            ].map(({ label, count, color }) => (
              <div key={label} className={cn('rounded-xl p-3 text-center', color)}>
                <div className="text-xl font-bold font-heading">{count}</div>
                <div className="text-xs font-medium">{label}</div>
              </div>
            ))}
          </div>

          {/* Task List */}
          {filtered.length === 0 ? (
            <EmptyState
              icon={CheckCircle2}
              title="Tidak ada tugas"
              description="Tambahkan tugas baru untuk memulai"
              action={
                <Link href="/tasks/new"
                  className="flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold text-white"
                  style={{ background: 'linear-gradient(135deg, #302A91, #171747)' }}>
                  <Plus size={16} /> Tambah Tugas
                </Link>
              }
            />
          ) : (
            <div className="space-y-3">
              {filtered.map(task => (
                <TaskCard
                  key={task.id}
                  task={task}
                  onComplete={handleComplete}
                  onDelete={() => setShowDeleteId(task.id)}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-6"
          onClick={() => setShowDeleteId(null)}>
          <div className="w-full max-w-sm rounded-2xl bg-white p-6 shadow-xl animate-slide-up"
            onClick={e => e.stopPropagation()}>
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-red-100 mx-auto">
              <Trash2 size={22} className="text-red-600" />
            </div>
            <h3 className="text-base font-bold text-center text-foreground mb-2 font-heading">Hapus Tugas?</h3>
            <p className="text-sm text-muted-foreground text-center mb-6">Tindakan ini tidak dapat dibatalkan.</p>
            <div className="grid grid-cols-2 gap-3">
              <button onClick={() => setShowDeleteId(null)}
                className="rounded-xl border border-border py-2.5 text-sm font-medium text-foreground hover:bg-muted transition-colors">
                Batal
              </button>
              <button onClick={() => handleDelete(showDeleteId)}
                className="rounded-xl bg-red-500 py-2.5 text-sm font-medium text-white hover:bg-red-600 transition-colors">
                Hapus
              </button>
            </div>
          </div>
        </div>
      )}
    </AppShell>
  );
}

function TaskCard({ task, onComplete, onDelete }: {
  task: Task;
  onComplete: (id: string) => void;
  onDelete: () => void;
}) {
  const days = getDaysUntilDeadline(task.deadline);
  const isOverdue = days < 0;
  const isUrgent = days >= 0 && days <= 1;
  const isCompleted = task.status === 'completed';

  return (
    <div className={cn(
      'rounded-2xl bg-white shadow-sm border transition-all duration-200',
      isCompleted ? 'opacity-70 border-border' : isUrgent ? 'border-red-200' : 'border-border hover:shadow-md hover:-translate-y-0.5'
    )}>
      <div className="p-4">
        <div className="flex items-start gap-3">
          <button
            onClick={() => !isCompleted && onComplete(task.id)}
            className={cn(
              'mt-0.5 h-5 w-5 shrink-0 rounded-full border-2 flex items-center justify-center transition-all',
              isCompleted ? 'bg-green-500 border-green-500' : 'border-border hover:border-royal-indigo'
            )}
          >
            {isCompleted && <CheckCircle2 size={12} className="text-white" />}
          </button>

          <div className="flex-1 min-w-0">
            <Link href={`/tasks/${task.id}`}>
              <h3 className={cn(
                'text-sm font-semibold text-foreground leading-snug hover:text-royal-indigo transition-colors',
                isCompleted && 'line-through text-muted-foreground'
              )}>
                {task.title}
              </h3>
            </Link>
            <p className="text-xs text-muted-foreground mt-0.5">{task.subject}</p>

            <div className="flex flex-wrap items-center gap-2 mt-2">
              <PriorityBadge priority={task.priority} />
              <StatusBadge status={task.status} />
              {!isCompleted && (
                <div className={cn(
                  'flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-medium',
                  isOverdue ? 'bg-red-50 text-red-600' : isUrgent ? 'bg-orange-50 text-orange-600' : 'bg-muted text-muted-foreground'
                )}>
                  <Clock size={10} />
                  {isOverdue ? `${Math.abs(days)} hari terlambat` : days === 0 ? 'Hari ini' : `${days} hari lagi`}
                </div>
              )}
            </div>

            <div className="flex items-center gap-3 mt-2 text-xs text-muted-foreground">
              <span>Bobot: <strong className="text-foreground">{task.weight}%</strong></span>
              <span>Est: <strong className="text-foreground">{task.estimatedHours}j</strong></span>
              <span>Deadline: <strong className={isUrgent ? 'text-red-600' : 'text-foreground'}>{formatDateShort(task.deadline)}</strong></span>
            </div>
          </div>

          <div className="flex flex-col gap-1 shrink-0">
            <Link href={`/tasks/${task.id}/edit`}
              className="flex h-7 w-7 items-center justify-center rounded-lg hover:bg-muted transition-colors">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-muted-foreground">
                <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
              </svg>
            </Link>
            <button onClick={onDelete}
              className="flex h-7 w-7 items-center justify-center rounded-lg hover:bg-red-50 transition-colors">
              <Trash2 size={12} className="text-muted-foreground hover:text-red-500" />
            </button>
          </div>
        </div>
      </div>

      {!isCompleted && (
        <div className="h-1 rounded-b-2xl overflow-hidden">
          <div className="h-full" style={{
            width: `${task.status === 'in-progress' ? 50 : 0}%`,
            background: 'linear-gradient(90deg, #302A91, #E8C76A)'
          }} />
        </div>
      )}
    </div>
  );
}
