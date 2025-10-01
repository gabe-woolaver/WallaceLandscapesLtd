// src/components/Services.jsx
import React from "react";

// Import service photos
import constructionImg from "../assets/construction.jpg";
import plantingImg from "../assets/Planting.jfif";
import waterImg from "../assets/Sodding.jpg";
import maintenanceImg from "../assets/maintenance.jfif";

export default function Services() {
  return (
    <section id="services" className="container padding-block wl-services" aria-labelledby="services-title">
      <header className="wl-services-header">
        <h2 id="services-title" className="wl-services-title">Our Services</h2>
        <p className="wl-services-sub">
          Wallace Landscapes offers a comprehensive range of professional landscaping services to
          enhance, maintain, and transform your outdoor spaces. From durable structures and lush
          plantings to smart water management and reliable upkeep, we tailor every project to your needs.
        </p>
      </header>

      <div className="wl-svc-grid">
        {/* 1. Hardscaping and Construction */}
        <article className="wl-svc-row">
          <figure className="wl-svc-media">
            <img src={constructionImg} alt="Hardscaping and Construction" />
          </figure>
          <div className="wl-svc-copy">
            <h3 className="wl-svc-title">Hardscaping and Construction</h3>
            <p className="wl-svc-lead">
              Built to last, precise installation and clean finishes that look great and perform for years.
            </p>
            <ul className="wl-svc-list">
              <li><strong>Walkway’s & Patio’s</strong> — Attractive, durable surfaces for everyday use and outdoor living.</li>
              <li><strong>Retaining Walls</strong> — Engineered strength with a refined, cohesive look for grades and gardens.</li>
              <li><strong>Grading & Drainage</strong> — Proper slopes and water control to protect structures and landscapes.</li>
            </ul>
          </div>
        </article>

        {/* 2. Planting and Garden Enhancements (flipped) */}
        <article className="wl-svc-row flip">
          <figure className="wl-svc-media">
            <img src={plantingImg} alt="Planting and Garden Enhancements" />
          </figure>
          <div className="wl-svc-copy">
            <h3 className="wl-svc-title">Planting and Garden Enhancements</h3>
            <p className="wl-svc-lead">
              Healthy, vibrant plantings that suit your site conditions and design goals.
            </p>
            <ul className="wl-svc-list">
              <li><strong>Planting & Mulching</strong> — Strong starts with rich soils and clean, protective finishes.</li>
              <li><strong>Seasonal Planting & Container Gardens</strong> — Fresh color and interest throughout the year.</li>
              <li><strong>Tree & Shrub Care</strong> — Pruning, planting, and health management for woody plants.</li>
              <li><strong>Sodding</strong> — Fast, professional lawn installation for instant greenery.</li>
            </ul>
          </div>
        </article>

        {/* 3. Water and Environmental Management */}
        <article className="wl-svc-row">
          <figure className="wl-svc-media">
            <img src={waterImg} alt="Water and Environmental Management" />
          </figure>
          <div className="wl-svc-copy">
            <h3 className="wl-svc-title">Water and Environmental Management</h3>
            <p className="wl-svc-lead">
              Practical systems that move, manage, and reuse water while protecting your property.
            </p>
            <ul className="wl-svc-list">
              <li><strong>Water Features</strong> — Ponds, fountains, and pondless waterfalls with professional care.</li>
              <li><strong>Stormwater Management</strong> — Routing, capture, and infiltration to handle runoff.</li>
              <li><strong>Erosion Control</strong> — Stabilization to prevent soil loss and protect investments.</li>
              <li><strong>On-site Compost Management</strong> — Sustainable practices that boost soil health naturally.</li>
            </ul>
          </div>
        </article>

        {/* 4. Landscape Maintenance and Cleanup (flipped) */}
        <article className="wl-svc-row flip">
          <figure className="wl-svc-media">
            <img src={maintenanceImg} alt="Landscape Maintenance and Cleanup" />
          </figure>
          <div className="wl-svc-copy">
            <h3 className="wl-svc-title">Landscape Maintenance and Cleanup</h3>
            <p className="wl-svc-lead">
              Our maintenance and cleanup services are top-notch, including tidy crews, clear communication,
              and dependable scheduling to keep your property looking its best in every season.
            </p>
          </div>
        </article>
      </div>

      <style>{`
        .wl-services-header{ text-align:center; max-width:72ch; margin-inline:auto; margin-bottom: clamp(1.5rem, 3vw, 2rem); }
        .wl-services-title{ margin:0 0 .35rem 0; font-size: clamp(1.8rem, 2.8vw, 2.4rem); }
        .wl-services-sub{ margin:0; color: var(--muted); line-height:1.8; }

        .wl-svc-grid{ display:grid; gap: clamp(1.25rem, 3vw, 1.75rem); }
        .wl-svc-row{ display:grid; grid-template-columns: 1.05fr .95fr; gap: clamp(1rem, 3vw, 2rem); align-items:center; }
        .wl-svc-row.flip{ grid-template-columns: .95fr 1.05fr; }
        .wl-svc-row.flip .wl-svc-media{ order:2; }
        .wl-svc-row.flip .wl-svc-copy{ order:1; }

        .wl-svc-media img{
          width:100%;
          height:100%;
          object-fit:cover;
          border-radius:14px;
          box-shadow:0 20px 40px rgba(0,0,0,.08);
        }

        .wl-svc-title{ margin:.1rem 0 .4rem; font-size: clamp(1.35rem, 2.2vw, 1.75rem); }
        .wl-svc-lead{ margin:0 0 .65rem 0; color:#445; line-height:1.8; }
        .wl-svc-list{ margin:.4rem 0 0 0; padding-left: 1.1rem; color:#333; line-height:1.85; }
        .wl-svc-list li{ margin:.25rem 0; }

        @media (max-width: 980px){
          .wl-svc-row, .wl-svc-row.flip{ grid-template-columns: 1fr; }
          .wl-svc-row.flip .wl-svc-media, .wl-svc-row.flip .wl-svc-copy{ order: initial; }
        }
      `}</style>
    </section>
  );
}
