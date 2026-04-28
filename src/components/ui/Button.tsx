import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'tertiary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
  leftIcon?: string;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  loading,
  leftIcon,
  children,
  className = '',
  disabled,
  ...rest
}) => {
  const base =
    'inline-flex items-center justify-center gap-2 font-semibold tracking-wide rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary/20 disabled:opacity-60 disabled:cursor-not-allowed';

  const sizes = {
    sm: 'px-3 py-1.5 text-xs',
    md: 'px-4 py-2.5 text-xs uppercase tracking-wider',
    lg: 'px-6 py-3.5 text-sm uppercase tracking-wider',
  };

  const variants = {
    primary:
      'primary-gradient text-white shadow-sm hover:opacity-95 active:scale-[0.98]',
    secondary:
      'bg-surface-container-high text-on-surface-variant hover:bg-surface-container-highest',
    tertiary:
      'text-tertiary hover:underline bg-transparent',
    ghost:
      'bg-transparent text-on-surface-variant hover:bg-surface-container-low',
  };

  return (
    <button
      className={`${base} ${sizes[size]} ${variants[variant]} ${className}`}
      disabled={disabled || loading}
      {...rest}
    >
      {loading ? (
        <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
      ) : leftIcon ? (
        <span className="material-symbols-outlined text-[18px]">{leftIcon}</span>
      ) : null}
      {children}
    </button>
  );
};
