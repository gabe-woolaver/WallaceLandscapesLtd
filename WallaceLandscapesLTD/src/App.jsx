// src/App.jsx
import { useEffect, useState } from "react";
import { Routes, Route, Link, useLocation } from "react-router-dom";
import Home from "./pages/Home.jsx";
import Gallery from "./pages/Gallery.jsx";
import Contact from "./pages/Contact.jsx";

const scrollToId = (id) =>
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

// Base URL for all /public assets (works locally and on GH Pages)
const BASE = import.meta.env.BASE_URL || "/";

/* ---------------- Header ---------------- */
function Header() {
  const [atTop, setAtTop] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const isHome = location.pathname === "/";

  useEffect(() => {
    document.title = "Wallace Landscapes Ltd.";
  }, []);

  useEffect(() => setMenuOpen(false), [location.pathname]);

  useEffect(() => {
    if (!isHome) { setAtTop(false); return; }
    const el = document.querySelector("#hero-sentinel");
    if (!el) { setAtTop(false); return; }

    const io = new IntersectionObserver(
      ([entry]) => setAtTop(entry.isIntersecting),
      { threshold: 0.01 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [isHome]);

  return (
    <header className={`site-header ${atTop ? "at-top" : "scrolled"}`}>
      <nav className="container nav-row" aria-label="Primary">
        <Link className="brand" to="/" aria-label="Wallace Landscapes home">
          <img
            src={`${BASE}wallace-logo-transparent.png`}
            alt=""
            className="logo"
            width="80"
            height="80"
          />
          <span className="brand-name">Wallace Landscapes</span>
        </Link>

        <button
          className="menu-toggle"
          aria-expanded={menuOpen}
          aria-controls="menu"
          onClick={() => setMenuOpen((v) => !v)}
        >
          <span />
          <span />
          <span />
        </button>

        <div className={`right-cluster ${menuOpen ? "open" : ""}`} id="menu">
          <ul className="nav-links" role="list">
            <li><Link to="/" onClick={() => scrollToId("home")}>Home</Link></li>
            <li><a href={`${BASE}#about`}>About</a></li>
            <li><a href={`${BASE}#services`}>Services</a></li>
            <li><Link to="/gallery">Gallery</Link></li>
            <li><Link to="/contact">Contact</Link></li>
          </ul>

          <div className="header-actions">
            <a
              href="https://www.facebook.com/wallacelandscapesltd/"
              target="_blank" rel="noopener noreferrer"
              aria-label="Facebook" className="social-link instagram" title="Facebook"
            >
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M22 12a10 10 0 1 0-11.6 9.9v-7h-2.3V12h2.3v-2.2c0-2.3 1.4-3.6 3.5-3.6 1 0 2 .18 2 .18v2.2h-1.1c-1.1 0-1.5.69-1.5 1.4V12h2.6l-.41 2.9h-2.2v7A10 10 0 0 0 22 12z"/>
              </svg>
            </a>
            <a
              href="https://www.instagram.com/wallacelandscapesltd/"
              target="_blank" rel="noopener noreferrer"
              aria-label="Instagram" className="social-link" title="Instagram"
            >
              <img
                src={`${BASE}instaLogo.png`}
                alt="" aria-hidden="true"
                width="20" height="20"
                decoding="async"
               /> 
            </a>
            <a href="tel:+19024414374" className="icon-button phone" aria-label="Call us">
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M6.62 10.79a15.05 15.05 0 0 0 6.59 6.59 1 1 0 0 0 1-.25l2.2-2.2a1 1 0 0 1 1-.24 11.36 11.36 0 0 0 3.56.57 1 1 0 0 1 1 1V20a1 1 0 0 1-1 1A17.93 17.93 0 0 1 3 5a1 1 0 0 1 1-1h3.74a1 1 0 0 1 1 1 11.36 11.36 0 0 0 .57 3.56 1 1 0 0 1-.24 1.01z"/>
              </svg>
            </a>
          </div>
        </div>
      </nav>

      {/* Scoped header CSS */}
      <style>{`
        .site-header{
          position:fixed; inset:0 0 auto 0; z-index:1000;
          border-bottom:1px solid transparent;
          transition: background-color .25s ease, border-color .25s ease, box-shadow .25s ease;
          will-change: background-color;
        }
        .nav-row{ display:flex; align-items:center; gap:16px; min-height: var(--header-h); }
        .brand{ display:flex; align-items:center; gap:.75rem; text-decoration:none }
        .logo{ inline-size: clamp(54px, 7.8vw, 72px); aspect-ratio:1/1; object-fit:contain }
        .brand-name{ font-weight:800; letter-spacing:.02em; white-space:nowrap }

        .menu-toggle{ display:none; background:none; border:0; cursor:pointer; padding:8px; margin-left:auto; }
        .menu-toggle span{ display:block; width:22px; height:2px; background:#111; margin:4px 0; border-radius:2px; }

        .right-cluster{ margin-left:auto; display:flex; align-items:center; gap: clamp(.75rem, 2.2vw, 1.25rem); }
        .nav-links{ display:flex; gap: clamp(.6rem, 2.2vw, 1.6rem); margin:0; padding:0; list-style:none }
        .nav-links a{ font-weight:800; text-decoration:none; letter-spacing:.06em }

        .header-actions{ display:flex; align-items:center; gap:.5rem }
        .social-link, .icon-button{
          inline-size:40px; block-size:40px; display:grid; place-items:center;
          border-radius:999px; border:1px solid rgba(0,0,0,.06); background:#fff;
          box-shadow: var(--shadow); text-decoration:none;
        }
        .social-link img, .icon-button img{
          inline-size: 40px;
          block-size: 40px;
          display: block;
          object-fit: contain;
      }

        /* TOP of Home: transparent + white text */
        .site-header.at-top{ background:transparent; border-color:transparent; box-shadow:none; }
        .site-header.at-top .brand-name, .site-header.at-top .nav-links a{ color:#fff; text-shadow:0 2px 12px rgba(0,0,0,.25); }
        .site-header.at-top .menu-toggle span{ background:#fff; }
        .site-header.at-top .social-link, .site-header.at-top .icon-button{
          background:rgba(255,255,255,.92); border-color:rgba(255,255,255,0);
        }

        /* Scrolled: solid background + dark text */
        .site-header.scrolled{ background:#fff; border-color:#e5e7eb; box-shadow:0 6px 24px rgba(0,0,0,.05); }
        .site-header.scrolled .brand-name, .site-header.scrolled .nav-links a{ color:#111; text-shadow:none; }
        .site-header.scrolled .menu-toggle span{ background:#111; }
        .site-header.scrolled .social-link, .site-header.scrolled .icon-button{
          background:#fff; border-color:#e5e7eb;
        }

        /* Mobile */
        @media (max-width:980px){
          .brand-name{ display:none; }
          .menu-toggle{ display:block; }
          .right-cluster{
            position:fixed; inset:var(--header-h) 0 auto 0; background:#fff;
            transform:translateY(-110%); opacity:0; pointer-events:none;
            display:grid; gap:12px; padding:14px 16px; box-shadow:0 10px 20px rgba(0,0,0,.08);
            transition:transform .2s ease, opacity .2s ease;
          }
          .site-header.at-top .right-cluster{ background:#fff; } /* dropdown stays readable */
          .site-header.at-top .right-cluster .nav-links a{ color:#111; text-shadow:none; } /* ensure contrast on white menu */
          .right-cluster.open{ transform:translateY(0); opacity:1; pointer-events:auto; }
          .nav-links{ flex-direction:column; gap:10px; }
        }
      `}</style>
    </header>
  );
}

/* ---------------- Footer ---------------- */
function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-grid">
        <div>
          <img src={`${BASE}wallace-logo-transparent.png`} alt="Company logo" className="logo small" />
          <p className="muted">
  <a href="mailto:WallaceLandscapesLTD@gmail.com">WallaceLandscapesLTD@gmail.com</a>
</p>

          <p className="muted">Transforming outdoor spaces since 2019.</p>
        </div>
        <nav aria-label="Footer">
          <ul className="footer-nav" role="list">
            <li><Link to="/">Home</Link></li>
            <li><a href={`${BASE}#about`}>About</a></li>
            <li><a href={`${BASE}#services`}>Services</a></li>
            <li><Link to="/gallery">Gallery</Link></li>
            <li><Link to="/contact">Contact</Link></li>
          </ul>
        </nav>
        <div>
          <a className="button" href="tel:+19024414374">Call 902-441-4374</a>
        </div>
      </div>
      <style>{`
        .site-footer{ background:#0e1a0e; color:#cbd5c7; padding: clamp(2.2rem, 5vw, 3rem) 0 }
        .footer-grid{ display:grid; grid-template-columns: 1fr auto auto; align-items:center; gap:1rem }
        .footer-nav{ display:flex; gap:1rem; margin:0; padding:0; list-style:none }
        .footer-nav a{ color:#cbd5c7; text-decoration:none; font-weight:700 }
        .logo.small{ inline-size:56px; }
        .site-footer .muted a,
        .site-footer .muted a:visited { color: inherit; }
        .site-footer .muted a:hover { color: inherit; text-decoration: underline; }
        @media (max-width: 900px){
          .footer-grid{ grid-template-columns:1fr; text-align:center; gap:1rem }
          .footer-nav{ justify-content:center; flex-wrap:wrap }
        }
      `}</style>
    </footer>
  );
}

/* ---------------- App Shell ---------------- */
export default function App() {
  const location = useLocation();
  const isHome = location.pathname === "/";

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <>
      <Header />
      {/* No top padding on Home so hero sits behind transparent header */}
      <main id="main-content" tabIndex="-1" style={{ paddingTop: isHome ? "0px" : "var(--header-h)" }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </main>
      <Footer />
    </>
  );
}
