import { useState, useEffect, useRef } from "react";

// ─── GOOGLE FONTS ────────────────────────────────────────────────────────────
const FontLoader = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;1,9..40,300&display=swap');
    * { font-family: 'DM Sans', sans-serif; }
    h1,h2,h3,.font-display { font-family: 'Syne', sans-serif; }
    html { scroll-behavior: smooth; }
    .fade-up { opacity: 0; transform: translateY(28px); transition: opacity .65s ease, transform .65s ease; }
    .fade-up.visible { opacity: 1; transform: translateY(0); }
    @keyframes pulse-ring { 0%{transform:scale(1);opacity:.6} 70%{transform:scale(1.35);opacity:0} 100%{transform:scale(1.35);opacity:0} }
    @keyframes float { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-8px)} }
    @keyframes ticker { 0%{transform:translateX(0)} 100%{transform:translateX(-50%)} }
    .pulse-ring::before { content:''; position:absolute; inset:-6px; border-radius:inherit; background:inherit; animation:pulse-ring 2s ease infinite; z-index:-1; }
    .float-anim { animation: float 4s ease-in-out infinite; }
    .ticker-wrap { overflow:hidden; }
    .ticker-inner { display:flex; animation: ticker 28s linear infinite; white-space:nowrap; }
  `}</style>
);

// ─── DATA ─────────────────────────────────────────────────────────────────────
const NAV_LINKS = ["Home", "Services", "Brands", "About", "Contact"];

const SERVICES = [
  { icon: "📺", title: "TV Sales & Installation", desc: "LED, OLED and QLED TVs from top brands. Professional wall mounting and calibration included.", color: "from-blue-500 to-blue-700" },
  { icon: "🫧", title: "Washing Machine Service", desc: "Full-range washing machine repair, servicing, drum cleaning and spare part replacement.", color: "from-cyan-500 to-cyan-700" },
  { icon: "❄️", title: "Refrigerator Service", desc: "Compressor repair, gas refilling, thermostat fix and complete refrigerator overhauling.", color: "from-indigo-500 to-indigo-700" },
  { icon: "❄️‍🌊", title: "AC Installation & Repair", desc: "Split & window AC installation, gas charging, cleaning and preventive maintenance.", color: "from-sky-500 to-sky-700" },
  { icon: "🍳", title: "Kitchen Appliances", desc: "Microwave, chimney, dishwasher and mixer-grinder repair and installation services.", color: "from-orange-500 to-orange-600" },
  { icon: "🔧", title: "Annual Maintenance", desc: "Affordable AMC plans for your home appliances — one call covers everything.", color: "from-violet-500 to-violet-700" },
];

const BRANDS = [
  { name: "Samsung", desc: "Authorised service partner", logo: "S" },
  { name: "LG", desc: "Certified repair centre", logo: "LG" },
  { name: "Sony", desc: "Trained technicians", logo: "So" },
  { name: "Whirlpool", desc: "Official service support", logo: "W" },
  { name: "Bosch", desc: "Genuine spare parts", logo: "B" },
  { name: "Panasonic", desc: "Authorised service", logo: "P" },
  { name: "Daikin", desc: "Certified AC service", logo: "D" },
  { name: "Voltas", desc: "Trained AC technicians", logo: "V" },
];

const WHY_US = [
  { icon: "🏆", title: "Experienced Technicians", desc: "Over 500+ certified service professionals with 10+ years of hands-on expertise." },
  { icon: "✅", title: "Genuine Spare Parts", desc: "We use only OEM-approved parts to ensure lasting quality and full warranty." },
  { icon: "💰", title: "Transparent Pricing", desc: "No hidden charges. Get a free diagnosis and upfront quote before we begin." },
  { icon: "⚡", title: "Same-Day Service", desc: "Book before noon and our technician reaches you the very same day." },
  { icon: "🛡️", title: "90-Day Service Warranty", desc: "All our repairs come with a 90-day service guarantee. Your satisfaction, assured." },
  { icon: "📱", title: "Easy WhatsApp Booking", desc: "Simply WhatsApp us your problem. Get instant confirmation in under 5 minutes." },
];

const TESTIMONIALS = [
  { name: "Rajesh Kumar", loc: "Tiruppur", rating: 5, text: "My LG AC was not cooling at all. Called AR Electronics and their technician arrived within 3 hours. Fixed perfectly. Excellent service!", init: "RK" },
  { name: "Priya Selvam", loc: "Coimbatore", rating: 5, text: "Samsung TV stopped working suddenly. The team was very professional, diagnosed the issue in minutes and repaired it the same day. Highly recommend!", init: "PS" },
  { name: "Arun Mohan", loc: "Erode", rating: 5, text: "Got my washing machine serviced under their AMC plan. Best decision — they handle everything proactively. Zero breakdowns this year!", init: "AM" },
  { name: "Meena Devi", loc: "Tiruppur", rating: 4, text: "Transparent pricing and no hidden costs. The refrigerator compressor replacement was done quickly with a proper warranty. Very trustworthy.", init: "MD" },
];

const STATS = [
  { value: "26+", label: "Years in Service" },
  { value: "15K+", label: "Happy Customers" },
  { value: "500+", label: "Technicians" },
  { value: "8", label: "Brand Partners" },
];

// ─── HOOKS ────────────────────────────────────────────────────────────────────
function useScrollReveal() {
  useEffect(() => {
    const els = document.querySelectorAll(".fade-up");
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add("visible"); obs.unobserve(e.target); } });
    }, { threshold: 0.12 });
    els.forEach(el => obs.observe(el));
    return () => obs.disconnect();
  });
}

// ─── REUSABLE COMPONENTS ──────────────────────────────────────────────────────
function SectionLabel({ children }) {
  return (
    <span className="inline-flex items-center gap-2 bg-blue-50 text-blue-700 text-xs font-semibold tracking-widest uppercase px-4 py-2 rounded-full border border-blue-100 mb-4">
      <span className="w-1.5 h-1.5 rounded-full bg-blue-500 inline-block"/>
      {children}
    </span>
  );
}

function SectionHeading({ label, title, sub, center = true }) {
  return (
    <div className={`mb-12 fade-up ${center ? "text-center" : ""}`}>
      <SectionLabel>{label}</SectionLabel>
      <h2 className="font-display text-3xl sm:text-4xl font-bold text-slate-900 leading-tight mt-1">{title}</h2>
      {sub && <p className="text-slate-500 mt-3 max-w-xl mx-auto text-base leading-relaxed">{sub}</p>}
    </div>
  );
}

function CTAButtons({ size = "md", column = false }) {
  const base = size === "lg" ? "px-7 py-4 text-base" : "px-5 py-3 text-sm";
  return (
    <div className={`flex ${column ? "flex-col sm:flex-row" : "flex-wrap"} gap-3`}>
      <a href="tel:+919876543210"
        className={`relative inline-flex items-center gap-2.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl transition-all shadow-lg shadow-blue-200 hover:shadow-blue-300 hover:-translate-y-0.5 ${base}`}>
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/></svg>
        Call Now
      </a>
      <a href="https://wa.me/919876543210?text=Hi! I need electronics service." target="_blank" rel="noreferrer"
        className={`inline-flex items-center gap-2.5 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-xl transition-all shadow-lg shadow-green-200 hover:shadow-green-300 hover:-translate-y-0.5 ${base}`}>
        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
        WhatsApp
      </a>
    </div>
  );
}

// ─── NAVBAR ───────────────────────────────────────────────────────────────────
function Navbar({ activePage, setPage }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", h);
    return () => window.removeEventListener("scroll", h);
  }, []);
  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? "bg-white/95 backdrop-blur-md shadow-md shadow-slate-100" : "bg-white/90 backdrop-blur-sm"}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <button onClick={() => setPage("Home")} className="flex items-center gap-3 group">
          <div className="w-9 h-9 bg-gradient-to-br from-blue-600 to-blue-800 rounded-xl flex items-center justify-center text-white font-bold text-sm shadow-md group-hover:shadow-blue-300 transition-shadow font-display">AR</div>
          <div className="leading-tight">
            <div className="font-display font-bold text-slate-900 text-[15px] tracking-tight">AR Electronics</div>
            <div className="text-[10px] text-blue-600 font-semibold tracking-widest uppercase">Service & Sales</div>
          </div>
        </button>
        {/* Desktop nav */}
        <nav className="hidden lg:flex items-center gap-1">
          {NAV_LINKS.map(p => (
            <button key={p} onClick={() => setPage(p)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${activePage === p ? "bg-blue-600 text-white shadow-sm" : "text-slate-600 hover:text-blue-600 hover:bg-blue-50"}`}>
              {p}
            </button>
          ))}
        </nav>
        {/* CTA + burger */}
        <div className="flex items-center gap-2">
          <a href="tel:+919876543210" className="hidden sm:inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold px-4 py-2 rounded-xl transition-all shadow-sm hover:shadow-blue-200">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/></svg>
            Call Now
          </a>
          <button onClick={() => setOpen(!open)} className="lg:hidden p-2 rounded-xl text-slate-600 hover:bg-slate-100">
            <div className="w-5 space-y-1.5">
              <span className={`block h-0.5 bg-current transition-all duration-300 ${open ? "rotate-45 translate-y-2" : ""}`}/>
              <span className={`block h-0.5 bg-current transition-all ${open ? "opacity-0" : ""}`}/>
              <span className={`block h-0.5 bg-current transition-all duration-300 ${open ? "-rotate-45 -translate-y-2" : ""}`}/>
            </div>
          </button>
        </div>
      </div>
      {/* Mobile menu */}
      <div className={`lg:hidden overflow-hidden transition-all duration-300 bg-white border-t border-slate-100 ${open ? "max-h-80" : "max-h-0"}`}>
        <div className="px-4 py-3 flex flex-col gap-1">
          {NAV_LINKS.map(p => (
            <button key={p} onClick={() => { setPage(p); setOpen(false); }}
              className={`px-4 py-3 rounded-xl text-sm font-medium text-left transition-all ${activePage === p ? "bg-blue-600 text-white" : "text-slate-600 hover:bg-slate-50"}`}>
              {p}
            </button>
          ))}
          <a href="tel:+919876543210" className="mt-1 flex items-center gap-2 bg-blue-600 text-white text-sm font-semibold px-4 py-3 rounded-xl">
            📞 Call Now: +91 98765 43210
          </a>
        </div>
      </div>
    </header>
  );
}

