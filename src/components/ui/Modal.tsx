import React, { useEffect } from 'react';
import { X } from 'lucide-react';

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  subtitle?: string;
  children: React.ReactNode;
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '4xl' | '5xl';
  id?: string;
}

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  subtitle,
  children,
  maxWidth = '4xl',
  id = 'app-modal',
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const maxWidthClasses = {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-lg',
    xl: 'max-w-xl',
    '2xl': 'max-w-2xl',
    '4xl': 'max-w-4xl',
    '5xl': 'max-w-5xl',
  };

  return (
    <div
      id={id}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto"
      role="dialog"
      aria-modal="true"
    >
      {/* Frosted Backdrop with Apple blur */}
      <div
        className="fixed inset-0 bg-black/40 backdrop-blur-md transition-opacity animate-in fade-in duration-200"
        onClick={onClose}
      />

      {/* Modal Container */}
      <div
        className={`relative z-10 w-full ${maxWidthClasses[maxWidth]} bg-white rounded-2xl shadow-2xl border border-[#E5E5EA] overflow-hidden my-auto max-h-[92vh] flex flex-col`}
      >
        {/* Header (optional if provided) */}
        {(title || subtitle) && (
          <div className="flex items-center justify-between px-6 py-4 border-b border-[#F2F2F7] shrink-0">
            <div>
              {title && <h3 className="text-lg font-semibold text-[#1D1D1F] tracking-tight">{title}</h3>}
              {subtitle && <p className="text-xs text-[#86868B] mt-0.5">{subtitle}</p>}
            </div>
            <button
              type="button"
              id="modal-close-btn"
              onClick={onClose}
              className="p-2 rounded-full text-[#86868B] hover:text-[#1D1D1F] hover:bg-[#F5F5F7] transition-colors"
              aria-label="Cerrar ventana"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        )}

        {/* Floating close button if no header */}
        {!title && !subtitle && (
          <button
            type="button"
            id="modal-close-btn-floating"
            onClick={onClose}
            className="absolute top-4 right-4 z-20 p-2 rounded-full bg-[#F5F5F7]/80 hover:bg-[#E8E8ED] text-[#1D1D1F] backdrop-blur-sm transition-colors"
            aria-label="Cerrar modal"
          >
            <X className="w-5 h-5" />
          </button>
        )}

        {/* Body content with scroll */}
        <div className="overflow-y-auto flex-1 p-6">
          {children}
        </div>
      </div>
    </div>
  );
};
