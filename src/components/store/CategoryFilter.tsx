import React from 'react';
import { useCatalogStore } from '../../store/useCatalogStore';
import { Category } from '../../types/apple';
import {
  Smartphone,
  Watch,
  Headphones,
  Laptop,
  Tablet,
  LayoutGrid,
} from 'lucide-react';

interface CategoryItem {
  id: Category | 'all';
  label: string;
  icon: React.FC<{ className?: string }>;
}

const HARDWARE_NAV_ITEMS: CategoryItem[] = [
  { id: 'all', label: 'Todos', icon: LayoutGrid },
  { id: 'iphone', label: 'iPhone', icon: Smartphone },
  { id: 'watch', label: 'Apple Watch', icon: Watch },
  { id: 'audio', label: 'AirPods', icon: Headphones },
  { id: 'mac', label: 'Mac', icon: Laptop },
  { id: 'ipad', label: 'iPad', icon: Tablet },
];

export const CategoryFilter: React.FC = () => {
  const { selectedCategory, setSelectedCategory, setActiveView } = useCatalogStore();

  const handleSelect = (catId: Category | 'all') => {
    setSelectedCategory(catId);
    setActiveView('store');
  };

  return (
    <nav
      id="apple-subnav-categories"
      aria-label="Navegación de categorías Apple"
      className="w-full bg-white border-b border-black/[0.06] transition-colors sticky top-16 z-30"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-start sm:justify-center gap-7 sm:gap-10 md:gap-12 overflow-x-auto no-scrollbar pt-3">
          {HARDWARE_NAV_ITEMS.map((item) => {
            const isActive = selectedCategory === item.id;
            const Icon = item.icon;

            return (
              <button
                key={item.id}
                id={`subnav-category-${item.id}`}
                type="button"
                onClick={() => handleSelect(item.id)}
                className={`group flex flex-col items-center gap-1.5 pb-2.5 transition-colors cursor-pointer whitespace-nowrap text-xs sm:text-sm ${
                  isActive
                    ? 'text-neutral-900 border-b-2 border-neutral-900 font-semibold'
                    : 'text-neutral-500 hover:text-neutral-900 border-b-2 border-transparent font-medium'
                }`}
              >
                <Icon
                  className={`w-5 h-5 transition-transform group-hover:scale-105 stroke-[1.5] ${
                    isActive ? 'text-neutral-900' : 'text-neutral-500 group-hover:text-neutral-900'
                  }`}
                />
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </nav>
  );
};
