import React, { useEffect, useRef, useState } from "react";
import {
  MonitorOff, VolumeX, Zap, AlignJustify, Minus, Pause, Camera,
  Radio, Wifi, Bluetooth, Monitor, Volume2, AlertTriangle, Activity,
  AppWindow, Lightbulb, Layout, ChevronRight, ArrowUpRight, Phone,
  CalendarCheck, Wrench, ShieldCheck, MonitorCheck, Package,
  Settings, Tv, Hammer, WifiOff, Cpu
} from "lucide-react";

/* ─── OUR SERVICES DATA ─── */
const ourServices = [
  {
    id: 1, icon: MonitorCheck,
    title: "LED TV Screen Repair & Replacement",
    desc: "We handle damaged, cracked, or non-functional screens with proper repair solutions or complete replacement when required, ensuring clear and sharp display quality.",
    tags: ["Screen Repair", "Replacement", "Display Quality"],
  },
  {
    id: 2, icon: MonitorOff,
    title: "No Display / Blank Screen Issues",
    desc: "If your TV turns on but shows no picture, our technicians will identify the root cause and fix display-related problems quickly and effectively.",
    tags: ["Blank Screen", "No Picture", "Display Fix"],
  },
  {
    id: 3, icon: VolumeX,
    title: "Audio / Sound Problem Fix",
    desc: "Facing no sound or unclear audio? We diagnose and resolve all types of speaker and sound-related issues for a better viewing experience.",
    tags: ["No Sound", "Speaker Repair", "Audio Fix"],
  },
  {
    id: 4, icon: Cpu,
    title: "Motherboard Repair & Replacement",
    desc: "We repair or replace faulty motherboards that affect overall TV performance, ensuring smooth functioning of all features.",
    tags: ["Motherboard", "PCB Repair", "Main Board"],
  },
  {
    id: 5, icon: Zap,
    title: "Power Supply Repair",
    desc: "If your TV is not turning on or shuts down suddenly, we fix power-related issues with proper inspection and reliable solutions.",
    tags: ["Power Issue", "No Power", "SMPS"],
  },
  {
    id: 6, icon: Lightbulb,
    title: "Backlight Repair & Replacement",
    desc: "Dim screen or uneven brightness issues are resolved with expert backlight repair to restore proper display clarity.",
    tags: ["Backlight", "LED Strip", "Brightness Fix"],
  },
  {
    id: 7, icon: Layout,
    title: "Panel Repair & Solutions",
    desc: "We provide solutions for panel-related problems with careful handling and precise repair techniques.",
    tags: ["Panel Repair", "T-CON", "Display Panel"],
  },
  {
    id: 8, icon: Settings,
    title: "Wall Mount Installation",
    desc: "We offer safe and secure TV wall mounting services for better viewing comfort and space management.",
    tags: ["Wall Mount", "Installation", "Safe Mounting"],
  },
  {
    id: 9, icon: Wrench,
    title: "General Service & Maintenance",
    desc: "Regular servicing helps improve performance and extend the life of your TV. We provide complete maintenance support for all models.",
    tags: ["Maintenance", "Servicing", "All Models"],
  },
];

/* ─── TV PROBLEMS DATA ─── */
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

function Reveal({ children, delay = 0, from = "bottom" }) {
  const [ref, inView] = useInView(0.08);
  const transforms = {
    bottom: "translateY(40px)",
    left: "translateX(-40px)",
    right: "translateX(40px)",
  };
  return (
    <div ref={ref} style={{
      opacity: inView ? 1 : 0,
      transform: inView ? "none" : transforms[from],
      transition: `opacity .8s cubic-bezier(.16,1,.3,1) ${delay}ms, transform .8s cubic-bezier(.16,1,.3,1) ${delay}ms`,
    }}>
      {children}
    </div>
  );
}

