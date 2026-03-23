import React, { useEffect, useRef, useState } from "react";
import {
  MonitorOff, VolumeX, Zap, AlignJustify, Minus, Pause, Camera,
  Radio, Wifi, Bluetooth, Monitor, Volume2, AlertTriangle, Activity,
  AppWindow, Lightbulb, Layout, ChevronRight, ArrowUpRight, Phone,
  CalendarCheck, Wrench, ShieldCheck
} from "lucide-react";

/* ─── DATA ─── */
const tvProblems = [
  { id: 1,  icon: MonitorOff,     title: "No Video",         short: "Blank or black screen with no image displayed",              desc: "Your TV powers on, the backlight may even glow, but nothing appears on screen. This is typically caused by a failed T-CON board, damaged panel ribbons, faulty main board signal output, or a dead LCD/LED panel itself. Our technicians run a full signal-path diagnostic to pinpoint the exact failure point.",           accent: "#2563eb", light: "#eff6ff", border: "#bfdbfe", icon_bg: "#dbeafe", fix: "T-CON Board · Main Board · Panel Ribbon" },
  { id: 2,  icon: VolumeX,        title: "No Audio",         short: "Picture is visible but there's complete silence",            desc: "The screen displays fine but there's no sound at all — not even system beeps. Common causes include a blown audio amplifier IC, failed speaker drivers, a faulty main board audio circuit, or damaged speaker connections. We test all audio pathways and replace defective components.",                                 accent: "#0891b2", light: "#ecfeff", border: "#a5f3fc", icon_bg: "#cffafe", fix: "Audio IC · Speaker Driver · Main Board" },
  { id: 3,  icon: Zap,            title: "Dead Issue",       short: "TV shows absolutely no signs of life",                      desc: "The TV won't power on at all — no standby light, no response to remote or power button. Usually caused by a failed power supply board, blown fuse, damaged SMPS components, or a short circuit in the power rail. We perform a full power board analysis and component-level repair.",                                    accent: "#dc2626", light: "#fef2f2", border: "#fecaca", icon_bg: "#fee2e2", fix: "Power Board · SMPS · Fuse · Capacitors" },
  { id: 4,  icon: AlignJustify,   title: "Display Lines",    short: "Horizontal or vertical lines running across the screen",    desc: "Thin or thick lines — horizontal, vertical, or both — running across your display. These are caused by damaged panel column/row drivers, broken LCD cell connections, faulty T-CON board output, or damaged panel ribbon cables (FPC/FFC). Panel-level repair or T-CON replacement resolves most cases.",                    accent: "#7c3aed", light: "#f5f3ff", border: "#ddd6fe", icon_bg: "#ede9fe", fix: "T-CON Board · FPC Ribbon · Panel Driver" },
  { id: 5,  icon: Minus,          title: "Display Bar",      short: "A thick band or bar of distorted color on the screen",      desc: "A thick solid bar — often white, black, or a washed-out color — appears in a fixed position. This is typically caused by a cracked or delaminated panel section, a broken gate driver IC on the panel, or a partial T-CON failure. In some cases the panel is repairable; in others, replacement is required.",        accent: "#d97706", light: "#fffbeb", border: "#fde68a", icon_bg: "#fef3c7", fix: "Panel Gate Driver · T-CON · Panel Section" },
  { id: 6,  icon: Camera,         title: "Still Picture",    short: "Image freezes as a static frame on the screen",             desc: "The display gets stuck on a single frozen frame while audio may continue playing. Caused by a failing main board processor, corrupted firmware, overheating SoC, or RAM issues on the main board. A firmware re-flash or main board repair typically resolves this.",                                                       accent: "#059669", light: "#ecfdf5", border: "#a7f3d0", icon_bg: "#d1fae5", fix: "Main Board · Firmware · SoC · RAM" },
  { id: 7,  icon: Pause,          title: "Freezing Picture", short: "Screen stutters, skips frames, or intermittently freezes",  desc: "Unlike a completely still picture, this issue involves the image periodically stuttering or freezing then resuming. Often linked to failing NAND flash memory, degraded eMMC storage, unstable power delivery to the processor, or corrupted OS partitions. Can usually be repaired without full board replacement.",   accent: "#0d9488", light: "#f0fdfa", border: "#99f6e4", icon_bg: "#ccfbf1", fix: "NAND Flash · eMMC · Power Rail · OS" },
  { id: 8,  icon: Radio,          title: "Audio Noise",      short: "Crackling, humming, buzzing or distorted sound",            desc: "Audio plays but is corrupted by crackling, static, humming, or intermittent distortion. Caused by failing electrolytic capacitors near the audio circuit, a degraded audio amplifier chip, grounding issues, or interference from a faulty power board. Capacitor replacement resolves this in most cases.",           accent: "#be185d", light: "#fdf2f8", border: "#fbcfe8", icon_bg: "#fce7f3", fix: "Capacitors · Audio Amp IC · Power Board" },
];

