import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import useCartStore from '../store/useCartStore';
import useWishlistStore from '../store/useWishlistStore';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Heart, ShoppingBag, PhoneCall } from 'lucide-react';
import { SUBCATEGORIES, SAMPLE_PRODUCTS } from '../data/products';

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.05 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, scale: 0.95, y: 15 },
  show: { opacity: 1, scale: 1, y: 0, transition: { type: 'spring', stiffness: 200 } }
};

const Category = () => {
  const { id } = useParams();
  const [activeSubcategory, setActiveSubcategory] = useState('All');
  const [products, setProducts] = useState([]);
  const addToCart = useCartStore(state => state.addToCart);
  const { toggleWishlist, isInWishlist } = useWishlistStore();

  useEffect(() => {
    setActiveSubcategory('All');
  }, [id]);

  useEffect(() => {
    let filtered = SAMPLE_PRODUCTS;

    if (id && id !== 'all') {
      filtered = filtered.filter(p => p.category === id);
    }

    if (activeSubcategory !== 'All') {
      filtered = filtered.filter(p => p.subcategory === activeSubcategory);
    }

    setProducts(filtered);
  }, [id, activeSubcategory]);

  const subcategoryTabs = SUBCATEGORIES[id] || ['All'];

  return (
    <div className="min-h-screen pb-20">
      
      {/* Category Header */}
      <div className="glass-nav-theme py-4 sm:py-6 sticky top-16 sm:top-20 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 sm:gap-4 mb-3">
            <Link to="/" className="p-2 sm:p-2.5 rounded-full border border-slate-500/20 bg-slate-500/10 hover:border-amber-500/50 transition">
              <ArrowLeft size={16} className="text-amber-500" />
            </Link>
            <h1 className="text-xl sm:text-3xl font-black capitalize tracking-tight">
              {id === 'all' ? 'All Kirana & Staples' : id.replace('-', ' ')}
            </h1>
            <div className="ml-auto bg-amber-500/10 text-amber-500 font-bold px-3 py-1 rounded-full text-xs border border-amber-500/20">
              {products.length} Items
            </div>
          </div>

          {/* Subcategory Tabs */}
          {id !== 'all' && subcategoryTabs.length > 1 && (
            <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-hide">
              {subcategoryTabs.map((subcat) => (
                <button
                  key={subcat}
                  onClick={() => setActiveSubcategory(subcat)}
                  className={`whitespace-nowrap px-3.5 py-1.5 rounded-full font-bold text-xs transition-all border ${
                    activeSubcategory === subcat
                      ? 'bg-amber-500 text-slate-950 border-amber-500 shadow-md shadow-amber-500/20'
                      : 'bg-slate-500/10 border-slate-500/20 hover:border-amber-500/40'
                  }`}
                >
                  {subcat}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 sm:pt-8">
        <AnimatePresence mode="wait">
          <motion.div 
            key={activeSubcategory + id}
            variants={containerVariants}
            initial="hidden"
            animate="show"
            exit="hidden"
            className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6"
          >
            {products.length > 0 ? products.map((product) => {
              const isWished = isInWishlist(product._id);
              return (
                <motion.div key={product._id} variants={itemVariants} className="card-theme p-3.5 sm:p-4 flex flex-col justify-between group relative">
                  
                  {/* Discount Badge */}
                  {product.discountPrice < product.price && (
                    <div className="absolute top-3 left-3 bg-amber-500 text-slate-950 text-[9px] sm:text-[10px] font-black px-2 py-0.5 rounded z-10 tracking-wider shadow-md">
                      SAVE ₹{product.price - product.discountPrice}
                    </div>
                  )}

                  {/* Wishlist Heart Button */}
                  <button
                    onClick={() => toggleWishlist(product)}
                    className="absolute top-3 right-3 p-1.5 sm:p-2 rounded-full bg-slate-950/80 text-slate-200 border border-slate-700 z-10 transition-transform active:scale-90"
                    title={isWished ? 'Remove from Saved' : 'Save Item'}
                  >
                    <Heart size={15} className={isWished ? 'fill-rose-500 text-rose-500' : 'text-slate-300'} />
                  </button>
                  
                  <div className="relative overflow-hidden rounded-xl mb-3 sm:mb-4 bg-slate-500/10 aspect-square border border-slate-500/20">
                    <img 
                      src={product.image} 
                      alt={product.name} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  
                  <div className="flex-1 flex flex-col justify-between space-y-3 sm:space-y-4">
                    <div>
                      <div className="text-[9px] sm:text-[10px] font-bold opacity-60 uppercase tracking-wider mb-1">{product.subcategory || 'Pandey Store'}</div>
                      <h3 className="font-bold text-xs sm:text-sm leading-snug line-clamp-2 group-hover:text-amber-500 transition-colors">
                        {product.name}
                      </h3>
                    </div>
                    
                    <div className="space-y-2.5 sm:space-y-3">
                      <div className="flex items-baseline justify-between">
                        <div className="flex items-baseline gap-1.5">
                          <span className="font-black text-amber-500 text-base sm:text-lg">₹{product.discountPrice || product.price}</span>
                          {product.discountPrice < product.price && (
                            <span className="text-[11px] opacity-50 line-through">₹{product.price}</span>
                          )}
                        </div>
                        <span className="text-[9px] sm:text-[10px] font-medium opacity-70 bg-slate-500/10 px-1.5 py-0.5 rounded border border-slate-500/20">
                          {product.weightOptions[0]}
                        </span>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-1.5 sm:gap-2">
                        <button
                          onClick={() => addToCart(product, 1)}
                          className="bg-slate-500/10 hover:bg-slate-500/20 border border-slate-500/30 text-[11px] sm:text-xs font-bold py-2 rounded-xl flex items-center justify-center gap-1 transition-all"
                        >
                          <ShoppingBag size={13} className="text-amber-500" />
                          <span>Add</span>
                        </button>

                        <a 
                          href={`https://wa.me/918877002297?text=${encodeURIComponent(`Hi Pandey Store, I want to order: ${product.name} (₹${product.discountPrice || product.price}). Please confirm delivery.`)}`}
                          target="_blank"
                          rel="noreferrer"
                          className="btn-whatsapp text-[11px] sm:text-xs font-bold py-2 rounded-xl flex items-center justify-center gap-1"
                        >
                          <PhoneCall size={13} />
                          <span>WhatsApp</span>
                        </a>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            }) : (
              <div className="col-span-full py-16 flex flex-col items-center justify-center text-slate-400">
                <div className="text-lg font-bold mb-2">No products found</div>
                <p className="text-xs opacity-60">Select another category tab to view items.</p>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Category;
