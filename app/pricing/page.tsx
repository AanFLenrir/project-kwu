import type { Metadata } from 'next';
import { PricingClient } from '@/components/pages/pricing/PricingClient';

export const metadata: Metadata = {
  title: 'Paket Langganan & Model Bisnis Keuangan',
  description: 'Pilihan paket langganan mahasiswa bulanan, semester, tahunan, lisensi institusi kampus B2B2C, dan kalkulator titik impas (BEP).',
};

export default function PricingPage() {
  return <PricingClient />;
}
