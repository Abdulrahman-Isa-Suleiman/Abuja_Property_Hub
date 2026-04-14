import "./AboutPage.css";
import { Icon }                      from "../components/Icons";
import { TEAM_MEMBERS, CORE_VALUES } from "../data/constants";

export function AboutPage({ setPage }) {
  const go = (id) => { setPage(id); window.scrollTo({ top: 0, behavior: "smooth" }); };

  return (
    <div className="page">

      <section className="about-hero">
        <div className="about-rule" />
        <p className="eyebrow a1">Our Story</p>
        <h1 className="a2">We believe finding a<br />home in <em>Abuja</em> should<br />never be stressful.</h1>
        <p className="a3">PropertyHub was built by Abuja residents frustrated by the noise, scams, and wasted time in the local property market. We decided to build a better way.</p>
      </section>

      <section className="mv-sec">
        <div className="inner">
          <div className="mv-grid">
            <div className="mv-card">
              <div className="mv-icon"><Icon.Target size={24} /></div>
              <h3>Our Mission</h3>
              <p>To radically simplify how people find properties in Abuja — replacing the chaos of agents, fake listings, and endless calls with a single trusted, human-powered request service. We put the client first, always.</p>
            </div>
            <div className="mv-card">
              <div className="mv-icon"><Icon.Star size={24} /></div>
              <h3>Our Vision</h3>
              <p>To become the most trusted property matchmaking platform in Nigeria — starting from Abuja — where every Nigerian can access quality housing without stress, deceit, or unnecessary cost.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="vals-sec">
        <div className="inner">
          <p className="eyebrow">What Drives Us</p>
          <h2 className="sec-title">Our Core Values</h2>
          <p className="sec-sub">Everything we do flows from these principles.</p>
          <div className="vals-grid">
            {CORE_VALUES.map(v => (
              <div className="vcard" key={v.h}>
                <div className="vlabel">{v.l}</div>
                <h4>{v.h}</h4>
                <p>{v.p}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="team-sec">
        <div className="inner">
          <p className="eyebrow">The People</p>
          <h2 className="sec-title">Meet the Team</h2>
          <p className="sec-sub">A small, dedicated team with deep roots in Abuja's property market.</p>
          <div className="team-grid">
            {TEAM_MEMBERS.map(m => (
              <div className="tcard" key={m.name}>
                <div className={`tav ${m.cls}`}><Icon.User size={50} /></div>
                <div className="tinfo">
                  <div className="tname">{m.name}</div>
                  <div className="trole">{m.role}</div>
                  <p className="tbio">{m.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="about-cta-sec">
        <h2>Ready to find your<br />perfect property?</h2>
        <p>Submit a request and we'll get back to you within 24 hours.</p>
        <button className="cta-lt" onClick={() => go("home")}>Submit a Request →</button>
      </section>

    </div>
  );
}
