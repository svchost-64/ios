import React from 'react';
import { useCatalogStore } from '../../store/useCatalogStore';
import { Search, LayoutDashboard, ShoppingBag, MessageCircle } from 'lucide-react';

export const StoreNavbar: React.FC = () => {
  const {
    activeView,
    setActiveView,
    setSelectedCategory,
    searchQuery,
    setSearchQuery,
  } = useCatalogStore();

  const handleWhatsAppGeneralClick = () => {
    const message = encodeURIComponent(
      'Hola iNariño, me gustaría recibir asesoría sobre la disponibilidad de dispositivos Apple oficiales.'
    );
    window.open(`https://wa.me/573001234567?text=${message}`, '_blank', 'noopener,noreferrer');
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-white/90 backdrop-blur-md border-b border-black/[0.06] transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">
          {/* Brand & Apple Minimalist Monogram */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              id="nav-logo-btn"
              onClick={() => {
                setActiveView('store');
                setSelectedCategory('all');
              }}
              className="flex items-center gap-2.5 text-neutral-900 hover:opacity-80 transition-opacity cursor-pointer group"
            >
              {/* Apple SVG Icon */}
              <div className="w-7 h-7 flex items-center justify-center text-neutral-900">
                <svg className="w-5 h-5 fill-current" viewBox="0 0 170 170" aria-label="Apple">
                  <path d="M150.37 130.25c-2.45 5.66-5.35 10.87-8.71 15.66-4.58 6.53-8.33 11.05-11.22 13.56-4.48 4.12-9.28 6.23-14.42 6.35-3.69 0-8.14-1.05-13.32-3.18-5.19-2.12-9.97-3.17-14.34-3.17-4.58 0-9.49 1.05-14.75 3.17-5.26 2.13-9.5 3.24-12.74 3.35-4.35.13-9.16-1.9-14.42-6.08-3.7-3.08-7.7-7.94-12-14.58-6.19-9.58-11-20.97-14.43-34.17-3.43-13.2-5.15-25.04-5.15-35.53 0-14.38 3.63-26.27 10.89-35.67 7.26-9.4 16.32-14.16 27.18-14.28 4.35 0 9.24 1.14 14.67 3.42 5.43 2.28 9.38 3.45 11.85 3.51 2.08 0 6.13-1.25 12.15-3.76 6.02-2.5 11.29-3.66 15.82-3.48 11.66.65 20.89 4.88 27.69 12.69-10.45 6.32-15.57 15.1-15.36 26.34.22 8.93 3.69 16.27 10.42 22.02 6.73 5.75 14.77 9.07 24.12 9.97-2.17 6.43-4.8 13.06-7.89 19.89zM119.22 33.64c0-7.28 2.65-14.15 7.94-20.61 5.3-6.46 11.88-10.84 19.75-13.13.22 1.3.33 2.49.33 3.58 0 7.39-2.77 14.44-8.31 21.14-5.54 6.7-12.28 10.74-20.21 12.12-.11-1.08-.16-2.12-.16-3.1z" />
                </svg>
              </div>
              <div className="text-left">
                <span className="text-sm font-semibold tracking-tight text-neutral-900 block leading-tight">
                  iNariño
                </span>
                <span className="text-[10px] text-neutral-500 uppercase tracking-wider block font-medium">
                  Premium Reseller
                </span>
              </div>
            </button>
          </div>

          {/* Clean Monochromatic Search Input */}
          <div className="flex-1 max-w-md hidden md:block">
            <div className="relative">
              <Search className="w-3.5 h-3.5 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                id="navbar-search-input"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  if (activeView !== 'store') {
                    setActiveView('store');
                  }
                }}
                placeholder="Buscar iPhone, Apple Watch, Mac, AirPods..."
                className="w-full bg-[#F5F5F7] hover:bg-[#EBEBEF] focus:bg-white text-xs text-neutral-900 placeholder-neutral-400 pl-9 pr-4 py-2 rounded-full border border-transparent focus:border-black/[0.12] focus:outline-none transition-all"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-neutral-400 hover:text-neutral-900"
                >
                  Limpiar
                </button>
              )}
            </div>
          </div>

          {/* Controls: WhatsApp & Clean View Switcher */}
          <div className="flex items-center gap-3">
            {/* WhatsApp CTA with #16A34A accent */}
            <button
              id="navbar-whatsapp-cta"
              type="button"
              onClick={handleWhatsAppGeneralClick}
              className="inline-flex items-center gap-1.5 bg-[#16A34A] hover:bg-[#15803D] text-white text-xs font-medium px-3.5 py-1.5 rounded-full transition-colors cursor-pointer"
              title="Atención directa vía WhatsApp"
            >
              <MessageCircle className="w-3.5 h-3.5 fill-current" />
              <span className="hidden sm:inline">WhatsApp</span>
            </button>

            {/* View Switcher: Catálogo vs Admin (Pure Apple Segmented Control) */}
            <div className="flex items-center bg-neutral-100 p-0.5 rounded-full border border-black/[0.04]">
              <button
                type="button"
                id="nav-view-store-btn"
                onClick={() => setActiveView('store')}
                className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium transition-all cursor-pointer ${
                  activeView === 'store'
                    ? 'bg-white text-neutral-900 shadow-2xs'
                    : 'text-neutral-500 hover:text-neutral-900'
                }`}
              >
                <ShoppingBag className="w-3.5 h-3.5" />
                <span className="hidden xs:inline">Catálogo</span>
              </button>

              <button
                type="button"
                id="nav-view-admin-btn"
                onClick={() => setActiveView('admin')}
                className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium transition-all cursor-pointer ${
                  activeView === 'admin'
                    ? 'bg-neutral-900 text-white shadow-2xs'
                    : 'text-neutral-500 hover:text-neutral-900'
                }`}
              >
                <LayoutDashboard className="w-3.5 h-3.5" />
                <span>Admin</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
