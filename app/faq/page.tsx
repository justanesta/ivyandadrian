// app/faq/page.tsx
// Server component: Frequently Asked Questions.
// Fill in or edit answers as needed; this is a friendly starting point.
import Link from 'next/link'; // Use Next.js client-side navigation for internal routes

export default function FAQPage() {
  return (
    <main className="container py-5" style={{ maxWidth: 900 }}>
      <header className="mb-4 border-coral text-center">
        <h1 className="h1 text-navy mb-1">FAQ</h1>
        <p className="text-muted mb-0">Common questions about our wedding weekend</p>
      </header>

      <div className="d-grid gap-4">
        {/* Transportation */}
        <section className="border rounded p-3 bg-sky">
          <h2 className="h5 mb-2">Is transportation provided to and from the venue?</h2>
          <p className="mb-0">
            Yes! Buses will run between the Hotel Warner/Hotel Indigo in <strong><span className="text-forest">West Chester</span></strong> and the venue in <strong><span className="text-forest">Media</span></strong>.
            You can indicate whether you plan to use the bus on the <Link href="/rsvp" className="text-forest">RSVP page</Link>.
          </p>
        </section>

        {/* Attire */}
        <section className="border rounded p-3 bg-sky">
          <h2 className="h5 mb-2">What should I wear?</h2>
          <p className="mb-0">
            <strong><span className="text-forest">Formal attire</span></strong> - but feel free to have fun with it! Add a splash of color, pattern, or personality! We’ll be moving around the arboretum as the evening progresses, so please wear comfortable shoes. If you’re wearing heels, we recommend block heels, as some parts of the venue will be on grass.
          </p>
        </section>

        {/* Dietary */}
        <section className="border rounded p-3 bg-sky">
          <h2 className="h5 mb-2">Can you accommodate dietary restrictions?</h2>
          <p className="mb-0">
            Yes. Please note any allergies or dietary needs on the <Link href="/rsvp" className="text-forest">RSVP page</Link> and we’ll pass them along to the caterer.
          </p>
        </section>

        {/* Registry */}
        <section className="border rounded p-3 bg-sky">
          <h2 className="h5 mb-2">Where are you registered?</h2>
          <p className="mb-0">
            You’ll find gift ideas, a home fund and a vacation fund on our <Link href="/registry" className="text-forest">Registry</Link> page.
          </p>
        </section>

        {/* Photography */}
        <section className="border rounded p-3 bg-sky">
          <h2 className="h5 mb-2">Can we take photos or videos?</h2>
          <p className="mb-0">
            Absolutely — videos especially are heartily encouraged! We may ask you to share any with us afterwards. We kindly ask that you keep phones away during the ceremony.
          </p>
        </section>

        {/* Kids */}
        <section className="border rounded p-3 bg-sky">
          <h2 className="h5 mb-2">Can I bring my kids?</h2>
          <p className="mb-0">
            While we love your little ones, unless your children are specifically included on your invitation, our celebration will be an adults-only event.
          </p>
        </section>

        {/* Timing / Updates */}
        <section className="border rounded p-3 bg-sky">
          <h2 className="h5 mb-2">Will there be updates before the wedding?</h2>
          <p className="mb-0">
            If you provide an email on the <Link href="/rsvp" className="text-forest">RSVP page</Link>, we’ll share any important updates over email.
          </p>
        </section>
      </div>
    </main>
  )
}