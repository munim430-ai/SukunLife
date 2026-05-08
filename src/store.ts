import { create } from 'zustand';

export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

interface AppState {
  // Localization
  language: 'EN' | 'BN';
  setLanguage: (lang: 'EN' | 'BN') => void;

  // Cart
  cart: CartItem[];
  addToCart: (product: { id: string; name: string; price: number }) => void;
  removeFromCart: (id: string) => void;
  clearCart: () => void;
  isCartOpen: boolean;
  setCartOpen: (open: boolean) => void;

  // Journey
  journeyProgress: number;
  updateJourneyProgress: (progress: number) => void;
}

export const useAppStore = create<AppState>((set) => ({
  language: 'EN',
  setLanguage: (lang) => set({ language: lang }),

  cart: [],
  addToCart: (product) => set((state) => {
    const existing = state.cart.find(item => item.id === product.id);
    if (existing) {
      return { cart: state.cart.map(item => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item) };
    }
    return { cart: [...state.cart, { ...product, quantity: 1 }], isCartOpen: true };
  }),
  removeFromCart: (id) => set((state) => ({ cart: state.cart.filter(item => item.id !== id) })),
  clearCart: () => set({ cart: [] }),
  isCartOpen: false,
  setCartOpen: (open) => set({ isCartOpen: open }),

  journeyProgress: 12, // Initial mock progress
  updateJourneyProgress: (progress) => set({ journeyProgress: progress })
}));
