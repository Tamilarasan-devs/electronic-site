import React from "react";
import { ShieldCheck, Wrench, Handshake } from "lucide-react";

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
  },
];

export default function WhyChoose() {
  return (
    <section className="w-full bg-[#0a0000] py-24 px-6 md:px-12 relative overflow-hidden">

      {/* Background Glows */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[350px] rounded-full bg-red-800/10 blur-[130px]" />
        <div className="absolute bottom-0 left-0 w-[350px] h-[350px] rounded-full bg-red-900/8 blur-[100px]" />
        <div className="absolute bottom-0 right-0 w-[350px] h-[350px] rounded-full bg-red-900/8 blur-[100px]" />
        {/* Top hairline */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[1px] bg-gradient-to-r from-transparent via-red-600/25 to-transparent" />
        {/* Bottom hairline */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[900px] h-[1px] bg-gradient-to-r from-transparent via-red-600/25 to-transparent" />
        {/* Subtle grid */}
        <div
          className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
      </div>

      <div className="relative max-w-7xl mx-auto">

        {/* ── HEADER ── */}
        <div className="text-center mb-20 flex flex-col items-center gap-4">
          <p className="text-[10px] font-medium tracking-[4px] text-red-500 uppercase">
            Our Promise
          </p>

          <h2
            className="text-5xl md:text-7xl text-white uppercase leading-none tracking-widest"
            style={{ fontFamily: "'Bebas Neue', sans-serif" }}
          >
            Why{" "}
            <span className="text-red-600 drop-shadow-[0_0_24px_rgba(220,38,38,0.7)]">
              Choose
            </span>{" "}
            Us
          </h2>

          <div className="flex items-center gap-3">
            <span className="w-8 h-[2px] bg-red-600" />
            <p className="text-white/40 text-xs font-medium tracking-[3px] uppercase italic">
              Experience Unmatched Service & Expertise
            </p>
            <span className="w-8 h-[2px] bg-red-600" />
          </div>
        </div>

        {/* ── CARDS ── */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {features.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={item.id}
                className="group relative bg-white/[0.03] hover:bg-red-950/25 border border-white/[0.06] hover:border-red-600/40 rounded-3xl p-8 flex flex-col gap-6 transition-all duration-500 cursor-default hover:-translate-y-2 hover:shadow-[0_20px_60px_rgba(220,38,38,0.12)] overflow-hidden"
              >
                {/* Card inner top glow */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-[1px] bg-gradient-to-r from-transparent via-red-600/0 group-hover:via-red-600/40 to-transparent transition-all duration-500" />

                {/* Card inner gradient wash */}
                <div className="absolute inset-0 bg-gradient-to-b from-red-600/0 to-red-900/0 group-hover:from-red-600/5 group-hover:to-red-900/5 rounded-3xl transition-all duration-500" />

                {/* Ghost number watermark */}
                <span
                  className="absolute bottom-4 right-6 text-[100px] leading-none text-white/[0.03] group-hover:text-red-600/[0.08] select-none transition-all duration-500"
                  style={{ fontFamily: "'Bebas Neue', sans-serif" }}
                >
                  0{item.id}
                </span>

                {/* Top row: icon + tag */}
                <div className="relative flex items-center justify-between">
                  {/* Icon box */}
                  <div className="w-14 h-14 rounded-2xl bg-red-600/10 border border-red-600/20 group-hover:bg-red-600 group-hover:border-red-600 group-hover:shadow-[0_0_24px_rgba(220,38,38,0.5)] flex items-center justify-center transition-all duration-400">
                    <Icon
                      size={24}
                      className="text-red-400 group-hover:text-white transition-colors duration-300"
                    />
                  </div>

                  {/* Tag pill */}
                  <span className="text-[9px] font-medium tracking-[2px] text-red-500/60 group-hover:text-red-400 uppercase border border-red-700/20 group-hover:border-red-600/40 rounded-full px-3 py-1 transition-all duration-300">
                    {item.tag}
                  </span>
                </div>

                {/* Divider */}
                <div className="relative w-full h-[1px] bg-gradient-to-r from-white/[0.04] via-white/[0.08] to-transparent group-hover:from-red-700/20 group-hover:via-red-600/30 transition-all duration-500" />

                {/* Content */}
                <div className="relative flex flex-col gap-3">
                  <h3
                    className="text-2xl text-white uppercase tracking-wide leading-tight group-hover:text-red-50 transition-colors duration-300"
                    style={{ fontFamily: "'Bebas Neue', sans-serif" }}
                  >
                    {item.title}
                  </h3>
                  <p className="text-white/40 text-sm leading-relaxed font-light group-hover:text-white/55 transition-colors duration-300">
                    {item.description}
                  </p>
                </div>

                {/* Stat block */}
                <div className="relative mt-auto flex items-end justify-between">
                  <div>
                    <p
                      className="text-4xl text-red-600 group-hover:drop-shadow-[0_0_12px_rgba(220,38,38,0.8)] leading-none transition-all duration-300"
                      style={{ fontFamily: "'Bebas Neue', sans-serif" }}
                    >
                      {item.stat}
                    </p>
                    <p className="text-[10px] tracking-[2px] text-white/30 uppercase mt-1">
                      {item.statLabel}
                    </p>
                  </div>

                  {/* Arrow button */}
                  <div className="w-9 h-9 rounded-full border border-white/10 group-hover:border-red-600/50 group-hover:bg-red-600/10 flex items-center justify-center opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                    <span className="relative inline-block w-3 h-px bg-red-500">
                      <span className="absolute right-0 top-[-3px] w-1.5 h-1.5 border-t border-r border-red-500 rotate-45 inline-block" />
                    </span>
                  </div>
                </div>

              </div>
            );
          })}
        </div>

        {/* ── BOTTOM TRUST STRIP ── */}
        <div className="mt-16 grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            { label: "Same-Day Service", sub: "Repairs within 3 hours" },
            { label: "Original Spare Parts", sub: "No counterfeit components" },
            { label: "Warranty on Repairs", sub: "Peace of mind guaranteed" },
          ].map((item) => (
            <div
              key={item.label}
              className="group flex items-center gap-4 bg-white/[0.02] hover:bg-red-950/20 border border-white/[0.05] hover:border-red-700/30 rounded-2xl px-6 py-5 transition-all duration-300"
            >
              {/* Dot */}
              <span className="shrink-0 w-2 h-2 rounded-full bg-red-600 shadow-[0_0_8px_rgba(220,38,38,0.7)] group-hover:shadow-[0_0_14px_rgba(220,38,38,1)] transition-all duration-300" />
              <div>
                <p className="text-white text-sm font-semibold tracking-wide group-hover:text-red-100 transition-colors duration-300">
                  {item.label}
                </p>
                <p className="text-white/30 text-xs tracking-wide mt-0.5">
                  {item.sub}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>

      <style>{`@import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&display=swap');`}</style>
    </section>
  );
}