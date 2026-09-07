import React, { useState, useEffect, useMemo } from 'react';
import { useCatalogStore } from '../../store/useCatalogStore';
import { Modal } from '../ui/Modal';
import { formatCOP, calculateVariantPrice } from '../../utils/currency';
import {
  MessageCircle,
  Copy,
  Check,
  ShieldCheck,
  Truck,
  Cpu,
  Tv,
  Camera,
  Battery,
  Layers,
  Watch,
  Wifi,
  Sparkles,
} from 'lucide-react';

export const ProductDetailModal: React.FC = () => {
  const { products, selectedProductId, closeProductDetail, showToast } = useCatalogStore();

  const product = useMemo(() => {
    return products.find((p) => p.id === selectedProductId) || null;
  }, [products, selectedProductId]);

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [selectedColorIndex, setSelectedColorIndex] = useState(0);
  const [selectedVariantId, setSelectedVariantId] = useState<string>('');
  const [copied, setCopied] = useState(false);

  // Initialize or reset selections when the opened product changes
  useEffect(() => {
    if (product) {
      setActiveImageIndex(0);
      setSelectedColorIndex(0);
      const firstVariant = product.variants?.[0];
      setSelectedVariantId(firstVariant ? firstVariant.id : '');
    }
  }, [product]);

  if (!product) return null;

  const colors = product.colors || [];
  const currentColor = colors[selectedColorIndex] || colors[0] || { name: 'Estándar', hex: '#1D1D1F' };

  const variants = product.variants || [];
  const currentVariant = variants.find((v) => v.id === selectedVariantId) || variants[0];

  // Dynamic price calculation in real-time
  const finalPriceCOP = calculateVariantPrice(
    product.basePrice,
    currentVariant ? currentVariant.priceModifier : 0
  );

  // WhatsApp Message Generator conforming to exact requested specification
  const whatsappMessage = useMemo(() => {
    const model = product.model || product.name;
    const capacityOrSize = currentVariant?.label || 'Estándar';
    const finish = currentColor?.name || 'Estándar';
    return `Hola, estoy interesado en adquirir el ${model} de ${capacityOrSize} en acabado ${finish}. ¿Tienen disponibilidad inmediata?`;
  }, [product.model, product.name, currentVariant, currentColor]);

  const handleOpenWhatsApp = () => {
    const encoded = encodeURIComponent(whatsappMessage);
    const url = `https://wa.me/573001234567?text=${encoded}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const handleCopyMessage = async () => {
    try {
      await navigator.clipboard.writeText(whatsappMessage);
      setCopied(true);
      showToast({
        type: 'success',
        title: 'Mensaje copiado al portapapeles',
        description: 'Pega el texto directamente en el chat de WhatsApp.',
      });
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  };

  const images = product.images && product.images.length > 0
    ? product.images
    : ['https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-16-pro-max-desert-titanium-select?wid=940&hei=1112&fmt=png-alpha'];

  const specsList = [
    { label: 'Procesador', val: product.specs.chip, icon: Cpu },
    { label: 'Pantalla', val: product.specs.display, icon: Tv },
    { label: 'Cámaras', val: product.specs.camera, icon: Camera },
    { label: 'Autonomía', val: product.specs.battery, icon: Battery },
    { label: 'Acabado y Material', val: product.specs.finish, icon: Layers },
    { label: 'Caja y Dimensiones', val: product.specs.caseSize, icon: Watch },
    { label: 'Conectividad', val: product.specs.connectivity, icon: Wifi },
    { label: 'Audio y Cancelación', val: product.specs.anc || product.specs.audio, icon: Sparkles },
  ].filter((s) => Boolean(s.val));

  return (
    <Modal
      isOpen={Boolean(selectedProductId)}
      onClose={closeProductDetail}
      maxWidth="max-w-5xl"
    >
      <div className="p-6 sm:p-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          {/* LEFT: Product Visual Gallery */}
          <div className="lg:col-span-6 flex flex-col justify-between">
            <div>
              {/* Main Preview: Clean device on pure white floating background */}
              <div className="relative aspect-square w-full bg-white rounded-2xl flex items-center justify-center p-8 overflow-hidden border border-black/[0.06]">
                <img
                  src={images[activeImageIndex] || images[0]}
                  alt={product.model}
                  className="max-h-full max-w-full object-contain transition-all duration-300 transform hover:scale-102"
                  referrerPolicy="no-referrer"
                />
              </div>

              {/* Thumbnails */}
              {images.length > 1 && (
                <div className="flex items-center gap-3 mt-4 overflow-x-auto pb-2 no-scrollbar">
                  {images.map((img, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setActiveImageIndex(idx)}
                      className={`relative w-16 h-16 rounded-xl border p-1.5 bg-white shrink-0 transition-all cursor-pointer ${
                        activeImageIndex === idx
                          ? 'border-[#DC2626] ring-1 ring-[#DC2626]'
                          : 'border-black/[0.06] hover:border-neutral-400'
                      }`}
                    >
                      <img
                        src={img}
                        alt={`Vista ${idx + 1}`}
                        className="w-full h-full object-contain"
                        referrerPolicy="no-referrer"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Subtle Service Guarantees */}
            <div className="mt-8 pt-6 border-t border-black/[0.06] grid grid-cols-2 gap-4 text-xs text-neutral-500">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-neutral-900 shrink-0" />
                <span>Garantía Oficial Apple de 1 Año</span>
              </div>
              <div className="flex items-center gap-2">
                <Truck className="w-4 h-4 text-neutral-900 shrink-0" />
                <span>Entrega asegurada en Nariño</span>
              </div>
            </div>
          </div>

          {/* RIGHT: Product Specs & Dynamic Configurator */}
          <div className="lg:col-span-6 flex flex-col justify-between space-y-6">
            <div>
              {/* Category */}
              <span className="text-xs font-semibold uppercase tracking-wider text-neutral-500 block">
                {product.category}
              </span>

              {/* Model Title */}
              <h2 className="text-2xl sm:text-3xl font-semibold text-neutral-900 tracking-tight mt-1">
                {product.model}
              </h2>

              <p className="text-sm text-neutral-500 mt-1.5 leading-relaxed font-normal">
                {product.description || product.tagline}
              </p>

              {/* Real-time Dynamic Price Display */}
              <div className="mt-5 p-4 rounded-xl bg-[#F5F5F7] border border-black/[0.04] flex items-baseline justify-between">
                <div>
                  <span className="text-[11px] text-neutral-500 uppercase tracking-wider block">
                    Precio de Configuración
                  </span>
                  <div className="flex items-baseline gap-2 mt-0.5">
                    <span className="text-2xl sm:text-3xl font-semibold text-neutral-900 tracking-tight">
                      {formatCOP(finalPriceCOP)}
                    </span>
                    <span className="text-xs text-neutral-500 font-medium">COP</span>
                  </div>
                </div>
                {currentVariant && currentVariant.priceModifier > 0 && (
                  <span className="text-xs font-medium text-neutral-600 bg-black/[0.05] px-2.5 py-1 rounded-md">
                    +{formatCOP(currentVariant.priceModifier)}
                  </span>
                )}
              </div>

              {/* Color Finish Selector */}
              {colors.length > 0 && (
                <div className="mt-6 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-medium text-neutral-900">
                      Acabado:{' '}
                      <span className="text-neutral-500 font-normal">{currentColor.name}</span>
                    </span>
                  </div>

                  <div className="flex items-center gap-3">
                    {colors.map((c, idx) => (
                      <button
                        key={c.name}
                        type="button"
                        onClick={() => setSelectedColorIndex(idx)}
                        className={`group relative p-1 rounded-full transition-all cursor-pointer ${
                          selectedColorIndex === idx
                            ? 'ring-2 ring-[#DC2626] ring-offset-2'
                            : 'hover:scale-105'
                        }`}
                        title={c.name}
                      >
                        <span
                          className="block w-6 h-6 rounded-full border border-black/10 shadow-2xs"
                          style={{ backgroundColor: c.hex }}
                        />
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Variant / Storage / Case Size Selector */}
              {variants.length > 0 && (
                <div className="mt-6 space-y-2">
                  <span className="text-xs font-medium text-neutral-900 block">
                    Capacidad / Medida de Caja
                  </span>

                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                    {variants.map((variant) => {
                      const isSelected = selectedVariantId === variant.id;
                      return (
                        <button
                          key={variant.id}
                          type="button"
                          onClick={() => setSelectedVariantId(variant.id)}
                          className={`p-3 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                            isSelected
                              ? 'border-[#DC2626] bg-[#DC2626]/5 ring-1 ring-[#DC2626]'
                              : 'border-black/[0.08] bg-white hover:border-neutral-400'
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <span className="text-xs font-medium text-neutral-900">
                              {variant.label}
                            </span>
                            {isSelected && (
                              <Check className="w-3.5 h-3.5 text-[#DC2626]" />
                            )}
                          </div>
                          <span className="text-[11px] text-neutral-500 mt-1 font-normal">
                            {variant.priceModifier === 0
                              ? 'Base'
                              : `+${formatCOP(variant.priceModifier)}`}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Hardware Specifications Overview */}
              {specsList.length > 0 && (
                <div className="mt-6 border-t border-black/[0.06] pt-4 space-y-2.5">
                  <span className="text-xs font-medium text-neutral-900 block">
                    Especificaciones Técnicas
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                    {specsList.map((item, i) => {
                      const Icon = item.icon;
                      return (
                        <div
                          key={i}
                          className="flex items-start gap-2 bg-[#F5F5F7] p-2.5 rounded-lg border border-black/[0.04]"
                        >
                          <Icon className="w-4 h-4 text-neutral-400 shrink-0 mt-0.5" />
                          <div>
                            <span className="text-[10px] text-neutral-500 block">
                              {item.label}
                            </span>
                            <span className="font-medium text-neutral-900 leading-tight block">
                              {item.val}
                            </span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>

            {/* ACTION SECTION: WhatsApp CTA & Copy Box */}
            <div className="space-y-3 pt-4 border-t border-black/[0.06]">
              {/* WhatsApp Message Preview Quote */}
              <div className="bg-[#F5F5F7] p-3 rounded-xl border border-black/[0.04] text-[11px] text-neutral-500 leading-relaxed flex items-start gap-2">
                <MessageCircle className="w-4 h-4 text-[#16A34A] shrink-0 mt-0.5" />
                <div className="flex-1">
                  <span className="font-medium text-neutral-900 block mb-0.5">
                    Mensaje para WhatsApp:
                  </span>
                  <span className="text-neutral-700 select-all">
                    "{whatsappMessage}"
                  </span>
                </div>
              </div>

              {/* Action Buttons: WhatsApp in #16A34A */}
              <div className="flex flex-col sm:flex-row items-center gap-3">
                <button
                  id="modal-whatsapp-cta-btn"
                  type="button"
                  onClick={handleOpenWhatsApp}
                  className="w-full flex-1 inline-flex items-center justify-center gap-2 bg-[#16A34A] hover:bg-[#15803D] text-white py-3 px-5 rounded-full font-medium text-sm transition-colors cursor-pointer"
                >
                  <MessageCircle className="w-4 h-4 fill-current" />
                  <span>Consultar Disponibilidad en WhatsApp</span>
                </button>

                <button
                  type="button"
                  onClick={handleCopyMessage}
                  className="w-full sm:w-auto shrink-0 inline-flex items-center justify-center gap-1.5 border border-black/[0.12] hover:bg-neutral-50 text-neutral-900 py-3 px-4 rounded-full text-xs font-medium transition-colors cursor-pointer"
                >
                  {copied ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-[#16A34A]" />
                      <span>Copiado</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5 text-neutral-500" />
                      <span>Copiar Texto</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};
