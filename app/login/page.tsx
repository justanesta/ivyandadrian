'use client'

import { useState } from 'react'

export default function LoginPage() {
  const [pw, setPw] = useState('')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()

    const res = await fetch('/api/set-cookie', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ pw }),
    })

    if (res.ok) {
      window.location.href = '/'
    } else {
      alert('Incorrect password')
    }
  }

  return (
    <div className="container py-5" style={{ maxWidth: 420 }}>
      <h1 className="mb-4 text-center">Enter Password</h1>
      <form onSubmit={handleSubmit} className="d-grid gap-3">
        <input
          type="password"
          className="form-control"
          placeholder="Password"
          value={pw}
          onChange={(e) => setPw(e.target.value)}
          required
        />
        <button className="btn btn-dark" type="submit">
          Continue
        </button>
      </form>
    </div>
  )
}
