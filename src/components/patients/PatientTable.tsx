import React from 'react';
import type { Patient } from '../../types';
import { Badge } from '../ui/Badge';

interface PatientTableProps {
  patients: Patient[];
  onEdit: (patient: Patient) => void;
  onDelete: (id: string) => void;
}

export const PatientTable: React.FC<PatientTableProps> = ({ patients, onEdit, onDelete }) => (
  <div className="bg-surface-container-lowest rounded-xl overflow-hidden shadow-sm border border-outline-variant/10">
    <table className="w-full text-left border-collapse">
      <thead>
        <tr className="bg-surface-container-low/50">
          <th className="px-6 py-4 text-[11px] font-bold text-on-surface-variant uppercase tracking-widest border-b-2 border-primary/10">
            Name
          </th>
          <th className="px-6 py-4 text-[11px] font-bold text-on-surface-variant uppercase tracking-widest border-b-2 border-primary/10">
            Gender
          </th>
          <th className="px-6 py-4 text-[11px] font-bold text-on-surface-variant uppercase tracking-widest border-b-2 border-primary/10">
            Condition
          </th>
          <th className="px-6 py-4 text-[11px] font-bold text-on-surface-variant uppercase tracking-widest border-b-2 border-primary/10">
            Status
          </th>
          <th className="px-6 py-4 text-[11px] font-bold text-on-surface-variant uppercase tracking-widest border-b-2 border-primary/10 text-right">
            Actions
          </th>
        </tr>
      </thead>
      <tbody className="divide-y divide-outline-variant/10">
        {patients.map((patient, idx) => (
          <tr
            key={patient.id}
            className={`hover:bg-surface transition-colors ${
              idx % 2 !== 0 ? 'bg-surface-container-low/20' : ''
            }`}
          >
            <td className="px-6 py-4">
              <div className="flex items-center gap-3">
                <div
                  className={`h-8 w-8 rounded-full flex items-center justify-center font-bold text-xs ${patient.avatarColor || 'bg-slate-100'}`}
                >
                  {patient.initials || patient.name[0]}
                </div>
                <div>
                  <span className="font-semibold text-sm text-on-surface block">{patient.name}</span>
                  <span className="text-[10px] text-outline">Age: {patient.age}</span>
                </div>
              </div>
            </td>
            <td className="px-6 py-4 text-sm text-on-surface-variant font-medium">
              {patient.gender}
            </td>
            <td className="px-6 py-4">
              <span className="text-sm font-medium text-on-surface">{patient.condition}</span>
            </td>
            <td className="px-6 py-4">
              <div className="flex items-center gap-1.5">
                <span
                  className={`h-1.5 w-1.5 rounded-full ${
                    patient.status === 'Active' ? 'bg-emerald-500' : 'bg-outline-variant'
                  }`}
                />
                <Badge status={patient.status} />
              </div>
            </td>
            <td className="px-6 py-4 text-right">
              <div className="flex items-center justify-end gap-2">
                <button 
                  onClick={() => onEdit(patient)}
                  className="p-1.5 text-on-surface-variant hover:bg-surface-container-high rounded-lg transition-colors"
                  title="Edit"
                >
                  <span className="material-symbols-outlined text-[18px]">edit</span>
                </button>
                <button 
                  onClick={() => onDelete(patient.id)}
                  className="p-1.5 text-error hover:bg-error/10 rounded-lg transition-colors"
                  title="Delete"
                >
                  <span className="material-symbols-outlined text-[18px]">delete</span>
                </button>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>

    <div className="px-6 py-4 bg-surface-container-low/30 flex items-center justify-between">
      <span className="text-xs text-on-surface-variant font-medium">
        Showing {patients.length} records
      </span>
      <div className="flex gap-2">
        <button className="p-1.5 rounded-lg border border-outline-variant/30 hover:bg-white text-slate-400 hover:text-primary transition-all">
          <span className="material-symbols-outlined text-[18px]">chevron_left</span>
        </button>
        <button className="p-1.5 rounded-lg border border-outline-variant/30 hover:bg-white text-slate-400 hover:text-primary transition-all">
          <span className="material-symbols-outlined text-[18px]">chevron_right</span>
        </button>
      </div>
    </div>
  </div>
);
