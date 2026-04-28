import React from 'react';
import { DashboardLayout } from '../components/layout/DashboardLayout';

export const ReportsPage: React.FC = () => (
  <DashboardLayout>
    <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
      <div className="w-20 h-20 primary-gradient rounded-2xl flex items-center justify-center shadow-ambient">
        <span className="material-symbols-outlined text-white text-4xl">description</span>
      </div>
      <h2 className="text-3xl font-extrabold font-headline text-on-surface">Reports</h2>
      <p className="text-on-surface-variant text-sm max-w-sm text-center">
        Detailed clinical reports and audit trails are coming soon. Check the Analytics page for current performance data.
      </p>
      <a href="/analytics" className="mt-2 px-6 py-2.5 primary-gradient text-white text-xs font-bold uppercase tracking-wider rounded-lg shadow-sm hover:opacity-90 transition-opacity">
        Go to Analytics
      </a>
    </div>
  </DashboardLayout>
);
