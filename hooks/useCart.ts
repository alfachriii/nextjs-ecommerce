"use client";

import {
   addItemToCart,
   getItemsInCart,
   getProductsByIds,
} from "@/app/actions/cart";
import { verifySession } from "@/lib/dal";
import { ProductResult } from "@/sanity/types";
import { useStore } from "@/store";
import { useTransition } from "react";

export const useCart = () => {
   const { addItem, getGroupedItems } = useStore();
   const [isPending, startTransition] = useTransition();

   const handleAddItem = (product: ProductResult, quantity?: number) => {
      console.log("product yang mau di add: ", product);
      startTransition(async () => {
         try {
            const { data, messages } = await addItemToCart(
               product?._id ?? "",
               quantity,
            );
            // TODO: make toast for errors
            if (!data) return alert(messages);

            // TODO: make success toast
            addItem(product);
            console.log("added item: ", product)
            alert("Success Add Item To Cart");
         } catch (error) {
            alert(`Failed add item to cart: ${error}`);
         }
      });
   };

   const handleGetProductItems = () => {
      startTransition(async () => {
         try {
            const currentItems = await getItemsInCart();
            if (!currentItems) return alert("Cart empty");

            const productIds = currentItems?.items?.map(
               (item) => item.productId,
            );
            if (!productIds) return alert("Cart empty");
            const products = await getProductsByIds(productIds);

            if (!products) return alert("Failed fetch products in cart");

            // TODO: handle this heavy loop
            products.map((product) => addItem(product));
            return;
         } catch (error) {
            return alert("Failed fetch products in cart");
         }
      });
   };

   return {
      isPending,
      getGroupedItems,
      handleAddItem,
      handleGetProductItems,
   };
};
