import { useState, useEffect, useRef } from "react";
import {
  MonitorCheck, CircuitBoard, Package, HeadphonesIcon,
  ShieldCheck, Clock, Star, Users, Phone, MapPin,
  ArrowUpRight, Zap, Wrench, Sparkles, ChevronRight
} from "lucide-react";

/* ── DATA ── */
const services = [
  {
    id: 1, num: "01", icon: MonitorCheck,
    title: "Panel & Display", sub: "Repairs",
    desc: "Complete diagnosis and restoration of LCD and LED panels — from backlight failures to full screen replacements.",
    tags: ["LED Backlight", "Panel Swap", "Calibration"],
    accent: "#1a3a6b", soft: "#e8eef7", border: "#c2d0e8",
  },
  {
    id: 2, num: "02", icon: CircuitBoard,
    title: "Motherboard", sub: "& PCB",
    desc: "Component-level repair of power boards, T-CON boards, and main PCBs with precision soldering tools.",
    tags: ["PCB Repair", "Power Board", "Soldering"],
    accent: "#b84a00", soft: "#fdf0e8", border: "#f5c9a0",
  },
  {
    id: 3, num: "03", icon: Package,
    title: "Spare Parts", sub: "Supply",
    desc: "Genuine and compatible parts in stock for most major brands — no long waits, same-day fitment available.",
    tags: ["OEM Parts", "Remotes", "Stands"],
    accent: "#1a3a6b", soft: "#e8eef7", border: "#c2d0e8",
  },
  {
    id: 4, num: "04", icon: HeadphonesIcon,
    title: "Technical", sub: "Support",
    desc: "Phone and in-person consultation before any repair begins — transparent quotes, no hidden charges.",
    tags: ["Phone Help", "In-Home Visit", "Mail-In"],
    accent: "#b84a00", soft: "#fdf0e8", border: "#f5c9a0",
  },
];

const stats = [
  { value: "10",  suffix: "+",   label: "Years",   sub: "in Service",     icon: Star,         accent: "#1a3a6b", soft: "#e8eef7" },
  { value: "5000",suffix: "+",   label: "TVs",     sub: "Repaired",       icon: MonitorCheck, accent: "#b84a00", soft: "#fdf0e8" },
  { value: "3",   suffix: " hr", label: "Same",    sub: "Day Turnaround", icon: Clock,        accent: "#1a3a6b", soft: "#e8eef7" },
  { value: "0",   suffix: " ₹",  label: "Free",    sub: "Diagnosis",      icon: ShieldCheck,  accent: "#b84a00", soft: "#fdf0e8" },
];

const brands = ["Samsung","LG","Sony","Panasonic","Philips","Onida","Videocon","Mi","TCL","OnePlus"];

const whyUs = [
  { num: "01", icon: ShieldCheck, title: "Free Diagnosis",   body: "We assess your TV at zero cost before quoting any repair price. No surprises, ever.", accent: "#1a3a6b", soft: "#e8eef7", border: "#c2d0e8" },
  { num: "02", icon: Clock,       title: "Same-Day Repairs", body: "Most standard repairs are completed within the day. We respect your time completely.",  accent: "#b84a00", soft: "#fdf0e8", border: "#f5c9a0" },
  { num: "03", icon: Package,     title: "Genuine Parts",    body: "OEM and trusted compatible parts sourced from verified suppliers — stocked in-house.",  accent: "#1a3a6b", soft: "#e8eef7", border: "#c2d0e8" },
  { num: "04", icon: Users,       title: "Expert Team",      body: "Certified technicians trained on all major brands with 10+ years of hands-on experience.", accent: "#b84a00", soft: "#fdf0e8", border: "#f5c9a0" },
];

/* ── HOOKS ── */
function useInView(threshold = 0.1) {
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
  const [ref, inView] = useInView(0.08);
  const t = { bottom: "translateY(50px)", left: "translateX(-50px)", right: "translateX(50px)", top: "translateY(-30px)" };
  return (
    <div ref={ref} className={className} style={{
      opacity: inView ? 1 : 0,
      transform: inView ? "none" : t[from],
      transition: `opacity .85s cubic-bezier(.16,1,.3,1) ${delay}ms, transform .85s cubic-bezier(.16,1,.3,1) ${delay}ms`,
    }}>
      {children}
    </div>
  );
}

