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
            <p className="lead text-navy opacity-75"><a href="https://tylerarboretum.org/">Tyler Arboretum</a> — 515 Painter Rd Media, PA 19063</p>

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

      {/* Wedding weekend itinerary */}
      <section className="py-5 text-navy">
        <div className="container">
          <h2
            id="weekend-itinerary-heading"
            className="h2 fw-semibold mb-4 text-center"
          >
            Wedding Weekend Itinerary
          </h2>

          <div
            className="mx-auto text-start"
            style={{
              maxWidth: 640,
              fontSize: '1.1rem',
              lineHeight: 1.5,
            }}
          >
            <div className="mb-4">
              <p className="fw-semibold mb-1"><u>Friday, May 22</u></p>
              <p className="mb-0">
                After the rehearsal dinner, we will be at <b>Station 142</b> (142 E Market St, West Chester, PA 19382) around 7:30pm if you would like to join! It is about a 5 minute walk from the hotels. It is a cash bar so come ready to grab your own drinks. Hope to see you there!
              </p>
            </div>

            <div className="mb-4">
              <p className="fw-semibold mb-1"><u>Saturday, May 23</u></p>
              <p className="mb-0">
                The wedding ceremony begins at 5pm at the <b>Tyler Arboretum</b> (515 Painter Rd, Media, PA 19063). Cocktail hour and reception to follow on site.
              </p>
            </div>

            <div>
              <p className="fw-semibold mb-1"><u>Sunday, May 24</u></p>
              <p className="mb-0">
                Feel free to stop by <b>Marie &amp; Gordon&apos;s home</b> (13 Smedley Dr, Newtown Square, PA 19073) for a casual brunch at 10:00am.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* West Chester restaurant recommendations */}
      <section className="py-5 text-navy">
        <div className="container">
          <h2
          id="restaurant-recommendations-heading"
          className="h2 fw-semibold mt-5 mb-4 text-center text-navy"
        >
          West Chester Restaurant &amp; Bar Recommendations
        </h2>

        <div
          className="mx-auto text-start"
          style={{
            maxWidth: 640,
            fontSize: '1.1rem',
            lineHeight: 1.5,
          }}
        >
          <h3 className="h4 fw-semibold mb-3 text-navy">
            Great for casual eats and drinks
          </h3>
          <div className="mb-4">
            <p className="fw-semibold mb-1 text-navy">BierHaul - TownHouse</p>
            <p className="mb-0">
              15 N Walnut St, West Chester, PA 19380
            </p>
          </div>
          <div className="mb-4">
            <p className="fw-semibold mb-1 text-navy">Kildares Irish Pub</p>
            <p className="mb-0">
              18 W Gay St, West Chester, PA 19380
            </p>
          </div>
          <div className="mb-4">
            <p className="fw-semibold mb-1 text-navy">Slow Hand WC</p>
            <p className="mb-0">
              30 N Church St, West Chester, PA 19380
            </p>
          </div>
          <div className="mb-4">
            <p className="fw-semibold mb-1 text-navy">Steaks West Chester</p>
            <p className="mb-0">
              698 E Market St Unit 3, West Chester, PA 19382
            </p>
          </div>
          <div className="mb-4">
            <p className="fw-semibold mb-1 text-navy">West Chester Pizza Cafe</p>
            <p className="mb-0">
              701 W Nields St, West Chester, PA 19382
            </p>
          </div>

          <h3 className="h4 fw-semibold mt-4 mb-3 text-navy">
            Recommend a reservation
          </h3>
          <div className="mb-3">
            <p className="fw-semibold mb-1 text-navy">Opa Taverna</p>
            <p className="mb-0">
              40 E Gay St, West Chester, PA 19380
            </p>
          </div>

          <div className="mb-3">
            <p className="fw-semibold mb-1 text-navy">Dolce Zola</p>
            <p className="mb-0">
              134 E Gay St, West Chester, PA 19380
            </p>
          </div>

          <div className="mb-3">
            <p className="fw-semibold mb-1 text-navy">Limoncello West Chester</p>
            <p className="mb-0">
              9 N Walnut St, West Chester, PA 19380
            </p>
          </div>
          <div className="mb-3">
            <p className="fw-semibold mb-1 text-navy">The Mediterranean</p>
            <p className="mb-0">
              150 W Gay St, West Chester, PA 19380 — BYOB
            </p>
          </div>
        </div>
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
              Tyler Arboretum — where we&apos;ll celebrate together
            </figcaption>
          </figure>
        </div>
      </section>
    </main>
  )
}
