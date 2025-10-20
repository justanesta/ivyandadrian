// app/api/rsvp/route.ts
// Route Handler for saving RSVPs (Next.js App Router).
//
// What this does:
// - Resolves the guest *server-side* by invite_code (case-insensitive).
// - Validates required fields (attending) and clamps plus_one_count.
// - Defaults transport flags to TRUE unless explicitly false.
// - Safely trims & limits free-text inputs (dietary_notes, song_request).
// - Upserts exactly ONE row per guest (on conflict guest_id → update).
// - Denormalizes invite_code into rsvps.invite_code for simple exports.
//
// Prereqs in DB (you already added these):
//   alter table rsvps add column if not exists song_request text;
//   alter table rsvps add column if not exists invite_code text;
//   create unique index if not exists uniq_rsvps_guest_id on rsvps (guest_id);

// Now supports only 0 or 1 plus-ones (and stores one full name).
// Uses a single `plus_one_name` text column (0 or 1 plus-one total).
// - Single transport checkbox: `needs_transport`
// - Optional contact `email`
// - Single optional plus-one name

import { NextResponse } from 'next/server'
import { sql } from '@/lib/db'

// Clean text utility (normalize, strip control chars, trim, cap).
function cleanText(input: unknown, max: number) {
  if (typeof input !== 'string') return null
  return (
    input
      .normalize('NFKC')
      .replace(/[\u0000-\u001F\u007F]/g, '')
      .slice(0, max)
      .trim() || null
  )
}

// Basic email sanitizer/validator (server-side)
function cleanEmail(input: unknown) {
  if (typeof input !== 'string') return null
  const s = input.normalize('NFKC').trim().toLowerCase()
  if (!s) return null
  // Modest regex: good enough for UI signups; avoids over-rejecting real addresses.
  const ok = /^[a-z0-9._%+\-]+@[a-z0-9.\-]+\.[a-z]{2,}$/i.test(s) && s.length <= 254
  return ok ? s : null
}

export async function POST(req: Request) {
  const body = await req.json()

  // 1) Resolve guest (authoritative identity)
  const code = String(body?.invite_code || '').toLowerCase().trim()
  const g = await sql<{ id: number; full_name: string; allow_plus_one: boolean }>`
    select id, full_name, allow_plus_one
    from guests
    where lower(invite_code) = ${code}
    limit 1
  `
  const guest = g.rows[0]
  if (!guest) return new NextResponse('Invalid invite code', { status: 400 })

  // 2) Required boolean
  const attending =
    body?.attending === true || body?.attending === false ? body.attending : null
  if (attending === null) return new NextResponse('Missing attending field', { status: 400 })

  // 3) Single plus-one
  const rawPlusOneName = cleanText(body?.plus_one_name, 80)
  const bringPlusOne = !!(attending && guest.allow_plus_one && rawPlusOneName)
  const plusOneCount = bringPlusOne ? 1 : 0
  const plusOneName  = bringPlusOne ? rawPlusOneName : null

  // 4) Transport: single checkbox; if not attending, force false
  const needsTransport =
    attending ? (body?.needs_transport === true ? true : false) : false

  // 5) Free text + email
  const dietaryNotes = cleanText(body?.dietary_notes, 500)
  const songRequest  = cleanText(body?.song_request, 120)
  const email        = cleanEmail(body?.email) // optional

  // 6) Upsert (guest_id unique)
  await sql`
    insert into rsvps (
      guest_id,
      guest_full_name,
      attending,
      plus_one_count,
      plus_one_name,
      needs_transport,
      dietary_notes,
      song_request,
      invite_code,
      email
    )
    values (
      ${guest.id},
      ${guest.full_name},
      ${attending},
      ${plusOneCount},
      ${plusOneName},
      ${needsTransport},
      ${dietaryNotes},
      ${songRequest},
      ${code},
      ${email}
    )
    on conflict (guest_id) do update
      set attending       = excluded.attending,
          plus_one_count  = excluded.plus_one_count,
          plus_one_name   = excluded.plus_one_name,
          needs_transport = excluded.needs_transport,
          dietary_notes   = excluded.dietary_notes,
          song_request    = excluded.song_request,
          invite_code     = excluded.invite_code,
          email           = excluded.email,
          submitted_at    = now()
  `

  return NextResponse.json({ ok: true })
}