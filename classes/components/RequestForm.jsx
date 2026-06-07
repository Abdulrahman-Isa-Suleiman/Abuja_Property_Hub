import { useState, useEffect } from "react";
import "./RequestForm.css";
import { Icon }                    from "./Icons";
import { PriceSlider, RoomsStepper } from "./FormControls";
import { parseQuery }              from "../utils/helpers";

const BLANK = {
  propertyType: "", subtype: "",
  location: "",     tenure: "Rent",
  bedrooms: 0,      bathrooms: 0,
  sizeMin: "",      sizeMax: "",
  details: "",      urgency: "",
  name: "",         phone: "",  email: "",
};

// Subtype taxonomy
const SUBTYPES = {
  "Flat / Apartment": ["Studio / Self-con", "Serviced Apartment", "Terrace Apartment", "Penthouse"],
  "House":            ["Bungalow", "Duplex", "Terrace", "Semi-detached", "Detached Villa"],
  "Land":             ["Residential Plot", "Commercial Plot", "Mixed-use Plot", "Agricultural"],
  "Commercial Space": ["Office", "Shop / Retail", "Warehouse", "Event Space", "Mixed Commercial"],
};

// Subtypes where rooms don't apply
const NO_ROOM_SUBTYPES = new Set(["Studio / Self-con"]);
// Types that show rooms
const NEEDS_ROOMS = new Set(["Flat / Apartment", "House"]);
// Types that show size range instead
const NEEDS_SIZE  = new Set(["Land", "Commercial Space"]);

function extractParsed(p) {
  return {
    ...(p.propertyType ? { propertyType: p.propertyType } : {}),
    ...(p.location     ? { location: p.location }         : {}),
    ...(p.tenure       ? { tenure: p.tenure }             : {}),
    ...(p.bedrooms     ? { bedrooms: p.bedrooms }         : {}),
  };
}

