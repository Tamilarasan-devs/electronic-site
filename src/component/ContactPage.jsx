import React, { useState } from "react";
import { Phone, Mail, MapPin, Clock, Send, CheckCircle, Tv, MessageSquare } from "lucide-react";

const contactInfo = [
  {
    icon: Phone,
    label: "Call Us",
    value: "+91 98765 43210",
    sub: "Mon – Sat, 9am – 7pm",
    href: "tel:+919876543210",
  },
  {
    icon: Mail,
    label: "Email Us",
    value: "support@kjelectronics.in",
    sub: "We reply within 2 hours",
    href: "mailto:support@kjelectronics.in",
  },
  {
    icon: MapPin,
    label: "Visit Us",
    value: "123, RS Puram, Coimbatore",
    sub: "Tamil Nadu – 641002",
    href: "#",
  },
  {
    icon: Clock,
    label: "Working Hours",
    value: "9:00 AM – 7:00 PM",
    sub: "Monday to Saturday",
    href: null,
  },
];

const services = [
  "LED TV Repair",
  "Smart TV Setup",
  "Screen Replacement",
  "Sound Issues",
  "Power Problems",
  "Software Update",
  "Other",
];

export default function ContactPage() {
  const [formState, setFormState] = useState({ name: "", phone: "", service: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [focused, setFocused] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  /* Input classes — warm cream theme */
  const inputCls = (field) =>
    `w-full rounded-xl px-4 py-3.5 text-sm font-medium outline-none transition-all duration-300
    bg-white placeholder-[rgba(26,26,46,0.35)]
    border ${
      focused === field
        ? "border-[#1a3a6b] shadow-[0_0_0_3px_rgba(26,58,107,0.1)]"
        : "border-[rgba(26,58,107,0.18)]"
    }
    text-[#1a1a2e]`;

  return (
    <section
      className="w-full py-24 px-6 md:px-12 relative overflow-hidden"
      style={{ background: "#faf8f4", color: "#1a1a2e" }}
    >
      <style>{`
        @keyframes dotPulse   { 0%,100%{opacity:.2} 50%{opacity:.38} }
        @keyframes floatY     { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-10px)} }
        @keyframes rotateSlow { from{transform:rotate(0)} to{transform:rotate(360deg)} }
        @keyframes fadeSlideUp {
          from { opacity:0; transform:translateY(28px); }
          to   { opacity:1; transform:translateY(0); }
        }
        @keyframes bounceIn {
          0%   { transform:scale(0.5); opacity:0; }
          70%  { transform:scale(1.1); }
          100% { transform:scale(1); opacity:1; }
        }
        @keyframes pulse-ring {
          0%  { transform:scale(1); opacity:.9; }
          80% { transform:scale(2.4); opacity:0; }
          100%{ transform:scale(2.4); opacity:0; }
        }

        .tvc-dots  { animation: dotPulse 6s ease-in-out infinite; }
        .float-el  { animation: floatY 5s ease-in-out infinite; }
        .rotate-el { animation: rotateSlow 30s linear infinite; }

        .pdot { position:relative; width:8px; height:8px; border-radius:50%; background:#1a3a6b; flex-shrink:0; }
        .pdot::after { content:''; position:absolute; inset:0; border-radius:50%; background:#1a3a6b; animation:pulse-ring 2s ease-out infinite; }

        /* Diagonal stripe */
        .diag-band {
          background:repeating-linear-gradient(
            -55deg,transparent,transparent 24px,
            rgba(26,58,107,0.02) 24px,rgba(26,58,107,0.02) 25px
          );
        }

        input:focus, select:focus, textarea:focus { outline:none; }
        select option { background:white; color:#1a1a2e; }
        input::placeholder, textarea::placeholder { color:rgba(26,26,46,0.35); }
      `}</style>

      {/* Warm dot bg — tan dots */}
      <div className="tvc-dots absolute inset-0 pointer-events-none"
        style={{ backgroundImage: "radial-gradient(circle,#c8b89a 1px,transparent 1px)", backgroundSize: "28px 28px" }} />

      {/* Diagonal stripe overlay */}
      <div className="diag-band absolute inset-0 pointer-events-none" />

      {/* Top bar — navy to orange */}
      <div className="absolute top-0 left-0 right-0 h-1"
        style={{ background: "linear-gradient(90deg,#1a3a6b,#b84a00,#1a3a6b,#b84a00)" }} />

      {/* Hairlines */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-px"
        style={{ background: "linear-gradient(90deg,transparent,rgba(26,58,107,0.18),transparent)" }} />
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[900px] h-px"
        style={{ background: "linear-gradient(90deg,transparent,rgba(26,58,107,0.18),transparent)" }} />

      {/* Warm ambient glows */}
      <div className="absolute top-0 right-0 w-[700px] h-[500px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(ellipse at top right,rgba(255,200,130,0.18) 0%,transparent 60%)", filter: "blur(60px)" }} />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(ellipse at bottom left,rgba(26,58,107,0.07) 0%,transparent 60%)", filter: "blur(80px)" }} />
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(ellipse at bottom right,rgba(184,74,0,0.05) 0%,transparent 65%)", filter: "blur(60px)" }} />

      {/* Floating shapes — matching About page */}
      <div className="float-el absolute top-20 right-12 pointer-events-none opacity-20 hidden lg:block">
        <div className="w-28 h-28 rounded-3xl border-2" style={{ borderColor: "#1a3a6b", transform: "rotate(12deg)" }} />
      </div>
      <div className="float-el absolute bottom-32 left-10 pointer-events-none opacity-14 hidden lg:block" style={{ animationDelay: "1.5s" }}>
        <div className="w-16 h-16 rounded-full border-2" style={{ borderColor: "#b84a00", borderStyle: "dashed" }} />
      </div>
      <div className="absolute top-1/3 right-6 pointer-events-none opacity-8 hidden xl:block">
        <div className="rotate-el w-44 h-44 rounded-full border" style={{ borderColor: "#1a3a6b", borderStyle: "dashed" }} />
      </div>

      <div className="relative max-w-7xl mx-auto">

        {/* ── HEADER ── */}
        <div className="text-center mb-16 flex flex-col items-center gap-4"
          style={{ animation: "fadeSlideUp 0.65s cubic-bezier(.22,1,.36,1) both" }}>

          {/* Eyebrow badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border"
            style={{ background: "#fff", borderColor: "rgba(26,58,107,0.18)", boxShadow: "0 2px 12px rgba(26,58,107,0.08)" }}>
            <span className="pdot" />
            <p className="text-[11px] font-bold tracking-[5px] uppercase" style={{ color: "#1a3a6b", margin: 0 }}>
              Get In Touch
            </p>
          </div>

          {/* Heading */}
          <h1 className="font-black leading-none tracking-[6px] uppercase"
            style={{ fontSize: "clamp(52px,8vw,90px)", color: "#1a1a2e" }}>
            Contact{" "}
            <span className="relative" style={{ color: "#1a3a6b" }}>
              Us
              <span className="absolute -bottom-2 left-0 right-0 h-[3px] rounded-full"
                style={{ background: "linear-gradient(90deg,#1a3a6b,#b84a00)" }} />
            </span>
          </h1>

          {/* Subtitle */}
          <div className="flex items-center gap-3 mt-1">
            <span className="w-8 h-0.5 rounded-full" style={{ background: "linear-gradient(90deg,#1a3a6b,transparent)" }} />
            <p className="text-[13px] font-bold tracking-[3px] uppercase italic" style={{ color: "rgba(26,26,46,0.5)", margin: 0 }}>
              We're Here to Help — Reach Out Anytime
            </p>
            <span className="w-8 h-0.5 rounded-full" style={{ background: "linear-gradient(90deg,transparent,#b84a00)" }} />
          </div>
        </div>

        {/* ── CONTACT INFO CARDS ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-16">
          {contactInfo.map((info, index) => {
            const Icon = info.icon;
            const Wrapper = info.href ? "a" : "div";
            return (
              <Wrapper
                key={info.label}
                href={info.href || undefined}
                className="group relative rounded-2xl p-6 flex flex-col gap-4 cursor-pointer overflow-hidden no-underline"
                style={{
                  background: "#fff",
                  border: "1.5px solid rgba(26,58,107,0.12)",
                  boxShadow: "0 2px 14px rgba(26,58,107,0.07)",
                  transition: "all .4s cubic-bezier(.22,1,.36,1)",
                  animation: `fadeSlideUp 0.55s cubic-bezier(.22,1,.36,1) ${index * 100}ms both`,
                  
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "#1a3a6b";
                  e.currentTarget.style.borderColor = "#1a3a6b";
                  e.currentTarget.style.transform = "translateY(-8px)";
                  e.currentTarget.style.boxShadow = "0 16px 40px rgba(26,58,107,0.25)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "#fff";
                  e.currentTarget.style.borderColor = "rgba(26,58,107,0.12)";
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "0 2px 14px rgba(26,58,107,0.07)";
                }}
              >
                {/* Top accent stripe */}
                <div className="absolute top-0 left-0 right-0 h-[3px] rounded-t-2xl"
                  style={{ background: "linear-gradient(90deg,#1a3a6b,#b84a00)" }} />

                {/* Icon box */}
                <div className="w-11 h-11 rounded-xl flex items-center justify-center transition-all duration-300"
                  style={{ background: "rgba(26,58,107,0.08)", border: "1px solid rgba(26,58,107,0.15)" }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = "rgba(255,255,255,0.18)";
                    e.currentTarget.style.borderColor = "rgba(255,255,255,0.3)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = "rgba(26,58,107,0.08)";
                    e.currentTarget.style.borderColor = "rgba(26,58,107,0.15)";
                  }}>
                  <Icon size={20} style={{ color: "#1a3a6b" }}
                    className="group-hover:!text-white transition-colors duration-300" />
                </div>

                <div>
                  <p className="text-[11px] font-bold tracking-[3px] uppercase mb-1 transition-colors duration-300"
                    style={{ color: "#b84a00", margin: 0 }}
                    onMouseEnter={e => e.currentTarget.style.color = "rgba(255,255,255,0.7)"}
                    onMouseLeave={e => e.currentTarget.style.color = "#b84a00"}>
                    {info.label}
                  </p>
                  <p className="text-sm font-bold leading-tight transition-colors duration-300 group-hover:!text-white"
                    style={{ color: "#1a1a2e", margin: "0 0 2px" }}>{info.value}</p>
                  <p className="text-sm transition-colors duration-300 group-hover:!text-white/65"
                    style={{ color: "rgba(26,26,46,0.5)", margin: 0 }}>{info.sub}</p>
                </div>

                {/* Arrow indicator */}
                <div className="absolute bottom-5 right-5 opacity-0 group-hover:opacity-100 translate-x-2 group-hover:translate-x-0 transition-all duration-300">
                  <span className="relative inline-block w-4 h-px bg-white">
                    <span className="absolute right-0 top-[-3px] w-1.5 h-1.5 border-t border-r border-white rotate-45 inline-block" />
                  </span>
                </div>
              </Wrapper>
            );
          })}
        </div>

        {/* ── MAIN: FORM + MAP ── */}
        <div className="grid lg:grid-cols-2 gap-8">

          {/* ── CONTACT FORM ── */}
          <div className="relative rounded-3xl p-8 md:p-10 overflow-hidden"
            style={{
              background: "#fff",
              border: "1.5px solid rgba(26,58,107,0.1)",
              boxShadow: "0 4px 24px rgba(26,58,107,0.07)",
              animation: "fadeSlideUp 0.65s cubic-bezier(.22,1,.36,1) 0.2s both",
            }}>

            {/* Left accent bar — navy to orange */}
            <div className="absolute left-0 top-0 bottom-0 w-1 rounded-l-3xl"
              style={{ background: "linear-gradient(180deg,#1a3a6b,#b84a00)" }} />

            {/* Top glow line */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2/3 h-px"
              style={{ background: "linear-gradient(90deg,transparent,rgba(26,58,107,0.18),transparent)" }} />

            {!submitted ? (
              <>
                {/* Form header */}
                <div className="mb-8 pl-3">
                  <div className="flex items-center gap-2 mb-3">
                    <MessageSquare size={15} style={{ color: "#1a3a6b" }} />
                    <p className="text-[11px] font-bold tracking-[3px] uppercase" style={{ color: "#b84a00", margin: 0 }}>
                      Send a Message
                    </p>
                  </div>
                  <h2 className="font-black leading-tight mb-2 uppercase"
                    style={{ fontSize: "clamp(26px,4vw,36px)", color: "#1a1a2e", letterSpacing: 2 }}>
                    Book a Repair{" "}
                    <span style={{ color: "#1a3a6b" }}>Instantly</span>
                  </h2>
                  <p className="text-sm leading-relaxed" style={{ color: "rgba(26,26,46,0.55)" }}>
                    Fill in the details and our team will get back to you within{" "}
                    <span className="font-bold" style={{ color: "#1a3a6b" }}>30 minutes</span>.
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="flex flex-col gap-5 pl-3">

                  {/* Name + Phone */}
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[11px] font-bold tracking-[2px] uppercase" style={{ color: "#1a3a6b" }}>
                        Your Name *
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. Ravi Kumar"
                        required
                        value={formState.name}
                        onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                        onFocus={() => setFocused("name")}
                        onBlur={() => setFocused("")}
                        className={inputCls("name")}
                        style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}
                      />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[11px] font-bold tracking-[2px] uppercase" style={{ color: "#1a3a6b" }}>
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        placeholder="+91 98765 43210"
                        required
                        value={formState.phone}
                        onChange={(e) => setFormState({ ...formState, phone: e.target.value })}
                        onFocus={() => setFocused("phone")}
                        onBlur={() => setFocused("")}
                        className={inputCls("phone")}
                        style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}
                      />
                    </div>
                  </div>

                  {/* Service */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[11px] font-bold tracking-[2px] uppercase" style={{ color: "#1a3a6b" }}>
                      Service Required *
                    </label>
                    <select
                      required
                      value={formState.service}
                      onChange={(e) => setFormState({ ...formState, service: e.target.value })}
                      onFocus={() => setFocused("service")}
                      onBlur={() => setFocused("")}
                      className={inputCls("service") + " cursor-pointer"}
                      style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}
                    >
                      <option value="">Select a service...</option>
                      {services.map((s) => (
                        <option key={s} value={s}>{s}</option>
                      ))}
                    </select>
                  </div>

                  {/* Message */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[11px] font-bold tracking-[2px] uppercase" style={{ color: "#1a3a6b" }}>
                      Describe Your Issue
                    </label>
                    <textarea
                      rows={4}
                      placeholder="Briefly describe the problem with your TV..."
                      value={formState.message}
                      onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                      onFocus={() => setFocused("message")}
                      onBlur={() => setFocused("")}
                      className={inputCls("message") + " resize-none"}
                      style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}
                    />
                  </div>

                  {/* Divider */}
                  <div className="w-full h-px"
                    style={{ background: "linear-gradient(90deg,rgba(26,58,107,0.18),rgba(184,74,0,0.15),transparent)" }} />

                  {/* Submit button — navy */}
                  <button
                    type="submit"
                    className="group relative w-full py-4 rounded-xl text-[11px] font-bold tracking-[3px] uppercase overflow-hidden transition-all duration-300 hover:-translate-y-0.5"
                    style={{
                      background: "linear-gradient(135deg,#1a3a6b,#0f2347)",
                      color: "#faf8f4",
                      boxShadow: "0 8px 28px rgba(26,58,107,0.3)",
                      fontFamily: "Georgia, serif",
                    }}
                    onMouseEnter={e => e.currentTarget.style.boxShadow = "0 14px 38px rgba(26,58,107,0.45)"}
                    onMouseLeave={e => e.currentTarget.style.boxShadow = "0 8px 28px rgba(26,58,107,0.3)"}
                  >
                    {/* Shimmer */}
                    <span className="absolute inset-0 pointer-events-none"
                      style={{
                        background: "linear-gradient(105deg,transparent 35%,rgba(255,255,255,0.1) 50%,transparent 65%)",
                      }} />
                    <span className="relative z-10 flex items-center justify-center gap-2">
                      <Send size={14} />
                      Send Message
                    </span>
                  </button>

                  {/* Privacy note */}
                  <p className="text-center text-xs tracking-wide" style={{ color: "rgba(26,26,46,0.35)" }}>
                    🔒 Your information is safe and will never be shared.
                  </p>
                </form>
              </>
            ) : (
              /* ── SUCCESS STATE ── */
              <div className="flex flex-col items-center justify-center text-center py-20 gap-6">
                <div className="w-20 h-20 rounded-full flex items-center justify-center border-2"
                  style={{
                    background: "#e8eef7",
                    borderColor: "#1a3a6b",
                    animation: "bounceIn 0.6s cubic-bezier(0.34,1.6,0.64,1) forwards",
                  }}>
                  <CheckCircle size={36} style={{ color: "#1a3a6b" }} />
                </div>
                <div>
                  <h3 className="font-black uppercase tracking-[4px] mb-2"
                    style={{ fontSize: "clamp(26px,4vw,34px)", color: "#1a1a2e" }}>
                    Message Sent!
                  </h3>
                  <p className="text-sm leading-relaxed" style={{ color: "rgba(26,26,46,0.5)" }}>
                    Our team will contact you within{" "}
                    <span className="font-bold" style={{ color: "#1a3a6b" }}>30 minutes</span>.
                  </p>
                </div>
                <button
                  onClick={() => { setSubmitted(false); setFormState({ name: "", phone: "", service: "", message: "" }); }}
                  className="px-6 py-2.5 rounded-full text-[11px] font-bold tracking-[2px] uppercase transition-all duration-300 hover:-translate-y-0.5"
                  style={{
                    background: "#1a3a6b",
                    color: "#faf8f4",
                   
                    boxShadow: "0 6px 20px rgba(26,58,107,0.25)",
                  }}
                  onMouseEnter={e => e.currentTarget.style.background = "#2e5fa3"}
                  onMouseLeave={e => e.currentTarget.style.background = "#1a3a6b"}
                >
                  Send Another
                </button>
              </div>
            )}
          </div>

          {/* ── RIGHT: MAP + CHIPS ── */}
          <div className="flex flex-col gap-5"
            style={{ animation: "fadeSlideUp 0.65s cubic-bezier(.22,1,.36,1) 0.35s both" }}>

            {/* Map embed */}
            <div className="relative rounded-3xl overflow-hidden flex-1 min-h-[280px]"
              style={{ border: "1.5px solid rgba(26,58,107,0.12)", boxShadow: "0 2px 14px rgba(26,58,107,0.07)" }}>
              <iframe
                title="KJ Electronics Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d31322.77387793965!2d76.9281!3d11.0071!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba859af2f971cb5%3A0x2fc1c81e183ed282!2sRS%20Puram%2C%20Coimbatore%2C%20Tamil%20Nadu!5e0!3m2!1sen!2sin!4v1234567890"
                width="100%"
                height="100%"
                style={{ border: 0, minHeight: "280px", filter: "saturate(0.65) contrast(1.05) sepia(0.08)" }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
              {/* Map badge */}
              <div className="absolute top-4 left-4 flex items-center gap-2 rounded-xl px-4 py-2.5 backdrop-blur-sm"
                style={{ background: "#fff", border: "1px solid rgba(26,58,107,0.15)", boxShadow: "0 4px 14px rgba(26,58,107,0.1)" }}>
                <MapPin size={13} style={{ color: "#1a3a6b" }} />
                <span className="text-[10px] font-bold tracking-[2px] uppercase" style={{ color: "#1a3a6b" }}>
                  RS Puram, Coimbatore
                </span>
              </div>
            </div>

            {/* Quick action chips */}
            <div className="grid grid-cols-2 gap-4">
              {/* Call chip */}
              <a href="tel:+919876543210"
                className="group relative rounded-2xl p-5 flex flex-col gap-3 cursor-pointer overflow-hidden no-underline transition-all duration-300 hover:-translate-y-1"
                style={{
                  background: "#fff",
                  border: "1.5px solid rgba(26,58,107,0.12)",
                  boxShadow: "0 2px 10px rgba(26,58,107,0.06)",
                  
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "#1a3a6b";
                  e.currentTarget.style.borderColor = "#1a3a6b";
                  e.currentTarget.style.boxShadow = "0 12px 32px rgba(26,58,107,0.25)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "#fff";
                  e.currentTarget.style.borderColor = "rgba(26,58,107,0.12)";
                  e.currentTarget.style.boxShadow = "0 2px 10px rgba(26,58,107,0.06)";
                }}
              >
                {/* Top accent */}
                <div className="absolute top-0 left-0 right-0 h-[3px] rounded-t-2xl"
                  style={{ background: "linear-gradient(90deg,#1a3a6b,#b84a00)" }} />
                <div className="w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300"
                  style={{ background: "rgba(26,58,107,0.08)", border: "1px solid rgba(26,58,107,0.15)" }}
                >
                  <Phone size={17} style={{ color: "#1a3a6b" }} className="group-hover:!text-white transition-colors duration-300" />
                </div>
                <div>
                  <p className="text-[9px] font-bold tracking-[2px] uppercase mb-0.5 group-hover:!text-white/70 transition-colors duration-300"
                    style={{ color: "#b84a00", margin: "0 0 2px" }}>Call Now</p>
                  <p className="text-sm font-bold group-hover:!text-white transition-colors duration-300"
                    style={{ color: "#1a1a2e", margin: 0 }}>+91 98765 43210</p>
                </div>
              </a>

              {/* WhatsApp chip */}
              <a href="https://wa.me/919876543210" target="_blank" rel="noreferrer"
                className="group relative rounded-2xl p-5 flex flex-col gap-3 cursor-pointer overflow-hidden no-underline transition-all duration-300 hover:-translate-y-1"
                style={{
                  background: "#fff",
                  border: "1.5px solid rgba(26,58,107,0.12)",
                  boxShadow: "0 2px 10px rgba(26,58,107,0.06)",
                
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "#b84a00";
                  e.currentTarget.style.borderColor = "#b84a00";
                  e.currentTarget.style.boxShadow = "0 12px 32px rgba(184,74,0,0.25)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "#fff";
                  e.currentTarget.style.borderColor = "rgba(26,58,107,0.12)";
                  e.currentTarget.style.boxShadow = "0 2px 10px rgba(26,58,107,0.06)";
                }}
              >
                {/* Top accent */}
                <div className="absolute top-0 left-0 right-0 h-[3px] rounded-t-2xl"
                  style={{ background: "linear-gradient(90deg,#b84a00,#1a3a6b)" }} />
                <div className="w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300"
                  style={{ background: "rgba(184,74,0,0.08)", border: "1px solid rgba(184,74,0,0.15)" }}>
                  <svg viewBox="0 0 24 24" className="w-[17px] h-[17px] transition-colors duration-300 group-hover:!fill-white"
                    style={{ fill: "#b84a00" }}>
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                  </svg>
                </div>
                <div>
                  <p className="text-[9px] font-bold tracking-[2px] uppercase mb-0.5 group-hover:!text-white/70 transition-colors duration-300"
                    style={{ color: "#b84a00", margin: "0 0 2px" }}>WhatsApp</p>
                  <p className="text-sm font-bold group-hover:!text-white transition-colors duration-300"
                    style={{ color: "#1a1a2e", margin: 0 }}>Chat With Us</p>
                </div>
              </a>
            </div>

            {/* Same-day service highlight strip */}
            <div className="rounded-2xl px-6 py-5 flex items-center gap-5 relative overflow-hidden"
              style={{
                background: "#fff",
                border: "1.5px solid rgba(26,58,107,0.1)",
                boxShadow: "0 2px 10px rgba(26,58,107,0.06)",
              }}>
              {/* Left accent bar — navy to orange */}
              <div className="absolute left-0 top-0 bottom-0 w-1 rounded-l-2xl"
                style={{ background: "linear-gradient(180deg,#1a3a6b,#b84a00)" }} />
              {/* Warm bg wash */}
              <div className="absolute inset-0 rounded-2xl pointer-events-none"
                style={{ background: "linear-gradient(90deg,rgba(26,58,107,0.03),transparent,rgba(184,74,0,0.02))" }} />

              <div className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0"
                style={{ background: "#e8eef7", border: "1px solid rgba(26,58,107,0.15)" }}>
                <Tv size={18} style={{ color: "#1a3a6b" }} />
              </div>
              <div className="flex-1 min-w-0 pl-1 relative">
                <p className="text-sm font-bold" style={{ color: "#1a1a2e", margin: "0 0 2px" }}>
                  Same-Day Repair Service
                </p>
                <p className="text-xs" style={{ color: "rgba(26,26,46,0.5)", margin: 0 }}>
                  Book before 2 PM — get your TV fixed today within 3 hours.
                </p>
              </div>
              <span className="shrink-0 px-3 py-1.5 rounded-full text-[10px] font-bold tracking-[1px] uppercase"
                style={{ background: "#1a3a6b", color: "#faf8f4", fontFamily: "Georgia, serif" }}>
                3 hrs
              </span>
            </div>

            {/* Trust badges */}
            <div className="grid grid-cols-3 gap-3">
              {[
                { val: "10+", lbl: "Years Experience" },
                { val: "50K+", lbl: "TVs Repaired" },
                { val: "100%", lbl: "Original Parts" },
              ].map((b, i) => (
                <div key={b.lbl}
                  className="rounded-xl py-4 px-2 text-center cursor-default transition-all duration-300 group relative overflow-hidden"
                  style={{
                    background: "#fff",
                    border: "1.5px solid rgba(26,58,107,0.1)",
                    boxShadow: "0 2px 10px rgba(26,58,107,0.05)",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = i % 2 === 0 ? "#1a3a6b" : "#b84a00";
                    e.currentTarget.style.borderColor = i % 2 === 0 ? "#1a3a6b" : "#b84a00";
                    e.currentTarget.style.boxShadow = i % 2 === 0
                      ? "0 6px 20px rgba(26,58,107,0.22)"
                      : "0 6px 20px rgba(184,74,0,0.22)";
                    e.currentTarget.style.transform = "translateY(-4px)";
                    const val = e.currentTarget.querySelector(".badge-val");
                    const lbl = e.currentTarget.querySelector(".badge-lbl");
                    if (val) val.style.color = "#faf8f4";
                    if (lbl) lbl.style.color = "rgba(250,248,244,0.7)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = "#fff";
                    e.currentTarget.style.borderColor = "rgba(26,58,107,0.1)";
                    e.currentTarget.style.boxShadow = "0 2px 10px rgba(26,58,107,0.05)";
                    e.currentTarget.style.transform = "translateY(0)";
                    const val = e.currentTarget.querySelector(".badge-val");
                    const lbl = e.currentTarget.querySelector(".badge-lbl");
                    if (val) val.style.color = "#1a3a6b";
                    if (lbl) lbl.style.color = "rgba(26,26,46,0.45)";
                  }}
                >
                  <p className="badge-val text-xl font-black leading-none mb-1 transition-colors duration-300"
                    style={{ color: "#1a3a6b", }}>{b.val}</p>
                  <p className="badge-lbl text-[9px] tracking-widest uppercase leading-tight transition-colors duration-300"
                    style={{ color: "rgba(26,26,46,0.45)" }}>{b.lbl}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}