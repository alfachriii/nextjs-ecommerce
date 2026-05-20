import { NextResponse } from 'next/server';

export async function GET() {
  const clientId = process.env.AUTH_GITHUB_CLIENT_ID;

  // URL Otorisasi GitHub
  const url = `https://github.com/login/oauth/authorize?client_id=${clientId}&redirect_uri=http://localhost:3000/api/auth/callback/github&scope=user:email`;

  return NextResponse.redirect(url);
}