import { useState } from "react";

/* ─────────────────────────────────────────
   DATA
───────────────────────────────────────── */
const services = [
  {
    id: 1,
    num: "01",
    title: "Panel & Display Repairs",
    desc: "Complete diagnosis and restoration of LCD and LED panels — from backlight failures to full screen replacements.",
    tags: ["LED Backlight", "Panel Swap", "Calibration"],
  },
  {
    id: 2,
    num: "02",
    title: "Motherboard & PCB",
    desc: "Component-level repair of power boards, T-CON boards, and main PCBs with precision soldering tools.",
    tags: ["PCB Repair", "Power Board", "Soldering"],
  },
  {
    id: 3,
    num: "03",
    title: "Spare Parts Supply",
    desc: "Genuine and compatible parts in stock for most major brands — no long waits, same-day fitment available.",
    tags: ["OEM Parts", "Remotes", "Stands"],
  },
  {
    id: 4,
    num: "04",
    title: "Technical Support",
    desc: "Phone and in-person consultation before any repair begins — transparent quotes, no hidden charges.",
    tags: ["Phone Help", "In-Home Visit", "Mail-In"],
  },
];

const stats = [
  { value: "10+", label: "Years in Service" },
  { value: "5,000+", label: "TVs Repaired" },
  { value: "Same Day", label: "Turnaround" },
  { value: "₹0", label: "Diagnosis Fee" },
];

const brands = ["Samsung", "LG", "Sony", "Panasonic", "Philips", "Onida", "Videocon", "Mi"];

