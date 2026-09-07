/**
 * Utility for formatting currency in Colombian Pesos (COP)
 * using the native Intl.NumberFormat API with zero decimals.
 */
const copFormatter = new Intl.NumberFormat('es-CO', {
  style: 'currency',
  currency: 'COP',
  maximumFractionDigits: 0,
});

export const formatCOP = (value: number): string => {
  if (isNaN(value)) return '$ 0';
  return copFormatter.format(value);
};

export const calculateVariantPrice = (
  basePrice: number,
  priceModifier: number = 0
): number => {
  return basePrice + priceModifier;
};
