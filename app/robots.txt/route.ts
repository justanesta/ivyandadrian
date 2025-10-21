// app/robots.txt/route.ts
// Generates a robots.txt that blocks all crawlers from indexing any page.
// Ideal for private / password-protected wedding sites.

import { NextResponse } from 'next/server'

export function GET() {
  const body = `
User-agent: *
Disallow: /
`.trim()

  return new NextResponse(body, {
    status: 200,
    headers: {
      'Content-Type': 'text/plain',
      'Cache-Control': 'public, max-age=3600',
    },
  })
}
