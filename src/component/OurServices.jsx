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
    <section className="w-full bg-[#0a0000] py-24 px-6 md:px-12 relative overflow-hidden">

      {/* Background Glows */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[300px] rounded-full bg-red-800/10 blur-[120px]" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[300px] rounded-full bg-red-900/10 blur-[100px]" />
        <div className="absolute bottom-0 right-0 w-[400px] h-[300px] rounded-full bg-red-900/8 blur-[100px]" />
        {/* Top hairline */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[1px] bg-gradient-to-r from-transparent via-red-600/25 to-transparent" />
        {/* Bottom hairline */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[900px] h-[1px] bg-gradient-to-r from-transparent via-red-600/25 to-transparent" />
        {/* Grid pattern overlay */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
      </div>

      <div className="relative max-w-7xl mx-auto">

        {/* ── HEADER ── */}
        <div className="text-center mb-16 flex flex-col items-center gap-4">

          {/* Eyebrow label */}
          <p className="text-[10px] font-medium tracking-[4px] text-red-500 uppercase">
            What We Fix
          </p>

          {/* Main heading */}
          <h2
            className="text-5xl md:text-7xl text-white uppercase leading-none tracking-widest"
            style={{ fontFamily: "'Bebas Neue', sans-serif" }}
          >
            Our{" "}
            <span className="text-red-600 drop-shadow-[0_0_24px_rgba(220,38,38,0.7)]">
              Services
            </span>
          </h2>

          {/* Tagline row */}
          <div className="flex items-center gap-3">
            <span className="w-8 h-[2px] bg-red-600" />
            <p className="text-white/40 text-xs font-medium tracking-[3px] uppercase italic">
              Professional LED TV Repair for All Major Brands
            </p>
            <span className="w-8 h-[2px] bg-red-600" />
          </div>

          {/* Count badge */}
          <div className="mt-2 px-5 py-2 rounded-full border border-red-700/30 bg-red-950/20 flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse shadow-[0_0_6px_rgba(220,38,38,0.8)]" />
            <span className="text-white/50 text-[11px] tracking-[2px] uppercase">
              {services.length} Brands Covered
            </span>
          </div>
        </div>

        {/* ── SERVICES GRID ── */}
        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {services.map((service, index) => (
            <div
              key={index}
              className="group relative bg-white/[0.03] hover:bg-red-950/30 border border-white/[0.06] hover:border-red-600/50 rounded-2xl p-5 flex items-center gap-4 transition-all duration-300 cursor-pointer hover:-translate-y-1 hover:shadow-[0_8px_30px_rgba(220,38,38,0.15)] overflow-hidden"
            >
              {/* Card inner glow on hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-red-600/0 via-transparent to-red-900/0 group-hover:from-red-600/5 group-hover:to-red-900/10 transition-all duration-300 rounded-2xl" />

              {/* Left accent line */}
              <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[2px] h-0 group-hover:h-10 bg-gradient-to-b from-transparent via-red-500 to-transparent transition-all duration-400 rounded-full" />

              {/* Icon */}
              <div className="relative shrink-0 w-10 h-10 rounded-xl bg-red-600/10 border border-red-600/20 group-hover:bg-red-600 group-hover:border-red-600 group-hover:shadow-[0_0_16px_rgba(220,38,38,0.5)] flex items-center justify-center transition-all duration-300">
                <Tv
                  size={18}
                  className="text-red-400 group-hover:text-white transition-colors duration-300"
                />
              </div>

              {/* Text */}
              <div className="relative flex flex-col gap-0.5">
                {/* Brand name extracted (first word) */}
                <span className="text-[9px] tracking-[2px] text-red-500/70 group-hover:text-red-400 uppercase font-medium transition-colors duration-300">
                  {service.split(" ")[0]}
                </span>
                <h3 className="text-white/60 group-hover:text-white text-xs font-medium leading-snug transition-colors duration-300">
                  {service}
                </h3>
              </div>

              {/* Arrow indicator */}
              <div className="ml-auto shrink-0 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-2 group-hover:translate-x-0">
                <span className="relative inline-block w-4 h-px bg-red-500">
                  <span className="absolute right-0 top-[-3px] w-1.5 h-1.5 border-t border-r border-red-500 rotate-45 inline-block" />
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* ── BOTTOM CTA STRIP ── */}
        <div className="mt-16 rounded-2xl border border-red-700/20 bg-red-950/10 px-8 py-7 flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden">
          {/* Strip glow */}
          <div className="absolute inset-0 bg-gradient-to-r from-red-900/10 via-transparent to-red-900/10 pointer-events-none" />

          <div className="relative flex flex-col gap-1 text-center md:text-left">
            <p className="text-white text-lg font-semibold tracking-wide">
              Don't see your brand?
            </p>
            <p className="text-white/40 text-sm">
              We service many more brands — call us and we'll help you out.
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