function Counter({ end, suffix = "", inView, delay = 0 }) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!inView) return;
    const n = parseInt(end);
    let cur = 0;
    const t = setTimeout(() => {
      const id = setInterval(() => {
        cur += Math.ceil(n / 55);
        if (cur >= n) { setVal(n); clearInterval(id); }
        else setVal(cur);
      }, 20);
    }, delay);
    return () => clearTimeout(t);
  }, [inView]);
  return <>{val}{suffix}</>;
}

/* ── COMPONENT ── */
export default function KJLight() {
  const [hovSvc, setHovSvc] = useState(null);
  const [hovWhy, setHovWhy] = useState(null);
  const [statsRef, statsInView] = useInView(0.2);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const fn = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  return (
    <div style={{ background: "#faf8f4", color: "#1a1a2e", }}>
      <style>{`
      
      /* ── Dot pattern ── */
        .dot-bg {
          background-image: radial-gradient(circle, #c8b89a 1px, transparent 1px);
          background-size: 28px 28px;
        }

        /* ── Line pattern ── */
        .line-bg {
          background-image: 
            linear-gradient(rgba(26,58,107,0.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(26,58,107,0.04) 1px, transparent 1px);
          background-size: 48px 48px;
        }

        /* ── Animations ── */
        @keyframes fadeUp    { from{opacity:0;transform:translateY(48px)} to{opacity:1;transform:none} }
        @keyframes fadeLeft  { from{opacity:0;transform:translateX(-30px)} to{opacity:1;transform:none} }
        @keyframes lineGrow  { from{transform:scaleX(0)} to{transform:scaleX(1)} }
        @keyframes floatY    { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-10px)} }
        @keyframes rotateSlow{ from{transform:rotate(0)} to{transform:rotate(360deg)} }
        @keyframes pulseRing { 0%{transform:scale(1);opacity:.7} 80%{transform:scale(2.5);opacity:0} 100%{opacity:0} }
        @keyframes ticker    { from{transform:translateX(0)} to{transform:translateX(-50%)} }
        @keyframes shimmer   { from{transform:translateX(-100%) skewX(-15deg)} to{transform:translateX(250%) skewX(-15deg)} }
        @keyframes inkDraw   { from{stroke-dashoffset:800} to{stroke-dashoffset:0} }
        @keyframes popIn     { from{opacity:0;transform:scale(.85)} to{opacity:1;transform:scale(1)} }
        @keyframes stampIn   { from{opacity:0;transform:scale(1.2) rotate(-5deg)} to{opacity:1;transform:scale(1) rotate(-3deg)} }

        .ha1 { animation: fadeUp .9s cubic-bezier(.16,1,.3,1) .05s both }
        .ha2 { animation: fadeUp .9s cubic-bezier(.16,1,.3,1) .2s  both }
        .ha3 { animation: fadeUp .9s cubic-bezier(.16,1,.3,1) .35s both }
        .ha4 { animation: fadeUp .9s cubic-bezier(.16,1,.3,1) .5s  both }
        .ha5 { animation: fadeUp .9s cubic-bezier(.16,1,.3,1) .65s both }

        .hero-line  { transform-origin:left; animation:lineGrow .9s cubic-bezier(.16,1,.3,1) .95s both }
        .float-el   { animation:floatY 5s ease-in-out infinite }
        .rotate-el  { animation:rotateSlow 30s linear infinite }
        .stamp-el   { animation:stampIn .8s cubic-bezier(.16,1,.3,1) 1.2s both }

        /* Pulse dot */
        .pdot { position:relative;display:inline-block;width:8px;height:8px;border-radius:50%;flex-shrink:0 }
        .pdot::after { content:'';position:absolute;inset:0;border-radius:50%;animation:pulseRing 2.2s ease-out infinite;background:inherit }

        /* Card hover shimmer */
        .card-shine { overflow:hidden;position:relative }
        .card-shine::after {
          content:'';position:absolute;inset:0;pointer-events:none;
          background:linear-gradient(105deg,transparent 40%,rgba(255,255,255,.7) 50%,transparent 60%);
          transform:translateX(-100%);transition:transform .6s ease
        }
        .card-shine:hover::after { transform:translateX(100%) }

        /* Btn */
        .btn-ink {
          position:relative;overflow:hidden;
          transition:transform .3s cubic-bezier(.16,1,.3,1),box-shadow .3s
        }
        .btn-ink::before {
          content:'';position:absolute;inset:0;
          background:inherit;filter:brightness(.88);
          transform:scaleX(0);transform-origin:left;
          transition:transform .35s cubic-bezier(.16,1,.3,1)
        }
        .btn-ink:hover::before { transform:scaleX(1) }
        .btn-ink:hover { transform:translateY(-3px) }

        /* Ticker */
        .ticker-wrap { overflow:hidden;position:relative }
        .ticker-track { animation:ticker 32s linear infinite;display:flex;white-space:nowrap }
        .ticker-track:hover { animation-play-state:paused }

        /* Ink SVG underline */
        .ink-line { stroke-dasharray:800;animation:inkDraw 1.2s cubic-bezier(.16,1,.3,1) 1s both }

        /* Nav scroll shrink */
        .nav-scrolled { box-shadow:0 2px 20px rgba(26,58,107,0.08) }

        /* Card lift */
        .card-lift { transition:all .4s cubic-bezier(.16,1,.3,1) }
        .card-lift:hover { transform:translateY(-6px) }

        /* Diagonal band */
        .diag-band {
          position:absolute;inset:0;pointer-events:none;
          background:repeating-linear-gradient(
            -55deg,transparent,transparent 24px,
            rgba(26,58,107,0.025) 24px,rgba(26,58,107,0.025) 25px
          )
        }

        /* Tag */
        .tag-hover { transition:all .25s }
        .tag-hover:hover { transform:scale(1.05) }

        /* Section number */
        .sec-num {
          font-size:clamp(120px,18vw,220px);
          position:absolute;right:-10px;top:-20px;
          line-height:1;pointer-events:none;select:none;
          color:rgba(26,58,107,0.04);font-family:Georgia,serif;font-weight:900
        }
      `}</style>


      {/* ═══════════ HERO ═══════════ */}
      <section className="relative overflow-hidden" style={{ minHeight: "100vh", display: "flex", flexDirection: "column", justifyContent: "center" }}>
        <div className="dot-bg absolute inset-0 opacity-40" />
        <div className="diag-band" />

        {/* Warm gradient blob */}
        <div className="pointer-events-none absolute top-0 right-0 w-[800px] h-[700px] rounded-full"
          style={{ background: "radial-gradient(ellipse at top right, rgba(255,200,130,0.25) 0%, transparent 60%)", filter: "blur(60px)" }} />
        <div className="pointer-events-none absolute bottom-0 left-0 w-[600px] h-[500px] rounded-full"
          style={{ background: "radial-gradient(ellipse at bottom left, rgba(26,58,107,0.07) 0%, transparent 60%)", filter: "blur(80px)" }} />

        {/* Floating shapes */}
        <div className="float-el pointer-events-none absolute top-24 right-12 hidden lg:flex items-center justify-center opacity-30">
          <div className="w-28 h-28 rounded-3xl border-2" style={{ borderColor: "#1a3a6b", transform: "rotate(12deg)" }} />
        </div>
        <div className="float-el pointer-events-none absolute bottom-32 right-44 hidden lg:block opacity-20" style={{ animationDelay: "2.5s" }}>
          <div className="w-16 h-16 rounded-full border-2" style={{ borderColor: "#b84a00", borderStyle: "dashed" }} />
        </div>
        <div className="rotate-el pointer-events-none absolute top-1/3 right-24 hidden xl:flex items-center justify-center opacity-10">
          <div className="w-56 h-56 rounded-full border" style={{ borderColor: "#1a3a6b", borderStyle: "dashed" }} />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto w-full px-6 sm:px-10 lg:px-16 py-20 grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-16 items-center">

          {/* Left copy */}
          <div>
            <div className="ha1 inline-flex items-center gap-2.5 px-4 py-2 rounded-full mb-8 border font-bold mb-2"
              style={{ background: "rgba(26,58,107,0.06)", borderColor: "rgba(26,58,107,0.15)", color: "#1a3a6b" }}>
              <span className="pdot" style={{ background: "#1a3a6b" }} />
              <span className="text-[10px] tracking-[5px] uppercase ">
                Coimbatore's #1 TV Repair
              </span>
            </div>

            <div className="ha2 mb-4 ">
              <h1 style={{ fontSize: "clamp(62px,10vw,118px)", lineHeight: 0.88, letterSpacing: "-1px", fontWeight: 900 }}>
                <span style={{ display: "block", color: "#1a1a2e" }}>YOUR TV,</span>
                <span style={{ display: "block", color: "#1a3a6b", position: "relative" }}>
                  FIXED.
                  <svg className="hero-line" viewBox="0 0 300 12" style={{ position: "absolute", bottom: -8, left: 0, width: "100%", height: 12, overflow: "visible" }}>
                    <path d="M0,6 Q75,2 150,6 Q225,10 300,6" fill="none" stroke="#b84a00" strokeWidth="3" strokeLinecap="round" className="ink-line" />
                  </svg>
                </span>
              </h1>
            </div>

            <div className="ha3 flex items-center gap-3 mt-8 mb-4">
              <div style={{ width: 40, height: 2, background: "#b84a00", borderRadius: 9999 }} />
              <span className="text-[11px] font-bold tracking-[4px] uppercase" style={{ color: "#b84a00", }}>
                Trusted Since 2014
              </span>
            </div>

            <div className="ha4">
              <p className="mb-8 max-w-[460px]" style={{ fontSize: 16, lineHeight: 1.85, color: "rgba(26,26,46,0.6)", }}>
                Specialists in LCD &amp; LED television repair, motherboard diagnostics,
                and genuine spare parts — trusted by{" "}
                <strong style={{ color: "#1a1a2e" }}>thousands across Coimbatore.</strong>
              </p>
            </div>

            <div className="ha5 flex flex-wrap items-center gap-4">
              <button
                className="btn-ink flex items-center gap-2.5 px-7 py-4 rounded-2xl text-[11px] font-black tracking-[3px] uppercase"
                style={{ background: "#1a3a6b", color: "#faf8f4",  boxShadow: "0 8px 30px rgba(26,58,107,0.3)" }}>
                <Phone size={13} />
                Call Now
              </button>
              <button
                className="btn-ink flex items-center gap-2.5 px-7 py-4 rounded-2xl text-[11px] font-black tracking-[3px] uppercase"
                style={{ background: "transparent", color: "#b84a00", border: "2px solid #b84a00", }}>
                Our Services
                <ArrowUpRight size={13} />
              </button>
            </div>
          </div>

          {/* Right — stat cards */}
          <div ref={statsRef} className="grid grid-cols-2 gap-4">
            {stats.map((s, i) => {
              const Icon = s.icon;
              return (
                <Reveal key={s.label} delay={i * 90} from="bottom">
                  <div
                    className="card-shine card-lift relative rounded-2xl p-6 border cursor-default"
                    style={{
                      background: "#fff",
                      borderColor: "rgba(26,58,107,0.1)",
                      boxShadow: "0 2px 16px rgba(26,58,107,0.06)",
                    }}
                    onMouseEnter={e => {
                      e.currentTarget.style.borderColor = s.accent + "50";
                      e.currentTarget.style.boxShadow = `0 16px 40px ${s.accent}18`;
                    }}
                    onMouseLeave={e => {
                      e.currentTarget.style.borderColor = "rgba(26,58,107,0.1)";
                      e.currentTarget.style.boxShadow = "0 2px 16px rgba(26,58,107,0.06)";
                    }}
                  >
                    {/* Left accent bar */}
                    <div className="absolute left-0 top-4 bottom-4 w-1 rounded-full"
                      style={{ background: s.accent }} />

                    <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-4"
                      style={{ background: s.soft }}>
                      <Icon size={18} color={s.accent} />
                    </div>
                    <div className="font-black leading-none mb-1"
                      style={{ fontSize: "clamp(34px,5vw,48px)", color: s.accent, }}>
                      <Counter end={s.value} suffix={s.suffix} inView={statsInView} delay={i * 110} />
                    </div>
                    <div className="font-bold text-[11px] tracking-[2px] uppercase" style={{ color: "#1a1a2e", }}>{s.label}</div>
                    <div className="text-[10px] tracking-[1px] uppercase mt-0.5" style={{ color: "rgba(26,26,46,0.35)", }}>{s.sub}</div>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>

      
      </section>

      {/* ═══════════ BRAND TICKER ═══════════ */}
      <div className="ticker-wrap py-5 border-y" style={{ background: "#1a3a6b", borderColor: "#1a3a6b" }}>
        <div className="ticker-track">
          {[...Array(3)].fill(brands).flat().map((b, i) => (
            <span key={i} className="inline-flex items-center gap-5 px-5">
              <span className="text-[11px] font-bold tracking-[5px] uppercase" style={{ color: "rgba(250,248,244,0.45)", }}>{b}</span>
              <span style={{ width: 4, height: 4, borderRadius: "50%", background: "#b84a00", display: "inline-block", flexShrink: 0 }} />
            </span>
          ))}
        </div>
      </div>

      {/* ═══════════ ABOUT ═══════════ */}
      <section className="relative overflow-hidden px-6 sm:px-10 lg:px-16 py-24 sm:py-32" style={{ background: "#fff" }}>
        <div className="line-bg absolute inset-0 opacity-60" />
        <div className="pointer-events-none absolute top-0 right-0 w-[500px] h-[500px] rounded-full"
          style={{ background: "radial-gradient(circle at top right, rgba(255,200,130,0.15), transparent 60%)", filter: "blur(60px)" }} />

        <div className="relative max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <Reveal from="left">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full mb-6 border text-[10px] font-bold tracking-[4px] uppercase"
                style={{ color: "#b84a00", borderColor: "rgba(184,74,0,0.2)", background: "rgba(184,74,0,0.05)", }}>
                About Us
              </div>
              <h2 className="font-black leading-[1.0] mb-8"
                style={{ fontSize: "clamp(38px,6vw,66px)", color: "#1a1a2e",  letterSpacing: "-0.5px" }}>
                Who We Are
                <br />
                <span style={{ color: "#1a3a6b" }}>&amp; What We</span>
                <br />
                <span style={{ color: "#b84a00" }}>Stand For.</span>
              </h2>
              {/* Decorative stamp */}
              <div className="stamp-el inline-flex items-center justify-center w-24 h-24 rounded-full border-4"
                style={{ borderColor: "#b84a00", borderStyle: "dashed", transform: "rotate(-3deg)", color: "#b84a00" }}>
                <div className="text-center">
                  <div className="font-black text-[18px]" style={{ }}>10+</div>
                  <div className="text-[8px] font-bold tracking-[2px] uppercase" style={{ }}>Years</div>
                </div>
              </div>
            </div>
          </Reveal>

          <Reveal from="right" delay={120}>
            <div className="flex flex-col gap-5">
              <div className="p-6 rounded-2xl border" style={{ background: "#faf8f4", borderColor: "rgba(26,58,107,0.1)" }}>
                <div className="flex items-start gap-4">
                  <div className="w-9 h-9 rounded-xl flex-shrink-0 flex items-center justify-center mt-0.5"
                    style={{ background: "rgba(26,58,107,0.1)" }}>
                    <Wrench size={15} color="#1a3a6b" />
                  </div>
                  <p style={{ fontSize: 15, lineHeight: 1.85, color: "rgba(26,26,46,0.65)", }}>
                    KJ Electronics has been Coimbatore's go-to TV repair center for over a decade. Our technicians are trained across all major brands and specialize in both LCD and LED technology — from panel-level repairs to deep PCB diagnostics.
                  </p>
                </div>
              </div>
              <div className="p-6 rounded-2xl border" style={{ background: "#fdf8f4", borderColor: "rgba(184,74,0,0.12)" }}>
                <div className="flex items-start gap-4">
                  <div className="w-9 h-9 rounded-xl flex-shrink-0 flex items-center justify-center mt-0.5"
                    style={{ background: "rgba(184,74,0,0.1)" }}>
                    <Sparkles size={15} color="#b84a00" />
                  </div>
                  <p style={{ fontSize: 15, lineHeight: 1.85, color: "rgba(26,26,46,0.65)", }}>
                    Every repair starts with a <strong style={{ color: "#1a3a6b" }}>free diagnosis</strong> and a clear quote before work begins. We stock genuine parts so you're never waiting longer than necessary.
                  </p>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ═══════════ SERVICES ═══════════ */}
      <section id="services" className="relative overflow-hidden px-6 sm:px-10 lg:px-16 py-24 sm:py-32"
        style={{ background: "#faf8f4" }}>
        <div className="dot-bg absolute inset-0 opacity-25" />
        <div className="pointer-events-none absolute bottom-0 left-0 w-[500px] h-[500px] rounded-full"
          style={{ background: "radial-gradient(circle at bottom left, rgba(26,58,107,0.06), transparent 60%)", filter: "blur(60px)" }} />

        <div className="relative max-w-7xl mx-auto">
          <Reveal>
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-16">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full mb-5 border text-[10px] font-bold tracking-[4px] uppercase"
                  style={{ color: "#1a3a6b", borderColor: "rgba(26,58,107,0.2)", background: "rgba(26,58,107,0.05)", }}>
                  <Zap size={10} color="#1a3a6b" />
                  Services
                </div>
                <h2 className="font-black leading-none m-0"
                  style={{ fontSize: "clamp(48px,8vw,92px)", color: "#1a1a2e",  letterSpacing: "-1px" }}>
                  WHAT WE
                  <br />
                  <span style={{ color: "#1a3a6b" }}>DO BEST</span>
                </h2>
              </div>
              <p className="text-[13px] max-w-[260px] leading-relaxed"
                style={{ color: "rgba(26,26,46,0.45)", }}>
                Four core specialisations — precision and speed, every single time.
              </p>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {services.map((s, idx) => {
              const Icon = s.icon;
              const isHov = hovSvc === s.id;
              return (
                <Reveal key={s.id} delay={idx * 80}>
                  <div
                    className="card-shine card-lift relative rounded-3xl p-8 border cursor-default"
                    style={{
                      background: isHov ? s.soft : "#fff",
                      borderColor: isHov ? s.border : "rgba(26,58,107,0.08)",
                      boxShadow: isHov ? `0 24px 60px ${s.accent}14` : "0 2px 12px rgba(26,58,107,0.05)",
                    }}
                    onMouseEnter={() => setHovSvc(s.id)}
                    onMouseLeave={() => setHovSvc(null)}
                  >
                    {/* Top accent bar */}
                    <div className="absolute top-0 left-8 right-8 h-0.5 rounded-full transition-all duration-500"
                      style={{ background: `linear-gradient(90deg,transparent,${s.accent}${isHov ? "90" : "20"},transparent)` }} />

                    <div className="flex items-start justify-between mb-6">
                      <div className="w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-400"
                        style={{
                          background: isHov ? s.soft : "rgba(26,58,107,0.05)",
                          border: `1px solid ${isHov ? s.border : "rgba(26,58,107,0.08)"}`,
                          transform: isHov ? "rotate(-8deg) scale(1.08)" : "none",
                        }}>
                        <Icon size={22} color={isHov ? s.accent : "rgba(26,26,46,0.3)"} />
                      </div>
                      <span className="font-black text-[11px] tracking-[3px] transition-colors duration-300"
                        style={{ color: isHov ? s.accent : "rgba(26,26,46,0.12)", }}>
                        {s.num}
                      </span>
                    </div>

                    <h3 className="font-black leading-none mb-1 transition-colors duration-300"
                      style={{ fontSize: "clamp(24px,3vw,36px)", color: "#1a1a2e", }}>
                      {s.title}
                    </h3>
                    <h3 className="font-black leading-none mb-5 transition-all duration-300"
                      style={{ fontSize: "clamp(24px,3vw,36px)", color: s.accent,  opacity: isHov ? 1 : 0.25 }}>
                      {s.sub}
                    </h3>

                    <p className="mb-6 transition-colors duration-300"
                      style={{ fontSize: 14, lineHeight: 1.8, color: isHov ? "rgba(26,26,46,0.65)" : "rgba(26,26,46,0.35)", }}>
                      {s.desc}
                    </p>

                    <div className="flex flex-wrap gap-2">
                      {s.tags.map(tag => (
                        <span key={tag} className="tag-hover text-[9px] font-bold tracking-[2px] uppercase px-3 py-1.5 rounded-full transition-all duration-250"
                          style={{
                            background: isHov ? s.soft : "rgba(26,58,107,0.04)",
                            color: isHov ? s.accent : "rgba(26,26,46,0.3)",
                            border: `1px solid ${isHov ? s.border : "rgba(26,58,107,0.08)"}`,
                            
                          }}>
                          {tag}
                        </span>
                      ))}
                    </div>

                    <div className="absolute bottom-7 right-7 transition-all duration-400"
                      style={{
                        opacity: isHov ? 1 : 0,
                        transform: isHov ? "scale(1) rotate(0)" : "scale(0.7) rotate(-45deg)",
                      }}>
                      <div className="w-10 h-10 rounded-full flex items-center justify-center"
                        style={{ background: s.accent, boxShadow: `0 8px 20px ${s.accent}50` }}>
                        <ArrowUpRight size={16} color="#fff" />
                      </div>
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ═══════════ WHY US ═══════════ */}
      <section className="relative overflow-hidden px-6 sm:px-10 lg:px-16 py-24 sm:py-32" style={{ background: "#fff" }}>
        <div className="line-bg absolute inset-0 opacity-50" />
        <div className="pointer-events-none absolute top-0 right-0 w-[600px] h-[600px] rounded-full"
          style={{ background: "radial-gradient(ellipse at top right,rgba(184,74,0,0.06),transparent 60%)", filter: "blur(60px)" }} />

        <div className="relative max-w-7xl mx-auto">
          <Reveal>
            <div className="text-center mb-16 flex flex-col items-center gap-4">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border text-[10px] font-bold tracking-[4px] uppercase"
                style={{ color: "#b84a00", borderColor: "rgba(184,74,0,0.2)", background: "rgba(184,74,0,0.05)", }}>
                <span className="pdot" style={{ background: "#b84a00" }} />
                Why Choose Us
              </div>
              <h2 className="font-black m-0 leading-none"
                style={{ fontSize: "clamp(40px,7vw,86px)", color: "#1a1a2e",  letterSpacing: "-1px" }}>
                The KJ Electronics <span style={{ color: "#1a3a6b" }}>Difference</span>
              </h2>
              <p style={{ color: "rgba(26,26,46,0.45)", fontSize: 15, maxWidth: 400, lineHeight: 1.7, }}>
                Four pillars that set us apart — and keep customers coming back.
              </p>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {whyUs.map((item, idx) => {
              const Icon = item.icon;
              const isHov = hovWhy === item.num;
              return (
                <Reveal key={item.num} delay={idx * 80}>
                  <div
                    className="card-shine card-lift relative rounded-3xl p-7 border cursor-default h-full"
                    style={{
                      background: isHov ? item.soft : "#faf8f4",
                      borderColor: isHov ? item.border : "rgba(26,58,107,0.07)",
                      boxShadow: isHov ? `0 24px 60px ${item.accent}12` : "0 2px 10px rgba(26,58,107,0.04)",
                    }}
                    onMouseEnter={() => setHovWhy(item.num)}
                    onMouseLeave={() => setHovWhy(null)}
                  >
                    {/* Top accent */}
                    <div className="absolute top-0 left-0 right-0 h-[3px] rounded-t-3xl transition-all duration-500"
                      style={{
                        background: `linear-gradient(90deg,${item.accent},${item.accent}77)`,
                        transform: isHov ? "scaleX(1)" : "scaleX(0)",
                        transformOrigin: "left",
                      }} />

                    {/* Ghost number */}
                    <div className="pointer-events-none select-none absolute bottom-3 right-4 font-black leading-none transition-colors duration-300"
                      style={{ fontSize: 80, color: isHov ? `${item.accent}10` : "rgba(26,26,46,0.03)", }}>
                      {item.num}
                    </div>

                    <div className="w-11 h-11 rounded-xl flex items-center justify-center mb-5 transition-all duration-400"
                      style={{
                        background: isHov ? item.soft : "#fff",
                        border: `1px solid ${isHov ? item.border : "rgba(26,58,107,0.08)"}`,
                        transform: isHov ? "rotate(-6deg) scale(1.1)" : "none",
                        boxShadow: isHov ? `0 4px 16px ${item.accent}20` : "none",
                      }}>
                      <Icon size={20} color={isHov ? item.accent : "rgba(26,26,46,0.3)"} />
                    </div>

                    <div className="rounded-full mb-4 transition-all duration-400"
                      style={{ height: 3, background: isHov ? item.accent : "rgba(26,58,107,0.1)", width: isHov ? 36 : 28 }} />

                    <h4 className="font-black mb-3 leading-tight transition-colors duration-300"
                      style={{ fontSize: "clamp(18px,2vw,22px)", color: isHov ? item.accent : "#1a1a2e", }}>
                      {item.title}
                    </h4>
                    <p className="text-[13.5px] leading-relaxed transition-colors duration-300"
                      style={{ color: isHov ? "rgba(26,26,46,0.65)" : "rgba(26,26,46,0.4)", }}>
                      {item.body}
                    </p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ═══════════ CTA ═══════════ */}
      <section className="relative overflow-hidden px-6 sm:px-10 lg:px-16 py-24 sm:py-32"
        style={{ background: "#1a3a6b" }}>
        <div className="dot-bg absolute inset-0 opacity-15" />
        <div className="pointer-events-none absolute top-0 right-0 w-[600px] h-[600px] rounded-full"
          style={{ background: "radial-gradient(circle at top right,rgba(255,200,130,0.12),transparent 60%)", filter: "blur(60px)" }} />
        <div className="pointer-events-none absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full"
          style={{ background: "radial-gradient(circle at bottom left,rgba(184,74,0,0.15),transparent 60%)", filter: "blur(60px)" }} />

        {/* Ghost KJ */}
        <div className="pointer-events-none select-none absolute -bottom-6 -right-4 font-black leading-none"
          style={{ fontSize: "clamp(100px,18vw,200px)", color: "rgba(250,248,244,0.04)", }}>KJ</div>

        <div className="relative max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-10 items-center">
          <Reveal from="left">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full mb-6 border text-[10px] font-bold tracking-[4px] uppercase"
                style={{ color: "rgba(250,248,244,0.6)", borderColor: "rgba(250,248,244,0.15)", background: "rgba(250,248,244,0.06)", }}>
                Free · No Obligation
              </div>

              <h2 className="font-black leading-[0.92] mb-6"
                style={{ fontSize: "clamp(38px,7vw,82px)",  letterSpacing: "-1px" }}>
                <span style={{ color: "#faf8f4" }}>BRING YOUR<br />TV IN.</span>
                <br />
                <span style={{ color: "rgba(250,248,244,0.3)" }}>WE'LL HANDLE IT.</span>
              </h2>

              <p style={{ fontSize: 15, lineHeight: 1.85, maxWidth: 460, color: "rgba(250,248,244,0.55)", }}>
                Walk in to our Coimbatore service center or call ahead. Diagnosis is always free —
                you only pay when you're happy with the quote.
              </p>
            </div>
          </Reveal>

          <Reveal from="right" delay={150}>
            <div className="flex flex-row lg:flex-col gap-3 flex-shrink-0 flex-wrap">
              <a href="tel:+91"
                className="btn-ink inline-flex items-center gap-2.5 px-7 py-4 rounded-2xl text-[11px] font-black tracking-[3px] uppercase no-underline whitespace-nowrap"
                style={{
                  background: "#faf8f4",
                  color: "#1a3a6b",
                  
                  boxShadow: "0 8px 28px rgba(0,0,0,0.2)",
                }}>
                <Phone size={14} />
                Call Now
              </a>
              <button
                className="btn-ink inline-flex items-center justify-center gap-2.5 px-7 py-4 rounded-2xl text-[11px] font-black tracking-[3px] uppercase whitespace-nowrap"
                style={{
                  border: "2px solid rgba(250,248,244,0.25)",
                  background: "rgba(250,248,244,0.08)",
                  color: "#faf8f4",
                  
                }}>
                <MapPin size={14} color="#f5a660" />
                Get Directions
              </button>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}