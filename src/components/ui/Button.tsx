import React from 'react';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'whatsapp' | 'crimson' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  fullWidth?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  icon,
  iconPosition = 'left',
  fullWidth = false,
  className = '',
  disabled,
  id,
  ...props
}) => {
  // Padding strictly adheres to horizontal = 2x vertical:
  // sm: py-2 px-4 (8px vertical, 16px horizontal)
  // md: py-3 px-6 (12px vertical, 24px horizontal)
  // lg: py-3.5 px-7 (14px vertical, 28px horizontal)
  const sizeStyles = {
    sm: 'text-xs py-2 px-4 rounded-full gap-1.5',
    md: 'text-sm py-3 px-6 rounded-full gap-2 font-medium',
    lg: 'text-base py-3.5 px-7 rounded-full gap-2.5 font-semibold',
  };

  const variantStyles = {
    primary:
      'bg-[#1D1D1F] text-white hover:bg-[#000000] active:scale-[0.98] border border-transparent shadow-sm',
    secondary:
      'bg-[#F5F5F7] text-[#1D1D1F] hover:bg-[#E8E8ED] active:scale-[0.98] border border-[#D2D2D7]/60',
    whatsapp:
      'bg-[#16A34A] text-white hover:bg-[#15803D] active:scale-[0.98] shadow-sm shadow-emerald-900/10 border border-transparent',
    crimson:
      'bg-[#DC2626] text-white hover:bg-[#B91C1C] active:scale-[0.98] shadow-sm shadow-red-900/15 border border-transparent',
    ghost:
      'bg-transparent text-[#1D1D1F] hover:bg-[#F5F5F7] active:scale-[0.98] border border-transparent',
    danger:
      'bg-red-50 text-[#DC2626] hover:bg-red-100 active:scale-[0.98] border border-red-200',
  };

  return (
    <button
      id={id}
      disabled={disabled}
      className={`inline-flex items-center justify-center whitespace-nowrap select-none transition-all duration-150 cursor-pointer disabled:opacity-45 disabled:cursor-not-allowed disabled:pointer-events-none ${
        sizeStyles[size]
      } ${variantStyles[variant]} ${fullWidth ? 'w-full' : ''} ${className}`}
      {...props}
    >
      {icon && iconPosition === 'left' && <span className="shrink-0">{icon}</span>}
      <span>{children}</span>
      {icon && iconPosition === 'right' && <span className="shrink-0">{icon}</span>}
    </button>
  );
};
