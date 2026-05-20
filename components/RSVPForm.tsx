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

  // Plus-one dinner choice
  const [plusOneDinnerChoice, setPlusOneDinnerChoice] = useState<DinnerChoiceTitle | ''>('')

  // Single transport checkbox
  const [needsTransport, setNeedsTransport] = useState(false)

  // Text fields
  const [notes, setNotes] = useState('')
  const [song, setSong] = useState('')

  // Optional email
  const [email, setEmail] = useState('')

  // Submitting state
  const [isSubmitting, setIsSubmitting] = useState(false)

  const DINNER_CHOICES = [
    { title: 'Braised Brisket of Beef', blurb: 'Moroccan lemon sauce.' },
    { title: 'Rosemary Chicken', blurb: 'Rosemary & sundried tomato cream sauce.' },
    { title: 'Hearts of Palm Cake', blurb: 'Curried lentils, tomato watercress salad, mustard vinaigrette. Vegan & gluten free.' },
  ] as const

  type DinnerChoiceTitle = (typeof DINNER_CHOICES)[number]['title']
  const [dinnerChoice, setDinnerChoice] = useState<DinnerChoiceTitle | ''>('')

  // When attending toggles: reset dependent fields
  useEffect(() => {
    if (attending === false) {
      setBringPlusOne(false)
      setPlusOneName('')
      setPlusOneDinnerChoice('')
      setNeedsTransport(false)
      setDinnerChoice('')
    }
  }, [attending])

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
      return plusOneName.trim().length > 0 && !!plusOneDinnerChoice
    }
    return true
  }, [attending, dinnerChoice, allowPlusOne, bringPlusOne, plusOneName, plusOneDinnerChoice, email])

  const getValidationMessage = () => {
    if (typeof attending === 'undefined') {
      return 'Please let us know if you will be attending.'
    }
    if (!isEmailValid(email)) {
      return 'Please enter a valid email address or leave it blank.'
    }
    if (attending === true && !dinnerChoice) {
      return 'Please select your dinner choice.'
    }
    if (attending && allowPlusOne && bringPlusOne) {
      if (!plusOneName.trim()) {
        return 'Please enter your plus-one\'s full name.'
      }
      if (!plusOneDinnerChoice) {
        return 'Please select a dinner choice for your plus-one.'
      }
    }
    return null
  }

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const validationMessage = getValidationMessage()
    if (validationMessage) {
      alert(validationMessage)
      return
    }

    setIsSubmitting(true)
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
          plus_one_dinner_choice: allowPlusOne && attending && bringPlusOne
            ? (plusOneDinnerChoice || null)
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
        setIsSubmitting(false)
      }
    } catch (err) {
      console.error(err)
      alert('Network error. Please try again.')
      setIsSubmitting(false)
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
              onChange={() => {
                setBringPlusOne((v) => {
                  const next = !v
                  if (!next) {
                    setPlusOneName('')
                    setPlusOneDinnerChoice('')
                  }
                  return next
                })
              }}
            />
            <label className="form-check-label" htmlFor="bringPlusOne">
              I’m bringing my plus one
            </label>
          </div>

          {bringPlusOne && (
            <>
              <div>
                <label className="form-label" htmlFor="plusOneName">Plus-one full name</label>
                <input
                  id="plusOneName"
                  className="form-control"
                  type="text"
                  placeholder="Full preferred name"
                  maxLength={80}
                  value={plusOneName}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPlusOneName(e.target.value)}
                />
                <div className="form-text">Required if you’re bringing your plus one.</div>
              </div>

              <div className="mt-3">
                <label className="form-label d-block">Plus-one dinner selection</label>

                <div className="d-grid gap-2">
                  {DINNER_CHOICES.map((opt) => {
                    const id = `plusone-dinner-${opt.title.replace(/\s+/g, '-').toLowerCase()}`
                    return (
                      <div className="form-check" key={opt.title}>
                        <input
                          className="form-check-input"
                          type="radio"
                          name="plusOneDinnerChoice"
                          id={id}
                          checked={plusOneDinnerChoice === opt.title}
                          onChange={() => setPlusOneDinnerChoice(opt.title)}
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

                <div className="form-text">Please select one option for your guest.</div>
              </div>
            </>
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

      {/* Dietary notes (only relevant if attending) */}
      {attending === true && (
        <div>
          <label className="form-label" htmlFor="notes">Dietary notes</label>
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
      )}

      {/* Favorite dance song (only relevant if attending) */}
      {attending === true && (
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
          />
          <div className="form-text">Optional — title & artist (up to 120 characters).</div>
        </div>
      )}

      {/* Optional email for updates (only relevant if attending) */}
      {attending === true && (
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
      )}

      <button className="btn btn-brand" type="submit" disabled={!canSubmit || isSubmitting}>
        {isSubmitting ? 'Submitting...' : 'Submit RSVP'}
      </button>
    </form>
  )
}
