"use client";

import {
   addItemToCart,
   decreaseItemQuantity,
   deleteItemIncart,
   getCart,
   getProductsByIds,
} from "@/app/actions/cart";
import { ProductResult } from "@/sanity/types";
import { CartItem, useStore } from "@/store";
import { useTransition } from "react";

export const useCart = () => {
   const { setItems, addItem, getGroupedItems, deleteCartProduct, removeItem } = useStore();
   const [isPending, startTransition] = useTransition();

   const handleAddItem = (product: ProductResult, quantity?: number) => {
      console.log("product yang mau di add: ", product);
      startTransition(async () => {
         try {
            const { data, messages, isSuccess } = await addItemToCart(
               product?._id ?? "",
               quantity,
            );
            // TODO: make toast for errors
            if (!data && !isSuccess) return alert(messages);

            console.log("added item: ", product)
            // TODO: make success toast
            alert("Success Add Item To Cart");
         } catch (error) {
            alert(`Failed add item to cart: ${error}`);
         }
      });
      addItem(product);
   };

   const handleGetProductItems = () => {
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
            if (!products.data && !products.isSuccess) return alert(products.messages);

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
            return alert("Failed fetch products in cart");
         }
      });
   };

   const handleDeleteItem = (productId: string) => {
      startTransition(async () => {
         try {
            const { isSuccess, messages } = await deleteItemIncart(productId);
            if (!isSuccess) return alert(messages);

            return alert(messages);
         } catch (error) {
            return alert("failed to delete product")
         }
      })
      deleteCartProduct(productId);
   }

   const handleDecreaseItemQuantity = (productId: string) => {
      startTransition(async () => {
         try {
            const { isSuccess, messages } = await decreaseItemQuantity(productId); 
            if (!isSuccess) return alert(messages);

            alert(messages);
         } catch (error) {
            return alert("failed to decrease item quantity")
         }
      })
      removeItem(productId);
   }

   return {
      isPending,
      getGroupedItems,
      handleAddItem,
      handleGetProductItems,
      handleDeleteItem,
      handleDecreaseItemQuantity
   };
};
