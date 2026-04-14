import { useState }          from "react";
import "./ContactPage.css";
import { Icon }              from "../components/Icons";
import { CONTACT_INFO_ITEMS } from "../data/constants";

const BLANK = { name: "", email: "", phone: "", subject: "", message: "" };

const ICON_MAP = {
  Phone:     Icon.Phone,
  Mail:      Icon.Mail,
  MsgCircle: Icon.MsgCircle,
  Location:  Icon.Location,
};

export function ContactPage() {
  const [form,    setForm]    = useState(BLANK);
  const [errors,  setErrors]  = useState({});
  const [loading, setLoading] = useState(false);
  const [done,    setDone]    = useState(false);

  const set = (k, v) => { setForm(f => ({ ...f, [k]: v })); setErrors(e => ({ ...e, [k]: "" })); };

  const validate = () => {
    const e = {};
    if (!form.name.trim())    e.name    = "Name is required";
    if (!form.email.trim())   e.email   = "Email is required";
    if (!form.message.trim()) e.message = "Message is required";
    setErrors(e);
    return !Object.keys(e).length;
  };

  const submit = () => {
    if (!validate()) return;
    setLoading(true);
    setTimeout(() => { setLoading(false); setDone(true); }, 2000); // TODO: replace with API call
  };

  return (
    <div className="page">

      {/* ── HERO ──────────────────────────────────────────────────────────── */}
      <section className="cont-hero">
        <p className="eyebrow a1">Get in Touch</p>
        <h1 className="a2">We'd love to hear from you.</h1>
        <p className="a3">Whether you have a question, a specific request, or just want to say hello — our team is ready to help.</p>
      </section>

      {/* ── MAIN ──────────────────────────────────────────────────────────── */}
      <section className="cont-main">
        <div className="cont-grid">

          {/* Left — contact info */}
          <div className="cinfo">
            <div>
              <p className="eyebrow" style={{ textAlign: "left", marginBottom: "0.45rem" }}>Contact Information</p>
              <h3 className="cinfo-heading">Reach us any way<br />that works for you.</h3>
            </div>
            {CONTACT_INFO_ITEMS.map(item => {
              const ItemIcon = ICON_MAP[item.iconKey];
              return (
                <div className="cinfo-item" key={item.label}>
                  <div className="cinfo-icon">{ItemIcon && <ItemIcon size={17} />}</div>
                  <div className="cinfo-text">
                    <h4>{item.label}</h4>
                    <p>{item.value}</p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right — contact form */}
          <div className="cform-card">
            {done ? (
              <div className="confirm" style={{ padding: "3rem 2.4rem" }}>
                <div className="cicon"><Icon.Envelope size={24} /></div>
                <h2>Message Sent</h2>
                <p>Thank you for reaching out. We'll get back to you within 24 hours.</p>
                <button className="creset" onClick={() => { setDone(false); setForm(BLANK); }}>
                  Send Another Message
                </button>
              </div>
            ) : (
              <>
                <div className="cform-head">
                  <h3>Send Us a Message</h3>
                  <p>We typically respond within a few hours during business hours.</p>
                </div>
                <div className="cform-body">

                  {/* Name + Phone */}
                  <div className="frow c2">
                    <div className="ff">
                      <label className="flabel">Your Name <span className="freq">*</span></label>
                      <input className={`finput${errors.name ? " err" : ""}`} placeholder="Full name"
                        value={form.name} onChange={e => set("name", e.target.value)} />
                      {errors.name && <span className="emsg">{errors.name}</span>}
                    </div>
                    <div className="ff">
                      <label className="flabel">Phone</label>
                      <input className="finput" placeholder="+234 800 000 0000"
                        value={form.phone} onChange={e => set("phone", e.target.value)} />
                    </div>
                  </div>

                  {/* Email */}
                  <div className="frow c1">
                    <div className="ff">
                      <label className="flabel">Email Address <span className="freq">*</span></label>
                      <input className={`finput${errors.email ? " err" : ""}`} type="email" placeholder="yourname@email.com"
                        value={form.email} onChange={e => set("email", e.target.value)} />
                      {errors.email && <span className="emsg">{errors.email}</span>}
                    </div>
                  </div>

                  {/* Subject */}
                  <div className="frow c1">
                    <div className="ff">
                      <label className="flabel">Subject</label>
                      <select className="fselect" value={form.subject} onChange={e => set("subject", e.target.value)}>
                        <option value="">Select a topic…</option>
                        {["Property Request", "Agent Partnership", "General Inquiry", "Complaint", "Other"].map(o => (
                          <option key={o}>{o}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Message */}
                  <div className="frow c1">
                    <div className="ff">
                      <label className="flabel">Message <span className="freq">*</span></label>
                      <textarea className={`ftextarea${errors.message ? " err" : ""}`}
                        placeholder="Tell us how we can help you…" style={{ minHeight: 120 }}
                        value={form.message} onChange={e => set("message", e.target.value)} />
                      {errors.message && <span className="emsg">{errors.message}</span>}
                    </div>
                  </div>

                  <button className="sbtn" onClick={submit} disabled={loading}>
                    {loading ? <><div className="spin" />Sending…</> : <>Send Message →</>}
                  </button>

                </div>
              </>
            )}
          </div>

        </div>
      </section>

    </div>
  );
}
