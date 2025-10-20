// components/RSVPCodeForm.tsx
// Client component: single text box to enter the 4–8 letter invite code,
// validate it, and navigate to /rsvp/<code>. There is NO name lookup here.
//
// Why this keeps the guest name in the system:
// - The personalized page /rsvp/[code] looks up the guest by invite_code on the server
//   and renders their full_name in the heading.
// - The API (/app/api/rsvp/route.ts) upserts RSVP rows and always stores guest_full_name
//   along with the RSVP. So the name remains in both the page and the rsvps table.

'use client'

import { useMemo, useState } from 'react'
import { useRouter } from 'next/navigation'

export default function RSVPCodeForm() {
  const router = useRouter()
  const [code, setCode] = useState('')

  // Browser-friendly constraint: 4–8 letters only
  const isValid = useMemo(() => /^[a-zA-Z]{4,8}$/.test(code.trim()), [code])

  function submit(e: React.FormEvent) {
    e.preventDefault()
    const c = code.trim().toLowerCase()
    if (!/^[a-z]{4,8}$/.test(c)) {
      alert('Please enter your 4–8 letter invite code.')
      return
    }
    router.push(`/rsvp/${c}`)
  }

  return (
    <form className="d-grid gap-3" onSubmit={submit} autoComplete="off">
      <div>
        <label className="form-label" htmlFor="inviteCode">Invite code</label>
        <input
          id="inviteCode"
          className="form-control"
          type="text"
          inputMode="text"
          placeholder="Enter your 4–8 letter code"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          pattern="[a-zA-Z]{4,8}"
          title="Use 4–8 letters"
          maxLength={8}
          autoCorrect="off"
          spellCheck={false}
        />
        <div className="form-text">
          This code is printed on your invitation. Letters only.
        </div>
      </div>

      <button className="btn btn-dark" type="submit" disabled={!isValid}>
        Continue
      </button>
    </form>
  )
}