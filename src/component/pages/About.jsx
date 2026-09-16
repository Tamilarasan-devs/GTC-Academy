import React, { useState, useEffect } from "react";
import api from "../../utils/api";
import { Users, Target, BookOpen, CheckCircle, Eye, TrendingUp, Award, Star } from "lucide-react";

export default function About() {
  const [faculty, setFaculty] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFaculty = async () => {
      try {
        const res = await api.get("/faculty");
        setFaculty(res.data.faculty);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchFaculty();
  }, []);

  return (
    <div className="bg-[#FAFAF8] overflow-hidden font-['Inter',sans-serif]">

      {/* ── HERO ── */}
      <section className="relative text-white overflow-hidden pt-28 pb-20" style={{ background: "linear-gradient(135deg, #071344 0%, #0b1e69 60%, #162a80 100%)" }}>
        {/* Ambient blobs */}
        <div className="absolute top-[-100px] right-[-100px] w-[600px] h-[600px] rounded-full pointer-events-none" style={{ background: "radial-gradient(circle, rgba(229,99,1,0.2) 0%, transparent 70%)" }} />
        <div className="absolute bottom-[-80px] left-[10%] w-[400px] h-[400px] rounded-full pointer-events-none" style={{ background: "radial-gradient(circle, rgba(229,99,1,0.15) 0%, transparent 70%)" }} />

        <div className="relative z-10 max-w-7xl mx-auto px-8">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-10 items-center">
            {/* Left */}
            <div>
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold tracking-widest uppercase mb-6 border" style={{ background: "rgba(255,255,255,0.1)", borderColor: "rgba(229,99,1,0.4)" }}>
                <Star size={12} className="text-[#e56301]" />
                About GTC Education Academy
              </span>
              <h1 className="font-sans font-extrabold mb-6 leading-tight" style={{ fontSize: "clamp(36px,5vw,64px)" }}>
                Shaping Tomorrow's<br />
                <span className="text-[#e56301]">Finance &amp; Skill</span> Leaders
              </h1>
              <p className="text-lg leading-relaxed mb-8 max-w-xl" style={{ color: "rgba(255,255,255,0.8)" }}>
                Premier destination for practical accounting, taxation &amp; skill training — bridging classroom knowledge with real-world industry skills.
              </p>
              <div className="flex flex-wrap gap-3">
                <span className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold text-white bg-[#e56301]">
                  <CheckCircle size={14} /> MSME Certified
                </span>
                <span className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold text-white bg-[#e56301]">
                  <Award size={14} /> Industry-Recognized Courses
                </span>
              </div>
            </div>

            {/* Right — floating stat cards */}
            <div className="flex flex-col gap-4 min-w-[170px]">
              <div className="text-center text-white rounded-2xl py-5 px-7" style={{ background: "linear-gradient(135deg,#e56301,#c75400)", boxShadow: "0 8px 30px rgba(229,99,1,0.4)" }}>
                <div className="text-5xl font-black leading-none">50+</div>
                <div className="text-xs mt-1 opacity-85">Students Placed</div>
              </div>
              <div className="text-center rounded-2xl py-5 px-7 border" style={{ background: "rgba(255,255,255,0.1)", backdropFilter: "blur(10px)", borderColor: "rgba(255,255,255,0.2)" }}>
                <div className="text-5xl font-black leading-none text-amber-400">10+</div>
                <div className="text-xs mt-1 opacity-85">Years of Excellence</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Wave */}
      <div style={{ background: "#0C1A3D", marginTop: "-1px", lineHeight: 0 }}>
        <svg viewBox="0 0 1440 60" xmlns="http://www.w3.org/2000/svg" className="block w-full">
          <path d="M0,30 C360,60 1080,0 1440,30 L1440,60 L0,60 Z" fill="#FAFAF8" />
        </svg>
      </div>

      {/* ── MISSION / VISION / WHY ── */}
      <section className="py-20 max-w-7xl mx-auto px-8">
        <div className="text-center mb-14">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold tracking-widest uppercase mb-4" style={{ background: "rgba(14,165,233,0.1)", color: "#0ea5e9", border: "1px solid rgba(14,165,233,0.2)" }}>
            Our Foundation
          </span>
          <h2 className="font-['Playfair_Display',serif] font-extrabold text-[#0C1A3D]" style={{ fontSize: "clamp(28px,4vw,44px)" }}>
            What Drives Us Forward
          </h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-7">
          {/* Mission */}
          <div className="bg-white rounded-3xl p-10 border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 relative overflow-hidden group">
            <div className="absolute top-0 left-0 right-0 h-1 rounded-t-3xl" style={{ background: "linear-gradient(90deg,#0ea5e9,#6366f1)" }} />
            <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-7" style={{ background: "#eff6ff" }}>
              <Target size={28} className="text-sky-500" />
            </div>
            <h3 className="text-xl font-extrabold text-[#0C1A3D] mb-4">Our Mission</h3>
            <p className="text-slate-500 leading-relaxed text-sm">
              To bridge the gap between academic education and industry requirements by providing practical, real-world training that makes our students{" "}
              <strong className="text-[#0C1A3D]">day-one job ready</strong> in finance and taxation.
            </p>
            <div className="mt-7 pt-6 border-t border-slate-100 flex flex-wrap gap-2">
              <span className="text-xs bg-sky-50 text-sky-600 px-3 py-1 rounded-full font-semibold">Practical First</span>
              <span className="text-xs bg-green-50 text-green-600 px-3 py-1 rounded-full font-semibold">Industry Aligned</span>
            </div>
          </div>

          {/* Vision */}
          <div className="bg-white rounded-3xl p-10 border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 relative overflow-hidden group">
            <div className="absolute top-0 left-0 right-0 h-1 rounded-t-3xl" style={{ background: "linear-gradient(90deg,#6366f1,#8b5cf6)" }} />
            <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-7" style={{ background: "#eef2ff" }}>
              <Eye size={28} className="text-indigo-500" />
            </div>
            <h3 className="text-xl font-extrabold text-[#0C1A3D] mb-4">Our Vision</h3>
            <p className="text-slate-500 leading-relaxed text-sm">
              To be the <strong className="text-[#0C1A3D]">most trusted institution</strong> for professional skill development in South India — recognized for quality training, expert faculty, and exceptional placement records.
            </p>
            <div className="mt-7 pt-6 border-t border-slate-100 flex flex-wrap gap-2">
              <span className="text-xs bg-indigo-50 text-indigo-600 px-3 py-1 rounded-full font-semibold">Trusted Leader</span>
              <span className="text-xs bg-orange-50 text-orange-600 px-3 py-1 rounded-full font-semibold">Excellence Driven</span>
            </div>
          </div>

          {/* Why Us */}
          <div className="rounded-3xl p-10 text-white relative overflow-hidden" style={{ background: "linear-gradient(135deg,#0C1A3D,#1e3a8a)" }}>
            <div className="absolute top-[-40px] right-[-40px] w-36 h-36 rounded-full" style={{ background: "rgba(14,165,233,0.15)" }} />
            <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-7 relative z-10" style={{ background: "rgba(255,255,255,0.1)" }}>
              <TrendingUp size={28} className="text-amber-400" />
            </div>
            <h3 className="text-xl font-extrabold mb-5 relative z-10">Why Choose GTC?</h3>
            <ul className="space-y-3 relative z-10">
              {[
                "100% Practical, software-based training",
                "Real business case studies & live projects",
                "Dedicated placement assistance",
                "Small batch sizes for personal attention",
              ].map((item) => (
                <li key={item} className="flex items-start gap-2.5 text-sm" style={{ color: "rgba(255,255,255,0.85)" }}>
                  <CheckCircle size={15} className="text-amber-400 mt-0.5 shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ── FOUNDER ── */}
      <section className="bg-white border-y border-slate-100 py-20">
        <div className="max-w-7xl mx-auto px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Image */}
            <div className="relative">
              <div className="absolute inset-0 rounded-3xl rotate-3 scale-105 opacity-20" style={{ background: "linear-gradient(135deg,#0ea5e9,#6366f1)" }} />
              <div className="relative rounded-3xl overflow-hidden h-[480px]">
                <img
                  src="https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=2000"
                  alt="Founder Mr. Ganesh Kumar"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(12,26,61,0.6), transparent)" }} />
                <div className="absolute bottom-6 left-6">
                  <div className="bg-white rounded-2xl px-5 py-4 inline-flex items-center gap-3 shadow-xl">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center text-white" style={{ background: "linear-gradient(135deg,#0ea5e9,#6366f1)" }}>
                      <Award size={18} />
                    </div>
                    <div>
                      <div className="font-extrabold text-sm text-[#0C1A3D]">Mr. Ganesh Kumar</div>
                      <div className="text-xs font-semibold text-sky-500">Founder &amp; Chief Trainer</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Content */}
            <div>
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold tracking-widest uppercase mb-5" style={{ background: "rgba(14,165,233,0.1)", color: "#0ea5e9", border: "1px solid rgba(14,165,233,0.2)" }}>
                Founder's Message
              </span>
              <h2 className="font-['Playfair_Display',serif] font-extrabold text-[#0C1A3D] mb-8 leading-snug" style={{ fontSize: "clamp(26px,3.5vw,40px)" }}>
                Building the Future of Finance Professionals
              </h2>
              <div className="border-l-4 border-sky-400 pl-6 space-y-4">
                <p className="text-slate-500 leading-[1.9] text-[15.5px]">
                  "When we started GTC Solutions, we noticed a significant gap between what students learn in colleges and what companies actually expect. Many graduates struggle with real-world accounting tasks, GST filing, or practical software operations."
                </p>
                <p className="text-slate-500 leading-[1.9] text-[15.5px]">
                  "GTC Education Academy was born from this necessity. Our goal is not just to teach, but to{" "}
                  <strong className="text-[#0C1A3D]">train with purpose</strong>. When our students walk into an interview, they don't just carry a certificate — they carry the confidence and skills to perform from day one."
                </p>
              </div>
              <div className="mt-9 pt-7 border-t border-slate-100 flex items-center gap-5">
                <div className="w-13 h-13 rounded-2xl flex items-center justify-center" style={{ background: "linear-gradient(135deg,#eff6ff,#eef2ff)" }}>
                  <BookOpen size={24} className="text-indigo-500" />
                </div>
                <div>
                  <div className="font-extrabold text-[#0C1A3D]">10+ Years of Training Excellence</div>
                  <div className="text-xs text-slate-400 mt-0.5">Former CA Firm Associate · GST Practitioner · Tally Expert</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── FACULTY ── */}
      <section className="py-20 bg-[#FAFAF8]">
        <div className="max-w-7xl mx-auto px-8">
          <div className="text-center mb-14">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold tracking-widest uppercase mb-4" style={{ background: "rgba(14,165,233,0.1)", color: "#0ea5e9", border: "1px solid rgba(14,165,233,0.2)" }}>
              <Users size={12} /> Our Expert Team
            </span>
            <h2 className="font-['Playfair_Display',serif] font-extrabold text-[#0C1A3D] mb-4" style={{ fontSize: "clamp(28px,4vw,44px)" }}>
              Learn from the Best
            </h2>
            <p className="text-slate-500 text-base max-w-lg mx-auto leading-relaxed">
              Our trainers are industry professionals who bring real CA firm experience directly into your training session.
            </p>
          </div>

          {loading ? (
            <div className="flex justify-center py-16">
              <div className="w-10 h-10 border-4 border-sky-500 border-t-transparent rounded-full animate-spin" />
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {faculty.map((f) => (
                <div
                  key={f._id}
                  className="bg-white rounded-2xl overflow-hidden border border-slate-100 shadow-sm group transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl"
                >
                  {/* Animated accent bar */}
                  <div className="h-1 origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300 rounded-t" style={{ background: "linear-gradient(90deg,#0ea5e9,#6366f1)" }} />
                  {/* Photo */}
                  <div className="h-56 bg-gradient-to-br from-blue-50 to-indigo-100 relative overflow-hidden">
                    {f.photoUrl ? (
                      <img
                        src={`http://localhost:8080${f.photoUrl}`}
                        alt={f.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <Users size={64} className="text-blue-200" />
                      </div>
                    )}
                  </div>
                  {/* Info */}
                  <div className="p-6">
                    <h3 className="text-[17px] font-extrabold text-[#0C1A3D] mb-1">{f.name}</h3>
                    <p className="text-sky-500 font-semibold text-sm mb-4">{f.designation}</p>
                    <div className="space-y-2 text-sm text-slate-500">
                      <p className="flex items-start gap-2">
                        <CheckCircle size={14} className="text-green-500 mt-0.5 shrink-0" />
                        <span>{f.qualification}</span>
                      </p>
                      <p className="flex items-start gap-2">
                        <CheckCircle size={14} className="text-green-500 mt-0.5 shrink-0" />
                        <span>{f.experience}</span>
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ── STATS ── */}
      <section className="py-16 relative overflow-hidden" style={{ background: "linear-gradient(135deg,#0C1A3D 0%,#1e3a8a 60%,#0ea5e9 100%)" }}>
        <div className="absolute top-[-60px] right-[-60px] w-72 h-72 rounded-full pointer-events-none" style={{ background: "rgba(14,165,233,0.1)" }} />
        <div className="absolute bottom-[-80px] left-[-40px] w-64 h-64 rounded-full pointer-events-none" style={{ background: "rgba(245,158,11,0.08)" }} />
        <div className="relative z-10 max-w-7xl mx-auto px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-white/20">
            {[
              { val: "10+", label: "Years Experience", color: "text-white" },
              { val: "500+", label: "Students Placed", color: "text-amber-400" },
              { val: "15+", label: "Expert Courses", color: "text-white" },
              { val: "100%", label: "Practical Training", color: "text-emerald-400" },
            ].map(({ val, label, color }) => (
              <div key={label} className="text-center px-6 py-4">
                <div className={`font-black leading-none mb-2 ${color}`} style={{ fontSize: "clamp(32px,5vw,56px)" }}>{val}</div>
                <div className="text-xs font-bold tracking-widest uppercase" style={{ color: "rgba(255,255,255,0.6)" }}>{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}