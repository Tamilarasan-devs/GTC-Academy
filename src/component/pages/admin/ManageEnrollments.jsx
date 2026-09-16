import React, { useState, useEffect } from "react";
import api from "../../../utils/api";
import { Plus, Edit, CalendarDays, BookOpen, Clock } from "lucide-react";

export default function ManageEnrollments() {
  const [enrollments, setEnrollments] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchEnrollments = async () => {
    try {
      const res = await api.get("/admin/enrollments");
      setEnrollments(res.data.enrollments);
    } catch (err) { console.error(err); }
    finally { setLoading(false); }
  };

  useEffect(() => { fetchEnrollments(); }, []);

  const handleExtend = async (id) => {
    const days = prompt("Enter number of days to extend:");
    if (!days || isNaN(days)) return;
    try {
      await api.put(`/admin/enrollments/${id}/extend`, { days: parseInt(days) });
      fetchEnrollments();
    } catch (err) { alert("Failed to extend"); }
  };

  const handleRevoke = async (id) => {
    if (!confirm("Are you sure you want to revoke this enrollment?")) return;
    try {
      await api.put(`/admin/enrollments/${id}/revoke`);
      fetchEnrollments();
    } catch (err) { alert("Failed to revoke"); }
  };

  if (loading) return <div className="flex items-center justify-center h-64"><div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" /></div>;

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-slate-100 shadow-[0_4px_20px_rgba(0,0,0,0.02)]">
        <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Manage Enrollments <span className="text-slate-400 text-lg font-medium">({enrollments.length})</span></h1>
      </div>

      <div className="bg-white rounded-3xl border border-slate-100 shadow-[0_4px_20px_rgba(0,0,0,0.02)] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50/80 border-b border-slate-100">
                <th className="px-6 py-5 text-xs font-bold text-slate-500 uppercase tracking-wider">Student</th>
                <th className="px-6 py-5 text-xs font-bold text-slate-500 uppercase tracking-wider">Course</th>
                <th className="px-6 py-5 text-xs font-bold text-slate-500 uppercase tracking-wider">Progress</th>
                <th className="px-6 py-5 text-xs font-bold text-slate-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-5 text-xs font-bold text-slate-500 uppercase tracking-wider">Expiry</th>
                <th className="px-6 py-5 text-xs font-bold text-slate-500 uppercase tracking-wider text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {enrollments.map((enrollment) => {
                const expired = new Date() > new Date(enrollment.expiryDate);
                return (
                  <tr key={enrollment._id} className="hover:bg-slate-50/50 transition-colors">
                    <td className="px-6 py-5">
                      <p className="font-bold text-slate-900">{enrollment.studentId?.name}</p>
                      <p className="text-xs font-medium text-slate-500 mt-0.5">{enrollment.studentId?.email}</p>
                    </td>
                    <td className="px-6 py-5 font-bold text-slate-800">{enrollment.courseId?.title}</td>
                    <td className="px-6 py-5">
                      <div className="flex items-center gap-3">
                        <div className="w-24 h-2 bg-slate-100 rounded-full overflow-hidden">
                          <div className="h-full bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full" style={{ width: `${enrollment.progress?.percentage || 0}%` }} />
                        </div>
                        <span className="text-xs font-bold text-slate-600">{enrollment.progress?.percentage || 0}%</span>
                      </div>
                    </td>
                    <td className="px-6 py-5">
                      <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold ${enrollment.isActive ? (expired ? "bg-amber-50 text-amber-700" : "bg-green-50 text-green-700") : "bg-red-50 text-red-700"}`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${enrollment.isActive ? (expired ? "bg-amber-500" : "bg-green-500") : "bg-red-500"}`}></span>
                        {!enrollment.isActive ? "Revoked" : expired ? "Expired" : "Active"}
                      </span>
                    </td>
                    <td className="px-6 py-5 text-sm font-medium text-slate-500">{new Date(enrollment.expiryDate).toLocaleDateString()}</td>
                    <td className="px-6 py-5">
                      <div className="flex items-center justify-end gap-2">
                        <button onClick={() => handleExtend(enrollment._id)} className="p-2.5 bg-blue-50 text-blue-600 rounded-xl hover:bg-blue-100 hover:text-blue-700 transition font-medium flex items-center gap-1.5 text-xs" title="Extend Validity"><CalendarDays size={16} /> Extend</button>
                        {enrollment.isActive && <button onClick={() => handleRevoke(enrollment._id)} className="p-2.5 bg-red-50 text-red-600 rounded-xl hover:bg-red-100 hover:text-red-700 transition font-medium flex items-center gap-1.5 text-xs" title="Revoke Access"><Clock size={16} /> Revoke</button>}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
