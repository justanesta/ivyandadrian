// app/registry/page.tsx
// Simple registry page with cards linking to gift lists and a general fund.
// Replace the hrefs with your real registry URLs.

export default function RegistryPage() {
  return (
    <main className="container py-5" style={{ maxWidth: 900 }}>
      <h1 className="h3 mb-4 text-center">Registry</h1>
      <p className="text-muted text-center mb-5">
        If you’d like to give us a gift, here are a handful options.
      </p>

      <div className="row g-4">
        {/* Gift Registry A */}
        <div className="col-12 col-md-6">
          <div className="card h-100 shadow-sm">
            <img src="/images/registry-home-kitchen.jpg" className="card-img-top" alt="Home & kitchen" />
            <div className="card-body d-grid gap-2">
              <h2 className="h5 card-title mb-1">Home &amp; Kitchen</h2>
              <p className="card-text text-muted">
                Browse a curated list of items for our home together.
              </p>
              <a className="btn btn-dark" href="https://example.com/registry-home" target="_blank" rel="noreferrer">
                View Gift List
              </a>
            </div>
          </div>
        </div>

        {/* Gift Registry B */}
        <div className="col-12 col-md-6">
          <div className="card h-100 shadow-sm">
            <img src="/images/registry-travel.jpg" className="card-img-top" alt="Travel & experiences" />
            <div className="card-body d-grid gap-2">
              <h2 className="h5 card-title mb-1">Travel &amp; Experiences</h2>
              <p className="card-text text-muted">
                Help us make memories with experiences and adventures.
              </p>
              <a className="btn btn-dark" href="https://example.com/registry-travel" target="_blank" rel="noreferrer">
                View Gift List
              </a>
            </div>
          </div>
        </div>

        {/* General Home Fund */}
        <div className="col-12">
          <div className="card h-100 shadow-sm">
            <div className="card-body d-grid gap-2">
              <h2 className="h5 card-title mb-1">Home Fund</h2>
              <p className="card-text text-muted">
                If you prefer, you can contribute to a general home fund.
              </p>
              <a className="btn btn-outline-dark" href="https://example.com/home-fund" target="_blank" rel="noreferrer">
                Contribute
              </a>
              <div className="form-text">
                We process contributions through a secure external provider.
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}