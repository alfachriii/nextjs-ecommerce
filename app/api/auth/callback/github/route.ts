import { NextRequest, NextResponse } from 'next/server';
import { createSession } from '@/lib/session';
import { createNewAccount, getAccount } from '@/app/actions/auth';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const code = searchParams.get('code');

  if (!code) {
    return NextResponse.json({ error: 'Authorization code tidak ditemukan' }, { status: 400 });
  }

  try {
    const tokenUrl = 'https://github.com/login/oauth/access_token';
    const tokenResponse = await fetch(tokenUrl, {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        client_id: process.env.AUTH_GITHUB_CLIENT_ID!,
        client_secret: process.env.AUTH_GITHUB_CLIENT_SECRET!,
        code,
        redirect_uri: `${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/callback/github`,
      }),
    });

    if (!tokenResponse.ok) {
      const errorText = await tokenResponse.text();
      console.error("GITHUB REJECTED TOKEN EXCHANGE:", errorText);
      return NextResponse.json({ error: 'GITHUB REJECTED TOKEN EXCHANGE', details: errorText }, { status: 400 });
    }

    const tokenData = await tokenResponse.json();

    if (tokenData.error) {
      throw new Error(tokenData.error_description || 'Fetch access token failed');
    }

    const { access_token } = tokenData;

    const userResponse = await fetch('https://api.github.com/user', {
      headers: { 
        Authorization: `Bearer ${access_token}`,
        'User-Agent': 'Nextjs-OAuth-App'
      },
    });
    const userData = await userResponse.json();

    let userEmail = userData.email;

    if (!userEmail) {
      const emailsResponse = await fetch('https://api.github.com/user/emails', {
        headers: { 
          Authorization: `Bearer ${access_token}`,
          'User-Agent': 'Nextjs-OAuth-App'
        },
      });
      
      if (emailsResponse.ok) {
        const emails = await emailsResponse.json();
        const primaryEmailObj = emails.find((e: any) => e.primary && e.verified) || emails[0];
        userEmail = primaryEmailObj?.email;
      }
    }

    if (!userEmail) {
      throw new Error("Failed to get email from this github account");
    }

    const existingUser = await getAccount(userEmail, userData.id);

    if (!existingUser?._id) {
        const newUser = await createNewAccount(userEmail, userData?.avatar_url, userData?.id);

        if (!newUser) {
            throw new Error("Error creating account");
        }

        await createSession(newUser._id, newUser.email, newUser.image ?? "");
        return NextResponse.redirect(new URL("/", request.url));
    } 

    await createSession(existingUser._id, existingUser.email, existingUser.image ?? "");
    return NextResponse.redirect(new URL("/", request.url));

  } catch (error: any) {
    console.error('GitHub OAuth Error:', error);
    return NextResponse.redirect(`${process.env.NEXT_PUBLIC_BASE_URL}/login?error=oauth_failed`);
  }
}