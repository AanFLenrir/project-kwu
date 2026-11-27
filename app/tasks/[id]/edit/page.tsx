'use client';

import { use, useState } from 'react';
import { useRouter } from 'next/navigation';
import { notFound } from 'next/navigation';
import { AppShell } from '@/components/layouts/AppShell';
import { PageHeader } from '@/components/common/PageHeader';
import { useApp } from '@/lib/context/AppContext';
import { cn } from '@/lib/utils';
import type { Priority, TaskStatus, Task } from '@/types';
import { Check } from 'lucide-react';

export default function EditTaskPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const router = useRouter();
  const { state, updateTask } = useApp();

  const task = state.tasks.find(t => t.id === id);
  if (!task) return notFound();

  return (
    <AppShell>
      <div className="min-h-screen bg-light-bg">
        <PageHeader title="Edit Tugas" showBack backHref={`/tasks/${id}`} />
        <EditTaskForm 
          task={task} 
          onSave={(updates) => {
            updateTask(id, updates);
            router.push(`/tasks/${id}`);
          }} 
        />
      </div>
    </AppShell>
  );
}

function EditTaskForm({ 
  task, 
  onSave 
}: { 
  task: Task; 
  onSave: (updates: Partial<Task>) => void; 
}) {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [form, setForm] = useState({
    title: task.title,
    description: task.description ?? '',
    subject: task.subject,
    priority: task.priority,
    status: task.status,
    deadline: task.deadline ? task.deadline.slice(0, 16) : '',
    estimatedHours: task.estimatedHours,
    weight: task.weight,
    tags: task.tags?.join(', ') ?? '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      onSave({
        title: form.title,
        description: form.description || undefined,
        subject: form.subject,
        priority: form.priority,
        status: form.status,
        deadline: new Date(form.deadline).toISOString(),
        estimatedHours: form.estimatedHours,
        weight: form.weight,
        tags: form.tags.split(',').map(t => t.trim()).filter(Boolean),
      });
      setLoading(false);
      setSuccess(true);
    }, 600);
  };

  if (success) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center bg-light-bg">
        <div className="text-center animate-fade-up">
          <div className="mb-4 mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-green-100">
            <Check size={40} className="text-green-600" />
          </div>
          <h2 className="text-xl font-bold text-midnight-navy font-heading">Tugas Diperbarui!</h2>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="px-4 py-6 lg:px-6 space-y-4 max-w-2xl">
      <div>
        <label className="text-sm font-medium text-foreground mb-1.5 block">Judul Tugas</label>
        <input 
          value={form.title} 
          onChange={e => setForm(f => ({ ...f, title: e.target.value }))}
          className="w-full rounded-xl border border-border bg-white px-4 py-3 text-sm focus:border-royal-indigo focus:outline-none focus:ring-2 focus:ring-royal-indigo/20" 
        />
      </div>

      <div>
        <label className="text-sm font-medium text-foreground mb-1.5 block">Mata Kuliah</label>
        <input 
          value={form.subject} 
          onChange={e => setForm(f => ({ ...f, subject: e.target.value }))}
          className="w-full rounded-xl border border-border bg-white px-4 py-3 text-sm focus:border-royal-indigo focus:outline-none focus:ring-2 focus:ring-royal-indigo/20" 
        />
      </div>

      <div>
        <label className="text-sm font-medium text-foreground mb-1.5 block">Deskripsi</label>
        <textarea 
          value={form.description} 
          onChange={e => setForm(f => ({ ...f, description: e.target.value }))}
          rows={3} 
          className="w-full rounded-xl border border-border bg-white px-4 py-3 text-sm focus:border-royal-indigo focus:outline-none focus:ring-2 focus:ring-royal-indigo/20 resize-none" 
        />
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="text-sm font-medium text-foreground mb-1.5 block">Prioritas</label>
          <select 
            value={form.priority} 
            onChange={e => setForm(f => ({ ...f, priority: e.target.value as Priority }))}
            className="w-full rounded-xl border border-border bg-white px-4 py-3 text-sm focus:border-royal-indigo focus:outline-none"
          >
            <option value="high">Tinggi</option>
            <option value="medium">Sedang</option>
            <option value="low">Rendah</option>
          </select>
        </div>
        <div>
          <label className="text-sm font-medium text-foreground mb-1.5 block">Status</label>
          <select 
            value={form.status} 
            onChange={e => setForm(f => ({ ...f, status: e.target.value as TaskStatus }))}
            className="w-full rounded-xl border border-border bg-white px-4 py-3 text-sm focus:border-royal-indigo focus:outline-none"
          >
            <option value="todo">Belum Dikerjakan</option>
            <option value="in-progress">Sedang Dikerjakan</option>
            <option value="completed">Selesai</option>
          </select>
        </div>
      </div>

      <div>
        <label className="text-sm font-medium text-foreground mb-1.5 block">Deadline</label>
        <input 
          type="datetime-local" 
          value={form.deadline} 
          onChange={e => setForm(f => ({ ...f, deadline: e.target.value }))}
          className="w-full rounded-xl border border-border bg-white px-4 py-3 text-sm focus:border-royal-indigo focus:outline-none focus:ring-2 focus:ring-royal-indigo/20" 
        />
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="text-sm font-medium text-foreground mb-1.5 block">Estimasi Jam</label>
          <input 
            type="number" 
            min={0.5} 
            step={0.5} 
            value={form.estimatedHours}
            onChange={e => setForm(f => ({ ...f, estimatedHours: parseFloat(e.target.value) || 1 }))}
            className="w-full rounded-xl border border-border bg-white px-4 py-3 text-sm focus:border-royal-indigo focus:outline-none" 
          />
        </div>
        <div>
          <label className="text-sm font-medium text-foreground mb-1.5 block">Bobot (%)</label>
          <input 
            type="number" 
            min={1} 
            max={100} 
            value={form.weight}
            onChange={e => setForm(f => ({ ...f, weight: parseInt(e.target.value) || 1 }))}
            className="w-full rounded-xl border border-border bg-white px-4 py-3 text-sm focus:border-royal-indigo focus:outline-none" 
          />
        </div>
      </div>

      <div>
        <label className="text-sm font-medium text-foreground mb-1.5 block">Tags</label>
        <input 
          value={form.tags} 
          onChange={e => setForm(f => ({ ...f, tags: e.target.value }))}
          className="w-full rounded-xl border border-border bg-white px-4 py-3 text-sm focus:border-royal-indigo focus:outline-none focus:ring-2 focus:ring-royal-indigo/20" 
        />
      </div>

      <button 
        type="submit" 
        disabled={loading}
        className={cn(
          'flex w-full items-center justify-center gap-2 rounded-xl py-3.5 text-sm font-semibold text-white transition-all duration-200',
          loading ? 'opacity-70 cursor-not-allowed' : 'hover:scale-[1.02]'
        )}
        style={{ background: 'linear-gradient(135deg, #302A91, #171747)' }}
      >
        {loading ? <div className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" /> : 'Simpan Perubahan'}
      </button>
    </form>
  );
}
