// src/pages/Home.jsx
import { useEffect } from "react";
import { Link } from "react-router-dom";
import Reviews from "./Reviews.jsx";
import Services from "./Services.jsx";

/* Always load from the BASE URL so it works on GitHub Pages */
const BASE = import.meta.env.BASE_URL || "/";
const HERO_IMG  = `${BASE}wallace-hero-opener.jpg`;
const INTRO_IMG = `${BASE}WhatsApp%20Image%202025-08-13%20at%205.43.14%20PM.jpeg`;
const BAND_IMG  = `${BASE}WhatsApp%20Image%202025-08-13%20at%205.43.14%20PM%20(1).jpeg`;
const ABOUT_IMG = `${BASE}wallace-logo-transparent.png`;

export default function Home() {
  useEffect(() => {}, []);

  return (
    <>
      {/* ---------- HERO ---------- */}
      <section id="home" className="hero" aria-label="Opener">
        <div id="hero-sentinel" aria-hidden="true"
             style={{ position:"absolute", inset:"0 0 auto 0", height:1 }} />
        <div className="hero-static" style={{ backgroundImage:`url(${HERO_IMG})` }}
             role="img" aria-label="Landscape hero" />
        <div className="hero-overlay">
          <h1 className="hero-heading">Wallace Landscapes</h1>
          <Link className="button hero-cta" to="/contact">Get started today</Link>
        </div>
        <style>{`
          .hero{ position:relative; block-size:92vh; min-block-size:560px; isolation:isolate; overflow:hidden }
          .hero-static{ position:absolute; inset:0; background-size:cover; background-position:center; }
          .hero-static::after{ content:""; position:absolute; inset:0; background:linear-gradient(to bottom, rgba(0,0,0,.35), rgba(0,0,0,.35)); }
          .hero-overlay{ position:absolute; inset:0; display:grid; place-content:center; text-align:center; color:#fff; padding:1rem; gap:1rem }
          .hero-heading{ font-size:clamp(2rem, 4vw + 1rem, 3.8rem); line-height:1.05; margin:0; text-shadow:0 2px 12px rgba(0,0,0,.35) }
          .hero-cta{ margin-top: clamp(2rem, 4.5vw, 3.5rem) }
        `}</style>
      </section>

      {/* ---------- INTRO ---------- */}
      <section className="container padding-block intro-slab">
        <div className="intro-grid">
          <figure className="intro-media">
            <img src={INTRO_IMG} alt="Completed Wallace Landscapes project" loading="lazy" />
          </figure>
          <div className="intro-copy">
            <h2 className="section-title">Built for Beautiful, Lasting Spaces</h2>
            <p className="lead" style={{ marginBottom: "1rem" }}>
              From lush lawns, welcoming walkways, and engineered retaining walls to storm-water
              solutions, tranquil water features, and thorough seasonal clean-ups—our team has the
              skills and equipment to handle even the most challenging sites. Whether it’s routine
              maintenance, seasonal service, or a large-scale landscape transformation, we focus on
              results that exceed expectations.
            </p>
            <p className="lead">
              We believe your outdoor space should feel like a natural extension of your home or
              business—a place that reflects your style, fits your needs, and grows in value over
              time. That’s why we partner with you from concept to completion, tailoring every
              detail so each project is as unique as the people we serve.
            </p>
          </div>
        </div>

        <style>{`
          .padding-block{ padding-block:5rem }
          .lead{ font-size:1.1rem; color:var(--muted) }
          .section-title{ font-size:2rem; margin:0 0 1rem }
          .intro-grid{ display:grid; grid-template-columns:1.15fr 1fr; gap:clamp(1rem, 3vw, 2rem); align-items:center }
          .intro-media img{ width:100%; height:auto; border-radius:16px; box-shadow: 0 10px 30px rgba(0,0,0,.12); object-fit:contain }
          .intro-copy .section-title{ margin-top:0; margin-bottom:.25rem }
          @media (max-width: 980px){ .intro-grid{ grid-template-columns:1fr; } }
        `}</style>
      </section>

      {/* ---------- FULL-WIDTH BAND ---------- */}
      <section className="image-band" aria-label="Feature image">
        <img src={BAND_IMG} alt="Landscape band" loading="lazy" width="2400" height="1200" />
        <style>{`
          .image-band{ width:100%; display:block; overflow:hidden; min-height: clamp(260px, 45vh, 520px) }
          .image-band img{ width:100%; height:auto; object-fit:contain; display:block }
        `}</style>
      </section>

      {/* ---------- ABOUT US ---------- */}
      <section id="about" className="container padding-block about-slab">
        <div className="about-grid">
          <div className="about-copy">
            <h2 className="about-title">About Us</h2>
            <p className="about-lead">
              At Wallace Landscapes, we care for and build your green assets with quality, precision,
              and lasting beauty. We serve homeowners and businesses across HRM, combining years of
              hands-on experience with a passion for outdoor spaces that truly thrive.
            </p>
            <p className="about-lead">
              Our team includes two Red Seal certified professionals, one focused on softscape and one focused on
              hardscape construction (including ponds, water features, and storm-water systems). This combined expertise means every
              project, from new installations to ongoing care, is delivered with craftsmanship and
              attention to detail.
            </p>
          </div>
          <figure className="about-media">
            <img src={ABOUT_IMG} alt="Wallace Landscapes" loading="lazy" />
          </figure>
        </div>

        <style>{`
          .about-grid{ display:grid; grid-template-columns:1.2fr .8fr; gap:clamp(1.25rem, 4vw, 3rem); align-items:center }
          .about-title{ font-size:clamp(1.8rem, 2.6vw, 2.5rem); letter-spacing:.04em; color:#00008; margin:0 0 .75rem 0 }
          .about-lead{ font-size:clamp(1rem, 1.2vw, 1.15rem); line-height:1.8; color:#445; margin:0 0 .9rem 0 }
          .about-media img{ width:100%; height:auto; object-fit:contain; filter:drop-shadow(0 10px 24px rgba(0,0,0,.08)); }
          @media (max-width: 980px){ .about-grid{ grid-template-columns:1fr; } .about-media{ order:-1; } }
        `}</style>
      </section>

      {/* ---------- REVIEWS ---------- */}
      <Reviews
        reviews={[
          {
            text:
              "This is the first year we have engaged a lawn care company to maintain our large urban property. My husband has cut lawns professionally since he was 17 and he is now 75. His expectations for perfection are very high. Liddy and her crew met every criteria.",
            author: "G. Saunders",
          },
          {
            text:
              "We are very happy with the work done by Wallace Landscaping. In addition to their seasonal cutting, trimming and cleanup we have found their knowledge and advice for garden design to be very helpful. We highly recommend Wallace Landscaping for excellent service.",
            author: "M. & T. Tynes",
          },
          {
            text:
              "Wallace Landscaping just completed a renovation of existing gardens and created a beautiful new garden for us. We are so happy with the work they did for us. Their team were great to have here and they completed the work quickly, transforming our yard in the process. We would highly recommend them for your landscaping needs.",
            author: "P. Lowe",
          },
          {
            text:
              "We required our patio stones to be re-levelled. It consisted of 35, 2 sq. ft. Stones. Wallace staff were friendly, extremely accurate and very efficient with their work. The entire job was completed in a single day with excellent results and at a competitive price. I highly recommend them.",
            author: "R. Brunt",
          },
          {
            text:
              "The Wallace landscaping team were very hard working, knowledgeable and dedicated to doing the best job possible. The garden cleanup, pruning, weeding and planting some new plants was very well done and we were amazed by all the work they put into removing the old lawn and installing a new lawn. We have received many compliments on their work and how lovely our property looks. Kudos to Wallace Landscaping. We highly recommend them.",
            author: "V. Henrikson",
          },
        ]}
      />

      {/* ---------- OUR SERVICES ---------- */}
      <Services />
    </>
  );
}
