import type { Metadata } from 'next';
import { ProgressClient } from '@/components/pages/progress/ProgressClient';

export const metadata: Metadata = { title: 'Progress Tracker' };

export default function ProgressPage() {
  return <ProgressClient />;
}
