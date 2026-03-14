import React from "react";

const cards = [
  {
    number: "01",
    tag: "Certified Parts",
    title: "Authorized Service Centers",
    desc: "Partnered with top TV brands to deliver only original, certified replacement parts — every single time.",
    img: "https://images.unsplash.com/photo-1593784991095-a205069470b6?auto=format&fit=crop&w=800&q=80",
    alt: "Authorized Service",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 stroke-white/50 group-hover:stroke-red-500 transition-all duration-300">
        <path d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
  },
  {
    number: "02",
    tag: "Doorstep Service",
    title: "Technicians At Your Location",
    desc: "Expert technicians arrive at your door, diagnose on-site, and fix issues without transporting your TV.",
    img: "https://images.unsplash.com/photo-1581093458791-9d15482442f1?auto=format&fit=crop&w=800&q=80",
    alt: "Technician Visit",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 stroke-white/50 group-hover:stroke-red-500 transition-all duration-300">
        <path d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
        <path d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
  },
  {
    number: "03",
    tag: "All Platforms",
    title: "Streaming, Live TV & VOD",
    desc: "Whether it's a streaming app, live broadcast channel, or video-on-demand — we support them all seamlessly.",
    img: "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?auto=format&fit=crop&w=800&q=80",
    alt: "TV Streaming",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 stroke-white/50 group-hover:stroke-red-500 transition-all duration-300">
        <path d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
        <path d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
];

export default function SecondBanner() {
  return (
    <section className="w-full py-20 px-6 bg-[#0a0000] relative overflow-hidden">

      {/* Background radial glows */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] rounded-full bg-red-700/10 blur-[120px]" />
        <div className="absolute top-1/2 right-1/4 translate-x-1/2 -translate-y-1/2 w-[500px] h-[350px] rounded-full bg-red-900/10 blur-[100px]" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[2px] bg-gradient-to-r from-transparent via-red-600/30 to-transparent" />
      </div>

      {/* Section Label */}
      <p className="relative text-center text-[10px] font-medium tracking-[4px] text-red-500 uppercase mb-3">
        Why Choose Us
      </p>

      {/* Section Heading */}
      <h2
        className="relative text-center text-5xl md:text-6xl tracking-widest text-white uppercase mb-14 leading-none"
        style={{ fontFamily: "'Bebas Neue', sans-serif" }}
      >
        What Sets Us{" "}
        <span className="text-red-600 drop-shadow-[0_0_20px_rgba(220,38,38,0.8)]">
          Apart
        </span>
      </h2>

      {/* Cards Grid */}
      <div className="relative max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-5">
        {cards.map((card) => (
          <div
            key={card.number}
            className="group relative h-[420px] rounded-2xl overflow-hidden cursor-pointer border border-white/[0.05] hover:border-red-700/40 transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] hover:-translate-y-2.5 hover:scale-[1.02] hover:shadow-[0_40px_80px_rgba(0,0,0,0.8),0_0_60px_rgba(220,38,38,0.2)]"
          >
            {/* Background Image */}
            <img
              src={card.img}
              alt={card.alt}
              className="absolute w-full h-full object-cover transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] scale-100 group-hover:scale-110 brightness-[0.4] saturate-[0.4] group-hover:brightness-[0.3] group-hover:saturate-50"
            />

            {/* Red tint overlay on hover */}
            <div className="absolute inset-0 bg-red-950/0 group-hover:bg-red-950/20 transition-all duration-500 z-[1]" />

            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/[0.98] via-black/60 to-black/10 group-hover:from-black/[0.99] group-hover:via-black/75 group-hover:to-black/20 transition-all duration-500 z-[1]" />

            {/* Bottom Accent Glow Line */}
            <div className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-red-600 to-transparent z-[3] scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] origin-center" />

            {/* Bottom glow pool */}
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3/4 h-16 bg-red-600/0 group-hover:bg-red-600/10 blur-2xl transition-all duration-500 z-[2]" />

            {/* Top-left Icon Orb */}
            <div className="absolute top-6 left-6 z-[2] w-9 h-9 rounded-full border border-white/10 group-hover:border-red-600/60 group-hover:bg-red-600/10 group-hover:shadow-[0_0_12px_rgba(220,38,38,0.3)] flex items-center justify-center transition-all duration-300">
              {card.icon}
            </div>

            {/* Ghost Number */}
            <span
              className="absolute top-4 right-5 z-[2] text-[80px] leading-none text-white/[0.04] group-hover:text-red-600/[0.15] group-hover:scale-110 transition-all duration-500 select-none"
              style={{ fontFamily: "'Bebas Neue', sans-serif" }}
            >
              {card.number}
            </span>

            {/* Card Content */}
            <div className="absolute inset-0 z-[2] flex flex-col justify-end p-8">

              {/* Tag */}
              <span className="text-[9px] font-medium tracking-[3px] text-red-500 uppercase mb-2.5 opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 delay-100">
                {card.tag}
              </span>

              {/* Title */}
              <h3
                className="text-[26px] tracking-wide text-white leading-[1.15] mb-3.5 group-hover:-translate-y-1 group-hover:text-red-50 transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)]"
                style={{ fontFamily: "'Bebas Neue', sans-serif" }}
              >
                {card.title}
              </h3>

              {/* Description */}
              <p className="text-[13px] text-white/40 leading-relaxed font-light max-h-0 overflow-hidden opacity-0 group-hover:max-h-20 group-hover:opacity-100 transition-all duration-500 delay-150">
                {card.desc}
              </p>

              {/* CTA */}
              <div className="flex items-center gap-2 mt-4 text-[11px] font-medium tracking-[2px] uppercase text-red-500 opacity-0 translate-y-1.5 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 delay-200">
                Learn more
                <span className="relative inline-block w-7 h-px bg-red-500 group-hover:w-10 transition-all duration-300">
                  <span className="absolute right-0 top-[-3px] w-1.5 h-1.5 border-t border-r border-red-500 rotate-45 inline-block" />
                </span>
              </div>

            </div>
          </div>
        ))}
      </div>

      {/* Google Font import */}
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&display=swap');`}</style>
    </section>
  );
}