// src/pages/Gallery.jsx
import { Link } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";

const BASE = import.meta.env.BASE_URL || "/";

const IMAGES = [
  `${BASE}gallery/collage1.jpg`,
  `${BASE}gallery/collage2.jpg`,
  `${BASE}gallery/collage3.jpg`,
  `${BASE}gallery/collage4.jpg`,
  `${BASE}gallery/collage5.jpg`,
  `${BASE}gallery/collage6.jpg`,
  `${BASE}gallery/collage7.jpg`,
  `${BASE}gallery/collage8.jpg`,
  `${BASE}gallery/collage9.jpg`,
  `${BASE}gallery/collage10.jpg`,
  `${BASE}gallery/collage11.jpg`,
  `${BASE}gallery/collage12.jpg`,
  `${BASE}gallery/collage13.jpg`,
  `${BASE}gallery/collage14.jpg`,
  `${BASE}gallery/collage15.jpg`,
  `${BASE}gallery/collage16.jpg`,
  `${BASE}gallery/collage17.jpg`,
  `${BASE}gallery/collage18.jpg`,
  `${BASE}gallery/collage19.jpg`,
  `${BASE}gallery/collage20.jpg`,
  `${BASE}gallery/collage21.jpg`,
  `${BASE}gallery/collage22.jpg`,
  `${BASE}gallery/collage23.jpg`,
  `${BASE}gallery/collage24.jpg`,
  `${BASE}gallery/collage25.jpg`,
  `${BASE}gallery/collage26.jpg`,
  `${BASE}gallery/collage27.jpg`,
  `${BASE}gallery/collage28.jpg`,
  `${BASE}gallery/collage29.jpg`,
  `${BASE}gallery/collage32.jpg`,
  `${BASE}gallery/collage33.jpg`,
  `${BASE}gallery/collage34.jpg`,
  `${BASE}gallery/collage36.jpg`,
  `${BASE}gallery/collage37.jpg`,
  `${BASE}gallery/collage39.jpg`,
  `${BASE}gallery/collage40.jpg`,
];

