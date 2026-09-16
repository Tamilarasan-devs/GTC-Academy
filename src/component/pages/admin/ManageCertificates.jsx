import React, { useState, useEffect } from "react";
import api from "../../../utils/api";
import { Trash2, Search, Award } from "lucide-react";

export default function ManageCertificates() {
  const [certificates, setCertificates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  const fetchCertificates = async () => {
    try {
      const res = await api.get("/admin/certificates");
      setCertificates(res.data.certificates);
    } catch (err) { console.error(err); }
    finally { setLoading(false); }
  };

  useEffect(() => { fetchCertificates(); }, []);

  const handleDelete = async (id) => {
    if (!confirm("Delete this certificate?")) return;
    try { await api.delete(`/admin/certificates/${id}`); fetchCertificates(); }
    catch (err) { alert("Failed to delete"); }
  };

  const filtered = certificates.filter(c =>
    c.studentId?.name?.toLowerCase().includes(search.toLowerCase()) ||
    c.certificateNumber?.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) return <div className="flex items-center justify-center h-64"><div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" /></div>;

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-slate-100 shadow-[0_4px_20px_rgba(0,0,0,0.02)]">
        <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Manage Certificates <span className="text-slate-400 text-lg font-medium">({certificates.length})</span></h1>

        <div className="relative w-full md:max-w-md">
          <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
          <input type="text" value={search} onChange={e => setSearch(e.target.value)} placeholder="Search by student or certificate number..."
            className="w-full pl-11 pr-4 py-3 border border-slate-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#e56301] bg-slate-50 focus:bg-white transition-all shadow-inner" />
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {filtered.map((cert) => (
          <div key={cert._id} className="bg-white rounded-3xl p-6 border border-slate-100 shadow-[0_8px_30px_rgba(0,0,0,0.04)] hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex items-start gap-5 group">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center shrink-0 shadow-md transition-transform group-hover:scale-105">
              <Award size={32} className="text-white" />
            </div>
            <div className="flex-1">
              <h3 className="font-bold text-slate-900 text-lg mb-1">{cert.studentId?.name}</h3>
              <p className="text-sm font-semibold text-[#e56301] mb-2">{cert.courseId?.title}</p>
              <div className="space-y-1">
                <p className="text-xs text-slate-500 font-mono bg-slate-50 inline-block px-2 py-1 rounded-md">Cert No: {cert.certificateNumber}</p>
                <p className="text-xs text-slate-400">Issued: <span className="font-medium text-slate-600">{new Date(cert.issuedDate).toLocaleDateString()}</span></p>
              </div>
            </div>
            <button onClick={() => handleDelete(cert._id)} className="p-2.5 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition"><Trash2 size={18} /></button>
          </div>
        ))}
      </div>
    </div>
  );
}
