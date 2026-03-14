import React, { useEffect, useRef, useState } from "react";
import { Tv, Monitor, Smartphone } from "lucide-react";

const brandGroups = [
  {
    id: "4k",
    icon: Tv,
    label: "4K TV Brands",
    tag: "Premium Range",
    brands: [
      "Sony", "LG", "Samsung", "Panasonic", "Haier", "Lloyd",
      "OnePlus", "Mi", "TCL", "Realme", "Redmi", "Acer",
      "Yara", "Croma", "Vu", "Xiaomi", "Hisense", "Thomson", "Onida",
    ],
  },
  {
    id: "other",
    icon: Monitor,
    label: "Other Brands",
    tag: "All Models Covered",
    brands: [
      "BPL", "Micromax", "Truvison", "Intex", "Mitashi",
      "Impex", "Philips", "Hyundai",
    ],
  },
  {
    id: "system",
    icon: Smartphone,
    label: "TV Systems",
    tag: "Smart OS Support",
    brands: ["Android TV", "Google TV", "WebOS TV"],
  },
];

function RevealSection({ children, className = "", delay = 0 }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold: 0.08 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return (
    <div ref={ref} className={className} style={{
      opacity: visible ? 1 : 0,
      transform: visible ? "translateY(0)" : "translateY(32px)",
      transition: `opacity 0.7s ease ${delay}ms, transform 0.7s cubic-bezier(0.34,1.1,0.64,1) ${delay}ms`,
    }}>
      {children}
    </div>
  );
}

