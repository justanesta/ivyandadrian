// app/rsvp/[code]/page.tsx
// Personalized RSVP page rendered at /rsvp/<invite_code>.
//
// Key points:
// - This is a Server Component (no 'use client'), ideal for DB fetching.
// - In Next.js 15+, `params` is a Promise and must be **awaited**.
// - We resolve the guest **server-side** by `invite_code` (case-insensitive).
// - If the code is invalid, we render a gentle error message.
// - On success, we render the client RSVP form scoped to THIS guest only.
// - No longer uses plus_one_max; allowPlusOne boolean only.

import { sql } from '@/lib/db'
import RSVPForm from '@/components/RSVPForm'

type Guest = {
  id: number
  full_name: string
  allow_plus_one: boolean
}

type PageProps = { params: Promise<{ code: string }> }

export default async function RSVPForCode({ params }: PageProps) {
  const { code } = await params
  const normalizedCode = code.toLowerCase()

  const { rows } = await sql<Guest>`
    select id, full_name, allow_plus_one
    from guests
    where lower(invite_code) = ${normalizedCode}
    limit 1
  `
  const guest = rows[0]

  if (!guest) {
    return (
      <main className="container py-5" style={{ maxWidth: 720 }}>
        <h1 className="h4 mb-3">Invalid RSVP link</h1>
        <p>Please check your link or contact us for a new one.</p>
      </main>
    )
  }

  return (
    <main className="container py-5" style={{ maxWidth: 720 }}>
      <h1 className="h4 mb-4">RSVP — {guest.full_name}</h1>

      <RSVPForm
        inviteCode={normalizedCode}
        allowPlusOne={guest.allow_plus_one}  // ✅ boolean only
      />
    </main>
  )
}