/* ─────────────────────────────────────────
   COMPONENT
───────────────────────────────────────── */
export default function AboutUs() {
  const [hovered, setHovered] = useState(null);

  return (
    <div
      className=" bg-[#FAF8F4] text-[#1a1a1a] mt-24"
      style={{ fontFamily: "'Georgia', 'Times New Roman', serif" }}
    >
      {/* ── Top bar ── */}
      <header className="border-b border-[#1a1a1a]/10 px-6 md:px-14 lg:px-20 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-7 h-7 bg-[#1a1a1a] rounded-sm flex items-center justify-center">
            <svg className="w-4 h-4 text-[#FAF8F4]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="2" y="3" width="20" height="14" rx="2" />
              <line x1="8" y1="21" x2="16" y2="21" />
              <line x1="12" y1="17" x2="12" y2="21" />
            </svg>
          </div>
          <span className="text-sm tracking-widest uppercase font-sans font-medium text-[#1a1a1a]">
            Sri Vinayaga Electronics
          </span>
        </div>
        <a
          href="tel:+91"
          className="text-xs tracking-widest uppercase font-sans font-medium border border-[#1a1a1a]/20 px-4 py-2 rounded-full hover:bg-[#1a1a1a] hover:text-[#FAF8F4] transition-all duration-200"
        >
          Contact Us
        </a>
      </header>

      {/* ── Hero ── */}
      <section className="px-6 md:px-14 lg:px-20 pt-20 pb-16 border-b border-[#1a1a1a]/10">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-end">
          {/* Left */}
          <div>
            <p className="text-xs tracking-[0.25em] uppercase font-sans text-[#1a1a1a]/40 mb-6">
              Est. Coimbatore · TV Service Center
            </p>
            <h1 className="text-6xl md:text-8xl font-normal leading-[0.9] tracking-tight mb-8 text-[#1a1a1a]">
              Your TV,<br />
              <em className="italic">Repaired.</em>
            </h1>
            <div className="w-12 h-px bg-[#1a1a1a]/30 mb-8" />
            <p className="text-base font-sans font-normal text-[#1a1a1a]/60 leading-relaxed max-w-sm">
              Specialists in LCD &amp; LED television repair, motherboard diagnostics,
              and genuine spare parts — trusted by thousands in Coimbatore.
            </p>
          </div>

          {/* Right — stats */}
          <div className="grid grid-cols-2 gap-px bg-[#1a1a1a]/10 border border-[#1a1a1a]/10 rounded-2xl overflow-hidden">
            {stats.map((s, i) => (
              <div
                key={s.label}
                className={`bg-[#FAF8F4] p-7 ${i === 3 ? "col-span-2 sm:col-span-1" : ""}`}
              >
                <p className="text-4xl font-normal text-[#1a1a1a] mb-1 tracking-tight">{s.value}</p>
                <p className="text-xs font-sans uppercase tracking-widest text-[#1a1a1a]/40">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── About ── */}
      <section className="px-6 md:px-14 lg:px-20 py-20 border-b border-[#1a1a1a]/10">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-16">
          <div>
            <p className="text-xs tracking-[0.25em] uppercase font-sans text-[#1a1a1a]/40 mb-3">About</p>
            <p className="text-xl font-normal leading-snug text-[#1a1a1a]/70">
              Who we are &amp; what we stand for
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            <p className="text-base font-sans font-normal text-[#1a1a1a]/60 leading-relaxed">
              Sri Vinayaga Electronics has been Coimbatore's go-to TV repair center for over a decade.
              Our technicians are trained across all major brands and specialize in both LCD and LED technology —
              from panel-level repairs to deep PCB diagnostics.
            </p>
            <p className="text-base font-sans font-normal text-[#1a1a1a]/60 leading-relaxed">
              We believe in transparency first. Every repair starts with a free diagnosis and a clear quote
              before any work begins. We stock genuine parts and compatible alternatives so you're never
              waiting longer than necessary.
            </p>
          </div>
        </div>
      </section>

      {/* ── Services ── */}
      <section className="px-6 md:px-14 lg:px-20 py-20 border-b border-[#1a1a1a]/10">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-end justify-between mb-12">
            <div>
              <p className="text-xs tracking-[0.25em] uppercase font-sans text-[#1a1a1a]/40 mb-3">Services</p>
              <h2 className="text-4xl md:text-5xl font-normal text-[#1a1a1a] leading-tight">
                What we<br /><em className="italic">do best</em>
              </h2>
            </div>
            <p className="hidden md:block text-sm font-sans text-[#1a1a1a]/40 max-w-[180px] text-right leading-relaxed">
              Click any service to learn more
            </p>
          </div>

          <div className="divide-y divide-[#1a1a1a]/10 border-y border-[#1a1a1a]/10">
            {services.map((s) => (
              <div
                key={s.id}
                className={`grid grid-cols-[60px_1fr] md:grid-cols-[60px_1fr_auto] gap-6 md:gap-10 py-8 cursor-pointer group transition-all duration-300 ${hovered === s.id ? "bg-[#1a1a1a]/[0.02]" : ""}`}
                onMouseEnter={() => setHovered(s.id)}
                onMouseLeave={() => setHovered(null)}
              >
                {/* Number */}
                <p className="text-xs font-sans tracking-widest text-[#1a1a1a]/25 pt-1">{s.num}</p>

                {/* Content */}
                <div>
                  <h3 className={`text-2xl md:text-3xl font-normal mb-3 transition-all duration-200 ${hovered === s.id ? "translate-x-2" : ""} text-[#1a1a1a]`}>
                    {s.title}
                  </h3>
                  <p className="text-sm font-sans text-[#1a1a1a]/55 leading-relaxed max-w-lg mb-4">{s.desc}</p>
                  <div className="flex flex-wrap gap-2">
                    {s.tags.map((tag) => (
                      <span key={tag} className="text-[10px] font-sans font-medium uppercase tracking-widest px-3 py-1 border border-[#1a1a1a]/15 rounded-full text-[#1a1a1a]/50">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Arrow */}
                <div className={`hidden md:flex items-center justify-end transition-all duration-300 ${hovered === s.id ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-2"}`}>
                  <div className="w-10 h-10 rounded-full border border-[#1a1a1a]/20 flex items-center justify-center">
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <path d="M7 17L17 7M17 7H7M17 7v10" />
                    </svg>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Brands ── */}
      <section className="px-6 md:px-14 lg:px-20 py-14 border-b border-[#1a1a1a]/10 overflow-hidden">
        <div className="max-w-6xl mx-auto">
          <p className="text-xs tracking-[0.25em] uppercase font-sans text-[#1a1a1a]/30 mb-8 text-center">
            Brands we service
          </p>
          <div className="flex flex-wrap justify-center gap-x-10 gap-y-3">
            {brands.map((b) => (
              <span key={b} className="text-lg font-normal text-[#1a1a1a]/25 hover:text-[#1a1a1a]/70 transition-colors duration-200 cursor-default">
                {b}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ── Why Us ── */}
      <section className="px-6 md:px-14 lg:px-20 py-20 border-b border-[#1a1a1a]/10">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-16 items-start">
            <div>
              <p className="text-xs tracking-[0.25em] uppercase font-sans text-[#1a1a1a]/40 mb-3">Why Us</p>
              <h2 className="text-4xl font-normal leading-tight text-[#1a1a1a]">
                The Sri Vinayaga<br /><em className="italic">difference</em>
              </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              {[
                { title: "Free diagnosis", body: "We assess your TV at zero cost before quoting any repair price. No surprises, ever." },
                { title: "Same-day repairs", body: "Most standard repairs are completed within the day. We respect your time." },
                { title: "Genuine parts", body: "OEM and trusted compatible parts sourced from verified suppliers — stocked in-house." },
                { title: "Expert team", body: "Certified technicians trained on all major brands with 10+ years of hands-on experience." },
              ].map((item) => (
                <div key={item.title} className="group">
                  <div className="w-6 h-px bg-[#1a1a1a]/30 mb-5 group-hover:w-10 transition-all duration-300" />
                  <h4 className="text-base font-sans font-semibold text-[#1a1a1a] mb-2 tracking-tight">{item.title}</h4>
                  <p className="text-sm font-sans text-[#1a1a1a]/55 leading-relaxed">{item.body}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="px-6 md:px-14 lg:px-20 py-24">
        <div className="max-w-6xl mx-auto">
          <div className="bg-[#1a1a1a] rounded-3xl p-10 md:p-16 grid grid-cols-1 md:grid-cols-[1fr_auto] gap-10 items-center">
            <div>
              <p className="text-xs tracking-[0.25em] uppercase font-sans text-white/30 mb-4">
                Free · No obligation
              </p>
              <h2 className="text-4xl md:text-5xl font-normal text-white leading-tight mb-3">
                Bring your TV in.<br />
                <em className="italic text-white/60">We'll take it from here.</em>
              </h2>
              <p className="text-sm font-sans text-white/45 mt-4 max-w-md leading-relaxed">
                Walk in to our Coimbatore service center or call ahead. Diagnosis is always free —
                you only pay when you're happy with the quote.
              </p>
            </div>
            <div className="flex flex-col gap-3">
              <a
                href="tel:+91"
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl bg-white text-[#1a1a1a] text-sm font-sans font-semibold hover:bg-[#FAF8F4] transition-all duration-200 whitespace-nowrap"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 1.27h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L7.91 9a16 16 0 0 0 6.29 6.29l1.07-1.07a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                </svg>
                Call Now
              </a>
              <button className="inline-flex items-center justify-center px-7 py-3.5 rounded-xl border border-white/15 text-white text-sm font-sans hover:bg-white/5 transition-all duration-200 whitespace-nowrap">
                Get Directions
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="border-t border-[#1a1a1a]/10 px-6 md:px-14 lg:px-20 py-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-xs font-sans text-[#1a1a1a]/30 tracking-wide">
          © 2024 Sri Vinayaga Electronics · Coimbatore, Tamil Nadu
        </p>
        <p className="text-xs font-sans text-[#1a1a1a]/30 tracking-wide">
          LCD · LED · Spare Parts · PCB Repair
        </p>
      </footer>
    </div>
  );
}