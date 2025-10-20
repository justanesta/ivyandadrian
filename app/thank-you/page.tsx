// app/thank-you/page.tsx
// Thank-you page that adapts copy based on ?attending=yes|no
// and is forced dynamic so query params are always respected.

export const dynamic = 'force-dynamic' // ← ensure query string is read on each request
export const revalidate = 0            // ← no caching

type PageProps = {
  searchParams: Promise<{ attending?: string }>
}

export default async function ThankYouPage({ searchParams }: PageProps) {
  // Next 15: searchParams is a Promise
  const sp = await searchParams
  const attending = (sp.attending || '').toLowerCase()
  const isYes = attending === 'yes' || attending === 'true' || attending === '1'

  return (
    <main className="container py-5 text-center" style={{ maxWidth: 720 }}>
      <h1 className="display-6 mb-4">{isYes ? 'Thank you!' : 'Thanks for letting us know'}</h1>

      {isYes ? (
        <>
          <p className="lead mb-4">
            We’ve received your RSVP and can’t wait to celebrate with you!
          </p>
          <p>If needed, we’ll follow up with additional details as the day approaches.</p>
        </>
      ) : (
        <>
          <p className="lead mb-4">
            We’re sorry you can’t make it, but we appreciate the update.
          </p>
          <p>If your plans change, you can revisit your personalized link any time.</p>
        </>
      )}

      <hr className="my-4" />
      <p className="text-muted">With love, Ivy &amp; Adrian</p>
    </main>
  )
}
