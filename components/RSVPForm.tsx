// components/RSVPForm.tsx
// Client component: interactive RSVP form for personalized links.
// Submits to /api/rsvp and redirects to /thank-you on success.

'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

type Props = {
  inviteCode: string
  allowPlusOne: boolean
  plusOneMax: number
}

export default function RSVPForm({ inviteCode, allowPlusOne, plusOneMax }: Props) {
  const router = useRouter()

  // Attending radios
  const [attending, setAttending] = useState<boolean | undefined>(undefined)
  // Transport checkboxes (default true)
  const [needsTo, setNeedsTo] = useState(true)
  const [needsFrom, setNeedsFrom] = useState(true)
  // Plus-one count
  const [plusOnes, setPlusOnes] = useState(0)
  // Dietary notes
  const [notes, setNotes] = useState('')

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (typeof attending === 'undefined') {
      alert('Please select whether you are attending.')
      return
    }

    const safePlusOnes = attending ? plusOnes : 0

    try {
      const res = await fetch('/api/rsvp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          invite_code: inviteCode,
          attending,
          plus_one_count: safePlusOnes,
          needs_transport_to: needsTo,
          needs_transport_from: needsFrom,
          dietary_notes: notes.slice(0, 500).trim()
        })
      })

      if (res.ok) {
        // Redirect to thank-you page on success
        router.push('/thank-you')
      } else {
        const msg = await res.text()
        alert(`There was a problem: ${msg || 'Please try again.'}`)
      }
    } catch (err) {
      console.error(err)
      alert('Network error. Please try again.')
    }
  }

  return (
    <form className="d-grid gap-4" onSubmit={onSubmit}>
      {/* Attending (radio) */}
      <div>
        <label className="form-label d-block">Will you be attending?</label>
        <div className="form-check form-check-inline">
          <input
            className="form-check-input"
            type="radio"
            name="attending"
            id="attendYes"
            checked={attending === true}
            onChange={() => setAttending(true)}
          />
          <label className="form-check-label" htmlFor="attendYes">
            Yes
          </label>
        </div>
        <div className="form-check form-check-inline">
          <input
            className="form-check-input"
            type="radio"
            name="attending"
            id="attendNo"
            checked={attending === false}
            onChange={() => setAttending(false)}
          />
          <label className="form-check-label" htmlFor="attendNo">
            No
          </label>
        </div>
      </div>

      {/* Plus-one numeric input (only if allowed & attending) */}
      {allowPlusOne && attending === true && (
        <div>
          <label className="form-label" htmlFor="plusOnes">
            Number of plus-ones (max {plusOneMax})
          </label>
          <input
            id="plusOnes"
            className="form-control"
            type="number"
            inputMode="numeric"
            min={0}
            max={plusOneMax}
            step={1}
            value={plusOnes}
            onChange={(e) => {
              const v = Number(e.target.value)
              if (Number.isNaN(v)) return
              const clamped = Math.max(0, Math.min(plusOneMax, v))
              setPlusOnes(clamped)
            }}
          />
          <div className="form-text">Enter a number between 0 and {plusOneMax}.</div>
        </div>
      )}

      {/* Transport checkboxes (default checked = true) */}
      <div>
        <label className="form-label d-block">Do you need transportation?</label>
        <div className="form-check">
          <input
            className="form-check-input"
            type="checkbox"
            id="needsTo"
            checked={needsTo}
            onChange={() => setNeedsTo((v) => !v)}
          />
          <label className="form-check-label" htmlFor="needsTo">
            To the venue
          </label>
        </div>
        <div className="form-check">
          <input
            className="form-check-input"
            type="checkbox"
            id="needsFrom"
            checked={needsFrom}
            onChange={() => setNeedsFrom((v) => !v)}
          />
          <label className="form-check-label" htmlFor="needsFrom">
            From the venue
          </label>
        </div>
      </div>

      {/* Dietary notes */}
      <div>
        <label className="form-label" htmlFor="notes">
          Dietary notes
        </label>
        <textarea
          id="notes"
          className="form-control"
          placeholder="Allergies or dietary restrictions (optional)"
          maxLength={500}
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
        />
        <div className="form-text">Up to 500 characters.</div>
      </div>

      <button className="btn btn-dark" type="submit">
        Submit RSVP
      </button>
    </form>
  )
}
