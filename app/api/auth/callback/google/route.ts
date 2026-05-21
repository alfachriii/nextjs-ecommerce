import { NextRequest, NextResponse } from "next/server";
import { createSession } from "@/lib/session";
import { createNewAccount, getAccount } from "@/app/actions/auth";
import { createNewCart } from "@/app/actions/cart";

export async function GET(request: NextRequest) {
   const searchParams = request.nextUrl.searchParams;
   const code = searchParams.get("code");

   if (!code) {
      return NextResponse.json(
         { error: "Authorization code not defined" },
         { status: 400 },
      );
   }

   try {
      const tokenUrl = "https://oauth2.googleapis.com/token";
      const tokenResponse = await fetch(tokenUrl, {
         method: "POST",
         headers: { "Content-Type": "application/x-www-form-urlencoded" },
         body: new URLSearchParams({
            code,
            client_id: process.env.AUTH_GOOGLE_CLIENT_ID!,
            client_secret: process.env.AUTH_GOOGLE_CLIENT_SECRET!,
            redirect_uri: `${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/callback/google`,
            grant_type: "authorization_code",
         }).toString(),
      });

      if (!tokenResponse.ok) {
         const errorText = await tokenResponse.text();
         console.error("GOOGLE REJECTED TOKEN EXCHANGE:", errorText);
         return NextResponse.json(
            { error: "GOOGLE REJECTED TOKEN EXCHANGE", details: errorText },
            { status: 400 },
         );
      }

      const tokenData = await tokenResponse.json();

      if (!tokenResponse.ok) {
         throw new Error(
            tokenData.error_description || "fetch access token failed",
         );
      }

      const { access_token } = tokenData;

      const userResponse = await fetch(
         "https://www.googleapis.com/oauth2/v2/userinfo",
         {
            headers: { Authorization: `Bearer ${access_token}` },
         },
      );

      const userData = await userResponse.json();
      const existingUser = await getAccount(userData.email, userData.id);

      if (!existingUser?._id) {
         const newUser = await createNewAccount(
            userData?.email,
            userData?.picture,
            userData?.id,
         );
         if (!newUser) {
            throw new Error("Error creating account");
         }

         const newCart = await createNewCart(newUser._id);
         if (!newCart) {
            throw new Error("Error creating account");
         }

         await createSession(newUser._id, newUser.email, newUser.image ?? "");

         return NextResponse.redirect(new URL("/", request.url));
      }

      await createSession(
         existingUser._id,
         existingUser.email,
         existingUser.image ?? "",
      );

      return NextResponse.redirect(new URL("/", request.url));
   } catch (error: any) {
      console.error("OAuth Error:", error);
      return NextResponse.redirect(
         `${process.env.NEXT_PUBLIC_BASE_URL}/login?error=oauth_failed`,
      );
   }
}
