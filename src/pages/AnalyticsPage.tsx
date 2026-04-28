import React, { useEffect, useState } from 'react';
import { DashboardLayout } from '../components/layout/DashboardLayout';
import { VisitsChart } from '../components/analytics/VisitsChart';
import { ConditionChart } from '../components/analytics/ConditionChart';
import { SkeletonChartBlock, SkeletonCard } from '../components/ui/Skeleton';
import { usePatientStore } from '../store/patientStore';
import { visitData, conditionData, mockDepartments } from '../data/mockData';

const analyticsKpis = [
  {
    label: 'Total Patient Volume',
    value: '1,284',
    delta: '+12.5%',
    positive: true,
    icon: 'groups',
    accent: 'border-primary-fixed',
  },
  {
    label: 'Avg. Wait Time',
    value: '14.2m',
    delta: '+4.1%',
    positive: false,
    icon: 'schedule',
    accent: 'border-secondary',
  },
  {
    label: 'Clinician Utilization',
    value: '92.4%',
    delta: '-1.2%',
    positive: true,
    icon: 'monitoring',
    accent: 'border-tertiary-container',
  },
  {
    label: 'Revenue Per Visit',
    value: '$248',
    delta: '+8.3%',
    positive: true,
    icon: 'payments',
    accent: 'border-primary',
  },
];

const statusColor = {
  Optimal: 'bg-teal-100 text-teal-700',
  Delayed: 'bg-error-container text-on-error-container',
  'At Risk': 'bg-amber-100 text-amber-700',
};

