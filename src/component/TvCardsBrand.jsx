import React, { useEffect, useRef, useState } from "react";
import { Phone, CalendarCheck, ArrowUpRight, Tv2, Sparkles, Zap } from "lucide-react";

const tvBrands = [
  { name: "Samsung",   img: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b4/Samsung_wordmark.svg/250px-Samsung_wordmark.svg.png" },
  { name: "LG",        img: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8d/LG_logo_%282014%29.svg/250px-LG_logo_%282014%29.svg.png" },
  { name: "Sony",      img: "https://upload.wikimedia.org/wikipedia/commons/c/ca/Sony_logo.svg" },
  { name: "Philips",   img: "https://1000logos.net/wp-content/uploads/2017/05/Phillips-Logo-2008-500x281.png" },
  { name: "Panasonic", img: "https://brandlogos.net/wp-content/uploads/2015/03/panasonic-logo_brandlogos.net_wmewy-512x512.png" },
  { name: "MI",        img: "https://upload.wikimedia.org/wikipedia/commons/a/ae/Xiaomi_logo_%282021-%29.svg" },
  { name: "OnePlus",   img: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f8/OP_LU_Reg_1L_RGB_red_copy-01.svg/250px-OP_LU_Reg_1L_RGB_red_copy-01.svg.png" },
  { name: "TCL",       img: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Logo_of_the_TCL_Corporation.svg/250px-Logo_of_the_TCL_Corporation.svg.png" },
  { name: "Motorola",  img: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/13/Motorola-Logo.svg/250px-Motorola-Logo.svg.png" },
  { name: "Kodak",     img: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/84/Eastman_Kodak_Company_logo_%282016%29.svg/250px-Eastman_Kodak_Company_logo_%282016%29.svg.png" },
  { name: "Toshiba",   img: "https://logodownload.org/wp-content/uploads/2014/09/toshiba-logo-0.png" },
  { name: "Hisense",   img: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/47/Hisense.svg/250px-Hisense.svg.png" },
  { name: "Realme",    img: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e6/Realme_logo_SVG.svg/250px-Realme_logo_SVG.svg.png" },
  { name: "Onida",     img: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0a/Onida_Electronics.svg/250px-Onida_Electronics.svg.png" },
  { name: "Acer",      img: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8e/Acer_Group_2012.svg/250px-Acer_Group_2012.svg.png" },
  { name: "Thomson",   img: "https://images.seeklogo.com/logo-png/13/2/thomson-logo-png_seeklogo-139611.png" },
  { name: "Croma",     img: "https://upload.wikimedia.org/wikipedia/commons/9/9b/Croma_%28store%29_logo.gif" },
  { name: "Coocaa",    img: "https://cdn.brandfetch.io/id7olhQXS_/theme/dark/logo.svg?c=1bxid64Mup7aczewSAYMX" },
];

// Vibrant accent palette
const ACCENTS = [
  { accent: "#60a5fa", glow: "rgba(96,165,250,0.35)",  from: "#1d4ed8", to: "#2563eb" },
  { accent: "#34d399", glow: "rgba(52,211,153,0.35)",  from: "#059669", to: "#10b981" },
  { accent: "#f472b6", glow: "rgba(244,114,182,0.35)", from: "#be185d", to: "#db2777" },
  { accent: "#fb923c", glow: "rgba(251,146,60,0.35)",  from: "#c2410c", to: "#ea580c" },
  { accent: "#a78bfa", glow: "rgba(167,139,250,0.35)", from: "#6d28d9", to: "#7c3aed" },
  { accent: "#22d3ee", glow: "rgba(34,211,238,0.35)",  from: "#0e7490", to: "#0891b2" },
  { accent: "#fbbf24", glow: "rgba(251,191,36,0.35)",  from: "#b45309", to: "#d97706" },
  { accent: "#f87171", glow: "rgba(248,113,113,0.35)", from: "#b91c1c", to: "#dc2626" },
];

const ROW1 = tvBrands.slice(0, 6);
const ROW2 = tvBrands.slice(6, 12);
const ROW3 = tvBrands.slice(12, 18);

function useInView(threshold = 0.1) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setInView(true); }, { threshold });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return [ref, inView];
}

function BrandCard({ brand, accentIndex, size = "md" }) {
  const [hov, setHov] = useState(false);
  const a = ACCENTS[accentIndex % ACCENTS.length];
  const isLg = size === "lg";
  const cardW = isLg ? 150 : 130;
  const logoBox = isLg ? 76 : 64;
  const logoImg = isLg ? 52 : 42;

  return (
    <div
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        width: cardW, flexShrink: 0,
        borderRadius: 20,
        padding: isLg ? "22px 14px 16px" : "18px 12px 14px",
        display: "flex", flexDirection: "column",
        alignItems: "center", gap: isLg ? 11 : 9,
        cursor: "default", overflow: "hidden", position: "relative",
        background: hov
          ? `linear-gradient(145deg, ${a.from}, ${a.to})`
          : "linear-gradient(145deg, #1e3254, #162843)",
        border: `1.5px solid ${hov ? a.accent + "55" : "rgba(96,165,250,0.12)"}`,
        boxShadow: hov
          ? `0 20px 50px ${a.glow}, 0 0 0 1px ${a.accent}33`
          : "0 4px 20px rgba(0,0,0,0.3)",
        transition: "transform .42s cubic-bezier(.22,1,.36,1), box-shadow .42s, background .42s, border-color .35s",
        transform: hov ? "translateY(-10px) scale(1.05)" : "translateY(0) scale(1)",
      }}
    >
      {/* Shimmer sweep */}
      <div style={{
        position: "absolute", inset: 0,
        background: "linear-gradient(105deg, transparent 35%, rgba(255,255,255,0.1) 50%, transparent 65%)",
        transform: hov ? "translateX(100%)" : "translateX(-100%)",
        transition: "transform .55s ease",
        pointerEvents: "none",
      }} />

      {/* Top stripe */}
      <div style={{
        position: "absolute", top: 0, left: 0, right: 0, height: 3,
        borderRadius: "20px 20px 0 0",
        background: hov ? `linear-gradient(90deg, ${a.accent}, ${a.accent}77)` : "transparent",
        transition: "background .35s",
      }} />

      {/* Index */}
      <span style={{
        position: "absolute", top: 8, right: 10,
        fontSize: 9,  fontWeight: 700,
        color: hov ? "rgba(255,255,255,0.4)" : "rgba(96,165,250,0.2)",
        letterSpacing: 1, transition: "color .35s", userSelect: "none",
      }}>
        {String(accentIndex % tvBrands.length + 1).padStart(2, "0")}
      </span>

      {/* Logo box */}
      <div style={{
        width: logoBox, height: logoBox, borderRadius: 16, flexShrink: 0,
        background: hov ? "rgba(255,255,255,0.18)" : "rgba(96,165,250,0.08)",
        border: `1.5px solid ${hov ? "rgba(255,255,255,0.3)" : "rgba(96,165,250,0.15)"}`,
        display: "flex", alignItems: "center", justifyContent: "center",
        transition: "background .35s, border-color .35s, transform .42s cubic-bezier(.22,1,.36,1), box-shadow .35s",
        transform: hov ? "rotate(-6deg) scale(1.1)" : "rotate(0) scale(1)",
        boxShadow: hov ? `0 8px 24px rgba(0,0,0,0.25)` : "none",
        position: "relative",
        padding: 6,
      }}>
        <img
          src={brand.img}
          alt={brand.name}
          style={{
            width: logoImg, height: logoImg, objectFit: "contain",
            filter: hov ? "brightness(1.1)" : "brightness(0.85) saturate(0.7)",
            transition: "filter .35s",
          }}
          onError={(e) => {
            e.currentTarget.style.display = "none";
            if (e.currentTarget.nextSibling) e.currentTarget.nextSibling.style.display = "flex";
          }}
        />
        <div style={{
          display: "none", position: "absolute", inset: 0,
          alignItems: "center", justifyContent: "center", borderRadius: 14,
        }}>
          <span style={{
            
            fontSize: 17, fontWeight: 800,
            color: hov ? "#fff" : a.accent, letterSpacing: 2,
          }}>
            {brand.name.slice(0, 2).toUpperCase()}
          </span>
        </div>
      </div>

      {/* Brand name */}
      <p style={{
        margin: 0,
        fontSize: isLg ? 11 : 10,
        fontWeight: 700, letterSpacing: 2,
        textTransform: "uppercase",
        color: hov ? "#fff" : "rgba(148,163,184,0.75)",
        textAlign: "center",
        transition: "color .35s",
        position: "relative", zIndex: 1,
      }}>
        {brand.name}
      </p>

      {/* Bottom accent dot */}
      <span style={{
        position: "absolute", bottom: 8, left: "50%", transform: "translateX(-50%)",
        width: 5, height: 5, borderRadius: "50%",
        background: hov ? "#fff" : a.accent,
        opacity: hov ? 0.7 : 0,
        boxShadow: hov ? `0 0 8px ${a.accent}` : "none",
        transition: "opacity .3s, box-shadow .3s",
      }} />
    </div>
  );
}

function MarqueeRow({ brands, direction, speed, startIndex, size, rowIdx }) {
  const tripled = [...brands, ...brands, ...brands];
  const anim = direction === "left" ? `mL${rowIdx}` : `mR${rowIdx}`;

  return (
    <div style={{ overflow: "hidden", width: "100%", position: "relative", padding: "8px 0" }}>
      <style>{`
        @keyframes ${anim} {
          from { transform: translateX(${direction === "left" ? "0%" : "-33.333%"}); }
          to   { transform: translateX(${direction === "left" ? "-33.333%" : "0%"}); }
        }
      `}</style>

      {/* Edge masks */}
      <div style={{
        position: "absolute", left: 0, top: 0, bottom: 0, width: 130, zIndex: 2,
        background: "linear-gradient(90deg, #0c1e36, transparent)",
        pointerEvents: "none",
      }} />
      <div style={{
        position: "absolute", right: 0, top: 0, bottom: 0, width: 130, zIndex: 2,
        background: "linear-gradient(270deg, #0c1e36, transparent)",
        pointerEvents: "none",
      }} />

      <div
        style={{
          display: "flex", gap: 14,
          width: "max-content",
          animation: `${anim} ${speed}s linear infinite`,
        }}
        onMouseEnter={e => e.currentTarget.style.animationPlayState = "paused"}
        onMouseLeave={e => e.currentTarget.style.animationPlayState = "running"}
      >
        {tripled.map((brand, i) => (
          <BrandCard
            key={`${brand.name}-${i}`}
            brand={brand}
            accentIndex={startIndex + (i % brands.length)}
            size={size}
          />
        ))}
      </div>
    </div>
  );
}

export default function TVBrandCards() {
  const [headerRef, headerInView] = useInView(0.15);
  const [rowsRef,   rowsInView]   = useInView(0.05);
  const [ctaRef,    ctaInView]    = useInView(0.2);

  return (
    <>
      <style>{`

        /* Dot bg pulse */
        @keyframes dotPulse { 0%,100%{opacity:.15} 50%{opacity:.3} }
        .tvb-dots { animation: dotPulse 6s ease-in-out infinite; }

        /* Reveal up */
        .tvb-up {
          opacity: 0; transform: translateY(42px);
          transition: opacity .75s cubic-bezier(.22,1,.36,1), transform .75s cubic-bezier(.22,1,.36,1);
        }
        .tvb-up.on { opacity: 1; transform: translateY(0); }
        .td0 { transition-delay: 0s    !important; }
        .td1 { transition-delay: 0.12s !important; }
        .td2 { transition-delay: 0.24s !important; }
        .td3 { transition-delay: 0.38s !important; }

        /* Rows reveal */
        .mrow { opacity: 0; transform: translateY(30px); transition: opacity .8s cubic-bezier(.22,1,.36,1), transform .8s cubic-bezier(.22,1,.36,1); }
        .mrow.on { opacity: 1; transform: translateY(0); }
        .mrow.r1 { transition-delay: .2s; }
        .mrow.r2 { transition-delay: .35s; }
        .mrow.r3 { transition-delay: .5s; }

        /* Heading underline */
        .ul-draw {
          position: absolute; bottom: -5px; left: 0; right: 0;
          height: 3px; border-radius: 9999px;
          background: linear-gradient(90deg, #60a5fa, #a78bfa, #34d399);
          transform: scaleX(0); transform-origin: left;
          transition: transform .9s cubic-bezier(.22,1,.36,1) .55s;
        }
        .ul-draw.on { transform: scaleX(1); }

        /* Pulse dot */
        @keyframes pRing { 0%{transform:scale(1);opacity:.9} 80%{transform:scale(2.5);opacity:0} 100%{transform:scale(2.5);opacity:0} }
        .pdot { position:relative; width:8px; height:8px; border-radius:50%; background:#60a5fa; flex-shrink:0; }
        .pdot::after { content:''; position:absolute; inset:0; border-radius:50%; background:#60a5fa; animation:pRing 2s ease-out infinite; }

        /* Count badge float */
        @keyframes badgeFloat { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-5px)} }
        .badge-float { animation: badgeFloat 3.5s ease-in-out infinite; }

        /* Divider draw */
        .div-draw { height:1px; background:linear-gradient(90deg,rgba(96,165,250,.3),rgba(167,139,250,.4),rgba(52,211,153,.2)); width:0; transition:width 1.1s cubic-bezier(.22,1,.36,1) .35s; }
        .div-draw.on { width: 100%; }

        /* CTA strip */
        .cta-strip {
          border-radius: 24px; padding: 28px 36px;
          display: flex; align-items: center; justify-content: space-between;
          gap: 24px; flex-wrap: wrap; position: relative; overflow: hidden;
          background: linear-gradient(145deg, #1e3254, #162843);
          border: 1.5px solid rgba(96,165,250,0.15);
          box-shadow: 0 8px 32px rgba(0,0,0,0.35);
          transition: box-shadow .4s, border-color .4s;
        }
        .cta-strip:hover {
          box-shadow: 0 20px 56px rgba(96,165,250,0.2);
          border-color: rgba(96,165,250,0.3);
        }

        /* Btn primary */
        .btn-p {
          display: inline-flex; align-items: center; gap: 8px;
          padding: 13px 26px; border-radius: 999px;
           font-size: 12px; font-weight: 700;
          letter-spacing: 3px; text-transform: uppercase;
          color: #fff; border: none; cursor: pointer;
          position: relative; overflow: hidden;
          background: linear-gradient(135deg, #2563eb, #1d4ed8);
          box-shadow: 0 8px 28px rgba(37,99,235,.4);
          transition: transform .3s cubic-bezier(.22,1,.36,1), box-shadow .3s;
        }
        .btn-p::after { content:''; position:absolute; inset:0; background:linear-gradient(105deg,transparent 35%,rgba(255,255,255,.15) 50%,transparent 65%); transform:translateX(-100%); transition:transform .5s; }
        .btn-p:hover { transform: translateY(-3px); box-shadow: 0 14px 38px rgba(37,99,235,.5); }
        .btn-p:hover::after { transform: translateX(100%); }

        /* Btn ghost */
        .btn-g {
          display: inline-flex; align-items: center; gap: 8px;
          padding: 13px 22px; border-radius: 999px;
        font-size: 12px; font-weight: 700;
          letter-spacing: 3px; text-transform: uppercase; cursor: pointer;
          background: rgba(96,165,250,0.12); color: #93c5fd;
          border: 1.5px solid rgba(96,165,250,0.25);
          transition: transform .3s cubic-bezier(.22,1,.36,1), background .3s, box-shadow .3s;
        }
        .btn-g:hover { transform: translateY(-3px); background: rgba(96,165,250,0.2); box-shadow: 0 10px 28px rgba(96,165,250,.2); }
        .btn-g svg { transition: transform .3s cubic-bezier(.22,1,.36,1); }
        .btn-g:hover svg { transform: translateX(4px); }
      `}</style>

      <section className="tvb" style={{
        width: "100%",
        background: "#0c1e36",
        padding: "96px 0 80px",
        position: "relative", overflow: "hidden",
      }}>

        {/* Dot bg */}
        <div className="tvb-dots" style={{
          position: "absolute", inset: 0, pointerEvents: "none",
          backgroundImage: "radial-gradient(circle, rgba(96,165,250,0.4) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }} />

        {/* Top gradient bar */}
        <div style={{
          position: "absolute", top: 0, left: 0, right: 0, height: 4,
          background: "linear-gradient(90deg, #60a5fa, #34d399, #a78bfa, #f472b6, #fbbf24)",
        }} />

        {/* Ambient glows */}
        <div style={{
          position: "absolute", top: "-8%", left: "50%", transform: "translateX(-50%)",
          width: 1000, height: 600, borderRadius: "50%",
          background: "radial-gradient(ellipse, rgba(96,165,250,0.1) 0%, transparent 65%)",
          pointerEvents: "none",
        }} />
        <div style={{
          position: "absolute", bottom: 0, left: 0, width: 500, height: 500, borderRadius: "50%",
          background: "radial-gradient(ellipse, rgba(52,211,153,0.07) 0%, transparent 70%)",
          pointerEvents: "none",
        }} />
        <div style={{
          position: "absolute", bottom: 0, right: 0, width: 500, height: 500, borderRadius: "50%",
          background: "radial-gradient(ellipse, rgba(167,139,250,0.07) 0%, transparent 70%)",
          pointerEvents: "none",
        }} />

        {/* ── HEADER ── */}
        <div ref={headerRef} style={{ padding: "0 24px", maxWidth: 1200, margin: "0 auto 52px" }}>
          <div style={{ textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center", gap: 18 }}>

            {/* Eyebrow */}
            <div className={`tvb-up td0 ${headerInView ? "on" : ""}`} style={{
              display: "inline-flex", alignItems: "center", gap: 10,
              padding: "7px 20px", borderRadius: 999,
              border: "1px solid rgba(96,165,250,0.25)",
              background: "rgba(30,58,138,0.35)",
              backdropFilter: "blur(8px)",
            }}>
              <span className="pdot" />
              <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: 5, textTransform: "uppercase", color: "#93c5fd" }}>
                All Major Brands
              </span>
            </div>

            {/* Heading */}
            <div className={`tvb-up td1 ${headerInView ? "on" : ""}`}>
              <h2 style={{
                fontSize: "clamp(52px, 8vw, 90px)",
                color: "#f1f5f9", textTransform: "uppercase",
                lineHeight: 1, letterSpacing: 8, margin: 0,
              }}>
                Popular{" "}
                <span style={{ position: "relative", color: "#60a5fa" }}>
                  TV Brands
                  <span className={`ul-draw ${headerInView ? "on" : ""}`} />
                </span>
              </h2>
            </div>

            {/* Subtitle */}
            <div className={`tvb-up td2 ${headerInView ? "on" : ""}`} style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <span style={{ width: 32, height: 2, background: "linear-gradient(90deg,#60a5fa,transparent)", borderRadius: 9999 }} />
              <p style={{ margin: 0, color: "rgba(148,163,184,0.8)", fontSize: 13, fontWeight: 600, letterSpacing: 4, textTransform: "uppercase", fontStyle: "italic" }}>
                We Service All Leading Television Brands
              </p>
              <span style={{ width: 32, height: 2, background: "linear-gradient(90deg,transparent,#a78bfa)", borderRadius: 9999 }} />
            </div>

            {/* Divider */}
            <div className={`div-draw ${headerInView ? "on" : ""}`} style={{ marginTop: 4 }} />

            {/* Count badge */}
            <div className={`tvb-up td3 badge-float ${headerInView ? "on" : ""}`} style={{
              display: "inline-flex", alignItems: "center", gap: 10,
              padding: "8px 22px", borderRadius: 999,
              background: "rgba(30,58,138,0.4)",
              border: "1.5px solid rgba(96,165,250,0.25)",
              boxShadow: "0 4px 18px rgba(96,165,250,0.12)",
              marginTop: 4,
            }}>
              <Tv2 size={15} color="#60a5fa" />
              <span style={{ fontSize: 12, fontWeight: 700, letterSpacing: 3, textTransform: "uppercase", color: "#93c5fd" }}>
                {tvBrands.length}+ Brands &amp; Counting
              </span>
              <Sparkles size={13} color="#a78bfa" />
            </div>
          </div>
        </div>

        {/* ── THREE MARQUEE ROWS ── */}
        <div ref={rowsRef} style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          <div className={`mrow r1 ${rowsInView ? "on" : ""}`}>
            <MarqueeRow brands={ROW1} direction="left"  speed={36} startIndex={0}  size="md" rowIdx={1} />
          </div>
          <div className={`mrow r2 ${rowsInView ? "on" : ""}`}>
            <MarqueeRow brands={ROW2} direction="right" speed={44} startIndex={6}  size="lg" rowIdx={2} />
          </div>
          <div className={`mrow r3 ${rowsInView ? "on" : ""}`}>
            <MarqueeRow brands={ROW3} direction="left"  speed={40} startIndex={12} size="md" rowIdx={3} />
          </div>
        </div>

        {/* ── CTA STRIP ── */}
        <div
          ref={ctaRef}
          className={`tvb-up td1 ${ctaInView ? "on" : ""}`}
          style={{ padding: "0 24px", maxWidth: 1200, margin: "36px auto 0" }}
        >
          <div className="cta-strip">
            {/* Left accent bar */}
            <div style={{
              position: "absolute", left: 0, top: 0, bottom: 0, width: 4,
              borderRadius: "24px 0 0 24px",
              background: "linear-gradient(180deg,#60a5fa,#a78bfa)",
            }} />

            {/* Ambient wash */}
            <div style={{
              position: "absolute", inset: 0, borderRadius: 22, pointerEvents: "none",
              background: "linear-gradient(90deg,rgba(96,165,250,0.07),transparent,rgba(167,139,250,0.05))",
            }} />

            <div style={{ position: "relative", paddingLeft: 16 }}>
              <p style={{
                margin: "0 0 5px",
                fontSize: 27, letterSpacing: 2, color: "#f1f5f9",
              }}>
                Don't see your brand listed?
              </p>
              <p style={{ margin: 0, fontSize: 14, color: "rgba(148,163,184,0.8)", fontWeight: 400 }}>
                We service many more — call us and we'll confirm availability instantly.
              </p>
            </div>

            <div style={{ position: "relative", display: "flex", alignItems: "center", gap: 12, flexShrink: 0 }}>
              <button className="btn-p">
                <CalendarCheck size={15} />
                Book a Repair
              </button>
              <button className="btn-g">
                <Phone size={14} />
                Call Us
                <ArrowUpRight size={14} />
              </button>
            </div>
          </div>
        </div>

      </section>
    </>
  );
}