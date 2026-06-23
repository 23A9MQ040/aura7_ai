import React from 'react';

export const DashboardWidget = ({ title, children }: { title: string, children: React.ReactNode }) => {
  return (
    <div className="bg-white/5 border border-white/10 rounded-xl p-6 backdrop-blur-md">
      <h3 className="text-xl font-semibold mb-4 text-white/90">{title}</h3>
      <div className="text-white/70">
        {children}
      </div>
    </div>
  );
};
