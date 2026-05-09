import React, { useState } from 'react';
import { PRODUCTS } from '../constants/products';
import { ShoppingBag, ArrowRight, Star, X, MessageSquare, ThumbsUp } from 'lucide-react';
import { cn } from '../lib/utils';
import { motion, AnimatePresence } from 'motion/react';

const REVIEWS = [
  { id: 1, user: 'Zaid A.', rating: 5, date: '2 days ago', text: 'This oil smells divine and really helps with my focus during Tahajjud. JazakAllah Khair!', likes: 12 },
  { id: 2, user: 'Fatima R.', rating: 5, date: '1 week ago', text: 'The Ajwa dates are fresh and top quality. Best I have found in Dhaka.', likes: 8 },
  { id: 3, user: 'Omar S.', rating: 4, date: '2 weeks ago', text: 'Good quality Ruqyah water. Shipping was a bit slow but package was secure.', likes: 5 },
];

export default function Shop() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All Products');
  const [selectedProduct, setSelectedProduct] = useState<any>(null);

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
    <div className="p-8 space-y-12 max-w-7xl mx-auto pb-32">
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-2">
          <p className="text-[10px] font-black uppercase tracking-[0.2em] text-stone">Spiritual Wellness Gear</p>
          <h1 className="text-5xl font-serif font-bold text-primary italic">Healing Shop</h1>
        </div>
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative">
            <input 
              type="text"
              placeholder="Search items..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-12 pr-4 py-3 rounded-2xl bg-sand border-none text-sm font-bold text-primary focus:ring-2 ring-primary/20 outline-none w-full sm:w-80 shadow-inner"
              aria-label="Search products"
            />
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-stone/50">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
            </div>
          </div>
          <div className="flex gap-2 bg-sand p-1 rounded-2xl">
            {['All Products', 'Oils', 'Honey', 'Bundles'].map((cat) => (
              <button 
                key={cat} 
                onClick={() => setSelectedCategory(cat)}
                className={cn(
                  "px-5 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all whitespace-nowrap",
                  selectedCategory === cat ? "bg-white text-primary shadow-sm" : "text-stone hover:text-primary"
                )}
                aria-pressed={selectedCategory === cat}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </header>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-12">
        {filteredProducts.map(product => (
          <div key={product.id} className="group space-y-6">
            <div className="aspect-[4/5] bg-sand rounded-[48px] overflow-hidden relative shadow-sm group-hover:shadow-2xl group-hover:translate-y-[-8px] transition-all duration-500 ring-1 ring-sand">
              <img 
                src={`https://images.unsplash.com/photo-1611080626919-7cf5a9caab53?auto=format&fit=crop&q=80&w=800`} 
                alt={product.name} 
                className="w-full h-full object-cover opacity-90 group-hover:scale-110 transition-transform duration-1000" 
              />
              <div className="absolute top-6 left-6 flex flex-col gap-2">
                <span className="px-4 py-2 bg-white/95 backdrop-blur-md rounded-2xl text-[10px] font-black text-primary uppercase tracking-[0.15em] shadow-sm">{product.category}</span>
              </div>
              
              <div className="absolute top-6 right-6 flex flex-col gap-3 opacity-0 group-hover:opacity-100 transition-all translate-x-4 group-hover:translate-x-0">
                <button 
                  onClick={() => shareProduct(product)}
                  className="p-3 bg-white rounded-2xl text-primary shadow-xl hover:bg-primary hover:text-white transition-all transform hover:rotate-12"
                  aria-label={`Share ${product.name}`}
                >
                  <Share2 size={18} />
                </button>
                <button 
                  onClick={() => setSelectedProduct(product)}
                  className="p-3 bg-white rounded-2xl text-primary shadow-xl hover:bg-primary hover:text-white transition-all transform hover:-rotate-12"
                  aria-label={`View reviews for ${product.name}`}
                >
                  <MessageSquare size={18} />
                </button>
              </div>

              <button className="absolute bottom-6 left-6 right-6 bg-primary text-white py-4 rounded-[24px] font-black text-xs uppercase tracking-[0.15em] opacity-0 translate-y-6 group-hover:opacity-100 group-hover:translate-y-0 transition-all flex items-center justify-center gap-3 shadow-2xl shadow-primary/40">
                <ShoppingBag size={20} /> Add to Sanctuary
              </button>
            </div>
            
            <div className="space-y-2 px-2">
              <button 
                onClick={() => setSelectedProduct(product)}
                className="flex items-center gap-1 mb-2 hover:scale-105 transition-transform origin-left"
              >
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star key={star} className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                ))}
                <span className="text-[10px] font-black text-stone opacity-50 ml-2 uppercase tracking-widest underline decoration-2 decoration-sand">24 Reviews</span>
              </button>
              <h3 className="text-2xl font-serif font-bold text-primary italic leading-tight group-hover:text-primary/70 transition-colors">{product.name}</h3>
              <p className="text-2xl font-black text-primary font-serif">৳{product.price}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Reviews Modal */}
      <AnimatePresence>
        {selectedProduct && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-6">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedProduct(null)}
              className="absolute inset-0 bg-primary/20 backdrop-blur-xl"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="w-full max-w-2xl bg-white rounded-[48px] shadow-2xl relative z-10 overflow-hidden border border-sand"
            >
              <div className="p-10 space-y-8">
                <header className="flex items-center justify-between">
                  <div className="space-y-1">
                    <p className="text-[10px] font-black uppercase tracking-widest text-stone">Verified Healing Experience</p>
                    <h2 className="text-3xl font-serif font-bold text-primary italic leading-none">{selectedProduct.name}</h2>
                  </div>
                  <button 
                    onClick={() => setSelectedProduct(null)}
                    className="p-4 bg-sand rounded-3xl text-stone hover:text-primary transition-all active:scale-90"
                  >
                    <X size={24} />
                  </button>
                </header>

                <div className="space-y-6 max-h-[50vh] overflow-y-auto pr-4 scrollbar-hide">
                  <div className="grid grid-cols-3 gap-6 mb-10">
                     <div className="p-6 bg-sage/30 rounded-3xl text-center space-y-1 border border-sage/50">
                        <p className="text-2xl font-black text-primary">4.9</p>
                        <p className="text-[10px] font-bold text-stone uppercase tracking-widest">Global Rating</p>
                     </div>
                     <div className="p-6 bg-sand rounded-3xl text-center space-y-1">
                        <p className="text-2xl font-black text-stone">24</p>
                        <p className="text-[10px] font-bold text-stone uppercase tracking-widest">Reviews</p>
                     </div>
                     <div className="p-6 bg-primary/10 rounded-3xl text-center space-y-1 border border-primary/20">
                        <p className="text-2xl font-black text-primary">98%</p>
                        <p className="text-[10px] font-bold text-stone uppercase tracking-widest">Recommend</p>
                     </div>
                  </div>

                  <div className="space-y-6">
                    {REVIEWS.map(review => (
                      <div key={review.id} className="p-8 bg-sand/30 rounded-[32px] space-y-4 border border-transparent hover:border-sand/50 transition-all">
                        <div className="flex justify-between items-start">
                          <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-primary font-serif font-bold italic shadow-sm border border-sand">
                              {review.user[0]}
                            </div>
                            <div className="space-y-0.5">
                              <p className="text-sm font-bold text-primary">{review.user}</p>
                              <div className="flex gap-0.5">
                                {[...Array(review.rating)].map((_, i) => (
                                  <Star key={i} className="w-3 h-3 text-amber-400 fill-amber-400" />
                                ))}
                              </div>
                            </div>
                          </div>
                          <span className="text-[10px] font-bold text-stone opacity-40 uppercase tracking-widest">{review.date}</span>
                        </div>
                        <p className="text-sm text-stone font-medium leading-relaxed italic">"{review.text}"</p>
                        <div className="flex items-center gap-4 pt-2">
                           <button className="flex items-center gap-2 px-4 py-2 bg-white rounded-xl text-[10px] font-bold text-stone hover:text-primary transition-colors border border-sand">
                             <ThumbsUp size={12} /> Helpful ({review.likes})
                           </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-2">
                   <button className="w-full bg-primary text-white py-5 rounded-[24px] font-black text-xs uppercase tracking-[0.2em] shadow-xl shadow-primary/30 flex items-center justify-center gap-3">
                     <ArrowRight size={18} /> Purchase Now
                   </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {filteredProducts.length === 0 && (
        <div className="text-center py-32 bg-sand/30 rounded-[48px] border-2 border-dashed border-sand">
          <p className="text-xl font-serif font-bold text-stone opacity-50 italic">No sacred tools found matching your request.</p>
        </div>
      )}
    </div>
  );
}

const Share2 = ({ size, className }: { size?: number, className?: string }) => (
  <svg width={size} height={size} className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/></svg>
);

