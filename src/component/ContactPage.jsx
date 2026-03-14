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

  const inputCls = (field) =>
    `w-full rounded-xl px-4 py-3.5 text-sm font-medium outline-none transition-all duration-300
    bg-white text-gray-800 placeholder-gray-400
    border ${focused === field ? "border-[#2a4771] shadow-[0_0_0_3px_rgba(42,71,113,0.12)]" : "border-[#c5d3e8]"}`;

  return (
    <section className="w-full bg-white py-24 px-6 md:px-12 relative overflow-hidden">

      {/* Dot pattern */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.35]"
        style={{ backgroundImage: "radial-gradient(circle, #c7d4e8 1px, transparent 1px)", backgroundSize: "28px 28px" }} />

      {/* Top gradient bar */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#2a4771] to-[#3d5f96]" />

      {/* Hairlines */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[1px]"
        style={{ background: "linear-gradient(90deg, transparent, rgba(42,71,113,0.22), transparent)" }} />
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[900px] h-[1px]"
        style={{ background: "linear-gradient(90deg, transparent, rgba(42,71,113,0.22), transparent)" }} />

      {/* Soft glows */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] rounded-full blur-[130px] pointer-events-none opacity-20 bg-[#eef2f8]" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full blur-[120px] pointer-events-none opacity-15 bg-[#eef2f8]" />
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] rounded-full blur-[120px] pointer-events-none opacity-15 bg-[#eef2f8]" />

      <div className="relative max-w-7xl mx-auto">

        {/* ── HEADER ── */}
        <div className="text-center mb-16 flex flex-col items-center gap-4 animate-fadeUp">

          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#c5d3e8] bg-[#eef2f8]">
            <span className="w-1.5 h-1.5 rounded-full animate-pulse bg-[#2a4771]" />
            <p className="text-[10px] font-bold tracking-[4px] uppercase text-[#2a4771]">Get In Touch</p>
          </div>

          <h1 className="text-5xl md:text-7xl text-gray-900 uppercase leading-none tracking-widest"
            style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
            Contact{" "}
            <span className="relative text-[#2a4771]">
              Us
              <span className="absolute -bottom-2 left-0 right-0 h-[3px] rounded-full bg-gradient-to-r from-[#2a4771] to-[#3d5f96]" />
            </span>
          </h1>

          <div className="flex items-center gap-3 mt-1">
            <span className="w-8 h-[2px] rounded-full bg-[#2a4771]" />
            <p className="text-gray-400 text-xs font-medium tracking-[3px] uppercase italic">
              We're Here to Help — Reach Out Anytime
            </p>
            <span className="w-8 h-[2px] rounded-full bg-[#2a4771]" />
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
                className="group relative rounded-2xl p-6 flex flex-col gap-4 cursor-pointer overflow-hidden transition-all duration-400 no-underline"
                style={{
                  background: "#eef2f8",
                  border: "1px solid #c5d3e8",
                  animation: `fadeSlideUp 0.55s cubic-bezier(0.34,1.2,0.64,1) ${index * 100}ms both`,
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "#2a4771";
                  e.currentTarget.style.borderColor = "#2a4771";
                  e.currentTarget.style.transform = "translateY(-8px)";
                  e.currentTarget.style.boxShadow = "0 16px 40px rgba(42,71,113,0.22)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "#eef2f8";
                  e.currentTarget.style.borderColor = "#c5d3e8";
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "none";
                }}
              >
                {/* Icon box */}
                <div className="w-11 h-11 rounded-xl flex items-center justify-center transition-all duration-300
                  bg-[#2a4771]/10 border border-[#2a4771]/20
                  group-hover:bg-white/20 group-hover:border-white/30">
                  <Icon size={20} className="text-[#2a4771] group-hover:text-white transition-colors duration-300" />
                </div>

                <div>
                  <p className="text-[10px] font-bold tracking-[3px] uppercase mb-1 transition-colors duration-300
                    text-[#3d5f96] group-hover:text-white/70">{info.label}</p>
                  <p className="text-sm font-bold leading-tight transition-colors duration-300
                    text-gray-800 group-hover:text-white">{info.value}</p>
                  <p className="text-xs mt-0.5 transition-colors duration-300
                    text-gray-400 group-hover:text-white/65">{info.sub}</p>
                </div>

                {/* Arrow */}
                <div className="absolute bottom-5 right-5 opacity-0 group-hover:opacity-100 translate-x-2 group-hover:translate-x-0 transition-all duration-300">
                  <span className="relative inline-block w-4 h-px bg-white">
                    <span className="absolute right-0 top-[-3px] w-1.5 h-1.5 border-t border-r border-white rotate-45 inline-block" />
                  </span>
                </div>
              </Wrapper>
            );
          })}
        </div>

        {/* ── MAIN CONTENT: FORM + MAP ── */}
        <div className="grid lg:grid-cols-2 gap-8">

          {/* ── CONTACT FORM ── */}
          <div className="relative rounded-3xl p-8 md:p-10 overflow-hidden"
            style={{ background: "#f7f9fc", border: "1px solid #e2e8f2", animation: "fadeSlideUp 0.65s cubic-bezier(0.34,1.1,0.64,1) 0.2s both" }}>

            {/* Left accent bar */}
            <div className="absolute left-0 top-0 bottom-0 w-1 rounded-l-3xl bg-gradient-to-b from-[#2a4771] to-[#3d5f96]" />

            {/* Top glow line */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2/3 h-[1px]"
              style={{ background: "linear-gradient(90deg, transparent, rgba(42,71,113,0.2), transparent)" }} />

            {!submitted ? (
              <>
                {/* Form header */}
                <div className="mb-8 pl-3">
                  <div className="flex items-center gap-2 mb-3">
                    <MessageSquare size={15} className="text-[#2a4771]" />
                    <p className="text-[10px] font-bold tracking-[3px] uppercase text-[#2a4771]">Send a Message</p>
                  </div>
                  <h2 className="text-3xl md:text-4xl text-gray-900 uppercase leading-tight mb-2"
                    style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
                    Book a Repair{" "}
                    <span className="text-[#2a4771]">Instantly</span>
                  </h2>
                  <p className="text-gray-400 text-sm leading-relaxed">
                    Fill in the details and our team will get back to you within <span className="font-bold text-[#2a4771]">30 minutes</span>.
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="flex flex-col gap-5 pl-3">

                  {/* Name + Phone row */}
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[10px] font-bold tracking-[2px] uppercase text-[#2a4771]">Your Name *</label>
                      <input
                        type="text"
                        placeholder="e.g. Ravi Kumar"
                        required
                        value={formState.name}
                        onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                        onFocus={() => setFocused("name")}
                        onBlur={() => setFocused("")}
                        className={inputCls("name")}
                      />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[10px] font-bold tracking-[2px] uppercase text-[#2a4771]">Phone Number *</label>
                      <input
                        type="tel"
                        placeholder="+91 98765 43210"
                        required
                        value={formState.phone}
                        onChange={(e) => setFormState({ ...formState, phone: e.target.value })}
                        onFocus={() => setFocused("phone")}
                        onBlur={() => setFocused("")}
                        className={inputCls("phone")}
                      />
                    </div>
                  </div>

                  {/* Service */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] font-bold tracking-[2px] uppercase text-[#2a4771]">Service Required *</label>
                    <select
                      required
                      value={formState.service}
                      onChange={(e) => setFormState({ ...formState, service: e.target.value })}
                      onFocus={() => setFocused("service")}
                      onBlur={() => setFocused("")}
                      className={inputCls("service") + " cursor-pointer"}
                    >
                      <option value="">Select a service...</option>
                      {services.map((s) => (
                        <option key={s} value={s}>{s}</option>
                      ))}
                    </select>
                  </div>

                  {/* Message */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] font-bold tracking-[2px] uppercase text-[#2a4771]">Describe Your Issue</label>
                    <textarea
                      rows={4}
                      placeholder="Briefly describe the problem with your TV..."
                      value={formState.message}
                      onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                      onFocus={() => setFocused("message")}
                      onBlur={() => setFocused("")}
                      className={inputCls("message") + " resize-none"}
                    />
                  </div>

                  {/* Divider */}
                  <div className="w-full h-px bg-gradient-to-r from-[#2a4771]/20 via-[#c5d3e8] to-transparent" />

                  {/* Submit */}
                  <button
                    type="submit"
                    className="group relative w-full py-4 rounded-xl text-white text-xs font-bold tracking-[3px] uppercase overflow-hidden transition-all duration-300
                      bg-[#2a4771] shadow-[0_8px_28px_rgba(42,71,113,0.32)]
                      hover:bg-[#3d5f96] hover:shadow-[0_12px_36px_rgba(42,71,113,0.48)] hover:-translate-y-0.5"
                  >
                    <span className="relative z-10 flex items-center justify-center gap-2">
                      <Send size={14} />
                      Send Message
                    </span>
                  </button>

                  {/* Privacy note */}
                  <p className="text-center text-[10px] text-gray-400 tracking-wide">
                    🔒 Your information is safe and will never be shared.
                  </p>
                </form>
              </>
            ) : (
              /* ── SUCCESS STATE ── */
              <div className="flex flex-col items-center justify-center text-center py-20 gap-6">
                <div className="w-20 h-20 rounded-full flex items-center justify-center bg-[#eef2f8] border-2 border-[#2a4771]"
                  style={{ animation: "bounceIn 0.6s cubic-bezier(0.34,1.6,0.64,1) forwards" }}>
                  <CheckCircle size={36} className="text-[#2a4771]" />
                </div>
                <div>
                  <h3 className="text-3xl text-gray-900 uppercase tracking-widest mb-2"
                    style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
                    Message Sent!
                  </h3>
                  <p className="text-gray-400 text-sm leading-relaxed">
                    Our team will contact you within{" "}
                    <span className="font-bold text-[#2a4771]">30 minutes</span>.
                  </p>
                </div>
                <button
                  onClick={() => { setSubmitted(false); setFormState({ name: "", phone: "", service: "", message: "" }); }}
                  className="px-6 py-2.5 rounded-full text-xs font-bold tracking-[2px] uppercase text-white transition-colors duration-300
                    bg-[#2a4771] hover:bg-[#3d5f96]"
                >
                  Send Another
                </button>
              </div>
            )}
          </div>

          {/* ── RIGHT: MAP + CHIPS ── */}
          <div className="flex flex-col gap-5" style={{ animation: "fadeSlideUp 0.65s cubic-bezier(0.34,1.1,0.64,1) 0.35s both" }}>

            {/* Map embed */}
            <div className="relative rounded-3xl overflow-hidden border border-[#c5d3e8] shadow-sm flex-1 min-h-[280px]">
              <iframe
                title="KJ Electronics Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d31322.77387793965!2d76.9281!3d11.0071!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba859af2f971cb5%3A0x2fc1c81e183ed282!2sRS%20Puram%2C%20Coimbatore%2C%20Tamil%20Nadu!5e0!3m2!1sen!2sin!4v1234567890"
                width="100%"
                height="100%"
                style={{ border: 0, minHeight: "280px", filter: "saturate(0.75) contrast(1.05)" }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
              <div className="absolute top-4 left-4 flex items-center gap-2 rounded-xl px-4 py-2.5 shadow-lg backdrop-blur-sm bg-white border border-[#c5d3e8]">
                <MapPin size={13} className="text-[#2a4771]" />
                <span className="text-[10px] font-bold tracking-[2px] uppercase text-[#2a4771]">RS Puram, Coimbatore</span>
              </div>
            </div>

            {/* Quick action chips */}
            <div className="grid grid-cols-2 gap-4">
              <a href="tel:+919876543210"
                className="group relative rounded-2xl p-5 flex flex-col gap-3 cursor-pointer overflow-hidden transition-all duration-300 no-underline
                  hover:-translate-y-1 hover:shadow-[0_12px_32px_rgba(42,71,113,0.22)]"
                style={{ background: "#eef2f8", border: "1px solid #c5d3e8" }}
                onMouseEnter={(e) => { e.currentTarget.style.background = "#2a4771"; e.currentTarget.style.borderColor = "#2a4771"; }}
                onMouseLeave={(e) => { e.currentTarget.style.background = "#eef2f8"; e.currentTarget.style.borderColor = "#c5d3e8"; }}
              >
                <div className="w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300
                  bg-[#2a4771]/10 border border-[#2a4771]/20
                  group-hover:bg-white/20 group-hover:border-white/30">
                  <Phone size={17} className="text-[#2a4771] group-hover:text-white transition-colors duration-300" />
                </div>
                <div>
                  <p className="text-[9px] font-bold tracking-[2px] uppercase mb-0.5 text-[#3d5f96] group-hover:text-white/70 transition-colors duration-300">Call Now</p>
                  <p className="text-sm font-bold text-gray-800 group-hover:text-white transition-colors duration-300">+91 98765 43210</p>
                </div>
              </a>

              <a href="https://wa.me/919876543210" target="_blank" rel="noreferrer"
                className="group relative rounded-2xl p-5 flex flex-col gap-3 cursor-pointer overflow-hidden transition-all duration-300 no-underline
                  hover:-translate-y-1 hover:shadow-[0_12px_32px_rgba(42,71,113,0.22)]"
                style={{ background: "#eef2f8", border: "1px solid #c5d3e8" }}
                onMouseEnter={(e) => { e.currentTarget.style.background = "#2a4771"; e.currentTarget.style.borderColor = "#2a4771"; }}
                onMouseLeave={(e) => { e.currentTarget.style.background = "#eef2f8"; e.currentTarget.style.borderColor = "#c5d3e8"; }}
              >
                <div className="w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300
                  bg-[#2a4771]/10 border border-[#2a4771]/20
                  group-hover:bg-white/20 group-hover:border-white/30">
                  <svg viewBox="0 0 24 24" className="w-[17px] h-[17px] transition-colors duration-300 fill-[#2a4771] group-hover:fill-white">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                  </svg>
                </div>
                <div>
                  <p className="text-[9px] font-bold tracking-[2px] uppercase mb-0.5 text-[#3d5f96] group-hover:text-white/70 transition-colors duration-300">WhatsApp</p>
                  <p className="text-sm font-bold text-gray-800 group-hover:text-white transition-colors duration-300">Chat With Us</p>
                </div>
              </a>
            </div>

            {/* Service highlight strip */}
            <div className="rounded-2xl px-6 py-5 flex items-center gap-5 relative overflow-hidden shadow-sm"
              style={{ background: "#f7f9fc", border: "1px solid #e2e8f2" }}>
              <div className="absolute left-0 top-0 bottom-0 w-1 rounded-l-2xl bg-gradient-to-b from-[#2a4771] to-[#3d5f96]" />
              <div className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0 bg-[#eef2f8] border border-[#c5d3e8]">
                <Tv size={18} className="text-[#2a4771]" />
              </div>
              <div className="flex-1 min-w-0 pl-1">
                <p className="text-gray-900 text-sm font-bold">Same-Day Repair Service</p>
                <p className="text-gray-400 text-xs mt-0.5">Book before 2 PM — get your TV fixed today within 3 hours.</p>
              </div>
              <span className="shrink-0 px-3 py-1.5 rounded-full text-[10px] font-bold tracking-[1px] uppercase text-white bg-[#2a4771]">
                3 hrs
              </span>
            </div>

            {/* Trust badges row */}
            <div className="grid grid-cols-3 gap-3">
              {[
                { val: "10+", lbl: "Years Experience" },
                { val: "50K+", lbl: "TVs Repaired" },
                { val: "100%", lbl: "Original Parts" },
              ].map((b) => (
                <div key={b.lbl} className="rounded-xl py-4 px-2 text-center transition-all duration-300 cursor-default
                  bg-[#eef2f8] border border-[#c5d3e8]
                  hover:bg-[#2a4771] hover:border-[#2a4771] hover:shadow-[0_6px_20px_rgba(42,71,113,0.2)] group">
                  <p className="text-xl font-black leading-none mb-1 text-[#2a4771] group-hover:text-white transition-colors duration-300"
                    style={{ fontFamily: "'Bebas Neue', sans-serif" }}>{b.val}</p>
                  <p className="text-[9px] tracking-widest uppercase leading-tight text-gray-400 group-hover:text-white/75 transition-colors duration-300">{b.lbl}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&display=swap');

        @keyframes fadeSlideUp {
          from { opacity: 0; transform: translateY(28px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes bounceIn {
          0%   { transform: scale(0.5); opacity: 0; }
          70%  { transform: scale(1.1); }
          100% { transform: scale(1); opacity: 1; }
        }

        input:focus, select:focus, textarea:focus { outline: none; }
        select option { background: white; color: #1f2937; }

        input::placeholder, textarea::placeholder { color: #9ca3af; }
      `}</style>
    </section>
  );
}