// app/login/page.tsx
// Simple password form that posts to /api/login and then navigates to home.
// The middleware will let the user through once the auth cookie is set.

'use client'

import { useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'

export default function LoginPage() {
  const router = useRouter()
  const sp = useSearchParams()
  const from = sp.get('from') || '/'  // we’ll send people back to where they came from
  const [pw, setPw] = useState('')
  const [err, setErr] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setErr(null)
    try {
      const res = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password: pw })
      })
      if (res.ok) {
        router.replace(from)
      } else {
        setErr(await res.text() || 'Incorrect password')
      }
    } catch (_err) {
      setErr('Network error')
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="container py-5" style={{ maxWidth: 480 }}>
      <h1 className="h4 mb-3">Enter Site Password</h1>
      <form className="d-grid gap-3" onSubmit={onSubmit}>
        <input
          className="form-control"
          type="password"
          placeholder="Password"
          value={pw}
          onChange={(e) => setPw(e.target.value)}
          autoFocus
        />
        {err && <div className="text-danger small">{err}</div>}
        <button className="btn btn-dark" disabled={loading} type="submit">
          {loading ? 'Checking…' : 'Continue'}
        </button>
      </form>
    </main>
  )
}