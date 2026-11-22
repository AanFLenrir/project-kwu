'use client';

import { use, useState } from 'react';
import { notFound, useRouter } from 'next/navigation';
import { Award, Calendar, ExternalLink, Trash2 } from 'lucide-react';
import { AppShell } from '@/components/layouts/AppShell';
import { PageHeader } from '@/components/common/PageHeader';
import { useApp } from '@/lib/context/AppContext';
import { formatDate } from '@/lib/utils';

export default function CertificateDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const { state, deleteCertificate } = useApp();
  const router = useRouter();
  const [showDelete, setShowDelete] = useState(false);
  const cert = state.certificates.find(c => c.id === id);
  if (!cert) return notFound();

  const handleDelete = () => {
    deleteCertificate(id);
    router.push('/certificates');
  };

  return (
    <AppShell>
      <div className="min-h-screen bg-light-bg">
        <PageHeader
          title="Detail Sertifikat"
          showBack
          backHref="/certificates"
          actions={
            <button onClick={() => setShowDelete(true)}
              className="flex h-9 w-9 items-center justify-center rounded-full hover:bg-red-50 transition-colors">
              <Trash2 size={16} className="text-red-500" />
            </button>
          }
        />

        <div className="px-4 py-6 lg:px-6 space-y-4">
          {/* Certificate Card Visual */}
          <div className="rounded-2xl overflow-hidden shadow-md"
            style={{ background: 'linear-gradient(135deg, #171747, #302A91)' }}>
            <div className="relative p-6 text-center">
              <div className="absolute inset-0 opacity-10">
                <div className="absolute -top-8 -right-8 h-32 w-32 rounded-full bg-white" />
                <div className="absolute -bottom-8 -left-8 h-24 w-24 rounded-full bg-white" />
              </div>
              <div className="relative z-10">
                <div className="mb-3 mx-auto flex h-20 w-20 items-center justify-center rounded-full"
                  style={{ background: 'rgba(217, 182, 93, 0.2)', border: '2px solid rgba(217, 182, 93, 0.5)' }}>
                  <Award size={36} style={{ color: '#D9B65D' }} />
                </div>
                <div className="text-xs font-medium tracking-widest uppercase text-white/60 mb-1">Sertifikat</div>
                <h2 className="text-xl font-bold text-white font-heading mb-1">{cert.title}</h2>
                <p className="text-sm text-white/70">{cert.issuer}</p>
                {cert.credentialId && (
                  <p className="text-xs text-white/40 mt-2 font-mono">ID: {cert.credentialId}</p>
                )}
              </div>
            </div>
          </div>

          {/* Details */}
          <div className="rounded-2xl bg-white shadow-sm p-5 space-y-4">
            <div className="flex items-center gap-3">
              <Calendar size={16} className="text-royal-indigo" />
              <div>
                <p className="text-xs text-muted-foreground">Diterbitkan</p>
                <p className="text-sm font-semibold text-foreground">{formatDate(cert.issuedAt)}</p>
              </div>
            </div>
            {cert.expiresAt && (
              <div className="flex items-center gap-3">
                <Calendar size={16} className="text-muted-foreground" />
                <div>
                  <p className="text-xs text-muted-foreground">Berlaku Hingga</p>
                  <p className="text-sm font-semibold text-foreground">{formatDate(cert.expiresAt)}</p>
                </div>
              </div>
            )}
          </div>

          {/* Skills */}
          {cert.skills.length > 0 && (
            <div className="rounded-2xl bg-white shadow-sm p-5">
              <h3 className="text-sm font-bold text-foreground mb-3 font-heading">Skills</h3>
              <div className="flex flex-wrap gap-2">
                {cert.skills.map(skill => (
                  <span key={skill} className="rounded-full bg-soft-indigo px-3 py-1 text-xs font-medium text-royal-indigo">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Category */}
          <div className="rounded-xl bg-white shadow-sm p-4">
            <p className="text-xs text-muted-foreground mb-1">Kategori</p>
            <p className="text-sm font-semibold text-foreground">{cert.category}</p>
          </div>

          {/* Credential Link */}
          {cert.credentialUrl && (
            <a href={cert.credentialUrl} target="_blank" rel="noopener noreferrer"
              className="flex w-full items-center justify-center gap-2 rounded-xl py-3.5 text-sm font-semibold text-midnight-navy transition-all hover:scale-[1.02]"
              style={{ background: 'linear-gradient(135deg, #D9B65D, #E8C76A)' }}>
              <ExternalLink size={16} /> Verifikasi Sertifikat
            </a>
          )}
        </div>

        {/* Delete Modal */}
        {showDelete && (
          <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/50"
            onClick={() => setShowDelete(false)}>
            <div className="w-full max-w-sm rounded-t-3xl sm:rounded-2xl bg-white p-6 shadow-xl animate-slide-up"
              onClick={e => e.stopPropagation()}>
              <div className="mb-4 mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-red-100">
                <Trash2 size={28} className="text-red-600" />
              </div>
              <h3 className="text-lg font-bold text-center font-heading mb-2">Hapus Sertifikat?</h3>
              <p className="text-sm text-center text-muted-foreground mb-6">Data sertifikat akan dihapus permanen.</p>
              <div className="grid grid-cols-2 gap-3">
                <button onClick={() => setShowDelete(false)} className="rounded-xl border border-border py-3 text-sm font-medium hover:bg-muted">Batal</button>
                <button onClick={handleDelete} className="rounded-xl bg-red-500 py-3 text-sm font-semibold text-white hover:bg-red-600">Hapus</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </AppShell>
  );
}
