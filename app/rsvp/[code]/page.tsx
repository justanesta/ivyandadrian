// app/rsvp/[code]/page.tsx
// Server component: loads the guest by invite_code (case-insensitive)
// and renders a client RSVP form for THIS guest only.

import { sql } from '@/lib/db'
import RSVPForm from '@/components/RSVPForm.tsx' // (we'll create this next)

type Guest = {
  id: number
  full_name: string
  allow_plus_one: boolean
  plus_one_max: number
}

export default async function RSVPForCode({ params }: { params: { code: string } }) {
  const code = params.code.toLowerCase()

  // 🔎 Fetch the guest securely on the server (no client trust needed)
  const { rows } = await sql<Guest>`
    select id, full_name, allow_plus_one, plus_one_max
    from guests
    where lower(invite_code) = ${code}
    limit 1
  `
  const guest = rows[0]

  if (!guest) {
    // Gentle error state if someone mistypes a link
    return (
      <main className="container py-5" style={{ maxWidth: 720 }}>
        <h1 className="h4 mb-3">Invalid RSVP link</h1>
        <p>Please contact us if you need a new link.</p>
      </main>
    )
  }

  return (
    <main className="container py-5" style={{ maxWidth: 720 }}>
      <h1 className="h4 mb-4">RSVP — {guest.full_name}</h1>

      {/* Pass only the data this guest is allowed to edit */}
      <RSVPForm
        inviteCode={code}                              // authoritative identity
        allowPlusOne={guest.allow_plus_one}
        plusOneMax={guest.plus_one_max}
      />
    </main>
  )
}