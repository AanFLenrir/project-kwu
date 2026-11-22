import type { Metadata } from 'next';
import { redirect } from 'next/navigation';

export const metadata: Metadata = {
  title: 'KAIROS – Right Priority. Right Moment.',
};

export default function HomePage() {
  redirect('/splash');
}
