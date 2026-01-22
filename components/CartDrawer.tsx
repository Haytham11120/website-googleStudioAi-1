import React from 'react';
import { X, Minus, Plus, Trash2, ArrowRight } from 'lucide-react';
import { CartItem } from '../types';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQuantity: (id: string, size: string, delta: number) => void;
  onRemoveItem: (id: string, size: string) => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({ 
  isOpen, 
  onClose, 
  cartItems, 
  onUpdateQuantity, 
  onRemoveItem 
}) => {
  const subtotal = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);

  return (
    <div className={`fixed inset-0 z-50 ${isOpen ? 'pointer-events-auto' : 'pointer-events-none'}`}>
      {/* Backdrop */}
      <div 
        className={`absolute inset-0 bg-stone-900/40 backdrop-blur-sm transition-opacity duration-500 ${
          isOpen ? 'opacity-100' : 'opacity-0'
        }`}
        onClick={onClose}
      />

      {/* Drawer */}
      <div 
        className={`absolute top-0 right-0 h-full w-full max-w-md bg-white shadow-2xl transform transition-transform duration-500 ease-in-out flex flex-col ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-stone-100">
          <h2 className="font-serif text-2xl font-bold text-stone-900">Shopping Bag ({cartItems.length})</h2>
          <button 
            onClick={onClose}
            className="p-2 text-stone-400 hover:text-stone-900 transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto p-6 space-y-8">
          {cartItems.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center space-y-4">
              <div className="w-16 h-16 bg-stone-100 rounded-full flex items-center justify-center">
                 <X size={32} className="text-stone-300" />
              </div>
              <p className="text-stone-500">Your bag is empty.</p>
              <button 
                onClick={onClose}
                className="text-stone-900 font-medium underline underline-offset-4"
              >
                Continue Shopping
              </button>
            </div>
          ) : (
            cartItems.map((item) => (
              <div key={`${item.id}-${item.selectedSize}`} className="flex gap-4">
                <div className="w-24 h-32 flex-shrink-0 overflow-hidden rounded-md bg-stone-100">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="h-full w-full object-cover object-center"
                  />
                </div>

                <div className="flex flex-1 flex-col">
                  <div>
                    <div className="flex justify-between text-base font-medium text-stone-900">
                      <h3 className="line-clamp-2 pr-4">{item.name}</h3>
                      <p className="ml-4">${(item.price * item.quantity).toFixed(2)}</p>
                    </div>
                    <p className="mt-1 text-sm text-stone-500">{item.category} | Size: {item.selectedSize}</p>
                  </div>
                  <div className="flex flex-1 items-end justify-between text-sm">
                    <div className="flex items-center border border-stone-200 rounded-md">
                      <button 
                         onClick={() => onUpdateQuantity(item.id, item.selectedSize, -1)}
                         className="p-2 hover:bg-stone-50 text-stone-500"
                      >
                        <Minus size={14} />
                      </button>
                      <span className="px-2 font-medium text-stone-900">{item.quantity}</span>
                      <button 
                        onClick={() => onUpdateQuantity(item.id, item.selectedSize, 1)}
                        className="p-2 hover:bg-stone-50 text-stone-500"
                      >
                        <Plus size={14} />
                      </button>
                    </div>

                    <button
                      type="button"
                      onClick={() => onRemoveItem(item.id, item.selectedSize)}
                      className="font-medium text-stone-400 hover:text-red-500 transition-colors flex items-center gap-1"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {cartItems.length > 0 && (
          <div className="border-t border-stone-100 p-6 bg-stone-50">
            <div className="flex justify-between text-base font-medium text-stone-900 mb-4">
              <p>Subtotal</p>
              <p>${subtotal.toFixed(2)}</p>
            </div>
            <p className="mt-0.5 text-sm text-stone-500 mb-6">Shipping and taxes calculated at checkout.</p>
            <button
              className="w-full flex items-center justify-center rounded-full border border-transparent bg-stone-900 px-6 py-4 text-base font-medium text-white shadow-sm hover:bg-stone-800 transition-colors"
            >
              Checkout <ArrowRight className="ml-2" size={18} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
