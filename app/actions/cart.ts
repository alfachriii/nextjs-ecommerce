"use server";

import { verifySession } from "@/lib/dal";
import { client, secureClient } from "@/sanity/lib/client";
import {
   ITEMS_IN_CART_BY_CART_ID_QUERY,
   PRODUCTS_BY_IDS_QUERY,
} from "@/sanity/queries/query";
import { ItemsCart, ItemsCartResult, ProductResult } from "@/sanity/types";

export const createNewCart = async (userId: string) => {
   try {
      const cartId = `cart-${userId}`;
      const cart = await secureClient.createIfNotExists({
         _type: "cart",
         _id: cartId,
         userId: userId,
      });
      return cart;
   } catch (error) {
      console.log("failed to create new cart");
      return null;
   }
};

export const addItemToCart = async (productId: string, quantity?: number) => {
   try {
      const session = await verifySession();
      if (!session) {
         return {
            data: null,
            messages: "Do not have permission, please login!",
         };
      }
      const { userId } = session;
      const cartId = `cart-${userId}`;
      const existingItem = await getExistingItemInCart(productId);

      if (!existingItem) {
         console.log("item belom ada bos");
         const itemWithKey = {
            _key: crypto.randomUUID(),
            productId: productId,
            quantity: quantity ?? 1,
         };

         const result = await secureClient
            .patch(cartId)
            .setIfMissing({ items: [] })
            .insert("after", "items[-1]", [itemWithKey])
            .commit();

         return {
            data: result,
            messages: "Success add product to cart",
         };
      }

      console.log("item udah ada bos, tambahin quantitynya aja");
      const newQuantity = existingItem.quantity + (quantity ?? 1);

      const result = await secureClient
         .patch(cartId)
         .set({
            [`items[_key == "${existingItem._key}"].quantity`]: newQuantity,
         })
         .commit();

      return {
         data: result,
         messages: "Success add product to cart",
      };
   } catch (error) {
      console.log("Failed add item to cart");
      return {
         data: null,
         messages: "Failed add product to cart"
      }
   }
};

export const getItemsInCart = async () => {
   try {
      const session = await verifySession();
      if (!session) {
         throw new Error("Authorization erorr");
      }
      const { userId } = session;
      const cartId = `cart-${userId}`;

      const items = (await secureClient.fetch(ITEMS_IN_CART_BY_CART_ID_QUERY, {
         cartId,
      })) as ItemsCartResult;
      return items ?? null;
   } catch (error) {
      console.log("Failed to fetch products in cart: ", error);
      return null;
   }
};

export const getProductsByIds = async (productIds: string[]) => {
   try {
      const products = (await client.fetch(PRODUCTS_BY_IDS_QUERY, {
         ids: productIds,
      })) as ProductResult[];
      return products;
   } catch (error) {
      console.log("Failed to fetch products by ids: ", error);
      return null;
   }
};

const getExistingItemInCart = async (targetProductId: string) => {
   try {
      const currentItems = await getItemsInCart();
      console.log(
         "[ACTIONS] type of currentItems: ",
         typeof currentItems?.items,
      );
      console.log("[ACTIONS] currentItems: ", currentItems);

      if (!currentItems) return null;
      const existingItem = currentItems?.items?.find(
         (item) => item.productId === targetProductId,
      );

      if (existingItem) return existingItem;

      return null;
   } catch (error) {
      console.log("Failed to validate Product in cart: ", error);
   }
};
