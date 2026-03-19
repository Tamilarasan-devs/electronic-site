import React, { useEffect, useRef, useState } from "react";
import { Phone, CalendarCheck, ArrowUpRight, Tv2, Sparkles } from "lucide-react";

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

// Accent palette — each brand card cycles through
const ACCENTS = [
  { accent: "#2563eb", glow: "rgba(37,99,235,0.20)",  light: "#eff6ff", border: "#bfdbfe", icon: "#dbeafe" },
  { accent: "#0891b2", glow: "rgba(8,145,178,0.20)",  light: "#ecfeff", border: "#a5f3fc", icon: "#cffafe" },
  { accent: "#7c3aed", glow: "rgba(124,58,237,0.20)", light: "#f5f3ff", border: "#ddd6fe", icon: "#ede9fe" },
  { accent: "#0d9488", glow: "rgba(13,148,136,0.20)", light: "#f0fdfa", border: "#99f6e4", icon: "#ccfbf1" },
  { accent: "#db2777", glow: "rgba(219,39,119,0.20)", light: "#fdf2f8", border: "#fbcfe8", icon: "#fce7f3" },
  { accent: "#d97706", glow: "rgba(217,119,6,0.20)",  light: "#fffbeb", border: "#fde68a", icon: "#fef3c7" },
];

// Three rows with different speeds & directions
const ROW1 = [...tvBrands.slice(0,6),  ...tvBrands.slice(0,6)];
const ROW2 = [...tvBrands.slice(6,12), ...tvBrands.slice(6,12)];
const ROW3 = [...tvBrands.slice(12),   ...tvBrands.slice(12)];

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

function BrandCard({ brand, globalIndex, size = "md" }) {
  const [hov, setHov] = useState(false);
  const a = ACCENTS[globalIndex % ACCENTS.length];
  const isLg = size === "lg";

  return (
    <div
      className="brand-card"
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        width: isLg ? 160 : 130,
        flexShrink: 0,
        borderRadius: 20,
        padding: isLg ? "22px 16px 18px" : "18px 12px 14px",
        display: "flex", flexDirection: "column",
        alignItems: "center", gap: isLg ? 12 : 9,
        cursor: "default", overflow: "hidden", position: "relative",
        background: hov ? a.light : "#ffffff",
        border: `1.5px solid ${hov ? a.border : "#e8edf6"}`,
        boxShadow: hov
          ? `0 20px 48px ${a.glow}, 0 0 0 1px ${a.border}`
          : "0 2px 14px rgba(15,23,42,0.07)",
        transition: "transform .4s cubic-bezier(.22,1,.36,1), box-shadow .4s, background .35s, border-color .35s",
        transform: hov ? "translateY(-10px) scale(1.04)" : "translateY(0) scale(1)",
      }}
    >
      {/* Top accent stripe */}
      <div style={{
        position: "absolute", top: 0, left: 0, right: 0, height: 3,
        borderRadius: "20px 20px 0 0",
        background: `linear-gradient(90deg, ${a.accent}, ${a.accent}77)`,
        transform: hov ? "scaleX(1)" : "scaleX(0)",
        transformOrigin: "left",
        transition: "transform .42s cubic-bezier(.22,1,.36,1)",
      }} />

      {/* Shimmer sweep */}
      <div style={{
        position: "absolute", inset: 0,
        background: "linear-gradient(105deg, transparent 35%, rgba(255,255,255,0.7) 50%, transparent 65%)",
        transform: hov ? "translateX(100%)" : "translateX(-100%)",
        transition: "transform .55s ease",
        pointerEvents: "none",
      }} />

      {/* Index */}
      <span style={{
        position: "absolute", top: 8, right: 10,
        fontSize: 9, fontFamily: "monospace", fontWeight: 700,
        color: hov ? a.accent + "99" : "#dde3ed",
        letterSpacing: 1, transition: "color .35s",
        userSelect: "none",
      }}>
        {String(globalIndex + 1).padStart(2, "0")}
      </span>

      {/* Logo box */}
      <div style={{
        width: isLg ? 80 : 66, height: isLg ? 80 : 66,
        borderRadius: 16, flexShrink: 0,
        background: hov ? a.icon : "#f8faff",
        border: `1.5px solid ${hov ? a.border : "#e8edf6"}`,
        display: "flex", alignItems: "center", justifyContent: "center",
        transition: "background .35s, border-color .35s, transform .42s cubic-bezier(.22,1,.36,1), box-shadow .35s",
        transform: hov ? "rotate(-6deg) scale(1.1)" : "rotate(0) scale(1)",
        boxShadow: hov ? `0 8px 24px ${a.glow}` : "none",
        position: "relative",
      }}>
        <img
          src={brand.img}
          alt={brand.name}
          style={{ width: isLg ? 56 : 44, height: isLg ? 56 : 44, objectFit: "contain" }}
          onError={(e) => {
            e.currentTarget.style.display = "none";
            if (e.currentTarget.nextSibling) e.currentTarget.nextSibling.style.display = "flex";
          }}
        />
        <div style={{
          display: "none", position: "absolute", inset: 0,
          alignItems: "center", justifyContent: "center",
          borderRadius: 14,
        }}>
          <span style={{
            fontFamily: "'Bebas Neue', sans-serif",
            fontSize: 18, fontWeight: 800,
            color: a.accent, letterSpacing: 2,
          }}>
            {brand.name.slice(0,2).toUpperCase()}
          </span>
        </div>
      </div>

      {/* Brand name */}
      <p style={{
        margin: 0,
        fontFamily: "'Barlow', sans-serif",
        fontSize: isLg ? 12 : 11,
        fontWeight: 700,
        letterSpacing: 2,
        textTransform: "uppercase",
        color: hov ? a.accent : "#94a3b8",
        textAlign: "center",
        transition: "color .35s",
        position: "relative", zIndex: 1,
      }}>
        {brand.name}
      </p>

      {/* Bottom dot */}
      <span style={{
        position: "absolute", bottom: 9, left: "50%", transform: "translateX(-50%)",
        width: 5, height: 5, borderRadius: "50%",
        background: a.accent,
        opacity: hov ? 1 : 0,
        transition: "opacity .3s",
      }} />
    </div>
  );
}

