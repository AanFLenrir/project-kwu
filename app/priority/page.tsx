import type { Metadata } from 'next';
import { PriorityClient } from '@/components/pages/priority/PriorityClient';

export const metadata: Metadata = { title: 'Smart Priority' };

export default function PriorityPage() {
  return <PriorityClient />;
}
