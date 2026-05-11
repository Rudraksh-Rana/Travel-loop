'use client';

interface BadgeProps {
  label: string;
  variant?: 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'info';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const variants = {
  primary: 'bg-primary/10 text-primary border border-primary/30',
  secondary: 'bg-surface-2 text-text border border-divider',
  success: 'bg-green-100 text-green-900 border border-green-300',
  warning: 'bg-yellow-100 text-yellow-900 border border-yellow-300',
  error: 'bg-red-100 text-red-900 border border-red-300',
  info: 'bg-blue-100 text-blue-900 border border-blue-300',
};

const sizes = {
  sm: 'px-2 py-1 text-xs',
  md: 'px-3 py-1.5 text-sm',
  lg: 'px-4 py-2 text-base',
};

export function Badge({
  label,
  variant = 'primary',
  size = 'md',
  className = '',
}: BadgeProps) {
  return (
    <span className={`inline-flex items-center rounded-full font-semibold whitespace-nowrap ${variants[variant]} ${sizes[size]} ${className}`}>
      {label}
    </span>
  );
}
