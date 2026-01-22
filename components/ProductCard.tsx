import React from 'react';
import { Product } from '../types';
import { Plus } from 'lucide-react';

interface ProductCardProps {
  product: Product;
  onOpen: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onOpen }) => {
  return (
    <div 
      className="group relative cursor-pointer flex flex-col gap-2"
      onClick={() => onOpen(product)}
    >
      <div className="aspect-[3/4] w-full overflow-hidden rounded-md bg-stone-200 lg:aspect-none lg:h-96 relative">
        <img
          src={product.image}
          alt={product.name}
          className="h-full w-full object-cover object-center lg:h-full lg:w-full transition-transform duration-700 group-hover:scale-105"
          loading="lazy"
        />
        {/* Quick Add Overlay */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-300 flex items-end justify-end p-4">
           <button className="bg-white text-stone-900 p-3 rounded-full shadow-lg opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 hover:bg-stone-900 hover:text-white">
             <Plus size={20} />
           </button>
        </div>
      </div>
      <div className="mt-2 flex justify-between">
        <div>
          <h3 className="text-sm font-medium text-stone-900">
            {product.name}
          </h3>
          <p className="mt-1 text-xs text-stone-500">{product.category}</p>
        </div>
        <p className="text-sm font-medium text-stone-900">${product.price.toFixed(2)}</p>
      </div>
    </div>
  );
};
