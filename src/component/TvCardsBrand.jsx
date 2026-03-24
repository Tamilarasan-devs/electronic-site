import React, { useEffect, useRef, useState } from "react";
import { Phone, CalendarCheck, ArrowUpRight, Tv2 } from "lucide-react";

/* DATA */
const tvBrands = [
  { name: "Samsung", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b4/Samsung_wordmark.svg/250px-Samsung_wordmark.svg.png" },
  { name: "LG", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8d/LG_logo_%282014%29.svg/250px-LG_logo_%282014%29.svg.png" },
  { name: "Sony", img: "https://upload.wikimedia.org/wikipedia/commons/c/ca/Sony_logo.svg" },
  { name: "Philips", img: "https://1000logos.net/wp-content/uploads/2017/05/Phillips-Logo-2008-500x281.png" },
  { name: "Panasonic", img: "https://brandlogos.net/wp-content/uploads/2015/03/panasonic-logo_brandlogos.net_wmewy-512x512.png" },
  { name: "MI", img: "https://upload.wikimedia.org/wikipedia/commons/a/ae/Xiaomi_logo_%282021-%29.svg" },
  { name: "OnePlus", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f8/OP_LU_Reg_1L_RGB_red_copy-01.svg/250px-OP_LU_Reg_1L_RGB_red_copy-01.svg.png" },
  { name: "TCL", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Logo_of_the_TCL_Corporation.svg/250px-Logo_of_the_TCL_Corporation.svg.png" },
  { name: "Motorola", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/13/Motorola-Logo.svg/250px-Motorola-Logo.svg.png" },
  { name: "Kodak", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/84/Eastman_Kodak_Company_logo_%282016%29.svg/250px-Eastman_Kodak_Company_logo_%282016%29.svg.png" },
  { name: "Toshiba", img: "https://logodownload.org/wp-content/uploads/2014/09/toshiba-logo-0.png" },
  { name: "Hisense", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/47/Hisense.svg/250px-Hisense.svg.png" },
  { name: "Realme", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e6/Realme_logo_SVG.svg/250px-Realme_logo_SVG.svg.png" },
  { name: "Onida", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0a/Onida_Electronics.svg/250px-Onida_Electronics.svg.png" },
  { name: "Acer", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8e/Acer_Group_2012.svg/250px-Acer_Group_2012.svg.png" },
  { name: "Thomson", img: "https://images.seeklogo.com/logo-png/13/2/thomson-logo-png_seeklogo-139611.png" },
  { name: "Croma", img: "https://upload.wikimedia.org/wikipedia/commons/9/9b/Croma_%28store%29_logo.gif" },
  { name: "Coocaa", img: "https://cdn.brandfetch.io/id7olhQXS_/theme/dark/logo.svg?c=1bxid64Mup7aczewSAYMX" },
];

const ROW1 = tvBrands.slice(0, 6);
const ROW2 = tvBrands.slice(6, 12);
const ROW3 = tvBrands.slice(12);

/* HOOK */
function useInView(threshold = 0.1) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) setInView(true);
    }, { threshold });

    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return [ref, inView];
}

/* BRAND CARD */
function BrandCard({ brand }) {
  return (
    <div className="w-24 sm:w-28 md:w-32 lg:w-36 flex-shrink-0 bg-white border border-gray-200 rounded-xl p-3 md:p-4 flex flex-col items-center gap-2 md:gap-3 transition hover:shadow-lg hover:-translate-y-1">
      
      <div className="w-12 h-12 md:w-14 md:h-14 flex items-center justify-center bg-gray-50 rounded-lg">
        <img
          src={brand.img}
          alt={brand.name}
          className="w-8 h-8 md:w-10 md:h-10 object-contain"
        />
      </div>

      <p className="text-[10px] sm:text-xs font-semibold tracking-wide text-[#890b44] text-center uppercase">
        {brand.name}
      </p>
    </div>
  );
}

/* MARQUEE ROW */
function MarqueeRow({ brands, direction = "left" }) {
  const loop = [...brands, ...brands];

  return (
    <div className="overflow-hidden w-full">
      <div
        className={`flex gap-4 w-max ${
          direction === "left"
            ? "animate-marquee-left"
            : "animate-marquee-right"
        }`}
      >
        {loop.map((b, i) => (
          <BrandCard key={i} brand={b} />
        ))}
      </div>
    </div>
  );
}

/* MAIN COMPONENT */
export default function TVBrandCards() {
  const [ref, inView] = useInView();

  return (
    <section className="bg-gray-50 py-20 px-4 overflow-hidden">
      <div className="max-w-6xl mx-auto text-center">

        {/* HEADER */}
        <div
          ref={ref}
          className={`transition duration-700 ${
            inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <div className="inline-flex items-center gap-2 px-4 py-1 border border-[#890b44] bg-blue-50 rounded-full mb-5">
            <span className="w-2 h-2 bg-blue-500 rounded-full animate-ping" />
            <span className="text-xs font-semibold tracking-widest text-[#890b44] uppercase">
              All Major Brands
            </span>
          </div>

          <h2 className="text-3xl md:text-5xl font-bold text-gray-900 uppercase">
            Popular <span className="text-[#890b44]">TV Brands</span>
          </h2>

          <p className="text-lg text-gray-700 mt-3 uppercase">
            We service all leading television brands
          </p>

          <div className="w-24 h-[2px] bg-[#890b44] mx-auto mt-5 rounded-full" />

          <div className="mt-6 inline-flex items-center gap-2 px-5 py-2 bg-white border rounded-full shadow-sm">
            <Tv2 size={16} className="text-[#890b44]" />
            <span className="text-xs font-semibold uppercase">
              {tvBrands.length}+ Brands
            </span>
          </div>
        </div>

        {/* MARQUEE */}
        <div className="mt-12 space-y-6">
          <MarqueeRow brands={ROW1} direction="left" />
          <MarqueeRow brands={ROW2} direction="right" />
          <MarqueeRow brands={ROW3} direction="left" />
        </div>

        {/* CTA */}
        <div className="mt-16 bg-white border rounded-2xl p-6 md:p-10 flex flex-col md:flex-row items-center justify-between gap-6 shadow-sm">
          <div className="text-center md:text-left">
            <h3 className="text-xl md:text-2xl font-semibold">
              Don’t see your brand listed?
            </h3>
            <p className="text-gray-600 mt-2">
              Call us to confirm instantly.
            </p>
          </div>

          <div className="flex gap-3">
            <button className="flex items-center gap-2 px-5 py-3 rounded-full bg-[#890b44] text-white text-xs font-semibold uppercase">
              <CalendarCheck size={14} />
              Book Repair
            </button>

            <button className="flex items-center gap-2 px-5 py-3 rounded-full border text-xs font-semibold uppercase hover:bg-[#890b44] hover:text-white transition">
              <Phone size={14} />
              Call Us
              <ArrowUpRight size={14} />
            </button>
          </div>
        </div>
      </div>

      {/* ANIMATION */}
      <style>{`
        @keyframes marquee-left {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }

        @keyframes marquee-right {
          0% { transform: translateX(-50%); }
          100% { transform: translateX(0); }
        }

        .animate-marquee-left {
          animation: marquee-left 20s linear infinite;
        }

        .animate-marquee-right {
          animation: marquee-right 20s linear infinite;
        }

        @media (max-width: 768px) {
          .animate-marquee-left,
          .animate-marquee-right {
            animation-duration: 12s;
          }
        }
      `}</style>
    </section>
  );
}