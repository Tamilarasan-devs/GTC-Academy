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
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h1 className="text-2xl font-bold text-slate-900">Manage Enrollments ({enrollments.length})</h1>
      </div>

      <div className="bg-white rounded-2xl border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-slate-50 border-b">
                <th className="text-left px-6 py-4 text-sm font-semibold text-slate-600">Student</th>
                <th className="text-left px-6 py-4 text-sm font-semibold text-slate-600">Course</th>
                <th className="text-left px-6 py-4 text-sm font-semibold text-slate-600">Progress</th>
                <th className="text-left px-6 py-4 text-sm font-semibold text-slate-600">Status</th>
                <th className="text-left px-6 py-4 text-sm font-semibold text-slate-600">Expiry</th>
                <th className="text-left px-6 py-4 text-sm font-semibold text-slate-600">Actions</th>
              </tr>
            </thead>
            <tbody>
              {enrollments.map((enrollment) => {
                const expired = new Date() > new Date(enrollment.expiryDate);
                return (
                  <tr key={enrollment._id} className="border-b border-slate-100 hover:bg-slate-50">
                    <td className="px-6 py-4">
                      <p className="font-semibold text-slate-900">{enrollment.studentId?.name}</p>
                      <p className="text-xs text-slate-500">{enrollment.studentId?.email}</p>
                    </td>
                    <td className="px-6 py-4 font-medium text-slate-800">{enrollment.courseId?.title}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <div className="w-16 h-1.5 bg-slate-100 rounded-full">
                          <div className="h-1.5 bg-blue-600 rounded-full" style={{ width: `${enrollment.progress?.percentage || 0}%` }} />
                        </div>
                        <span className="text-xs font-semibold">{enrollment.progress?.percentage || 0}%</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-lg text-xs font-semibold ${enrollment.isActive ? (expired ? "bg-amber-100 text-amber-700" : "bg-green-100 text-green-700") : "bg-red-100 text-red-700"}`}>
                        {!enrollment.isActive ? "Revoked" : expired ? "Expired" : "Active"}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-500">{new Date(enrollment.expiryDate).toLocaleDateString()}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <button onClick={() => handleExtend(enrollment._id)} className="p-1.5 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition" title="Extend Validity"><CalendarDays size={16} /></button>
                        {enrollment.isActive && <button onClick={() => handleRevoke(enrollment._id)} className="p-1.5 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition" title="Revoke Access"><Clock size={16} /></button>}
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
