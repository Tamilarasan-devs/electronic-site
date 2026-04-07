import { useState, useEffect, useRef } from "react";
import {
  MonitorCheck, CircuitBoard, Package, HeadphonesIcon,
  ShieldCheck, Clock, Star, Users, Phone, MapPin,
  ArrowUpRight, Zap, Wrench, Sparkles, ChevronRight,
  TrendingUp, Award, CheckCircle, MessageSquare, Settings, Heart
} from "lucide-react";
import { useNavigate } from "react-router-dom";
/* ── DATA ── */
const services = [
  {
    id: 1, num: "01", icon: MonitorCheck,
    title: "Panel & Display", sub: "Repairs",
    desc: "Complete diagnosis and restoration of  LED panels — from backlight failures to full screen replacements.",
    tags: ["LED Backlight", "Panel Swap", "Calibration"],
    accent: "#890b44", soft: "#f9eef4", border: "#e8b0cc",
  },
  {
    id: 2, num: "02", icon: CircuitBoard,
    title: "Motherboard", sub: "& PCB",
    desc: "Component-level repair of power boards, T-CON boards, and main PCBs with precision soldering tools.",
    tags: ["PCB Repair", "Power Board", "Soldering"],
    accent: "#111111", soft: "#f0f0f0", border: "#cccccc",
  },
  {
    id: 3, num: "03", icon: Package,
    title: "Spare Parts", sub: "Supply",
    desc: "Genuine and compatible parts in stock for most major brands — no long waits, same-day fitment available.",
    tags: ["OEM Parts", "Remotes", "Stands"],
    accent: "#890b44", soft: "#f9eef4", border: "#e8b0cc",
  },
  {
    id: 4, num: "04", icon: HeadphonesIcon,
    title: "Technical", sub: "Support",
    desc: "Phone and in-person consultation before any repair begins — transparent quotes, no hidden charges.",
    tags: ["Phone Help", "In-Home Visit", "Mail-In"],
    accent: "#111111", soft: "#f0f0f0", border: "#cccccc",
  },
];

const stats = [
  { value: "10",  suffix: "+",   label: "Years",   sub: "in Service",     icon: Star,         accent: "#890b44", soft: "#f9eef4" },
  { value: "5000",suffix: "+",   label: "TVs",     sub: "Repaired",       icon: MonitorCheck, accent: "#111111", soft: "#f0f0f0" },
  { value: "3",   suffix: " hr", label: "Same",    sub: "Day Turnaround", icon: Clock,        accent: "#890b44", soft: "#f9eef4" },
  { value: "0",   suffix: " ₹",  label: "Free",    sub: "Diagnosis",      icon: ShieldCheck,  accent: "#111111", soft: "#f0f0f0" },
];

const brands = ["Samsung","LG","Sony","Panasonic","Philips","Onida","Videocon","Mi","TCL","OnePlus"];

const whyUs = [
  { num: "01", icon: ShieldCheck, title: "Free Diagnosis",   body: "We assess your TV at zero cost before quoting any repair price. No surprises, ever.", accent: "#890b44", soft: "#f9eef4", border: "#e8b0cc" },
  { num: "02", icon: Clock,       title: "Same-Day Repairs", body: "Most standard repairs are completed within the day. We respect your time completely.",  accent: "#111111", soft: "#f0f0f0", border: "#cccccc" },
  { num: "03", icon: Package,     title: "Genuine Parts",    body: "OEM and trusted compatible parts sourced from verified suppliers — stocked in-house.",  accent: "#890b44", soft: "#f9eef4", border: "#e8b0cc" },
  { num: "04", icon: Users,       title: "Expert Team",      body: "Certified technicians trained on all major brands with 10+ years of hands-on experience.", accent: "#111111", soft: "#f0f0f0", border: "#cccccc" },
];

const approachSteps = [
  {
    num: "01", icon: CheckCircle,
    title: "Accurate Problem Identification",
    body: "We begin by carefully analyzing the issue to identify the exact cause, ensuring that the repair is done correctly without unnecessary work.",
    accent: "#890b44", soft: "#f9eef4", border: "#e8b0cc",
  },
  {
    num: "02", icon: MessageSquare,
    title: "Clear Communication",
    body: "We keep our customers informed at every stage by explaining the problem and the required solution in a simple and understandable manner.",
    accent: "#111111", soft: "#f0f0f0", border: "#cccccc",
  },
  {
    num: "03", icon: Settings,
    title: "Efficient Execution",
    body: "Our technicians carry out repairs using proper methods and tools, ensuring the work is completed efficiently and with attention to detail.",
    accent: "#890b44", soft: "#f9eef4", border: "#e8b0cc",
  },
  {
    num: "04", icon: ShieldCheck,
    title: "Quality Check & Reliability",
    body: "Before completing the service, we perform thorough testing to ensure everything is working perfectly and meets our quality standards.",
    accent: "#111111", soft: "#f0f0f0", border: "#cccccc",
  },
  {
    num: "05", icon: Heart,
    title: "Customer-Focused Service",
    body: "Our goal is to provide a smooth and hassle-free experience, making sure every customer feels confident and satisfied with our service.",
    accent: "#890b44", soft: "#f9eef4", border: "#e8b0cc",
  },
];

