import React, { useState } from 'react';
import { InventoryDashboard } from './InventoryDashboard';
import { AddProductForm } from './AddProductForm';
import { LayoutList, PlusCircle, ArrowLeft } from 'lucide-react';
import { useCatalogStore } from '../../store/useCatalogStore';

export const AdminView: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'inventory' | 'add'>('inventory');
  const { setActiveView } = useCatalogStore();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Admin Subheader & Tab Switcher */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#E5E5EA] pb-4">
        <div className="flex items-center gap-3">
          <button
            type="button"
            id="admin-back-to-store-btn"
            onClick={() => setActiveView('store')}
            className="p-2 rounded-full bg-white border border-[#E5E5EA] hover:bg-[#F5F5F7] text-[#1D1D1F] transition-colors"
            title="Volver a la tienda"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <div>
            <h1 className="text-xl font-bold text-[#1D1D1F] tracking-tight">
              Panel Administrativo de Hardware
            </h1>
            <p className="text-xs text-[#86868B]">
              Gestión centralizada de stock, modelos oficiales y altas de catálogo
            </p>
          </div>
        </div>

        {/* Tab Switcher */}
        <div className="inline-flex p-1 bg-[#F5F5F7] rounded-xl border border-[#E5E5EA]">
          <button
            type="button"
            id="admin-tab-inventory-btn"
            onClick={() => setActiveTab('inventory')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
              activeTab === 'inventory'
                ? 'bg-white text-[#1D1D1F] shadow-xs'
                : 'text-[#86868B] hover:text-[#1D1D1F]'
            }`}
          >
            <LayoutList className="w-3.5 h-3.5" />
            <span>Métricas &amp; Tabla</span>
          </button>

          <button
            type="button"
            id="admin-tab-add-btn"
            onClick={() => setActiveTab('add')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
              activeTab === 'add'
                ? 'bg-[#1D1D1F] text-white shadow-xs'
                : 'text-[#86868B] hover:text-[#1D1D1F]'
            }`}
          >
            <PlusCircle className="w-3.5 h-3.5" />
            <span>Añadir Producto</span>
          </button>
        </div>
      </div>

      {/* Main Tab Content */}
      {activeTab === 'inventory' ? (
        <InventoryDashboard onOpenAddForm={() => setActiveTab('add')} />
      ) : (
        <AddProductForm onSuccess={() => setActiveTab('inventory')} />
      )}
    </div>
  );
};
