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
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-slate-900">Manage Certificates ({certificates.length})</h1>

      <div className="relative max-w-md">
        <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
        <input type="text" value={search} onChange={e => setSearch(e.target.value)} placeholder="Search by student or certificate number..."
          className="w-full pl-11 pr-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white" />
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {filtered.map((cert) => (
          <div key={cert._id} className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm flex items-start gap-4">
            <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center shrink-0">
              <Award size={28} className="text-white" />
            </div>
            <div className="flex-1">
              <h3 className="font-bold text-slate-900">{cert.studentId?.name}</h3>
              <p className="text-sm font-medium text-blue-600 mb-1">{cert.courseId?.title}</p>
              <p className="text-xs text-slate-500 font-mono">Cert No: {cert.certificateNumber}</p>
              <p className="text-xs text-slate-500">Issued: {new Date(cert.issuedDate).toLocaleDateString()}</p>
            </div>
            <button onClick={() => handleDelete(cert._id)} className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition"><Trash2 size={18} /></button>
          </div>
        ))}
      </div>
    </div>
  );
}
