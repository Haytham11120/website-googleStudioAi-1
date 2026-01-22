import React, { useState } from 'react';
import { SIZES } from '../constants';
import { X, Check } from 'lucide-react';
import { Product } from '../types';

interface ProductModalProps {
  product: Product | null;
  onClose: () => void;
  onAddToCart: (product: Product, size: string, quantity: number) => void;
}

export const ProductModal: React.FC<ProductModalProps> = ({ product, onClose, onAddToCart }) => {
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [isAdded, setIsAdded] = useState(false);

  if (!product) return null;

  const handleAddToCart = () => {
    if (!selectedSize) return;
    onAddToCart(product, selectedSize, 1);
    setIsAdded(true);
    setTimeout(() => {
      setIsAdded(false);
      onClose();
      setSelectedSize(''); // Reset for next time
    }, 1000);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-stone-900/40 backdrop-blur-sm transition-opacity" 
        onClick={onClose}
      />

      <div className="flex min-h-full items-center justify-center p-4 text-center sm:p-0">
        <div className="relative transform overflow-hidden rounded-2xl bg-white text-left shadow-2xl transition-all sm:my-8 sm:w-full sm:max-w-4xl grid md:grid-cols-2">
          
          <button 
            onClick={onClose}
            className="absolute right-4 top-4 z-10 p-2 bg-white/80 rounded-full hover:bg-white transition-colors"
          >
            <X size={24} className="text-stone-500" />
          </button>

          {/* Image */}
          <div className="relative h-96 md:h-full bg-stone-100">
            <img
              src={product.image}
              alt={product.name}
              className="h-full w-full object-cover"
            />
          </div>

          {/* Content */}
          <div className="p-8 md:p-12 flex flex-col h-full">
            <div className="flex-1">
              <h4 className="text-sm font-bold text-stone-500 uppercase tracking-wider mb-2">
                {product.category}
              </h4>
              <h2 className="text-3xl font-serif font-bold text-stone-900 mb-4">
                {product.name}
              </h2>
              <p className="text-xl font-medium text-stone-900 mb-6">
                ${product.price.toFixed(2)}
              </p>
              
              <div className="prose prose-stone text-stone-600 mb-8">
                <p>{product.description}</p>
              </div>

              {/* Sizes */}
              <div className="mb-8">
                <div className="flex justify-between mb-3">
                   <span className="text-sm font-medium text-stone-900">Select Size</span>
                   <span className="text-sm text-stone-500 underline cursor-pointer">Size Guide</span>
                </div>
                <div className="grid grid-cols-5 gap-3">
                  {SIZES.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`
                        py-3 text-sm font-medium rounded-md transition-all
                        ${selectedSize === size 
                          ? 'bg-stone-900 text-white shadow-lg' 
                          : 'bg-white border border-stone-200 text-stone-900 hover:border-stone-400'
                        }
                      `}
                    >
                      {size}
                    </button>
                  ))}
                </div>
                {!selectedSize && (
                    <p className="text-xs text-red-500 mt-2 h-4 opacity-0 transition-opacity peer-checked:opacity-100">Please select a size</p>
                )}
              </div>
            </div>

            {/* Actions */}
            <button
              onClick={handleAddToCart}
              disabled={!selectedSize}
              className={`
                w-full py-4 px-8 rounded-full text-sm font-bold uppercase tracking-wide transition-all duration-300 flex items-center justify-center gap-2
                ${isAdded 
                   ? 'bg-green-600 text-white' 
                   : !selectedSize
                      ? 'bg-stone-200 text-stone-400 cursor-not-allowed'
                      : 'bg-stone-900 text-white hover:bg-stone-800 shadow-xl hover:shadow-2xl hover:-translate-y-1'
                }
              `}
            >
              {isAdded ? (
                <>
                  <Check size={20} />
                  Added to Cart
                </>
              ) : (
                'Add to Cart'
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};