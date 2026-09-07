export type Category = 'iphone' | 'watch' | 'mac' | 'audio' | 'ipad';

export interface ProductColor {
  name: string;
  hex: string;
  finishType?: 'titanium' | 'aluminum' | 'glass' | 'stainless' | 'ceramic';
}

export interface ProductVariant {
  id: string;
  label: string;
  priceModifier: number; // additional COP price added to basePrice
  badge?: string;
}

export interface DeviceSpecs {
  chip?: string;
  display?: string;
  camera?: string;
  battery?: string;
  finish?: string;
  caseSize?: string;
  connectivity?: string;
  weight?: string;
  anc?: string;
  audio?: string;
}

export interface AppleDevice {
  id: string;
  category: Category;
  model: string;
  name?: string;
  basePrice: number; // Price in Colombian Pesos (COP)
  description: string;
  tagline?: string;
  images: string[];
  colors: ProductColor[];
  variants: ProductVariant[];
  specs: DeviceSpecs;
  isAvailable: boolean;
  stockUnits: number;
  badge?: 'Nuevo' | 'Destacado' | 'Titanio Grado 5' | 'Oferta Exclusiva' | 'Pro Display' | string;
  featured?: boolean;
  createdAt?: string;
}

export interface InventoryItem extends AppleDevice {
  sku: string;
  lastUpdated: string;
}

export interface AdminFormData {
  category: Category;
  modelName: string;
  selectedColor: string;
  selectedVariant: string;
  computedTitle: string;
  price: number;
  stockUnits: number;
  isAvailable: boolean;
  description: string;
  badge?: string;
  images: string[];
  specs: DeviceSpecs;
}

export interface OfficialModelPreset {
  id: string;
  name: string;
  category: Category;
  tagline: string;
  basePriceCOP: number;
  defaultBadge?: 'Nuevo' | 'Destacado' | 'Titanio Grado 5' | 'Oferta Exclusiva' | 'Pro Display';
  colors: ProductColor[];
  variants: ProductVariant[];
  specs: DeviceSpecs;
  sampleImages: string[];
}
