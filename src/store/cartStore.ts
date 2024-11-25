import { create } from 'zustand';
import { CartItem, Material, Finish } from '../types';

interface CartStore {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  updateMaterial: (id: string, material: Material) => void;
  updateFinish: (id: string, finish: Finish) => void;
  clearCart: () => void;
  getTotalPrice: () => number;
}

export const useCartStore = create<CartStore>((set, get) => ({
  items: [],
  
  addItem: (item) => set((state) => ({
    items: [...state.items, item]
  })),
  
  removeItem: (id) => set((state) => ({
    items: state.items.filter(item => item.id !== id)
  })),
  
  updateQuantity: (id, quantity) => set((state) => ({
    items: state.items.map(item =>
      item.id === id ? { ...item, quantity } : item
    )
  })),
  
  updateMaterial: (id, material) => set((state) => ({
    items: state.items.map(item =>
      item.id === id ? { ...item, material } : item
    )
  })),
  
  updateFinish: (id, finish) => set((state) => ({
    items: state.items.map(item =>
      item.id === id ? { ...item, finish } : item
    )
  })),
  
  clearCart: () => set({ items: [] }),
  
  getTotalPrice: () => {
    const { items } = get();
    return items.reduce((total, item) => {
      const basePrice = item.volume * 0.1; // $0.10 per cm³
      const materialMultiplier = {
        pla: 1,
        abs: 1.2,
        nylon: 1.5,
        petg: 1.3,
        resin: 2,
      }[item.material] || 1;
      
      const finishMultiplier = {
        rough: 1,
        smooth: 1.3,
        polished: 1.5,
        painted: 2,
      }[item.finish] || 1;
      
      const price = basePrice * materialMultiplier * finishMultiplier * item.quantity;
      return total + price;
    }, 0);
  },
}));