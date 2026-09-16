import React, { useState, useEffect } from "react";
import api from "../../../utils/api";
import { Plus, Edit, Trash2 } from "lucide-react";

export default function ManageFaculty() {
  const [faculty, setFaculty] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({ name: "", designation: "", qualification: "", experience: "", subjects: "", bio: "", order: 0 });
  const [photo, setPhoto] = useState(null);

  const fetchFaculty = async () => {
    try { const res = await api.get("/admin/faculty"); setFaculty(res.data.faculty); }
    catch (err) { console.error(err); }
    finally { setLoading(false); }
  };

  useEffect(() => { fetchFaculty(); }, []);

  const resetForm = () => {
    setForm({ name: "", designation: "", qualification: "", experience: "", subjects: "", bio: "", order: 0 });
    setPhoto(null); setEditing(null); setShowForm(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    Object.keys(form).forEach(key => formData.append(key, key === "subjects" ? JSON.stringify(form.subjects.split(",").map(s => s.trim())) : form[key]));
    if (photo) formData.append("photo", photo);

    try {
      if (editing) await api.put(`/admin/faculty/${editing._id}`, formData);
      else await api.post("/admin/faculty", formData);
      fetchFaculty(); resetForm();
    } catch (err) { alert("Failed to save"); }
  };

  const handleDelete = async (id) => {
    if (!confirm("Delete this faculty member?")) return;
    try { await api.delete(`/admin/faculty/${id}`); fetchFaculty(); }
    catch (err) { alert("Failed"); }
  };

  if (loading) return <div className="flex items-center justify-center h-64"><div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" /></div>;

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-slate-100 shadow-[0_4px_20px_rgba(0,0,0,0.02)]">
        <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Manage Faculty <span className="text-slate-400 text-lg font-medium">({faculty.length})</span></h1>
        <button onClick={() => setShowForm(true)} className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#e56301] to-[#ff8c3a] text-white rounded-xl font-bold shadow-lg shadow-orange-500/20 hover:scale-105 transition-all">
          <Plus size={18} /> Add Faculty
        </button>
      </div>

      {showForm && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto" onClick={resetForm}>
          <div className="bg-white rounded-3xl p-8 w-full max-w-2xl my-8 shadow-[0_8px_30px_rgba(0,0,0,0.12)] transform transition-all" onClick={e => e.stopPropagation()}>
            <h2 className="text-2xl font-bold mb-8 text-slate-900">{editing ? "Edit Faculty Member" : "Add Faculty Member"}</h2>
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid md:grid-cols-2 gap-5">
                <div>
                  <label className="text-sm font-semibold text-slate-700 block mb-2">Name</label>
                  <input type="text" value={form.name} onChange={e => setForm({...form, name: e.target.value})} required className="w-full px-5 py-3.5 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#e56301] bg-slate-50 focus:bg-white transition" />
                </div>
                <div>
                  <label className="text-sm font-semibold text-slate-700 block mb-2">Designation</label>
                  <input type="text" value={form.designation} onChange={e => setForm({...form, designation: e.target.value})} required className="w-full px-5 py-3.5 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#e56301] bg-slate-50 focus:bg-white transition" />
                </div>
                <div>
                  <label className="text-sm font-semibold text-slate-700 block mb-2">Qualification</label>
                  <input type="text" value={form.qualification} onChange={e => setForm({...form, qualification: e.target.value})} required className="w-full px-5 py-3.5 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#e56301] bg-slate-50 focus:bg-white transition" />
                </div>
                <div>
                  <label className="text-sm font-semibold text-slate-700 block mb-2">Experience</label>
                  <input type="text" value={form.experience} onChange={e => setForm({...form, experience: e.target.value})} required className="w-full px-5 py-3.5 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#e56301] bg-slate-50 focus:bg-white transition" />
                </div>
              </div>
              <div>
                <label className="text-sm font-semibold text-slate-700 block mb-2">Subjects (comma separated)</label>
                <input type="text" value={form.subjects} onChange={e => setForm({...form, subjects: e.target.value})} required className="w-full px-5 py-3.5 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#e56301] bg-slate-50 focus:bg-white transition" />
              </div>
              <div>
                <label className="text-sm font-semibold text-slate-700 block mb-2">Bio</label>
                <textarea rows={4} value={form.bio} onChange={e => setForm({...form, bio: e.target.value})} required className="w-full px-5 py-3.5 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#e56301] bg-slate-50 focus:bg-white transition resize-none" />
              </div>
              <div className="grid md:grid-cols-2 gap-5">
                <div>
                  <label className="text-sm font-semibold text-slate-700 block mb-2">Order</label>
                  <input type="number" value={form.order} onChange={e => setForm({...form, order: e.target.value})} className="w-full px-5 py-3.5 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#e56301] bg-slate-50 focus:bg-white transition" />
                </div>
                <div>
                  <label className="text-sm font-semibold text-slate-700 block mb-2">Photo</label>
                  <input type="file" accept="image/*" onChange={e => setPhoto(e.target.files[0])} className="w-full px-5 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#e56301] bg-slate-50 transition" />
                </div>
              </div>
              <div className="flex gap-4 pt-6 mt-6 border-t border-slate-100">
                <button type="submit" className="px-8 py-3.5 bg-[#0b1e69] text-white rounded-xl font-bold shadow-lg hover:bg-[#071344] transition-all">Save Changes</button>
                <button type="button" onClick={resetForm} className="px-8 py-3.5 border border-slate-200 rounded-xl font-bold text-slate-600 hover:bg-slate-50 transition">Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {faculty.map(f => (
          <div key={f._id} className="bg-white rounded-3xl border border-slate-100 shadow-[0_8px_30px_rgba(0,0,0,0.04)] hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden group">
            <div className="h-56 bg-slate-100 relative overflow-hidden">
              {f.photoUrl ? (
                <img src={`http://localhost:8080${f.photoUrl}`} alt={f.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-5xl font-black text-slate-300 bg-gradient-to-br from-slate-100 to-slate-200">{f.name.charAt(0)}</div>
              )}
            </div>
            <div className="p-6">
              <h3 className="text-xl font-bold text-slate-900 line-clamp-1">{f.name}</h3>
              <p className="text-[#e56301] font-semibold text-sm mb-4 line-clamp-1">{f.designation}</p>
              <div className="space-y-2 text-sm text-slate-600 mb-6 bg-slate-50 p-4 rounded-2xl border border-slate-100">
                <p className="line-clamp-1"><strong className="text-slate-800">Qual:</strong> {f.qualification}</p>
                <p className="line-clamp-1"><strong className="text-slate-800">Exp:</strong> {f.experience}</p>
                <p className="line-clamp-1"><strong className="text-slate-800">Subj:</strong> {f.subjects?.join(", ")}</p>
              </div>
              <div className="flex gap-2 pt-4 border-t border-slate-100 mt-auto">
                <button onClick={() => { setEditing(f); setForm({ name: f.name, designation: f.designation, qualification: f.qualification, experience: f.experience, subjects: f.subjects?.join(", "), bio: f.bio, order: f.order }); setShowForm(true); }} className="flex-1 py-2.5 bg-[#0b1e69]/5 text-[#0b1e69] rounded-xl font-bold hover:bg-[#0b1e69]/10 transition flex items-center justify-center gap-2"><Edit size={16} /> Edit</button>
                <button onClick={() => handleDelete(f._id)} className="p-2.5 bg-red-50 text-red-600 rounded-xl hover:bg-red-100 hover:text-red-700 transition"><Trash2 size={18} /></button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
