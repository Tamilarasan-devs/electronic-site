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
    <section className="w-full bg-white py-20 px-6 md:px-12 relative overflow-hidden">

      {/* Dot pattern */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.35]"
        style={{
          backgroundImage: "radial-gradient(circle, #c7d4e8 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />

      {/* Top gradient bar */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#2a4771] to-[#3d5f96]" />

      {/* Hairlines */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[1px]"
        style={{ background: "linear-gradient(90deg, transparent, rgba(42,71,113,0.2), transparent)" }} />
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[900px] h-[1px]"
        style={{ background: "linear-gradient(90deg, transparent, rgba(42,71,113,0.2), transparent)" }} />

      {/* Soft bg glows */}
      <div className="absolute top-0 left-0 w-[500px] h-[500px] rounded-full blur-[130px] pointer-events-none opacity-15 bg-[#eef2f8]" />
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] rounded-full blur-[100px] pointer-events-none opacity-15 bg-[#eef2f8]" />

      <div className="relative max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center">

        {/* ── LEFT IMAGE SIDE ── */}
        <div className="relative">

          {/* Glow behind image */}
          <div className="absolute -inset-4 rounded-3xl blur-2xl opacity-20 bg-[#eef2f8]" />

          {/* Main image */}
          <div className="relative rounded-2xl overflow-hidden shadow-xl border border-[#c5d3e8]">
            <img
              src="https://media.istockphoto.com/id/1214607329/photo/tv-is-not-working-leisure-technology-mass-media-and-people-concept-man-watching-tv-at-home.jpg?s=612x612&w=0&k=20&c=7ucNGpulccvhLDi7mw5VVAOJnyals_8DjMdbsM18cQs="
              alt="TV Repair Service"
              className="w-full h-[420px] object-cover brightness-[0.78] saturate-75"
            />
            {/* Navy tint overlay */}
            <div className="absolute inset-0"
              style={{ background: "linear-gradient(135deg, rgba(42,71,113,0.45) 0%, transparent 60%)" }} />
            {/* Bottom fade */}
            <div className="absolute bottom-0 left-0 w-full h-1/3 bg-gradient-to-t from-white/20 to-transparent" />
          </div>

          {/* Floating badge — top left */}
          <div className="absolute -top-4 -left-4 rounded-xl px-4 py-3 shadow-lg backdrop-blur-sm flex items-center gap-2
            bg-white border border-[#c5d3e8]">
            <span className="w-2.5 h-2.5 rounded-full animate-pulse bg-[#2a4771]"
              style={{ boxShadow: "0 0 8px rgba(42,71,113,0.6)" }} />
            <span className="text-[#2a4771] text-xs font-bold tracking-widest uppercase">Live Support</span>
          </div>

          {/* Floating badge — bottom right */}
          {/* <div className="absolute -bottom-20 -right-4 rounded-xl px-5 py-3 shadow-lg backdrop-blur-sm
            bg-white border border-[#c5d3e8]">
            <p className="text-[#3d5f96] text-xs tracking-[3px] uppercase font-bold mb-0.5">Trusted Since</p>
            <p className="text-[#2a4771] font-black text-2xl leading-none" >
              2014
            </p>
          </div> */}

          {/* Stats row */}
          <div className="mt-8 grid grid-cols-4 gap-2">
            {stats.map((s) => (
              <div
                key={s.label}
                className="group rounded-xl py-3 px-2 text-center cursor-default transition-all duration-300
                  bg-[#eef2f8] border border-[#c5d3e8]
                  hover:bg-[#2a4771] hover:border-[#2a4771] hover:shadow-[0_6px_20px_rgba(42,71,113,0.2)]"
              >
                <p
                  className="text-xl font-black leading-none mb-1 transition-colors duration-300
                    text-[#2a4771] group-hover:text-white"
                  
                >
                  {s.value}
                </p>
                <p className="text-[13px] tracking-widest uppercase leading-tight transition-colors duration-300
                  text-gray-600 group-hover:text-white/75">
                  {s.label}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* ── RIGHT CONTENT SIDE ── */}
        <div className="flex flex-col gap-6">

          {/* Eyebrow chip */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#c5d3e8] bg-[#eef2f8] self-start">
            <span className="w-1.5 h-1.5 rounded-full animate-pulse bg-[#2a4771]" />
            <p className="text-[14px] font-bold tracking-[4px] uppercase text-[#2a4771]">Best in Coimbatore</p>
          </div>

          {/* Heading */}
          <h2
            className="text-5xl md:text-6xl text-gray-900 uppercase leading-none tracking-widest"
            
          >
            KJ{" "}
            <span className="relative text-[#2a4771]">
              Electronics
              <span className="absolute -bottom-2 left-0 right-0 h-[3px] rounded-full bg-gradient-to-r from-[#2a4771] to-[#3d5f96]" />
            </span>
          </h2>

          {/* Tagline */}
          <div className="flex items-center gap-3 mt-1">
            <span className="w-8 h-[2px] rounded-full bg-[#2a4771]" />
            <p className="text-[#3d5f96] text-md font-semibold tracking-widest uppercase italic">
              Always Deliver More Than Expected
            </p>
          </div>

          {/* Divider */}
          <div className="w-full h-[1px] bg-gradient-to-r from-[#2a4771]/30 via-[#c5d3e8] to-transparent" />

          {/* Body paragraphs */}
          <p className="text-gray-500 text-md leading-relaxed">
            Welcome to the{" "}
            <span className="text-gray-800 font-semibold">Best LED TV Service Center in Coimbatore!</span>{" "}
            Our highly trained technicians have over{" "}
            <span className="font-bold text-[#2a4771]">10 years of experience</span> delivering
            trustworthy LED TV repair for all major brands — built on precision, trust, and speed.
          </p>

          <p className="text-gray-500 text-md leading-relaxed">
            We specialize in fixing all types of TVs including{" "}
            <span className="text-gray-800 font-semibold">LED, LCD, and Plasma</span> using modern
            technology. We provide{" "}
            <span className="font-bold text-[#2a4771]">same-day service within 3 hours</span>{" "}
            to ensure your TV works again without delay.
          </p>

          <p className="text-gray-500 text-md leading-relaxed">
            We only use{" "}
            <span className="text-gray-800 font-semibold">original spare parts</span> for
            long-lasting results. Customer satisfaction is our number one goal — affordable,
            efficient, and trustworthy.
          </p>

          {/* Divider */}
          <div className="w-full h-[1px] bg-gradient-to-r from-[#2a4771]/30 via-[#c5d3e8] to-transparent" />

          {/* Brands */}
          <div>
            <p className="text-[14px] tracking-[3px] text-gray-600 uppercase mb-3 font-semibold">
              Brands We Service
            </p>
            <div className="flex flex-wrap gap-2">
              {brands.map((brand) => (
                <span
                  key={brand}
                  className="group/pill text-[14px] font-semibold tracking-wider rounded-full px-3 py-1 cursor-default transition-all duration-300
                    text-[#2a4771] border border-[#c5d3e8] bg-[#eef2f8]
                    hover:bg-[#2a4771] hover:border-[#2a4771] hover:text-white hover:shadow-[0_4px_12px_rgba(42,71,113,0.2)]"
                >
                  {brand}
                </span>
              ))}
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex items-center gap-4 mt-2">
            <button className="px-7 py-3 text-white text-xs font-bold tracking-[3px] uppercase rounded-full transition-all duration-300
              bg-[#2a4771] shadow-[0_8px_28px_rgba(42,71,113,0.35)]
              hover:bg-[#3d5f96] hover:shadow-[0_12px_36px_rgba(42,71,113,0.5)] hover:-translate-y-0.5">
              Book a Repair
            </button>

            <button className="group/sec flex items-center gap-2 text-gray-600 hover:text-[#2a4771] text-md tracking-[2px] uppercase font-semibold transition-all duration-300">
              Call Us Now
              <span className="relative inline-block w-6 h-px bg-gray-300 group-hover/sec:bg-[#2a4771] group-hover/sec:w-9 transition-all duration-300">
                <span className="absolute right-0 top-[-3px] w-1.5 h-1.5 border-t border-r border-gray-300 group-hover/sec:border-[#2a4771] rotate-45 inline-block transition-colors duration-300" />
              </span>
            </button>
          </div>

        </div>
      </div>

      {/* <style>{`@import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&display=swap');`}</style> */}
    </section>
  );
}