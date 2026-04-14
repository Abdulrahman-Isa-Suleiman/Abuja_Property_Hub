import { useState, useEffect } from "react";
import "./RequestForm.css";
import { Icon }                    from "./Icons";
import { PriceSlider, RoomsStepper } from "./FormControls";
import { parseQuery }              from "../utils/helpers";

const BLANK = {
  propertyType: "", propertyTypeOther: "",
  location: "",     tenure: "Rent",
  bedrooms: 0,      bathrooms: 0,
  details: "",      urgency: "",
  name: "",         phone: "",  email: "",
};

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

  const validate = () => {
    const e = {};
    if (!form.propertyType) e.propertyType = "Please select a property type";
    if (form.propertyType === "Other" && !form.propertyTypeOther.trim()) e.propertyTypeOther = "Please describe the property type";
    if (!form.location.trim()) e.location = "Location is required";
    if (!form.phone.trim())    e.phone    = "Phone number is required";
    setErrors(e);
    return !Object.keys(e).length;
  };

  const submit = () => {
    if (!validate()) return;
    setLoading(true);
    setTimeout(() => { setLoading(false); setDone(true); }, 2000); // TODO: replace with API call
  };

  const noRooms = ["Land", "Office", "Shop"].includes(form.propertyType);

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

        {/* Property type + location */}
        <div className="frow c2">
          <div className="ff">
            <label className="flabel">Property Type <span className="freq">*</span></label>
            <select className={`fselect${errors.propertyType ? " err" : ""}`} value={form.propertyType} onChange={e => set("propertyType", e.target.value)}>
              <option value="">Select type…</option>
              {["House","Apartment","Duplex","Villa","Land","Office","Shop","Self-Contained","Other"].map(o => <option key={o}>{o}</option>)}
            </select>
            {errors.propertyType && <span className="emsg">{errors.propertyType}</span>}
            {form.propertyType === "Other" && (
              <input className={`finput${errors.propertyTypeOther ? " err" : ""}`} style={{ marginTop: "0.5rem" }}
                placeholder="Describe the property type…" value={form.propertyTypeOther}
                onChange={e => set("propertyTypeOther", e.target.value)} />
            )}
            {errors.propertyTypeOther && <span className="emsg">{errors.propertyTypeOther}</span>}
          </div>
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

        {/* Bedrooms + Bathrooms */}
        {!noRooms && (
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
