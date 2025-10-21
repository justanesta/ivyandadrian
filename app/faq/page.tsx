// app/faq/page.tsx
// Server component: Frequently Asked Questions.
// Fill in or edit answers as needed; this is a friendly starting point.

export default function FAQPage() {
  return (
    <main className="container py-5" style={{ maxWidth: 900 }}>
      <header className="mb-4 section-soft bg-sky border-coral text-center">
        <h1 className="h3 text-navy mb-1">FAQ</h1>
        <p className="text-muted mb-0">Common questions about our wedding weekend</p>
      </header>

      <div className="d-grid gap-4">
        {/* Transportation */}
        <section className="border rounded p-3 bg-sky">
          <h2 className="h5 mb-2">Is transportation provided?</h2>
          <p className="mb-0">
            Yes! Shuttles will run between hotels in <strong><span className="text-forest">West Chester, PA</span></strong> and the venue in <strong><span className="text-forest">Media, PA</span></strong>.
            You can indicate whether you plan to use the shuttle on the RSVP page.
          </p>
        </section>

        {/* Attire */}
        <section className="border rounded p-3 bg-sky">
          <h2 className="h5 mb-2">What should I wear?</h2>
          <p className="mb-0">
            Dress code is <strong><span className="text-forest">cocktail attire</span></strong>. Different parts of the event (ceremony, dinner, reception) of the event may be at different parts of the property — consider comfortable shoes.
          </p>
        </section>

        {/* Dietary */}
        <section className="border rounded p-3 bg-sky">
          <h2 className="h5 mb-2">Can you accommodate dietary restrictions?</h2>
          <p className="mb-0">
            Yes. Please note any allergies or dietary needs on the RSVP form and we’ll pass them along to the caterer.
          </p>
        </section>

        {/* Registry */}
        <section className="border rounded p-3 bg-sky">
          <h2 className="h5 mb-2">Where are you registered?</h2>
          <p className="mb-0">
            You’ll find gift ideas and a home fund on our <a href="/registry" className="text-forest">Registry</a> page.
          </p>
        </section>

        {/* Photography */}
        <section className="border rounded p-3 bg-sky">
          <h2 className="h5 mb-2">Can we take photos or videos?</h2>
          <p className="mb-0">
            Absolutely — videos especially are heartily encouraged! We may ask you to share any with us afterwards. We kindly ask that you keep phones away during the ceremony.
          </p>
        </section>

        {/* Timing / Updates */}
        <section className="border rounded p-3 bg-sky">
          <h2 className="h5 mb-2">Will there be updates before the wedding?</h2>
          <p className="mb-0">
            If you provide an email on the <a href="/rsvp" className="text-forest">RSVP form</a>, we’ll share any important updates there.
          </p>
        </section>
      </div>
    </main>
  )
}