export default function Gallery() {
  const [openIndex, setOpenIndex] = useState(null); // null = closed

  // Preload neighbors for snappy navigation
  const neighbors = useMemo(() => {
    if (openIndex == null) return [];
    return [
      IMAGES[(openIndex - 1 + IMAGES.length) % IMAGES.length],
      IMAGES[(openIndex + 1) % IMAGES.length],
    ];
  }, [openIndex]);

  useEffect(() => {
    neighbors.forEach((src) => {
      const img = new Image();
      img.src = src;
    });
  }, [neighbors]);

  // Keyboard + body scroll lock while lightbox is open
  useEffect(() => {
    if (openIndex == null) return;

    const onKey = (e) => {
      if (e.key === "Escape") setOpenIndex(null);
      if (e.key === "ArrowRight")
        setOpenIndex((i) => (i + 1) % IMAGES.length);
      if (e.key === "ArrowLeft")
        setOpenIndex((i) => (i - 1 + IMAGES.length) % IMAGES.length);
    };

    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [openIndex]);

  return (
    <section className="wrap">
      <div className="intro">
        <h1 className="title">Our Gallery</h1>
        <p className="lede">
          Please take a look through our recent landscaping projects. We’re proud
          of the detail and craftsmanship in every design. When you’re ready to
          begin your own project, simply reach out to us using the button below.
        </p>
        <Link to="/contact" className="cta">
          Contact Us
        </Link>
      </div>

      <div className="grid">
        {IMAGES.map((src, i) => (
          <figure
            className="tile"
            key={src + i}
            onClick={() => setOpenIndex(i)}
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") setOpenIndex(i);
            }}
            aria-label={`Open image ${i + 1}`}
          >
            <img
              src={src}
              alt={`Gallery ${i + 1}`}
              loading={i > 5 ? "lazy" : "eager"}
            />
            <div className="tile-hover"><span>View</span></div>
          </figure>
        ))}
      </div>

      {/* Lightbox */}
      {openIndex != null && (
        <div
          className="lightbox"
          role="dialog"
          aria-modal="true"
          onClick={() => setOpenIndex(null)}
        >
          <button
            className="lb-close"
            onClick={(e) => {
              e.stopPropagation();
              setOpenIndex(null);
            }}
            aria-label="Close"
          >
            ×
          </button>

          <button
            className="lb-arrow lb-left"
            onClick={(e) => {
              e.stopPropagation();
              setOpenIndex(
                (i) => (i - 1 + IMAGES.length) % IMAGES.length
              );
            }}
            aria-label="Previous image"
          >
            ‹
          </button>

          <img
            className="lb-image"
            src={IMAGES[openIndex]}
            alt={`Gallery ${openIndex + 1}`}
            onClick={(e) => e.stopPropagation()}
          />

          <button
            className="lb-arrow lb-right"
            onClick={(e) => {
              e.stopPropagation();
              setOpenIndex((i) => (i + 1) % IMAGES.length);
            }}
            aria-label="Next image"
          >
            ›
          </button>
        </div>
      )}

      {/* Keep your existing styles; add our extras below */}
      <style jsx>{`
        .wrap {
          max-width: 1280px;
          margin: 0 auto;
          padding: 48px 20px;
          display: grid;
          grid-template-columns: 300px 1fr;
          gap: 32px;
        }

        .intro {
          position: sticky;
          top: 24px;
          align-self: start;
        }
        .title {
          margin: 0 0 12px;
          font-size: clamp(28px, 4vw, 40px);
          line-height: 1.1;
          font-weight: 700;
        }
        .lede {
          margin: 0 0 18px;
          font-size: 16px;
          line-height: 1.6;
          color: #333;
        }
        .cta {
          display: inline-block;
          padding: 10px 16px;
          border-radius: 6px;
          background: #2f8a3b;
          color: #fff;
          text-decoration: none;
          font-weight: 600;
          transition: transform 0.06s ease, opacity 0.2s ease;
        }
        .cta:hover { opacity: 0.92; }
        .cta:active { transform: translateY(1px); }

        .grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 8px;
          align-content: start;
          justify-items: center; /* center tiles within their grid cells */
        }
        .tile {
          position: relative;
          width: 100%;
          aspect-ratio: 1 / 1;
          overflow: hidden;
          border-radius: 4px;
          background: #eee;

          /* extras */
          cursor: zoom-in;
          outline: none;
        }
        .tile img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;

          /* extras */
          transform: translateZ(0);
          transition: transform 220ms ease, filter 220ms ease;
        }

        /* Hover overlay (new) */
        .tile-hover {
          position: absolute;
          inset: 0;
          display: grid;
          place-items: center;
          background: linear-gradient(to top, rgba(0,0,0,.45), rgba(0,0,0,.05));
          opacity: 0;
          color: #fff;
          font-weight: 600;
          letter-spacing: .3px;
          transition: opacity 180ms ease;
        }
        .tile:hover img,
        .tile:focus img { transform: scale(1.035); filter: brightness(0.85); }
        .tile:hover .tile-hover,
        .tile:focus .tile-hover { opacity: 1; }

        /* Lightbox (new) */
        .lightbox {
          position: fixed;
          inset: 0;
          background: rgba(0,0,0,.92);
          display: grid;
          place-items: center;
          z-index: 9999;
          cursor: zoom-out;
          animation: lb-fade .12s ease-out;
        }
        @keyframes lb-fade { from { opacity: 0 } to { opacity: 1 } }

        .lb-image {
          max-width: 95vw;
          max-height: 88vh;
          object-fit: contain;
          box-shadow: 0 20px 80px rgba(0,0,0,.6);
          border-radius: 8px;
          cursor: default;
        }

        .lb-arrow {
          position: fixed;
          top: 50%;
          transform: translateY(-50%);
          width: 56px;
          height: 56px;
          border-radius: 50%;
          border: none;
          background: rgba(255,255,255,.15);
          color: #fff;
          font-size: 40px;
          line-height: 56px;
          text-align: center;
          cursor: pointer;
          transition: background 120ms ease, transform 120ms ease;
        }
        .lb-arrow:hover { background: rgba(255,255,255,.25); transform: translateY(-50%) scale(1.04); }
        .lb-left { left: 20px; }
        .lb-right { right: 20px; }

        .lb-close {
          position: fixed;
          top: 14px;
          right: 16px;
          width: 38px;
          height: 38px;
          border: none;
          border-radius: 8px;
          background: rgba(255,255,255,.12);
          color: #fff;
          font-size: 28px;
          line-height: 38px;
          cursor: pointer;
        }
        .lb-close:hover { background: rgba(255,255,255,.22); }

        @media (max-width: 1024px) {
          .wrap { grid-template-columns: 1fr; }
          .intro { position: static; }
        }
        @media (max-width: 640px) {
           .grid {
+           grid-template-columns: repeat(2, minmax(0, 1fr));
+           justify-items: center;
+         }
+         .tile {
+           max-width: 420px;
+         }
        }
      `}</style>
    </section>
  );
}
