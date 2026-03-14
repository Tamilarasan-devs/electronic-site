import React, { useEffect, useRef } from "react";

const tvBrands = [
  {
    name: "Samsung",
    img: "https://upload.wikimedia.org/wikipedia/commons/2/24/Samsung_Logo.svg",
  },
  {
    name: "LG",
    img: "https://upload.wikimedia.org/wikipedia/commons/b/bf/LG_logo_%282015%29.svg",
  },
  {
    name: "Sony",
    img: "https://upload.wikimedia.org/wikipedia/commons/c/ca/Sony_logo.svg",
  },
  {
    name: "Philips",
    img: "https://upload.wikimedia.org/wikipedia/commons/5/52/Philips_logo_new.svg",
  },
  {
    name: "Panasonic",
    img: "https://upload.wikimedia.org/wikipedia/commons/0/0d/Panasonic_logo_%28Blue%29.svg",
  },
  {
    name: "MI",
    img: "https://upload.wikimedia.org/wikipedia/commons/a/ae/Xiaomi_logo_%282021-%29.svg",
  },
  {
    name: "OnePlus",
    img: "https://upload.wikimedia.org/wikipedia/commons/8/84/OnePlus_Logo.svg",
  },
  {
    name: "TCL",
    img: "https://upload.wikimedia.org/wikipedia/commons/1/10/TCL_logo.svg",
  },
  {
    name: "Motorola",
    img: "https://upload.wikimedia.org/wikipedia/commons/f/f2/Motorola-logo-black-and-white.png",
  },
  {
    name: "Kodak",
    img: "https://upload.wikimedia.org/wikipedia/commons/b/b3/Kodak_wordmark.svg",
  },
  {
    name: "Toshiba",
    img: "https://upload.wikimedia.org/wikipedia/commons/5/5e/Toshiba_logo.svg",
  },
  {
    name: "Hisense",
    img: "https://upload.wikimedia.org/wikipedia/commons/0/04/Hisense-logo.svg",
  },
];

