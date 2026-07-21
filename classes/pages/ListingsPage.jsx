import { useState, useEffect } from "react";
import "./ListingsPage.css";
import { Icon }          from "../components/Icons";
import { EnquiryDrawer } from "../components/EnquiryDrawer";
import { supabase }      from "../utils/supabaseClient";
import { PROPERTY_TYPES, TENURE_OPTIONS, LOCATION_OPTIONS } from "../data/constants";

// ─── PROPERTY CARD SVG (fallback icon when no photo uploaded) ─────────────────
function PropertyCardSVG({ type }) {
  const isLand  = type === "Land";
  const isLarge = type === "House" || type === "Commercial Space";
  return (
    <svg width="52" height="52" viewBox="0 0 24 24" fill="none"
      stroke="rgba(168,158,148,0.38)" strokeWidth="0.8" strokeLinecap="round"
      style={{ position: "relative", zIndex: 1 }}>
      {isLand  ? <><path d="M3 20h18"/><path d="M3 20L7 10l4 6 4-8 3 8"/></> :
       isLarge ? <><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/><path d="M9 7h6"/></> :
                 <><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></>}
    </svg>
  );
}

// ─── PROPERTY IMAGE (real photo if available, else gradient + icon) ──────────
function PropertyImage({ p, className = "pimg-bg" }) {
  if (p.image_url) {
    return <img className={`${className}-photo`} src={p.image_url} alt={p.title} />;
  }
  return (
    <>
      <div className={className} style={{ background: p.gradient }} />
      <PropertyCardSVG type={p.type} />
    </>
  );
}

