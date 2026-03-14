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
    <section className="w-full bg-white py-24 px-6 md:px-12 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none opacity-[0.35]"
        style={{ backgroundImage: "radial-gradient(circle, #c7d4e8 1px, transparent 1px)", backgroundSize: "28px 28px" }} />
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#2a4771] to-[#3d5f96]" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[350px] rounded-full blur-[130px] pointer-events-none opacity-20 bg-[#eef2f8]" />
      <div className="absolute bottom-0 left-0 w-[350px] h-[350px] rounded-full blur-[100px] pointer-events-none opacity-15 bg-[#eef2f8]" />
      <div className="absolute bottom-0 right-0 w-[350px] h-[350px] rounded-full blur-[100px] pointer-events-none opacity-15 bg-[#eef2f8]" />

      <div className="relative max-w-7xl mx-auto">
        {/* HEADER */}
        <div className="text-center mb-20 flex flex-col items-center gap-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#c5d3e8] bg-[#eef2f8]">
            <span className="w-1.5 h-1.5 rounded-full animate-pulse bg-[#2a4771]" />
            <p className="text-[10px] font-semibold tracking-[4px] uppercase text-[#2a4771]">Our Promise</p>
          </div>
          <h2 className="text-5xl md:text-7xl text-gray-900 uppercase leading-none tracking-widest" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
            Why <span className="relative text-[#2a4771]">Choose<span className="absolute -bottom-2 left-0 right-0 h-[3px] rounded-full bg-gradient-to-r from-[#2a4771] to-[#3d5f96]" /></span> Us
          </h2>
          <div className="flex items-center gap-3 mt-1">
            <span className="w-8 h-[2px] rounded-full bg-[#2a4771]" />
            <p className="text-gray-400 text-xs font-medium tracking-[3px] uppercase italic">Experience Unmatched Service &amp; Expertise</p>
            <span className="w-8 h-[2px] rounded-full bg-[#2a4771]" />
          </div>
        </div>

        {/* CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {features.map((item) => {
            const Icon = item.icon;
            return (
              <div key={item.id} className="group relative rounded-3xl p-8 flex flex-col gap-6 cursor-default overflow-hidden
                bg-[#eef2f8] border border-[#c5d3e8]
                hover:bg-[#2a4771] hover:border-[#2a4771]
                hover:-translate-y-2 hover:shadow-[0_20px_60px_rgba(42,71,113,0.25)]
                transition-all duration-500">

                {/* Shine line top */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-[1px]
                  bg-gradient-to-r from-transparent via-transparent to-transparent
                  group-hover:via-white/30 transition-all duration-500" />

                {/* Ghost watermark */}
                <span className="absolute bottom-4 right-5 text-[100px] leading-none select-none pointer-events-none
                  text-[#2a4771]/[0.06] group-hover:text-white/[0.07] transition-all duration-500"
                  style={{ fontFamily: "'Bebas Neue', sans-serif" }}>0{item.id}</span>

                {/* Icon + tag row */}
                <div className="relative flex items-center justify-between">
                  <div className="w-14 h-14 rounded-2xl flex items-center justify-center transition-all duration-400
                    bg-[#2a4771]/10 border border-[#2a4771]/20
                    group-hover:bg-white/20 group-hover:border-white/30">
                    <Icon size={24} className="text-[#2a4771] group-hover:text-white transition-colors duration-300" />
                  </div>
                  <span className="text-[9px] font-bold tracking-[2px] uppercase rounded-full px-3 py-1 transition-all duration-300
                    text-[#3d5f96] border border-[#c5d3e8]
                    group-hover:text-white group-hover:border-white/30 group-hover:bg-white/10">
                    {item.tag}
                  </span>
                </div>

                {/* Divider */}
                <div className="w-full h-[1px] bg-[#2a4771]/20 group-hover:bg-white/20 transition-colors duration-500" />

                {/* Text content */}
                <div className="flex flex-col gap-3">
                  <h3 className="text-2xl uppercase tracking-wide leading-tight transition-colors duration-300
                    text-gray-800 group-hover:text-white"
                    style={{ fontFamily: "'Bebas Neue', sans-serif" }}>{item.title}</h3>
                  <p className="text-sm leading-relaxed font-light transition-colors duration-300
                    text-gray-500 group-hover:text-white/80">{item.description}</p>
                </div>

                {/* Stat block */}
                <div className="mt-auto flex items-end justify-between">
                  <div>
                    <p className="text-4xl leading-none transition-colors duration-300
                      text-[#2a4771] group-hover:text-white"
                      style={{ fontFamily: "'Bebas Neue', sans-serif" }}>{item.stat}</p>
                    <p className="text-[10px] tracking-[2px] uppercase mt-1 transition-colors duration-300
                      text-[#3d5f96] group-hover:text-white/70">{item.statLabel}</p>
                  </div>
                  {/* Arrow orb */}
                  <div className="w-9 h-9 rounded-full flex items-center justify-center
                    opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0
                    border border-white/40 bg-white/15
                    transition-all duration-300">
                    <span className="relative inline-block w-3 h-px bg-white">
                      <span className="absolute right-0 top-[-3px] w-1.5 h-1.5 border-t border-r border-white rotate-45 inline-block" />
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* TRUST STRIP */}
        <div className="mt-16 grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            { label: "Same-Day Service", sub: "Repairs within 3 hours" },
            { label: "Original Spare Parts", sub: "No counterfeit components" },
            { label: "Warranty on Repairs", sub: "Peace of mind guaranteed" },
          ].map((item) => (
            <div key={item.label}
              className="group flex items-center gap-4 rounded-2xl px-6 py-5 cursor-default transition-all duration-300
                bg-[#eef2f8] border border-[#c5d3e8]
                hover:bg-[#2a4771] hover:border-[#2a4771] hover:shadow-[0_8px_24px_rgba(42,71,113,0.2)]">
              <span className="shrink-0 w-2.5 h-2.5 rounded-full transition-all duration-300
                bg-[#2a4771] group-hover:bg-white
                shadow-[0_0_8px_rgba(42,71,113,0.5)] group-hover:shadow-[0_0_10px_rgba(255,255,255,0.6)]" />
              <div>
                <p className="text-sm font-bold tracking-wide transition-colors duration-300
                  text-[#2a4771] group-hover:text-white">{item.label}</p>
                <p className="text-xs tracking-wide mt-0.5 transition-colors duration-300
                  text-gray-400 group-hover:text-white/70">{item.sub}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&display=swap');`}</style>
    </section>
  );
}