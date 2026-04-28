import React from 'react';
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import type { ConditionDataPoint } from '../../types';

interface ConditionChartProps {
  data: ConditionDataPoint[];
}

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-on-surface text-white text-xs px-3 py-2 rounded-lg shadow-ambient">
        <p className="font-bold">{payload[0].name}</p>
        <p>{payload[0].value}%</p>
      </div>
    );
  }
  return null;
};

export const ConditionChart: React.FC<ConditionChartProps> = ({ data }) => (
  <div>
    <div className="h-52">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={55}
            outerRadius={85}
            paddingAngle={3}
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip content={<CustomTooltip />} />
        </PieChart>
      </ResponsiveContainer>
    </div>

    {/* Legend */}
    <div className="space-y-3 mt-4">
      {data.map((item) => (
        <div key={item.name} className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div
              className="w-2.5 h-2.5 rounded-full"
              style={{ backgroundColor: item.color }}
            />
            <span className="text-xs font-medium text-on-surface">{item.name}</span>
          </div>
          <span className="text-xs font-bold text-on-surface">{item.value}%</span>
        </div>
      ))}
    </div>
  </div>
);
