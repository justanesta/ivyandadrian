// middleware.ts
// Password-gates the entire site except a few public paths.
// If the auth cookie is missing, redirect to /login?from=<original path>.

import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(req: NextRequest) {
  const { pathname, search } = req.nextUrl

  // Allow the login page and the login API itself
  if (pathname === '/login' || pathname.startsWith('/api/login')) {
    return NextResponse.next()
  }

  // Allow Next internals & static assets to bypass middleware
  // (prevents infinite loops and speeds up asset delivery)
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/favicon') ||
    pathname.startsWith('/robots.txt') ||
    pathname.startsWith('/sitemap') ||
    pathname.startsWith('/images') // your /public/images
  ) {
    return NextResponse.next()
  }

  // Check cookie
  const hasAuth = req.cookies.get('site_auth')?.value === 'yes'
  if (!hasAuth) {
    const url = req.nextUrl.clone()
    url.pathname = '/login'
    // remember where the visitor was trying to go
    url.search = `?from=${encodeURIComponent(pathname + (search || ''))}`
    return NextResponse.redirect(url)
  }

  // Allowed through
  return NextResponse.next()
}

// Match ALL routes except the known excluded prefixes.
// This pattern comes from the Next team’s guidance.  :contentReference[oaicite:2]{index=2}
export const config = {
  matcher: [
    '/((?!api/login|_next/static|_next/image|favicon.ico|robots.txt|images).*)',
  ],
}