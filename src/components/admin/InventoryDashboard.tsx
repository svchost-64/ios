import React, { useState, useMemo } from 'react';
import { useCatalogStore, selectInventoryKPIs } from '../../store/useCatalogStore';
import { AppleDevice, Category } from '../../types/apple';
import { CATEGORIES } from '../../data/applePresets';
import { ToggleSwitch } from '../ui/ToggleSwitch';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import { formatCOP } from '../../utils/currency';
import {
  Package,
  DollarSign,
  TrendingUp,
  CheckCircle2,
  Trash2,
  Plus,
  RotateCcw,
  Search,
  ExternalLink,
  Layers,
  Smartphone,
  Watch,
  Laptop,
  Headphones,
  Tablet,
} from 'lucide-react';

interface InventoryDashboardProps {
  onOpenAddForm: () => void;
}

export const InventoryDashboard: React.FC<InventoryDashboardProps> = ({ onOpenAddForm }) => {
  const {
    products,
    toggleProductAvailability,
    updateProductStock,
    deleteProduct,
    resetToFactoryDefaults,
    openProductDetail,
  } = useCatalogStore();

  const [adminSearch, setAdminSearch] = useState('');
  const [selectedAdminCategory, setSelectedAdminCategory] = useState<Category | 'all'>('all');
  const [itemToDelete, setItemToDelete] = useState<AppleDevice | null>(null);
  const [showResetConfirm, setShowResetConfirm] = useState(false);

  // Reactive Computed KPIs from store selector
  const kpis = useMemo(() => selectInventoryKPIs(products), [products]);

  // Filtered table rows
  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      if (selectedAdminCategory !== 'all' && p.category !== selectedAdminCategory) {
        return false;
      }
      if (adminSearch.trim()) {
        const q = adminSearch.toLowerCase();
        const modelMatch = p.model?.toLowerCase().includes(q);
        const nameMatch = p.name?.toLowerCase().includes(q);
        const catMatch = p.category?.toLowerCase().includes(q);
        const tagMatch = p.tagline?.toLowerCase().includes(q);
        return Boolean(modelMatch || nameMatch || catMatch || tagMatch);
      }
      return true;
    });
  }, [products, selectedAdminCategory, adminSearch]);

  const getCategoryIcon = (category: Category) => {
    switch (category) {
      case 'iphone':
        return <Smartphone className="w-3.5 h-3.5" />;
      case 'watch':
        return <Watch className="w-3.5 h-3.5" />;
      case 'mac':
        return <Laptop className="w-3.5 h-3.5" />;
      case 'audio':
        return <Headphones className="w-3.5 h-3.5" />;
      case 'ipad':
        return <Tablet className="w-3.5 h-3.5" />;
      default:
        return <Layers className="w-3.5 h-3.5" />;
    }
  };

  const handleConfirmDelete = () => {
    if (itemToDelete) {
      deleteProduct(itemToDelete.id);
      setItemToDelete(null);
    }
  };

  const handleConfirmReset = () => {
    resetToFactoryDefaults();
    setShowResetConfirm(false);
  };

  return (
    <div className="space-y-8">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-[#1D1D1F] tracking-tight">
            Control de Inventario &amp; Disponibilidad
          </h2>
          <p className="text-xs text-[#86868B] mt-0.5">
            Sincronización en tiempo real con almacenamiento local persistente (localStorage).
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <Button
            id="admin-reset-inventory-btn"
            variant="ghost"
            size="sm"
            onClick={() => setShowResetConfirm(true)}
            title="Restaurar base de datos a valores de fábrica"
            icon={<RotateCcw className="w-3.5 h-3.5 text-[#86868B]" />}
          >
            Restablecer Catálogo
          </Button>

          <Button
            id="admin-add-product-cta"
            variant="crimson"
            size="sm"
            onClick={onOpenAddForm}
            icon={<Plus className="w-4 h-4" />}
          >
            Añadir Dispositivo
          </Button>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* KPI 1: Total Stock */}
        <div
          id="kpi-card-total-stock"
          className="bg-white p-5 rounded-2xl border border-[#E5E5EA] shadow-xs flex flex-col justify-between"
        >
          <div className="flex items-center justify-between text-[#86868B] mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider">
              Total Existencias
            </span>
            <div className="w-8 h-8 rounded-full bg-[#F5F5F7] flex items-center justify-center text-[#1D1D1F]">
              <Package className="w-4 h-4" />
            </div>
          </div>
          <div>
            <div className="text-3xl font-bold text-[#1D1D1F] tracking-tight">
              {kpis.totalStock.toLocaleString()}{' '}
              <span className="text-sm font-normal text-[#86868B]">uds</span>
            </div>
            <p className="text-[11px] text-[#86868B] mt-1">
              Repartidas en {kpis.totalProducts} modelos registrados
            </p>
          </div>
        </div>

        {/* KPI 2: Estimated Value */}
        <div
          id="kpi-card-inventory-value"
          className="bg-white p-5 rounded-2xl border border-[#E5E5EA] shadow-xs flex flex-col justify-between"
        >
          <div className="flex items-center justify-between text-[#86868B] mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider">
              Valor de Almacén
            </span>
            <div className="w-8 h-8 rounded-full bg-[#F5F5F7] flex items-center justify-center text-[#16A34A]">
              <DollarSign className="w-4 h-4" />
            </div>
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-bold text-[#1D1D1F] tracking-tight truncate">
              {formatCOP(kpis.totalInventoryValueCOP)}
            </div>
            <p className="text-[11px] text-[#86868B] mt-1">
              Valuación comercial de hardware activo (COP)
            </p>
          </div>
        </div>

        {/* KPI 3: Leading Category */}
        <div
          id="kpi-card-leader-category"
          className="bg-white p-5 rounded-2xl border border-[#E5E5EA] shadow-xs flex flex-col justify-between"
        >
          <div className="flex items-center justify-between text-[#86868B] mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider">
              Categoría Líder
            </span>
            <div className="w-8 h-8 rounded-full bg-[#F5F5F7] flex items-center justify-center text-[#DC2626]">
              <TrendingUp className="w-4 h-4" />
            </div>
          </div>
          <div>
            <div className="text-2xl font-bold text-[#1D1D1F] tracking-tight truncate">
              {kpis.leaderCategoryName}
            </div>
            <p className="text-[11px] text-[#86868B] mt-1">
              {kpis.leaderCount} unidades en stock físico
            </p>
          </div>
        </div>

        {/* KPI 4: Active Availability Rate */}
        <div
          id="kpi-card-availability-rate"
          className="bg-white p-5 rounded-2xl border border-[#E5E5EA] shadow-xs flex flex-col justify-between"
        >
          <div className="flex items-center justify-between text-[#86868B] mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider">
              Estatus Catálogo
            </span>
            <div className="w-8 h-8 rounded-full bg-[#F5F5F7] flex items-center justify-center text-[#16A34A]">
              <CheckCircle2 className="w-4 h-4" />
            </div>
          </div>
          <div>
            <div className="text-3xl font-bold text-[#1D1D1F] tracking-tight">
              {kpis.availabilityPercentage}%
            </div>
            <p className="text-[11px] text-[#86868B] mt-1">
              {kpis.availableCount} de {kpis.totalProducts} líneas disponibles
            </p>
          </div>
        </div>
      </div>

      {/* Main Table Card */}
      <div className="bg-white rounded-2xl border border-[#E5E5EA] shadow-xs overflow-hidden">
        {/* Table Filters & Search Bar */}
        <div className="p-4 sm:p-5 border-b border-[#F2F2F7] flex flex-col sm:flex-row items-center justify-between gap-3">
          {/* Table Search */}
          <div className="relative w-full sm:w-80">
            <Search className="w-4 h-4 text-[#86868B] absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              id="admin-table-search"
              value={adminSearch}
              onChange={(e) => setAdminSearch(e.target.value)}
              placeholder="Filtrar por nombre o modelo..."
              className="w-full text-xs bg-[#F5F5F7] hover:bg-[#EAEAEA] focus:bg-white text-[#1D1D1F] placeholder-[#86868B] pl-9 pr-3 py-2 rounded-xl border border-transparent focus:border-[#D2D2D7] focus:outline-none transition-all"
            />
          </div>

          {/* Category Filter Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto no-scrollbar">
            <button
              type="button"
              onClick={() => setSelectedAdminCategory('all')}
              className={`text-xs px-3 py-1.5 rounded-full font-medium transition-colors whitespace-nowrap cursor-pointer ${
                selectedAdminCategory === 'all'
                  ? 'bg-[#1D1D1F] text-white'
                  : 'bg-[#F5F5F7] text-[#86868B] hover:text-[#1D1D1F]'
              }`}
            >
              Todos
            </button>
            {CATEGORIES.map((cat) => (
              <button
                key={`admin-cat-${cat.id}`}
                onClick={() => setSelectedAdminCategory(cat.id)}
                className={`text-xs px-3 py-1.5 rounded-full font-medium transition-colors whitespace-nowrap cursor-pointer ${
                  selectedAdminCategory === cat.id
                    ? 'bg-[#1D1D1F] text-white'
                    : 'bg-[#F5F5F7] text-[#86868B] hover:text-[#1D1D1F]'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Minimalist Table Without Heavy Borders */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-[#F2F2F7] bg-[#FAFAFC] text-[11px] font-semibold text-[#86868B] uppercase tracking-wider">
                <th className="py-3.5 px-5">Dispositivo Apple</th>
                <th className="py-3.5 px-4">Línea</th>
                <th className="py-3.5 px-4">Precio Base (COP)</th>
                <th className="py-3.5 px-4">Unidades</th>
                <th className="py-3.5 px-4">Disponibilidad</th>
                <th className="py-3.5 px-5 text-right">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#F2F2F7] text-xs">
              {filteredProducts.map((product) => {
                const isOutOfStock = !product.isAvailable || product.stockUnits === 0;
                return (
                  <tr
                    key={product.id}
                    id={`inventory-row-${product.id}`}
                    className="hover:bg-[#F9F9FB] transition-colors"
                  >
                    {/* Device name and thumbnail */}
                    <td className="py-3.5 px-5">
                      <div className="flex items-center gap-3">
                        <div className="w-11 h-11 rounded-lg bg-[#F5F5F7] p-1 border border-[#E5E5EA] flex items-center justify-center shrink-0">
                          <img
                            src={product.images[0]}
                            alt={product.model}
                            className="w-full h-full object-contain"
                            referrerPolicy="no-referrer"
                          />
                        </div>
                        <div className="min-w-0">
                          <p className="font-semibold text-[#1D1D1F] tracking-tight truncate">
                            {product.model || product.name}
                          </p>
                          <p className="text-[11px] text-[#86868B] truncate max-w-xs">
                            {product.description || product.tagline}
                          </p>
                        </div>
                      </div>
                    </td>

                    {/* Category */}
                    <td className="py-3.5 px-4 whitespace-nowrap">
                      <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-[#F5F5F7] text-[#1D1D1F] text-[11px] font-medium">
                        {getCategoryIcon(product.category)}
                        <span className="capitalize">{product.category}</span>
                      </div>
                    </td>

                    {/* Price */}
                    <td className="py-3.5 px-4 font-semibold text-[#1D1D1F] whitespace-nowrap">
                      {formatCOP(product.basePrice)}
                    </td>

                    {/* Stock Stepper */}
                    <td className="py-3.5 px-4 whitespace-nowrap">
                      <div className="inline-flex items-center border border-[#E5E5EA] rounded-lg bg-white overflow-hidden shadow-2xs">
                        <button
                          type="button"
                          onClick={() => updateProductStock(product.id, product.stockUnits - 1)}
                          className="px-2.5 py-1 text-[#86868B] hover:text-[#1D1D1F] hover:bg-[#F5F5F7] transition-colors font-bold disabled:opacity-30 cursor-pointer"
                          disabled={product.stockUnits <= 0}
                          title="Disminuir stock"
                        >
                          -
                        </button>
                        <span className="px-3 py-1 font-semibold text-[#1D1D1F] text-center min-w-[36px]">
                          {product.stockUnits}
                        </span>
                        <button
                          type="button"
                          onClick={() => updateProductStock(product.id, product.stockUnits + 1)}
                          className="px-2.5 py-1 text-[#86868B] hover:text-[#1D1D1F] hover:bg-[#F5F5F7] transition-colors font-bold cursor-pointer"
                          title="Aumentar stock"
                        >
                          +
                        </button>
                      </div>
                    </td>

                    {/* Real-time Toggle Switch */}
                    <td className="py-3.5 px-4 whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        <ToggleSwitch
                          checked={product.isAvailable}
                          onChange={() => toggleProductAvailability(product.id)}
                          label={`Disponibilidad ${product.model}`}
                        />
                        <span
                          className={`text-[11px] font-semibold ${
                            !isOutOfStock ? 'text-[#16A34A]' : 'text-[#86868B]'
                          }`}
                        >
                          {!isOutOfStock ? 'Activo' : 'Agotado'}
                        </span>
                      </div>
                    </td>

                    {/* Actions */}
                    <td className="py-3.5 px-5 text-right whitespace-nowrap">
                      <div className="inline-flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => openProductDetail(product.id)}
                          className="p-1.5 rounded-lg text-[#86868B] hover:text-[#1D1D1F] hover:bg-[#F5F5F7] transition-colors cursor-pointer"
                          title="Ver en configurador"
                        >
                          <ExternalLink className="w-4 h-4" />
                        </button>

                        <button
                          type="button"
                          onClick={() => setItemToDelete(product)}
                          className="p-1.5 rounded-lg text-[#86868B] hover:text-[#DC2626] hover:bg-[#DC2626]/10 transition-colors cursor-pointer"
                          title="Eliminar producto"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}

              {filteredProducts.length === 0 && (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-[#86868B]">
                    <Package className="w-8 h-8 mx-auto mb-2 text-[#D2D2D7]" />
                    <p className="font-semibold text-[#1D1D1F]">
                      No se encontraron dispositivos
                    </p>
                    <p className="text-xs mt-0.5">
                      Prueba con otro término de búsqueda o añade un nuevo modelo oficial.
                    </p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Confirmation Modal for Reset to Factory Defaults */}
      {showResetConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-in fade-in duration-150">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 border border-[#E5E5EA] shadow-2xl space-y-4">
            <h3 className="text-lg font-bold text-[#1D1D1F] tracking-tight">
              ¿Restablecer inventario a valores iniciales?
            </h3>
            <p className="text-xs text-[#86868B] leading-relaxed">
              Esta acción restaurará el catálogo al dataset predeterminado de <code className="text-[#1D1D1F]">catalog.json</code> y limpiará cualquier modificación personalizada guardada en localStorage.
            </p>
            <div className="flex items-center justify-end gap-3 pt-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowResetConfirm(false)}
              >
                Cancelar
              </Button>
              <Button
                variant="crimson"
                size="sm"
                onClick={handleConfirmReset}
              >
                Confirmar y Restablecer
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Confirmation Modal for Delete */}
      {itemToDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-in fade-in duration-150">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 border border-[#E5E5EA] shadow-2xl space-y-4">
            <h3 className="text-lg font-bold text-[#1D1D1F] tracking-tight">
              ¿Eliminar {itemToDelete.model || itemToDelete.name}?
            </h3>
            <p className="text-xs text-[#86868B] leading-relaxed">
              El producto será removido de inmediato de la tienda de clientes y del almacén local. Esta acción no se puede deshacer.
            </p>
            <div className="flex items-center justify-end gap-3 pt-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setItemToDelete(null)}
              >
                Cancelar
              </Button>
              <Button
                variant="crimson"
                size="sm"
                onClick={handleConfirmDelete}
              >
                Eliminar Permanentemente
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