// ─── SHORTLIST MODAL ──────────────────────────────────────────────────────────
function ShortlistModal({ listings, saved, onUnsave, onEnquire, onClose }) {
  const savedListings = listings.filter(l => saved.has(l.id));

  return (
    <>
      <div className="sl-overlay" onClick={onClose} />
      <div className="sl-modal">
        <div className="sl-modal-head">
          <div>
            <div className="sl-modal-eyebrow">Saved Properties</div>
            <h2 className="sl-modal-title">Your Shortlist</h2>
          </div>
          <button className="sl-modal-close" onClick={onClose}><Icon.Close size={13} /></button>
        </div>

        <div className="sl-modal-body">
          {savedListings.length === 0 ? (
            <div className="sl-empty">
              <div className="sl-empty-icon"><Icon.StarEmpty size={28} /></div>
              <p>No saved properties yet.<br />Click the star on any listing to save it here.</p>
            </div>
          ) : (
            <div className="sl-grid">
              {savedListings.map(p => (
                <div className="sl-card" key={p.id}>
                  {/* Mini image */}
                  <div className="sl-card-img" style={p.image_url ? {} : { background: p.gradient }}>
                    {p.image_url && <img className="sl-card-img-photo" src={p.image_url} alt={p.title} />}
                    <div className={`sl-card-badge${p.tenure === "Rent" ? " rent" : ""}`}>{p.tenure}</div>
                    <button className="sl-unsave" onClick={() => onUnsave(p.id)} title="Remove from shortlist">
                      <Icon.StarFilled size={14} />
                    </button>
                  </div>
                  {/* Mini body */}
                  <div className="sl-card-body">
                    <div className="sl-card-type">{p.type}</div>
                    <div className="sl-card-title">{p.title}</div>
                    <div className="sl-card-loc"><Icon.MapPin size={9} />{p.area}, {p.city}</div>
                    <div className="sl-card-size"><Icon.Ruler size={10} />{p.sqm} sqm</div>
                    <div className="sl-card-price">{p.price}<span> {p.period}</span></div>
                  </div>
                  {/* Mini footer */}
                  <div className="sl-card-foot">
                    <div className="sl-card-status">
                      <span className="sdot" style={{ background: p.available ? "#5A8A5A" : "#B08050" }} />
                      {p.available ? "Available" : "Under Offer"}
                    </div>
                    <button className="sl-enquire" onClick={() => { onClose(); onEnquire(p); }}>Enquire</button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}

// ─── LISTINGS PAGE ────────────────────────────────────────────────────────────
export function ListingsPage({ setPage, locationFilter = "All", setLocationFilter = () => {} }) {
  const [listings,      setListings]      = useState([]);
  const [loading,       setLoading]       = useState(true);
  const [typeFilter,    setTypeFilter]    = useState(["All"]);
  const [tenureFilter,  setTenureFilter]  = useState("All");
  const [enquiryProp,   setEnquiryProp]   = useState(null);
  const [saved,         setSaved]         = useState(new Set());
  const [showShortlist, setShowShortlist] = useState(false);

  // ── Fetch listings from Supabase ──────────────────────────────────────────
  useEffect(() => { fetchListings(); }, []);

  const fetchListings = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("listings")
      .select("*")
      .order("created_at", { ascending: false });
    if (!error) setListings(data || []);
    setLoading(false);
  };

  // ── Filter logic ──────────────────────────────────────────────────────────
  const handleTypeToggle = (type) => {
    if (type === "All") { setTypeFilter(["All"]); return; }
    let next = typeFilter.filter(t => t !== "All");
    next = next.includes(type) ? next.filter(t => t !== type) : [...next, type];
    setTypeFilter(next.length === 0 ? ["All"] : next);
  };

  const filtered = listings.filter(l =>
    (typeFilter.includes("All")  || typeFilter.includes(l.type))  &&
    (tenureFilter === "All"      || l.tenure === tenureFilter)     &&
    (locationFilter === "All"    || l.area === locationFilter)
  );

  // ── Favourites logic ──────────────────────────────────────────────────────
  const toggleSave = (id) => {
    setSaved(prev => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const clearAll = () => setSaved(new Set());

  return (
    <div className="page">

      {/* ── HERO ──────────────────────────────────────────────────────────── */}
      <section className="list-hero">
        <p className="eyebrow a1">Available Properties</p>
        <h1 className="a2">Properties in <em>Abuja</em></h1>
        <p className="a3">Verified listings sourced directly from our trusted agent network. Prices shown are starting figures.</p>
      </section>

      {/* ── SHORTLIST BANNER ──────────────────────────────────────────────── */}
      {saved.size > 0 && (
        <div className="shortlist-banner">
          <div className="shortlist-banner-inner">
            <div className="shortlist-banner-left">
              <span className="shortlist-banner-icon"><Icon.StarFilled size={14} /></span>
              <span className="shortlist-banner-text">
                <strong>{saved.size}</strong> {saved.size === 1 ? "property" : "properties"} saved to your shortlist
              </span>
            </div>
            <div className="shortlist-banner-actions">
              <button className="shortlist-view-btn" onClick={() => setShowShortlist(true)}>
                View Shortlist
              </button>
              <button className="shortlist-clear-btn" onClick={clearAll}>
                Clear all
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── FILTER BAR ────────────────────────────────────────────────────── */}
      <div className="fbar">
        <div className="fbar-inner">
          {/* Row 1: Type + Tenure + count */}
          <span className="flbl">Type:</span>
          {PROPERTY_TYPES.map(f => (
            <button key={f} className={`fchip${typeFilter.includes(f) ? " on" : ""}`} onClick={() => handleTypeToggle(f)}>{f}</button>
          ))}
          <div className="fsep" />
          <span className="flbl">Tenure:</span>
          {TENURE_OPTIONS.map(f => (
            <button key={f} className={`fchip${tenureFilter === f ? " on" : ""}`} onClick={() => setTenureFilter(f)}>{f}</button>
          ))}
          <span className="fcount">{filtered.length} propert{filtered.length === 1 ? "y" : "ies"}</span>
        </div>
        {/* Row 2: Location */}
        <div className="fbar-inner fbar-location-row">
          <span className="flbl">Location:</span>
          {LOCATION_OPTIONS.map(f => (
            <button key={f} className={`fchip${locationFilter === f ? " on" : ""}`} onClick={() => setLocationFilter(f)}>{f}</button>
          ))}
        </div>
      </div>

      {/* ── PROPERTY GRID ─────────────────────────────────────────────────── */}
      <section className="list-sec">
        <div className="inner">
          <div className="list-grid">
            {loading ? (
              <div className="noresult">
                <h3>Loading properties…</h3>
              </div>
            ) : filtered.length === 0 ? (
              <div className="noresult">
                <h3>No properties found</h3>
                <p>Try adjusting your filters or submit a request and we'll source options for you.</p>
              </div>
            ) : filtered.map(p => {
              const isSaved = saved.has(p.id);
              return (
                <div className="pcard" key={p.id}>
                  <div className="pimg">
                    <PropertyImage p={p} className="pimg-bg" />
                    <div className={`pbadge${p.tenure === "Rent" ? " rent" : ""}`}>{p.tenure}</div>
                    {/* ── STAR / SAVE BUTTON ── */}
                    <button
                      className={`pstar${isSaved ? " saved" : ""}`}
                      onClick={() => toggleSave(p.id)}
                      title={isSaved ? "Remove from shortlist" : "Save to shortlist"}
                    >
                      {isSaved ? <Icon.StarFilled size={15} /> : <Icon.StarEmpty size={15} />}
                    </button>
                  </div>
                  <div className="pbody">
                    <div className="ptype">{p.type}{p.subtype ? ` · ${p.subtype}` : ""}</div>
                    <div className="ptitle">{p.title}</div>
                    <div className="ploc"><Icon.MapPin size={10} />{p.area}, {p.city}</div>
                    {p.sqm && <div className="psize"><Icon.Ruler size={11} />{p.sqm} sqm</div>}
                    <div className="pprice">{p.price} <span>{p.period}</span></div>
                    <div className="pfeats">
                      {(p.features || []).map(f => <span className="pfeat" key={f}><Icon.Check size={8} />{f}</span>)}
                    </div>
                    <div className="pdiv" />
                    <p className="pdesc">{p.description}</p>
                  </div>
                  <div className="pfoot">
                    <div className="pstatus">
                      <span className="sdot" style={{ background: p.available ? "#5A8A5A" : "#B08050" }} />
                      {p.available ? "Available Now" : "Under Offer"}
                    </div>
                    <button className="penq" onClick={() => setEnquiryProp(p)}>Enquire</button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── CTA SECTION ───────────────────────────────────────────────────── */}
      <section className="listings-cta">
        <p className="eyebrow">Can't find what you need?</p>
        <h2 className="sec-title" style={{ marginBottom: "0.9rem" }}>Submit a custom request</h2>
        <p className="listings-cta-sub">Tell us exactly what you're looking for and our team will source it from our extended network.</p>
        <button className="nav-cta listings-cta-btn"
          onClick={() => { setPage("home"); window.scrollTo({ top: 0, behavior: "smooth" }); }}>
          Submit a Request →
        </button>
      </section>

      {/* ── MODALS / DRAWERS ──────────────────────────────────────────────── */}
      {showShortlist && (
        <ShortlistModal
          listings={listings}
          saved={saved}
          onUnsave={toggleSave}
          onEnquire={setEnquiryProp}
          onClose={() => setShowShortlist(false)}
        />
      )}
      {enquiryProp && <EnquiryDrawer property={enquiryProp} onClose={() => setEnquiryProp(null)} />}
    </div>
  );
}
