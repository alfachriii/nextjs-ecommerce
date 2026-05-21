import { create } from "zustand";
import { persist } from "zustand/middleware";
import { ProductResult } from "./sanity/types";



export interface CartItem {
   product: ProductResult;
   quantity: number;
}

interface StoreState {
   items: CartItem[];
   addItem: (product: ProductResult) => void;
   getGroupedItems: () => CartItem[];
}

export const useStore = create<StoreState>()(
   persist(
      (set, get) => ({
         items: [],
         addItem: (product) => {
            set((state) => {
               const existingItem = state.items.find(
                  (item) => item.product?._id === product?._id,
               );

               if (existingItem)
                  return {
                     items: state.items.map((item) =>
                        item.product?._id === product?._id
                           ? { ...item, quantity: item.quantity + 1 }
                           : item,
                     ),
                  };

               return { items: [...state.items, { product, quantity: 1 }] };
            });
         },
         getGroupedItems: () => get().items,
      }),
      {
         name: "cartStore",
      },
   ),
);
