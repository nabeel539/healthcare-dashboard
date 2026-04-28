import React from 'react';
import type { KpiData } from '../../types';

interface KpiCardProps {
  kpi: KpiData;
}

export const KpiCard: React.FC<KpiCardProps> = ({ kpi }) => (
  <div className="bg-surface-container-lowest p-6 rounded-xl relative overflow-hidden group hover:shadow-ambient transition-shadow duration-200">
    {/* Left accent bar */}
    <div className={`absolute left-0 top-0 bottom-0 w-1 ${kpi.accentColor}`} />

    <div className="flex justify-between items-start mb-4">
      <div className={`${kpi.iconBg} p-2.5 rounded-lg`}>
        <span className="material-symbols-outlined text-[20px]">{kpi.icon}</span>
      </div>
      {kpi.badge && (
        <span className={`text-[10px] font-bold px-2 py-1 rounded ${kpi.badgeColor}`}>
          {kpi.badge}
        </span>
      )}
    </div>

    <h3 className="text-on-surface-variant text-sm font-semibold">{kpi.label}</h3>
    <p className="text-3xl font-extrabold text-on-surface mt-1 font-headline">{kpi.value}</p>
  </div>
);
