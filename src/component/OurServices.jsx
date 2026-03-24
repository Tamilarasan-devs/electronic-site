import React from "react";
import { Import, Tv } from "lucide-react";
import uv from '../assets/images/VuTv_logo.avif'
import bg from '../assets/images/electric.webp'
const services = [
  {
    name: "Samsung LED TV Service in Coimbatore",
    img: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b4/Samsung_wordmark.svg/250px-Samsung_wordmark.svg.png",
  },
  {
    name: "VU TV Service in Coimbatore",
    img: uv,
  },
  {
    name: "ONIDA LED TV Service in Coimbatore",
    img: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0a/Onida_Electronics.svg/250px-Onida_Electronics.svg.png",
  },
  {
    name: "Acer LED TV Service in Coimbatore",
    img: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8e/Acer_Group_2012.svg/250px-Acer_Group_2012.svg.png",
  },
  {
    name: "Motorola LED TV Service in Coimbatore",
    img: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/13/Motorola-Logo.svg/250px-Motorola-Logo.svg.png",
  },
  {
    name: "Sony LED TV Service in Coimbatore",
    img: "https://upload.wikimedia.org/wikipedia/commons/c/ca/Sony_logo.svg",
  },
  {
    name: "PHILIPS TV Service in Coimbatore",
    img: "https://1000logos.net/wp-content/uploads/2017/05/Phillips-Logo-2008-500x281.png",
  },
  {
    name: "REALME LED TV Service in Coimbatore",
    img: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e6/Realme_logo_SVG.svg/250px-Realme_logo_SVG.svg.png",
  },
  {
    name: "Blaupunkt LED TV Service in Coimbatore",
    img: "https://1000logos.net/wp-content/uploads/2021/05/Blaupunkt-logo-500x281.png",
  },
  {
    name: "LG LED TV Service in Coimbatore",
    img: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8d/LG_logo_%282014%29.svg/250px-LG_logo_%282014%29.svg.png",
  },
  {
    name: "PANASONIC LED TV Service in Coimbatore",
    img: "https://brandlogos.net/wp-content/uploads/2015/03/panasonic-logo_brandlogos.net_wmewy-512x512.png",
  },
  {
    name: "TCL LED TV Service in Coimbatore",
    img: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Logo_of_the_TCL_Corporation.svg/250px-Logo_of_the_TCL_Corporation.svg.png",
  },
  {
    name: "Croma LED TV Service in Coimbatore",
    img: "https://upload.wikimedia.org/wikipedia/commons/9/9b/Croma_%28store%29_logo.gif",
  },
  {
    name: "MI LED TV Service in Coimbatore",
    img: "https://upload.wikimedia.org/wikipedia/commons/a/ae/Xiaomi_logo_%282021-%29.svg",
  },
  {
    name: "ONEPLUS LED TV Service in Coimbatore",
    img: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f8/OP_LU_Reg_1L_RGB_red_copy-01.svg/250px-OP_LU_Reg_1L_RGB_red_copy-01.svg.png",
  },
  {
    name: "KODAK LED TV Service in Coimbatore",
    img: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/84/Eastman_Kodak_Company_logo_%282016%29.svg/250px-Eastman_Kodak_Company_logo_%282016%29.svg.png",
  },
  {
    name: "THOMSON LED TV Service in Coimbatore",
    img: "https://images.seeklogo.com/logo-png/13/2/thomson-logo-png_seeklogo-139611.png",
  },
  {
    name: "COOCAA LED TV Service in Coimbatore",
    img: "https://images.seeklogo.com/logo-png/39/1/coocaa-logo-png_seeklogo-390086.png",
  },
  {
    name: "Hisense LED TV Service in Coimbatore",
    img: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/47/Hisense.svg/250px-Hisense.svg.png",
  },
];



