import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';

// Priority Badge
interface PriorityBadgeProps {
  priority: 'high' | 'medium' | 'low';
  className?: string;
}

const priorityConfig = {
  high: { label: 'Tinggi', className: 'bg-red-50 text-red-600 border-red-100' },
  medium: { label: 'Sedang', className: 'bg-amber-50 text-amber-600 border-amber-100' },
  low: { label: 'Rendah', className: 'bg-green-50 text-green-600 border-green-100' },
};

export function PriorityBadge({ priority, className }: PriorityBadgeProps) {
  const config = priorityConfig[priority];
  return (
    <span className={cn(
      'inline-flex items-center rounded-full border px-2 py-0.5 text-xs font-medium',
      config.className,
      className
    )}>
      {config.label}
    </span>
  );
}

// Status Badge
interface StatusBadgeProps {
  status: 'todo' | 'in-progress' | 'completed';
  className?: string;
}

const statusConfig = {
  todo: { label: 'Belum Dikerjakan', className: 'bg-gray-50 text-gray-600 border-gray-200' },
  'in-progress': { label: 'Sedang Dikerjakan', className: 'bg-blue-50 text-blue-600 border-blue-100' },
  completed: { label: 'Selesai', className: 'bg-green-50 text-green-600 border-green-100' },
};

export function StatusBadge({ status, className }: StatusBadgeProps) {
  const config = statusConfig[status];
  return (
    <span className={cn(
      'inline-flex items-center rounded-full border px-2 py-0.5 text-xs font-medium',
      config.className,
      className
    )}>
      {config.label}
    </span>
  );
}

// Category Badge
interface CategoryBadgeProps {
  category: string;
  className?: string;
}

const categoryColors: Record<string, string> = {
  academic: 'bg-blue-50 text-blue-700 border-blue-100',
  announcement: 'bg-purple-50 text-purple-700 border-purple-100',
  scholarship: 'bg-green-50 text-green-700 border-green-100',
  internship: 'bg-orange-50 text-orange-700 border-orange-100',
  competition: 'bg-red-50 text-red-700 border-red-100',
  certification: 'bg-indigo-50 text-indigo-700 border-indigo-100',
  career: 'bg-teal-50 text-teal-700 border-teal-100',
};

const categoryLabels: Record<string, string> = {
  academic: 'Akademik',
  announcement: 'Pengumuman',
  scholarship: 'Beasiswa',
  internship: 'Magang',
  competition: 'Kompetisi',
  certification: 'Sertifikasi',
  career: 'Karier',
};

export function CategoryBadge({ category, className }: CategoryBadgeProps) {
  return (
    <span className={cn(
      'inline-flex items-center rounded-full border px-2 py-0.5 text-xs font-medium',
      categoryColors[category] ?? 'bg-gray-50 text-gray-700 border-gray-200',
      className
    )}>
      {categoryLabels[category] ?? category}
    </span>
  );
}

// Generic Badge
interface BadgeProps {
  children: ReactNode;
  variant?: 'default' | 'outline' | 'gold' | 'navy';
  className?: string;
}

export function Badge({ children, variant = 'default', className }: BadgeProps) {
  return (
    <span className={cn(
      'inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium',
      variant === 'default' && 'bg-soft-indigo text-royal-indigo',
      variant === 'outline' && 'border border-border text-muted-foreground',
      variant === 'gold' && 'bg-champagne-gold/20 text-champagne-gold',
      variant === 'navy' && 'bg-midnight-navy text-white',
      className
    )}>
      {children}
    </span>
  );
}
