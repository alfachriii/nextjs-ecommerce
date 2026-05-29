"use server";

import { MIDTRANS_API_URL, MIDTRANS_SERVER_KEY } from "@/lib/const";
import { secureClient } from "@/sanity/lib/client";
import { CartItem } from "@/store";
import { getProductsByIds } from "./cart";
import { AddressData, Order } from "@/sanity/types";
import {
   getUserDataFromSession,
   getUserIdFromSession,
   verifySession,
} from "@/lib/dal";
import { redirect } from "next/navigation";
import { ORDER_BY_ID, ORDERS_BY_USER_ID } from "@/sanity/queries/query";

type TransactionDetails = {
   order_id: string;
   gross_amount: number;
};
export type ItemDetails = {
   id: string;
   price: number;
   quantity: number;
   name: string;
   brand?: string;
   url: string;
   image_url: string;
};

type CustomerDetails = {
   name: string;
   email: string;
   shipping_address: {
      first_name: string;
      email: string;
      phone: string;
      address: string;
      city: string;
      postal_code: string;
   };
};

type TrxPayload = {
   transaction_details: TransactionDetails;
   item_details: ItemDetails[];
   customer_details: CustomerDetails;
};

type TrxSessionData = {
   token: string;
   redirect_url: string;
};

export const createNewOrder = async (
   trxPayload: TrxPayload,
   trxSessionData: TrxSessionData,
) => {
   const { userId } = await getUserDataFromSession();

   const items = trxPayload.item_details.map((item) => {
      return {
         _key: crypto.randomUUID(),
         ...item,
      };
   });

   const shippingAddress: AddressData = {
      addressee: trxPayload.customer_details.shipping_address.first_name,
      phone: trxPayload.customer_details.shipping_address.phone,
      address: trxPayload.customer_details.shipping_address.address,
      city: trxPayload.customer_details.shipping_address.city,
      postalCode: trxPayload.customer_details.shipping_address.postal_code,
   };

   const response = await secureClient.create({
      _type: "order",
      _id: trxPayload.transaction_details.order_id,
      orderId: trxPayload.transaction_details.order_id,
      userId: userId,
      customer: {
         name: trxPayload.customer_details.name,
         email: trxPayload.customer_details.email,
      },
      shippingAddress,
      items: items,
      status: "UNPAID",
      totalAmount: trxPayload.transaction_details.gross_amount,
      midtransToken: trxSessionData.token,
      midtransRedirectLink: trxSessionData.redirect_url,
   });

   if (!response) throw new Error("Failed create new order");
   return response;
};

export const getOrderById = async (orderId: string) => {
   const { userId } = await getUserDataFromSession();

   const response = await secureClient.fetch(ORDER_BY_ID, {
      id: orderId,
   });

   console.log("response: ", response);

   if (!response || !response._id) throw new Error("Failed Fetch Order data");

   return response as Order;
};

export const getOrders = async () => {
   const { userId } = await getUserDataFromSession();
   const response = await secureClient.fetch(ORDERS_BY_USER_ID, { userId });

   if (!response) throw new Error("Failed to fetch orders");

   return response as Order[];
};

export const createTransactionSession = async (payload: TrxPayload) => {
   const encodedKey = btoa(`${MIDTRANS_SERVER_KEY}:`);
   const response = await fetch(MIDTRANS_API_URL, {
      method: "POST",
      headers: {
         "Content-Type": "application/json",
         Accept: "application/json",
         Authorization: `Basic ${encodedKey}`,
      },
      body: JSON.stringify(payload),
   });

   console.log(response);

   const data = await response.json();
   console.log(data);
   if (response.status !== 201)
      throw new Error("Failed make transaction session");

   return data as TrxSessionData;
};

export const checkOut = async (
   totalPrice: number,
   items: CartItem[],
   addressData: AddressData,
) => {
   if (!(items.length > 0)) throw new Error("Cart cannot be empty");
   if (!addressData) throw new Error("Delivery address is required");
   //TODO: validate the price is valid
   const { email, userId } = await getUserDataFromSession();

   const productIds = items.map((item) => {
      return item.product?._id;
   }) as string[];

   const currentProducts = await getProductsByIds(productIds);

   console.log("currentProduct");

   const outOfStockProduct = currentProducts.data?.find((product) => {
      if (product?.stock === 0) return product;
   });

   if (outOfStockProduct) {
      throw new Error(`The product you want to buy is out of stock`);
   }

   const itemDetails: ItemDetails[] = items.map((item) => {
      if (
         !item.product ||
         !item.product.brand ||
         !item.product.images ||
         !item.product.slug
      )
         throw new Error("Cannot find item");

      return {
         id: item.product._id,
         name: item.product.name,
         price: item.product.price,
         quantity: item.quantity,
         url: `/product/${item.product.slug.current}`,
         image_url: item.product.images[0].url as string,
      };
   });

   const customerDetails: CustomerDetails = {
      name: addressData.addressee,
      email: email,
      shipping_address: {
         first_name: addressData.addressee,
         email: email,
         phone: addressData.phone,
         address: addressData.address,
         city: addressData.city,
         postal_code: addressData.postalCode,
      },
   };

   const orderId = crypto.randomUUID();

   const transactionDetails: TransactionDetails = {
      order_id: orderId,
      gross_amount: totalPrice, //TODO: calculate manually
   };

   const trxPayload: TrxPayload = {
      transaction_details: transactionDetails,
      item_details: itemDetails,
      customer_details: customerDetails,
   };

   const trxSessionData = await createTransactionSession(trxPayload);

   await createNewOrder(trxPayload, trxSessionData);

   return {
      orderId,
      trxSessionData,
   };
};
