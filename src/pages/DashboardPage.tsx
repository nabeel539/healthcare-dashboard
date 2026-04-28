import React, { useEffect } from 'react';
import { DashboardLayout } from '../components/layout/DashboardLayout';
import { KpiCard } from '../components/dashboard/KpiCard';
import { ActivityTable } from '../components/dashboard/ActivityTable';
import { SkeletonCard, SkeletonTableRow } from '../components/ui/Skeleton';
import type { KpiData } from '../types';
import { usePatientStore } from '../store/patientStore';
import { exportToCSV } from '../utils/exportUtils';
import { mockAppointments } from '../data/mockData';

export const DashboardPage: React.FC = () => {
  const { patients, isLoading, fetchPatients } = usePatientStore();

  useEffect(() => {
    fetchPatients();
  }, []);

  const handleExport = () => {
    if (patients.length > 0) {
      exportToCSV(patients, `Clinical_Report_${new Date().toISOString().split('T')[0]}`);
    }
  };

  const activePatientsCount = patients.filter((p) => p.status === 'Active').length;

  const kpiData: KpiData[] = [
    {
      label: 'Total Patients',
      value: isLoading ? '...' : patients.length.toString(),
      badge: '+12%',
      badgeColor: 'text-emerald-600 bg-emerald-50',
      icon: 'group',
      iconBg: 'bg-primary-fixed/20 text-primary',
      accentColor: 'bg-primary-fixed',
    },
    {
      label: 'Active Cases',
      value: isLoading ? '...' : activePatientsCount.toString(),
      badge: 'Real-time',
      badgeColor: 'text-teal-600 bg-teal-50',
      icon: 'clinical_notes',
      iconBg: 'bg-tertiary-fixed/40 text-tertiary',
      accentColor: 'bg-tertiary',
    },
    {
      label: 'Appointments',
      value: '18',
      badge: 'Today',
      badgeColor: 'text-on-surface-variant bg-surface-container',
      icon: 'event',
      iconBg: 'bg-primary-fixed/30 text-primary-container',
      accentColor: 'bg-primary',
    },
    {
      label: 'Avg. Wait Time',
      value: '14 min',
      icon: 'timer',
      iconBg: 'bg-secondary-container text-secondary',
      accentColor: 'bg-secondary',
    },
  ];

  return (
    <DashboardLayout>
      {/* Page header */}
      <div className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h2 className="text-3xl font-extrabold text-on-surface font-headline tracking-tight">
            Clinical Overview
          </h2>
          <p className="text-on-surface-variant mt-1 font-medium">
            Welcome back, Dr. Vane. Here is today's summary.
          </p>
        </div>
        <div className="flex gap-3">
          <button className="bg-surface-container-high px-4 py-2 rounded-lg text-sm font-semibold text-on-surface-variant hover:bg-surface-container-highest transition-colors flex items-center gap-2">
            <span className="material-symbols-outlined text-[16px]">calendar_today</span>
            {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
          </button>
          <button 
            onClick={handleExport}
            className="bg-primary text-white px-4 py-2 rounded-lg text-sm font-semibold hover:opacity-90 transition-opacity flex items-center gap-2"
          >
            <span className="material-symbols-outlined text-[16px]">download</span>
            Export Report
          </button>
        </div>
      </div>

      {/* KPI Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        {isLoading && patients.length === 0
          ? Array.from({ length: 4 }).map((_, i) => <SkeletonCard key={i} />)
          : kpiData.map((kpi) => <KpiCard key={kpi.label} kpi={kpi} />)}
      </div>

      {/* Main content grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Activity ledger */}
        <div className="lg:col-span-2">
          {isLoading && patients.length === 0 ? (
            <div className="bg-surface-container-lowest rounded-2xl p-6 shadow-sm border border-outline-variant/10">
              <div className="h-6 w-48 bg-surface-container rounded mb-6 animate-pulse" />
              <table className="w-full">
                <tbody>
                  {Array.from({ length: 5 }).map((_, i) => (
                    <SkeletonTableRow key={i} />
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <ActivityTable rows={patients} />
          )}
        </div>

        {/* Right column */}
        <div className="flex flex-col gap-6">
          {/* Upcoming appointments */}
          <div className="bg-surface-container-lowest p-6 rounded-xl shadow-sm border border-outline-variant/10">
            <h3 className="font-headline font-bold text-lg text-on-surface mb-6">
              Upcoming Appointments
            </h3>
            <div className="space-y-6">
              {mockAppointments.map((appt) => (
                <div key={appt.id} className={`flex gap-4 ${appt.faded ? 'opacity-50' : ''}`}>
                  <div className="flex-shrink-0 w-12 h-12 bg-surface-container rounded-lg flex flex-col items-center justify-center text-on-surface">
                    <span className="text-[10px] uppercase font-bold text-slate-500">{appt.month}</span>
                    <span className="text-lg font-bold">{appt.day}</span>
                  </div>
                  <div className="flex-1">
                    <h4 className="text-sm font-bold text-on-surface">{appt.title}</h4>
                    <p className="text-xs text-on-surface-variant">
                      {appt.patient} • {appt.time}
                    </p>
                  </div>
                  <span className="material-symbols-outlined text-primary text-[20px]">{appt.icon}</span>
                </div>
              ))}
            </div>
            <button className="w-full mt-8 py-3 bg-surface-container-low hover:bg-surface-container-high text-on-surface-variant rounded-lg text-xs font-bold uppercase tracking-widest transition-colors">
              Manage Calendar
            </button>
          </div>

          {/* Lab alert card */}
          <div className="bg-primary text-white p-6 rounded-xl relative overflow-hidden shadow-lg">
            <div className="absolute -right-6 -bottom-6 opacity-20 transform rotate-12">
              <span className="material-symbols-outlined text-8xl">science</span>
            </div>
            <h4 className="font-bold text-lg mb-2 relative z-10">Lab Results Pending</h4>
            <p className="text-primary-fixed-dim text-xs mb-4 relative z-10 leading-relaxed">
              3 critical lab reports from the Radiology unit require your immediate signature.
            </p>
            <button className="bg-white text-primary px-4 py-2 rounded-lg text-xs font-bold relative z-10 shadow-lg shadow-black/10 transition-transform active:scale-95">
              Review Now
            </button>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="mt-16 flex justify-between items-center text-slate-400 text-xs font-medium border-t border-outline-variant/10 pt-8">
        <p>© 2024 Atelier Health Clinical Information System. All rights reserved.</p>
        <div className="flex gap-6">
          <a href="#" className="hover:text-primary transition-colors">Privacy Protocol</a>
          <a href="#" className="hover:text-primary transition-colors">System Health</a>
        </div>
      </footer>
    </DashboardLayout>
  );
};
