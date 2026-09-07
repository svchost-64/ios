import React from 'react';
import { useCatalogStore } from './store/useCatalogStore';
import { StoreNavbar } from './components/store/StoreNavbar';
import { CategoryFilter } from './components/store/CategoryFilter';
import { StoreHero } from './components/store/StoreHero';
import { ProductGrid } from './components/store/ProductGrid';
import { ProductDetailModal } from './components/store/ProductDetailModal';
import { AdminView } from './components/admin/AdminView';
import { StoreFooter } from './components/store/StoreFooter';
import { Toast } from './components/ui/Toast';

export default function App() {
  const { activeView } = useCatalogStore();

  return (
    <div className="min-h-screen flex flex-col bg-[#F5F5F7] text-[#1D1D1F] selection:bg-[#DC2626] selection:text-white">
      {/* 1. Fixed Navbar with Apple Logo, Live Search & View Switcher */}
      <StoreNavbar />

      {/* 2. Apple Official Hardware Subnav */}
      {activeView === 'store' && <CategoryFilter />}

      {/* 3. Main Viewport Switcher: Store vs Admin Dashboard */}
      <main className="flex-1">
        {activeView === 'store' ? (
          <>
            <StoreHero />
            <ProductGrid />
          </>
        ) : (
          <AdminView />
        )}
      </main>

      {/* 3. Global Interactive Modals & Toast System */}
      <ProductDetailModal />
      <Toast />

      {/* 4. Understated Apple Premium Reseller Footer */}
      <StoreFooter />
    </div>
  );
}
