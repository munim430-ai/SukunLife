import React from 'react';
import { PRODUCTS } from '../constants/products';
import { ShoppingBag, ArrowRight } from 'lucide-react';
import { cn } from '../lib/utils';

export default function Shop() {
  return (
    <div className="p-8 space-y-12 max-w-7xl mx-auto">
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-2">
          <p className="text-[10px] font-bold uppercase tracking-widest text-stone">Spiritual Wellness</p>
          <h1 className="text-4xl font-serif font-bold text-primary italic">Healing Shop</h1>
        </div>
        <div className="flex gap-2">
          {['All Products', 'Oils', 'Honey', 'Bundles'].map((cat, i) => (
            <button 
              key={cat} 
              className={cn(
                "px-4 py-2 rounded-xl text-xs font-bold transition-all",
                i === 0 ? "bg-primary text-white" : "bg-sand text-stone hover:bg-sage hover:text-primary"
              )}
            >
              {cat}
            </button>
          ))}
        </div>
      </header>

      {/* Featured Promo */}
      <div className="bg-sage rounded-[40px] p-10 flex flex-col md:flex-row items-center gap-10 overflow-hidden relative group">
        <div className="absolute -right-20 -top-20 w-80 h-80 bg-white/10 rounded-full blur-3xl group-hover:bg-white/20 transition-all" />
        <div className="flex-1 space-y-6 relative z-10">
          <div className="px-3 py-1 bg-white/30 backdrop-blur-md rounded-full w-fit text-[10px] font-extrabold text-primary uppercase tracking-widest text-primary">Featured Bundle</div>
          <h2 className="text-4xl font-serif font-bold text-primary italic leading-tight">Complete Home Ruqyah Detox</h2>
          <p className="text-primary/70 text-lg max-w-md">Everything you need for a 30-day spiritual cleansing journey. Includes Sidr oil, Ajwa dates, and Ruqyah-infused water.</p>
          <button className="btn-natural">Get 20% Off Bundle</button>
        </div>
        <div className="w-full md:w-1/3 aspect-square bg-white/50 backdrop-blur-sm rounded-[32px] overflow-hidden border border-white/40 shadow-2xl relative z-10 group-hover:scale-105 transition-transform">
          <img src="https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&q=80&w=1000" alt="Healing Bundle" className="w-full h-full object-cover mix-blend-multiply opacity-80" />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {PRODUCTS.map(product => (
          <div key={product.id} className="group space-y-4">
            <div className="aspect-[4/5] bg-sand rounded-[32px] overflow-hidden relative shadow-sm group-hover:shadow-xl group-hover:shadow-primary/5 transition-all">
              <img 
                src={`https://images.unsplash.com/photo-1611080626919-7cf5a9caab53?auto=format&fit=crop&q=80&w=800`} 
                alt={product.name} 
                className="w-full h-full object-cover opacity-90 group-hover:scale-110 transition-transform duration-700" 
              />
              <div className="absolute top-4 left-4">
                <span className="px-3 py-1 bg-white/90 backdrop-blur-md rounded-full text-[10px] font-bold text-primary uppercase tracking-wider">{product.category}</span>
              </div>
              <button className="absolute bottom-4 left-4 right-4 bg-primary text-white py-3 rounded-2xl font-bold opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all flex items-center justify-center gap-2">
                <ShoppingBag size={18} /> Add to Cart
              </button>
            </div>
            <div className="space-y-1 px-2">
              <h3 className="text-lg font-serif font-bold text-stone group-hover:text-primary transition-colors">{product.name}</h3>
              <p className="text-xl font-bold text-primary">${product.price}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
