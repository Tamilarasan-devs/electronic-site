import React, { useEffect, useRef, useState } from "react";
import { Tv, Users, Star, BadgeCheck, ArrowUpRight, Phone, CalendarCheck } from "lucide-react";

const stats = [
  {
    id: 1, icon: Tv, value: "5K+", label: "Projects Completed", sub: "Successful TV repairs done",
    accent: "#2563eb", glow: "rgba(37,99,235,0.18)", light: "#eff6ff", border: "#bfdbfe",
    iconBg: "#dbeafe", tag: "Repairs",
  },
  {
    id: 2, icon: Users, value: "29K+", label: "Service Experts", sub: "Certified trained technicians",
    accent: "#0891b2", glow: "rgba(8,145,178,0.18)", light: "#ecfeff", border: "#a5f3fc",
    iconBg: "#cffafe", tag: "Team",
  },
  {
    id: 3, icon: Star, value: "9K+", label: "Satisfied Customers", sub: "Happy clients across Coimbatore",
    accent: "#7c3aed", glow: "rgba(124,58,237,0.18)", light: "#f5f3ff", border: "#ddd6fe",
    iconBg: "#ede9fe", tag: "Clients",
  },
  {
    id: 4, icon: BadgeCheck, value: "74%", label: "Service Quality", sub: "Rated excellent by customers",
    accent: "#0d9488", glow: "rgba(13,148,136,0.18)", light: "#f0fdfa", border: "#99f6e4",
    iconBg: "#ccfbf1", tag: "Quality",
  },
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

function AnimatedCounter({ target, inView, delay = 0 }) {
  const [display, setDisplay] = useState("0");
  useEffect(() => {
    if (!inView) return;
    const numPart = parseInt(target);
    if (isNaN(numPart)) { setTimeout(() => setDisplay(target), delay); return; }
    const suffix = target.replace(/[0-9]/g, "");
    let start = 0;
    const t = setTimeout(() => {
      const step = Math.ceil(numPart / (1500 / 16));
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

function ProgressBar({ inView, color, delay = 0 }) {
  const [width, setWidth] = useState(0);
  useEffect(() => {
    if (!inView) return;
    const t = setTimeout(() => setWidth(100), delay + 200);
    return () => clearTimeout(t);
  }, [inView]);
  return (
    <div style={{
      flex: 1, height: 3, borderRadius: 9999,
      background: "rgba(0,0,0,0.07)", overflow: "hidden",
    }}>
      <div style={{
        height: "100%", width: `${width}%`,
        background: `linear-gradient(90deg, ${color}88, ${color})`,
        borderRadius: 9999,
        transition: "width 1s cubic-bezier(.22,1,.36,1)",
      }} />
    </div>
  );
}

export default function StatsSection() {
  const [headerRef, headerInView] = useInView(0.2);
  const [gridRef,   gridInView]   = useInView(0.1);
  const [ctaRef,    ctaInView]    = useInView(0.2);
  const [hovered,   setHovered]   = useState(null);

  return (
    <>
      <style>{`
        /* ── Scroll reveal ── */
        .ss-reveal {
          opacity: 0; transform: translateY(44px);
          transition: opacity .7s cubic-bezier(.22,1,.36,1), transform .7s cubic-bezier(.22,1,.36,1);
        }
        .ss-reveal.in { opacity: 1; transform: translateY(0); }
        .d0 { transition-delay: 0s    !important; }
        .d1 { transition-delay: 0.1s  !important; }
        .d2 { transition-delay: 0.2s  !important; }
        .d3 { transition-delay: 0.3s  !important; }
        .d4 { transition-delay: 0.42s !important; }
        .d5 { transition-delay: 0.54s !important; }

        /* ── Breathe dot bg ── */
        @keyframes dotBreathe { 0%,100%{opacity:.3} 50%{opacity:.55} }
        .dot-bg { animation: dotBreathe 5s ease-in-out infinite; }

        /* ── Pulse ring ── */
        @keyframes pulseRing {
          0%   { transform:scale(1); opacity:.85; }
          80%  { transform:scale(2.5); opacity:0; }
          100% { transform:scale(2.5); opacity:0; }
        }
        .p-dot {
          position:relative; width:8px; height:8px;
          border-radius:50%; flex-shrink:0;
        }
        .p-dot::after {
          content:''; position:absolute; inset:0; border-radius:50%;
          animation: pulseRing 2s ease-out infinite;
        }

        /* ── Heading underline draw ── */
        .draw-u {
          position:absolute; bottom:-5px; left:0; right:0;
          height:3px; border-radius:9999px;
          transform:scaleX(0); transform-origin:left;
          transition:transform .9s cubic-bezier(.22,1,.36,1) .55s;
        }
        .draw-u.on { transform:scaleX(1); }

        /* ── Stat card ── */
        .stat-card {
          position:relative; border-radius:26px;
          padding:32px 28px;
          display:flex; flex-direction:column; gap:18px;
          cursor:default; overflow:hidden;
          transition: transform .45s cubic-bezier(.22,1,.36,1),
                      box-shadow .45s ease,
                      border-color .4s;
        }
        .stat-card:hover { transform: translateY(-10px) scale(1.015); }

        /* Shimmer sweep */
        .stat-card::after {
          content:''; position:absolute;
          top:0; left:-100%; width:55%; height:100%;
          background:linear-gradient(105deg,transparent,rgba(255,255,255,0.55),transparent);
          transition:left .65s ease; pointer-events:none;
        }
        .stat-card:hover::after { left:150%; }

        /* Icon box */
        .s-icon-box {
          width:50px; height:50px; border-radius:14px;
          display:flex; align-items:center; justify-content:center;
          transition:transform .4s cubic-bezier(.22,1,.36,1);
        }
        .stat-card:hover .s-icon-box { transform:rotate(-8deg) scale(1.12); }

        /* Arrow orb */
        .s-arrow {
          width:36px; height:36px; border-radius:50%;
          display:flex; align-items:center; justify-content:center;
          opacity:0; transform:translateY(8px) rotate(-45deg);
          transition:opacity .4s, transform .4s cubic-bezier(.22,1,.36,1);
          flex-shrink:0;
        }
        .stat-card:hover .s-arrow { opacity:1; transform:translateY(0) rotate(0); }

        /* Watermark */
        .s-wm {
          position:absolute; bottom:4px; right:12px;
       font-size:110px; line-height:1;
          pointer-events:none; user-select:none; transition:opacity .4s;
        }

        /* ── CTA strip ── */
        .cta-strip {
          border-radius:24px; padding:32px 36px;
          display:flex; flex-direction:row;
          align-items:center; justify-content:space-between; gap:24px;
          flex-wrap:wrap; position:relative; overflow:hidden;
          transition: box-shadow .4s;
        }
        .cta-strip:hover { box-shadow: 0 24px 60px rgba(37,99,235,0.15); }

        /* ── CTA Buttons ── */
        .btn-book {
          display:inline-flex; align-items:center; gap:8px;
          padding:13px 28px; border-radius:999px;
   font-size:12px; font-weight:700;
          letter-spacing:3px; text-transform:uppercase;
          color:#fff; border:none; cursor:pointer; overflow:hidden; position:relative;
          transition:transform .3s cubic-bezier(.22,1,.36,1), box-shadow .3s;
        }
        .btn-book::after {
          content:''; position:absolute; inset:0;
          background:linear-gradient(105deg,transparent 35%,rgba(255,255,255,0.18) 50%,transparent 65%);
          transform:translateX(-100%); transition:transform .5s;
        }
        .btn-book:hover { transform:translateY(-3px); }
        .btn-book:hover::after { transform:translateX(100%); }

        .btn-call {
          display:inline-flex; align-items:center; gap:8px;
          padding:13px 22px; border-radius:999px;
 font-size:12px; font-weight:700;
          letter-spacing:3px; text-transform:uppercase; cursor:pointer;
          border:none;
          transition:transform .3s cubic-bezier(.22,1,.36,1), box-shadow .3s;
        }
        .btn-call:hover { transform:translateY(-3px); }
        .btn-call svg { transition:transform .3s cubic-bezier(.22,1,.36,1); }
        .btn-call:hover svg { transform:translateX(4px); }
      `}</style>

      <section className="ss" style={{
        width:"100%", background:"#f8faff",
        padding:"96px 24px", position:"relative", overflow:"hidden",
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
          background:"linear-gradient(90deg,#2563eb,#0891b2,#7c3aed,#0d9488)",
        }} />

        {/* Ambient glows */}
        <div style={{
          position:"absolute", top:"-8%", left:"50%", transform:"translateX(-50%)",
          width:900, height:500, borderRadius:"50%",
          background:"radial-gradient(ellipse,rgba(37,99,235,0.09) 0%,transparent 65%)",
          pointerEvents:"none",
        }} />
        <div style={{
          position:"absolute", bottom:0, left:0, width:450, height:450,
          borderRadius:"50%",
          background:"radial-gradient(ellipse,rgba(8,145,178,0.08) 0%,transparent 70%)",
          pointerEvents:"none",
        }} />
        <div style={{
          position:"absolute", bottom:0, right:0, width:450, height:450,
          borderRadius:"50%",
          background:"radial-gradient(ellipse,rgba(124,58,237,0.07) 0%,transparent 70%)",
          pointerEvents:"none",
        }} />

        <div style={{ position:"relative", maxWidth:1200, margin:"0 auto" }}>

          {/* ── HEADER ── */}
          <div ref={headerRef} style={{
            textAlign:"center", marginBottom:72,
            display:"flex", flexDirection:"column", alignItems:"center", gap:18,
          }}>

            <div className={`ss-reveal d0 ${headerInView ? "in" : ""}`} style={{
              display:"inline-flex", alignItems:"center", gap:10,
              padding:"7px 20px", borderRadius:999,
              border:"1px solid #bfdbfe", background:"#eff6ff",
            }}>
              <span className="p-dot" style={{ background:"#2563eb" }}>
                <style>{`.p-dot::after{background:#2563eb}`}</style>
              </span>
              <span style={{
                fontSize:11, fontWeight:700, letterSpacing:5,
                textTransform:"uppercase", color:"#1d4ed8",
              }}>Numbers That Speak</span>
            </div>

            <div className={`ss-reveal d1 ${headerInView ? "in" : ""}`}>
              <h2 style={{
                
                fontSize:"clamp(50px,8vw,88px)",
                color:"#0f172a", textTransform:"uppercase",
                lineHeight:1, letterSpacing:8, margin:0,
              }}>
                Our{" "}
                <span style={{ position:"relative", color:"#2563eb" }}>
                  Achievements
                  <span
                    className={`draw-u ${headerInView ? "on" : ""}`}
                    style={{ background:"linear-gradient(90deg,#2563eb,#7c3aed)" }}
                  />
                </span>
              </h2>
            </div>

            <div className={`ss-reveal d2 ${headerInView ? "in" : ""}`} style={{
              display:"flex", alignItems:"center", gap:12,
            }}>
              <span style={{ width:32, height:2, background:"linear-gradient(90deg,#2563eb,transparent)", borderRadius:9999 }} />
              <p style={{
                margin:0, color:"#64748b", fontSize:13, fontWeight:600,
                letterSpacing:4, textTransform:"uppercase", fontStyle:"italic",
              }}>
                Trusted by Thousands for Top-Notch Service
              </p>
              <span style={{ width:32, height:2, background:"linear-gradient(90deg,transparent,#7c3aed)", borderRadius:9999 }} />
            </div>
          </div>

          {/* ── STATS GRID ── */}
          <div ref={gridRef} style={{
            display:"grid",
            gridTemplateColumns:"repeat(auto-fit,minmax(240px,1fr))",
            gap:20,
          }}>
            {stats.map((stat, i) => {
              const Icon = stat.icon;
              const isHov = hovered === stat.id;
              return (
                <div
                  key={stat.id}
                  className={`stat-card ss-reveal d${i + 1} ${gridInView ? "in" : ""}`}
                  onMouseEnter={() => setHovered(stat.id)}
                  onMouseLeave={() => setHovered(null)}
                  style={{
                    background: isHov
                      ? `linear-gradient(145deg,${stat.light},#fff)`
                      : "#fff",
                    border: `1.5px solid ${isHov ? stat.border : "#e2e8f0"}`,
                    boxShadow: isHov
                      ? `0 24px 64px ${stat.glow}, 0 0 0 1px ${stat.border}`
                      : "0 2px 16px rgba(15,23,42,0.07)",
                  }}
                >
                  {/* Watermark */}
                  <span className="s-wm" style={{
                    color: isHov ? `${stat.accent}0d` : "rgba(15,23,42,0.04)",
                  }}>0{stat.id}</span>

                  {/* Top row: icon + tag */}
                  <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between" }}>
                    <div className="s-icon-box" style={{
                      background: stat.iconBg,
                      border: `1px solid ${stat.border}`,
                    }}>
                      <Icon size={22} color={stat.accent} />
                    </div>
                    <span style={{
                      fontSize:10, fontWeight:700, letterSpacing:3,
                      textTransform:"uppercase", borderRadius:999,
                      padding:"4px 12px",
                      background: isHov ? `${stat.accent}15` : "#f1f5f9",
                      border: `1px solid ${isHov ? stat.border : "#e2e8f0"}`,
                      color: isHov ? stat.accent : "#94a3b8",
                      transition:"all .4s",
                    }}>
                      {stat.tag}
                    </span>
                  </div>

                  {/* Divider */}
                  <div style={{
                    width:"100%", height:1,
                    background: isHov ? `${stat.accent}25` : "#f1f5f9",
                    transition:"background .4s",
                  }} />

                  {/* Values */}
                  <div style={{ display:"flex", flexDirection:"column", gap:5 }}>
                    <div style={{
                      
                      fontSize:"clamp(52px,6vw,68px)", lineHeight:1,
                      color: isHov ? stat.accent : "#0f172a",
                      transition:"color .4s",
                    }}>
                      <AnimatedCounter target={stat.value} inView={gridInView} delay={i * 120} />
                    </div>
                    <p style={{
                      margin:0, fontSize:15, fontWeight:700,
                      color: isHov ? "#0f172a" : "#1e293b",
                      letterSpacing:.5, transition:"color .4s",
                    }}>
                      {stat.label}
                    </p>
                    <p style={{
                      margin:0, fontSize:13, fontWeight:400, lineHeight:1.6,
                      color: isHov ? "#475569" : "#94a3b8",
                      transition:"color .4s",
                    }}>
                      {stat.sub}
                    </p>
                  </div>

                  {/* Progress bar + arrow */}
                  <div style={{ marginTop:"auto", display:"flex", alignItems:"center", gap:10 }}>
                    <ProgressBar inView={gridInView} color={stat.accent} delay={i * 120} />
                    <div className="s-arrow" style={{
                      background:`${stat.accent}18`,
                      border:`1px solid ${stat.border}`,
                    }}>
                      <ArrowUpRight size={16} color={stat.accent} />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* ── CTA STRIP ── */}
          <div
            ref={ctaRef}
            className={`cta-strip ss-reveal d1 ${ctaInView ? "in" : ""}`}
            style={{
              marginTop:28,
              background:"#fff",
              border:"1.5px solid #e2e8f0",
              boxShadow:"0 4px 24px rgba(15,23,42,0.07)",
            }}
          >
            {/* Left accent bar */}
            <div style={{
              position:"absolute", left:0, top:0, bottom:0, width:4, borderRadius:"24px 0 0 24px",
              background:"linear-gradient(180deg,#2563eb,#7c3aed)",
            }} />

            {/* Soft bg wash */}
            <div style={{
              position:"absolute", inset:0,
              background:"linear-gradient(90deg,rgba(239,246,255,0.7),transparent,rgba(245,243,255,0.5))",
              pointerEvents:"none", borderRadius:22,
            }} />

            <div style={{ position:"relative", paddingLeft:16 }}>
              <p style={{
                margin:"0 0 4px",
                
                fontSize:26, letterSpacing:2, color:"#0f172a",
              }}>
                Ready to join our success story?
              </p>
              <p style={{ margin:0, fontSize:14, color:"#64748b", fontWeight:400 }}>
                Book a repair today and experience the KJ Electronics difference.
              </p>
            </div>

            <div style={{ position:"relative", display:"flex", alignItems:"center", gap:12, flexShrink:0 }}>
              <button className="btn-book" style={{
                background:"linear-gradient(135deg,#2563eb,#1d4ed8)",
                boxShadow:"0 8px 28px rgba(37,99,235,0.35)",
              }}>
                <CalendarCheck size={15} />
                Book a Repair
              </button>
              <button className="btn-call" style={{
                background:"linear-gradient(135deg,#eff6ff,#dbeafe)",
                color:"#1d4ed8",
                border:"1.5px solid #bfdbfe",
                boxShadow:"0 4px 14px rgba(37,99,235,0.12)",
              }}>
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