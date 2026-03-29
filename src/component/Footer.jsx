import { useEffect, useRef, useState } from "react";
import {
  Facebook, Twitter, Instagram, Youtube,
  Phone, MapPin, Mail, Tv2, ArrowUpRight,
  ChevronRight, Zap, Clock, Shield, Star, Wrench
} from "lucide-react";

const quickLinks = ["Home", "About Us", "Services", "Brands", "Reviews", "Contact"];
const services   = ["Panel Repair", "PCB Repair", "Spare Parts", "Home Service", "Free Diagnosis"];
const brands     = ["Samsung", "LG", "Sony", "Philips", "Panasonic", "MI", "OnePlus", "TCL"];

const contactItems = [
  { Icon: Phone,  text: "+91 9514698694 / 9361888173",                      label: "Phone"   },
  { Icon: Mail,   text: "kjelectronicsled@gmail.com",                        label: "Email"   },
  { Icon: MapPin, text: "32/7 Nethaji Road, PN Pudur, Coimbatore 641041",   label: "Address" },
  { Icon: Clock,  text: "Mon–Fri 9:30 AM–10:00 PM · Sat 9:30 AM–5:00 PM", label: "Hours"   },
];

const socials = [
  { Icon: Facebook,  label: "Facebook",  href: "#" },
  { Icon: Instagram, label: "Instagram", href: "#" },
  { Icon: Youtube,   label: "YouTube",   href: "#" },
  { Icon: Twitter,   label: "Twitter",   href: "#" },
];

const trustBadges = [
  { icon: Shield, text: "Free Diagnosis" },
  { icon: Star,   text: "Since 2007"     },
  { icon: Wrench, text: "All Brands"     },
];

function useInView() {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setInView(true); });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return [ref, inView];
}

