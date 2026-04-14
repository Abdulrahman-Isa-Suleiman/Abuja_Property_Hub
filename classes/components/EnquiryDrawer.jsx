import { useState, useEffect } from "react";
import "./EnquiryDrawer.css";
import { Icon } from "./Icons";

export function EnquiryDrawer({ property, onClose }) {
  const [form,    setForm]    = useState({ name: "", phone: "", email: "", message: "" });
  const [loading, setLoading] = useState(false);
  const [done,    setDone]    = useState(false);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));

  const submit = () => {
    if (!form.name.trim() || !form.phone.trim()) return;
    setLoading(true);
    setTimeout(() => { setLoading(false); setDone(true); }, 1800); // TODO: replace with API call
  };

  return (
    <>
      <div className="drawer-overlay" onClick={onClose} />
      <div className="drawer">
        <div className="drawer-head">
          <div className="drawer-head-info">
            <div className="drawer-prop-type">{property.type} · {property.tenure}</div>
            <div className="drawer-prop-title">{property.title}</div>
            <div className="drawer-prop-loc"><Icon.MapPin size={10} /> {property.area}, {property.city}</div>
          </div>
          <button className="drawer-close" onClick={onClose}><Icon.Close size={13} /></button>
        </div>

        <div className="drawer-body">
          {done ? (
            <div className="drawer-success">
              <div className="drawer-success-icon"><Icon.CheckCircle size={26} /></div>
              <h3>Enquiry Sent</h3>
              <p>We've received your enquiry and will be in touch shortly — usually within a few hours.</p>
            </div>
          ) : (
            <>
              <div className="drawer-price-row">
                <div className="drawer-price">{property.price}<small> {property.period}</small></div>
                <span className={`drawer-badge ${property.tenure.toLowerCase()}`}>{property.tenure}</span>
              </div>

              <div className="drawer-section-label">Features</div>
              <div className="drawer-feats">
                {property.features.map(f => <span className="drawer-feat" key={f}><Icon.Check size={8} />{f}</span>)}
              </div>
              <p className="drawer-desc">{property.desc}</p>

              <div className="drawer-divider" />
              <div className="drawer-section-label">Send a Direct Enquiry</div>

              <label className="drawer-form-label">Your Name *</label>
              <input className="drawer-input" placeholder="Full name" value={form.name} onChange={e => set("name", e.target.value)} />

              <label className="drawer-form-label">Phone Number *</label>
              <input className="drawer-input" placeholder="+234 800 000 0000" value={form.phone} onChange={e => set("phone", e.target.value)} />

              <label className="drawer-form-label">Email (optional)</label>
              <input className="drawer-input" type="email" placeholder="yourname@email.com" value={form.email} onChange={e => set("email", e.target.value)} />

              <label className="drawer-form-label">Message</label>
              <textarea className="drawer-input drawer-textarea"
                placeholder="I'm interested in this property. Please get in touch…"
                value={form.message} onChange={e => set("message", e.target.value)} />

              <button className="drawer-submit" onClick={submit} disabled={loading || !form.name.trim() || !form.phone.trim()}>
                {loading ? <><div className="spin" />Sending…</> : <>Send Enquiry →</>}
              </button>
            </>
          )}
        </div>
      </div>
    </>
  );
}