export const AnalyticsPage: React.FC = () => {
  const { patients, isLoading, fetchPatients } = usePatientStore();
  const [timeFilter, setTimeFilter] = useState<'Daily' | 'Weekly' | 'Monthly'>('Daily');

  useEffect(() => {
    fetchPatients();
  }, []);

  // ─── Derive real condition distribution ─────────────────────────────────────
  const conditionDistribution = React.useMemo(() => {
    if (patients.length === 0) return conditionData;
    
    const counts: Record<string, number> = {};
    patients.forEach((p) => {
      counts[p.condition] = (counts[p.condition] || 0) + 1;
    });

    const total = patients.length;
    const colors = ['#0077B6', '#00B4D8', '#90E0EF', '#0096C7', '#48CAE1'];
    
    return Object.entries(counts)
      .map(([name, count], idx) => ({
        name,
        value: Math.round((count / total) * 100),
        color: colors[idx % colors.length],
      }))
      .sort((a, b) => b.value - a.value)
      .slice(0, 5); // Show top 5
  }, [patients]);

  const analyticsKpis = [
    {
      label: 'Total Patient Volume',
      value: isLoading ? '...' : patients.length.toString(),
      delta: '+12.5%',
      positive: true,
      icon: 'groups',
      accent: 'border-primary-fixed',
    },
    {
      label: 'Avg. Wait Time',
      value: '14.2m',
      delta: '+4.1%',
      positive: false,
      icon: 'schedule',
      accent: 'border-secondary',
    },
    {
      label: 'Clinician Utilization',
      value: '92.4%',
      delta: '-1.2%',
      positive: true,
      icon: 'monitoring',
      accent: 'border-tertiary-container',
    },
    {
      label: 'Revenue Per Visit',
      value: '$248',
      delta: '+8.3%',
      positive: true,
      icon: 'payments',
      accent: 'border-primary',
    },
  ];

  return (
    <DashboardLayout>
      {/* Page header */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12">
        <div>
          <h1 className="text-4xl font-headline font-extrabold text-on-surface tracking-tight mb-2">
            Clinical Performance
          </h1>
          <p className="text-on-surface-variant text-sm max-w-lg">
            Advanced longitudinal analysis of clinic throughput, patient outcomes, and resource utilization metrics.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          {/* Time filter */}
          <div className="bg-surface-container-low p-1 rounded-lg flex items-center gap-1">
            {(['Daily', 'Weekly', 'Monthly'] as const).map((f) => (
              <button
                key={f}
                onClick={() => setTimeFilter(f)}
                className={`px-4 py-1.5 text-xs font-semibold rounded-md transition-all ${
                  timeFilter === f
                    ? 'bg-white shadow-sm text-primary'
                    : 'text-on-surface-variant hover:text-on-surface'
                }`}
              >
                {f}
              </button>
            ))}
          </div>

          <div className="h-10 px-4 bg-surface-container-lowest border border-outline-variant/20 rounded-lg flex items-center gap-2 cursor-pointer hover:bg-surface-container-low transition-colors shadow-sm">
            <span className="material-symbols-outlined text-[16px]">calendar_today</span>
            <span className="text-xs font-medium">Oct 01 - Oct 31, 2024</span>
            <span className="material-symbols-outlined text-[16px]">expand_more</span>
          </div>

          <button className="h-10 px-4 primary-gradient text-white rounded-lg flex items-center gap-2 hover:opacity-90 transition-opacity">
            <span className="material-symbols-outlined text-[16px]">filter_list</span>
            <span className="text-xs font-bold uppercase tracking-wider">Refine View</span>
          </button>
        </div>
      </div>

      {/* KPI Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        {isLoading && patients.length === 0
          ? Array.from({ length: 4 }).map((_, i) => <SkeletonCard key={i} />)
          : analyticsKpis.map((kpi) => (
              <div
                key={kpi.label}
                className={`bg-surface-container-lowest p-6 rounded-xl shadow-sm border-l-4 ${kpi.accent} relative overflow-hidden group`}
              >
                <div className="relative z-10">
                  <p className="text-xs font-bold text-on-surface-variant uppercase tracking-widest mb-4">
                    {kpi.label}
                  </p>
                  <div className="flex items-baseline gap-2">
                    <span className="text-3xl font-headline font-extrabold">{kpi.value}</span>
                    <span
                      className={`text-xs font-bold flex items-center ${
                        kpi.positive ? 'text-teal-600' : 'text-error'
                      }`}
                    >
                      <span className="material-symbols-outlined text-[12px]">
                        {kpi.positive ? 'trending_up' : 'trending_up'}
                      </span>
                      {kpi.delta}
                    </span>
                  </div>
                </div>
                <div className="absolute bottom-0 right-0 p-2 opacity-5 group-hover:opacity-10 transition-opacity">
                  <span className="material-symbols-outlined text-7xl">{kpi.icon}</span>
                </div>
              </div>
            ))}
      </div>

      {/* Charts grid */}
      <div className="grid grid-cols-12 gap-8 mb-8">
        {/* Visits trend chart */}
        <div className="col-span-12 lg:col-span-8 bg-surface-container-lowest p-8 rounded-xl shadow-sm">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h3 className="text-lg font-headline font-bold text-on-surface">Patient Volume Trends</h3>
              <p className="text-xs text-on-surface-variant">Daily admissions vs. discharge cycles</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-primary" />
                <span className="text-[10px] font-bold uppercase tracking-wider text-on-surface-variant">Admissions</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-tertiary-fixed-dim" />
                <span className="text-[10px] font-bold uppercase tracking-wider text-on-surface-variant">Discharges</span>
              </div>
            </div>
          </div>
          {isLoading && patients.length === 0 ? <SkeletonChartBlock height="h-64" /> : <VisitsChart data={visitData} />}
        </div>

        {/* Condition distribution donut */}
        <div className="col-span-12 lg:col-span-4 bg-surface-container-lowest p-8 rounded-xl shadow-sm">
          <h3 className="text-lg font-headline font-bold text-on-surface mb-2">Condition Mix</h3>
          <p className="text-xs text-on-surface-variant mb-6">Patient distribution by diagnosis</p>
          {isLoading && patients.length === 0 ? (
            <>
              <SkeletonChartBlock height="h-52" />
              <div className="mt-4 space-y-3">
                {Array.from({ length: 5 }).map((_, i) => (
                  <div key={i} className="flex justify-between">
                    <div className="skeleton h-3 w-28 rounded" />
                    <div className="skeleton h-3 w-8 rounded" />
                  </div>
                ))}
              </div>
            </>
          ) : (
            <ConditionChart data={conditionDistribution} />
          )}
        </div>
      </div>

      {/* Departmental ledger */}
      <div className="bg-surface-container-lowest rounded-xl shadow-sm overflow-hidden mb-8">
        <div className="p-8 pb-4">
          <h3 className="text-lg font-headline font-bold text-on-surface mb-2">
            Departmental Operational Ledger
          </h3>
          <p className="text-xs text-on-surface-variant">Real-time efficiency metrics across all active wards</p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-surface-container-low/50">
              <tr>
                {['Department', 'Total Staff', 'Wait Time', 'Efficiency', 'Status'].map((h) => (
                  <th
                    key={h}
                    className="px-8 py-4 text-[10px] font-bold text-on-surface-variant uppercase tracking-widest"
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant/10">
              {mockDepartments.map((dept, idx) => (
                <tr
                  key={dept.name}
                  className={`hover:bg-surface-container-low transition-colors ${
                    idx % 2 !== 0 ? 'bg-surface-container-low/30' : ''
                  }`}
                >
                  <td className="px-8 py-5 text-sm font-semibold">{dept.name}</td>
                  <td className="px-8 py-5 text-sm text-on-surface-variant">{dept.staff} Personnel</td>
                  <td className="px-8 py-5 text-sm font-medium">{dept.waitTime}</td>
                  <td className="px-8 py-5">
                    <div className="w-32 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full ${
                          dept.status === 'Delayed' ? 'bg-error/70' : 'bg-primary'
                        }`}
                        style={{ width: `${dept.efficiency}%` }}
                      />
                    </div>
                  </td>
                  <td className="px-8 py-5">
                    <span
                      className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-tight ${
                        statusColor[dept.status]
                      }`}
                    >
                      {dept.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="p-6 text-center border-t border-outline-variant/10">
          <button className="text-xs font-bold text-primary hover:underline transition-all">
            Download Detailed Departmental Audit (.CSV)
          </button>
        </div>
      </div>

      {/* Bottom insight row */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Intelligence insight */}
        <div className="lg:col-span-5 bg-surface-container-low p-8 rounded-xl flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-primary rounded-lg text-white">
                <span className="material-symbols-outlined text-lg">auto_awesome</span>
              </div>
              <h3 className="text-xl font-headline font-bold text-on-surface">Intelligence Insights</h3>
            </div>
            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="w-1 h-12 bg-primary-fixed rounded-full shrink-0" />
                <div>
                  <p className="text-sm font-bold mb-1">Bottleneck Detected</p>
                  <p className="text-xs text-on-surface-variant leading-relaxed">
                    Wait times in Oncology have increased by 22% since 08:00 AM. Suggest redirecting floating nurses to Ward 4.
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-1 h-12 bg-teal-500/20 rounded-full shrink-0" />
                <div>
                  <p className="text-sm font-bold mb-1">Discharge Optimization</p>
                  <p className="text-xs text-on-surface-variant leading-relaxed">
                    Average recovery time is down 1.2 days this month due to improved post-op protocol efficiency.
                  </p>
                </div>
              </div>
            </div>
          </div>
          <button className="mt-12 w-full py-4 bg-white border border-outline-variant/20 rounded-xl text-xs font-bold uppercase tracking-widest hover:bg-slate-50 transition-colors shadow-sm">
            View Recommendation Hub
          </button>
        </div>

        {/* Satisfaction mini grid */}
        <div className="lg:col-span-7 grid grid-cols-2 gap-6">
          <div className="bg-primary p-8 rounded-xl text-white relative overflow-hidden">
            <div className="relative z-10">
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] mb-8 opacity-80">Patient NPS</p>
              <div className="flex items-end gap-3 mb-2">
                <span className="text-5xl font-headline font-extrabold">8.4</span>
                <span className="text-sm font-bold mb-2">/ 10.0</span>
              </div>
              <p className="text-xs opacity-80">+1.2 from last quarter</p>
            </div>
            <div className="absolute -right-4 -bottom-4 opacity-10">
              <span className="material-symbols-outlined text-9xl">sentiment_very_satisfied</span>
            </div>
          </div>
          <div className="bg-surface-container-highest p-8 rounded-xl relative overflow-hidden group">
            <div className="relative z-10">
              <p className="text-[10px] font-bold text-on-surface-variant uppercase tracking-[0.2em] mb-8">
                System Uptime
              </p>
              <div className="flex items-end gap-2 mb-2">
                <span className="text-5xl font-headline font-extrabold text-primary">99.9</span>
                <span className="text-sm font-bold text-on-surface-variant mb-2">%</span>
              </div>
              <div className="flex gap-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <div
                    key={i}
                    className={`h-1 flex-1 rounded-full ${i < 4 ? 'bg-primary' : 'bg-slate-300'}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};
