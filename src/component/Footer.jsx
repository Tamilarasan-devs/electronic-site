import React, { useEffect, useRef, useState } from "react";
import {
  Facebook, Twitter, Instagram, Youtube,
  Phone, MapPin, Mail, Tv2, ArrowUpRight,
  ChevronRight, Zap
} from "lucide-react";

const quickLinks = ["Home", "About Us", "Services", "Brands", "Reviews", "Contact"];
const services   = ["Panel Repair", "PCB Repair", "Spare Parts", "Home Service", "Free Diagnosis"];
const brands     = ["Samsung", "LG", "Sony", "Philips", "Panasonic", "MI", "OnePlus", "TCL"];

const socials = [
  { Icon: Facebook,  href: "#", label: "Facebook",  accent: "#60a5fa" },
  { Icon: Twitter,   href: "#", label: "Twitter",   accent: "#22d3ee" },
  { Icon: Instagram, href: "#", label: "Instagram", accent: "#f472b6" },
  { Icon: Youtube,   href: "#", label: "YouTube",   accent: "#f87171" },
];

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

function LinkItem({ label, delay = 0, inView }) {
  const [hov, setHov] = useState(false);
  return (
    <li
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        display: "flex", alignItems: "center", gap: 8,
        padding: "6px 0", cursor: "pointer",
        opacity: inView ? 1 : 0,
        transform: inView ? "translateX(0)" : "translateX(-20px)",
        transition: `opacity .6s cubic-bezier(.22,1,.36,1) ${delay}ms, transform .6s cubic-bezier(.22,1,.36,1) ${delay}ms`,
      }}
    >
      <ChevronRight
        size={13}
        style={{
          color: hov ? "#60a5fa" : "rgba(96,165,250,0.3)",
          transform: hov ? "translateX(4px)" : "none",
          transition: "all .3s cubic-bezier(.22,1,.36,1)",
          flexShrink: 0,
        }}
      />
      <span style={{
        fontSize: 14, fontWeight: hov ? 600 : 400,
        color: hov ? "#e2e8f0" : "rgba(148,163,184,0.85)",
        transition: "color .3s, font-weight .2s",
        letterSpacing: 0.3,
      }}>
        {label}
      </span>
    </li>
  );
}

function SocialBtn({ Icon, href, label, accent }) {
  const [hov, setHov] = useState(false);
  return (
    <a
      href={href}
      aria-label={label}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        width: 42, height: 42, borderRadius: 12,
        display: "flex", alignItems: "center", justifyContent: "center",
        background: hov ? `${accent}22` : "rgba(96,165,250,0.08)",
        border: `1.5px solid ${hov ? accent + "55" : "rgba(96,165,250,0.15)"}`,
        color: hov ? accent : "rgba(148,163,184,0.7)",
        textDecoration: "none",
        transition: "all .35s cubic-bezier(.22,1,.36,1)",
        transform: hov ? "translateY(-5px) scale(1.1)" : "none",
        boxShadow: hov ? `0 8px 20px ${accent}30` : "none",
      }}
    >
      <Icon size={16} />
    </a>
  );
}

