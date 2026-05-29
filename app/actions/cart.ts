"use server";

import { getUserIdFromSession, verifySession } from "@/lib/dal";
import { client, secureClient } from "@/sanity/lib/client";
import {
   CART_BY_ID_QUERY,
   PRODUCT_BY_ID_QUERY,
   PRODUCTS_BY_IDS_QUERY,
} from "@/sanity/queries/query";
import { Cart, ProductResult } from "@/sanity/types";

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
      console.error("[ACTIONS] Error while creating new cart: ", error);
      return null;
   }
};

export const addItemToCart = async (productId: string, quantity?: number) => {
   try {
      const userId = await getUserIdFromSession();

      const cartId = `cart-${userId}`;
      const existingItem = await getExistingItemInCart(productId);

      if (!existingItem) {
         console.log("item blon ada...");
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
            isSuccess: true,
            messages: "Product successfully added to cart",
         };
      }

      const result = await secureClient
         .patch(cartId)
         .inc({
            [`items[productId=="${existingItem.productId}"].quantity`]: +1,
         })
         .commit();

      return {
         data: result,
         isSuccess: true,
         messages: "Product successfully added to cart",
      };
   } catch (error) {
      console.error("[ACTIONS] Error while adding product to cart: ", error);
      return {
         data: null,
         isSuccess: false,
         messages: "Failed add product to cart",
      };
   }
};

export const getCart = async () => {
   try {
      const userId = await getUserIdFromSession();
      if (!userId) {
         return {
            data: null,
            isSuccess: false,
            messages: "Do not have permission, please login!",
         };
      }
      const cartId = `cart-${userId}`;

      const cart = (await secureClient.fetch(CART_BY_ID_QUERY, {
         cartId,
      })) as Cart;

      if (!cart._id)
         return {
            data: null,
            isSuccess: false,
            messages: "Cannot find the cart",
         };

      return {
         data: cart,
         isSuccess: true,
         messages: "Successfully get cart",
      };
   } catch (error) {
      console.error("[ACTIONS] Error while fetching cart: ", error);
      return {
         data: null,
         isSuccess: false,
         messages: "Failed to get cart",
      };
   }
};

export const getProductById = async (productId: string) => {
   try {
      const result = (await client.fetch(PRODUCT_BY_ID_QUERY, {
         productId: productId,
      })) as ProductResult;
      if (!result?._id)
         return {
            data: null,
            isSuccess: false,
            messages: "Cannot find the product",
         };
      return {
         data: result,
         isSuccess: true,
         messages: "Successfully get product",
      };
   } catch (error) {
      console.error("[ACTIONS] Error while fetching product: ", error);
      return {
         data: null,
         isSuccess: false,
         messages: "Failed to get product",
      };
   }
};

export const getProductsByIds = async (productIds: string[]) => {
   try {
      const products = (await client.fetch(PRODUCTS_BY_IDS_QUERY, {
         ids: productIds,
      })) as ProductResult[];
      if (products.length === 0)
         return {
            data: null,
            isSuccess: false,
            messages: "Failed to fetch products",
         };

      return {
         data: products,
         isSuccess: true,
         messages: "Successfully get products",
      };
   } catch (error) {
      console.error("[ACTIONS] Error while fetching products by ids: ", error);
      return {
         data: null,
         isSuccess: false,
         messages: "Failed to fetch products",
      };
   }
};

export const deleteItemIncart = async (productId: string) => {
   try {
      const userId = await getUserIdFromSession();
      if (!userId) {
         return {
            data: null,
            isSuccess: false,
            messages: "Do not have permission, please login!",
         };
      }
      const cartId = `cart-${userId}`;
      const result = (await secureClient
         .patch(cartId)
         .unset([`items[productId == "${productId}"]`])
         .commit()) as Cart;

      const isDeleted = !result.items?.some(
         (item) => item.productId === productId,
      );
      if (!isDeleted)
         return {
            isSuccess: false,
            messages: "Failed to delete product",
         };

      return {
         isSuccess: true,
         messages: "Product deleted successfully",
      };
   } catch (error) {
      console.error("[ACTIONS] Error while deleting product: ", error);
      return {
         isSuccess: false,
         messages: "Failed to delete product",
      };
   }
};

export const decreaseItemQuantity = async (productId: string) => {
   try {
      const userId = await getUserIdFromSession();
      if (!userId) {
         return {
            isSuccess: false,
            messages: "Do not have permission, please login!",
         };
      }
      const cartId = `cart-${userId}`;
      await secureClient
         .patch(cartId)
         .inc({
            [`items[productId=="${productId}"].quantity`]: -1,
         })
         .commit();

      return {
         isSuccess: true,
         messages: "Product Quantity Successfully decreased",
      };
   } catch (error) {
      console.error("[ACTIONS] Error while decrease item quantity: ", error);
      return {
         isSuccess: false,
         messages: "Internal Server Error.",
      };
   }
};

const getExistingItemInCart = async (targetProductId: string) => {
   try {
      const { data } = await getCart();
      const currentItems = data?.items;

      if (!currentItems) return null;
      const existingItem = currentItems.find((item) => {
         const currentId = item.productId;
         return String(currentId) === String(targetProductId);
      });

      if (existingItem) return existingItem;

      return null;
   } catch (error) {
      console.log("Failed to validate Product in cart: ", error);
   }
};
