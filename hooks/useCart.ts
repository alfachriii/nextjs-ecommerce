"use client";

import {
   addItemToCart,
   decreaseItemQuantity,
   deleteItemIncart,
   getCart,
   getProductsByIds,
} from "@/app/actions/cart";
import { myToast } from "@/lib/myToast";
import { ProductResult } from "@/sanity/types";
import { CartItem, useStore } from "@/store";
import { useState, useTransition } from "react";

export const useCart = () => {
   const { setItems, addItem, getGroupedItems, deleteCartProduct, removeItem } = useStore();
   const [isPending, startTransition] = useTransition();
   const [loading, setLoading] = useState(false);

   const handleAddItem = (product: ProductResult, quantity?: number) => {
      setLoading(true);
      startTransition(async () => {
         try {
            const { data, messages, isSuccess } = await addItemToCart(
               product?._id ?? "",
               quantity,
            );
            if (!data && !isSuccess) {
               myToast.error(messages);
               return;
            }

            myToast.success(messages);
            return;
         } catch (error) {
            myToast.error("Failed add item to cart.", `${error}`);
            return;
         }
      });
      addItem(product);
      setLoading(false);
   };

   const handleGetProductItems = () => {
      setLoading(true);
      startTransition(async () => {
         try {
            const cart = await getCart();
            const currentItems = cart.data?.items;
            if (!currentItems) return;

            const productIds = currentItems?.map(
               (item) => item.productId,
            );
            if (!productIds) return;

            const products = await getProductsByIds(productIds);
            if (!products.data && !products.isSuccess) {
               myToast.error(products.messages);
               return;
            }

            const productItems = currentItems.map((item) => {
               const productData = products.data?.find(prod => prod?._id === item.productId)

               return {
                  product: productData,
                  quantity: item.quantity
               }
            }) as CartItem[]

            setItems(productItems);
            
            return;
         } catch (error) {
            myToast.error("Failed fetch products in cart.", `${error}`)
            return;
         }
      });
      setLoading(false);
   };

   const handleDeleteItem = (productId: string) => {
      setLoading(true);
      startTransition(async () => {
         try {
            const { isSuccess, messages } = await deleteItemIncart(productId);
            if (!isSuccess) {
               myToast.error(messages);
               return;
            }

            myToast.success(messages);
            return;
         } catch (error) {
            myToast.error("Failed to delete product.", `${error}`)
            return;
         }
      })
      deleteCartProduct(productId);
      setLoading(false);
   }

   const handleDecreaseItemQuantity = (productId: string) => {
      setLoading(true);
      startTransition(async () => {
         try {
            const { isSuccess, messages } = await decreaseItemQuantity(productId); 
            if (!isSuccess) {
               myToast.error(messages);
               return;
            }

            myToast.success(messages);
            return;
         } catch (error) {
            myToast.error("Failed to decrease item quantity.", `${error}`)
            return;
         }
      })
      removeItem(productId);
      setLoading(false);
   }

   return {
      isPending,
      loading,
      getGroupedItems,
      handleAddItem,
      handleGetProductItems,
      handleDeleteItem,
      handleDecreaseItemQuantity
   };
};
