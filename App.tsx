import React, { useState, useMemo, useEffect } from 'react';
import { MOCK_PRODUCTS } from './constants';
import { Product, CartItem, Category } from './types';
import { Navbar } from './components/Navbar';
import { ProductCard } from './components/ProductCard';
import { ProductModal } from './components/ProductModal';
import { CartDrawer } from './components/CartDrawer';
import { ChatInterface } from './components/ChatInterface';
import { SearchBar } from './components/SearchBar';
import { searchProductsWithAI } from './services/geminiService';
import { ArrowRight, RefreshCcw } from 'lucide-react';

export default function App() {
  // State
  const [activeCategory, setActiveCategory] = useState<Category | 'All'>('All');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [displayedProductIds, setDisplayedProductIds] = useState<string[]>([]);
  const [isAISearching, setIsAISearching] = useState(false);
  const [activeSearchQuery, setActiveSearchQuery] = useState<string>("");

  // Initial Load
  useEffect(() => {
    setDisplayedProductIds(MOCK_PRODUCTS.map(p => p.id));
  }, []);

  // Filter Logic
  const filteredProducts = useMemo(() => {
    let result = MOCK_PRODUCTS.filter(p => displayedProductIds.includes(p.id));
    
    // If a specific category is selected, filter by it (unless we are in search mode which might span categories)
    // However, for this UX, if a search is active, we prioritize the search results.
    // If no search is active, we filter by category.
    if (!activeSearchQuery && activeCategory !== 'All') {
      result = result.filter(p => p.category === activeCategory);
    }
    
    return result;
  }, [displayedProductIds, activeCategory, activeSearchQuery]);

  // Handlers
  const handleCategorySelect = (cat: Category | 'All') => {
    setActiveCategory(cat);
    setActiveSearchQuery(""); // Clear search when changing category
    setDisplayedProductIds(MOCK_PRODUCTS.map(p => p.id));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSearch = async (query: string) => {
    setIsAISearching(true);
    // AI Search
    const matchingIds = await searchProductsWithAI(query, MOCK_PRODUCTS);
    setDisplayedProductIds(matchingIds);
    setActiveSearchQuery(query);
    setIsAISearching(false);
    setIsSearchOpen(false);
    setActiveCategory('All'); // Reset category to show all search results
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const clearSearch = () => {
    setActiveSearchQuery("");
    setDisplayedProductIds(MOCK_PRODUCTS.map(p => p.id));
  };

  const addToCart = (product: Product, size: string, quantity: number) => {
    setCartItems(prev => {
      const existing = prev.find(item => item.id === product.id && item.selectedSize === size);
      if (existing) {
        return prev.map(item => 
          item.id === product.id && item.selectedSize === size
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { ...product, selectedSize: size, quantity }];
    });
    setIsCartOpen(true);
  };

  const updateCartQuantity = (id: string, size: string, delta: number) => {
    setCartItems(prev => prev.map(item => {
      if (item.id === id && item.selectedSize === size) {
        return { ...item, quantity: Math.max(0, item.quantity + delta) };
      }
      return item;
    }).filter(item => item.quantity > 0));
  };

  const removeFromCart = (id: string, size: string) => {
    setCartItems(prev => prev.filter(item => !(item.id === id && item.selectedSize === size)));
  };

  return (
    <div className="min-h-screen bg-white">
      <Navbar 
        onSearchClick={() => setIsSearchOpen(true)}
        onCartClick={() => setIsCartOpen(true)}
        cartCount={cartItems.reduce((acc, item) => acc + item.quantity, 0)}
        onCategorySelect={handleCategorySelect}
        activeCategory={activeCategory}
      />

      {/* Search Overlay */}
      <SearchBar 
        isOpen={isSearchOpen} 
        onClose={() => setIsSearchOpen(false)} 
        onSearch={handleSearch}
        isSearching={isAISearching}
      />

      {/* Main Content */}
      <main className="pt-16">
        
        {/* Hero Section (Only show if no search active) */}
        {!activeSearchQuery && activeCategory === 'All' && (
          <div className="relative h-[600px] bg-stone-900 flex items-center justify-center overflow-hidden">
            <div className="absolute inset-0 opacity-60">
               <img 
                 src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=2070&auto=format&fit=crop" 
                 className="w-full h-full object-cover" 
                 alt="Hero Fashion"
               />
            </div>
            <div className="relative z-10 text-center text-white px-4">
              <h1 className="text-5xl md:text-7xl font-serif font-bold mb-6 tracking-tight">
                Define Your Essence
              </h1>
              <p className="text-lg md:text-xl text-stone-200 mb-8 max-w-2xl mx-auto">
                Discover the new collection. Curated by AI, styled by you.
              </p>
              <button 
                onClick={() => {
                   const section = document.getElementById('products-grid');
                   section?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="bg-white text-stone-900 px-8 py-4 rounded-full font-bold uppercase tracking-widest hover:bg-stone-100 transition-colors"
              >
                Shop Now
              </button>
            </div>
          </div>
        )}

        <div id="products-grid" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          
          {/* Section Header */}
          <div className="flex justify-between items-end mb-10">
            <div>
              <h2 className="text-3xl font-serif font-bold text-stone-900">
                {activeSearchQuery ? `Search Results: "${activeSearchQuery}"` : `${activeCategory} Collection`}
              </h2>
              <p className="mt-2 text-stone-500">
                {filteredProducts.length} items found
              </p>
            </div>
            {activeSearchQuery && (
              <button 
                onClick={clearSearch}
                className="flex items-center gap-2 text-sm font-medium text-stone-500 hover:text-stone-900"
              >
                <RefreshCcw size={16} /> Clear Search
              </button>
            )}
          </div>

          {/* Grid */}
          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
              {filteredProducts.map((product) => (
                <ProductCard 
                  key={product.id} 
                  product={product} 
                  onOpen={setSelectedProduct} 
                />
              ))}
            </div>
          ) : (
            <div className="py-24 text-center">
              <h3 className="text-xl font-medium text-stone-900 mb-2">No styles found.</h3>
              <p className="text-stone-500">Try a different search or browse our full collection.</p>
              <button 
                onClick={clearSearch}
                className="mt-6 text-stone-900 underline underline-offset-4"
              >
                View All Products
              </button>
            </div>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-stone-900 text-stone-400 py-12">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <span className="text-2xl font-serif font-bold text-white block mb-4">LUMINA</span>
            <p className="text-sm">Merging classical tailoring with modern artificial intelligence to create the perfect shopping experience.</p>
          </div>
          <div>
            <h4 className="text-white font-bold mb-4">Shop</h4>
            <ul className="space-y-2 text-sm">
              <li>New Arrivals</li>
              <li>Men</li>
              <li>Women</li>
              <li>Accessories</li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-bold mb-4">Support</h4>
            <ul className="space-y-2 text-sm">
              <li>Contact Us</li>
              <li>Shipping & Returns</li>
              <li>Size Guide</li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-bold mb-4">Newsletter</h4>
            <div className="flex gap-2">
              <input type="email" placeholder="Your email" className="bg-stone-800 border-none rounded-md px-4 py-2 text-sm w-full" />
              <button className="bg-white text-stone-900 px-4 py-2 rounded-md font-bold text-sm">Join</button>
            </div>
          </div>
        </div>
      </footer>

      {/* Modals & Drawers */}
      <ProductModal 
        product={selectedProduct} 
        onClose={() => setSelectedProduct(null)} 
        onAddToCart={addToCart}
      />
      
      <CartDrawer 
        isOpen={isCartOpen} 
        onClose={() => setIsCartOpen(false)} 
        cartItems={cartItems}
        onUpdateQuantity={updateCartQuantity}
        onRemoveItem={removeFromCart}
      />

      <ChatInterface />
    </div>
  );
}
