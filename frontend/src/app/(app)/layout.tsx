'use client';

import Sidebar from '@/components/layout/Sidebar';
import TopBar from '@/components/layout/TopBar';

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen gradient-mesh">
      <Sidebar />
      <main className="flex-1 ml-[260px] transition-all duration-300">
        <TopBar />
        <div className="p-6 lg:p-8">
          {children}
        </div>
      </main>
    </div>
  );
}
