import { useState, useEffect, useRef } from "react";

const GF = `@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;0,800;1,400&family=DM+Sans:wght@300;400;500;600&family=Cormorant+Garamond:ital,wght@1,400;1,500&display=swap');`;

const CSS = `
*{margin:0;padding:0;box-sizing:border-box}
html{scroll-behavior:smooth}
body{font-family:'DM Sans',sans-serif;background:#080F22;color:#fff;overflow-x:hidden}
::-webkit-scrollbar{width:4px}
::-webkit-scrollbar-track{background:#04080F}
::-webkit-scrollbar-thumb{background:#C8A951;border-radius:2px}
.pf{font-family:'Playfair Display',serif}
.cg{font-family:'Cormorant Garamond',serif;font-style:italic}
.shimmer{background:linear-gradient(90deg,#C8A951 0%,#F5E09A 40%,#C8A951 60%,#A88B38 100%);background-size:200% auto;-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;animation:shimmer 3s linear infinite}
@keyframes shimmer{0%{background-position:-200% center}100%{background-position:200% center}}
.gold-line{height:1.5px;background:linear-gradient(90deg,transparent,#C8A951,transparent)}
.card{background:rgba(255,255,255,0.035);border:1px solid rgba(200,169,81,0.18);border-radius:16px;transition:all .35s ease}
.card:hover{background:rgba(255,255,255,0.065);border-color:rgba(200,169,81,0.45);transform:translateY(-4px);box-shadow:0 20px 50px rgba(0,0,0,0.5)}
.btn-gold{background:linear-gradient(135deg,#C8A951,#E8D080,#A88B38);color:#0D1B3E;font-weight:700;border:none;cursor:pointer;border-radius:8px;transition:all .3s;font-family:'DM Sans',sans-serif;text-decoration:none;display:inline-block}
.btn-gold:hover{transform:translateY(-3px);box-shadow:0 10px 30px rgba(200,169,81,0.45)}
.btn-out{background:transparent;color:#C8A951;border:1.5px solid rgba(200,169,81,0.7);border-radius:8px;cursor:pointer;transition:all .3s;font-family:'DM Sans',sans-serif;text-decoration:none;display:inline-block}
.btn-out:hover{background:rgba(200,169,81,0.1);transform:translateY(-3px)}
.reveal{opacity:0;transform:translateY(32px);transition:opacity .7s ease,transform .7s ease}
.reveal.vis{opacity:1;transform:translateY(0)}
.tag{display:inline-flex;align-items:center;gap:6px;border:1px solid rgba(200,169,81,0.3);border-radius:20px;padding:5px 16px;font-size:11px;letter-spacing:.18em;text-transform:uppercase;color:rgba(200,169,81,.8)}
@keyframes pulse{0%,100%{opacity:1}50%{opacity:.35}}
@keyframes float{0%,100%{transform:translateY(0)}50%{transform:translateY(-10px)}}
@keyframes fadeIn{from{opacity:0;transform:translateY(20px)}to{opacity:1;transform:translateY(0)}}
.tab-btn{padding:8px 20px;border-radius:20px;font-size:13px;font-weight:500;cursor:pointer;transition:all .25s;font-family:'DM Sans',sans-serif;border:1px solid rgba(200,169,81,.25);background:rgba(255,255,255,.05);color:rgba(255,255,255,.55)}
.tab-btn.active{background:#C8A951;color:#0D1B3E;border-color:#C8A951;font-weight:700}
.tab-btn:hover:not(.active){border-color:rgba(200,169,81,.6);color:rgba(200,169,81,.9)}
.spec{display:flex;align-items:flex-start;gap:14px;padding:14px 0;border-bottom:1px solid rgba(200,169,81,.08)}
.spec:last-child{border-bottom:none}
.icon-box{width:42px;height:42px;min-width:42px;border-radius:10px;background:rgba(200,169,81,.08);border:1px solid rgba(200,169,81,.2);display:flex;align-items:center;justify-content:center;font-size:18px}
.fac-card{display:flex;gap:12px;align-items:flex-start;background:rgba(255,255,255,.03);border:1px solid rgba(200,169,81,.12);border-radius:12px;padding:16px;transition:all .3s}
.fac-card:hover{border-color:rgba(200,169,81,.35);background:rgba(255,255,255,.055)}
.room-box{border-radius:8px;padding:10px;border:1px solid rgba(200,169,81,.12);background:rgba(200,169,81,.04)}
.inp{width:100%;background:rgba(13,27,62,.7);border:1px solid rgba(200,169,81,.2);border-radius:10px;padding:12px 16px;color:#fff;font-size:13px;font-family:'DM Sans',sans-serif;outline:none;transition:border-color .3s}
.inp:focus{border-color:rgba(200,169,81,.55)}
.inp::placeholder{color:rgba(255,255,255,.25)}
select.inp option{background:#0D1B3E;color:#fff}
`;

function useReveal() {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) el.classList.add("vis"); }, { threshold: 0.12 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return ref;
}

function Dot() {
  return <span style={{ width: 7, height: 7, background: "#C8A951", borderRadius: "50%", display: "inline-block", animation: "pulse 2s infinite" }} />;
}

function GoldLine({ width = 80, my = 20 }) {
  return <div className="gold-line" style={{ width, margin: `${my}px auto` }} />;
}

// ─── NAVBAR ──────────────────────────────────────────────────────────────────
function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", h);
    return () => window.removeEventListener("scroll", h);
  }, []);
  const links = ["Home", "Project", "Floor Plans", "Facilities", "Contact"];
  return (
    <header style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 100, transition: "all .5s", background: scrolled ? "rgba(4,8,15,.96)" : "transparent", backdropFilter: scrolled ? "blur(14px)" : "none", borderBottom: scrolled ? "1px solid rgba(200,169,81,.12)" : "1px solid transparent" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 24px", display: "flex", justifyContent: "space-between", alignItems: "center", height: 64 }}>
        <a href="#home" style={{ display: "flex", alignItems: "center", gap: 10, textDecoration: "none" }}>
          <div style={{ width: 36, height: 36, borderRadius: "50%", background: "linear-gradient(135deg,#C8A951,#A88B38)", display: "flex", alignItems: "center", justifyContent: "center", color: "#0D1B3E", fontWeight: 700, fontSize: 13 }}>AC</div>
          <div>
            <div className="pf" style={{ color: "#C8A951", fontWeight: 700, fontSize: 13, letterSpacing: ".05em" }}>AYAAN CITY</div>
            <div style={{ color: "rgba(255,255,255,.3)", fontSize: 9, letterSpacing: ".15em", textTransform: "uppercase" }}>Bhuiyan Garden</div>
          </div>
        </a>
        <nav style={{ display: "flex", gap: 28 }}>
          {links.map(l => (
            <a key={l} href={`#${l.toLowerCase().replace(" ", "-")}`} style={{ color: "rgba(255,255,255,.65)", fontSize: 13, fontWeight: 500, textDecoration: "none", transition: "color .25s", letterSpacing: ".02em" }}
              onMouseEnter={e => e.target.style.color = "#C8A951"} onMouseLeave={e => e.target.style.color = "rgba(255,255,255,.65)"}>{l}</a>
          ))}
        </nav>
        <a href="tel:01912469308" className="btn-gold" style={{ padding: "9px 20px", fontSize: 13 }}>📞 Book Now</a>
      </div>
    </header>
  );
}

