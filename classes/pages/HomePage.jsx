import { useState, useRef } from "react";
import "./HomePage.css";
import { Icon }        from "../components/Icons";
import { RequestForm } from "../components/RequestForm";
import { HERO_SEARCH_TAGS, HOW_STEPS, TRUST_CARDS } from "../data/constants";

const TRUST_ICON_MAP = { Magnify: Icon.Magnify, Shield: Icon.Shield, Zap: Icon.Zap, Lock: Icon.Lock };

export function HomePage({ setPage }) {
  const [query,       setQuery]       = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const formRef = useRef(null);

  const doSearch = (q) => {
    setSearchQuery(q);
    setTimeout(() => formRef.current?.scrollIntoView({ behavior: "smooth" }), 50);
  };

  return (
    <div className="page">

      {/* ── HERO ──────────────────────────────────────────────────────────── */}
      <section className="hero">
        <div className="hero-rule" />
        <div className="orb orb1" /><div className="orb orb2" />

        <p className="hero-ey a1">Abuja's Premium Property Request Platform</p>
        <h1 className="hero-h a2">Find your next home, land,<br />or space in <em>Abuja</em> —<br />fast and stress-free.</h1>
        <p className="hero-p a3">Tell us what you need, and we'll source the best verified options for you.</p>

        <div className="sbox a4">
          <div className="sbox-wrap">
            <span className="sbox-icon"><Icon.Search /></span>
            <input className="sbox-input" placeholder='"3 bedroom in Garki" or "Land in Maitama"'
              value={query} onChange={e => setQuery(e.target.value)}
              onKeyDown={e => e.key === "Enter" && doSearch(query)} />
            <button className="sbox-btn" onClick={() => doSearch(query)}>Search</button>
          </div>
          <div className="hero-tags">
            {HERO_SEARCH_TAGS.map(tag => (
              <button key={tag} className="htag" onClick={() => { setQuery(tag); doSearch(tag); }}>{tag}</button>
            ))}
          </div>
        </div>

        <div className="hero-stats a5">
          <div className="hstat"><span className="hstat-n">500+</span><span className="hstat-l">Requests Matched</span></div>
          <div className="hdiv" />
          <div className="hstat"><span className="hstat-n">24h</span><span className="hstat-l">Avg Response Time</span></div>
          <div className="hdiv" />
          <div className="hstat"><span className="hstat-n">30+</span><span className="hstat-l">Abuja Locations</span></div>
        </div>
      </section>

      {/* ── HOW IT WORKS ──────────────────────────────────────────────────── */}
      <section className="how-sec">
        <div className="inner">
          <p className="eyebrow">How It Works</p>
          <h2 className="sec-title">We do the searching.<br />You do the deciding.</h2>
          <div className="how-grid">
            {HOW_STEPS.map(s => (
              <div className="how-card" key={s.n}>
                <div className="how-n">{s.n}</div>
                <h3>{s.h}</h3>
                <p>{s.p}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHY PROPERTYHUB ───────────────────────────────────────────────── */}
      <section className="trust-sec">
        <div className="inner">
          <p className="eyebrow">Why PropertyHub</p>
          <h2 className="sec-title" style={{ marginBottom: "2.8rem" }}>Built on trust, delivered with care.</h2>
          <div className="trust-grid">
            {TRUST_CARDS.map(c => {
              const TrustIcon = TRUST_ICON_MAP[c.iconKey];
              return (
                <div className="trust-card" key={c.h}>
                  <div className="trust-icon">{TrustIcon && <TrustIcon />}</div>
                  <h4>{c.h}</h4>
                  <p>{c.p}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── REQUEST FORM ──────────────────────────────────────────────────── */}
      <section className="form-sec" ref={formRef}>
        <div className="inner">
          <p className="eyebrow">Submit a Request</p>
          <h2 className="sec-title">Let's find your perfect property</h2>
          <p className="sec-sub">Don't spend hours scrolling listings. Tell us what you want and our team will come back to you with verified options.</p>
          <div className="form-box">
            <RequestForm initialQuery={searchQuery} />
          </div>
        </div>
      </section>

    </div>
  );
}