const otherProblems = [
  { id: 9,  icon: Wifi,           title: "WiFi Not Connecting", short: "TV can't find or connect to your wireless network",          desc: "The TV sees no networks or connects briefly then drops. Caused by a failed WiFi module, corrupted network firmware, or damaged antenna traces. We replace the WiFi/BT combo module or reflash network firmware depending on diagnosis.",                                                                                         accent: "#2563eb", light: "#eff6ff", border: "#bfdbfe", icon_bg: "#dbeafe", fix: "WiFi Module · Antenna · Firmware" },
  { id: 10, icon: Bluetooth,      title: "Bluetooth Issue",     short: "Cannot pair speakers, remotes or headphones via BT",         desc: "Bluetooth devices won't pair or stay connected. Usually a faulty shared WiFi/BT chip or a software stack issue. We diagnose whether it's hardware module failure or a firmware corruption that can be resolved without hardware replacement.",                                                                      accent: "#7c3aed", light: "#f5f3ff", border: "#ddd6fe", icon_bg: "#ede9fe", fix: "BT Module · Firmware · BT Stack" },
  { id: 11, icon: Monitor,        title: "Video OK, No Audio",  short: "Crystal clear picture but sound is completely missing",      desc: "A specific variant of audio failure where display works perfectly but audio is absent. Typically points to a blown audio output stage, disconnected speaker harness, or a software audio routing issue.",                                                                                                      accent: "#0891b2", light: "#ecfeff", border: "#a5f3fc", icon_bg: "#cffafe", fix: "Audio Output IC · Speaker Harness · Firmware" },
  { id: 12, icon: Volume2,        title: "Audio OK, No Video",  short: "Sound plays fine but the screen stays dark",                 desc: "You can hear audio and menus respond, but the screen is completely dark. Backlight failure is the most common cause — the backlight inverter, LED driver board, or LED strip itself has failed. Panel and T-CON are typically intact, making this a cost-effective repair.",                                       accent: "#059669", light: "#ecfdf5", border: "#a7f3d0", icon_bg: "#d1fae5", fix: "LED Backlight · Inverter · LED Driver Board" },
  { id: 13, icon: Zap,            title: "Short Circuit",       short: "TV trips breakers or smells of burning",                    desc: "A shorted component on the power board or main board causes the fuse to blow, trips the circuit breaker, or produces a burning smell. Requires careful component-level diagnosis — shorted MOSFETs, capacitors, or diodes are common culprits.",                                                                accent: "#dc2626", light: "#fef2f2", border: "#fecaca", icon_bg: "#fee2e2", fix: "MOSFET · Capacitor · Diode · Power Rail" },
  { id: 14, icon: AlertTriangle,  title: "High Voltage",        short: "Excessive voltage causing component stress or failure",     desc: "High-voltage faults in the SMPS section cause cascading failures — popped capacitors, burnt resistors, or fried ICs. These repairs require specialized equipment and safety protocols. Our technicians are trained for high-voltage board servicing with proper isolation tools.",                                accent: "#d97706", light: "#fffbeb", border: "#fde68a", icon_bg: "#fef3c7", fix: "SMPS · Capacitors · Regulators · HV ICs" },
  { id: 15, icon: AppWindow,      title: "Logo Hanging",        short: "TV gets stuck at the brand logo and won't boot",            desc: "The startup logo appears and the TV just hangs there indefinitely. This points to a corrupted bootloader, failed eMMC storage, or a damaged OS partition. A firmware re-flash via recovery mode or eMMC reprogramming resolves this without replacing the board.",                                                 accent: "#be185d", light: "#fdf2f8", border: "#fbcfe8", icon_bg: "#fce7f3", fix: "eMMC · Bootloader · OS Partition · Firmware" },
  { id: 16, icon: Activity,       title: "Software Update",     short: "TV fails during or after a firmware update",               desc: "An interrupted or failed OTA update can leave the TV bricked — stuck in a boot loop, unresponsive, or missing features. We perform a clean firmware installation using manufacturer tools and service mode access to restore full functionality.",                                                                 accent: "#0d9488", light: "#f0fdfa", border: "#99f6e4", icon_bg: "#ccfbf1", fix: "OTA Recovery · Firmware Flash · Service Mode" },
  { id: 17, icon: Zap,            title: "Booting Problem",     short: "TV restarts repeatedly or fails to fully boot",             desc: "The TV enters a boot loop, restarts randomly, or hangs mid-boot before reaching the home screen. Caused by failing power rails during boot, corrupted system files, or a marginal main board component. Depending on the root cause, this is resolved via firmware repair or board servicing.",                     accent: "#4f46e5", light: "#eef2ff", border: "#c7d2fe", icon_bg: "#e0e7ff", fix: "Power Rail · System Files · Main Board" },
  { id: 18, icon: Lightbulb,      title: "Backlight Problem",   short: "Screen is dark or has uneven brightness patches",           desc: "The panel content is there (visible with a torch) but the screen is dark, has dim patches, or flickers. LED strips degrade over time — individual LEDs fail, causing uneven illumination. We test each LED zone, replace faulty strips, and recalibrate the driver board for uniform brightness.",                  accent: "#ca8a04", light: "#fefce8", border: "#fef08a", icon_bg: "#fef9c3", fix: "LED Strips · LED Driver · Backlight Zones" },
  { id: 19, icon: Layout,         title: "Display Problem",     short: "General screen issues — discoloration, artifacts, ghosting", desc: "A broad category covering color bleed, ghosting, burn-in, screen tinting, or random pixel failures. Root causes vary — aging panel, T-CON miscalibration, panel driver failure, or excessive heat damage. We diagnose the specific failure mode and recommend the most cost-effective repair path.",        accent: "#9333ea", light: "#faf5ff", border: "#e9d5ff", icon_bg: "#f3e8ff", fix: "Panel · T-CON · Calibration · Pixel Repair" },
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
      className="relative rounded-[22px] p-6 cursor-pointer overflow-hidden"
      style={{
        background: hov ? item.light : "#fff",
        border: `1.5px solid ${hov ? item.border : "rgba(26,58,107,0.1)"}`,
        boxShadow: hov
          ? `0 20px 50px ${item.accent}22, 0 0 0 1px ${item.border}`
          : "0 2px 14px rgba(26,58,107,0.07)",
        transition: "transform .42s cubic-bezier(.22,1,.36,1), box-shadow .42s, background .35s, border-color .35s",
        transform: hov ? "translateY(-7px) scale(1.01)" : "translateY(0)",
        opacity: inView ? 1 : 0,
        transitionDelay: inView ? `${index * 55}ms` : "0ms",
      
      }}
    >
      {/* Top accent stripe */}
      <div className="absolute top-0 left-0 right-0 h-[3px] rounded-t-[22px]"
        style={{
          background: `linear-gradient(90deg, ${item.accent}, ${item.accent}66)`,
          transform: hov ? "scaleX(1)" : "scaleX(0)",
          transformOrigin: "left",
          transition: "transform .4s cubic-bezier(.22,1,.36,1)",
        }} />

      {/* Shimmer */}
      <div className="absolute inset-0 pointer-events-none"
        style={{
          background: "linear-gradient(105deg,transparent 35%,rgba(255,255,255,.65) 50%,transparent 65%)",
          transform: hov ? "translateX(100%)" : "translateX(-100%)",
          transition: "transform .55s ease",
        }} />

      {/* Number watermark */}
      <span className="absolute bottom-1 right-3 text-[88px] leading-none select-none pointer-events-none font-black"
        style={{ color: hov ? `${item.accent}0d` : "rgba(26,58,107,0.04)", transition: "color .35s" }}>
        {String(item.id).padStart(2, "0")}
      </span>

      {/* Top row */}
      <div className="flex items-start justify-between mb-4">
        <div className="w-12 h-12 rounded-[14px] flex-shrink-0 flex items-center justify-center"
          style={{
            background: hov ? item.icon_bg : "#f5f2ed",
            border: `1px solid ${hov ? item.border : "rgba(26,58,107,0.1)"}`,
            transition: "all .4s cubic-bezier(.22,1,.36,1)",
            transform: hov ? "rotate(-7deg) scale(1.1)" : "none",
            boxShadow: hov ? `0 6px 16px ${item.accent}25` : "none",
          }}>
          <Icon size={20} color={hov ? item.accent : "#a8966e"} />
        </div>
        <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0"
          style={{
            background: hov ? `${item.accent}18` : "#f5f2ed",
            border: `1px solid ${hov ? item.border : "rgba(26,58,107,0.1)"}`,
            transition: "all .35s",
            transform: exp ? "rotate(90deg)" : "rotate(0deg)",
          }}>
          <ChevronRight size={14} color={hov ? item.accent : "#a8966e"} />
        </div>
      </div>

      {/* Title */}
      <h3 className="text-[22px] tracking-[1.5px] mb-1.5 uppercase font-black"
        style={{ color: hov ? item.accent : "#1a1a2e", transition: "color .35s" }}>
        {item.title}
      </h3>

      {/* Short */}
      <p className="text-[13px] leading-[1.65] font-normal mb-3.5"
        style={{ color: hov ? "rgba(26,26,46,0.65)" : "rgba(26,26,46,0.42)", transition: "color .35s" }}>
        {item.short}
      </p>

      {/* Expanded */}
      <div className="overflow-hidden"
        style={{ maxHeight: exp ? 300 : 0, transition: "max-height .45s cubic-bezier(.22,1,.36,1)" }}>
        <p className="text-[13.5px] leading-[1.75] font-normal mb-3.5 pt-3.5"
          style={{ color: "rgba(26,26,46,0.62)", borderTop: `1px solid ${item.border}` }}>
          {item.desc}
        </p>
      </div>

      {/* Fix tags */}
      <div className="relative z-10 flex flex-wrap gap-1.5">
        {item.fix.split(" · ").map(tag => (
          <span key={tag} className="text-[9px] font-bold tracking-[2px] uppercase rounded-full px-2.5 py-1"
            style={{
              background: hov ? `${item.accent}18` : "#f5f2ed",
              border: `1px solid ${hov ? item.border : "rgba(26,58,107,0.1)"}`,
              color: hov ? item.accent : "rgba(26,26,46,0.38)",
              transition: "all .35s",
            }}>
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
}

/* ─── SECTION HEADER ─── */
function SectionHeader({ eyebrow, title, highlight, subtitle, inView, accentColor = "#1a3a6b" }) {
  return (
    <div className="text-center flex flex-col items-center gap-3.5 mb-12"
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : "translateY(36px)",
        transition: "opacity .75s cubic-bezier(.22,1,.36,1), transform .75s cubic-bezier(.22,1,.36,1)",
      
      }}>
      <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border"
        style={{ background: "rgba(184,74,0,0.05)", borderColor: "rgba(184,74,0,0.2)" }}>
        <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: "#b84a00" }} />
        <span className="text-[10px] font-bold tracking-[5px] uppercase" style={{ color: "#b84a00" }}>{eyebrow}</span>
      </div>
      <h2 className="leading-none tracking-[6px] m-0 font-black"
        style={{ fontSize: "clamp(44px,7vw,80px)", color: "#1a1a2e" }}>
        {title}{" "}
        <span style={{ color: accentColor }}>{highlight}</span>
      </h2>
      {subtitle && (
        <p className="m-0 text-[15px] max-w-[520px] leading-[1.7]"
          style={{ color: "rgba(26,26,46,0.5)" }}>{subtitle}</p>
      )}
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

  return (
    <>
      <style>{`
        * { box-sizing: border-box; }

        @keyframes dotPulse   { 0%,100%{opacity:.2} 50%{opacity:.38} }
        @keyframes divGrow    { from{transform:scaleX(0)} to{transform:scaleX(1)} }
        @keyframes ctaShimmer { 0%{transform:translateX(-100%) skewX(-20deg)} 100%{transform:translateX(350%) skewX(-20deg)} }
        @keyframes floatY     { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-10px)} }
        @keyframes rotateSlow { from{transform:rotate(0)} to{transform:rotate(360deg)} }
        @keyframes fadeUp     { from{opacity:0;transform:translateY(48px)} to{opacity:1;transform:none} }

        .dot-bg        { animation: dotPulse 6s ease-in-out infinite; }
        .float-shape   { animation: floatY 5s ease-in-out infinite; }
        .rotate-shape  { animation: rotateSlow 30s linear infinite; }
        .ha1 { animation: fadeUp .9s cubic-bezier(.16,1,.3,1) .05s both }
        .ha2 { animation: fadeUp .9s cubic-bezier(.16,1,.3,1) .2s  both }
        .ha3 { animation: fadeUp .9s cubic-bezier(.16,1,.3,1) .35s both }
        .ha4 { animation: fadeUp .9s cubic-bezier(.16,1,.3,1) .5s  both }
        .ha5 { animation: fadeUp .9s cubic-bezier(.16,1,.3,1) .65s both }

        .cta-shimmer {
          position:absolute; top:0; bottom:0; width:60px;
          background:linear-gradient(90deg,transparent,rgba(255,255,255,0.07),transparent);
          animation:ctaShimmer 4s ease-in-out infinite;
        }
        .hero-underline {
          position:absolute; bottom:-6px; left:0; right:0; height:4px; border-radius:9999px;
          background:linear-gradient(90deg,#1a3a6b,#b84a00);
          transform-origin:left;
          animation:divGrow 1s cubic-bezier(.22,1,.36,1) .6s both;
        }

        .btn-primary {
          display:inline-flex; align-items:center; gap:8px;
          padding:14px 28px; border-radius:9999px;
          font-size:12px; font-weight:700; letter-spacing:3px; text-transform:uppercase;
          color:#faf8f4; border:none; cursor:pointer; overflow:hidden; position:relative;
          background:linear-gradient(135deg,#1a3a6b,#0f2347);
          box-shadow:0 8px 28px rgba(26,58,107,.3);
          transition:transform .3s cubic-bezier(.22,1,.36,1),box-shadow .3s;
          
        }
        .btn-primary::after{content:'';position:absolute;inset:0;background:linear-gradient(105deg,transparent 35%,rgba(255,255,255,.14) 50%,transparent 65%);transform:translateX(-100%);transition:transform .5s;}
        .btn-primary:hover{transform:translateY(-3px);box-shadow:0 14px 38px rgba(26,58,107,.42);}
        .btn-primary:hover::after{transform:translateX(100%);}

        .btn-ghost {
          display:inline-flex; align-items:center; gap:8px;
          padding:14px 24px; border-radius:9999px;
          font-size:12px; font-weight:700; letter-spacing:3px; text-transform:uppercase;
          cursor:pointer; background:#faf8f4; color:#b84a00; border:2px solid #b84a00;
          transition:transform .3s cubic-bezier(.22,1,.36,1),background .3s,box-shadow .3s;
          
        }
        .btn-ghost:hover{transform:translateY(-3px);background:#fdf0e8;box-shadow:0 10px 28px rgba(184,74,0,.18);}
        .btn-ghost svg{transition:transform .3s cubic-bezier(.22,1,.36,1);}
        .btn-ghost:hover svg{transform:translateX(4px);}

        .cta-btn-cream {
          display:inline-flex; align-items:center; gap:9px;
          padding:14px 28px; border-radius:14px;
          background:#faf8f4; color:#1a3a6b; border:none;
          font-size:12px; font-weight:700; letter-spacing:3px; text-transform:uppercase;
          cursor:pointer; box-shadow:0 8px 24px rgba(0,0,0,.18); white-space:nowrap;
          transition:transform .3s,box-shadow .3s; 
        }
        .cta-btn-cream:hover{transform:translateY(-3px);box-shadow:0 16px 36px rgba(0,0,0,.28);}

        .cta-btn-outline {
          display:inline-flex; align-items:center; justify-content:center; gap:8px;
          padding:14px 28px; border-radius:14px;
          color:rgba(250,248,244,.9); border:1.5px solid rgba(250,248,244,.25);
          background:rgba(250,248,244,.1);
          font-size:12px; font-weight:700; letter-spacing:3px; text-transform:uppercase;
          cursor:pointer; white-space:nowrap; 
          transition:background .3s,transform .3s;
        }
        .cta-btn-outline:hover{background:rgba(250,248,244,.18);transform:translateY(-3px);}

        .line-bg {
          background-image:
            linear-gradient(rgba(26,58,107,0.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(26,58,107,0.04) 1px, transparent 1px);
          background-size:48px 48px;
        }
        .diag-band {
          background:repeating-linear-gradient(
            -55deg,transparent,transparent 24px,
            rgba(26,58,107,0.02) 24px,rgba(26,58,107,0.02) 25px
          );
        }
      `}</style>

      <div className="relative overflow-x-hidden"
        style={{ background: "#faf8f4", minHeight: "100vh", color: "#1a1a2e" }}>

        {/* Warm dot background */}
        <div className="dot-bg fixed inset-0 pointer-events-none z-0"
          style={{ backgroundImage: "radial-gradient(circle,#c8b89a 1px,transparent 1px)", backgroundSize: "28px 28px" }} />

        {/* Diagonal stripe */}
        <div className="diag-band fixed inset-0 pointer-events-none z-0" />

        {/* Top bar — navy to orange */}
        <div className="relative z-10 h-1"
          style={{ background: "linear-gradient(90deg,#1a3a6b,#b84a00,#1a3a6b,#b84a00)" }} />

        {/* Warm ambient glows */}
        <div className="fixed top-0 right-0 w-[700px] h-[600px] rounded-full pointer-events-none z-0"
          style={{ background: "radial-gradient(ellipse at top right,rgba(255,200,130,0.18) 0%,transparent 60%)", filter: "blur(60px)" }} />
        <div className="fixed bottom-0 left-0 w-[500px] h-[500px] rounded-full pointer-events-none z-0"
          style={{ background: "radial-gradient(ellipse at bottom left,rgba(26,58,107,0.07) 0%,transparent 60%)", filter: "blur(80px)" }} />
        <div className="fixed bottom-1/2 right-0 w-[400px] h-[400px] rounded-full pointer-events-none z-0"
          style={{ background: "radial-gradient(ellipse at right,rgba(184,74,0,0.05) 0%,transparent 65%)", filter: "blur(60px)" }} />

        {/* Floating shapes — same as about page */}
        <div className="float-shape pointer-events-none fixed top-28 right-12 hidden lg:flex items-center justify-center opacity-20 z-0">
          <div className="w-28 h-28 rounded-3xl border-2" style={{ borderColor: "#1a3a6b", transform: "rotate(12deg)" }} />
        </div>
        <div className="float-shape pointer-events-none fixed top-1/2 right-8 hidden xl:flex items-center justify-center opacity-10 z-0" style={{ animationDelay: "2s" }}>
          <div className="rotate-shape w-48 h-48 rounded-full border" style={{ borderColor: "#1a3a6b", borderStyle: "dashed" }} />
        </div>
        <div className="float-shape pointer-events-none fixed bottom-40 left-8 hidden lg:block opacity-15 z-0" style={{ animationDelay: "1.5s" }}>
          <div className="w-16 h-16 rounded-full border-2" style={{ borderColor: "#b84a00", borderStyle: "dashed" }} />
        </div>

        <div className="relative z-10">

          {/* ── HERO ── */}
          <div className="relative px-4 sm:px-6 lg:px-8 pt-16 sm:pt-20 pb-14 sm:pb-20 text-center overflow-hidden">
            {/* Ghost word */}
            <div className="pointer-events-none select-none absolute top-4 left-1/2 -translate-x-1/2 font-black leading-none tracking-[12px] whitespace-nowrap"
              style={{ fontSize: "clamp(80px,16vw,220px)", color: "rgba(26,58,107,0.04)" }}>
              SERVICES
            </div>

            <div className="relative max-w-3xl mx-auto">
              <div className="ha1 inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-6 border"
                style={{ background: "#fff", borderColor: "rgba(26,58,107,0.15)", boxShadow: "0 4px 16px rgba(26,58,107,0.08)" }}>
                <Wrench size={13} color="#1a3a6b" />
                <span className="text-[11px] font-bold tracking-[5px] uppercase" style={{ color: "#1a3a6b" }}>Expert TV Repair</span>
              </div>

              <div className="ha2">
                <h1 className="font-black leading-[0.92] tracking-[4px] mb-5"
                  style={{ fontSize: "clamp(48px,9vw,104px)", color: "#1a1a2e" }}>
                  TV Problems
                  <br />
                  <span className="relative inline-block" style={{ color: "#1a3a6b" }}>
                    We Solve
                    <span className="hero-underline" />
                  </span>
                </h1>
              </div>

              <div className="ha3 flex items-center justify-center gap-3 mb-4">
                <div style={{ width: 36, height: 2, background: "#b84a00", borderRadius: 9999 }} />
                <span className="text-[11px] font-bold tracking-[4px] uppercase" style={{ color: "#b84a00" }}>
                  Trusted Since 2014
                </span>
                <div style={{ width: 36, height: 2, background: "#b84a00", borderRadius: 9999 }} />
              </div>

              <div className="ha4">
                <p className="text-[15px] sm:text-[17px] leading-[1.75] max-w-[560px] mx-auto mb-8 font-light"
                  style={{ color: "rgba(26,26,46,0.6)" }}>
                  From a completely dead TV to a stubborn software glitch — click any card to read a full explanation of the problem and how we fix it.
                </p>
              </div>

              <div className="ha5 flex items-center justify-center gap-3 flex-wrap">
                <button className="btn-primary"><Phone size={15} />Book a Repair</button>
                <button className="btn-ghost"><ShieldCheck size={14} />Free Diagnosis <ArrowUpRight size={13} /></button>
              </div>
            </div>
          </div>

          {/* Sep */}
          <div className="px-4 sm:px-6 lg:px-8 max-w-[1280px] mx-auto mb-0">
            <div className="h-px" style={{ background: "linear-gradient(90deg,transparent,rgba(26,58,107,0.15),rgba(184,74,0,0.1),transparent)" }} />
          </div>

          {/* ── SECTION 1 — white band ── */}
          <div className="relative" style={{ background: "#fff" }}>
            <div className="line-bg absolute inset-0 opacity-60 pointer-events-none" />
            <div className="relative px-4 sm:px-6 lg:px-8 py-16 sm:py-20 max-w-[1280px] mx-auto">
              <div ref={h1Ref}>
                <SectionHeader
                  eyebrow="Core TV Issues"
                  title="TV Problems /"
                  highlight="Issues"
                  subtitle="The most common hardware and panel faults we diagnose and repair every day."
                  inView={h1InView}
                  accentColor="#1a3a6b"
                />
              </div>
              <div ref={g1Ref} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {tvProblems.map((item, i) => (
                  <ServiceCard key={item.id} item={item} index={i} inView={g1InView} />
                ))}
              </div>
            </div>
          </div>

          {/* Sep */}
          <div className="h-px" style={{ background: "linear-gradient(90deg,transparent,rgba(26,58,107,0.12),rgba(184,74,0,0.08),transparent)" }} />

          {/* ── SECTION 2 — cream band ── */}
          <div className="relative" style={{ background: "#faf8f4" }}>
            <div className="diag-band absolute inset-0 pointer-events-none" />
            <div className="relative px-4 sm:px-6 lg:px-8 py-16 sm:py-20 max-w-[1280px] mx-auto">
              <div ref={h2Ref}>
                <SectionHeader
                  eyebrow="Smart TV & Electrical Issues"
                  title="Other"
                  highlight="Problems"
                  subtitle="Connectivity failures, electrical faults, software glitches, and display issues beyond the basics."
                  inView={h2InView}
                  accentColor="#b84a00"
                />
              </div>
              <div ref={g2Ref} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {otherProblems.map((item, i) => (
                  <ServiceCard key={item.id} item={item} index={i} inView={g2InView} />
                ))}
              </div>
            </div>
          </div>

          {/* ── CTA — solid navy matching about page ── */}
          <div ref={ctaRef} className="px-4 sm:px-6 lg:px-8 py-16 sm:py-20 max-w-[1280px] mx-auto"
            style={{
              opacity: ctaInView ? 1 : 0,
              transform: ctaInView ? "translateY(0)" : "translateY(36px)",
              transition: "opacity .8s cubic-bezier(.22,1,.36,1), transform .8s cubic-bezier(.22,1,.36,1)",
            }}>
            <div className="relative rounded-3xl overflow-hidden"
              style={{
                background: "linear-gradient(135deg,#0f2347,#1a3a6b,#1e4080)",
                boxShadow: "0 32px 80px rgba(26,58,107,0.35)",
              }}>
              {/* Dot texture */}
              <div className="pointer-events-none absolute inset-0"
                style={{ backgroundImage: "radial-gradient(circle,rgba(250,248,244,0.07) 1px,transparent 1px)", backgroundSize: "24px 24px" }} />
              {/* Warm glow */}
              <div className="pointer-events-none absolute top-0 right-0 w-[400px] h-[400px] rounded-full"
                style={{ background: "radial-gradient(circle at 80% 20%,rgba(255,200,130,0.15),transparent 60%)" }} />
              {/* Orange glow */}
              <div className="pointer-events-none absolute bottom-0 left-0 w-[300px] h-[300px] rounded-full"
                style={{ background: "radial-gradient(circle at bottom left,rgba(184,74,0,0.2),transparent 60%)" }} />
              <div className="cta-shimmer" />
              {/* Top accent line */}
              <div className="absolute top-0 left-0 right-0 h-px"
                style={{ background: "linear-gradient(90deg,transparent,#b84a00,rgba(250,248,244,0.3),transparent)" }} />
              {/* Ghost word */}
              <div className="pointer-events-none select-none absolute bottom-0 right-0 font-black leading-[0.85] tracking-[8px]"
                style={{ fontSize: "clamp(100px,16vw,200px)", color: "rgba(250,248,244,0.04)" }}>
                FIX
              </div>

              <div className="relative px-8 sm:px-12 py-12 sm:py-14 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8 flex-wrap">
                <div className="flex-1 min-w-0">
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border mb-4"
                    style={{ borderColor: "rgba(250,248,244,0.2)", background: "rgba(250,248,244,0.08)" }}>
                    <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: "#f5a660" }} />
                    <span className="text-[10px] font-bold tracking-[4px] uppercase" style={{ color: "rgba(250,248,244,0.7)" }}>
                      Free Diagnosis · No Hidden Fees
                    </span>
                  </div>
                  <h2 className="font-black leading-[0.95] tracking-[4px] mb-3.5"
                    style={{ fontSize: "clamp(32px,5vw,62px)", color: "#faf8f4" }}>
                    Seen your problem above?
                    <br />
                    <span style={{ color: "rgba(250,248,244,0.35)" }}>Let's get it fixed today.</span>
                  </h2>
                  <p className="text-[15px] max-w-[460px] leading-[1.7] font-light"
                    style={{ color: "rgba(250,248,244,0.55)" }}>
                    Call or walk in — we diagnose your TV for free and give you a clear, honest quote before any work begins.
                  </p>
                </div>
                <div className="flex flex-row sm:flex-col gap-3 flex-shrink-0 flex-wrap">
                  <button className="cta-btn-cream"><Phone size={15} />Call Now</button>
                  <button className="cta-btn-outline"><CalendarCheck size={15} />Book a Repair</button>
                </div>
              </div>
            </div>
          </div>

         

        </div>
      </div>
    </>
  );
}