/* ─── SERVICE OFFERING CARD ─── */
function OfferingCard({ item, index, inView }) {
  const [hov, setHov] = useState(false);
  const Icon = item.icon;
  return (
    <div
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        background: hov ? "#890b44" : "#fff",
        border: `1.5px solid ${hov ? "#890b44" : "rgba(137,11,68,0.12)"}`,
        borderRadius: 20,
        padding: "28px 26px",
        boxShadow: hov ? "0 20px 56px rgba(137,11,68,0.28)" : "0 2px 14px rgba(0,0,0,0.05)",
        transition: "all .4s cubic-bezier(.16,1,.3,1)",
        transform: hov ? "translateY(-6px)" : "translateY(0)",
        opacity: inView ? 1 : 0,
        transitionDelay: inView ? `${index * 60}ms` : "0ms",
        cursor: "default",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* top stripe */}
      <div style={{
        position: "absolute", top: 0, left: 0, right: 0, height: 3, borderRadius: "20px 20px 0 0",
        background: hov ? "rgba(255,255,255,0.3)" : "linear-gradient(90deg,#890b44,#890b4455)",
        transform: hov ? "scaleX(1)" : "scaleX(0.35)",
        transformOrigin: "left",
        transition: "transform .4s cubic-bezier(.16,1,.3,1), background .3s",
      }} />

      {/* number watermark */}
      <span style={{
        position: "absolute", bottom: 4, right: 10,
        fontSize: 72, fontWeight: 900, lineHeight: 1,
        color: hov ? "rgba(255,255,255,0.06)" : "rgba(137,11,68,0.05)",
        
        pointerEvents: "none", userSelect: "none",
        transition: "color .3s",
      }}>
        {String(item.id).padStart(2, "0")}
      </span>

      {/* icon */}
      <div style={{
        width: 46, height: 46, borderRadius: 14,
        background: hov ? "rgba(255,255,255,0.15)" : "rgba(137,11,68,0.08)",
        border: `1px solid ${hov ? "rgba(255,255,255,0.25)" : "rgba(137,11,68,0.15)"}`,
        display: "flex", alignItems: "center", justifyContent: "center",
        marginBottom: 18,
        transition: "all .4s cubic-bezier(.16,1,.3,1)",
        transform: hov ? "rotate(-8deg) scale(1.1)" : "none",
      }}>
        <Icon size={20} color={hov ? "#fff" : "#890b44"} />
      </div>

      <h3 style={{
        fontSize: 17, fontWeight: 800, lineHeight: 1.3,
        color: hov ? "#fff" : "#111",
        marginBottom: 10,
       
        transition: "color .3s",
      }}>
        {item.title}
      </h3>

      <p style={{
        fontSize: 17, lineHeight: 1.75,
        color: hov ? "rgba(255,255,255,0.75)" : "black",
        marginBottom: 16,
        transition: "color .3s",
      }}>
        {item.desc}
      </p>

      <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
        {item.tags.map(tag => (
          <span key={tag} style={{
            fontSize: 10, fontWeight: 700, letterSpacing: "1.5px",
            textTransform: "uppercase", padding: "4px 10px", borderRadius: 999,
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

/* ─── PROBLEM CARD ─── */
function ServiceCard({ item, index, inView }) {
  const [hov, setHov] = useState(false);
  const [exp, setExp] = useState(false);
  const Icon = item.icon;

  return (
    <div
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      onClick={() => setExp(!exp)}
      style={{
        background: hov ? "#890b44" : "#fff",
        border: `1.5px solid ${hov ? "#890b44" : "rgba(137,11,68,0.12)"}`,
        borderRadius: 20,
        boxShadow: hov ? "0 24px 60px rgba(137,11,68,0.28)" : "0 2px 16px rgba(0,0,0,0.06)",
        transition: "transform .42s cubic-bezier(.22,1,.36,1), box-shadow .42s, background .3s, border-color .3s",
        transform: hov ? "translateY(-8px) scale(1.015)" : "translateY(0)",
        opacity: inView ? 1 : 0,
        transitionDelay: inView ? `${index * 55}ms` : "0ms",
        padding: 26,
        cursor: "pointer",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* top stripe */}
      <div style={{
        position: "absolute", top: 0, left: 0, right: 0, height: 3, borderRadius: "20px 20px 0 0",
        background: hov ? "rgba(255,255,255,0.3)" : "linear-gradient(90deg,#890b44,#890b4455)",
        transform: hov ? "scaleX(1)" : "scaleX(0.35)",
        transformOrigin: "left",
        transition: "transform .4s cubic-bezier(.16,1,.3,1), background .3s",
      }} />

      {/* shimmer */}
      <div style={{
        position: "absolute", inset: 0, pointerEvents: "none",
        background: "linear-gradient(105deg,transparent 35%,rgba(255,255,255,0.09) 50%,transparent 65%)",
        transform: hov ? "translateX(100%)" : "translateX(-100%)",
        transition: "transform .6s ease",
      }} />

      {/* number watermark */}
      <span style={{
        position: "absolute", bottom: 2, right: 8,
        fontSize: 72, fontWeight: 900, lineHeight: 1,
        color: hov ? "rgba(255,255,255,0.07)" : "rgba(137,11,68,0.05)",
        
        pointerEvents: "none", userSelect: "none",
        transition: "color .3s",
      }}>
        {String(item.id).padStart(2, "0")}
      </span>

      {/* top row */}
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 18 }}>
        <div style={{
          width: 44, height: 44, borderRadius: 12,
          background: hov ? "rgba(255,255,255,0.15)" : "rgba(137,11,68,0.08)",
          border: `1px solid ${hov ? "rgba(255,255,255,0.25)" : "rgba(137,11,68,0.15)"}`,
          display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
          transition: "all .4s cubic-bezier(.22,1,.36,1)",
          transform: hov ? "rotate(-8deg) scale(1.12)" : "none",
        }}>
          <Icon size={18} color={hov ? "#fff" : "#890b44"} />
        </div>
        <div style={{
          width: 28, height: 28, borderRadius: "50%",
          background: hov ? "rgba(255,255,255,0.15)" : "rgba(137,11,68,0.08)",
          border: `1px solid ${hov ? "rgba(255,255,255,0.2)" : "rgba(137,11,68,0.12)"}`,
          display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
          transition: "all .35s",
          transform: exp ? "rotate(90deg)" : "rotate(0deg)",
        }}>
          <ChevronRight size={12} color={hov ? "#fff" : "#890b44"} />
        </div>
      </div>

      <h3 style={{
        fontSize: 17, letterSpacing: "1.5px", marginBottom: 6,
        textTransform: "uppercase", fontWeight: 900,
        color: hov ? "#fff" : "#111",
        
        transition: "color .3s",
      }}>
        {item.title}
      </h3>

      <p style={{
        fontSize: 15, lineHeight: 1.65, marginBottom: 14,
        color: hov ? "rgba(255,255,255,0.72)" : "black",
        transition: "color .3s",
      }}>
        {item.short}
      </p>

      {/* expanded */}
      <div style={{ overflow: "hidden", maxHeight: exp ? 240 : 0, transition: "max-height .45s cubic-bezier(.22,1,.36,1)" }}>
        <p style={{
          fontSize: 15, lineHeight: 1.75, marginBottom: 12, paddingTop: 12,
          borderTop: `1px solid ${hov ? "rgba(255,255,255,0.15)" : "rgba(137,11,68,0.1)"}`,
          color: hov ? "rgba(255,255,255,0.65)" : "rgba(0,0,0,0.55)",
          transition: "color .3s, border-color .3s",
        }}>
          {item.desc}
        </p>
      </div>

      <div style={{ display: "flex", flexWrap: "wrap", gap: 5, position: "relative", zIndex: 10 }}>
        {item.fix.split(" · ").map(tag => (
          <span key={tag} style={{
            fontSize: 10, fontWeight: 700, letterSpacing: "2px",
            textTransform: "uppercase", borderRadius: 999, padding: "3px 9px",
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

/* ─── STAT PILL ─── */
function StatPill({ number, label }) {
  return (
    <div style={{
      display: "flex", flexDirection: "column", alignItems: "center", gap: 4,
      padding: "18px 28px", borderRadius: 16,
      background: "rgba(137,11,68,0.06)", border: "1px solid rgba(137,11,68,0.12)",
    }}>
      <span style={{ fontSize: 34, fontWeight: 900, lineHeight: 1, color: "#890b44", }}>{number}</span>
      <span style={{ fontSize: 13, fontWeight: 700, letterSpacing: "3px", textTransform: "uppercase", color: "rgba(0,0,0,0.45)" }}>{label}</span>
    </div>
  );
}

/* ─── SECTION HEADER ─── */
function SectionHeader({ eyebrow, title, highlight, subtitle, inView }) {
  return (
    <div style={{
      textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center", gap: 12,
      marginBottom: 56,
      opacity: inView ? 1 : 0,
      transform: inView ? "translateY(0)" : "translateY(32px)",
      transition: "opacity .75s cubic-bezier(.22,1,.36,1), transform .75s cubic-bezier(.22,1,.36,1)",
    }}>
      <div style={{
        display: "inline-flex", alignItems: "center", gap: 8,
        padding: "7px 18px", borderRadius: 999,
        background: "rgba(137,11,68,0.06)", border: "1.5px solid rgba(137,11,68,0.2)",
      }}>
        <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#890b44", flexShrink: 0 }} />
        <span style={{ fontSize: 14, fontWeight: 800, letterSpacing: "5px", textTransform: "uppercase", color: "#890b44" }}>{eyebrow}</span>
      </div>
      <h2 style={{
        fontSize: "clamp(36px,6vw,70px)", fontWeight: 900, lineHeight: 1,
        letterSpacing: "-0.5px", margin: 0, color: "#111",
        
      }}>
        {title} <span style={{ color: "#890b44" }}>{highlight}</span>
      </h2>
      {subtitle && (
        <p style={{ fontSize: 17, lineHeight: 1.75, maxWidth: 520,  margin: 0 }}>
          {subtitle}
        </p>
      )}
    </div>
  );
}

/* ─── MAIN ─── */
export default function Services() {
  const [h0Ref, h0InView] = useInView(0.15);
  const [g0Ref, g0InView] = useInView(0.04);
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
        @keyframes floatY     { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-12px)} }
        @keyframes spinSlow   { from{transform:rotate(0)} to{transform:rotate(360deg)} }
        @keyframes pulse      { 0%,100%{opacity:0.4} 50%{opacity:1} }
        @keyframes ticker     { from{transform:translateX(0)} to{transform:translateX(-50%)} }
        @keyframes ctaShimmer { 0%{transform:translateX(-100%) skewX(-20deg)} 100%{transform:translateX(350%) skewX(-20deg)} }

        .ha1 { animation: fadeUp .9s cubic-bezier(.16,1,.3,1) .05s both; }
        .ha2 { animation: fadeUp .9s cubic-bezier(.16,1,.3,1) .18s both; }
        .ha3 { animation: fadeUp .9s cubic-bezier(.16,1,.3,1) .32s both; }
        .ha4 { animation: fadeUp .9s cubic-bezier(.16,1,.3,1) .46s both; }
        .ha5 { animation: fadeUp .9s cubic-bezier(.16,1,.3,1) .60s both; }

        .hero-underline {
          position:absolute; bottom:-6px; left:0; right:0; height:5px;
          border-radius:9999px;
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

        .dot-grid {
          background-image: radial-gradient(circle, rgba(137,11,68,0.07) 1px, transparent 1px);
          background-size: 28px 28px;
        }
        .cross-grid {
          background-image:
            linear-gradient(rgba(137,11,68,0.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(137,11,68,0.04) 1px, transparent 1px);
          background-size: 48px 48px;
        }
        .checker-bg {
          background-image:
            linear-gradient(45deg,rgba(137,11,68,0.035) 25%,transparent 25%),
            linear-gradient(-45deg,rgba(137,11,68,0.035) 25%,transparent 25%),
            linear-gradient(45deg,transparent 75%,rgba(137,11,68,0.035) 75%),
            linear-gradient(-45deg,transparent 75%,rgba(137,11,68,0.035) 75%);
          background-size: 20px 20px;
          background-position: 0 0,0 10px,10px -10px,-10px 0px;
        }

        .btn-primary {
          display:inline-flex; align-items:center; gap:8px;
          padding:14px 30px; border-radius:9999px;
          font-size:11.5px; font-weight:800; letter-spacing:3px; text-transform:uppercase;
          color:#fff; border:none; cursor:pointer; overflow:hidden; position:relative;
          background:#890b44;
          box-shadow:0 10px 32px rgba(137,11,68,0.35);
          transition:transform .3s cubic-bezier(.22,1,.36,1), box-shadow .3s;
          font-family:'DM Sans',sans-serif;
        }
        .btn-primary:hover { transform:translateY(-3px); box-shadow:0 16px 44px rgba(137,11,68,0.45); }

        .btn-outline {
          display:inline-flex; align-items:center; gap:8px;
          padding:14px 26px; border-radius:9999px;
          font-size:11.5px; font-weight:800; letter-spacing:3px; text-transform:uppercase;
          cursor:pointer; background:#fff; color:#890b44; border:2px solid #890b44;
          transition:transform .3s cubic-bezier(.22,1,.36,1), box-shadow .3s, background .3s;
          font-family:'DM Sans',sans-serif;
        }
        .btn-outline:hover { transform:translateY(-3px); background:#fdf0f5; box-shadow:0 10px 30px rgba(137,11,68,0.15); }

        .cta-btn-white {
          display:inline-flex; align-items:center; gap:8px;
          padding:15px 30px; border-radius:14px;
          background:#fff; color:#890b44; border:none;
          font-size:11.5px; font-weight:800; letter-spacing:3px; text-transform:uppercase;
          cursor:pointer; white-space:nowrap;
          box-shadow:0 8px 24px rgba(0,0,0,0.15);
          transition:transform .3s, box-shadow .3s;
          font-family:'DM Sans',sans-serif;
        }
        .cta-btn-white:hover { transform:translateY(-3px); box-shadow:0 14px 36px rgba(0,0,0,0.22); }

        .cta-btn-ghost {
          display:inline-flex; align-items:center; gap:8px;
          padding:15px 30px; border-radius:14px;
          color:rgba(255,255,255,0.85); border:1.5px solid rgba(255,255,255,0.25);
          background:rgba(255,255,255,0.1);
          font-size:11.5px; font-weight:800; letter-spacing:3px; text-transform:uppercase;
          cursor:pointer; white-space:nowrap; backdrop-filter:blur(8px);
          transition:background .3s, transform .3s;
          font-family:'DM Sans',sans-serif;
        }
        .cta-btn-ghost:hover { background:rgba(255,255,255,0.18); transform:translateY(-3px); }

        /* Responsive grids */
        .services-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 18px;
        }
        @media (max-width: 1024px) {
          .services-grid { grid-template-columns: repeat(2, 1fr); }
        }
        @media (max-width: 600px) {
          .services-grid { grid-template-columns: 1fr; }
        }

        .problems-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 16px;
        }
        @media (max-width: 1200px) {
          .problems-grid { grid-template-columns: repeat(3, 1fr); }
        }
        @media (max-width: 860px) {
          .problems-grid { grid-template-columns: repeat(2, 1fr); }
        }
        @media (max-width: 520px) {
          .problems-grid { grid-template-columns: 1fr; }
        }

        .stats-row {
          display: flex; flex-wrap: wrap; justify-content: center; gap: 14px;
        }

        .cta-inner {
          display: flex;
          flex-direction: row;
          align-items: center;
          justify-content: space-between;
          gap: 32px;
          flex-wrap: wrap;
        }
        @media (max-width: 768px) {
          .cta-inner { flex-direction: column; align-items: flex-start; }
        }

        .cta-btns {
          display: flex; flex-direction: column; gap: 12px; flex-shrink: 0;
        }
        @media (max-width: 520px) {
          .cta-btns { flex-direction: row; flex-wrap: wrap; }
        }

        .section-wrap {
          max-width: 1280px;
          margin: 0 auto;
          padding: 0 24px;
        }
        @media (max-width: 640px) {
          .section-wrap { padding: 0 16px; }
        }

        .hero-btns {
          display: flex; align-items: center; justify-content: center; gap: 12px; flex-wrap: wrap;
        }

        /* Ticker */
        .ticker-wrap { overflow: hidden; }
        .ticker-track { animation: ticker 30s linear infinite; display: flex; white-space: nowrap; }
        .ticker-track:hover { animation-play-state: paused; }
      `}</style>

      <div style={{ background: "#fff", minHeight: "100vh", color: "#111",  overflowX: "hidden" }}>

        {/* BG grid */}
        <div className="dot-grid" style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 0 }} />

        {/* Top accent bar */}
        <div style={{ position: "relative", zIndex: 10, height: 3, background: "linear-gradient(90deg, #890b44, #111, #890b44, #111)" }} />

        {/* Ambient glows */}
        <div style={{ position: "fixed", top: 0, right: 0, width: 600, height: 500, borderRadius: "50%", pointerEvents: "none", zIndex: 0, background: "radial-gradient(ellipse at top right, rgba(137,11,68,0.08) 0%, transparent 65%)", filter: "blur(60px)" }} />
        <div style={{ position: "fixed", bottom: 0, left: 0, width: 400, height: 400, borderRadius: "50%", pointerEvents: "none", zIndex: 0, background: "radial-gradient(ellipse at bottom left, rgba(137,11,68,0.05) 0%, transparent 60%)", filter: "blur(80px)" }} />

        {/* Floating decorative shapes */}
        <div className="float-shape" style={{ position: "fixed", top: 112, right: 64, pointerEvents: "none", zIndex: 0, opacity: 0.18 }}>
          <div style={{ width: 120, height: 120, borderRadius: 24, border: "2px solid #890b44", transform: "rotate(15deg)" }} />
        </div>
        <div className="spin-shape" style={{ position: "fixed", top: "50%", right: 40, pointerEvents: "none", zIndex: 0, opacity: 0.08 }}>
          <div style={{ width: 180, height: 180, borderRadius: "50%", border: "1px dashed #890b44" }} />
        </div>

        <div style={{ position: "relative", zIndex: 10 }}>

          {/* ══ HERO ══ */}
          <div style={{ position: "relative", padding: "100px 24px 72px", textAlign: "center", overflow: "hidden" }}>
            {/* ghost word */}
            <div style={{
              position: "absolute", top: 8, left: "50%", transform: "translateX(-50%)",
              fontSize: "clamp(60px,14vw,180px)", fontWeight: 900, lineHeight: 1,
              letterSpacing: 10, whiteSpace: "nowrap",
              color: "rgba(137,11,68,0.04)", 
              pointerEvents: "none", userSelect: "none",
            }}>
              SERVICES
            </div>

            <div style={{ position: "relative", maxWidth: 740, margin: "0 auto" }}>
              {/* badge */}
              <div className="ha1" style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "8px 20px", borderRadius: 999, marginBottom: 28, background: "rgba(137,11,68,0.06)", border: "1.5px solid rgba(137,11,68,0.2)", boxShadow: "0 4px 18px rgba(137,11,68,0.08)" }}>
                <span className="pulse-dot" style={{ width: 7, height: 7, borderRadius: "50%", background: "#890b44", flexShrink: 0 }} />
                <Wrench size={13} color="#890b44" />
                <span style={{ fontSize: 10, fontWeight: 800, letterSpacing: "5px", textTransform: "uppercase", color: "#890b44" }}>Expert LED TV Repair</span>
              </div>

              {/* headline */}
              <div className="ha2">
                <h1 style={{  fontWeight: 900, lineHeight: 0.92, letterSpacing: "-1px", marginBottom: 28, fontSize: "clamp(52px,9vw,106px)", color: "#111" }}>
                  Our Services
                  <br />
                  <span style={{ position: "relative", display: "inline-block", color: "#890b44" }}>
                    &amp; Solutions
                    <span className="hero-underline" />
                  </span>
                </h1>
              </div>

              {/* eyebrow divider */}
              <div className="ha3" style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 12, marginBottom: 20 }}>
                <div style={{ width: 40, height: 2, background: "#111", borderRadius: 9999 }} />
                <span style={{ fontSize: 10, fontWeight: 800, letterSpacing: "4px", textTransform: "uppercase", color: "#890b44" }}>Established 2007</span>
                <div style={{ width: 40, height: 2, background: "#111", borderRadius: 9999 }} />
              </div>

              {/* intro paragraph */}
              <div className="ha4">
                <p style={{ fontSize: 17, lineHeight: 1.85, maxWidth: 560, margin: "0 auto 36px", fontWeight: 400 }}>
                  At KJ LED Electronic TV Services, we offer a complete range of LED TV repair and maintenance solutions designed to address all types of technical issues. Our goal is to restore your television's performance with <strong style={{ color: "#111" }}>accuracy, efficiency, and long-lasting results.</strong>
                </p>
              </div>

              <div className="ha5 hero-btns">
                <button className="btn-primary"><Phone size={14} />Call Now</button>
                <button className="btn-outline"><ShieldCheck size={14} />Free Diagnosis <ArrowUpRight size={13} /></button>
              </div>
            </div>
          </div>

          {/* ══ STATS ══ */}
          <div ref={statsRef} style={{ padding: "0 24px 64px", maxWidth: 960, margin: "0 auto", opacity: statsInView ? 1 : 0, transform: statsInView ? "translateY(0)" : "translateY(24px)", transition: "opacity .7s, transform .7s" }}>
            <div className="stats-row">
              <StatPill number="18+" label="Years Experience" />
              <StatPill number="5K+" label="Repairs Done" />
              <StatPill number="9" label="Service Types" />
              <StatPill number="Free" label="Diagnosis" />
            </div>
          </div>

          {/* divider */}
          <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 24px" }}>
            <div style={{ height: 1, background: "linear-gradient(90deg, transparent, rgba(137,11,68,0.2), transparent)" }} />
          </div>

          {/* ══ OUR SERVICES SECTION ══ */}
          <div style={{ position: "relative", background: "#fff" }}>
            <div className="cross-grid" style={{ position: "absolute", inset: 0, pointerEvents: "none", opacity: 0.7 }} />
            <div style={{ position: "relative", padding: "80px 24px", maxWidth: 1280, margin: "0 auto" }}>
              <div ref={h0Ref}>
                <SectionHeader
                  eyebrow="What We Offer"
                  title="Our"
                  highlight="Services"
                  subtitle="A complete range of LED TV repair and maintenance solutions — from screen replacements to general servicing for all major brands and models."
                  inView={h0InView}
                />
              </div>
              <div ref={g0Ref} className="services-grid">
                {ourServices.map((item, i) => (
                  <OfferingCard key={item.id} item={item} index={i} inView={g0InView} />
                ))}
              </div>
            </div>
          </div>

          {/* divider */}
          <div style={{ height: 1, margin: "0 32px", background: "linear-gradient(90deg, transparent, rgba(0,0,0,0.08), transparent)" }} />

          {/* ══ CORE TV PROBLEMS ══ */}
          <div style={{ position: "relative", background: "#fff" }}>
            <div className="cross-grid" style={{ position: "absolute", inset: 0, pointerEvents: "none", opacity: 0.7 }} />
            <div style={{ position: "relative", padding: "80px 24px", maxWidth: 1280, margin: "0 auto" }}>
              <div ref={h1Ref}>
                <SectionHeader
                  eyebrow="Core TV Issues"
                  title="TV Problems &"
                  highlight="Issues"
                  subtitle="The most common hardware and panel faults we diagnose and repair every day. Click any card for a full technical breakdown."
                  inView={h1InView}
                />
              </div>
              <div ref={g1Ref} className="problems-grid">
                {tvProblems.map((item, i) => (
                  <ServiceCard key={item.id} item={item} index={i} inView={g1InView} />
                ))}
              </div>
            </div>
          </div>

          {/* divider */}
          <div style={{ height: 1, margin: "0 32px", background: "linear-gradient(90deg, transparent, rgba(0,0,0,0.08), transparent)" }} />

          {/* ══ OTHER PROBLEMS ══ */}
          <div style={{ position: "relative", background: "rgba(137,11,68,0.025)" }}>
            <div className="dot-grid" style={{ position: "absolute", inset: 0, pointerEvents: "none", opacity: 0.6 }} />
            <div style={{ position: "relative", padding: "80px 24px", maxWidth: 1280, margin: "0 auto" }}>
              <div ref={h2Ref}>
                <SectionHeader
                  eyebrow="Smart TV & Electrical Issues"
                  title="Other"
                  highlight="Problems"
                  subtitle="Connectivity failures, electrical faults, software glitches, and advanced display issues — we handle them all."
                  inView={h2InView}
                />
              </div>
              <div ref={g2Ref} className="problems-grid">
                {otherProblems.map((item, i) => (
                  <ServiceCard key={item.id} item={item} index={i} inView={g2InView} />
                ))}
              </div>
            </div>
          </div>

          {/* ══ CTA ══ */}
          <div ref={ctaRef} style={{ padding: "64px 24px 80px", maxWidth: 1280, margin: "0 auto", opacity: ctaInView ? 1 : 0, transform: ctaInView ? "translateY(0)" : "translateY(36px)", transition: "opacity .8s cubic-bezier(.22,1,.36,1), transform .8s cubic-bezier(.22,1,.36,1)" }}>
            <div style={{
              position: "relative", borderRadius: 28, overflow: "hidden",
              background: "linear-gradient(135deg, #111 0%, #1a0008 50%, #890b44 100%)",
              boxShadow: "0 40px 90px rgba(137,11,68,0.4), 0 0 0 1px rgba(137,11,68,0.3)",
            }}>
              {/* dot texture */}
              <div style={{ position: "absolute", inset: 0, backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.05) 1px, transparent 1px)", backgroundSize: "22px 22px", pointerEvents: "none" }} />
              {/* glows */}
              <div style={{ position: "absolute", top: 0, right: 0, width: 500, height: 400, borderRadius: "50%", background: "radial-gradient(circle at 85% 15%, rgba(224,85,144,0.25), transparent 55%)", pointerEvents: "none" }} />
              <div style={{ position: "absolute", bottom: 0, left: 0, width: 350, height: 350, borderRadius: "50%", background: "radial-gradient(circle at 10% 90%, rgba(0,0,0,0.4), transparent 55%)", pointerEvents: "none" }} />
              <div className="cta-shimmer" />
              {/* top line */}
              <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 1, background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.2), #890b44, rgba(255,255,255,0.15), transparent)" }} />
              {/* ghost text */}
              <div style={{ position: "absolute", bottom: 0, right: 16, fontSize: "clamp(80px,14vw,180px)", fontWeight: 900, lineHeight: 0.85, letterSpacing: 6, color: "rgba(255,255,255,0.04)",  pointerEvents: "none", userSelect: "none" }}>FIX</div>

              <div className="cta-inner" style={{ position: "relative", padding: "56px 48px" }}>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "6px 16px", borderRadius: 999, border: "1px solid rgba(255,255,255,0.18)", background: "rgba(255,255,255,0.07)", marginBottom: 20 }}>
                    <span className="pulse-dot" style={{ width: 6, height: 6, borderRadius: "50%", background: "#e05590", flexShrink: 0 }} />
                    <span style={{ fontSize: 10, fontWeight: 800, letterSpacing: "4px", textTransform: "uppercase", color: "rgba(255,255,255,0.65)" }}>
                      Trusted Since 2007 · Free Diagnosis · No Hidden Fees
                    </span>
                  </div>
                  <h2 style={{  fontWeight: 900, lineHeight: 0.95, letterSpacing: "-0.5px", marginBottom: 16, fontSize: "clamp(28px,4.5vw,56px)", color: "#fff" }}>
                    Seen your problem above?
                    <br />
                    <span style={{ color: "rgba(255,255,255,0.28)" }}>Let's get it fixed today.</span>
                  </h2>
                  <p style={{ fontSize: 15, maxWidth: 460, lineHeight: 1.8, color: "rgba(255,255,255,0.5)", fontWeight: 400 }}>
                    Walk in or call ahead — we diagnose your TV for free and give you a clear, honest quote before any work begins. Building trust, one repair at a time since 2007.
                  </p>
                </div>
                <div className="cta-btns">
                  <button className="cta-btn-white"><Phone size={15} />Call Now</button>
                  <button className="cta-btn-ghost"><CalendarCheck size={15} />Book a Repair</button>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </>
  );
}