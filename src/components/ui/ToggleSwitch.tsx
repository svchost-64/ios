import React from 'react';

export interface ToggleSwitchProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label?: string;
  sublabel?: string;
  disabled?: boolean;
  accentColor?: 'crimson' | 'emerald' | 'default';
  id?: string;
}

export const ToggleSwitch: React.FC<ToggleSwitchProps> = ({
  checked,
  onChange,
  label,
  sublabel,
  disabled = false,
  accentColor = 'crimson',
  id,
}) => {
  const switchId = id || `toggle-${Math.random().toString(36).substring(2, 8)}`;

  const activeColors = {
    crimson: 'bg-[#DC2626]',
    emerald: 'bg-[#16A34A]',
    default: 'bg-[#1D1D1F]',
  };

  return (
    <div className="flex items-center justify-between gap-3">
      {(label || sublabel) && (
        <label htmlFor={switchId} className="cursor-pointer select-none">
          {label && <p className="text-sm font-medium text-[#1D1D1F]">{label}</p>}
          {sublabel && <p className="text-xs text-[#86868B]">{sublabel}</p>}
        </label>
      )}

      <button
        type="button"
        id={switchId}
        role="switch"
        aria-checked={checked}
        disabled={disabled}
        onClick={() => !disabled && onChange(!checked)}
        className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full p-0.5 transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-[#DC2626]/20 disabled:cursor-not-allowed disabled:opacity-40 ${
          checked ? activeColors[accentColor] : 'bg-[#E5E5EA]'
        }`}
      >
        <span
          className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-sm ring-0 transition duration-200 ease-in-out ${
            checked ? 'translate-x-5' : 'translate-x-0'
          }`}
        />
      </button>
    </div>
  );
};
