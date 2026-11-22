'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Check, Award } from 'lucide-react';
import { AppShell } from '@/components/layouts/AppShell';
import { PageHeader } from '@/components/common/PageHeader';
import { useApp } from '@/lib/context/AppContext';
import { generateId, cn } from '@/lib/utils';
import type { Certificate } from '@/types';

export default function NewCertificatePage() {
  const router = useRouter();
  const { addCertificate } = useApp();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [form, setForm] = useState({
    title: '',
    issuer: '',
    issuedAt: '',
    expiresAt: '',
    credentialId: '',
    credentialUrl: '',
    category: 'Web Development',
    skills: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.title.trim()) e.title = 'Nama sertifikat wajib diisi';
    if (!form.issuer.trim()) e.issuer = 'Penerbit wajib diisi';
    if (!form.issuedAt) e.issuedAt = 'Tanggal terbit wajib diisi';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    const cert: Certificate = {
      id: generateId('cert'),
      title: form.title.trim(),
      issuer: form.issuer.trim(),
      issuedAt: new Date(form.issuedAt).toISOString(),
      expiresAt: form.expiresAt ? new Date(form.expiresAt).toISOString() : undefined,
      credentialId: form.credentialId.trim() || undefined,
      credentialUrl: form.credentialUrl.trim() || undefined,
      category: form.category,
      skills: form.skills.split(',').map(s => s.trim()).filter(Boolean),
    };
    setTimeout(() => {
      addCertificate(cert);
      setLoading(false);
      setSuccess(true);
      setTimeout(() => router.push('/certificates'), 1000);
    }, 600);
  };

  if (success) {
    return (
      <AppShell>
        <div className="flex min-h-screen items-center justify-center bg-light-bg">
          <div className="text-center animate-fade-up">
            <div className="mb-4 mx-auto flex h-20 w-20 items-center justify-center rounded-full" style={{ background: '#FBF5E6' }}>
              <Award size={40} style={{ color: '#D9B65D' }} />
            </div>
            <h2 className="text-xl font-bold text-midnight-navy font-heading">Sertifikat Ditambahkan!</h2>
          </div>
        </div>
      </AppShell>
    );
  }

  return (
    <AppShell>
      <div className="min-h-screen bg-light-bg">
        <PageHeader title="Tambah Sertifikat" showBack backHref="/certificates" />

        <form onSubmit={handleSubmit} className="px-4 py-6 lg:px-6 space-y-4 max-w-2xl">
          <div>
            <label className="text-sm font-medium text-foreground mb-1.5 block">Nama Sertifikat *</label>
            <input value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))}
              placeholder="Contoh: AWS Cloud Practitioner"
              className={cn('w-full rounded-xl border bg-white px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-royal-indigo/20 transition-all',
                errors.title ? 'border-red-300' : 'border-border focus:border-royal-indigo')} />
            {errors.title && <p className="text-xs text-red-500 mt-1">{errors.title}</p>}
          </div>

          <div>
            <label className="text-sm font-medium text-foreground mb-1.5 block">Penerbit *</label>
            <input value={form.issuer} onChange={e => setForm(f => ({ ...f, issuer: e.target.value }))}
              placeholder="Contoh: Amazon Web Services"
              className={cn('w-full rounded-xl border bg-white px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-royal-indigo/20 transition-all',
                errors.issuer ? 'border-red-300' : 'border-border focus:border-royal-indigo')} />
            {errors.issuer && <p className="text-xs text-red-500 mt-1">{errors.issuer}</p>}
          </div>

          <div>
            <label className="text-sm font-medium text-foreground mb-1.5 block">Kategori</label>
            <select value={form.category} onChange={e => setForm(f => ({ ...f, category: e.target.value }))}
              className="w-full rounded-xl border border-border bg-white px-4 py-3 text-sm focus:border-royal-indigo focus:outline-none focus:ring-2 focus:ring-royal-indigo/20">
              {['Web Development', 'Data Science', 'UI/UX Design', 'Database', 'Cloud Computing', 'Data Analytics', 'Mobile Development', 'Lainnya'].map(c => (
                <option key={c}>{c}</option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-sm font-medium text-foreground mb-1.5 block">Tanggal Terbit *</label>
              <input type="date" value={form.issuedAt} onChange={e => setForm(f => ({ ...f, issuedAt: e.target.value }))}
                className={cn('w-full rounded-xl border bg-white px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-royal-indigo/20',
                  errors.issuedAt ? 'border-red-300' : 'border-border focus:border-royal-indigo')} />
              {errors.issuedAt && <p className="text-xs text-red-500 mt-1">{errors.issuedAt}</p>}
            </div>
            <div>
              <label className="text-sm font-medium text-foreground mb-1.5 block">Berlaku Hingga</label>
              <input type="date" value={form.expiresAt} onChange={e => setForm(f => ({ ...f, expiresAt: e.target.value }))}
                className="w-full rounded-xl border border-border bg-white px-4 py-3 text-sm focus:border-royal-indigo focus:outline-none focus:ring-2 focus:ring-royal-indigo/20" />
            </div>
          </div>

          <div>
            <label className="text-sm font-medium text-foreground mb-1.5 block">Credential ID</label>
            <input value={form.credentialId} onChange={e => setForm(f => ({ ...f, credentialId: e.target.value }))}
              placeholder="Opsional"
              className="w-full rounded-xl border border-border bg-white px-4 py-3 text-sm focus:border-royal-indigo focus:outline-none focus:ring-2 focus:ring-royal-indigo/20" />
          </div>

          <div>
            <label className="text-sm font-medium text-foreground mb-1.5 block">Credential URL</label>
            <input value={form.credentialUrl} onChange={e => setForm(f => ({ ...f, credentialUrl: e.target.value }))}
              placeholder="https://..."
              className="w-full rounded-xl border border-border bg-white px-4 py-3 text-sm focus:border-royal-indigo focus:outline-none focus:ring-2 focus:ring-royal-indigo/20" />
          </div>

          <div>
            <label className="text-sm font-medium text-foreground mb-1.5 block">Skills (pisahkan dengan koma)</label>
            <input value={form.skills} onChange={e => setForm(f => ({ ...f, skills: e.target.value }))}
              placeholder="React, JavaScript, Node.js"
              className="w-full rounded-xl border border-border bg-white px-4 py-3 text-sm focus:border-royal-indigo focus:outline-none focus:ring-2 focus:ring-royal-indigo/20" />
          </div>

          <button type="submit" disabled={loading}
            className={cn('flex w-full items-center justify-center gap-2 rounded-xl py-3.5 text-sm font-semibold text-midnight-navy transition-all duration-200',
              loading ? 'opacity-70 cursor-not-allowed' : 'hover:scale-[1.02]')}
            style={{ background: 'linear-gradient(135deg, #D9B65D, #E8C76A)' }}>
            {loading ? <div className="h-4 w-4 animate-spin rounded-full border-2 border-midnight-navy/30 border-t-midnight-navy" /> : 'Tambah Sertifikat'}
          </button>
        </form>
      </div>
    </AppShell>
  );
}
