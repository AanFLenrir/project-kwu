import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import { AppProvider } from '@/lib/context/AppContext';
import '@/styles/globals.css';

export const metadata: Metadata = {
  title: {
    default: 'KAIROS – Right Priority. Right Moment.',
    template: '%s | KAIROS',
  },
  description: 'Platform produktivitas mahasiswa untuk mengelola tugas akademik, informasi, dan perkembangan karier.',
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html
      lang="id"
      className="h-full"
    >
      <body className="flex min-h-full flex-col bg-background text-foreground antialiased font-sans">
        <AppProvider>
          {children}
        </AppProvider>
      </body>
    </html>
  );
}
