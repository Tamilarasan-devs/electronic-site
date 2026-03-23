import { useEffect, useRef, useState } from "react";
import {
  Facebook, Twitter, Instagram, Youtube,
  Phone, MapPin, Mail, Tv2, ArrowUpRight,
  ChevronRight, Zap, Clock
} from "lucide-react";

const quickLinks = ["Home", "About Us", "Services", "Brands", "Reviews", "Contact"];
const services = ["Panel Repair", "PCB Repair", "Spare Parts", "Home Service", "Free Diagnosis"];
const brands = ["Samsung", "LG", "Sony", "Philips", "Panasonic", "MI", "OnePlus", "TCL"];

const brandColors = [
  "hover:text-blue-400 hover:border-blue-400/50 hover:bg-blue-400/10",
  "hover:text-cyan-400 hover:border-cyan-400/50 hover:bg-cyan-400/10",
  "hover:text-violet-400 hover:border-violet-400/50 hover:bg-violet-400/10",
  "hover:text-emerald-400 hover:border-emerald-400/50 hover:bg-emerald-400/10",
  "hover:text-pink-400 hover:border-pink-400/50 hover:bg-pink-400/10",
  "hover:text-orange-400 hover:border-orange-400/50 hover:bg-orange-400/10",
  "hover:text-yellow-400 hover:border-yellow-400/50 hover:bg-yellow-400/10",
  "hover:text-red-400 hover:border-red-400/50 hover:bg-red-400/10",
];

const socials = [
  { Icon: Facebook,  label: "Facebook",  hover: "hover:text-blue-400  hover:border-blue-400/40  hover:bg-blue-400/10  hover:shadow-blue-400/20"  },
  { Icon: Twitter,   label: "Twitter",   hover: "hover:text-cyan-400   hover:border-cyan-400/40   hover:bg-cyan-400/10   hover:shadow-cyan-400/20"   },
  { Icon: Instagram, label: "Instagram", hover: "hover:text-pink-400   hover:border-pink-400/40   hover:bg-pink-400/10   hover:shadow-pink-400/20"   },
  { Icon: Youtube,   label: "YouTube",   hover: "hover:text-red-400    hover:border-red-400/40    hover:bg-red-400/10    hover:shadow-red-400/20"    },
];

const contactItems = [
  { Icon: Phone,  text: "+91 9514698694 / 9361888173",                              color: "text-blue-400",    bg: "bg-blue-400/10 border-blue-400/20"    },
  { Icon: Mail,   text: "kjelectronicsled@gmail.com",                               color: "text-cyan-400",    bg: "bg-cyan-400/10 border-cyan-400/20"    },
  { Icon: MapPin, text: "32/7 Nethaji Road, PN Pudur, Coimbatore 641041",           color: "text-violet-400",  bg: "bg-violet-400/10 border-violet-400/20"  },
  { Icon: Clock,  text: "Mon–Fri 9:30 AM–10:00 PM · Sat 9:30 AM–5:00 PM",         color: "text-emerald-400", bg: "bg-emerald-400/10 border-emerald-400/20" },
];

function useInView(threshold = 0.05) {
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

function SectionHeading({ children }) {
  return (
    <div className="flex items-center gap-2.5 mb-5">
      <span className="relative flex w-2 h-2 flex-shrink-0">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75" />
        <span className="relative inline-flex rounded-full w-2 h-2 bg-blue-400" />
      </span>
      <h3 className="text-white font-bold text-xs tracking-[0.25em] uppercase">{children}</h3>
    </div>
  );
}

function LinkItem({ label, delay, inView }) {
  return (
    <li
      className="group flex items-center gap-2 py-1.5 cursor-pointer"
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "translateX(0)" : "translateX(-14px)",
        transition: `opacity 0.55s ease ${delay}ms, transform 0.55s ease ${delay}ms`,
      }}
    >
      <ChevronRight
        size={18}
        className="text-blue-400/80 group-hover:text-blue-400 group-hover:translate-x-1 transition-all duration-300 flex-shrink-0"
      />
      <span className="text-white group-hover:text-white text-sm group-hover:font-medium transition-all duration-300 tracking-wide">
        {label}
      </span>
    </li>
  );
}

