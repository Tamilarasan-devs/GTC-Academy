import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import api from "../../utils/api";
import {
  BookOpen, Award, Users, CheckCircle, ArrowRight,
  PlayCircle, Star, TrendingUp, Zap, Shield, ChevronRight,
  BarChart2, Briefcase, Clock, Globe
} from "lucide-react";

/* ─── Animated counter hook ─────────────────────────────── */
function useCounter(target, duration = 1800, start = false) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!start) return;
    let startTime = null;
    const step = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      setCount(Math.floor(progress * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [target, duration, start]);
  return count;
}

/* ─── Stat card with animated counter ───────────────────── */
function StatCard({ value, suffix, label, icon: Icon, started }) {
  const count = useCounter(value, 1800, started);
  return (
    <div className="flex flex-col items-center gap-1">
      <div className="flex items-end gap-1">
        <span className="text-4xl md:text-5xl font-black text-white tabular-nums">
          {count}
        </span>
        <span className="text-2xl font-black text-blue-400 mb-1">{suffix}</span>
      </div>
      <span className="text-slate-400 text-sm font-medium tracking-wide uppercase">{label}</span>
    </div>
  );
}

export default function Home() {
  const [featuredCourses, setFeaturedCourses] = useState([]);
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [statsVisible, setStatsVisible] = useState(false);
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const statsRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [coursesRes, testsRes] = await Promise.all([
          api.get("/courses"),
          api.get("/testimonials"),
        ]);
        setFeaturedCourses(coursesRes.data.courses.filter(c => c.isFeatured).slice(0, 3));
        setTestimonials(testsRes.data.testimonials.slice(0, 3));
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  /* Intersection observer for stat counter */
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setStatsVisible(true); },
      { threshold: 0.3 }
    );
    if (statsRef.current) observer.observe(statsRef.current);
    return () => observer.disconnect();
  }, []);

  /* Auto-rotate testimonials */
  useEffect(() => {
    if (!testimonials.length) return;
    const id = setInterval(() => {
      setActiveTestimonial(p => (p + 1) % testimonials.length);
    }, 4500);
    return () => clearInterval(id);
  }, [testimonials.length]);

  const tools = ["Tally Prime", "GST Filing", "SAP FICO", "Income Tax", "TDS Returns", "MS Excel"];

  return (
    <div className="overflow-hidden font-sans">

      {/* ══════════════════════════════════════════
          HERO
      ══════════════════════════════════════════ */}
      <section className="relative min-h-screen flex items-center bg-[#040B1C] text-white pt-20 pb-12">
        {/* Mesh-gradient blobs */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute top-[-15%] right-[-8%] w-[55%] h-[65%] rounded-full bg-blue-700/25 blur-[140px]" />
          <div className="absolute bottom-[-10%] left-[-5%] w-[45%] h-[55%] rounded-full bg-indigo-700/20 blur-[140px]" />
          {/* Grid overlay */}
          <div
            className="absolute inset-0 opacity-[0.04]"
            style={{
              backgroundImage:
                "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
              backgroundSize: "60px 60px",
            }}
          />
        </div>

        <div className="relative max-w-7xl mx-auto px-6 w-full">
          <div className="grid lg:grid-cols-2 gap-16 items-center">

            {/* Left copy */}
            <div className="space-y-8 z-10">
              {/* Eyebrow pill */}
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-blue-500/40 bg-blue-500/10 backdrop-blur-md">
                <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                <span className="text-sm font-semibold text-blue-300 tracking-wide">
                  India's #1 Finance Training Institute
                </span>
              </div>

              <h1 className="text-5xl md:text-[4.25rem] font-black leading-[1.08] tracking-tight">
                Build a Career in{" "}
                <span className="relative inline-block">
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-400 to-cyan-400">
                    Finance &amp; Tax
                  </span>
                  {/* underline accent */}
                  <svg className="absolute -bottom-2 left-0 w-full" height="6" viewBox="0 0 200 6">
                    <path d="M0 5 Q100 0 200 5" stroke="url(#ul)" strokeWidth="3" fill="none" strokeLinecap="round" />
                    <defs>
                      <linearGradient id="ul" x1="0" x2="1">
                        <stop offset="0%" stopColor="#60A5FA" />
                        <stop offset="100%" stopColor="#22D3EE" />
                      </linearGradient>
                    </defs>
                  </svg>
                </span>{" "}
                That Lasts
              </h1>

              <p className="text-slate-300 text-lg leading-relaxed max-w-lg">
                Hands-on training in Tally Prime, GST, Income Tax &amp; SAP by seasoned professionals — with a job guarantee that actually means something.
              </p>

              {/* Scrolling tools ticker */}
              <div className="overflow-hidden rounded-xl border border-white/10 bg-white/5 backdrop-blur-md py-3">
                <div className="flex gap-8 animate-[ticker_14s_linear_infinite] whitespace-nowrap">
                  {[...tools, ...tools].map((t, i) => (
                    <span key={i} className="flex items-center gap-2 text-sm font-semibold text-slate-300">
                      <Zap size={13} className="text-blue-400" /> {t}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex flex-wrap gap-4">
                <Link
                  to="/course"
                  className="group px-8 py-4 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-bold text-lg transition-all duration-300 shadow-lg shadow-blue-700/40 hover:shadow-blue-500/50 hover:-translate-y-0.5 flex items-center gap-2"
                >
                  Browse Courses
                  <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link
                  to="/about"
                  className="px-8 py-4 bg-white/8 hover:bg-white/12 border border-white/15 text-white rounded-xl font-bold text-lg transition-all duration-300 flex items-center gap-2 group"
                >
                  <PlayCircle size={20} className="text-blue-400" /> Watch Demo
                </Link>
              </div>

              {/* Social proof row */}
              <div className="flex items-center gap-5 pt-6 border-t border-white/10">
                <div className="flex -space-x-3">
                  {["A", "B", "C", "D", "E"].map((l, i) => (
                    <div
                      key={i}
                      className="w-10 h-10 rounded-full border-2 border-[#040B1C] flex items-center justify-center text-xs font-bold text-white shadow-md"
                      style={{ background: `hsl(${220 + i * 15}, 70%, 55%)` }}
                    >
                      {l}
                    </div>
                  ))}
                </div>
                <div>
                  <div className="flex gap-0.5 text-amber-400 text-base">{"★★★★★"}</div>
                  <p className="text-sm text-slate-400">
                    <span className="text-white font-bold">500+</span> students placed across India
                  </p>
                </div>
              </div>
            </div>

            {/* Right visual */}
            <div className="relative hidden lg:flex items-center justify-center z-10">
              {/* Decorative ring */}
              <div className="absolute w-[460px] h-[460px] rounded-full border border-blue-500/20 animate-[spin_30s_linear_infinite]" />
              <div className="absolute w-[380px] h-[380px] rounded-full border border-indigo-500/15 animate-[spin_20s_linear_infinite_reverse]" />

              <div className="relative w-[340px] h-[440px] rounded-3xl overflow-hidden border border-white/10 shadow-2xl">
                <img
                  src="https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=2070&auto=format&fit=crop"
                  alt="Students learning"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#040B1C]/80 via-transparent to-transparent" />
              </div>

              {/* Floating badge – placement */}
              <div className="absolute -bottom-4 -left-8 bg-white/10 backdrop-blur-xl border border-white/20 px-5 py-4 rounded-2xl shadow-xl flex items-center gap-3">
                <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center shadow-lg">
                  <CheckCircle size={20} className="text-white" />
                </div>
                <div>
                  <p className="text-white font-black text-lg leading-none">100%</p>
                  <p className="text-slate-300 text-xs mt-0.5">Placement Assistance</p>
                </div>
              </div>

              {/* Floating badge – live classes */}
              <div className="absolute -top-4 -right-6 bg-white/10 backdrop-blur-xl border border-white/20 px-5 py-4 rounded-2xl shadow-xl flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center shadow-lg">
                  <Globe size={18} className="text-white" />
                </div>
                <div>
                  <p className="text-white font-black text-lg leading-none">Live</p>
                  <p className="text-slate-300 text-xs mt-0.5">Online + Offline</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          STATS BAND
      ══════════════════════════════════════════ */}
      <section ref={statsRef} className="bg-blue-600 py-14">
        <div className="max-w-5xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-10 text-center divide-x-0 md:divide-x divide-blue-500/40">
            <StatCard value={500} suffix="+" label="Students Placed" icon={Briefcase} started={statsVisible} />
            <StatCard value={12} suffix="+" label="Expert Mentors" icon={Users} started={statsVisible} />
            <StatCard value={15} suffix="+" label="Courses Offered" icon={BookOpen} started={statsVisible} />
            <StatCard value={98} suffix="%" label="Satisfaction Rate" icon={Star} started={statsVisible} />
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          FEATURED COURSES
      ══════════════════════════════════════════ */}
      <section className="py-28 bg-[#F7F9FF]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <div>
              <span className="text-blue-600 font-bold tracking-widest uppercase text-xs mb-3 block">Top Programs</span>
              <h2 className="text-4xl md:text-5xl font-black text-slate-900 leading-tight">
                Our Featured <br className="hidden md:block" />
                <span className="text-blue-600">Courses</span>
              </h2>
            </div>
            <Link
              to="/course"
              className="group inline-flex items-center gap-2 text-slate-800 font-bold hover:text-blue-600 border-b-2 border-slate-800 hover:border-blue-600 transition-colors pb-0.5"
            >
              View All Courses <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          {loading ? (
            <div className="flex justify-center py-20">
              <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredCourses.map((course, idx) => (
                <div
                  key={course._id}
                  className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-400 border border-slate-100/80 flex flex-col"
                >
                  <div className="h-52 relative overflow-hidden bg-slate-100">
                    {course.thumbnailUrl ? (
                      <img
                        src={`http://localhost:8080${course.thumbnailUrl}`}
                        alt={course.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-600"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-blue-600 to-indigo-700 flex items-center justify-center">
                        <BookOpen size={56} className="text-white/40" />
                      </div>
                    )}
                    {/* Category chip */}
                    <span className="absolute top-4 left-4 px-3 py-1 bg-white text-blue-600 text-[11px] font-black rounded-md uppercase tracking-widest shadow-md">
                      {course.category?.split(" ")[0] || "Course"}
                    </span>
                    {/* Gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>

                  <div className="p-7 flex flex-col flex-1">
                    <h3 className="text-xl font-black text-slate-900 mb-2 leading-snug group-hover:text-blue-600 transition-colors">
                      {course.title}
                    </h3>
                    <p className="text-slate-500 text-sm mb-6 line-clamp-2 flex-1">{course.shortDescription}</p>

                    {/* Meta row */}
                    <div className="flex items-center gap-4 text-xs text-slate-400 mb-6">
                      <span className="flex items-center gap-1"><Clock size={12} /> 3 Months</span>
                      <span className="flex items-center gap-1"><Users size={12} /> Batch Starting Soon</span>
                    </div>

                    <div className="flex items-center justify-between pt-5 border-t border-slate-100">
                      <div className="flex items-baseline gap-2">
                        <span className="text-2xl font-black text-slate-900">
                          ₹{course.discountPrice || course.price}
                        </span>
                        {course.discountPrice && (
                          <span className="text-sm text-slate-400 line-through">₹{course.price}</span>
                        )}
                      </div>
                      <Link
                        to="/course"
                        className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold rounded-lg transition-colors"
                      >
                        Enroll <ArrowRight size={14} />
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ══════════════════════════════════════════
          WHY CHOOSE US — Split layout
      ══════════════════════════════════════════ */}
      <section className="py-28 bg-white">
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-20 items-center">
          {/* Left */}
          <div>
            <span className="text-blue-600 font-bold tracking-widest uppercase text-xs mb-4 block">Why GTC?</span>
            <h2 className="text-4xl md:text-5xl font-black text-slate-900 leading-tight mb-8">
              The Difference You <br />
              <span className="text-blue-600">Feel on Day One</span>
            </h2>
            <p className="text-slate-500 text-lg leading-relaxed mb-10">
              Most institutes teach you what. We teach you how — with live data, real GST filings, and scenarios straight from the industry floor.
            </p>

            <div className="space-y-5">
              {[
                { icon: TrendingUp, label: "Live project-based curriculum, updated every quarter." },
                { icon: Shield, label: "100% placement support with dedicated career counsellors." },
                { icon: BarChart2, label: "Real-time practice on Tally Prime, SAP & government portals." },
                { icon: Award, label: "Nationally recognised certification upon completion." },
              ].map(({ icon: Icon, label }, i) => (
                <div key={i} className="flex items-start gap-4">
                  <div className="w-10 h-10 shrink-0 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600">
                    <Icon size={20} />
                  </div>
                  <p className="text-slate-700 font-medium pt-1.5">{label}</p>
                </div>
              ))}
            </div>

            <Link
              to="/about"
              className="mt-10 inline-flex items-center gap-2 px-7 py-3.5 bg-slate-900 hover:bg-blue-700 text-white font-bold rounded-xl transition-colors shadow-md"
            >
              Learn About Us <ArrowRight size={16} />
            </Link>
          </div>

          {/* Right — feature cards grid */}
          <div className="grid grid-cols-2 gap-5">
            {[
              { icon: BookOpen, title: "Practical Training", desc: "Real-world data, not textbook theory.", bg: "bg-blue-600", text: "text-white" },
              { icon: Users, title: "Expert Faculty", desc: "10+ years on-the-job experience.", bg: "bg-slate-900", text: "text-white" },
              { icon: CheckCircle, title: "Job Guarantee", desc: "Placed or trained again — free.", bg: "bg-[#F7F9FF]", text: "text-slate-900" },
              { icon: Award, title: "Certification", desc: "Recognised by top employers.", bg: "bg-[#F7F9FF]", text: "text-slate-900" },
            ].map(({ icon: Icon, title, desc, bg, text }, i) => (
              <div
                key={i}
                className={`${bg} ${text} p-7 rounded-2xl flex flex-col gap-4 hover:-translate-y-1 transition-transform duration-300 shadow-sm`}
              >
                <Icon size={28} className={bg === "bg-blue-600" || bg === "bg-slate-900" ? "text-white/70" : "text-blue-600"} />
                <div>
                  <h4 className="font-black text-lg leading-snug">{title}</h4>
                  <p className={`text-sm mt-1 ${bg === "bg-[#F7F9FF]" ? "text-slate-500" : "text-white/70"}`}>{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          TESTIMONIALS — Large focal card
      ══════════════════════════════════════════ */}
      <section className="py-28 bg-[#040B1C] relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute top-0 right-0 w-[50%] h-[60%] rounded-full bg-indigo-900/30 blur-[120px]" />
        </div>

        <div className="max-w-6xl mx-auto px-6 relative z-10">
          <div className="text-center mb-16">
            <span className="text-blue-400 font-bold tracking-widest uppercase text-xs mb-3 block">Success Stories</span>
            <h2 className="text-4xl md:text-5xl font-black text-white">What Our Students Say</h2>
          </div>

          {testimonials.length > 0 && (
            <div className="relative">
              {/* Main large card */}
              <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-10 md:p-14 max-w-3xl mx-auto text-center transition-all duration-500">
                <div className="flex justify-center text-amber-400 mb-6 text-2xl gap-1">
                  {[...Array(testimonials[activeTestimonial]?.rating || 5)].map((_, i) => (
                    <Star key={i} size={22} fill="currentColor" />
                  ))}
                </div>
                <p className="text-white text-xl md:text-2xl font-medium leading-relaxed mb-10">
                  "{testimonials[activeTestimonial]?.text}"
                </p>
                <div className="flex items-center justify-center gap-4">
                  <div className="w-14 h-14 rounded-full bg-blue-700 flex items-center justify-center font-black text-white text-lg overflow-hidden border-2 border-white/20">
                    {testimonials[activeTestimonial]?.photoUrl
                      ? <img src={`http://localhost:8080${testimonials[activeTestimonial].photoUrl}`} alt="" className="w-full h-full object-cover" />
                      : testimonials[activeTestimonial]?.name?.charAt(0)
                    }
                  </div>
                  <div className="text-left">
                    <p className="text-white font-black text-lg">{testimonials[activeTestimonial]?.name}</p>
                    <p className="text-blue-400 text-sm">{testimonials[activeTestimonial]?.course}</p>
                  </div>
                </div>
              </div>

              {/* Dot indicators */}
              <div className="flex justify-center gap-3 mt-8">
                {testimonials.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveTestimonial(i)}
                    className={`h-2 rounded-full transition-all duration-300 ${i === activeTestimonial ? "w-8 bg-blue-500" : "w-2 bg-white/25 hover:bg-white/50"
                      }`}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* ══════════════════════════════════════════
          CTA — Full-bleed diagonal split
      ══════════════════════════════════════════ */}
      <section className="relative py-32 bg-white overflow-hidden">
        {/* Diagonal blue half */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-blue-600 clip-diagonal" style={{ clipPath: "polygon(0 0, 100% 0, 100% 70%, 0 100%)" }} />
        </div>

        <div className="relative max-w-4xl mx-auto px-6 text-center z-10">
          <span className="text-blue-200 font-bold tracking-widest uppercase text-xs mb-4 block">Start Today</span>
          <h2 className="text-4xl md:text-6xl font-black text-white leading-tight mb-6">
            Ready to Build Your <br />
            Finance Career?
          </h2>
          <p className="text-blue-100 text-xl mb-12 max-w-xl mx-auto leading-relaxed">
            Join 500+ students who landed jobs they love. Seats are limited — your next batch starts soon.
          </p>
          <div className="flex flex-wrap justify-center gap-5">
            <Link
              to="/register"
              className="px-10 py-4 bg-white text-blue-700 rounded-xl font-black text-lg hover:-translate-y-1 hover:shadow-2xl transition-all duration-300 shadow-lg"
            >
              Enroll Now — It's Free to Start
            </Link>
            <Link
              to="/contact"
              className="px-10 py-4 bg-blue-700/60 hover:bg-blue-700 border border-white/20 text-white rounded-xl font-bold text-lg transition-colors"
            >
              Talk to a Counsellor
            </Link>
          </div>
        </div>
      </section>

      {/* Ticker keyframe (injected via style tag — works with Tailwind's JIT) */}
      <style>{`
        @keyframes ticker {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-\\[ticker_14s_linear_infinite\\] {
          animation: ticker 14s linear infinite;
        }
      `}</style>
    </div>
  );
}