"use client";

import Image from "next/image";
import { useId, useState } from "react";

type FundButtonsProps = {
  venmoHref: string;
  zelleQrSrc: string;
  zelleTitle?: string; // optional heading inside modal
};

export default function FundButtons({
  venmoHref,
  zelleQrSrc,
  zelleTitle = "Scan to pay with Zelle",
}: FundButtonsProps) {
  const [open, setOpen] = useState(false);
  const titleId = useId();

  return (
    <>
      {/* Side-by-side buttons */}
      <div className="d-flex gap-2">
        <a
          className="btn btn-brand flex-fill"
          href={venmoHref}
          target="_blank"
          rel="noreferrer"
        >
          Venmo
        </a>

        <button
          type="button"
          className="btn btn-brand flex-fill"
          onClick={() => setOpen(true)}
          aria-haspopup="dialog"
          aria-expanded={open}
          aria-controls={titleId}
        >
          Zelle
        </button>
      </div>

      {/* Modal (no Bootstrap JS needed) */}
      {open && (
        <div
          className="modal-backdrop-custom"
          role="dialog"
          aria-modal="true"
          aria-labelledby={titleId}
          onClick={() => setOpen(false)}
        >
          <div className="modal-card-custom" onClick={(e) => e.stopPropagation()}>
            <div className="d-flex justify-content-between align-items-start mb-3">
              <h3 id={titleId} className="h5 m-0 text-navy">
                {zelleTitle}
              </h3>
              <button
                type="button"
                className="btn btn-sm btn-light"
                onClick={() => setOpen(false)}
                aria-label="Close"
              >
                ✕
              </button>
            </div>

            <div className="position-relative" style={{ width: "100%", maxWidth: 420, aspectRatio: "1 / 1" }}>
              <Image
                src={zelleQrSrc}
                alt="Zelle QR code"
                fill
                style={{ objectFit: "contain" }}
                sizes="(max-width: 768px) 90vw, 420px"
                priority={false}
              />
            </div>

            <p className="text-muted mt-3 mb-0" style={{ fontSize: ".95rem" }}>
              Open your banking app’s Zelle option, then scan this QR code.
            </p>
          </div>
        </div>
      )}
    </>
  );
}
