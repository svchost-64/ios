import React from 'react';
import { useCatalogStore } from '../../store/useCatalogStore';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

export const Toast: React.FC = () => {
  const { toast, clearToast } = useCatalogStore();

  if (!toast) return null;

  const iconMap = {
    success: <CheckCircle2 className="w-4 h-4 text-[#16A34A] shrink-0" />,
    warning: <AlertCircle className="w-4 h-4 text-[#DC2626] shrink-0" />,
    info: <Info className="w-4 h-4 text-[#1D1D1F] shrink-0" />,
  };

  return (
    <div
      id="global-toast"
      className="fixed bottom-6 right-6 z-50 max-w-sm w-full bg-white/95 backdrop-blur-md rounded-2xl border border-[#E5E5EA] p-4 shadow-xl animate-in slide-in-from-bottom-5 duration-200"
      role="status"
      aria-live="polite"
    >
      <div className="flex items-start gap-3">
        <div className="mt-0.5">{iconMap[toast.type]}</div>
        <div className="flex-1 min-w-0">
          <p className="text-xs font-bold text-[#1D1D1F] tracking-tight">{toast.title}</p>
          {toast.description && (
            <p className="text-[11px] text-[#86868B] mt-0.5 leading-normal">
              {toast.description}
            </p>
          )}
        </div>
        <button
          type="button"
          onClick={clearToast}
          className="text-[#86868B] hover:text-[#1D1D1F] p-1 rounded-md"
          aria-label="Cerrar notificación"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