function MarqueeRow({ brands, direction = "left", speed = 35, startIndex = 0, size = "md", rowIndex = 0 }) {
  const triple = [...brands, ...brands, ...brands];
  const animName = direction === "left" ? `scrollL${rowIndex}` : `scrollR${rowIndex}`;
  const pct = direction === "left" ? "-33.333%" : "0%";
  const startPct = direction === "left" ? "0%" : "-33.333%";

  return (
    <div style={{ overflow: "hidden", width: "100%", position: "relative", padding: "8px 0" }}>
      {/* Left fade */}
      <div style={{
        position: "absolute", left: 0, top: 0, bottom: 0, width: 120, zIndex: 2,
        background: "linear-gradient(90deg, #f0f5ff, transparent)",
        pointerEvents: "none",
      }} />
      {/* Right fade */}
      <div style={{
        position: "absolute", right: 0, top: 0, bottom: 0, width: 120, zIndex: 2,
        background: "linear-gradient(270deg, #f0f5ff, transparent)",
        pointerEvents: "none",
      }} />

      <style>{`
        @keyframes ${animName} {
          from { transform: translateX(${startPct}); }
          to   { transform: translateX(${pct}); }
        }
      `}</style>

      <div style={{
        display: "flex", gap: 14,
        width: "max-content",
        animation: `${animName} ${speed}s linear infinite`,
      }}
        onMouseEnter={e => e.currentTarget.style.animationPlayState = "paused"}
        onMouseLeave={e => e.currentTarget.style.animationPlayState = "running"}
      >
        {triple.map((brand, i) => (
          <BrandCard
            key={`${brand.name}-${i}`}
            brand={brand}
            globalIndex={(startIndex + (i % brands.length)) % tvBrands.length}
            size={size}
          />
        ))}
      </div>
    </div>
  );
}