const trustPillars = [
  {
    num: "01", icon: ShieldCheck,
    title: "Built on Reliability",
    body: "Our customers rely on us for honest service and dependable solutions, knowing that their devices are handled with care and expertise.",
    accent: "#890b44", soft: "#f9eef4", border: "#e8b0cc",
  },
  {
    num: "02", icon: Star,
    title: "Consistent Service Quality",
    body: "Maintaining high standards in every service has helped us grow through customer satisfaction and positive word-of-mouth.",
    accent: "#111111", soft: "#f0f0f0", border: "#cccccc",
  },
  {
    num: "03", icon: Users,
    title: "Long-Term Customer Relationships",
    body: "Many of our customers continue to choose us for their service needs, which reflects the trust and satisfaction we have built over time.",
    accent: "#890b44", soft: "#f9eef4", border: "#e8b0cc",
  },
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

  const navigate = useNavigate();
  return (
    <div style={{ background: "#fff", color: "#111111" }}>
      <style>{`
 

        .dot-bg {
          background-image: radial-gradient(circle, #890b4420 1.2px, transparent 1.2px);
          background-size: 26px 26px;
        }
        .line-bg {
          background-image:
            linear-gradient(rgba(137,11,68,0.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(137,11,68,0.04) 1px, transparent 1px);
          background-size: 48px 48px;
        }
        .checker-bg {
          background-image:
            linear-gradient(45deg, rgba(137,11,68,0.04) 25%, transparent 25%),
            linear-gradient(-45deg, rgba(137,11,68,0.04) 25%, transparent 25%),
            linear-gradient(45deg, transparent 75%, rgba(137,11,68,0.04) 75%),
            linear-gradient(-45deg, transparent 75%, rgba(137,11,68,0.04) 75%);
          background-size: 20px 20px;
          background-position: 0 0, 0 10px, 10px -10px, -10px 0px;
        }

        @keyframes fadeUp    { from{opacity:0;transform:translateY(48px)} to{opacity:1;transform:none} }
        @keyframes fadeLeft  { from{opacity:0;transform:translateX(-30px)} to{opacity:1;transform:none} }
        @keyframes lineGrow  { from{transform:scaleX(0)} to{transform:scaleX(1)} }
        @keyframes floatY    { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-10px)} }
        @keyframes rotateSlow{ from{transform:rotate(0)} to{transform:rotate(360deg)} }
        @keyframes pulseRing { 0%{transform:scale(1);opacity:.7} 80%{transform:scale(2.5);opacity:0} 100%{opacity:0} }
        @keyframes ticker    { from{transform:translateX(0)} to{transform:translateX(-50%)} }
        @keyframes shimmer   { from{transform:translateX(-100%) skewX(-15deg)} to{transform:translateX(250%) skewX(-15deg)} }
        @keyframes inkDraw   { from{stroke-dashoffset:800} to{stroke-dashoffset:0} }
        @keyframes stampIn   { from{opacity:0;transform:scale(1.2) rotate(-5deg)} to{opacity:1;transform:scale(1) rotate(-3deg)} }
        @keyframes gradMove  { 0%{background-position:0% 50%} 50%{background-position:100% 50%} 100%{background-position:0% 50%} }

        .ha1 { animation: fadeUp .9s cubic-bezier(.16,1,.3,1) .05s both }
        .ha2 { animation: fadeUp .9s cubic-bezier(.16,1,.3,1) .2s  both }
        .ha3 { animation: fadeUp .9s cubic-bezier(.16,1,.3,1) .35s both }
        .ha4 { animation: fadeUp .9s cubic-bezier(.16,1,.3,1) .5s  both }
        .ha5 { animation: fadeUp .9s cubic-bezier(.16,1,.3,1) .65s both }

        .hero-line  { transform-origin:left; animation:lineGrow .9s cubic-bezier(.16,1,.3,1) .95s both }
        .float-el   { animation:floatY 5s ease-in-out infinite }
        .rotate-el  { animation:rotateSlow 30s linear infinite }
        .stamp-el   { animation:stampIn .8s cubic-bezier(.16,1,.3,1) 1.2s both }

        .pdot { position:relative;display:inline-block;width:8px;height:8px;border-radius:50%;flex-shrink:0 }
        .pdot::after { content:'';position:absolute;inset:0;border-radius:50%;animation:pulseRing 2.2s ease-out infinite;background:inherit }

        .card-shine { overflow:hidden;position:relative }
        .card-shine::after {
          content:'';position:absolute;inset:0;pointer-events:none;
          background:linear-gradient(105deg,transparent 40%,rgba(255,255,255,.6) 50%,transparent 60%);
          transform:translateX(-100%);transition:transform .6s ease
        }
        .card-shine:hover::after { transform:translateX(100%) }

        .btn-ink {
          position:relative;overflow:hidden;
          transition:transform .3s cubic-bezier(.16,1,.3,1),box-shadow .3s
        }
        .btn-ink::before {
          content:'';position:absolute;inset:0;
          background:inherit;filter:brightness(.85);
          transform:scaleX(0);transform-origin:left;
          transition:transform .35s cubic-bezier(.16,1,.3,1)
        }
        .btn-ink:hover::before { transform:scaleX(1) }
        .btn-ink:hover { transform:translateY(-3px) }

        .ticker-wrap { overflow:hidden;position:relative }
        .ticker-track { animation:ticker 32s linear infinite;display:flex;white-space:nowrap }
        .ticker-track:hover { animation-play-state:paused }

        .ink-line { stroke-dasharray:800;animation:inkDraw 1.2s cubic-bezier(.16,1,.3,1) 1s both }

        .card-lift { transition:all .4s cubic-bezier(.16,1,.3,1) }
        .card-lift:hover { transform:translateY(-6px) }

        .tag-hover { transition:all .25s }
        .tag-hover:hover { transform:scale(1.05) }

        .sec-num {
          font-size:clamp(120px,18vw,220px);
          position:absolute;right:-10px;top:-20px;
          line-height:1;pointer-events:none;user-select:none;
          color:rgba(137,11,68,0.04);font-family:'Playfair Display',serif;font-weight:900
        }

        .crimson-stripe {
          background: repeating-linear-gradient(
            -45deg,
            transparent,
            transparent 10px,
            rgba(137,11,68,0.04) 10px,
            rgba(137,11,68,0.04) 11px
          );
        }

        .hero-number-bg {
          font-size: clamp(200px, 35vw, 420px);
          font-weight: 900;
          color: rgba(137,11,68,0.04);
          position: absolute;
          right: -20px;
          top: 50%;
          transform: translateY(-50%);
          line-height: 1;
          pointer-events: none;
          user-select: none;
          letter-spacing: -20px;
        }
      `}</style>

      {/* ═══════════ HERO ═══════════ */}
      <section className="relative overflow-hidden" style={{ minHeight: "80vh", display: "flex", flexDirection: "column", justifyContent: "center", background: "#fff" }}>
        <div className="dot-bg absolute inset-0 opacity-60" />

        {/* Crimson blob top right */}
        <div className="pointer-events-none absolute top-0 right-0 w-[700px] h-[600px]"
          style={{ background: "radial-gradient(ellipse at top right, rgba(137,11,68,0.08) 0%, transparent 65%)", filter: "blur(40px)" }} />
        <div className="pointer-events-none absolute bottom-0 left-0 w-[500px] h-[400px]"
          style={{ background: "radial-gradient(ellipse at bottom left, rgba(137,11,68,0.05) 0%, transparent 60%)", filter: "blur(60px)" }} />

        {/* Ghost large number */}
        <div className="hero-number-bg hidden lg:block">TV</div>

        {/* Floating shapes */}
        <div className="float-el pointer-events-none absolute top-24 right-16 hidden lg:flex items-center justify-center opacity-20">
          <div className="w-28 h-28 rounded-3xl border-2" style={{ borderColor: "#890b44", transform: "rotate(12deg)" }} />
        </div>
        <div className="float-el pointer-events-none absolute bottom-32 right-48 hidden lg:block opacity-15" style={{ animationDelay: "2.5s" }}>
          <div className="w-14 h-14 rounded-full border-2" style={{ borderColor: "#890b44", borderStyle: "dashed" }} />
        </div>
        <div className="rotate-el pointer-events-none absolute top-1/3 right-28 hidden xl:flex items-center justify-center opacity-10">
          <div className="w-52 h-52 rounded-full border" style={{ borderColor: "#890b44", borderStyle: "dashed" }} />
        </div>

        {/* Top border accent */}
        <div className="absolute top-0 left-0 right-0 h-1" style={{ background: "linear-gradient(90deg, #890b44, #111, #890b44)" }} />

        <div className="relative z-10 max-w-7xl mx-auto w-full px-6 sm:px-10 lg:px-16 py-20 grid grid-cols-1 lg:grid-cols-[1.15fr_0.85fr] gap-16 items-center">

          {/* Left copy */}
          <div>
            <div className="ha1 inline-flex items-center gap-2.5 px-4 py-2 rounded-full mb-8 border font-bold"
              style={{ background: "rgba(137,11,68,0.06)", borderColor: "rgba(137,11,68,0.2)", color: "#890b44" }}>
              <span className="pdot" style={{ background: "#890b44" }} />
              <span className="text-[10px] tracking-[5px] uppercase">
                Trusted Since 2007
              </span>
            </div>

            <div className="ha2 mb-4">
              <h1 style={{ fontSize: "clamp(60px,10vw,116px)", lineHeight: 0.88, letterSpacing: "-2px", fontWeight: 900,}}>
                <span style={{ display: "block", color: "#111111" }}>YOUR TV,</span>
                <span style={{ display: "block", color: "#890b44", position: "relative" }}>
                  FIXED.
                  <svg className="hero-line" viewBox="0 0 300 12" style={{ position: "absolute", bottom: -8, left: 0, width: "100%", height: 12, overflow: "visible" }}>
                    <path d="M0,6 Q75,2 150,6 Q225,10 300,6" fill="none" stroke="#111111" strokeWidth="3" strokeLinecap="round" className="ink-line" />
                  </svg>
                </span>
              </h1>
            </div>

            <div className="ha3 flex items-center gap-3 mt-8 mb-4">
              <div style={{ width: 40, height: 2, background: "#890b44", borderRadius: 9999 }} />
              <span className="text-[11px] font-bold tracking-[4px] uppercase" style={{ color: "#890b44" }}>
                Established 2007
              </span>
            </div>

            <div className="ha4">
              <p className="mb-8 max-w-[460px]" style={{ fontSize: 18, lineHeight: 1.85,  }}>
                Specialists in LED television repair, delivering dependable and professional solutions
                with extensive hands-on experience across{" "}
                <strong style={{ color: "#111111" }}>all major brands and models.</strong>
              </p>
            </div>

            <div className="ha5 flex flex-wrap items-center gap-4">
              <button
                className="btn-ink flex items-center gap-2.5 px-7 py-4 rounded-2xl text-[11px] font-black tracking-[3px] uppercase"
                style={{ background: "#890b44", color: "#fff", boxShadow: "0 8px 30px rgba(137,11,68,0.35)" }} onClick={()=>navigate("/contact")}>
                <Phone size={13} />
                Call Now
              </button>
              <button
                className="btn-ink flex items-center gap-2.5 px-7 py-4 rounded-2xl text-[11px] font-black tracking-[3px] uppercase"
                style={{ background: "transparent", color: "#111111", border: "2px solid #111111" }} onClick={()=>navigate("/service")}>
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
                      borderColor: "rgba(17,17,17,0.1)",
                      boxShadow: "0 2px 16px rgba(17,17,17,0.06)",
                    }}
                    onMouseEnter={e => {
                      e.currentTarget.style.borderColor = s.accent + "50";
                      e.currentTarget.style.boxShadow = `0 16px 40px ${s.accent}18`;
                    }}
                    onMouseLeave={e => {
                      e.currentTarget.style.borderColor = "rgba(17,17,17,0.1)";
                      e.currentTarget.style.boxShadow = "0 2px 16px rgba(17,17,17,0.06)";
                    }}
                  >
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
                    <div className="font-bold text-[14px] tracking-[2px] uppercase" style={{ color: "#111111" }}>{s.label}</div>
                    <div className="text-[14px] tracking-[1px] uppercase mt-0.5" style={{ color: "rgba(17,17,17,0.35)" }}>{s.sub}</div>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>

      </section>

      {/* ═══════════ BRAND TICKER ═══════════ */}
      <div className="ticker-wrap py-5 border-y" style={{ background: "#111111", borderColor: "#111111" }}>
        <div className="ticker-track">
          {[...Array(3)].fill(brands).flat().map((b, i) => (
            <span key={i} className="inline-flex items-center gap-5 px-5">
              <span className="text-[14px] font-bold tracking-[5px] uppercase" style={{ color: "rgba(255,255,255,0.4)" }}>{b}</span>
              <span style={{ width: 4, height: 4, borderRadius: "50%", background: "#890b44", display: "inline-block", flexShrink: 0 }} />
            </span>
          ))}
        </div>
      </div>

      {/* ═══════════ ABOUT ═══════════ */}
      <section className="relative overflow-hidden px-6 sm:px-10 lg:px-16 py-24 sm:py-32" style={{ background: "#fff" }}>
        <div className="line-bg absolute inset-0 opacity-70" />
        <div className="pointer-events-none absolute top-0 right-0 w-[500px] h-[500px] rounded-full"
          style={{ background: "radial-gradient(circle at top right, rgba(137,11,68,0.07), transparent 60%)", filter: "blur(60px)" }} />

        <div className="relative max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2  items-center">
          <Reveal from="left">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full mb-6 border text-[14px] font-bold tracking-[4px] uppercase"
                style={{ color: "#890b44", borderColor: "rgba(137,11,68,0.2)", background: "rgba(137,11,68,0.05)" }}>
                About Us
              </div>
              <h2 className="font-black leading-[1.0] mb-8"
                style={{ fontSize: "clamp(38px,6vw,66px)", color: "#111111", letterSpacing: "-0.5px" }}>
                Who We Are
                <br />
                <span style={{ color: "#890b44" }}>&amp; What We</span>
                <br />
                <span style={{ color: "#111111", WebkitTextStroke: "2px #890b44", WebkitTextFillColor: "transparent" }}>Stand For.</span>
              </h2>
              <div className="stamp-el inline-flex items-center justify-center w-24 h-24 rounded-full border-4"
                style={{ borderColor: "#890b44", borderStyle: "dashed", transform: "rotate(-3deg)", color: "#890b44" }}>
                <div className="text-center">
                  <div className="font-black text-[18px]" >18+</div>
                  <div className="text-[14px] font-bold tracking-[2px] uppercase">Years</div>
                </div>
              </div>
            </div>
          </Reveal>

          <Reveal from="right" delay={120}>
            <div className="flex flex-col gap-5">
              <div className="p-6 rounded-2xl border" style={{ background: "#fafafa", borderColor: "rgba(17,17,17,0.08)" }}>
                <div className="flex items-start gap-4">
                  <div className="w-9 h-9 rounded-xl flex-shrink-0 flex items-center justify-center mt-0.5"
                    style={{ background: "rgba(137,11,68,0.08)" }}>
                    <Wrench size={15} color="#890b44" />
                  </div>
                  <p style={{ fontSize: 17, lineHeight: 1.85,  }}>
                    KJ LED Electronic TV Services was established in 2007, with a strong commitment to delivering dependable and professional LED TV repair solutions. Over the years, we have earned the trust of our customers through consistent service quality and a dedicated approach to every repair.
                  </p>
                </div>
              </div>
              <div className="p-6 rounded-2xl border" style={{ background: "#f9eef4", borderColor: "rgba(137,11,68,0.12)" }}>
                <div className="flex items-start gap-4">
                  <div className="w-9 h-9 rounded-xl flex-shrink-0 flex items-center justify-center mt-0.5"
                    style={{ background: "rgba(137,11,68,0.1)" }}>
                    <Sparkles size={15} color="#890b44" />
                  </div>
                  <p style={{ fontSize: 17, lineHeight: 1.85,  }}>
                    With extensive hands-on experience, our team has developed the expertise to handle a wide range of technical issues across various LED TV models and brands. We focus on identifying the <strong style={{ color: "#890b44" }}>root cause of problems</strong> and providing effective, long-lasting solutions.
                  </p>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ═══════════ EXPERIENCE & GROWTH ═══════════ */}
      <section className="relative overflow-hidden px-6  py-8 " style={{ background: "#f7f7f7" }}>
        <div className="checker-bg absolute inset-0 opacity-60" />
        <div className="pointer-events-none absolute bottom-0 right-0 w-[500px] h-[500px] rounded-full"
          style={{ background: "radial-gradient(circle at bottom right, rgba(137,11,68,0.06), transparent 60%)", filter: "blur(60px)" }} />

        <div className="relative max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <Reveal from="left">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full mb-6 border text-[10px] font-bold tracking-[4px] uppercase"
                style={{ color: "#890b44", borderColor: "rgba(137,11,68,0.2)", background: "rgba(137,11,68,0.05)" }}>
                <TrendingUp size={10} color="#890b44" />
                Our Experience &amp; Growth
              </div>
              <h2 className="font-black leading-[1.0] mb-6"
                style={{ fontSize: "clamp(38px,6vw,66px)", color: "#111111", letterSpacing: "-0.5px" }}>
                Built Through
                <br />
                <span style={{ color: "#890b44" }}>Dedication</span>
                <br />
                <span style={{ color: "#111111", WebkitTextStroke: "2px #890b44", WebkitTextFillColor: "transparent" }}>&amp; Trust.</span>
              </h2>
              <p style={{ fontSize: 17, lineHeight: 1.85,  maxWidth: 460 }}>
                Since our establishment in 2007, KJ LED Electronic TV Services has built a strong foundation through continuous learning and hands-on experience in the field of LED TV repair and servicing. Over the years, we have successfully handled a wide variety of technical issues, gaining deep knowledge and practical expertise.
              </p>
            </div>
          </Reveal>

          <Reveal from="right" delay={120}>
            <div className="flex flex-col gap-5">
              <div className="p-6 rounded-2xl border" style={{ background: "#fff", borderColor: "rgba(17,17,17,0.08)" }}>
                <div className="flex items-start gap-4">
                  <div className="w-9 h-9 rounded-xl flex-shrink-0 flex items-center justify-center mt-0.5"
                    style={{ background: "rgba(137,11,68,0.08)" }}>
                    <TrendingUp size={15} color="#890b44" />
                  </div>
                  <p style={{ fontSize: 17, lineHeight: 1.85,  }}>
                    Our growth has been driven by <strong style={{ color: "#111111" }}>dedication, consistency, and the trust</strong> our customers have placed in us. By maintaining high service standards and adapting to evolving technology, we have expanded our capabilities and strengthened our position as a reliable service provider.
                  </p>
                </div>
              </div>
              <div className="p-6 rounded-2xl border" style={{ background: "#f9eef4", borderColor: "rgba(137,11,68,0.12)" }}>
                <div className="flex items-start gap-4">
                  <div className="w-9 h-9 rounded-xl flex-shrink-0 flex items-center justify-center mt-0.5"
                    style={{ background: "rgba(137,11,68,0.1)" }}>
                    <Award size={15} color="#890b44" />
                  </div>
                  <p style={{ fontSize: 17, lineHeight: 1.85,  }}>
                    Today, our journey reflects not just years of experience, but a commitment to <strong style={{ color: "#890b44" }}>improvement, quality service, and long-term customer relationships.</strong>
                  </p>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ═══════════ OUR APPROACH ═══════════ */}
      <section className="relative overflow-hidden px-6  py-8 " style={{ background: "#fff" }}>
        <div className="line-bg absolute inset-0 opacity-50" />
        <div className="pointer-events-none absolute top-0 left-0 w-[600px] h-[600px] rounded-full"
          style={{ background: "radial-gradient(ellipse at top left, rgba(137,11,68,0.06), transparent 60%)", filter: "blur(60px)" }} />

        <div className="relative max-w-7xl mx-auto">
          <Reveal>
            <div className="mb-16">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full mb-5 border text-[10px] font-bold tracking-[4px] uppercase"
                style={{ color: "#890b44", borderColor: "rgba(137,11,68,0.2)", background: "rgba(137,11,68,0.05)" }}>
                <Zap size={10} color="#890b44" />
                Our Approach
              </div>
              <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6">
                <h2 className="font-black leading-none m-0"
                  style={{ fontSize: "clamp(48px,8vw,92px)", color: "#111111", letterSpacing: "-1px" }}>
                  HOW WE
                  <br />
                  <span style={{ color: "#890b44" }}>WORK</span>
                </h2>
                <p className="text-xl max-w-[420px] leading-relaxed"
                  >
                  A clear and systematic process — built on understanding each issue in detail and providing the right repair with precision and care.
                </p>
              </div>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {approachSteps.map((item, idx) => {
              const Icon = item.icon;
              return (
                <Reveal key={item.num} delay={idx * 80}>
                  <div className="card-shine card-lift relative rounded-3xl p-7 border cursor-default h-full"
                    style={{ background: "#fafafa", borderColor: "rgba(17,17,17,0.07)", boxShadow: "0 2px 10px rgba(17,17,17,0.04)" }}
                    onMouseEnter={e => {
                      e.currentTarget.style.background = item.soft;
                      e.currentTarget.style.borderColor = item.border;
                      e.currentTarget.style.boxShadow = `0 24px 60px ${item.accent}12`;
                      e.currentTarget.querySelector(".approach-icon").style.background = item.soft;
                      e.currentTarget.querySelector(".approach-icon").style.borderColor = item.border;
                      e.currentTarget.querySelector(".approach-icon").style.color = item.accent;
                      e.currentTarget.querySelector(".approach-num").style.color = `${item.accent}10`;
                      e.currentTarget.querySelector(".approach-title").style.color = item.accent;
                      e.currentTarget.querySelector(".approach-bar").style.background = item.accent;
                      e.currentTarget.querySelector(".approach-bar").style.width = "36px";
                    }}
                    onMouseLeave={e => {
                      e.currentTarget.style.background = "#fafafa";
                      e.currentTarget.style.borderColor = "rgba(17,17,17,0.07)";
                      e.currentTarget.style.boxShadow = "0 2px 10px rgba(17,17,17,0.04)";
                      e.currentTarget.querySelector(".approach-icon").style.background = "#fff";
                      e.currentTarget.querySelector(".approach-icon").style.borderColor = "rgba(17,17,17,0.08)";
                      e.currentTarget.querySelector(".approach-num").style.color = "rgba(17,17,17,0.03)";
                      e.currentTarget.querySelector(".approach-title").style.color = "#111111";
                      e.currentTarget.querySelector(".approach-bar").style.background = "rgba(17,17,17,0.1)";
                      e.currentTarget.querySelector(".approach-bar").style.width = "28px";
                    }}
                  >
                    <div className="approach-num pointer-events-none select-none absolute bottom-3 right-4 font-black leading-none"
                      style={{ fontSize: 80,  color: "rgba(17,17,17,0.03)", transition: "color .4s" }}>
                      {item.num}
                    </div>
                    <div className="approach-icon w-11 h-11 rounded-xl flex items-center justify-center mb-5 border"
                      style={{ background: "#fff", borderColor: "rgba(17,17,17,0.08)", transition: "all .4s" }}>
                      <Icon size={20} color="rgba(17,17,17,0.3)" />
                    </div>
                    <div className="approach-bar rounded-full mb-4"
                      style={{ height: 3, background: "rgba(17,17,17,0.1)", width: 28, transition: "all .4s" }} />
                    <h4 className="approach-title font-black mb-3 leading-tight"
                      style={{ fontSize: "clamp(17px,2vw,20px)", color: "#111111", transition: "color .3s" }}>
                      {item.title}
                    </h4>
                    <p className="text-[15px] leading-relaxed" >
                      {item.body}
                    </p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ═══════════ TRUSTED SINCE 2007 ═══════════ */}
      <section className="relative overflow-hidden px-6 py-8" style={{ background: "#f7f7f7" }}>
        <div className="checker-bg absolute inset-0 opacity-60" />
        <div className="pointer-events-none absolute top-0 right-0 w-[500px] h-[500px] rounded-full"
          style={{ background: "radial-gradient(circle at top right, rgba(137,11,68,0.07), transparent 60%)", filter: "blur(60px)" }} />

        <div className="relative max-w-7xl mx-auto">
          <Reveal>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start mb-14">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full mb-5 border text-[10px] font-bold tracking-[4px] uppercase"
                  style={{ color: "#890b44", borderColor: "rgba(137,11,68,0.2)", background: "rgba(137,11,68,0.05)" }}>
                  <span className="pdot" style={{ background: "#890b44" }} />
                  Trusted by Customers
                </div>
                <h2 className="font-black leading-none m-0 mb-6"
                  style={{ fontSize: "clamp(40px,7vw,86px)", color: "#111111", letterSpacing: "-1px" }}>
                  SINCE
                  <br />
                  <span style={{ color: "#890b44" }}>2007</span>
                </h2>
              </div>
              <div className="flex flex-col gap-4 justify-center">
                <p style={{ fontSize: 17, lineHeight: 1.85,  }}>
                  Since 2007, KJ LED Electronic TV Services has earned a strong reputation for reliability and consistent service quality. Our long-standing presence in the industry reflects the confidence and trust that customers have placed in us over the years.
                </p>
                <p style={{ fontSize: 17, lineHeight: 1.85,  }}>
                  We have built this trust by focusing on <strong style={{ color: "#111111" }}>dependable service, professional workmanship, and a commitment</strong> to meeting customer expectations every time.
                </p>
              </div>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            {trustPillars.map((item, idx) => {
              const Icon = item.icon;
              return (
                <Reveal key={item.num} delay={idx * 90}>
                  <div className="card-shine card-lift relative rounded-3xl p-7 border cursor-default h-full"
                    style={{ background: "#fff", borderColor: "rgba(17,17,17,0.08)", boxShadow: "0 2px 12px rgba(17,17,17,0.05)" }}
                    onMouseEnter={e => {
                      e.currentTarget.style.background = item.soft;
                      e.currentTarget.style.borderColor = item.border;
                      e.currentTarget.style.boxShadow = `0 24px 60px ${item.accent}14`;
                    }}
                    onMouseLeave={e => {
                      e.currentTarget.style.background = "#fff";
                      e.currentTarget.style.borderColor = "rgba(17,17,17,0.08)";
                      e.currentTarget.style.boxShadow = "0 2px 12px rgba(17,17,17,0.05)";
                    }}
                  >
                    <div className="absolute top-0 left-0 right-0 h-[3px] rounded-t-3xl"
                      style={{ background: `linear-gradient(90deg,${item.accent},${item.accent}44)` }} />
                    <div className="w-11 h-11 rounded-xl flex items-center justify-center mb-5"
                      style={{ background: item.soft, border: `1px solid ${item.border}` }}>
                      <Icon size={20} color={item.accent} />
                    </div>
                    <h4 className="font-black mb-3 leading-tight"
                      style={{ fontSize: "clamp(18px,2vw,22px)", color: "#111111" }}>
                      {item.title}
                    </h4>
                    <p className="text-[15px] leading-relaxed">
                      {item.body}
                    </p>
                  </div>
                </Reveal>
              );
            })}
          </div>

          <Reveal delay={200}>
            <div className="mt-10 p-7 rounded-3xl border text-center"
              style={{ background: "rgba(137,11,68,0.04)", borderColor: "rgba(137,11,68,0.15)" }}>
              <p style={{ fontSize: 17, lineHeight: 1.85,  maxWidth: 640, margin: "0 auto" }}>
                Our journey since 2007 stands as a testament to our{" "}
                <strong style={{ color: "#890b44" }}>dedication, consistency, and the lasting relationships</strong>{" "}
                we have created with our customers.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ═══════════ SERVICES ═══════════ */}
      <section id="services" className="relative overflow-hidden px-6   py-4 bg-black"
        style={{ background: "#e7e2e2" }}>
        <div className="checker-bg absolute inset-0 opacity-60" />
        <div className="pointer-events-none absolute bottom-0 left-0 w-[500px] h-[500px] rounded-full"
          style={{ background: "radial-gradient(circle at bottom left, rgba(137,11,68,0.06), transparent 60%)", filter: "blur(60px)" }} />

        <div className="relative max-w-7xl mx-auto">
          <Reveal>
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-16">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full mb-5 border text-[14px] font-bold tracking-[4px] uppercase"
                  style={{ color: "#890b44", borderColor: "rgba(137,11,68,0.2)", background: "rgba(137,11,68,0.05)" }}>
                  <Zap size={10} color="#890b44" />
                  Services
                </div>
                <h2 className="font-black leading-none m-0"
                  style={{ fontSize: "clamp(48px,8vw,92px)", color: "#111111", letterSpacing: "-1px" }}>
                  WHAT WE
                  <br />
                  <span style={{ color: "#890b44" }}>DO BEST</span>
                </h2>
              </div>
              <p className="text-[16px] max-w-[260px] leading-relaxed"
                >
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
                      borderColor: isHov ? s.border : "rgba(17,17,17,0.08)",
                      boxShadow: isHov ? `0 24px 60px ${s.accent}14` : "0 2px 12px rgba(17,17,17,0.05)",
                    }}
                    onMouseEnter={() => setHovSvc(s.id)}
                    onMouseLeave={() => setHovSvc(null)}
                  >
                    <div className="absolute top-0 left-8 right-8 h-0.5 rounded-full transition-all duration-500"
                      style={{ background: `linear-gradient(90deg,transparent,${s.accent}${isHov ? "90" : "20"},transparent)` }} />

                    <div className="flex items-start justify-between mb-6">
                      <div className="w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-400"
                        style={{
                          background: isHov ? s.soft : "rgba(17,17,17,0.04)",
                          border: `1px solid ${isHov ? s.border : "rgba(17,17,17,0.08)"}`,
                          transform: isHov ? "rotate(-8deg) scale(1.08)" : "none",
                        }}>
                        <Icon size={22} color={isHov ? s.accent : "rgba(17,17,17,0.3)"} />
                      </div>
                      <span className="font-black text-[14px] tracking-[3px] transition-colors duration-300"
                        style={{ color: isHov ? s.accent : "rgba(17,17,17,0.12)" }}>
                        {s.num}
                      </span>
                    </div>

                    <h3 className="font-black leading-none mb-1 transition-colors duration-300"
                      style={{ fontSize: "clamp(24px,3vw,36px)", color: "#111111" }}>
                      {s.title}
                    </h3>
                    <h3 className="font-black leading-none mb-5 transition-all duration-300"
                      style={{ fontSize: "clamp(24px,3vw,36px)" }}>
                      {s.sub}
                    </h3>

                    <p className="mb-6 transition-colors duration-300"
                      style={{ fontSize: 16, lineHeight: 1.8,  }}>
                      {s.desc}
                    </p>

                    <div className="flex flex-wrap gap-2">
                      {s.tags.map(tag => (
                        <span key={tag} className="tag-hover text-[9px] font-bold tracking-[2px] uppercase px-3 py-1.5 rounded-full transition-all duration-250"
                          style={{
                            background: isHov ? s.soft : "rgba(17,17,17,0.04)",
                            
                            border: `1px solid ${isHov ? s.border : "rgba(17,17,17,0.08)"}`,
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
      <section className="relative overflow-hidden px-6  py-8 " style={{ background: "#fff" }}>
        <div className="line-bg absolute inset-0 opacity-50" />
        <div className="pointer-events-none absolute top-0 right-0 w-[600px] h-[600px] rounded-full"
          style={{ background: "radial-gradient(ellipse at top right, rgba(137,11,68,0.06), transparent 60%)", filter: "blur(60px)" }} />

        <div className="relative max-w-7xl mx-auto">
          <Reveal>
            <div className="text-center mb-16 flex flex-col items-center gap-4">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border text-[10px] font-bold tracking-[4px] uppercase"
                style={{ color: "#890b44", borderColor: "rgba(137,11,68,0.2)", background: "rgba(137,11,68,0.05)" }}>
                <span className="pdot" style={{ background: "#890b44" }} />
                Why Choose Us
              </div>
              <h2 className="font-black m-0 leading-none"
                style={{ fontSize: "clamp(40px,7vw,86px)", color: "#111111", letterSpacing: "-1px" }}>
                The KJ LED <span style={{ color: "#890b44" }}>Difference</span>
              </h2>
              <p style={{  fontSize: 17, maxWidth: 460, lineHeight: 1.7 }}>
                Our approach is built on accurate problem identification, clear communication, efficient execution, and long-term customer relationships — since 2007.
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
                      background: isHov ? item.soft : "#fafafa",
                      borderColor: isHov ? item.border : "rgba(17,17,17,0.07)",
                      boxShadow: isHov ? `0 24px 60px ${item.accent}12` : "0 2px 10px rgba(17,17,17,0.04)",
                    }}
                    onMouseEnter={() => setHovWhy(item.num)}
                    onMouseLeave={() => setHovWhy(null)}
                  >
                    <div className="absolute top-0 left-0 right-0 h-[3px] rounded-t-3xl transition-all duration-500"
                      style={{
                        background: `linear-gradient(90deg,${item.accent},${item.accent}77)`,
                        transform: isHov ? "scaleX(1)" : "scaleX(0)",
                        transformOrigin: "left",
                      }} />

                    <div className="pointer-events-none select-none absolute bottom-3 right-4 font-black leading-none transition-colors duration-300"
                      style={{ fontSize: 80,  color: isHov ? `${item.accent}10` : "rgba(17,17,17,0.03)" }}>
                      {item.num}
                    </div>

                    <div className="w-11 h-11 rounded-xl flex items-center justify-center mb-5 transition-all duration-400"
                      style={{
                        background: isHov ? item.soft : "#fff",
                        border: `1px solid ${isHov ? item.border : "rgba(17,17,17,0.08)"}`,
                        transform: isHov ? "rotate(-6deg) scale(1.1)" : "none",
                        boxShadow: isHov ? `0 4px 16px ${item.accent}20` : "none",
                      }}>
                      <Icon size={20} color={isHov ? item.accent : "rgba(17,17,17,0.3)"} />
                    </div>

                    <div className="rounded-full mb-4 transition-all duration-400"
                      style={{ height: 3, background: isHov ? item.accent : "rgba(17,17,17,0.1)", width: isHov ? 36 : 28 }} />

                    <h4 className="font-black mb-3 leading-tight transition-colors duration-300"
                      style={{ fontSize: "clamp(18px,2vw,22px)", color: isHov ? item.accent : "#111111" }}>
                      {item.title}
                    </h4>
                    <p className="text-[17px] leading-relaxed transition-colors duration-300"
                      style={{ color: isHov ? "" : "black" }}>
                      {item.body}
                    </p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

    </div>
  );
}