export default function Footer() {
  const [colRef, colInView] = useInView(0.05);
  const [botRef, botInView] = useInView(0.1);
  const [logoHov, setLogoHov] = useState(false);

  return (
    <>
      <style>{`
        @keyframes barGrow    { from { transform: scaleX(0) } to { transform: scaleX(1) } }
        @keyframes shimmer    { 0% { background-position: 0% 0 } 100% { background-position: 200% 0 } }
        @keyframes dotPulse   { 0%,100% { opacity:.10 } 50% { opacity:.22 } }

        .kj-topbar {
          height: 3px;
          background: linear-gradient(90deg,#60a5fa,#22d3ee,#a78bfa,#f472b6,#60a5fa);
          background-size: 200% 100%;
          transform-origin: left;
          animation: barGrow .9s cubic-bezier(.22,1,.36,1) .15s both,
                     shimmer 4s linear 1.05s infinite;
        }
        .kj-dotbg {
          background-image: radial-gradient(circle,rgba(96,165,250,.22) 1px,transparent 1px);
          background-size: 28px 28px;
          animation: dotPulse 6s ease-in-out infinite;
        }
        .kj-divider {
          height: 1px;
          background: linear-gradient(90deg,transparent,rgba(96,165,250,.28),rgba(167,139,250,.22),transparent);
          width: 0;
          transition: width 1.2s cubic-bezier(.22,1,.36,1) .2s;
        }
        .kj-divider.on { width: 100%; }

        .kj-col  { opacity:0; transform:translateY(30px); transition:opacity .7s cubic-bezier(.22,1,.36,1), transform .7s cubic-bezier(.22,1,.36,1); }
        .kj-col.on { opacity:1; transform:translateY(0); }

        .kj-bot  { opacity:0; transform:translateY(18px); transition:opacity .65s cubic-bezier(.22,1,.36,1), transform .65s cubic-bezier(.22,1,.36,1); }
        .kj-bot.on { opacity:1; transform:translateY(0); }
      `}</style>

      <footer className="relative overflow-hidden bg-[#070c18]">

        {/* ── Top rainbow bar ── */}
        <div className="kj-topbar" />

        {/* ── Dot grid ── */}
        <div className="kj-dotbg absolute inset-0 pointer-events-none" />

        {/* ── Ambient glows ── */}
        <div className="absolute top-0 left-1/4 w-[640px] h-[420px] rounded-full pointer-events-none"
          style={{ background: "radial-gradient(ellipse,rgba(37,99,235,.09) 0%,transparent 65%)" }} />
        <div className="absolute bottom-0 right-[8%] w-[480px] h-[380px] rounded-full pointer-events-none"
          style={{ background: "radial-gradient(ellipse,rgba(124,58,237,.07) 0%,transparent 70%)" }} />

        {/* ════════════════════════════════
            MAIN GRID
        ════════════════════════════════ */}
        <div
          ref={colRef}
          className="relative z-10 max-w-[1200px] mx-auto px-5 pt-16 pb-12
                     grid grid-cols-1 gap-10
                     sm:grid-cols-2
                     lg:grid-cols-[2fr_1fr_1fr_1.6fr]"
        >

          {/* ── COL 1  Brand + Contact ── */}
          <div
            className={`kj-col sm:col-span-2 lg:col-span-1 ${colInView ? "on" : ""}`}
            style={{ transitionDelay: "80ms" }}
          >
            {/* Logo */}
            <div
              className="inline-flex items-center gap-3 mb-5 cursor-default select-none"
              onMouseEnter={() => setLogoHov(true)}
              onMouseLeave={() => setLogoHov(false)}
            >
              <div
                className={`w-11 h-11 rounded-[14px] flex items-center justify-center flex-shrink-0 border transition-all duration-300
                  ${logoHov
                    ? "bg-gradient-to-br from-blue-600 to-blue-800 border-blue-500 shadow-[0_8px_24px_rgba(37,99,235,.42)] -rotate-6 scale-110"
                    : "bg-blue-400/10 border-blue-400/20"}`}
              >
                <Tv2 size={21} className={logoHov ? "text-white" : "text-blue-400"} />
              </div>
              <div>
                <p className="text-white font-extrabold text-2xl tracking-[0.12em] leading-none">
                  KJ Electronics
                </p>
                <p className="text-blue-400 text-[9px] tracking-[0.45em] uppercase font-semibold mt-1">
                  Coimbatore
                </p>
              </div>
            </div>

            {/* Tagline */}
            <p className="text-white text-sm leading-[1.85] mb-6 max-w-[300px]">
              Coimbatore's most trusted LED &amp; LCD TV repair center — expert
              technicians, genuine parts, and same-day service since 2014.
            </p>

            {/* Contact */}
            <div className="flex flex-col gap-3 mb-7">
              {contactItems.map(({ Icon, text, color, bg }) => (
                <div
                  key={text}
                  className="flex items-start gap-3 hover:translate-x-1 transition-transform duration-300 cursor-default"
                >
                  <div className={`w-8 h-8 rounded-[10px] border flex items-center justify-center flex-shrink-0 mt-0.5 ${bg}`}>
                    <Icon size={13} className={color} />
                  </div>
                  <span className="text-white text-[13px] leading-relaxed">{text}</span>
                </div>
              ))}
            </div>

            {/* Social buttons */}
            <div className="flex gap-2.5 flex-wrap">
              {socials.map(({ Icon, label, hover }) => (
                <a
                  key={label}
                  href="#"
                  aria-label={label}
                  className={`w-[42px] h-[42px] rounded-xl flex items-center justify-center
                    border border-white/10 bg-white/5 text-white
                    transition-all duration-300 hover:-translate-y-1.5 hover:scale-110 hover:shadow-lg
                    ${hover}`}
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* ── COL 2  Quick Links ── */}
          <div
            className={`kj-col ${colInView ? "on" : ""}`}
            style={{ transitionDelay: "180ms" }}
          >
            <SectionHeading>Quick Links</SectionHeading>
            <ul className="space-y-0">
              {quickLinks.map((link, i) => (
                <LinkItem key={link} label={link} delay={i * 50} inView={colInView} />
              ))}
            </ul>
          </div>

          {/* ── COL 3  Services ── */}
          <div
            className={`kj-col ${colInView ? "on" : ""}`}
            style={{ transitionDelay: "280ms" }}
          >
            <SectionHeading>Services</SectionHeading>
            <ul className="space-y-0">
              {services.map((s, i) => (
                <LinkItem key={s} label={s} delay={i * 50 + 80} inView={colInView} />
              ))}
            </ul>
          </div>

          {/* ── COL 4  Brands + CTA ── */}
          <div
            className={`kj-col sm:col-span-2 lg:col-span-1 ${colInView ? "on" : ""}`}
            style={{ transitionDelay: "360ms" }}
          >
            <SectionHeading>Brands We Fix</SectionHeading>

            <div className="flex flex-wrap gap-2 mb-7">
              {brands.map((b, i) => (
                <span
                  key={b}
                  className={`text-[10px] font-bold tracking-[0.18em] uppercase rounded-full
                    px-3 py-1 border border-white/10 bg-white/5 text-white/55
                    cursor-default transition-all duration-300 hover:-translate-y-0.5
                    ${brandColors[i % brandColors.length]}`}
                >
                  {b}
                </span>
              ))}
            </div>

            {/* Free Diagnosis CTA */}
            <div className="rounded-2xl p-5 border border-blue-400/20 bg-gradient-to-br from-blue-600/15 to-violet-600/10 backdrop-blur-sm">
              <div className="flex items-center gap-2 mb-3">
                <Zap size={13} className="text-yellow-400" />
                <span className="text-yellow-400 text-[10px] font-bold tracking-[0.3em] uppercase">
                  Free Diagnosis
                </span>
              </div>
              <p className="text-white/60 text-[13px] leading-relaxed mb-4">
                Walk in or call — we assess your TV for free before any repair begins.
              </p>
              <button
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full
                  bg-gradient-to-r from-blue-600 to-blue-700 text-white
                  text-[11px] font-bold tracking-[0.2em] uppercase
                  shadow-[0_6px_20px_rgba(37,99,235,.4)]
                  hover:shadow-[0_10px_28px_rgba(37,99,235,.55)]
                  hover:-translate-y-0.5 transition-all duration-300
                  border-0 cursor-pointer"
              >
                Book Repair
                <ArrowUpRight size={13} />
              </button>
            </div>
          </div>
        </div>

        {/* ── Divider ── */}
        <div className="relative z-10 px-5">
          <div className="max-w-[1200px] mx-auto">
            <div className={`kj-divider ${colInView ? "on" : ""}`} />
          </div>
        </div>

        {/* ════════════════════════════════
            BOTTOM BAR
        ════════════════════════════════ */}
        <div ref={botRef} className="relative z-10 max-w-[1200px] mx-auto px-5 pt-5 pb-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 flex-wrap">

            {/* Copyright */}
            <div className={`kj-bot ${botInView ? "on" : ""}`} style={{ transitionDelay: "80ms" }}>
              <p className="text-white/25 text-[13px]">
                © 2026{" "}
                <span className="text-blue-400 font-semibold">KJ Electronics</span>
                {" · "}Coimbatore, Tamil Nadu. All rights reserved.
              </p>
            </div>

            {/* Policy links */}
            <div
              className={`kj-bot flex flex-wrap items-center gap-5 ${botInView ? "on" : ""}`}
              style={{ transitionDelay: "180ms" }}
            >
              {["Privacy Policy", "Terms of Service", "Support"].map((item) => (
                <span
                  key={item}
                  className="text-white/30 hover:text-blue-300 text-xs tracking-wide cursor-pointer transition-colors duration-200 hover:underline"
                >
                  {item}
                </span>
              ))}
            </div>

            {/* Back to top */}
            <div className={`kj-bot ${botInView ? "on" : ""}`} style={{ transitionDelay: "280ms" }}>
              <button
                onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                title="Back to top"
                className="w-10 h-10 rounded-xl flex items-center justify-center
                  bg-white/5 border border-white/10 text-blue-400/60
                  hover:bg-blue-400/15 hover:border-blue-400/35
                  hover:-translate-y-1 hover:shadow-[0_8px_20px_rgba(96,165,250,.2)]
                  transition-all duration-300 cursor-pointer"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M12 19V5M5 12l7-7 7 7" />
                </svg>
              </button>
            </div>

          </div>
        </div>
      </footer>
    </>
  );
}