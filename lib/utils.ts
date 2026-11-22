import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(dateString: string, options?: Intl.DateTimeFormatOptions): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('id-ID', options ?? {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}

export function formatDateShort(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'short',
  });
}

export function formatTime(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' });
}

export function formatRelativeTime(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date();
  const diff = now.getTime() - date.getTime();
  const minutes = Math.floor(diff / 60000);
  const hours = Math.floor(diff / 3600000);
  const days = Math.floor(diff / 86400000);

  if (minutes < 1) return 'Baru saja';
  if (minutes < 60) return `${minutes} menit lalu`;
  if (hours < 24) return `${hours} jam lalu`;
  if (days < 7) return `${days} hari lalu`;
  return formatDate(dateString);
}

export function getDaysUntilDeadline(deadline: string): number {
  const now = new Date();
  const deadlineDate = new Date(deadline);
  const diff = deadlineDate.getTime() - now.getTime();
  return Math.ceil(diff / 86400000);
}

export function getDeadlineStatus(deadline: string): 'overdue' | 'urgent' | 'soon' | 'normal' {
  const days = getDaysUntilDeadline(deadline);
  if (days < 0) return 'overdue';
  if (days <= 1) return 'urgent';
  if (days <= 3) return 'soon';
  return 'normal';
}

export function getPriorityScore(task: { deadline: string; weight: number; estimatedHours: number }): number {
  const days = getDaysUntilDeadline(task.deadline);
  const urgency = days <= 0 ? 100 : days <= 1 ? 90 : days <= 3 ? 70 : days <= 7 ? 50 : 30;
  const weight = task.weight;
  const complexity = Math.min(task.estimatedHours * 5, 50);
  return Math.round((urgency * 0.5 + weight * 0.3 + complexity * 0.2));
}

export function generateId(prefix = 'id'): string {
  return `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
}

export function getPriorityColor(priority: string): string {
  switch (priority) {
    case 'high': return 'text-red-500 bg-red-50';
    case 'medium': return 'text-amber-500 bg-amber-50';
    case 'low': return 'text-green-500 bg-green-50';
    default: return 'text-gray-500 bg-gray-50';
  }
}

export function getPriorityLabel(priority: string): string {
  switch (priority) {
    case 'high': return 'Tinggi';
    case 'medium': return 'Sedang';
    case 'low': return 'Rendah';
    default: return priority;
  }
}

export function getStatusLabel(status: string): string {
  switch (status) {
    case 'todo': return 'Belum Dikerjakan';
    case 'in-progress': return 'Sedang Dikerjakan';
    case 'completed': return 'Selesai';
    default: return status;
  }
}

export function getStatusColor(status: string): string {
  switch (status) {
    case 'todo': return 'text-gray-500 bg-gray-50';
    case 'in-progress': return 'text-blue-600 bg-blue-50';
    case 'completed': return 'text-green-600 bg-green-50';
    default: return 'text-gray-500 bg-gray-50';
  }
}

export function getCategoryLabel(category: string): string {
  const labels: Record<string, string> = {
    academic: 'Akademik',
    announcement: 'Pengumuman',
    scholarship: 'Beasiswa',
    internship: 'Magang',
    competition: 'Kompetisi',
    certification: 'Sertifikasi',
    career: 'Karier',
  };
  return labels[category] ?? category;
}

export function getCategoryColor(category: string): string {
  const colors: Record<string, string> = {
    academic: 'bg-blue-100 text-blue-700',
    announcement: 'bg-purple-100 text-purple-700',
    scholarship: 'bg-green-100 text-green-700',
    internship: 'bg-orange-100 text-orange-700',
    competition: 'bg-red-100 text-red-700',
    certification: 'bg-indigo-100 text-indigo-700',
    career: 'bg-teal-100 text-teal-700',
  };
  return colors[category] ?? 'bg-gray-100 text-gray-700';
}

export function truncate(str: string, maxLen: number): string {
  if (str.length <= maxLen) return str;
  return str.slice(0, maxLen) + '…';
}