// ─── HERO ─────────────────────────────────────────────────────────────────────
function HeroSection({ setPage }) {
  return (
    <section className="relative min-h-[100vh] flex items-center overflow-hidden bg-slate-950 pt-16">
      {/* Geometric background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-[700px] h-[700px] bg-gradient-to-bl from-blue-600/20 via-blue-800/10 to-transparent rounded-full -translate-y-1/3 translate-x-1/3"/>
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-gradient-to-tr from-cyan-600/15 via-blue-700/10 to-transparent rounded-full translate-y-1/3 -translate-x-1/3"/>
        {/* Grid pattern */}
        <div className="absolute inset-0 opacity-[0.04]" style={{backgroundImage:"linear-gradient(#60a5fa 1px,transparent 1px),linear-gradient(90deg,#60a5fa 1px,transparent 1px)",backgroundSize:"60px 60px"}}/>
        {/* Floating cards */}
        <div className="absolute top-1/4 right-8 lg:right-24 float-anim" style={{animationDelay:"0s"}}>
          <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-4 text-white/90 w-44 shadow-2xl">
            <div className="text-2xl mb-2">⚡</div>
            <div className="text-xs font-semibold text-blue-300 mb-1">Same-Day Service</div>
            <div className="text-[11px] text-white/60">Book before noon, we arrive today</div>
          </div>
        </div>
        <div className="absolute bottom-1/3 right-4 lg:right-16 float-anim" style={{animationDelay:"1.4s"}}>
          <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-4 text-white/90 w-40 shadow-2xl">
            <div className="text-2xl mb-2">🛡️</div>
            <div className="text-xs font-semibold text-green-300 mb-1">90-Day Warranty</div>
            <div className="text-[11px] text-white/60">All repairs guaranteed</div>
          </div>
        </div>
        {/* <div className="absolute top-2/3 left-8 lg:left-16 float-anim" style={{animationDelay:"0.7s"}}>
          <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-4 text-white/90 w-36 shadow-2xl">
            <div className="text-xl mb-1">⭐⭐⭐⭐⭐</div>
            <div className="text-[11px] text-white/60">15,000+ happy customers</div>
          </div>
        </div> */}
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 py-16 lg:py-24 grid lg:grid-cols-2 gap-12 items-center">
        <div>
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-blue-500/20 border border-blue-400/30 text-blue-300 text-xs font-semibold tracking-widest uppercase px-4 py-2 rounded-full mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse inline-block"/>
            Tiruppur's Most Trusted — Est. 1998
          </div>
          <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-[1.1] mb-6">
            Trusted<br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">Electronics</span><br/>
            Service Center
          </h1>
          <p className="text-slate-300 text-lg leading-relaxed mb-8 max-w-lg">
            Sales, installation and repair for all home appliances. Authorised service partner for Samsung, LG, Sony, Bosch & more. Fast, affordable, and reliable.
          </p>
          <CTAButtons size="lg" column />
          {/* Trust indicators */}
          <div className="mt-10 flex flex-wrap gap-6">
            {STATS.map(s => (
              <div key={s.label}>
                <div className="font-display text-2xl font-bold text-white">{s.value}</div>
                <div className="text-slate-400 text-xs">{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Service highlights */}
        <div className="hidden lg:grid grid-cols-2 gap-4">
          {SERVICES.slice(0,4).map((s, i) => (
            <div key={i} className={`bg-white/5 border border-white/10 hover:border-blue-400/40 hover:bg-white/8 rounded-2xl p-5 transition-all duration-300 cursor-default group`}
              style={{animationDelay:`${i*0.1}s`}}>
              <div className="text-3xl mb-3">{s.icon}</div>
              <h3 className="font-display font-semibold text-white text-sm mb-1.5 group-hover:text-blue-300 transition-colors">{s.title}</h3>
              <p className="text-slate-400 text-xs leading-relaxed line-clamp-2">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll cue */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/30">
        <span className="text-xs tracking-widest uppercase">Scroll</span>
        <div className="w-px h-8 bg-gradient-to-b from-white/30 to-transparent"/>
      </div>
    </section>
  );
}

// ─── TICKER ───────────────────────────────────────────────────────────────────
function BrandTicker() {
  const items = [...BRANDS, ...BRANDS];
  return (
    <div className="bg-slate-900 border-y border-slate-800 py-4 ticker-wrap">
      <div className="ticker-inner">
        {items.map((b, i) => (
          <div key={i} className="inline-flex items-center gap-3 mx-8 text-slate-400 hover:text-white transition-colors cursor-default">
            <div className="w-8 h-8 bg-slate-700 rounded-lg flex items-center justify-center text-xs font-bold text-white">{b.logo}</div>
            <span className="text-sm font-medium">{b.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── SERVICES SECTION ─────────────────────────────────────────────────────────
function ServiceCard({ service, onEnquire, delay = 0 }) {
  return (
    <div className="fade-up group bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-xl hover:shadow-slate-100 hover:-translate-y-1 transition-all duration-300 overflow-hidden flex flex-col"
      style={{transitionDelay:`${delay}ms`}}>
      <div className={`bg-gradient-to-br ${service.color} p-6`}>
        <span className="text-4xl">{service.icon}</span>
      </div>
      <div className="p-6 flex flex-col flex-1">
        <h3 className="font-display font-bold text-slate-900 text-lg mb-2 group-hover:text-blue-700 transition-colors">{service.title}</h3>
        <p className="text-slate-500 text-sm leading-relaxed flex-1 mb-5">{service.desc}</p>
        <button onClick={() => onEnquire(service.title)}
          className="w-full bg-slate-50 hover:bg-blue-600 border border-slate-200 hover:border-blue-600 text-slate-700 hover:text-white text-sm font-semibold py-2.5 rounded-xl transition-all duration-200">
          Enquire Now →
        </button>
      </div>
    </div>
  );
}

function ServicesSection({ setPage, onEnquire }) {
  useScrollReveal();
  return (
    <section className="py-20 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <SectionHeading
          label="What We Do"
          title={<>Expert Service for<br/><span className="text-blue-600">Every Appliance</span></>}
          sub="From installation to repair — our certified technicians handle all major home electronics and appliances."
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {SERVICES.map((s, i) => <ServiceCard key={i} service={s} onEnquire={onEnquire} delay={i * 80}/>)}
        </div>
        <div className="text-center mt-10 fade-up">
          <button onClick={() => setPage("Services")} className="inline-flex items-center gap-2 text-blue-600 font-semibold border border-blue-200 hover:bg-blue-600 hover:text-white hover:border-blue-600 px-6 py-3 rounded-xl transition-all">
            View All Services →
          </button>
        </div>
      </div>
    </section>
  );
}

// ─── WHY CHOOSE US ────────────────────────────────────────────────────────────
function WhyUsSection() {
  useScrollReveal();
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <SectionHeading
          label="Why AR Electronics"
          title={<>Why Thousands Choose<br/><span className="text-blue-600">Us Every Year</span></>}
          sub="We've built our reputation on reliability, transparency, and exceptional technical expertise."
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {WHY_US.map((w, i) => (
            <div key={i} className="fade-up group flex gap-4 p-6 bg-slate-50 hover:bg-blue-50 rounded-2xl border border-slate-100 hover:border-blue-100 transition-all duration-300 hover:-translate-y-0.5"
              style={{transitionDelay:`${i*60}ms`}}>
              <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-2xl shadow-sm flex-shrink-0 group-hover:scale-110 transition-transform">{w.icon}</div>
              <div>
                <h3 className="font-display font-bold text-slate-900 mb-1 text-[15px] group-hover:text-blue-700 transition-colors">{w.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed">{w.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── BRANDS SECTION ───────────────────────────────────────────────────────────
function BrandsSection({ setPage }) {
  useScrollReveal();
  return (
    <section className="py-20 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <SectionHeading
          label="Our Brand Partners"
          title={<>Authorised Service for<br/><span className="text-blue-600">Top Brands</span></>}
          sub="We are authorised service partners for India's most trusted electronics brands."
        />
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-4 gap-4">
          {BRANDS.map((b, i) => (
            <div key={i} className="fade-up group bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-lg hover:border-blue-100 p-6 flex flex-col items-center gap-3 transition-all duration-300 hover:-translate-y-1 cursor-default"
              style={{transitionDelay:`${i*60}ms`}}>
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-slate-100 to-slate-200 group-hover:from-blue-50 group-hover:to-blue-100 flex items-center justify-center text-slate-600 group-hover:text-blue-700 font-bold text-lg transition-all font-display">
                {b.logo}
              </div>
              <div className="text-center">
                <div className="font-display font-bold text-slate-900 text-sm">{b.name}</div>
                <div className="text-xs text-slate-400 mt-0.5">{b.desc}</div>
              </div>
            </div>
          ))}
        </div>
        <div className="text-center mt-10 fade-up">
          <button onClick={() => setPage("Brands")} className="inline-flex items-center gap-2 text-blue-600 font-semibold border border-blue-200 hover:bg-blue-600 hover:text-white hover:border-blue-600 px-6 py-3 rounded-xl transition-all">
            View All Brands →
          </button>
        </div>
      </div>
    </section>
  );
}

// ─── TESTIMONIALS ─────────────────────────────────────────────────────────────
function TestimonialsSection() {
  useScrollReveal();
  return (
    <section className="py-20 bg-slate-900 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-80 h-80 bg-blue-600/10 rounded-full blur-3xl"/>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-cyan-600/8 rounded-full blur-3xl"/>
      </div>
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-12 fade-up">
          <span className="inline-flex items-center gap-2 bg-white/10 text-blue-300 text-xs font-semibold tracking-widest uppercase px-4 py-2 rounded-full border border-white/10 mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-400 inline-block"/>
            Customer Stories
          </span>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-white">What Our Customers Say</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {TESTIMONIALS.map((t, i) => (
            <div key={i} className="fade-up bg-white/5 border border-white/10 hover:border-blue-400/30 hover:bg-white/8 rounded-2xl p-5 transition-all duration-300"
              style={{transitionDelay:`${i*80}ms`}}>
              <div className="flex mb-3">
                {Array.from({length:5}).map((_,j) => <span key={j} className={`text-sm ${j<t.rating?"text-amber-400":"text-white/20"}`}>★</span>)}
              </div>
              <p className="text-slate-300 text-sm leading-relaxed mb-5 line-clamp-4">"{t.text}"</p>
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 bg-gradient-to-br from-blue-500 to-blue-700 rounded-xl flex items-center justify-center text-white font-bold text-xs font-display">{t.init}</div>
                <div>
                  <div className="text-white font-semibold text-sm">{t.name}</div>
                  <div className="text-slate-500 text-xs">{t.loc}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── LOCATION ─────────────────────────────────────────────────────────────────
function LocationSection({ setPage }) {
  useScrollReveal();
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <div className="fade-up">
            <SectionLabel>Find Us</SectionLabel>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-slate-900 leading-tight mt-1 mb-6">
              Visit Our<br/><span className="text-blue-600">Service Centre</span>
            </h2>
            <div className="space-y-4 mb-8">
              {[
                {icon:"📍", label:"Address", val:"42, Main Bazaar Road, Tiruppur – 641601, Tamil Nadu"},
                {icon:"📞", label:"Phone", val:"+91 98765 43210", href:"tel:+919876543210"},
                {icon:"✉️", label:"Email", val:"service@arelectronics.in", href:"mailto:service@arelectronics.in"},
                {icon:"⏰", label:"Hours", val:"Mon–Sat: 9AM–8PM  |  Sun: 10AM–5PM"},
              ].map(item => (
                <div key={item.label} className="flex items-start gap-4 p-4 bg-slate-50 rounded-xl border border-slate-100">
                  <span className="text-xl mt-0.5">{item.icon}</span>
                  <div>
                    <div className="text-xs font-semibold text-slate-400 uppercase tracking-wide mb-0.5">{item.label}</div>
                    {item.href ? <a href={item.href} className="text-blue-600 font-medium hover:underline">{item.val}</a>
                    : <div className="text-slate-700 font-medium text-sm">{item.val}</div>}
                  </div>
                </div>
              ))}
            </div>
            <CTAButtons />
          </div>
          {/* Map placeholder */}
          <div className="fade-up bg-gradient-to-br from-blue-50 to-slate-100 rounded-2xl overflow-hidden shadow-sm border border-slate-200" style={{height:"380px"}}>
            <div className="h-full flex flex-col items-center justify-center gap-4 text-center p-8">
              <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center text-3xl">📍</div>
              <div>
                <div className="font-display font-bold text-slate-800 text-lg mb-1">AR Electronics</div>
                <div className="text-slate-500 text-sm mb-4">42, Main Bazaar Road<br/>Tiruppur – 641601</div>
              </div>
              <a href="https://maps.google.com/?q=Tiruppur+Tamil+Nadu" target="_blank" rel="noreferrer"
                className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold px-6 py-2.5 rounded-xl transition-colors shadow-md">
                Open in Google Maps →
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── CTA SECTION ──────────────────────────────────────────────────────────────
function CTASection({ setPage }) {
  useScrollReveal();
  return (
    <section className="py-20 bg-gradient-to-br from-blue-700 via-blue-800 to-slate-900 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-72 h-72 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2"/>
        <div className="absolute bottom-0 left-0 w-56 h-56 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2"/>
        <div className="absolute inset-0 opacity-[0.03]" style={{backgroundImage:"linear-gradient(white 1px,transparent 1px),linear-gradient(90deg,white 1px,transparent 1px)",backgroundSize:"40px 40px"}}/>
      </div>
      <div className="relative z-10 max-w-3xl mx-auto px-4 text-center fade-up">
        <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 text-blue-200 text-xs font-semibold tracking-widest uppercase px-4 py-2 rounded-full mb-6">
          <span className="w-1.5 h-1.5 rounded-full bg-blue-300 animate-pulse inline-block"/>
          Get In Touch Today
        </div>
        <h2 className="font-display text-3xl sm:text-5xl font-bold text-white mb-4 leading-tight">
          Need Electronics<br/>Service?
        </h2>
        <p className="text-blue-200 text-lg mb-10 leading-relaxed max-w-xl mx-auto">
          Don't let a broken appliance disrupt your day. Call us or WhatsApp — our technician will be at your doorstep, often the same day.
        </p>
        <div className="flex flex-wrap gap-4 justify-center mb-6">
          <a href="tel:+919876543210"
            className="relative pulse-ring inline-flex items-center gap-3 bg-white text-blue-700 font-bold text-base px-8 py-4 rounded-2xl transition-all hover:-translate-y-0.5 shadow-xl">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/></svg>
            Call Now
          </a>
          <a href="https://wa.me/919876543210?text=Hi! I need electronics service." target="_blank" rel="noreferrer"
            className="inline-flex items-center gap-3 bg-green-500 hover:bg-green-400 text-white font-bold text-base px-8 py-4 rounded-2xl transition-all hover:-translate-y-0.5 shadow-xl shadow-green-900/20">
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
            WhatsApp Enquiry
          </a>
          <button onClick={() => setPage("Contact")}
            className="inline-flex items-center gap-2 border-2 border-white/30 text-white hover:bg-white/10 font-semibold text-base px-8 py-4 rounded-2xl transition-all">
            Send Enquiry Form
          </button>
        </div>
        <p className="text-blue-300 text-sm">📞 Available Mon–Sat 9AM–8PM · Sun 10AM–5PM</p>
      </div>
    </section>
  );
}

// ─── FOOTER ───────────────────────────────────────────────────────────────────
function Footer({ setPage }) {
  return (
    <footer className="bg-slate-950 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
        {/* Brand */}
        <div>
          <div className="flex items-center gap-3 mb-5">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-700 rounded-xl flex items-center justify-center font-display font-bold text-sm">AR</div>
            <div><div className="font-display font-bold text-lg">AR Electronics</div><div className="text-[10px] text-blue-400 tracking-widest uppercase font-semibold">Service & Sales · Since 1998</div></div>
          </div>
          <p className="text-slate-400 text-sm leading-relaxed mb-5">
            Your trusted electronics service partner in Tiruppur. Authorised service for all major brands with 26+ years of expertise.
          </p>
          <div className="flex gap-2.5">
            {[{l:"f",c:"hover:bg-blue-600"},{l:"in",c:"hover:bg-pink-600"},{l:"yt",c:"hover:bg-red-600"},{l:"wa",c:"hover:bg-green-600",h:"https://wa.me/919876543210"}].map(s => (
              <a key={s.l} href={s.h||"#"} target={s.h?"_blank":undefined} rel="noreferrer"
                className={`w-9 h-9 bg-white/10 ${s.c} rounded-xl flex items-center justify-center text-xs font-semibold uppercase transition-colors`}>
                {s.l}
              </a>
            ))}
          </div>
        </div>
        {/* Links */}
        <div>
          <h4 className="font-display font-bold text-sm mb-5 text-white">Quick Links</h4>
          <ul className="space-y-3">
            {NAV_LINKS.map(p => (
              <li key={p}><button onClick={() => setPage(p)} className="text-slate-400 hover:text-white text-sm transition-colors">→ {p}</button></li>
            ))}
          </ul>
        </div>
        {/* Services */}
        <div>
          <h4 className="font-display font-bold text-sm mb-5 text-white">Our Services</h4>
          <ul className="space-y-3">
            {SERVICES.map(s => (
              <li key={s.title}><button onClick={() => setPage("Services")} className="text-slate-400 hover:text-white text-sm transition-colors">→ {s.title}</button></li>
            ))}
          </ul>
        </div>
        {/* Contact */}
        <div>
          <h4 className="font-display font-bold text-sm mb-5 text-white">Contact</h4>
          <div className="space-y-4">
            <div className="flex gap-3"><span className="text-blue-400">📍</span><div className="text-slate-400 text-sm">42, Main Bazaar Road,<br/>Tiruppur – 641601, Tamil Nadu</div></div>
            <div className="flex gap-3"><span className="text-blue-400">📞</span><a href="tel:+919876543210" className="text-slate-400 hover:text-white text-sm transition-colors">+91 98765 43210</a></div>
            <div className="flex gap-3"><span className="text-blue-400">✉️</span><a href="mailto:service@arelectronics.in" className="text-slate-400 hover:text-white text-sm transition-colors">service@arelectronics.in</a></div>
            <div className="flex gap-3"><span className="text-blue-400">⏰</span><div className="text-slate-400 text-sm">Mon–Sat: 9AM–8PM<br/>Sunday: 10AM–5PM</div></div>
          </div>
          <a href="https://wa.me/919876543210" target="_blank" rel="noreferrer"
            className="inline-flex items-center gap-2 mt-5 bg-green-600 hover:bg-green-500 text-white text-sm font-semibold px-4 py-2.5 rounded-xl transition-colors">
            💬 WhatsApp Us
          </a>
        </div>
      </div>
      <div className="border-t border-white/5 py-5 px-4">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-2 text-xs text-slate-600">
          <div>© 2025 AR Electronics, Tiruppur. All rights reserved.</div>
          <div className="flex gap-4"><a href="#" className="hover:text-white transition-colors">Privacy Policy</a><a href="#" className="hover:text-white transition-colors">Terms</a></div>
        </div>
      </div>
    </footer>
  );
}

// ─── PAGES ────────────────────────────────────────────────────────────────────

// HOME PAGE
function HomePage({ setPage, onEnquire }) {
  useScrollReveal();
  return (
    <>
      <HeroSection setPage={setPage}/>
      <BrandTicker/>
      <ServicesSection setPage={setPage} onEnquire={onEnquire}/>
      <WhyUsSection/>
      <BrandsSection setPage={setPage}/>
      <TestimonialsSection/>
      <LocationSection setPage={setPage}/>
      <CTASection setPage={setPage}/>
    </>
  );
}

// SERVICES PAGE
function ServicesPage({ onEnquire }) {
  useScrollReveal();
  const extended = [
    ...SERVICES,
    { icon: "📡", title: "Set-Top Box & DTH", desc: "Installation and troubleshooting for all DTH providers and set-top boxes.", color: "from-pink-500 to-rose-600" },
    { icon: "🖥️", title: "Home Theatre Setup", desc: "End-to-end home theatre planning, installation and audio-visual calibration.", color: "from-amber-500 to-orange-600" },
    { icon: "🔌", title: "Electrical Wiring", desc: "Safe and professional electrical wiring for home appliance connections.", color: "from-lime-500 to-green-600" },
    { icon: "📦", title: "Warranty Claims", desc: "We handle the entire manufacturer warranty claim process for you, hassle-free.", color: "from-teal-500 to-teal-700" },
  ];
  return (
    <main className="pt-16">
      {/* Page header */}
      <div className="bg-slate-900 py-16 px-4 relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.04]" style={{backgroundImage:"linear-gradient(#60a5fa 1px,transparent 1px),linear-gradient(90deg,#60a5fa 1px,transparent 1px)",backgroundSize:"50px 50px"}}/>
        <div className="relative max-w-7xl mx-auto text-center">
          <span className="inline-flex items-center gap-2 bg-blue-500/20 border border-blue-400/30 text-blue-300 text-xs font-semibold tracking-widest uppercase px-4 py-2 rounded-full mb-5">Our Services</span>
          <h1 className="font-display text-4xl sm:text-5xl font-bold text-white mb-4">All Our Services</h1>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">Complete electronics service from sales to repair. Authorised technicians. Genuine parts. Fast turnaround.</p>
        </div>
      </div>

      <section className="py-16 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {extended.map((s, i) => <ServiceCard key={i} service={s} onEnquire={onEnquire} delay={i*60}/>)}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <SectionHeading label="How It Works" title={<>Book Service in<br/><span className="text-blue-600">3 Simple Steps</span></>} />
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            {[
              {step:"01",icon:"📞",title:"Contact Us",desc:"Call, WhatsApp or fill our form. Tell us your appliance issue."},
              {step:"02",icon:"🔍",title:"Diagnosis",desc:"Our technician arrives at your home and diagnoses the issue free."},
              {step:"03",icon:"✅",title:"Repair & Warranty",desc:"We fix it with genuine parts and provide a 90-day service warranty."},
            ].map((s,i) => (
              <div key={i} className="fade-up text-center relative" style={{transitionDelay:`${i*100}ms`}}>
                <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center text-3xl mx-auto mb-4 shadow-lg shadow-blue-200">{s.icon}</div>
                <div className="absolute top-7 left-[calc(50%+32px)] right-0 h-px bg-slate-200 hidden sm:block" style={{display: i===2?"none":"block"}}/>
                <div className="text-xs font-bold text-blue-600 mb-1 tracking-widest">STEP {s.step}</div>
                <h3 className="font-display font-bold text-slate-900 text-lg mb-2">{s.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed max-w-xs mx-auto">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <CTASection setPage={() => {}} />
    </main>
  );
}

// BRANDS PAGE
function BrandsPage() {
  useScrollReveal();
  const brandDetails = [
    { name: "Samsung", desc: "Authorised service partner for all Samsung home appliances including TVs, refrigerators, washing machines and ACs.", logo: "S", color: "from-blue-500 to-blue-700", products: "TV, Fridge, Washing Machine, AC" },
    { name: "LG", desc: "Certified LG repair centre with trained technicians. Genuine LG spare parts available in stock.", logo: "LG", color: "from-red-500 to-red-700", products: "TV, AC, Fridge, Microwave" },
    { name: "Sony", desc: "Sony-trained professionals for Bravia TVs, audio equipment and home entertainment systems.", logo: "So", color: "from-slate-600 to-slate-800", products: "TV, Home Theatre, Audio" },
    { name: "Whirlpool", desc: "Full Whirlpool service support for washing machines, refrigerators and air conditioners.", logo: "W", color: "from-blue-600 to-indigo-700", products: "Washing Machine, Fridge, AC" },
    { name: "Bosch", desc: "Expert technicians for Bosch kitchen appliances and home appliances with genuine parts.", logo: "B", color: "from-slate-700 to-slate-900", products: "Dishwasher, Microwave, Kitchen Appliances" },
    { name: "Panasonic", desc: "Authorised Panasonic service for TVs, ACs and home electronics across Tiruppur.", logo: "P", color: "from-blue-700 to-blue-900", products: "TV, AC, Appliances" },
    { name: "Daikin", desc: "Daikin certified AC installation, repair and AMC services. Fast response guaranteed.", logo: "D", color: "from-sky-500 to-sky-700", products: "Split AC, Cassette AC, Ducted" },
    { name: "Voltas", desc: "Voltas authorised service centre for air conditioners and commercial cooling solutions.", logo: "V", color: "from-orange-500 to-orange-700", products: "Window AC, Split AC, Commercial" },
  ];
  return (
    <main className="pt-16">
      <div className="bg-slate-900 py-16 px-4 relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.04]" style={{backgroundImage:"linear-gradient(#60a5fa 1px,transparent 1px),linear-gradient(90deg,#60a5fa 1px,transparent 1px)",backgroundSize:"50px 50px"}}/>
        <div className="relative max-w-7xl mx-auto text-center">
          <span className="inline-flex items-center gap-2 bg-blue-500/20 border border-blue-400/30 text-blue-300 text-xs font-semibold tracking-widest uppercase px-4 py-2 rounded-full mb-5">Brand Partners</span>
          <h1 className="font-display text-4xl sm:text-5xl font-bold text-white mb-4">Authorised Brands</h1>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">We are the authorised service centre for India's most trusted electronics brands in Tiruppur.</p>
        </div>
      </div>
      <section className="py-16 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {brandDetails.map((b, i) => (
              <div key={i} className="fade-up bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden"
                style={{transitionDelay:`${i*60}ms`}}>
                <div className={`bg-gradient-to-br ${b.color} p-6 flex items-center justify-between`}>
                  <div className="font-display font-bold text-white text-3xl">{b.logo}</div>
                  <span className="text-xs bg-white/20 text-white px-2 py-1 rounded-lg font-semibold">Authorised</span>
                </div>
                <div className="p-5">
                  <h3 className="font-display font-bold text-slate-900 text-lg mb-2">{b.name}</h3>
                  <p className="text-slate-500 text-sm leading-relaxed mb-3">{b.desc}</p>
                  <div className="text-xs font-semibold text-blue-600 bg-blue-50 px-3 py-1.5 rounded-lg inline-block">{b.products}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <CTASection setPage={() => {}} />
    </main>
  );
}

// ABOUT PAGE
function AboutPage({ setPage }) {
  useScrollReveal();
  return (
    <main className="pt-16">
      <div className="bg-slate-900 py-16 px-4 relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.04]" style={{backgroundImage:"linear-gradient(#60a5fa 1px,transparent 1px),linear-gradient(90deg,#60a5fa 1px,transparent 1px)",backgroundSize:"50px 50px"}}/>
        <div className="relative max-w-7xl mx-auto grid lg:grid-cols-2 gap-10 items-center">
          <div>
            <span className="inline-flex items-center gap-2 bg-blue-500/20 border border-blue-400/30 text-blue-300 text-xs font-semibold tracking-widest uppercase px-4 py-2 rounded-full mb-5">About Us</span>
            <h1 className="font-display text-4xl sm:text-5xl font-bold text-white mb-4 leading-tight">26 Years of<br/><span className="text-blue-400">Trusted Service</span></h1>
            <p className="text-slate-300 text-lg leading-relaxed">Since 1998, AR Electronics has been Tiruppur's most trusted name for electronics service, sales and installation. Family-run, customer-first — always.</p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {STATS.map(s => (
              <div key={s.label} className="bg-white/5 border border-white/10 rounded-2xl p-5 text-center">
                <div className="font-display text-3xl font-bold text-white mb-1">{s.value}</div>
                <div className="text-slate-400 text-sm">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Story */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 grid lg:grid-cols-2 gap-12 items-center">
          <div className="fade-up">
            <SectionLabel>Our Story</SectionLabel>
            <h2 className="font-display text-3xl font-bold text-slate-900 mt-1 mb-5">A Family Business Built on Trust</h2>
            <div className="space-y-4 text-slate-600 leading-relaxed text-sm">
              <p>AR Electronics was founded in 1998 by Mr. Arumugam Raj with a simple vision: to provide honest, affordable and expert electronics service to the people of Tiruppur.</p>
              <p>What started as a small TV repair shop on Main Bazaar Road has grown into a full-service electronics centre with authorised partnerships with Samsung, LG, Sony, Bosch, Whirlpool, Panasonic, Daikin and Voltas.</p>
              <p>Today, we have a team of 30+ certified technicians, a dedicated service centre, and a reputation built over 26 years of consistent service excellence.</p>
              <p>We believe in transparent pricing, genuine parts and putting the customer first — every single time.</p>
            </div>
          </div>
          <div className="fade-up grid grid-cols-2 gap-4">
            <div className="bg-gradient-to-br from-blue-600 to-blue-800 rounded-2xl p-6 text-white">
              <div className="text-4xl mb-3">🏆</div>
              <div className="font-display font-bold text-lg mb-1">Award Winning</div>
              <div className="text-blue-200 text-sm">Best Electronics Service Centre — Tamil Nadu 2023</div>
            </div>
            <div className="bg-slate-900 rounded-2xl p-6 text-white">
              <div className="text-4xl mb-3">🤝</div>
              <div className="font-display font-bold text-lg mb-1">8 Brand Partners</div>
              <div className="text-slate-400 text-sm">Authorised by leading global brands</div>
            </div>
            <div className="bg-slate-900 rounded-2xl p-6 text-white">
              <div className="text-4xl mb-3">⚡</div>
              <div className="font-display font-bold text-lg mb-1">Same-Day Fix</div>
              <div className="text-slate-400 text-sm">Most repairs completed the same day</div>
            </div>
            <div className="bg-gradient-to-br from-green-600 to-green-800 rounded-2xl p-6 text-white">
              <div className="text-4xl mb-3">✅</div>
              <div className="font-display font-bold text-lg mb-1">90-Day Guarantee</div>
              <div className="text-green-200 text-sm">Every repair backed by our warranty</div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <SectionHeading label="Mission & Vision" title={<>What Drives <span className="text-blue-600">Everything We Do</span></>} />
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {[
              {icon:"🎯",title:"Our Mission",text:"To deliver fast, honest and affordable electronics service that keeps every home running smoothly — backed by certified expertise and genuine parts.",c:"border-blue-100 bg-blue-50"},
              {icon:"🌟",title:"Our Vision",text:"To be Tamil Nadu's most trusted electronics service partner — expanding our reach while maintaining the personal touch of a family business.",c:"border-amber-100 bg-amber-50"},
              {icon:"❤️",title:"Our Values",text:"Honesty in pricing. Expertise in service. Respect for every customer. These aren't just words — they're how we've operated since Day 1.",c:"border-green-100 bg-green-50"},
            ].map(item => (
              <div key={item.title} className={`fade-up border rounded-2xl p-7 ${item.c}`}>
                <div className="text-4xl mb-4">{item.icon}</div>
                <h3 className="font-display font-bold text-slate-900 text-xl mb-3">{item.title}</h3>
                <p className="text-slate-600 leading-relaxed text-sm">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <SectionHeading label="Our Team" title={<>Meet the People<br/><span className="text-blue-600">Behind the Service</span></>} />
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-5">
            {[
              {name:"Arumugam Raj",role:"Founder & CEO",emoji:"👨‍💼"},
              {name:"Priya Arumugam",role:"Operations Manager",emoji:"👩‍💼"},
              {name:"Karthik Selvam",role:"Lead Technician",emoji:"👨‍🔧"},
              {name:"Suresh Kumar",role:"Customer Relations",emoji:"👨‍💻"},
            ].map((m,i) => (
              <div key={i} className="fade-up bg-slate-50 hover:bg-blue-50 border border-slate-100 hover:border-blue-100 rounded-2xl p-6 text-center transition-all group" style={{transitionDelay:`${i*60}ms`}}>
                <div className="w-16 h-16 bg-white border border-slate-200 rounded-2xl flex items-center justify-center text-3xl mx-auto mb-4 shadow-sm group-hover:scale-110 transition-transform">{m.emoji}</div>
                <div className="font-display font-bold text-slate-900 text-sm">{m.name}</div>
                <div className="text-blue-600 text-xs font-semibold mt-0.5">{m.role}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTASection setPage={setPage}/>
    </main>
  );
}

// CONTACT PAGE
function ContactPage() {
  useScrollReveal();
  const [form, setForm] = useState({name:"",phone:"",email:"",service:"",msg:""});
  const [sent, setSent] = useState(false);
  const set = (k,v) => setForm(f => ({...f,[k]:v}));
  const submit = () => { if (form.name && form.phone) setSent(true); };

  return (
    <main className="pt-16">
      <div className="bg-slate-900 py-16 px-4 relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.04]" style={{backgroundImage:"linear-gradient(#60a5fa 1px,transparent 1px),linear-gradient(90deg,#60a5fa 1px,transparent 1px)",backgroundSize:"50px 50px"}}/>
        <div className="relative max-w-7xl mx-auto text-center">
          <span className="inline-flex items-center gap-2 bg-blue-500/20 border border-blue-400/30 text-blue-300 text-xs font-semibold tracking-widest uppercase px-4 py-2 rounded-full mb-5">Get In Touch</span>
          <h1 className="font-display text-4xl sm:text-5xl font-bold text-white mb-4">Contact Us</h1>
          <p className="text-slate-400 text-lg max-w-xl mx-auto">Call, WhatsApp or fill our form. We respond within 2 hours during business hours.</p>
        </div>
      </div>

      <section className="py-16 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 grid lg:grid-cols-3 gap-8">
          {/* Info */}
          <div className="space-y-4">
            {[
              {icon:"📍",title:"Store Address",lines:["42, Main Bazaar Road,","Tiruppur – 641601, Tamil Nadu"],c:"border-blue-100 bg-blue-50",ic:"bg-blue-100 text-blue-600"},
              {icon:"📞",title:"Phone / Call",lines:["+91 98765 43210"],href:"tel:+919876543210",c:"border-green-100 bg-green-50",ic:"bg-green-100 text-green-600"},
              {icon:"✉️",title:"Email",lines:["service@arelectronics.in"],href:"mailto:service@arelectronics.in",c:"border-violet-100 bg-violet-50",ic:"bg-violet-100 text-violet-600"},
              {icon:"⏰",title:"Working Hours",lines:["Mon–Sat: 9AM – 8PM","Sunday: 10AM – 5PM"],c:"border-amber-100 bg-amber-50",ic:"bg-amber-100 text-amber-600"},
            ].map(info => (
              <div key={info.title} className={`border rounded-2xl p-5 ${info.c}`}>
                <div className="flex items-start gap-4">
                  <div className={`w-11 h-11 rounded-xl ${info.ic} flex items-center justify-center text-xl flex-shrink-0`}>{info.icon}</div>
                  <div>
                    <div className="font-display font-bold text-slate-800 text-sm mb-1">{info.title}</div>
                    {info.lines.map((l,j) => (
                      info.href && j===0 ? <a key={j} href={info.href} className="block text-blue-600 font-semibold hover:underline text-sm">{l}</a>
                      : <div key={j} className="text-slate-600 text-sm">{l}</div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
            <div className="bg-green-600 hover:bg-green-500 rounded-2xl p-5 text-white flex items-center gap-4 transition-colors cursor-pointer" onClick={() => window.open("https://wa.me/919876543210","_blank")}>
              <div className="w-11 h-11 bg-white/20 rounded-xl flex items-center justify-center text-2xl flex-shrink-0">
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
              </div>
              <div>
                <div className="font-display font-bold">WhatsApp Us</div>
                <div className="text-green-200 text-sm">Quick response guaranteed</div>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-7 sm:p-9">
              <h2 className="font-display font-bold text-slate-900 text-2xl mb-1">Send an Enquiry</h2>
              <p className="text-slate-400 text-sm mb-7">We'll call you back within 2 hours. Fields marked * are required.</p>
              {sent ? (
                <div className="text-center py-12">
                  <div className="text-6xl mb-4">✅</div>
                  <h3 className="font-display font-bold text-slate-900 text-2xl mb-2">Enquiry Sent!</h3>
                  <p className="text-slate-500 text-sm mb-1">Thank you, <strong>{form.name}</strong>!</p>
                  <p className="text-slate-500 text-sm">We'll call you at <strong>{form.phone}</strong> within 2 hours.</p>
                  <button onClick={() => { setSent(false); setForm({name:"",phone:"",email:"",service:"",msg:""}); }} className="mt-6 text-blue-600 font-semibold text-sm hover:underline">Send another enquiry</button>
                </div>
              ) : (
                <div className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-xs font-bold text-slate-500 uppercase tracking-wide mb-2">Full Name *</label>
                      <input value={form.name} onChange={e => set("name",e.target.value)} placeholder="e.g. Rajesh Kumar"
                        className="w-full border border-slate-200 bg-slate-50 rounded-xl px-4 py-3 text-sm text-slate-800 placeholder-slate-400 outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 focus:bg-white transition-all"/>
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-500 uppercase tracking-wide mb-2">Phone Number *</label>
                      <input value={form.phone} onChange={e => set("phone",e.target.value)} placeholder="+91 98765 43210"
                        className="w-full border border-slate-200 bg-slate-50 rounded-xl px-4 py-3 text-sm text-slate-800 placeholder-slate-400 outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 focus:bg-white transition-all"/>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-xs font-bold text-slate-500 uppercase tracking-wide mb-2">Email Address</label>
                      <input value={form.email} onChange={e => set("email",e.target.value)} placeholder="you@example.com"
                        className="w-full border border-slate-200 bg-slate-50 rounded-xl px-4 py-3 text-sm text-slate-800 placeholder-slate-400 outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 focus:bg-white transition-all"/>
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-500 uppercase tracking-wide mb-2">Service Required</label>
                      <select value={form.service} onChange={e => set("service",e.target.value)}
                        className="w-full border border-slate-200 bg-slate-50 rounded-xl px-4 py-3 text-sm text-slate-800 outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 focus:bg-white transition-all">
                        <option value="">Select a service...</option>
                        {SERVICES.map(s => <option key={s.title} value={s.title}>{s.title}</option>)}
                        <option value="Other">Other / General Enquiry</option>
                      </select>
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-wide mb-2">Describe Your Issue</label>
                    <textarea value={form.msg} onChange={e => set("msg",e.target.value)} rows={4}
                      placeholder="Tell us what's wrong with your appliance — brand, model, problem description..."
                      className="w-full border border-slate-200 bg-slate-50 rounded-xl px-4 py-3 text-sm text-slate-800 placeholder-slate-400 outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 focus:bg-white transition-all resize-none"/>
                  </div>
                  <div className="flex gap-3 pt-1">
                    <button onClick={submit}
                      className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3.5 rounded-xl transition-all shadow-lg shadow-blue-100 hover:shadow-blue-200 active:scale-[.98]">
                      Submit Enquiry →
                    </button>
                    <a href="https://wa.me/919876543210" target="_blank" rel="noreferrer"
                      className="bg-green-500 hover:bg-green-600 text-white font-bold px-5 py-3.5 rounded-xl transition-all flex items-center gap-2">
                      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                    </a>
                  </div>
                  <p className="text-slate-400 text-xs text-center">🔒 Your information is safe. We never share your data with third parties.</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Map */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 mt-8">
          <div className="bg-gradient-to-br from-blue-50 to-slate-100 rounded-2xl border border-slate-200 flex flex-col sm:flex-row items-center justify-between p-7 gap-5">
            <div className="flex items-center gap-5">
              <div className="w-14 h-14 bg-blue-600 rounded-2xl flex items-center justify-center text-white text-3xl shadow-lg">📍</div>
              <div>
                <div className="font-display font-bold text-slate-900 text-lg">AR Electronics Service Centre</div>
                <div className="text-slate-500 text-sm mt-0.5">42, Main Bazaar Road, Tiruppur – 641601, Tamil Nadu, India</div>
              </div>
            </div>
            <a href="https://maps.google.com/?q=Tiruppur+Tamil+Nadu" target="_blank" rel="noreferrer"
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm px-6 py-3 rounded-xl transition-colors shadow-md whitespace-nowrap flex-shrink-0">
              Get Directions →
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}

// ─── ENQUIRY MODAL ────────────────────────────────────────────────────────────
function EnquiryModal({ service, onClose }) {
  const [form, setForm] = useState({name:"",phone:"",service: service||"",msg:""});
  const [sent, setSent] = useState(false);
  const set = (k,v) => setForm(f => ({...f,[k]:v}));
  useEffect(() => { document.body.style.overflow = "hidden"; return () => { document.body.style.overflow = ""; }; }, []);
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-slate-900/70 backdrop-blur-sm" onClick={onClose}/>
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md p-7 z-10">
        <button onClick={onClose} className="absolute top-4 right-4 w-8 h-8 rounded-lg bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-500 transition-colors">×</button>
        {sent ? (
          <div className="text-center py-8">
            <div className="text-5xl mb-3">✅</div>
            <h3 className="font-display font-bold text-slate-900 text-xl mb-2">Enquiry Sent!</h3>
            <p className="text-slate-500 text-sm">We'll call you at <strong>{form.phone}</strong> within 2 hours.</p>
            <button onClick={onClose} className="mt-5 bg-blue-600 text-white font-semibold px-6 py-2.5 rounded-xl">Close</button>
          </div>
        ) : (
          <>
            <h2 className="font-display font-bold text-slate-900 text-xl mb-1">Quick Enquiry</h2>
            <p className="text-slate-400 text-xs mb-6">We'll call you back within 2 hours.</p>
            <div className="space-y-4">
              <input value={form.name} onChange={e => set("name",e.target.value)} placeholder="Your name *"
                className="w-full border border-slate-200 bg-slate-50 rounded-xl px-4 py-3 text-sm outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition-all"/>
              <input value={form.phone} onChange={e => set("phone",e.target.value)} placeholder="Phone number *"
                className="w-full border border-slate-200 bg-slate-50 rounded-xl px-4 py-3 text-sm outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition-all"/>
              <select value={form.service} onChange={e => set("service",e.target.value)}
                className="w-full border border-slate-200 bg-slate-50 rounded-xl px-4 py-3 text-sm outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition-all">
                <option value="">Select service</option>
                {SERVICES.map(s => <option key={s.title} value={s.title}>{s.title}</option>)}
              </select>
              <textarea value={form.msg} onChange={e => set("msg",e.target.value)} rows={3} placeholder="Brief description of issue..."
                className="w-full border border-slate-200 bg-slate-50 rounded-xl px-4 py-3 text-sm outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition-all resize-none"/>
              <div className="flex gap-3">
                <button onClick={() => { if(form.name&&form.phone) setSent(true); }}
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-xl transition-all shadow-md">
                  Send Enquiry
                </button>
                <a href="https://wa.me/919876543210" target="_blank" rel="noreferrer"
                  className="bg-green-500 hover:bg-green-600 text-white font-bold px-4 py-3 rounded-xl transition-all flex items-center">
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                </a>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

// ─── APP ──────────────────────────────────────────────────────────────────────
export default function App() {
  const [page, setPage] = useState("Home");
  const [modal, setModal] = useState(null);

  const navigate = (p) => {
    setPage(p);
    window.scrollTo({top:0,behavior:"smooth"});
  };

  const openEnquiry = (service = "") => setModal(service);

  const renderPage = () => {
    switch (page) {
      case "Home":     return <HomePage setPage={navigate} onEnquire={openEnquiry}/>;
      case "Services": return <ServicesPage onEnquire={openEnquiry}/>;
      case "Brands":   return <BrandsPage/>;
      case "About":    return <AboutPage setPage={navigate}/>;
      case "Contact":  return <ContactPage/>;
      default:         return <HomePage setPage={navigate} onEnquire={openEnquiry}/>;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-white text-slate-900 antialiased">
      <FontLoader/>
      <Navbar activePage={page} setPage={navigate}/>
      <div className="flex-1">{renderPage()}</div>
      <Footer setPage={navigate}/>

      {/* Floating WhatsApp */}
      <a href="https://wa.me/919876543210?text=Hi! I need electronics service."
        target="_blank" rel="noreferrer"
        className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-green-500 hover:bg-green-400 text-white rounded-full shadow-2xl shadow-green-400/40 flex items-center justify-center transition-all hover:scale-110"
        aria-label="WhatsApp">
        <svg className="w-7 h-7" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
      </a>

      {/* Enquiry modal */}
      {modal !== null && <EnquiryModal service={modal} onClose={() => setModal(null)}/>}
    </div>
  );
}