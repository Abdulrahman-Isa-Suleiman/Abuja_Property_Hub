import { useState, useRef, useEffect } from "react";

const GLOBAL_STYLES = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400;1,500&family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  :root {
    --paper:    #FFFFFF;
    --off:      #F9F7F5;
    --surface:  #F3F0ED;
    --border:   #E8E3DE;
    --mist:     #D4CEC8;
    --stone:    #A89E94;
    --charcoal: #3D3D3D;
    --ink:      #1C1C1C;
    --accent:   #8B7355;
    --accent-lt:#F0EAE2;
    --accent-md:#C9B89E;
    --white:    #FFFFFF;
    --font-display: 'Cormorant Garamond', Georgia, serif;
    --font-body:    'DM Sans', sans-serif;
    --radius:   6px;
    --radius-sm:3px;
  }
  html { scroll-behavior: smooth; }
  body { font-family: var(--font-body); background: var(--off); color: var(--ink); -webkit-font-smoothing: antialiased; overflow-x: hidden; }

  .navbar { position:fixed; top:0; left:0; right:0; z-index:200; display:flex; align-items:center; justify-content:space-between; padding:0 4rem; height:70px; background:rgba(255,255,255,0.92); backdrop-filter:blur(24px); border-bottom:1px solid var(--border); transition:all 0.3s; }
  .navbar.scrolled { background:rgba(255,255,255,0.98); box-shadow:0 1px 30px rgba(28,28,28,0.06); }
  .nav-logo { font-family:var(--font-display); font-size:1.45rem; font-weight:600; letter-spacing:0.07em; color:var(--ink); cursor:pointer; user-select:none; }
  .nav-logo span { color:var(--accent); }
  .nav-links { display:flex; list-style:none; align-items:center; }
  .nav-link { font-size:0.74rem; letter-spacing:0.13em; text-transform:uppercase; color:var(--stone); background:none; border:none; padding:0.5rem 1.3rem; cursor:pointer; font-family:var(--font-body); transition:color 0.2s; position:relative; }
  .nav-link::after { content:''; position:absolute; bottom:0; left:1.3rem; right:1.3rem; height:1px; background:var(--accent); transform:scaleX(0); transition:transform 0.22s ease; }
  .nav-link:hover::after,.nav-link.active::after { transform:scaleX(1); }
  .nav-link:hover,.nav-link.active { color:var(--ink); }
  .nav-cta { background:var(--ink); color:var(--white); border:none; padding:0.58rem 1.4rem; font-family:var(--font-body); font-size:0.73rem; letter-spacing:0.11em; text-transform:uppercase; cursor:pointer; border-radius:var(--radius-sm); margin-left:1rem; transition:background 0.2s,transform 0.15s; }
  .nav-cta:hover { background:var(--charcoal); transform:translateY(-1px); }
  .nav-hamburger { display:none; background:none; border:none; cursor:pointer; flex-direction:column; gap:5px; padding:4px; }
  .nav-hamburger span { display:block; width:22px; height:1.5px; background:var(--ink); }
  .mobile-menu { position:fixed; top:70px; left:0; right:0; z-index:199; background:rgba(255,255,255,0.98); backdrop-filter:blur(20px); border-bottom:1px solid var(--border); padding:1.2rem 2rem; display:none; flex-direction:column; gap:0; }
  .mobile-menu.open { display:flex; }
  .mobile-nav-link { background:none; border:none; font-family:var(--font-body); font-size:0.82rem; letter-spacing:0.1em; text-transform:uppercase; color:var(--stone); cursor:pointer; padding:0.85rem 0; text-align:left; border-bottom:1px solid var(--border); transition:color 0.2s; }
  .mobile-nav-link:last-child { border-bottom:none; }
  .mobile-nav-link.active { color:var(--accent); }
  .page { min-height:100vh; padding-top:70px; }

  @keyframes fadeUp { from{opacity:0;transform:translateY(22px)} to{opacity:1;transform:translateY(0)} }
  @keyframes spin { to{transform:rotate(360deg)} }
  @keyframes scaleIn { from{transform:scale(0.55);opacity:0} to{transform:scale(1);opacity:1} }
  @keyframes fadeIn { from{opacity:0} to{opacity:1} }
  @keyframes slideInRight { from{transform:translateX(100%)} to{transform:translateX(0)} }
  .a1{opacity:0;animation:fadeUp 0.7s 0.08s forwards}
  .a2{opacity:0;animation:fadeUp 0.7s 0.2s forwards}
  .a3{opacity:0;animation:fadeUp 0.7s 0.34s forwards}
  .a4{opacity:0;animation:fadeUp 0.7s 0.48s forwards}
  .a5{opacity:0;animation:fadeUp 0.7s 0.62s forwards}

  .eyebrow { font-size:0.68rem; letter-spacing:0.24em; text-transform:uppercase; color:var(--accent); font-weight:500; margin-bottom:0.9rem; text-align:center; }
  .sec-title { font-family:var(--font-display); font-size:clamp(2rem,4vw,2.9rem); font-weight:400; text-align:center; color:var(--ink); margin-bottom:1rem; letter-spacing:-0.01em; line-height:1.15; }
  .sec-sub { text-align:center; color:var(--stone); font-size:0.92rem; line-height:1.75; max-width:500px; margin:0 auto 3.5rem; font-weight:300; }
  .inner { max-width:1160px; margin:0 auto; }

  .footer { background:var(--ink); color:var(--mist); padding:4rem 2rem 2rem; }
  .footer-inner { max-width:1160px; margin:0 auto; }
  .footer-top { display:grid; grid-template-columns:1.6fr 1fr 1fr 1fr; gap:3rem; margin-bottom:2.5rem; }
  .footer-brand { font-family:var(--font-display); font-size:1.5rem; color:var(--white); font-weight:600; letter-spacing:0.07em; margin-bottom:0.7rem; }
  .footer-brand span { color:var(--accent); }
  .footer-desc { font-size:0.81rem; line-height:1.7; color:var(--stone); font-weight:300; max-width:220px; }
  .fcol h4 { font-size:0.65rem; letter-spacing:0.2em; text-transform:uppercase; color:var(--stone); font-weight:500; margin-bottom:1.1rem; }
  .fcol ul { list-style:none; display:flex; flex-direction:column; gap:0.65rem; }
  .fl { font-size:0.83rem; color:rgba(212,206,200,0.55); background:none; border:none; cursor:pointer; font-family:var(--font-body); text-align:left; padding:0; transition:color 0.2s; }
  .fl:hover { color:var(--white); }
  .footer-bottom { border-top:1px solid rgba(168,158,148,0.12); padding-top:1.8rem; display:flex; justify-content:space-between; align-items:center; font-size:0.74rem; color:var(--stone); }

  /* HERO */
  .hero { min-height:calc(100vh - 70px); display:flex; flex-direction:column; align-items:center; justify-content:center; padding:5rem 2rem 4rem; position:relative; overflow:hidden; background:var(--white); }
  .hero-rule { position:absolute; top:0; left:0; right:0; height:3px; background:linear-gradient(90deg,transparent 0%,var(--accent) 30%,var(--accent-md) 70%,transparent 100%); opacity:0.55; }
  .orb { position:absolute; border-radius:50%; filter:blur(100px); pointer-events:none; }
  .orb1 { width:600px; height:600px; background:radial-gradient(circle,rgba(139,115,85,0.06) 0%,transparent 70%); top:-120px; right:-100px; }
  .orb2 { width:400px; height:400px; background:radial-gradient(circle,rgba(168,158,148,0.05) 0%,transparent 70%); bottom:0; left:-60px; }
  .hero-ey { font-size:0.68rem; letter-spacing:0.24em; text-transform:uppercase; color:var(--accent); font-weight:500; margin-bottom:1.4rem; }
  .hero-h { font-family:var(--font-display); font-size:clamp(2.8rem,6vw,5.4rem); font-weight:400; line-height:1.08; text-align:center; color:var(--ink); max-width:820px; margin-bottom:1.4rem; letter-spacing:-0.015em; }
  .hero-h em { font-style:italic; color:var(--accent); }
  .hero-p { font-size:0.97rem; color:var(--stone); line-height:1.78; text-align:center; max-width:420px; margin-bottom:3.2rem; font-weight:300; }
  .sbox { width:100%; max-width:620px; }
  .sbox-wrap { display:flex; align-items:center; background:var(--white); border:1.5px solid var(--border); border-radius:var(--radius); box-shadow:0 8px 40px rgba(28,28,28,0.07); overflow:hidden; transition:box-shadow 0.3s,border-color 0.3s; }
  .sbox-wrap:focus-within { border-color:var(--accent); box-shadow:0 8px 40px rgba(28,28,28,0.1),0 0 0 3px rgba(139,115,85,0.1); }
  .sbox-icon { padding:0 1.1rem; color:var(--mist); flex-shrink:0; display:flex; align-items:center; }
  .sbox-input { flex:1; border:none; outline:none; background:transparent; font-family:var(--font-body); font-size:0.92rem; color:var(--ink); padding:1.05rem 0.4rem; }
  .sbox-input::placeholder { color:var(--mist); }
  .sbox-btn { background:var(--ink); color:var(--white); border:none; padding:0 1.8rem; min-height:52px; font-family:var(--font-body); font-size:0.76rem; letter-spacing:0.1em; text-transform:uppercase; cursor:pointer; transition:background 0.2s; white-space:nowrap; flex-shrink:0; }
  .sbox-btn:hover { background:var(--charcoal); }
  .hero-tags { display:flex; flex-wrap:wrap; gap:0.5rem; justify-content:center; margin-top:1rem; }
  .htag { font-size:0.72rem; color:var(--stone); background:var(--off); border:1px solid var(--border); border-radius:var(--radius-sm); padding:0.28rem 0.85rem; cursor:pointer; transition:all 0.2s; letter-spacing:0.04em; }
  .htag:hover { background:var(--surface); color:var(--charcoal); border-color:var(--mist); }
  .hero-stats { display:flex; gap:5rem; margin-top:5rem; position:relative; z-index:1; }
  .hstat { text-align:center; }
  .hstat-n { font-family:var(--font-display); font-size:2.5rem; font-weight:500; color:var(--ink); display:block; line-height:1; }
  .hstat-l { font-size:0.67rem; color:var(--stone); letter-spacing:0.1em; text-transform:uppercase; margin-top:0.4rem; display:block; }
  .hdiv { width:1px; height:48px; background:var(--border); align-self:center; }

  .how-sec { padding:7rem 2rem; background:var(--off); }
  .how-grid { display:grid; grid-template-columns:repeat(3,1fr); gap:2rem; }
  .how-card { padding:2.6rem 2rem; border:1px solid var(--border); border-radius:var(--radius); background:var(--white); transition:transform 0.3s,box-shadow 0.3s; }
  .how-card:hover { transform:translateY(-4px); box-shadow:0 14px 48px rgba(28,28,28,0.07); }
  .how-n { font-family:var(--font-display); font-size:3.5rem; font-weight:300; color:var(--border); line-height:1; margin-bottom:1.2rem; letter-spacing:-0.02em; }
  .how-card h3 { font-family:var(--font-display); font-size:1.3rem; font-weight:500; color:var(--ink); margin-bottom:0.7rem; }
  .how-card p { font-size:0.85rem; color:var(--stone); line-height:1.75; font-weight:300; }

  .trust-sec { padding:5.5rem 2rem; background:var(--white); }
  .trust-grid { display:grid; grid-template-columns:repeat(4,1fr); gap:1.5rem; }
  .trust-card { text-align:center; padding:2rem 1.3rem; border:1px solid var(--border); border-radius:var(--radius); background:var(--off); transition:transform 0.25s,box-shadow 0.25s,background 0.2s; }
  .trust-card:hover { transform:translateY(-3px); box-shadow:0 10px 34px rgba(28,28,28,0.06); background:var(--white); }
  .trust-icon { width:46px; height:46px; margin:0 auto 0.9rem; display:flex; align-items:center; justify-content:center; background:var(--accent-lt); border-radius:50%; color:var(--accent); }
  .trust-card h4 { font-family:var(--font-display); font-size:1.05rem; font-weight:500; color:var(--ink); margin-bottom:0.45rem; }
  .trust-card p { font-size:0.81rem; color:var(--stone); line-height:1.65; font-weight:300; }

  /* ══ FORM ══ */
  .form-sec { padding:7rem 2rem; background:var(--off); position:relative; }
  .form-sec::before { content:''; position:absolute; top:0; left:0; right:0; height:1px; background:linear-gradient(90deg,transparent,var(--border),transparent); }
  .form-box { max-width:800px; margin:0 auto; background:var(--white); border:1px solid var(--border); border-radius:10px; box-shadow:0 20px 80px rgba(28,28,28,0.07); overflow:hidden; }
  .fhead { padding:2.4rem 3rem 2rem; border-bottom:1px solid var(--border); background:var(--white); position:relative; }
  .fhead::before { content:''; position:absolute; left:0; top:0; bottom:0; width:3px; background:var(--accent); }
  .fhead h2 { font-family:var(--font-display); font-size:1.95rem; font-weight:400; color:var(--ink); margin-bottom:0.3rem; letter-spacing:-0.01em; }
  .fhead p { font-size:0.84rem; color:var(--stone); font-weight:300; }
  .fbody { padding:2.5rem 3rem 3rem; background:var(--white); }
  .frow { display:grid; gap:1.4rem; margin-bottom:1.4rem; }
  .frow.c2 { grid-template-columns:1fr 1fr; }
  .frow.c3 { grid-template-columns:1fr 1fr 1fr; }
  .frow.c1 { grid-template-columns:1fr; }
  .ff { display:flex; flex-direction:column; gap:0.45rem; }
  .flabel { font-size:0.68rem; letter-spacing:0.12em; text-transform:uppercase; color:var(--charcoal); font-weight:500; display:flex; align-items:center; gap:0.3rem; }
  .freq { color:var(--accent); }
  .finput,.fselect,.ftextarea { border:1.5px solid var(--border); border-radius:var(--radius-sm); background:var(--white); font-family:var(--font-body); font-size:0.9rem; color:var(--ink); padding:0.78rem 0.95rem; transition:border-color 0.2s,box-shadow 0.2s; outline:none; width:100%; }
  .finput:focus,.fselect:focus,.ftextarea:focus { border-color:var(--accent); box-shadow:0 0 0 3px rgba(139,115,85,0.08); }
  .finput::placeholder,.ftextarea::placeholder { color:var(--mist); }
  .finput.err,.fselect.err { border-color:#C03030; box-shadow:0 0 0 3px rgba(192,48,48,0.07); }
  .emsg { font-size:0.69rem; color:#C03030; display:flex; align-items:center; gap:0.3rem; }
  .fselect { cursor:pointer; appearance:none; background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8'%3E%3Cpath d='M1 1l5 5 5-5' stroke='%23A89E94' stroke-width='1.5' fill='none' stroke-linecap='round'/%3E%3C/svg%3E"); background-repeat:no-repeat; background-position:right 0.9rem center; padding-right:2.4rem; }
  .ftextarea { resize:vertical; min-height:100px; line-height:1.6; }

  .tgroup { display:flex; background:var(--off); border:1.5px solid var(--border); border-radius:var(--radius-sm); overflow:hidden; padding:3px; gap:2px; }
  .tbtn { flex:1; padding:0.62rem 0.5rem; border:none; background:transparent; font-family:var(--font-body); font-size:0.76rem; letter-spacing:0.07em; color:var(--stone); cursor:pointer; transition:all 0.2s; text-transform:uppercase; border-radius:calc(var(--radius-sm) - 1px); }
  .tbtn.on { background:var(--white); color:var(--ink); font-weight:500; box-shadow:0 1px 4px rgba(28,28,28,0.1); }
  .tbtn:hover:not(.on) { color:var(--charcoal); background:rgba(255,255,255,0.5); }

  /* Rooms stepper */
  .rooms-stepper { display:flex; align-items:stretch; background:var(--white); border:1.5px solid var(--border); border-radius:var(--radius-sm); overflow:hidden; height:46px; transition:border-color 0.2s; }
  .rooms-stepper:focus-within { border-color:var(--accent); box-shadow:0 0 0 3px rgba(139,115,85,0.08); }
  .rooms-btn { width:46px; border:none; background:transparent; color:var(--stone); cursor:pointer; display:flex; align-items:center; justify-content:center; font-size:1.1rem; line-height:1; transition:background 0.15s,color 0.15s; flex-shrink:0; user-select:none; font-family:var(--font-body); }
  .rooms-btn:hover:not(:disabled) { background:var(--off); color:var(--ink); }
  .rooms-btn:disabled { opacity:0.25; cursor:default; }
  .rooms-btn:first-child { border-right:1px solid var(--border); }
  .rooms-btn:last-child  { border-left:1px solid var(--border); }
  .rooms-val { flex:1; text-align:center; font-size:1rem; font-weight:500; color:var(--ink); font-family:var(--font-body); display:flex; align-items:center; justify-content:center; }
  .rooms-val.any { font-size:0.74rem; color:var(--mist); font-weight:400; letter-spacing:0.04em; }

  /* ── Price slider ── */
  .price-slider-wrap { background:var(--white); border:1.5px solid var(--border); border-radius:var(--radius); overflow:hidden; }
  .price-display { display:grid; grid-template-columns:1fr auto 1fr; align-items:stretch; border-bottom:1.5px solid var(--border); }
  .price-val-box { padding:0.85rem 1.1rem; }
  .price-val-box:first-child { border-right:1px solid var(--border); }
  .price-val-box:last-child  { text-align:right; }
  .price-val-label { display:block; font-size:0.58rem; letter-spacing:0.15em; text-transform:uppercase; color:var(--stone); margin-bottom:0.18rem; font-weight:500; }
  .price-val-amount { display:block; font-size:1.05rem; font-weight:500; color:var(--ink); font-family:var(--font-body); line-height:1.1; letter-spacing:-0.01em; }
  .price-val-amount.edge { color:var(--mist); font-weight:400; font-size:0.82rem; letter-spacing:0; }
  .price-sep-col { display:flex; align-items:center; justify-content:center; padding:0 0.7rem; border-right:1px solid var(--border); }
  .price-sep-dash { width:10px; height:1.5px; background:var(--mist); border-radius:1px; }
  .price-track-wrap { padding:1.4rem 1.4rem 1.1rem; }
  .price-track { position:relative; height:3px; background:var(--border); border-radius:2px; margin:0 10px; }
  .price-fill { position:absolute; top:0; height:100%; background:var(--accent); border-radius:2px; pointer-events:none; }
  .price-thumb { position:absolute; width:calc(100% + 20px); left:-10px; top:-10px; height:23px; appearance:none; background:transparent; pointer-events:none; outline:none; margin:0; }
  .price-thumb::-webkit-slider-thumb { appearance:none; width:22px; height:22px; border-radius:50%; background:var(--white); border:2px solid var(--accent); box-shadow:0 1px 6px rgba(28,28,28,0.12),0 2px 12px rgba(139,115,85,0.22); pointer-events:all; cursor:grab; transition:transform 0.13s,box-shadow 0.13s; }
  .price-thumb::-webkit-slider-thumb:hover { transform:scale(1.14); box-shadow:0 2px 10px rgba(28,28,28,0.14),0 4px 18px rgba(139,115,85,0.32); }
  .price-thumb::-webkit-slider-thumb:active { cursor:grabbing; }
  .price-thumb::-moz-range-thumb { width:22px; height:22px; border-radius:50%; background:var(--white); border:2px solid var(--accent); box-shadow:0 1px 6px rgba(28,28,28,0.12); pointer-events:all; cursor:grab; }
  .price-range-labels { display:flex; justify-content:space-between; margin-top:0.6rem; }
  .price-range-labels span { font-size:0.63rem; color:var(--mist); letter-spacing:0.03em; }

  /* Urgency */
  .ugroup { display:flex; gap:0.9rem; }
  .ucard { flex:1; border:1.5px solid var(--border); border-radius:var(--radius); padding:1.1rem; cursor:pointer; transition:all 0.2s; text-align:center; background:var(--white); }
  .ucard:hover { border-color:var(--accent-md); box-shadow:0 4px 16px rgba(139,115,85,0.1); }
  .ucard.on { border-color:var(--accent); background:var(--accent-lt); }
  .ucard.on .utitle { color:var(--accent); }
  .ucard.on .uicon { color:var(--accent); }
  .uicon { width:34px; height:34px; margin:0 auto 0.5rem; display:flex; align-items:center; justify-content:center; color:var(--stone); transition:color 0.2s; }
  .utitle { font-size:0.82rem; font-weight:500; letter-spacing:0.04em; color:var(--charcoal); transition:color 0.2s; }
  .usub { font-size:0.7rem; color:var(--stone); margin-top:0.25rem; }

  .fdiv { height:1px; background:var(--border); margin:1.8rem 0 1.6rem; }
  .fslabel { font-size:0.68rem; letter-spacing:0.18em; text-transform:uppercase; color:var(--accent); font-weight:500; margin-bottom:1.3rem; display:flex; align-items:center; gap:0.6rem; }
  .fslabel::after { content:''; flex:1; height:1px; background:var(--border); }

  .sbtn { width:100%; padding:1rem; margin-top:1.8rem; background:var(--ink); color:var(--white); border:none; border-radius:var(--radius-sm); font-family:var(--font-body); font-size:0.8rem; letter-spacing:0.13em; text-transform:uppercase; cursor:pointer; transition:all 0.2s; display:flex; align-items:center; justify-content:center; gap:0.7rem; font-weight:500; }
  .sbtn:hover:not(:disabled) { background:var(--charcoal); transform:translateY(-1px); box-shadow:0 5px 22px rgba(28,28,28,0.18); }
  .sbtn:disabled { opacity:0.55; cursor:not-allowed; }
  .spin { width:15px; height:15px; border:2px solid rgba(255,255,255,0.25); border-top-color:var(--white); border-radius:50%; animation:spin 0.7s linear infinite; }

  .confirm { text-align:center; padding:4rem 3rem; background:var(--white); }
  .cicon { width:72px; height:72px; background:var(--accent-lt); border-radius:50%; display:flex; align-items:center; justify-content:center; margin:0 auto 1.8rem; animation:scaleIn 0.45s cubic-bezier(0.34,1.56,0.64,1); color:var(--accent); }
  .confirm h2 { font-family:var(--font-display); font-size:2rem; font-weight:400; color:var(--ink); margin-bottom:0.9rem; }
  .confirm p { font-size:0.9rem; color:var(--stone); line-height:1.8; max-width:440px; margin:0 auto 1.8rem; font-weight:300; }
  .cbadge { display:inline-flex; align-items:center; gap:0.5rem; background:var(--off); border:1px solid var(--border); padding:0.65rem 1.4rem; border-radius:var(--radius-sm); font-size:0.74rem; letter-spacing:0.1em; text-transform:uppercase; color:var(--charcoal); }
  .creset { background:none; border:1.5px solid var(--border); color:var(--stone); padding:0.65rem 1.8rem; border-radius:var(--radius-sm); font-family:var(--font-body); font-size:0.74rem; letter-spacing:0.1em; text-transform:uppercase; cursor:pointer; margin:1.4rem auto 0; display:block; transition:all 0.2s; }
  .creset:hover { background:var(--off); color:var(--charcoal); }

  /* ABOUT */
  .about-hero { padding:6.5rem 2rem 4.5rem; background:var(--white); text-align:center; position:relative; overflow:hidden; border-bottom:1px solid var(--border); }
  .about-rule { position:absolute; top:0; left:0; right:0; height:3px; background:linear-gradient(90deg,transparent,var(--accent),transparent); opacity:0.5; }
  .about-hero h1 { font-family:var(--font-display); font-size:clamp(2.6rem,5vw,4.6rem); font-weight:400; color:var(--ink); line-height:1.1; letter-spacing:-0.015em; max-width:680px; margin:0 auto 1.3rem; }
  .about-hero h1 em { font-style:italic; color:var(--accent); }
  .about-hero p { font-size:0.97rem; color:var(--stone); line-height:1.75; max-width:500px; margin:0 auto; font-weight:300; }
  .mv-sec { padding:6rem 2rem; background:var(--off); }
  .mv-grid { display:grid; grid-template-columns:1fr 1fr; gap:2rem; }
  .mv-card { padding:2.8rem; border:1px solid var(--border); border-radius:var(--radius); background:var(--white); }
  .mv-icon { width:46px; height:46px; margin-bottom:1.1rem; display:flex; align-items:center; justify-content:center; background:var(--accent-lt); border-radius:50%; color:var(--accent); }
  .mv-card h3 { font-family:var(--font-display); font-size:1.65rem; font-weight:500; color:var(--ink); margin-bottom:0.9rem; }
  .mv-card p { font-size:0.88rem; color:var(--stone); line-height:1.8; font-weight:300; }
  .vals-sec { padding:6rem 2rem; background:var(--white); }
  .vals-grid { display:grid; grid-template-columns:repeat(3,1fr); gap:1.5rem; }
  .vcard { padding:2rem 1.8rem; background:var(--off); border:1px solid var(--border); border-radius:var(--radius); transition:transform 0.28s,box-shadow 0.28s,background 0.2s; }
  .vcard:hover { transform:translateY(-3px); box-shadow:0 12px 38px rgba(28,28,28,0.06); background:var(--white); }
  .vlabel { font-size:0.64rem; letter-spacing:0.18em; text-transform:uppercase; color:var(--accent); margin-bottom:0.7rem; font-weight:500; }
  .vcard h4 { font-family:var(--font-display); font-size:1.2rem; font-weight:500; color:var(--ink); margin-bottom:0.55rem; }
  .vcard p { font-size:0.83rem; color:var(--stone); line-height:1.7; font-weight:300; }
  .team-sec { padding:6rem 2rem; background:var(--off); }
  .team-grid { display:grid; grid-template-columns:repeat(3,1fr); gap:2rem; }
  .tcard { border:1px solid var(--border); border-radius:var(--radius); overflow:hidden; background:var(--white); transition:transform 0.28s,box-shadow 0.28s; }
  .tcard:hover { transform:translateY(-4px); box-shadow:0 14px 44px rgba(28,28,28,0.08); }
  .tav { height:190px; display:flex; align-items:center; justify-content:center; }
  .tav1 { background:linear-gradient(135deg,#EDE8E2,#DDD5CC); }
  .tav2 { background:linear-gradient(135deg,#E8E2DA,#D4CCBF); }
  .tav3 { background:linear-gradient(135deg,#E2DDD8,#CBC4BB); }
  .tinfo { padding:1.4rem 1.7rem 1.8rem; }
  .tname { font-family:var(--font-display); font-size:1.2rem; font-weight:500; color:var(--ink); margin-bottom:0.2rem; }
  .trole { font-size:0.72rem; color:var(--accent); letter-spacing:0.1em; text-transform:uppercase; margin-bottom:0.75rem; }
  .tbio { font-size:0.83rem; color:var(--stone); line-height:1.65; font-weight:300; }
  .about-cta-sec { padding:5.5rem 2rem; background:var(--ink); text-align:center; }
  .about-cta-sec h2 { font-family:var(--font-display); font-size:clamp(1.9rem,3.8vw,3rem); font-weight:400; color:var(--white); margin-bottom:0.9rem; letter-spacing:-0.01em; }
  .about-cta-sec p { font-size:0.92rem; color:var(--stone); margin-bottom:2.2rem; font-weight:300; }
  .cta-lt { background:var(--white); color:var(--ink); border:none; padding:0.85rem 2.4rem; font-family:var(--font-body); font-size:0.78rem; letter-spacing:0.12em; text-transform:uppercase; cursor:pointer; border-radius:var(--radius-sm); transition:all 0.2s; }
  .cta-lt:hover { background:var(--off); transform:translateY(-1px); }

  /* LISTINGS */
  .list-hero { padding:4.5rem 2rem 3rem; background:var(--white); text-align:center; border-bottom:1px solid var(--border); }
  .list-hero h1 { font-family:var(--font-display); font-size:clamp(2.2rem,4.5vw,3.6rem); font-weight:400; color:var(--ink); letter-spacing:-0.015em; margin-bottom:0.5rem; }
  .list-hero h1 em { font-style:italic; color:var(--accent); }
  .list-hero p { font-size:0.89rem; color:var(--stone); font-weight:300; }
  .fbar { background:var(--white); border-bottom:1px solid var(--border); padding:1.3rem 2rem; position:sticky; top:70px; z-index:100; }
  .fbar-inner { max-width:1160px; margin:0 auto; display:flex; flex-wrap:wrap; align-items:center; gap:0.7rem; }
  .flbl { font-size:0.67rem; letter-spacing:0.13em; text-transform:uppercase; color:var(--stone); font-weight:500; margin-right:0.1rem; }
  .fchip { font-size:0.74rem; letter-spacing:0.05em; padding:0.42rem 0.95rem; border:1px solid var(--border); border-radius:var(--radius-sm); background:transparent; color:var(--charcoal); cursor:pointer; font-family:var(--font-body); transition:all 0.18s; white-space:nowrap; }
  .fchip:hover { border-color:var(--accent); color:var(--accent); background:var(--accent-lt); }
  .fchip.on { background:var(--ink); color:var(--white); border-color:var(--ink); }
  .fsep { width:1px; height:22px; background:var(--border); margin:0 0.3rem; }
  .fcount { margin-left:auto; font-size:0.72rem; color:var(--stone); letter-spacing:0.05em; white-space:nowrap; }
  .list-sec { padding:3rem 2rem 5.5rem; background:var(--off); }
  .list-grid { display:grid; grid-template-columns:repeat(3,1fr); gap:1.8rem; }
  .pcard { background:var(--white); border:1px solid var(--border); border-radius:var(--radius); overflow:hidden; transition:transform 0.28s,box-shadow 0.28s; }
  .pcard:hover { transform:translateY(-4px); box-shadow:0 16px 50px rgba(28,28,28,0.09); }
  .pimg { height:195px; position:relative; overflow:hidden; display:flex; align-items:center; justify-content:center; }
  .pimg-bg { position:absolute; inset:0; }
  .pbadge { position:absolute; top:0.9rem; left:0.9rem; background:var(--ink); color:var(--white); font-size:0.62rem; letter-spacing:0.13em; text-transform:uppercase; padding:0.28rem 0.7rem; border-radius:2px; }
  .pbadge.rent { background:var(--accent); }
  .pbody { padding:1.4rem 1.6rem 1.3rem; }
  .ptype { font-size:0.64rem; letter-spacing:0.15em; text-transform:uppercase; color:var(--accent); font-weight:500; margin-bottom:0.45rem; }
  .ptitle { font-family:var(--font-display); font-size:1.25rem; font-weight:500; color:var(--ink); line-height:1.22; margin-bottom:0.28rem; }
  .ploc { font-size:0.77rem; color:var(--stone); margin-bottom:0.9rem; display:flex; align-items:center; gap:0.3rem; }
  .pprice { font-family:var(--font-display); font-size:1.35rem; font-weight:500; color:var(--ink); margin-bottom:0.9rem; line-height:1; }
  .pprice span { font-size:0.75rem; font-family:var(--font-body); color:var(--stone); font-weight:300; letter-spacing:0.04em; }
  .pdiv { height:1px; background:var(--border); margin:0.9rem 0; }
  .pfeats { display:flex; flex-wrap:wrap; gap:0.4rem; margin-bottom:0.9rem; }
  .pfeat { font-size:0.7rem; color:var(--charcoal); background:var(--off); border:1px solid var(--border); border-radius:2px; padding:0.24rem 0.6rem; display:flex; align-items:center; gap:0.3rem; }
  .pdesc { font-size:0.81rem; color:var(--stone); line-height:1.65; font-weight:300; }
  .pfoot { padding:1.1rem 1.6rem; border-top:1px solid var(--border); display:flex; align-items:center; justify-content:space-between; background:var(--off); }
  .pstatus { font-size:0.7rem; color:var(--stone); display:flex; align-items:center; gap:0.38rem; }
  .sdot { width:6px; height:6px; border-radius:50%; flex-shrink:0; }
  .penq { background:var(--ink); color:var(--white); border:none; padding:0.52rem 1.2rem; border-radius:var(--radius-sm); font-family:var(--font-body); font-size:0.7rem; letter-spacing:0.09em; text-transform:uppercase; cursor:pointer; transition:background 0.18s; }
  .penq:hover { background:var(--charcoal); }
  .noresult { grid-column:1/-1; text-align:center; padding:5rem 2rem; }
  .noresult h3 { font-family:var(--font-display); font-size:1.75rem; color:var(--ink); margin-bottom:0.7rem; font-weight:400; }
  .noresult p { font-size:0.88rem; color:var(--stone); font-weight:300; }

  /* DRAWER */
  .drawer-overlay { position:fixed; inset:0; background:rgba(28,28,28,0.4); z-index:300; animation:fadeIn 0.18s ease; backdrop-filter:blur(3px); }
  .drawer { position:fixed; right:0; top:0; bottom:0; width:430px; max-width:96vw; background:var(--white); z-index:301; overflow-y:auto; box-shadow:-18px 0 55px rgba(28,28,28,0.1); animation:slideInRight 0.28s cubic-bezier(0.32,0.72,0,1); }
  .drawer-head { padding:1.8rem 2rem 1.5rem; border-bottom:1px solid var(--border); background:var(--off); display:flex; align-items:flex-start; justify-content:space-between; gap:1rem; }
  .drawer-head-info { flex:1; }
  .drawer-prop-type { font-size:0.63rem; letter-spacing:0.15em; text-transform:uppercase; color:var(--accent); font-weight:500; margin-bottom:0.22rem; }
  .drawer-prop-title { font-family:var(--font-display); font-size:1.3rem; font-weight:500; color:var(--ink); line-height:1.2; margin-bottom:0.28rem; }
  .drawer-prop-loc { font-size:0.76rem; color:var(--stone); display:flex; align-items:center; gap:0.28rem; }
  .drawer-close { background:none; border:1px solid var(--border); width:32px; height:32px; border-radius:50%; cursor:pointer; display:flex; align-items:center; justify-content:center; color:var(--stone); flex-shrink:0; transition:all 0.18s; }
  .drawer-close:hover { border-color:var(--ink); color:var(--ink); }
  .drawer-body { padding:1.8rem 2rem; }
  .drawer-price-row { display:flex; align-items:center; justify-content:space-between; padding:0.9rem 1.1rem; background:var(--accent-lt); border:1px solid rgba(139,115,85,0.18); border-radius:var(--radius-sm); margin-bottom:1.4rem; }
  .drawer-price { font-family:var(--font-display); font-size:1.45rem; font-weight:500; color:var(--ink); }
  .drawer-price small { font-size:0.73rem; font-family:var(--font-body); color:var(--stone); font-weight:300; }
  .drawer-badge { font-size:0.62rem; letter-spacing:0.1em; text-transform:uppercase; padding:0.28rem 0.65rem; border-radius:2px; }
  .drawer-badge.rent { background:var(--accent); color:var(--white); }
  .drawer-badge.buy { background:var(--ink); color:var(--white); }
  .drawer-section-label { font-size:0.64rem; letter-spacing:0.17em; text-transform:uppercase; color:var(--accent); font-weight:500; margin-bottom:0.75rem; }
  .drawer-feats { display:flex; flex-wrap:wrap; gap:0.38rem; margin-bottom:1.3rem; }
  .drawer-feat { font-size:0.7rem; color:var(--charcoal); background:var(--off); border:1px solid var(--border); border-radius:2px; padding:0.22rem 0.6rem; display:flex; align-items:center; gap:0.28rem; }
  .drawer-desc { font-size:0.83rem; color:var(--stone); line-height:1.7; font-weight:300; margin-bottom:1.4rem; }
  .drawer-divider { height:1px; background:var(--border); margin:1.4rem 0; }
  .drawer-form-label { font-size:0.65rem; letter-spacing:0.13em; text-transform:uppercase; color:var(--charcoal); font-weight:500; margin-bottom:0.38rem; display:block; }
  .drawer-input { width:100%; border:1.5px solid var(--border); border-radius:var(--radius-sm); background:var(--white); font-family:var(--font-body); font-size:0.88rem; color:var(--ink); padding:0.7rem 0.85rem; margin-bottom:0.85rem; transition:border-color 0.2s,box-shadow 0.2s; outline:none; }
  .drawer-input:focus { border-color:var(--accent); box-shadow:0 0 0 3px rgba(139,115,85,0.08); }
  .drawer-input::placeholder { color:var(--mist); }
  .drawer-textarea { resize:vertical; min-height:85px; line-height:1.6; }
  .drawer-submit { width:100%; padding:0.95rem; background:var(--ink); color:var(--white); border:none; border-radius:var(--radius-sm); font-family:var(--font-body); font-size:0.77rem; letter-spacing:0.13em; text-transform:uppercase; cursor:pointer; transition:all 0.18s; display:flex; align-items:center; justify-content:center; gap:0.55rem; font-weight:500; }
  .drawer-submit:hover:not(:disabled) { background:var(--charcoal); transform:translateY(-1px); }
  .drawer-submit:disabled { opacity:0.55; cursor:not-allowed; }
  .drawer-success { text-align:center; padding:2.5rem 0.5rem; }
  .drawer-success-icon { width:60px; height:60px; background:var(--accent-lt); border-radius:50%; display:flex; align-items:center; justify-content:center; margin:0 auto 1.1rem; color:var(--accent); animation:scaleIn 0.45s cubic-bezier(0.34,1.56,0.64,1); }
  .drawer-success h3 { font-family:var(--font-display); font-size:1.5rem; font-weight:400; color:var(--ink); margin-bottom:0.55rem; }
  .drawer-success p { font-size:0.85rem; color:var(--stone); line-height:1.7; font-weight:300; }

  /* CONTACT */
  .cont-hero { padding:5.5rem 2rem 3.5rem; text-align:center; background:var(--white); border-bottom:1px solid var(--border); }
  .cont-hero h1 { font-family:var(--font-display); font-size:clamp(2.6rem,4.5vw,4rem); font-weight:400; color:var(--ink); letter-spacing:-0.015em; margin-bottom:0.9rem; line-height:1.1; }
  .cont-hero p { font-size:0.97rem; color:var(--stone); font-weight:300; max-width:420px; margin:0 auto; line-height:1.75; }
  .cont-main { padding:3.5rem 2rem 6rem; background:var(--off); }
  .cont-grid { display:grid; grid-template-columns:1fr 1.5fr; gap:3.5rem; max-width:980px; margin:0 auto; align-items:start; }
  .cinfo { display:flex; flex-direction:column; gap:1.8rem; }
  .cinfo-item { display:flex; gap:1.1rem; align-items:flex-start; }
  .cinfo-icon { width:44px; height:44px; background:var(--white); border:1px solid var(--border); border-radius:var(--radius-sm); display:flex; align-items:center; justify-content:center; flex-shrink:0; color:var(--accent); }
  .cinfo-text h4 { font-size:0.68rem; letter-spacing:0.13em; text-transform:uppercase; color:var(--charcoal); font-weight:500; margin-bottom:0.3rem; }
  .cinfo-text p { font-size:0.85rem; color:var(--stone); line-height:1.6; font-weight:300; }
  .cform-card { background:var(--white); border:1px solid var(--border); border-radius:var(--radius); box-shadow:0 18px 60px rgba(28,28,28,0.06); overflow:hidden; }
  .cform-head { padding:1.8rem 2.4rem 1.6rem; border-bottom:1px solid var(--border); background:var(--off); }
  .cform-head h3 { font-family:var(--font-display); font-size:1.6rem; font-weight:400; color:var(--ink); }
  .cform-head p { font-size:0.83rem; color:var(--stone); font-weight:300; margin-top:0.28rem; }
  .cform-body { padding:1.8rem 2.4rem 2.4rem; background:var(--white); }

  @media (max-width:1000px) {
    .how-grid,.trust-grid { grid-template-columns:1fr 1fr; }
    .list-grid { grid-template-columns:1fr 1fr; }
    .team-grid { grid-template-columns:1fr 1fr; }
    .footer-top { grid-template-columns:1fr 1fr; gap:2.5rem; }
    .cont-grid { grid-template-columns:1fr; gap:2rem; }
  }
  @media (max-width:700px) {
    .navbar { padding:0 1.4rem; }
    .nav-links,.nav-cta { display:none; }
    .nav-hamburger { display:flex; }
    .how-grid,.trust-grid,.vals-grid,.mv-grid,.team-grid { grid-template-columns:1fr; }
    .list-grid { grid-template-columns:1fr; }
    .footer-top { grid-template-columns:1fr; gap:1.8rem; }
    .footer-bottom { flex-direction:column; gap:0.8rem; text-align:center; }
    .hero-stats { flex-direction:column; gap:1.5rem; align-items:center; margin-top:3rem; }
    .hdiv { display:none; }
    .fhead,.fbody { padding-left:1.4rem; padding-right:1.4rem; }
    .frow.c2,.frow.c3 { grid-template-columns:1fr; }
    .ugroup { flex-direction:column; }
    .fbar-inner { gap:0.4rem; }
    .cform-head,.cform-body { padding-left:1.4rem; padding-right:1.4rem; }
    .drawer { width:100%; }
  }
`;

// ─── ICONS ────────────────────────────────────────────────────────────────────
const Icon = {
  Search:     () => <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>,
  MapPin:     ({size=11}) => <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>,
  Check:      ({size=8,color="var(--accent)"}) => <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round"><polyline points="20 6 9 17 4 12"/></svg>,
  Phone:      ({size=18}) => <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 1.27h3a2 2 0 0 1 2 1.72c.13.97.38 1.9.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.91a16 16 0 0 0 6.06 6.06l1.8-1.81a2 2 0 0 1 2.11-.45c.91.32 1.84.57 2.81.7A2 2 0 0 1 22 15.92v1z"/></svg>,
  Mail:       ({size=18}) => <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>,
  MsgCircle:  ({size=18}) => <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>,
  Location:   ({size=18}) => <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>,
  Lightning:  ({size=20}) => <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>,
  Calendar:   ({size=20}) => <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>,
  Magnify:    ({size=20}) => <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>,
  Shield:     ({size=20}) => <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><polyline points="9 12 11 14 15 10"/></svg>,
  Zap:        ({size=20}) => <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>,
  Lock:       ({size=20}) => <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>,
  Target:     ({size=26}) => <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg>,
  Star:       ({size=26}) => <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>,
  User:       ({size=50}) => <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="rgba(139,115,85,0.38)" strokeWidth="0.9" strokeLinecap="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>,
  Close:      ({size=13}) => <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>,
  CheckCircle:({size=28}) => <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>,
  Envelope:   ({size=24}) => <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>,
  Bed:        ({size=13}) => <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><path d="M2 20v-8a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v8"/><path d="M2 14h20"/><path d="M7 14v-3a1 1 0 0 1 1-1h8a1 1 0 0 1 1 1v3"/><line x1="4" y1="20" x2="4" y2="22"/><line x1="20" y1="20" x2="20" y2="22"/></svg>,
  Bath:       ({size=13}) => <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><path d="M9 6 6.5 3.5a1.5 1.5 0 0 0-1-.5C4.683 3 4 3.683 4 4.5V17a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-5"/><line x1="10" y1="5" x2="8" y2="7"/><line x1="2" y1="12" x2="22" y2="12"/><line x1="7" y1="19" x2="7" y2="21"/><line x1="17" y1="19" x2="17" y2="21"/></svg>,
};

// ─── DATA ────────────────────────────────────────────────────────────────────
const LISTINGS = [
  {id:1, type:"Apartment",tenure:"Rent",title:"3-Bedroom Serviced Apartment",area:"Gwarinpa",city:"Abuja",price:"₦3,500,000",period:"/yr",gradient:"linear-gradient(135deg,#EAE4DE,#D8D0C8)",features:["3 Bedrooms","2 Bathrooms","Parking","24h Security","Fitted Kitchen"],desc:"Spacious serviced apartment in a serene gated estate. All rooms ensuite, modern fittings, constant water and power backup.",available:true},
  {id:2, type:"Land",tenure:"Buy",title:"600sqm Dry Residential Plot",area:"Lugbe",city:"Abuja",price:"₦18,000,000",period:"",gradient:"linear-gradient(135deg,#E0D8CE,#CCC4BA)",features:["600 sqm","Dry Land","Registered Title","Good Road Access","Fenced"],desc:"Corner-piece dry land with good road network. C of O available. Suitable for residential or commercial development.",available:true},
  {id:3, type:"Duplex",tenure:"Rent",title:"4-Bedroom Detached Duplex",area:"Wuse 2",city:"Abuja",price:"₦6,500,000",period:"/yr",gradient:"linear-gradient(135deg,#DCDACE,#C8C4BA)",features:["4 Bedrooms","4 Bathrooms","BQ Included","Large Compound","CCTV"],desc:"Premium fully-detached duplex in prime Wuse 2 location. Walking distance to major banks, restaurants and the business district.",available:true},
  {id:4, type:"Self-con",tenure:"Rent",title:"Self-Contained Studio Flat",area:"Dutse",city:"Abuja",price:"₦350,000",period:"/yr",gradient:"linear-gradient(135deg,#E4DED8,#D0CAC4)",features:["Self-contained","Running Water","Prepaid Meter","Good Security"],desc:"Clean self-contained apartment perfect for a single occupant or young couple. Located on a tarred road.",available:true},
  {id:5, type:"Villa",tenure:"Buy",title:"5-Bedroom Luxury Villa",area:"Maitama",city:"Abuja",price:"₦280,000,000",period:"",gradient:"linear-gradient(135deg,#D8D0C8,#C4BCAF)",features:["5 Bedrooms","5 Bathrooms","Swimming Pool","Home Cinema","Staff Quarters"],desc:"Architecturally designed luxury villa in Maitama's most exclusive enclave. Fully automated, landscaped garden, 2 BQ units.",available:true},
  {id:6, type:"Apartment",tenure:"Buy",title:"2-Bedroom Terrace Apartment",area:"Jabi",city:"Abuja",price:"₦45,000,000",period:"",gradient:"linear-gradient(135deg,#E0D8D0,#CCCAB8)",features:["2 Bedrooms","2 Bathrooms","Rooftop Access","Gym","24h Power"],desc:"Modern apartment in a newly completed estate near Jabi Lake. Excellent finishing and strong investment value.",available:false},
  {id:7, type:"House",tenure:"Rent",title:"3-Bedroom Bungalow",area:"Galadimawa",city:"Abuja",price:"₦1,800,000",period:"/yr",gradient:"linear-gradient(135deg,#E2DAD2,#CEC8C0)",features:["3 Bedrooms","2 Bathrooms","Big Compound","Borehole","Solar Backup"],desc:"Comfortable bungalow on a quiet residential street. Large compound suitable for families, reliable water and power.",available:true},
  {id:8, type:"Land",tenure:"Buy",title:"1,000sqm Commercial Plot",area:"Kuje",city:"Abuja",price:"₦8,500,000",period:"",gradient:"linear-gradient(135deg,#DAD2CA,#C6C0B8)",features:["1,000 sqm","Commercial Use","Survey Plan","Accessible Road"],desc:"Prime commercial land along the Kuje bypass. Suitable for warehousing, event center, or mixed-use development.",available:true},
  {id:9, type:"Self-con",tenure:"Rent",title:"Modern Self-Contained Unit",area:"Kubwa",city:"Abuja",price:"₦280,000",period:"/yr",gradient:"linear-gradient(135deg,#E6E0D8,#D2CCC4)",features:["Self-contained","Tiled Floors","Water Heater","Secure Estate"],desc:"Newly built self-contain in a clean compound. Close to Kubwa expressway and daily market.",available:true},
];
const TYPES   = ["All","Apartment","House","Duplex","Villa","Self-con","Land"];
const TENURES = ["All","Rent","Buy"];

// ─── HELPERS ─────────────────────────────────────────────────────────────────
function parseQuery(q) {
  if (!q) return {};
  const r={}, l=q.toLowerCase();
  const tm={apartment:"Apartment",flat:"Apartment",duplex:"Duplex",house:"House",bungalow:"House",land:"Land",plot:"Land",villa:"Villa","self-con":"Self-con",selfcon:"Self-con",studio:"Apartment"};
  for(const [k,v] of Object.entries(tm)){if(l.includes(k)){r.propertyType=v;break;}}
  if(l.includes("buy")||l.includes("purchase"))r.tenure="Buy";
  else if(l.includes("rent"))r.tenure="Rent";
  const areas=["garki","maitama","wuse","jabi","gwarinpa","lugbe","wuse 2","dutse","kubwa","kuje","galadimawa","asokoro","gudu","lifecamp","life camp","katampe","utako","mpape","dawaki"];
  for(const a of areas){if(l.includes(a)){r.location=a.replace(/\b\w/g,c=>c.toUpperCase());break;}}
  if(!r.location){const m=q.match(/(?:\bin\b|\bat\b|\baround\b)\s+([A-Za-z][A-Za-z0-9\s\-]{1,28})/i);if(m)r.location=m[1].trim().replace(/\b\w/g,c=>c.toUpperCase());}
  // Extract bedroom count: "3 bed", "3-bed", "3 bedroom", "3br"
  const bedM=l.match(/(\d+)\s*[-–]?\s*(?:bed(?:room)?s?|br\b)/);
  if(bedM)r.bedrooms=Math.min(10,parseInt(bedM[1],10));
  return r;
}

// ─── PRICE SLIDER ────────────────────────────────────────────────────────────
const TENURE_RANGES={
  Rent:{min:100_000,   max:20_000_000},
  Buy: {min:5_000_000, max:2_000_000_000},
  Both:{min:100_000,   max:2_000_000_000},
};
function posToPrice(pos,min,max){return Math.round(Math.exp(Math.log(min)+(pos/1000)*(Math.log(max)-Math.log(min))));}
function formatPrice(v){
  if(v>=1_000_000_000)return`₦${(v/1_000_000_000).toFixed(1)}B`;
  if(v>=1_000_000)return`₦${(v/1_000_000).toFixed(v%1_000_000===0?0:1)}M`;
  if(v>=1_000)return`₦${(v/1_000).toFixed(0)}K`;
  return`₦${v}`;
}

function PriceSlider({tenure}){
  const {min,max}=TENURE_RANGES[tenure]||TENURE_RANGES.Both;
  const [lo,setLo]=useState(0);
  const [hi,setHi]=useState(1000);
  useEffect(()=>{setLo(0);setHi(1000);},[tenure]);
  const loP=posToPrice(lo,min,max), hiP=posToPrice(hi,min,max);
  const loFill=(lo/1000)*100, hiFill=(hi/1000)*100;
  return(
    <div className="price-slider-wrap">
      <div className="price-display">
        <div className="price-val-box">
          <span className="price-val-label">Min budget</span>
          <span className={`price-val-amount${lo===0?" edge":""}`}>{lo===0?"Any":formatPrice(loP)}</span>
        </div>
        <div className="price-sep-col"><div className="price-sep-dash"/></div>
        <div className="price-val-box">
          <span className="price-val-label">Max budget</span>
          <span className={`price-val-amount${hi===1000?" edge":""}`}>{hi===1000?"No limit":formatPrice(hiP)}</span>
        </div>
      </div>
      <div className="price-track-wrap">
        <div className="price-track">
          <div className="price-fill" style={{left:`${loFill}%`,width:`${hiFill-loFill}%`}}/>
          <input type="range" className="price-thumb" min={0} max={1000} value={lo}
            onChange={e=>setLo(Math.min(Number(e.target.value),hi-10))}
            style={{zIndex:lo>=hi-20?5:3}}/>
          <input type="range" className="price-thumb" min={0} max={1000} value={hi}
            onChange={e=>setHi(Math.max(Number(e.target.value),lo+10))}
            style={{zIndex:4}}/>
        </div>
        <div className="price-range-labels"><span>{formatPrice(min)}</span><span>{formatPrice(max)}</span></div>
      </div>
    </div>
  );
}

// ─── ROOMS STEPPER ───────────────────────────────────────────────────────────
function RoomsStepper({value,onChange,min=0,max=10,anyLabel="Any"}){
  return(
    <div className="rooms-stepper">
      <button className="rooms-btn" onClick={()=>onChange(Math.max(min,value-1))} disabled={value<=min}>−</button>
      <div className={`rooms-val${value===min?" any":""}`}>{value===min?anyLabel:value}</div>
      <button className="rooms-btn" onClick={()=>onChange(Math.min(max,value+1))} disabled={value>=max}>+</button>
    </div>
  );
}

// ─── NAVBAR ──────────────────────────────────────────────────────────────────
function Navbar({page,setPage}){
  const [scrolled,setScrolled]=useState(false);
  const [open,setOpen]=useState(false);
  useEffect(()=>{const h=()=>setScrolled(window.scrollY>28);window.addEventListener("scroll",h);return()=>window.removeEventListener("scroll",h);},[]);
  const links=[{id:"home",label:"Home"},{id:"listings",label:"Properties"},{id:"about",label:"About"},{id:"contact",label:"Contact"}];
  const go=id=>{setPage(id);setOpen(false);window.scrollTo({top:0,behavior:"smooth"});};
  return(
    <>
      <nav className={`navbar${scrolled?" scrolled":""}`}>
        <span className="nav-logo" onClick={()=>go("home")}>Property<span>Hub</span></span>
        <ul className="nav-links">
          {links.map(l=><li key={l.id}><button className={`nav-link${page===l.id?" active":""}`} onClick={()=>go(l.id)}>{l.label}</button></li>)}
        </ul>
        <button className="nav-cta" onClick={()=>go("home")}>Submit Request</button>
        <button className="nav-hamburger" onClick={()=>setOpen(o=>!o)}><span/><span/><span/></button>
      </nav>
      <div className={`mobile-menu${open?" open":""}`}>
        {links.map(l=><button key={l.id} className={`mobile-nav-link${page===l.id?" active":""}`} onClick={()=>go(l.id)}>{l.label}</button>)}
      </div>
    </>
  );
}

// ─── FOOTER ──────────────────────────────────────────────────────────────────
function Footer({setPage}){
  const go=id=>{setPage(id);window.scrollTo({top:0,behavior:"smooth"});};
  return(
    <footer className="footer">
      <div className="footer-inner">
        <div className="footer-top">
          <div>
            <div className="footer-brand">Property<span>Hub</span></div>
            <p className="footer-desc">Abuja's premier property request platform. Tell us what you need — we find it for you.</p>
          </div>
          <div className="fcol"><h4>Platform</h4><ul>
            <li><button className="fl" onClick={()=>go("home")}>Submit a Request</button></li>
            <li><button className="fl" onClick={()=>go("listings")}>Browse Properties</button></li>
            <li><button className="fl" onClick={()=>go("about")}>How It Works</button></li>
          </ul></div>
          <div className="fcol"><h4>Locations</h4><ul>
            {["Gwarinpa","Wuse 2","Lugbe","Maitama","Jabi","Kubwa"].map(l=><li key={l}><button className="fl" onClick={()=>go("listings")}>{l}</button></li>)}
          </ul></div>
          <div className="fcol"><h4>Contact</h4><ul>
            <li><button className="fl" onClick={()=>go("contact")}>info@propertyhub.ng</button></li>
            <li><button className="fl">+234 800 000 0000</button></li>
            <li><button className="fl">WhatsApp Us</button></li>
          </ul></div>
        </div>
        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} PropertyHub. All rights reserved.</span>
          <span>Made with care for Abuja.</span>
        </div>
      </div>
    </footer>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// REQUEST FORM
// ═══════════════════════════════════════════════════════════════════════════════
function RequestForm({initialQuery}){
  const parsed=parseQuery(initialQuery);
  const blank={propertyType:"",propertyTypeOther:"",location:"",tenure:"Rent",bedrooms:0,bathrooms:0,details:"",urgency:"",name:"",phone:"",email:""};
  const [form,setForm]=useState({
    ...blank,
    ...(parsed.propertyType?{propertyType:parsed.propertyType}:{}),
    ...(parsed.location    ?{location:parsed.location}:{}),
    ...(parsed.tenure      ?{tenure:parsed.tenure}:{}),
    ...(parsed.bedrooms    ?{bedrooms:parsed.bedrooms}:{}),
  });
  const [errors,setErrors]=useState({});
  const [loading,setLoading]=useState(false);
  const [done,setDone]=useState(false);

  useEffect(()=>{
    if(!initialQuery)return;
    const p=parseQuery(initialQuery);
    setForm(f=>({
      ...f,
      ...(p.propertyType?{propertyType:p.propertyType}:{}),
      ...(p.location    ?{location:p.location}:{}),
      ...(p.tenure      ?{tenure:p.tenure}:{}),
      ...(p.bedrooms    ?{bedrooms:p.bedrooms}:{}),
    }));
  },[initialQuery]);

  const set=(k,v)=>{setForm(f=>({...f,[k]:v}));setErrors(e=>({...e,[k]:""}));};
  const validate=()=>{
    const e={};
    if(!form.propertyType)e.propertyType="Please select a property type";
    if(form.propertyType==="Other"&&!form.propertyTypeOther.trim())e.propertyTypeOther="Please describe the property type";
    if(!form.location.trim())e.location="Location is required";
    if(!form.phone.trim())e.phone="Phone number is required";
    setErrors(e);return !Object.keys(e).length;
  };
  const submit=()=>{if(!validate())return;setLoading(true);setTimeout(()=>{setLoading(false);setDone(true);},2000);};
  const noRooms=["Land","Office","Shop"].includes(form.propertyType);

  if(done)return(
    <div className="confirm">
      <div className="cicon"><Icon.CheckCircle size={30}/></div>
      <h2>Request Received</h2>
      <p>We're searching for properties matching your request. You'll receive verified options within <strong>1–10 days</strong>. If we find a match sooner, we'll reach out immediately.</p>
      <div className="cbadge"><Icon.Phone size={12}/>Expect our call or message shortly</div>
      <button className="creset" onClick={()=>{setDone(false);setForm(blank);}}>Submit Another Request</button>
    </div>
  );

  return(
    <>
      <div className="fhead">
        <h2>Tell us what you're looking for</h2>
        <p>Fill in the details and we'll source verified options — no scrolling required.</p>
      </div>
      <div className="fbody">
        <div className="frow c2">
          <div className="ff">
            <label className="flabel">Property Type <span className="freq">*</span></label>
            <select className={`fselect${errors.propertyType?" err":""}`} value={form.propertyType} onChange={e=>set("propertyType",e.target.value)}>
              <option value="">Select type…</option>
              {["House","Apartment","Duplex","Villa","Land","Office","Shop","Self-con","Other"].map(o=><option key={o}>{o}</option>)}
            </select>
            {errors.propertyType&&<span className="emsg">{errors.propertyType}</span>}
            {form.propertyType==="Other"&&(
              <input className={`finput${errors.propertyTypeOther?" err":""}`} style={{marginTop:"0.5rem"}}
                placeholder="Describe the property type…" value={form.propertyTypeOther}
                onChange={e=>set("propertyTypeOther",e.target.value)}/>
            )}
            {errors.propertyTypeOther&&<span className="emsg">{errors.propertyTypeOther}</span>}
          </div>
          <div className="ff">
            <label className="flabel">Preferred Location <span className="freq">*</span></label>
            <input className={`finput${errors.location?" err":""}`} placeholder="e.g. Garki, Maitama, Wuse, Jabi"
              value={form.location} onChange={e=>set("location",e.target.value)}/>
            {errors.location&&<span className="emsg">{errors.location}</span>}
          </div>
        </div>

        <div className="frow c1">
          <div className="ff">
            <label className="flabel">Rent or Buy</label>
            <div className="tgroup">
              {["Rent","Buy","Both"].map(t=><button key={t} className={`tbtn${form.tenure===t?" on":""}`} onClick={()=>set("tenure",t)}>{t}</button>)}
            </div>
          </div>
        </div>

        {!noRooms&&(
          <div className="frow c2">
            <div className="ff">
              <label className="flabel"><Icon.Bed size={12}/>Bedrooms</label>
              <RoomsStepper value={form.bedrooms} onChange={v=>set("bedrooms",v)} min={0} max={10} anyLabel="Any"/>
            </div>
            <div className="ff">
              <label className="flabel"><Icon.Bath size={12}/>Bathrooms</label>
              <RoomsStepper value={form.bathrooms} onChange={v=>set("bathrooms",v)} min={0} max={8} anyLabel="Any"/>
            </div>
          </div>
        )}

        <div className="frow c1">
          <div className="ff">
            <label className="flabel">Budget Range (₦)</label>
            <PriceSlider tenure={form.tenure}/>
          </div>
        </div>

        <div className="frow c1">
          <div className="ff">
            <label className="flabel">Additional Details</label>
            <textarea className="ftextarea"
              placeholder="Furnished? Parking? Dry land? Boys quarters? Good road access? Any other requirements…"
              value={form.details} onChange={e=>set("details",e.target.value)}/>
          </div>
        </div>

        <div className="frow c1">
          <div className="ff">
            <label className="flabel">How Urgent?</label>
            <div className="ugroup">
              {[
                {id:"urgent",  icon:<Icon.Lightning size={20}/>,t:"Urgent",  s:"Need it in 1–5 days"},
                {id:"flexible",icon:<Icon.Calendar  size={20}/>,t:"Flexible",s:"Anytime within 1–10 days"},
              ].map(u=>(
                <div key={u.id} className={`ucard${form.urgency===u.id?" on":""}`} onClick={()=>set("urgency",u.id)}>
                  <div className="uicon">{u.icon}</div>
                  <div className="utitle">{u.t}</div>
                  <div className="usub">{u.s}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="fdiv"/>
        <p className="fslabel">Your Contact Details</p>

        <div className="frow c2">
          <div className="ff">
            <label className="flabel">Your Name</label>
            <input className="finput" placeholder="Full name" value={form.name} onChange={e=>set("name",e.target.value)}/>
          </div>
          <div className="ff">
            <label className="flabel">Phone Number <span className="freq">*</span></label>
            <input className={`finput${errors.phone?" err":""}`} placeholder="+234 800 000 0000" value={form.phone} onChange={e=>set("phone",e.target.value)}/>
            {errors.phone&&<span className="emsg">{errors.phone}</span>}
          </div>
        </div>
        <div className="frow c1">
          <div className="ff">
            <label className="flabel">Email <span style={{color:"var(--stone)",textTransform:"none",letterSpacing:0,fontSize:"0.69rem",fontWeight:300}}>(optional)</span></label>
            <input className="finput" type="email" placeholder="yourname@email.com" value={form.email} onChange={e=>set("email",e.target.value)}/>
          </div>
        </div>
        <button className="sbtn" onClick={submit} disabled={loading}>
          {loading?<><div className="spin"/>Submitting your request…</>:<>Submit Property Request →</>}
        </button>
      </div>
    </>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// ENQUIRY DRAWER
// ═══════════════════════════════════════════════════════════════════════════════
function EnquiryDrawer({property,onClose}){
  const [form,setForm]=useState({name:"",phone:"",email:"",message:""});
  const [loading,setLoading]=useState(false);
  const [done,setDone]=useState(false);
  useEffect(()=>{document.body.style.overflow="hidden";return()=>{document.body.style.overflow="";};},[]);
  const set=(k,v)=>setForm(f=>({...f,[k]:v}));
  const submit=()=>{if(!form.name.trim()||!form.phone.trim())return;setLoading(true);setTimeout(()=>{setLoading(false);setDone(true);},1800);};
  return(
    <>
      <div className="drawer-overlay" onClick={onClose}/>
      <div className="drawer">
        <div className="drawer-head">
          <div className="drawer-head-info">
            <div className="drawer-prop-type">{property.type} · {property.tenure}</div>
            <div className="drawer-prop-title">{property.title}</div>
            <div className="drawer-prop-loc"><Icon.MapPin size={10}/>{property.area}, {property.city}</div>
          </div>
          <button className="drawer-close" onClick={onClose}><Icon.Close size={13}/></button>
        </div>
        <div className="drawer-body">
          {done?(
            <div className="drawer-success">
              <div className="drawer-success-icon"><Icon.CheckCircle size={26}/></div>
              <h3>Enquiry Sent</h3>
              <p>We've received your enquiry and will be in touch shortly — usually within a few hours.</p>
            </div>
          ):(
            <>
              <div className="drawer-price-row">
                <div className="drawer-price">{property.price}<small> {property.period}</small></div>
                <span className={`drawer-badge ${property.tenure.toLowerCase()}`}>{property.tenure}</span>
              </div>
              <div className="drawer-section-label">Features</div>
              <div className="drawer-feats">
                {property.features.map(f=><span className="drawer-feat" key={f}><Icon.Check size={8}/>{f}</span>)}
              </div>
              <p className="drawer-desc">{property.desc}</p>
              <div className="drawer-divider"/>
              <div className="drawer-section-label">Send a Direct Enquiry</div>
              <label className="drawer-form-label">Your Name *</label>
              <input className="drawer-input" placeholder="Full name" value={form.name} onChange={e=>set("name",e.target.value)}/>
              <label className="drawer-form-label">Phone Number *</label>
              <input className="drawer-input" placeholder="+234 800 000 0000" value={form.phone} onChange={e=>set("phone",e.target.value)}/>
              <label className="drawer-form-label">Email (optional)</label>
              <input className="drawer-input" type="email" placeholder="yourname@email.com" value={form.email} onChange={e=>set("email",e.target.value)}/>
              <label className="drawer-form-label">Message</label>
              <textarea className="drawer-input drawer-textarea" placeholder="I'm interested in this property. Please get in touch…" value={form.message} onChange={e=>set("message",e.target.value)}/>
              <button className="drawer-submit" onClick={submit} disabled={loading||!form.name.trim()||!form.phone.trim()}>
                {loading?<><div className="spin"/>Sending…</>:<>Send Enquiry →</>}
              </button>
            </>
          )}
        </div>
      </div>
    </>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// HOME PAGE
// ═══════════════════════════════════════════════════════════════════════════════
function HomePage({setPage}){
  const [query,setQuery]=useState("");
  const [searchQuery,setSearchQuery]=useState("");
  const formRef=useRef(null);
  const tags=["2 bed in Gwarinpa","Land in Lugbe","Self-con in Dutse","Office in Wuse 2","Villa in Maitama"];
  const doSearch=q=>{setSearchQuery(q);setTimeout(()=>formRef.current?.scrollIntoView({behavior:"smooth"}),50);};
  return(
    <div className="page">
      <section className="hero">
        <div className="hero-rule"/>
        <div className="orb orb1"/><div className="orb orb2"/>
        <p className="hero-ey a1">Abuja's Premium Property Request Platform</p>
        <h1 className="hero-h a2">Find your next home, land,<br/>or space in <em>Abuja</em> —<br/>fast and stress-free.</h1>
        <p className="hero-p a3">Tell us what you need, and we'll source the best verified options for you.</p>
        <div className="sbox a4">
          <div className="sbox-wrap">
            <span className="sbox-icon"><Icon.Search/></span>
            <input className="sbox-input" placeholder='e.g. "3 bedroom in Garki" or "Land in Maitama"'
              value={query} onChange={e=>setQuery(e.target.value)} onKeyDown={e=>e.key==="Enter"&&doSearch(query)}/>
            <button className="sbox-btn" onClick={()=>doSearch(query)}>Search</button>
          </div>
          <div className="hero-tags">
            {tags.map(t=><button key={t} className="htag" onClick={()=>{setQuery(t);doSearch(t);}}>{t}</button>)}
          </div>
        </div>
        <div className="hero-stats a5">
          <div className="hstat"><span className="hstat-n">500+</span><span className="hstat-l">Requests Matched</span></div>
          <div className="hdiv"/>
          <div className="hstat"><span className="hstat-n">24h</span><span className="hstat-l">Avg Response Time</span></div>
          <div className="hdiv"/>
          <div className="hstat"><span className="hstat-n">30+</span><span className="hstat-l">Abuja Locations</span></div>
        </div>
      </section>

      <section className="how-sec">
        <div className="inner">
          <p className="eyebrow">How It Works</p>
          <h2 className="sec-title">We do the searching.<br/>You do the deciding.</h2>
          <div className="how-grid">
            {[{n:"01",h:"Submit Your Request",p:"Tell us exactly what you're looking for — size, location, budget, and any specific needs."},{n:"02",h:"We Source for You",p:"Our team manually searches our verified network of agents and landlords across Abuja."},{n:"03",h:"Receive Curated Options",p:"Within 24–48 hours, we send you the best matching properties — verified and ready to view."}].map(s=>(
              <div className="how-card" key={s.n}><div className="how-n">{s.n}</div><h3>{s.h}</h3><p>{s.p}</p></div>
            ))}
          </div>
        </div>
      </section>

      <section className="trust-sec">
        <div className="inner">
          <p className="eyebrow">Why PropertyHub</p>
          <h2 className="sec-title" style={{marginBottom:"2.8rem"}}>Built on trust, delivered with care.</h2>
          <div className="trust-grid">
            {[
              {icon:<Icon.Magnify/>,h:"Manual Sourcing",  p:"We personally vet each property before sending it to you. No automated listings."},
              {icon:<Icon.Shield/>, h:"Verified Agents",  p:"All agents in our network are vetted, licensed, and accountable."},
              {icon:<Icon.Zap/>,    h:"Fast Turnaround",  p:"Most requests are matched within 24–48 hours of submission."},
              {icon:<Icon.Lock/>,   h:"No Hidden Fees",   p:"Our service is free to users. We work with agents on a transparent commission basis."},
            ].map(c=>(
              <div className="trust-card" key={c.h}>
                <div className="trust-icon">{c.icon}</div>
                <h4>{c.h}</h4><p>{c.p}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="form-sec" ref={formRef}>
        <div className="inner">
          <p className="eyebrow">Submit a Request</p>
          <h2 className="sec-title">Let's find your perfect property</h2>
          <p className="sec-sub">Don't spend hours scrolling listings. Tell us what you want and our team will come back to you with verified options.</p>
          <div className="form-box"><RequestForm initialQuery={searchQuery}/></div>
        </div>
      </section>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// ABOUT PAGE
// ═══════════════════════════════════════════════════════════════════════════════
function AboutPage({setPage}){
  return(
    <div className="page">
      <section className="about-hero">
        <div className="about-rule"/>
        <p className="eyebrow a1">Our Story</p>
        <h1 className="a2">We believe finding a<br/>home in <em>Abuja</em> should<br/>never be stressful.</h1>
        <p className="a3" style={{fontSize:"0.97rem",color:"var(--stone)",lineHeight:1.78,maxWidth:490,margin:"0 auto",fontWeight:300}}>PropertyHub was built by Abuja residents frustrated by the noise, scams, and wasted time in the local property market. We decided to build a better way.</p>
      </section>
      <section className="mv-sec"><div className="inner"><div className="mv-grid">
        <div className="mv-card"><div className="mv-icon"><Icon.Target size={24}/></div><h3>Our Mission</h3><p>To radically simplify how people find properties in Abuja — replacing the chaos of agents, fake listings, and endless calls with a single trusted, human-powered request service. We put the client first, always.</p></div>
        <div className="mv-card"><div className="mv-icon"><Icon.Star size={24}/></div><h3>Our Vision</h3><p>To become the most trusted property matchmaking platform in Nigeria — starting from Abuja — where every Nigerian can access quality housing without stress, deceit, or unnecessary cost.</p></div>
      </div></div></section>
      <section className="vals-sec"><div className="inner">
        <p className="eyebrow">What Drives Us</p>
        <h2 className="sec-title">Our Core Values</h2>
        <p className="sec-sub">Everything we do flows from these principles.</p>
        <div className="vals-grid">
          {[{l:"Value 01",h:"Transparency",p:"No hidden charges, no fake listings, no inflated prices. What you see is what you get."},{l:"Value 02",h:"Speed",p:"We respect your time. Requests are treated urgently and matched within 24–48 hours."},{l:"Value 03",h:"Human Touch",p:"Unlike portals, we're real people matching real needs. You'll always speak to a human."},{l:"Value 04",h:"Accountability",p:"Every agent and property in our network is verified and held to a high standard."},{l:"Value 05",h:"Local Knowledge",p:"We know Abuja deeply — every neighbourhood, price range, and landlord quirk."},{l:"Value 06",h:"Client-First",p:"We work for the person looking for a property, not for the agent trying to sell one."}].map(v=>(
            <div className="vcard" key={v.h}><div className="vlabel">{v.l}</div><h4>{v.h}</h4><p>{v.p}</p></div>
          ))}
        </div>
      </div></section>
      <section className="team-sec"><div className="inner">
        <p className="eyebrow">The People</p>
        <h2 className="sec-title">Meet the Team</h2>
        <p className="sec-sub">A small, dedicated team with deep roots in Abuja's property market.</p>
        <div className="team-grid">
          {[
            {n:"Amina Usman",     r:"Founder & CEO",   cls:"tav1",b:"Former real estate lawyer with 10 years in Abuja's property sector. Founded PropertyHub after experiencing the market's inefficiencies first-hand."},
            {n:"Chukwuemeka Eze", r:"Head of Sourcing", cls:"tav2",b:"Ex-property consultant with an extensive network of landlords and agents across all of Abuja's major districts and satellite towns."},
            {n:"Fatima Al-Hassan",r:"Client Relations", cls:"tav3",b:"Passionate about helping people settle comfortably. Manages all client requests personally and ensures every response is timely and thorough."},
          ].map(m=>(
            <div className="tcard" key={m.n}>
              <div className={`tav ${m.cls}`}><Icon.User size={50}/></div>
              <div className="tinfo"><div className="tname">{m.n}</div><div className="trole">{m.r}</div><p className="tbio">{m.b}</p></div>
            </div>
          ))}
        </div>
      </div></section>
      <section className="about-cta-sec">
        <h2>Ready to find your<br/>perfect property?</h2>
        <p>Submit a request and we'll get back to you within 24 hours.</p>
        <button className="cta-lt" onClick={()=>{setPage("home");window.scrollTo({top:0,behavior:"smooth"});}}>Submit a Request →</button>
      </section>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// LISTINGS PAGE
// ═══════════════════════════════════════════════════════════════════════════════
function ListingsPage({setPage}){
  const [typeF, setTypeF] = useState(["All"]); 
  const [tenF, setTenF] = useState("All");
  const [enquiryProp,setEnquiryProp]=useState(null);
  const handleTypeToggle = (type) => {
  if (type === 'All') {
    setTypeF(['All']);
  } else {
    let newSelection = typeF.filter(t => t !== 'All');
    if (newSelection.includes(type)) {
      newSelection = newSelection.filter(t => t !== type);
    } else {
      newSelection.push(type);
    }
    if (newSelection.length === 0) setTypeF(['All']);
    else setTypeF(newSelection);
  }
};
  const filtered = LISTINGS.filter(l => 
  (typeF.includes("All") || typeF.includes(l.type)) && 
  (tenF === "All" || l.tenure === tenF)
);
  return(
    <div className="page">
      <section className="list-hero">
        <p className="eyebrow a1">Available Properties</p>
        <h1 className="a2">Properties in <em>Abuja</em></h1>
        <p className="a3">Verified listings sourced directly from our trusted agent network. Prices shown are starting figures.</p>
      </section>
      <div className="fbar"><div className="fbar-inner">
        <span className="flbl">Type:</span>
        {TYPES.map(f => (
  <button 
    key={f} 
    className={`fchip${typeF.includes(f) ? " on" : ""}`} 
    onClick={() => handleTypeToggle(f)}
  >
    {f}
  </button>
))}
        <div className="fsep"/>
        <span className="flbl">Tenure:</span>
        {TENURES.map(f=><button key={f} className={`fchip${tenF===f?" on":""}`} onClick={()=>setTenF(f)}>{f}</button>)}
        <span className="fcount">{filtered.length} propert{filtered.length===1?"y":"ies"}</span>
      </div></div>
      <section className="list-sec"><div className="inner">
        <div className="list-grid">
          {filtered.length===0?(
            <div className="noresult"><h3>No properties found</h3><p>Try adjusting your filters or submit a request and we'll source options for you.</p></div>
          ):filtered.map(p=>(
            <div className="pcard" key={p.id}>
              <div className="pimg">
                <div className="pimg-bg" style={{background:p.gradient}}/>
                <svg width="52" height="52" viewBox="0 0 24 24" fill="none" stroke="rgba(168,158,148,0.38)" strokeWidth="0.8" strokeLinecap="round" style={{position:"relative",zIndex:1}}>
                  {p.type==="Land"?<><path d="M3 20h18"/><path d="M3 20L7 10l4 6 4-8 3 8"/></>:p.type==="Villa"||p.type==="Duplex"?<><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/><path d="M9 7h6"/></>:<><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></>}
                </svg>
                <div className={`pbadge${p.tenure==="Rent"?" rent":""}`}>{p.tenure}</div>
              </div>
              <div className="pbody">
                <div className="ptype">{p.type}</div>
                <div className="ptitle">{p.title}</div>
                <div className="ploc"><Icon.MapPin size={10}/>{p.area}, {p.city}</div>
                <div className="pprice">{p.price} <span>{p.period}</span></div>
                <div className="pfeats">{p.features.map(f=><span className="pfeat" key={f}><Icon.Check size={8}/>{f}</span>)}</div>
                <div className="pdiv"/>
                <p className="pdesc">{p.desc}</p>
              </div>
              <div className="pfoot">
                <div className="pstatus"><span className="sdot" style={{background:p.available?"#5A8A5A":"#B08050"}}/>{p.available?"Available Now":"Under Offer"}</div>
                <button className="penq" onClick={()=>setEnquiryProp(p)}>Enquire</button>
              </div>
            </div>
          ))}
        </div>
      </div></section>
      <section style={{background:"var(--white)",padding:"4.5rem 2rem",textAlign:"center",borderTop:"1px solid var(--border)"}}>
        <p className="eyebrow">Can't find what you need?</p>
        <h2 className="sec-title" style={{marginBottom:"0.9rem"}}>Submit a custom request</h2>
        <p style={{color:"var(--stone)",fontSize:"0.9rem",marginBottom:"2.2rem",fontWeight:300}}>Tell us exactly what you're looking for and our team will source it from our extended network.</p>
        <button className="nav-cta" style={{padding:"0.8rem 2.4rem",fontSize:"0.78rem"}} onClick={()=>{setPage("home");window.scrollTo({top:0,behavior:"smooth"});}}>Submit a Request →</button>
      </section>
      {enquiryProp&&<EnquiryDrawer property={enquiryProp} onClose={()=>setEnquiryProp(null)}/>}
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// CONTACT PAGE
// ═══════════════════════════════════════════════════════════════════════════════
function ContactPage(){
  const blank={name:"",email:"",phone:"",subject:"",message:""};
  const [form,setForm]=useState(blank);
  const [errors,setErrors]=useState({});
  const [loading,setLoading]=useState(false);
  const [done,setDone]=useState(false);
  const set=(k,v)=>{setForm(f=>({...f,[k]:v}));setErrors(e=>({...e,[k]:""}));};
  const validate=()=>{const e={};if(!form.name.trim())e.name="Name is required";if(!form.email.trim())e.email="Email is required";if(!form.message.trim())e.message="Message is required";setErrors(e);return !Object.keys(e).length;};
  const submit=()=>{if(!validate())return;setLoading(true);setTimeout(()=>{setLoading(false);setDone(true);},2000);};
  const items=[
    {icon:<Icon.Phone size={17}/>,   l:"Phone",        v:"+234 800 000 0000"},
    {icon:<Icon.Mail size={17}/>,    l:"Email",        v:"info@propertyhub.ng"},
    {icon:<Icon.MsgCircle size={17}/>,l:"WhatsApp",   v:"+234 800 000 0000"},
    {icon:<Icon.Location size={17}/>,l:"Base Location",v:"Abuja, FCT, Nigeria"},
  ];
  return(
    <div className="page">
      <section className="cont-hero">
        <p className="eyebrow a1">Get in Touch</p>
        <h1 className="a2">We'd love to hear from you.</h1>
        <p className="a3">Whether you have a question, a specific request, or just want to say hello — our team is ready to help.</p>
      </section>
      <section className="cont-main"><div className="cont-grid">
        <div className="cinfo">
          <div style={{marginBottom:"0.3rem"}}>
            <p className="eyebrow" style={{textAlign:"left",marginBottom:"0.45rem"}}>Contact Information</p>
            <h3 style={{fontFamily:"var(--font-display)",fontSize:"1.6rem",fontWeight:400,color:"var(--ink)",lineHeight:1.22}}>Reach us any way<br/>that works for you.</h3>
          </div>
          {items.map(i=>(
            <div className="cinfo-item" key={i.l}>
              <div className="cinfo-icon">{i.icon}</div>
              <div className="cinfo-text"><h4>{i.l}</h4><p>{i.v}</p></div>
            </div>
          ))}
        </div>
        <div className="cform-card">
          {done?(
            <div className="confirm" style={{padding:"3rem 2.4rem"}}>
              <div className="cicon"><Icon.Envelope size={24}/></div>
              <h2>Message Sent</h2>
              <p>Thank you for reaching out. We'll get back to you within 24 hours.</p>
              <button className="creset" onClick={()=>{setDone(false);setForm(blank);}}>Send Another Message</button>
            </div>
          ):(
            <>
              <div className="cform-head"><h3>Send Us a Message</h3><p>We typically respond within a few hours during business hours.</p></div>
              <div className="cform-body">
                <div className="frow c2">
                  <div className="ff"><label className="flabel">Your Name <span className="freq">*</span></label><input className={`finput${errors.name?" err":""}`} placeholder="Full name" value={form.name} onChange={e=>set("name",e.target.value)}/>{errors.name&&<span className="emsg">{errors.name}</span>}</div>
                  <div className="ff"><label className="flabel">Phone</label><input className="finput" placeholder="+234 800 000 0000" value={form.phone} onChange={e=>set("phone",e.target.value)}/></div>
                </div>
                <div className="frow c1">
                  <div className="ff"><label className="flabel">Email Address <span className="freq">*</span></label><input className={`finput${errors.email?" err":""}`} type="email" placeholder="yourname@email.com" value={form.email} onChange={e=>set("email",e.target.value)}/>{errors.email&&<span className="emsg">{errors.email}</span>}</div>
                </div>
                <div className="frow c1">
                  <div className="ff"><label className="flabel">Subject</label>
                    <select className="fselect" value={form.subject} onChange={e=>set("subject",e.target.value)}>
                      <option value="">Select a topic…</option>
                      {["Property Request","Agent Partnership","General Inquiry","Complaint","Other"].map(o=><option key={o}>{o}</option>)}
                    </select>
                  </div>
                </div>
                <div className="frow c1">
                  <div className="ff"><label className="flabel">Message <span className="freq">*</span></label><textarea className={`ftextarea${errors.message?" err":""}`} placeholder="Tell us how we can help you…" style={{minHeight:120}} value={form.message} onChange={e=>set("message",e.target.value)}/>{errors.message&&<span className="emsg">{errors.message}</span>}</div>
                </div>
                <button className="sbtn" onClick={submit} disabled={loading}>
                  {loading?<><div className="spin"/>Sending…</>:<>Send Message →</>}
                </button>
              </div>
            </>
          )}
        </div>
      </div></section>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// ROOT
// ═══════════════════════════════════════════════════════════════════════════════
export default function App(){
  const [page,setPage]=useState("home");
  const render=()=>{
    switch(page){
      case "home":     return <HomePage     setPage={setPage}/>;
      case "about":    return <AboutPage    setPage={setPage}/>;
      case "listings": return <ListingsPage setPage={setPage}/>;
      case "contact":  return <ContactPage/>;
      default:         return <HomePage     setPage={setPage}/>;
    }
  };
  return(
    <>
      <style>{GLOBAL_STYLES}</style>
      <Navbar page={page} setPage={setPage}/>
      {render()}
      <Footer setPage={setPage}/>
    </>
  );
}
