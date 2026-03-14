import { useState, useEffect, useRef } from "react";

const services = [
  {
    id: 1, num: "01",
    title: "Panel & Display Repairs",
    desc: "Complete diagnosis and restoration of LCD and LED panels — from backlight failures to full screen replacements.",
    tags: ["LED Backlight", "Panel Swap", "Calibration"],
  },
  {
    id: 2, num: "02",
    title: "Motherboard & PCB",
    desc: "Component-level repair of power boards, T-CON boards, and main PCBs with precision soldering tools.",
    tags: ["PCB Repair", "Power Board", "Soldering"],
  },
  {
    id: 3, num: "03",
    title: "Spare Parts Supply",
    desc: "Genuine and compatible parts in stock for most major brands — no long waits, same-day fitment available.",
    tags: ["OEM Parts", "Remotes", "Stands"],
  },
  {
    id: 4, num: "04",
    title: "Technical Support",
    desc: "Phone and in-person consultation before any repair begins — transparent quotes, no hidden charges.",
    tags: ["Phone Help", "In-Home Visit", "Mail-In"],
  },
];

const stats = [
  { value: "10+", label: "Years in Service" },
  { value: "5K+", label: "TVs Repaired" },
  { value: "3 Hrs", label: "Same Day" },
  { value: "₹0", label: "Diagnosis Fee" },
];

const brands = ["Samsung", "LG", "Sony", "Panasonic", "Philips", "Onida", "Videocon", "Mi", "TCL", "OnePlus"];

const whyUs = [
  { num: "01", title: "Free Diagnosis", body: "We assess your TV at zero cost before quoting any repair price. No surprises, ever." },
  { num: "02", title: "Same-Day Repairs", body: "Most standard repairs are completed within the day. We respect your time completely." },
  { num: "03", title: "Genuine Parts", body: "OEM and trusted compatible parts sourced from verified suppliers — stocked in-house." },
  { num: "04", title: "Expert Team", body: "Certified technicians trained on all major brands with 10+ years of hands-on experience." },
];

function RevealSection({ children, className = "", delay = 0 }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold: 0.1 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return (
    <div ref={ref} className={className} style={{
      opacity: visible ? 1 : 0,
      transform: visible ? "translateY(0)" : "translateY(36px)",
      transition: `opacity 0.75s ease ${delay}ms, transform 0.75s cubic-bezier(0.34,1.1,0.64,1) ${delay}ms`,
    }}>
      {children}
    </div>
  );
}

