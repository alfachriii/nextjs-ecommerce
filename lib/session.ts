"use server";

import { SignJWT, jwtVerify } from "jose";
import { SessionPayload } from "@/lib/definitions";
import { cookies } from "next/headers";
import bcrypt from "bcrypt";

const secretKey = process.env.SESSION_SECRET;
const encodedKey = new TextEncoder().encode(secretKey);

export const hashPassword = async (password: string) => {
   return await bcrypt.hash(password, 11);
};

export const comparePassword = async (
   password: string,
   hashedPassword: string,
) => {
   return await bcrypt.compare(password, hashedPassword);
};

export async function encrypt(payload: SessionPayload) {
   return new SignJWT(payload)
      .setProtectedHeader({ alg: "HS256" })
      .setIssuedAt()
      .setExpirationTime("7d")
      .sign(encodedKey);
}

export async function decrypt(session: string | undefined = "") {
   try {
      if (!session) return null;
      const { payload } = await jwtVerify(session, encodedKey, {
         algorithms: ["HS256"],
      });
      return payload as SessionPayload;
   } catch (error) {
      console.log("Failed to verify session");
   }
}

export async function createSession(
   userId: string,
   email: string,
   profileUrl: string,
) {
   const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
   const session = await encrypt({ userId, email, profileUrl, expiresAt });
   const cookieStore = await cookies();

   cookieStore.set("session", session, {
      httpOnly: true,
      secure: true,
      expires: expiresAt,
      sameSite: "lax",
      path: "/",
   });
}

export async function deleteSession() {
   const cookieStore = await cookies();
   cookieStore.delete("session");
}
