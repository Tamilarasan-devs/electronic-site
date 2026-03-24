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

      <section className="w-full bg-white py-24 px-6 lg:px-16">

  <div className="max-w-6xl mx-auto">

    {/* HEADER */}
    <div
      ref={headerRef}
      className={`text-center mb-20 transition-all duration-700 ${
        headerInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      }`}
    >
      <p className="text-lg uppercase tracking-[0.2em] text-[#890b44] font-semibold mb-3">
        Why choose us
      </p>

      <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
        Expert care for every{" "}
        <span className="text-[#890b44] italic">screen</span>
      </h2>
    </div>

    {/* FEATURE CARDS */}
    <div
      ref={cardsRef}
      className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
    >
      {features.map((item, i) => {
        const Icon = item.icon;

        return (
          <div
            key={item.id}
            className={`group border border-[#f3d6e3] bg-[#fdf2f7] rounded-2xl p-6 flex flex-col gap-5
            transition-all duration-500 hover:bg-white hover:shadow-xl hover:-translate-y-2
            ${cardsInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
          >

            {/* ICON + TAG */}
            <div className="flex items-center justify-between">
              <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-white border border-[#f3d6e3] text-[#890b44] group-hover:scale-110 transition">
                <Icon size={22} />
              </div>

              <span className="text-[10px] tracking-widest uppercase px-3 py-1 rounded-full bg-white border border-[#f3d6e3] text-[#890b44] font-semibold">
                {item.tag}
              </span>
            </div>

            {/* TITLE */}
            <h3 className="text-xl font-semibold text-gray-900">
              {item.title}
            </h3>

            {/* DESCRIPTION */}
            <p className="text-sm text-gray-600 leading-relaxed">
              {item.description}
            </p>

            {/* STAT */}
            <div className="mt-auto">
              <p className="text-4xl font-bold text-[#890b44]">
                <AnimatedCounter
                  target={item.stat}
                  inView={cardsInView}
                  delay={i * 150}
                />
              </p>
              <p className="text-xs uppercase tracking-widest text-gray-500">
                {item.statLabel}
              </p>
            </div>
          </div>
        );
      })}
    </div>

    {/* TRUST STRIP */}
    <div
      ref={trustRef}
      className="grid md:grid-cols-3 gap-6 mt-16"
    >
      {trustItems.map((item, i) => {
        const Icon = item.icon;

        return (
          <div
            key={item.label}
            className={`flex items-center gap-4 p-5 rounded-xl border border-[#f3d6e3] bg-white
            hover:shadow-md transition-all duration-300
            ${trustInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
          >

            <div className="w-11 h-11 flex items-center justify-center rounded-lg bg-[#fdf2f7] border border-[#f3d6e3] text-[#890b44]">
              <Icon size={20} />
            </div>

            <div>
              <p className="font-semibold text-gray-900">
                {item.label}
              </p>
              <p className="text-sm text-gray-500">
                {item.sub}
              </p>
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