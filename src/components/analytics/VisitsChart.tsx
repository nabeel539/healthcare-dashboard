import React from 'react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import type { VisitDataPoint } from '../../types';

interface VisitsChartProps {
  data: VisitDataPoint[];
}

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-on-surface text-white text-xs px-3 py-2 rounded-lg shadow-ambient">
        <p className="font-bold mb-1">{label}</p>
        {payload.map((p: any) => (
          <p key={p.dataKey} style={{ color: p.color }}>
            {p.name}: <span className="font-bold">{p.value}</span>
          </p>
        ))}
      </div>
    );
  }
  return null;
};

export const VisitsChart: React.FC<VisitsChartProps> = ({ data }) => (
  <div className="h-64">
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart data={data} margin={{ top: 5, right: 20, left: -20, bottom: 0 }}>
        <defs>
          <linearGradient id="admissions" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#006068" stopOpacity={0.2} />
            <stop offset="95%" stopColor="#006068" stopOpacity={0} />
          </linearGradient>
          <linearGradient id="discharges" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#a9c7ff" stopOpacity={0.2} />
            <stop offset="95%" stopColor="#a9c7ff" stopOpacity={0} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" stroke="#eceef0" vertical={false} />
        <XAxis
          dataKey="month"
          tick={{ fontSize: 10, fill: '#6e797a', fontFamily: 'Inter' }}
          axisLine={false}
          tickLine={false}
        />
        <YAxis
          tick={{ fontSize: 10, fill: '#6e797a', fontFamily: 'Inter' }}
          axisLine={false}
          tickLine={false}
        />
        <Tooltip content={<CustomTooltip />} />
        <Area
          type="monotone"
          dataKey="admissions"
          name="Admissions"
          stroke="#006068"
          strokeWidth={2}
          fill="url(#admissions)"
          dot={false}
          activeDot={{ r: 4, fill: '#006068' }}
        />
        <Area
          type="monotone"
          dataKey="discharges"
          name="Discharges"
          stroke="#a9c7ff"
          strokeWidth={2}
          fill="url(#discharges)"
          dot={false}
          activeDot={{ r: 4, fill: '#a9c7ff' }}
        />
      </AreaChart>
    </ResponsiveContainer>
  </div>
);
