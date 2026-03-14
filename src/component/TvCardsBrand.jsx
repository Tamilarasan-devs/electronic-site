import React, { useEffect, useRef } from "react";

const tvBrands = [
  {
    name: "Samsung",
    img: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b4/Samsung_wordmark.svg/250px-Samsung_wordmark.svg.png",
  },
  {
    name: "LG",
    img: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8d/LG_logo_%282014%29.svg/250px-LG_logo_%282014%29.svg.png",
  },
  {
    name: "Sony",
    img: "https://upload.wikimedia.org/wikipedia/commons/c/ca/Sony_logo.svg",
  },
  {
    name: "Philips",
    img: "https://1000logos.net/wp-content/uploads/2017/05/Phillips-Logo-2008-500x281.png",
  },
  {
    name: "Panasonic",
    img: "https://brandlogos.net/wp-content/uploads/2015/03/panasonic-logo_brandlogos.net_wmewy-512x512.png",
  },
  {
    name: "MI",
    img: "https://upload.wikimedia.org/wikipedia/commons/a/ae/Xiaomi_logo_%282021-%29.svg",
  },
  {
    name: "OnePlus",
    img: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f8/OP_LU_Reg_1L_RGB_red_copy-01.svg/250px-OP_LU_Reg_1L_RGB_red_copy-01.svg.png",
  },
  {
    name: "TCL",
    img: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Logo_of_the_TCL_Corporation.svg/250px-Logo_of_the_TCL_Corporation.svg.png",
  },
  {
    name: "Motorola",
    img: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/13/Motorola-Logo.svg/250px-Motorola-Logo.svg.png",
  },
  {
    name: "Kodak",
    img: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/84/Eastman_Kodak_Company_logo_%282016%29.svg/250px-Eastman_Kodak_Company_logo_%282016%29.svg.png",
  },
  {
    name: "Toshiba",
    img: "https://logodownload.org/wp-content/uploads/2014/09/toshiba-logo-0.png",
  },
  {
    name: "Hisense",
    img: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/47/Hisense.svg/250px-Hisense.svg.png",
  },
  {
    name: "Realme",
    img: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e6/Realme_logo_SVG.svg/250px-Realme_logo_SVG.svg.png",
  },
  {
    name: "Onida",
    img: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0a/Onida_Electronics.svg/250px-Onida_Electronics.svg.png",
  },
  {
    name: "Acer",
    img: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8e/Acer_Group_2012.svg/250px-Acer_Group_2012.svg.png",
  },
  {
    name: "Thomson",
    img: "https://images.seeklogo.com/logo-png/13/2/thomson-logo-png_seeklogo-139611.png",
  },
  {
    name: "Croma",
    img: "https://upload.wikimedia.org/wikipedia/commons/9/9b/Croma_%28store%29_logo.gif",
  },
  {
    name: "Coocaa",
    img: "https://imgs.search.brave.com/i4he7cMXASiZPiNTwoaY53O44SxDJf9xmXPm9gldBEg/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9jZG4u/YnJhbmRmZXRjaC5p/by9pZDdvbGhRWFNf/L3RoZW1lL2Rhcmsv/bG9nby5zdmc_Yz0x/YnhpZDY0TXVwN2Fj/emV3U0FZTVgmdD0x/NzQ4MDIwOTMzMzc5",
  },
];

const BRAND = "#2a4771";
const BRAND_MID = "#3d5f96";
const BRAND_LIGHT = "#eef2f8";
const BRAND_BORDER = "#c5d3e8";

