import { useState, useEffect } from "react";
import "./EnquiryDrawer.css";
import { Icon } from "./Icons";

// ─── TIME SLOTS ───────────────────────────────────────────────────────────────
// 8:00 am → 6:00 pm in 30-minute increments
const TIME_SLOTS = (() => {
  const slots = [];
  for (let h = 8; h <= 18; h++) {
    for (let m = 0; m < 60; m += 30) {
      if (h === 18 && m > 0) break;
      const hour   = h % 12 === 0 ? 12 : h % 12;
      const suffix = h < 12 ? "am" : "pm";
      const mins   = m === 0 ? "00" : "30";
      slots.push(`${hour}:${mins} ${suffix}`);
    }
  }
  return slots;
})();

// ─── HELPERS ─────────────────────────────────────────────────────────────────
// Returns today's date as YYYY-MM-DD for the date input's min attribute
function todayString() {
  return new Date().toISOString().split("T")[0];
}

// Formats "2025-08-14" → "Wednesday, 14 August 2025"
function formatDate(iso) {
  if (!iso) return "";
  const d = new Date(iso + "T00:00:00");
  return d.toLocaleDateString("en-GB", { weekday: "long", day: "numeric", month: "long", year: "numeric" });
}

// ─── ENQUIRY DRAWER ───────────────────────────────────────────────────────────
export function EnquiryDrawer({ property, onClose }) {
  const [showingDate, setShowingDate] = useState("");
  const [showingTime, setShowingTime] = useState("");
  const [form,        setForm]        = useState({ name: "", phone: "", email: "", message: "" });
  const [loading,     setLoading]     = useState(false);
  const [done,        setDone]        = useState(false);

  // Lock body scroll while drawer is open
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));

  const showingScheduled = showingDate && showingTime;

  const submit = () => {
    if (!form.name.trim() || !form.phone.trim()) return;
    setLoading(true);
    setTimeout(() => { setLoading(false); setDone(true); }, 1800); // TODO: replace with API call
  };

  return (
    <>
      <div className="drawer-overlay" onClick={onClose} />
      <div className="drawer">

        {/* ── HEAD ──────────────────────────────────────────────────────── */}
        <div className="drawer-head">
          <div className="drawer-head-info">
            <div className="drawer-prop-type">{property.type} · {property.tenure}</div>
            <div className="drawer-prop-title">{property.title}</div>
            <div className="drawer-prop-loc"><Icon.MapPin size={10} /> {property.area}, {property.city}</div>
          </div>
          <button className="drawer-close" onClick={onClose}><Icon.Close size={13} /></button>
        </div>

        {/* ── BODY ──────────────────────────────────────────────────────── */}
        <div className="drawer-body">
          {done ? (

            // ── SUCCESS ────────────────────────────────────────────────
            <div className="drawer-success">
              <div className="drawer-success-icon"><Icon.CheckCircle size={26} /></div>
              <h3>{showingScheduled ? "Showing Booked!" : "Enquiry Sent"}</h3>
              <p>
                {showingScheduled
                  ? <>Your showing is confirmed for <strong>{formatDate(showingDate)}</strong> at <strong>{showingTime}</strong>. We'll also send you a reminder closer to the date.</>
                  : <>We've received your enquiry and will be in touch shortly — usually within a few hours.</>
                }
              </p>
            </div>

          ) : (
            <>
              {/* Price row */}
              <div className="drawer-price-row">
                <div className="drawer-price">{property.price}<small> {property.period}</small></div>
                <span className={`drawer-badge ${property.tenure.toLowerCase()}`}>{property.tenure}</span>
              </div>

              {/* Features */}
              <div className="drawer-section-label">Features</div>
              <div className="drawer-feats">
                {property.features.map(f => <span className="drawer-feat" key={f}><Icon.Check size={8} />{f}</span>)}
              </div>
              <p className="drawer-desc">{property.desc}</p>

              <div className="drawer-divider" />

              {/* ── SCHEDULE A SHOWING ─────────────────────────────────── */}
              <div className="drawer-section-label">Schedule a Showing</div>
              <div className="showing-block">
                <div className="showing-row">
                  <div className="showing-field">
                    <label>Preferred Date</label>
                    <input
                      type="date"
                      className="showing-input"
                      min={todayString()}
                      value={showingDate}
                      onChange={e => setShowingDate(e.target.value)}
                    />
                  </div>
                  <div className="showing-field">
                    <label>Preferred Time</label>
                    <select
                      className="showing-input"
                      value={showingTime}
                      onChange={e => setShowingTime(e.target.value)}
                    >
                      <option value="">Select time…</option>
                      {TIME_SLOTS.map(t => <option key={t} value={t}>{t}</option>)}
                    </select>
                  </div>
                </div>

                {/* Confirmation strip — only shown once both are picked */}
                {showingScheduled && (
                  <div className="showing-confirm">
                    <span className="showing-confirm-icon"><Icon.Calendar size={16} /></span>
                    <span className="showing-confirm-text">
                      Showing on <strong>{formatDate(showingDate)}</strong> at <strong>{showingTime}</strong>
                    </span>
                  </div>
                )}
              </div>

              <div className="drawer-divider" />

              {/* ── CONTACT FORM ───────────────────────────────────────── */}
              <div className="drawer-section-label">Your Details</div>

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

              <button
                className="drawer-submit"
                onClick={submit}
                disabled={loading || !form.name.trim() || !form.phone.trim()}
              >
                {loading
                  ? <><div className="spin" />Sending…</>
                  : showingScheduled
                    ? <>Book Showing &amp; Send Enquiry →</>
                    : <>Send Enquiry →</>
                }
              </button>
            </>
          )}
        </div>
      </div>
    </>
  );
}
