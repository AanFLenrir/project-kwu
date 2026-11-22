'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Eye, Plus, Sparkles, Trash2, CheckCircle2, Award, Briefcase, GraduationCap } from 'lucide-react';
import { AppShell } from '@/components/layouts/AppShell';
import { PageHeader } from '@/components/common/PageHeader';
import { useApp } from '@/lib/context/AppContext';

export default function PortfolioBuilderPage() {
  const { state, updatePortfolio } = useApp();
  const { portfolio, user } = state;

  const [bio, setBio] = useState(portfolio.bio);
  const [skills, setSkills] = useState(portfolio.skills.join(', '));
  const [newProject, setNewProject] = useState({
    title: '',
    description: '',
    technologies: '',
    category: 'Web Application',
  });
  const [isSaved, setIsSaved] = useState(false);

  const handleSaveBio = (e: React.FormEvent) => {
    e.preventDefault();
    updatePortfolio({
      bio,
      skills: skills.split(',').map(s => s.trim()).filter(Boolean),
    });
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2500);
  };

  const handleAddProject = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProject.title.trim()) return;

    const project = {
      id: `proj-${Date.now()}`,
      title: newProject.title.trim(),
      description: newProject.description.trim(),
      technologies: newProject.technologies.split(',').map(t => t.trim()).filter(Boolean),
      category: newProject.category,
      featured: true,
      completedAt: new Date().toISOString(),
    };

    updatePortfolio({
      projects: [project, ...portfolio.projects],
    });

    setNewProject({ title: '', description: '', technologies: '', category: 'Web Application' });
  };

  const handleDeleteProject = (id: string) => {
    updatePortfolio({
      projects: portfolio.projects.filter(p => p.id !== id),
    });
  };

  return (
    <AppShell>
      <div className="min-h-screen bg-light-bg">
        <PageHeader
          title="Portfolio Builder"
          subtitle="Susun portofolio profesional siap kirim ke industri"
          showBack
          backHref="/progress"
          actions={
            <Link
              href="/portfolio/preview"
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold text-white shadow-xs hover:opacity-90 transition-opacity"
              style={{ background: 'linear-gradient(135deg, #D9B65D, #E8C76A)', color: '#171747' }}
            >
              <Eye size={15} /> Preview Portofolio
            </Link>
          }
        />

        <div className="px-4 py-6 lg:px-8 max-w-5xl space-y-6">
          {/* Header Card */}
          <div className="bg-white rounded-3xl p-6 border border-border shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-2xl bg-midnight-navy flex items-center justify-center text-white font-bold text-2xl font-heading shadow-md">
                {user.name.charAt(0)}
              </div>
              <div>
                <h2 className="text-xl font-bold text-midnight-navy font-heading">{user.name}</h2>
                <p className="text-xs text-muted-foreground">{user.program} · {user.university}</p>
                <div className="mt-1.5 flex items-center gap-2">
                  <span className="text-[11px] font-semibold px-2 py-0.5 rounded-md bg-soft-indigo text-royal-indigo">
                    IPK: {portfolio.education.gpa}
                  </span>
                  <span className="text-[11px] font-semibold px-2 py-0.5 rounded-md bg-amber-50 text-amber-700">
                    {state.certificates.length} Sertifikasi Tersinkron
                  </span>
                </div>
              </div>
            </div>

            <Link
              href="/portfolio/preview"
              className="w-full md:w-auto px-5 py-2.5 rounded-xl border border-royal-indigo text-royal-indigo font-semibold text-xs flex items-center justify-center gap-2 hover:bg-soft-indigo/50 transition-colors"
            >
              <Eye size={15} /> Lihat Hasil Portofolio Publik
            </Link>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left 2 Cols: Form Info & Projects */}
            <div className="lg:col-span-2 space-y-6">
              {/* Bio & Skills */}
              <form onSubmit={handleSaveBio} className="bg-white rounded-3xl p-6 border border-border shadow-xs space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-base font-bold text-midnight-navy font-heading">
                    Ringkasan Profil & Kemampuan
                  </h3>
                  {isSaved && (
                    <span className="text-xs font-semibold text-green-600 flex items-center gap-1">
                      <CheckCircle2 size={14} /> Tersimpan
                    </span>
                  )}
                </div>

                <div>
                  <label className="text-xs font-semibold text-muted-foreground block mb-1.5">
                    Bio Singkat / Pernyataan Karier
                  </label>
                  <textarea
                    rows={3}
                    value={bio}
                    onChange={e => setBio(e.target.value)}
                    className="w-full rounded-xl border border-border p-3 text-sm focus:border-royal-indigo focus:outline-none focus:ring-2 focus:ring-royal-indigo/20 resize-none"
                    placeholder="Tuliskan perkenalan singkat, minat teknologi, dan pencapaian akademikmu..."
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-muted-foreground block mb-1.5">
                    Keahlian Teknis (pisahkan dengan koma)
                  </label>
                  <input
                    type="text"
                    value={skills}
                    onChange={e => setSkills(e.target.value)}
                    className="w-full rounded-xl border border-border p-3 text-sm focus:border-royal-indigo focus:outline-none focus:ring-2 focus:ring-royal-indigo/20"
                    placeholder="React, Next.js, Node.js, Python, PostgreSQL, Figma..."
                  />
                </div>

                <div className="flex justify-end pt-2">
                  <button
                    type="submit"
                    className="px-5 py-2.5 rounded-xl bg-royal-indigo text-white font-semibold text-xs hover:bg-deep-navy transition-colors"
                  >
                    Simpan Perubahan Bio
                  </button>
                </div>
              </form>

              {/* Projects List */}
              <div className="bg-white rounded-3xl p-6 border border-border shadow-xs space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-base font-bold text-midnight-navy font-heading">
                      Daftar Proyek Unggulan
                    </h3>
                    <p className="text-xs text-muted-foreground">Karya nyata hasil praktikum, lomba, atau open source</p>
                  </div>
                  <span className="text-xs px-2.5 py-1 rounded-full bg-soft-indigo text-royal-indigo font-bold">
                    {portfolio.projects.length} Proyek
                  </span>
                </div>

                <div className="space-y-3">
                  {portfolio.projects.map(proj => (
                    <div key={proj.id} className="p-4 rounded-2xl border border-border bg-light-bg/40 flex items-start justify-between gap-4">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="text-sm font-bold text-foreground">{proj.title}</h4>
                          <span className="text-[10px] px-2 py-0.5 rounded-full bg-white border border-border text-muted-foreground">
                            {proj.category}
                          </span>
                        </div>
                        <p className="text-xs text-muted-foreground leading-relaxed mb-2.5">{proj.description}</p>
                        <div className="flex flex-wrap gap-1.5">
                          {proj.technologies.map(tech => (
                            <span key={tech} className="text-[10px] font-medium px-2 py-0.5 rounded-md bg-soft-indigo text-royal-indigo">
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>

                      <button
                        onClick={() => handleDeleteProject(proj.id)}
                        className="text-muted-foreground hover:text-red-500 p-1.5 transition-colors"
                      >
                        <Trash2 size={15} />
                      </button>
                    </div>
                  ))}
                </div>

                {/* Add Project Form */}
                <form onSubmit={handleAddProject} className="pt-4 border-t border-border space-y-3">
                  <h4 className="text-xs font-bold text-midnight-navy uppercase tracking-wider">Tambah Proyek Baru</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <input
                      type="text"
                      placeholder="Nama Proyek (misal: E-Commerce App)"
                      value={newProject.title}
                      onChange={e => setNewProject(p => ({ ...p, title: e.target.value }))}
                      className="rounded-xl border border-border p-2.5 text-xs focus:border-royal-indigo focus:outline-none"
                    />
                    <select
                      value={newProject.category}
                      onChange={e => setNewProject(p => ({ ...p, category: e.target.value }))}
                      className="rounded-xl border border-border p-2.5 text-xs focus:border-royal-indigo focus:outline-none"
                    >
                      <option>Web Application</option>
                      <option>Mobile App</option>
                      <option>Machine Learning</option>
                      <option>UI/UX Case Study</option>
                      <option>Internet of Things</option>
                    </select>
                  </div>
                  <textarea
                    rows={2}
                    placeholder="Deskripsi singkat fitur utama dan solusi yang dibuat..."
                    value={newProject.description}
                    onChange={e => setNewProject(p => ({ ...p, description: e.target.value }))}
                    className="w-full rounded-xl border border-border p-2.5 text-xs focus:border-royal-indigo focus:outline-none resize-none"
                  />
                  <input
                    type="text"
                    placeholder="Teknologi (pisahkan koma: Next.js, Tailwind, MongoDB)"
                    value={newProject.technologies}
                    onChange={e => setNewProject(p => ({ ...p, technologies: e.target.value }))}
                    className="w-full rounded-xl border border-border p-2.5 text-xs focus:border-royal-indigo focus:outline-none"
                  />
                  <button
                    type="submit"
                    className="w-full py-2.5 rounded-xl border-2 border-dashed border-royal-indigo text-royal-indigo font-bold text-xs hover:bg-soft-indigo/40 transition-colors flex items-center justify-center gap-1.5"
                  >
                    <Plus size={15} /> Tambahkan ke Portofolio
                  </button>
                </form>
              </div>
            </div>

            {/* Right 1 Col: Sync status & Quick Info */}
            <div className="space-y-6">
              {/* Education Box */}
              <div className="bg-white rounded-3xl p-6 border border-border shadow-xs space-y-4">
                <div className="flex items-center gap-2 text-royal-indigo">
                  <GraduationCap size={20} />
                  <h3 className="font-bold text-midnight-navy text-sm">Pendidikan Formal</h3>
                </div>
                <div className="p-3.5 rounded-2xl bg-light-bg border border-border">
                  <p className="text-xs font-bold text-foreground">{portfolio.education.degree}</p>
                  <p className="text-[11px] text-muted-foreground">{portfolio.education.institution}</p>
                  <div className="mt-2 flex items-center justify-between text-[11px]">
                    <span className="text-muted-foreground">{portfolio.education.year}</span>
                    <span className="font-semibold text-royal-indigo">IPK {portfolio.education.gpa}</span>
                  </div>
                </div>
              </div>

              {/* Achievements Box */}
              <div className="bg-white rounded-3xl p-6 border border-border shadow-xs space-y-4">
                <div className="flex items-center gap-2 text-amber-600">
                  <Award size={20} />
                  <h3 className="font-bold text-midnight-navy text-sm">Prestasi & Penghargaan</h3>
                </div>
                <ul className="space-y-2.5">
                  {portfolio.achievements.map((ach, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-xs text-foreground/80">
                      <span className="text-amber-500 font-bold">•</span>
                      <span>{ach}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Export Info */}
              <div className="rounded-3xl p-6 text-white" style={{ background: 'linear-gradient(135deg, #171747, #302A91)' }}>
                <Sparkles size={22} className="text-champagne-gold mb-3" />
                <h4 className="font-bold text-sm mb-1">Siap untuk Melamar Magang?</h4>
                <p className="text-xs text-white/70 leading-relaxed mb-4">
                  Data portofolio terhubung otomatis dengan lowongan karier di KAIROS. Kamu bisa membagikan link preview langsung ke HRD.
                </p>
                <Link
                  href="/portfolio/preview"
                  className="w-full py-2.5 rounded-xl bg-white text-midnight-navy font-bold text-xs text-center block hover:bg-champagne-gold transition-colors"
                >
                  Buka Link Publik Portofolio
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
