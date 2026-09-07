import React from 'react';
import { useCatalogStore } from '../../store/useCatalogStore';
import { ShieldCheck, MessageCircle, ArrowUp } from 'lucide-react';

export const StoreFooter: React.FC = () => {
  const { setActiveView } = useCatalogStore();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleWhatsApp = () => {
    const msg = encodeURIComponent('Hola iNariño, deseo comunicarme con el equipo de soporte y ventas.');
    window.open(`https://wa.me/573001234567?text=${msg}`, '_blank');
  };

  return (
    <footer className="bg-[#F5F5F7] border-t border-[#E5E5EA] text-[#86868B] text-xs mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
        {/* Top concierge bar */}
        <div className="bg-white p-6 rounded-2xl border border-[#E5E5EA] flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="space-y-1 text-center md:text-left">
            <h4 className="text-sm font-bold text-[#1D1D1F]">
              ¿Necesitas asesoría personalizada o configuración corporativa?
            </h4>
            <p className="text-xs text-[#86868B]">
              Nuestros especialistas Apple están disponibles por WhatsApp para resolver dudas sobre financiamiento y retomas.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button
              type="button"
              id="footer-whatsapp-btn"
              onClick={handleWhatsApp}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#16A34A] hover:bg-[#15803D] text-white font-medium text-xs shadow-xs transition-colors cursor-pointer"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Chatear con Especialista</span>
            </button>
          </div>
        </div>

        {/* Legal and Disclaimer notes */}
        <div className="space-y-3 text-[11px] leading-relaxed text-[#86868B] border-t border-[#E5E5EA]/80 pt-6">
          <p>
            1. El stock está sujeto a disponibilidad y confirmación inmediata con nuestros asesores en el momento de emisión de la orden de compra.
          </p>
          <p>
            2. Apple, el logotipo de Apple, iPhone, Apple Watch, AirPods, MacBook, iPad y Liquid Retina son marcas comerciales de Apple Inc., registradas en EE. UU. y en otros países y regiones.
          </p>
          <p>
            3. iNariño opera como distribuidor de hardware premium garantizando productos nuevos sellados de fábrica con cobertura AppleCare oficial de 1 año.
          </p>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-[#E5E5EA] pt-6 text-[11px]">
          <div className="flex items-center gap-2 text-[#1D1D1F] font-semibold">
            <span>Copyright &copy; 2026 iNariño &bull; Apple Premium Reseller.</span>
            <span className="text-[#86868B] font-normal">Todos los derechos reservados.</span>
          </div>

          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={() => setActiveView('admin')}
              className="hover:text-[#1D1D1F] underline transition-colors"
            >
              Acceso Administrativo
            </button>
            <button
              type="button"
              onClick={scrollToTop}
              className="inline-flex items-center gap-1 hover:text-[#1D1D1F] transition-colors"
            >
              <span>Subir</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
