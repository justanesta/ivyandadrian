import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import 'bootstrap/dist/css/bootstrap.min.css'

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Ivy & Adrian's Wedding",
  description: "A website for information about Ivy & Adrian's Wedding",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <nav className="navbar navbar-expand-md navbar-light bg-white border-bottom">
          <div className="container">
            <a className="navbar-brand fw-bold" href="/">
              Ivy & Adrian
            </a>
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
                  <a className="nav-link" href="/story">
                    Our Story
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="/logistics">
                    Logistics
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="/rsvp">
                    RSVP
                  </a>
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
