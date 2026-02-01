// components/RSVPForm.tsx
// Client component: interactive RSVP form for personalized links.
// - Redirects to /thank-you?attending=yes|no on success
// - When "No" is selected: unchecks + disables transport; disables notes & song; forces plusOnes=0
// - When "Yes" is selected: re-enables fields (transport defaults to checked)

// Personalized RSVP form supporting a single optional plus-one.
// - Shows a checkbox "I'm bringing my plus one" if allowed & attending.
// - When checked, shows one text input for the plus-one full name.
// - Sends `plus_one_name` (string) to the API; server stores count=0/1 and name.
// - Single optional plus-one (checkbox + one name input)
// - Single transport checkbox
// - Optional email for updates


'use client'

import { useEffect, useMemo, useState } from 'react'
import { useRouter } from 'next/navigation'

type Props = {
  inviteCode: string
  allowPlusOne: boolean
}

export default function RSVPForm({ inviteCode, allowPlusOne }: Props) {
  const router = useRouter()

  // Attending radios
  const [attending, setAttending] = useState<boolean | undefined>(undefined)

  // Single plus-one
  const [bringPlusOne, setBringPlusOne] = useState(false)
  const [plusOneName, setPlusOneName] = useState('')

  // Single transport checkbox
  const [needsTransport, setNeedsTransport] = useState(false)

  // Text fields
  const [notes, setNotes] = useState('')
  const [song, setSong] = useState('')

  // Optional email
  const [email, setEmail] = useState('')

  const DINNER_CHOICES = [
    { title: 'Flat Iron Steak', blurb: 'Red wine glaze sauce' },
    { title: 'Australian Sea Bass', blurb: 'Sunflower romesco sauce' },
    { title: 'Hearts of Palm Cake', blurb: 'Curried lentils, tomato watercress salad, mustard vinaigrette. Vegan & gluten free.' },
  ] as const

  type DinnerChoiceTitle = (typeof DINNER_CHOICES)[number]['title']
  const [dinnerChoice, setDinnerChoice] = useState<DinnerChoiceTitle | ''>('')

  // When attending toggles: reset dependent fields
  useEffect(() => {
    if (attending === false) {
      setBringPlusOne(false)
      setPlusOneName('')
      setNeedsTransport(false)
      setDinnerChoice('')
    }
  }, [attending])

  const disabledIfNo = attending === false

  // Simple email validator (client-side)
  function isEmailValid(s: string) {
    if (!s) return true // optional
    if (s.length > 254) return false
    return /^[a-z0-9._%+\-]+@[a-z0-9.\-]+\.[a-z]{2,}$/i.test(s.trim())
  }

  const canSubmit = useMemo(() => {
    if (typeof attending === 'undefined') return false
    if (!isEmailValid(email)) return false
    if (attending === true && !dinnerChoice) return false
    if (attending && allowPlusOne && bringPlusOne) {
      return plusOneName.trim().length > 0
    }
    return true
  }, [attending, dinnerChoice, allowPlusOne, bringPlusOne, plusOneName, email])

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!canSubmit) {
      alert('Please complete the required fields before submitting.')
      return
    }

    try {
      const res = await fetch('/api/rsvp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          invite_code: inviteCode,
          attending,
          plus_one_name: allowPlusOne && attending && bringPlusOne
            ? plusOneName.slice(0, 80).trim()
            : null,
          needs_transport: attending ? needsTransport : false,
          dinner_choice: attending ? dinnerChoice : null,
          dietary_notes: notes.slice(0, 500).trim(),
          song_request: song.slice(0, 120).trim(),
          email: email.trim() || null
        })
      })

      if (res.ok) {
        router.push(`/thank-you?attending=${attending ? 'yes' : 'no'}`)
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
      {/* Attending */}
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
          <label className="form-check-label" htmlFor="attendYes">Yes</label>
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
          <label className="form-check-label" htmlFor="attendNo">No</label>
        </div>
      </div>

      {/* Single plus-one (only if attending & allowed) */}
      {allowPlusOne && attending === true && (
        <div className="d-grid gap-2">
          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              id="bringPlusOne"
              checked={bringPlusOne}
              onChange={() => setBringPlusOne((v) => !v)}
            />
            <label className="form-check-label" htmlFor="bringPlusOne">
              I’m bringing my plus one
            </label>
          </div>

          {bringPlusOne && (
            <div>
              <label className="form-label" htmlFor="plusOneName">Plus-one full name</label>
              <input
                id="plusOneName"
                className="form-control"
                type="text"
                placeholder="Full legal/preferred name"
                maxLength={80}
                value={plusOneName}
                onChange={(e) => setPlusOneName(e.target.value)}
              />
              <div className="form-text">Required if you’re bringing your plus one.</div>
            </div>
          )}
        </div>
      )}

      {/* Single transport checkbox (only relevant if attending) */}
      {attending === true && (
        <div>
          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              id="needsTransport"
              checked={needsTransport}
              onChange={() => setNeedsTransport(v => !v)}
            />
            <label className="form-check-label" htmlFor="needsTransport">
              Will you use transportation to/from the hotels in <strong>West Chester, PA</strong> and the venue in <strong>Media, PA</strong>?
            </label>
          </div>
          <div className="form-text">
            Check this if you’ll ride the provided shuttles.
          </div>
        </div>
      )}

      {/* Dinner choice (only relevant if attending) */}
      {attending === true && (
        <div>
          <label className="form-label d-block">Dinner selection</label>

          <div className="d-grid gap-2">
            {DINNER_CHOICES.map((opt) => {
              const id = `dinner-${opt.title.replace(/\s+/g, '-').toLowerCase()}`
              return (
                <div className="form-check" key={opt.title}>
                  <input
                    className="form-check-input"
                    type="radio"
                    name="dinnerChoice"
                    id={id}
                    checked={dinnerChoice === opt.title}
                    onChange={() => setDinnerChoice(opt.title)}
                  />
                  <label className="form-check-label" htmlFor={id}>
                    <strong>{opt.title}</strong>
                    <div className="text-muted" style={{ fontSize: '.95rem' }}>
                      {opt.blurb}
                    </div>
                  </label>
                </div>
              )
            })}
          </div>

          <div className="form-text">Please select one option.</div>
        </div>
      )}

      {/* Dietary notes */}
      <div>
        <label className="form-label" htmlFor="notes">Dietary notes</label>
        <textarea
          id="notes"
          className="form-control"
          placeholder="Allergies or dietary restrictions (optional)"
          maxLength={500}
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          disabled={disabledIfNo}
        />
        <div className="form-text">Up to 500 characters.</div>
      </div>

      {/* Favorite dance song */}
      <div>
        <label className="form-label" htmlFor="song">What song makes you hit the dance floor?</label>
        <input
          id="song"
          className="form-control"
          type="text"
          placeholder="e.g., 'Orinoco Flow by Enya'"
          maxLength={120}
          value={song}
          onChange={(e) => setSong(e.target.value)}
          disabled={disabledIfNo}
        />
        <div className="form-text">Optional — title & artist (up to 120 characters).</div>
      </div>

      {/* Optional email for updates */}
      <div>
        <label className="form-label" htmlFor="email">Email for event updates (optional)</label>
        <input
          id="email"
          className="form-control"
          type="email"
          inputMode="email"
          placeholder="you@example.com"
          maxLength={254}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        {!isEmailValid(email) && (
          <div className="text-danger small mt-1">Please enter a valid email address or leave blank.</div>
        )}
      </div>

      <button className="btn btn-dark" type="submit" disabled={!canSubmit}>
        Submit RSVP
      </button>
    </form>
  )
}