export default function Footer() {
  const [colRef, colInView] = useInView(0.1);
  const [botRef, botInView] = useInView(0.2);
  const [hovLogo, setHovLogo] = useState(false);

  return (
    <>
      <style>{`
        .ft * { box-sizing: border-box; }

        /* Dot bg */
        @keyframes dotPulse { 0%,100%{opacity:.15} 50%{opacity:.3} }
        .ft-dots { animation: dotPulse 6s ease-in-out infinite; }

        /* Divider draw */
        .ft-div-draw {
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(96,165,250,.25), rgba(167,139,250,.2), transparent);
          width: 0; transition: width 1.2s cubic-bezier(.22,1,.36,1) .2s;
        }
        .ft-div-draw.on { width: 100%; }

        /* Top bar */
        @keyframes barGrow { from{transform:scaleX(0)} to{transform:scaleX(1)} }
        .ft-top-bar {
          height: 4px;
          background: linear-gradient(90deg, #60a5fa, #22d3ee, #a78bfa, #f472b6);
          transform-origin: left;
          animation: barGrow .9s cubic-bezier(.22,1,.36,1) .2s both;
        }

        /* Brand pill hover */
        .brand-tag {
          font-size: 11px; font-weight: 700;
          letter-spacing: 2px; text-transform: uppercase;
          border-radius: 999px; padding: 4px 12px;
          cursor: default;
          transition: all .3s cubic-bezier(.22,1,.36,1);
        }

        /* Contact row */
        .contact-row {
          display: flex; align-items: center; gap: 12; cursor: default;
          transition: transform .3s cubic-bezier(.22,1,.36,1);
        }
        .contact-row:hover { transform: translateX(4px); }

        /* Scroll-to-top btn */
        .back-top {
          width: 40px; height: 40px; border-radius: 12px;
          display: flex; align-items: center; justify-content: center;
          background: rgba(96,165,250,0.12);
          border: 1.5px solid rgba(96,165,250,0.2);
          cursor: pointer;
          transition: all .35s cubic-bezier(.22,1,.36,1);
        }
        .back-top:hover {
          background: rgba(96,165,250,0.25);
          border-color: rgba(96,165,250,0.4);
          transform: translateY(-4px);
          box-shadow: 0 8px 20px rgba(96,165,250,0.2);
        }

        /* Bottom reveal */
        .bt-reveal {
          opacity: 0; transform: translateY(24px);
          transition: opacity .7s cubic-bezier(.22,1,.36,1), transform .7s cubic-bezier(.22,1,.36,1);
        }
        .bt-reveal.on { opacity: 1; transform: translateY(0); }

        /* Pulse dot */
        @keyframes pRing { 0%{transform:scale(1);opacity:.9} 80%{transform:scale(2.4);opacity:0} 100%{transform:scale(2.4);opacity:0} }
        .pdot { position:relative;width:7px;height:7px;border-radius:50%;background:#60a5fa;flex-shrink:0; }
        .pdot::after { content:'';position:absolute;inset:0;border-radius:50%;background:#60a5fa;animation:pRing 2s ease-out infinite; }
      `}</style>

      <footer className="ft" style={{
        background: "#0a1628",
        position: "relative", overflow: "hidden",
      }}>

        {/* Top gradient bar */}
        <div className="ft-top-bar" />

        {/* Dot bg */}
        <div className="ft-dots" style={{
          position: "absolute", inset: 0, pointerEvents: "none",
          backgroundImage: "radial-gradient(circle, rgba(96,165,250,0.35) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }} />

        {/* Ambient glows */}
        <div style={{
          position: "absolute", top: 0, left: "20%", width: 600, height: 400, borderRadius: "50%",
          background: "radial-gradient(ellipse,rgba(96,165,250,0.07) 0%,transparent 65%)",
          pointerEvents: "none",
        }} />
        <div style={{
          position: "absolute", bottom: 0, right: "10%", width: 500, height: 400, borderRadius: "50%",
          background: "radial-gradient(ellipse,rgba(167,139,250,0.06) 0%,transparent 70%)",
          pointerEvents: "none",
        }} />

        {/* ── MAIN CONTENT ── */}
        <div
          ref={colRef}
          style={{
            position: "relative", zIndex: 1,
            maxWidth: 1200, margin: "0 auto",
            padding: "64px 24px 48px",
            display: "grid",
            gridTemplateColumns: "2fr 1fr 1fr 1.5fr",
            gap: 48,
          }}
        >

          {/* ── COL 1: Brand ── */}
          <div style={{
            opacity: colInView ? 1 : 0, transform: colInView ? "translateY(0)" : "translateY(36px)",
            transition: "opacity .7s cubic-bezier(.22,1,.36,1) .1s, transform .7s cubic-bezier(.22,1,.36,1) .1s",
          }}>
            {/* Logo */}
            <div
              onMouseEnter={() => setHovLogo(true)}
              onMouseLeave={() => setHovLogo(false)}
              style={{ display: "inline-flex", alignItems: "center", gap: 10, marginBottom: 20, cursor: "default" }}
            >
              <div style={{
                width: 44, height: 44, borderRadius: 14,
                background: hovLogo ? "linear-gradient(135deg,#2563eb,#1d4ed8)" : "rgba(96,165,250,0.12)",
                border: `1.5px solid ${hovLogo ? "#3b82f6" : "rgba(96,165,250,0.2)"}`,
                display: "flex", alignItems: "center", justifyContent: "center",
                transition: "all .35s cubic-bezier(.22,1,.36,1)",
                transform: hovLogo ? "rotate(-6deg) scale(1.08)" : "none",
                boxShadow: hovLogo ? "0 8px 22px rgba(37,99,235,0.35)" : "none",
              }}>
                <Tv2 size={22} color={hovLogo ? "#fff" : "#60a5fa"} />
              </div>
              <div>
                <span style={{
                  fontSize: 28, letterSpacing: 4,
                  color: "#f1f5f9", lineHeight: 1,
                }}>KJ Electronics</span>
                <div style={{ fontSize: 9, letterSpacing: 4, textTransform: "uppercase", color: "rgba(96,165,250,0.6)", marginTop: 1 }}>
                  Coimbatore
                </div>
              </div>
            </div>

            <p style={{
              margin: "0 0 24px", fontSize: 14, lineHeight: 1.8,
              color: "rgba(148,163,184,0.8)", maxWidth: 300, fontWeight: 400,
            }}>
              Coimbatore's most trusted LED &amp; LCD TV repair center — expert technicians, genuine parts, and same-day service since 2014.
            </p>

            {/* Contact info */}
            <div style={{ display: "flex", flexDirection: "column", gap: 12, marginBottom: 28 }}>
              {[
                { icon: Phone,  text: "+91 98765 43210", accent: "#60a5fa" },
                { icon: Mail,   text: "kjelectronics@gmail.com", accent: "#22d3ee" },
                { icon: MapPin, text: "Coimbatore, Tamil Nadu", accent: "#a78bfa" },
              ].map(({ icon: Icon, text, accent }) => (
                <div key={text} className="contact-row" style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <div style={{
                    width: 32, height: 32, borderRadius: 10,
                    background: `${accent}18`,
                    border: `1px solid ${accent}33`,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    flexShrink: 0,
                  }}>
                    <Icon size={14} color={accent} />
                  </div>
                  <span style={{ fontSize: 13, color: "rgba(148,163,184,0.8)", fontWeight: 400 }}>{text}</span>
                </div>
              ))}
            </div>

            {/* Socials */}
            <div style={{ display: "flex", gap: 10 }}>
              {socials.map((s) => (
                <SocialBtn key={s.label} {...s} />
              ))}
            </div>
          </div>

          {/* ── COL 2: Quick Links ── */}
          <div style={{
            opacity: colInView ? 1 : 0, transform: colInView ? "translateY(0)" : "translateY(36px)",
            transition: "opacity .7s cubic-bezier(.22,1,.36,1) .2s, transform .7s cubic-bezier(.22,1,.36,1) .2s",
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 22 }}>
              <span className="pdot" />
              <span style={{ fontSize: 18, letterSpacing: 3, color: "#f1f5f9" }}>
                Quick Links
              </span>
            </div>
            <ul style={{ listStyle: "none", margin: 0, padding: 0 }}>
              {quickLinks.map((link, i) => (
                <LinkItem key={link} label={link} delay={i * 55} inView={colInView} />
              ))}
            </ul>
          </div>

          {/* ── COL 3: Services ── */}
          <div style={{
            opacity: colInView ? 1 : 0, transform: colInView ? "translateY(0)" : "translateY(36px)",
            transition: "opacity .7s cubic-bezier(.22,1,.36,1) .3s, transform .7s cubic-bezier(.22,1,.36,1) .3s",
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 22 }}>
              <span className="pdot" />
              <span style={{ fontSize: 18, letterSpacing: 3, color: "#f1f5f9" }}>
                Services
              </span>
            </div>
            <ul style={{ listStyle: "none", margin: 0, padding: 0 }}>
              {services.map((s, i) => (
                <LinkItem key={s} label={s} delay={i * 55 + 100} inView={colInView} />
              ))}
            </ul>
          </div>

          {/* ── COL 4: Brands + Newsletter ── */}
          <div style={{
            opacity: colInView ? 1 : 0, transform: colInView ? "translateY(0)" : "translateY(36px)",
            transition: "opacity .7s cubic-bezier(.22,1,.36,1) .4s, transform .7s cubic-bezier(.22,1,.36,1) .4s",
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 18 }}>
              <span className="pdot" />
              <span style={{  fontSize: 18, letterSpacing: 3, color: "#f1f5f9" }}>
                Brands We Fix
              </span>
            </div>

            <div style={{ display: "flex", flexWrap: "wrap", gap: 7, marginBottom: 28 }}>
              {brands.map((b, i) => {
                const [hov, setHov] = useState(false);
                const accents = ["#60a5fa","#22d3ee","#a78bfa","#34d399","#f472b6","#fb923c","#fbbf24","#f87171"];
                const a = accents[i % accents.length];
                return (
                  <span
                    key={b}
                    className="brand-tag"
                    onMouseEnter={() => setHov(true)}
                    onMouseLeave={() => setHov(false)}
                    style={{
                      background: hov ? `${a}22` : "rgba(96,165,250,0.08)",
                      border: `1px solid ${hov ? a + "55" : "rgba(96,165,250,0.15)"}`,
                      color: hov ? a : "rgba(148,163,184,0.7)",
                      transform: hov ? "translateY(-3px)" : "none",
                      boxShadow: hov ? `0 6px 16px ${a}25` : "none",
                    }}
                  >
                    {b}
                  </span>
                );
              })}
            </div>

            {/* Mini CTA */}
            <div style={{
              borderRadius: 18, padding: "18px 20px",
              background: "linear-gradient(135deg, rgba(37,99,235,0.18), rgba(124,58,237,0.12))",
              border: "1px solid rgba(96,165,250,0.2)",
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: 7, marginBottom: 8 }}>
                <Zap size={13} color="#fbbf24" />
                <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: 3, textTransform: "uppercase", color: "#fbbf24" }}>
                  Free Diagnosis
                </span>
              </div>
              <p style={{ margin: "0 0 12px", fontSize: 13, color: "rgba(226,232,240,0.8)", lineHeight: 1.6 }}>
                Walk in or call — we assess your TV for free before any repair begins.
              </p>
              <button style={{
                display: "inline-flex", alignItems: "center", gap: 7,
                padding: "9px 18px", borderRadius: 999,
                background: "linear-gradient(135deg,#2563eb,#1d4ed8)",
                color: "#fff", border: "none", cursor: "pointer",
                fontSize: 11, fontWeight: 700, letterSpacing: 2.5, textTransform: "uppercase",
                boxShadow: "0 6px 20px rgba(37,99,235,.35)",
                transition: "transform .3s, box-shadow .3s",
              }}
                onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = "0 10px 28px rgba(37,99,235,.48)"; }}
                onMouseLeave={e => { e.currentTarget.style.transform = "none"; e.currentTarget.style.boxShadow = "0 6px 20px rgba(37,99,235,.35)"; }}
              >
                Book Repair
                <ArrowUpRight size={13} />
              </button>
            </div>
          </div>
        </div>

        {/* ── DIVIDER ── */}
        <div style={{ position: "relative", zIndex: 1, padding: "0 24px" }}>
          <div style={{ maxWidth: 1200, margin: "0 auto" }}>
            <div
              className={`ft-div-draw ${colInView ? "on" : ""}`}
            />
          </div>
        </div>

        {/* ── BOTTOM BAR ── */}
        <div
          ref={botRef}
          style={{
            position: "relative", zIndex: 1,
            maxWidth: 1200, margin: "0 auto",
            padding: "20px 24px 28px",
            display: "flex", alignItems: "center",
            justifyContent: "space-between", flexWrap: "wrap", gap: 16,
          }}
        >
          <div className={`bt-reveal ${botInView ? "on" : ""}`} style={{ transitionDelay: ".1s" }}>
            <p style={{ margin: 0, fontSize: 13, color: "rgba(100,116,139,0.8)" }}>
              © 2026{" "}
              <span style={{ color: "#60a5fa", fontWeight: 600 }}>KJ Electronics</span>
              {" · "}Coimbatore, Tamil Nadu. All rights reserved.
            </p>
          </div>

          <div className={`bt-reveal ${botInView ? "on" : ""}`} style={{
            transitionDelay: ".2s",
            display: "flex", alignItems: "center", gap: 20,
          }}>
            {["Privacy Policy", "Terms of Service", "Support"].map((item, i) => {
              const [hov, setHov] = useState(false);
              return (
                <span
                  key={item}
                  onMouseEnter={() => setHov(true)}
                  onMouseLeave={() => setHov(false)}
                  style={{
                    fontSize: 12, fontWeight: hov ? 600 : 400,
                    color: hov ? "#93c5fd" : "rgba(100,116,139,0.75)",
                    cursor: "pointer", letterSpacing: 0.5,
                    transition: "color .25s, font-weight .2s",
                    textDecoration: hov ? "underline" : "none",
                  }}
                >
                  {item}
                </span>
              );
            })}
          </div>

          {/* Back to top */}
          <div className={`bt-reveal ${botInView ? "on" : ""}`} style={{ transitionDelay: ".3s" }}>
            <button
              className="back-top"
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              title="Back to top"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="rgba(96,165,250,0.8)" strokeWidth="2.5">
                <path d="M12 19V5M5 12l7-7 7 7" />
              </svg>
            </button>
          </div>
        </div>
      </footer>
    </>
  );
}