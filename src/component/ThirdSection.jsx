import { useEffect, useRef, useState } from "react";

const stats = [
  { value: "10+", label: "Years Exp.", icon: "⚡" },
  { value: "50K+", label: "TVs Fixed", icon: "📺" },
  { value: "3hr", label: "Same Day", icon: "🚀" },
  { value: "100%", label: "Orig. Parts", icon: "🛡️" },
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

export default function KJElectronics() {
  const [sectionRef, sectionInView] = useInView(0.1);
  const [statsRef, statsInView] = useInView(0.2);
  const [hoveredBrand, setHoveredBrand] = useState(null);

  return (
    <>
      <style>{`
        

        /* Animations */
        @keyframes pulseRing {
          0%   { transform: scale(1); opacity: 1; }
          80%  { transform: scale(2.4); opacity: 0; }
          100% { transform: scale(2.4); opacity: 0; }
        }
        @keyframes scan {
          0%   { top: 0%; opacity: 0.7; }
          50%  { opacity: 0.4; }
          100% { top: 100%; opacity: 0; }
        }
        @keyframes badgeIn {
          from { opacity: 0; transform: translateY(-12px) scale(0.9); }
          to   { opacity: 1; transform: translateY(0) scale(1); }
        }
        @keyframes dotShimmer {
          0%, 100% { opacity: 0.25; }
          50%       { opacity: 0.5; }
        }
        @keyframes shimmerSlide {
          from { transform: translateX(-100%); }
          to   { transform: translateX(100%); }
        }

        /* Fade-up utility */
        .fade-up {
          opacity: 0;
          transform: translateY(36px);
          transition: opacity 0.7s cubic-bezier(.22,1,.36,1), transform 0.7s cubic-bezier(.22,1,.36,1);
        }
        .fade-up.visible { opacity: 1; transform: none; }
        .d1 { transition-delay: 0.05s !important; }
        .d2 { transition-delay: 0.15s !important; }
        .d3 { transition-delay: 0.25s !important; }
        .d4 { transition-delay: 0.35s !important; }
        .d5 { transition-delay: 0.45s !important; }
        .d6 { transition-delay: 0.55s !important; }

        /* Dot background */
        .dot-bg {
          background-image: radial-gradient(circle, #c7d4e8 1px, transparent 1px);
          background-size: 28px 28px;
          animation: dotShimmer 4s ease-in-out infinite;
        }

        /* Live dot pulse */
        .live-dot {
          position: relative;
          width: 10px; height: 10px;
          border-radius: 50%;
          background: #2a4771;
          flex-shrink: 0;
        }
        .live-dot::after {
          content: '';
          position: absolute; inset: 0;
          border-radius: 50%;
          background: #2a4771;
          animation: pulseRing 1.8s ease-out infinite;
        }

        /* Scan line */
        .scan-line {
          position: absolute; left: 0; right: 0;
          height: 2px;
          background: linear-gradient(90deg, transparent, rgba(59,130,246,0.65), transparent);
          animation: scan 3s linear infinite;
          pointer-events: none;
        }

        /* Live badge */
        .live-badge { animation: badgeIn 0.6s cubic-bezier(.22,1,.36,1) 0.8s both; }

        /* Image card hover */
        .img-card {
          transition: transform 0.6s cubic-bezier(.22,1,.36,1), box-shadow 0.4s ease;
        }
        .img-card:hover {
          transform: scale(1.015) translateY(-4px);
          box-shadow: 0 30px 70px rgba(42,71,113,0.25);
        }

        /* Stat card */
        .stat-card {
          background: #eef2f8;
          border: 1px solid #c5d3e8;
          border-radius: 14px;
          padding: 12px 6px;
          text-align: center;
          cursor: default;
          overflow: hidden;
          position: relative;
          transition: transform 0.35s cubic-bezier(.22,1,.36,1), box-shadow 0.35s ease, background 0.35s ease, border-color 0.35s ease;
        }
        .stat-card:hover {
          background: #2a4771;
          border-color: #2a4771;
          transform: translateY(-5px) scale(1.05);
          box-shadow: 0 12px 30px rgba(42,71,113,0.35);
        }
        .stat-card:hover .stat-val { color: #fff; }
        .stat-card:hover .stat-lbl { color: rgba(255,255,255,0.7); }
        .stat-card:hover .stat-ico { transform: scale(1.35) rotate(10deg); }
        .stat-ico {
          display: block; font-size: 18px; margin-bottom: 4px;
          transition: transform 0.35s cubic-bezier(.22,1,.36,1);
        }
        .stat-val {
          font-size: clamp(20px, 5vw, 28px);
          font-weight: 900; line-height: 1;
          color: #2a4771;
          transition: color 0.35s;
        }
        .stat-lbl {
          font-size: 9px; letter-spacing: 2.5px;
          text-transform: uppercase; color: #6b7280;
          margin-top: 3px;
          transition: color 0.35s;
        }

        /* Brand pill */
        .brand-pill {
          font-size: 11px; font-weight: 700;
          letter-spacing: 1.5px; text-transform: uppercase;
          border-radius: 999px; padding: 5px 13px;
          cursor: default; position: relative; overflow: hidden;
          color: #2a4771; border: 1px solid #c5d3e8;
          background: #eef2f8;
          transition: color 0.3s, background 0.3s, border-color 0.3s,
                      transform 0.3s cubic-bezier(.22,1,.36,1), box-shadow 0.3s;
        }
        .brand-pill::before {
          content: ''; position: absolute; inset: 0;
          background: linear-gradient(120deg, #2a4771, #3d5f96);
          transform: scaleX(0); transform-origin: left;
          transition: transform 0.35s cubic-bezier(.22,1,.36,1);
          z-index: 0;
        }
        .brand-pill:hover::before { transform: scaleX(1); }
        .brand-pill span { position: relative; z-index: 1; }
        .brand-pill:hover {
          color: #fff; border-color: #2a4771;
          transform: translateY(-3px);
          box-shadow: 0 8px 20px rgba(42,71,113,0.25);
        }

        /* Heading underline */
        .heading-underline {
          position: absolute; bottom: -4px; left: 0; right: 0;
          height: 3px; border-radius: 9999px;
          background: linear-gradient(90deg, #2a4771, #3d5f96);
          transform: scaleX(0); transform-origin: left;
          transition: transform 0.8s cubic-bezier(.22,1,.36,1) 0.7s;
        }
        .heading-underline.visible { transform: scaleX(1); }

        /* Divider */
        .divider-line {
          width: 0; height: 1px;
          background: linear-gradient(90deg, rgba(42,71,113,0.3), #c5d3e8, transparent);
          transition: width 0.9s cubic-bezier(.22,1,.36,1);
        }
        .divider-line.visible { width: 100%; }

        /* CTA Primary */
        .btn-primary {
          position: relative; display: inline-flex; align-items: center; gap: 8px;
          padding: 13px 24px; border-radius: 999px;
          background: #2a4771; color: #fff;
          font-family: 'Barlow', sans-serif;
          font-size: 11px; font-weight: 700;
          letter-spacing: 3px; text-transform: uppercase;
          border: none; cursor: pointer; overflow: hidden;
          transition: transform 0.3s cubic-bezier(.22,1,.36,1), box-shadow 0.3s;
          box-shadow: 0 8px 28px rgba(42,71,113,0.35);
          white-space: nowrap;
        }
        .btn-primary::after {
          content: ''; position: absolute; inset: 0;
          background: linear-gradient(120deg, transparent 40%, rgba(255,255,255,0.15) 50%, transparent 60%);
          transform: translateX(-100%); transition: transform 0.5s;
        }
        .btn-primary:hover { transform: translateY(-3px); box-shadow: 0 16px 40px rgba(42,71,113,0.45); }
        .btn-primary:hover::after { transform: translateX(100%); }

        /* CTA Secondary */
        .btn-secondary {
          display: inline-flex; align-items: center; gap: 8px;
          padding: 13px 20px; border-radius: 10px;
          background: #3B82F6; color: #fff;
          font-family: 'Barlow', sans-serif;
          font-size: 11px; font-weight: 700;
          letter-spacing: 2px; text-transform: uppercase;
          border: none; cursor: pointer;
          transition: transform 0.3s cubic-bezier(.22,1,.36,1), background 0.3s, box-shadow 0.3s;
          box-shadow: 0 6px 20px rgba(59,130,246,0.3);
          white-space: nowrap;
        }
        .btn-secondary:hover {
          background: #2563eb; transform: translateY(-3px);
          box-shadow: 0 12px 32px rgba(59,130,246,0.45);
        }
        .btn-secondary svg { transition: transform 0.3s cubic-bezier(.22,1,.36,1); }
        .btn-secondary:hover svg:last-child { transform: translateX(5px); }
      `}</style>

      <section
        ref={sectionRef}
        className="kj-root relative w-full bg-white overflow-hidden py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8"
      >
        {/* Dot BG */}
        <div className="dot-bg absolute inset-0 pointer-events-none" />

        {/* Top accent bar */}
        <div
          className="absolute top-0 left-0 right-0 h-[3px]"
          style={{ background: "linear-gradient(90deg, #2a4771, #3d5f96, #3B82F6)" }}
        />

        {/* Corner glows */}
        <div
          className="absolute top-0 left-0 w-64 h-64 sm:w-96 sm:h-96 lg:w-[500px] lg:h-[500px] rounded-full pointer-events-none"
          style={{ background: "#eef2f8", filter: "blur(100px)", opacity: 0.2 }}
        />
        <div
          className="absolute bottom-0 right-0 w-56 h-56 sm:w-80 sm:h-80 lg:w-[400px] lg:h-[400px] rounded-full pointer-events-none"
          style={{ background: "#dbeafe", filter: "blur(80px)", opacity: 0.2 }}
        />

        {/* Main grid */}
        <div className="relative max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">

          {/* ── LEFT COLUMN ── */}
          <div className={`fade-up ${sectionInView ? "visible" : ""}`}>

            {/* Image card */}
            <div
              className="img-card relative rounded-2xl overflow-hidden"
              style={{ boxShadow: "0 20px 60px rgba(42,71,113,0.18)", border: "1px solid #c5d3e8" }}
            >
              <img
                src="https://media.istockphoto.com/id/1214607329/photo/tv-is-not-working-leisure-technology-mass-media-and-people-concept-man-watching-tv-at-home.jpg?s=612x612&w=0&k=20&c=7ucNGpulccvhLDi7mw5VVAOJnyals_8DjMdbsM18cQs="
                alt="TV Repair Service"
                className="w-full object-cover block"
                style={{ height: "clamp(220px, 45vw, 400px)", filter: "brightness(0.78) saturate(0.8)" }}
              />
              {/* Tint overlay */}
              <div
                className="absolute inset-0"
                style={{ background: "linear-gradient(135deg, rgba(42,71,113,0.5) 0%, transparent 60%)" }}
              />
              {/* Scan line */}
              <div className="scan-line" />
              {/* Bottom fade */}
              <div
                className="absolute bottom-0 left-0 right-0"
                style={{ height: "40%", background: "linear-gradient(to top, rgba(255,255,255,0.12), transparent)" }}
              />
            </div>

            {/* Live badge — overlaps image top-left */}
            <div
              className="live-badge absolute -top-4 -left-2 sm:-left-4 bg-white rounded-xl px-3 py-2 sm:px-4 sm:py-2.5 flex items-center gap-2"
              style={{ border: "1px solid #c5d3e8", boxShadow: "0 8px 24px rgba(42,71,113,0.15)" }}
            >
              <span className="live-dot" />
              <span
                className="text-[10px] sm:text-[11px] font-bold tracking-widest uppercase"
                style={{ color: "#2a4771" }}
              >
                Live Support
              </span>
            </div>

            {/* Stats grid */}
            <div
              ref={statsRef}
              className="grid grid-cols-4 gap-2 mt-5 sm:mt-6"
            >
              {stats.map((s, i) => (
                <div
                  key={s.label}
                  className={`stat-card fade-up d${i + 1} ${statsInView ? "visible" : ""}`}
                >
                  <span className="stat-ico">{s.icon}</span>
                  <div className="stat-val">
                    <AnimatedCounter target={s.value} inView={statsInView} />
                  </div>
                  <div className="stat-lbl">{s.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* ── RIGHT COLUMN ── */}
          <div className="flex flex-col gap-5">

            {/* Eyebrow badge */}
            <div
              className={`fade-up d1 ${sectionInView ? "visible" : ""} self-start inline-flex items-center gap-2 px-4 py-1.5 rounded-full`}
              style={{ border: "1px solid #c5d3e8", background: "#eef2f8" }}
            >
              <span
                className="w-1.5 h-1.5 rounded-full inline-block"
                style={{ background: "#3B82F6", animation: "pulseRing 1.8s ease-out infinite" }}
              />
              <span
                className="text-[10px] sm:text-[11px] font-bold tracking-widest uppercase"
                style={{ color: "#3B82F6" }}
              >
                Best in Coimbatore
              </span>
            </div>

            {/* Heading */}
            <div className={`fade-up d2 ${sectionInView ? "visible" : ""}`}>
              <h2
                className="text-[42px] sm:text-[54px] lg:text-[64px] xl:text-[72px] uppercase leading-none tracking-widest m-0"
                style={{ color: "#111827" }}
              >
                KJ{" "}
                <span className="relative" style={{ color: "#3B82F6" }}>
                  Electronics
                  <span className={`heading-underline ${sectionInView ? "visible" : ""}`} />
                </span>
              </h2>
            </div>

            {/* Tagline */}
            <div className={`fade-up d3 ${sectionInView ? "visible" : ""} flex items-center gap-3`}>
              <span
                className="w-8 h-0.5 rounded-full flex-shrink-0"
                style={{ background: "#2a4771" }}
              />
              <p
                className="m-0 text-xs sm:text-[13px] font-semibold tracking-widest uppercase italic"
                style={{ color: "#3B82F6" }}
              >
                Always Deliver More Than Expected
              </p>
            </div>

            {/* Divider */}
            <div className={`divider-line ${sectionInView ? "visible" : ""}`} />

            {/* Body text */}
            <div className={`fade-up d3 ${sectionInView ? "visible" : ""} flex flex-col gap-3`}>
              <p className="m-0 text-sm sm:text-[15px] leading-relaxed" style={{ color: "#6b7280" }}>
                Welcome to the{" "}
                <strong style={{ color: "#111827" }}>Best LED TV Service Center in Coimbatore!</strong>{" "}
                Our technicians have over{" "}
                <strong style={{ color: "#3B82F6" }}>10 years of experience</strong> delivering trustworthy LED TV repair — built on precision, trust, and speed.
              </p>
              <p className="m-0 text-sm sm:text-[15px] leading-relaxed" style={{ color: "#6b7280" }}>
                We fix all types including{" "}
                <strong style={{ color: "#111827" }}>LED, LCD, and Plasma</strong>{" "}
                using modern technology, with{" "}
                <strong style={{ color: "#3B82F6" }}>same-day service within 3 hours.</strong>
              </p>
              <p className="m-0 text-sm sm:text-[15px] leading-relaxed" style={{ color: "#6b7280" }}>
                We only use{" "}
                <strong style={{ color: "#3B82F6" }}>original spare parts</strong> for long-lasting results. Affordable, efficient, and trustworthy.
              </p>
            </div>

            {/* Divider */}
            <div className={`divider-line ${sectionInView ? "visible" : ""}`} />

            {/* Brands */}
            <div className={`fade-up d5 ${sectionInView ? "visible" : ""}`}>
              <p
                className="text-[10px] sm:text-[11px] font-bold tracking-widest uppercase mb-3"
                style={{ color: "#6b7280" }}
              >
                Brands We Service
              </p>
              <div className="flex flex-wrap gap-2">
                {brands.map((brand) => (
                  <button
                    key={brand}
                    className="brand-pill"
                    onMouseEnter={() => setHoveredBrand(brand)}
                    onMouseLeave={() => setHoveredBrand(null)}
                  >
                    <span>{brand}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* CTA Buttons */}
            <div
              className={`fade-up d6 ${sectionInView ? "visible" : ""} flex flex-wrap items-center gap-3 mt-1`}
            >
              <button className="btn-primary">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M14.5 10.5a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0z"/>
                  <path d="M12 2a8.5 8.5 0 0 1 8.5 8.5c0 6-8.5 13-8.5 13S3.5 16.5 3.5 10.5A8.5 8.5 0 0 1 12 2z"/>
                </svg>
                Book a Repair
              </button>
              <button className="btn-secondary">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.79 19.79 0 0 1 2.12 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/>
                </svg>
                Call Us Now
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
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