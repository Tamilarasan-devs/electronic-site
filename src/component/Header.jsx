import React, { useState, useEffect } from "react";
import { Menu, X, ChevronRight, Flame } from "lucide-react";

const Header = () => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeLink, setActiveLink] = useState("Home");

  const navLinks = ["Home", "About", "Service", "Brand", "Contact"];

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      
    >
     
      <div
       
      >

      <div className="relative bg-gradient-to-br  from-[#0a0000] via-[#1a0000] to-[#2d0000] border-b border-red-600/20 shadow-lg ">
        {/* Corner Accent */}
        <div className="absolute top-0 right-0 w-20 h-20 pointer-events-none">
          <div className="w-0 h-0 border-t-0 border-r-[80px] border-b-[80px] border-l-0 border-t-transparent border-r-red-600/6 border-b-transparent border-l-transparent"></div>
        </div>

        <div className="max-w-7xl mx-auto px-8 h-20 flex items-center justify-between relative">
          {/* Logo */}
          <div className="flex items-center gap-3 cursor-pointer">
            <div className="w-9 h-9 bg-gradient-to-br from-red-600 to-red-900 rounded-lg flex items-center justify-center shadow-lg transition-transform duration-300 hover:rotate-[-8deg] hover:scale-105 hover:shadow-xl">
              <Flame size={18} color="#fff" strokeWidth={1.5} />
            </div>
            <div>
              <div className="font-serif text-2xl font-bold text-white leading-none">
                Your<span className="text-red-500">Brand</span>
              </div>
              <span className="block text-xs font-light tracking-widest text-red-600/70 uppercase">
                Premium · Est. 2024
              </span>
            </div>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-0">
            <ul className="flex list-none">
              {navLinks.map((link, idx) => (
                <li key={link} className="relative">
                  <a
                    href={`${link.toLowerCase()}`}
                    className={`block px-4 py-2 text-xs font-normal tracking-widest uppercase transition-colors ${
                      activeLink === link
                        ? "text-red-500 after:w-[70%]"
                        : "text-white/70 hover:text-white after:w-0"
                    } relative after:absolute after:bottom-0 after:left-1/2 after:h-[1px] after:bg-gradient-to-r after:from-transparent after:via-red-500 after:to-transparent after:transition-all after:duration-400 after:ease-in-out`}
                    onClick={() => setActiveLink(link)}
                  >
                    {link}
                  </a>

                  {/* Separator */}
                  {idx !== navLinks.length - 1 && (
                    <span className="absolute right-0 top-1/2 h-2/5 w-px bg-red-600/20 transform -translate-y-1/2"></span>
                  )}
                </li>
              ))}
            </ul>
          </nav>

          {/* CTA */}
          <button className="hidden md:flex items-center gap-2 px-6 py-2 border border-red-600/50 rounded text-xs font-medium uppercase tracking-wider text-white overflow-hidden relative group">
            <span className="relative z-10">Get Quote</span>
            <ChevronRight size={14} className="relative z-10" />
            <span className="absolute inset-0 bg-gradient-to-br from-red-600 to-red-900 -translate-x-full group-hover:translate-x-0 transition-transform duration-400"></span>
          </button>

          {/* Mobile Toggle */}
          <button
            className="md:hidden flex items-center justify-center border border-red-600/30 rounded p-1.5 text-red-500 hover:bg-red-600/10"
            onClick={() => setOpen(!open)}
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {/* Glow line */}
        <div className="h-[1px] bg-gradient-to-r from-transparent via-red-600/60 to-transparent animate-pulse" />

        {/* Mobile Menu */}
        <div
          className={`md:hidden overflow-hidden transition-max-h duration-500 ${
            open ? "max-h-[400px]" : "max-h-0"
          }`}
        >
          <nav className="flex flex-col p-6 gap-0 bg-gradient-to-b from-[#0f0000] to-[#1a0000] border-t border-red-600/15">
            {navLinks.map((link) => (
              <a
                key={link}
                href={`${link.toLowerCase()}`}
                className="flex justify-between items-center py-4 text-sm font-normal uppercase tracking-widest text-white/60 hover:text-red-500 border-b border-red-600/10 last:border-b-0"
                onClick={() => setOpen(false)}
              >
                {link}
                <ChevronRight size={14} className="text-red-600/40" />
              </a>
            ))}
            <button
              className="mt-4 py-3 w-full bg-gradient-to-br from-red-600 to-red-900 rounded text-white text-sm font-medium uppercase tracking-wider shadow-lg hover:shadow-2xl hover:-translate-y-0.5 transition-all"
              onClick={() => setOpen(false)}
            >
              Get Quote
            </button>
          </nav>
        </div>
      </div>
      </div>
    </header>
  );
};

export default Header;