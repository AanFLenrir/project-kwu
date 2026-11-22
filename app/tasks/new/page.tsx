'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { AppShell } from '@/components/layouts/AppShell';
import { PageHeader } from '@/components/common/PageHeader';
import { useApp } from '@/lib/context/AppContext';
import { generateId, cn } from '@/lib/utils';
import type { Task, Priority, TaskStatus } from '@/types';
import { Check } from 'lucide-react';

export default function NewTaskPage() {
  const router = useRouter();
  const { addTask } = useApp();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [form, setForm] = useState({
    title: '',
    description: '',
    subject: '',
    priority: 'medium' as Priority,
    status: 'todo' as TaskStatus,
    deadline: '',
    estimatedHours: 2,
    weight: 20,
    tags: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.title.trim()) e.title = 'Judul wajib diisi';
    if (!form.subject.trim()) e.subject = 'Mata kuliah wajib diisi';
    if (!form.deadline) e.deadline = 'Deadline wajib diisi';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    const now = new Date().toISOString();
    const task: Task = {
      id: generateId('task'),
      title: form.title.trim(),
      description: form.description.trim() || undefined,
      subject: form.subject.trim(),
      priority: form.priority,
      status: form.status,
      deadline: new Date(form.deadline).toISOString(),
      estimatedHours: form.estimatedHours,
      weight: form.weight,
      tags: form.tags.split(',').map(t => t.trim()).filter(Boolean),
      createdAt: now,
      updatedAt: now,
    };
    setTimeout(() => {
      addTask(task);
      setLoading(false);
      setSuccess(true);
      setTimeout(() => router.push('/priority'), 1000);
    }, 600);
  };

  if (success) {
    return (
      <AppShell>
        <div className="flex min-h-screen items-center justify-center bg-light-bg">
          <div className="text-center animate-fade-up">
            <div className="mb-4 mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-green-100">
              <Check size={40} className="text-green-600" />
            </div>
            <h2 className="text-xl font-bold text-midnight-navy font-heading">Tugas Ditambahkan!</h2>
          </div>
        </div>
      </AppShell>
    );
  }

  return (
    <AppShell>
      <div className="min-h-screen bg-light-bg">
        <PageHeader title="Tambah Tugas" showBack backHref="/priority" />

        <form onSubmit={handleSubmit} className="px-4 py-6 lg:px-6 space-y-4 max-w-2xl">
          {/* Title */}
          <div>
            <label className="text-sm font-medium text-foreground mb-1.5 block">Judul Tugas *</label>
            <input value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))}
              placeholder="Contoh: Tugas Pemrograman Web"
              className={cn('w-full rounded-xl border bg-white px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-royal-indigo/20 transition-all',
                errors.title ? 'border-red-300' : 'border-border focus:border-royal-indigo')} />
            {errors.title && <p className="text-xs text-red-500 mt-1">{errors.title}</p>}
          </div>

          {/* Subject */}
          <div>
            <label className="text-sm font-medium text-foreground mb-1.5 block">Mata Kuliah *</label>
            <input value={form.subject} onChange={e => setForm(f => ({ ...f, subject: e.target.value }))}
              placeholder="Contoh: Pemrograman Web"
              className={cn('w-full rounded-xl border bg-white px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-royal-indigo/20 transition-all',
                errors.subject ? 'border-red-300' : 'border-border focus:border-royal-indigo')} />
            {errors.subject && <p className="text-xs text-red-500 mt-1">{errors.subject}</p>}
          </div>

          {/* Description */}
          <div>
            <label className="text-sm font-medium text-foreground mb-1.5 block">Deskripsi</label>
            <textarea value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))}
              placeholder="Deskripsi tugas (opsional)"
              rows={3}
              className="w-full rounded-xl border border-border bg-white px-4 py-3 text-sm focus:border-royal-indigo focus:outline-none focus:ring-2 focus:ring-royal-indigo/20 transition-all resize-none" />
          </div>

          {/* Priority & Status */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-sm font-medium text-foreground mb-1.5 block">Prioritas</label>
              <select value={form.priority} onChange={e => setForm(f => ({ ...f, priority: e.target.value as Priority }))}
                className="w-full rounded-xl border border-border bg-white px-4 py-3 text-sm focus:border-royal-indigo focus:outline-none focus:ring-2 focus:ring-royal-indigo/20">
                <option value="high">Tinggi</option>
                <option value="medium">Sedang</option>
                <option value="low">Rendah</option>
              </select>
            </div>
            <div>
              <label className="text-sm font-medium text-foreground mb-1.5 block">Status</label>
              <select value={form.status} onChange={e => setForm(f => ({ ...f, status: e.target.value as TaskStatus }))}
                className="w-full rounded-xl border border-border bg-white px-4 py-3 text-sm focus:border-royal-indigo focus:outline-none focus:ring-2 focus:ring-royal-indigo/20">
                <option value="todo">Belum Dikerjakan</option>
                <option value="in-progress">Sedang Dikerjakan</option>
                <option value="completed">Selesai</option>
              </select>
            </div>
          </div>

          {/* Deadline */}
          <div>
            <label className="text-sm font-medium text-foreground mb-1.5 block">Deadline *</label>
            <input type="datetime-local" value={form.deadline} onChange={e => setForm(f => ({ ...f, deadline: e.target.value }))}
              className={cn('w-full rounded-xl border bg-white px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-royal-indigo/20 transition-all',
                errors.deadline ? 'border-red-300' : 'border-border focus:border-royal-indigo')} />
            {errors.deadline && <p className="text-xs text-red-500 mt-1">{errors.deadline}</p>}
          </div>

          {/* Hours & Weight */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-sm font-medium text-foreground mb-1.5 block">Estimasi Jam</label>
              <input type="number" min={0.5} max={100} step={0.5} value={form.estimatedHours}
                onChange={e => setForm(f => ({ ...f, estimatedHours: parseFloat(e.target.value) || 1 }))}
                className="w-full rounded-xl border border-border bg-white px-4 py-3 text-sm focus:border-royal-indigo focus:outline-none focus:ring-2 focus:ring-royal-indigo/20" />
            </div>
            <div>
              <label className="text-sm font-medium text-foreground mb-1.5 block">Bobot Nilai (%)</label>
              <input type="number" min={1} max={100} value={form.weight}
                onChange={e => setForm(f => ({ ...f, weight: parseInt(e.target.value) || 1 }))}
                className="w-full rounded-xl border border-border bg-white px-4 py-3 text-sm focus:border-royal-indigo focus:outline-none focus:ring-2 focus:ring-royal-indigo/20" />
            </div>
          </div>

          {/* Tags */}
          <div>
            <label className="text-sm font-medium text-foreground mb-1.5 block">Tags (pisahkan dengan koma)</label>
            <input value={form.tags} onChange={e => setForm(f => ({ ...f, tags: e.target.value }))}
              placeholder="react, nodejs, web"
              className="w-full rounded-xl border border-border bg-white px-4 py-3 text-sm focus:border-royal-indigo focus:outline-none focus:ring-2 focus:ring-royal-indigo/20 transition-all" />
          </div>

          {/* Submit */}
          <button type="submit" disabled={loading}
            className={cn('flex w-full items-center justify-center gap-2 rounded-xl py-3.5 text-sm font-semibold text-white transition-all duration-200',
              loading ? 'opacity-70 cursor-not-allowed' : 'hover:scale-[1.02] active:scale-[0.98]')}
            style={{ background: 'linear-gradient(135deg, #302A91, #171747)' }}>
            {loading ? <div className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" /> : 'Tambah Tugas'}
          </button>
        </form>
      </div>
    </AppShell>
  );
}