export default function AboutUs() {
  const [hovered, setHovered] = useState(null);

  return (
    <div className="text-gray-900 overflow-x-hidden" style={{ background: "#f4f7fb" }}>

      {/* ── Subtle grid pattern ── */}
      <div className="fixed inset-0 pointer-events-none z-0"
        style={{
          backgroundImage: "linear-gradient(rgba(42,71,113,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(42,71,113,0.05) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }} />

      {/* ── Top accent bar ── */}
      <div className="relative z-10 h-1 w-full" style={{ background: "linear-gradient(90deg, #2a4771, #3d5f96, #5577aa)" }} />

      {/* ════════════════════════════
          HERO
      ════════════════════════════ */}
      <section className="relative z-10 px-6 md:px-14 lg:px-20 pt-24 pb-28"
        style={{ borderBottom: "1px solid rgba(42,71,113,0.1)" }}>

        {/* Ghost bg word */}
        <div className="absolute top-4 right-0 pointer-events-none select-none"
          style={{ fontSize: "clamp(100px, 18vw, 260px)", color: "rgba(42,71,113,0.04)", lineHeight: 1 }}>
          ABOUT
        </div>

        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">

          {/* Left copy */}
          <div style={{ animation: "heroIn 0.9s cubic-bezier(0.34,1.1,0.64,1) both" }}>

            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-8"
              style={{ background: "rgba(42,71,113,0.08)", border: "1px solid rgba(42,71,113,0.18)" }}>
              <span className="w-2 h-2 rounded-full animate-pulse" style={{ background: "#2a4771" }} />
              <p className="text-xs font-bold tracking-[4px] uppercase" style={{ color: "#2a4771" }}>Coimbatore</p>
            </div>

            <h1 className="leading-[0.88] tracking-tight mb-8"
              style={{ fontSize: "clamp(64px, 10vw, 120px)", color: "#2a4771" }}>
              <span className="block" style={{ color: "#1a2e4a" }}>Your TV,</span>
              <span className="block relative" style={{ color: "#2a4771" }}>
                Repaired.
                <span className="absolute -bottom-3 left-0 h-[4px] rounded-full"
                  style={{
                    width: "100%",
                    background: "linear-gradient(90deg, #2a4771, #3d5f96, #7aa0cc)",
                    animation: "lineExpand 0.9s cubic-bezier(0.34,1.2,0.64,1) 0.5s both",
                  }} />
              </span>
            </h1>

            <div className="flex items-center gap-4 mb-8">
              <span className="w-10 h-[3px] rounded-full" style={{ background: "#2a4771" }} />
              <p className="text-lg font-bold tracking-[2px] uppercase italic" style={{ color: "#3d5f96", fontFamily: "'Rajdhani', sans-serif" }}>
                Trusted Since 2014
              </p>
            </div>

            <p className="text-xl leading-relaxed max-w-lg mb-10" style={{ color: "#4a6080", fontFamily: "'Rajdhani', sans-serif" }}>
              Specialists in LCD &amp; LED television repair, motherboard diagnostics,
              and genuine spare parts — trusted by thousands across Coimbatore.
            </p>

            <div className="flex items-center gap-4 flex-wrap">
              <a href="tel:+91"
                className="flex items-center gap-2 px-8 py-4 rounded-full text-sm font-bold tracking-[2px] uppercase transition-all duration-300 hover:-translate-y-1"
                style={{
                  background: "#2a4771", color: "#fff",
                  boxShadow: "0 8px 28px rgba(42,71,113,0.35)",
                  fontFamily: "'Rajdhani', sans-serif",
                }}
                onMouseEnter={(e) => { e.currentTarget.style.boxShadow = "0 14px 36px rgba(42,71,113,0.5)"; }}
                onMouseLeave={(e) => { e.currentTarget.style.boxShadow = "0 8px 28px rgba(42,71,113,0.35)"; }}
              >
                📞 Call Now
              </a>
              <a href="#services"
                className="flex items-center gap-2 px-8 py-4 rounded-full text-sm font-bold tracking-[2px] uppercase transition-all duration-300 hover:-translate-y-1"
                style={{
                  background: "rgba(42,71,113,0.08)", color: "#2a4771",
                  border: "1.5px solid rgba(42,71,113,0.25)",
                  fontFamily: "'Rajdhani', sans-serif",
                }}
              >
                Our Services →
              </a>
            </div>
          </div>

          {/* Right — stats */}
          <div className="grid grid-cols-2 gap-4" style={{ animation: "heroIn 0.9s cubic-bezier(0.34,1.1,0.64,1) 0.15s both" }}>
            {stats.map((s) => (
              <div key={s.label}
                className="rounded-3xl p-8 cursor-default transition-all duration-400 hover:-translate-y-2"
                style={{
                  background: "white",
                  border: "1.5px solid rgba(42,71,113,0.12)",
                  boxShadow: "0 4px 20px rgba(42,71,113,0.06)",
                }}
                onMouseEnter={(e) => { e.currentTarget.style.boxShadow = "0 16px 48px rgba(42,71,113,0.14)"; e.currentTarget.style.borderColor = "rgba(42,71,113,0.3)"; }}
                onMouseLeave={(e) => { e.currentTarget.style.boxShadow = "0 4px 20px rgba(42,71,113,0.06)"; e.currentTarget.style.borderColor = "rgba(42,71,113,0.12)"; }}
              >
                <p className="font-black leading-none mb-2"
                  style={{ fontSize: "clamp(40px, 5vw, 60px)", color: "#2a4771" }}>
                  {s.value}
                </p>
                <p className="text-xs font-bold uppercase tracking-[3px]" style={{ color: "#7aa0cc" }}>
                  {s.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════
          ABOUT COPY
      ════════════════════════════ */}
      <section className="relative z-10 px-6 md:px-14 lg:px-20 py-24"
        style={{ borderBottom: "1px solid rgba(42,71,113,0.1)" }}>
        <div className="max-w-6xl mx-auto">
          <RevealSection>
            <div className="grid grid-cols-1 lg:grid-cols-[auto_1fr] gap-16 items-start">
              <div className="lg:sticky lg:top-28">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-4"
                  style={{ background: "rgba(42,71,113,0.08)", border: "1px solid rgba(42,71,113,0.15)" }}>
                  <span className="text-[10px] font-bold tracking-[3px] uppercase" style={{ color: "#2a4771" }}>About Us</span>
                </div>
                <h2 className="font-normal leading-tight"
                  style={{ fontSize: "clamp(36px, 4.5vw, 58px)", color: "#1a2e4a" }}>
                  Who We Are &<br />
                  <span style={{ color: "#2a4771" }}>What We Stand For</span>
                </h2>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                <p className="text-xl leading-relaxed" style={{ color: "#4a6080", fontFamily: "'Rajdhani', sans-serif" }}>
                  KJ Electronics has been Coimbatore's go-to TV repair center for over a decade.
                  Our technicians are trained across all major brands and specialize in both LCD and LED technology —
                  from panel-level repairs to deep PCB diagnostics.
                </p>
                <p className="text-xl leading-relaxed" style={{ color: "#4a6080", fontFamily: "'Rajdhani', sans-serif" }}>
                  We believe in transparency first. Every repair starts with a{" "}
                  <strong style={{ color: "#2a4771", fontWeight: 700 }}>free diagnosis</strong> and a clear quote
                  before any work begins. We stock genuine parts so you're never waiting longer than necessary.
                </p>
              </div>
            </div>
          </RevealSection>
        </div>
      </section>

      {/* ════════════════════════════
          SERVICES
      ════════════════════════════ */}
      <section id="services" className="relative z-10 px-6 md:px-14 lg:px-20 py-24"
        style={{ borderBottom: "1px solid rgba(42,71,113,0.1)" }}>
        <div className="max-w-6xl mx-auto">

          <RevealSection className="flex items-end justify-between mb-16 gap-8">
            <div>
              
              <h2 className="font-normal leading-none"
                style={{  fontSize: "clamp(48px, 7vw, 88px)", color: "#1a2e4a" }}>
                What We<br /><span style={{ color: "#2a4771" }}>Do Best</span>
              </h2>
            </div>
          </RevealSection>

          <div style={{ borderTop: "1px solid rgba(42,71,113,0.1)", borderBottom: "1px solid rgba(42,71,113,0.1)" }}>
            {services.map((s, idx) => (
              <RevealSection key={s.id} delay={idx * 80}>
                <div
                  className="grid grid-cols-[56px_1fr] md:grid-cols-[56px_1fr_56px] gap-6 md:gap-12 py-10 px-4 cursor-pointer transition-all duration-400 rounded-2xl "
                  style={{
                    borderBottom: idx < services.length - 1 ? "1px solid rgba(42,71,113,0.08)" : "none",
                    background: hovered === s.id ? "rgba(42,71,113,0.04)" : "transparent",
                  }}
                  onMouseEnter={() => setHovered(s.id)}
                  onMouseLeave={() => setHovered(null)}
                >
                  <p className="text-md font-black tracking-[2px] pt-2 transition-colors duration-300"
                    style={{  color: hovered === s.id ? "#2a4771" : "rgba(42,71,113,0.2)" }}>
                    {s.num}
                  </p>

                  <div>
                    <h3 className=" mb-4 transition-all duration-400"
                      style={{
                      
                        fontSize: "clamp(28px, 3.5vw, 44px)",
                        letterSpacing: "0.03em",
                        color: hovered === s.id ? "#2a4771" : "#2a4771 2024 KJ Electronics · Coimbatore, Tamil Nadu",
                        transform: hovered === s.id ? "translateX(10px)" : "translateX(0)",
                        transition: "transform 0.4s cubic-bezier(0.34,1.2,0.64,1), color 0.3s ease",
                      }}>
                      {s.title}
                    </h3>
                    <p className="text-lg leading-relaxed max-w-xl mb-5 transition-colors duration-300"
                      style={{  color: hovered === s.id ? "#3d5f96" : "#6b8aaa" }}>
                      {s.desc}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {s.tags.map((tag) => (
                        <span key={tag}
                          className="text-xs font-bold uppercase tracking-[2px] px-4 py-1.5 rounded-full transition-all duration-300"
                          style={{
                            border: `1px solid ${hovered === s.id ? "rgba(42,71,113,0.35)" : "rgba(42,71,113,0.15)"}`,
                            color: hovered === s.id ? "#2a4771" : "#7aa0cc",
                            background: hovered === s.id ? "rgba(42,71,113,0.07)" : "white",
                          }}>
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="hidden md:flex items-center justify-end transition-all duration-300"
                    style={{ opacity: hovered === s.id ? 1 : 0, transform: hovered === s.id ? "translateX(0)" : "translateX(-10px)" }}>
                    <div className="w-12 h-12 rounded-full flex items-center justify-center"
                      style={{ background: "#2a4771" }}>
                      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                        <path d="M7 17L17 7M17 7H7M17 7v10" />
                      </svg>
                    </div>
                  </div>
                </div>
              </RevealSection>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════
          BRANDS MARQUEE
      ════════════════════════════ */}
      <section className="relative z-10 py-16" style={{ borderBottom: "1px solid rgba(42,71,113,0.1)", background: "white" }}>
        <RevealSection>
          <div className="flex items-center gap-4 justify-center mb-10">
            <span className="w-10 h-[2px] rounded-full" style={{ background: "#2a4771" }} />
            <p className="text-xs tracking-[5px] uppercase font-black" style={{ color: "#2a4771" }}>Brands We Service</p>
            <span className="w-10 h-[2px] rounded-full" style={{ background: "#2a4771" }} />
          </div>
        </RevealSection>

        <div className="relative overflow-hidden">
          <div className="flex gap-12 items-center" style={{ animation: "marquee 20s linear infinite", width: "max-content" }}>
            {[...brands, ...brands, ...brands].map((b, i) => (
              <span key={i}
                className="text-3xl md:text-4xl font-black cursor-default select-none shrink-0 transition-colors duration-200"
                style={{ letterSpacing: "0.1em", color: "#2a4771" }}
                onMouseEnter={(e) => { e.currentTarget.style.color = "#2a4771"; }}
                // onMouseLeave={(e) => { e.currentTarget.style.color = "rgba(42,71,113,0.18)"; }}
              >
                {b}
                <span className="inline-block w-2 h-2 rounded-full ml-12 -mb-0.5"
                  style={{ background: "rgba(42,71,113,0.15)" }} />
              </span>
            ))}
          </div>
          <div className="absolute inset-y-0 left-0 w-32 pointer-events-none"
            style={{ background: "linear-gradient(90deg, white, transparent)" }} />
          <div className="absolute inset-y-0 right-0 w-32 pointer-events-none"
            style={{ background: "linear-gradient(270deg, white, transparent)" }} />
        </div>
      </section>

      {/* ════════════════════════════
          WHY US
      ════════════════════════════ */}
      <section className="relative z-10 px-6 md:px-14 lg:px-20 py-24"
        style={{ borderBottom: "1px solid rgba(42,71,113,0.1)" }}>
        <div className="max-w-6xl mx-auto">

          <RevealSection className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-5"
              style={{ background: "rgba(42,71,113,0.08)", border: "1px solid rgba(42,71,113,0.15)" }}>
              <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: "#2a4771" }} />
              <span className="text-[10px] font-bold tracking-[3px] uppercase" style={{ color: "#2a4771" }}>Why Choose Us</span>
            </div>
            <h2 className="font-normal leading-none"
              style={{ fontSize: "clamp(48px, 7vw, 90px)", color: "#1a2e4a" }}>
              The KJ Electronics{" "}
              <span style={{ color: "#2a4771" }}>Difference</span>
            </h2>
          </RevealSection>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {whyUs.map((item, idx) => (
              <RevealSection key={item.num} delay={idx * 80}>
                <div
                  className="relative rounded-3xl p-10 cursor-default overflow-hidden transition-all duration-400 hover:-translate-y-2"
                  style={{
                    background: "white",
                    border: "1.5px solid rgba(42,71,113,0.12)",
                    boxShadow: "0 4px 20px rgba(42,71,113,0.06)",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.boxShadow = "0 20px 56px rgba(42,71,113,0.14)";
                    e.currentTarget.style.borderColor = "rgba(42,71,113,0.3)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.boxShadow = "0 4px 20px rgba(42,71,113,0.06)";
                    e.currentTarget.style.borderColor = "rgba(42,71,113,0.12)";
                  }}
                >
                  {/* Ghost number */}
                  <span className="absolute -bottom-4 -right-2 font-black leading-none select-none pointer-events-none"
                    style={{ fontSize: "120px", color: "rgba(42,71,113,0.04)" }}>
                    {item.num}
                  </span>
                  {/* Top accent */}
                  <div className="absolute top-0 left-0 right-0 h-[3px] rounded-t-3xl"
                    style={{ background: "linear-gradient(90deg, #2a4771, #3d5f96, #7aa0cc)" }} />

                  <div className="w-8 h-[3px] rounded-full mb-6" style={{ background: "#2a4771" }} />

                  <h4 className="font-black mb-3"
                    style={{ fontSize: "clamp(26px, 3vw, 36px)", letterSpacing: "0.04em", color: "#2a4771" }}>
                    {item.title}
                  </h4>
                  <p className="text-lg leading-relaxed" style={{ fontFamily: "'Rajdhani', sans-serif", color: "#6b8aaa" }}>
                    {item.body}
                  </p>
                </div>
              </RevealSection>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════
          CTA BANNER
      ════════════════════════════ */}
      <section className="relative z-10 px-6 md:px-14 lg:px-20 py-24">
        <div className="max-w-6xl mx-auto">
          <RevealSection>
            <div className="relative rounded-3xl overflow-hidden" style={{ background: "#2a4771" }}>

              {/* Subtle dot texture */}
              <div className="absolute inset-0 pointer-events-none opacity-[0.1]"
                style={{ backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.6) 1px, transparent 1px)", backgroundSize: "24px 24px" }} />

              {/* Diagonal stripe accent */}
              <div className="absolute top-0 right-0 w-80 h-80 pointer-events-none"
                style={{ background: "radial-gradient(circle at 80% 20%, rgba(122,160,204,0.18), transparent 60%)" }} />

              {/* Top shimmer */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2/3 h-[1px]"
                style={{ background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.25), transparent)" }} />

              {/* Ghost KJ */}
              <div className="absolute bottom-0 right-0 font-black leading-none select-none pointer-events-none"
                style={{ fontSize: "240px", color: "rgba(255,255,255,0.03)", lineHeight: 0.85 }}>
                KJ
              </div>

              <div className="relative p-10 md:p-16 grid grid-cols-1 md:grid-cols-[1fr_auto] gap-12 items-center">
                <div>
                  <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/20 bg-white/10 mb-6">
                    <span className="w-2 h-2 rounded-full animate-pulse bg-white" />
                    <span className="text-xs font-bold tracking-[3px] uppercase text-white/80">Free · No Obligation</span>
                  </div>

                  <h2 className="text-white leading-none mb-5"
                    style={{ fontSize: "clamp(44px, 6vw, 80px)" }}>
                    Bring Your TV In.<br />
                    <span style={{ color: "rgba(255,255,255,0.5)" }}>We'll Take It From Here.</span>
                  </h2>

                  <p className="text-xl max-w-lg leading-relaxed" style={{ color: "rgba(255,255,255,0.6)", fontFamily: "'Rajdhani', sans-serif" }}>
                    Walk in to our Coimbatore service center or call ahead. Diagnosis is always free —
                    you only pay when you're happy with the quote.
                  </p>
                </div>

                <div className="flex flex-col gap-4 shrink-0">
                  <a href="tel:+91"
                    className="inline-flex items-center justify-center gap-3 px-8 py-4 rounded-xl text-sm font-bold uppercase tracking-[2px] transition-all duration-300 hover:-translate-y-1 whitespace-nowrap"
                    style={{
                      background: "white",
                      color: "#2a4771",
                      boxShadow: "0 8px 24px rgba(0,0,0,0.2)",
                      fontFamily: "'Rajdhani', sans-serif",
                    }}
                    onMouseEnter={(e) => { e.currentTarget.style.boxShadow = "0 16px 36px rgba(0,0,0,0.3)"; }}
                    onMouseLeave={(e) => { e.currentTarget.style.boxShadow = "0 8px 24px rgba(0,0,0,0.2)"; }}
                  >
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 1.27h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L7.91 9a16 16 0 0 0 6.29 6.29l1.07-1.07a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                    </svg>
                    Call Now
                  </a>
                  <button
                    className="inline-flex items-center justify-center px-8 py-4 rounded-xl text-sm font-bold uppercase tracking-[2px] transition-all duration-300 hover:-translate-y-1 whitespace-nowrap"
                    style={{
                      color: "rgba(255,255,255,0.85)",
                      border: "1.5px solid rgba(255,255,255,0.2)",
                      background: "rgba(255,255,255,0.08)",
                      fontFamily: "'Rajdhani', sans-serif",
                    }}
                    onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(255,255,255,0.15)"; }}
                    onMouseLeave={(e) => { e.currentTarget.style.background = "rgba(255,255,255,0.08)"; }}
                  >
                    Get Directions
                  </button>
                </div>
              </div>
            </div>
          </RevealSection>
        </div>
      </section>


      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Rajdhani:wght@400;500;600;700&display=swap');
        @keyframes heroIn {
          from { opacity: 0; transform: translateY(36px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes lineExpand {
          from { transform: scaleX(0); transform-origin: left; }
          to   { transform: scaleX(1); transform-origin: left; }
        }
        @keyframes marquee {
          from { transform: translateX(0); }
          to   { transform: translateX(-33.333%); }
        }
      `}</style>
    </div>
  );
}