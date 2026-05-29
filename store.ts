import { create } from "zustand";
import { persist } from "zustand/middleware";
import { AddressData, ProductResult } from "./sanity/types";

export interface CartItem {
   product: ProductResult;
   quantity: number;
}

interface StoreState {
   items: CartItem[];
   setItems: (cartItems: CartItem[]) => void;
   addItem: (product: ProductResult) => void;
   removeItem: (productId: string) => void;
   resetCart: () => void;
   getTotalPrice: () => number;
   getSubTotalPrice: () => number;
   getItemCount: (productId: string) => number;
   getGroupedItems: () => CartItem[];
   deleteCartProduct: (productId: string) => void;
   decreaseItemQuantity: (productId: string) => void;
}

interface DeliveryState {
   addresses: AddressData[];
   selectedAddress: AddressData | null;
   getSelectedAddress: () => AddressData | null;
   setAddresses: (addressDatas: AddressData[]) => void;
   addAddress: (addressData: AddressData) => void;
   setSelectedAddress: (addressData: AddressData) => void;
   getAddresses: () => AddressData[];
   resetAddresses: () => void;
}

export const useStore = create<StoreState>()(
   persist(
      (set, get) => ({
         items: [],
         setItems: (cartItems) => {
            set({ items: cartItems });
         },
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
         removeItem: (productId) =>
            set((state) => ({
               items: state.items.reduce((acc, item) => {
                  if (item.product?._id === productId) {
                     if (item.quantity > 1) {
                        acc.push({ ...item, quantity: item.quantity - 1 });
                     }
                  } else {
                     acc.push(item);
                  }
                  return acc;
               }, [] as CartItem[]),
            })),
         resetCart: () => set({ items: [] }),
         getTotalPrice: () => {
            return get().items.reduce(
               (total, item) =>
                  total + (item.product?.price ?? 0) * item.quantity,
               0,
            );
         },
         getSubTotalPrice: () => {
            return get().items.reduce((total, item) => {
               const discount = item.product?.discount ?? 0;
               return total + discount * item.quantity;
            }, 0);
         },
         getGroupedItems: () => get().items,
         deleteCartProduct: (productId) =>
            set((state) => ({
               items: state.items.filter(
                  ({ product }) => product?._id !== productId,
               ),
            })),
         decreaseItemQuantity: (productId) =>
            set((state) => ({
               items: state.items.reduce((acc, item) => {
                  if (item.product?._id === productId) {
                     if (item.quantity > 1) {
                        acc.push({ ...item, quantity: item.quantity - 1 });
                     }
                  } else {
                     acc.push(item);
                  }
                  return acc;
               }, [] as CartItem[]),
            })),
         getItemCount: (productId) => {
            const item = get().items.find(
               (item) => item.product?._id === productId,
            );
            return item ? item.quantity : 0;
         },
      }),
      {
         name: "cartStore",
      },
   ),
);

export const useDeliveryAddressState = create<DeliveryState>()(
   persist(
      (set, get) => ({
         addresses: [],
         selectedAddress: null,
         setAddresses: (addressDatas) => set({ addresses: addressDatas }),
         addAddress: (addressData) => {
            set((state) => {
               return { addresses: [...state.addresses, addressData] };
            });
         },
         setSelectedAddress: (addressData) => {
            set({ selectedAddress: addressData });
         },
         getSelectedAddress: () => get().selectedAddress,
         getAddresses: () => get().addresses,
         resetAddresses: () => set({ addresses: [], selectedAddress: null }),
      }),
      {
         name: "addressStore",
      },
   ),
);
