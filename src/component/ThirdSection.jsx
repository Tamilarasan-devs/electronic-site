import { useEffect, useRef, useState } from "react";

const stats = [
  { value: "10+",  raw: 10, suffix: "+",  label: "Years Exp.",   icon: "⚡" },
  { value: "50K+", raw: 50, suffix: "K+", label: "TVs Fixed",    icon: "📺" },
  { value: "3hr",  raw: 3,  suffix: "hr", label: "Same Day",     icon: "🚀" },
  { value: "100%", raw: 100,suffix: "%",  label: "Orig. Parts",  icon: "🛡️" },
];

const brands = [
  "Samsung","Sony","LG","MI","OnePlus",
  "Vu","Philips","Panasonic","TCL","Realme",
];

const features = [
  { icon: "🔧", title: "LED, LCD & Plasma",   desc: "— all panel types serviced" },
  { icon: "⏱",  title: "3-hour express",       desc: "same-day service available" },
  { icon: "✅", title: "Original parts only",  desc: "— no counterfeit components" },
  { icon: "🏆", title: "50,000+ repairs",      desc: "completed since 2014" },
];

function useInView(threshold = 0.2) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);
  return [ref, visible];
}

function Counter({ raw, suffix, active }) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!active) return;
    let current = 0;
    const step = Math.max(1, Math.ceil(raw / 40));
    const id = setInterval(() => {
      current = Math.min(current + step, raw);
      setCount(current);
      if (current >= raw) clearInterval(id);
    }, 28);
    return () => clearInterval(id);
  }, [active, raw]);
  return <>{count}{suffix}</>;
}

