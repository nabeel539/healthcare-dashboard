import React from 'react';
import type { Patient } from '../../types';
import { Badge } from '../ui/Badge';

interface ActivityTableProps {
  rows: Patient[];
}

export const ActivityTable: React.FC<ActivityTableProps> = ({ rows }) => (
  <div className="bg-surface-container-lowest rounded-2xl p-6 shadow-sm border border-outline-variant/10">
    <div className="flex items-center justify-between mb-6">
      <h3 className="text-xl font-bold font-headline text-on-surface">Clinical Ledger</h3>
      <button className="text-primary text-xs font-bold tracking-widest uppercase hover:underline">
        View Full Records
      </button>
    </div>

    <div className="overflow-x-auto">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="border-b border-outline-variant/10 text-on-surface-variant text-[10px] uppercase tracking-widest font-bold">
            <th className="px-4 py-3">Patient</th>
            <th className="px-4 py-3">Status</th>
            <th className="px-4 py-3">Condition</th>
            <th className="px-4 py-3 text-right">Efficiency</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-outline-variant/10">
          {rows.slice(0, 5).map((row) => (
            <tr key={row.id} className="hover:bg-surface/50 transition-colors">
              <td className="px-4 py-4">
                <div className="flex items-center gap-3">
                  <div
                    className={`h-8 w-8 rounded-full flex items-center justify-center font-bold text-[10px] ${row.avatarColor || 'bg-slate-100'}`}
                  >
                    {row.initials || row.name[0]}
                  </div>
                  <div className="flex flex-col">
                    <span className="text-sm font-semibold text-on-surface leading-none">
                      {row.name}
                    </span>
                    <span className="text-[10px] text-outline mt-1">{row.lastVisit}</span>
                  </div>
                </div>
              </td>
              <td className="px-4 py-4">
                <Badge status={row.status} />
              </td>
              <td className="px-4 py-4 text-sm text-on-surface-variant">
                {row.condition}
              </td>
              <td className="px-4 py-4 text-right font-bold text-on-surface text-sm">
                98%
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);