export default function TVBrandCards() {
  const [headerRef, headerInView] = useInView(0.15);
  const [marqueeRef, marqueeInView] = useInView(0.05);
  const [ctaRef, ctaInView] = useInView(0.2);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Barlow:ital,wght@0,300;0,400;0,600;0,700;0,800;1,600&display=swap');

        .tvc-wrap * { box-sizing: border-box; }

        /* Dot bg */
        @keyframes dotPulse { 0%,100%{opacity:.25} 50%{opacity:.48} }
        .tvc-dots { animation: dotPulse 6s ease-in-out infinite; }

        /* Scroll reveals */
        .tvc-up {
          opacity: 0; transform: translateY(40px);
          transition: opacity .75s cubic-bezier(.22,1,.36,1), transform .75s cubic-bezier(.22,1,.36,1);
        }
        .tvc-up.on { opacity: 1; transform: translateY(0); }
        .td0 { transition-delay: 0s    !important; }
        .td1 { transition-delay: 0.12s !important; }
        .td2 { transition-delay: 0.24s !important; }
        .td3 { transition-delay: 0.38s !important; }
        .td4 { transition-delay: 0.52s !important; }

        /* Marquee rows reveal */
        .mrow {
          opacity: 0; transform: translateY(28px);
          transition: opacity .8s cubic-bezier(.22,1,.36,1), transform .8s cubic-bezier(.22,1,.36,1);
        }
        .mrow.on  { opacity: 1; transform: translateY(0); }
        .mrow.r1  { transition-delay: .25s; }
        .mrow.r2  { transition-delay: .38s; }
        .mrow.r3  { transition-delay: .51s; }

        /* Heading underline draw */
        .ul-draw {
          position: absolute; bottom: -5px; left: 0; right: 0;
          height: 3px; border-radius: 9999px;
          background: linear-gradient(90deg, #2563eb, #7c3aed, #0891b2);
          transform: scaleX(0); transform-origin: left;
          transition: transform .9s cubic-bezier(.22,1,.36,1) .55s;
        }
        .ul-draw.on { transform: scaleX(1); }

        /* Pulse dot */
        @keyframes pulse-ring {
          0%   { transform:scale(1); opacity:.9; }
          80%  { transform:scale(2.4); opacity:0; }
          100% { transform:scale(2.4); opacity:0; }
        }
        .pdot {
          position: relative; width: 8px; height: 8px;
          border-radius: 50%; background: #2563eb; flex-shrink: 0;
        }
        .pdot::after {
          content: ''; position: absolute; inset: 0;
          border-radius: 50%; background: #2563eb;
          animation: pulse-ring 2s ease-out infinite;
        }

        /* Badge float */
        @keyframes badgeFloat { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-5px)} }
        .badge-float { animation: badgeFloat 3.2s ease-in-out infinite; }

        /* Divider draw */
        .div-draw {
          height: 1px;
          background: linear-gradient(90deg, rgba(37,99,235,.22), #bfdbfe, rgba(124,58,237,.15));
          width: 0; transition: width 1s cubic-bezier(.22,1,.36,1) .4s;
        }
        .div-draw.on { width: 100%; }

        /* CTA strip */
        .cta-strip {
          border-radius: 24px; padding: 28px 36px;
          display: flex; align-items: center;
          justify-content: space-between; gap: 24px;
          flex-wrap: wrap; position: relative; overflow: hidden;
          background: #fff;
          border: 1.5px solid #e2e8f0;
          box-shadow: 0 4px 24px rgba(15,23,42,.07);
          transition: box-shadow .4s;
        }
        .cta-strip:hover { box-shadow: 0 20px 56px rgba(37,99,235,.13); }

        /* Primary btn */
        .btn-p {
          display: inline-flex; align-items: center; gap: 8px;
          padding: 13px 26px; border-radius: 999px;
          font-family: 'Barlow', sans-serif; font-size: 12px; font-weight: 700;
          letter-spacing: 3px; text-transform: uppercase;
          color: #fff; border: none; cursor: pointer;
          position: relative; overflow: hidden;
          background: linear-gradient(135deg, #2563eb, #1d4ed8);
          box-shadow: 0 8px 28px rgba(37,99,235,.35);
          transition: transform .3s cubic-bezier(.22,1,.36,1), box-shadow .3s;
        }
        .btn-p::after {
          content: ''; position: absolute; inset: 0;
          background: linear-gradient(105deg, transparent 35%, rgba(255,255,255,.18) 50%, transparent 65%);
          transform: translateX(-100%); transition: transform .5s;
        }
        .btn-p:hover { transform: translateY(-3px); box-shadow: 0 14px 38px rgba(37,99,235,.45); }
        .btn-p:hover::after { transform: translateX(100%); }

        /* Ghost btn */
        .btn-g {
          display: inline-flex; align-items: center; gap: 8px;
          padding: 13px 22px; border-radius: 999px;
          font-family: 'Barlow', sans-serif; font-size: 12px; font-weight: 700;
          letter-spacing: 3px; text-transform: uppercase; cursor: pointer;
          background: #eff6ff; color: #1d4ed8;
          border: 1.5px solid #bfdbfe;
          transition: transform .3s cubic-bezier(.22,1,.36,1), background .3s, box-shadow .3s;
        }
        .btn-g:hover { transform: translateY(-3px); background: #dbeafe; box-shadow: 0 10px 28px rgba(37,99,235,.18); }
        .btn-g svg { transition: transform .3s cubic-bezier(.22,1,.36,1); }
        .btn-g:hover svg { transform: translateX(4px); }
      `}</style>

      <section className="tvc-wrap" style={{
        width: "100%",
        background: "linear-gradient(180deg, #f0f5ff 0%, #f8faff 60%, #f0f5ff 100%)",
        padding: "96px 0 80px",
        position: "relative", overflow: "hidden",
        fontFamily: "'Barlow', sans-serif",
      }}>

        {/* Dot bg */}
        <div className="tvc-dots" style={{
          position: "absolute", inset: 0, pointerEvents: "none",
          backgroundImage: "radial-gradient(circle, #9ab4d8 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }} />

        {/* Top gradient bar */}
        <div style={{
          position: "absolute", top: 0, left: 0, right: 0, height: 4,
          background: "linear-gradient(90deg, #2563eb, #0891b2, #7c3aed, #0d9488, #db2777)",
        }} />

        {/* Ambient glows */}
        <div style={{
          position: "absolute", top: "-5%", left: "50%", transform: "translateX(-50%)",
          width: 1000, height: 600, borderRadius: "50%",
          background: "radial-gradient(ellipse, rgba(37,99,235,0.1) 0%, transparent 65%)",
          pointerEvents: "none",
        }} />
        <div style={{
          position: "absolute", bottom: 0, left: 0, width: 500, height: 500, borderRadius: "50%",
          background: "radial-gradient(ellipse, rgba(8,145,178,0.08) 0%, transparent 70%)",
          pointerEvents: "none",
        }} />
        <div style={{
          position: "absolute", bottom: 0, right: 0, width: 500, height: 500, borderRadius: "50%",
          background: "radial-gradient(ellipse, rgba(124,58,237,0.08) 0%, transparent 70%)",
          pointerEvents: "none",
        }} />

        {/* ── HEADER ── */}
        <div
          ref={headerRef}
          style={{ padding: "0 24px", maxWidth: 1200, margin: "0 auto 52px" }}
        >
          <div style={{ textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center", gap: 18 }}>

            {/* Eyebrow */}
            <div className={`tvc-up td0 ${headerInView ? "on" : ""}`} style={{
              display: "inline-flex", alignItems: "center", gap: 9,
              padding: "7px 20px", borderRadius: 999,
              border: "1px solid #bfdbfe", background: "#fff",
              boxShadow: "0 2px 12px rgba(37,99,235,0.1)",
            }}>
              <span className="pdot" />
              <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: 5, textTransform: "uppercase", color: "#1d4ed8" }}>
                All Major Brands
              </span>
            </div>

            {/* Heading */}
            <div className={`tvc-up td1 ${headerInView ? "on" : ""}`}>
              <h2 style={{
                fontFamily: "'Bebas Neue', sans-serif",
                fontSize: "clamp(52px, 8vw, 90px)",
                color: "#0f172a", textTransform: "uppercase",
                lineHeight: 1, letterSpacing: 8, margin: 0,
              }}>
                Popular{" "}
                <span style={{ position: "relative", color: "#2563eb" }}>
                  TV Brands
                  <span className={`ul-draw ${headerInView ? "on" : ""}`} />
                </span>
              </h2>
            </div>

            {/* Subtitle */}
            <div className={`tvc-up td2 ${headerInView ? "on" : ""}`} style={{
              display: "flex", alignItems: "center", gap: 12,
            }}>
              <span style={{ width: 32, height: 2, background: "linear-gradient(90deg,#2563eb,transparent)", borderRadius: 9999 }} />
              <p style={{
                margin: 0, color: "#64748b", fontSize: 13, fontWeight: 600,
                letterSpacing: 4, textTransform: "uppercase", fontStyle: "italic",
              }}>
                We Service All Leading Television Brands
              </p>
              <span style={{ width: 32, height: 2, background: "linear-gradient(90deg,transparent,#7c3aed)", borderRadius: 9999 }} />
            </div>

            {/* Divider */}
            <div className={`div-draw ${headerInView ? "on" : ""}`} style={{ marginTop: 4 }} />

            {/* Count badge */}
            <div className={`tvc-up td3 badge-float ${headerInView ? "on" : ""}`} style={{
              display: "inline-flex", alignItems: "center", gap: 10,
              padding: "8px 22px", borderRadius: 999,
              background: "#fff",
              border: "1.5px solid #bfdbfe",
              boxShadow: "0 4px 18px rgba(37,99,235,0.13)",
              marginTop: 4,
            }}>
              <Tv2 size={15} color="#2563eb" />
              <span style={{ fontSize: 12, fontWeight: 700, letterSpacing: 3, textTransform: "uppercase", color: "#2563eb" }}>
                {tvBrands.length}+ Brands &amp; Counting
              </span>
              <Sparkles size={13} color="#7c3aed" />
            </div>

          </div>
        </div>

        {/* ── THREE MARQUEE ROWS ── */}
        <div
          ref={marqueeRef}
          style={{ display: "flex", flexDirection: "column", gap: 14 }}
        >
          <div className={`mrow r1 ${marqueeInView ? "on" : ""}`}>
            <MarqueeRow brands={ROW1} direction="left"  speed={38} startIndex={0}  rowIndex={1} size="md" />
          </div>
          <div className={`mrow r2 ${marqueeInView ? "on" : ""}`}>
            <MarqueeRow brands={ROW2} direction="right" speed={46} startIndex={6}  rowIndex={2} size="lg" />
          </div>
          <div className={`mrow r3 ${marqueeInView ? "on" : ""}`}>
            <MarqueeRow brands={ROW3} direction="left"  speed={40} startIndex={12} rowIndex={3} size="md" />
          </div>
        </div>

        {/* ── CTA STRIP ── */}
        <div
          ref={ctaRef}
          className={`tvc-up td1 ${ctaInView ? "on" : ""}`}
          style={{ padding: "0 24px", maxWidth: 1200, margin: "36px auto 0" }}
        >
          <div className="cta-strip">
            {/* Left accent bar */}
            <div style={{
              position: "absolute", left: 0, top: 0, bottom: 0, width: 4,
              borderRadius: "24px 0 0 24px",
              background: "linear-gradient(180deg,#2563eb,#7c3aed)",
            }} />
            {/* Bg wash */}
            <div style={{
              position: "absolute", inset: 0, borderRadius: 22, pointerEvents: "none",
              background: "linear-gradient(90deg,rgba(239,246,255,.55),transparent,rgba(245,243,255,.35))",
            }} />

            <div style={{ position: "relative", paddingLeft: 16 }}>
              <p style={{
                margin: "0 0 5px",
                fontFamily: "'Bebas Neue', sans-serif",
                fontSize: 27, letterSpacing: 2, color: "#0f172a",
              }}>
                Don't see your brand listed?
              </p>
              <p style={{ margin: 0, fontSize: 14, color: "#64748b", fontWeight: 400 }}>
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