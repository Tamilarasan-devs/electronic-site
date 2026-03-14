import React from "react";
import { Tv, Users, Star, BadgeCheck } from "lucide-react";

const stats = [
  { id: 1, icon: Tv, value: "5K+", label: "Projects Completed", sub: "Successful TV repairs done" },
  { id: 2, icon: Users, value: "29K+", label: "Service Experts", sub: "Certified trained technicians" },
  { id: 3, icon: Star, value: "9K+", label: "Satisfied Customers", sub: "Happy clients across Coimbatore" },
  { id: 4, icon: BadgeCheck, value: "74%", label: "Service Quality", sub: "Rated excellent by customers" },
];

export default function StatsSection() {
  return (
    <section className="w-full bg-white py-24 px-6 md:px-12 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none opacity-[0.35]"
        style={{ backgroundImage: "radial-gradient(circle, #c7d4e8 1px, transparent 1px)", backgroundSize: "28px 28px" }} />
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#2a4771] to-[#3d5f96]" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] rounded-full blur-[130px] pointer-events-none opacity-20 bg-[#eef2f8]" />
      <div className="absolute bottom-0 left-0 w-[350px] h-[300px] rounded-full blur-[100px] pointer-events-none opacity-15 bg-[#eef2f8]" />
      <div className="absolute bottom-0 right-0 w-[350px] h-[300px] rounded-full blur-[100px] pointer-events-none opacity-15 bg-[#eef2f8]" />

      <div className="relative max-w-7xl mx-auto">
        {/* HEADER */}
        <div className="text-center mb-20 flex flex-col items-center gap-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#c5d3e8] bg-[#eef2f8]">
            <span className="w-1.5 h-1.5 rounded-full animate-pulse bg-[#2a4771]" />
            <p className="text-[10px] font-semibold tracking-[4px] uppercase text-[#2a4771]">Numbers That Speak</p>
          </div>
          <h2 className="text-5xl md:text-7xl text-gray-900 uppercase leading-none tracking-widest" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
            Our <span className="relative text-[#2a4771]">Achievements<span className="absolute -bottom-2 left-0 right-0 h-[3px] rounded-full bg-gradient-to-r from-[#2a4771] to-[#3d5f96]" /></span>
          </h2>
          <div className="flex items-center gap-3 mt-1">
            <span className="w-8 h-[2px] rounded-full bg-[#2a4771]" />
            <p className="text-gray-400 text-xs font-medium tracking-[3px] uppercase italic">Trusted by Thousands for Top‑Notch Service</p>
            <span className="w-8 h-[2px] rounded-full bg-[#2a4771]" />
          </div>
        </div>

        {/* STATS GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <div key={stat.id}
                className="group relative rounded-3xl p-8 flex flex-col gap-5 cursor-default overflow-hidden
                  bg-[#eef2f8] border border-[#c5d3e8]
                  hover:bg-[#2a4771] hover:border-[#2a4771]
                  hover:-translate-y-2 hover:shadow-[0_20px_60px_rgba(42,71,113,0.25)]
                  transition-all duration-500">

                {/* Top shine */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-[1px]
                  bg-gradient-to-r from-transparent via-transparent to-transparent
                  group-hover:via-white/25 transition-all duration-500" />

                {/* Ghost watermark */}
                <span className="absolute -bottom-2 -right-2 text-[90px] leading-none select-none pointer-events-none
                  text-[#2a4771]/[0.06] group-hover:text-white/[0.07] transition-all duration-500"
                  style={{ fontFamily: "'Bebas Neue', sans-serif" }}>0{stat.id}</span>

                {/* Icon */}
                <div className="relative w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-400
                  bg-[#2a4771]/10 border border-[#2a4771]/20
                  group-hover:bg-white/20 group-hover:border-white/30">
                  <Icon size={20} className="text-[#2a4771] group-hover:text-white transition-colors duration-300" />
                </div>

                {/* Divider */}
                <div className="w-full h-[1px] bg-[#2a4771]/20 group-hover:bg-white/20 transition-colors duration-500" />

                {/* Values */}
                <div className="flex flex-col gap-1">
                  <p className="text-5xl md:text-6xl leading-none transition-colors duration-300
                    text-[#2a4771] group-hover:text-white"
                    style={{ fontFamily: "'Bebas Neue', sans-serif" }}>{stat.value}</p>
                  <p className="text-sm font-bold tracking-wide transition-colors duration-300
                    text-gray-800 group-hover:text-white">{stat.label}</p>
                  <p className="text-xs tracking-wide leading-relaxed transition-colors duration-300
                    text-gray-400 group-hover:text-white/75">{stat.sub}</p>
                </div>

                {/* Progress + arrow */}
                <div className="mt-auto flex items-center justify-between gap-3">
                  <div className="flex-1 h-[2px] rounded-full overflow-hidden bg-[#2a4771]/15 group-hover:bg-white/15">
                    <div className="h-full w-0 group-hover:w-full rounded-full transition-all duration-700 ease-out
                      bg-gradient-to-r from-white/50 to-white/90" />
                  </div>
                  <div className="w-8 h-8 rounded-full flex items-center justify-center shrink-0
                    opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0
                    border border-white/40 bg-white/15 transition-all duration-300">
                    <span className="relative inline-block w-3 h-px bg-white">
                      <span className="absolute right-0 top-[-3px] w-1.5 h-1.5 border-t border-r border-white rotate-45 inline-block" />
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* CTA STRIP */}
        <div className="mt-16 rounded-2xl px-8 py-7 flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden shadow-sm bg-[#f7f9fc] border border-[#e2e8f2]">
          <div className="absolute left-0 top-0 bottom-0 w-1 rounded-l-2xl bg-gradient-to-b from-[#2a4771] to-[#3d5f96]" />
          <div className="absolute inset-0 pointer-events-none bg-gradient-to-r from-[#eef2f8]/60 via-transparent to-[#eef2f8]/60" />
          <div className="relative flex flex-col gap-1 text-center md:text-left pl-4">
            <p className="text-gray-900 text-lg font-bold tracking-wide">Ready to join our success story?</p>
            <p className="text-gray-400 text-sm">Book a repair today and experience the KJ Electronics difference.</p>
          </div>
          <div className="relative flex items-center gap-4 shrink-0">
            <button className="px-7 py-3 text-white text-xs font-bold tracking-[3px] uppercase rounded-full transition-all duration-300
              bg-[#2a4771] shadow-[0_8px_28px_rgba(42,71,113,0.30)]
              hover:bg-[#3d5f96] hover:shadow-[0_12px_36px_rgba(42,71,113,0.45)] hover:-translate-y-0.5">
              Book a Repair
            </button>
            <button className="group/sec flex items-center gap-2 text-gray-400 hover:text-[#2a4771] text-xs tracking-[2px] uppercase font-semibold transition-all duration-300">
              Call Us
              <span className="relative inline-block w-5 h-px bg-gray-300 group-hover/sec:bg-[#2a4771] group-hover/sec:w-8 transition-all duration-300">
                <span className="absolute right-0 top-[-3px] w-1.5 h-1.5 border-t border-r border-gray-300 group-hover/sec:border-[#2a4771] rotate-45 inline-block transition-colors duration-300" />
              </span>
            </button>
          </div>
        </div>
      </div>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&display=swap');`}</style>
    </section>
  );
}