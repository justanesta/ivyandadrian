// components/ImageCarousel.tsx
// Bootstrap carousel using Next/Image with optional captions.
// - Preserves aspect ratio (object-contain) inside a responsive frame
// - Optional captions over each slide

'use client'

import Image from 'next/image'
import { useId } from 'react'

export type Slide = {
  src: string
  alt?: string
  captionTitle?: string
  captionText?: string
}

type Props = {
  slides: Slide[]
  className?: string
  showCaptions?: boolean
}

export default function ImageCarousel({
  slides,
  className,
  showCaptions = false,
}: Props) {
  const id = useId()
  const carouselId = `carousel-${id.replace(/:/g, '')}`

  if (!slides?.length) return null

  return (
    <div
      id={carouselId}
      className={`carousel slide ${className ?? ''}`}
      data-bs-ride="carousel"
    >
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
          />
        ))}
      </div>

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

            {showCaptions && (s.captionTitle || s.captionText) && (
              <div className="carousel-caption">
                {s.captionTitle && <h5 className="fw-semibold">{s.captionTitle}</h5>}
                {s.captionText && <p className="mb-0">{s.captionText}</p>}
              </div>
            )}
          </div>
        ))}
      </div>

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
  )
}
