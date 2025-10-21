// app/api/login/route.ts
// Verifies the password and sets an HTTP-only cookie on success.

import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'

export async function POST(req: Request) {
  // Parse HTML form submission
  const form = await req.formData()
  const password = String(form.get('password') ?? '')
  let from = String(form.get('from') ?? '/')

  // Safety: never allow external redirects
  if (!from.startsWith('/')) from = '/'

  const SITE_PASSWORD = process.env.SITE_PASSWORD ?? ''

  // Validate
  if (password !== SITE_PASSWORD) {
    // Redirect back to login with error + preserve "from"
    const url = new URL('/login', req.url)
    url.searchParams.set('error', 'Incorrect password')
    url.searchParams.set('from', from)
    return NextResponse.redirect(url, { status: 303 }) // POST -> GET
  }

  // Success: set cookie and redirect to the original page (or /)
  const res = NextResponse.redirect(new URL(from, req.url), { status: 303 })
  const cookieStore = await cookies()
  // Name your cookie; HTTP-only so client JS can’t read it
  cookieStore.set('site_auth', 'yes', {
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    maxAge: 60 * 60 * 24 * 7, // 7 days
  })

  return res
}