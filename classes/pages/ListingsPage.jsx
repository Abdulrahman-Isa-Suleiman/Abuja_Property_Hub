import { useState }       from "react";
import "./ListingsPage.css";
import { Icon }            from "../components/Icons";
import { EnquiryDrawer }   from "../components/EnquiryDrawer";
import { LISTINGS, PROPERTY_TYPES, TENURE_OPTIONS } from "../data/constants";

function PropertyCardSVG({ type }) {
  const isLand  = type === "Land";
  const isLarge = type === "Villa" || type === "Duplex";
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

export function ListingsPage({ setPage }) {
  const [typeFilter,   setTypeFilter]   = useState(["All"]);
  const [tenureFilter, setTenureFilter] = useState("All");
  const [enquiryProp,  setEnquiryProp]  = useState(null);

  const handleTypeToggle = (type) => {
    if (type === "All") { setTypeFilter(["All"]); return; }
    let next = typeFilter.filter(t => t !== "All");
    next = next.includes(type) ? next.filter(t => t !== type) : [...next, type];
    setTypeFilter(next.length === 0 ? ["All"] : next);
  };

  const filtered = LISTINGS.filter(l =>
    (typeFilter.includes("All") || typeFilter.includes(l.type)) &&
    (tenureFilter === "All"     || l.tenure === tenureFilter)
  );

  return (
    <div className="page">

      <section className="list-hero">
        <p className="eyebrow a1">Available Properties</p>
        <h1 className="a2">Properties in <em>Abuja</em></h1>
        <p className="a3">Verified listings sourced directly from our trusted agent network. Prices shown are starting figures.</p>
      </section>

      <div className="fbar">
        <div className="fbar-inner">
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
      </div>

      <section className="list-sec">
        <div className="inner">
          <div className="list-grid">
            {filtered.length === 0 ? (
              <div className="noresult">
                <h3>No properties found</h3>
                <p>Try adjusting your filters or submit a request and we'll source options for you.</p>
              </div>
            ) : filtered.map(p => (
              <div className="pcard" key={p.id}>
                <div className="pimg">
                  <div className="pimg-bg" style={{ background: p.gradient }} />
                  <PropertyCardSVG type={p.type} />
                  <div className={`pbadge${p.tenure === "Rent" ? " rent" : ""}`}>{p.tenure}</div>
                </div>
                <div className="pbody">
                  <div className="ptype">{p.type}</div>
                  <div className="ptitle">{p.title}</div>
                  <div className="ploc"><Icon.MapPin size={10} />{p.area}, {p.city}</div>
                  <div className="pprice">{p.price} <span>{p.period}</span></div>
                  <div className="pfeats">
                    {p.features.map(f => <span className="pfeat" key={f}><Icon.Check size={8} />{f}</span>)}
                  </div>
                  <div className="pdiv" />
                  <p className="pdesc">{p.desc}</p>
                </div>
                <div className="pfoot">
                  <div className="pstatus">
                    <span className="sdot" style={{ background: p.available ? "#5A8A5A" : "#B08050" }} />
                    {p.available ? "Available Now" : "Under Offer"}
                  </div>
                  <button className="penq" onClick={() => setEnquiryProp(p)}>Enquire</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="listings-cta">
        <p className="eyebrow">Can't find what you need?</p>
        <h2 className="sec-title" style={{ marginBottom: "0.9rem" }}>Submit a custom request</h2>
        <p className="listings-cta-sub">Tell us exactly what you're looking for and our team will source it from our extended network.</p>
        <button className="nav-cta listings-cta-btn"
          onClick={() => { setPage("home"); window.scrollTo({ top: 0, behavior: "smooth" }); }}>
          Submit a Request →
        </button>
      </section>

      {enquiryProp && <EnquiryDrawer property={enquiryProp} onClose={() => setEnquiryProp(null)} />}
    </div>
  );
}
