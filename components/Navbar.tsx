import React from 'react';
import { ShoppingBag, Search, Menu, X } from 'lucide-react';
import { Category } from '../types';

interface NavbarProps {
  onSearchClick: () => void;
  onCartClick: () => void;
  cartCount: number;
  onCategorySelect: (cat: Category | 'All') => void;
  activeCategory: Category | 'All';
}

export const Navbar: React.FC<NavbarProps> = ({ 
  onSearchClick, 
  onCartClick, 
  cartCount,
  onCategorySelect,
  activeCategory
}) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

  return (
    <nav className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          
          {/* Mobile Menu Button */}
          <div className="flex items-center md:hidden">
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-stone-800 hover:text-stone-600 p-2"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {/* Logo */}
          <div className="flex-shrink-0 flex items-center justify-center md:justify-start w-full md:w-auto absolute md:relative left-0 right-0 pointer-events-none md:pointer-events-auto">
            <span 
              onClick={() => onCategorySelect('All')}
              className="font-serif text-2xl font-bold tracking-tight text-stone-900 cursor-pointer pointer-events-auto"
            >
              LUMINA
            </span>
          </div>

          {/* Desktop Categories */}
          <div className="hidden md:flex space-x-8 items-center justify-center flex-1">
            {['All', ...Object.values(Category)].map((cat) => (
              <button
                key={cat}
                onClick={() => onCategorySelect(cat as Category | 'All')}
                className={`text-sm font-medium transition-colors ${
                  activeCategory === cat 
                    ? 'text-stone-900 border-b-2 border-stone-900' 
                    : 'text-stone-500 hover:text-stone-900'
                }`}
              >
                {cat.toUpperCase()}
              </button>
            ))}
          </div>

          {/* Right Icons */}
          <div className="flex items-center space-x-4">
            <button 
              onClick={onSearchClick}
              className="p-2 text-stone-500 hover:text-stone-900 transition-colors rounded-full hover:bg-stone-100"
            >
              <Search size={20} />
            </button>
            <button 
              onClick={onCartClick}
              className="p-2 text-stone-500 hover:text-stone-900 transition-colors rounded-full hover:bg-stone-100 relative"
            >
              <ShoppingBag size={20} />
              {cartCount > 0 && (
                <span className="absolute top-1 right-0 inline-flex items-center justify-center px-1.5 py-0.5 text-xs font-bold leading-none text-white transform translate-x-1/4 -translate-y-1/4 bg-stone-900 rounded-full">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-stone-200">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
             {['All', ...Object.values(Category)].map((cat) => (
              <button
                key={cat}
                onClick={() => {
                  onCategorySelect(cat as Category | 'All');
                  setIsMobileMenuOpen(false);
                }}
                className={`block px-3 py-2 rounded-md text-base font-medium w-full text-left ${
                   activeCategory === cat 
                    ? 'bg-stone-100 text-stone-900' 
                    : 'text-stone-600 hover:bg-stone-50 hover:text-stone-900'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};