export default function Footer() {
  const [ref, inView] = useInView();
  const [hovLink, setHovLink] = useState(null);
  const [hovSvc,  setHovSvc]  = useState(null);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;900&family=DM+Sans:wght@400;500;600;700;800&display=swap');

        .footer-root * { box-sizing: border-box; }

        /* ── Animated gradient background ── */
        .footer-root {
          position: relative;
          overflow: hidden;
          background: linear-gradient(135deg,
            #0a0a0a 0%,
            #110006 25%,
            #1c0010 45%,
            #2a0018 60%,
            #890b44 100%
          );
          color: #fff;
          font-family: 'DM Sans', sans-serif;
        }

        /* subtle diagonal stripe texture */
        .footer-root::before {
          content: '';
          position: absolute;
          inset: 0;
          background: repeating-linear-gradient(
            -45deg,
            transparent,
            transparent 60px,
            rgba(137,11,68,0.04) 60px,
            rgba(137,11,68,0.04) 61px
          );
          pointer-events: none;
        }

        /* dot grid overlay */
        .footer-dots {
          position: absolute;
          inset: 0;
          background-image: radial-gradient(circle, rgba(255,255,255,0.04) 1px, transparent 1px);
          background-size: 28px 28px;
          pointer-events: none;
        }

        /* glow orbs */
        .footer-glow-tl {
          position: absolute;
          top: -120px; left: -120px;
          width: 500px; height: 500px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(137,11,68,0.18) 0%, transparent 70%);
          filter: blur(60px);
          pointer-events: none;
        }
        .footer-glow-br {
          position: absolute;
          bottom: -80px; right: -80px;
          width: 420px; height: 420px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(137,11,68,0.22) 0%, transparent 65%);
          filter: blur(80px);
          pointer-events: none;
        }

        /* top border accent */
        .footer-top-bar {
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 2px;
          background: linear-gradient(90deg, transparent, #890b44, #fff3, #890b44, transparent);
        }

        /* Trust badges row */
        .trust-row {
          display: flex;
          align-items: center;
          gap: 8px;
          flex-wrap: wrap;
          margin-bottom: 20px;
        }
        .trust-badge {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 5px 12px;
          border-radius: 999px;
          border: 1px solid rgba(137,11,68,0.45);
          background: rgba(137,11,68,0.12);
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 2px;
          text-transform: uppercase;
          color: rgba(255,255,255,0.7);
          transition: all .3s;
        }
        .trust-badge:hover {
          background: rgba(137,11,68,0.28);
          border-color: rgba(137,11,68,0.7);
          color: #fff;
        }

        /* Brand name */
        .brand-name {
          font-family: 'Playfair Display', serif;
          font-size: 26px;
          font-weight: 900;
          line-height: 1;
          color: #fff;
          letter-spacing: -0.5px;
        }
        .brand-sub {
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 4px;
          text-transform: uppercase;
          color: rgba(137,11,68,0.9);
          margin-top: 2px;
        }

        /* Contact item */
        .contact-item {
          display: flex;
          align-items: flex-start;
          gap: 10px;
          padding: 8px 0;
          border-bottom: 1px solid rgba(255,255,255,0.05);
          transition: border-color .3s;
        }
        .contact-item:last-child { border-bottom: none; }
        .contact-item:hover { border-color: rgba(137,11,68,0.3); }
        .contact-icon-wrap {
          width: 28px; height: 28px;
          border-radius: 8px;
          background: rgba(137,11,68,0.15);
          border: 1px solid rgba(137,11,68,0.3);
          display: flex; align-items: center; justify-content: center;
          flex-shrink: 0;
          transition: all .3s;
        }
        .contact-item:hover .contact-icon-wrap {
          background: rgba(137,11,68,0.35);
          border-color: rgba(137,11,68,0.6);
        }
        .contact-text {
          font-size: 12.5px;
          line-height: 1.55;
          color: rgba(255,255,255,0.6);
          transition: color .3s;
          padding-top: 4px;
        }
        .contact-item:hover .contact-text { color: rgba(255,255,255,0.85); }

        /* Section heading */
        .section-label {
          display: flex;
          align-items: center;
          gap: 8px;
          margin-bottom: 18px;
        }
        .section-label-dot {
          width: 6px; height: 6px;
          border-radius: 50%;
          background: #890b44;
          flex-shrink: 0;
          animation: pulse-dot 2.5s ease-in-out infinite;
        }
        @keyframes pulse-dot {
          0%, 100% { opacity: 0.5; transform: scale(1); }
          50%       { opacity: 1;   transform: scale(1.3); }
        }
        .section-label-text {
          font-size: 10px;
          font-weight: 800;
          letter-spacing: 5px;
          text-transform: uppercase;
          color: rgba(255,255,255,0.5);
        }

        /* Nav links */
        .nav-link {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 7px 0;
          cursor: pointer;
          border-bottom: 1px solid rgba(255,255,255,0.04);
          transition: all .3s;
          text-decoration: none;
        }
        .nav-link:last-child { border-bottom: none; }
        .nav-link-arrow {
          width: 18px; height: 18px;
          border-radius: 5px;
          background: rgba(137,11,68,0.1);
          border: 1px solid rgba(137,11,68,0.2);
          display: flex; align-items: center; justify-content: center;
          flex-shrink: 0;
          transition: all .35s cubic-bezier(.16,1,.3,1);
        }
        .nav-link:hover .nav-link-arrow {
          background: #890b44;
          border-color: #890b44;
          transform: translateX(3px);
        }
        .nav-link-text {
          font-size: 13.5px;
          font-weight: 500;
          color: rgba(255,255,255,0.55);
          transition: color .3s;
        }
        .nav-link:hover .nav-link-text {
          color: #fff;
        }

        /* Brand tags */
        .brand-tag {
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 1.5px;
          text-transform: uppercase;
          padding: 5px 12px;
          border-radius: 999px;
          border: 1px solid rgba(255,255,255,0.12);
          color: rgba(255,255,255,0.5);
          cursor: default;
          transition: all .3s;
          background: rgba(255,255,255,0.03);
        }
        .brand-tag:hover {
          border-color: rgba(137,11,68,0.6);
          background: rgba(137,11,68,0.18);
          color: #fff;
        }

        /* CTA card */
        .cta-card {
          position: relative;
          border-radius: 16px;
          overflow: hidden;
          padding: 20px;
          background: rgba(137,11,68,0.12);
          border: 1px solid rgba(137,11,68,0.3);
          margin-top: 20px;
          transition: border-color .3s;
        }
        .cta-card:hover { border-color: rgba(137,11,68,0.6); }
        .cta-card::before {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 2px;
          background: linear-gradient(90deg, transparent, #890b44, transparent);
        }
        .cta-book-btn {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 9px 18px;
          border-radius: 999px;
          background: #890b44;
          color: #fff;
          font-size: 11px;
          font-weight: 800;
          letter-spacing: 2px;
          text-transform: uppercase;
          border: none;
          cursor: pointer;
          transition: all .3s cubic-bezier(.16,1,.3,1);
          box-shadow: 0 6px 20px rgba(137,11,68,0.4);
          font-family: 'DM Sans', sans-serif;
        }
        .cta-book-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 10px 28px rgba(137,11,68,0.55);
          background: #a50e53;
        }

        /* Social icons */
        .social-btn {
          width: 38px; height: 38px;
          border-radius: 10px;
          border: 1px solid rgba(255,255,255,0.12);
          background: rgba(255,255,255,0.04);
          display: flex; align-items: center; justify-content: center;
          cursor: pointer;
          transition: all .35s cubic-bezier(.16,1,.3,1);
          color: rgba(255,255,255,0.45);
        }
        .social-btn:hover {
          background: rgba(137,11,68,0.3);
          border-color: rgba(137,11,68,0.6);
          color: #fff;
          transform: translateY(-3px);
          box-shadow: 0 8px 20px rgba(137,11,68,0.3);
        }

        /* Main grid */
        .footer-grid {
          display: grid;
          grid-template-columns: 1.4fr 1fr 1fr 1fr;
          gap: 48px;
        }
        @media (max-width: 1100px) {
          .footer-grid { grid-template-columns: 1fr 1fr; gap: 36px; }
        }
        @media (max-width: 600px) {
          .footer-grid { grid-template-columns: 1fr; gap: 28px; }
        }

        /* Bottom bar */
        .footer-bottom {
          border-top: 1px solid rgba(255,255,255,0.07);
          padding: 20px 40px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 12px;
        }
        @media (max-width: 600px) {
          .footer-bottom { flex-direction: column; text-align: center; padding: 20px 20px; }
        }
        .footer-bottom-text {
          font-size: 12px;
          color: rgba(255,255,255,0.3);
          font-weight: 500;
          letter-spacing: 0.5px;
        }
        .footer-bottom-links {
          display: flex;
          gap: 20px;
        }
        .footer-bottom-link {
          font-size: 11px;
          color: rgba(255,255,255,0.25);
          font-weight: 600;
          letter-spacing: 2px;
          text-transform: uppercase;
          cursor: pointer;
          transition: color .3s;
          text-decoration: none;
        }
        .footer-bottom-link:hover { color: rgba(137,11,68,0.9); }

        /* Ghost letters */
        .footer-ghost {
          position: absolute;
          bottom: -10px;
          left: 50%;
          transform: translateX(-50%);
          font-family: 'Playfair Display', serif;
          font-size: clamp(80px, 14vw, 180px);
          font-weight: 900;
          color: rgba(255,255,255,0.025);
          pointer-events: none;
          user-select: none;
          white-space: nowrap;
          line-height: 1;
          letter-spacing: -4px;
        }

        /* Reveal animation */
        .footer-reveal {
          opacity: 0;
          transform: translateY(32px);
          transition: opacity .8s cubic-bezier(.16,1,.3,1), transform .8s cubic-bezier(.16,1,.3,1);
        }
        .footer-reveal.visible {
          opacity: 1;
          transform: none;
        }
        .footer-reveal-d1 { transition-delay: 80ms; }
        .footer-reveal-d2 { transition-delay: 160ms; }
        .footer-reveal-d3 { transition-delay: 240ms; }
        .footer-reveal-d4 { transition-delay: 320ms; }

        /* horizontal rule shimmer */
        .hr-shimmer {
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(137,11,68,0.5), rgba(255,255,255,0.1), rgba(137,11,68,0.5), transparent);
          margin-bottom: 48px;
        }
      `}</style>

      <footer className="footer-root">
        {/* Layers */}
        <div className="footer-dots" />
        <div className="footer-glow-tl" />
        <div className="footer-glow-br" />
        <div className="footer-top-bar" />
        <div className="footer-ghost">KJ LED</div>

        {/* Main content */}
        <div ref={ref} style={{ position: "relative", zIndex: 10, padding: "64px 40px 0" }}>

          {/* 4-column grid */}
          <div className={`footer-grid footer-reveal ${inView ? "visible" : ""}`}>

            {/* ── Col 1: Brand + Contact ── */}
            <div className={`footer-reveal footer-reveal-d1 ${inView ? "visible" : ""}`}>

              {/* Logo */}
              <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 18 }}>
                <div style={{ width: 46, height: 46, borderRadius: 14, background: "rgba(137,11,68,0.2)", border: "1px solid rgba(137,11,68,0.4)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <Tv2 size={22} color="#890b44" />
                </div>
                <div>
                  <div className="brand-name">KJ LED</div>
                  <div className="brand-sub">Electronic TV Services</div>
                </div>
              </div>

              {/* Trust badges */}
              <div className="trust-row">
                {trustBadges.map(({ icon: Icon, text }) => (
                  <div key={text} className="trust-badge">
                    <Icon size={10} color="#890b44" />
                    {text}
                  </div>
                ))}
              </div>

              {/* Description */}
              <p style={{ fontSize: 13.5, lineHeight: 1.8, color: "rgba(255,255,255,0.5)", marginBottom: 22, maxWidth: 280 }}>
                Trusted LED TV repair experts since 2007 — delivering dependable solutions with genuine parts, free diagnosis, and professional workmanship across all major brands.
              </p>

              {/* Contact */}
              <div>
                {contactItems.map(({ Icon, text, label }) => (
                  <div key={text} className="contact-item">
                    <div className="contact-icon-wrap">
                      <Icon size={12} color="#890b44" />
                    </div>
                    <span className="contact-text">{text}</span>
                  </div>
                ))}
              </div>

              {/* Socials */}
              <div style={{ display: "flex", gap: 8, marginTop: 20 }}>
                {socials.map(({ Icon, label, href }) => (
                  <a key={label} href={href} className="social-btn" aria-label={label}>
                    <Icon size={15} />
                  </a>
                ))}
              </div>
            </div>

            {/* ── Col 2: Quick Links ── */}
            <div className={`footer-reveal footer-reveal-d2 ${inView ? "visible" : ""}`}>
              <div className="section-label">
                <span className="section-label-dot" />
                <span className="section-label-text">Quick Links</span>
              </div>
              <nav>
                {quickLinks.map((l, i) => (
                  <a key={l} href="#" className="nav-link"
                    onMouseEnter={() => setHovLink(i)}
                    onMouseLeave={() => setHovLink(null)}>
                    <div className="nav-link-arrow">
                      <ChevronRight size={10} color="#890b44" />
                    </div>
                    <span className="nav-link-text">{l}</span>
                  </a>
                ))}
              </nav>
            </div>

            {/* ── Col 3: Services ── */}
            <div className={`footer-reveal footer-reveal-d3 ${inView ? "visible" : ""}`}>
              <div className="section-label">
                <span className="section-label-dot" />
                <span className="section-label-text">Our Services</span>
              </div>
              <nav>
                {services.map((s, i) => (
                  <a key={s} href="#" className="nav-link"
                    onMouseEnter={() => setHovSvc(i)}
                    onMouseLeave={() => setHovSvc(null)}>
                    <div className="nav-link-arrow">
                      <ChevronRight size={10} color="#890b44" />
                    </div>
                    <span className="nav-link-text">{s}</span>
                  </a>
                ))}
              </nav>

              {/* Divider */}
              <div style={{ height: 1, background: "rgba(255,255,255,0.06)", margin: "18px 0" }} />

              {/* Business hours callout */}
              <div style={{ padding: "14px 16px", borderRadius: 12, background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 7, marginBottom: 8 }}>
                  <Clock size={12} color="#890b44" />
                  <span style={{ fontSize: 10, fontWeight: 800, letterSpacing: "3px", textTransform: "uppercase", color: "rgba(255,255,255,0.4)" }}>Working Hours</span>
                </div>
                <p style={{ fontSize: 12, lineHeight: 1.6, color: "rgba(255,255,255,0.5)" }}>
                  Mon – Fri &nbsp;<strong style={{ color: "rgba(255,255,255,0.75)" }}>9:30 AM – 10:00 PM</strong><br />
                  Saturday &nbsp;<strong style={{ color: "rgba(255,255,255,0.75)" }}>9:30 AM – 5:00 PM</strong>
                </p>
              </div>
            </div>

            {/* ── Col 4: Brands + CTA ── */}
            <div className={`footer-reveal footer-reveal-d4 ${inView ? "visible" : ""}`}>
              <div className="section-label">
                <span className="section-label-dot" />
                <span className="section-label-text">Brands We Service</span>
              </div>

              <div style={{ display: "flex", flexWrap: "wrap", gap: 7, marginBottom: 6 }}>
                {brands.map(b => (
                  <span key={b} className="brand-tag">{b}</span>
                ))}
              </div>

              {/* CTA card */}
              <div className="cta-card">
                <div style={{ display: "inline-flex", alignItems: "center", gap: 6, marginBottom: 10, padding: "4px 10px", borderRadius: 999, background: "rgba(137,11,68,0.18)", border: "1px solid rgba(137,11,68,0.35)" }}>
                  <Zap size={10} color="#890b44" />
                  <span style={{ fontSize: 9, fontWeight: 800, letterSpacing: "3px", textTransform: "uppercase", color: "rgba(255,255,255,0.6)" }}>Free Diagnosis</span>
                </div>

                <p style={{ fontSize: 13, lineHeight: 1.7, color: "rgba(255,255,255,0.5)", marginBottom: 14 }}>
                  Get your TV checked before repair — completely free. No obligation, no hidden fees.
                </p>

                <button className="cta-book-btn">
                  <Phone size={12} />
                  Book Repair
                  <ArrowUpRight size={12} />
                </button>
              </div>

              {/* Map placeholder */}
              <div style={{ marginTop: 16, borderRadius: 12, overflow: "hidden", border: "1px solid rgba(137,11,68,0.25)", background: "rgba(137,11,68,0.06)", padding: "14px 16px" }}>
                <div style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
                  <MapPin size={14} color="#890b44" style={{ flexShrink: 0, marginTop: 2 }} />
                  <div>
                    <div style={{ fontSize: 10, fontWeight: 800, letterSpacing: "3px", textTransform: "uppercase", color: "rgba(255,255,255,0.35)", marginBottom: 4 }}>Our Location</div>
                    <p style={{ fontSize: 12.5, lineHeight: 1.6, color: "rgba(255,255,255,0.6)" }}>
                      32/7 Nethaji Road, PN Pudur,<br />Coimbatore – 641 041
                    </p>
                    <a href="#" style={{ display: "inline-flex", alignItems: "center", gap: 4, marginTop: 8, fontSize: 10, fontWeight: 800, letterSpacing: "2px", textTransform: "uppercase", color: "#890b44", textDecoration: "none", transition: "opacity .3s" }}>
                      Get Directions <ArrowUpRight size={10} />
                    </a>
                  </div>
                </div>
              </div>
            </div>

          </div>{/* end grid */}
        </div>

        {/* ── Bottom bar ── */}
        <div style={{ position: "relative", zIndex: 10, marginTop: 56 }}>
          <div style={{ height: 1, background: "linear-gradient(90deg, transparent, rgba(137,11,68,0.4), rgba(255,255,255,0.08), rgba(137,11,68,0.4), transparent)" }} />
          <div className="footer-bottom">
            <span className="footer-bottom-text">
              © 2025 KJ LED Electronic TV Services · Coimbatore. All rights reserved.
            </span>
            <div className="footer-bottom-links">
              <a href="#" className="footer-bottom-link">Privacy</a>
              <a href="#" className="footer-bottom-link">Terms</a>
              <a href="#" className="footer-bottom-link">Sitemap</a>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}