import React, { useState, useEffect } from "react";
import api from "../../../utils/api";
import { Users, BookOpen, CreditCard, ClipboardList, TrendingUp, IndianRupee } from "lucide-react";

export default function AdminDashboard() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const res = await api.get("/admin/dashboard");
        setData(res.data);
      } catch (err) { console.error(err); }
      finally { setLoading(false); }
    };
    fetchDashboard();
  }, []);

  if (loading) {
    return <div className="flex items-center justify-center h-64"><div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" /></div>;
  }

  const stats = data?.stats || {};
  const cards = [
    { label: "Total Students", value: stats.totalStudents, icon: Users, color: "bg-blue-600", shadow: "shadow-blue-200" },
    { label: "Active Courses", value: stats.publishedCourses, icon: BookOpen, color: "bg-emerald-600", shadow: "shadow-emerald-200" },
    { label: "Total Revenue", value: `₹${(stats.totalRevenue || 0).toLocaleString()}`, icon: IndianRupee, color: "bg-amber-500", shadow: "shadow-amber-200" },
    { label: "Enrollments", value: stats.totalEnrollments, icon: ClipboardList, color: "bg-purple-600", shadow: "shadow-purple-200" },
  ];

  return (
    <div className="space-y-8">
      <div className="relative overflow-hidden bg-[#071344] rounded-3xl p-10 text-white shadow-[0_8px_30px_rgba(7,19,68,0.2)] border border-white/10">
        {/* Decorative blobs */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#e56301]/20 rounded-full blur-[60px] -translate-y-1/2 translate-x-1/3 pointer-events-none" />
        <div className="absolute bottom-0 left-10 w-48 h-48 bg-blue-500/20 rounded-full blur-[60px] translate-y-1/2 pointer-events-none" />
        
        <div className="relative z-10">
          <h1 className="text-4xl font-bold tracking-tight">Admin Dashboard</h1>
          <p className="mt-3 text-slate-300 text-lg">Manage your academy from here</p>
        </div>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {cards.map((card) => (
          <div key={card.label} className={`bg-white rounded-3xl p-6 border border-slate-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group shadow-[0_8px_30px_rgba(0,0,0,0.04)]`}>
            <div className={`w-14 h-14 ${card.color} rounded-2xl flex items-center justify-center mb-6 shadow-md transition-transform group-hover:scale-110`}>
              <card.icon size={26} className="text-white" />
            </div>
            <h3 className="text-4xl font-bold text-slate-900 tracking-tight">{card.value}</h3>
            <p className="text-slate-500 mt-2 font-medium">{card.label}</p>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Recent Enrollments */}
        <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-[0_8px_30px_rgba(0,0,0,0.04)]">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-slate-900">Recent Enrollments</h3>
            <button className="text-sm font-semibold text-blue-600 hover:text-blue-700 bg-blue-50 hover:bg-blue-100 px-3 py-1.5 rounded-lg transition">View All</button>
          </div>
          <div className="space-y-4">
            {(data?.recentEnrollments || []).slice(0, 5).map((e) => (
              <div key={e._id} className="flex items-center justify-between py-3 border-b border-slate-100 last:border-0 hover:bg-slate-50 -mx-4 px-4 rounded-xl transition">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-[#071344]/5 flex items-center justify-center text-[#071344] font-bold">
                    {e.studentId?.name?.charAt(0) || "S"}
                  </div>
                  <div>
                    <p className="font-bold text-slate-900">{e.studentId?.name}</p>
                    <p className="text-sm text-slate-500">{e.courseId?.title}</p>
                  </div>
                </div>
                <span className="text-xs font-semibold text-slate-400 bg-slate-100 px-2.5 py-1 rounded-md">{new Date(e.createdAt).toLocaleDateString()}</span>
              </div>
            ))}
            {(data?.recentEnrollments || []).length === 0 && <p className="text-slate-400 text-sm text-center py-4">No enrollments yet</p>}
          </div>
        </div>

        {/* Recent Payments */}
        <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-[0_8px_30px_rgba(0,0,0,0.04)]">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-slate-900">Recent Payments</h3>
            <button className="text-sm font-semibold text-blue-600 hover:text-blue-700 bg-blue-50 hover:bg-blue-100 px-3 py-1.5 rounded-lg transition">View All</button>
          </div>
          <div className="space-y-4">
            {(data?.recentPayments || []).slice(0, 5).map((p) => (
              <div key={p._id} className="flex items-center justify-between py-3 border-b border-slate-100 last:border-0 hover:bg-slate-50 -mx-4 px-4 rounded-xl transition">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-green-50 flex items-center justify-center text-green-600 font-bold">
                    ₹
                  </div>
                  <div>
                    <p className="font-bold text-slate-900">{p.studentId?.name}</p>
                    <p className="text-sm text-slate-500">{p.courseId?.title}</p>
                  </div>
                </div>
                <span className="font-bold text-green-600 bg-green-50 px-3 py-1 rounded-lg">₹{p.amount?.toLocaleString()}</span>
              </div>
            ))}
            {(data?.recentPayments || []).length === 0 && <p className="text-slate-400 text-sm text-center py-4">No payments yet</p>}
          </div>
        </div>
      </div>

      {/* Monthly Revenue Chart (simplified) */}
      {data?.monthlyRevenue?.length > 0 && (
        <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-[0_8px_30px_rgba(0,0,0,0.04)]">
          <h3 className="text-xl font-bold text-slate-900 mb-8">Monthly Revenue</h3>
          <div className="flex items-end gap-4 h-56">
            {data.monthlyRevenue.map((m) => {
              const maxVal = Math.max(...data.monthlyRevenue.map((r) => r.total));
              const height = maxVal > 0 ? (m.total / maxVal) * 100 : 0;
              return (
                <div key={m._id} className="flex-1 flex flex-col items-center group">
                  <span className="text-xs font-bold text-slate-700 mb-3 opacity-0 group-hover:opacity-100 transition -translate-y-2 group-hover:translate-y-0">₹{(m.total / 1000).toFixed(0)}k</span>
                  <div className="w-full bg-gradient-to-t from-blue-600 to-indigo-400 rounded-t-xl transition-all duration-500 ease-out group-hover:opacity-80 relative overflow-hidden" style={{ height: `${height}%` }}>
                     <div className="absolute inset-0 bg-white/20 blur-sm translate-y-full group-hover:-translate-y-full transition-transform duration-1000" />
                  </div>
                  <span className="text-sm font-semibold text-slate-500 mt-4">{m._id.split("-")[1]}</span>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
