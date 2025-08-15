import { useEffect, useState } from "react";
import { Routes, Route, Link, useLocation } from "react-router-dom";
import Home from "./pages/Home.jsx";
import Gallery from "./pages/Gallery.jsx";
import Contact from "./pages/Contact.jsx";

/* Smooth-scroll helper for same-page targets */
const scrollToId = (id) =>
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

/* ---------------- Header ---------------- */
function Header() {
  const [atTop, setAtTop] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const isHome = location.pathname === "/";

  // Smooth, jitter-free top detection: use scrollY with a small threshold
  useEffect(() => {
    const THRESHOLD = 20; // px: treat as "at top" only when within this
    const update = () => {
      // for non-home pages, always solid
      if (!isHome) {
        if (atTop) setAtTop(false);
        return;
      }
      const y = window.scrollY || window.pageYOffset || 0;
      const next = y < THRESHOLD;
      if (next !== atTop) setAtTop(next);
    };

    // set initial state and then listen
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update, { passive: true });
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [isHome, atTop]);

  // Close mobile menu when route changes
  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  const stateClass = isHome && atTop ? "at-top" : "scrolled";

  // Helpers for in-page links (About / Services)
  const handleInPage = (e, id) => {
    if (!isHome) {
      e.preventDefault();
      window.location.href = `/#${id}`;
    } else {
      e.preventDefault();
      scrollToId(id);
    }
    setMenuOpen(false);
  };

  return (
    <header className={`site-header ${stateClass}`}>
      <nav className="container nav-row" aria-label="Primary">
        {/* LEFT: Brand */}
        <Link className="brand" to="/" onClick={() => setMenuOpen(false)}>
          <img
            src="/wallace-logo-transparent.png"
            alt="Wallace Landscapes logo"
            className="logo"
            width="120"
            height="120"
          />
          <span className="brand-name">Wallace Landscapes Ltd</span>
        </Link>

        {/* RIGHT: Desktop links + socials */}
        <div className="right-cluster desktop-only">
          <ul className="nav-links" role="list">
            <li><Link to="/">Home</Link></li>
            <li><a href="#about" onClick={(e) => handleInPage(e, "about")}>About</a></li>
            <li><a href="#services" onClick={(e) => handleInPage(e, "services")}>Services</a></li>
            <li><Link to="/gallery">Gallery</Link></li>
            <li><Link to="/contact">Contact</Link></li>
          </ul>
          <div className="header-actions" aria-label="Social and phone">
            <a
              href="https://www.facebook.com/wallacelandscapesltd/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className="social-link"
              title="Facebook"
            >
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M22 12a10 10 0 1 0-11.6 9.9v-7h-2.3V12h2.3V9.8c0-2.3 1.4-3.5 3.4-3.5.98 0 2 .17 2 .17v2.2h-1.1c-1.1 0-1.5.69-1.5 1.4V12h2.6l-.41 2.9h-2.2v7A10 10 0 0 0 22 12z" />
              </svg>
            </a>
            <a
              href="https://www.instagram.com/wallacelandscapesltd/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="social-link"
              title="Instagram"
            >
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5zm5 5.5A5.5 5.5 0 1 1 6.5 13 5.5 5.5 0 0 1 12 7.5zm5.75-1.25a1 1 0 1 1-1 1 1 1 0 0 1 1-1z" />
              </svg>
            </a>
            <a href="tel:+19024414374" className="icon-button phone" aria-label="Call us">
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M6.62 10.79a15.05 15.05 0 0 0 6.59 6.59l2.2-2.2a1 1 0 0 1 1.01-.24 11.36 11.36 0 0 0 3.56.57 1 1 0 0 1 1 1V20a1 1 0 0 1-1 1A17 17 0 0 1 3 7a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1 11.36 11.36 0 0 0 .57 3.56 1 1 0 0 1-.24 1.01z" />
              </svg>
            </a>
          </div>
        </div>

        {/* RIGHT: Mobile hamburger */}
        <button
          className="menu-toggle mobile-only"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          aria-controls="mobile-drawer"
          onClick={() => setMenuOpen((v) => !v)}
        >
          {!menuOpen ? (
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M3 6h18v2H3zm0 5h18v2H3zm0 5h18v2H3z" />
            </svg>
          ) : (
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M18.3 5.7L12 12l6.3 6.3-1.4 1.4L10.6 13.4 4.3 19.7 2.9 18.3 9.2 12 2.9 5.7 4.3 4.3l6.3 6.3 6.3-6.3z" />
            </svg>
          )}
        </button>
      </nav>

      {/* MOBILE DRAWER */}
      <aside
        id="mobile-drawer"
        className={`mobile-drawer ${menuOpen ? "open" : ""}`}
        aria-hidden={!menuOpen}
      >
        <ul className="mobile-links" role="list">
          <li><Link to="/" onClick={() => setMenuOpen(false)}>Home</Link></li>
          <li><a href="/#about" onClick={(e) => handleInPage(e, "about")}>About</a></li>
          <li><a href="/#services" onClick={(e) => handleInPage(e, "services")}>Services</a></li>
          <li><Link to="/gallery" onClick={() => setMenuOpen(false)}>Gallery</Link></li>
          <li><Link to="/contact" onClick={() => setMenuOpen(false)}>Contact</Link></li>
        </ul>
        <div className="mobile-actions">
          <a
            href="https://www.facebook.com/wallacelandscapesltd/"
            target="_blank"
            rel="noopener noreferrer"
            className="social-link"
            aria-label="Facebook"
            title="Facebook"
            onClick={() => setMenuOpen(false)}
          >
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M22 12a10 10 0 1 0-11.6 9.9v-7h-2.3V12h2.3V9.8c0-2.3 1.4-3.5 3.4-3.5.98 0 2 .17 2 .17v2.2h-1.1c-1.1 0-1.5.69-1.5 1.4V12h2.6l-.41 2.9h-2.2v7A10 10 0 0 0 22 12z" />
            </svg>
          </a>
          <a
            href="https://www.instagram.com/wallacelandscapesltd/"
            target="_blank"
            rel="noopener noreferrer"
            className="social-link"
            aria-label="Instagram"
            title="Instagram"
            onClick={() => setMenuOpen(false)}
          >
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5zm5 5.5A5.5 5.5 0 1 1 6.5 13 5.5 5.5 0 0 1 12 7.5zm5.75-1.25a1 1 0 1 1-1 1 1 1 0 0 1 1-1z" />
            </svg>
          </a>
          <a href="tel:+19024414374" className="icon-button phone" aria-label="Call us" onClick={() => setMenuOpen(false)}>
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M6.62 10.79a15.05 15.05 0 0 0 6.59 6.59l2.2-2.2a1 1 0 0 1 1.01-.24 11.36 11.36 0 0 0 3.56.57 1 1 0 0 1 1 1V20a1 1 0 0 1-1 1A17 17 0 0 1 3 7a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1 11.36 11.36 0 0 0 .57 3.56 1 1 0 0 1-.24 1.01z" />
            </svg>
          </a>
        </div>
      </aside>

      {/* Header CSS */}
      <style>{`
        :root{
          --brand:#2b8a5e;
          --text:#111;
          --max:1200px;
          --shadow:0 10px 30px rgba(0,0,0,.06);
          --header-h:76px; /* header height */
        }
        .container{max-width:var(--max);margin-inline:auto;padding-inline:16px}

        /* Header base */
        .site-header{
          position:fixed; inset:0 0 auto 0; z-index:1000;
          transition: background-color .25s ease, border-color .25s ease, box-shadow .25s ease;
          border-bottom:1px solid transparent;
        }
        .nav-row{ display:flex; align-items:center; gap:16px; min-height:var(--header-h); }

        /* Brand (left) */
        .brand{display:flex; align-items:center; gap:.75rem; text-decoration:none}
        .logo{inline-size: clamp(48px, 6.8vw, 72px); aspect-ratio:1/1; object-fit:contain}
        .brand-name{font-weight:800; letter-spacing:.02em; white-space:nowrap}

        /* Right cluster (links + socials) */
        .right-cluster{ margin-left:auto; display:flex; align-items:center; gap: clamp(.75rem, 2.2vw, 1.25rem); }
        .nav-links{display:flex; gap: clamp(.6rem, 2.2vw, 1.6rem); margin:0; padding:0; list-style:none}
        .nav-links a{font-weight:800; text-decoration:none; letter-spacing:.06em}
        .header-actions{display:flex; align-items:center; gap:.5rem}
        .social-link, .icon-button{
          inline-size:40px; block-size:40px; display:grid; place-items:center;
          border-radius:999px; border:1px solid rgba(0,0,0,.06);
          box-shadow: var(--shadow); background:#fff; text-decoration:none;
        }
        .social-link svg, .icon-button svg{inline-size:20px; block-size:20px; fill:#111}

        /* TOP of Home — transparent header + white nav text */
        .site-header.at-top{ background-color: transparent; border-color: transparent; box-shadow:none; }
        .site-header.at-top .brand-name,
        .site-header.at-top .nav-links a{ color:#fff; text-shadow:0 2px 12px rgba(0,0,0,.25); }
        .site-header.at-top .social-link, .site-header.at-top .icon-button{
          background: rgba(255,255,255,.92); border-color: rgba(255,255,255,.0);
        }

        /* SCROLLED/other pages — white bg + dark text; SAME layout */
        .site-header.scrolled{ background-color:#fff; border-color:#e5e7eb; box-shadow:0 6px 24px rgba(0,0,0,.05); }
        .site-header.scrolled .brand-name, .site-header.scrolled .nav-links a{ color:#111; text-shadow:none; }
        .site-header.scrolled .social-link, .site-header.scrolled .icon-button{ background:#fff; border-color:#e5e7eb; }

        /* Apply top padding to <main> ONLY when header is scrolled */
        .site-header.scrolled + main{ padding-top: var(--header-h); }
        .site-header.at-top + main{ padding-top: 0; }

        /* Desktop vs mobile switches */
        .desktop-only{ display:flex; }
        .mobile-only{ display:none; }

        /* Hamburger button */
        .menu-toggle{
          margin-left:auto;
          inline-size:42px; block-size:42px; border-radius:999px; border:1px solid rgba(0,0,0,.06);
          background:#fff; display:grid; place-items:center; box-shadow:var(--shadow);
        }
        .menu-toggle svg{ inline-size:22px; block-size:22px; fill:#111 }

        /* Mobile drawer */
        .mobile-drawer{
          position:fixed; inset:var(--header-h) 0 0 auto; /* below header */
          background:rgba(255,255,255,.98);
          transform: translateY(-10px) translateX(100%);
          transition: transform .28s ease;
          z-index: 999;
          box-shadow: -10px 0 30px rgba(0,0,0,.15);
          padding: 14px 16px 24px;
          width:min(92vw, 360px);
          right:0;
          display:flex; flex-direction:column; gap:12px;
        }
        .mobile-drawer.open{ transform: translateY(-10px) translateX(0%); }

        .mobile-links{ list-style:none; padding:0; margin:0; display:grid; gap:10px; }
        .mobile-links a{
          display:block; padding:14px 10px; border-radius:12px;
          text-decoration:none; font-weight:800; color:#111; letter-spacing:.04em;
        }
        .mobile-links a:active{ background:#f2f4f7; }

        .mobile-actions{ display:flex; gap:10px; margin-top:6px; }
        .mobile-actions .social-link, .mobile-actions .icon-button{ inline-size:48px; block-size:48px; }
        .mobile-actions svg{ inline-size:22px; block-size:22px; }

        /* Responsive rules */
        @media (max-width: 960px){
          .brand-name{ font-size: clamp(.95rem, 2.2vw, 1.05rem); }
          .desktop-only{ display:none; }
          .mobile-only{ display:grid; }
        }
        @media (max-width: 680px){
          .brand-name{ display:none; }
        }
      `}</style>
    </header>
  );
}

