// components/RSVPFind.tsx
// Type-ahead name search + required invite code.
// Tweaks:
//  - Association is NOT displayed in the dropdown.
//  - Clicking a suggestion populates the name field and closes the list.
//  - Keyboard: ArrowUp/ArrowDown to move, Enter to pick.
//  - After picking a name, focus moves to the invite code field.

'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import { useRouter } from 'next/navigation'

type GuestBrief = {
  id: number
  full_name: string
  association: string | null
  allow_plus_one: boolean
  plus_one_max: number
}

export default function RSVPFind() {
  const router = useRouter()

  // Name query + suggestions
  const [q, setQ] = useState('')
  const [results, setResults] = useState<GuestBrief[]>([])
  const [loading, setLoading] = useState(false)
  const [open, setOpen] = useState(false)

  // Keyboard selection index (-1 means none selected)
  const [activeIndex, setActiveIndex] = useState<number>(-1)

  // Invite code
  const [code, setCode] = useState('')
  const inviteRef = useRef<HTMLInputElement | null>(null)
  const nameRef = useRef<HTMLInputElement | null>(null)

  // Fetch suggestions as the user types (q >= 2), debounced slightly
  useEffect(() => {
    const term = q.trim()
    if (term.length < 2) {
      setResults([])
      setActiveIndex(-1)
      setOpen(false)
      return
    }
    const t = setTimeout(async () => {
      setLoading(true)
      try {
        const res = await fetch(`/api/guests/search?q=${encodeURIComponent(term)}`)
        if (!res.ok) throw new Error(`HTTP ${res.status}`)
        const data = await res.json()
        const arr = Array.isArray(data) ? (data as GuestBrief[]) : []
        setResults(arr)
        setActiveIndex(arr.length ? 0 : -1)
        setOpen(!!arr.length)
      } catch (err) {
        console.error('search error', err)
        setResults([])
        setActiveIndex(-1)
        setOpen(false)
      } finally {
        setLoading(false)
      }
    }, 200)
    return () => clearTimeout(t)
  }, [q])

  // Validate code length for button enablement
  const disabled = useMemo(() => {
    const c = code.trim()
    return c.length < 4 || c.length > 8
  }, [code])

  // When a suggestion is chosen: fill the name field and move focus to code
  const choose = (g: GuestBrief) => {
    setQ(g.full_name)
    setOpen(false)
    setResults([])
    setActiveIndex(-1)
    // focus invite code input for fast completion
    inviteRef.current?.focus()
  }

  // Keyboard navigation within the suggestion list
  const onNameKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!open || results.length === 0) return
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setActiveIndex((i) => (i + 1) % results.length)
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setActiveIndex((i) => (i - 1 + results.length) % results.length)
    } else if (e.key === 'Enter') {
      if (activeIndex >= 0 && activeIndex < results.length) {
        e.preventDefault()
        choose(results[activeIndex])
      }
    } else if (e.key === 'Escape') {
      setOpen(false)
    }
  }

  // Submit: require invite code; redirect to personalized link
  const submit = (e: React.FormEvent) => {
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
      {/* Name input with suggestions */}
      <div className="position-relative">
        <label className="form-label" htmlFor="guestName">Your name</label>
        <input
          id="guestName"
          ref={nameRef}
          className="form-control"
          type="text"
          placeholder="Start typing your name…"
          value={q}
          onChange={(e) => {
            setQ(e.target.value)
            setOpen(true) // reopen as you type
          }}
          onKeyDown={onNameKeyDown}
          aria-autocomplete="list"
          aria-controls="guest-suggestions"
          aria-expanded={open}
          aria-activedescendant={
            activeIndex >= 0 && open ? `suggestion-${results[activeIndex]?.id}` : undefined
          }
        />

        {open && results.length > 0 && (
          <div
            id="guest-suggestions"
            role="listbox"
            className="list-group mt-2"
            style={{ maxHeight: 260, overflowY: 'auto' }}
          >
            {results.map((g, idx) => (
              <button
                key={g.id}
                id={`suggestion-${g.id}`}
                type="button"
                role="option"
                aria-selected={idx === activeIndex}
                className={`list-group-item list-group-item-action${
                  idx === activeIndex ? ' active' : ''
                }`}
                onMouseDown={(e) => {
                  // onMouseDown prevents input blur before click
                  e.preventDefault()
                }}
                onClick={() => choose(g)}
              >
                {/* Only the full name — no association shown */}
                <div className="fw-semibold">{g.full_name}</div>
              </button>
            ))}
          </div>
        )}

        {loading && <div className="form-text">Searching…</div>}
      </div>

      {/* Invite code input (required) */}
      <div>
        <label className="form-label" htmlFor="inviteCode">Invite code</label>
        <input
          id="inviteCode"
          ref={inviteRef}
          className="form-control"
          type="text"
          inputMode="text"
          placeholder="4–8 letters"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          pattern="[a-zA-Z]{4,8}"
          title="Use 4–8 letters"
          autoComplete="off"
          autoCorrect="off"
          spellCheck={false}
        />
        <div className="form-text">Enter the short word printed on your invitation.</div>
      </div>

      <button className="btn btn-dark" type="submit" disabled={disabled}>
        Go to my RSVP
      </button>
    </form>
  )
}