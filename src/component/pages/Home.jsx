import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import api from "../../utils/api";
import {
  BookOpen, Award, Users, CheckCircle, ArrowRight,
  PlayCircle, Star, TrendingUp, Zap, Shield, ChevronRight,
  BarChart2, Briefcase, Clock, Globe, IndianRupee, Flag, Network, Quote
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
        <span className="text-3xl md:text-4xl font-extrabold text-white tabular-nums">
          {count}
        </span>
        <span className="text-xl font-bold text-blue-400 mb-1">{suffix}</span>
      </div>
      <span className="text-slate-400 text-xs font-medium tracking-wide uppercase">{label}</span>
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
        const allCourses = coursesRes.data?.courses || [];
        const featured = allCourses.filter(c => c.isFeatured);
        setFeaturedCourses(featured.length > 0 ? featured.slice(0, 3) : allCourses.slice(0, 3));
        setTestimonials(testsRes.data?.testimonials || []);
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
      <section className="relative min-h-screen flex items-center bg-[#071344] text-white pt-28 pb-16">
        {/* Mesh-gradient blobs */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute top-[-15%] right-[-8%] w-[55%] h-[65%] rounded-full bg-[#0b1e69]/80 blur-[140px]" />
          <div className="absolute bottom-[-10%] left-[-5%] w-[45%] h-[55%] rounded-full bg-[#e56301]/15 blur-[140px]" />
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
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#e56301]/40 bg-[#e56301]/10 backdrop-blur-md">
                <span className="w-2 h-2 rounded-full bg-[#e56301] animate-pulse" />
                <span className="text-sm font-semibold text-[#ffb076] tracking-wide">
                  India's #1 Skill &amp; Finance Training Institute
                </span>
              </div>

              <h1 className="text-4xl md:text-5xl font-extrabold leading-[1.1] tracking-tight">
                Build a Career in{" "}
                <span className="relative inline-block">
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#e56301] via-amber-400 to-[#ff9848]">
                    Practical Skills &amp; Tax
                  </span>
                  {/* underline accent */}
                  <svg className="absolute -bottom-2 left-0 w-full" height="6" viewBox="0 0 200 6">
                    <path d="M0 5 Q100 0 200 5" stroke="url(#ul)" strokeWidth="3" fill="none" strokeLinecap="round" />
                    <defs>
                      <linearGradient id="ul" x1="0" x2="1">
                        <stop offset="0%" stopColor="#e56301" />
                        <stop offset="100%" stopColor="#f59e0b" />
                      </linearGradient>
                    </defs>
                  </svg>
                </span>{" "}
                That Lasts
              </h1>

              <p className="text-slate-300 text-base leading-relaxed max-w-lg">
                Hands-on training in Tally Prime, GST, Income Tax &amp; SAP by seasoned professionals — with real-world practical learning.
              </p>

              {/* Scrolling tools ticker */}
              <div className="overflow-hidden rounded-xl border border-white/10 bg-white/5 backdrop-blur-md py-3">
                <div className="flex gap-8 animate-[ticker_14s_linear_infinite] whitespace-nowrap">
                  {[...tools, ...tools].map((t, i) => (
                    <span key={i} className="flex items-center gap-2 text-sm font-semibold text-slate-300">
                      <Zap size={13} className="text-[#e56301]" /> {t}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex flex-wrap gap-4">
                <Link
                  to="/course"
                  className="group px-8 py-4 bg-[#e56301] hover:bg-[#c75400] text-white rounded-xl font-bold text-lg transition-all duration-300 shadow-lg shadow-orange-600/30 hover:-translate-y-0.5 flex items-center gap-2"
                >
                  Browse Courses
                  <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link
                  to="/about"
                  className="px-8 py-4 bg-white/10 hover:bg-white/15 border border-white/20 text-white rounded-xl font-bold text-lg transition-all duration-300 flex items-center gap-2 group"
                >
                  <PlayCircle size={20} className="text-[#e56301]" /> Watch Demo
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
                    <span className="text-white font-bold">50+</span> students trained across India
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
      <section ref={statsRef} className="bg-[#0b1e69] py-14 border-y border-[#162a80]">
        <div className="max-w-5xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-10 text-center divide-x-0 md:divide-x divide-white/10">
            <StatCard value={50} suffix="+" label="Students Trained" icon={Users} started={statsVisible} />
            <StatCard value={10} suffix="+" label="Courses" icon={BookOpen} started={statsVisible} />
            <StatCard value={100} suffix="%" label="Practical Learning" icon={Award} started={statsVisible} />
            <StatCard value={98} suffix="%" label="Student Satisfaction" icon={Star} started={statsVisible} />
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          FEATURED COURSES
      ══════════════════════════════════════════ */}
      <section className="py-28 bg-[#fff8f3]/60">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <div>
              <span className="text-[#e56301] font-bold tracking-widest uppercase text-xs mb-3 block">Top Programs</span>
              <h2 className="text-3xl md:text-4xl font-extrabold text-[#0b1e69] leading-tight">
                Our Featured <br className="hidden md:block" />
                <span className="text-[#e56301]">Courses</span>
              </h2>
            </div>
            <Link
              to="/course"
              className="group inline-flex items-center gap-2 text-[#0b1e69] font-bold hover:text-[#e56301] border-b-2 border-[#0b1e69] hover:border-[#e56301] transition-colors pb-0.5"
            >
              View All Courses <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          {loading ? (
            <div className="flex justify-center py-20">
              <div className="w-10 h-10 border-4 border-[#e56301] border-t-transparent rounded-full animate-spin" />
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {(featuredCourses.length > 0
                ? featuredCourses
                : [
                    {
                      _id: "c1",
                      title: "GST & Practical Taxation Masterclass",
                      shortDescription: "Complete practical hands-on course covering GST registration, monthly GSTR-1, GSTR-3B filings, and audit reconciliation.",
                      category: "Taxation & Finance",
                      price: 4999,
                      discountPrice: 2999,
                    },
                    {
                      _id: "c2",
                      title: "Tally Prime + E-Way Bill & E-Invoicing",
                      shortDescription: "Learn digital accounting, inventory management, bank reconciliation, and live e-invoicing using Tally Prime software.",
                      category: "Accounting & Tally",
                      price: 3999,
                      discountPrice: 2499,
                    },
                    {
                      _id: "c3",
                      title: "SAP FI/CO & Advanced Financial Excel",
                      shortDescription: "Master SAP Financial Accounting modules, pivot reports, VLOOKUP/XLOOKUP, financial modeling, and corporate reporting.",
                      category: "SAP & Excel",
                      price: 6999,
                      discountPrice: 4499,
                    },
                  ]
              ).map((course, idx) => (
                <div
                  key={course._id || idx}
                  className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-400 border border-slate-100 flex flex-col"
                >
                  <div className="h-52 relative overflow-hidden bg-slate-100">
                    {course.thumbnailUrl ? (
                      <img
                        src={`http://localhost:8080${course.thumbnailUrl}`}
                        alt={course.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-600"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-[#0b1e69] to-[#162a80] flex items-center justify-center">
                        <BookOpen size={56} className="text-white/40" />
                      </div>
                    )}
                    {/* Category chip */}
                    <span className="absolute top-4 left-4 px-3 py-1 bg-[#e56301] text-white text-[11px] font-black rounded-md uppercase tracking-widest shadow-md">
                      {course.category?.split(" ")[0] || "Course"}
                    </span>
                    {/* Gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>

                  <div className="p-7 flex flex-col flex-1">
                    <h3 className="text-xl font-black text-[#0b1e69] mb-2 leading-snug group-hover:text-[#e56301] transition-colors">
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
                        <span className="text-2xl font-black text-[#0b1e69]">
                          ₹{course.discountPrice || course.price}
                        </span>
                        {course.discountPrice && (
                          <span className="text-sm text-slate-400 line-through">₹{course.price}</span>
                        )}
                      </div>
                      <Link
                        to="/course"
                        className="flex items-center gap-2 px-4 py-2 bg-[#e56301] hover:bg-[#c75400] text-white text-sm font-bold rounded-lg transition-colors"
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
      <section className="py-28 bg-white font-sans">
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-20 items-center">
          {/* Left */}
          <div>
            <span className="text-[#e56301] font-bold tracking-widest uppercase text-xs mb-4 block">Why GTC?</span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-[#0b1e69] leading-tight mb-6">
              The Difference You <br />
              <span className="text-[#e56301]">Feel on Day One</span>
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
                  <div className="w-10 h-10 shrink-0 rounded-xl bg-orange-50 flex items-center justify-center text-[#e56301]">
                    <Icon size={20} />
                  </div>
                  <p className="text-slate-700 font-medium pt-1.5">{label}</p>
                </div>
              ))}
            </div>

            <Link
              to="/why-choose-us"
              className="mt-10 inline-flex items-center gap-2 px-7 py-3.5 bg-[#0b1e69] hover:bg-[#162a80] text-white font-bold rounded-xl transition-colors shadow-md"
            >
              Explore Our Pillars <ArrowRight size={16} />
            </Link>
          </div>

          {/* Right — 4 feature cards grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {[
              { icon: IndianRupee, title: "Affordable Pricing", desc: "High-quality skill education that doesn’t break the bank. Made for every Indian student.", bg: "bg-[#0b1e69]", text: "text-white" },
              { icon: Users, title: "Top Mentors", desc: "Learn from industry experts across India who have been where you want to be.", bg: "bg-[#e56301]", text: "text-white" },
              { icon: Flag, title: "100% India Centric", desc: "Curriculum designed specifically for the Indian market and academic ecosystem.", bg: "bg-[#fff8f3]", text: "text-[#0b1e69]" },
              { icon: Network, title: "Integrated Network", desc: "Strong connection with top-tier universities and companies for better opportunities.", bg: "bg-[#fff8f3]", text: "text-[#0b1e69]" },
            ].map(({ icon: Icon, title, desc, bg, text }, i) => (
              <div
                key={i}
                className={`${bg} ${text} p-6 rounded-2xl flex flex-col gap-3 hover:-translate-y-1 transition-transform duration-300 shadow-sm border border-slate-100`}
              >
                <Icon size={26} className={bg.includes("bg-[#") && !bg.includes("fff8f3") ? "text-white" : "text-[#e56301]"} />
                <div>
                  <h4 className="font-black text-lg leading-snug">{title}</h4>
                  <p className={`text-xs mt-1.5 leading-relaxed ${bg === "bg-[#fff8f3]" ? "text-slate-600" : "text-slate-200"}`}>{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          TESTIMONIALS — Modern Card Grid Showcase
      ══════════════════════════════════════════ */}
      <section className="py-28 bg-[#071344] relative overflow-hidden font-sans">
        {/* Background glow effects */}
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[60%] rounded-full bg-[#0b1e69]/60 blur-[150px]" />
          <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[60%] rounded-full bg-[#e56301]/15 blur-[150px]" />
        </div>

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#e56301]/10 border border-[#e56301]/30 text-[#ffb076] text-xs font-bold uppercase tracking-widest mb-4">
                <Star size={13} className="text-[#e56301]" /> Student Reviews
              </div>
              <h2 className="text-3xl md:text-4xl font-extrabold text-white leading-tight">
                Real Stories From <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#e56301] to-amber-300">Our Successful Learners</span>
              </h2>
            </div>
            <div className="flex items-center gap-4 bg-white/5 border border-white/10 px-5 py-3 rounded-2xl backdrop-blur-md">
              <div className="flex text-amber-400 gap-0.5 text-lg">{"★★★★★"}</div>
              <div className="text-white text-sm font-bold border-l border-white/15 pl-4">
                4.9/5 <span className="text-slate-400 font-normal text-xs">Rating (100+ Reviews)</span>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {(testimonials.length > 0 ? testimonials : [
              {
                name: "Rahul Verma",
                course: "GST & Practical Taxation",
                text: "The practical GST filings and live portal training helped me get hired as an Accountant within 3 weeks of course completion!",
                rating: 5,
              },
              {
                name: "Priya Sharma",
                course: "Tally Prime + E-Way Bill",
                text: "Teachers explain real company scenarios with live Tally Prime data. Best skill institute in Dhanbad!",
                rating: 5,
              },
              {
                name: "Ankit Kumar",
                course: "SAP & Advanced Excel",
                text: "Great mentorship and continuous career support. The Excel automation modules saved me hours in my job.",
                rating: 5,
              },
            ]).map((t, idx) => (
              <div
                key={t._id || idx}
                className="group relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 hover:bg-white/10 hover:border-[#e56301]/40 transition-all duration-400 flex flex-col justify-between hover:-translate-y-2 shadow-xl"
              >
                {/* Decorative quote symbol */}
                <Quote className="absolute top-6 right-6 text-white/5 group-hover:text-[#e56301]/20 transition-colors" size={56} />

                <div>
                  {/* Rating stars */}
                  <div className="flex text-amber-400 gap-1 mb-6">
                    {[...Array(t.rating || 5)].map((_, i) => (
                      <Star key={i} size={16} fill="currentColor" />
                    ))}
                  </div>

                  <p className="text-slate-200 text-base leading-relaxed mb-8 relative z-10">
                    "{t.text}"
                  </p>
                </div>

                <div className="flex items-center gap-4 pt-6 border-t border-white/10">
                  <div className="w-12 h-12 rounded-2xl bg-[#e56301] text-white flex items-center justify-center font-black text-lg overflow-hidden border-2 border-white/20 shadow-md">
                    {t.photoUrl ? (
                      <img src={`http://localhost:8080${t.photoUrl}`} alt={t.name} className="w-full h-full object-cover" />
                    ) : (
                      t.name?.charAt(0) || "S"
                    )}
                  </div>
                  <div>
                    <h4 className="text-white font-bold text-base group-hover:text-[#ffb076] transition-colors">{t.name}</h4>
                    <span className="text-xs text-[#e56301] font-semibold block">{t.course || "GTC Alumnus"}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          CTA — Full-bleed diagonal split
      ══════════════════════════════════════════ */}
      <section className="relative py-32 bg-white overflow-hidden">
        {/* Diagonal blue half */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[#0b1e69] clip-diagonal" style={{ clipPath: "polygon(0 0, 100% 0, 100% 70%, 0 100%)" }} />
        </div>

        <div className="relative max-w-4xl mx-auto px-6 text-center z-10">
          <span className="text-[#ffb076] font-bold tracking-widest uppercase text-xs mb-4 block">Start Today</span>
          <h2 className="text-3xl md:text-5xl font-extrabold text-white leading-tight mb-6">
            Ready to Build Your <br />
            Finance Career?
          </h2>
          <p className="text-slate-200 text-xl mb-12 max-w-xl mx-auto leading-relaxed">
            Join 50+ students who transformed their practical skills. Seats are limited — your next batch starts soon.
          </p>
          <div className="flex flex-wrap justify-center gap-5">
            <Link
              to="/register"
              className="px-10 py-4 bg-[#e56301] text-white rounded-xl font-black text-lg hover:bg-[#c75400] hover:-translate-y-1 hover:shadow-2xl transition-all duration-300 shadow-lg shadow-orange-600/30"
            >
              Enroll Now — It's Free to Start
            </Link>
            <Link
              to="/contact"
              className="px-10 py-4 bg-white/10 hover:bg-white/20 border border-white/20 text-white rounded-xl font-bold text-lg transition-colors"
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