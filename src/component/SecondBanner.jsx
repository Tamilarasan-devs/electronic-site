import React, { useEffect, useRef } from "react";

const cards = [
  {
    number: "01",
    tag: "Certified Parts",
    title: "Authorized Service Centers",
    desc: "Partnered with top TV brands to deliver only original, certified replacement parts — every single time.",
    img: "https://images.unsplash.com/photo-1593784991095-a205069470b6?auto=format&fit=crop&w=800&q=80",
    alt: "Authorized Service",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
        <path d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
  },
  {
    number: "02",
    tag: "Doorstep Service",
    title: "Technicians At Your Location",
    desc: "Expert technicians arrive at your door, diagnose on-site, and fix issues without transporting your TV.",
    img: "https://repairkro.com/wp-content/uploads/2023/11/blog-1.webp",
    alt: "Technician Visit",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
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
      <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
        <path d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
        <path d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
];

export default function SecondBanner() {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const cardsRef = useRef([]);

  useEffect(() => {
    // Heading animation
    const headingObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.querySelectorAll("[data-animate]").forEach((el, i) => {
              setTimeout(() => {
                el.style.opacity = "1";
                el.style.transform = "translateY(0)";
              }, i * 120);
            });
          }
        });
      },
      { threshold: 0.2 }
    );

    if (headingRef.current) headingObserver.observe(headingRef.current);

    // Cards animation
    const cardObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.style.opacity = "1";
            entry.target.style.transform = "translateY(0) scale(1)";
          }
        });
      },
      { threshold: 0.15 }
    );

    cardsRef.current.forEach((card) => { if (card) cardObserver.observe(card); });

    return () => {
      headingObserver.disconnect();
      cardObserver.disconnect();
    };
  }, []);

  return (
    <section ref={sectionRef} className="w-full py-24 px-6 
bg-gradient-to-br from-[#0A1F44] via-[#1E3A8A] to-[#3B82F6]
     relative overflow-hidden">

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
        style={{ background: "linear-gradient(90deg, transparent, rgba(42,71,113,0.25), transparent)" }} />
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[900px] h-[1px]"
        style={{ background: "linear-gradient(90deg, transparent, rgba(42,71,113,0.25), transparent)" }} />

      {/* Soft bg glows */}
      <div className="absolute top-1/2 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] rounded-full blur-[120px] pointer-events-none opacity-20 bg-[#eef2f8]" />
      <div className="absolute top-1/2 right-1/4 translate-x-1/2 -translate-y-1/2 w-[500px] h-[350px] rounded-full blur-[100px] pointer-events-none opacity-15 bg-[#eef2f8]" />

      {/* ── HEADER ── */}
      <div ref={headingRef} className="relative text-center mb-16 flex flex-col items-center gap-4">

        {/* Eyebrow chip */}
        <div
          data-animate
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#c5d3e8] bg-[#eef2f8]"
          style={{ opacity: 0, transform: "translateY(20px)", transition: "opacity 0.6s ease, transform 0.6s cubic-bezier(0.34,1.2,0.64,1)" }}
        >
          <span className="w-1.5 h-1.5 rounded-full animate-pulse bg-[#2a4771]" />
          {/* <p className="text-[10px] font-bold tracking-[4px] uppercase text-[#2a4771]">Why Choose Us</p> */}
        </div>

        {/* Heading */}
        <h2
          data-animate
          className="text-5xl md:text-6xl tracking-widest text-white  uppercase leading-none"
          style={{
        
            opacity: 0,
            transform: "translateY(24px)",
            transition: "opacity 0.7s ease, transform 0.7s cubic-bezier(0.34,1.2,0.64,1)",
          }}
        >
          What Sets Us{" "}
          <span className="relative text-[#2a4771] text-blue-300">
            Apart
            <span className="absolute -bottom-2 left-0 right-0 h-[3px] rounded-full bg-gradient-to-r from-[#2a4771] to-[#3d5f96]" />
          </span>
        </h2>

        {/* Subtitle */}
        <div
          data-animate
          className="flex items-center gap-3 mt-1"
          style={{ opacity: 0, transform: "translateY(20px)", transition: "opacity 0.6s ease, transform 0.6s cubic-bezier(0.34,1.2,0.64,1)" }}
        >
          <span className="w-8 h-[2px] rounded-full bg-[#2a4771]" />
          <p className="text-md font-bold tracking-[3px] uppercase italic text-blue-200">
            Experience Unmatched Service &amp; Expertise
          </p>
          <span className="w-8 h-[2px] rounded-full bg-[#2a4771]" />
        </div>
      </div>

      {/* ── CARDS GRID ── */}
      <div className="relative max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-5">
        {cards.map((card, index) => (
          <div
            key={card.number}
            ref={(el) => (cardsRef.current[index] = el)}
            className="group relative h-[420px] rounded-2xl overflow-hidden cursor-pointer border border-[#c5d3e8]
              hover:border-[#2a4771]
              hover:-translate-y-3 hover:scale-[1.02]
              hover:shadow-[0_30px_70px_rgba(42,71,113,0.25),0_0_40px_rgba(42,71,113,0.1)]
              transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)]"
            style={{
              opacity: 0,
              transform: "translateY(40px) scale(0.97)",
              transition: `opacity 0.65s ease ${index * 130}ms, transform 0.65s cubic-bezier(0.34,1.15,0.64,1) ${index * 130}ms, box-shadow 0.4s ease, border-color 0.3s ease`,
            }}
          >
            {/* Background Image */}
            <img
              src={card.img}
              alt={card.alt}
              className="absolute w-full h-full object-cover transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)]
                scale-100 group-hover:scale-110
                brightness-[0.55] saturate-[0.5]
                group-hover:brightness-[0.35] group-hover:saturate-[0.4]"
            />

            {/* Navy tint overlay on hover */}
            <div className="absolute inset-0 transition-all duration-500 z-[1]"
              style={{ background: "rgba(42,71,113,0)" }}
              onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(42,71,113,0.25)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = "rgba(42,71,113,0)"; }}
            />

            {/* Dark gradient overlay */}
            <div className="absolute inset-0 z-[1]"
              style={{ background: "linear-gradient(to top, rgba(0,0,0,0.97) 0%, rgba(0,0,0,0.55) 50%, rgba(0,0,0,0.12) 100%)" }}
            />

            {/* Bottom accent glow line */}
            <div className="absolute bottom-0 left-0 w-full h-[3px] z-[3] scale-x-0 group-hover:scale-x-100
              transition-transform duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] origin-center"
              style={{ background: "linear-gradient(90deg, transparent, #2a4771, #3d5f96, transparent)" }}
            />

            {/* Bottom glow pool */}
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3/4 h-16 blur-2xl transition-all duration-500 z-[2]
              opacity-0 group-hover:opacity-100"
              style={{ background: "rgba(42,71,113,0.3)" }}
            />

            {/* Top-left icon orb */}
            <div className="absolute top-6 left-6 z-[4] w-9 h-9 rounded-full flex items-center justify-center transition-all duration-300
              border border-white/20 bg-white/5
              group-hover:border-white/60 group-hover:bg-white/20 group-hover:shadow-[0_0_16px_rgba(255,255,255,0.2)]"
            >
              <span className="text-white/50 group-hover:text-white transition-colors duration-300">
                {card.icon}
              </span>
            </div>

            {/* Ghost number */}
            <span
              className="absolute top-4 right-5 z-[2] text-[80px] leading-none select-none transition-all duration-500
                text-white/[0.04] group-hover:text-white/[0.1] group-hover:scale-110"
              
            >
              {card.number}
            </span>

            {/* Card Content */}
            <div className="absolute inset-0 z-[4] flex flex-col justify-end p-8">

              {/* Tag — slides in on hover */}
              <span className="text-[9px] font-bold tracking-[3px] uppercase mb-2.5
                text-white/60 group-hover:text-white
                opacity-0 translate-y-3 group-hover:opacity-100 group-hover:translate-y-0
                transition-all duration-300 delay-75">
                {card.tag}
              </span>

              {/* Title */}
              <h3
                className="text-[26px] tracking-wide text-white leading-[1.15] mb-3.5
                  group-hover:-translate-y-1 group-hover:text-white
                  transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)]"
                
              >
                {card.title}
              </h3>

              {/* Description — expands on hover */}
              <p className="text-[13px] leading-relaxed font-light max-h-0 overflow-hidden
                text-white/75
                opacity-0 group-hover:max-h-24 group-hover:opacity-100
                transition-all duration-500 delay-[150ms]">
                {card.desc}
              </p>

              {/* CTA */}
              <div className="flex items-center gap-2 mt-4 text-[11px] font-bold tracking-[2px] uppercase
                text-white/70 group-hover:text-white
                opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0
                transition-all duration-300 delay-200">
                Learn more
                <span className="relative inline-block w-7 h-px bg-white/70 group-hover:w-10 group-hover:bg-white transition-all duration-300">
                  <span className="absolute right-0 top-[-3px] w-1.5 h-1.5 border-t border-r border-white/70 group-hover:border-white rotate-45 inline-block transition-colors duration-300" />
                </span>
              </div>

            </div>

            {/* Shimmer sweep on hover */}
            <div className="absolute inset-0 z-[3] opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-300"
              style={{ background: "linear-gradient(120deg, transparent 30%, rgba(255,255,255,0.04) 50%, transparent 70%)" }}
            />
          </div>
        ))}
      </div>
    </section>
  );
}