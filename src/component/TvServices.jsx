import React from "react";
import { MonitorCheck, Volume2, Wifi } from "lucide-react";

const features = [
  {
    id: 1,
    icon: MonitorCheck,
    title: "Video Resolution",
    description:
      "Support for HD, 4K, and HDR content to ensure the best possible viewing experience on every screen.",
  },
  {
    id: 2,
    icon: Volume2,
    title: "Audio Quality",
    description:
      "Options for surround sound, Dolby Atmos, and high-fidelity audio formats for immersive sound.",
  },
  {
    id: 3,
    icon: Wifi,
    title: "Reliability",
    description:
      "Consistent streaming quality without buffering or drops — smooth performance every time.",
  },
];

export default function TVServices() {
  return (
    <section className="w-full bg-[#0a0000] py-24 px-6 md:px-12 relative overflow-hidden">

      {/* Background Glows */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-red-800/10 blur-[130px]" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full bg-red-900/8 blur-[110px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[200px] rounded-full bg-red-900/5 blur-[80px]" />
        {/* Top hairline */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[1px] bg-gradient-to-r from-transparent via-red-600/25 to-transparent" />
        {/* Bottom hairline */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[900px] h-[1px] bg-gradient-to-r from-transparent via-red-600/25 to-transparent" />
        {/* Subtle grid */}
        <div
          className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
      </div>

      <div className="relative max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-16">

        {/* ── LEFT IMAGE SIDE ── */}
        <div className="relative lg:w-1/2 w-full">

          {/* Glow behind image */}
          <div className="absolute -inset-4 bg-red-700/10 rounded-3xl blur-2xl" />

          {/* Main image */}
          <div className="relative rounded-2xl overflow-hidden border border-red-900/30 shadow-[0_0_60px_rgba(220,38,38,0.15)]">
            <img
              src="https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?auto=format&fit=crop&w=800&q=80"
              alt="TV Services"
              className="w-full h-[480px] object-cover brightness-[0.55] saturate-50"
            />
            {/* Red tint overlay */}
            <div className="absolute inset-0 bg-gradient-to-tr from-red-950/60 via-transparent to-transparent" />
            {/* Bottom fade */}
            <div className="absolute bottom-0 left-0 w-full h-1/3 bg-gradient-to-t from-[#0a0000]/80 to-transparent" />

            {/* Floating label — top left */}
            <div className="absolute top-5 left-5 flex items-center gap-2 bg-[#120000]/90 border border-red-700/40 rounded-xl px-4 py-2.5 shadow-[0_0_16px_rgba(220,38,38,0.2)]">
              <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse shadow-[0_0_6px_rgba(220,38,38,0.8)]" />
              <span className="text-white text-[10px] font-medium tracking-[3px] uppercase">Expert Support</span>
            </div>

            {/* Floating badge — bottom right */}
            <div className="absolute bottom-5 right-5 bg-[#120000]/90 border border-red-700/40 rounded-xl px-5 py-3 shadow-[0_0_16px_rgba(220,38,38,0.2)]">
              <p className="text-red-500 text-[9px] tracking-[3px] uppercase font-medium mb-0.5">Response Time</p>
              <p
                className="text-white font-black text-2xl leading-none"
                style={{ fontFamily: "'Bebas Neue', sans-serif" }}
              >
                Under 3 Hrs
              </p>
            </div>
          </div>

          {/* Bottom mini strip */}
          <div className="mt-5 grid grid-cols-3 gap-3">
            {["HD & 4K Ready", "All Brands", "Doorstep Service"].map((item) => (
              <div
                key={item}
                className="bg-white/[0.03] border border-white/[0.06] hover:border-red-700/40 hover:bg-red-950/20 rounded-xl py-3 px-2 text-center transition-all duration-300 group"
              >
                <p className="text-white/50 group-hover:text-white/80 text-[10px] tracking-[2px] uppercase font-medium transition-colors duration-300">
                  {item}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* ── RIGHT CONTENT SIDE ── */}
        <div className="lg:w-1/2 w-full flex flex-col gap-7">

          {/* Eyebrow */}
          <p className="text-[10px] font-medium tracking-[4px] text-red-500 uppercase">
            Premium TV Services
          </p>

          {/* Heading */}
          <h2
            className="text-4xl md:text-6xl text-white uppercase leading-none tracking-widest"
            style={{ fontFamily: "'Bebas Neue', sans-serif" }}
          >
            Get Started with the{" "}
            <span className="text-red-600 drop-shadow-[0_0_24px_rgba(220,38,38,0.7)]">
              Best TV Services
            </span>{" "}
            Today!
          </h2>

          {/* Tagline */}
          <div className="flex items-center gap-3">
            <span className="w-8 h-[2px] bg-red-600" />
            <p className="text-white/40 text-xs font-medium tracking-[3px] uppercase italic">
              Experts Ready to Serve You
            </p>
          </div>

          {/* Divider */}
          <div className="w-full h-[1px] bg-gradient-to-r from-red-700/40 via-white/5 to-transparent" />

          {/* Body */}
          <p className="text-white/50 text-sm leading-relaxed font-light">
            Ready to enhance your TV viewing experience? Contact our experts to find the perfect
            service for your home. Whether you need a{" "}
            <span className="text-white/80 font-medium">comprehensive repair</span> or a{" "}
            <span className="text-red-400 font-semibold">flexible same-day solution</span>, we
            help you get back to watching — fast.
          </p>

          {/* Features list */}
          <div className="flex flex-col gap-4">
            {features.map((feature) => {
              const Icon = feature.icon;
              return (
                <div
                  key={feature.id}
                  className="group flex items-start gap-4 bg-white/[0.03] hover:bg-red-950/25 border border-white/[0.06] hover:border-red-600/40 rounded-2xl px-5 py-4 transition-all duration-400 hover:shadow-[0_8px_30px_rgba(220,38,38,0.1)] cursor-default"
                >
                  {/* Icon */}
                  <div className="shrink-0 w-10 h-10 rounded-xl bg-red-600/10 border border-red-600/20 group-hover:bg-red-600 group-hover:border-red-600 group-hover:shadow-[0_0_16px_rgba(220,38,38,0.5)] flex items-center justify-center transition-all duration-300 mt-0.5">
                    <Icon
                      size={18}
                      className="text-red-400 group-hover:text-white transition-colors duration-300"
                    />
                  </div>

                  {/* Text */}
                  <div className="flex flex-col gap-1">
                    <h3
                      className="text-lg text-white uppercase tracking-wide leading-none group-hover:text-red-50 transition-colors duration-300"
                      style={{ fontFamily: "'Bebas Neue', sans-serif" }}
                    >
                      {feature.title}
                    </h3>
                    <p className="text-white/40 text-xs leading-relaxed font-light group-hover:text-white/55 transition-colors duration-300">
                      {feature.description}
                    </p>
                  </div>

                  {/* Arrow */}
                  <div className="ml-auto shrink-0 self-center opacity-0 group-hover:opacity-100 translate-x-2 group-hover:translate-x-0 transition-all duration-300">
                    <span className="relative inline-block w-4 h-px bg-red-500">
                      <span className="absolute right-0 top-[-3px] w-1.5 h-1.5 border-t border-r border-red-500 rotate-45 inline-block" />
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Divider */}
          <div className="w-full h-[1px] bg-gradient-to-r from-red-700/40 via-white/5 to-transparent" />

          {/* CTA Buttons */}
          <div className="flex items-center gap-5 flex-wrap">
            <button className="group relative px-8 py-3.5 bg-red-600 hover:bg-red-700 text-white text-xs font-semibold tracking-[3px] uppercase rounded-full transition-all duration-300 shadow-[0_0_30px_rgba(220,38,38,0.4)] hover:shadow-[0_0_45px_rgba(220,38,38,0.65)] overflow-hidden">
              <span className="relative z-10">Contact Our Experts</span>
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