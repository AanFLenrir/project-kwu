import type { Metadata } from 'next';
import { DashboardClient } from '@/components/pages/dashboard/DashboardClient';

export const metadata: Metadata = { title: 'Beranda' };

export default function DashboardPage() {
  return <DashboardClient />;
}
