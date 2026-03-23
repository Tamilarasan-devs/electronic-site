import React, { useEffect, useRef, useState } from "react";
import { Phone, CalendarCheck, ArrowUpRight, Tv2, Sparkles } from "lucide-react";

/* ─── DATA ─── */
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

/* ─── Warm palette — navy + orange alternating, matching About page ─── */
const ACCENTS = [
  { accent: "#1a3a6b", glow: "rgba(26,58,107,0.18)",  light: "#e8eef7", border: "#c2d0e8", icon: "#d6e0f0" },
  { accent: "#b84a00", glow: "rgba(184,74,0,0.18)",   light: "#fdf0e8", border: "#f5c9a0", icon: "#fde4c4" },
  { accent: "#2e5fa3", glow: "rgba(46,95,163,0.18)",  light: "#edf2fb", border: "#bfcfe8", icon: "#d4e0f2" },
  { accent: "#8b3a00", glow: "rgba(139,58,0,0.18)",   light: "#fdf4ec", border: "#f0c8a0", icon: "#fde8cc" },
  { accent: "#1e4d8c", glow: "rgba(30,77,140,0.18)",  light: "#e8f0f8", border: "#b8ceea", icon: "#d0e2f4" },
  { accent: "#c45200", glow: "rgba(196,82,0,0.18)",   light: "#fef3ec", border: "#f8c8a4", icon: "#fde0c0" },
];

const ROW1 = [...tvBrands.slice(0,6),  ...tvBrands.slice(0,6)];
const ROW2 = [...tvBrands.slice(6,12), ...tvBrands.slice(6,12)];
const ROW3 = [...tvBrands.slice(12),   ...tvBrands.slice(12)];

/* ─── HOOK ─── */
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

