// middleware.ts
// Purpose: Gate all pages behind a password, while EXCLUDING API routes,
// Next.js internals, favicon, and the /login page itself.

import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// ✅ Use a single negative-lookahead to exclude paths you DON'T want to match.
//    - api               → don't run middleware for route handlers
//    - _next/static      → static assets
//    - _next/image       → image optimizer
//    - favicon.ico       → favicon
//    - login             → allow access to the login screen
export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon\\.ico|login).*)'],
  // ^ Every matcher string must start with '/', and you can use regex groups.
  //   This pattern runs middleware for everything EXCEPT the items listed above.
}

export function middleware(req: NextRequest) {
  const cookie = req.cookies.get('site_auth')?.value
  const password = process.env.SITE_PASSWORD
  const isAuthed = cookie === password

  // If already authenticated, continue
  if (isAuthed) return NextResponse.next()

  // Otherwise, redirect to /login
  const url = req.nextUrl.clone()
  url.pathname = '/login'
  return NextResponse.redirect(url)
}
