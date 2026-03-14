import React from "react";
import { Tv } from "lucide-react";

const services = [
  "Samsung LED TV Service in Coimbatore",
  "VU TV Service in Coimbatore",
  "ONIDA LED TV Service in Coimbatore",
  "Acer LED TV Service in Coimbatore",
  "Motorola LED TV Service in Coimbatore",
  "Sony LED TV Service in Coimbatore",
  "PHILIPS TV Service in Coimbatore",
  "REALME LED TV Service in Coimbatore",
  "Blaupunkt LED TV Service in Coimbatore",
  "LG LED TV Service in Coimbatore",
  "PANASONIC LED TV Service in Coimbatore",
  "TCL LED TV Service in Coimbatore",
  "Croma LED TV Service in Coimbatore",
  "MI LED TV Service in Coimbatore",
  "ONEPLUS LED TV Service in Coimbatore",
  "KODAK LED TV Service in Coimbatore",
  "THOMSON LED TV Service in Coimbatore",
  "COOCAA LED TV Service in Coimbatore",
  "DOR LED TV Service in Coimbatore",
  "Hisense LED TV Service in Coimbatore",
  "Toshiba LED TV Service in Coimbatore",
];

export default function OurServices() {
  return (
    <section className="w-full  py-24 px-6 md:px-12 relative overflow-hidden">

  {/* Background Image */}
  <div
    className="absolute inset-0 -z-10 bg-cover bg-center bg-no-repeat"
    style={{
      backgroundImage: "https://m.media-amazon.com/images/I/81n1QNM4XwL.jpg",
    }}
  />

  {/* Dot pattern */}
  <div
    className="absolute inset-0 pointer-events-none opacity-[0.35]"
    style={{
      backgroundImage: "radial-gradient(circle, #c7d4e8 1px, transparent 1px)",
      backgroundSize: "28px 28px",
    }}
  />

      {/* Hairlines */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[1px]"
        style={{ background: "linear-gradient(90deg, transparent, rgba(42,71,113,0.2), transparent)" }} />
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[900px] h-[1px]"
        style={{ background: "linear-gradient(90deg, transparent, rgba(42,71,113,0.2), transparent)" }} />

      {/* Soft bg glows */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[300px] rounded-full blur-[120px] pointer-events-none opacity-20 bg-[#eef2f8]" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[300px] rounded-full blur-[100px] pointer-events-none opacity-15 bg-[#eef2f8]" />
      <div className="absolute bottom-0 right-0 w-[400px] h-[300px] rounded-full blur-[100px] pointer-events-none opacity-15 bg-[#eef2f8]" />

      <div className="relative max-w-7xl mx-auto">

        {/* ── HEADER ── */}
        <div className="text-center mb-16 flex flex-col items-center gap-4">

          {/* Eyebrow chip */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#c5d3e8] bg-[#eef2f8]">
            <span className="w-1.5 h-1.5 rounded-full animate-pulse bg-[#2a4771]" />
            <p className="text-[10px] font-bold tracking-[4px] uppercase text-[#2a4771]">What We Fix</p>
          </div>

          {/* Main heading */}
          <h2
            className="text-5xl md:text-7xl text-gray-900 uppercase leading-none tracking-widest"
            style={{ fontFamily: "'Bebas Neue', sans-serif" }}
          >
            Our{" "}
            <span className="relative text-[#2a4771]">
              Services
              <span className="absolute -bottom-2 left-0 right-0 h-[3px] rounded-full bg-gradient-to-r from-[#2a4771] to-[#3d5f96]" />
            </span>
          </h2>

          {/* Tagline row */}
          <div className="flex items-center gap-3 mt-1">
            <span className="w-8 h-[2px] rounded-full bg-[#2a4771]" />
            <p className="text-gray-400 text-xs font-medium tracking-[3px] uppercase italic">
              Professional LED TV Repair for All Major Brands
            </p>
            <span className="w-8 h-[2px] rounded-full bg-[#2a4771]" />
          </div>

          {/* Count badge */}
          <div className="mt-2 px-5 py-2 rounded-full border border-[#c5d3e8] bg-[#eef2f8] flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#2a4771] animate-pulse" />
            <span className="text-[#2a4771] text-[11px] tracking-[2px] uppercase font-semibold">
              {services.length} Brands Covered
            </span>
          </div>
        </div>

        {/* ── SERVICES GRID ── */}
        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {services.map((service, index) => (
            <div
              key={index}
              className="group relative rounded-2xl p-5 flex items-center gap-4 cursor-pointer overflow-hidden
                bg-[#eef2f8] border border-[#c5d3e8]
                hover:bg-[#2a4771] hover:border-[#2a4771]
                hover:-translate-y-1.5 hover:shadow-[0_10px_32px_rgba(42,71,113,0.22)]
                transition-all duration-300"
            >
              {/* Left accent line */}
              <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-0 group-hover:h-10
                bg-gradient-to-b from-transparent via-white/60 to-transparent
                transition-all duration-400 rounded-full" />

              {/* Inner glow wash */}
              <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                style={{ background: "linear-gradient(135deg, rgba(255,255,255,0.06), transparent)" }} />

              {/* Icon */}
              <div className="relative shrink-0 w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300
                bg-[#2a4771]/10 border border-[#2a4771]/20
                group-hover:bg-white/20 group-hover:border-white/30">
                <Tv size={18} className="text-[#2a4771] group-hover:text-white transition-colors duration-300" />
              </div>

              {/* Text */}
              <div className="relative flex flex-col gap-0.5 flex-1 min-w-0">
                {/* Brand name tag */}
                <span className="text-[9px] tracking-[2px] uppercase font-bold transition-colors duration-300
                  text-[#3d5f96] group-hover:text-white/70">
                  {service.split(" ")[0]}
                </span>
                {/* Full service name */}
                <h3 className="text-xs font-semibold leading-snug transition-colors duration-300 truncate
                  text-gray-600 group-hover:text-white">
                  {service}
                </h3>
              </div>

              {/* Arrow indicator */}
              <div className="ml-auto shrink-0 opacity-0 group-hover:opacity-100 translate-x-2 group-hover:translate-x-0 transition-all duration-300">
                <span className="relative inline-block w-4 h-px bg-white">
                  <span className="absolute right-0 top-[-3px] w-1.5 h-1.5 border-t border-r border-white rotate-45 inline-block" />
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* ── BOTTOM CTA STRIP ── */}
        <div className="mt-16 rounded-2xl px-8 py-7 flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden shadow-sm
          bg-[#f7f9fc] border border-[#e2e8f2]">

          {/* Left accent bar */}
          <div className="absolute left-0 top-0 bottom-0 w-1 rounded-l-2xl bg-gradient-to-b from-[#2a4771] to-[#3d5f96]" />

          {/* Soft bg wash */}
          <div className="absolute inset-0 pointer-events-none bg-gradient-to-r from-[#eef2f8]/60 via-transparent to-[#eef2f8]/60" />

          <div className="relative flex flex-col gap-1 text-center md:text-left pl-4">
            <p className="text-gray-900 text-lg font-bold tracking-wide">
              Don't see your brand?
            </p>
            <p className="text-gray-400 text-sm">
              We service many more brands — call us and we'll help you out.
            </p>
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