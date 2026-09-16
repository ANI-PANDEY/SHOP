import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useWishlistStore = create(
  persist(
    (set, get) => ({
      wishlistItems: [],

      toggleWishlist: (product) => {
        const id = product._id || product.id;
        const exists = get().wishlistItems.some(item => (item._id || item.id) === id);

        if (exists) {
          set((state) => ({
            wishlistItems: state.wishlistItems.filter(item => (item._id || item.id) !== id)
          }));
          return false; // Removed
        } else {
          set((state) => ({
            wishlistItems: [...state.wishlistItems, product]
          }));
          return true; // Added
        }
      },

      isInWishlist: (productId) => {
        return get().wishlistItems.some(item => (item._id || item.id) === productId);
      },

      clearWishlist: () => set({ wishlistItems: [] })
    }),
    {
      name: 'grocery-wishlist',
    }
  )
);

export default useWishlistStore;
