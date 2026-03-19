import React, { useEffect, useRef, useState } from "react";
import { MonitorCheck, Volume2, Wifi, Phone, MessageSquare, ArrowUpRight } from "lucide-react";

const features = [
  {
    id: 1, icon: MonitorCheck,
    title: "Video Resolution",
    description: "Support for HD, 4K, and HDR content to ensure the best possible viewing experience on every screen.",
    accent: "#2563eb", light: "#eff6ff", border: "#bfdbfe", iconBg: "#dbeafe",
  },
  {
    id: 2, icon: Volume2,
    title: "Audio Quality",
    description: "Options for surround sound, Dolby Atmos, and high-fidelity audio formats for immersive sound.",
    accent: "#0891b2", light: "#ecfeff", border: "#a5f3fc", iconBg: "#cffafe",
  },
  {
    id: 3, icon: Wifi,
    title: "Reliability",
    description: "Consistent streaming quality without buffering or drops — smooth performance every time.",
    accent: "#7c3aed", light: "#f5f3ff", border: "#ddd6fe", iconBg: "#ede9fe",
  },
];

const miniStrip = [
  { label: "HD & 4K Ready", accent: "#2563eb", bg: "#eff6ff", border: "#bfdbfe" },
  { label: "All Brands",     accent: "#0891b2", bg: "#ecfeff", border: "#a5f3fc" },
  { label: "Doorstep",       accent: "#7c3aed", bg: "#f5f3ff", border: "#ddd6fe" },
];

function useInView(threshold = 0.12) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setInView(true); },
      { threshold }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return [ref, inView];
}

