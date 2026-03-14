import React from "react";
import { Tv, Users, Star, BadgeCheck } from "lucide-react";

const stats = [
  {
    id: 1,
    icon: Tv,
    value: "5K+",
    label: "Projects Completed",
    sub: "Successful TV repairs done",
  },
  {
    id: 2,
    icon: Users,
    value: "29K+",
    label: "Service Experts",
    sub: "Certified trained technicians",
  },
  {
    id: 3,
    icon: Star,
    value: "9K+",
    label: "Satisfied Customers",
    sub: "Happy clients across Coimbatore",
  },
  {
    id: 4,
    icon: BadgeCheck,
    value: "74%",
    label: "Service Quality",
    sub: "Rated excellent by customers",
  },
];

export default function StatsSection() {
  return (
    <section className="w-full bg-[#0a0000] py-24 px-6 md:px-12 relative overflow-hidden">

      {/* Background Glows */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] rounded-full bg-red-800/10 blur-[130px]" />
        <div className="absolute bottom-0 left-0 w-[350px] h-[300px] rounded-full bg-red-900/8 blur-[100px]" />
        <div className="absolute bottom-0 right-0 w-[350px] h-[300px] rounded-full bg-red-900/8 blur-[100px]" />
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
            Numbers That Speak
          </p>

          <h2
            className="text-5xl md:text-7xl text-white uppercase leading-none tracking-widest"
            style={{ fontFamily: "'Bebas Neue', sans-serif" }}
          >
            Our{" "}
            <span className="text-red-600 drop-shadow-[0_0_24px_rgba(220,38,38,0.7)]">
              Achievements
            </span>
          </h2>

          <div className="flex items-center gap-3">
            <span className="w-8 h-[2px] bg-red-600" />
            <p className="text-white/40 text-xs font-medium tracking-[3px] uppercase italic">
              Trusted by Thousands for Top‑Notch Service
            </p>
            <span className="w-8 h-[2px] bg-red-600" />
          </div>
        </div>

        {/* ── STATS GRID ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <div
                key={stat.id}
                className="group relative bg-white/[0.03] hover:bg-red-950/25 border border-white/[0.06] hover:border-red-600/40 rounded-3xl p-8 flex flex-col gap-5 transition-all duration-500 cursor-default hover:-translate-y-2 hover:shadow-[0_20px_60px_rgba(220,38,38,0.12)] overflow-hidden"
              >
                {/* Top inner glow line */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-[1px] bg-gradient-to-r from-transparent via-red-600/0 group-hover:via-red-600/40 to-transparent transition-all duration-500" />

                {/* Inner gradient wash */}
                <div className="absolute inset-0 bg-gradient-to-b from-red-600/0 to-red-900/0 group-hover:from-red-600/5 group-hover:to-red-900/5 rounded-3xl transition-all duration-500" />

                {/* Ghost number watermark */}
                <span
                  className="absolute -bottom-2 -right-2 text-[90px] leading-none text-white/[0.03] group-hover:text-red-600/[0.07] select-none transition-all duration-500"
                  style={{ fontFamily: "'Bebas Neue', sans-serif" }}
                >
                  0{stat.id}
                </span>

                {/* Icon box */}
                <div className="relative w-12 h-12 rounded-xl bg-red-600/10 border border-red-600/20 group-hover:bg-red-600 group-hover:border-red-600 group-hover:shadow-[0_0_24px_rgba(220,38,38,0.5)] flex items-center justify-center transition-all duration-400">
                  <Icon
                    size={20}
                    className="text-red-400 group-hover:text-white transition-colors duration-300"
                  />
                </div>

                {/* Divider */}
                <div className="relative w-full h-[1px] bg-gradient-to-r from-white/[0.04] via-white/[0.08] to-transparent group-hover:from-red-700/20 group-hover:via-red-600/30 transition-all duration-500" />

                {/* Stat value */}
                <div className="relative flex flex-col gap-1">
                  <p
                    className="text-5xl md:text-6xl text-red-600 leading-none group-hover:drop-shadow-[0_0_16px_rgba(220,38,38,0.9)] transition-all duration-300"
                    style={{ fontFamily: "'Bebas Neue', sans-serif" }}
                  >
                    {stat.value}
                  </p>
                  <p className="text-white text-sm font-semibold tracking-wide group-hover:text-red-50 transition-colors duration-300">
                    {stat.label}
                  </p>
                  <p className="text-white/30 text-xs tracking-wide leading-relaxed">
                    {stat.sub}
                  </p>
                </div>

                {/* Bottom arrow indicator */}
                <div className="relative mt-auto flex items-center justify-between">
                  {/* Progress bar */}
                  <div className="flex-1 h-[2px] bg-white/[0.05] rounded-full overflow-hidden">
                    <div className="h-full w-0 group-hover:w-full bg-gradient-to-r from-red-700 via-red-500 to-red-400 transition-all duration-700 ease-out rounded-full" />
                  </div>

                  {/* Arrow orb */}
                  <div className="ml-3 w-8 h-8 rounded-full border border-white/10 group-hover:border-red-600/50 group-hover:bg-red-600/10 flex items-center justify-center opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                    <span className="relative inline-block w-3 h-px bg-red-500">
                      <span className="absolute right-0 top-[-3px] w-1.5 h-1.5 border-t border-r border-red-500 rotate-45 inline-block" />
                    </span>
                  </div>
                </div>

              </div>
            );
          })}
        </div>

        {/* ── BOTTOM DIVIDER STRIP ── */}
        <div className="mt-16 rounded-2xl border border-red-700/20 bg-red-950/10 px-8 py-7 flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-red-900/10 via-transparent to-red-900/10 pointer-events-none" />
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2/3 h-[1px] bg-gradient-to-r from-transparent via-red-600/20 to-transparent" />

          <div className="relative flex flex-col gap-1 text-center md:text-left">
            <p className="text-white text-lg font-semibold tracking-wide">
              Ready to join our success story?
            </p>
            <p className="text-white/40 text-sm">
              Book a repair today and experience the KJ Electronics difference.
            </p>
          </div>

          <div className="relative flex items-center gap-4 shrink-0">
            <button className="group px-7 py-3 bg-red-600 hover:bg-red-700 text-white text-xs font-semibold tracking-[3px] uppercase rounded-full transition-all duration-300 shadow-[0_0_30px_rgba(220,38,38,0.4)] hover:shadow-[0_0_40px_rgba(220,38,38,0.6)] relative overflow-hidden">
              <span className="relative z-10">Book a Repair</span>
              <span className="absolute inset-0 bg-gradient-to-r from-red-500 to-red-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </button>
            <button className="flex items-center gap-2 text-white/40 hover:text-red-400 text-xs tracking-[2px] uppercase font-medium transition-all duration-300 group">
              Call Us
              <span className="relative inline-block w-5 h-px bg-white/30 group-hover:bg-red-500 group-hover:w-8 transition-all duration-300">
                <span className="absolute right-0 top-[-3px] w-1.5 h-1.5 border-t border-r border-white/30 group-hover:border-red-500 rotate-45 inline-block transition-colors duration-300" />
              </span>
            </button>
          </div>
        </div>

      </div>

      <style>{`@import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&display=swap');`}</style>
    </section>
  );
}