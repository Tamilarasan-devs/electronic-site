import React, { useEffect, useRef, useState } from "react";
import { ShieldCheck, Wrench, Handshake, ArrowUpRight, Clock, Package, Star } from "lucide-react";

const features = [
  {
    id: 1,
    icon: ShieldCheck,
    tag: "Guaranteed",
    title: "100% Quality Service",
    description:
      "We take pride in providing 100% quality assured service for all your smart TV needs. Our skilled technicians are dedicated to ensuring your TV is repaired to the highest standards — every single time.",
    stat: "100%",
    statLabel: "Satisfaction Rate",
    hoverFrom: "#1d4ed8",
    hoverTo: "#2563eb",
    hoverGlow: "rgba(59,130,246,0.45)",
    accentColor: "#60a5fa",
  },
  {
    id: 2,
    icon: Wrench,
    tag: "Expert Team",
    title: "Highly Skilled Technicians",
    description:
      "Our highly skilled technicians have years of experience repairing all smart TV brands. Trust our team to diagnose and fix any issue quickly, efficiently, and with precision.",
    stat: "10+",
    statLabel: "Years of Expertise",
    hoverFrom: "#0e7490",
    hoverTo: "#0891b2",
    hoverGlow: "rgba(6,182,212,0.45)",
    accentColor: "#22d3ee",
  },
  {
    id: 3,
    icon: Handshake,
    tag: "Reliable",
    title: "Your Trusted Service Partner",
    description:
      "We are committed to being your trusted service partner — providing reliable smart TV repair services with professionalism, transparency, and genuine care for every customer.",
    stat: "50K+",
    statLabel: "Happy Customers",
    hoverFrom: "#6d28d9",
    hoverTo: "#7c3aed",
    hoverGlow: "rgba(139,92,246,0.45)",
    accentColor: "#a78bfa",
  },
];

