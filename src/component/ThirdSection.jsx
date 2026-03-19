import React, { useEffect, useRef, useState } from "react";

const stats = [
  { value: "10+", label: "Years Experience", icon: "⚡" },
  { value: "50K+", label: "TVs Repaired", icon: "📺" },
  { value: "3hr", label: "Same Day Service", icon: "🚀" },
  { value: "100%", label: "Original Parts", icon: "🛡️" },
];

const brands = [
  "Samsung", "Sony", "LG", "MI", "OnePlus",
  "Vu", "Philips", "Panasonic", "TCL", "Realme",
];

function useInView(threshold = 0.15) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setInView(true); },
      { threshold }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return [ref, inView];
}

function AnimatedCounter({ target, inView }) {
  const [count, setCount] = useState(0);
  const isNum = !isNaN(parseInt(target));
  const numPart = parseInt(target);
  const suffix = target.replace(/[0-9]/g, "");

  useEffect(() => {
    if (!inView || !isNum) return;
    let start = 0;
    const end = numPart;
    const duration = 1400;
    const step = Math.ceil(end / (duration / 16));
    const timer = setInterval(() => {
      start += step;
      if (start >= end) { setCount(end); clearInterval(timer); }
      else setCount(start);
    }, 16);
    return () => clearInterval(timer);
  }, [inView]);

  return <span>{isNum ? `${count}${suffix}` : target}</span>;
}