export function RequestForm({ initialQuery }) {
  const [form,    setForm]    = useState({ ...BLANK, ...extractParsed(parseQuery(initialQuery)) });
  const [errors,  setErrors]  = useState({});
  const [loading, setLoading] = useState(false);
  const [done,    setDone]    = useState(false);

  useEffect(() => {
    if (!initialQuery) return;
    setForm(f => ({ ...f, ...extractParsed(parseQuery(initialQuery)) }));
  }, [initialQuery]);

  const set = (k, v) => { setForm(f => ({ ...f, [k]: v })); setErrors(e => ({ ...e, [k]: "" })); };

  // When type changes, reset subtype and size/room fields
  const setType = (v) => {
    setForm(f => ({ ...f, propertyType: v, subtype: "", bedrooms: 0, bathrooms: 0, sizeMin: "", sizeMax: "" }));
    setErrors(e => ({ ...e, propertyType: "" }));
  };

  const validate = () => {
    const e = {};
    if (!form.propertyType)    e.propertyType = "Please select a property type";
    if (!form.location.trim()) e.location     = "Location is required";
    if (!form.phone.trim())    e.phone        = "Phone number is required";
    setErrors(e);
    return !Object.keys(e).length;
  };

  const submit = () => {
    if (!validate()) return;
    setLoading(true);
    setTimeout(() => { setLoading(false); setDone(true); }, 2000); // TODO: replace with API call
  };

  const showRooms   = NEEDS_ROOMS.has(form.propertyType) && !NO_ROOM_SUBTYPES.has(form.subtype);
  const showSize    = NEEDS_SIZE.has(form.propertyType);
  const subtypes    = form.propertyType ? SUBTYPES[form.propertyType] : null;
  const sizeLabel   = form.propertyType === "Land" ? "Plot Size (sqm)" : "Floor Area (sqm)";

  if (done) return (
    <div className="confirm">
      <div className="cicon"><Icon.CheckCircle size={30} /></div>
      <h2>Request Received</h2>
      <p>We're searching for properties matching your request. You'll receive verified options within <strong>1–10 days</strong>. If we find a match sooner, we'll reach out immediately.</p>
      <div className="cbadge"><Icon.Phone size={12} /> Expect our call or message shortly</div>
      <button className="creset" onClick={() => { setDone(false); setForm(BLANK); }}>Submit Another Request</button>
    </div>
  );

  return (
    <>
      <div className="fhead">
        <h2>Tell us what you're looking for</h2>
        <p>Fill in the details and we'll source verified options — no scrolling required.</p>
      </div>
      <div className="fbody">

        {/* ── Property Type tiles ── */}
        <div className="frow c1" style={{ marginBottom: "1rem" }}>
          <div className="ff">
            <label className="flabel">Property Type <span className="freq">*</span></label>
            <div className="type-grid">
              {["Flat / Apartment", "House", "Land", "Commercial Space"].map(t => (
                <button key={t} className={`type-tile${form.propertyType === t ? " on" : ""}`} onClick={() => setType(t)}>
                  <span className="type-tile-icon">
                    {t === "Flat / Apartment" && <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/></svg>}
                    {t === "House"            && <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>}
                    {t === "Land"             && <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"><path d="M3 20h18"/><path d="M3 20L7 9l5 7 4-9 5 13"/></svg>}
                    {t === "Commercial Space" && <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"><rect x="2" y="7" width="20" height="14" rx="1"/><path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2"/><line x1="12" y1="12" x2="12" y2="16"/><line x1="10" y1="14" x2="14" y2="14"/></svg>}
                  </span>
                  <span className="type-tile-label">{t}</span>
                </button>
              ))}
            </div>
            {errors.propertyType && <span className="emsg" style={{ marginTop: "0.4rem" }}>{errors.propertyType}</span>}
          </div>
        </div>

        {/* ── Subtype chips (shown after type selected) ── */}
        {subtypes && (
          <div className="frow c1" style={{ marginBottom: "1.2rem" }}>
            <div className="ff">
              <label className="flabel">Subtype <span style={{ color: "var(--stone)", textTransform: "none", letterSpacing: 0, fontSize: "0.69rem", fontWeight: 300 }}>(optional)</span></label>
              <div className="subtype-group">
                {subtypes.map(s => (
                  <button key={s} className={`subtype-chip${form.subtype === s ? " on" : ""}`}
                    onClick={() => set("subtype", form.subtype === s ? "" : s)}>
                    {s}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ── Location ── */}
        <div className="frow c1">
          <div className="ff">
            <label className="flabel">Preferred Location <span className="freq">*</span></label>
            <input className={`finput${errors.location ? " err" : ""}`} placeholder="e.g. Garki, Maitama, Wuse, Jabi"
              value={form.location} onChange={e => set("location", e.target.value)} />
            {errors.location && <span className="emsg">{errors.location}</span>}
          </div>
        </div>

        {/* Rent / Buy toggle */}
        <div className="frow c1">
          <div className="ff">
            <label className="flabel">Rent or Buy</label>
            <div className="tgroup">
              {["Rent","Buy","Both"].map(t => (
                <button key={t} className={`tbtn${form.tenure === t ? " on" : ""}`} onClick={() => set("tenure", t)}>{t}</button>
              ))}
            </div>
          </div>
        </div>

        {/* ── Bedrooms + Bathrooms (Flat/Apartment or House only, not Studio) ── */}
        {showRooms && (
          <div className="frow c2">
            <div className="ff">
              <label className="flabel"><Icon.Bed size={12} /> Bedrooms</label>
              <RoomsStepper value={form.bedrooms} onChange={v => set("bedrooms", v)} min={0} max={10} anyLabel="Any" />
            </div>
            <div className="ff">
              <label className="flabel"><Icon.Bath size={12} /> Bathrooms</label>
              <RoomsStepper value={form.bathrooms} onChange={v => set("bathrooms", v)} min={0} max={8} anyLabel="Any" />
            </div>
          </div>
        )}

        {/* ── Size range (Land or Commercial Space only) ── */}
        {showSize && (
          <div className="frow c1">
            <div className="ff">
              <label className="flabel">{sizeLabel}</label>
              <div className="size-range-wrap">
                <div className="size-range-row">
                  <div className="size-range-box">
                    <span className="price-val-label">Min</span>
                    <input className="size-input" type="number" min={0} placeholder="e.g. 300"
                      value={form.sizeMin} onChange={e => set("sizeMin", e.target.value)} />
                  </div>
                  <div className="size-sep">—</div>
                  <div className="size-range-box" style={{ textAlign: "right" }}>
                    <span className="price-val-label">Max</span>
                    <input className="size-input" type="number" min={0} placeholder="e.g. 2000"
                      value={form.sizeMax} onChange={e => set("sizeMax", e.target.value)} />
                  </div>
                </div>
                <p className="size-hint">Leave blank if flexible</p>
              </div>
            </div>
          </div>
        )}

        {/* Budget */}
        <div className="frow c1">
          <div className="ff">
            <label className="flabel">Budget Range (₦)</label>
            <PriceSlider tenure={form.tenure} />
          </div>
        </div>

        {/* Additional details */}
        <div className="frow c1">
          <div className="ff">
            <label className="flabel">Additional Details</label>
            <textarea className="ftextarea" placeholder="Furnished? Parking? Dry land? Boys quarters? Good road access? Any other requirements…"
              value={form.details} onChange={e => set("details", e.target.value)} />
          </div>
        </div>

        {/* Urgency */}
        <div className="frow c1">
          <div className="ff">
            <label className="flabel">How Urgent?</label>
            <div className="ugroup">
              {[
                { id: "urgent",   icon: <Icon.Lightning size={20} />, t: "Urgent",   s: "Need it in 1–5 days" },
                { id: "flexible", icon: <Icon.Calendar  size={20} />, t: "Flexible", s: "Anytime within 1–10 days" },
              ].map(u => (
                <div key={u.id} className={`ucard${form.urgency === u.id ? " on" : ""}`} onClick={() => set("urgency", u.id)}>
                  <div className="uicon">{u.icon}</div>
                  <div className="utitle">{u.t}</div>
                  <div className="usub">{u.s}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="fdiv" />
        <p className="fslabel">Your Contact Details</p>

        {/* Name + Phone */}
        <div className="frow c2">
          <div className="ff">
            <label className="flabel">Your Name</label>
            <input className="finput" placeholder="Full name" value={form.name} onChange={e => set("name", e.target.value)} />
          </div>
          <div className="ff">
            <label className="flabel">Phone Number <span className="freq">*</span></label>
            <input className={`finput${errors.phone ? " err" : ""}`} placeholder="+234 800 000 0000"
              value={form.phone} onChange={e => set("phone", e.target.value)} />
            {errors.phone && <span className="emsg">{errors.phone}</span>}
          </div>
        </div>

        {/* Email */}
        <div className="frow c1">
          <div className="ff">
            <label className="flabel">
              Email{" "}
              <span style={{ color: "var(--stone)", textTransform: "none", letterSpacing: 0, fontSize: "0.69rem", fontWeight: 300 }}>(optional)</span>
            </label>
            <input className="finput" type="email" placeholder="yourname@email.com"
              value={form.email} onChange={e => set("email", e.target.value)} />
          </div>
        </div>

        <button className="sbtn" onClick={submit} disabled={loading}>
          {loading ? <><div className="spin" />Submitting your request…</> : <>Submit Property Request →</>}
        </button>
      </div>
    </>
  );
}
