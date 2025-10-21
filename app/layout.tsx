import type { Metadata } from "next";
import 'bootstrap/dist/css/bootstrap.min.css';
import "./globals.css";
import Link from 'next/link'; // Use Next.js client-side navigation for internal routes

export const metadata: Metadata = {
  title: "Ivy & Adrian's Wedding",
  description: "Wedding of Ivy & Adrian — 5/23/26 at Tyler Arboretum, Media, PA",
  icons: {
    icon: '/tree-icon.png',         // ✅ replaces default
    shortcut: '/tree-icon.png',
    apple: '/tree-icon.png',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* Google Font: Source Serif Pro */}
        <link
          href="https://fonts.googleapis.com/css2?family=Source+Serif+Pro:wght@400;600;700&display=swap"
          rel="stylesheet"
        />
        <link 
          href="https://fonts.googleapis.com/css2?family=Dancing+Script:wght@400..700&display=swap" 
          rel="stylesheet"
        />
      </head>
      <body>
        <nav className="navbar navbar-expand-md navbar-light bg-white border-bottom">
          <div className="container">
            <Link className="navbar-brand fw-bold" href="/">
              Ivy &amp; Adrian
            </Link>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#nav"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div id="nav" className="collapse navbar-collapse">
              <ul className="navbar-nav ms-auto gap-2">
                <li className="nav-item">
                  <Link className="nav-link" href="/story">Our Story</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" href="/logistics">Lodging & Logistics</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" href="/rsvp">RSVP</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" href="/registry">Registry</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" href="/faq">FAQ</Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>
        {children}

        {/* ---------- BOOTSTRAP JS BUNDLE ---------- */}
        {/* 
           Loads Bootstrap’s JavaScript (including Popper) from the official CDN.
           Needed for interactive elements such as navbar toggles or modals.
           'defer' ensures it runs after the HTML is parsed.
        */}
        <script
          src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"
          integrity="sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz"
          crossOrigin="anonymous"
          defer
        ></script>
      </body>
    </html>
  );
}
