import React from "react";

const stats = [
  { value: "10+", label: "Years Experience" },
  { value: "50K+", label: "TVs Repaired" },
  { value: "3hr", label: "Same Day Service" },
  { value: "100%", label: "Original Parts" },
];

const brands = [
  "Samsung", "Sony", "LG", "MI", "OnePlus",
  "Vu", "Philips", "Panasonic", "TCL", "Realme",
];

export default function ThirdSection() {
  return (
    <section className="w-full bg-[#0a0000] py-20 px-6 md:px-12 relative overflow-hidden">

      {/* Background Glows */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-[500px] h-[500px] rounded-full bg-red-800/10 blur-[130px]" />
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] rounded-full bg-red-900/10 blur-[100px]" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[1px] bg-gradient-to-r from-transparent via-red-600/20 to-transparent" />
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[900px] h-[1px] bg-gradient-to-r from-transparent via-red-600/20 to-transparent" />
      </div>

      <div className="relative max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center">

        {/* ── LEFT IMAGE SIDE ── */}
        <div className="relative">

          {/* Floating glow behind image */}
          <div className="absolute -inset-4 bg-red-700/10 rounded-3xl blur-2xl" />

          {/* Main image */}
          <div className="relative rounded-2xl overflow-hidden border border-red-900/30 shadow-[0_0_60px_rgba(220,38,38,0.15)]">
            <img
              src="https://media.istockphoto.com/id/1214607329/photo/tv-is-not-working-leisure-technology-mass-media-and-people-concept-man-watching-tv-at-home.jpg?s=612x612&w=0&k=20&c=7ucNGpulccvhLDi7mw5VVAOJnyals_8DjMdbsM18cQs="
              alt="TV Repair Service"
              className="w-full h-[420px] object-cover brightness-75 saturate-50"
            />
            {/* Red tint overlay */}
            <div className="absolute inset-0 bg-gradient-to-tr from-red-950/60 via-transparent to-transparent" />
            {/* Bottom gradient fade */}
            <div className="absolute bottom-0 left-0 w-full h-1/3 bg-gradient-to-t from-[#0a0000]/80 to-transparent" />
          </div>

          {/* Floating badge — top left */}
          <div className="absolute -top-4 -left-4 bg-[#120000] border border-red-700/40 rounded-xl px-4 py-3 shadow-[0_0_20px_rgba(220,38,38,0.2)] flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-pulse shadow-[0_0_8px_rgba(220,38,38,0.8)]" />
            <span className="text-white text-xs font-medium tracking-widest uppercase">Live Support</span>
          </div>

          {/* Floating badge — bottom right */}
          <div className="absolute -bottom-4 -right-4 bg-[#120000] border border-red-700/40 rounded-xl px-5 py-3 shadow-[0_0_20px_rgba(220,38,38,0.2)]">
            <p className="text-red-500 text-xs tracking-[3px] uppercase font-medium mb-0.5">Trusted Since</p>
            <p className="text-white font-black text-2xl leading-none" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
              2014
            </p>
          </div>

          {/* Stats row */}
          <div className="mt-8 grid grid-cols-4 gap-2">
            {stats.map((s) => (
              <div
                key={s.label}
                className="bg-white/[0.03] border border-white/[0.06] hover:border-red-700/40 rounded-xl py-3 px-2 text-center transition-all duration-300 hover:bg-red-950/20 group"
              >
                <p
                  className="text-red-500 text-xl font-black leading-none mb-1 group-hover:drop-shadow-[0_0_8px_rgba(220,38,38,0.8)] transition-all duration-300"
                  style={{ fontFamily: "'Bebas Neue', sans-serif" }}
                >
                  {s.value}
                </p>
                <p className="text-white/40 text-[9px] tracking-widest uppercase leading-tight">{s.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* ── RIGHT CONTENT SIDE ── */}
        <div className="flex flex-col gap-6">

          {/* Label */}
          <p className="text-[10px] font-medium tracking-[4px] text-red-500 uppercase">
            Best in Coimbatore
          </p>

          {/* Heading */}
          <h2
            className="text-5xl md:text-6xl text-white uppercase leading-none tracking-widest"
            style={{ fontFamily: "'Bebas Neue', sans-serif" }}
          >
            KJ{" "}
            <span className="text-red-600 drop-shadow-[0_0_20px_rgba(220,38,38,0.7)]">
              Electronics
            </span>
          </h2>

          {/* Tagline */}
          <div className="flex items-center gap-3">
            <span className="w-8 h-[2px] bg-red-600" />
            <p className="text-red-400 text-sm font-medium tracking-widest uppercase italic">
              Always Deliver More Than Expected
            </p>
          </div>

          {/* Divider */}
          <div className="w-full h-[1px] bg-gradient-to-r from-red-700/40 via-white/5 to-transparent" />

          {/* Body paragraphs */}
          <p className="text-white/50 text-sm leading-relaxed font-light">
            Welcome to the <span className="text-white/80 font-medium">Best LED TV Service Center in Coimbatore!</span>{" "}
            Our highly trained technicians have over{" "}
            <span className="text-red-400 font-semibold">10 years of experience</span> delivering
            trustworthy LED TV repair for all major brands — built on precision, trust, and speed.
          </p>

          <p className="text-white/50 text-sm leading-relaxed font-light">
            We specialize in fixing all types of TVs including{" "}
            <span className="text-white/80 font-medium">LED, LCD, and Plasma</span> using modern
            technology. We provide{" "}
            <span className="text-red-400 font-semibold">same-day service within 3 hours</span>{" "}
            to ensure your TV works again without delay.
          </p>

          <p className="text-white/50 text-sm leading-relaxed font-light">
            We only use <span className="text-white/80 font-medium">original spare parts</span> for
            long-lasting results. Customer satisfaction is our number one goal — affordable,
            efficient, and trustworthy.
          </p>

          {/* Divider */}
          <div className="w-full h-[1px] bg-gradient-to-r from-red-700/40 via-white/5 to-transparent" />

          {/* Brands */}
          <div>
            <p className="text-[9px] tracking-[3px] text-white/30 uppercase mb-3">Brands We Service</p>
            <div className="flex flex-wrap gap-2">
              {brands.map((brand) => (
                <span
                  key={brand}
                  className="text-[11px] font-medium text-white/50 tracking-wider border border-white/[0.07] hover:border-red-600/50 hover:text-red-400 hover:bg-red-950/20 rounded-full px-3 py-1 transition-all duration-300 cursor-default"
                >
                  {brand}
                </span>
              ))}
            </div>
          </div>

          {/* CTA Button */}
          <div className="flex items-center gap-4 mt-2">
            <button className="group relative px-7 py-3 bg-red-600 hover:bg-red-700 text-white text-xs font-semibold tracking-[3px] uppercase rounded-full transition-all duration-300 shadow-[0_0_30px_rgba(220,38,38,0.4)] hover:shadow-[0_0_40px_rgba(220,38,38,0.6)] overflow-hidden">
              <span className="relative z-10">Book a Repair</span>
              <span className="absolute inset-0 bg-gradient-to-r from-red-500 to-red-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </button>

            <button className="flex items-center gap-2 text-white/50 hover:text-red-400 text-xs tracking-[2px] uppercase font-medium transition-all duration-300 group">
              Call Us Now
              <span className="relative inline-block w-6 h-px bg-white/30 group-hover:bg-red-500 group-hover:w-9 transition-all duration-300">
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