/* ─── BRAND CARD ─── */
function BrandCard({ brand, globalIndex, size = "md" }) {
  const [hov, setHov] = useState(false);
  const a = ACCENTS[globalIndex % ACCENTS.length];
  const isLg = size === "lg";

  return (
    <div
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
        background: hov ? a.light : "#fff",
        border: `1.5px solid ${hov ? a.border : "rgba(26,58,107,0.1)"}`,
        boxShadow: hov
          ? `0 20px 48px ${a.glow}, 0 0 0 1px ${a.border}`
          : "0 2px 14px rgba(26,58,107,0.07)",
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
        background: "linear-gradient(105deg, transparent 35%, rgba(255,255,255,0.65) 50%, transparent 65%)",
        transform: hov ? "translateX(100%)" : "translateX(-100%)",
        transition: "transform .55s ease",
        pointerEvents: "none",
      }} />

      {/* Index number */}
      <span style={{
        position: "absolute", top: 8, right: 10,
        fontSize: 9, fontWeight: 700,
        color: hov ? a.accent + "99" : "rgba(26,58,107,0.2)",
        letterSpacing: 1, transition: "color .35s",
        userSelect: "none",
      }}>
        {String(globalIndex + 1).padStart(2, "0")}
      </span>

      {/* Logo box */}
      <div style={{
        width: isLg ? 80 : 66, height: isLg ? 80 : 66,
        borderRadius: 16, flexShrink: 0,
        background: hov ? a.icon : "#f5f2ed",
        border: `1.5px solid ${hov ? a.border : "rgba(26,58,107,0.1)"}`,
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
          <span style={{ fontSize: 18, fontWeight: 900, color: a.accent, letterSpacing: 2, fontFamily: "Georgia, serif" }}>
            {brand.name.slice(0, 2).toUpperCase()}
          </span>
        </div>
      </div>

      {/* Brand name */}
      <p style={{
        margin: 0,
        fontSize: isLg ? 12 : 11, fontWeight: 700,
        letterSpacing: 2, textTransform: "uppercase",
        color: hov ? a.accent : "rgba(26,26,46,0.4)",
        textAlign: "center", transition: "color .35s",
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

/* ─── MARQUEE ROW ─── */
function MarqueeRow({ brands, direction = "left", speed = 35, startIndex = 0, size = "md", rowIndex = 0 }) {
  const triple    = [...brands, ...brands, ...brands];
  const animName  = direction === "left" ? `scrollL${rowIndex}` : `scrollR${rowIndex}`;
  const pct       = direction === "left" ? "-33.333%" : "0%";
  const startPct  = direction === "left" ? "0%" : "-33.333%";

  return (
    <div style={{ overflow: "hidden", width: "100%", position: "relative", padding: "8px 0" }}>
      {/* Left / right fades — warm cream tone */}
      <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: 120, zIndex: 2, background: "linear-gradient(90deg,#faf8f4,transparent)", pointerEvents: "none" }} />
      <div style={{ position: "absolute", right: 0, top: 0, bottom: 0, width: 120, zIndex: 2, background: "linear-gradient(270deg,#faf8f4,transparent)", pointerEvents: "none" }} />

      <style>{`
        @keyframes ${animName} {
          from { transform: translateX(${startPct}); }
          to   { transform: translateX(${pct}); }
        }
      `}</style>

      <div
        style={{ display: "flex", gap: 14, width: "max-content", animation: `${animName} ${speed}s linear infinite` }}
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

/* ─── MAIN ─── */
export default function TVBrandCards() {
  const [headerRef, headerInView] = useInView(0.15);
  const [marqueeRef, marqueeInView] = useInView(0.05);
  const [ctaRef, ctaInView] = useInView(0.2);

  return (
    <>
      <style>{`
        * { box-sizing: border-box; }

        @keyframes dotPulse   { 0%,100%{opacity:.2} 50%{opacity:.38} }
        @keyframes floatY     { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-10px)} }
        @keyframes rotateSlow { from{transform:rotate(0)} to{transform:rotate(360deg)} }
        @keyframes badgeFloat { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-5px)} }

        .tvc-dots    { animation: dotPulse 6s ease-in-out infinite; }
        .float-el    { animation: floatY 5s ease-in-out infinite; }
        .rotate-el   { animation: rotateSlow 30s linear infinite; }
        .badge-float { animation: badgeFloat 3.2s ease-in-out infinite; }

        .tvc-up {
          opacity:0; transform:translateY(40px);
          transition:opacity .75s cubic-bezier(.22,1,.36,1), transform .75s cubic-bezier(.22,1,.36,1);
        }
        .tvc-up.on { opacity:1; transform:translateY(0); }
        .td0 { transition-delay:0s    !important; }
        .td1 { transition-delay:.12s  !important; }
        .td2 { transition-delay:.24s  !important; }
        .td3 { transition-delay:.38s  !important; }
        .td4 { transition-delay:.52s  !important; }

        .mrow { opacity:0; transform:translateY(28px); transition:opacity .8s cubic-bezier(.22,1,.36,1), transform .8s cubic-bezier(.22,1,.36,1); }
        .mrow.on { opacity:1; transform:translateY(0); }
        .mrow.r1 { transition-delay:.25s; }
        .mrow.r2 { transition-delay:.38s; }
        .mrow.r3 { transition-delay:.51s; }

        /* Underline draw — navy to orange */
        .ul-draw {
          position:absolute; bottom:-5px; left:0; right:0;
          height:3px; border-radius:9999px;
          background:linear-gradient(90deg,#1a3a6b,#b84a00);
          transform:scaleX(0); transform-origin:left;
          transition:transform .9s cubic-bezier(.22,1,.36,1) .55s;
        }
        .ul-draw.on { transform:scaleX(1); }

        /* Pulse dot — navy */
        @keyframes pulse-ring {
          0%  { transform:scale(1); opacity:.9; }
          80% { transform:scale(2.4); opacity:0; }
          100%{ transform:scale(2.4); opacity:0; }
        }
        .pdot { position:relative; width:8px; height:8px; border-radius:50%; background:#1a3a6b; flex-shrink:0; }
        .pdot::after { content:''; position:absolute; inset:0; border-radius:50%; background:#1a3a6b; animation:pulse-ring 2s ease-out infinite; }

        /* Divider draw — warm */
        .div-draw {
          height:1px;
          background:linear-gradient(90deg,rgba(26,58,107,.2),rgba(184,74,0,.25),rgba(26,58,107,.15));
          width:0; transition:width 1s cubic-bezier(.22,1,.36,1) .4s;
        }
        .div-draw.on { width:100%; }

        /* Diagonal stripe */
        .diag-band {
          background:repeating-linear-gradient(
            -55deg,transparent,transparent 24px,
            rgba(26,58,107,0.02) 24px,rgba(26,58,107,0.02) 25px
          );
        }

        /* CTA strip */
        .cta-strip {
          border-radius:24px; padding:28px 36px;
          display:flex; align-items:center; justify-content:space-between; gap:24px;
          flex-wrap:wrap; position:relative; overflow:hidden;
          background:#fff; border:1.5px solid rgba(26,58,107,0.12);
          box-shadow:0 4px 24px rgba(26,58,107,.07);
          transition:box-shadow .4s;
        }
        .cta-strip:hover { box-shadow:0 20px 56px rgba(26,58,107,.13); }

        /* Primary btn — navy */
        .btn-p {
          display:inline-flex; align-items:center; gap:8px;
          padding:13px 26px; border-radius:999px;
           font-size:12px; font-weight:700;
          letter-spacing:3px; text-transform:uppercase;
          color:#faf8f4; border:none; cursor:pointer; position:relative; overflow:hidden;
          background:linear-gradient(135deg,#1a3a6b,#0f2347);
          box-shadow:0 8px 28px rgba(26,58,107,.3);
          transition:transform .3s cubic-bezier(.22,1,.36,1),box-shadow .3s;
        }
        .btn-p::after { content:''; position:absolute; inset:0; background:linear-gradient(105deg,transparent 35%,rgba(255,255,255,.14) 50%,transparent 65%); transform:translateX(-100%); transition:transform .5s; }
        .btn-p:hover  { transform:translateY(-3px); box-shadow:0 14px 38px rgba(26,58,107,.42); }
        .btn-p:hover::after { transform:translateX(100%); }

        /* Ghost btn — orange */
        .btn-g {
          display:inline-flex; align-items:center; gap:8px;
          padding:13px 22px; border-radius:999px;
           font-size:12px; font-weight:700;
          letter-spacing:3px; text-transform:uppercase; cursor:pointer;
          background:#fdf0e8; color:#b84a00; border:2px solid #b84a00;
          transition:transform .3s cubic-bezier(.22,1,.36,1),background .3s,box-shadow .3s;
        }
        .btn-g:hover { transform:translateY(-3px); background:#fbdfc8; box-shadow:0 10px 28px rgba(184,74,0,.18); }
        .btn-g svg   { transition:transform .3s cubic-bezier(.22,1,.36,1); }
        .btn-g:hover svg { transform:translateX(4px); }
      `}</style>

      <section style={{
        width: "100%",
        background: "#faf8f4",
        padding: "96px 0 80px",
        position: "relative", overflow: "hidden",
        
        color: "#1a1a2e",
      }}>

        {/* Warm dot bg — tan dots */}
        <div className="tvc-dots" style={{
          position: "absolute", inset: 0, pointerEvents: "none",
          backgroundImage: "radial-gradient(circle, #c8b89a 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }} />

        {/* Diagonal stripe */}
        <div className="diag-band" style={{ position: "absolute", inset: 0, pointerEvents: "none" }} />

        {/* Top bar — navy to orange */}
        <div style={{
          position: "absolute", top: 0, left: 0, right: 0, height: 4,
          background: "linear-gradient(90deg,#1a3a6b,#b84a00,#1a3a6b,#b84a00)",
        }} />

        {/* Warm ambient glows */}
        <div style={{ position: "absolute", top: "-5%", left: "50%", transform: "translateX(-50%)", width: 1000, height: 600, borderRadius: "50%", background: "radial-gradient(ellipse,rgba(255,200,130,0.15) 0%,transparent 65%)", pointerEvents: "none", filter: "blur(40px)" }} />
        <div style={{ position: "absolute", bottom: 0, left: 0, width: 500, height: 500, borderRadius: "50%", background: "radial-gradient(ellipse,rgba(26,58,107,0.07) 0%,transparent 70%)", pointerEvents: "none", filter: "blur(60px)" }} />
        <div style={{ position: "absolute", bottom: 0, right: 0, width: 500, height: 500, borderRadius: "50%", background: "radial-gradient(ellipse,rgba(184,74,0,0.05) 0%,transparent 70%)", pointerEvents: "none", filter: "blur(60px)" }} />

        {/* Floating shapes — navy box + orange dashed circle + rotating dashed ring */}
        <div className="float-el" style={{ position: "absolute", top: 80, right: 48, pointerEvents: "none", opacity: 0.18 }}>
          <div style={{ width: 112, height: 112, borderRadius: 24, border: "2px solid #1a3a6b", transform: "rotate(12deg)" }} />
        </div>
        <div className="float-el" style={{ position: "absolute", bottom: 120, left: 40, pointerEvents: "none", opacity: 0.14, animationDelay: "1.5s" }}>
          <div style={{ width: 64, height: 64, borderRadius: "50%", border: "2px dashed #b84a00" }} />
        </div>
        <div style={{ position: "absolute", top: "40%", right: 24, pointerEvents: "none", opacity: 0.08 }}>
          <div className="rotate-el" style={{ width: 180, height: 180, borderRadius: "50%", border: "1px dashed #1a3a6b" }} />
        </div>

        {/* ── HEADER ── */}
        <div ref={headerRef} style={{ padding: "0 24px", maxWidth: 1200, margin: "0 auto 52px" }}>
          <div style={{ textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center", gap: 18 }}>

            {/* Eyebrow */}
            <div className={`tvc-up td0 ${headerInView ? "on" : ""}`} style={{
              display: "inline-flex", alignItems: "center", gap: 9,
              padding: "7px 20px", borderRadius: 999,
              border: "1px solid rgba(26,58,107,0.18)", background: "#fff",
              boxShadow: "0 2px 12px rgba(26,58,107,0.08)",
            }}>
              <span className="pdot" />
              <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: 5, textTransform: "uppercase", color: "#1a3a6b" }}>
                All Major Brands
              </span>
            </div>

            {/* Heading */}
            <div className={`tvc-up td1 ${headerInView ? "on" : ""}`}>
              <h2 style={{
                
                fontSize: "clamp(52px,8vw,90px)",
                color: "#1a1a2e", textTransform: "uppercase",
                lineHeight: 1, letterSpacing: 6, margin: 0, fontWeight: 900,
              }}>
                Popular{" "}
                <span style={{ position: "relative", color: "#1a3a6b" }}>
                  TV Brands
                  <span className={`ul-draw ${headerInView ? "on" : ""}`} />
                </span>
              </h2>
            </div>

            {/* Subtitle with warm dividers */}
            <div className={`tvc-up td2 ${headerInView ? "on" : ""}`} style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <span style={{ width: 32, height: 2, background: "linear-gradient(90deg,#1a3a6b,transparent)", borderRadius: 9999 }} />
              <p style={{ margin: 0, color: "rgba(26,26,46,0.5)", fontSize: 13, fontWeight: 700, letterSpacing: 4, textTransform: "uppercase", fontStyle: "italic" }}>
                We Service All Leading Television Brands
              </p>
              <span style={{ width: 32, height: 2, background: "linear-gradient(90deg,transparent,#b84a00)", borderRadius: 9999 }} />
            </div>

            {/* Divider draw */}
            <div className={`div-draw ${headerInView ? "on" : ""}`} style={{ marginTop: 4 }} />

            {/* Count badge */}
            <div className={`tvc-up td3 badge-float ${headerInView ? "on" : ""}`} style={{
              display: "inline-flex", alignItems: "center", gap: 10,
              padding: "8px 22px", borderRadius: 999,
              background: "#fff", border: "1.5px solid rgba(26,58,107,0.15)",
              boxShadow: "0 4px 18px rgba(26,58,107,0.1)",
              marginTop: 4,
            }}>
              <Tv2 size={15} color="#1a3a6b" />
              <span style={{ fontSize: 12, fontWeight: 700, letterSpacing: 3, textTransform: "uppercase", color: "#1a3a6b" }}>
                {tvBrands.length}+ Brands &amp; Counting
              </span>
              <Sparkles size={13} color="#b84a00" />
            </div>

          </div>
        </div>

        {/* ── THREE MARQUEE ROWS ── */}
        <div ref={marqueeRef} style={{ display: "flex", flexDirection: "column", gap: 14 }}>
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
            {/* Left accent bar — navy to orange */}
            <div style={{
              position: "absolute", left: 0, top: 0, bottom: 0, width: 4,
              borderRadius: "24px 0 0 24px",
              background: "linear-gradient(180deg,#1a3a6b,#b84a00)",
            }} />
            {/* Warm bg wash */}
            <div style={{
              position: "absolute", inset: 0, borderRadius: 22, pointerEvents: "none",
              background: "linear-gradient(90deg,rgba(26,58,107,0.04),transparent,rgba(184,74,0,0.03))",
            }} />

            <div style={{ position: "relative", paddingLeft: 16 }}>
              <p style={{ margin: "0 0 5px", fontFamily: "Georgia, serif", fontSize: 26, letterSpacing: 1, color: "#1a1a2e", fontWeight: 900 }}>
                Don't see your brand listed?
              </p>
              <p style={{ margin: 0, fontSize: 14, fontWeight: 400, color: "rgba(26,26,46,0.5)" }}>
                We service many more — call us and we'll confirm availability instantly.
              </p>
            </div>

            <div style={{ position: "relative", display: "flex", alignItems: "center", gap: 12, flexShrink: 0 }}>
              <button className="btn-p"><CalendarCheck size={15} />Book a Repair</button>
              <button className="btn-g"><Phone size={14} />Call Us<ArrowUpRight size={14} /></button>
            </div>
          </div>
        </div>

      </section>
    </>
  );
}