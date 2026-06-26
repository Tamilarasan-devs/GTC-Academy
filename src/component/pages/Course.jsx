import React, { useState, useEffect } from "react";
import api from "../../utils/api";
import { useAuth } from "../../context/AuthContext";
import { BookOpen, CheckCircle2, Clock, PlayCircle, Shield, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Course() {
  const [courses, setCourses] = useState([]);
  const [categories, setCategories] = useState([]);
  const [activeCategory, setActiveCategory] = useState("All");
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await api.get("/courses");
        const publishedCourses = res.data.courses.filter(c => c.isPublished);
        setCourses(publishedCourses);

        // Extract unique categories
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
        theme: { color: "#2563EB" },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      alert("Error creating payment order");
    }
  };

  const filteredCourses = activeCategory === "All" ? courses : courses.filter(c => c.category === activeCategory);

  return (
    <div className="bg-slate-50 min-h-screen">
      {/* Hero */}
      <section className="bg-slate-950 text-white py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/40 to-transparent" />
        <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">Our <span className="text-blue-400">Courses</span></h1>
          <p className="text-xl text-slate-300 max-w-2xl mx-auto">
            Choose from our wide range of professional courses and take the next step in your career.
          </p>
        </div>
      </section>

      {/* Category Filter */}
      <section className="max-w-7xl mx-auto px-6 py-12">
        <div className="flex flex-wrap justify-center gap-4 mb-16">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 ${
                activeCategory === cat
                  ? "bg-blue-600 text-white shadow-lg shadow-blue-600/30"
                  : "bg-white text-slate-600 hover:bg-slate-100 border border-slate-200"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="flex justify-center"><div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" /></div>
        ) : (
          <div className="space-y-12">
            {categories.filter(c => c !== "All").map(category => {
              if (activeCategory !== "All" && activeCategory !== category) return null;
              const categoryCourses = courses.filter(c => c.category === category);
              if (categoryCourses.length === 0) return null;

              return (
                <div key={category} className="mb-16">
                  <h2 className="text-3xl font-bold text-slate-900 mb-8 flex items-center gap-4">
                    <span className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center"><BookOpen size={16} className="text-blue-600"/></span>
                    {category}
                  </h2>
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {categoryCourses.map(course => (
                      <div key={course._id} className="bg-white rounded-3xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col group">
                        <div className="h-56 bg-slate-100 relative overflow-hidden">
                          {course.thumbnailUrl ? (
                            <img src={`http://localhost:8080${course.thumbnailUrl}`} alt={course.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                          ) : (
                            <div className="w-full h-full bg-gradient-to-br from-slate-800 to-slate-900 flex items-center justify-center">
                              <BookOpen size={48} className="text-white/20" />
                            </div>
                          )}
                          <div className="absolute top-4 right-4 bg-white/90 backdrop-blur px-3 py-1.5 rounded-xl font-bold text-slate-900 shadow-sm flex items-center gap-1">
                            <Clock size={14} className="text-blue-600"/> {course.validity} Days
                          </div>
                        </div>

                        <div className="p-8 flex-1 flex flex-col">
                          <h3 className="text-2xl font-bold text-slate-900 mb-3">{course.title}</h3>
                          <p className="text-slate-600 mb-6 flex-1">{course.shortDescription}</p>

                          <div className="space-y-3 mb-8">
                            {course.features?.slice(0, 4).map((f, i) => (
                              <p key={i} className="flex items-start gap-2 text-sm text-slate-700">
                                <CheckCircle2 size={16} className="text-green-500 shrink-0 mt-0.5" />
                                {f}
                              </p>
                            ))}
                          </div>

                          <div className="pt-6 border-t border-slate-100 mt-auto">
                            <div className="flex items-end justify-between mb-6">
                              <div>
                                <p className="text-sm text-slate-500 font-medium mb-1">Course Fee</p>
                                <div className="flex items-baseline gap-2">
                                  <span className="text-3xl font-bold text-slate-900">₹{course.discountPrice || course.price}</span>
                                  {course.discountPrice && <span className="text-lg text-slate-400 line-through">₹{course.price}</span>}
                                </div>
                              </div>
                            </div>
                            <button
                              onClick={() => handleEnroll(course._id)}
                              className="w-full py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold text-lg transition-all shadow-lg shadow-blue-600/25 flex items-center justify-center gap-2"
                            >
                              Enroll Now <ArrowRight size={20} />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>

      {/* Guarantee */}
      <section className="py-16 bg-blue-50 border-t border-blue-100">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <Shield size={48} className="mx-auto text-blue-600 mb-6" />
          <h2 className="text-3xl font-bold text-slate-900 mb-4">Secure & Quality Learning</h2>
          <p className="text-lg text-slate-600">
            All our payments are processed securely via Razorpay. Get instant access to high-quality recorded videos, PDF materials, and dedicated technical support after enrollment.
          </p>
        </div>
      </section>
    </div>
  );
}
