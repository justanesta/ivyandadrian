// app/logistics/page.tsx
// Logistics & Lodging with a framed portrait image intro.
// - Portrait photo uses <Image fill /> with objectFit: 'contain' so it isn’t cropped
// - Sits in a left column on desktop; stacks on mobile
// - Rest of your sections unchanged

import Image from 'next/image'

export default function LogisticsPage() {
  return (
    <main className="container py-5" style={{ maxWidth: 1000 }}>
      <header className="mb-4 text-center text-md-start">
        <h1 className="h1 text-navy">Lodging &amp; Logistics</h1>
        <p className="text-muted mb-0">Hotel blocks, booking deadlines, and travel options.</p>
      </header>

      {/* ===== Intro: portrait image + blurb ===== */}
      <section className="mb-5">
        <div className="row g-4 align-items-center">
          {/* Portrait image frame (left on md+, stacked on mobile) */}
          <div className="col-12 col-md-5">
            <figure
              className="position-relative rounded-4 shadow-sm mb-0"
              style={{
                height: 'clamp(320px, 50vh, 560px)',   // responsive height
                overflow: 'hidden',
                background: 'var(--color-sage)',       // match page bg behind letterbox
              }}
            >
              <Image
                src="/images/West_Chester_PA.jpg"      // place file in /public/images/
                alt="Downtown West Chester, Pennsylvania"
                fill                                   // no width/height needed
                className="rounded-4"
                style={{
                  objectFit: 'contain',                // keep full portrait visible
                  objectPosition: 'center',
                }}
                priority={false}
              />
            </figure>
            <figcaption className="form-text text-center mt-2 text-navy">
              West Chester, PA. Photograph by Alice Snook-Shields.
            </figcaption>
          </div>

          {/* Optional blurb to balance the image; edit or remove as you like */}
          <div className="col-12 col-md-7">
            <div className="border rounded border-forest p-3 bg-sky">
              <h2 className="h3 text-navy mb-2">Staying in West Chester</h2>
              <p className="mb-0">
                We have set up two hotel blocks in downtown West Chester, PA. West Chester is very walkable with many restaurants, shops, and bars.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ===== Hotel Blocks ===== */}
      <section className="mb-5">
        <h2 className="h2 text-navy mb-3">Hotel Blocks</h2>
        <div className="row g-4">
          <div className="col-12 col-md-6">
            <div className="border rounded border-forest p-3 h-100 bg-sky">
              <h3 className="h3 text-navy mb-1">Hotel Warner</h3>
              <p className="text-muted mb-2">
                120 N High St, West Chester, PA 19380 — Reserve by{' '}
                <strong><span className="text-forest fw-bold">April 26th, 2026</span></strong>.
              </p>
              <a
                className="btn btn-brand btn-lg"
                href="https://groups.hotelwarner.com/"
                target="_blank"
                rel="noreferrer"
              >
                Book Room
              </a>
              <div>
                <p className="text-muted mb-2 pt-2">
                  Guests can call 610-692-6920 to book directly for discounted rates of $189/night (two
                  queens) and $199/night (one king). Specify “Hammond Nesta Wedding” in the online form.
                </p>
              </div>
            </div>
          </div>

          {/* Duplicate/modify this column per hotel */}
          <div className="col-12 col-md-6">
            <div className="border rounded border-forest p-3 h-100 bg-sky">
              <h3 className="h3 text-navy mb-1">Hotel Indigo</h3>
              <p className="text-muted mb-2">
                39 E Gay St, West Chester, PA 19380 — Reserve by{' '}
                <strong><span className="text-forest fw-bold">March 23rd, 2026</span></strong>.
              </p>
              <a
                className="btn btn-brand btn-lg"
                href="https://www.ihg.com/redirect?path=asearch&brandCode=IN&localeCode=en&regionCode=1&hotelCode=PHLWE&checkInDate=22&checkInMonthYear=042026&checkOutDate=24&checkOutMonthYear=042026&rateCode=6CBARC&_PMID=99801505&GPC=HNW&cn=no&adjustMonth=false&showApp=true&monthIndex=00"
                target="_blank"
                rel="noreferrer"
              >
                Book Room
              </a>
              <div>
                <p className="text-muted mb-2 pt-2">
                  Call 484-630-2880 and reference group code “HNW” for 5/22–5/24/2026 to receive the
                  $249/night rate.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== Additional Accommodations ===== */}
      <section className="mb-5">
        <h2 className="h2 text-navy mb-3">Additional Accommodations</h2>
        <div className="row g-4">
        <div className="border rounded border-forest p-3 bg-sky">
          <p className="mb-0">
            If hotel blocks are full, there are additional lodging options nearby in <strong><span className="text-forest">West Chester</span></strong> or close to the wedding venue in <strong><span className="text-forest">Media</span></strong>.
          </p>
        </div>
          <div className="col-12 col-md-6">
            <div className="border rounded border-forest p-3 h-100 bg-sky">
              <h3 className="h3 text-navy mb-1">Holiday Inn Express & Suites West Chester</h3>
              <p className="text-muted mb-2">
                1310 Wilmington Pike West Chester, PA 19382.
              </p>
              <a
                className="btn btn-brand btn-lg"
                href="https://www.ihg.com/holidayinnexpress/hotels/us/en/west-chester/phlwp/hoteldetail"
                target="_blank"
                rel="noreferrer"
              >
                Hotel Website
              </a>
            </div>
          </div>

          <div className="col-12 col-md-6">
            <div className="border rounded border-forest p-3 h-100 bg-sky">
              <h3 className="h3 text-navy mb-1">Microtel Inn & Suites by Wyndham West Chester</h3>
              <p className="text-muted mb-2">
                500 Willowbrook Ln, West Chester, PA 19382.
              </p>
              <a
                className="btn btn-brand btn-lg"
                href="https://www.wyndhamhotels.com/microtel/west-chester-pennsylvania/microtel-inn-and-suites-west-chester-pa/overview?CID=LC:5b3ss9kd80xe5ox:28376&iata=00093796"
                target="_blank"
                rel="noreferrer"
              >
                Hotel Website
              </a>
            </div>
          </div>

          <div className="col-12 col-md-6">
            <div className="border rounded border-forest p-3 h-100 bg-sky">
              <h3 className="h3 text-navy mb-1">Hilton Garden Inn Media Philadelphia</h3>
              <p className="text-muted mb-2">
                2 Donovan Dr, Media, PA 19063.
              </p>
              <a
                className="btn btn-brand btn-lg"
                href="https://www.hilton.com/en/hotels/phltsgi-hilton-garden-inn-media-philadelphia/?SEO_id=GMB-AMER-GI-PHLTSGI&y_source=1_MTA4NTM5NDg2Ni03MTUtbG9jYXRpb24ud2Vic2l0ZQ%3D%3D"
                target="_blank"
                rel="noreferrer"
              >
                Hotel Website
              </a>
            </div>
          </div>

          <div className="col-12 col-md-6">
            <div className="border rounded border-forest p-3 h-100 bg-sky">
              <h3 className="h3 text-navy mb-1">AC Hotel Newtown Square</h3>
              <p className="text-muted mb-2">
                200 Squire Dr, Newtown Square, PA 19073.
              </p>
              <a
                className="btn btn-brand btn-lg"
                href="https://www.marriott.com/en-us/hotels/phlqc-ac-hotel-newtown-square/overview/?scid=f2ae0541-1279-4f24-b197-a979c79310b0"
                target="_blank"
                rel="noreferrer"
              >
                Hotel Website
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ===== Transportation Callout ===== */}
      <section className="mb-5">
        <h2 className="h2 text-navy mb-2">Transportation</h2>
        <div className="border rounded border-forest p-3 bg-sky">
          <p className="mb-0">
            On the wedding day, buses will run from the hotels in <strong><span className="text-forest">West Chester</span></strong> to the wedding venue in <strong><span className="text-forest">Media</span></strong>. Upon receiving your invitation, please indicate whether you plan to use the bus.
          </p>
        </div>
      </section>

      {/* ===== Getting Here ===== */}
      <section>
        <h2 className="h2 text-navy mb-3">Getting Here</h2>
        <div className="row g-4">
          <div className="col-12 col-md-6">
            <div className="border rounded border-forest p-3 h-100 bg-sky">
              <h3 className="h3 text-navy">By Train</h3>
              <p className="mb-0">The nearest rail station to West Chester is in Exton, PA which is serviced by <strong><a href="https://www.septa.org/stations/exton-station" className="text-forest">SEPTA regional rail</a></strong> on the Paoli/Thorndale Line and <strong><a href="https://www.amtrak.com/stations/ext" className="text-forest">Amtrak</a></strong> via the Keystone Service and the Pennsylvanian. Downtown West Chester is a 10 minute rideshare/taxi ride from the Exton Station.</p>
            </div>
          </div>
          <div className="col-12 col-md-6">
            <div className="border rounded border-forest p-3 h-100 bg-sky">
              <h3 className="h3 text-navy">By Plane</h3>
              <p className="mb-0">The nearest airport is the <strong><a href="https://www.phl.org/" className="text-forest">Philadelphia International Airport (PHL)</a></strong>. There are direct flights from Minneapolis/Saint Paul, San Diego, Boston, Los Angeles, Greensboro/High Point, Asheville, Cleveland, and Edinburgh. Downtown West Chester is typically a 45 minute rideshare/taxi ride from PHL.</p>
            </div>
          </div>
          <div className="col-12 col-md-6">
            <div className="border rounded border-forest p-3 h-100 bg-sky">
              <h3 className="h3 text-navy">By Car</h3>
              <p className="mb-0">If choose to drive, there is both street and garage parking in West Chester. There is also plenty parking available at <strong><span className="text-forest">Tyler Arboretum</span></strong>.</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}