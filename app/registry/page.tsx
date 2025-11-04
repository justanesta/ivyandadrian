// app/registry/page.tsx
// Registry page with placeholder images for each card.
// Uses Next/Image for optimization and consistent styling.

import Image from 'next/image'

export default function RegistryPage() {
  return (
    <main className="container py-5" style={{ maxWidth: 900 }}>
      <h1 className="h1 mb-4 text-center text-navy">Registry</h1>
      <p className="text-muted text-center mb-5">
        If you’d like to give us a gift, here are a handful of options.
      </p>

      <div className="row g-4">
             {/* Gift Registry A */}
             {/* <div className="col-12 col-md-6">
//           <div className="card h-100 shadow-sm">
//             <img src="/images/registry-home-kitchen.jpg" className="card-img-top" alt="Home & kitchen" />
//             <div className="card-body d-grid gap-2">
//               <h2 className="h5 card-title mb-1">Home &amp; Kitchen</h2>
//               <p className="card-text text-muted">
//                 Browse a curated list of items for our home together.
//               </p>
//               <a className="btn btn-dark" href="https://example.com/registry-home" target="_blank" rel="noreferrer">
//                 View Gift List
//               </a>
//             </div>
//           </div>
//         </div> */}

            {/* Gift Registry B */}
            {/* <div className="col-12 col-md-6">
//           <div className="card h-100 shadow-sm">
//             <img src="/images/registry-travel.jpg" className="card-img-top" alt="Travel & experiences" />
//             <div className="card-body d-grid gap-2">
//               <h2 className="h5 card-title mb-1">Travel &amp; Experiences</h2>
//               <p className="card-text text-muted">
//                 Help us make memories with experiences and adventures.
//               </p>
//               <a className="btn btn-dark" href="https://example.com/registry-travel" target="_blank" rel="noreferrer">
//                 View Gift List
//               </a>
//             </div>
//           </div>
//         </div> */}
        {/* === Our First Home === */}
        <div className="col-12 col-md-6">
          <div className="card h-100 shadow-sm bg-sky border-forest">
            {/* ✅ Placeholder image */}
            <div className="position-relative" style={{ height: '220px', overflow: 'hidden' }}>
              <Image
                src="/images/registry-home-placeholder.jpg"
                alt="Our first home registry placeholder"
                fill
                style={{
                  objectFit: 'cover',
                  objectPosition: 'center',
                }}
                className="rounded-top"
                priority={false}
              />
            </div>

            <div className="card-body d-grid gap-2">
              <h2 className="h2 card-title mb-1 text-navy">Our First Home</h2>
              <p className="card-text text-muted">
                Help us buy our first home together.
              </p>
              <a
                className="btn btn-brand"
                href="https://account.venmo.com/pay?recipients=ivyhammond"
                target="_blank"
                rel="noreferrer"
              >
                Contribute
              </a>
            </div>
          </div>
        </div>

        {/* === Our Honeymoon Fund === */}
        <div className="col-12 col-md-6">
          <div className="card h-100 shadow-sm bg-sky border-forest">
            {/* ✅ Placeholder image */}
            <div className="position-relative" style={{ height: '220px', overflow: 'hidden' }}>
              <Image
                src="/images/registry-honeymoon-placeholder.jpg"
                alt="Our honeymoon registry placeholder"
                fill
                style={{
                  objectFit: 'cover',
                  objectPosition: 'center',
                }}
                className="rounded-top"
                priority={false}
              />
            </div>

            <div className="card-body d-grid gap-2">
              <h2 className="h2 card-title mb-1 text-navy">Our Honeymoon Fund</h2>
              <p className="card-text text-muted">
                Contribute toward our honeymoon adventure.
              </p>
              <a
                className="btn btn-brand"
                href="https://account.venmo.com/pay?recipients=ivyhammond"
                target="_blank"
                rel="noreferrer"
              >
                Contribute
              </a>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}


// export default function RegistryPage() {
//   return (
//     <main className="container py-5" style={{ maxWidth: 900 }}>
//       <h1 className="h3 mb-4 text-center">Registry</h1>
//       <p className="text-muted text-center mb-5">
//         If you’d like to give us a gift, here are a handful options.
//       </p>

//       <div className="row g-4">
//         {/* Gift Registry A */}
//         {/* <div className="col-12 col-md-6">
//           <div className="card h-100 shadow-sm">
//             <img src="/images/registry-home-kitchen.jpg" className="card-img-top" alt="Home & kitchen" />
//             <div className="card-body d-grid gap-2">
//               <h2 className="h5 card-title mb-1">Home &amp; Kitchen</h2>
//               <p className="card-text text-muted">
//                 Browse a curated list of items for our home together.
//               </p>
//               <a className="btn btn-dark" href="https://example.com/registry-home" target="_blank" rel="noreferrer">
//                 View Gift List
//               </a>
//             </div>
//           </div>
//         </div> */}

//         {/* Gift Registry B */}
//         {/* <div className="col-12 col-md-6">
//           <div className="card h-100 shadow-sm">
//             <img src="/images/registry-travel.jpg" className="card-img-top" alt="Travel & experiences" />
//             <div className="card-body d-grid gap-2">
//               <h2 className="h5 card-title mb-1">Travel &amp; Experiences</h2>
//               <p className="card-text text-muted">
//                 Help us make memories with experiences and adventures.
//               </p>
//               <a className="btn btn-dark" href="https://example.com/registry-travel" target="_blank" rel="noreferrer">
//                 View Gift List
//               </a>
//             </div>
//           </div>
//         </div> */}

//         {/* General Home Fund */}
//         <div className="col-12">
//           <div className="card h-100 shadow-sm bg-sky">
//             <div className="card-body d-grid gap-2">
//               <h2 className="h5 card-title mb-1">Our First Home</h2>
//               <p className="card-text text-muted">
//                 Contribute what you wish
//               </p>
//               <a className="btn btn-outline-dark" href="https://account.venmo.com/pay?recipients=ivyhammond" target="_blank" rel="noreferrer">
//                 Contribute
//               </a>
//             </div>
//           </div>
//         </div>
//         <div className="col-12">
//           <div className="card h-100 shadow-sm bg-sky">
//             <div className="card-body d-grid gap-2">
//               <h2 className="h5 card-title mb-1">Our Honeymoon Fund</h2>
//               <p className="card-text text-muted">
//                 Contribute what you wish
//               </p>
//               <a className="btn btn-outline-dark" href="https://account.venmo.com/pay?recipients=ivyhammond" target="_blank" rel="noreferrer">
//                 Contribute
//               </a>
//             </div>
//           </div>
//         </div>
//       </div>
//     </main>
//   )
// }