import React from 'react';

export interface BadgeProps {
  children: React.ReactNode;
  variant?: 'default' | 'crimson' | 'emerald' | 'subtle' | 'outline' | 'titanium';
  size?: 'sm' | 'md';
  className?: string;
  id?: string;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'default',
  size = 'md',
  className = '',
  id,
}) => {
  const baseStyles = 'inline-flex items-center font-medium tracking-tight whitespace-nowrap rounded-full transition-colors';

  const sizeStyles = {
    sm: 'text-[11px] px-2.5 py-0.5',
    md: 'text-xs px-3 py-1',
  };

  const variantStyles = {
    default: 'bg-[#1D1D1F] text-white',
    crimson: 'bg-[#DC2626] text-white shadow-sm shadow-red-900/10',
    emerald: 'bg-[#DCFCE7] text-[#166534] border border-[#BBF7D0]',
    subtle: 'bg-[#E8E8ED] text-[#1D1D1F]',
    outline: 'bg-transparent border border-[#D2D2D7] text-[#1D1D1F]',
    titanium: 'bg-gradient-to-r from-[#ECEAE5] to-[#E3DFD7] text-[#4A4742] border border-[#D8D4CA]',
  };

  return (
    <span
      id={id}
      className={`${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${className}`}
    >
      {children}
    </span>
  );
};