const TVBrandCards = () => {
  const cardsRef = useRef([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-card-in");
            entry.target.style.opacity = "1";
            entry.target.style.transform = "translateY(0)";
          }
        });
      },
      { threshold: 0.1 }
    );

    cardsRef.current.forEach((card) => {
      if (card) observer.observe(card);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <section className="w-full bg-white py-24 px-6 md:px-12 relative overflow-hidden">

      {/* Subtle dot pattern background */}
      <div
        className="absolute inset-0 pointer-events-none opacity-40"
        style={{
          backgroundImage: "radial-gradient(circle, #e5e7eb 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />

      {/* Top color wash */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-red-500 via-orange-400 to-red-600" />

      {/* Soft radial glow top center */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[260px] rounded-full bg-red-50 blur-3xl opacity-80 pointer-events-none" />

      <div className="relative max-w-7xl mx-auto">

        {/* ── HEADER ── */}
        <div className="text-center mb-16 flex flex-col items-center gap-4">

          {/* Eyebrow chip */}
          <div className="inline-flex items-center gap-2 bg-red-50 border border-red-100 px-4 py-1.5 rounded-full">
            <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
            <span className="text-red-600 text-[10px] font-semibold tracking-[4px] uppercase"
              style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: "0.2em" }}>
              All Major Brands
            </span>
          </div>

          {/* Title */}
          <h2
            className="text-5xl md:text-7xl text-gray-900 uppercase leading-none tracking-widest"
            style={{ fontFamily: "'Bebas Neue', sans-serif" }}
          >
            Popular{" "}
            <span className="text-red-600 relative">
              TV Brands
              {/* Underline accent */}
              <span className="absolute -bottom-2 left-0 right-0 h-[3px] bg-gradient-to-r from-red-500 to-orange-400 rounded-full" />
            </span>
          </h2>

          {/* Divider with text */}
          <div className="flex items-center gap-4 mt-2">
            <span className="w-10 h-px bg-gray-200" />
            <p className="text-gray-400 text-xs font-medium tracking-[3px] uppercase">
              We Service All Leading Television Brands
            </p>
            <span className="w-10 h-px bg-gray-200" />
          </div>

          {/* Count badge */}
          <div className="mt-1 px-5 py-2 rounded-full border border-gray-200 bg-gray-50 flex items-center gap-2 shadow-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
            <span className="text-gray-500 text-[11px] tracking-[2px] uppercase font-medium">
              {tvBrands.length} Brands &amp; Counting
            </span>
          </div>
        </div>

        {/* ── BRAND GRID ── */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {tvBrands.map((brand, index) => (
            <div
              key={index}
              ref={(el) => (cardsRef.current[index] = el)}
              style={{
                opacity: 0,
                transform: "translateY(24px)",
                transition: `opacity 0.5s ease ${index * 60}ms, transform 0.5s cubic-bezier(0.34,1.3,0.64,1) ${index * 60}ms, box-shadow 0.3s ease, border-color 0.3s ease`,
                fontFamily: "'Bebas Neue', sans-serif",
              }}
              className="group relative bg-white border border-gray-100 hover:border-red-200 rounded-2xl p-6 flex flex-col items-center gap-4 cursor-default hover:-translate-y-2 hover:shadow-xl hover:shadow-red-100/60 overflow-hidden"
            >
              {/* Top accent stripe on hover */}
              <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-red-500 to-orange-400 scale-x-0 group-hover:scale-x-100 transition-transform duration-400 origin-left rounded-t-2xl" />

              {/* Inner radial glow */}
              <div className="absolute inset-0 bg-gradient-to-br from-red-50/0 to-orange-50/0 group-hover:from-red-50/60 group-hover:to-orange-50/30 rounded-2xl transition-all duration-500 pointer-events-none" />

              {/* Number tag */}
              <span className="absolute top-2.5 right-3 text-[9px] font-mono text-gray-200 group-hover:text-red-200 transition-colors duration-300">
                {String(index + 1).padStart(2, "0")}
              </span>

              {/* Logo */}
              <div className="relative w-14 h-14 flex items-center justify-center">
                <img
                  src={brand.img}
                  alt={brand.name}
                  className="w-full h-full object-contain filter grayscale opacity-50 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-400 scale-90 group-hover:scale-100"
                  onError={(e) => {
                    e.target.style.display = "none";
                    e.target.nextSibling.style.display = "flex";
                  }}
                />
                {/* Fallback */}
                <div
                  className="hidden w-14 h-14 items-center justify-center rounded-xl bg-red-50 border border-red-100"
                >
                  <span className="text-red-500 text-base tracking-widest font-bold">
                    {brand.name.slice(0, 2).toUpperCase()}
                  </span>
                </div>
              </div>

              {/* Brand name */}
              <p className="relative text-gray-300 group-hover:text-gray-800 text-sm tracking-[2px] uppercase font-semibold text-center transition-colors duration-300">
                {brand.name}
              </p>

              {/* Bottom dot indicator */}
              <span className="absolute bottom-2.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-red-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-sm shadow-red-300" />
            </div>
          ))}
        </div>

        {/* ── BOTTOM CTA STRIP ── */}
        <div className="mt-14 rounded-2xl border border-gray-100 bg-gradient-to-r from-gray-50 via-white to-gray-50 px-8 py-8 flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden shadow-sm">

          {/* Left decorative bar */}
          <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-red-500 to-orange-400 rounded-l-2xl" />

          <div className="relative flex flex-col gap-1 text-center md:text-left pl-4">
            <p className="text-gray-900 text-lg font-bold tracking-wide">
              Don't see your brand listed?
            </p>
            <p className="text-gray-400 text-sm">
              We service many more — call us and we'll confirm availability instantly.
            </p>
          </div>

          <div className="relative flex items-center gap-4 shrink-0">
            {/* Primary CTA */}
            <button className="group/btn relative px-7 py-3 bg-red-600 hover:bg-red-700 text-white text-xs font-bold tracking-[3px] uppercase rounded-full transition-all duration-300 shadow-lg shadow-red-200 hover:shadow-red-300 hover:shadow-xl hover:-translate-y-0.5 overflow-hidden">
              <span className="relative z-10">Book a Repair</span>
              <span className="absolute inset-0 bg-gradient-to-r from-red-500 to-red-700 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300" />
            </button>

            {/* Secondary CTA */}
            <button className="flex items-center gap-2 text-gray-400 hover:text-red-500 text-xs tracking-[2px] uppercase font-semibold transition-all duration-300 group/sec">
              Call Us
              <span className="relative inline-block w-5 h-px bg-gray-300 group-hover/sec:bg-red-500 group-hover/sec:w-8 transition-all duration-300">
                <span className="absolute right-0 top-[-3px] w-1.5 h-1.5 border-t border-r border-gray-300 group-hover/sec:border-red-500 rotate-45 inline-block transition-colors duration-300" />
              </span>
            </button>
          </div>
        </div>

      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&display=swap');
      `}</style>
    </section>
  );
};

export default TVBrandCards;