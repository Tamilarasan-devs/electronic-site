import React from "react";
import { MonitorCheck, Volume2, Wifi } from "lucide-react";

const features = [
  { id: 1, icon: MonitorCheck, title: "Video Resolution", description: "Support for HD, 4K, and HDR content to ensure the best possible viewing experience on every screen." },
  { id: 2, icon: Volume2, title: "Audio Quality", description: "Options for surround sound, Dolby Atmos, and high-fidelity audio formats for immersive sound." },
  { id: 3, icon: Wifi, title: "Reliability", description: "Consistent streaming quality without buffering or drops — smooth performance every time." },
];

export default function TVServices() {
  return (
    <section className="w-full bg-white py-24 px-6 md:px-12 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none opacity-[0.35]"
        style={{ backgroundImage: "radial-gradient(circle, #c7d4e8 1px, transparent 1px)", backgroundSize: "28px 28px" }} />
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#2a4771] to-[#3d5f96]" />
      <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full blur-[130px] pointer-events-none opacity-15 bg-[#eef2f8]" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full blur-[110px] pointer-events-none opacity-15 bg-[#eef2f8]" />

      <div className="relative max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-16">

        {/* LEFT IMAGE */}
        <div className="relative lg:w-1/2 w-full">
          <div className="absolute -inset-4 rounded-3xl blur-2xl opacity-20 bg-[#eef2f8]" />
          <div className="relative rounded-2xl overflow-hidden shadow-xl border border-[#c5d3e8]">
            <img src="https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?auto=format&fit=crop&w=800&q=80"
              alt="TV Services" className="w-full h-[480px] object-cover brightness-[0.75] saturate-75" />
            <div className="absolute inset-0" style={{ background: "linear-gradient(135deg, rgba(42,71,113,0.45) 0%, transparent 60%)" }} />
            <div className="absolute bottom-0 left-0 w-full h-1/3 bg-gradient-to-t from-white/20 to-transparent" />

            {/* Floating label */}
            <div className="absolute top-5 left-5 flex items-center gap-2 rounded-xl px-4 py-2.5 shadow-lg backdrop-blur-sm bg-white/92 border border-[#c5d3e8]">
              <span className="w-2 h-2 rounded-full animate-pulse bg-[#2a4771]" style={{ boxShadow: "0 0 6px rgba(42,71,113,0.6)" }} />
              <span className="text-[10px] font-bold tracking-[3px] uppercase text-[#2a4771]">Expert Support</span>
            </div>

            {/* Floating badge */}
            <div className="absolute bottom-5 right-5 rounded-xl px-5 py-3 shadow-lg backdrop-blur-sm bg-white/92 border border-[#c5d3e8]">
              <p className="text-[9px] tracking-[3px] uppercase font-bold mb-0.5 text-[#3d5f96]">Response Time</p>
              <p className="font-black text-2xl leading-none text-[#2a4771]">Under 3 Hrs</p>
            </div>
          </div>

          {/* Mini strip */}
          <div className="mt-5 grid grid-cols-3 gap-3">
            {["HD & 4K Ready", "All Brands", "Doorstep Service"].map((item) => (
              <div key={item}
                className="group rounded-xl py-3 px-2 text-center cursor-default transition-all duration-300
                  bg-[#eef2f8] border border-[#c5d3e8]
                  hover:bg-[#2a4771] hover:border-[#2a4771] hover:shadow-[0_4px_16px_rgba(42,71,113,0.2)]">
                <p className="text-[14px] tracking-[2px] uppercase font-bold transition-colors duration-300
                  text-[#2a4771] group-hover:text-white">{item}</p>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT CONTENT */}
        <div className="lg:w-1/2 w-full flex flex-col gap-7">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#c5d3e8] bg-[#eef2f8] self-start">
            <span className="w-1.5 h-1.5 rounded-full animate-pulse bg-[#2a4771]" />
            <p className="text-[14px] font-bold tracking-[4px] uppercase text-[#2a4771]">Premium TV Services</p>
          </div>

          <h2 className="text-4xl md:text-6xl uppercase leading-none tracking-widest text-gray-900">
            Get Started with the{" "}
            <span className="relative text-[#2a4771]">
              Best TV Services
              <span className="absolute -bottom-1 left-0 right-0 h-[3px] rounded-full bg-gradient-to-r from-[#2a4771] to-[#3d5f96]" />
            </span>{" "}Today!
          </h2>

          <div className="flex items-center gap-3">
            <span className="w-8 h-[2px] rounded-full bg-[#2a4771]" />
            <p className="text-gray-600 text-md font-medium tracking-[3px] uppercase italic">Experts Ready to Serve You</p>
          </div>

          <div className="w-full h-[1px] bg-gradient-to-r from-[#2a4771]/30 via-[#c5d3e8] to-transparent" />

          <p className="text-gray-500 text-md leading-relaxed">
            Ready to enhance your TV viewing experience? Contact our experts to find the perfect service for your home. Whether you need a{" "}
            <span className="text-gray-800 font-semibold">comprehensive repair</span> or a{" "}
            <span className="font-bold text-[#2a4771]">flexible same-day solution</span>, we help you get back to watching — fast.
          </p>

          {/* Features */}
          <div className="flex flex-col gap-4">
            {features.map((feature) => {
              const Icon = feature.icon;
              return (
                <div key={feature.id}
                  className="group flex items-start gap-4 rounded-2xl px-5 py-4 cursor-default transition-all duration-300
                    bg-[#eef2f8] border border-[#c5d3e8]
                    hover:bg-[#2a4771] hover:border-[#2a4771]
                    hover:-translate-y-1 hover:shadow-[0_8px_30px_rgba(42,71,113,0.2)]">
                  <div className="shrink-0 w-10 h-10 rounded-xl flex items-center justify-center mt-0.5 transition-all duration-300
                    bg-[#2a4771]/10 border border-[#2a4771]/20
                    group-hover:bg-white/20 group-hover:border-white/30">
                    <Icon size={18} className="text-[#2a4771] group-hover:text-white transition-colors duration-300" />
                  </div>
                  <div className="flex flex-col gap-1 flex-1">
                    <h3 className="text-lg uppercase tracking-wide leading-none transition-colors duration-300
                      text-gray-800 group-hover:text-white"
                    >{feature.title}</h3>
                    <p className="text-md leading-relaxed transition-colors duration-300
                      text-gray-400 group-hover:text-white/80">{feature.description}</p>
                  </div>
                  <div className="ml-auto shrink-0 self-center opacity-0 group-hover:opacity-100 translate-x-2 group-hover:translate-x-0 transition-all duration-300">
                    <span className="relative inline-block w-4 h-px bg-white">
                      <span className="absolute right-0 top-[-3px] w-1.5 h-1.5 border-t border-r border-white rotate-45 inline-block" />
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="w-full h-[1px] bg-gradient-to-r from-[#2a4771]/30 via-[#c5d3e8] to-transparent" />

          <div className="flex items-center gap-5 flex-wrap">
            <button className="px-8 py-3.5 text-white text-xs font-bold tracking-[3px] uppercase rounded-full transition-all duration-300
              bg-[#2a4771] shadow-[0_8px_28px_rgba(42,71,113,0.35)]
              hover:bg-[#3d5f96] hover:shadow-[0_12px_36px_rgba(42,71,113,0.5)] hover:-translate-y-0.5">
              Contact Our Experts
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
    </section>
  );
}