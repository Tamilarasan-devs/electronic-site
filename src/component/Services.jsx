import React, { useEffect, useRef, useState } from "react";
import {
  MonitorOff, VolumeX, Zap, AlignJustify, Minus, Pause, Camera,
  Radio, Wifi, Bluetooth, Monitor, Volume2, AlertTriangle, Activity,
  AppWindow, Lightbulb, Layout, ChevronRight, ArrowUpRight, Phone,
  CalendarCheck, Wrench, ShieldCheck
} from "lucide-react";

/* ─── DATA ─── */
const tvProblems = [
  { id: 1,  icon: MonitorOff,     title: "No Video",         short: "Blank or black screen with no image displayed",              desc: "Your TV powers on, the backlight may even glow, but nothing appears on screen. This is typically caused by a failed T-CON board, damaged panel ribbons, faulty main board signal output, or a dead LCD/LED panel itself.",           fix: "T-CON Board · Main Board · Panel Ribbon" },
  { id: 2,  icon: VolumeX,        title: "No Audio",         short: "Picture is visible but there's complete silence",            desc: "The screen displays fine but there's no sound at all — not even system beeps. Common causes include a blown audio amplifier IC, failed speaker drivers, a faulty main board audio circuit, or damaged speaker connections.",         fix: "Audio IC · Speaker Driver · Main Board" },
  { id: 3,  icon: Zap,            title: "Dead Issue",       short: "TV shows absolutely no signs of life",                      desc: "The TV won't power on at all — no standby light, no response to remote or power button. Usually caused by a failed power supply board, blown fuse, damaged SMPS components, or a short circuit in the power rail.",              fix: "Power Board · SMPS · Fuse · Capacitors" },
  { id: 4,  icon: AlignJustify,   title: "Display Lines",    short: "Horizontal or vertical lines running across the screen",    desc: "Thin or thick lines — horizontal, vertical, or both — running across your display. These are caused by damaged panel column/row drivers, broken LCD cell connections, faulty T-CON board output, or damaged panel ribbon cables.",      fix: "T-CON Board · FPC Ribbon · Panel Driver" },
  { id: 5,  icon: Minus,          title: "Display Bar",      short: "A thick band or bar of distorted color on screen",          desc: "A thick solid bar — often white, black, or a washed-out color — appears in a fixed position. This is typically caused by a cracked or delaminated panel section, a broken gate driver IC, or a partial T-CON failure.",          fix: "Panel Gate Driver · T-CON · Panel Section" },
  { id: 6,  icon: Camera,         title: "Still Picture",    short: "Image freezes as a static frame on the screen",             desc: "The display gets stuck on a single frozen frame while audio may continue playing. Caused by a failing main board processor, corrupted firmware, overheating SoC, or RAM issues on the main board.",                                 fix: "Main Board · Firmware · SoC · RAM" },
  { id: 7,  icon: Pause,          title: "Freezing Picture", short: "Screen stutters, skips frames, or intermittently freezes",  desc: "Unlike a completely still picture, this issue involves the image periodically stuttering or freezing then resuming. Often linked to failing NAND flash memory, degraded eMMC storage, or unstable power delivery to the processor.", fix: "NAND Flash · eMMC · Power Rail · OS" },
  { id: 8,  icon: Radio,          title: "Audio Noise",      short: "Crackling, humming, buzzing or distorted sound",            desc: "Audio plays but is corrupted by crackling, static, humming, or intermittent distortion. Caused by failing electrolytic capacitors near the audio circuit, a degraded audio amplifier chip, or interference from a faulty power board.", fix: "Capacitors · Audio Amp IC · Power Board" },
];

