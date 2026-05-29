import { assertValue } from "@/sanity/env";

export const MIDTRANS_API_URL = assertValue(
   process.env.MIDTRANS_API_URL,
   'Missing environment variable: MIDTRANS_API_URL'
)

export const MIDTRANS_SERVER_KEY = assertValue(
   process.env.MIDTRANS_SERVER_KEY,
   'Missing environment variable: MIDTRANS_SERVER_KEY'
)

export const MIDTRANS_CLIENT_KEY = assertValue(
   process.env.MIDTRANS_CLIENT_KEY,
   'Missing environment variable: MIDTRANS_CLIENT_KEY'
)