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
  
      <section className="bg-white px-6 lg:px-16 relative overflow-hidden">

  <div className="max-w-6xl mx-auto">

    {/* HEADER */}
    <div
      ref={headerRef}
      className={`text-center mb-16 transition-all duration-700 ${
        headerInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      }`}
    >
      <p className="text-xl uppercase tracking-[0.2em] text-[#890b44] font-semibold mb-3">
        Our Achievements
      </p>

      <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
        Numbers that define our{" "}
        <span className="text-[#890b44] italic">success</span>
      </h2>
    </div>

    {/* STATS GRID */}
    <div
      ref={gridRef}
      className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6"
    >
      {stats.map((stat, i) => {
        const Icon = stat.icon;

        return (
          <div
            key={stat.id}
            onMouseEnter={() => setHovered(stat.id)}
            onMouseLeave={() => setHovered(null)}
            className={`group rounded-2xl border border-[#f3d6e3] bg-[#fdf2f7] p-6 flex flex-col gap-4
            transition-all duration-500 hover:bg-white hover:shadow-xl hover:-translate-y-2
            ${gridInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
          >

            {/* ICON + TAG */}
            <div className="flex items-center justify-between">
              <div className="w-11 h-11 flex items-center justify-center rounded-lg bg-white border border-[#f3d6e3] text-[#890b44] group-hover:scale-110 transition">
                <Icon size={20} />
              </div>

              <span className="text-[10px] uppercase tracking-widest px-3 py-1 rounded-full bg-white border border-[#f3d6e3] text-[#890b44] font-semibold">
                {stat.tag}
              </span>
            </div>

            {/* VALUE */}
            <div>
              <h3 className="text-3xl font-bold text-[#890b44]">
                <AnimatedCounter
                  target={stat.value}
                  inView={gridInView}
                  delay={i * 120}
                />
              </h3>

              <p className="font-semibold text-gray-900 mt-1">
                {stat.label}
              </p>

              <p className="text-sm text-gray-500">
                {stat.sub}
              </p>
            </div>

            {/* PROGRESS BAR */}
            <div className="w-full h-[3px] bg-[#f3d6e3] rounded-full overflow-hidden">
              <div
                className={`h-full bg-[#890b44] transition-all duration-1000 ${
                  gridInView ? "w-full" : "w-0"
                }`}
              />
            </div>

            {/* HOVER ARROW */}
            <div className="flex justify-end">
              <div className="opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition">
                <ArrowUpRight className="text-[#890b44]" size={18} />
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