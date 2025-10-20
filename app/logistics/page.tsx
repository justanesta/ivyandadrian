// app/logistics/page.tsx
// Server component: boilerplate “Logistics” page.
// Lists lodging blocks, deadlines, and travel options (train/plane).

export default function LogisticsPage() {
  return (
    <main className="container py-5" style={{ maxWidth: 900 }}>
      <header className="mb-4">
        <h1 className="h3">Lodging & Logistics</h1>
        <p className="text-muted mb-0">
          Hotel blocks, booking deadlines, and transportation options.
        </p>
      </header>

      {/* Lodging cards */}
      <section className="mb-5">
        <h2 className="h5 mb-3">Hotel Blocks</h2>
        <div className="row g-4">
          {/* Copy/duplicate this column per hotel */}
          <div className="col-12 col-md-6">
            <div className="card h-100 shadow-sm">
              <div className="card-body d-grid gap-2">
                <h3 className="h6 card-title mb-1">Hotel Name</h3>
                <p className="card-text text-muted mb-2">
                  West Chester, PA — Reserve by <strong>MMM DD, YYYY</strong>.
                </p>
                <a
                  className="btn btn-dark"
                  href="https://example.com/your-hotel-block-link"
                  target="_blank"
                  rel="noreferrer"
                >
                  Book Room
                </a>
                <div className="form-text">
                  Replace the link and deadline with your actual block details.
                </div>
              </div>
            </div>
          </div>
          {/* Add more hotel cards as needed */}
        </div>
      </section>

      {/* Transportation note (to match your RSVP wording) */}
      <section className="mb-5">
        <h2 className="h5 mb-2">Wedding Transportation</h2>
        <p className="mb-1">
          Shuttles will run between hotels in <strong>West Chester, PA</strong> and the venue in <strong>Media, PA</strong>.
        </p>
        <p className="text-muted">
          On the RSVP page, you can indicate whether you’ll use the provided transportation.
        </p>
      </section>

      {/* Travel options */}
      <section>
        <h2 className="h5 mb-3">Getting Here</h2>
        <div className="row g-4">
          <div className="col-12 col-md-6">
            <div className="border rounded p-3 h-100">
              <h3 className="h6">By Train</h3>
              <p className="mb-0">
                Add recommended stations and lines (e.g., SEPTA/Amtrak) and rideshare tips.
              </p>
            </div>
          </div>
          <div className="col-12 col-md-6">
            <div className="border rounded p-3 h-100">
              <h3 className="h6">By Plane</h3>
              <p className="mb-0">
                List nearby airports (e.g., PHL) and approximate drive times to West Chester/Media.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}