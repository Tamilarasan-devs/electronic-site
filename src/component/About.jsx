import { useState, useEffect, useRef } from "react";
import {
  MonitorCheck, CircuitBoard, Package, HeadphonesIcon,
  ShieldCheck, Clock, Star, Users,
  Phone, MapPin, ArrowUpRight, ChevronRight, Zap
} from "lucide-react";

/* ─────────────────────────── DATA ─────────────────────────── */
const services = [
  {
    id: 1, num: "01", icon: MonitorCheck,
    title: "Panel & Display Repairs",
    desc: "Complete diagnosis and restoration of LCD and LED panels — from backlight failures to full screen replacements.",
    tags: ["LED Backlight", "Panel Swap", "Calibration"],
    accent: "#2563eb", light: "#eff6ff", border: "#bfdbfe",
  },
  {
    id: 2, num: "02", icon: CircuitBoard,
    title: "Motherboard & PCB",
    desc: "Component-level repair of power boards, T-CON boards, and main PCBs with precision soldering tools.",
    tags: ["PCB Repair", "Power Board", "Soldering"],
    accent: "#0891b2", light: "#ecfeff", border: "#a5f3fc",
  },
  {
    id: 3, num: "03", icon: Package,
    title: "Spare Parts Supply",
    desc: "Genuine and compatible parts in stock for most major brands — no long waits, same-day fitment available.",
    tags: ["OEM Parts", "Remotes", "Stands"],
    accent: "#7c3aed", light: "#f5f3ff", border: "#ddd6fe",
  },
  {
    id: 4, num: "04", icon: HeadphonesIcon,
    title: "Technical Support",
    desc: "Phone and in-person consultation before any repair begins — transparent quotes, no hidden charges.",
    tags: ["Phone Help", "In-Home Visit", "Mail-In"],
    accent: "#0d9488", light: "#f0fdfa", border: "#99f6e4",
  },
];

const stats = [
  { value: "10+",  label: "Years in Service",  icon: Star,         accent: "#2563eb", light: "#eff6ff", border: "#bfdbfe" },
  { value: "5K+",  label: "TVs Repaired",       icon: MonitorCheck, accent: "#0891b2", light: "#ecfeff", border: "#a5f3fc" },
  { value: "3 Hrs",label: "Same Day",           icon: Clock,        accent: "#7c3aed", light: "#f5f3ff", border: "#ddd6fe" },
  { value: "₹0",   label: "Diagnosis Fee",      icon: ShieldCheck,  accent: "#0d9488", light: "#f0fdfa", border: "#99f6e4" },
];

const brands = ["Samsung", "LG", "Sony", "Panasonic", "Philips", "Onida", "Videocon", "Mi", "TCL", "OnePlus"];

const whyUs = [
  { num: "01", icon: ShieldCheck, title: "Free Diagnosis",   body: "We assess your TV at zero cost before quoting any repair price. No surprises, ever.", accent: "#2563eb", light: "#eff6ff", border: "#bfdbfe" },
  { num: "02", icon: Clock,       title: "Same-Day Repairs", body: "Most standard repairs are completed within the day. We respect your time completely.",   accent: "#0891b2", light: "#ecfeff", border: "#a5f3fc" },
  { num: "03", icon: Package,     title: "Genuine Parts",    body: "OEM and trusted compatible parts sourced from verified suppliers — stocked in-house.",   accent: "#7c3aed", light: "#f5f3ff", border: "#ddd6fe" },
  { num: "04", icon: Users,       title: "Expert Team",      body: "Certified technicians trained on all major brands with 10+ years of hands-on experience.", accent: "#0d9488", light: "#f0fdfa", border: "#99f6e4" },
];

/* ─────────────────────── HOOKS & HELPERS ─────────────────────── */
function useInView(threshold = 0.12) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setInView(true); obs.disconnect(); } },
      { threshold }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return [ref, inView];
}

function Reveal({ children, delay = 0, from = "bottom", className = "" }) {
  const [ref, inView] = useInView(0.1);
  const transforms = { bottom: "translateY(44px)", left: "translateX(-44px)", right: "translateX(44px)" };
  return (
    <div ref={ref} className={className} style={{
      opacity: inView ? 1 : 0,
      transform: inView ? "none" : transforms[from],
      transition: `opacity .75s cubic-bezier(.22,1,.36,1) ${delay}ms, transform .75s cubic-bezier(.22,1,.36,1) ${delay}ms`,
    }}>
      {children}
    </div>
  );
}

