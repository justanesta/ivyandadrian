// app/page.tsx
// Home (landing) page with a big hero image, event details, and a second large image.
// Uses Bootstrap utility classes for spacing and responsive images.

import Link from 'next/link'

export default function HomePage() {
  return (
    <main>
      {/* ===== Hero ===== */}
      <section className="bg-light">
        <div className="container py-5">
          {/* Hero image */}
          <figure className="mb-4">
            {/* Replace the src below with your real hero asset in /public/images */}
            <img
              src="/images/hero-ivy-adrian.jpg"
              alt="Ivy & Adrian — engagement photo"
              className="img-fluid rounded-3 w-100"
              style={{ objectFit: 'cover', maxHeight: 520 }}
            />
          </figure>

          {/* Short event info */}
          <div className="text-center" style={{ maxWidth: 780, margin: '0 auto' }}>
            <h1 className="display-6 fw-semibold mb-2">Ivy &amp; Adrian are getting married</h1>
            <p className="lead mb-1">May 23rd, 2026</p>
            <p className="lead text-muted">Tyler Arboretum — Media, PA</p>

            {/* Quick actions (optional) */}
            <div className="d-flex gap-3 justify-content-center mt-3">
              <Link href="/rsvp" className="btn btn-dark">RSVP</Link>
              <Link href="/logistics" className="btn btn-outline-dark">Logistics</Link>
            </div>
          </div>
        </div>
      </section>

      {/* ===== Second big image ===== */}
      <section>
        <div className="container py-5">
          <figure className="mb-0">
            {/* Replace with a venue or favorites photo */}
            <img
              src="/images/tyler-arboretum.jpg"
              alt="Tyler Arboretum in Media, Pennsylvania"
              className="img-fluid rounded-3 w-100"
              style={{ objectFit: 'cover', maxHeight: 520 }}
            />
            {/* Optional caption */}
            <figcaption className="form-text mt-2 text-center">
              Tyler Arboretum — where we’ll celebrate together
            </figcaption>
          </figure>
        </div>
      </section>
    </main>
  )
}
