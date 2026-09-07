import React from 'react';
import { useCatalogStore } from '../../store/useCatalogStore';
import { formatCOP } from '../../utils/currency';

export const StoreHero: React.FC = () => {
  const { openProductDetail, products } = useCatalogStore();

  // Flagship product: iPhone 16 Pro Max or first available device
  const flagship =
    products.find((p) => p.model?.includes('iPhone 16 Pro Max') || p.name?.includes('iPhone 16 Pro Max')) ||
    products[0];

  return (
    <section className="relative overflow-hidden bg-[#F5F5F7] border-b border-black/[0.06]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Left Text Content - Apple Typographic Sophistication */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            <span className="text-sm font-semibold text-neutral-500 tracking-tight block">
              iPhone 16 Pro
            </span>

            <div className="space-y-3">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-tight text-neutral-900 leading-[1.06]">
                Titanio. Tan fuerte. <br />
                <span className="text-neutral-500">Tan ligero. Tan Pro.</span>
              </h1>
              <p className="text-base sm:text-lg text-neutral-500 max-w-xl mx-auto lg:mx-0 leading-relaxed font-normal">
                Diseñado en titanio aeroespacial con el chip A18 Pro, nuevo Control de Cámara y una autonomía sin precedentes.
              </p>
            </div>

            {/* Price reference in sober Apple typography */}
            <div className="text-sm font-medium text-neutral-900">
              {flagship ? `Desde ${formatCOP(flagship.basePrice)} COP` : 'Desde $ 5.499.000 COP'}
            </div>

            {/* CTAs: Clean Apple style button and subtle link */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
              {flagship && (
                <button
                  type="button"
                  id="hero-configure-btn"
                  onClick={() => openProductDetail(flagship.id)}
                  className="bg-neutral-900 hover:bg-neutral-800 text-white text-sm font-medium px-6 py-2.5 rounded-full transition-colors cursor-pointer"
                >
                  Configurar {flagship.model || flagship.name}
                </button>
              )}

              <button
                type="button"
                id="hero-browse-btn"
                onClick={() => {
                  const el = document.getElementById('catalog-section');
                  el?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="text-sm font-medium text-neutral-600 hover:text-neutral-900 transition-colors cursor-pointer"
              >
                Ver todos los modelos &darr;
              </button>
            </div>
          </div>

          {/* Right Hardware Visual Showcase */}
          <div className="lg:col-span-5 flex justify-center items-center">
            <div className="relative w-full max-w-md aspect-square flex items-center justify-center">
              {flagship && flagship.images.length > 0 ? (
                <img
                  src={flagship.images[0]}
                  alt={flagship.model || flagship.name}
                  className="max-h-full max-w-full object-contain drop-shadow-md hover:scale-[1.02] transition-transform duration-500"
                  loading="eager"
                  referrerPolicy="no-referrer"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src =
                      'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-16-pro-desert-titanium-select?wid=940&hei=1112&fmt=png-alpha';
                  }}
                />
              ) : (
                <div className="w-64 h-64 rounded-2xl bg-white border border-black/[0.06] flex items-center justify-center text-sm font-medium text-neutral-400">
                  Apple Hardware Display
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
