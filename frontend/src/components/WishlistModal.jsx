import { motion, AnimatePresence } from 'framer-motion';
import { Heart, X, ShoppingBag, Trash2, ArrowRight } from 'lucide-react';
import useWishlistStore from '../store/useWishlistStore';
import useCartStore from '../store/useCartStore';

const WishlistModal = ({ isOpen, onClose }) => {
  const { wishlistItems, toggleWishlist, clearWishlist } = useWishlistStore();
  const { addToCart } = useCartStore();

  const handleMoveToCart = (item) => {
    addToCart(item, 1);
    toggleWishlist(item);
  };

  const handleMoveAllToCart = () => {
    wishlistItems.forEach((item) => {
      addToCart(item, 1);
    });
    clearWishlist();
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex justify-end bg-slate-950/60 backdrop-blur-sm">
        <motion.div
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          exit={{ x: '100%' }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          className="w-full max-w-md bg-white h-full shadow-2xl flex flex-col justify-between overflow-hidden"
        >
          {/* Header */}
          <div className="p-5 border-b border-slate-100 flex items-center justify-between bg-slate-900 text-white">
            <div className="flex items-center gap-2">
              <div className="p-2 bg-rose-500/20 text-rose-400 rounded-xl">
                <Heart size={20} className="fill-rose-500 text-rose-500" />
              </div>
              <div>
                <h3 className="font-extrabold text-lg text-white">My Saved Items</h3>
                <p className="text-xs text-slate-400">{wishlistItems.length} item{wishlistItems.length !== 1 ? 's' : ''} saved</p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-2 text-slate-400 hover:text-white rounded-full bg-white/5 hover:bg-white/10 transition-colors"
            >
              <X size={18} />
            </button>
          </div>

          {/* Items List */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4">
            {wishlistItems.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-12 space-y-3">
                <div className="w-16 h-16 rounded-full bg-rose-50 flex items-center justify-center text-rose-400">
                  <Heart size={32} />
                </div>
                <h4 className="font-extrabold text-slate-800 text-lg">Your Wishlist is Empty</h4>
                <p className="text-xs text-slate-400 max-w-xs">
                  Tap the heart icon on any product to save it here for later shopping!
                </p>
              </div>
            ) : (
              wishlistItems.map((item) => {
                const itemId = item._id || item.id;
                const price = item.discountPrice > 0 ? item.discountPrice : item.price;
                return (
                  <div
                    key={itemId}
                    className="flex items-center justify-between gap-4 p-3 rounded-2xl border border-slate-100 bg-slate-50 hover:bg-white hover:shadow-md transition-all"
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-16 h-16 object-cover rounded-xl border border-slate-200"
                    />

                    <div className="flex-1 min-w-0">
                      <h4 className="font-bold text-slate-800 text-xs line-clamp-1">{item.name}</h4>
                      <p className="font-extrabold text-sm text-slate-900 mt-1">₹{price}</p>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleMoveToCart(item)}
                        className="bg-emerald-600 hover:bg-emerald-500 text-white p-2.5 rounded-xl font-bold text-xs flex items-center gap-1 shadow-sm transition-all"
                        title="Add to Cart"
                      >
                        <ShoppingBag size={15} />
                      </button>

                      <button
                        onClick={() => toggleWishlist(item)}
                        className="p-2.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-colors"
                        title="Remove"
                      >
                        <Trash2 size={15} />
                      </button>
                    </div>
                  </div>
                );
              })
            )}
          </div>

          {/* Footer Actions */}
          {wishlistItems.length > 0 && (
            <div className="p-5 border-t border-slate-100 bg-slate-50 space-y-2">
              <button
                onClick={handleMoveAllToCart}
                className="w-full bg-slate-900 hover:bg-emerald-600 text-white py-3.5 rounded-2xl font-extrabold text-sm flex items-center justify-center gap-2 shadow-lg transition-all"
              >
                <span>Move All to Cart</span>
                <ArrowRight size={16} />
              </button>

              <button
                onClick={clearWishlist}
                className="w-full text-xs font-bold text-slate-400 hover:text-rose-600 py-1.5 transition-colors"
              >
                Clear Wishlist
              </button>
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default WishlistModal;