function AnimatedCounter({ target, inView, delay = 0 }) {
  const [display, setDisplay] = useState("0");
  useEffect(() => {
    if (!inView) return;
    const numPart = parseInt(target);
    if (isNaN(numPart)) { setTimeout(() => setDisplay(target), delay); return; }
    const suffix = target.replace(/[0-9]/g, "");
    let start = 0;
    const t = setTimeout(() => {
      const step = Math.ceil(numPart / (1400 / 16));
      const timer = setInterval(() => {
        start += step;
        if (start >= numPart) { setDisplay(`${numPart}${suffix}`); clearInterval(timer); }
        else setDisplay(`${start}${suffix}`);
      }, 16);
    }, delay);
    return () => clearTimeout(t);
  }, [inView]);
  return <span>{display}</span>;
}

/* ─────────────────────────── COMPONENT ─────────────────────────── */
export default function AboutUs() {
  const [hovSvc, setHovSvc] = useState(null);
  const [hovWhy, setHovWhy] = useState(null);
  const [statsRef, statsInView] = useInView(0.2);
  const [heroRef, heroInView] = useInView(0.05);

  return (
    <div style={{ background: "#f0f5ff", overflow: "hidden" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Barlow:ital,wght@0,300;0,400;0,600;0,700;0,800;1,600&display=swap');

        * { box-sizing: border-box; }

        /* Grid bg */
        @keyframes gridPulse { 0%,100%{opacity:.5} 50%{opacity:1} }
        .grid-bg {
          position: fixed; inset: 0; pointer-events: none; z-index: 0;
          background-image:
            linear-gradient(rgba(37,99,235,0.045) 1px, transparent 1px),
            linear-gradient(90deg, rgba(37,99,235,0.045) 1px, transparent 1px);
          background-size: 48px 48px;
          animation: gridPulse 8s ease-in-out infinite;
        }

        /* Top bar */
        .top-bar {
          position: relative; z-index: 10; height: 4px;
          background: linear-gradient(90deg, #2563eb, #0891b2, #7c3aed, #0d9488);
        }

        /* Heading underline draw */
        .ul-draw {
          position: absolute; bottom: -5px; left: 0; right: 0;
          height: 3px; border-radius: 9999px;
          background: linear-gradient(90deg, #2563eb, #7c3aed);
          transform: scaleX(0); transform-origin: left;
          transition: transform .9s cubic-bezier(.22,1,.36,1) .6s;
        }
        .ul-draw.on { transform: scaleX(1); }

        /* Pulse dot */
        @keyframes pRing { 0%{transform:scale(1);opacity:.9} 80%{transform:scale(2.4);opacity:0} 100%{transform:scale(2.4);opacity:0} }
        .pdot { position:relative; width:8px; height:8px; border-radius:50%; flex-shrink:0; }
        .pdot::after { content:''; position:absolute; inset:0; border-radius:50%; animation:pRing 2s ease-out infinite; }

        /* Stat card */
        .stat-card {
          border-radius: 24px; padding: 28px 24px;
          display: flex; flex-direction: column; gap: 12px;
          cursor: default; overflow: hidden; position: relative;
          transition: transform .4s cubic-bezier(.22,1,.36,1), box-shadow .4s, border-color .3s;
        }
        .stat-card::after {
          content:''; position:absolute; inset:0;
          background:linear-gradient(105deg,transparent 35%,rgba(255,255,255,.6) 50%,transparent 65%);
          transform:translateX(-100%); transition:transform .55s ease; pointer-events:none;
        }
        .stat-card:hover::after { transform:translateX(100%); }
        .stat-card:hover { transform:translateY(-8px) scale(1.02); }

        /* Service row */
        .svc-row {
          display: grid;
          grid-template-columns: 56px 1fr 48px;
          gap: 24px; padding: 28px 20px;
          border-radius: 20px; cursor: default;
          transition: background .35s, transform .35s cubic-bezier(.22,1,.36,1);
        }
        .svc-row:hover { transform: translateX(6px); }

        /* Tag pill */
        .tag-pill {
          font-family: 'Barlow', sans-serif;
          font-size: 10px; font-weight: 700; letter-spacing: 2px; text-transform: uppercase;
          border-radius: 999px; padding: 4px 12px;
          transition: background .3s, border-color .3s, color .3s;
        }

        /* Why card */
        .why-card {
          border-radius: 24px; padding: 36px 32px;
          position: relative; overflow: hidden; cursor: default;
          transition: transform .42s cubic-bezier(.22,1,.36,1), box-shadow .42s, border-color .35s;
        }
        .why-card::after {
          content:''; position:absolute; inset:0;
          background:linear-gradient(105deg,transparent 35%,rgba(255,255,255,.55) 50%,transparent 65%);
          transform:translateX(-100%); transition:transform .6s ease; pointer-events:none;
        }
        .why-card:hover::after { transform:translateX(100%); }
        .why-card:hover { transform:translateY(-8px) scale(1.01); }

        /* Icon box */
        .icon-box {
          width:52px; height:52px; border-radius:16px;
          display:flex; align-items:center; justify-content:center;
          transition:transform .42s cubic-bezier(.22,1,.36,1), background .3s;
        }
        .why-card:hover .icon-box { transform:rotate(-8deg) scale(1.12); }

        /* Marquee */
        @keyframes mq { from{transform:translateX(0)} to{transform:translateX(-33.333%)} }
        .mq-track { animation: mq 22s linear infinite; display:flex; width:max-content; }
        .mq-track:hover { animation-play-state:paused; }

        /* CTA banner shimmer */
        @keyframes ctaShimmer {
          0%   { transform: translateX(-100%) skewX(-20deg); }
          100% { transform: translateX(300%)  skewX(-20deg); }
        }
        .cta-shimmer {
          position: absolute; top:0; bottom:0; width: 60px;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.08), transparent);
          animation: ctaShimmer 4s ease-in-out infinite;
        }

        /* Hero text animation */
        @keyframes heroSlide {
          from { opacity:0; transform:translateY(48px); }
          to   { opacity:1; transform:translateY(0); }
        }
        .hero-a1 { animation: heroSlide .85s cubic-bezier(.22,1,.36,1) .1s both; }
        .hero-a2 { animation: heroSlide .85s cubic-bezier(.22,1,.36,1) .25s both; }
        .hero-a3 { animation: heroSlide .85s cubic-bezier(.22,1,.36,1) .4s both; }
        .hero-a4 { animation: heroSlide .85s cubic-bezier(.22,1,.36,1) .55s both; }

        /* Underline draw on hero */
        @keyframes lineExpand { from{transform:scaleX(0)} to{transform:scaleX(1)} }
        .hero-line { animation: lineExpand .9s cubic-bezier(.22,1,.36,1) .9s both; transform-origin: left; }

        /* Btn styles */
        .btn-primary {
          display:inline-flex; align-items:center; gap:8px;
          padding:14px 28px; border-radius:999px;
          font-family:'Barlow',sans-serif; font-size:12px; font-weight:700;
          letter-spacing:3px; text-transform:uppercase;
          color:#fff; border:none; cursor:pointer; overflow:hidden; position:relative;
          background:linear-gradient(135deg,#2563eb,#1d4ed8);
          box-shadow:0 8px 28px rgba(37,99,235,.35);
          transition:transform .3s cubic-bezier(.22,1,.36,1), box-shadow .3s;
        }
        .btn-primary::after { content:''; position:absolute; inset:0; background:linear-gradient(105deg,transparent 35%,rgba(255,255,255,.18) 50%,transparent 65%); transform:translateX(-100%); transition:transform .5s; }
        .btn-primary:hover { transform:translateY(-3px); box-shadow:0 14px 38px rgba(37,99,235,.48); }
        .btn-primary:hover::after { transform:translateX(100%); }

        .btn-ghost {
          display:inline-flex; align-items:center; gap:8px;
          padding:14px 24px; border-radius:999px;
          font-family:'Barlow',sans-serif; font-size:12px; font-weight:700;
          letter-spacing:3px; text-transform:uppercase; cursor:pointer;
          background:#fff; color:#1d4ed8; border:1.5px solid #bfdbfe;
          box-shadow:0 4px 14px rgba(37,99,235,.1);
          transition:transform .3s cubic-bezier(.22,1,.36,1), background .3s, box-shadow .3s;
        }
        .btn-ghost:hover { transform:translateY(-3px); background:#eff6ff; box-shadow:0 10px 28px rgba(37,99,235,.18); }
        .btn-ghost svg { transition:transform .3s cubic-bezier(.22,1,.36,1); }
        .btn-ghost:hover svg { transform:translateX(4px); }

        /* Divider draw */
        .div-draw { height:1px; width:0; transition:width 1.1s cubic-bezier(.22,1,.36,1) .3s; }
        .div-draw.on { width:100%; }

        /* Float badge */
        @keyframes floatY { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-6px)} }
        .float { animation: floatY 3.5s ease-in-out infinite; }

        /* Section separator */
        .sep { height:1px; background:linear-gradient(90deg,transparent,rgba(37,99,235,.15),transparent); }
      `}</style>

      {/* Grid bg */}
      <div className="grid-bg" />

      {/* Top bar */}
      <div className="top-bar" />

      {/* ════════ HERO ════════ */}
      <section style={{
        position: "relative", zIndex: 10,
        padding: "80px 24px 96px",
        borderBottom: "1px solid rgba(37,99,235,.1)",
      }}>
        {/* Ghost word */}
        <div style={{
          position: "absolute", top: 0, right: 0,
          fontFamily: "'Bebas Neue', sans-serif",
          fontSize: "clamp(120px, 20vw, 280px)",
          color: "rgba(37,99,235,0.04)", lineHeight: 1,
          userSelect: "none", pointerEvents: "none",
          letterSpacing: 8,
        }}>ABOUT</div>

        {/* Ambient glow */}
        <div style={{
          position: "absolute", top: "-10%", left: "40%",
          width: 800, height: 600, borderRadius: "50%",
          background: "radial-gradient(ellipse, rgba(37,99,235,0.09) 0%, transparent 65%)",
          pointerEvents: "none",
        }} />

        <div style={{ position: "relative", maxWidth: 1200, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 64, alignItems: "center" }}>

          {/* Left copy */}
          <div>
            <div className="hero-a1" style={{
              display: "inline-flex", alignItems: "center", gap: 8,
              padding: "6px 18px", borderRadius: 999, marginBottom: 28,
              background: "#eff6ff", border: "1px solid #bfdbfe",
            }}>
              <span className="pdot" style={{ background: "#2563eb" }}>
                <style>{`.pdot::after{background:#2563eb}`}</style>
              </span>
              <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: 5, textTransform: "uppercase", color: "#1d4ed8" }}>
                Coimbatore's #1 TV Repair
              </span>
            </div>

            <div className="hero-a2">
              <h1 style={{
                fontFamily: "'Bebas Neue', sans-serif",
                fontSize: "clamp(64px, 9vw, 116px)",
                lineHeight: 0.9, margin: "0 0 24px",
                letterSpacing: 4,
              }}>
                <span style={{ display: "block", color: "#0f172a" }}>Your TV,</span>
                <span style={{ display: "block", position: "relative", color: "#2563eb" }}>
                  Repaired.
                  <span className="hero-line" style={{
                    position: "absolute", bottom: -6, left: 0, right: 0,
                    height: 4, borderRadius: 9999,
                    background: "linear-gradient(90deg, #2563eb, #7c3aed, #0891b2)",
                  }} />
                </span>
              </h1>
            </div>

            <div className="hero-a3" style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20 }}>
              <span style={{ width: 32, height: 2.5, background: "linear-gradient(90deg,#2563eb,transparent)", borderRadius: 9999 }} />
              <p style={{ margin: 0, color: "#2563eb", fontSize: 13, fontWeight: 700, letterSpacing: 4, textTransform: "uppercase", fontStyle: "italic" }}>
                Trusted Since 2014
              </p>
            </div>

            <div className="hero-a3">
              <p style={{ margin: "0 0 32px", color: "#475569", fontSize: 17, lineHeight: 1.8, maxWidth: 460, fontWeight: 400 }}>
                Specialists in LCD &amp; LED television repair, motherboard diagnostics,
                and genuine spare parts — trusted by <strong style={{ color: "#1e293b" }}>thousands across Coimbatore.</strong>
              </p>
            </div>

            <div className="hero-a4" style={{ display: "flex", alignItems: "center", gap: 12, flexWrap: "wrap" }}>
              <button className="btn-primary">
                <Phone size={15} />
                Call Now
              </button>
              <button className="btn-ghost">
                Our Services
                <ArrowUpRight size={14} />
              </button>
            </div>
          </div>

          {/* Right — stat cards */}
          <div ref={statsRef} style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
            {stats.map((s, i) => {
              const Icon = s.icon;
              return (
                <Reveal key={s.label} delay={i * 80} from="bottom">
                  <div className="stat-card" style={{
                    background: "#fff",
                    border: `1.5px solid #e2e8f0`,
                    boxShadow: "0 4px 20px rgba(15,23,42,0.07)",
                  }}
                    onMouseEnter={e => { e.currentTarget.style.borderColor = s.border; e.currentTarget.style.boxShadow = `0 20px 50px ${s.accent}25`; }}
                    onMouseLeave={e => { e.currentTarget.style.borderColor = "#e2e8f0"; e.currentTarget.style.boxShadow = "0 4px 20px rgba(15,23,42,0.07)"; }}
                  >
                    {/* Top accent */}
                    <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 3, borderRadius: "24px 24px 0 0", background: `linear-gradient(90deg,${s.accent},${s.accent}77)` }} />
                    <div style={{
                      width: 44, height: 44, borderRadius: 13,
                      background: s.light, border: `1px solid ${s.border}`,
                      display: "flex", alignItems: "center", justifyContent: "center",
                    }}>
                      <Icon size={20} color={s.accent} />
                    </div>
                    <div>
                      <div style={{
                        fontFamily: "'Bebas Neue', sans-serif",
                        fontSize: 52, lineHeight: 1, color: s.accent,
                      }}>
                        <AnimatedCounter target={s.value} inView={statsInView} delay={i * 100} />
                      </div>
                      <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: 3, textTransform: "uppercase", color: "#94a3b8", marginTop: 2 }}>
                        {s.label}
                      </div>
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ════════ ABOUT COPY ════════ */}
      <div className="sep" />
      <section style={{ position: "relative", zIndex: 10, padding: "80px 24px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 64, alignItems: "start" }}>
            <Reveal from="left">
              <div style={{
                display: "inline-flex", alignItems: "center", gap: 8,
                padding: "5px 16px", borderRadius: 999, marginBottom: 20,
                background: "#eff6ff", border: "1px solid #bfdbfe",
              }}>
                <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: 4, textTransform: "uppercase", color: "#1d4ed8" }}>About Us</span>
              </div>
              <h2 style={{
                fontFamily: "'Bebas Neue', sans-serif",
                fontSize: "clamp(40px, 5vw, 64px)",
                color: "#0f172a", lineHeight: 1.05,
                letterSpacing: 3, margin: 0,
              }}>
                Who We Are &amp;<br />
                <span style={{ color: "#2563eb" }}>What We Stand For</span>
              </h2>
            </Reveal>
            <Reveal from="right" delay={100}>
              <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
                <p style={{ margin: 0, color: "#475569", fontSize: 16, lineHeight: 1.8, fontWeight: 400 }}>
                  KJ Electronics has been Coimbatore's go-to TV repair center for over a decade.
                  Our technicians are trained across all major brands and specialize in both LCD and LED technology —
                  from panel-level repairs to deep PCB diagnostics.
                </p>
                <p style={{ margin: 0, color: "#475569", fontSize: 16, lineHeight: 1.8, fontWeight: 400 }}>
                  We believe in transparency first. Every repair starts with a{" "}
                  <strong style={{ color: "#2563eb" }}>free diagnosis</strong> and a clear quote
                  before any work begins. We stock genuine parts so you're never waiting longer than necessary.
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ════════ SERVICES ════════ */}
      <div className="sep" />
      <section id="services" style={{ position: "relative", zIndex: 10, padding: "80px 24px 96px" }}>
        {/* Ambient glow */}
        <div style={{
          position: "absolute", top: "10%", right: 0, width: 500, height: 500, borderRadius: "50%",
          background: "radial-gradient(ellipse,rgba(124,58,237,0.06) 0%,transparent 70%)",
          pointerEvents: "none",
        }} />

        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <Reveal>
            <div style={{ marginBottom: 56 }}>
              <div style={{
                display: "inline-flex", alignItems: "center", gap: 8,
                padding: "5px 16px", borderRadius: 999, marginBottom: 16,
                background: "#eff6ff", border: "1px solid #bfdbfe",
              }}>
                <Zap size={12} color="#2563eb" />
                <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: 4, textTransform: "uppercase", color: "#1d4ed8" }}>Services</span>
              </div>
              <h2 style={{
                fontFamily: "'Bebas Neue', sans-serif",
                fontSize: "clamp(52px, 7vw, 88px)",
                color: "#0f172a", lineHeight: 1, letterSpacing: 5, margin: 0,
              }}>
                What We <span style={{ color: "#2563eb" }}>Do Best</span>
              </h2>
            </div>
          </Reveal>

          {/* Service rows */}
          <div style={{ borderTop: "1px solid rgba(37,99,235,0.1)", borderBottom: "1px solid rgba(37,99,235,0.1)" }}>
            {services.map((s, idx) => {
              const Icon = s.icon;
              const isHov = hovSvc === s.id;
              return (
                <Reveal key={s.id} delay={idx * 80}>
                  <div
                    className="svc-row"
                    onMouseEnter={() => setHovSvc(s.id)}
                    onMouseLeave={() => setHovSvc(null)}
                    style={{
                      borderBottom: idx < services.length - 1 ? "1px solid rgba(37,99,235,0.08)" : "none",
                      background: isHov ? s.light : "transparent",
                    }}
                  >
                    {/* Number */}
                    <div style={{
                      fontFamily: "'Bebas Neue', sans-serif",
                      fontSize: 15, fontWeight: 700, letterSpacing: 2,
                      color: isHov ? s.accent : "rgba(37,99,235,0.2)",
                      paddingTop: 6, transition: "color .3s",
                    }}>
                      {s.num}
                    </div>

                    {/* Content */}
                    <div>
                      <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 10 }}>
                        <div style={{
                          width: 40, height: 40, borderRadius: 12,
                          background: isHov ? `${s.accent}20` : "#f1f5f9",
                          border: `1px solid ${isHov ? s.border : "#e2e8f0"}`,
                          display: "flex", alignItems: "center", justifyContent: "center",
                          transition: "all .35s",
                          transform: isHov ? "rotate(-6deg) scale(1.1)" : "none",
                          flexShrink: 0,
                        }}>
                          <Icon size={18} color={isHov ? s.accent : "#94a3b8"} />
                        </div>
                        <h3 style={{
                          fontFamily: "'Bebas Neue', sans-serif",
                          fontSize: "clamp(26px, 3.5vw, 42px)",
                          letterSpacing: 2, color: isHov ? s.accent : "#1e293b",
                          margin: 0,
                          transition: "color .3s, transform .4s cubic-bezier(.22,1,.36,1)",
                          transform: isHov ? "translateX(6px)" : "none",
                        }}>
                          {s.title}
                        </h3>
                      </div>
                      <p style={{
                        margin: "0 0 14px", fontSize: 15, lineHeight: 1.75, maxWidth: 560,
                        color: isHov ? "#475569" : "#94a3b8",
                        transition: "color .3s",
                        fontWeight: 400,
                      }}>
                        {s.desc}
                      </p>
                      <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                        {s.tags.map(tag => (
                          <span key={tag} className="tag-pill" style={{
                            background: isHov ? `${s.accent}15` : "#f8faff",
                            border: `1px solid ${isHov ? s.border : "#e2e8f0"}`,
                            color: isHov ? s.accent : "#94a3b8",
                          }}>{tag}</span>
                        ))}
                      </div>
                    </div>

                    {/* Arrow */}
                    <div style={{
                      display: "flex", alignItems: "center", justifyContent: "flex-end",
                      opacity: isHov ? 1 : 0,
                      transform: isHov ? "translateX(0) rotate(0)" : "translateX(-8px) rotate(-45deg)",
                      transition: "all .4s cubic-bezier(.22,1,.36,1)",
                    }}>
                      <div style={{
                        width: 44, height: 44, borderRadius: "50%",
                        background: `linear-gradient(135deg, ${s.accent}, ${s.accent}cc)`,
                        display: "flex", alignItems: "center", justifyContent: "center",
                        boxShadow: `0 8px 20px ${s.accent}44`,
                      }}>
                        <ArrowUpRight size={18} color="#fff" />
                      </div>
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ════════ BRANDS MARQUEE ════════ */}
      <section style={{
        position: "relative", zIndex: 10,
        padding: "56px 0",
        background: "#fff",
        borderTop: "1px solid rgba(37,99,235,.08)",
        borderBottom: "1px solid rgba(37,99,235,.08)",
      }}>
        <Reveal>
          <div style={{ display: "flex", alignItems: "center", gap: 12, justifyContent: "center", marginBottom: 32 }}>
            <span style={{ width: 28, height: 2, background: "linear-gradient(90deg,#2563eb,transparent)", borderRadius: 9999 }} />
            <p style={{ margin: 0, fontSize: 11, fontWeight: 700, letterSpacing: 5, textTransform: "uppercase", color: "#2563eb" }}>
              Brands We Service
            </p>
            <span style={{ width: 28, height: 2, background: "linear-gradient(90deg,transparent,#7c3aed)", borderRadius: 9999 }} />
          </div>
        </Reveal>

        <div style={{ overflow: "hidden", position: "relative" }}>
          <div className="mq-track">
            {[...brands, ...brands, ...brands].map((b, i) => (
              <div key={i} style={{
                display: "inline-flex", alignItems: "center", gap: 24,
                flexShrink: 0,
              }}>
                <span
                  style={{
                    fontFamily: "'Bebas Neue', sans-serif",
                    fontSize: "clamp(28px, 4vw, 44px)",
                    letterSpacing: 4, color: "#2563eb",
                    cursor: "default", userSelect: "none",
                    transition: "color .2s",
                  }}
                  onMouseEnter={e => e.currentTarget.style.color = "#7c3aed"}
                  onMouseLeave={e => e.currentTarget.style.color = "#2563eb"}
                >
                  {b}
                </span>
                <span style={{
                  width: 6, height: 6, borderRadius: "50%",
                  background: "rgba(37,99,235,0.2)", display: "inline-block", flexShrink: 0,
                }} />
              </div>
            ))}
          </div>
          <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: 100, background: "linear-gradient(90deg,#fff,transparent)", pointerEvents: "none" }} />
          <div style={{ position: "absolute", right: 0, top: 0, bottom: 0, width: 100, background: "linear-gradient(270deg,#fff,transparent)", pointerEvents: "none" }} />
        </div>
      </section>

      {/* ════════ WHY US ════════ */}
      <div className="sep" />
      <section style={{ position: "relative", zIndex: 10, padding: "96px 24px" }}>
        <div style={{
          position: "absolute", bottom: "10%", left: 0, width: 500, height: 500, borderRadius: "50%",
          background: "radial-gradient(ellipse,rgba(8,145,178,0.06) 0%,transparent 70%)",
          pointerEvents: "none",
        }} />

        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <Reveal>
            <div style={{ textAlign: "center", marginBottom: 64, display: "flex", flexDirection: "column", alignItems: "center", gap: 16 }}>
              <div style={{
                display: "inline-flex", alignItems: "center", gap: 8,
                padding: "6px 18px", borderRadius: 999,
                background: "#eff6ff", border: "1px solid #bfdbfe",
              }}>
                <span className="pdot" style={{ background: "#2563eb" }} />
                <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: 4, textTransform: "uppercase", color: "#1d4ed8" }}>Why Choose Us</span>
              </div>
              <h2 style={{
                fontFamily: "'Bebas Neue', sans-serif",
                fontSize: "clamp(48px, 7vw, 90px)",
                color: "#0f172a", letterSpacing: 6, margin: 0, lineHeight: 1,
              }}>
                The KJ Electronics <span style={{ color: "#2563eb" }}>Difference</span>
              </h2>
              <p style={{ margin: 0, color: "#64748b", fontSize: 15, maxWidth: 480, lineHeight: 1.7 }}>
                Four pillars that set us apart — and keep customers coming back.
              </p>
            </div>
          </Reveal>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 20 }}>
            {whyUs.map((item, idx) => {
              const Icon = item.icon;
              const isHov = hovWhy === item.num;
              return (
                <Reveal key={item.num} delay={idx * 90}>
                  <div
                    className="why-card"
                    onMouseEnter={() => setHovWhy(item.num)}
                    onMouseLeave={() => setHovWhy(null)}
                    style={{
                      background: isHov ? item.light : "#fff",
                      border: `1.5px solid ${isHov ? item.border : "#e2e8f0"}`,
                      boxShadow: isHov
                        ? `0 24px 60px ${item.accent}22, 0 0 0 1px ${item.border}`
                        : "0 4px 20px rgba(15,23,42,0.07)",
                    }}
                  >
                    {/* Top accent */}
                    <div style={{
                      position: "absolute", top: 0, left: 0, right: 0, height: 3, borderRadius: "24px 24px 0 0",
                      background: `linear-gradient(90deg, ${item.accent}, ${item.accent}77)`,
                      transform: isHov ? "scaleX(1)" : "scaleX(0)",
                      transformOrigin: "left",
                      transition: "transform .45s cubic-bezier(.22,1,.36,1)",
                    }} />

                    {/* Ghost number */}
                    <span style={{
                      position: "absolute", bottom: 2, right: 12,
                      fontFamily: "'Bebas Neue', sans-serif", fontSize: 110,
                      lineHeight: 1, color: isHov ? `${item.accent}0e` : "rgba(15,23,42,0.04)",
                      userSelect: "none", pointerEvents: "none", transition: "color .35s",
                    }}>{item.num}</span>

                    <div className="icon-box" style={{
                      background: isHov ? `${item.accent}18` : "#f1f5f9",
                      border: `1px solid ${isHov ? item.border : "#e2e8f0"}`,
                      marginBottom: 20,
                    }}>
                      <Icon size={22} color={isHov ? item.accent : "#94a3b8"} />
                    </div>

                    <div style={{ width: 28, height: 3, borderRadius: 9999, background: isHov ? item.accent : "#e2e8f0", marginBottom: 16, transition: "background .35s, width .4s" }} />

                    <h4 style={{
                      fontFamily: "'Bebas Neue', sans-serif",
                      fontSize: "clamp(24px, 3vw, 32px)",
                      letterSpacing: 2, color: isHov ? item.accent : "#1e293b",
                      margin: "0 0 12px",
                      transition: "color .35s",
                    }}>
                      {item.title}
                    </h4>
                    <p style={{
                      margin: 0, fontSize: 14.5, lineHeight: 1.75, fontWeight: 400,
                      color: isHov ? "#475569" : "#94a3b8",
                      transition: "color .35s",
                    }}>
                      {item.body}
                    </p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ════════ CTA BANNER ════════ */}
      <section style={{ position: "relative", zIndex: 10, padding: "0 24px 96px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <Reveal>
            <div style={{
              position: "relative", borderRadius: 28, overflow: "hidden",
              background: "linear-gradient(135deg, #1e3a8a, #2563eb, #1d4ed8)",
              boxShadow: "0 32px 80px rgba(37,99,235,0.35)",
            }}>
              {/* Dot texture */}
              <div style={{
                position: "absolute", inset: 0, pointerEvents: "none",
                backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.08) 1px, transparent 1px)",
                backgroundSize: "24px 24px",
              }} />

              {/* Radial glow top-right */}
              <div style={{
                position: "absolute", top: 0, right: 0, width: 400, height: 400, borderRadius: "50%",
                background: "radial-gradient(circle at 80% 20%, rgba(167,139,250,0.25), transparent 60%)",
                pointerEvents: "none",
              }} />

              {/* Shimmer */}
              <div className="cta-shimmer" />

              {/* Ghost KJ */}
              <div style={{
                position: "absolute", bottom: 0, right: 0,
                fontFamily: "'Bebas Neue', sans-serif",
                fontSize: 220, color: "rgba(255,255,255,0.04)",
                lineHeight: 0.85, userSelect: "none", pointerEvents: "none",
                letterSpacing: 8,
              }}>KJ</div>

              <div style={{
                position: "relative",
                padding: "56px 52px",
                display: "grid",
                gridTemplateColumns: "1fr auto",
                gap: 40, alignItems: "center",
              }}>
                <div>
                  <div style={{
                    display: "inline-flex", alignItems: "center", gap: 8,
                    padding: "6px 16px", borderRadius: 999,
                    border: "1px solid rgba(255,255,255,.2)",
                    background: "rgba(255,255,255,.1)",
                    marginBottom: 20,
                  }}>
                    <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#fff", flexShrink: 0 }} />
                    <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: 4, textTransform: "uppercase", color: "rgba(255,255,255,.8)" }}>
                      Free · No Obligation
                    </span>
                  </div>

                  <h2 style={{
                    fontFamily: "'Bebas Neue', sans-serif",
                    fontSize: "clamp(44px, 6vw, 80px)",
                    color: "#fff", lineHeight: 0.95,
                    letterSpacing: 4, margin: "0 0 20px",
                  }}>
                    Bring Your TV In.<br />
                    <span style={{ color: "rgba(255,255,255,.45)" }}>We'll Take It From Here.</span>
                  </h2>

                  <p style={{ margin: 0, fontSize: 16, lineHeight: 1.75, color: "rgba(255,255,255,.65)", maxWidth: 480, fontWeight: 400 }}>
                    Walk in to our Coimbatore service center or call ahead. Diagnosis is always free —
                    you only pay when you're happy with the quote.
                  </p>
                </div>

                <div style={{ display: "flex", flexDirection: "column", gap: 12, flexShrink: 0 }}>
                  <a href="tel:+91" style={{
                    display: "inline-flex", alignItems: "center", gap: 10,
                    padding: "14px 28px", borderRadius: 14,
                    background: "#fff", color: "#1d4ed8",
                    fontFamily: "'Barlow', sans-serif", fontSize: 12, fontWeight: 700,
                    letterSpacing: 3, textTransform: "uppercase",
                    boxShadow: "0 8px 24px rgba(0,0,0,0.2)",
                    textDecoration: "none", cursor: "pointer",
                    transition: "transform .3s, box-shadow .3s",
                    whiteSpace: "nowrap",
                  }}
                    onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-3px)"; e.currentTarget.style.boxShadow = "0 16px 36px rgba(0,0,0,0.3)"; }}
                    onMouseLeave={e => { e.currentTarget.style.transform = "none"; e.currentTarget.style.boxShadow = "0 8px 24px rgba(0,0,0,0.2)"; }}
                  >
                    <Phone size={15} />
                    Call Now
                  </a>
                  <button style={{
                    display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 8,
                    padding: "14px 28px", borderRadius: 14,
                    color: "rgba(255,255,255,.9)",
                    border: "1.5px solid rgba(255,255,255,.2)",
                    background: "rgba(255,255,255,.1)",
                    fontFamily: "'Barlow', sans-serif", fontSize: 12, fontWeight: 700,
                    letterSpacing: 3, textTransform: "uppercase", cursor: "pointer",
                    transition: "background .3s, transform .3s",
                    whiteSpace: "nowrap",
                  }}
                    onMouseEnter={e => { e.currentTarget.style.background = "rgba(255,255,255,.18)"; e.currentTarget.style.transform = "translateY(-3px)"; }}
                    onMouseLeave={e => { e.currentTarget.style.background = "rgba(255,255,255,.1)"; e.currentTarget.style.transform = "none"; }}
                  >
                    <MapPin size={15} />
                    Get Directions
                  </button>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}