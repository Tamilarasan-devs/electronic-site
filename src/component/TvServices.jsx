import React, { useEffect, useRef, useState } from "react";
import { MonitorCheck, Volume2, Wifi, Phone, MessageSquare, ArrowUpRight } from "lucide-react";

const features = [ { id: 1, icon: MonitorCheck, title: "Video Resolution", description: "Support for HD, 4K, and HDR content to ensure the best possible viewing experience on every screen.", accent: "#2563eb", light: "#eff6ff", border: "#bfdbfe", iconBg: "#dbeafe", }, { id: 2, icon: Volume2, title: "Audio Quality", description: "Options for surround sound, Dolby Atmos, and high-fidelity audio formats for immersive sound.", accent: "#0891b2", light: "#ecfeff", border: "#a5f3fc", iconBg: "#cffafe", }, { id: 3, icon: Wifi, title: "Reliability", description: "Consistent streaming quality without buffering or drops — smooth performance every time.", accent: "#7c3aed", light: "#f5f3ff", border: "#ddd6fe", iconBg: "#ede9fe", }, ];

function useInView() {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) setInView(true);
    });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return [ref, inView];
}

export default function TVServices() {
  const [leftRef, leftInView] = useInView();
  const [rightRef, rightInView] = useInView();
  const [hover, setHover] = useState(null);

  return (
    <section className="relative  px-6 overflow-hidden ">

      {/* Top Gradient */}
      <div className="absolute top-0 left-0 right-0 h-[3px] mt-4 bg-gradient-to-r from-[#890b44] via-pink-400 to-[#890b44]" />

      <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-14 items-center m-10">

        {/* LEFT IMAGE */}
        <div
          ref={leftRef}
          className={`transition-all duration-700 ${leftInView ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-10"}`}
        >
          <div className="relative rounded-2xl overflow-hidden shadow-xl group">

            <img
              src="https://images.unsplash.com/photo-1593359677879-a4bb92f829d1"
              className="w-full h-[450px] object-cover brightness-75 group-hover:scale-105 transition duration-500"
            />

            {/* Overlay */}
            <div className="absolute inset-0 bg-gradient-to-tr from-[#890b44]/40 to-transparent" />

            {/* Badge */}
            <div className="absolute top-4 left-4 bg-white px-4 py-2 rounded-lg shadow text-xs font-bold tracking-widest text-[#890b44] animate-fadeIn">
              ● Expert Support
            </div>

            <div className="absolute bottom-4 right-4 bg-white px-4 py-3 rounded-lg shadow">
              <p className="text-xs tracking-widest text-[#890b44]">Response</p>
              <p className="text-xl font-bold text-gray-800">Under 3 Hrs</p>
            </div>
          </div>
        </div>

        {/* RIGHT CONTENT */}
        <div
          ref={rightRef}
          className={`flex flex-col gap-6 transition-all duration-700 ${rightInView ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10"}`}
        >

          {/* Tag */}
          <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full border border-[#f5c2d2] bg-[#fdf2f5] text-[#890b44] text-xs tracking-widest font-bold w-fit">
            ● Premium TV Services
          </div>

          {/* Heading */}
          <h2 className="text-4xl md:text-5xl font-bold uppercase tracking-wide text-gray-900">
            Best{" "}
            <span className="text-[#890b44] relative">
              TV Services
              <span className="absolute left-0 -bottom-1 h-[3px] w-full bg-gradient-to-r from-[#890b44] to-pink-400 animate-pulse" />
            </span>
          </h2>

          {/* Description */}
          <p className="text-black text-lg leading-relaxed">
            Get expert TV repair and installation with fast turnaround and premium service quality.
          </p>

          {/* FEATURES */}
          <div className="flex flex-col gap-4">
            {features.map((f) => {
              const Icon = f.icon;
              const isHover = hover === f.id;

              return (
                <div
                  key={f.id}
                  onMouseEnter={() => setHover(f.id)}
                  onMouseLeave={() => setHover(null)}
                  className={`flex items-start gap-4 p-4 rounded-xl border transition-all duration-300 cursor-pointer
                  ${isHover
                      ? "bg-[#fdf2f5] border-[#f5c2d2] shadow-lg -translate-y-1"
                      : "bg-white border-gray-200"
                    }`}
                >
                  <div className={`p-3 rounded-lg transition ${isHover ? "bg-[#890b44]/10" : "bg-gray-100"}`}>
                    <Icon size={18} className={isHover ? "text-[#890b44]" : "text-gray-500"} />
                  </div>

                  <div className="flex-1">
                    <h3 className={`font-bold uppercase text-sm tracking-wide ${isHover ? "text-[#890b44]" : "text-gray-800"}`}>
                      {f.title}
                    </h3>
                    <p className="text-md text-black">{f.description}</p>
                  </div>

                  <ArrowUpRight
                    className={`transition-all ${isHover ? "opacity-100 translate-x-0 text-[#890b44]" : "opacity-0 translate-x-2"}`}
                    size={16}
                  />
                </div>
              );
            })}
          </div>

        </div>
      </div>
    </section>
  );
}