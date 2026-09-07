import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { AppleDevice, Category } from '../types/apple';
import initialCatalogData from '../data/catalog.json';
import { CATEGORIES } from '../data/applePresets';

export type ViewMode = 'store' | 'admin';
export type SortOption = 'featured' | 'price-asc' | 'price-desc' | 'name';

interface ToastMessage {
  id: string;
  type: 'success' | 'info' | 'warning';
  title: string;
  description?: string;
}

interface CatalogState {
  // Inventory items
  products: AppleDevice[];
  activeView: ViewMode;
  selectedProductId: string | null;

  // Search & Filter State
  selectedCategory: Category | 'all';
  searchQuery: string;
  inStockOnly: boolean;
  sortBy: SortOption;

  // Feedback
  toast: ToastMessage | null;

  // Navigation & Modal Actions
  setActiveView: (view: ViewMode) => void;
  setSelectedProductId: (id: string | null) => void;
  openProductDetail: (id: string) => void;
  closeProductDetail: () => void;

  // Filter Actions
  setSelectedCategory: (category: Category | 'all') => void;
  setSearchQuery: (query: string) => void;
  setInStockOnly: (val: boolean) => void;
  setSortBy: (sort: SortOption) => void;
  clearFilters: () => void;

  // Inventory Mutations
  toggleProductAvailability: (id: string) => void;
  updateProductStock: (id: string, newStock: number) => void;
  addProduct: (product: Omit<AppleDevice, 'id' | 'createdAt'>) => void;
  deleteProduct: (id: string) => void;
  resetToFactoryDefaults: () => void;

  // Toast notifications
  showToast: (toast: Omit<ToastMessage, 'id'>) => void;
  clearToast: () => void;
}

const SEED_CATALOG: AppleDevice[] = initialCatalogData as AppleDevice[];

export const useCatalogStore = create<CatalogState>()(
  persist(
    (set, get) => ({
      products: SEED_CATALOG,
      activeView: 'store',
      selectedProductId: null,
      selectedCategory: 'all',
      searchQuery: '',
      inStockOnly: false,
      sortBy: 'featured',
      toast: null,

      setActiveView: (view) => set({ activeView: view }),

      setSelectedProductId: (id) => set({ selectedProductId: id }),

      openProductDetail: (id) => set({ selectedProductId: id }),

      closeProductDetail: () => set({ selectedProductId: null }),

      setSelectedCategory: (category) => set({ selectedCategory: category }),

      setSearchQuery: (query) => set({ searchQuery: query }),

      setInStockOnly: (val) => set({ inStockOnly: val }),

      setSortBy: (sort) => set({ sortBy: sort }),

      clearFilters: () =>
        set({
          selectedCategory: 'all',
          searchQuery: '',
          inStockOnly: false,
          sortBy: 'featured',
        }),

      toggleProductAvailability: (id) => {
        const current = get().products;
        const target = current.find((p) => p.id === id);
        if (!target) return;

        const nextAvailability = !target.isAvailable;
        const updated = current.map((item) => {
          if (item.id === id) {
            return {
              ...item,
              isAvailable: nextAvailability,
              stockUnits: nextAvailability && item.stockUnits === 0 ? 5 : item.stockUnits,
            };
          }
          return item;
        });

        set({ products: updated });
        get().showToast({
          type: nextAvailability ? 'success' : 'info',
          title: `${target.name || target.model} ahora está ${
            nextAvailability ? 'Disponible' : 'Agotado'
          }`,
          description: nextAvailability
            ? 'Activo en tienda para pedidos por WhatsApp.'
            : 'Pausado temporalmente del catálogo de clientes.',
        });
      },

      updateProductStock: (id, newStock) => {
        const clamped = Math.max(0, newStock);
        const updated = get().products.map((item) => {
          if (item.id === id) {
            return {
              ...item,
              stockUnits: clamped,
              isAvailable: clamped > 0 ? item.isAvailable : false,
            };
          }
          return item;
        });
        set({ products: updated });
      },

      addProduct: (productData) => {
        const newId = `prod-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`;
        const newDevice: AppleDevice = {
          ...productData,
          id: newId,
          createdAt: new Date().toISOString(),
        };

        const updated = [newDevice, ...get().products];
        set({
          products: updated,
          activeView: 'store',
        });

        get().showToast({
          type: 'success',
          title: '¡Dispositivo publicado con éxito!',
          description: `${newDevice.name || newDevice.model} ya está disponible en el catálogo de clientes.`,
        });
      },

      deleteProduct: (id) => {
        const target = get().products.find((p) => p.id === id);
        const updated = get().products.filter((p) => p.id !== id);
        set({ products: updated });

        if (target) {
          get().showToast({
            type: 'info',
            title: 'Dispositivo eliminado',
            description: `Se retiró "${target.name || target.model}" del inventario local.`,
          });
        }
      },

      resetToFactoryDefaults: () => {
        set({ products: SEED_CATALOG });
        get().showToast({
          type: 'info',
          title: 'Inventario restablecido a valores de fábrica',
          description: 'Se restauró el dataset inicial de catalog.json con 100% de consistencia.',
        });
      },

      showToast: (toast) => {
        const id = `toast-${Date.now()}`;
        set({ toast: { ...toast, id } });

        setTimeout(() => {
          const current = get().toast;
          if (current && current.id === id) {
            set({ toast: null });
          }
        }, 3500);
      },

      clearToast: () => set({ toast: null }),
    }),
    {
      name: 'inarino_apple_catalog_store_v2',
      // Only persist the products list in localStorage, leaving UI filters clean on new sessions
      partialize: (state) => ({
        products: state.products,
      }),
    }
  )
);

// KPI Computed Selectors
export const selectInventoryKPIs = (products: AppleDevice[]) => {
  const totalStock = products.reduce((acc, p) => acc + (p.stockUnits || 0), 0);
  const totalInventoryValueCOP = products.reduce(
    (acc, p) => acc + (p.basePrice || 0) * (p.stockUnits || 0),
    0
  );
  const availableCount = products.filter((p) => p.isAvailable && p.stockUnits > 0).length;
  const availabilityPercentage =
    products.length > 0 ? Math.round((availableCount / products.length) * 100) : 0;

  // Leading Category calculation
  const categoryCounts: Record<string, number> = {};
  products.forEach((p) => {
    categoryCounts[p.category] = (categoryCounts[p.category] || 0) + (p.stockUnits || 0);
  });

  let leaderCategoryId = 'iphone';
  let maxUnits = -1;
  Object.entries(categoryCounts).forEach(([cat, count]) => {
    if (count > maxUnits) {
      maxUnits = count;
      leaderCategoryId = cat;
    }
  });

  const leaderCategoryObj = CATEGORIES.find((c) => c.id === leaderCategoryId);

  return {
    totalStock,
    totalInventoryValueCOP,
    availableCount,
    totalProducts: products.length,
    availabilityPercentage,
    leaderCategoryName: leaderCategoryObj ? leaderCategoryObj.label : 'iPhone',
    leaderCount: maxUnits > 0 ? maxUnits : 0,
  };
};