/* ---------------- Footer (unchanged) ---------------- */
function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-grid">
        <div>
          <img src="/wallace-logo-transparent.png" alt="Company logo" className="logo small" />
          <p className="muted">Transforming outdoor spaces since 2019.</p>
        </div>
        <nav aria-label="Footer">
          <ul className="footer-nav" role="list">
            <li><Link to="/">Home</Link></li>
            <li><a href="/#about">About</a></li>
            <li><a href="/#services">Services</a></li>
            <li><Link to="/gallery">Gallery</Link></li>
            <li><Link to="/contact">Contact</Link></li>
          </ul>
        </nav>
        <div className="footer-cta">
          <Link className="button" to="/contact">Get Started</Link>
          <ul className="contact-list" role="list">
            <li><a href="mailto:info@example.com">info@example.com</a></li>
            <li><a href="tel:+10000000000">+1 (000) 000-0000</a></li>
            <li className="socials"><a href="#">Fb</a> <a href="#">Ig</a></li>
          </ul>
        </div>
      </div>
      <div className="container copyright">
        <p>© Wallace Landscapes Ltd 2019–2025. All rights reserved.</p>
      </div>
    </footer>
  );
}

/* ---------------- App ---------------- */
export default function App() {
  return (
    <>
      <Header />
      {/* padding-top is switched by the header state using sibling selector */}
      <main id="main-content" tabIndex="-1">
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