const trustItems = [
  { icon: Clock,   label: "Same-Day Service",    sub: "Repairs within 3 hours",    accent: "#3b82f6" },
  { icon: Package, label: "Original Spare Parts", sub: "No counterfeit components", accent: "#06b6d4" },
  { icon: Star,    label: "Warranty on Repairs",  sub: "Peace of mind guaranteed",  accent: "#8b5cf6" },
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
      const step = Math.ceil(numPart / (1600 / 16));
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

export default function WhyChoose() {
  const [headerRef, headerInView] = useInView(0.2);
  const [cardsRef,  cardsInView]  = useInView(0.1);
  const [trustRef,  trustInView]  = useInView(0.2);
  const [hoveredCard,  setHoveredCard]  = useState(null);
  const [hoveredTrust, setHoveredTrust] = useState(null);

  return (
    <>
      <style>{`
       


        .wc-reveal {
          opacity: 0; transform: translateY(48px);
          transition: opacity 0.75s cubic-bezier(.22,1,.36,1), transform 0.75s cubic-bezier(.22,1,.36,1);
        }
        .wc-reveal.in { opacity: 1; transform: translateY(0); }
        .d0 { transition-delay: 0s    !important; }
        .d1 { transition-delay: 0.12s !important; }
        .d2 { transition-delay: 0.22s !important; }
        .d3 { transition-delay: 0.32s !important; }
        .d4 { transition-delay: 0.44s !important; }
        .d5 { transition-delay: 0.56s !important; }

        /* Dot bg breathe */
        @keyframes dotBreathe { 0%,100%{opacity:.2} 50%{opacity:.4} }
        .dot-bg { animation: dotBreathe 6s ease-in-out infinite; }

        /* Pulse ring */
        @keyframes pulseRing {
          0%   { transform:scale(1); opacity:.9; }
          80%  { transform:scale(2.6); opacity:0; }
          100% { transform:scale(2.6); opacity:0; }
        }
        .pulse-dot {
          position:relative; width:8px; height:8px;
          border-radius:50%; background:#60a5fa; flex-shrink:0;
        }
        .pulse-dot::after {
          content:''; position:absolute; inset:0;
          border-radius:50%; background:#60a5fa;
          animation: pulseRing 2s ease-out infinite;
        }

        /* Heading underline draw */
        .draw-line {
          position:absolute; bottom:-5px; left:0; right:0;
          height:3px; border-radius:9999px;
          background:linear-gradient(90deg,#60a5fa,#a78bfa);
          transform:scaleX(0); transform-origin:left;
          transition:transform .9s cubic-bezier(.22,1,.36,1) .5s;
        }
        .draw-line.drawn { transform:scaleX(1); }

        /* Card shimmer sweep */
        .feat-card::after {
          content:''; position:absolute;
          top:0; left:-100%; width:55%; height:100%;
          background:linear-gradient(105deg,transparent,rgba(255,255,255,0.065),transparent);
          transition:left .65s ease; pointer-events:none;
          z-index:1;
        }
        .feat-card:hover::after { left:150%; }

        /* Icon box */
        .icon-box {
          width:56px; height:56px; border-radius:16px;
          display:flex; align-items:center; justify-content:center;
          transition:transform .45s cubic-bezier(.22,1,.36,1), background .4s, border-color .4s;
        }
        .feat-card:hover .icon-box { transform:rotate(-8deg) scale(1.12); }

        /* Arrow orb */
        .arrow-orb {
          width:40px; height:40px; border-radius:50%;
          display:flex; align-items:center; justify-content:center;
          opacity:0; transform:translateY(10px) rotate(-45deg);
          transition:opacity .4s, transform .4s cubic-bezier(.22,1,.36,1);
        }
        .feat-card:hover .arrow-orb { opacity:1; transform:translateY(0) rotate(0); }

        /* Watermark */
        .watermark {
          position:absolute; bottom:4px; right:14px;
          font-size:130px; line-height:1;
          pointer-events:none; user-select:none; color:rgba(255,255,255,0.04);
        }

        /* Trust card shimmer */
        .trust-card::after {
          content:''; position:absolute;
          top:0; left:-100%; width:55%; height:100%;
          background:linear-gradient(105deg,transparent,rgba(255,255,255,0.055),transparent);
          transition:left .55s ease; pointer-events:none;
        }
        .trust-card:hover::after { left:140%; }

        .trust-icon-wrap {
          width:46px; height:46px; border-radius:14px; flex-shrink:0;
          display:flex; align-items:center; justify-content:center;
          transition:transform .4s cubic-bezier(.22,1,.36,1), background .4s, border-color .4s;
        }
        .trust-card:hover .trust-icon-wrap { transform:scale(1.12) rotate(-6deg); }
      `}</style>

      <section className="wc" style={{
        width:"100%",
        background:"#0a1628",
        padding:"96px 24px",
        position:"relative",
        overflow:"hidden",
      }}>

        {/* Dot bg */}
        <div className="dot-bg" style={{
          position:"absolute", inset:0, pointerEvents:"none",
          backgroundImage:"radial-gradient(circle, rgba(96,165,250,0.3) 1px, transparent 1px)",
          backgroundSize:"28px 28px",
        }} />

        {/* Top gradient bar */}
        <div style={{
          position:"absolute", top:0, left:0, right:0, height:3,
          background:"linear-gradient(90deg,#3b82f6,#06b6d4,#8b5cf6)",
        }} />

        {/* Ambient glows */}
        <div style={{
          position:"absolute", top:"-5%", left:"50%", transform:"translateX(-50%)",
          width:1000, height:600, borderRadius:"50%",
          background:"radial-gradient(ellipse,rgba(59,130,246,0.1) 0%,transparent 65%)",
          pointerEvents:"none",
        }} />
        <div style={{
          position:"absolute", bottom:0, left:0,
          width:500, height:500, borderRadius:"50%",
          background:"radial-gradient(ellipse,rgba(6,182,212,0.08) 0%,transparent 70%)",
          pointerEvents:"none",
        }} />
        <div style={{
          position:"absolute", bottom:0, right:0,
          width:500, height:500, borderRadius:"50%",
          background:"radial-gradient(ellipse,rgba(139,92,246,0.08) 0%,transparent 70%)",
          pointerEvents:"none",
        }} />

        <div style={{ position:"relative", maxWidth:1200, margin:"0 auto" }}>

          {/* ── HEADER ── */}
          <div ref={headerRef} style={{
            textAlign:"center", marginBottom:80,
            display:"flex", flexDirection:"column", alignItems:"center", gap:18,
          }}>
            <div className={`wc-reveal d0 ${headerInView ? "in" : ""}`} style={{
              display:"inline-flex", alignItems:"center", gap:10,
              padding:"7px 20px", borderRadius:999,
              border:"1px solid rgba(96,165,250,0.25)",
              background:"rgba(30,58,138,0.3)",
              backdropFilter:"blur(8px)",
            }}>
              <span className="pulse-dot" />
              <span style={{
                fontSize:11, fontWeight:700, letterSpacing:5,
                textTransform:"uppercase", color:"#93c5fd",
              }}>Our Promise</span>
            </div>

            <div className={`wc-reveal d1 ${headerInView ? "in" : ""}`}>
              <h2 style={{
                fontSize:"clamp(52px,8vw,88px)",
                color:"#f1f5f9",
                textTransform:"uppercase",
                lineHeight:1, letterSpacing:8, margin:0,
              }}>
                Why{" "}
                <span style={{ position:"relative", color:"#60a5fa" }}>
                  Choose
                  <span className={`draw-line ${headerInView ? "drawn" : ""}`} />
                </span>{" "}
                Us
              </h2>
            </div>

            <div className={`wc-reveal d2 ${headerInView ? "in" : ""}`} style={{
              display:"flex", alignItems:"center", gap:12,
            }}>
              <span style={{ width:32, height:2, background:"linear-gradient(90deg,#3b82f6,transparent)", borderRadius:9999 }} />
              <p style={{
                margin:0, color:"rgba(148,163,184,0.8)", fontSize:13, fontWeight:600,
                letterSpacing:4, textTransform:"uppercase", fontStyle:"italic",
              }}>
                Experience Unmatched Service &amp; Expertise
              </p>
              <span style={{ width:32, height:2, background:"linear-gradient(90deg,transparent,#8b5cf6)", borderRadius:9999 }} />
            </div>
          </div>

          {/* ── CARDS ── */}
          <div ref={cardsRef} style={{
            display:"grid",
            gridTemplateColumns:"repeat(auto-fit,minmax(300px,1fr))",
            gap:24,
          }}>
            {features.map((item, i) => {
              const Icon = item.icon;
              const isHov = hoveredCard === item.id;
              return (
                <div
                  key={item.id}
                  className={`feat-card wc-reveal d${i + 2} ${cardsInView ? "in" : ""}`}
                  onMouseEnter={() => setHoveredCard(item.id)}
                  onMouseLeave={() => setHoveredCard(null)}
                  style={{
                    position:"relative",
                    borderRadius:28,
                    padding:"36px 32px",
                    display:"flex", flexDirection:"column", gap:22,
                    cursor:"default", overflow:"hidden",
                    background: isHov
                      ? `linear-gradient(145deg, ${item.hoverFrom}, ${item.hoverTo})`
                      : "linear-gradient(145deg, #1a2f50, #12233d)",
                    border: `1.5px solid ${isHov ? item.accentColor + "55" : "rgba(96,165,250,0.15)"}`,
                    boxShadow: isHov
                      ? `0 32px 80px ${item.hoverGlow}, 0 0 0 1px ${item.accentColor}22`
                      : "0 8px 32px rgba(0,0,0,0.5)",
                    transition:"transform .5s cubic-bezier(.22,1,.36,1), box-shadow .5s ease, background .5s ease, border-color .4s",
                    transform: isHov ? "translateY(-10px) scale(1.015)" : "translateY(0) scale(1)",
                  }}
                >
                  <span className="watermark">0{item.id}</span>

                  {/* Icon + tag */}
                  <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between" }}>
                    <div className="icon-box" style={{
                      background: isHov ? `${item.accentColor}22` : "rgba(96,165,250,0.1)",
                      border:`1px solid ${isHov ? item.accentColor + "44" : "rgba(96,165,250,0.2)"}`,
                    }}>
                      <Icon size={24} color={isHov ? item.accentColor : "#93c5fd"} />
                    </div>
                    <span style={{
                      fontSize:10, fontWeight:700,
                      letterSpacing:3, textTransform:"uppercase",
                      borderRadius:999, padding:"5px 14px",
                      background: isHov ? `${item.accentColor}22` : "rgba(96,165,250,0.1)",
                      border:`1px solid ${isHov ? item.accentColor + "44" : "rgba(96,165,250,0.2)"}`,
                      color: isHov ? item.accentColor : "#93c5fd",
                      transition:"all .4s",
                    }}>
                      {item.tag}
                    </span>
                  </div>

                  {/* Divider */}
                  <div style={{
                    width:"100%", height:1,
                    background: isHov ? `${item.accentColor}40` : "rgba(96,165,250,0.12)",
                    transition:"background .4s",
                  }} />

                  {/* Text */}
                  <div style={{ display:"flex", flexDirection:"column", gap:10 }}>
                    <h3 style={{
                      fontSize:26, letterSpacing:2,
                      textTransform:"uppercase", lineHeight:1.15,
                      color: isHov ? "#fff" : "#e2e8f0",
                      margin:0, transition:"color .4s",
                    }}>
                      {item.title}
                    </h3>
                    <p style={{
                      fontSize:14, lineHeight:1.8,
                      fontWeight:300, margin:0,
                      color: isHov ? "rgba(224,242,254,0.85)" : "rgba(148,163,184,0.85)",
                      transition:"color .4s",
                    }}>
                      {item.description}
                    </p>
                  </div>

                  {/* Stat + arrow */}
                  <div style={{ marginTop:"auto", display:"flex", alignItems:"flex-end", justifyContent:"space-between" }}>
                    <div>
                      <div style={{
                        fontSize:58, lineHeight:1,
                        color: isHov ? item.accentColor : "#f1f5f9",
                        transition:"color .4s",
                      }}>
                        <AnimatedCounter target={item.stat} inView={cardsInView} delay={i * 150} />
                      </div>
                      <div style={{
                        fontSize:10, fontWeight:700,
                        letterSpacing:3, textTransform:"uppercase",
                        color: isHov ? `${item.accentColor}cc` : "rgba(148,163,184,0.7)",
                        marginTop:4, transition:"color .4s",
                      }}>
                        {item.statLabel}
                      </div>
                    </div>
                    <div className="arrow-orb" style={{
                      background:`${item.accentColor}25`,
                      border:`1px solid ${item.accentColor}55`,
                    }}>
                      <ArrowUpRight size={18} color={item.accentColor} />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* ── TRUST STRIP ── */}
          <div ref={trustRef} style={{
            marginTop:28,
            display:"grid",
            gridTemplateColumns:"repeat(auto-fit,minmax(260px,1fr))",
            gap:16,
          }}>
            {trustItems.map((item, i) => {
              const Icon = item.icon;
              const isHov = hoveredTrust === item.label;
              return (
                <div
                  key={item.label}
                  className={`trust-card wc-reveal d${i + 1} ${trustInView ? "in" : ""}`}
                  onMouseEnter={() => setHoveredTrust(item.label)}
                  onMouseLeave={() => setHoveredTrust(null)}
                  style={{
                    display:"flex", alignItems:"center", gap:16,
                    borderRadius:20, padding:"20px 24px",
                    cursor:"default", overflow:"hidden", position:"relative",
                    background: isHov
                      ? `linear-gradient(135deg,${item.accent}28,${item.accent}12)`
                      : "linear-gradient(135deg,#1a2f50,#12233d)",
                    border:`1.5px solid ${isHov ? item.accent + "55" : "rgba(96,165,250,0.15)"}`,
                    boxShadow: isHov ? `0 16px 40px ${item.accent}28` : "0 4px 16px rgba(0,0,0,0.4)",
                    transition:"transform .4s cubic-bezier(.22,1,.36,1), box-shadow .4s, background .4s, border-color .4s",
                    transform: isHov ? "translateY(-5px)" : "translateY(0)",
                  }}
                >
                  <div className="trust-icon-wrap" style={{
                    background: isHov ? `${item.accent}25` : "rgba(96,165,250,0.1)",
                    border:`1px solid ${isHov ? item.accent + "50" : "rgba(96,165,250,0.2)"}`,
                  }}>
                    <Icon size={20} color={isHov ? item.accent : "#93c5fd"} />
                  </div>
                  <div>
                    <div style={{
                      fontSize:15, fontWeight:700,
                      color: isHov ? "#fff" : "#e2e8f0",
                      transition:"color .4s",
                    }}>
                      {item.label}
                    </div>
                    <div style={{
                      fontSize:12.5,
                      color: isHov ? "rgba(203,213,225,0.9)" : "rgba(148,163,184,0.75)",
                      marginTop:2, transition:"color .4s",
                    }}>
                      {item.sub}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </section>
    </>
  );
}