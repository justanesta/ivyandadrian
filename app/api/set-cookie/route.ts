// app/api/set-cookie/route.ts
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  const { pw } = await req.json()
  const ok = pw === process.env.SITE_PASSWORD

  if (!ok) return new NextResponse('Unauthorized', { status: 401 })
  const isProd = process.env.NODE_ENV === 'production'
  const res = new NextResponse('ok', { status: 200 })
  res.cookies.set('site_auth', pw, {
    httpOnly: true,
    sameSite: 'lax',
    secure: isProd,
    path: '/',
    maxAge: 60 * 60 * 24 * 30, // 30 days
  })

  return res
}
