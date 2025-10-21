// app/thank-you/page.tsx
// Server component version (no client hooks) that adapts copy + colors based on ?attending=
// Uses dynamic rendering so query params are honored on each request.

import Link from 'next/link'

export const dynamic = 'force-dynamic' // ensure query string is always read
export const revalidate = 0

type PageProps = {
  searchParams: Promise<{ attending?: string }>
}

export default async function ThankYouPage({ searchParams }: PageProps) {
  // In App Router, searchParams is a Promise in server components
  const sp = await searchParams
  const attending = (sp.attending || '').toLowerCase() === 'yes'

  const bgClass = attending ? 'bg-rose' : 'bg-sky' // rose for yes, sky for no
  const textColor = 'text-navy'

  return (
    <main className={`${bgClass} min-vh-100 d-flex align-items-center`}>
      <div className="container py-5 text-center">
        {attending ? (
          <>
            <h1 className={`display-6 fw-semibold ${textColor} mb-3`}>
              We’ve received your RSVP and can’t wait to celebrate with you!
            </h1>
            <p className="lead mb-4">
              If needed, we’ll follow up with additional details as the day approaches.
            </p>
            <Link href="/" className="btn btn-coral">Back to Home</Link>
          </>
        ) : (
          <>
            <h1 className={`display-6 fw-semibold ${textColor} mb-3`}>
              We’re sorry you can’t make it, but we appreciate the update.
            </h1>
            <p className="lead mb-4">
              If your plans change, you can revisit your personalized link any time.
            </p>
            <Link href="/" className="btn btn-navy-outline">Return Home</Link>
          </>
        )}
      </div>
    </main>
  )
}