const otherProblems = [
  { id: 9,  icon: Wifi,           title: "WiFi Not Connecting", short: "TV can't find or connect to your wireless network",       desc: "The TV sees no networks or connects briefly then drops. Caused by a failed WiFi module, corrupted network firmware, or damaged antenna traces. We replace the WiFi/BT combo module or reflash network firmware.",                        fix: "WiFi Module · Antenna · Firmware" },
  { id: 10, icon: Bluetooth,      title: "Bluetooth Issue",     short: "Cannot pair speakers, remotes or headphones via BT",      desc: "Bluetooth devices won't pair or stay connected. Usually a faulty shared WiFi/BT chip or a software stack issue. We diagnose whether it's hardware module failure or a firmware corruption.",                                         fix: "BT Module · Firmware · BT Stack" },
  { id: 11, icon: Monitor,        title: "Video OK, No Audio",  short: "Crystal clear picture but sound is completely missing",   desc: "A specific variant of audio failure where display works perfectly but audio is absent. Typically points to a blown audio output stage, disconnected speaker harness, or a software audio routing issue.",                             fix: "Audio Output IC · Speaker Harness · Firmware" },
  { id: 12, icon: Volume2,        title: "Audio OK, No Video",  short: "Sound plays fine but the screen stays dark",              desc: "You can hear audio and menus respond, but the screen is completely dark. Backlight failure is the most common cause — the backlight inverter, LED driver board, or LED strip itself has failed.",                                  fix: "LED Backlight · Inverter · LED Driver Board" },
  { id: 13, icon: Zap,            title: "Short Circuit",       short: "TV trips breakers or smells of burning",                  desc: "A shorted component on the power board or main board causes the fuse to blow, trips the circuit breaker, or produces a burning smell. Shorted MOSFETs, capacitors, or diodes are common culprits.",                               fix: "MOSFET · Capacitor · Diode · Power Rail" },
  { id: 14, icon: AlertTriangle,  title: "High Voltage",        short: "Excessive voltage causing component stress or failure",   desc: "High-voltage faults in the SMPS section cause cascading failures — popped capacitors, burnt resistors, or fried ICs. These repairs require specialized equipment and safety protocols.",                                            fix: "SMPS · Capacitors · Regulators · HV ICs" },
  { id: 15, icon: AppWindow,      title: "Logo Hanging",        short: "TV gets stuck at the brand logo and won't boot",          desc: "The startup logo appears and the TV just hangs there indefinitely. This points to a corrupted bootloader, failed eMMC storage, or a damaged OS partition. A firmware re-flash resolves this.",                                    fix: "eMMC · Bootloader · OS Partition · Firmware" },
  { id: 16, icon: Activity,       title: "Software Update",     short: "TV fails during or after a firmware update",              desc: "An interrupted or failed OTA update can leave the TV bricked — stuck in a boot loop or unresponsive. We perform a clean firmware installation using manufacturer tools and service mode access.",                                 fix: "OTA Recovery · Firmware Flash · Service Mode" },
  { id: 17, icon: Zap,            title: "Booting Problem",     short: "TV restarts repeatedly or fails to fully boot",           desc: "The TV enters a boot loop, restarts randomly, or hangs mid-boot before reaching the home screen. Caused by failing power rails, corrupted system files, or a marginal main board component.",                                      fix: "Power Rail · System Files · Main Board" },
  { id: 18, icon: Lightbulb,      title: "Backlight Problem",   short: "Screen is dark or has uneven brightness patches",         desc: "The panel content is there (visible with a torch) but the screen is dark, has dim patches, or flickers. LED strips degrade over time — individual LEDs fail, causing uneven illumination.",                                     fix: "LED Strips · LED Driver · Backlight Zones" },
  { id: 19, icon: Layout,         title: "Display Problem",     short: "Discoloration, artifacts, ghosting on screen",            desc: "A broad category covering color bleed, ghosting, burn-in, screen tinting, or random pixel failures. Root causes vary — aging panel, T-CON miscalibration, panel driver failure, or excessive heat damage.",                    fix: "Panel · T-CON · Calibration · Pixel Repair" },
];

