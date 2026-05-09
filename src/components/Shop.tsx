import React from 'react';
import { PRODUCTS } from '../constants/products';
import { ShoppingBag, ArrowRight } from 'lucide-react';
import { cn } from '../lib/utils';

export default function Shop() {
  const [searchQuery, setSearchQuery] = React.useState('');
  const [selectedCategory, setSelectedCategory] = React.useState('All Products');

  const filteredProducts = PRODUCTS.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All Products' || product.category === selectedCategory || (selectedCategory === 'Oils' && product.category === 'Essential');
    return matchesSearch && matchesCategory;
  });

  const shareProduct = (product: any) => {
    if (navigator.share) {
      navigator.share({
        title: product.name,
        text: `Check out this healing product from Sukun Care: ${product.name}`,
        url: window.location.href,
      }).catch(console.error);
    } else {
      navigator.clipboard.writeText(`${product.name} - Available at Sukun Care`);
      alert('Link copied to clipboard!');
    }
  };

  return (
    <div className="p-8 space-y-12 max-w-7xl mx-auto">
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-2">
          <p className="text-[10px] font-bold uppercase tracking-widest text-stone">Spiritual Wellness</p>
          <h1 className="text-4xl font-serif font-bold text-primary italic">Healing Shop</h1>
        </div>
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative">
            <input 
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-4 py-2 rounded-xl bg-sand border-none text-sm focus:ring-2 ring-primary/20 outline-none w-full sm:w-64"
              aria-label="Search products"
            />
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-stone/50">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
            </div>
          </div>
          <div className="flex gap-2">
            {['All Products', 'Oils', 'Honey', 'Bundles'].map((cat) => (
              <button 
                key={cat} 
                onClick={() => setSelectedCategory(cat)}
                className={cn(
                  "px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap",
                  selectedCategory === cat ? "bg-primary text-white" : "bg-sand text-stone hover:bg-sage hover:text-primary"
                )}
                aria-pressed={selectedCategory === cat}
              >
                {cat}
              </button>
            ))}
          </div>
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
        {filteredProducts.map(product => (
          <div key={product.id} className="group space-y-4">
            <div className="aspect-[4/5] bg-sand rounded-[32px] overflow-hidden relative shadow-sm group-hover:shadow-xl group-hover:shadow-primary/5 transition-all">
              <img 
                src={`https://images.unsplash.com/photo-1611080626919-7cf5a9caab53?auto=format&fit=crop&q=80&w=800`} 
                alt={product.name} 
                className="w-full h-full object-cover opacity-90 group-hover:scale-110 transition-transform duration-700" 
              />
              <div className="absolute top-4 left-4 flex flex-col gap-2">
                <span className="px-3 py-1 bg-white/90 backdrop-blur-md rounded-full text-[10px] font-bold text-primary uppercase tracking-wider">{product.category}</span>
              </div>
              <div className="absolute top-4 right-4 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <button 
                  onClick={() => shareProduct(product)}
                  className="p-2 bg-white rounded-full text-primary shadow-sm hover:bg-primary hover:text-white transition-all"
                  aria-label={`Share ${product.name}`}
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"></path></svg>
                </button>
              </div>
              <button className="absolute bottom-4 left-4 right-4 bg-primary text-white py-3 rounded-2xl font-bold opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all flex items-center justify-center gap-2">
                <ShoppingBag size={18} /> Add to Cart
              </button>
            </div>
            <div className="space-y-1 px-2">
              <div className="flex items-center gap-1 mb-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <svg key={star} className="w-3 h-3 text-gold fill-gold" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
                ))}
                <span className="text-[10px] font-bold text-stone ml-1">4.9 (24)</span>
              </div>
              <h3 className="text-lg font-serif font-bold text-stone group-hover:text-primary transition-colors">{product.name}</h3>
              <p className="text-xl font-bold text-primary">৳{product.price}</p>
            </div>
          </div>
        ))}
      </div>
      {filteredProducts.length === 0 && (
        <div className="text-center py-20 bg-sand rounded-3xl">
          <p className="text-stone">No products found matching your criteria.</p>
        </div>
      )}
    </div>
  );
}
