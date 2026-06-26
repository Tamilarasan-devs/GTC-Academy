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
      <div className="bg-gradient-to-r from-slate-900 to-slate-800 rounded-2xl p-8 text-white">
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        <p className="mt-2 text-slate-300">Manage your academy from here</p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {cards.map((card) => (
          <div key={card.label} className={`bg-white rounded-2xl p-6 border border-slate-100 shadow-lg ${card.shadow}`}>
            <div className={`w-12 h-12 ${card.color} rounded-xl flex items-center justify-center mb-4`}>
              <card.icon size={22} className="text-white" />
            </div>
            <h3 className="text-3xl font-bold text-slate-900">{card.value}</h3>
            <p className="text-slate-500 mt-1">{card.label}</p>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Recent Enrollments */}
        <div className="bg-white rounded-2xl p-6 border border-slate-100">
          <h3 className="text-lg font-bold text-slate-900 mb-4">Recent Enrollments</h3>
          <div className="space-y-3">
            {(data?.recentEnrollments || []).slice(0, 5).map((e) => (
              <div key={e._id} className="flex items-center justify-between py-2 border-b border-slate-100 last:border-0">
                <div>
                  <p className="font-medium text-slate-800 text-sm">{e.studentId?.name}</p>
                  <p className="text-xs text-slate-400">{e.courseId?.title}</p>
                </div>
                <span className="text-xs text-slate-400">{new Date(e.createdAt).toLocaleDateString()}</span>
              </div>
            ))}
            {(data?.recentEnrollments || []).length === 0 && <p className="text-slate-400 text-sm">No enrollments yet</p>}
          </div>
        </div>

        {/* Recent Payments */}
        <div className="bg-white rounded-2xl p-6 border border-slate-100">
          <h3 className="text-lg font-bold text-slate-900 mb-4">Recent Payments</h3>
          <div className="space-y-3">
            {(data?.recentPayments || []).slice(0, 5).map((p) => (
              <div key={p._id} className="flex items-center justify-between py-2 border-b border-slate-100 last:border-0">
                <div>
                  <p className="font-medium text-slate-800 text-sm">{p.studentId?.name}</p>
                  <p className="text-xs text-slate-400">{p.courseId?.title}</p>
                </div>
                <span className="font-semibold text-green-600 text-sm">₹{p.amount?.toLocaleString()}</span>
              </div>
            ))}
            {(data?.recentPayments || []).length === 0 && <p className="text-slate-400 text-sm">No payments yet</p>}
          </div>
        </div>
      </div>

      {/* Monthly Revenue Chart (simplified) */}
      {data?.monthlyRevenue?.length > 0 && (
        <div className="bg-white rounded-2xl p-6 border border-slate-100">
          <h3 className="text-lg font-bold text-slate-900 mb-4">Monthly Revenue</h3>
          <div className="flex items-end gap-4 h-48">
            {data.monthlyRevenue.map((m) => {
              const maxVal = Math.max(...data.monthlyRevenue.map((r) => r.total));
              const height = maxVal > 0 ? (m.total / maxVal) * 100 : 0;
              return (
                <div key={m._id} className="flex-1 flex flex-col items-center">
                  <span className="text-xs font-semibold text-slate-700 mb-2">₹{(m.total / 1000).toFixed(0)}k</span>
                  <div className="w-full bg-blue-600 rounded-t-lg transition-all" style={{ height: `${height}%` }} />
                  <span className="text-xs text-slate-400 mt-2">{m._id.split("-")[1]}</span>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
