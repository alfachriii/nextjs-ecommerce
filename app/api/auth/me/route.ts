"use server"
import { decrypt } from "@/lib/session";
import { cookies } from "next/headers"
import { NextResponse } from "next/server";

export const GET = async () => {
    const cookie = (await cookies()).get('session')?.value;
    const session = await decrypt(cookie);

    console.log(session);

    if (!cookie && !session) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    try {
        return NextResponse.json({
            email: session?.email,
            profileUrl: session?.profileUrl
        });
    } catch (error) {
        console.log("failed get user data", error);
        return NextResponse.json({ error: 'Invalid session' }, { status: 401 });
    }
}