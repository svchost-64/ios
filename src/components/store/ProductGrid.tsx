import React, { useMemo } from 'react';
import { useCatalogStore, SortOption } from '../../store/useCatalogStore';
import { AppleDevice } from '../../types/apple';
import { CATEGORIES } from '../../data/applePresets';
import { formatCOP } from '../../utils/currency';
import { Search } from 'lucide-react';

export const ProductGrid: React.FC = () => {
  const {
    products,
    selectedCategory,
    searchQuery,
    inStockOnly,
    setInStockOnly,
    sortBy,
    setSortBy,
    clearFilters,
    openProductDetail,
  } = useCatalogStore();

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    return products
      .filter((product) => {
        // Category filter
        if (selectedCategory !== 'all' && product.category !== selectedCategory) {
          return false;
        }

        // Search query
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase();
          const matchesModel = product.model?.toLowerCase().includes(q);
          const matchesName = product.name?.toLowerCase().includes(q);
          const matchesDesc = product.description?.toLowerCase().includes(q);
          const matchesTagline = product.tagline?.toLowerCase().includes(q);
          const matchesCategory = product.category?.toLowerCase().includes(q);
          const matchesColors = product.colors?.some((c) =>
            c.name.toLowerCase().includes(q)
          );
          if (
            !matchesModel &&
            !matchesName &&
            !matchesDesc &&
            !matchesTagline &&
            !matchesCategory &&
            !matchesColors
          ) {
            return false;
          }
        }

        // In-stock filter
        if (inStockOnly && (!product.isAvailable || product.stockUnits <= 0)) {
          return false;
        }

        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'price-asc') return a.basePrice - b.basePrice;
        if (sortBy === 'price-desc') return b.basePrice - a.basePrice;
        if (sortBy === 'name') return (a.model || a.name || '').localeCompare(b.model || b.name || '');
        // Default 'featured'
        return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
      });
  }, [products, selectedCategory, searchQuery, inStockOnly, sortBy]);

  const currentCategoryObj = CATEGORIES.find((c) => c.id === selectedCategory);

  return (
    <section id="catalog-section" className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Refined Section Header & Sizable Controls */}
      <div className="flex flex-col md:flex-row md:items-end justify-between pb-8 border-b border-black/[0.06] gap-4">
        <div>
          <h2 className="text-2xl sm:text-3xl font-semibold text-neutral-900 tracking-tight">
            {selectedCategory === 'all'
              ? 'Todos los Modelos'
              : `Modelos ${currentCategoryObj?.label || ''}`}
          </h2>
          <p className="text-sm text-neutral-500 mt-1 font-normal">
            {filteredProducts.length} {filteredProducts.length === 1 ? 'dispositivo disponible' : 'dispositivos disponibles'}
          </p>
        </div>

        {/* Minimalist Filters and Sort */}
        <div className="flex items-center gap-4 text-xs">
          {/* Subtle In-Stock Toggle */}
          <label
            htmlFor="filter-in-stock-toggle"
            className="inline-flex items-center gap-2 cursor-pointer text-neutral-600 hover:text-neutral-900 transition-colors select-none"
          >
            <input
              type="checkbox"
              id="filter-in-stock-toggle"
              checked={inStockOnly}
              onChange={(e) => setInStockOnly(e.target.checked)}
              className="rounded border-neutral-300 text-neutral-900 focus:ring-0 focus:ring-offset-0 cursor-pointer"
            />
            <span>Solo en stock</span>
          </label>

          <span className="text-neutral-200">|</span>

          {/* Sizable Sort Dropdown */}
          <div className="flex items-center gap-1.5 text-neutral-500">
            <label htmlFor="catalog-sort-select" className="text-neutral-500">Ordenar:</label>
            <select
              id="catalog-sort-select"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as SortOption)}
              className="bg-transparent font-medium text-neutral-900 focus:outline-none cursor-pointer py-1 pr-2"
            >
              <option value="featured">Destacados</option>
              <option value="price-asc">Menor precio</option>
              <option value="price-desc">Mayor precio</option>
              <option value="name">Nombre</option>
            </select>
          </div>

          {/* Clear Filters Link */}
          {(selectedCategory !== 'all' || searchQuery || inStockOnly) && (
            <>
              <span className="text-neutral-200">|</span>
              <button
                type="button"
                id="clear-filters-btn"
                onClick={clearFilters}
                className="text-neutral-500 hover:text-neutral-900 transition-colors cursor-pointer"
              >
                Limpiar filtros
              </button>
            </>
          )}
        </div>
      </div>

      {/* Product Cards Grid */}
      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-8">
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onSelect={() => openProductDetail(product.id)}
            />
          ))}
        </div>
      ) : (
        /* Empty State */
        <div className="text-center py-24 bg-white rounded-2xl border border-black/[0.06] my-8 p-8 max-w-lg mx-auto">
          <div className="w-10 h-10 rounded-full bg-neutral-100 text-neutral-400 flex items-center justify-center mx-auto mb-3">
            <Search className="w-5 h-5 stroke-[1.5]" />
          </div>
          <h3 className="text-base font-semibold text-neutral-900">
            No se encontraron modelos
          </h3>
          <p className="text-sm text-neutral-500 mt-1 max-w-xs mx-auto">
            No hay dispositivos que coincidan con los filtros seleccionados.
          </p>
          <div className="mt-5">
            <button
              type="button"
              onClick={clearFilters}
              className="text-sm font-medium text-neutral-900 hover:underline cursor-pointer"
            >
              Restablecer filtros
            </button>
          </div>
        </div>
      )}
    </section>
  );
};