export default function TVServices() {
  const [leftRef,  leftInView]  = useInView(0.12);
  const [rightRef, rightInView] = useInView(0.12);
  const [hovFeat,  setHovFeat]  = useState(null);
  const [hovStrip, setHovStrip] = useState(null);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Barlow:ital,wght@0,300;0,400;0,600;0,700;0,800;1,600&display=swap');

        .tvs * { box-sizing: border-box; }

        /* ── Scroll reveal ── */
        .tvs-left  { opacity:0; transform:translateX(-48px); transition:opacity .8s cubic-bezier(.22,1,.36,1), transform .8s cubic-bezier(.22,1,.36,1); }
        .tvs-right { opacity:0; transform:translateX( 48px); transition:opacity .8s cubic-bezier(.22,1,.36,1) .15s, transform .8s cubic-bezier(.22,1,.36,1) .15s; }
        .tvs-left.in, .tvs-right.in { opacity:1; transform:translateX(0); }

        .tvs-reveal { opacity:0; transform:translateY(36px); transition:opacity .7s cubic-bezier(.22,1,.36,1), transform .7s cubic-bezier(.22,1,.36,1); }
        .tvs-reveal.in { opacity:1; transform:translateY(0); }
        .d0 { transition-delay:0s    !important; }
        .d1 { transition-delay:0.1s  !important; }
        .d2 { transition-delay:0.2s  !important; }
        .d3 { transition-delay:0.32s !important; }
        .d4 { transition-delay:0.44s !important; }
        .d5 { transition-delay:0.56s !important; }

        /* ── Dot bg breathe ── */
        @keyframes dotBreathe { 0%,100%{opacity:.28} 50%{opacity:.52} }
        .dot-bg { animation: dotBreathe 5s ease-in-out infinite; }

        /* ── Pulse ring ── */
        @keyframes pulseRing {
          0%   { transform:scale(1); opacity:.85; }
          80%  { transform:scale(2.5); opacity:0; }
          100% { transform:scale(2.5); opacity:0; }
        }
        .p-dot {
          position:relative; width:8px; height:8px;
          border-radius:50%; background:#2563eb; flex-shrink:0;
        }
        .p-dot::after {
          content:''; position:absolute; inset:0; border-radius:50%;
          background:#2563eb; animation:pulseRing 2s ease-out infinite;
        }

        /* ── Scan line on image ── */
        @keyframes scan {
          0%   { top:0%;   opacity:.6; }
          50%  { opacity:.3; }
          100% { top:100%; opacity:0; }
        }
        .scan-line {
          position:absolute; left:0; right:0; height:2px;
          background:linear-gradient(90deg,transparent,rgba(59,130,246,0.55),transparent);
          animation:scan 3.5s linear infinite; pointer-events:none;
        }

        /* ── Heading underline ── */
        .draw-u {
          position:absolute; bottom:-4px; left:0; right:0;
          height:3px; border-radius:9999px;
          background:linear-gradient(90deg,#2563eb,#7c3aed);
          transform:scaleX(0); transform-origin:left;
          transition:transform .9s cubic-bezier(.22,1,.36,1) .6s;
        }
        .draw-u.on { transform:scaleX(1); }

        /* ── Image card hover ── */
        .img-wrap {
          position:relative; border-radius:22px; overflow:hidden;
          border:1.5px solid #e2e8f0;
          box-shadow:0 12px 40px rgba(15,23,42,0.1);
          transition:transform .55s cubic-bezier(.22,1,.36,1), box-shadow .55s ease;
        }
        .img-wrap:hover {
          transform:scale(1.015) translateY(-4px);
          box-shadow:0 28px 70px rgba(37,99,235,0.18);
        }

        /* ── Live badge slide-in ── */
        @keyframes badgeIn {
          from { opacity:0; transform:translateY(-12px) scale(.92); }
          to   { opacity:1; transform:translateY(0) scale(1); }
        }
        .live-badge { animation:badgeIn .65s cubic-bezier(.22,1,.36,1) .8s both; }
        .resp-badge { animation:badgeIn .65s cubic-bezier(.22,1,.36,1) 1s both; }

        /* ── Mini strip pill ── */
        .strip-pill {
          border-radius:14px; padding:12px 8px; text-align:center;
          cursor:default; overflow:hidden; position:relative;
          transition:transform .4s cubic-bezier(.22,1,.36,1), box-shadow .4s, border-color .3s, background .3s;
        }
        .strip-pill:hover { transform:translateY(-5px); }
        .strip-pill::after {
          content:''; position:absolute;
          top:0; left:-100%; width:55%; height:100%;
          background:linear-gradient(105deg,transparent,rgba(255,255,255,0.6),transparent);
          transition:left .55s ease; pointer-events:none;
        }
        .strip-pill:hover::after { left:140%; }

        /* ── Feature row card ── */
        .feat-row {
          display:flex; align-items:flex-start; gap:16px;
          border-radius:20px; padding:18px 20px;
          cursor:default; overflow:hidden; position:relative;
          transition:transform .4s cubic-bezier(.22,1,.36,1), box-shadow .4s, background .4s, border-color .35s;
        }
        .feat-row:hover { transform:translateY(-5px); }
        .feat-row::after {
          content:''; position:absolute;
          top:0; left:-100%; width:55%; height:100%;
          background:linear-gradient(105deg,transparent,rgba(255,255,255,0.55),transparent);
          transition:left .6s ease; pointer-events:none;
        }
        .feat-row:hover::after { left:150%; }

        .feat-icon-box {
          width:44px; height:44px; border-radius:13px; flex-shrink:0;
          display:flex; align-items:center; justify-content:center;
          transition:transform .4s cubic-bezier(.22,1,.36,1), background .4s, border-color .4s;
        }
        .feat-row:hover .feat-icon-box { transform:rotate(-8deg) scale(1.1); }

        /* ── Divider draw ── */
        .div-draw {
          height:1px; background:linear-gradient(90deg,rgba(37,99,235,.25),#bfdbfe,transparent);
          width:0; transition:width 1s cubic-bezier(.22,1,.36,1);
        }
        .div-draw.on { width:100%; }

        /* ── Buttons ── */
        .btn-primary {
          display:inline-flex; align-items:center; gap:9px;
          padding:13px 28px; border-radius:999px;
          font-family:'Barlow',sans-serif; font-size:12px; font-weight:700;
          letter-spacing:3px; text-transform:uppercase;
          color:#fff; border:none; cursor:pointer; position:relative; overflow:hidden;
          background:linear-gradient(135deg,#2563eb,#1d4ed8);
          box-shadow:0 8px 28px rgba(37,99,235,0.35);
          transition:transform .3s cubic-bezier(.22,1,.36,1), box-shadow .3s;
        }
        .btn-primary::after {
          content:''; position:absolute; inset:0;
          background:linear-gradient(105deg,transparent 35%,rgba(255,255,255,0.18) 50%,transparent 65%);
          transform:translateX(-100%); transition:transform .5s;
        }
        .btn-primary:hover { transform:translateY(-3px); box-shadow:0 14px 38px rgba(37,99,235,0.45); }
        .btn-primary:hover::after { transform:translateX(100%); }

        .btn-ghost {
          display:inline-flex; align-items:center; gap:9px;
          padding:13px 22px; border-radius:999px;
          font-family:'Barlow',sans-serif; font-size:12px; font-weight:700;
          letter-spacing:3px; text-transform:uppercase; cursor:pointer;
          background:#eff6ff; color:#1d4ed8;
          border:1.5px solid #bfdbfe;
          box-shadow:0 4px 14px rgba(37,99,235,0.1);
          transition:transform .3s cubic-bezier(.22,1,.36,1), box-shadow .3s, background .3s;
        }
        .btn-ghost:hover {
          transform:translateY(-3px); background:#dbeafe;
          box-shadow:0 10px 28px rgba(37,99,235,0.18);
        }
        .btn-ghost svg { transition:transform .3s cubic-bezier(.22,1,.36,1); }
        .btn-ghost:hover svg { transform:translateX(4px); }
      `}</style>

      <section className="tvs" style={{
        width:"100%", background:"#f8faff",
        padding:"96px 24px", position:"relative", overflow:"hidden",
        fontFamily:"'Barlow',sans-serif",
      }}>

        {/* Dot bg */}
        <div className="dot-bg" style={{
          position:"absolute", inset:0, pointerEvents:"none",
          backgroundImage:"radial-gradient(circle,#bed0ef 1px,transparent 1px)",
          backgroundSize:"28px 28px",
        }} />

        {/* Top bar */}
        <div style={{
          position:"absolute", top:0, left:0, right:0, height:3,
          background:"linear-gradient(90deg,#2563eb,#0891b2,#7c3aed)",
        }} />

        {/* Ambient glows */}
        <div style={{
          position:"absolute", top:0, right:0, width:500, height:500, borderRadius:"50%",
          background:"radial-gradient(ellipse,rgba(124,58,237,0.08) 0%,transparent 70%)",
          pointerEvents:"none",
        }} />
        <div style={{
          position:"absolute", bottom:0, left:0, width:450, height:450, borderRadius:"50%",
          background:"radial-gradient(ellipse,rgba(37,99,235,0.07) 0%,transparent 70%)",
          pointerEvents:"none",
        }} />

        <div style={{
          position:"relative", maxWidth:1200, margin:"0 auto",
          display:"flex", flexDirection:"row", flexWrap:"wrap",
          alignItems:"center", gap:56,
        }}>

          {/* ── LEFT IMAGE ── */}
          <div
            ref={leftRef}
            className={`tvs-left ${leftInView ? "in" : ""}`}
            style={{ flex:"1 1 340px", minWidth:300 }}
          >
            {/* Image */}
            <div className="img-wrap">
              <img
                src="https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?auto=format&fit=crop&w=800&q=80"
                alt="TV Services"
                style={{ width:"100%", height:460, objectFit:"cover", filter:"brightness(.78) saturate(.82)", display:"block" }}
              />
              {/* Tint */}
              <div style={{
                position:"absolute", inset:0,
                background:"linear-gradient(135deg,rgba(37,99,235,0.35) 0%,transparent 60%)",
              }} />
              {/* Scan */}
              <div className="scan-line" />
              {/* Bottom fade */}
              <div style={{
                position:"absolute", bottom:0, left:0, right:0, height:"35%",
                background:"linear-gradient(to top,rgba(248,250,255,0.2),transparent)",
              }} />

              {/* Live badge */}
              <div className="live-badge" style={{
                position:"absolute", top:16, left:16,
                display:"flex", alignItems:"center", gap:8,
                padding:"9px 16px", borderRadius:12,
                background:"rgba(255,255,255,0.95)",
                border:"1px solid #bfdbfe",
                boxShadow:"0 6px 20px rgba(37,99,235,0.15)",
              }}>
                <span className="p-dot" />
                <span style={{
                  fontSize:10, fontWeight:700, letterSpacing:3.5,
                  textTransform:"uppercase", color:"#1d4ed8",
                }}>Expert Support</span>
              </div>

              {/* Response badge */}
              <div className="resp-badge" style={{
                position:"absolute", bottom:16, right:16,
                padding:"10px 18px", borderRadius:14,
                background:"rgba(255,255,255,0.96)",
                border:"1px solid #bfdbfe",
                boxShadow:"0 8px 24px rgba(37,99,235,0.18)",
              }}>
                <p style={{ margin:"0 0 3px", fontSize:9, fontWeight:700, letterSpacing:3, textTransform:"uppercase", color:"#2563eb" }}>Response Time</p>
                <p style={{ margin:0, fontFamily:"'Bebas Neue',sans-serif", fontSize:26, lineHeight:1, color:"#0f172a", letterSpacing:1 }}>Under 3 Hrs</p>
              </div>
            </div>

            {/* Mini strip */}
            <div style={{ marginTop:16, display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:10 }}>
              {miniStrip.map((item) => (
                <div
                  key={item.label}
                  className="strip-pill"
                  onMouseEnter={() => setHovStrip(item.label)}
                  onMouseLeave={() => setHovStrip(null)}
                  style={{
                    background: hovStrip === item.label ? item.accent : item.bg,
                    border: `1.5px solid ${hovStrip === item.label ? item.accent : item.border}`,
                    boxShadow: hovStrip === item.label ? `0 8px 24px ${item.accent}30` : "0 2px 8px rgba(15,23,42,0.06)",
                  }}
                >
                  <p style={{
                    margin:0, fontSize:12, fontWeight:700,
                    letterSpacing:2, textTransform:"uppercase",
                    color: hovStrip === item.label ? "#fff" : item.accent,
                    transition:"color .3s",
                  }}>{item.label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* ── RIGHT CONTENT ── */}
          <div
            ref={rightRef}
            className={`tvs-right ${rightInView ? "in" : ""}`}
            style={{ flex:"1 1 340px", minWidth:300, display:"flex", flexDirection:"column", gap:22 }}
          >

            {/* Eyebrow */}
            <div className={`tvs-reveal d0 ${rightInView ? "in" : ""}`} style={{
              display:"inline-flex", alignItems:"center", gap:9,
              padding:"6px 18px", borderRadius:999,
              border:"1px solid #bfdbfe", background:"#eff6ff",
              alignSelf:"flex-start",
            }}>
              <span className="p-dot" />
              <span style={{ fontSize:11, fontWeight:700, letterSpacing:4, textTransform:"uppercase", color:"#1d4ed8" }}>
                Premium TV Services
              </span>
            </div>

            {/* Heading */}
            <div className={`tvs-reveal d1 ${rightInView ? "in" : ""}`}>
              <h2 style={{
                fontFamily:"'Bebas Neue',sans-serif",
                fontSize:"clamp(38px,5vw,62px)",
                color:"#0f172a", textTransform:"uppercase",
                lineHeight:1.05, letterSpacing:5, margin:0,
              }}>
                Get Started with the{" "}
                <span style={{ position:"relative", color:"#2563eb" }}>
                  Best TV Services
                  <span className={`draw-u ${rightInView ? "on" : ""}`} />
                </span>{" "}Today!
              </h2>
            </div>

            {/* Tagline */}
            <div className={`tvs-reveal d2 ${rightInView ? "in" : ""}`} style={{ display:"flex", alignItems:"center", gap:10 }}>
              <span style={{ width:28, height:2, background:"linear-gradient(90deg,#2563eb,transparent)", borderRadius:9999, flexShrink:0 }} />
              <p style={{ margin:0, color:"#64748b", fontSize:12, fontWeight:600, letterSpacing:3.5, textTransform:"uppercase", fontStyle:"italic" }}>
                Experts Ready to Serve You
              </p>
            </div>

            {/* Divider */}
            <div className={`div-draw ${rightInView ? "on" : ""}`} />

            {/* Body */}
            <div className={`tvs-reveal d2 ${rightInView ? "in" : ""}`}>
              <p style={{ margin:0, color:"#64748b", fontSize:15, lineHeight:1.8 }}>
                Ready to enhance your TV viewing experience? Contact our experts to find the perfect service for your home. Whether you need a{" "}
                <strong style={{ color:"#1e293b" }}>comprehensive repair</strong> or a{" "}
                <strong style={{ color:"#2563eb" }}>flexible same-day solution</strong>, we help you get back to watching — fast.
              </p>
            </div>

            {/* Feature rows */}
            <div className={`tvs-reveal d3 ${rightInView ? "in" : ""}`} style={{ display:"flex", flexDirection:"column", gap:10 }}>
              {features.map((feat, i) => {
                const Icon = feat.icon;
                const isHov = hovFeat === feat.id;
                return (
                  <div
                    key={feat.id}
                    className="feat-row"
                    onMouseEnter={() => setHovFeat(feat.id)}
                    onMouseLeave={() => setHovFeat(null)}
                    style={{
                      background: isHov
                        ? `linear-gradient(135deg,${feat.light},#fff)`
                        : "#fff",
                      border: `1.5px solid ${isHov ? feat.border : "#e2e8f0"}`,
                      boxShadow: isHov
                        ? `0 12px 36px ${feat.accent}22, 0 0 0 1px ${feat.border}`
                        : "0 2px 12px rgba(15,23,42,0.06)",
                    }}
                  >
                    <div className="feat-icon-box" style={{
                      background: isHov ? feat.iconBg : "#f1f5f9",
                      border:`1px solid ${isHov ? feat.border : "#e2e8f0"}`,
                    }}>
                      <Icon size={18} color={isHov ? feat.accent : "#64748b"} style={{ transition:"color .35s" }} />
                    </div>
                    <div style={{ flex:1 }}>
                      <h3 style={{
                        margin:"0 0 4px",
                        fontFamily:"'Bebas Neue',sans-serif",
                        fontSize:18, letterSpacing:1.5, textTransform:"uppercase",
                        color: isHov ? feat.accent : "#1e293b",
                        transition:"color .35s",
                      }}>{feat.title}</h3>
                      <p style={{
                        margin:0, fontSize:13.5, lineHeight:1.7, fontWeight:300,
                        color: isHov ? "#475569" : "#94a3b8",
                        transition:"color .35s",
                      }}>{feat.description}</p>
                    </div>
                    <div style={{
                      flexShrink:0, alignSelf:"center",
                      width:32, height:32, borderRadius:"50%",
                      display:"flex", alignItems:"center", justifyContent:"center",
                      background: isHov ? `${feat.accent}18` : "transparent",
                      border:`1px solid ${isHov ? feat.border : "transparent"}`,
                      opacity: isHov ? 1 : 0,
                      transform: isHov ? "translateX(0) rotate(0)" : "translateX(8px) rotate(-45deg)",
                      transition:"all .4s cubic-bezier(.22,1,.36,1)",
                    }}>
                      <ArrowUpRight size={15} color={feat.accent} />
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Divider */}
            <div className={`div-draw ${rightInView ? "on" : ""}`} style={{ transitionDelay:".5s" }} />

            {/* CTA Buttons */}
            <div className={`tvs-reveal d4 ${rightInView ? "in" : ""}`} style={{
              display:"flex", alignItems:"center", gap:12, flexWrap:"wrap",
            }}>
              <button className="btn-primary">
                <MessageSquare size={15} />
                Contact Our Experts
              </button>
              <button className="btn-ghost">
                <Phone size={14} />
                Call Us Now
                <ArrowUpRight size={14} />
              </button>
            </div>

          </div>
        </div>
      </section>
    </>
  );
}