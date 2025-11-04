// app/page.tsx
// Landing page using Next/Image for optimization.
// - Text + buttons ABOVE the hero image
// - Page background uses your sage color
// - Buttons use the unified .btn-brand theme
// - Uses <Image /> with proper width/height + priority/lazy for perf

import Link from 'next/link'
import Image from 'next/image'

export default function HomePage() {
  return (
    <main>
      {/* ===== Top section: copy first, image second ===== */}
      <section className="py-5">
        <div className="container">
          {/* Centered copy block */}
          <div className="text-center" style={{ maxWidth: 820, margin: '0 auto' }}>
            {/* If you added a script font utility, this will apply it to the names */}
            <h1 className="display-5 fw-semibold text-navy mb-2 font-script">
              Ivy &amp; Adrian<br/>are getting married
            </h1>

            <div className="divider-coral" />

            <p className="lead mt-3 mb-1 text-navy" style={{ fontSize: '2rem', lineHeight: 1.1 }}>May 23, 2026</p>
            <p className="lead text-navy opacity-75"><a href="https://tylerarboretum.org/">Tyler Arboretum</a> — Media, PA</p>

            {/* Uniform filled buttons */}
            <div className="d-flex gap-3 justify-content-center mt-3">
              <Link href="/rsvp" className="btn btn-brand btn-lg">RSVP</Link>
              <Link href="/logistics" className="btn btn-brand btn-lg">Logistics &amp; Lodging</Link>
              <Link href="/faq" className="btn btn-brand btn-lg">FAQ</Link>
            </div>
          </div>

          {/* Hero image BELOW the text block */}
          <figure
            className="mt-5 mb-0 position-relative d-flex justify-content-center align-items-center"
            style={{
              backgroundColor: 'var(--color-sage)',  // same as page bg
              height: 'clamp(500px, 75vh, 900px)',   // responsive vertical space
              overflow: 'hidden',
              borderRadius: '1rem',
              boxShadow: '0 10px 28px rgba(0,0,0,0.12)',
            }}
          >
            <Image
              src="/images/ivy-adrian-hero-temp.jpg"
              alt="Ivy & Adrian"
              width={1024}        // intrinsic width of your file
              height={1365}       // intrinsic height of your file (portrait ratio)
              className="rounded-4"
              priority
              style={{
                objectFit: 'contain',       // keeps entire image visible
                objectPosition: 'center',   // centers both horizontally & vertically
                width: 'auto',
                height: '100%',             // scale to container height
              }}
            />
          </figure>
        </div>
      </section>

      {/* ===== Optional: second big image or venue detail ===== */}
      <section className="py-5">
        <div className="container">
          <figure
            className="mb-0 position-relative"
            style={{
              height: 'clamp(420px, 65vh, 700px)',
              overflow: 'hidden',
              borderRadius: '1rem',
              boxShadow: '0 10px 28px rgba(0,0,0,0.12)',
            }}
          >
            <Image
              src="/images/tyler-arboretum-hero.jpg"
              alt="Tyler Arboretum in Media, Pennsylvania"
              width={1920}
              height={1280}
              className="w-100 rounded-4"
              style={{
                objectFit: 'cover',
                objectPosition: 'center 40%',
                width: '100%',
                height: '100%',
                borderRadius: '1rem',
              }}
              loading="lazy"
            />

            {/* overlay ABOVE image, BELOW caption */}
            <div
              style={{
                position: 'absolute',
                inset: 0,
                background: 'rgba(181,201,164,0.1)',
                zIndex: 1,
              }}
            />

            {/* caption ON image */}
            <figcaption
              style={{
                position: 'absolute',
                left: 0,
                right: 0,
                bottom: '0.75rem',
                zIndex: 2,
                color: '#fff',
                textAlign: 'center',
                padding: '0.35rem 0.75rem',
                margin: 0,
                background: 'rgba(35,91,140,0.55)',  // translucent navy for legibility
                borderRadius: '0.5rem',
                width: 'max(60%, 280px)',
                marginInline: 'auto',
                textShadow: '0 1px 2px rgba(0,0,0,0.6)',
                fontSize: '0.95rem',
              }}
            >
              Tyler Arboretum — where we’ll celebrate together
            </figcaption>
          </figure>
        </div>
      </section>
    </main>
  )
}
