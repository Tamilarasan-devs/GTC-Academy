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
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-4">
        <h1 className="text-2xl font-bold text-slate-900">Manage Faculty ({faculty.length})</h1>
        <button onClick={() => setShowForm(true)} className="flex items-center gap-2 px-5 py-2.5 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition">
          <Plus size={18} /> Add Faculty
        </button>
      </div>

      {showForm && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={resetForm}>
          <div className="bg-white rounded-2xl p-8 w-full max-w-2xl max-h-[90vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
            <h2 className="text-xl font-bold mb-6">{editing ? "Edit Faculty" : "Add Faculty"}</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-slate-700 block mb-1">Name</label>
                  <input type="text" value={form.name} onChange={e => setForm({...form, name: e.target.value})} required className="w-full px-4 py-3 border rounded-xl" />
                </div>
                <div>
                  <label className="text-sm font-medium text-slate-700 block mb-1">Designation</label>
                  <input type="text" value={form.designation} onChange={e => setForm({...form, designation: e.target.value})} required className="w-full px-4 py-3 border rounded-xl" />
                </div>
                <div>
                  <label className="text-sm font-medium text-slate-700 block mb-1">Qualification</label>
                  <input type="text" value={form.qualification} onChange={e => setForm({...form, qualification: e.target.value})} required className="w-full px-4 py-3 border rounded-xl" />
                </div>
                <div>
                  <label className="text-sm font-medium text-slate-700 block mb-1">Experience</label>
                  <input type="text" value={form.experience} onChange={e => setForm({...form, experience: e.target.value})} required className="w-full px-4 py-3 border rounded-xl" />
                </div>
              </div>
              <div>
                <label className="text-sm font-medium text-slate-700 block mb-1">Subjects (comma separated)</label>
                <input type="text" value={form.subjects} onChange={e => setForm({...form, subjects: e.target.value})} required className="w-full px-4 py-3 border rounded-xl" />
              </div>
              <div>
                <label className="text-sm font-medium text-slate-700 block mb-1">Bio</label>
                <textarea rows={3} value={form.bio} onChange={e => setForm({...form, bio: e.target.value})} required className="w-full px-4 py-3 border rounded-xl resize-none" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-slate-700 block mb-1">Order</label>
                  <input type="number" value={form.order} onChange={e => setForm({...form, order: e.target.value})} className="w-full px-4 py-3 border rounded-xl" />
                </div>
                <div>
                  <label className="text-sm font-medium text-slate-700 block mb-1">Photo</label>
                  <input type="file" accept="image/*" onChange={e => setPhoto(e.target.files[0])} className="w-full px-4 py-2 border rounded-xl" />
                </div>
              </div>
              <div className="flex gap-3 pt-4">
                <button type="submit" className="px-6 py-3 bg-blue-600 text-white rounded-xl font-semibold">Save</button>
                <button type="button" onClick={resetForm} className="px-6 py-3 border rounded-xl">Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {faculty.map(f => (
          <div key={f._id} className="bg-white rounded-2xl border overflow-hidden">
            <div className="h-48 bg-slate-100 relative">
              {f.photoUrl ? (
                <img src={`http://localhost:8080${f.photoUrl}`} alt={f.name} className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-4xl font-bold text-slate-300">{f.name.charAt(0)}</div>
              )}
            </div>
            <div className="p-6">
              <h3 className="text-xl font-bold text-slate-900">{f.name}</h3>
              <p className="text-blue-600 font-medium text-sm mb-3">{f.designation}</p>
              <div className="space-y-2 text-sm text-slate-600 mb-4">
                <p><strong>Qual:</strong> {f.qualification}</p>
                <p><strong>Exp:</strong> {f.experience}</p>
                <p><strong>Subjects:</strong> {f.subjects?.join(", ")}</p>
              </div>
              <div className="flex gap-2 pt-4 border-t border-slate-100">
                <button onClick={() => { setEditing(f); setForm({ name: f.name, designation: f.designation, qualification: f.qualification, experience: f.experience, subjects: f.subjects?.join(", "), bio: f.bio, order: f.order }); setShowForm(true); }} className="flex-1 py-2 bg-blue-50 text-blue-600 rounded-lg font-semibold hover:bg-blue-100 transition flex items-center justify-center gap-2"><Edit size={16} /> Edit</button>
                <button onClick={() => handleDelete(f._id)} className="p-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition"><Trash2 size={16} /></button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
