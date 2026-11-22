'use client';

import Link from 'next/link';
import { Plus, Award, Calendar, ExternalLink, ChevronRight } from 'lucide-react';
import { AppShell } from '@/components/layouts/AppShell';
import { PageHeader } from '@/components/common/PageHeader';
import { EmptyState } from '@/components/common/States';
import { useApp } from '@/lib/context/AppContext';
import { formatDate } from '@/lib/utils';

export default function CertificatesPage() {
  const { state } = useApp();
  const { certificates } = state;

  const categoryColors: Record<string, string> = {
    'Web Development': '#302A91',
    'Database': '#22c55e',
    'UI/UX Design': '#8b5cf6',
    'Data Analytics': '#3b82f6',
    'Cloud Computing': '#f59e0b',
  };

  return (
    <AppShell>
      <div className="min-h-screen bg-light-bg">
        <PageHeader
          title="Sertifikat"
          subtitle={`${certificates.length} sertifikat diperoleh`}
          showBack
          backHref="/progress"
          actions={
            <Link href="/certificates/new"
              className="flex h-9 w-9 items-center justify-center rounded-full text-white transition-all hover:scale-110"
              style={{ background: 'linear-gradient(135deg, #D9B65D, #E8C76A)' }}>
              <Plus size={18} />
            </Link>
          }
        />

        <div className="px-4 py-4 lg:px-6 space-y-3">
          {certificates.length === 0 ? (
            <EmptyState
              icon={Award}
              title="Belum ada sertifikat"
              description="Tambahkan sertifikat yang kamu miliki"
              action={
                <Link href="/certificates/new"
                  className="flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold text-midnight-navy"
                  style={{ background: 'linear-gradient(135deg, #D9B65D, #E8C76A)' }}>
                  <Plus size={16} /> Tambah Sertifikat
                </Link>
              }
            />
          ) : (
            certificates.map(cert => {
              const color = categoryColors[cert.category] ?? '#302A91';
              return (
                <Link key={cert.id} href={`/certificates/${cert.id}`}
                  className="block rounded-2xl bg-white shadow-sm hover:shadow-md transition-all duration-200 hover:-translate-y-0.5 overflow-hidden">
                  {/* Gold top bar */}
                  <div className="h-1" style={{ background: 'linear-gradient(90deg, #D9B65D, #E8C76A)' }} />
                  <div className="flex items-start gap-3 p-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl"
                      style={{ background: 'linear-gradient(135deg, #D9B65D20, #E8C76A20)' }}>
                      <Award size={22} style={{ color: '#D9B65D' }} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-sm font-bold text-foreground leading-tight">{cert.title}</h3>
                      <p className="text-xs text-muted-foreground mt-0.5">{cert.issuer}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="rounded-full px-2 py-0.5 text-[10px] font-medium"
                          style={{ background: `${color}15`, color }}>
                          {cert.category}
                        </span>
                        <span className="flex items-center gap-1 text-[10px] text-muted-foreground">
                          <Calendar size={9} /> {formatDate(cert.issuedAt, { day: 'numeric', month: 'short', year: 'numeric' })}
                        </span>
                      </div>
                      {cert.skills.length > 0 && (
                        <div className="flex flex-wrap gap-1 mt-2">
                          {cert.skills.slice(0, 3).map(skill => (
                            <span key={skill} className="rounded-full bg-muted px-2 py-0.5 text-[10px] text-muted-foreground">
                              {skill}
                            </span>
                          ))}
                          {cert.skills.length > 3 && (
                            <span className="text-[10px] text-muted-foreground">+{cert.skills.length - 3}</span>
                          )}
                        </div>
                      )}
                    </div>
                    <ChevronRight size={14} className="text-muted-foreground shrink-0 mt-1" />
                  </div>
                </Link>
              );
            })
          )}
        </div>
      </div>
    </AppShell>
  );
}
