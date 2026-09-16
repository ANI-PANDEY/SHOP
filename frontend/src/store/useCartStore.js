import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useCartStore = create(
  persist(
    (set, get) => ({
      cartItems: [],
      deliveryType: 'Normal Delivery', // 'Normal Delivery', 'Quick Delivery', 'Scheduled Delivery'
      scheduledDate: '',
      scheduledSlot: '',
      
      addToCart: (product, qty = 1, weightOption = null) => {
        const item = {
          product: product._id || product.id,
          name: product.name,
          image: product.image,
          price: product.discountPrice > 0 ? product.discountPrice : product.price,
          qty,
          weightOption,
        };

        set((state) => {
          const existItem = state.cartItems.find(x => x.product === item.product && x.weightOption === item.weightOption);
          
          if (existItem) {
            return {
              cartItems: state.cartItems.map(x => 
                x.product === existItem.product && x.weightOption === existItem.weightOption 
                  ? { ...x, qty: x.qty + qty } 
                  : x
              )
            };
          } else {
            return { cartItems: [...state.cartItems, item] };
          }
        });
      },

      removeFromCart: (productId, weightOption) => {
        set((state) => ({
          cartItems: state.cartItems.filter(x => !(x.product === productId && x.weightOption === weightOption))
        }));
      },

      updateQty: (productId, weightOption, qty) => {
        if (qty <= 0) {
          get().removeFromCart(productId, weightOption);
          return;
        }
        set((state) => ({
          cartItems: state.cartItems.map(x => 
            x.product === productId && x.weightOption === weightOption ? { ...x, qty } : x
          )
        }));
      },

      setDeliveryType: (type) => set({ deliveryType: type }),
      
      setSchedule: (date, slot) => set({ scheduledDate: date, scheduledSlot: slot }),

      clearCart: () => set({ cartItems: [], scheduledDate: '', scheduledSlot: '' }),

      // Computed properties
      getCartTotal: () => {
        const itemsPrice = get().cartItems.reduce((acc, item) => acc + item.price * item.qty, 0);
        let shippingPrice = 0;
        
        if (get().deliveryType === 'Quick Delivery') {
          shippingPrice = 30;
        } else if (get().deliveryType === 'Scheduled Delivery') {
          shippingPrice = 15;
        } else if (itemsPrice < 500) {
          shippingPrice = 20; // Normal delivery charge if under 500
        }

        return {
          itemsPrice,
          shippingPrice,
          totalPrice: itemsPrice + shippingPrice
        };
      }
    }),
    {
      name: 'grocery-cart',
    }
  )
);

export default useCartStore;