interface ProductCardProps {
  product: AppleDevice;
  onSelect: () => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onSelect }) => {
  const primaryImage =
    product.images[0] ||
    'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-16-pro-desert-titanium-select?wid=940&hei=1112&fmt=png-alpha';

  // Format understated technical subtitle according to Apple Human Interface Guidelines
  const technicalSubtitle = useMemo(() => {
    if (product.category === 'iphone') {
      const isTitanium = product.specs.finish?.toLowerCase().includes('titanio');
      const material = isTitanium ? 'Titanio Grado 5' : 'Aluminio aeroespacial';
      const chip = product.specs.chip ? product.specs.chip.split('(')[0].trim() : 'Chip A18 Pro';
      return `${material} • ${chip}`;
    }
    if (product.category === 'mac') {
      const chip = product.specs.chip ? product.specs.chip.split('(')[0].trim() : 'Chip Apple Silicon';
      const display = product.specs.display ? product.specs.display.split('"')[0] + '"' : 'Liquid Retina';
      return `${chip} • Pantalla ${display}`;
    }
    if (product.category === 'watch') {
      const isUltra = product.model?.includes('Ultra');
      const casing = isUltra ? 'Titanio aeroespacial' : 'Caja delgada';
      const chip = product.specs.chip ? product.specs.chip.split('(')[0].trim() : 'Chip S10 SiP';
      return `${casing} • ${chip}`;
    }
    if (product.category === 'audio') {
      const anc = product.specs.anc || 'Cancelación Activa de Ruido';
      const chip = product.specs.chip || 'Chip H2';
      return `${anc} • ${chip}`;
    }
    if (product.category === 'ipad') {
      const chip = product.specs.chip ? product.specs.chip.split('(')[0].trim() : 'Chip M4';
      const display = product.specs.display ? product.specs.display.split('"')[0] + '"' : 'Ultra Retina XDR';
      return `${chip} • Pantalla ${display}`;
    }
    return product.specs.chip || product.tagline || 'Diseñado por Apple';
  }, [product]);

  return (
    <div
      id={`product-card-${product.id}`}
      onClick={onSelect}
      className="group relative bg-white rounded-2xl border border-black/[0.06] p-6 flex flex-col justify-between transition-all duration-200 hover:border-neutral-300 cursor-pointer text-left"
    >
      <div>
        {/* 1. Device Image floating on pure white background */}
        <div className="h-52 w-full flex items-center justify-center p-2 bg-white mb-6 overflow-hidden">
          <img
            src={primaryImage}
            alt={product.model || product.name}
            className="max-h-full max-w-full object-contain transition-transform duration-300 group-hover:scale-[1.03]"
            loading="lazy"
            referrerPolicy="no-referrer"
            onError={(e) => {
              (e.target as HTMLImageElement).src =
                'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-16-pro-desert-titanium-select?wid=940&hei=1112&fmt=png-alpha';
            }}
          />
        </div>

        {/* 2. Product Name */}
        <h3 className="font-semibold text-neutral-900 text-lg tracking-tight leading-snug">
          {product.model || product.name}
        </h3>

        {/* 3. Small minimalist color dots (12px circles) */}
        {product.colors && product.colors.length > 0 && (
          <div className="flex items-center gap-1.5 mt-2.5">
            {product.colors.slice(0, 5).map((col, idx) => (
              <span
                key={`${col.name}-${idx}`}
                title={col.name}
                className="w-3 h-3 rounded-full border border-black/10 shrink-0"
                style={{ backgroundColor: col.hex }}
              />
            ))}
            {product.colors.length > 5 && (
              <span className="text-[11px] text-neutral-400 font-normal">
                +{product.colors.length - 5}
              </span>
            )}
          </div>
        )}

        {/* 4. Subtle technical subtitle in gray */}
        <p className="text-sm text-neutral-500 mt-2 font-normal line-clamp-1">
          {technicalSubtitle}
        </p>
      </div>

      {/* 5. Clean price & 6. Sober text link */}
      <div className="pt-6 mt-4 border-t border-black/[0.04] flex items-baseline justify-between">
        <div>
          <span className="text-base font-medium text-neutral-900">
            {formatCOP(product.basePrice)} COP
          </span>
        </div>

        <span
          id={`configure-link-${product.id}`}
          className="text-sm font-medium text-neutral-900 group-hover:text-neutral-600 transition-colors inline-flex items-center gap-0.5"
        >
          Configurar &rarr;
        </span>
      </div>
    </div>
  );
};
