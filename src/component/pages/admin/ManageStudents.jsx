import React, { useState, useEffect } from "react";
import api from "../../../utils/api";
import { Search, Ban, CheckCircle2, User } from "lucide-react";

export default function ManageStudents() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  const fetchStudents = async () => {
    try {
      const res = await api.get("/admin/students");
      setStudents(res.data.students);
    } catch (err) { console.error(err); }
    finally { setLoading(false); }
  };

  useEffect(() => { fetchStudents(); }, []);

  const handleToggleStatus = async (id) => {
    try {
      await api.put(`/admin/students/${id}/toggle-status`);
      fetchStudents();
    } catch (err) { alert("Failed to change status"); }
  };

  const filtered = students.filter(s =>
    s.name.toLowerCase().includes(search.toLowerCase()) ||
    s.email.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) return <div className="flex items-center justify-center h-64"><div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" /></div>;

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-slate-100 shadow-[0_4px_20px_rgba(0,0,0,0.02)]">
        <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Manage Students <span className="text-slate-400 text-lg font-medium">({students.length})</span></h1>

        <div className="relative w-full md:max-w-md">
          <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
          <input type="text" value={search} onChange={e => setSearch(e.target.value)} placeholder="Search by name or email..."
            className="w-full pl-11 pr-4 py-3 border border-slate-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#e56301] bg-slate-50 focus:bg-white transition shadow-inner" />
        </div>
      </div>

      <div className="bg-white rounded-3xl border border-slate-100 shadow-[0_4px_20px_rgba(0,0,0,0.02)] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50/80 border-b border-slate-100">
                <th className="px-6 py-5 text-xs font-bold text-slate-500 uppercase tracking-wider">Student</th>
                <th className="px-6 py-5 text-xs font-bold text-slate-500 uppercase tracking-wider">Contact</th>
                <th className="px-6 py-5 text-xs font-bold text-slate-500 uppercase tracking-wider">Joined</th>
                <th className="px-6 py-5 text-xs font-bold text-slate-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-5 text-xs font-bold text-slate-500 uppercase tracking-wider text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.map((student) => (
                <tr key={student._id} className="hover:bg-slate-50/50 transition-colors">
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-2xl bg-[#0b1e69]/5 text-[#0b1e69] flex items-center justify-center font-black text-lg">
                        {student.name.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <p className="font-bold text-slate-900">{student.name}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-5">
                    <p className="text-sm font-medium text-slate-600">{student.email}</p>
                    <p className="text-xs text-slate-400 mt-1 bg-slate-50 inline-block px-1.5 py-0.5 rounded border border-slate-100">{student.phone || "-"}</p>
                  </td>
                  <td className="px-6 py-5 text-sm font-medium text-slate-500">{new Date(student.createdAt).toLocaleDateString()}</td>
                  <td className="px-6 py-5">
                    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold ${student.isActive ? "bg-green-50 text-green-700" : "bg-red-50 text-red-700"}`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${student.isActive ? "bg-green-500" : "bg-red-500"}`}></span>
                      {student.isActive ? "Active" : "Suspended"}
                    </span>
                  </td>
                  <td className="px-6 py-5 text-right">
                    <button onClick={() => handleToggleStatus(student._id)}
                      className={`inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-bold transition ${student.isActive ? "bg-red-50 text-red-600 hover:bg-red-100 hover:text-red-700" : "bg-green-50 text-green-600 hover:bg-green-100 hover:text-green-700"}`}>
                      {student.isActive ? <><Ban size={14} /> Suspend</> : <><CheckCircle2 size={14} /> Activate</>}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
