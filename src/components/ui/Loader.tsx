import React from 'react';
import { Cardio } from 'ldrs/react';
import 'ldrs/react/Cardio.css';

interface LoaderProps {
  size?: string;
  color?: string;
  fullScreen?: boolean;
  label?: string;
}

export const Loader: React.FC<LoaderProps> = ({
  size = '40',
  color = '#006068',
  fullScreen = false,
  label,
}) => {
  if (fullScreen) {
    return (
      <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-surface/80 backdrop-blur-sm gap-4">
        <Cardio size={size} stroke="4" speed="2" color={color} />
        {label && (
          <p className="text-sm font-medium text-on-surface-variant animate-pulse">{label}</p>
        )}
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center gap-3">
      <Cardio size={size} stroke="4" speed="2" color={color} />
      {label && (
        <span className="text-sm font-medium text-on-surface-variant">{label}</span>
      )}
    </div>
  );
};

export default Loader;