export default function ThirdSection() {
  const [sectionRef, sectionInView] = useInView(0.1);
  const [statsRef, statsInView] = useInView(0.2);
  const [hoveredBrand, setHoveredBrand] = useState(null);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Barlow:ital,wght@0,400;0,600;0,700;1,600&display=swap');

        .kj-section * { box-sizing: border-box; }

        /* ── Fade/slide in ── */
        .fade-up {
          opacity: 0;
          transform: translateY(40px);
          transition: opacity 0.7s cubic-bezier(.22,1,.36,1), transform 0.7s cubic-bezier(.22,1,.36,1);
        }
        .fade-up.visible { opacity: 1; transform: translateY(0); }
        .delay-1 { transition-delay: 0.1s !important; }
        .delay-2 { transition-delay: 0.2s !important; }
        .delay-3 { transition-delay: 0.3s !important; }
        .delay-4 { transition-delay: 0.4s !important; }
        .delay-5 { transition-delay: 0.5s !important; }
        .delay-6 { transition-delay: 0.6s !important; }
        .delay-7 { transition-delay: 0.7s !important; }

        /* ── Image parallax tilt ── */
        .img-card {
          transition: transform 0.6s cubic-bezier(.22,1,.36,1), box-shadow 0.4s ease;
        }
        .img-card:hover {
          transform: scale(1.015) translateY(-4px);
          box-shadow: 0 30px 70px rgba(42,71,113,0.25);
        }

        /* ── Stat card ── */
        .stat-card {
          position: relative;
          background: #eef2f8;
          border: 1px solid #c5d3e8;
          border-radius: 14px;
          padding: 14px 8px;
          text-align: center;
          cursor: default;
          overflow: hidden;
          transition: transform 0.35s cubic-bezier(.22,1,.36,1), box-shadow 0.35s ease, background 0.35s ease, border-color 0.35s ease;
        }
        .stat-card::before {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, rgba(255,255,255,0.08), transparent);
          opacity: 0;
          transition: opacity 0.35s;
        }
        .stat-card:hover {
          background: #2a4771;
          border-color: #2a4771;
          transform: translateY(-5px) scale(1.04);
          box-shadow: 0 12px 30px rgba(42,71,113,0.35);
        }
        .stat-card:hover::before { opacity: 1; }
        .stat-card:hover .stat-val { color: #fff; }
        .stat-card:hover .stat-label { color: rgba(255,255,255,0.75); }
        .stat-card:hover .stat-icon { transform: scale(1.3) rotate(10deg); }
        .stat-icon {
          display: block;
          font-size: 18px;
          margin-bottom: 4px;
          transition: transform 0.35s cubic-bezier(.22,1,.36,1);
        }
        .stat-val {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 28px;
          line-height: 1;
          color: #2a4771;
          transition: color 0.35s;
        }
        .stat-label {
          font-family: 'Barlow', sans-serif;
          font-size: 10px;
          letter-spacing: 3px;
          text-transform: uppercase;
          color: #6b7280;
          margin-top: 3px;
          transition: color 0.35s;
        }

        /* ── Live badge pulse ── */
        @keyframes pulseRing {
          0%   { transform: scale(1); opacity: 1; }
          80%  { transform: scale(2.2); opacity: 0; }
          100% { transform: scale(2.2); opacity: 0; }
        }
        .live-dot {
          position: relative;
          width: 10px; height: 10px;
          border-radius: 50%;
          background: #2a4771;
          box-shadow: 0 0 8px rgba(42,71,113,0.6);
          flex-shrink: 0;
        }
        .live-dot::after {
          content: '';
          position: absolute;
          inset: 0;
          border-radius: 50%;
          background: #2a4771;
          animation: pulseRing 1.8s ease-out infinite;
        }

        /* ── Brand pill ── */
        .brand-pill {
          font-family: 'Barlow', sans-serif;
          font-size: 13px;
          font-weight: 700;
          letter-spacing: 1.5px;
          text-transform: uppercase;
          border-radius: 999px;
          padding: 5px 14px;
          cursor: default;
          position: relative;
          overflow: hidden;
          color: #2a4771;
          border: 1px solid #c5d3e8;
          background: #eef2f8;
          transition: color 0.3s, background 0.3s, border-color 0.3s, transform 0.3s cubic-bezier(.22,1,.36,1), box-shadow 0.3s;
        }
        .brand-pill::before {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(120deg, #2a4771, #3d5f96);
          transform: scaleX(0);
          transform-origin: left;
          transition: transform 0.35s cubic-bezier(.22,1,.36,1);
          z-index: 0;
        }
        .brand-pill:hover::before { transform: scaleX(1); }
        .brand-pill span { position: relative; z-index: 1; }
        .brand-pill:hover {
          color: #fff;
          border-color: #2a4771;
          transform: translateY(-3px);
          box-shadow: 0 8px 20px rgba(42,71,113,0.25);
        }

        /* ── CTA Buttons ── */
        .btn-primary {
          position: relative;
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 14px 28px;
          border-radius: 999px;
          background: #2a4771;
          color: #fff;
          font-family: 'Barlow', sans-serif;
          font-size: 12px;
          font-weight: 700;
          letter-spacing: 3px;
          text-transform: uppercase;
          border: none;
          cursor: pointer;
          overflow: hidden;
          transition: transform 0.3s cubic-bezier(.22,1,.36,1), box-shadow 0.3s;
          box-shadow: 0 8px 28px rgba(42,71,113,0.35);
        }
        .btn-primary::after {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(120deg, transparent 40%, rgba(255,255,255,0.15) 50%, transparent 60%);
          transform: translateX(-100%);
          transition: transform 0.5s;
        }
        .btn-primary:hover { transform: translateY(-3px); box-shadow: 0 16px 40px rgba(42,71,113,0.45); }
        .btn-primary:hover::after { transform: translateX(100%); }

        .btn-secondary {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          padding: 14px 24px;
          border-radius: 10px;
          background: #3B82F6;
          color: #fff;
          font-family: 'Barlow', sans-serif;
          font-size: 13px;
          font-weight: 700;
          letter-spacing: 2px;
          text-transform: uppercase;
          border: none;
          cursor: pointer;
          transition: transform 0.3s cubic-bezier(.22,1,.36,1), background 0.3s, box-shadow 0.3s;
          box-shadow: 0 6px 20px rgba(59,130,246,0.3);
        }
        .btn-secondary:hover {
          background: #2563eb;
          transform: translateY(-3px);
          box-shadow: 0 12px 32px rgba(59,130,246,0.45);
        }
        .btn-secondary svg {
          transition: transform 0.3s cubic-bezier(.22,1,.36,1);
        }
        .btn-secondary:hover svg { transform: translateX(5px); }

        /* ── Heading underline animation ── */
        .heading-underline {
          position: absolute;
          bottom: -4px; left: 0; right: 0;
          height: 3px;
          border-radius: 9999px;
          background: linear-gradient(90deg, #2a4771, #3d5f96);
          transform: scaleX(0);
          transform-origin: left;
          transition: transform 0.8s cubic-bezier(.22,1,.36,1) 0.6s;
        }
        .heading-underline.visible { transform: scaleX(1); }

        /* ── Scan line on image ── */
        @keyframes scan {
          0%   { top: 0%; opacity: 0.7; }
          50%  { opacity: 0.4; }
          100% { top: 100%; opacity: 0; }
        }
        .scan-line {
          position: absolute;
          left: 0; right: 0;
          height: 2px;
          background: linear-gradient(90deg, transparent, rgba(59,130,246,0.6), transparent);
          animation: scan 3s linear infinite;
          pointer-events: none;
        }

        /* ── Floating badge slide-in ── */
        @keyframes badgeIn {
          from { opacity: 0; transform: translateY(-12px) scale(0.9); }
          to   { opacity: 1; transform: translateY(0) scale(1); }
        }
        .live-badge {
          animation: badgeIn 0.6s cubic-bezier(.22,1,.36,1) 0.8s both;
        }

        /* ── Grid dots shimmer ── */
        @keyframes dotShimmer {
          0%, 100% { opacity: 0.3; }
          50%       { opacity: 0.55; }
        }
        .dot-bg { animation: dotShimmer 4s ease-in-out infinite; }

        /* ── Divider draw ── */
        .divider-line {
          width: 0;
          height: 1px;
          background: linear-gradient(90deg, rgba(42,71,113,0.3), #c5d3e8, transparent);
          transition: width 0.9s cubic-bezier(.22,1,.36,1);
        }
        .divider-line.visible { width: 100%; }
      `}</style>

      <section
        ref={sectionRef}
        className="kj-section"
        style={{
          width: "100%",
          background: "#fff",
          padding: "80px 24px",
          position: "relative",
          overflow: "hidden",
          fontFamily: "'Barlow', sans-serif",
        }}
      >
        {/* Dot BG */}
        <div
          className="dot-bg"
          style={{
            position: "absolute", inset: 0, pointerEvents: "none",
            backgroundImage: "radial-gradient(circle, #c7d4e8 1px, transparent 1px)",
            backgroundSize: "28px 28px",
          }}
        />

        {/* Top bar */}
        <div style={{
          position: "absolute", top: 0, left: 0, right: 0, height: 3,
          background: "linear-gradient(90deg, #2a4771, #3d5f96, #3B82F6)",
        }} />

        {/* Corner glows */}
        <div style={{
          position: "absolute", top: 0, left: 0,
          width: 500, height: 500,
          borderRadius: "50%",
          background: "#eef2f8",
          filter: "blur(130px)",
          opacity: 0.18,
          pointerEvents: "none",
        }} />
        <div style={{
          position: "absolute", bottom: 0, right: 0,
          width: 400, height: 400,
          borderRadius: "50%",
          background: "#dbeafe",
          filter: "blur(100px)",
          opacity: 0.18,
          pointerEvents: "none",
        }} />

        <div style={{
          position: "relative",
          maxWidth: 1200,
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
          gap: 64,
          alignItems: "center",
        }}>

          {/* ── LEFT ── */}
          <div className={`fade-up ${sectionInView ? "visible" : ""}`}>

            {/* Image card */}
            <div className="img-card" style={{
              position: "relative",
              borderRadius: 20,
              overflow: "hidden",
              boxShadow: "0 20px 60px rgba(42,71,113,0.18)",
              border: "1px solid #c5d3e8",
            }}>
              <img
                src="https://media.istockphoto.com/id/1214607329/photo/tv-is-not-working-leisure-technology-mass-media-and-people-concept-man-watching-tv-at-home.jpg?s=612x612&w=0&k=20&c=7ucNGpulccvhLDi7mw5VVAOJnyals_8DjMdbsM18cQs="
                alt="TV Repair Service"
                style={{ width: "100%", height: 400, objectFit: "cover", filter: "brightness(0.78) saturate(0.8)", display: "block" }}
              />
              {/* Tint */}
              <div style={{
                position: "absolute", inset: 0,
                background: "linear-gradient(135deg, rgba(42,71,113,0.5) 0%, transparent 60%)",
              }} />
              {/* Scan line */}
              <div className="scan-line" />
              {/* Bottom fade */}
              <div style={{
                position: "absolute", bottom: 0, left: 0, right: 0, height: "40%",
                background: "linear-gradient(to top, rgba(255,255,255,0.15), transparent)",
              }} />
            </div>

            {/* Live badge */}
            <div className="live-badge" style={{
              position: "absolute",
              top: -16, left: -16,
              background: "#fff",
              border: "1px solid #c5d3e8",
              borderRadius: 12,
              padding: "10px 16px",
              display: "flex",
              alignItems: "center",
              gap: 8,
              boxShadow: "0 8px 24px rgba(42,71,113,0.15)",
            }}>
              <span className="live-dot" />
              <span style={{
                fontFamily: "'Barlow', sans-serif",
                fontSize: 11,
                fontWeight: 700,
                letterSpacing: 4,
                textTransform: "uppercase",
                color: "#2a4771",
              }}>Live Support</span>
            </div>

            {/* Stats */}
            <div
              ref={statsRef}
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(4, 1fr)",
                gap: 8,
                marginTop: 24,
              }}
            >
              {stats.map((s, i) => (
                <div
                  key={s.label}
                  className={`stat-card fade-up delay-${i + 1} ${statsInView ? "visible" : ""}`}
                >
                  <span className="stat-icon">{s.icon}</span>
                  <div className="stat-val">
                    <AnimatedCounter target={s.value} inView={statsInView} />
                  </div>
                  <div className="stat-label">{s.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* ── RIGHT ── */}
          <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>

            {/* Eyebrow */}
            <div className={`fade-up delay-1 ${sectionInView ? "visible" : ""}`} style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              padding: "6px 16px",
              borderRadius: 999,
              border: "1px solid #c5d3e8",
              background: "#eef2f8",
              alignSelf: "flex-start",
            }}>
              <span style={{
                width: 6, height: 6,
                borderRadius: "50%",
                background: "#3B82F6",
                display: "inline-block",
                animation: "pulseRing 1.8s ease-out infinite",
              }} />
              <span style={{
                fontSize: 11, fontWeight: 700,
                letterSpacing: 4,
                textTransform: "uppercase",
                color: "#3B82F6",
              }}>Best in Coimbatore</span>
            </div>

            {/* Heading */}
            <div className={`fade-up delay-2 ${sectionInView ? "visible" : ""}`}>
              <h2 style={{
                fontFamily: "'Bebas Neue', sans-serif",
                fontSize: "clamp(48px, 6vw, 72px)",
                color: "#111827",
                textTransform: "uppercase",
                lineHeight: 1,
                letterSpacing: 6,
                margin: 0,
              }}>
                KJ{" "}
                <span style={{ position: "relative", color: "#3B82F6" }}>
                  Electronics
                  <span className={`heading-underline ${sectionInView ? "visible" : ""}`} />
                </span>
              </h2>
            </div>

            {/* Tagline */}
            <div className={`fade-up delay-3 ${sectionInView ? "visible" : ""}`} style={{
              display: "flex", alignItems: "center", gap: 12,
            }}>
              <span style={{ width: 32, height: 2, borderRadius: 9999, background: "#2a4771", flexShrink: 0 }} />
              <p style={{
                margin: 0,
                color: "#3B82F6",
                fontSize: 13,
                fontWeight: 600,
                letterSpacing: 4,
                textTransform: "uppercase",
                fontStyle: "italic",
              }}>
                Always Deliver More Than Expected
              </p>
            </div>

            {/* Divider */}
            <div className={`divider-line ${sectionInView ? "visible" : ""}`} />

            {/* Body */}
            <div className={`fade-up delay-3 ${sectionInView ? "visible" : ""}`}>
              <p style={{ margin: "0 0 12px", color: "#6b7280", fontSize: 15, lineHeight: 1.75 }}>
                Welcome to the{" "}
                <strong style={{ color: "#111827" }}>Best LED TV Service Center in Coimbatore!</strong>{" "}
                Our technicians have over{" "}
                <strong style={{ color: "#3B82F6" }}>10 years of experience</strong> delivering trustworthy LED TV repair — built on precision, trust, and speed.
              </p>
              <p style={{ margin: "0 0 12px", color: "#6b7280", fontSize: 15, lineHeight: 1.75 }}>
                We fix all types including{" "}
                <strong style={{ color: "#111827" }}>LED, LCD, and Plasma</strong>{" "}
                using modern technology, with{" "}
                <strong style={{ color: "#3B82F6" }}>same-day service within 3 hours.</strong>
              </p>
              <p style={{ margin: 0, color: "#6b7280", fontSize: 15, lineHeight: 1.75 }}>
                We only use{" "}
                <strong style={{ color: "#3B82F6" }}>original spare parts</strong> for long-lasting results. Affordable, efficient, and trustworthy.
              </p>
            </div>

            {/* Divider */}
            <div className={`divider-line ${sectionInView ? "visible" : ""}`} />

            {/* Brands */}
            <div className={`fade-up delay-5 ${sectionInView ? "visible" : ""}`}>
              <p style={{
                fontSize: 11, fontWeight: 700,
                letterSpacing: 4, textTransform: "uppercase",
                color: "#6b7280", marginBottom: 12, margin: "0 0 12px",
              }}>
                Brands We Service
              </p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                {brands.map((brand, i) => (
                  <button
                    key={brand}
                    className="brand-pill"
                    onMouseEnter={() => setHoveredBrand(brand)}
                    onMouseLeave={() => setHoveredBrand(null)}
                    style={{
                      animationDelay: `${i * 0.05}s`,
                      color: hoveredBrand === brand ? "#fff" : "#2a4771",
                    }}
                  >
                    <span>{brand}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* CTAs */}
            <div className={`fade-up delay-6 ${sectionInView ? "visible" : ""}`} style={{
              display: "flex", alignItems: "center", gap: 16, flexWrap: "wrap", marginTop: 8,
            }}>
              <button className="btn-primary">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M14.5 10.5a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0z"/>
                  <path d="M12 2a8.5 8.5 0 0 1 8.5 8.5c0 6-8.5 13-8.5 13S3.5 16.5 3.5 10.5A8.5 8.5 0 0 1 12 2z"/>
                </svg>
                Book a Repair
              </button>
              <button className="btn-secondary">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.79 19.79 0 0 1 2.12 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/>
                </svg>
                Call Us Now
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </button>
            </div>

          </div>
        </div>
      </section>
    </>
  );
}