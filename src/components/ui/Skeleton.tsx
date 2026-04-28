import React from 'react';

interface SkeletonProps {
  className?: string;
  count?: number;
}

export const Skeleton: React.FC<SkeletonProps> = ({ className = '', count = 1 }) => {
  return (
    <>
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className={`skeleton ${className}`} />
      ))}
    </>
  );
};

export const SkeletonCard: React.FC = () => (
  <div className="bg-surface-container-lowest rounded-xl p-6 relative overflow-hidden">
    <div className="absolute left-0 top-0 bottom-0 w-1 skeleton" />
    <div className="flex justify-between items-start mb-4">
      <Skeleton className="w-10 h-10 rounded-lg" />
      <Skeleton className="w-12 h-5 rounded" />
    </div>
    <Skeleton className="w-24 h-3 mb-2" />
    <Skeleton className="w-20 h-8" />
  </div>
);

export const SkeletonTableRow: React.FC = () => (
  <tr>
    <td className="px-6 py-4">
      <div className="flex items-center gap-3">
        <Skeleton className="w-8 h-8 rounded-full" />
        <Skeleton className="w-32 h-4" />
      </div>
    </td>
    <td className="px-6 py-4"><Skeleton className="w-16 h-4 rounded-full" /></td>
    <td className="px-6 py-4"><Skeleton className="w-28 h-4" /></td>
    <td className="px-6 py-4"><Skeleton className="w-16 h-4" /></td>
    <td className="px-6 py-4 text-right"><Skeleton className="w-6 h-6 ml-auto rounded" /></td>
  </tr>
);

export const SkeletonPatientCard: React.FC = () => (
  <div className="bg-surface-container-lowest rounded-xl p-5">
    <div className="flex items-start justify-between mb-4">
      <Skeleton className="w-12 h-12 rounded-xl" />
      <Skeleton className="w-16 h-5 rounded-full" />
    </div>
    <Skeleton className="w-32 h-5 mb-1" />
    <Skeleton className="w-24 h-3 mb-3" />
    <Skeleton className="w-full h-px mb-3" />
    <div className="flex justify-between">
      <Skeleton className="w-20 h-3" />
      <Skeleton className="w-16 h-3" />
    </div>
  </div>
);

export const SkeletonChartBlock: React.FC<{ height?: string }> = ({ height = 'h-64' }) => (
  <div className={`${height} rounded-xl skeleton`} />
);
