// app/login/page.tsx
// Server component: no client hooks, no Suspense required.
// Displays password form that posts to /api/login (handled in app/api/login/route.ts)
type PageProps = {
  searchParams: Promise<{ from?: string; error?: string }>
}

export const dynamic = 'force-dynamic'
export const revalidate = 0

export default async function LoginPage({ searchParams }: PageProps) {
  const sp = await searchParams
  const from = sp.from ?? '/'
  const error = sp.error

  return (
    <main className="container py-5" style={{ maxWidth: 480 }}>
      <h1 className="h4 text-navy mb-3">Enter Site Password</h1>

      {error && (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      )}

      <form method="POST" action="/api/login" className="d-grid gap-3">
        <input type="hidden" name="from" value={from} />

        <input
          className="form-control"
          type="password"
          name="password"
          placeholder="Password"
          autoFocus
          required
        />

        <button className="btn btn-brand" type="submit">
          Continue
        </button>

        <p className="form-text mt-2">
          Password is on the save the date!
        </p>
      </form>
    </main>
  )
}
