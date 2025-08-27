// src/components/Reviews.jsx
import { useEffect, useRef, useState } from "react";

/**
 * Minimal, style-friendly carousel:
 * - Auto-advance every 10s
 * - Prev/Next arrows
 * - No copy changes; just renders provided text
 */
export default function Reviews({ reviews }) {
  const [idx, setIdx] = useState(0);
  const timerRef = useRef(null);
  const total = reviews.length;

  useEffect(() => {
    start();
    return stop;
  }, [idx, total]);

  function start() {
    stop();
    timerRef.current = setInterval(() => {
      setIdx((i) => (i + 1) % total);
    }, 10000);
  }
  function stop() {
    if (timerRef.current) clearInterval(timerRef.current);
  }

  const go = (delta) => setIdx((i) => (i + delta + total) % total);

  return (
    <section className="wl-reviews" aria-label="Customer reviews">
      <div className="container wl-rev-wrap" role="region" aria-roledescription="carousel" aria-live="polite">
        <button className="wl-rev-nav wl-prev" aria-label="Previous review" onClick={() => go(-1)}>&lsaquo;</button>

        <figure className="wl-rev-card" key={idx}>
          <blockquote className="wl-rev-quote">“{reviews[idx].text}”</blockquote>
          <figcaption className="wl-rev-author">— {reviews[idx].author}</figcaption>
          <div className="wl-rev-pager">{idx + 1} / {total}</div>
        </figure>

        <button className="wl-rev-nav wl-next" aria-label="Next review" onClick={() => go(1)}>&rsaquo;</button>
      </div>

      {/* Scoped styles: matches your site spacing/typography */}
      <style>{`
        .wl-reviews{ background:#214718; color:#fff; padding: clamp(3rem, 6vw, 5rem) 0; }
        .wl-rev-wrap{ position:relative; display:grid; grid-template-columns: auto 1fr auto; align-items:center; gap: 12px; }
        .wl-rev-card{ margin:0 auto; text-align:center; max-inline-size: min(70ch, 90vw); }
        .wl-rev-quote{ margin:0 0 .85rem; line-height:1.85; font-size: clamp(1rem, 1.2vw + .8rem, 1.25rem); }
        .wl-rev-author{ font-weight: 700; opacity:.95; }
        .wl-rev-pager{ margin-top:.6rem; opacity:.85; font-weight:600; letter-spacing:.06em; }
        .wl-rev-nav{ background:transparent; border:0; color:#fff; font-size: 2rem; padding:.4rem .6rem; cursor:pointer; border-radius: 8px; }
        .wl-rev-nav:hover, .wl-rev-nav:focus{ outline:none; background: rgba(255,255,255,.1); }
        @media (max-width: 780px){
          .wl-rev-wrap{ grid-template-columns: 1fr; }
          .wl-prev, .wl-next{ position:absolute; top:50%; transform: translateY(-50%); }
          .wl-prev{ left: 8px; } .wl-next{ right: 8px; }
        }
      `}</style>
    </section>
  );
}