const TVBrandCards = () => {
  const cardsRef = useRef([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.style.opacity = "1";
            entry.target.style.transform = "translateY(0)";
          }
        });
      },
      { threshold: 0.1 }
    );
    cardsRef.current.forEach((card) => { if (card) observer.observe(card); });
    return () => observer.disconnect();
  }, []);

  return (
    <section className="w-full bg-white py-24 px-6 md:px-12 relative overflow-hidden">

      {/* Dot pattern background */}
      <div
        className="absolute inset-0 pointer-events-none opacity-30"
        style={{
          backgroundImage: "radial-gradient(circle, #cbd5e1 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />

      {/* Top gradient bar */}
      <div
        className="absolute top-0 left-0 right-0 h-1"
        style={{ background: `linear-gradient(90deg, ${BRAND}, ${BRAND_MID})` }}
      />

      {/* Soft top radial glow */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[260px] rounded-full blur-3xl opacity-40 pointer-events-none"
        style={{ background: BRAND_LIGHT }}
      />

      <div className="relative max-w-7xl mx-auto">

        {/* ── HEADER ── */}
        <div className="text-center mb-16 flex flex-col items-center gap-4">

          {/* Eyebrow chip */}
          <div
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border"
            style={{ background: BRAND_LIGHT, borderColor: BRAND_BORDER }}
          >
            <span
              className="w-1.5 h-1.5 rounded-full animate-pulse"
              style={{ background: BRAND }}
            />
            <span
              className="text-[10px] font-semibold tracking-[4px] uppercase"
              style={{ color: BRAND, fontFamily: "'Bebas Neue', sans-serif", letterSpacing: "0.2em" }}
            >
              All Major Brands
            </span>
          </div>

          {/* Main title */}
          <h2
            className="text-5xl md:text-7xl uppercase leading-none tracking-widest text-gray-900"
            style={{ fontFamily: "'Bebas Neue', sans-serif" }}
          >
            Popular{" "}
            <span className="relative" style={{ color: BRAND }}>
              TV Brands
              <span
                className="absolute -bottom-2 left-0 right-0 h-[3px] rounded-full"
                style={{ background: `linear-gradient(90deg, ${BRAND}, ${BRAND_MID})` }}
              />
            </span>
          </h2>

          {/* Subtitle row */}
          <div className="flex items-center gap-4 mt-2">
            <span className="w-10 h-px bg-gray-200" />
            <p className="text-gray-400 text-xs font-medium tracking-[3px] uppercase">
              We Service All Leading Television Brands
            </p>
            <span className="w-10 h-px bg-gray-200" />
          </div>

          {/* Count badge */}
          <div className="mt-1 px-5 py-2 rounded-full border border-gray-200 bg-gray-50 flex items-center gap-2 shadow-sm">
            <span
              className="w-1.5 h-1.5 rounded-full animate-pulse"
              style={{ background: BRAND }}
            />
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
              className="group relative bg-gray-200 rounded-2xl p-6 flex flex-col items-center gap-4 cursor-default overflow-hidden"
              style={{
                opacity: 0,
                transform: "translateY(24px)",
                transition: `opacity 0.5s ease ${index * 55}ms, transform 0.5s cubic-bezier(0.34,1.3,0.64,1) ${index * 55}ms, box-shadow 0.3s ease, border-color 0.3s ease`,
                border: `1px solid #e8edf5`,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = BRAND;
                e.currentTarget.style.boxShadow = `0 16px 40px rgba(42,71,113,0.15)`;
                e.currentTarget.style.transform = "translateY(-8px)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "#e8edf5";
                e.currentTarget.style.boxShadow = "none";
                e.currentTarget.style.transform = "translateY(0)";
              }}
            >
              {/* Top stripe on hover */}
              <div
                className="absolute top-0 left-0 right-0 h-[3px] rounded-t-2xl scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"
               
              />

              {/* Inner bg wash on hover */}
              <div
                className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{ background: `linear-gradient(135deg, ${BRAND_LIGHT}90, white)` }}
              />

              {/* Index number */}
              <span
                className="absolute top-2.5 right-3 text-[9px] font-mono transition-colors duration-300"
                style={{ color: "#e2e8f0" }}
              >
                {String(index + 1).padStart(2, "0")}
              </span>

             {/* Logo */}
<div className="relative w-24 h-24 flex items-center justify-center">

  <div className="w-20 h-20 flex items-center justify-center rounded-2xl 
                  bg-white border border-gray-200 shadow-sm">

    <img
      src={brand.img}
      alt={brand.name}
      className="w-16 h-16 object-contain"
      onError={(e) => {
        e.currentTarget.style.display = "none";
        e.currentTarget.nextSibling.style.display = "flex";
      }}
    />

    {/* Fallback */}
    <div
      className="hidden w-full h-full items-center justify-center rounded-2xl"
      style={{ background: BRAND_LIGHT, border: `1px solid ${BRAND_BORDER}` }}
    >
      <span
        className="text-lg font-bold tracking-widest"
        style={{ color: BRAND }}
      >
        {brand.name.slice(0, 2).toUpperCase()}
      </span>
    </div>

  </div>

</div>

              {/* Brand name */}
              {/* <p
                className="relative z-10 text-[#2a4771] group-hover:text-gray-800 text-sm tracking-[2px] uppercase font-semibold text-center transition-colors duration-300"
                style={{ fontFamily: "'Bebas Neue', sans-serif" }}
              >
                {brand.name}
              </p> */}

              {/* Bottom dot indicator */}
              <span
                className="absolute bottom-2.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{ background: BRAND }}
              />
            </div>
          ))}
        </div>

        {/* ── BOTTOM CTA STRIP ── */}
        <div
          className="mt-14 rounded-2xl px-8 py-8 flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden shadow-sm"
          style={{ background: "#f7f9fc", border: "1px solid #e2e8f2" }}
        >
          {/* Left accent bar */}
          <div
            className="absolute left-0 top-0 bottom-0 w-1 rounded-l-2xl"
            style={{ background: `linear-gradient(180deg, ${BRAND}, ${BRAND_MID})` }}
          />

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
            <button
              className="relative px-7 py-3 text-white text-xs font-bold tracking-[3px] uppercase rounded-full transition-all duration-300 hover:-translate-y-0.5"
              style={{
                background: BRAND,
                boxShadow: `0 8px 24px rgba(42,71,113,0.28)`,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = BRAND_MID;
                e.currentTarget.style.boxShadow = `0 12px 32px rgba(42,71,113,0.42)`;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = BRAND;
                e.currentTarget.style.boxShadow = `0 8px 24px rgba(42,71,113,0.28)`;
              }}
            >
              Book a Repair
            </button>

            {/* Secondary CTA */}
            <button
              className="flex items-center gap-2 text-[#2a4771] text-md tracking-[2px] uppercase font-bold transition-colors duration-300 hover:text-[#2a4771] group/sec"
              style={{ background: "none", border: "none", cursor: "pointer" }}
            >
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
};

export default TVBrandCards;