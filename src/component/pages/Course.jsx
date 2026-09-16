import React, { useState, useEffect } from "react";
import api from "../../utils/api";
import { useAuth } from "../../context/AuthContext";
import { BookOpen, CheckCircle2, Clock, Shield, ArrowRight, Search, TrendingUp, Award } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Course() {
  const [courses, setCourses] = useState([]);
  const [categories, setCategories] = useState([]);
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await api.get("/courses");
        const publishedCourses = res.data.courses.filter(c => c.isPublished);
        setCourses(publishedCourses);

        const uniqueCategories = ["All", ...new Set(publishedCourses.map(c => c.category))];
        setCategories(uniqueCategories);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchCourses();
  }, []);

  const handleEnroll = async (courseId) => {
    if (!user) {
      navigate("/login");
      return;
    }
    try {
      const res = await api.post("/payments/create-order", { courseId });
      const { order, key } = res.data;

      const options = {
        key,
        amount: order.amount,
        currency: "INR",
        name: "GTC Education Academy",
        description: "Course Enrollment",
        order_id: order.id,
        handler: async function (response) {
          try {
            await api.post("/payments/verify", {
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_order_id: response.razorpay_order_id,
              razorpay_signature: response.razorpay_signature,
              courseId,
            });
            navigate("/student/my-courses");
          } catch (err) {
            alert("Payment verification failed.");
          }
        },
        prefill: {
          name: user.name,
          email: user.email,
          contact: user.phone,
        },
        theme: { color: "#e56301" },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      alert("Error creating payment order");
    }
  };

  const filteredCourses = courses.filter(c => {
    const matchesCategory = activeCategory === "All" || c.category === activeCategory;
    const matchesSearch = c.title.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="bg-slate-50 min-h-screen font-sans pb-20">
      {/* Sleek Hero / Catalog Header */}
      <section className="bg-white border-b border-slate-200 pt-32 pb-16">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div className="max-w-2xl">
            <span className="text-[#e56301] font-bold tracking-widest uppercase text-xs mb-4 block">Course Catalog</span>
            <h1 className="text-4xl md:text-5xl font-extrabold text-[#0b1e69] leading-tight mb-4">
              Master the Skills <br /> That Matter.
            </h1>
            <p className="text-lg text-slate-500 leading-relaxed">
              Explore our premium selection of finance, taxation, and business software programs designed for real-world application.
            </p>
          </div>
          
          {/* Search Bar */}
          <div className="relative w-full md:w-80">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Search size={18} className="text-slate-400" />
            </div>
            <input
              type="text"
              placeholder="Search courses..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-11 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#0b1e69]/20 focus:border-[#0b1e69] outline-none text-sm transition-all"
            />
          </div>
        </div>
      </section>

      {/* Modern Category Tabs */}
      <section className="bg-white sticky top-[73px] z-30 border-b border-slate-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex overflow-x-auto hide-scrollbar gap-8">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`py-4 text-sm font-semibold whitespace-nowrap transition-colors relative ${
                  activeCategory === cat
                    ? "text-[#0b1e69]"
                    : "text-slate-500 hover:text-slate-800"
                }`}
              >
                {cat}
                {activeCategory === cat && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#0b1e69] rounded-t-full" />
                )}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Courses Grid */}
      <section className="max-w-7xl mx-auto px-6 py-16">
        {loading ? (
          <div className="flex justify-center py-20">
            <div className="w-10 h-10 border-4 border-[#0b1e69] border-t-transparent rounded-full animate-spin" />
          </div>
        ) : filteredCourses.length === 0 ? (
          <div className="text-center py-20">
            <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <BookOpen size={24} className="text-slate-400" />
            </div>
            <h3 className="text-xl font-bold text-[#0b1e69] mb-2">No courses found</h3>
            <p className="text-slate-500">Try adjusting your search or category filter.</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredCourses.map(course => (
              <div
                key={course._id}
                className="group bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col"
              >
                {/* Course Image */}
                <div className="h-52 bg-slate-100 relative overflow-hidden">
                  {course.thumbnailUrl ? (
                    <img
                      src={`http://localhost:8080${course.thumbnailUrl}`}
                      alt={course.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center">
                      <BookOpen size={40} className="text-slate-300" />
                    </div>
                  )}
                  {/* Premium Badge */}
                  <div className="absolute top-4 left-4 bg-white/95 backdrop-blur shadow-sm px-2.5 py-1 rounded-md flex items-center gap-1.5 border border-slate-200/50">
                    <TrendingUp size={12} className="text-[#e56301]" />
                    <span className="text-[10px] font-bold text-slate-800 uppercase tracking-widest">
                      {course.category}
                    </span>
                  </div>
                </div>

                {/* Course Content */}
                <div className="p-7 flex-1 flex flex-col">
                  <div className="flex items-center gap-3 text-xs font-semibold text-slate-500 mb-3">
                    <span className="flex items-center gap-1">
                      <Clock size={14} className="text-slate-400" /> {course.validity} Days
                    </span>
                    <span className="w-1 h-1 rounded-full bg-slate-300" />
                    <span className="flex items-center gap-1">
                      <Award size={14} className="text-slate-400" /> Certificate
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-[#0b1e69] leading-snug mb-3 group-hover:text-[#e56301] transition-colors">
                    {course.title}
                  </h3>
                  <p className="text-slate-600 text-sm leading-relaxed mb-6 flex-1 line-clamp-3">
                    {course.shortDescription}
                  </p>

                  {/* Refined Features List */}
                  <div className="space-y-2.5 mb-8">
                    {course.features?.slice(0, 3).map((f, i) => (
                      <p key={i} className="flex items-start gap-2.5 text-sm text-slate-700">
                        <CheckCircle2 size={16} className="text-emerald-500 shrink-0 mt-0.5" />
                        <span className="leading-tight">{f}</span>
                      </p>
                    ))}
                    {course.features?.length > 3 && (
                      <p className="text-xs font-semibold text-slate-400 pl-6 pt-1">
                        + {course.features.length - 3} more modules
                      </p>
                    )}
                  </div>

                  {/* Footer & CTA */}
                  <div className="pt-5 border-t border-slate-100 flex items-center justify-between mt-auto">
                    <div>
                      <div className="flex items-baseline gap-2">
                        <span className="text-2xl font-extrabold text-[#0b1e69]">
                          ₹{course.discountPrice || course.price}
                        </span>
                        {course.discountPrice && (
                          <span className="text-sm text-slate-400 line-through font-medium">₹{course.price}</span>
                        )}
                      </div>
                    </div>
                    <button
                      onClick={() => handleEnroll(course._id)}
                      className="px-5 py-2.5 bg-white border-2 border-[#0b1e69] text-[#0b1e69] hover:bg-[#0b1e69] hover:text-white rounded-lg font-bold text-sm transition-all flex items-center gap-2 group/btn"
                    >
                      Enroll <ArrowRight size={16} className="group-hover/btn:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Premium Trust Banner */}
      <section className="max-w-7xl mx-auto px-6">
        <div className="bg-[#071344] rounded-3xl p-10 md:p-14 relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-10 shadow-2xl">
          <div className="absolute inset-0">
            <div className="absolute right-0 top-0 w-[400px] h-[400px] bg-[#e56301]/10 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/3" />
          </div>
          
          <div className="relative z-10 max-w-xl text-center md:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-emerald-400 text-xs font-bold tracking-widest uppercase mb-4 border border-white/10">
              <Shield size={14} /> 100% Secure Checkout
            </div>
            <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-4">
              Invest in your career with complete confidence.
            </h2>
            <p className="text-slate-300 text-lg leading-relaxed">
              Get instant lifetime access to recorded sessions, practical materials, and premium support immediately upon enrollment.
            </p>
          </div>
          
          <div className="relative z-10 shrink-0">
            <div className="w-24 h-24 bg-white/5 backdrop-blur-md rounded-full flex items-center justify-center border border-white/10 shadow-[0_0_40px_rgba(229,99,1,0.2)]">
              <CheckCircle2 size={40} className="text-[#e56301]" />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
