import type { ReactNode } from 'react';
import { Sidebar } from '@/components/navigation/Sidebar';
import { BottomNavigation } from '@/components/navigation/BottomNavigation';

interface AppShellProps {
  children: ReactNode;
}

export function AppShell({ children }: AppShellProps) {
  return (
    <div className="flex min-h-screen bg-background">
      {/* Desktop Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <main className="flex-1 lg:ml-64 pb-20 lg:pb-0 min-h-screen">
        {children}
      </main>

      {/* Mobile Bottom Nav */}
      <BottomNavigation />
    </div>
  );
}
