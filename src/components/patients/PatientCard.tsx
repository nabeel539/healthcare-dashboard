import React from 'react';
import type { Patient } from '../../types';
import { Badge } from '../ui/Badge';

interface PatientCardProps {
  patient: Patient;
  onEdit: () => void;
  onDelete: () => void;
}

export const PatientCard: React.FC<PatientCardProps> = ({ patient, onEdit, onDelete }) => (
  <div className="bg-surface-container-lowest rounded-xl p-5 hover:shadow-ambient transition-all duration-200 group relative">
    <div className="flex items-start justify-between mb-4">
      <div
        className={`w-12 h-12 rounded-xl flex items-center justify-center font-bold text-sm ${patient.avatarColor || 'bg-slate-100 text-slate-500'}`}
      >
        {patient.initials || patient.name[0]}
      </div>
      <div className="flex items-center gap-2">
        <Badge status={patient.status} />
        <button 
          onClick={onDelete}
          className="opacity-0 group-hover:opacity-100 p-1.5 text-error hover:bg-error/10 rounded-lg transition-all"
          title="Delete record"
        >
          <span className="material-symbols-outlined text-[18px]">delete</span>
        </button>
      </div>
    </div>

    <h3 className="text-sm font-bold text-on-surface mb-0.5 font-headline">{patient.name}</h3>
    <p className="text-xs text-on-surface-variant font-medium mb-1">{patient.condition}</p>
    <p className="text-[10px] text-outline mb-3">ID: {patient.id.slice(0, 8)}...</p>

    <div className="border-t border-outline-variant/10 pt-3 space-y-2">
      <div className="flex items-center justify-between text-[11px]">
        <span className="text-on-surface-variant">Age / Gender</span>
        <span className="font-semibold text-on-surface">{patient.age} yrs • {patient.gender}</span>
      </div>
      <div className="flex items-center justify-between text-[11px]">
        <span className="text-on-surface-variant">Last Visit</span>
        <span className="font-semibold text-on-surface">{patient.lastVisit}</span>
      </div>
    </div>

    <div className="mt-4 flex gap-2">
      <button 
        onClick={onEdit}
        className="flex-1 py-1.5 bg-surface-container-low hover:bg-surface-container-high text-on-surface-variant text-[11px] font-semibold rounded-lg transition-colors"
      >
        Edit Record
      </button>
      <button className="flex-1 py-1.5 primary-gradient text-white text-[11px] font-semibold rounded-lg hover:opacity-90 transition-opacity">
        Schedule
      </button>
    </div>
  </div>
);
