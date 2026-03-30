import React, { useEffect, useRef, useState } from "react";
import { ShieldCheck, Wrench, Handshake, Clock, Package, Star, ArrowRight, CheckCircle2, Zap, MapPin } from "lucide-react";

const features = [
  {
    id: 1,
    icon: ShieldCheck,
    tag: "Guaranteed",
    title: "100% Quality Service",
    description:
      "We take pride in providing 100% quality assured service for all your smart TV needs. Our skilled technicians are dedicated to ensuring your TV is repaired to the highest standards — every single time.",
    stat: "100%",
    statLabel: "Satisfaction Rate",
    gradient: "from-rose-950 to-[#890b44]",
    border: "border-rose-800/40",
    glow: "shadow-rose-900/30",
    accent: "#f43f5e",
  },
  {
    id: 2,
    icon: Wrench,
    tag: "Expert Team",
    title: "Highly Skilled Technicians",
    description:
      "Our highly skilled technicians have years of experience repairing all smart TV brands. Trust our team to diagnose and fix any issue quickly, efficiently, and with precision.",
    stat: "10+",
    statLabel: "Years of Expertise",
    gradient: "from-slate-900 to-slate-800",
    border: "border-slate-700/40",
    glow: "shadow-slate-900/30",
    accent: "#94a3b8",
  },
  {
    id: 3,
    icon: Handshake,
    tag: "Reliable",
    title: "Your Trusted Service Partner",
    description:
      "We are committed to being your trusted service partner — providing reliable smart TV repair services with professionalism, transparency, and genuine care for every customer.",
    stat: "50K+",
    statLabel: "Happy Customers",
    gradient: "from-[#890b44] to-rose-800",
    border: "border-rose-800/40",
    glow: "shadow-rose-900/30",
    accent: "#fb7185",
  },
];

const trustItems = [
  { icon: Clock,   label: "Same-Day Service",     sub: "Repairs completed within 3 hours",  accent: "#890b44" },
  { icon: Package, label: "Original Spare Parts",  sub: "Genuine components, zero counterfeits", accent: "#890b44" },
  { icon: Star,    label: "Warranty on Repairs",   sub: "Peace of mind, guaranteed",         accent: "#890b44" },
];

const benefits = [
  "Experienced and certified technicians",
  "Fast and accurate problem diagnosis",
  "Affordable and transparent pricing",
  "Doorstep service available citywide",
  "Genuine and quality spare parts only",
  "Quick turnaround — same or next day",
  "Friendly, professional customer support",
];

const steps = [
  { num: "01", title: "Book Your Service",     desc: "Contact us and schedule your preferred time slot." },
  { num: "02", title: "Technician Visits",     desc: "Our expert arrives at your doorstep on time." },
  { num: "03", title: "Diagnosis & Estimate",  desc: "Issue is diagnosed and a transparent quote provided." },
  { num: "04", title: "Repair & Quality Check",desc: "Work begins after approval. Tested before handover." },
];

function useInView(threshold = 0.12) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setInView(true); },
      { threshold }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return [ref, inView];
}

function AnimatedCounter({ target, inView, delay = 0 }) {
  const [display, setDisplay] = useState("0");
  useEffect(() => {
    if (!inView) return;
    const numPart = parseInt(target);
    if (isNaN(numPart)) { setTimeout(() => setDisplay(target), delay); return; }
    const suffix = target.replace(/[0-9]/g, "");
    let start = 0;
    const t = setTimeout(() => {
      const step = Math.ceil(numPart / (1400 / 16));
      const timer = setInterval(() => {
        start += step;
        if (start >= numPart) { setDisplay(`${numPart}${suffix}`); clearInterval(timer); }
        else setDisplay(`${start}${suffix}`);
      }, 16);
    }, delay);
    return () => clearTimeout(t);
  }, [inView]);
  return <span>{display}</span>;
}

