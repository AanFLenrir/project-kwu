'use client';

import Link from 'next/link';
import { ArrowLeft, ExternalLink, Download, Share2, Award, GraduationCap, Mail } from 'lucide-react';
import { useApp } from '@/lib/context/AppContext';

export default function PortfolioPreviewPage() {
  const { state } = useApp();
  const { user, portfolio, certificates } = state;

  return (
    <div className="min-h-screen bg-light-bg py-8 px-4 sm:px-6 lg:px-8">
      {/* Top Navbar */}
      <div className="max-w-4xl mx-auto mb-6 flex items-center justify-between">
        <Link
          href="/portfolio"
          className="inline-flex items-center gap-2 text-xs font-semibold text-royal-indigo hover:text-midnight-navy bg-white px-3.5 py-2 rounded-xl border border-border shadow-xs transition-colors"
        >
          <ArrowLeft size={16} /> Kembali ke Builder
        </Link>
        <div className="flex gap-2">
          <button
            onClick={() => window.print()}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-foreground bg-white px-3.5 py-2 rounded-xl border border-border shadow-xs hover:bg-light-bg transition-colors"
          >
            <Download size={15} /> Unduh PDF
          </button>
          <button
            onClick={() => alert('Link portofolio publik disalin ke clipboard!')}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-white px-3.5 py-2 rounded-xl shadow-xs transition-opacity hover:opacity-90"
            style={{ background: 'linear-gradient(135deg, #171747, #302A91)' }}
          >
            <Share2 size={15} /> Bagikan
          </button>
        </div>
      </div>

      {/* Main Portfolio Document Card */}
      <div className="max-w-4xl mx-auto bg-white rounded-3xl border border-border shadow-lg overflow-hidden">
        {/* Cover / Hero Header */}
        <div className="p-8 lg:p-12 text-white relative overflow-hidden"
          style={{ background: 'linear-gradient(135deg, #171747 0%, #211B70 60%, #302A91 100%)' }}>
          <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="flex items-center gap-5">
              <div className="w-20 h-20 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center font-bold text-3xl font-heading text-champagne-gold">
                {user.name.charAt(0)}
              </div>
              <div>
                <span className="text-xs uppercase tracking-widest text-champagne-gold font-semibold">Portofolio Terverifikasi</span>
                <h1 className="text-3xl font-bold font-heading mt-0.5">{user.name}</h1>
                <p className="text-sm text-white/80">{user.program} · {user.university}</p>
              </div>
            </div>

            <div className="flex flex-wrap gap-2 text-xs">
              <a href={`mailto:${user.email}`} className="px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 transition-colors flex items-center gap-1.5">
                <Mail size={14} /> {user.email}
              </a>
              <span className="px-3 py-1.5 rounded-xl bg-champagne-gold/20 text-champagne-gold font-semibold">
                Semester {user.semester}
              </span>
            </div>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-8 lg:p-12 space-y-10">
          {/* About / Bio */}
          <div>
            <h2 className="text-sm font-bold text-midnight-navy uppercase tracking-wider mb-3">Tentang Saya</h2>
            <p className="text-sm text-foreground/80 leading-relaxed">
              {portfolio.bio}
            </p>
          </div>

          {/* Technical Skills */}
          <div>
            <h2 className="text-sm font-bold text-midnight-navy uppercase tracking-wider mb-3">Keahlian & Teknologi</h2>
            <div className="flex flex-wrap gap-2">
              {portfolio.skills.map(skill => (
                <span key={skill} className="px-3 py-1 rounded-xl bg-soft-indigo text-royal-indigo font-semibold text-xs">
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {/* Featured Projects */}
          <div>
            <h2 className="text-sm font-bold text-midnight-navy uppercase tracking-wider mb-4">Proyek & Karya</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {portfolio.projects.map(project => (
                <div key={project.id} className="p-5 rounded-2xl border border-border bg-light-bg/30 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-md bg-soft-indigo text-royal-indigo">
                        {project.category}
                      </span>
                    </div>
                    <h3 className="font-bold text-foreground text-base mb-1.5">{project.title}</h3>
                    <p className="text-xs text-muted-foreground leading-relaxed mb-4">
                      {project.description}
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-1.5 pt-3 border-t border-border">
                    {project.technologies.map(tech => (
                      <span key={tech} className="text-[10px] font-mono font-medium px-2 py-0.5 rounded bg-white border border-border text-foreground">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Education & Achievements */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h2 className="text-sm font-bold text-midnight-navy uppercase tracking-wider mb-3 flex items-center gap-2">
                <GraduationCap size={18} className="text-royal-indigo" /> Pendidikan
              </h2>
              <div className="p-4 rounded-2xl border border-border bg-white">
                <h3 className="font-bold text-sm text-foreground">{portfolio.education.degree}</h3>
                <p className="text-xs text-muted-foreground mt-0.5">{portfolio.education.institution}</p>
                <div className="flex items-center justify-between mt-3 text-xs">
                  <span className="text-muted-foreground">{portfolio.education.year}</span>
                  <span className="font-bold text-royal-indigo">IPK {portfolio.education.gpa} / 4.00</span>
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-sm font-bold text-midnight-navy uppercase tracking-wider mb-3 flex items-center gap-2">
                <Award size={18} className="text-amber-500" /> Prestasi
              </h2>
              <div className="space-y-2">
                {portfolio.achievements.map((ach, i) => (
                  <div key={i} className="p-3 rounded-xl border border-border bg-white text-xs text-foreground flex items-center gap-2.5">
                    <span className="text-amber-500 font-bold">★</span>
                    <span>{ach}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Verified Certificates */}
          <div>
            <h2 className="text-sm font-bold text-midnight-navy uppercase tracking-wider mb-4">Sertifikasi Terverifikasi KAIROS</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {certificates.map(cert => (
                <div key={cert.id} className="p-4 rounded-2xl border border-border bg-white flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-soft-indigo flex items-center justify-center text-royal-indigo shrink-0">
                    <Award size={20} />
                  </div>
                  <div className="min-w-0 flex-1">
                    <h4 className="text-xs font-bold text-foreground truncate">{cert.title}</h4>
                    <p className="text-[11px] text-muted-foreground truncate">{cert.issuer}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer Brand */}
        <div className="p-6 bg-light-bg border-t border-border flex items-center justify-between text-xs text-muted-foreground">
          <span>KAIROS Student Productivity Platform</span>
          <span>Diverifikasi pada {new Date().toLocaleDateString('id-ID')}</span>
        </div>
      </div>
    </div>
  );
}