export default function OurServices() {
  return (
    <section className="w-full  py-24 px-6 md:px-12 relative overflow-hidden">

  {/* Background Image */}
 <div className="absolute inset-0 -z-10">
  <div
    className="w-full h-full bg-cover bg-center bg-no-repeat"
    style={{
      backgroundImage: `url(${bg})`,
      backgroundAttachment: "fixed",
    }}
  />
  <div className="absolute inset-0 bg-black/40" /> {/* overlay */}
</div>

  {/* Dot pattern */}
  <div
    // className="absolute inset-0 pointer-events-none opacity-[0.35]"
    style={{
      backgroundImage: "radial-gradient(circle, #c7d4e8 1px, transparent 1px)",
      backgroundSize: "28px 28px",
    }}
  />

      {/* Hairlines */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[1px]"
        style={{ background: "linear-gradient(90deg, transparent, rgba(42,71,113,0.2), transparent)" }} />
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[900px] h-[1px]"
        style={{ background: "linear-gradient(90deg, transparent, rgba(42,71,113,0.2), transparent)" }} />

      {/* Soft bg glows */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[300px] rounded-full blur-[120px] pointer-events-none opacity-20 bg-[#eef2f8]" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[300px] rounded-full blur-[100px] pointer-events-none opacity-15 bg-[#eef2f8]" />
      <div className="absolute bottom-0 right-0 w-[400px] h-[300px] rounded-full blur-[100px] pointer-events-none opacity-15 bg-[#eef2f8]" />

      <div className="relative max-w-7xl mx-auto">

        {/* ── HEADER ── */}
        <div className="text-center mb-16 flex flex-col items-center gap-4">

          {/* Eyebrow chip */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#c5d3e8] bg-[#eef2f8]">
            <span className="w-1.5 h-1.5 rounded-full animate-pulse bg-[#2a4771]" />
            <p className="text-[16px] font-bold tracking-[4px] uppercase text-[#890b44]">What We Fix</p>
          </div>

          {/* Main heading */}
          <h2
            className="text-5xl md:text-7xl text-white uppercase leading-none tracking-widest"
            
          >
            Our{" "}
            <span className="relative text-[#890b44]">
              Services
              <span className="absolute -bottom-2 left-0 right-0 h-[3px] rounded-full bg-gradient-to-r from-[#890b44] to-[#890b44]" />
            </span>
          </h2>

          {/* Tagline row */}
          <div className="flex items-center gap-3 mt-1">
            <span className="w-8 h-[2px] rounded-full bg-[#890b44]" />
            <p className="text-white text-lg font-bold tracking-[3px] uppercase italic">
              Professional LED TV Repair for All Major Brands
            </p>
            <span className="w-8 h-[2px] rounded-full bg-[#890b44]" />
          </div>

          {/* Count badge */}
          <div className="mt-2 px-5 py-2 rounded-full border border-[#c5d3e8] bg-[#eef2f8] flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#890b44] animate-pulse" />
            <span className="text-[#890b44] text-[14px] tracking-[2px] uppercase font-semibold">
              {services.length} Brands Covered
            </span>
          </div>
        </div>

        {/* ── SERVICES GRID ── */}
        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
  {services.map((service, index) => (
    <div
      key={index}
      className="bg-white border border-gray-200 rounded-xl p-6 text-center shadow-sm"
    >
      {/* Service Name */}
      <h3 className="text-md font-semibold text-[#890b44] leading-snug">
        {service.name}
      </h3>

      {/* Brand Logo */}
      {service.img && (
  <div className="mt-4 flex justify-center">
    <div className="w-24 h-24 bg-gray-50 rounded-lg flex items-center justify-center">
      <img
        src={service.img}
        alt={service.name}
        className="max-w-[80%] max-h-[80%] object-contain"
      />
    </div>
  </div>
)}
    </div>
  ))}
</div>

        {/* ── BOTTOM CTA STRIP ── */}
        <div className="mt-16 rounded-2xl px-8 py-7 flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden shadow-sm
          bg-[#f7f9fc] border border-[#e2e8f2]">

          {/* Left accent bar */}
          <div className="absolute left-0 top-0 bottom-0 w-1 rounded-l-2xl bg-gradient-to-b from-[#2a4771] to-[#3d5f96]" />

          {/* Soft bg wash */}
          <div className="absolute inset-0 pointer-events-none bg-gradient-to-r from-[#eef2f8]/60 via-transparent to-[#eef2f8]/60" />

          <div className="relative flex flex-col gap-1 text-center md:text-left pl-4">
            <p className="text-gray-900 text-lg font-bold tracking-wide">
              Don't see your brand?
            </p>
            <p className="text-gray-600 text-md">
              We service many more brands — call us and we'll help you out.
            </p>
          </div>

          <div className="relative flex items-center gap-4 shrink-0">
            <button className="px-7 py-3 text-white text-xs font-bold tracking-[3px] uppercase rounded-full transition-all duration-300
              bg-[#890b44] shadow-[0_8px_28px_rgba(42,71,113,0.30)]
              hover:bg-[#3d5f96] hover:shadow-[0_12px_36px_rgba(42,71,113,0.45)] hover:-translate-y-0.5">
              Book a Repair
            </button>
            <button className="group/sec flex items-center gap-2 text-gray-600 hover:text-[#2a4771] text-md tracking-[2px] uppercase font-semibold transition-all duration-300">
              Call Us
              <span className="relative inline-block w-5 h-px bg-gray-300 group-hover/sec:bg-[#2a4771] group-hover/sec:w-8 transition-all duration-300">
                <span className="absolute right-0 top-[-3px] w-1.5 h-1.5 border-t border-r border-gray-300 group-hover/sec:border-[#2a4771] rotate-45 inline-block transition-colors duration-300" />
              </span>
            </button>
          </div>
        </div>

      </div>
    </section>
  );
}