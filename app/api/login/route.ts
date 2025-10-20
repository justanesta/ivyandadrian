// app/api/login/route.ts
// Verifies the password and sets an HTTP-only cookie on success.

import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'

export async function POST(req: Request) {
  const { password } = await req.json()
  const ok = typeof password === 'string' && password === process.env.SITE_PASSWORD
  if (!ok) return new NextResponse('Invalid password', { status: 401 })

  const cookieStore = await cookies()
  // Name your cookie; HTTP-only so client JS can’t read it
  cookieStore.set('site_auth', 'yes', {
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    maxAge: 60 * 60 * 24 * 7, // 7 days
  })

  return NextResponse.json({ ok: true })
}