// ─── HERO ────────────────────────────────────────────────────────────────────
function Hero() {
  const [vis, setVis] = useState(false);
  useEffect(() => { setTimeout(() => setVis(true), 150); }, []);
  const stats = [{ v: "21", l: "Total Flats" }, { v: "G+7", l: "Floors" }, { v: "3", l: "Unit Types" }, { v: "1200+", l: "Max Sft" }];
  return (
    <section id="home" style={{ minHeight: "100vh", display: "flex", alignItems: "center", position: "relative", overflow: "hidden", background: "radial-gradient(ellipse at 72% 38%,rgba(27,107,58,.13) 0%,transparent 55%),radial-gradient(ellipse at 20% 78%,rgba(200,169,81,.07) 0%,transparent 50%),linear-gradient(135deg,#030609 0%,#0D1B3E 60%,#060F1A 100%)" }}>
      {/* Grid texture */}
      <div style={{ position: "absolute", inset: 0, opacity: .03, backgroundImage: "linear-gradient(rgba(200,169,81,1) 1px,transparent 1px),linear-gradient(90deg,rgba(200,169,81,1) 1px,transparent 1px)", backgroundSize: "55px 55px", pointerEvents: "none" }} />
      {/* Orbs */}
      <div style={{ position: "absolute", top: "12%", right: "8%", width: 400, height: 400, background: "rgba(27,107,58,.07)", borderRadius: "50%", filter: "blur(90px)" }} />
      <div style={{ position: "absolute", bottom: "18%", left: "4%", width: 280, height: 280, background: "rgba(200,169,81,.055)", borderRadius: "50%", filter: "blur(70px)" }} />

      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "100px 24px 60px", width: "100%", position: "relative", zIndex: 1 }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 64, alignItems: "center" }}>
          {/* Left */}
          <div style={{ animation: vis ? "fadeIn .8s ease forwards" : "none", opacity: vis ? 1 : 0 }}>
            <div className="tag" style={{ marginBottom: 28 }}><Dot /> New Launch — Airport, Dhaka-1230</div>
            <h1 className="pf" style={{ fontSize: 58, fontWeight: 800, lineHeight: 1.08, marginBottom: 10 }}>
              <span className="shimmer">Ayaan City</span><br />
              <span style={{ color: "#fff" }}>Bhuiyan</span><br />
              <span style={{ color: "#1B6B3A" }}>Garden</span>
            </h1>
            <p className="cg" style={{ fontSize: 20, color: "rgba(200,169,81,.75)", marginBottom: 10 }}>Modern Living. Prime Location. Timeless Comfort.</p>
            <p style={{ fontSize: 14, color: "rgba(255,255,255,.5)", lineHeight: 1.75, marginBottom: 30, maxWidth: 440 }}>
              Luxurious apartments at <strong style={{ color: "rgba(200,169,81,.85)" }}>Kawlarbazar-Mollabari, Airport, Dhaka-1230</strong>. G+7 floors, 21 total flats across 3 thoughtfully planned unit types.
            </p>
            <div style={{ display: "flex", gap: 12, marginBottom: 28, flexWrap: "wrap" }}>
              <a href="tel:01912469308" className="btn-gold" style={{ padding: "14px 30px", fontSize: 14 }}>📞 01912469308</a>
              <a href="tel:01635594194" className="btn-out" style={{ padding: "14px 30px", fontSize: 14 }}>📞 01635594194</a>
            </div>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
              {["🛡️ Secured Living", "🌿 Peaceful Area", "✈️ Airport Access", "⭐ Premium Finish"].map(b => (
                <span key={b} style={{ fontSize: 11, color: "rgba(255,255,255,.4)", border: "1px solid rgba(200,169,81,.15)", borderRadius: 20, padding: "4px 12px" }}>{b}</span>
              ))}
            </div>
          </div>

          {/* Right — Project Brief */}
          <div className="card" style={{ padding: 28, animation: vis ? "fadeIn 1s .2s ease both" : "none" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20, paddingBottom: 16, borderBottom: "1px solid rgba(200,169,81,.12)" }}>
              <div style={{ width: 40, height: 40, borderRadius: 8, background: "linear-gradient(135deg,#C8A951,#A88B38)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18 }}>🏗️</div>
              <div>
                <div className="pf" style={{ color: "#C8A951", fontWeight: 700, fontSize: 15 }}>Project Brief</div>
                <div style={{ fontSize: 10, color: "rgba(255,255,255,.35)", letterSpacing: ".12em", textTransform: "uppercase" }}>Ayaan City Bhuiyan Garden</div>
              </div>
            </div>
            {[
              { icon: "📍", label: "Location", val: "Kawlarbazar-Mollabari, Airport, Dhaka-1230" },
              { icon: "🏢", label: "Building Height", val: "G + 07 Floors" },
              { icon: "🏠", label: "Total Flats", val: "21 Units (3 per floor, 7 floors)" },
              { icon: "🛗", label: "Lift", val: "01 — Eight Passenger Lift" },
              { icon: "⚙️", label: "Facilities", val: "Intercom, Generator, 24/7 Security" },
            ].map(s => (
              <div key={s.label} className="spec">
                <div className="icon-box">{s.icon}</div>
                <div>
                  <div style={{ fontSize: 10, color: "#C8A951", fontWeight: 700, letterSpacing: ".1em", textTransform: "uppercase", marginBottom: 3 }}>{s.label}</div>
                  <div style={{ fontSize: 13, color: "rgba(255,255,255,.7)" }}>{s.val}</div>
                </div>
              </div>
            ))}
            {/* Unit sizes */}
            <div style={{ marginTop: 14, padding: "14px 0 0" }}>
              <div style={{ fontSize: 10, color: "#C8A951", fontWeight: 700, letterSpacing: ".1em", textTransform: "uppercase", marginBottom: 10 }}>Apartment Size</div>
              <div style={{ display: "flex", gap: 8 }}>
                {[{ u: "Unit-A", s: "1200+ Sft" }, { u: "Unit-B", s: "1075+ Sft" }, { u: "Unit-C", s: "1025+ Sft" }].map(u => (
                  <div key={u.u} style={{ flex: 1, background: "rgba(200,169,81,.07)", border: "1px solid rgba(200,169,81,.2)", borderRadius: 10, padding: "10px 8px", textAlign: "center" }}>
                    <div style={{ fontSize: 10, color: "rgba(255,255,255,.45)", marginBottom: 4 }}>{u.u}</div>
                    <div style={{ fontSize: 14, color: "#C8A951", fontWeight: 700 }}>{u.s}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Stats bar */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 14, marginTop: 50 }}>
          {stats.map((s, i) => (
            <div key={s.l} className="card" style={{ padding: "18px 12px", textAlign: "center", animation: vis ? `fadeIn .7s ${.3 + i * .1}s ease both` : "none" }}>
              <div className="pf shimmer" style={{ fontSize: 32, fontWeight: 700, marginBottom: 5 }}>{s.v}</div>
              <div style={{ fontSize: 11, color: "rgba(255,255,255,.4)", letterSpacing: ".08em" }}>{s.l}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── FLOOR PLANS ─────────────────────────────────────────────────────────────
function FloorPlans() {
  const [unit, setUnit] = useState("A");
  const ref = useReveal();

  const units = {
    A: {
      size: "1200+", rooms: [
        { r: "Master Bedroom", s: "12'×12'-3\"" }, { r: "Child Bedroom", s: "11'×11'-3\"" },
        { r: "Guest Bedroom", s: "10'×10'" }, { r: "Living Room", s: "10'×14'" },
        { r: "Dining", s: "9'×13'-8\"" }, { r: "Kitchen", s: "6'-6\"×7'" },
        { r: "Toilet ×2", s: "4'×6'-6\"" }, { r: "Verandah ×2", s: "3'-6\"×4'-6\"" },
      ],
      features: ["🌬️ Natural Ventilation", "🔒 Privacy Optimized", "🛗 Lift Access", "📐 Spacious Layout"],
    },
    B: {
      size: "1075+", rooms: [
        { r: "Master Bedroom", s: "11'-1\"×12'-3\"" }, { r: "Child Bedroom", s: "10'×10'-5\"" },
        { r: "Guest Bedroom", s: "10'×10'" }, { r: "Living Room", s: "10'×14'" },
        { r: "Dining", s: "9'×13'-5\"" }, { r: "Kitchen", s: "6'×7'" },
        { r: "Toilet ×2", s: "4'×6'-6\"" }, { r: "Verandah ×2", s: "3'-4\"×4'-6\"" },
      ],
      features: ["🌬️ Natural Ventilation", "🔒 Privacy Optimized", "🛗 Lift Access", "📐 Smart Layout"],
    },
    C: {
      size: "1025+", rooms: [
        { r: "Master Bedroom", s: "10'×11'-9\"" }, { r: "Child Bedroom", s: "9'×10'" },
        { r: "Guest Bedroom", s: "12'-5\"×10'-3\"" }, { r: "Living/Dining", s: "15'-4\"×9'" },
        { r: "Kitchen", s: "Included" }, { r: "Toilet ×2", s: "5'×7', 5'×4'-6\"" },
        { r: "Verandah ×2", s: "5'×4'-2\"" }, { r: "Lobby", s: "6'×4'-6\"" },
      ],
      features: ["🏠 Intercom", "🌬️ Natural Ventilation", "🔒 Secured", "🌟 Modern Finish"],
    },
  };

  const u = units[unit];

  // SVG floor plan layouts per unit
  const PlanSVG = ({ u: uKey }) => {
    const configs = {
      A: (
        <svg viewBox="0 0 400 360" style={{ width: "100%" }}>
          <defs>
            <pattern id="hA" width="6" height="6" patternUnits="userSpaceOnUse">
              <line x1="0" y1="6" x2="6" y2="0" stroke="rgba(200,169,81,.12)" strokeWidth=".8" />
            </pattern>
          </defs>
          <rect x="10" y="10" width="380" height="340" fill="url(#hA)" rx="4" />
          <rect x="18" y="18" width="364" height="324" fill="#0A1525" rx="2" />
          {/* Master Bed */}
          <rect x="20" y="20" width="138" height="118" fill="rgba(27,107,58,.14)" stroke="#1B6B3A" strokeWidth="1.2" rx="2" />
          <text x="89" y="75" fill="#22874A" fontSize="10" textAnchor="middle" fontWeight="600">M.BED</text>
          <text x="89" y="88" fill="rgba(255,255,255,.35)" fontSize="9" textAnchor="middle">12'×12'-3"</text>
          {/* Child Bed */}
          <rect x="20" y="145" width="128" height="108" fill="rgba(200,169,81,.08)" stroke="rgba(200,169,81,.4)" strokeWidth="1.2" rx="2" />
          <text x="84" y="196" fill="#C8A951" fontSize="10" textAnchor="middle" fontWeight="600">C.BED</text>
          <text x="84" y="208" fill="rgba(255,255,255,.35)" fontSize="9" textAnchor="middle">11'×11'-3"</text>
          {/* Living */}
          <rect x="165" y="20" width="140" height="132" fill="rgba(200,169,81,.055)" stroke="rgba(200,169,81,.3)" strokeWidth="1.2" rx="2" />
          <text x="235" y="80" fill="#C8A951" fontSize="10" textAnchor="middle" fontWeight="600">LIVING</text>
          <text x="235" y="93" fill="rgba(255,255,255,.35)" fontSize="9" textAnchor="middle">10'×14'</text>
          {/* Dining */}
          <rect x="165" y="160" width="118" height="100" fill="rgba(200,169,81,.045)" stroke="rgba(200,169,81,.25)" strokeWidth="1.2" rx="2" />
          <text x="224" y="205" fill="#C8A951" fontSize="10" textAnchor="middle" fontWeight="600">DINING</text>
          <text x="224" y="218" fill="rgba(255,255,255,.35)" fontSize="9" textAnchor="middle">9'×13'-8"</text>
          {/* Guest Bed */}
          <rect x="312" y="20" width="68" height="100" fill="rgba(27,107,58,.1)" stroke="rgba(27,107,58,.45)" strokeWidth="1.2" rx="2" />
          <text x="346" y="65" fill="#22874A" fontSize="9" textAnchor="middle" fontWeight="600">G.BED</text>
          <text x="346" y="78" fill="rgba(255,255,255,.35)" fontSize="8" textAnchor="middle">10'×10'</text>
          {/* Kitchen */}
          <rect x="290" y="160" width="92" height="68" fill="rgba(200,169,81,.07)" stroke="rgba(200,169,81,.3)" strokeWidth="1.2" rx="2" />
          <text x="336" y="190" fill="#C8A951" fontSize="9" textAnchor="middle" fontWeight="600">KITCHEN</text>
          <text x="336" y="202" fill="rgba(255,255,255,.35)" fontSize="8" textAnchor="middle">6'-6"×7'</text>
          {/* Toilets */}
          <rect x="20" y="260" width="72" height="72" fill="rgba(80,130,200,.08)" stroke="rgba(100,160,220,.3)" strokeWidth="1" rx="2" />
          <text x="56" y="295" fill="rgba(140,190,255,.65)" fontSize="9" textAnchor="middle">TOILET</text>
          <rect x="98" y="260" width="50" height="72" fill="rgba(80,130,200,.06)" stroke="rgba(100,160,220,.25)" strokeWidth="1" rx="2" />
          <text x="123" y="295" fill="rgba(140,190,255,.55)" fontSize="8" textAnchor="middle">VER</text>
          {/* Lobby & Lift */}
          <rect x="155" y="268" width="68" height="64" fill="rgba(200,169,81,.05)" stroke="rgba(200,169,81,.2)" strokeWidth="1" rx="2" />
          <text x="189" y="298" fill="rgba(200,169,81,.5)" fontSize="9" textAnchor="middle">LOBBY</text>
          <rect x="230" y="270" width="50" height="50" fill="rgba(200,169,81,.06)" stroke="rgba(200,169,81,.3)" strokeWidth="1" rx="2" />
          <text x="255" y="298" fill="rgba(200,169,81,.65)" fontSize="9" textAnchor="middle">LIFT</text>
          {/* Compass */}
          <g transform="translate(368,338)">
            <circle r="16" fill="rgba(200,169,81,.08)" stroke="rgba(200,169,81,.3)" strokeWidth="1" />
            <text x="0" y="-5" fill="#C8A951" fontSize="8" textAnchor="middle" fontWeight="600">N</text>
            <text x="0" y="13" fill="rgba(255,255,255,.35)" fontSize="8" textAnchor="middle">S</text>
            <text x="-10" y="4" fill="rgba(255,255,255,.35)" fontSize="8" textAnchor="middle">W</text>
            <text x="10" y="4" fill="rgba(255,255,255,.35)" fontSize="8" textAnchor="middle">E</text>
          </g>
        </svg>
      ),
      B: (
        <svg viewBox="0 0 400 360" style={{ width: "100%" }}>
          <defs>
            <pattern id="hB" width="6" height="6" patternUnits="userSpaceOnUse">
              <line x1="0" y1="6" x2="6" y2="0" stroke="rgba(200,169,81,.12)" strokeWidth=".8" />
            </pattern>
          </defs>
          <rect x="10" y="10" width="380" height="340" fill="url(#hB)" rx="4" />
          <rect x="18" y="18" width="364" height="324" fill="#0A1525" rx="2" />
          <rect x="20" y="20" width="130" height="120" fill="rgba(27,107,58,.14)" stroke="#1B6B3A" strokeWidth="1.2" rx="2" />
          <text x="85" y="78" fill="#22874A" fontSize="10" textAnchor="middle" fontWeight="600">M.BED</text>
          <text x="85" y="91" fill="rgba(255,255,255,.35)" fontSize="9" textAnchor="middle">11'-1"×12'-3"</text>
          <rect x="20" y="148" width="120" height="108" fill="rgba(200,169,81,.08)" stroke="rgba(200,169,81,.4)" strokeWidth="1.2" rx="2" />
          <text x="80" y="198" fill="#C8A951" fontSize="10" textAnchor="middle" fontWeight="600">C.BED</text>
          <text x="80" y="211" fill="rgba(255,255,255,.35)" fontSize="9" textAnchor="middle">10'×10'-5"</text>
          <rect x="158" y="20" width="146" height="132" fill="rgba(200,169,81,.055)" stroke="rgba(200,169,81,.3)" strokeWidth="1.2" rx="2" />
          <text x="231" y="80" fill="#C8A951" fontSize="10" textAnchor="middle" fontWeight="600">LIVING</text>
          <text x="231" y="93" fill="rgba(255,255,255,.35)" fontSize="9" textAnchor="middle">10'×14'</text>
          <rect x="158" y="160" width="120" height="100" fill="rgba(200,169,81,.045)" stroke="rgba(200,169,81,.25)" strokeWidth="1.2" rx="2" />
          <text x="218" y="205" fill="#C8A951" fontSize="10" textAnchor="middle" fontWeight="600">DINING</text>
          <text x="218" y="218" fill="rgba(255,255,255,.35)" fontSize="9" textAnchor="middle">9'×13'-5"</text>
          <rect x="312" y="20" width="68" height="100" fill="rgba(27,107,58,.1)" stroke="rgba(27,107,58,.45)" strokeWidth="1.2" rx="2" />
          <text x="346" y="65" fill="#22874A" fontSize="9" textAnchor="middle" fontWeight="600">G.BED</text>
          <text x="346" y="78" fill="rgba(255,255,255,.35)" fontSize="8" textAnchor="middle">10'×10'</text>
          <rect x="290" y="160" width="92" height="68" fill="rgba(200,169,81,.07)" stroke="rgba(200,169,81,.3)" strokeWidth="1.2" rx="2" />
          <text x="336" y="190" fill="#C8A951" fontSize="9" textAnchor="middle" fontWeight="600">KITCHEN</text>
          <text x="336" y="202" fill="rgba(255,255,255,.35)" fontSize="8" textAnchor="middle">6'×7'</text>
          <rect x="20" y="265" width="70" height="70" fill="rgba(80,130,200,.08)" stroke="rgba(100,160,220,.3)" strokeWidth="1" rx="2" />
          <text x="55" y="300" fill="rgba(140,190,255,.65)" fontSize="9" textAnchor="middle">TOILET</text>
          <rect x="155" y="268" width="68" height="64" fill="rgba(200,169,81,.05)" stroke="rgba(200,169,81,.2)" strokeWidth="1" rx="2" />
          <text x="189" y="298" fill="rgba(200,169,81,.5)" fontSize="9" textAnchor="middle">LOBBY</text>
          <rect x="230" y="270" width="50" height="50" fill="rgba(200,169,81,.06)" stroke="rgba(200,169,81,.3)" strokeWidth="1" rx="2" />
          <text x="255" y="298" fill="rgba(200,169,81,.65)" fontSize="9" textAnchor="middle">LIFT</text>
          <g transform="translate(368,338)">
            <circle r="16" fill="rgba(200,169,81,.08)" stroke="rgba(200,169,81,.3)" strokeWidth="1" />
            <text x="0" y="-5" fill="#C8A951" fontSize="8" textAnchor="middle" fontWeight="600">N</text>
            <text x="0" y="13" fill="rgba(255,255,255,.35)" fontSize="8" textAnchor="middle">S</text>
          </g>
        </svg>
      ),
      C: (
        <svg viewBox="0 0 400 360" style={{ width: "100%" }}>
          <defs>
            <pattern id="hC" width="6" height="6" patternUnits="userSpaceOnUse">
              <line x1="0" y1="6" x2="6" y2="0" stroke="rgba(200,169,81,.12)" strokeWidth=".8" />
            </pattern>
          </defs>
          <rect x="10" y="10" width="380" height="340" fill="url(#hC)" rx="4" />
          <rect x="18" y="18" width="364" height="324" fill="#0A1525" rx="2" />
          <rect x="20" y="20" width="150" height="120" fill="rgba(27,107,58,.12)" stroke="rgba(27,107,58,.5)" strokeWidth="1.2" rx="2" />
          <text x="95" y="75" fill="#22874A" fontSize="10" textAnchor="middle" fontWeight="600">G.BED</text>
          <text x="95" y="88" fill="rgba(255,255,255,.35)" fontSize="9" textAnchor="middle">12'-5"×10'-3"</text>
          <rect x="20" y="148" width="200" height="100" fill="rgba(200,169,81,.055)" stroke="rgba(200,169,81,.3)" strokeWidth="1.2" rx="2" />
          <text x="120" y="192" fill="#C8A951" fontSize="10" textAnchor="middle" fontWeight="600">LIVING / DINING</text>
          <text x="120" y="205" fill="rgba(255,255,255,.35)" fontSize="9" textAnchor="middle">15'-4"×9'</text>
          <rect x="178" y="20" width="108" height="122" fill="rgba(27,107,58,.13)" stroke="#1B6B3A" strokeWidth="1.2" rx="2" />
          <text x="232" y="78" fill="#22874A" fontSize="10" textAnchor="middle" fontWeight="600">M.BED</text>
          <text x="232" y="91" fill="rgba(255,255,255,.35)" fontSize="9" textAnchor="middle">10'×11'-9"</text>
          <rect x="295" y="20" width="88" height="122" fill="rgba(200,169,81,.08)" stroke="rgba(200,169,81,.35)" strokeWidth="1.2" rx="2" />
          <text x="339" y="78" fill="#C8A951" fontSize="10" textAnchor="middle" fontWeight="600">C.BED</text>
          <text x="339" y="91" fill="rgba(255,255,255,.35)" fontSize="9" textAnchor="middle">9'×10'</text>
          <rect x="228" y="155" width="80" height="70" fill="rgba(80,130,200,.08)" stroke="rgba(100,160,220,.3)" strokeWidth="1" rx="2" />
          <text x="268" y="188" fill="rgba(140,190,255,.65)" fontSize="9" textAnchor="middle">TOILET</text>
          <rect x="315" y="155" width="68" height="70" fill="rgba(80,130,200,.06)" stroke="rgba(100,160,220,.25)" strokeWidth="1" rx="2" />
          <text x="349" y="188" fill="rgba(140,190,255,.55)" fontSize="9" textAnchor="middle">TOILET</text>
          <rect x="20" y="255" width="70" height="82" fill="rgba(80,130,200,.06)" stroke="rgba(100,160,220,.25)" strokeWidth="1" rx="2" />
          <text x="55" y="296" fill="rgba(140,190,255,.55)" fontSize="8" textAnchor="middle">VER/STAIR</text>
          <rect x="155" y="268" width="68" height="64" fill="rgba(200,169,81,.05)" stroke="rgba(200,169,81,.2)" strokeWidth="1" rx="2" />
          <text x="189" y="298" fill="rgba(200,169,81,.5)" fontSize="9" textAnchor="middle">LOBBY</text>
          <rect x="230" y="270" width="50" height="50" fill="rgba(200,169,81,.06)" stroke="rgba(200,169,81,.3)" strokeWidth="1" rx="2" />
          <text x="255" y="298" fill="rgba(200,169,81,.65)" fontSize="9" textAnchor="middle">LIFT</text>
          <g transform="translate(368,338)">
            <circle r="16" fill="rgba(200,169,81,.08)" stroke="rgba(200,169,81,.3)" strokeWidth="1" />
            <text x="0" y="-5" fill="#C8A951" fontSize="8" textAnchor="middle" fontWeight="600">N</text>
            <text x="0" y="13" fill="rgba(255,255,255,.35)" fontSize="8" textAnchor="middle">S</text>
          </g>
        </svg>
      ),
    };
    return configs[uKey];
  };

  return (
    <section id="floor-plans" style={{ padding: "88px 24px", background: "#090E1C" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <div ref={ref} className="reveal" style={{ textAlign: "center", marginBottom: 40 }}>
          <p style={{ fontSize: 11, letterSpacing: ".25em", textTransform: "uppercase", color: "rgba(200,169,81,.55)", marginBottom: 8 }}>1st to 7th Floor</p>
          <h2 className="pf" style={{ fontSize: 42, fontWeight: 700, marginBottom: 6 }}>Floor <span className="shimmer">Plans</span></h2>
          <GoldLine width={72} my={16} />
          <p style={{ color: "rgba(255,255,255,.45)", fontSize: 14, maxWidth: 480, margin: "0 auto" }}>Thoughtfully designed spaces for modern living — every detail matters.</p>
        </div>

        {/* Unit tabs */}
        <div style={{ display: "flex", gap: 10, justifyContent: "center", marginBottom: 36 }}>
          {["A", "B", "C"].map(k => (
            <button key={k} className={`tab-btn${unit === k ? " active" : ""}`} onClick={() => setUnit(k)}>
              Unit-{k} &nbsp; {units[k].size}+ Sft
            </button>
          ))}
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 28, alignItems: "start" }}>
          {/* Info panel */}
          <div>
            <div className="card" style={{ padding: 26, marginBottom: 16 }}>
              <div className="pf" style={{ color: "#C8A951", fontSize: 20, fontWeight: 700, marginBottom: 4 }}>Unit-{unit} — {u.size}+ Sft</div>
              <p className="cg" style={{ color: "rgba(255,255,255,.45)", fontSize: 15, marginBottom: 18 }}>Approx. — Floors 1 to 7</p>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
                {u.rooms.map(r => (
                  <div key={r.r} className="room-box">
                    <div style={{ fontSize: 11, color: "#C8A951", fontWeight: 600, marginBottom: 3 }}>{r.r}</div>
                    <div style={{ fontSize: 12, color: "rgba(255,255,255,.5)" }}>{r.s}</div>
                  </div>
                ))}
              </div>
            </div>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
              {u.features.map(f => (
                <span key={f} style={{ fontSize: 11, color: "rgba(255,255,255,.5)", background: "rgba(200,169,81,.05)", border: "1px solid rgba(200,169,81,.14)", borderRadius: 20, padding: "5px 13px" }}>{f}</span>
              ))}
            </div>
          </div>

          {/* SVG plan */}
          <div style={{ background: "#080F1E", border: "1px solid rgba(200,169,81,.2)", borderRadius: 14, padding: 18 }}>
            <PlanSVG u={unit} />
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── GROUND FLOOR ─────────────────────────────────────────────────────────────
function GroundFloor() {
  const ref = useReveal();
  return (
    <section style={{ padding: "80px 24px", background: "#060C18" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <div ref={ref} className="reveal" style={{ textAlign: "center", marginBottom: 44 }}>
          <h2 className="pf" style={{ fontSize: 38, fontWeight: 700, marginBottom: 6 }}>Ground Floor <span className="shimmer">Plan</span></h2>
          <GoldLine width={64} my={14} />
          <p style={{ color: "rgba(255,255,255,.4)", fontSize: 13 }}>Well planned. Functional living. Every detail matters.</p>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 32, alignItems: "center" }}>
          {/* SVG Ground Plan */}
          <div style={{ background: "#08101E", border: "1px solid rgba(200,169,81,.2)", borderRadius: 14, padding: 20 }}>
            <svg viewBox="0 0 460 290" style={{ width: "100%" }}>
              <defs>
                <pattern id="hG" width="6" height="6" patternUnits="userSpaceOnUse">
                  <line x1="0" y1="6" x2="6" y2="0" stroke="rgba(200,169,81,.1)" strokeWidth=".8" />
                </pattern>
              </defs>
              {/* Outer boundary */}
              <rect x="15" y="15" width="430" height="260" fill="rgba(200,169,81,.02)" stroke="rgba(200,169,81,.28)" strokeWidth="1.5" rx="4" />
              {/* Road strip */}
              <rect x="15" y="15" width="22" height="260" fill="rgba(200,169,81,.05)" stroke="rgba(200,169,81,.18)" strokeWidth="1" />
              <text x="26" y="148" fill="rgba(200,169,81,.45)" fontSize="9" textAnchor="middle" transform="rotate(-90,26,148)">ROAD</text>
              {/* Entry/Exit */}
              <rect x="38" y="108" width="28" height="74" fill="rgba(27,107,58,.18)" stroke="#1B6B3A" strokeWidth="1" rx="2" />
              <text x="52" y="140" fill="#22874A" fontSize="8" textAnchor="middle">ENTRY</text>
              <text x="52" y="151" fill="#22874A" fontSize="8" textAnchor="middle">EXIT</text>
              {/* Guard post */}
              <rect x="40" y="22" width="44" height="42" fill="rgba(200,169,81,.08)" stroke="rgba(200,169,81,.3)" strokeWidth="1" rx="2" />
              <text x="62" y="40" fill="rgba(200,169,81,.7)" fontSize="8" textAnchor="middle">GUARD</text>
              <text x="62" y="52" fill="rgba(255,255,255,.35)" fontSize="7" textAnchor="middle">4'×6'-8"</text>
              {/* Driveway area */}
              <rect x="68" y="22" width="244" height="246" fill="rgba(150,150,150,.04)" stroke="rgba(255,255,255,.07)" strokeWidth="1" rx="2" />
              <text x="190" y="148" fill="rgba(255,255,255,.2)" fontSize="11" textAnchor="middle" letterSpacing="0.12em">DRIVEWAY</text>
              {/* Top parking row */}
              {[0, 1, 2, 3].map(i => (
                <rect key={i} x={90 + i * 50} y={30} width={42} height={78} fill="rgba(200,169,81,.09)" stroke="rgba(200,169,81,.22)" strokeWidth=".8" rx="2" />
              ))}
              {/* Bottom parking row */}
              {[0, 1, 2, 3].map(i => (
                <rect key={i} x={90 + i * 50} y={185} width={42} height={74} fill="rgba(200,169,81,.09)" stroke="rgba(200,169,81,.22)" strokeWidth=".8" rx="2" />
              ))}
              {/* Right — utility rooms */}
              <rect x="318" y="22" width="62" height="54" fill="rgba(80,130,200,.1)" stroke="rgba(100,160,220,.28)" strokeWidth="1" rx="2" />
              <text x="349" y="46" fill="rgba(140,190,255,.65)" fontSize="8" textAnchor="middle">TOILET</text>
              <text x="349" y="57" fill="rgba(255,255,255,.3)" fontSize="7" textAnchor="middle">5'-7"×3'-6"</text>
              <rect x="387" y="22" width="52" height="108" fill="rgba(200,169,81,.07)" stroke="rgba(200,169,81,.22)" strokeWidth="1" rx="2" />
              <text x="413" y="72" fill="rgba(200,169,81,.6)" fontSize="8" textAnchor="middle">EMR</text>
              <text x="413" y="84" fill="rgba(255,255,255,.3)" fontSize="7" textAnchor="middle">13'-2"×</text>
              <text x="413" y="94" fill="rgba(255,255,255,.3)" fontSize="7" textAnchor="middle">15'-3"</text>
              <rect x="318" y="82" width="62" height="56" fill="rgba(200,169,81,.06)" stroke="rgba(200,169,81,.2)" strokeWidth="1" rx="2" />
              <text x="349" y="107" fill="rgba(200,169,81,.55)" fontSize="8" textAnchor="middle">LIFT</text>
              <text x="349" y="119" fill="rgba(255,255,255,.3)" fontSize="7" textAnchor="middle">5'×5'-6"</text>
              <rect x="318" y="190" width="120" height="72" fill="rgba(150,150,150,.07)" stroke="rgba(255,255,255,.14)" strokeWidth="1" rx="2" />
              <text x="378" y="225" fill="rgba(255,255,255,.4)" fontSize="9" textAnchor="middle">STAIR</text>
              <text x="378" y="237" fill="rgba(255,255,255,.28)" fontSize="7" textAnchor="middle">7'-1"×15'-0"</text>
              {/* Ground glow */}
              <ellipse cx="230" cy="272" rx="220" ry="6" fill="rgba(200,169,81,.06)" />
            </svg>
          </div>

          <div>
            <h3 className="pf" style={{ color: "#C8A951", fontSize: 24, marginBottom: 12 }}>Fully Planned Ground Floor</h3>
            <p style={{ color: "rgba(255,255,255,.48)", fontSize: 13, lineHeight: 1.75, marginBottom: 22 }}>
              The ground floor features a wide driveway with ample parking, 24/7 security guard post, 8-passenger lift, EMR room, dedicated stairwell, and generator backup — all designed for maximum convenience and safety.
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {[
                { i: "🚗", t: "8+ Parking Spots", d: "Wide driveway with dedicated resident parking" },
                { i: "🛡️", t: "24/7 Guard Post", d: "4'×6'-8\" security booth at the entry/exit" },
                { i: "🛗", t: "8-Passenger Lift", d: "5'×5'-6\" elevator — smooth access to all floors" },
                { i: "⚡", t: "EMR / Generator", d: "13'-2\"×15'-3\" room — uninterrupted power" },
              ].map(f => (
                <div key={f.t} className="fac-card">
                  <span style={{ fontSize: 20 }}>{f.i}</span>
                  <div>
                    <div style={{ fontSize: 13, fontWeight: 600, color: "#C8A951", marginBottom: 2 }}>{f.t}</div>
                    <div style={{ fontSize: 11, color: "rgba(255,255,255,.4)" }}>{f.d}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── FACILITIES ───────────────────────────────────────────────────────────────
function Facilities() {
  const ref = useReveal();
  const facs = [
    { i: "🛡️", t: "Secured Premises", d: "CCTV + guard post — 24/7 safety for residents" },
    { i: "🛗", t: "8-Passenger Lift", d: "Modern elevator for easy floor access" },
    { i: "🚗", t: "Ample Parking", d: "Wide driveway with dedicated parking spots" },
    { i: "📡", t: "Intercom System", d: "Building-wide intercom for secure entry" },
    { i: "⚡", t: "Generator Backup", d: "Uninterrupted power supply at all times" },
    { i: "✈️", t: "Airport Access", d: "Minutes from Dhaka International Airport" },
    { i: "🌿", t: "Peaceful Area", d: "Quiet, green, residential neighborhood" },
    { i: "🏗️", t: "Premium Build", d: "Grade-A materials, certified engineering" },
    { i: "🌬️", t: "Natural Ventilation", d: "Cross-ventilation in every unit type" },
  ];
  return (
    <section id="facilities" style={{ padding: "80px 24px", background: "#080F22" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <div ref={ref} className="reveal" style={{ textAlign: "center", marginBottom: 44 }}>
          <p style={{ fontSize: 11, letterSpacing: ".25em", textTransform: "uppercase", color: "rgba(200,169,81,.55)", marginBottom: 8 }}>What You Get</p>
          <h2 className="pf" style={{ fontSize: 38, fontWeight: 700, marginBottom: 6 }}>Building <span className="shimmer">Facilities</span></h2>
          <GoldLine width={64} my={14} />
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 14 }}>
          {facs.map(f => (
            <div key={f.t} className="fac-card">
              <div className="icon-box" style={{ fontSize: 20 }}>{f.i}</div>
              <div>
                <div style={{ fontSize: 13, fontWeight: 600, color: "#C8A951", marginBottom: 4 }}>{f.t}</div>
                <div style={{ fontSize: 11, color: "rgba(255,255,255,.42)", lineHeight: 1.55 }}>{f.d}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── CONTACT ──────────────────────────────────────────────────────────────────
function Contact() {
  const ref = useReveal();
  const [form, setForm] = useState({ name: "", phone: "", unit: "", msg: "" });
  const [sent, setSent] = useState(false);

  const handleSubmit = () => {
    if (!form.name || !form.phone) return;
    const txt = `Hello AYAAN City! 👋\n\nName: ${form.name}\nPhone: ${form.phone}\nUnit Interest: ${form.unit || "Not specified"}\nMessage: ${form.msg || "Interested in Bhuiyan Garden"}\n\nPlease contact me. Thank you!`;
    window.open(`https://wa.me/8801912469308?text=${encodeURIComponent(txt)}`, "_blank");
    setSent(true);
    setTimeout(() => setSent(false), 5000);
  };

  return (
    <section id="contact" style={{ padding: "88px 24px", background: "linear-gradient(135deg,#04080F 0%,#0D1B3E 50%,#051208 100%)", position: "relative", overflow: "hidden" }}>
      <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", width: 700, height: 700, background: "radial-gradient(circle,rgba(200,169,81,.04) 0%,transparent 70%)", pointerEvents: "none" }} />
      <div style={{ maxWidth: 1050, margin: "0 auto", position: "relative", zIndex: 1 }}>
        <div ref={ref} className="reveal" style={{ textAlign: "center", marginBottom: 50 }}>
          <p style={{ fontSize: 11, letterSpacing: ".25em", textTransform: "uppercase", color: "rgba(200,169,81,.55)", marginBottom: 8 }}>Get In Touch</p>
          <h2 className="pf" style={{ fontSize: 42, fontWeight: 800, lineHeight: 1.15, marginBottom: 8 }}>
            আপনার <span className="shimmer">স্বপ্নের</span><br />যাত্রা শুরু হোক আজই
          </h2>
          <GoldLine width={72} my={16} />
          <p style={{ color: "rgba(255,255,255,.45)", fontSize: 14, maxWidth: 480, margin: "0 auto" }}>
            Free consultation-এর জন্য এখনই যোগাযোগ করুন। আমাদের বিশেষজ্ঞ দল আপনাকে সাহায্য করবে।
          </p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 40, alignItems: "start" }}>
          {/* Form */}
          <div className="card" style={{ padding: 30 }}>
            <div className="pf" style={{ color: "#C8A951", fontSize: 18, fontWeight: 700, marginBottom: 22 }}>Free Consultation Request</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              <div>
                <label style={{ fontSize: 10, color: "rgba(255,255,255,.45)", textTransform: "uppercase", letterSpacing: ".1em", display: "block", marginBottom: 6 }}>Your Name *</label>
                <input className="inp" placeholder="আপনার নাম লিখুন" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
              </div>
              <div>
                <label style={{ fontSize: 10, color: "rgba(255,255,255,.45)", textTransform: "uppercase", letterSpacing: ".1em", display: "block", marginBottom: 6 }}>Phone *</label>
                <input className="inp" placeholder="01XXXXXXXXX" value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} />
              </div>
              <div>
                <label style={{ fontSize: 10, color: "rgba(255,255,255,.45)", textTransform: "uppercase", letterSpacing: ".1em", display: "block", marginBottom: 6 }}>Unit Type</label>
                <select className="inp" value={form.unit} onChange={e => setForm({ ...form, unit: e.target.value })}>
                  <option value="">Select unit</option>
                  <option value="Unit-A (1200+ Sft)">Unit-A — 1200+ Sft</option>
                  <option value="Unit-B (1075+ Sft)">Unit-B — 1075+ Sft</option>
                  <option value="Unit-C (1025+ Sft)">Unit-C — 1025+ Sft</option>
                </select>
              </div>
              <div>
                <label style={{ fontSize: 10, color: "rgba(255,255,255,.45)", textTransform: "uppercase", letterSpacing: ".1em", display: "block", marginBottom: 6 }}>Message</label>
                <textarea className="inp" rows={4} placeholder="আপনার প্রশ্ন বা বার্তা..." value={form.msg} onChange={e => setForm({ ...form, msg: e.target.value })} style={{ resize: "none" }} />
              </div>
              <button onClick={handleSubmit} className="btn-gold" style={{ width: "100%", padding: "14px 0", fontSize: 14, borderRadius: 10, marginTop: 4 }}>
                {sent ? "✅ Sent! We'll contact you soon." : "📲 Send via WhatsApp"}
              </button>
            </div>
          </div>

          {/* Contact details */}
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            {[
              { i: "📞", t: "Call Us Now", lines: ["01912469308", "01635594194"], href: "tel:01912469308", label: "Call Now" },
              { i: "💬", t: "WhatsApp", lines: ["Quick response within minutes", "Chat with our property team"], href: "https://wa.me/8801912469308", label: "Open WhatsApp" },
              { i: "🌐", t: "Website", lines: ["www.ayaancitybd.com", "Browse full property listings"], href: "https://www.ayaancitybd.com", label: "Visit" },
              { i: "📍", t: "Location", lines: ["Kawlarbazar-Mollabari", "Airport, Dhaka-1230"], href: "#", label: "View Map" },
            ].map(c => (
              <div key={c.t} className="fac-card" style={{ alignItems: "center" }}>
                <div className="icon-box" style={{ fontSize: 20 }}>{c.i}</div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 13, fontWeight: 600, color: "#C8A951", marginBottom: 2 }}>{c.t}</div>
                  {c.lines.map(l => <div key={l} style={{ fontSize: 11, color: "rgba(255,255,255,.45)" }}>{l}</div>)}
                </div>
                <a href={c.href} target="_blank" rel="noopener noreferrer" style={{ fontSize: 11, color: "#C8A951", border: "1px solid rgba(200,169,81,.28)", borderRadius: 6, padding: "6px 12px", textDecoration: "none", whiteSpace: "nowrap", transition: "all .25s" }}
                  onMouseEnter={e => e.target.style.background = "rgba(200,169,81,.1)"} onMouseLeave={e => e.target.style.background = "transparent"}>
                  {c.label}
                </a>
              </div>
            ))}

            {/* Live Better CTA */}
            <div style={{ marginTop: 8, padding: "24px 22px", background: "rgba(200,169,81,.06)", border: "1px solid rgba(200,169,81,.2)", borderRadius: 16, textAlign: "center" }}>
              <div className="pf" style={{ fontSize: 22, fontWeight: 700, color: "#fff", marginBottom: 4 }}>Live Better.</div>
              <div className="pf shimmer" style={{ fontSize: 24, fontWeight: 800, marginBottom: 10 }}>Live Ayaan.</div>
              <p className="cg" style={{ fontSize: 15, color: "rgba(200,169,81,.65)", marginBottom: 0 }}>A Perfect Address for a Better Tomorrow</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── FOOTER ───────────────────────────────────────────────────────────────────
function Footer() {
  return (
    <footer style={{ background: "#020508", borderTop: "1px solid rgba(200,169,81,.1)", padding: "28px 24px", textAlign: "center" }}>
      <div className="pf" style={{ color: "#C8A951", fontSize: 15, fontWeight: 700, marginBottom: 6 }}>AYAAN CITY Builders Land Development Ltd.</div>
      <p style={{ color: "rgba(255,255,255,.3)", fontSize: 12, marginBottom: 8 }}>Making Dreams With Confidence — Kawlarbazar-Mollabari, Airport, Dhaka-1230</p>
      <div style={{ display: "flex", justifyContent: "center", gap: 24, fontSize: 11, color: "rgba(255,255,255,.2)" }}>
        <span>📞 01912469308</span><span>📞 01635594194</span><span>🌐 www.ayaancitybd.com</span>
      </div>
    </footer>
  );
}

// ─── ROOT ─────────────────────────────────────────────────────────────────────
export default function AyaanCityLanding() {
  return (
    <>
      <style>{GF}</style>
      <style>{CSS}</style>
      <div style={{ minHeight: "100vh", background: "#080F22" }}>
        <Navbar />
        <Hero />
        <FloorPlans />
        <GroundFloor />
        <Facilities />
        <Contact />
        <Footer />
      </div>
    </>
  );
}
