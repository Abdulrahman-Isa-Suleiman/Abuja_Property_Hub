import { useState, useEffect } from "react";
import "./NavFooter.css";
import { NAV_LINKS, FOOTER_LOCATION_LINKS } from "../data/constants";

// ─── NAVBAR ───────────────────────────────────────────────────────────────────
export function Navbar({ page, setPage }) {
  const [scrolled, setScrolled] = useState(false);
  const [open,     setOpen]     = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 28);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const go = (id) => { setPage(id); setOpen(false); window.scrollTo({ top: 0, behavior: "smooth" }); };

  return (
    <>
      <nav className={`navbar${scrolled ? " scrolled" : ""}`}>
        <span className="nav-logo" onClick={() => go("home")}>Property<span>Hub</span></span>
        <ul className="nav-links">
          {NAV_LINKS.map(l => (
            <li key={l.id}>
              <button className={`nav-link${page === l.id ? " active" : ""}`} onClick={() => go(l.id)}>
                {l.label}
              </button>
            </li>
          ))}
        </ul>
        <button className="nav-cta" onClick={() => go("home")}>Submit Request</button>
        <button className="nav-hamburger" onClick={() => setOpen(o => !o)}>
          <span /><span /><span />
        </button>
      </nav>
      <div className={`mobile-menu${open ? " open" : ""}`}>
        {NAV_LINKS.map(l => (
          <button key={l.id} className={`mobile-nav-link${page === l.id ? " active" : ""}`} onClick={() => go(l.id)}>
            {l.label}
          </button>
        ))}
      </div>
    </>
  );
}

// ─── FOOTER ───────────────────────────────────────────────────────────────────
export function Footer({ setPage }) {
  const go = (id) => { setPage(id); window.scrollTo({ top: 0, behavior: "smooth" }); };

  return (
    <footer className="footer">
      <div className="footer-inner">
        <div className="footer-top">
          <div>
            <div className="footer-brand">Property<span>Hub</span></div>
            <p className="footer-desc">Abuja's premier property request platform. Tell us what you need — we find it for you.</p>
          </div>
          <div className="fcol">
            <h4>Platform</h4>
            <ul>
              <li><button className="fl" onClick={() => go("home")}>Submit a Request</button></li>
              <li><button className="fl" onClick={() => go("listings")}>Browse Properties</button></li>
              <li><button className="fl" onClick={() => go("about")}>How It Works</button></li>
            </ul>
          </div>
          <div className="fcol">
            <h4>Locations</h4>
            <ul>
              {FOOTER_LOCATION_LINKS.map(loc => (
                <li key={loc}><button className="fl" onClick={() => go("locations")}>{loc}</button></li>
              ))}
            </ul>
          </div>
          <div className="fcol">
            <h4>Contact</h4>
            <ul>
              <li><button className="fl" onClick={() => go("contact")}>info@propertyhub.ng</button></li>
              <li><button className="fl">+234 800 000 0000</button></li>
              <li><button className="fl">WhatsApp Us</button></li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} PropertyHub. All rights reserved.</span>
          <span>Made with care for Abuja.</span>
        </div>
      </div>
    </footer>
  );
}
