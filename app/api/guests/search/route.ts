import { NextResponse } from 'next/server'
import { sql } from '@/lib/db'

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const q = (searchParams.get('q') || '').trim()
  if (q.length < 2) return NextResponse.json([])

  const like = `%${q.replaceAll('%', '')}%`
  const { rows } = await sql<{
    id: number
    full_name: string
    association: string | null
    allow_plus_one: boolean
    plus_one_max: number
  }>`
    select id, full_name, association, allow_plus_one
    from guests
    where lower(full_name) like lower(${like})
    order by full_name asc
    limit 8
  `
  return NextResponse.json(rows)
}
