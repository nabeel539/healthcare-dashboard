import React from 'react';

interface BadgeProps {
  status: string;
}

const statusMap: Record<string, string> = {
  STABLE:      'bg-emerald-100 text-emerald-800',
  Stable:      'bg-emerald-100 text-emerald-800',
  OBSERVATION: 'bg-amber-100 text-amber-800',
  Monitoring:  'bg-amber-100 text-amber-800',
  URGENT:      'bg-primary-fixed text-on-primary-fixed',
  'Urgent Review': 'bg-red-100 text-red-700',
  DISCHARGED:  'bg-emerald-100 text-emerald-800',
  Discharged:  'bg-slate-100 text-slate-600',
  'Active Care': 'bg-primary-fixed text-on-primary-fixed',
  Optimal:     'bg-teal-100 text-teal-700',
  Delayed:     'bg-error-container text-on-error-container',
  'At Risk':   'bg-amber-100 text-amber-700',
};

export const Badge: React.FC<BadgeProps> = ({ status }) => {
  const classes = statusMap[status] ?? 'bg-slate-100 text-slate-600';
  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wide ${classes}`}>
      {status}
    </span>
  );
};
