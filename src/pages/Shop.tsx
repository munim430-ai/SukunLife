import React, { useState } from 'react';
import { ShoppingBag, Star, Plus, Minus, Search } from 'lucide-react';

const MOCK_PRODUCTS = [
  { id: 'prod_1', name: 'Premium Sidr Honey', price: 2500, category: 'Honey', rating: 4.9, image: 'bg-amber-100', inStock: true },
  { id: 'prod_2', name: 'Black Seed Oil (Cold Pressed)', price: 1200, category: 'Oils', rating: 4.8, image: 'bg-stone-800', inStock: true },
  { id: 'prod_3', name: 'Zamzam Water (5L)', price: 4500, category: 'Essentials', rating: 5.0, image: 'bg-blue-100', inStock: false },
  { id: 'prod_4', name: 'Ajwa Dates (1kg)', price: 3200, category: 'Dates', rating: 4.9, image: 'bg-amber-900', inStock: true },
];

const Shop = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');

  const categories = ['All', 'Honey', 'Oils', 'Dates', 'Essentials'];

  const filteredProducts = MOCK_PRODUCTS.filter(p =>
    (activeCategory === 'All' || p.category === activeCategory) &&
    p.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-4 md:p-8 max-w-5xl mx-auto pb-32">
      <header className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-serif text-primary font-bold">Healing Shop</h1>
          <p className="text-stone text-sm mt-1">Sunnah remedies & spiritual essentials</p>
        </div>

        <div className="relative w-full md:w-64">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-stone">
            <Search size={18} />
          </div>
          <input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-white border border-border rounded-xl py-2 pl-10 pr-4 shadow-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-sm"
          />
        </div>
      </header>

      {/* Categories */}
      <div className="flex overflow-x-auto gap-2 pb-4 mb-4 scrollbar-hide">
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-4 py-2 rounded-xl text-sm font-bold whitespace-nowrap transition-all ${
              activeCategory === cat
                ? 'bg-primary text-white shadow-md'
                : 'bg-white border border-border text-stone hover:border-primary'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {filteredProducts.map(product => (
          <div key={product.id} className="card-natural overflow-hidden flex flex-col group">
            {/* Image Placeholder */}
            <div className={`h-40 w-full ${product.image} relative flex items-center justify-center`}>
              {!product.inStock && (
                <div className="absolute inset-0 bg-white/60 backdrop-blur-sm flex items-center justify-center z-10">
                  <span className="bg-charcoal text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">Out of Stock</span>
                </div>
              )}
              <ShoppingBag size={48} className="text-white/30 mix-blend-overlay" />
            </div>

            <div className="p-4 flex flex-col flex-1">
              <div className="flex items-start justify-between mb-1">
                <p className="text-[10px] uppercase tracking-wider font-bold text-stone">{product.category}</p>
                <div className="flex items-center gap-1 text-[10px] font-bold text-amber-600 bg-amber-50 px-1.5 py-0.5 rounded">
                  <Star size={10} className="fill-amber-500" />
                  {product.rating}
                </div>
              </div>

              <h3 className="font-serif font-bold text-charcoal leading-tight mb-2 line-clamp-2 flex-1">{product.name}</h3>

              <div className="flex items-center justify-between mt-auto pt-4">
                <p className="font-bold text-primary">৳{product.price}</p>
                <button
                  disabled={!product.inStock}
                  className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${
                    product.inStock
                      ? 'bg-primary text-white hover:bg-primary-dark shadow-sm active:scale-95'
                      : 'bg-sand text-stone cursor-not-allowed'
                  }`}
                >
                  <Plus size={16} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredProducts.length === 0 && (
         <div className="py-20 text-center text-stone">
           <p>No products found matching your search.</p>
         </div>
      )}

      {/* Floating Cart Summary for Mobile - Only show if items in cart (mocking 1 item for design preview) */}
      <div className="fixed bottom-24 left-4 right-4 md:hidden z-40 bg-charcoal text-white rounded-2xl p-4 shadow-2xl flex items-center justify-between">
         <div className="flex items-center gap-3">
            <div className="relative">
              <ShoppingBag size={24} />
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-primary rounded-full text-[10px] font-bold flex items-center justify-center">1</span>
            </div>
            <div>
               <p className="text-sm font-bold">৳2500</p>
               <p className="text-[10px] text-white/60 uppercase tracking-widest">Estimated Total</p>
            </div>
         </div>
         <button className="bg-primary hover:bg-primary-dark px-6 py-2 rounded-xl text-sm font-bold transition-colors">
            Checkout
         </button>
      </div>
    </div>
  );
};

export default Shop;
