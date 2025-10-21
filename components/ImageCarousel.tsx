// components/ImageCarousel.tsx
// Bootstrap carousel using Next/Image, with optional captions and thumbnail strip.
// - Preserves aspect ratio (object-contain) inside a responsive frame
// - Adds small thumbnails that jump to a specific slide
// - Optional captions over each slide
//
// Requirements:
// • Bootstrap JS bundle loaded (for carousel controls)
// • Images exist under /public/images/... but src should be "/images/..."
// • Add the CSS in globals.css (carousel-frame + thumbnail classes)

'use client'

import Image from 'next/image'
import { useEffect, useId, useRef, useState } from 'react'

// Types
export type Slide = {
  src: string             // e.g. '/images/engagement-1.jpg'  (NO '/public')
  alt?: string
  captionTitle?: string   // optional: appears on slide
  captionText?: string    // optional: secondary line
}

type Props = {
  slides: Slide[]
  className?: string
  showCaptions?: boolean  // default: false
  showThumbnails?: boolean// default: false
}

export default function ImageCarousel({
  slides,
  className,
  showCaptions = false,
  showThumbnails = false
}: Props) {
  const id = useId()
  const carouselId = `carousel-${id.replace(/:/g, '')}`
  const [active, setActive] = useState(0)
  const ref = useRef<HTMLDivElement | null>(null)

  // Keep active index in sync when the carousel slides (for active thumb highlight)
  useEffect(() => {
    if (!ref.current) return

    // Bootstrap 5 emits 'slid.bs.carousel' events
    const el = ref.current
    const handler = (e: any) => {
      const next = el.querySelector('.carousel-item.active')
      if (!next) return
      const idx = Array.from(el.querySelectorAll('.carousel-item')).indexOf(next)
      if (idx >= 0) setActive(idx)
    }

    el.addEventListener('slid.bs.carousel', handler as any)
    return () => el.removeEventListener('slid.bs.carousel', handler as any)
  }, [])

  if (!slides?.length) return null

  return (
    <div>
      <div
        id={carouselId}
        className={`carousel slide ${className ?? ''}`}
        data-bs-ride="carousel"
        ref={ref}
      >
        {/* Indicators (dots) */}
        <div className="carousel-indicators">
          {slides.map((_, i) => (
            <button
              key={i}
              type="button"
              data-bs-target={`#${carouselId}`}
              data-bs-slide-to={i}
              className={i === 0 ? 'active' : ''}
              aria-current={i === 0 ? 'true' : undefined}
              aria-label={`Slide ${i + 1}`}
              onClick={() => setActive(i)}
            />
          ))}
        </div>

        {/* Slides */}
        <div className="carousel-inner">
          {slides.map((s, i) => (
            <div key={s.src} className={`carousel-item ${i === 0 ? 'active' : ''}`}>
              <div className="carousel-frame">
                <Image
                  src={s.src}
                  alt={s.alt ?? ''}
                  fill
                  sizes="100vw"
                  className="object-fit-contain"
                  priority={i === 0}
                />
              </div>

              {/* Optional caption overlay */}
              {showCaptions && (s.captionTitle || s.captionText) && (
                <div className="carousel-caption d-none d-md-block">
                  {s.captionTitle && <h5 className="fw-semibold">{s.captionTitle}</h5>}
                  {s.captionText && <p className="mb-0">{s.captionText}</p>}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Controls */}
        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target={`#${carouselId}`}
          data-bs-slide="prev"
        >
          <span className="carousel-control-prev-icon" aria-hidden="true" />
          <span className="visually-hidden">Previous</span>
        </button>
        <button
          className="carousel-control-next"
          type="button"
          data-bs-target={`#${carouselId}`}
          data-bs-slide="next"
        >
          <span className="carousel-control-next-icon" aria-hidden="true" />
          <span className="visually-hidden">Next</span>
        </button>
      </div>

      {/* Optional thumbnails row */}
      {showThumbnails && (
        <div className="carousel-thumbs mt-3">
          {slides.map((s, i) => (
            <button
              key={s.src}
              type="button"
              className={`carousel-thumb ${active === i ? 'active' : ''}`}
              data-bs-target={`#${carouselId}`}
              data-bs-slide-to={i}
              aria-label={`Go to slide ${i + 1}`}
              onClick={() => setActive(i)}
            >
              <Image
                src={s.src}
                alt={s.alt ?? ''}
                fill
                sizes="120px"
                className="object-fit-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  )
}