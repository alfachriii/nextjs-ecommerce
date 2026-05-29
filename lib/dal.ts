import "server-only";

import { cookies } from "next/headers";
import { decrypt } from "@/lib/session";
import { cache } from "react";

export const verifySession = cache(async () => {
   const cookie = (await cookies()).get("session")?.value;
   const session = await decrypt(cookie);

   if (!session?.userId) return null;

   return session;
});

export const getUserIdFromSession = async () => {
   const session = await verifySession();
   if (!session) {
      throw new Error("Do not have permission, please login!")
   };
   return session.userId;
};

export const getUserDataFromSession = async () => {
   const session = await verifySession();
   if (!session) throw new Error("Do not have permission, please login!")

   return {
      userId: session.userId,
      email: session.email,
      profileUrl: session.profileUrl
   }
}
