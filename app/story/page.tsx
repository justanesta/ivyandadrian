// app/story/page.tsx
// Server component: boilerplate “Our Story” page.
// Inherits the shared navbar from app/layout.tsx.

export default function OurStoryPage() {
  return (
    <main className="container py-5" style={{ maxWidth: 900 }}>
      <header className="mb-4">
        <h1 className="h3">Our Story</h1>
        <p className="text-muted mb-0">How we met, first date, falling in love, and the engagement.</p>
      </header>

      {/* Hero image (optional). Replace src with your own asset in /public/images */}
      <figure className="mb-4">
        <img
          src="/images/our-story-hero.jpg"
          alt="Ivy & Adrian"
          className="img-fluid rounded"
        />
        <figcaption className="form-text mt-2">Add a favorite photo here.</figcaption>
      </figure>

      {/* Sections (edit freely) */}
      <section className="mb-4">
        <h2 className="h5">How We Met</h2>
        <p>
          Write a short paragraph about how and where you met. Keep it warm and personal.
        </p>
      </section>

      <section className="mb-4">
        <h2 className="h5">First Date</h2>
        <p>
          Share a fun detail or two: the place, a memorable moment, a small surprise.
        </p>
      </section>

      <section className="mb-4">
        <h2 className="h5">Falling in Love</h2>
        <p>
          A few sentences about milestones and favorite memories together.
        </p>
      </section>

      <section>
        <h2 className="h5">The Proposal</h2>
        <p>
          Tell the proposal story—where, when, and how it felt.
        </p>
      </section>
    </main>
  )
}