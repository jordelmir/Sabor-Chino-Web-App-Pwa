import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Product, SizeOption } from '../data/menuData';

export interface CartItem {
  id: string; // Unique ID for the cart item (product.id + size + notes)
  product: Product;
  quantity: number;
  size: SizeOption;
  notes?: string;
}

interface CartState {
  items: CartItem[];
  addItem: (product: Product, size: SizeOption, quantity?: number, notes?: string) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  getTotal: () => number;
  getItemCount: () => number;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      
      addItem: (product, size, quantity = 1, notes = '') => {
        set((state) => {
          const itemId = `${product.id}-${size}-${notes}`;
          const existingItemIndex = state.items.findIndex(item => item.id === itemId);

          if (existingItemIndex >= 0) {
            const updatedItems = [...state.items];
            updatedItems[existingItemIndex].quantity += quantity;
            return { items: updatedItems };
          }

          return {
            items: [...state.items, { id: itemId, product, quantity, size, notes }]
          };
        });
      },

      removeItem: (id) => {
        set((state) => ({
          items: state.items.filter(item => item.id !== id)
        }));
      },

      updateQuantity: (id, quantity) => {
        set((state) => {
          if (quantity <= 0) {
            return { items: state.items.filter(item => item.id !== id) };
          }
          return {
            items: state.items.map(item => 
              item.id === id ? { ...item, quantity } : item
            )
          };
        });
      },

      clearCart: () => set({ items: [] }),

      getTotal: () => {
        const { items } = get();
        return items.reduce((total, item) => {
          const itemPrice = item.size === 'Medio' && item.product.priceMedio 
            ? item.product.priceMedio 
            : item.product.price;
          return total + (itemPrice * item.quantity);
        }, 0);
      },

      getItemCount: () => {
        const { items } = get();
        return items.reduce((count, item) => count + item.quantity, 0);
      }
    }),
    {
      name: 'sabor-chino-cart',
    }
  )
);