/* ─── HOOKS ─── */
function useInView(threshold = 0.1) {
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

/* ─── SERVICE CARD ─── */
function ServiceCard({ item, index, inView }) {
  const [hov, setHov] = useState(false);
  const [exp, setExp] = useState(false);
  const Icon = item.icon;

  return (
    <div
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      onClick={() => setExp(!exp)}
      className="relative rounded-2xl cursor-pointer overflow-hidden"
      style={{
        background: hov ? "#890b44" : "#fff",
        border: `1.5px solid ${hov ? "#890b44" : "rgba(137,11,68,0.12)"}`,
        boxShadow: hov
          ? "0 24px 60px rgba(137,11,68,0.28), 0 0 0 1px #890b44"
          : "0 2px 16px rgba(0,0,0,0.06)",
        transition: "transform .42s cubic-bezier(.22,1,.36,1), box-shadow .42s, background .3s, border-color .3s",
        transform: hov ? "translateY(-8px) scale(1.02)" : "translateY(0)",
        opacity: inView ? 1 : 0,
        transitionDelay: inView ? `${index * 55}ms` : "0ms",
        padding: "28px",
      }}
    >
      {/* Top accent stripe */}
      <div className="absolute top-0 left-0 right-0 h-[3px] rounded-t-2xl"
        style={{
          background: hov ? "rgba(255,255,255,0.35)" : "linear-gradient(90deg,#890b44,#890b4466)",
          transform: hov ? "scaleX(1)" : "scaleX(0.4)",
          transformOrigin: "left",
          transition: "transform .4s cubic-bezier(.22,1,.36,1), background .3s",
        }} />

      {/* Shimmer on hover */}
      <div className="absolute inset-0 pointer-events-none"
        style={{
          background: "linear-gradient(105deg,transparent 35%,rgba(255,255,255,0.1) 50%,transparent 65%)",
          transform: hov ? "translateX(100%)" : "translateX(-100%)",
          transition: "transform .6s ease",
        }} />

      {/* Number watermark */}
      <span className="absolute bottom-1 right-3 text-[80px] leading-none select-none pointer-events-none font-black"
        style={{ color: hov ? "rgba(255,255,255,0.07)" : "rgba(137,11,68,0.05)", transition: "color .3s" }}>
        {String(item.id).padStart(2, "0")}
      </span>

      {/* Top row */}
      <div className="flex items-start justify-between mb-5">
        <div className="w-11 h-11 rounded-xl flex-shrink-0 flex items-center justify-center"
          style={{
            background: hov ? "rgba(255,255,255,0.15)" : "rgba(137,11,68,0.08)",
            border: `1px solid ${hov ? "rgba(255,255,255,0.25)" : "rgba(137,11,68,0.15)"}`,
            transition: "all .4s cubic-bezier(.22,1,.36,1)",
            transform: hov ? "rotate(-8deg) scale(1.12)" : "none",
          }}>
          <Icon size={19} color={hov ? "#fff" : "#890b44"} />
        </div>
        <div className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0"
          style={{
            background: hov ? "rgba(255,255,255,0.15)" : "rgba(137,11,68,0.08)",
            border: `1px solid ${hov ? "rgba(255,255,255,0.2)" : "rgba(137,11,68,0.12)"}`,
            transition: "all .35s",
            transform: exp ? "rotate(90deg)" : "rotate(0deg)",
          }}>
          <ChevronRight size={13} color={hov ? "#fff" : "#890b44"} />
        </div>
      </div>

      {/* Title */}
      <h3 className="text-[18px] tracking-[2px] mb-1.5 uppercase font-black"
        style={{ color: hov ? "#fff" : "#111", transition: "color .3s" }}>
        {item.title}
      </h3>

      {/* Short desc */}
      <p className="text-[12.5px] leading-[1.65] font-normal mb-4"
        style={{ color: hov ? "rgba(255,255,255,0.72)" : "rgba(0,0,0,0.45)", transition: "color .3s" }}>
        {item.short}
      </p>

      {/* Expanded */}
      <div className="overflow-hidden"
        style={{ maxHeight: exp ? 260 : 0, transition: "max-height .45s cubic-bezier(.22,1,.36,1)" }}>
        <p className="text-[13px] leading-[1.75] mb-4 pt-4"
          style={{
            color: hov ? "rgba(255,255,255,0.65)" : "rgba(0,0,0,0.55)",
            borderTop: `1px solid ${hov ? "rgba(255,255,255,0.15)" : "rgba(137,11,68,0.1)"}`,
            transition: "color .3s, border-color .3s",
          }}>
          {item.desc}
        </p>
      </div>

      {/* Fix tags */}
      <div className="relative z-10 flex flex-wrap gap-1.5 mt-auto">
        {item.fix.split(" · ").map(tag => (
          <span key={tag} className="text-[9px] font-bold tracking-[2px] uppercase rounded-full px-2.5 py-1"
            style={{
              background: hov ? "rgba(255,255,255,0.15)" : "rgba(137,11,68,0.07)",
              border: `1px solid ${hov ? "rgba(255,255,255,0.2)" : "rgba(137,11,68,0.15)"}`,
              color: hov ? "rgba(255,255,255,0.85)" : "#890b44",
              transition: "all .3s",
            }}>
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
}

/* ─── SECTION HEADER ─── */
function SectionHeader({ eyebrow, title, highlight, subtitle, inView, dark = false }) {
  return (
    <div className="text-center flex flex-col items-center gap-3 mb-14"
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : "translateY(32px)",
        transition: "opacity .75s cubic-bezier(.22,1,.36,1), transform .75s cubic-bezier(.22,1,.36,1)",
      }}>
      <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border"
        style={{
          background: dark ? "rgba(137,11,68,0.12)" : "rgba(137,11,68,0.06)",
          borderColor: "rgba(137,11,68,0.25)",
        }}>
        <span className="w-1.5 h-1.5 rounded-full flex-shrink-0 bg-[#890b44]" />
        <span className="text-[10px] font-black tracking-[5px] uppercase text-[#890b44]">{eyebrow}</span>
      </div>
      <h2 className="leading-none tracking-[5px] m-0 font-black"
        style={{ fontSize: "clamp(40px,6.5vw,76px)", color: dark ? "#fff" : "#111" }}>
        {title}{" "}
        <span className="text-[#890b44]">{highlight}</span>
      </h2>
      {subtitle && (
        <p className="m-0 text-[15px] max-w-[500px] leading-[1.7]"
          style={{ color: dark ? "rgba(255,255,255,0.5)" : "rgba(0,0,0,0.45)" }}>
          {subtitle}
        </p>
      )}
    </div>
  );
}

/* ─── STAT PILL ─── */
function StatPill({ number, label }) {
  return (
    <div className="flex flex-col items-center gap-1 px-8 py-5 rounded-2xl"
      style={{ background: "rgba(137,11,68,0.06)", border: "1px solid rgba(137,11,68,0.12)" }}>
      <span className="text-[36px] font-black leading-none text-[#890b44]">{number}</span>
      <span className="text-[10px] font-bold tracking-[3px] uppercase" style={{ color: "rgba(0,0,0,0.45)" }}>{label}</span>
    </div>
  );
}

/* ─── MAIN ─── */
export default function Services() {
  const [h1Ref, h1InView] = useInView(0.2);
  const [g1Ref, g1InView] = useInView(0.05);
  const [h2Ref, h2InView] = useInView(0.2);
  const [g2Ref, g2InView] = useInView(0.05);
  const [ctaRef, ctaInView] = useInView(0.2);
  const [statsRef, statsInView] = useInView(0.2);

  return (
    <>
      <style>{`
      

        @keyframes fadeUp     { from{opacity:0;transform:translateY(48px)} to{opacity:1;transform:none} }
        @keyframes divGrow    { from{transform:scaleX(0)} to{transform:scaleX(1)} }
        @keyframes ctaShimmer { 0%{transform:translateX(-100%) skewX(-20deg)} 100%{transform:translateX(350%) skewX(-20deg)} }
        @keyframes floatY     { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-12px)} }
        @keyframes spinSlow   { from{transform:rotate(0)} to{transform:rotate(360deg)} }
        @keyframes pulse      { 0%,100%{opacity:0.4} 50%{opacity:1} }

        .ha1 { animation: fadeUp .9s cubic-bezier(.16,1,.3,1) .05s both; font-family:'Syne',sans-serif; }
        .ha2 { animation: fadeUp .9s cubic-bezier(.16,1,.3,1) .18s both; font-family:'Syne',sans-serif; }
        .ha3 { animation: fadeUp .9s cubic-bezier(.16,1,.3,1) .32s both; }
        .ha4 { animation: fadeUp .9s cubic-bezier(.16,1,.3,1) .46s both; }
        .ha5 { animation: fadeUp .9s cubic-bezier(.16,1,.3,1) .6s  both; }

        .hero-underline {
          position:absolute; bottom:-5px; left:0; right:0; height:5px; border-radius:9999px;
          background: linear-gradient(90deg,#890b44,#e05590);
          transform-origin:left;
          animation: divGrow 1s cubic-bezier(.22,1,.36,1) .7s both;
        }

        .float-shape { animation: floatY 6s ease-in-out infinite; }
        .spin-shape  { animation: spinSlow 25s linear infinite; }
        .pulse-dot   { animation: pulse 2.5s ease-in-out infinite; }

        .cta-shimmer {
          position:absolute; top:0; bottom:0; width:80px;
          background:linear-gradient(90deg,transparent,rgba(255,255,255,0.06),transparent);
          animation:ctaShimmer 5s ease-in-out infinite;
        }

        .btn-primary {
          display:inline-flex; align-items:center; gap:8px;
          padding:14px 30px; border-radius:9999px;
          font-family:'DM Sans',sans-serif;
          font-size:11.5px; font-weight:700; letter-spacing:3px; text-transform:uppercase;
          color:#fff; border:none; cursor:pointer; overflow:hidden; position:relative;
          background: #890b44;
          box-shadow:0 10px 32px rgba(137,11,68,0.35);
          transition:transform .3s cubic-bezier(.22,1,.36,1), box-shadow .3s;
        }
        .btn-primary::after {
          content:''; position:absolute; inset:0;
          background:linear-gradient(105deg,transparent 35%,rgba(255,255,255,0.15) 50%,transparent 65%);
          transform:translateX(-100%); transition:transform .5s;
        }
        .btn-primary:hover { transform:translateY(-3px); box-shadow:0 16px 44px rgba(137,11,68,0.45); }
        .btn-primary:hover::after { transform:translateX(100%); }

        .btn-outline {
          display:inline-flex; align-items:center; gap:8px;
          padding:14px 26px; border-radius:9999px;
          font-family:'DM Sans',sans-serif;
          font-size:11.5px; font-weight:700; letter-spacing:3px; text-transform:uppercase;
          cursor:pointer; background:#fff; color:#890b44; border:2px solid #890b44;
          transition:transform .3s cubic-bezier(.22,1,.36,1), box-shadow .3s, background .3s;
        }
        .btn-outline:hover { transform:translateY(-3px); background:#fdf0f5; box-shadow:0 10px 30px rgba(137,11,68,0.15); }
        .btn-outline svg { transition:transform .3s cubic-bezier(.22,1,.36,1); }
        .btn-outline:hover svg { transform:translateX(4px); }

        .cta-btn-white {
          display:inline-flex; align-items:center; gap:8px;
          padding:14px 28px; border-radius:12px;
          background:#fff; color:#890b44; border:none;
          font-family:'DM Sans',sans-serif;
          font-size:11.5px; font-weight:700; letter-spacing:3px; text-transform:uppercase;
          cursor:pointer; white-space:nowrap;
          box-shadow:0 8px 24px rgba(0,0,0,0.15);
          transition:transform .3s, box-shadow .3s;
        }
        .cta-btn-white:hover { transform:translateY(-3px); box-shadow:0 14px 36px rgba(0,0,0,0.22); }

        .cta-btn-ghost {
          display:inline-flex; align-items:center; gap:8px;
          padding:14px 28px; border-radius:12px;
          color:rgba(255,255,255,0.85); border:1.5px solid rgba(255,255,255,0.25);
          background:rgba(255,255,255,0.1);
          font-family:'DM Sans',sans-serif;
          font-size:11.5px; font-weight:700; letter-spacing:3px; text-transform:uppercase;
          cursor:pointer; white-space:nowrap; backdrop-filter:blur(8px);
          transition:background .3s, transform .3s;
        }
        .cta-btn-ghost:hover { background:rgba(255,255,255,0.18); transform:translateY(-3px); }

        .dot-grid {
          background-image: radial-gradient(circle, rgba(137,11,68,0.08) 1px, transparent 1px);
          background-size: 30px 30px;
        }

        .cross-grid {
          background-image:
            linear-gradient(rgba(137,11,68,0.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(137,11,68,0.04) 1px, transparent 1px);
          background-size: 48px 48px;
        }

        h1, h2, h3 { font-family: 'Syne', sans-serif; }
        .eyebrow-tag { font-family: 'DM Sans', sans-serif; }
      `}</style>

      <div className="relative overflow-x-hidden" style={{ background: "#fff", minHeight: "100vh", color: "#111" }}>

        {/* Subtle dot grid BG */}
        <div className="dot-grid fixed inset-0 pointer-events-none z-0" />

        {/* Top accent bar */}
        <div className="relative z-10 h-[3px]"
          style={{ background: "linear-gradient(90deg, #890b44, #111, #890b44, #111)" }} />

        {/* Warm crimson glow top-right */}
        <div className="fixed top-0 right-0 w-[600px] h-[500px] rounded-full pointer-events-none z-0"
          style={{ background: "radial-gradient(ellipse at top right, rgba(137,11,68,0.08) 0%, transparent 65%)", filter: "blur(60px)" }} />
        <div className="fixed bottom-0 left-0 w-[400px] h-[400px] rounded-full pointer-events-none z-0"
          style={{ background: "radial-gradient(ellipse at bottom left, rgba(137,11,68,0.05) 0%, transparent 60%)", filter: "blur(80px)" }} />

        {/* Floating decorative shapes */}
        <div className="float-shape pointer-events-none fixed top-28 right-16 hidden lg:block opacity-20 z-0">
          <div className="w-32 h-32 rounded-3xl border-2 border-[#890b44]" style={{ transform: "rotate(15deg)" }} />
        </div>
        <div className="spin-shape pointer-events-none fixed top-1/2 right-10 hidden xl:block opacity-10 z-0">
          <div className="w-48 h-48 rounded-full border border-dashed border-[#890b44]" />
        </div>
        <div className="float-shape pointer-events-none fixed bottom-48 left-10 hidden lg:block opacity-15 z-0" style={{ animationDelay: "2s" }}>
          <div className="w-16 h-16 rounded-full border-2 border-dashed border-black" />
        </div>

        <div className="relative z-10">

          {/* ── HERO ── */}
          <div className="relative px-4 sm:px-6 lg:px-8 pt-20 sm:pt-28 pb-16 sm:pb-24 text-center overflow-hidden">
            {/* Ghost word */}
            <div className="pointer-events-none select-none absolute top-2 left-1/2 -translate-x-1/2 font-black leading-none tracking-[10px] whitespace-nowrap"
              style={{ fontSize: "clamp(70px,15vw,200px)", color: "rgba(137,11,68,0.04)", fontFamily: "Syne,sans-serif" }}>
              SERVICES
            </div>

            <div className="relative max-w-3xl mx-auto">
              {/* Eyebrow badge */}
              <div className="ha1 inline-flex items-center gap-2 px-4 py-2 rounded-full mb-7 border"
                style={{ background: "rgba(137,11,68,0.06)", borderColor: "rgba(137,11,68,0.2)", boxShadow: "0 4px 18px rgba(137,11,68,0.08)" }}>
                <span className="pulse-dot w-1.5 h-1.5 rounded-full bg-[#890b44] flex-shrink-0" />
                <Wrench size={12} color="#890b44" />
                <span className="eyebrow-tag text-[10px] font-bold tracking-[5px] uppercase text-[#890b44]">Expert TV Repair</span>
              </div>

              {/* Headline */}
              <div className="ha2">
                <h1 className="font-black leading-[0.9] tracking-[3px] mb-6 uppercase"
                  style={{ fontSize: "clamp(48px,9vw,108px)", color: "#111" }}>
                  TV Problems
                  <br />
                  <span className="relative inline-block text-[#890b44]">
                    We Solve
                    <span className="hero-underline" />
                  </span>
                </h1>
              </div>

              {/* Divider line + eyebrow */}
              <div className="ha3 flex items-center justify-center gap-3 mb-5">
                <div style={{ width: 40, height: 2, background: "#111", borderRadius: 9999 }} />
                <span className="text-[10px] font-bold tracking-[4px] uppercase text-[#890b44]">Trusted Since 2014</span>
                <div style={{ width: 40, height: 2, background: "#111", borderRadius: 9999 }} />
              </div>

              <div className="ha4">
                <p className="text-[15px] sm:text-[17px] leading-[1.8] max-w-[540px] mx-auto mb-10 font-light"
                  style={{ color: "rgba(0,0,0,0.5)" }}>
                  From a completely dead TV to a stubborn software glitch — click any card to read a full explanation of the problem and how we fix it.
                </p>
              </div>

              <div className="ha5 flex items-center justify-center gap-3 flex-wrap">
                <button className="btn-primary"><Phone size={14} />Book a Repair</button>
                <button className="btn-outline"><ShieldCheck size={14} />Free Diagnosis <ArrowUpRight size={13} /></button>
              </div>
            </div>
          </div>

          {/* ── STATS BAR ── */}
          <div ref={statsRef} className="px-4 sm:px-6 lg:px-8 pb-16 max-w-[900px] mx-auto"
            style={{
              opacity: statsInView ? 1 : 0,
              transform: statsInView ? "translateY(0)" : "translateY(24px)",
              transition: "opacity .7s, transform .7s",
            }}>
            <div className="flex flex-wrap justify-center gap-4">
              <StatPill number="10+" label="Years Experience" />
              <StatPill number="5K+" label="Repairs Done" />
              <StatPill number="19" label="Problem Types" />
              <StatPill number="Free" label="Diagnosis" />
            </div>
          </div>

          {/* Separator */}
          <div className="px-4 sm:px-6 lg:px-8 max-w-[1280px] mx-auto mb-0">
            <div className="h-px" style={{ background: "linear-gradient(90deg, transparent, rgba(137,11,68,0.2), transparent)" }} />
          </div>

          {/* ── SECTION 1 — white with grid ── */}
          <div className="relative">
            <div className="cross-grid absolute inset-0 pointer-events-none opacity-70" />
            <div className="relative px-4 sm:px-6 lg:px-8 py-20 sm:py-24 max-w-[1280px] mx-auto">
              <div ref={h1Ref}>
                <SectionHeader
                  eyebrow="Core TV Issues"
                  title="TV Problems /"
                  highlight="Issues"
                  subtitle="The most common hardware and panel faults we diagnose and repair every day."
                  inView={h1InView}
                />
              </div>
              <div ref={g1Ref} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {tvProblems.map((item, i) => (
                  <ServiceCard key={item.id} item={item} index={i} inView={g1InView} />
                ))}
              </div>
            </div>
          </div>

          {/* Separator */}
          <div className="h-px mx-8" style={{ background: "linear-gradient(90deg, transparent, rgba(0,0,0,0.08), transparent)" }} />

          {/* ── SECTION 2 — light crimson tint ── */}
          <div className="relative" style={{ background: "rgba(137,11,68,0.03)" }}>
            <div className="dot-grid absolute inset-0 pointer-events-none opacity-60" />
            <div className="relative px-4 sm:px-6 lg:px-8 py-20 sm:py-24 max-w-[1280px] mx-auto">
              <div ref={h2Ref}>
                <SectionHeader
                  eyebrow="Smart TV & Electrical Issues"
                  title="Other"
                  highlight="Problems"
                  subtitle="Connectivity failures, electrical faults, software glitches, and advanced display issues."
                  inView={h2InView}
                />
              </div>
              <div ref={g2Ref} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {otherProblems.map((item, i) => (
                  <ServiceCard key={item.id} item={item} index={i} inView={g2InView} />
                ))}
              </div>
            </div>
          </div>

          {/* ── CTA ── */}
          <div ref={ctaRef} className="px-4 sm:px-6 lg:px-8 py-16 sm:py-20 max-w-[1280px] mx-auto"
            style={{
              opacity: ctaInView ? 1 : 0,
              transform: ctaInView ? "translateY(0)" : "translateY(36px)",
              transition: "opacity .8s cubic-bezier(.22,1,.36,1), transform .8s cubic-bezier(.22,1,.36,1)",
            }}>
            <div className="relative rounded-3xl overflow-hidden"
              style={{
                background: "linear-gradient(135deg, #111 0%, #1a0008 50%, #890b44 100%)",
                boxShadow: "0 40px 90px rgba(137,11,68,0.4), 0 0 0 1px rgba(137,11,68,0.3)",
              }}>
              {/* Dot texture */}
              <div className="pointer-events-none absolute inset-0"
                style={{ backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.05) 1px, transparent 1px)", backgroundSize: "22px 22px" }} />
              {/* Pink glow top-right */}
              <div className="pointer-events-none absolute top-0 right-0 w-[500px] h-[400px] rounded-full"
                style={{ background: "radial-gradient(circle at 85% 15%, rgba(224,85,144,0.25), transparent 55%)" }} />
              {/* Darker left vignette */}
              <div className="pointer-events-none absolute bottom-0 left-0 w-[350px] h-[350px] rounded-full"
                style={{ background: "radial-gradient(circle at 10% 90%, rgba(0,0,0,0.4), transparent 55%)" }} />
              <div className="cta-shimmer" />
              {/* Top accent line */}
              <div className="absolute top-0 left-0 right-0 h-px"
                style={{ background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.2), #890b44, rgba(255,255,255,0.15), transparent)" }} />
              {/* Ghost word */}
              <div className="pointer-events-none select-none absolute bottom-0 right-4 font-black leading-[0.85] tracking-[6px]"
                style={{ fontSize: "clamp(90px,15vw,190px)", color: "rgba(255,255,255,0.04)", fontFamily: "Syne,sans-serif" }}>
                FIX
              </div>

              <div className="relative px-8 sm:px-14 py-14 sm:py-16 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-10 flex-wrap">
                <div className="flex-1 min-w-0">
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border mb-5"
                    style={{ borderColor: "rgba(255,255,255,0.18)", background: "rgba(255,255,255,0.07)" }}>
                    <span className="pulse-dot w-1.5 h-1.5 rounded-full bg-[#e05590] flex-shrink-0" />
                    <span className="eyebrow-tag text-[10px] font-bold tracking-[4px] uppercase" style={{ color: "rgba(255,255,255,0.65)" }}>
                      Free Diagnosis · No Hidden Fees
                    </span>
                  </div>
                  <h2 className="font-black leading-[0.95] tracking-[3px] mb-4"
                    style={{ fontSize: "clamp(30px,4.5vw,58px)", color: "#fff" }}>
                    Seen your problem above?
                    <br />
                    <span style={{ color: "rgba(255,255,255,0.3)" }}>Let's get it fixed today.</span>
                  </h2>
                  <p className="text-[15px] max-w-[440px] leading-[1.7] font-light"
                    style={{ color: "rgba(255,255,255,0.5)" }}>
                    Call or walk in — we diagnose your TV for free and give you a clear, honest quote before any work begins.
                  </p>
                </div>
                <div className="flex flex-col sm:flex-row lg:flex-col gap-3 flex-shrink-0">
                  <button className="cta-btn-white"><Phone size={14} />Call Now</button>
                  <button className="cta-btn-ghost"><CalendarCheck size={14} />Book a Repair</button>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </>
  );
}