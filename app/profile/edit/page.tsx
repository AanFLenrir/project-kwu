'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { CheckCircle2, User, Mail, GraduationCap, Building, Phone } from 'lucide-react';
import { AppShell } from '@/components/layouts/AppShell';
import { PageHeader } from '@/components/common/PageHeader';
import { useApp } from '@/lib/context/AppContext';

export default function EditProfilePage() {
  const router = useRouter();
  const { state, updateUser } = useApp();
  const { user } = state;

  const [form, setForm] = useState({
    name: user.name,
    nim: user.nim,
    email: user.email,
    program: user.program,
    university: user.university,
    semester: user.semester,
    phone: user.phone || '',
    bio: user.bio || '',
  });

  const [saved, setSaved] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateUser({
      name: form.name,
      nim: form.nim,
      email: form.email,
      program: form.program,
      university: form.university,
      semester: Number(form.semester),
      phone: form.phone,
      bio: form.bio,
    });

    setSaved(true);
    setTimeout(() => {
      router.push('/profile');
    }, 1000);
  };

  return (
    <AppShell>
      <div className="min-h-screen bg-light-bg">
        <PageHeader title="Edit Profil" showBack backHref="/profile" />

        <div className="px-4 py-6 lg:px-8 max-w-3xl space-y-6">
          <form onSubmit={handleSubmit} className="bg-white rounded-3xl p-6 lg:p-8 border border-border shadow-xs space-y-5">
            <h2 className="text-base font-bold text-midnight-navy font-heading">Informasi Pribadi & Akademik</h2>

            {saved && (
              <div className="p-3.5 rounded-2xl bg-green-50 border border-green-200 text-green-700 text-xs flex items-center gap-2">
                <CheckCircle2 size={16} /> Profil berhasil diperbarui! Mengalihkan...
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-semibold text-muted-foreground block mb-1.5">Nama Lengkap</label>
                <input
                  type="text"
                  value={form.name}
                  onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                  className="w-full rounded-xl border border-border p-3 text-sm focus:border-royal-indigo focus:outline-none"
                  required
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-muted-foreground block mb-1.5">NIM</label>
                <input
                  type="text"
                  value={form.nim}
                  onChange={e => setForm(f => ({ ...f, nim: e.target.value }))}
                  className="w-full rounded-xl border border-border p-3 text-sm focus:border-royal-indigo focus:outline-none"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-semibold text-muted-foreground block mb-1.5">Email Mahasiswa</label>
                <input
                  type="email"
                  value={form.email}
                  onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                  className="w-full rounded-xl border border-border p-3 text-sm focus:border-royal-indigo focus:outline-none"
                  required
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-muted-foreground block mb-1.5">Nomor WhatsApp</label>
                <input
                  type="text"
                  value={form.phone}
                  onChange={e => setForm(f => ({ ...f, phone: e.target.value }))}
                  className="w-full rounded-xl border border-border p-3 text-sm focus:border-royal-indigo focus:outline-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="sm:col-span-2">
                <label className="text-xs font-semibold text-muted-foreground block mb-1.5">Program Studi</label>
                <input
                  type="text"
                  value={form.program}
                  onChange={e => setForm(f => ({ ...f, program: e.target.value }))}
                  className="w-full rounded-xl border border-border p-3 text-sm focus:border-royal-indigo focus:outline-none"
                  required
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-muted-foreground block mb-1.5">Semester</label>
                <select
                  value={form.semester}
                  onChange={e => setForm(f => ({ ...f, semester: Number(e.target.value) }))}
                  className="w-full rounded-xl border border-border p-3 text-sm focus:border-royal-indigo focus:outline-none"
                >
                  {[1, 2, 3, 4, 5, 6, 7, 8].map(s => (
                    <option key={s} value={s}>Semester {s}</option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="text-xs font-semibold text-muted-foreground block mb-1.5">Perguruan Tinggi</label>
              <input
                type="text"
                value={form.university}
                onChange={e => setForm(f => ({ ...f, university: e.target.value }))}
                className="w-full rounded-xl border border-border p-3 text-sm focus:border-royal-indigo focus:outline-none"
                required
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-muted-foreground block mb-1.5">Bio / Deskripsi Singkat</label>
              <textarea
                rows={3}
                value={form.bio}
                onChange={e => setForm(f => ({ ...f, bio: e.target.value }))}
                className="w-full rounded-xl border border-border p-3 text-sm focus:border-royal-indigo focus:outline-none resize-none"
              />
            </div>

            <div className="pt-3 flex gap-3">
              <button
                type="button"
                onClick={() => router.back()}
                className="flex-1 py-3.5 rounded-xl border border-border text-foreground text-xs font-semibold hover:bg-light-bg transition-colors"
              >
                Batal
              </button>
              <button
                type="submit"
                className="flex-1 py-3.5 rounded-xl text-white text-xs font-semibold shadow-md transition-transform hover:scale-[1.01]"
                style={{ background: 'linear-gradient(135deg, #171747, #302A91)' }}
              >
                Simpan Perubahan
              </button>
            </div>
          </form>
        </div>
      </div>
    </AppShell>
  );
}
