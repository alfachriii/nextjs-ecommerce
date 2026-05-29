"use server";

import { getUserIdFromSession } from "@/lib/dal";
import { secureClient } from "@/sanity/lib/client";
import { ADDRESSES_BY_USER_ID } from "@/sanity/queries/query";
import { AddressData } from "@/sanity/types";

export const addNewDeliveryAddress = async (addressData: AddressData) => {
   const userId = await getUserIdFromSession();
   const newAddress = await createNewDeliveryAddress(userId, addressData);

   return newAddress;
};

const createNewDeliveryAddress = async (
   userId: string,
   addressData: AddressData,
) => {
   const response = await secureClient.createIfNotExists({
      _type: "address",
      _id: crypto.randomUUID(),
      userId: userId,
      addressData,
   });

   if (!response._id) {
      throw new Error("Failed create new delivery address");
   }

   return response;
};

export const getDeliveryAddresses = async () => {
   const userId = await getUserIdFromSession();
   const response = await secureClient.fetch(ADDRESSES_BY_USER_ID, { userId });

   if (!response || !response[0]?.address) return null;

   return response;
};