export default function WhyChoose() {
  const [headerRef, headerInView] = useInView(0.2);
  const [cardsRef,  cardsInView]  = useInView(0.08);
  const [trustRef,  trustInView]  = useInView(0.15);
  const [whyRef,    whyInView]    = useInView(0.1);
  const [stepsRef,  stepsInView]  = useInView(0.1);

  return (
    <section
      className="w-full bg-[#fafafa] py-28 px-5 lg:px-16 overflow-hidden"
      
    >
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div
          className="absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full opacity-[0.04]"
          style={{ background: "radial-gradient(circle, #890b44 0%, transparent 70%)" }}
        />
        <div
          className="absolute -bottom-60 -left-40 w-[700px] h-[700px] rounded-full opacity-[0.03]"
          style={{ background: "radial-gradient(circle, #890b44 0%, transparent 70%)" }}
        />
      </div>

      <div className="max-w-6xl mx-auto relative">

        {/* ── HEADER ── */}
        <div
          ref={headerRef}
          className={`mb-20 transition-all duration-700 ease-out ${
            headerInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <div className="flex items-center gap-3 mb-5">
            <span className="h-px w-10 bg-[#890b44]" />
            <span
              className="text-[14px] font-bold uppercase tracking-[0.3em] text-[#890b44]"
              style={{ letterSpacing: "0.28em" }}
            >
              Why Choose Us
            </span>
          </div>

          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
            <h2
              className="text-4xl lg:text-[3.25rem] font-black text-gray-950 leading-[1.1] tracking-tight max-w-2xl"
              style={{ fontFamily: "'DM Serif Display', Georgia, serif" }}
            >
              Expert care for every{" "}
              <em className="not-italic text-[#890b44]">screen.</em>
            </h2>
            <p className="text-gray-500 text-lg leading-relaxed max-w-sm lg:text-right">
              Coimbatore's most trusted smart TV repair service — fast, reliable, and right at your doorstep.
            </p>
          </div>
        </div>

        {/* ── FEATURE CARDS ── */}
        <div
          ref={cardsRef}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 mb-6"
        >
          {features.map((item, i) => {
            const Icon = item.icon;
            return (
              <div
                key={item.id}
                className={`group relative overflow-hidden rounded-3xl bg-gradient-to-br ${item.gradient}
                  p-8 flex flex-col gap-6 shadow-2xl ${item.glow}
                  transition-all duration-500 hover:-translate-y-2 hover:shadow-3xl
                  ${cardsInView
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-12"
                  }`}
                style={{ transitionDelay: `${i * 100}ms` }}
              >
                {/* Subtle inner glow */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl"
                  style={{
                    background: `radial-gradient(ellipse at 30% 20%, rgba(255,255,255,0.06) 0%, transparent 65%)`,
                  }}
                />
                {/* Top row */}
                <div className="flex items-center justify-between relative z-10">
                  <div className="w-12 h-12 flex items-center justify-center rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20 text-white group-hover:scale-110 transition-transform duration-300">
                    <Icon size={21} strokeWidth={1.8} />
                  </div>
                  <span className="text-[9px] tracking-[0.22em] uppercase px-3 py-1.5 rounded-full bg-white/10 border border-white/20 text-white/80 font-semibold backdrop-blur-sm">
                    {item.tag}
                  </span>
                </div>

                {/* Title & desc */}
                <div className="relative z-10 flex-1">
                  <h3 className="text-xl font-bold text-white mb-3 leading-tight">{item.title}</h3>
                  <p className="text-lg text-white leading-relaxed">{item.description}</p>
                </div>

                {/* Stat */}
                <div className="relative z-10 pt-5 border-t border-white/10">
                  <p className="text-5xl font-black text-white tracking-tight leading-none">
                    <AnimatedCounter target={item.stat} inView={cardsInView} delay={i * 150 + 300} />
                  </p>
                  <p className="text-[10px] uppercase tracking-[0.18em] text-white mt-2 font-medium">
                    {item.statLabel}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* ── TRUST STRIP ── */}
        <div
          ref={trustRef}
          className="grid md:grid-cols-3 gap-4 mb-20"
        >
          {trustItems.map((item, i) => {
            const Icon = item.icon;
            return (
              <div
                key={item.label}
                className={`flex items-center gap-4 p-5 rounded-2xl border border-gray-200/80
                  bg-white shadow-sm hover:shadow-md hover:border-[#890b44]/20
                  transition-all duration-300 group
                  ${trustInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
                style={{ transitionDelay: `${i * 80}ms` }}
              >
                <div className="w-11 h-11 flex items-center justify-center rounded-xl bg-[#fff0f5] border border-[#ffd6e7] text-[#890b44] flex-shrink-0 group-hover:scale-110 transition-transform">
                  <Icon size={19} strokeWidth={1.8} />
                </div>
                <div>
                  <p className="font-bold text-gray-900 text-lg">{item.label}</p>
                  <p className="text-md text-gray-800 mt-0.5 leading-snug">{item.sub}</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* ── WHY CHOOSE + PROCESS ── */}
        <div
          ref={whyRef}
          className={`grid lg:grid-cols-2 gap-8 mb-8 transition-all duration-700 ${
            whyInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          {/* Key Benefits */}
          <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-8 hover:shadow-md transition-shadow">
            <div className="flex items-center gap-3 mb-2">
              <Zap size={18} className="text-[#890b44]" strokeWidth={1.8} />
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#890b44]">Benefits</span>
            </div>
            <h3
              className="text-2xl font-black text-gray-950 mb-6 leading-tight tracking-tight"
              style={{ fontFamily: "'DM Serif Display', Georgia, serif" }}
            >
              Why KJ LED Electronic<br />
              <span className="text-[#890b44]">TV Services?</span>
            </h3>
            <ul className="space-y-3">
              {benefits.map((b, i) => (
                <li key={i} className="flex items-center gap-3 text-md text-gray-800">
                  <CheckCircle2 size={15} className="text-[#890b44] flex-shrink-0" strokeWidth={2} />
                  {b}
                </li>
              ))}
            </ul>
          </div>

          {/* Doorstep + Fast cards stacked */}
          <div className="flex flex-col gap-5">
            <div className="flex-1 bg-[#890b44] rounded-3xl p-8 text-white relative overflow-hidden">
              <div
                className="absolute -bottom-8 -right-8 w-40 h-40 rounded-full opacity-10"
                style={{ background: "white" }}
              />
              <div className="flex items-center gap-3 mb-4">
                <MapPin size={18} className="text-rose-300" strokeWidth={1.8} />
                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-rose-300">
                  Doorstep Service
                </span>
              </div>
              <h3
                className="text-xl font-black mb-3 leading-tight"
                style={{ fontFamily: "'DM Serif Display', Georgia, serif" }}
              >
                We Come to You
              </h3>
              <p className="text-md text-white leading-relaxed">
                No need to carry your TV anywhere. Our technicians visit your location, inspect the issue, and perform the repair right at your home — easy, quick, and stress-free.
              </p>
            </div>

            <div className="flex-1 bg-gray-950 rounded-3xl p-8 text-white relative overflow-hidden">
              <div
                className="absolute -bottom-8 -right-8 w-40 h-40 rounded-full opacity-5"
                style={{ background: "#890b44" }}
              />
              <div className="flex items-center gap-3 mb-4">
                <Zap size={18} className="text-rose-400" strokeWidth={1.8} />
                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-rose-400">
                  Fast & Reliable
                </span>
              </div>
              <h3
                className="text-xl font-black mb-3 leading-tight"
                style={{ fontFamily: "'DM Serif Display', Georgia, serif" }}
              >
                Same-Day Solutions
              </h3>
              <p className="text-md text-white leading-relaxed">
                We value your time. Most repairs are completed same-day or next-day. Our focus is not just quick fixes — but long-lasting solutions that endure.
              </p>
            </div>
          </div>
        </div>

        {/* ── SERVICE PROCESS ── */}
        <div
          ref={stepsRef}
          className={`bg-white rounded-3xl border border-gray-100 shadow-sm p-8 lg:p-12 transition-all duration-700 ${
            stepsInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <div className="flex items-center gap-3 mb-2">
            <span className="h-px w-8 bg-[#890b44]" />
            <span className="text-[15px] font-bold uppercase tracking-[0.25em] text-[#890b44]">How It Works</span>
          </div>
          <h3
            className="text-2xl font-black text-gray-950 mb-10 leading-tight tracking-tight"
            style={{ fontFamily: "'DM Serif Display', Georgia, serif" }}
          >
            Our Service Process
          </h3>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 relative">
            {/* connector line desktop */}
            <div className="hidden lg:block absolute top-8 left-[12.5%] right-[12.5%] h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent" />

            {steps.map((step, i) => (
              <div
                key={step.num}
                className={`relative flex flex-col gap-4 transition-all duration-500 ${
                  stepsInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
                }`}
                style={{ transitionDelay: `${i * 110}ms` }}
              >
                <div className="w-14 h-14 rounded-2xl bg-[#fff0f5] border-2 border-[#ffd6e7] flex items-center justify-center flex-shrink-0 relative z-10">
                  <span
                    className="text-xl font-black text-[#890b44]"
                    style={{ fontFamily: "'DM Serif Display', Georgia, serif" }}
                  >
                    {step.num}
                  </span>
                </div>
                <div>
                  <p className="font-bold text-gray-900 text-lg mb-1">{step.title}</p>
                  <p className="text-md text-gray-700 leading-relaxed">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}