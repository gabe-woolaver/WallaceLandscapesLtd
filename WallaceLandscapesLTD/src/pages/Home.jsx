// src/pages/Home.jsx
import { useEffect, useRef } from "react";

/* Make sure these files are inside /public (case-sensitive) */
const HERO_IMG  = "/wallace-hero-opener.jpg";
const INTRO_IMG = "/WhatsApp%20Image%202025-08-13%20at%205.43.14%20PM.jpeg";
const BAND_IMG  = "/WhatsApp%20Image%202025-08-13%20at%205.43.14%20PM%20(1).jpeg";
const ABOUT_IMG = "/wallace-logo-transparent.png";

export default function Home() {
  const bandImgRef = useRef(null);
  const bandRef = useRef(null);

  // Subtle scroll motion for the band image (not parallax; it keeps the same size)
  useEffect(() => {
    const img = bandImgRef.current;
    const band = bandRef.current;
    if (!img || !band) return;

    let rafId = 0;

    const onScroll = () => {
      // How far the band is from the top of the viewport
      const rect = band.getBoundingClientRect();
      // normalize progress -1 to 1 while the band passes the viewport
      const vh = window.innerHeight || 1;
      const progress = Math.max(-1, Math.min(1, 1 - (rect.top + rect.height / 2) / vh));
      // Move a few pixels based on progress (light effect)
      const y = progress * 12; // ~ -12px..+12px range
      img.style.transform = `translate3d(0, ${y}px, 0)`;
    };

    const loop = () => {
      onScroll();
      rafId = requestAnimationFrame(loop);
    };

    rafId = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(rafId);
  }, []);

  return (
    <>
      {/* ---------- HERO ---------- */}
      <section id="home" className="hero" aria-label="Opener">
        {/* This sentinel is used by the Header to decide transparency */}
        <div
          id="hero-sentinel"
          aria-hidden="true"
          style={{ position: "absolute", inset: "0 0 auto 0", height: 1 }}
        />
        <div
          className="hero-static"
          style={{ backgroundImage: `url(${HERO_IMG})` }}
          role="img"
          aria-label="Landscape hero"
        />
        <div className="hero-overlay">
          <h1 className="hero-heading">Wallace Landscapes</h1>
          {/* extra gap to separate from title */}
          <a className="button hero-cta" href="/contact">Get started today</a>
        </div>
        <style>{`
          .hero-cta{ margin-top: clamp(2rem, 4.5vw, 3.5rem); }
        `}</style>
      </section>

      {/* ---------- INTRO (left image + right copy) ---------- */}
      <section className="container padding-block intro-slab">
        <div className="intro-grid">
          <figure className="intro-media">
            <img
              src={INTRO_IMG}
              alt="Completed Wallace Landscapes project"
              loading="lazy"
            />
          </figure>

          <div className="intro-copy">
            <h2 className="section-title">Built for Beautiful, Lasting Spaces</h2>
            <p className="lead" style={{ marginBottom: "1rem" }}>
              From lush lawns, welcoming walkways, and engineered retaining
              walls to storm-water solutions, tranquil water features, and
              thorough seasonal clean-ups—our team has the skills and
              specialized equipment to handle even the most challenging sites.
              Whether it’s routine maintenance, seasonal service, or a
              large-scale landscape transformation, we focus on results that
              exceed expectations.
            </p>
            <p className="lead">
              We believe your outdoor space should feel like a natural
              extension of your home or business—a place that reflects your
              style, fits your needs, and grows in value over time. That’s why
              we partner with you from concept to completion, tailoring every
              detail so each project is as unique as the people we serve.
            </p>
          </div>
        </div>

        <style>{`
          .intro-slab { position: relative; }
          .intro-grid {
            display: grid;
            grid-template-columns: 1.15fr 1fr;
            gap: clamp(1rem, 3vw, 2rem);
            align-items: center;
          }
          .intro-media img{
            width:100%;
            height:auto;
            display:block;
            border-radius:16px;
            box-shadow: 0 10px 30px rgba(0,0,0,.12);
            object-fit: contain; /* show entire WhatsApp image; no cropping */
          }
          .intro-copy .section-title{
            margin-top:0;
            margin-bottom:.25rem;
          }
          @media (max-width: 980px){
            .intro-grid{ grid-template-columns: 1fr; }
          }
        `}</style>
      </section>

      {/* ---------- FULL-WIDTH BAND (entire image visible + subtle scroll motion) ---------- */}
      <section ref={bandRef} className="image-band" aria-label="Feature image">
        <img
          ref={bandImgRef}
          src={BAND_IMG}
          alt="Landscape band"
          loading="lazy"
        />
        <style>{`
          .image-band{
            width:100%;
            display:block;
            overflow:hidden;
            min-height: clamp(260px, 45vh, 520px);
            background: #fff;
          }
          .image-band img{
            width:100%;
            height:auto;
            display:block;
            object-fit: contain;     /* show the entire image (no crop) */
            will-change: transform;  /* smooth transform */
            transition: transform 80ms linear;
          }
        `}</style>
      </section>

      {/* ---------- ABOUT US ---------- */}
      <section id="about" className="container padding-block about-slab">
        <div className="about-grid">
          <div className="about-copy">
            <h2 className="about-title">ABOUT US</h2>
            <p className="about-lead">
              At Wallace Landscapes, we care for and build your green assets
              with quality, precision, and lasting beauty. We serve homeowners
              and businesses across HRM, combining years of hands-on experience
              with a passion for outdoor spaces that truly thrive.
            </p>
            <p className="about-lead">
              Our team includes two Red Seal certified professionals—one focused
              on softscape and hardscape construction (including ponds, water
              features, and storm-water systems) and the other dedicated to
              landscape maintenance. This combined expertise means every project,
              from new installations to ongoing care, is delivered with
              craftsmanship and attention to detail.
            </p>
          </div>

          <figure className="about-media">
            <img src={ABOUT_IMG} alt="Wallace Landscapes" loading="lazy" />
          </figure>
        </div>

        <style>{`
          .about-slab { position: relative; }
          .about-grid{
            display:grid;
            grid-template-columns: 1.2fr 0.8fr;
            gap: clamp(1.25rem, 4vw, 3rem);
            align-items:center;
          }
          .about-title{
            font-size: clamp(1.8rem, 2.6vw, 2.5rem);
            letter-spacing:.04em;
            color: #204390;
            margin: 0 0 0.75rem 0;
          }
          .about-lead{
            font-size: clamp(1rem, 1.2vw, 1.15rem);
            line-height: 1.8;
            color: #445;
            margin: 0 0 0.9rem 0;
          }
          .about-media img{
            width: 100%;
            height: auto;
            display:block;
            object-fit: contain;
            filter: drop-shadow(0 10px 24px rgba(0,0,0,.08));
          }
          @media (max-width: 980px){
            .about-grid{ grid-template-columns: 1fr; }
            .about-media{ order:-1; }
          }
        `}</style>
      </section>
    </>
  );
}
