import React, { useState, useEffect, useMemo } from 'react';
import { useCatalogStore } from '../../store/useCatalogStore';
import { Category, ProductColor, ProductVariant } from '../../types/apple';
import { CATEGORIES, OFFICIAL_MODEL_PRESETS } from '../../data/applePresets';
import { Dropzone } from '../ui/Dropzone';
import { ToggleSwitch } from '../ui/ToggleSwitch';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { formatCOP } from '../../utils/currency';
import { Check, Sparkles, Layers, DollarSign, Package, Tag, Info } from 'lucide-react';

interface AddProductFormProps {
  onSuccess?: () => void;
}

export const AddProductForm: React.FC<AddProductFormProps> = ({ onSuccess }) => {
  const { addProduct } = useCatalogStore();

  // 1. Cascading Category & Model Selection
  const [selectedCategory, setSelectedCategory] = useState<Category>('iphone');

  // Filter available presets for current category
  const categoryPresets = useMemo(
    () => OFFICIAL_MODEL_PRESETS.filter((p) => p.category === selectedCategory),
    [selectedCategory]
  );

  const [selectedPresetId, setSelectedPresetId] = useState<string>(
    categoryPresets[0]?.id || ''
  );

  // Active preset object
  const activePreset = useMemo(
    () => categoryPresets.find((p) => p.id === selectedPresetId) || categoryPresets[0],
    [categoryPresets, selectedPresetId]
  );

  // 2. Dynamic Variant Selections
  const [selectedColorIndex, setSelectedColorIndex] = useState(0);
  const [selectedVariantIndex, setSelectedVariantIndex] = useState(0);

  // 3. Form Inputs
  const [price, setPrice] = useState<number>(activePreset?.basePriceCOP || 5499000);
  const [stockUnits, setStockUnits] = useState<number>(10);
  const [isAvailable, setIsAvailable] = useState<boolean>(true);
  const [description, setDescription] = useState<string>(activePreset?.tagline || '');
  const [badge, setBadge] = useState<string>(activePreset?.defaultBadge || 'Nuevo');
  const [images, setImages] = useState<string[]>(activePreset?.sampleImages || []);

  // Update defaults when category or preset changes
  useEffect(() => {
    if (categoryPresets.length > 0) {
      const first = categoryPresets[0];
      setSelectedPresetId(first.id);
      setSelectedColorIndex(0);
      setSelectedVariantIndex(0);
      setPrice(first.basePriceCOP);
      setDescription(first.tagline);
      setBadge(first.defaultBadge || 'Nuevo');
      setImages(first.sampleImages);
    }
  }, [selectedCategory, categoryPresets]);

  // When changing preset within same category
  const handlePresetChange = (presetId: string) => {
    setSelectedPresetId(presetId);
    const found = categoryPresets.find((p) => p.id === presetId);
    if (found) {
      setSelectedColorIndex(0);
      setSelectedVariantIndex(0);
      setPrice(found.basePriceCOP);
      setDescription(found.tagline);
      setBadge(found.defaultBadge || 'Nuevo');
      setImages(found.sampleImages);
    }
  };

  const currentColor: ProductColor =
    activePreset?.colors[selectedColorIndex] || {
      name: 'Titanio Natural',
      hex: '#9A9690',
      finishType: 'titanium',
    };

  const currentVariant: ProductVariant =
    activePreset?.variants[selectedVariantIndex] || {
      id: 'default',
      label: '256 GB',
      priceModifier: 0,
    };

  // 4. Real-time Computed Product Title required by specification:
  // "[Modelo] [Capacidad/Tamaño] - Acabado [Color]"
  const computedTitle = useMemo(() => {
    if (!activePreset) return '';
    return `${activePreset.name} ${currentVariant.label} - Acabado ${currentColor.name}`;
  }, [activePreset, currentVariant, currentColor]);

  // Handle submit and injection to global store + local persistence
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!activePreset) return;

    // Transform to exact catalog.json schema
    addProduct({
      model: activePreset.name,
      name: computedTitle,
      category: selectedCategory,
      basePrice: price,
      description: description.trim() || activePreset.tagline,
      tagline: description.trim() || activePreset.tagline,
      images: images.length > 0 ? images : activePreset.sampleImages,
      colors: activePreset.colors,
      variants: activePreset.variants,
      specs: activePreset.specs,
      isAvailable: isAvailable && stockUnits > 0,
      stockUnits: stockUnits,
      badge: badge || undefined,
      featured: true,
    });

    if (onSuccess) {
      onSuccess();
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-[#E5E5EA] p-6 sm:p-8 max-w-4xl mx-auto shadow-xs">
      <div className="border-b border-[#F2F2F7] pb-5 mb-6 flex items-center justify-between">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-[#1D1D1F] tracking-tight">
            Alta de Dispositivo Apple
          </h2>
          <p className="text-xs sm:text-sm text-[#86868B] mt-0.5">
            Configura y publica hardware oficial con variantes de titanio, capacidades y almacenamiento en COP.
          </p>
        </div>
        <div className="hidden sm:block">
          <Badge variant="titanium" size="md">
            Módulo Autorizado
          </Badge>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-7">
        {/* Step 1: Category Selector */}
        <div className="space-y-2">
          <label className="text-xs font-semibold uppercase tracking-wider text-[#86868B] flex items-center gap-1.5">
            <Layers className="w-3.5 h-3.5" />
            1. Categoría de Producto
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                type="button"
                id={`admin-cat-select-${cat.id}`}
                onClick={() => setSelectedCategory(cat.id)}
                className={`py-2.5 px-3 rounded-xl border text-xs font-medium transition-all text-center cursor-pointer ${
                  selectedCategory === cat.id
                    ? 'border-[#1D1D1F] bg-[#1D1D1F] text-white shadow-xs'
                    : 'border-[#E5E5EA] bg-white text-[#1D1D1F] hover:bg-[#F5F5F7]'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Step 2: Model Preset Selection (Cascading) */}
        <div className="space-y-2">
          <label className="text-xs font-semibold uppercase tracking-wider text-[#86868B] flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5" />
            2. Modelo Oficial Apple
          </label>
          <select
            id="admin-model-preset-select"
            value={selectedPresetId}
            onChange={(e) => handlePresetChange(e.target.value)}
            className="w-full bg-[#F5F5F7] border border-[#E5E5EA] rounded-xl px-4 py-3 text-sm text-[#1D1D1F] font-semibold focus:bg-white focus:border-[#1D1D1F] focus:outline-none transition-colors"
          >
            {categoryPresets.map((preset) => (
              <option key={preset.id} value={preset.id}>
                {preset.name} — {preset.tagline}
              </option>
            ))}
          </select>
        </div>

        {/* Step 3: Variants Configuration (Colors and Capacities/Sizes) */}
        {activePreset && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-[#F5F5F7] p-5 rounded-2xl border border-[#E5E5EA]">
            {/* Color Swatch selector */}
            <div className="space-y-2.5">
              <span className="text-xs font-bold text-[#1D1D1F] block">
                Acabado Oficial Seleccionado:
              </span>
              <div className="flex flex-wrap gap-2">
                {activePreset.colors.map((col, idx) => (
                  <button
                    key={col.name}
                    type="button"
                    onClick={() => setSelectedColorIndex(idx)}
                    className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border text-xs transition-all cursor-pointer ${
                      selectedColorIndex === idx
                        ? 'border-[#DC2626] bg-white text-[#1D1D1F] font-semibold shadow-xs ring-1 ring-[#DC2626]'
                        : 'border-[#E5E5EA] bg-white text-[#86868B] hover:text-[#1D1D1F]'
                    }`}
                  >
                    <span
                      className="w-3.5 h-3.5 rounded-full border border-black/10 shrink-0"
                      style={{ backgroundColor: col.hex }}
                    />
                    <span>{col.name}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Sizes / Capacities selector */}
            <div className="space-y-2.5">
              <span className="text-xs font-bold text-[#1D1D1F] block">
                Capacidad / Medida de Caja:
              </span>
              <div className="flex flex-wrap gap-2">
                {activePreset.variants.map((v, idx) => (
                  <button
                    key={v.id}
                    type="button"
                    onClick={() => setSelectedVariantIndex(idx)}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs transition-all cursor-pointer ${
                      selectedVariantIndex === idx
                        ? 'border-[#DC2626] bg-white text-[#1D1D1F] font-semibold shadow-xs ring-1 ring-[#DC2626]'
                        : 'border-[#E5E5EA] bg-white text-[#86868B] hover:text-[#1D1D1F]'
                    }`}
                  >
                    {selectedVariantIndex === idx && (
                      <Check className="w-3 h-3 text-[#DC2626]" />
                    )}
                    <span>{v.label}</span>
                    {v.priceModifier > 0 && (
                      <span className="text-[10px] text-[#DC2626] font-mono">
                        (+{formatCOP(v.priceModifier)})
                      </span>
                    )}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Step 4: Computed Read-Only Title */}
        <div className="space-y-1.5">
          <label className="text-xs font-semibold uppercase tracking-wider text-[#86868B] flex items-center justify-between">
            <span className="flex items-center gap-1.5">
              <Tag className="w-3.5 h-3.5" />
              Título Generado en Tiempo Real (Solo Lectura)
            </span>
            <span className="text-[10px] text-[#16A34A] font-semibold bg-[#16A34A]/10 px-2 py-0.5 rounded-full">
              Sintaxis Oficial Apple
            </span>
          </label>
          <div className="relative">
            <input
              type="text"
              id="admin-computed-title"
              readOnly
              value={computedTitle}
              className="w-full bg-[#F5F5F7] border border-[#E5E5EA] rounded-xl px-4 py-3 text-sm text-[#1D1D1F] font-bold tracking-tight cursor-default select-all"
            />
          </div>
          <p className="text-[11px] text-[#86868B]">
            Formato normalizado: <code className="text-[#1D1D1F]">[Modelo] [Capacidad/Tamaño] - Acabado [Color]</code>
          </p>
        </div>

        {/* Step 5: Commercial Pricing, Stock & Badge */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="space-y-1.5">
            <label className="text-xs font-semibold uppercase tracking-wider text-[#86868B] flex items-center gap-1">
              <DollarSign className="w-3.5 h-3.5" />
              Precio Base (COP)
            </label>
            <div className="relative">
              <input
                type="number"
                id="admin-product-price"
                min="0"
                step="50000"
                value={price}
                onChange={(e) => setPrice(Number(e.target.value))}
                className="w-full bg-white border border-[#E5E5EA] rounded-xl px-4 py-2.5 text-sm text-[#1D1D1F] font-semibold focus:border-[#1D1D1F] focus:outline-none"
                required
              />
            </div>
            <span className="text-[11px] text-[#86868B]">
              Equivalente: {formatCOP(price)}
            </span>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold uppercase tracking-wider text-[#86868B] flex items-center gap-1">
              <Package className="w-3.5 h-3.5" />
              Unidades en Stock
            </label>
            <input
              type="number"
              id="admin-product-stock"
              min="0"
              max="500"
              value={stockUnits}
              onChange={(e) => setStockUnits(Number(e.target.value))}
              className="w-full bg-white border border-[#E5E5EA] rounded-xl px-4 py-2.5 text-sm text-[#1D1D1F] font-semibold focus:border-[#1D1D1F] focus:outline-none"
              required
            />
            <span className="text-[11px] text-[#86868B]">
              Inventario físico en tienda
            </span>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold uppercase tracking-wider text-[#86868B]">
              Etiqueta / Distintivo
            </label>
            <select
              id="admin-product-badge"
              value={badge}
              onChange={(e) => setBadge(e.target.value)}
              className="w-full bg-white border border-[#E5E5EA] rounded-xl px-4 py-2.5 text-sm text-[#1D1D1F] font-medium focus:border-[#1D1D1F] focus:outline-none"
            >
              <option value="Nuevo">Nuevo</option>
              <option value="Destacado">Destacado</option>
              <option value="Titanio Grado 5">Titanio Grado 5</option>
              <option value="Oferta Exclusiva">Oferta Exclusiva</option>
              <option value="Pro Display">Pro Display</option>
            </select>
          </div>
        </div>

        {/* Step 6: Description & Marketing Tagline */}
        <div className="space-y-1.5">
          <label className="text-xs font-semibold uppercase tracking-wider text-[#86868B]">
            Descripción Comercial del Dispositivo
          </label>
          <input
            type="text"
            id="admin-product-tagline"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full bg-white border border-[#E5E5EA] rounded-xl px-4 py-2.5 text-sm text-[#1D1D1F] focus:border-[#1D1D1F] focus:outline-none"
            placeholder="Ej: Chip A18 Pro. Titanio aeroespacial y cámara de 48 MP."
          />
        </div>

        {/* Step 7: Dropzone with 5 Image Limit & Individual Deletion */}
        <div className="space-y-2">
          <Dropzone
            images={images}
            onChange={setImages}
            maxImages={5}
          />
        </div>

        {/* Step 8: Immediate Availability Toggle */}
        <div className="bg-[#F5F5F7] p-4 rounded-xl border border-[#E5E5EA] flex items-center justify-between">
          <div className="space-y-0.5">
            <span className="text-xs font-bold text-[#1D1D1F] block">
              Disponibilidad Inmediata en Catálogo
            </span>
            <p className="text-[11px] text-[#86868B]">
              Si está activo, los clientes podrán solicitarlo directamente por WhatsApp.
            </p>
          </div>
          <ToggleSwitch
            checked={isAvailable}
            onChange={setIsAvailable}
            label="Disponibilidad Inmediata"
          />
        </div>

        {/* Submit Actions */}
        <div className="flex flex-col sm:flex-row items-center justify-end gap-3 pt-4 border-t border-[#E5E5EA]">
          <Button
            type="submit"
            id="admin-submit-publish-btn"
            variant="primary"
            size="lg"
            className="w-full sm:w-auto px-8"
          >
            Publicar en Tienda
          </Button>
        </div>
      </form>
    </div>
  );
};
