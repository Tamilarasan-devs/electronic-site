import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

// ── Inline SVGs ──────────────────────────────────────────────
const TvIcon = () => (
  <svg className="w-5 h-5 text-amber-400" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
    <rect x="2" y="3" width="20" height="14" rx="2" />
    <path d="M8 21h8M12 17v4" />
  </svg>
);
const ArrowIcon = () => (
  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
    <path d="M5 12h14M12 5l7 7-7 7" />
  </svg>
);
const ChevronIcon = () => (
  <svg className="w-4 h-4 text-slate-300" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
    <path d="M9 18l6-6-6-6" />
  </svg>
);
const PhoneIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
    <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81a19.79 19.79 0 01-3.07-8.72A2 2 0 012.18 1h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.91 8.15a16 16 0 006 6l1.52-1.52a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 14.92z" />
  </svg>
);

// ── Nav config — matches your AppRoutes exactly ──────────────
const navLinks = [
  { label: "Home",    path: "/"        },
  { label: "About",   path: "/about"   },
  { label: "Service", path: "/service" },
  { label: "Brand",   path: "/brand"   },
  { label: "Gallery", path: "/gallery" },
  { label: "Contact", path: "/contact" },
];

// ── Component ────────────────────────────────────────────────
export default function Header() {
  const location  = useLocation();   // tracks current route automatically
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Auto-close mobile menu when route changes
  useEffect(() => { setMenuOpen(false); }, [location.pathname]);

  // Shadow on scroll
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Active check — exact match for "/", prefix match for others
  const isActive = (path) =>
    path === "/" ? location.pathname === "/" : location.pathname.startsWith(path);

  return (
    <>
      <style>{`
       

        /* CTA shine sweep */
        .cta-shine { overflow: hidden; position: relative; }
        .cta-shine::before {
          content: '';
          position: absolute;
          top: 0; left: -100%;
          width: 60%; height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.22), transparent);
          transform: skewX(-15deg);
          transition: left 0.45s ease;
        }
        .cta-shine:hover::before { left: 160%; }

        /* Mobile drawer animation */
        .drawer { max-height: 0; overflow: hidden; opacity: 0; transition: max-height 0.38s ease, opacity 0.28s ease; }
        .drawer.open { max-height: 560px; opacity: 1; }
      `}</style>

      <header
        className={`w-full sticky top-0 z-50  bg-white/95 backdrop-blur-md border-b border-slate-100 transition-all duration-300 ${
          scrolled ? "shadow-[0_4px_32px_rgba(15,23,42,0.09)]" : "shadow-none"
        }`}
      >
        {/* ── Amber accent bar ── */}
        <div className="h-[3px] w-full bg-[#890b44]" />

        {/* ── Main row ── */}
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10 flex items-center justify-between gap-4 py-3.5">

          {/* ════ LOGO ════ */}
          <Link to="/" className="flex items-center gap-3 group shrink-0 no-underline">
            <div className="w-11 h-11 rounded-2xl bg-slate-900 flex items-center justify-center shadow-[0_4px_14px_rgba(15,23,42,0.25)] group-hover:-rotate-6 group-hover:scale-105 transition-all duration-300">
              <TvIcon />
            </div>
            <div className="flex flex-col">
              <span className="text-[17px] font-extrabold leading-none tracking-tight text-slate-900">
                KJ <span className="text-[#890b44]">Electronics</span>
              </span>
              
            </div>
          </Link>

          {/* ════ DESKTOP NAV ════ */}
          <nav className="hidden md:flex items-center bg-slate-50 border border-slate-200/70 rounded-full px-2 py-[5px] gap-0.5 shadow-inner">
            {navLinks.map(({ label, path }) => (
              <Link
                key={path}
                to={path}
                className={` text-[14px]  tracking-[2px] font-bold uppercase px-[18px] py-[7px] rounded-full no-underline transition-all duration-200
                  ${isActive(path)
                    ? "bg-white text-[#890b44] shadow-[0_1px_6px_rgba(15,23,42,0.10)]"
                    : "text-slate-400 hover:bg-white/70 hover:text-slate-700"
                  }`}
              >
                {label}
              </Link>
            ))}
          </nav>

          {/* ════ RIGHT ACTIONS ════ */}
          <div className="hidden md:flex items-center gap-3 shrink-0">

            {/* Phone badge */}
            

            {/* Divider */}
            <span className="w-px h-5 bg-slate-200 shrink-0" />

            {/* Book Repair → navigates to /contact */}
            <Link
              to="/contact"
              className="cta-shine flex items-center gap-2 px-6 py-[9px] rounded-full bg-[#890b44] text-white  text-[14px]  tracking-[2px] uppercase no-underline shadow-[0_4px_18px_rgba(15,23,42,0.20)] hover:-translate-y-0.5 hover:shadow-[0_8px_28px_rgba(15,23,42,0.30)] active:translate-y-0 transition-all duration-200"
            >
              Book Repair
              <ArrowIcon />
            </Link>
          </div>

          {/* ════ MOBILE HAMBURGER ════ */}
          <button
            aria-label="Toggle menu"
            onClick={() => setMenuOpen(!menuOpen)}
            className={`md:hidden w-10 h-10 rounded-xl border flex items-center justify-center transition-all duration-200
              ${menuOpen
                ? "bg-slate-900 border-slate-900 text-white"
                : "bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100"
              }`}
          >
            {menuOpen ? (
              <svg className="w-[18px] h-[18px]" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-[18px] h-[18px]" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path d="M3 12h18M3 6h18M3 18h18" />
              </svg>
            )}
          </button>
        </div>

        {/* ════ MOBILE DRAWER ════ */}
        <div className={`drawer md:hidden border-t border-slate-100 ${menuOpen ? "open" : ""}`}>
          <div className="px-5 pt-4 pb-6 flex flex-col">

            {/* Nav links */}
            {navLinks.map(({ label, path }, i) => (
              <Link
                key={path}
                to={path}
                className={`flex items-center justify-between py-3.5  text-[11.5px] font-bold tracking-[2.5px] uppercase no-underline transition-colors duration-150
                  ${i < navLinks.length - 1 ? "border-b border-slate-100" : ""}
                  ${isActive(path)
                    ? "text-amber-500"
                    : "text-slate-400 hover:text-slate-800"
                  }`}
              >
                <span className="flex items-center gap-3">
                  {isActive(path) && (
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-400 shadow-[0_0_6px_rgba(251,191,36,0.8)]" />
                  )}
                  {label}
                </span>
                <ChevronIcon />
              </Link>
            ))}

            {/* Mobile CTAs */}
            <div className="mt-5 flex flex-col gap-3">
              <a
                href="tel:+919876543210"
                className="flex items-center justify-center gap-2.5 py-3 rounded-xl border border-slate-200 bg-slate-50 font-syne text-[11.5px] font-bold tracking-wide text-slate-600 no-underline hover:border-amber-300 hover:bg-amber-50/60 transition-all duration-200"
              >
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <PhoneIcon />
                +91 98765 43210
              </a>

              <Link
                to="/contact"
                className="cta-shine block text-center py-3.5 rounded-xl bg-slate-900 text-white font-syne text-[11.5px] font-bold tracking-[2.5px] uppercase no-underline shadow-[0_6px_20px_rgba(15,23,42,0.22)] hover:shadow-[0_10px_28px_rgba(15,23,42,0.30)] hover:-translate-y-0.5 transition-all duration-200"
              >
                Book a Repair
              </Link>
            </div>
          </div>
        </div>

      </header>
    </>
  );
}