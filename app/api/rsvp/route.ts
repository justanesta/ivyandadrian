// app/api/rsvp/route.ts
// Route Handler: receives POSTs and upserts one RSVP per guest.

import { NextResponse } from 'next/server'
import { sql } from '@/lib/db'

export async function POST(req: Request) {
  const body = await req.json()
  const code = String(body?.invite_code || '').toLowerCase().trim()

  // 1) Identify guest by code (server-side authority)
  const g = await sql<{ id:number; full_name:string; allow_plus_one:boolean; plus_one_max:number }>`
    select id, full_name, allow_plus_one, plus_one_max
    from guests
    where lower(invite_code) = ${code}
    limit 1
  `
  const guest = g.rows[0]
  if (!guest) return new NextResponse('Invalid invite code', { status: 400 })

  // 2) Validate attendance
  const attending =
    body?.attending === true || body?.attending === false ? body.attending : null
  if (attending === null) return new NextResponse('Missing attending field', { status: 400 })

  // 3) Clamp plus_one_count; zero if not attending
  const raw = Number(body?.plus_one_count)
  const maxAllowed = guest.allow_plus_one ? Math.max(0, guest.plus_one_max) : 0
  let plusOneCount = Number.isFinite(raw) ? Math.max(0, Math.min(maxAllowed, raw)) : 0
  if (!attending) plusOneCount = 0

  // 4) Transport: default TRUE unless explicitly false
  const needsTo = body?.needs_transport_to === false ? false : true
  const needsFrom = body?.needs_transport_from === false ? false : true

  // 5) Notes: trim & cap
  const notes =
    typeof body?.dietary_notes === 'string'
      ? body.dietary_notes.slice(0, 500).trim() || null
      : null

  // 6) Upsert
  await sql`
    insert into rsvps (
      guest_id, guest_full_name, attending, plus_one_count,
      needs_transport_to, needs_transport_from, dietary_notes
    )
    values (
      ${guest.id}, ${guest.full_name}, ${attending}, ${plusOneCount},
      ${needsTo}, ${needsFrom}, ${notes}
    )
    on conflict (guest_id) do update
      set attending = excluded.attending,
          plus_one_count = excluded.plus_one_count,
          needs_transport_to = excluded.needs_transport_to,
          needs_transport_from = excluded.needs_transport_from,
          dietary_notes = excluded.dietary_notes,
          submitted_at = now()
  `

  return NextResponse.json({ ok: true })
}
