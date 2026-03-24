import { useEffect, useRef, useState } from "react";
import {
  Facebook, Twitter, Instagram, Youtube,
  Phone, MapPin, Mail, Tv2, ArrowUpRight,
  ChevronRight, Zap, Clock
} from "lucide-react";

const quickLinks = ["Home", "About Us", "Services", "Brands", "Reviews", "Contact"];
const services = ["Panel Repair", "PCB Repair", "Spare Parts", "Home Service", "Free Diagnosis"];
const brands = ["Samsung", "LG", "Sony", "Philips", "Panasonic", "MI", "OnePlus", "TCL"];

const brandColors = [
  "hover:text-rose-300 hover:border-rose-300/50 hover:bg-rose-300/10",
  "hover:text-pink-300 hover:border-pink-300/50 hover:bg-pink-300/10",
  "hover:text-fuchsia-300 hover:border-fuchsia-300/50 hover:bg-fuchsia-300/10",
  "hover:text-red-300 hover:border-red-300/50 hover:bg-red-300/10",
  "hover:text-amber-300 hover:border-amber-300/50 hover:bg-amber-300/10",
  "hover:text-orange-300 hover:border-orange-300/50 hover:bg-orange-300/10",
  "hover:text-yellow-300 hover:border-yellow-300/50 hover:bg-yellow-300/10",
  "hover:text-purple-300 hover:border-purple-300/50 hover:bg-purple-300/10",
];

const socials = [
  { Icon: Facebook,  hover: "hover:text-blue-300 hover:bg-blue-300/10" },
  { Icon: Twitter,   hover: "hover:text-cyan-300 hover:bg-cyan-300/10" },
  { Icon: Instagram, hover: "hover:text-pink-300 hover:bg-pink-300/10" },
  { Icon: Youtube,   hover: "hover:text-red-300 hover:bg-red-300/10" },
];

const contactItems = [
  { Icon: Phone,  text: "+91 9514698694 / 9361888173", color: "text-pink-300" },
  { Icon: Mail,   text: "kjelectronicsled@gmail.com",  color: "text-rose-300" },
  { Icon: MapPin, text: "32/7 Nethaji Road, PN Pudur, Coimbatore 641041", color: "text-fuchsia-300" },
  { Icon: Clock,  text: "Mon–Fri 9:30 AM–10:00 PM · Sat 9:30 AM–5:00 PM", color: "text-orange-300" },
];

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

function SectionHeading({ children }) {
  return (
    <div className="flex items-center gap-2 mb-4">
      <span className="w-2 h-2 bg-pink-400 rounded-full animate-pulse" />
      <h3 className="text-white text-xs tracking-widest uppercase font-bold">
        {children}
      </h3>
    </div>
  );
}

function LinkItem({ label }) {
  return (
    <li className="flex items-center gap-2 py-1.5 group cursor-pointer">
      <ChevronRight className="text-pink-300 group-hover:translate-x-1 transition" size={16}/>
      <span className="text-white/80 text-sm group-hover:text-white">
        {label}
      </span>
    </li>
  );
}

export default function Footer() {
  const [ref, inView] = useInView();

  return (
    <footer className="bg-[#890b44] text-white relative overflow-hidden">

      {/* subtle glow */}
      <div className="absolute inset-0 bg-gradient-to-br from-pink-500/10 via-transparent to-purple-500/10 pointer-events-none" />

      <div
        ref={ref}
        className="max-w-6xl mx-auto px-5 py-14 grid gap-10
        sm:grid-cols-2 lg:grid-cols-4"
      >

        {/* Brand */}
        <div>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-pink-400/20 rounded-xl flex items-center justify-center">
              <Tv2 className="text-pink-300" size={20}/>
            </div>
            <div>
              <h2 className="font-bold text-lg tracking-wide">KJ Electronics</h2>
              <p className="text-xs text-pink-200">Coimbatore</p>
            </div>
          </div>

          <p className="text-sm text-white/80 mb-5">
            Trusted LED & LCD TV repair experts with fast service and genuine parts.
          </p>

          <div className="space-y-3">
            {contactItems.map(({ Icon, text, color }) => (
              <div key={text} className="flex gap-2 items-start">
                <Icon size={14} className={color}/>
                <span className="text-xs text-white/80">{text}</span>
              </div>
            ))}
          </div>

          <div className="flex gap-3 mt-5">
            {socials.map(({ Icon, hover }, i) => (
              <div key={i} className={`p-2 border border-white/20 rounded-lg ${hover}`}>
                <Icon size={16}/>
              </div>
            ))}
          </div>
        </div>

        {/* Links */}
        <div>
          <SectionHeading>Quick Links</SectionHeading>
          <ul>
            {quickLinks.map(l => <LinkItem key={l} label={l}/>)}
          </ul>
        </div>

        {/* Services */}
        <div>
          <SectionHeading>Services</SectionHeading>
          <ul>
            {services.map(s => <LinkItem key={s} label={s}/>)}
          </ul>
        </div>

        {/* Brands + CTA */}
        <div>
          <SectionHeading>Brands</SectionHeading>

          <div className="flex flex-wrap gap-2 mb-5">
            {brands.map((b, i) => (
              <span key={b}
                className={`text-xs px-3 py-1 rounded-full border border-white/20 text-white/70 ${brandColors[i]}`}>
                {b}
              </span>
            ))}
          </div>

          <div className="bg-pink-500/10 border border-pink-400/20 p-4 rounded-xl">
            <div className="flex items-center gap-2 text-pink-300 text-xs mb-2 uppercase tracking-widest">
              <Zap size={12}/> Free Diagnosis
            </div>

            <p className="text-xs text-white/70 mb-3">
              Get your TV checked before repair — completely free.
            </p>

            <button className="bg-pink-500 hover:bg-pink-600 px-4 py-2 rounded-full text-xs flex items-center gap-1">
              Book Repair <ArrowUpRight size={12}/>
            </button>
          </div>
        </div>
      </div>

      {/* Bottom */}
      <div className="border-t border-white/10 py-5 text-center text-xs text-white/50">
        © 2026 KJ Electronics · Coimbatore
      </div>
    </footer>
  );
}