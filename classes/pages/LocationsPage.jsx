import "./LocationsPage.css";
import { Icon }      from "../components/Icons";
import { DISTRICTS } from "../data/constants";

// ─── ICON MAP ─────────────────────────────────────────────────────────────────
// Maps iconKey strings from DISTRICTS data to actual Icon components
const DISTRICT_ICON_MAP = {
  Diamond:    Icon.Diamond,
  Building:   Icon.Building,
  MapPin:     Icon.MapPin,
  Droplet:    Icon.Droplet,
  Home:       Icon.Home,
  TrendingUp: Icon.TrendingUp,
  Shield:     Icon.Shield,
  Leaf:       Icon.Leaf,
  Zap:        Icon.Zap,
};

// ─── DISTRICT CARD ────────────────────────────────────────────────────────────
function DistrictCard({ district, onBrowse }) {
  const DistrictIcon = DISTRICT_ICON_MAP[district.iconKey];

  return (
    <div className="dcard">
      {/* Gradient image area with icon */}
      <div className="dcard-img" style={{ background: district.gradient }}>
        <div className="dcard-icon">
          {DistrictIcon && <DistrictIcon size={24} />}
        </div>
      </div>

      {/* Body */}
      <div className="dcard-body">
        <div className="dcard-name">{district.name}</div>
        <div className="dcard-tagline">{district.tagline}</div>
        <p className="dcard-desc">{district.desc}</p>

        {/* Stats 2×2 grid */}
        <div className="dcard-stats">
          {district.stats.map(s => (
            <div className="dstat" key={s.label}>
              <span className="dstat-label">{s.label}</span>
              <span className="dstat-value">{s.value}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Footer CTA */}
      <div className="dcard-foot">
        <button className="dcard-browse" onClick={() => onBrowse(district.name)}>
          Browse {district.name} Listings →
        </button>
      </div>
    </div>
  );
}

// ─── LOCATIONS PAGE ───────────────────────────────────────────────────────────
export function LocationsPage({ setPage, browseLocation }) {
  // When user clicks "Browse listings", navigate with location pre-filtered
  const handleBrowse = (areaName) => {
    if (browseLocation) {
      browseLocation(areaName);
    } else {
      setPage("listings");
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <div className="page">

      {/* ── HERO ──────────────────────────────────────────────────────────── */}
      <section className="loc-hero">
        <div className="loc-hero-rule" />
        <p className="eyebrow a1">Neighbourhood Guides</p>
        <h1 className="a2">Find your district in <em>Abuja</em></h1>
        <p className="a3">
          Not sure which neighbourhood fits your lifestyle and budget? Our district guides
          break down everything you need to know — prices, character, and who each area suits best.
        </p>
      </section>

      {/* ── DISTRICT GRID ─────────────────────────────────────────────────── */}
      <section className="loc-sec">
        <div className="inner">
          <div className="loc-grid">
            {DISTRICTS.map(d => (
              <DistrictCard
                key={d.id}
                district={d}
                onBrowse={handleBrowse}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA BANNER ────────────────────────────────────────────────────── */}
      <section className="loc-cta">
        <h2>Ready to find a property<br />in your chosen area?</h2>
        <p>Submit a request and our team will source verified options in your preferred district.</p>
        <button className="loc-cta-btn" onClick={() => { setPage("home"); window.scrollTo({ top: 0, behavior: "smooth" }); }}>
          Submit a Property Request →
        </button>
      </section>

    </div>
  );
}