export default function Brand() {
  const [hovered, setHovered] = useState(null);

  const allBrands = brandGroups.flatMap(g => g.brands);

  return (
    <div style={{ background: "#f4f7fb", minHeight: "100vh" }} className="overflow-x-hidden">

      {/* Grid pattern */}
      <div className="fixed inset-0 pointer-events-none z-0"
        style={{
          backgroundImage: "linear-gradient(rgba(42,71,113,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(42,71,113,0.04) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }} />

      {/* Top accent bar */}
      <div className="relative z-10 h-1 w-full"
        style={{ background: "linear-gradient(90deg, #2a4771, #3d5f96, #7aa0cc)" }} />

      {/* ═══════════════════════════
          HERO HEADER
      ═══════════════════════════ */}
      <section className="relative z-10 px-6 md:px-14 lg:px-20 pt-20 pb-20"
        style={{ borderBottom: "1px solid rgba(42,71,113,0.1)" }}>

        {/* Ghost bg text */}
        <div className="absolute top-0 right-0 pointer-events-none select-none leading-none"
          style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(120px, 20vw, 280px)", color: "rgba(42,71,113,0.04)" }}>
          BRANDS
        </div>

        <div className="max-w-7xl mx-auto" style={{ animation: "heroIn 0.9s cubic-bezier(0.34,1.1,0.64,1) both" }}>

          {/* Eyebrow */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-8"
            style={{ background: "rgba(42,71,113,0.08)", border: "1px solid rgba(42,71,113,0.18)" }}>
            <span className="w-2 h-2 rounded-full animate-pulse" style={{ background: "#2a4771" }} />
            <p className="text-xs font-bold tracking-[4px] uppercase" style={{ color: "#2a4771" }}>
              All Major Brands
            </p>
          </div>

          {/* Main title */}
          <h1 className="leading-[0.88] tracking-tight mb-8 relative"
            style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(64px, 11vw, 130px)" }}>
            <span className="block" style={{ color: "#1a2e4a" }}>Brands We</span>
            <span className="block relative" style={{ color: "#2a4771" }}>
              Service
              <span className="absolute -bottom-3 left-0 h-[4px] rounded-full"
                style={{
                  width: "100%",
                  background: "linear-gradient(90deg, #2a4771, #3d5f96, #7aa0cc)",
                  animation: "lineExpand 0.9s cubic-bezier(0.34,1.2,0.64,1) 0.4s both",
                }} />
            </span>
          </h1>

          {/* Subtitle row */}
          <div className="flex items-center gap-4 mb-8">
            <span className="w-10 h-[3px] rounded-full" style={{ background: "#2a4771" }} />
            <p className="text-lg font-bold tracking-[2px] uppercase italic" style={{ color: "#3d5f96", fontFamily: "'Rajdhani', sans-serif" }}>
              We Repair All Leading Television Brands
            </p>
          </div>

          <p className="text-xl leading-relaxed max-w-2xl" style={{ color: "#4a6080", fontFamily: "'Rajdhani', sans-serif" }}>
            From premium 4K panels to smart TV operating systems — our certified technicians handle
            every brand and every model with precision and care.
          </p>

          {/* Count badge */}
          <div className="inline-flex items-center gap-3 mt-8 px-6 py-3 rounded-full"
            style={{ background: "white", border: "1.5px solid rgba(42,71,113,0.15)", boxShadow: "0 4px 16px rgba(42,71,113,0.08)" }}>
            <span className="w-2.5 h-2.5 rounded-full animate-pulse" style={{ background: "#2a4771" }} />
            <span className="text-sm font-bold tracking-[2px] uppercase" style={{ color: "#2a4771", fontFamily: "'Rajdhani', sans-serif" }}>
              {allBrands.length}+ Brands &amp; Systems Covered
            </span>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════
          BRAND GROUPS
      ═══════════════════════════ */}
      <section className="relative z-10 px-6 md:px-14 lg:px-20 py-20">
        <div className="max-w-7xl mx-auto flex flex-col gap-20">

          {brandGroups.map((group, groupIdx) => {
            const Icon = group.icon;
            return (
              <RevealSection key={group.id} delay={groupIdx * 100}>

                {/* Group header */}
                <div className="flex items-center gap-5 mb-10">
                  <div className="w-14 h-14 rounded-2xl flex items-center justify-center shrink-0"
                    style={{ background: "rgba(42,71,113,0.1)", border: "1.5px solid rgba(42,71,113,0.2)" }}>
                    <Icon size={24} style={{ color: "#2a4771" }} />
                  </div>
                  <div>
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full mb-1"
                      style={{ background: "rgba(42,71,113,0.07)", border: "1px solid rgba(42,71,113,0.14)" }}>
                      <span className="text-[9px] font-bold tracking-[3px] uppercase" style={{ color: "#3d5f96" }}>{group.tag}</span>
                    </div>
                    <h2 className="font-normal leading-none"
                      style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(36px, 5vw, 60px)", color: "#2a4771" }}>
                      {group.label}
                    </h2>
                  </div>
                  {/* Divider line */}
                  <div className="flex-1 h-[1px] hidden md:block"
                    style={{ background: "linear-gradient(90deg, rgba(42,71,113,0.2), transparent)" }} />
                </div>

                {/* Brand cards grid */}
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3">
                  {group.brands.map((brand, brandIdx) => {
                    const key = `${group.id}-${brandIdx}`;
                    return (
                      <div
                        key={brand}
                        className="relative rounded-2xl px-4 py-5 flex flex-col items-center justify-center gap-2 cursor-default overflow-hidden transition-all duration-300"
                        style={{
                          background: hovered === key ? "white" : "white",
                          border: `1.5px solid ${hovered === key ? "rgba(42,71,113,0.35)" : "rgba(42,71,113,0.1)"}`,
                          boxShadow: hovered === key ? "0 12px 36px rgba(42,71,113,0.14)" : "0 2px 10px rgba(42,71,113,0.05)",
                          transform: hovered === key ? "translateY(-6px)" : "translateY(0)",
                          animation: `cardFadeIn 0.5s ease ${brandIdx * 40 + groupIdx * 200}ms both`,
                        }}
                        onMouseEnter={() => setHovered(key)}
                        onMouseLeave={() => setHovered(null)}
                      >
                        {/* Top accent line on hover */}
                        <div className="absolute top-0 left-0 right-0 h-[3px] rounded-t-2xl transition-all duration-300"
                          style={{
                            background: "linear-gradient(90deg, #2a4771, #3d5f96, #7aa0cc)",
                            opacity: hovered === key ? 1 : 0,
                            transform: hovered === key ? "scaleX(1)" : "scaleX(0)",
                            transformOrigin: "left",
                          }} />

                        {/* Index */}
                        <span className="absolute top-2 right-3 text-[9px] font-bold transition-colors duration-300"
                          style={{
                            fontFamily: "'Bebas Neue', sans-serif",
                            color: hovered === key ? "rgba(42,71,113,0.4)" : "rgba(42,71,113,0.15)",
                          }}>
                          {String(brandIdx + 1).padStart(2, "0")}
                        </span>

                        {/* TV icon dot */}
                        <div className="w-8 h-8 rounded-xl flex items-center justify-center transition-all duration-300"
                          style={{
                            background: hovered === key ? "rgba(42,71,113,0.1)" : "rgba(42,71,113,0.05)",
                            border: `1px solid ${hovered === key ? "rgba(42,71,113,0.25)" : "rgba(42,71,113,0.1)"}`,
                          }}>
                          <Tv size={14} style={{ color: "#2a4771" }} />
                        </div>

                        {/* Brand name */}
                        <p className="text-center font-black uppercase tracking-[1.5px] leading-tight transition-colors duration-300"
                          style={{
                            fontFamily: "'Bebas Neue', sans-serif",
                            fontSize: "clamp(13px, 1.6vw, 16px)",
                            color: hovered === key ? "#1a2e4a" : "#3d5f96",
                          }}>
                          {brand}
                        </p>

                        {/* Bottom dot */}
                        <span className="w-1.5 h-1.5 rounded-full transition-all duration-300"
                          style={{
                            background: hovered === key ? "#2a4771" : "rgba(42,71,113,0.2)",
                            transform: hovered === key ? "scale(1.4)" : "scale(1)",
                          }} />
                      </div>
                    );
                  })}
                </div>
              </RevealSection>
            );
          })}
        </div>
      </section>

      {/* ═══════════════════════════
          MARQUEE STRIP
      ═══════════════════════════ */}
      <section className="relative z-10 py-12 overflow-hidden"
        style={{ background: "white", borderTop: "1px solid rgba(42,71,113,0.08)", borderBottom: "1px solid rgba(42,71,113,0.08)" }}>
        <div className="relative overflow-hidden">
          <div className="flex gap-10 items-center"
            style={{ animation: "marquee 35s linear infinite", width: "max-content" }}>
            {[...allBrands, ...allBrands, ...allBrands].map((b, i) => (
              <span key={i}
                className="text-2xl font-black cursor-default select-none shrink-0 transition-colors duration-200"
                style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: "0.1em", color: "#2a4771" }}
                onMouseEnter={(e) => { e.currentTarget.style.color = "#2a4771"; }}
                // onMouseLeave={(e) => { e.currentTarget.style.color = "rgba(42,71,113,0.15)"; }}
              >
                {b}
                <span className="inline-block w-1.5 h-1.5 rounded-full ml-10 -mb-0.5"
                  style={{ background: "rgba(42,71,113,0.12)" }} />
              </span>
              
            ))}
          </div>
          <div className="absolute inset-y-0 left-0 w-24 pointer-events-none"
            style={{ background: "linear-gradient(90deg, white, transparent)" }} />
          <div className="absolute inset-y-0 right-0 w-24 pointer-events-none"
            style={{ background: "linear-gradient(270deg, white, transparent)" }} />
        </div>
      </section>

      {/* ═══════════════════════════
          CTA STRIP
      ═══════════════════════════ */}
      <section className="relative z-10 px-6 md:px-14 lg:px-20 py-16">
        <div className="max-w-7xl mx-auto">
          <RevealSection>
            <div className="relative rounded-3xl overflow-hidden p-10 md:p-14 flex flex-col md:flex-row items-center justify-between gap-10"
              style={{ background: "#2a4771" }}>

              {/* Dot texture */}
              <div className="absolute inset-0 pointer-events-none opacity-[0.1]"
                style={{ backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.6) 1px, transparent 1px)", backgroundSize: "22px 22px" }} />

              {/* Glow */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2/3 h-[1px]"
                style={{ background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.25), transparent)" }} />

              {/* Ghost text */}
              <div className="absolute bottom-0 right-0 pointer-events-none select-none leading-none"
                style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "180px", color: "rgba(255,255,255,0.03)" }}>
                FIX
              </div>

              <div className="relative">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/20 bg-white/10 mb-5">
                  <span className="w-2 h-2 rounded-full animate-pulse bg-white" />
                  <span className="text-xs font-bold tracking-[3px] uppercase text-white/80">Don't see your brand?</span>
                </div>
                <h2 className="text-white leading-none mb-4"
                  style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(40px, 5.5vw, 72px)" }}>
                  We Service Many More.<br />
                  <span style={{ color: "rgba(255,255,255,0.5)" }}>Call Us To Confirm.</span>
                </h2>
                <p className="text-xl max-w-lg leading-relaxed" style={{ color: "rgba(255,255,255,0.55)", fontFamily: "'Rajdhani', sans-serif" }}>
                  Even if your brand isn't listed, our technicians can handle it.
                  Free diagnosis — you pay only when you approve the quote.
                </p>
              </div>

              <div className="relative flex flex-col gap-4 shrink-0">
                <a href="tel:+91"
                  className="inline-flex items-center justify-center gap-3 px-8 py-4 rounded-xl text-sm font-bold uppercase tracking-[2px] transition-all duration-300 hover:-translate-y-1 whitespace-nowrap"
                  style={{
                    background: "white", color: "#2a4771",
                    boxShadow: "0 8px 24px rgba(0,0,0,0.2)",
                    fontFamily: "'Rajdhani', sans-serif",
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.boxShadow = "0 16px 36px rgba(0,0,0,0.3)"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.boxShadow = "0 8px 24px rgba(0,0,0,0.2)"; }}
                >
                  📞 Book a Repair
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
                  Call Us Now
                </button>
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
        @keyframes cardFadeIn {
          from { opacity: 0; transform: translateY(20px) scale(0.96); }
          to   { opacity: 1; transform: translateY(0) scale(1); }
        }
        @keyframes marquee {
          from { transform: translateX(0); }
          to   { transform: translateX(-33.333%); }
        }
      `}</style>
    </div>
  );
}