import React, { useState, useEffect, useRef } from 'react';
import { Search, X, Sparkles, Loader2 } from 'lucide-react';

interface SearchBarProps {
  isOpen: boolean;
  onClose: () => void;
  onSearch: (query: string) => void;
  isSearching: boolean;
}

export const SearchBar: React.FC<SearchBarProps> = ({ isOpen, onClose, onSearch, isSearching }) => {
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
    } else {
      setQuery('');
    }
  }, [isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-40 bg-white/95 backdrop-blur-xl transition-all duration-300">
      <div className="max-w-4xl mx-auto px-4 pt-24">
        <div className="relative">
          <button 
            onClick={onClose}
            className="absolute -top-12 right-0 p-2 text-stone-400 hover:text-stone-900"
          >
            <X size={24} />
          </button>
          
          <form onSubmit={handleSubmit} className="relative">
             <input
               ref={inputRef}
               type="text"
               value={query}
               onChange={(e) => setQuery(e.target.value)}
               placeholder="Describe what you're looking for... (e.g., 'Something elegant for a summer wedding')"
               className="w-full bg-transparent border-b-2 border-stone-200 py-6 text-2xl md:text-4xl font-serif text-stone-900 placeholder:text-stone-300 focus:outline-none focus:border-stone-900 transition-colors"
             />
             <button 
               type="button" 
               className="absolute right-0 top-1/2 -translate-y-1/2 text-stone-400"
               disabled={isSearching}
             >
                {isSearching ? <Loader2 className="animate-spin" size={32} /> : <Search size={32} />}
             </button>
          </form>

          <div className="mt-8">
            <div className="flex items-center gap-2 text-sm text-stone-500 mb-4">
               <Sparkles size={16} className="text-purple-500" />
               <span>Try asking AI:</span>
            </div>
            <div className="flex flex-wrap gap-3">
              {[
                "Minimalist office wear for men",
                "Boho chic accessories",
                "Warm winter coats under $200",
                "Gift ideas for kids"
              ].map((s) => (
                <button
                  key={s}
                  onClick={() => {
                    setQuery(s);
                    onSearch(s);
                  }}
                  className="px-4 py-2 rounded-full bg-stone-100 text-stone-600 text-sm hover:bg-stone-200 transition-colors"
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