export default function KJElectronics() {
  const [heroRef, heroVisible]   = useInView(0.1);
  const [statsRef, statsVisible] = useInView(0.2);
  const [infoRef, infoVisible]   = useInView(0.15);

  return (
    <section className="bg-white text-black  overflow-hidden">

      {/* ── HERO ── */}
      <div
        ref={heroRef}
        className="relative bg-white px-8 lg:px-14 py-16 border-b border-[#f0e6ec] overflow-hidden"
      >
        {/* Soft glow */}
        <div className="pointer-events-none absolute -top-28 -right-24 w-[480px] h-[480px] rounded-full bg-[#890b44]/5 blur-3xl" />

        {/* Pill */}
        <div className={`inline-flex items-center gap-2 bg-[#fdf0f5] border border-[#f2c4d8] text-[#890b44] text-[11px] font-semibold uppercase tracking-widest px-3.5 py-1.5 rounded-full mb-7 transition-all duration-700
          ${heroVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-[#890b44] animate-pulse" />
          Best in Coimbatore
        </div>

        {/* Headline */}
        <h1 className={` text-3xl lg:text-7xl  leading-[0.95] tracking-tight text-black mb-5 transition-all duration-700 delay-100
          ${heroVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
        >
          KJ <em className="italic text-[#890b44]">Electronics</em>
          <br />Service Center
        </h1>

        {/* Sub */}
        <p className={`text-xl text-gray-700 leading-relaxed max-w-xl mb-10 transition-all duration-700 delay-150
          ${heroVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
        >
          Coimbatore's most trusted LED & LCD TV repair specialists with{" "}
          <strong className="text-black font-semibold">10+ years</strong> of proven excellence.
          Fast turnaround, original parts, zero compromise.
        </p>

        {/* Stats */}
        <div
          ref={statsRef}
          className={`grid grid-cols-4 gap-3 mb-10 transition-all duration-700 delay-200
            ${heroVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
        >
          {stats.map((s, i) => (
            <div
              key={i}
              className="group bg-[#fdf0f5] border border-[#f2c4d8] rounded-2xl py-5 px-3 text-center hover:bg-[#890b44] transition-all duration-200 hover:-translate-y-1 cursor-default"
            >
              <div className="text-lg mb-2">{s.icon}</div>
              <div className="font-serif text-[26px] font-bold text-[#890b44] group-hover:text-white leading-none mb-1 transition-colors">
                <Counter raw={s.raw} suffix={s.suffix} active={statsVisible} />
              </div>
              <div className="text-[10px] uppercase tracking-widest text-gray-400 group-hover:text-white/80 font-semibold transition-colors">
                {s.label}
              </div>
            </div>
          ))}
        </div>

        {/* CTA Buttons */}
        <div className={`flex gap-3 flex-wrap transition-all duration-700 delay-300
          ${heroVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
        >
          <button className="inline-flex items-center gap-2 bg-[#890b44] hover:bg-[#6e0936] active:scale-[0.98] text-white text-lg font-medium px-7 py-3.5 rounded-full transition-all">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/>
              <line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>
            </svg>
            Book Repair
          </button>
          <button className="inline-flex items-center gap-2 border-[1.5px] border-[#890b44] hover:bg-[#890b44] text-[#890b44] hover:text-white text-lg font-medium px-7 py-3.5 rounded-full transition-all">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.56 1.18h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
            </svg>
            Call Now
          </button>
        </div>
      </div>

      {/* ── MAIN 2-COL ── */}
      <div className="bg-white px-6 lg:px-16 py-20">

  {/* TOP CONTENT */}
  <div className="max-w-3xl mb-14">
    <p className="text-sm uppercase tracking-[0.2em] text-[#890b44] font-semibold mb-3">
      Why choose us
    </p>

    <h2 className="text-4xl lg:text-5xl font-bold text-[#1f1f1f] leading-tight">
      Expert care for every{" "}
      <span className="text-[#890b44]">screen</span>
    </h2>
  </div>

  {/* IMAGE + FEATURES */}
  <div className="grid lg:grid-cols-2 gap-12 items-center">

    {/* IMAGE */}
    <div className="relative">
      <img
        src="https://media.istockphoto.com/id/1334581715/photo/technician-disassembling-tv-set.jpg?s=612x612&w=0&k=20&c=rMGqdCfMXbWUX_OoZ_WZqE9-cV68zGnV6mxsL4uZw2I="
        alt="TV Repair"
        className="w-full h-[420px] object-cover rounded-2xl shadow-lg"
      />

      <div className="absolute bottom-5 left-5 bg-white border border-[#f3d6e3] px-4 py-2 rounded-lg shadow-sm flex items-center gap-2">
        <span className="w-2.5 h-2.5 bg-green-500 rounded-full animate-pulse"></span>
        <span className="text-sm text-gray-700 font-medium">
          Available today
        </span>
      </div>
    </div>

    {/* FEATURES */}
    <div className="grid gap-5">
      {features.map((f, i) => (
        <div
          key={i}
          className="flex items-start gap-4 p-5 rounded-xl border border-[#f3d6e3] bg-[#fdf2f7] hover:bg-white hover:shadow-md transition"
        >
          <div className="w-11 h-11 flex items-center justify-center rounded-lg bg-white border border-[#f3d6e3] text-[#890b44] text-lg">
            {f.icon}
          </div>

          <div>
            <p className="font-semibold text-[#1f1f1f] text-lg">
              {f.title}
            </p>
            <p className="text-sm text-gray-600 leading-relaxed">
              {f.desc}
            </p>
          </div>
        </div>
      ))}
    </div>
  </div>

  {/* BRANDS */}
  <div className="mt-14">
    <p className="text-lg font-semibold text-gray-700 mb-4 uppercase tracking-wide">
      Brands we service
    </p>

    <div className="flex flex-wrap gap-2">
      {brands.map((b, i) => (
        <span
          key={i}
          className="px-4 py-1.5 text-md rounded-full bg-[#fdf2f7] border border-[#f3d6e3] text-[#890b44] hover:bg-[#890b44] hover:text-white transition"
        >
          {b}
        </span>
      ))}
    </div>
  </div>

  {/* DESCRIPTION */}
  <p className="mt-6 max-w-2xl text-gray-600 leading-relaxed text-lg">
    We repair all major TV brands using genuine parts and expert technicians.
    Every repair is handled with precision to ensure long-lasting performance
    and complete customer satisfaction.
  </p>
</div>
    </section>
  );
}