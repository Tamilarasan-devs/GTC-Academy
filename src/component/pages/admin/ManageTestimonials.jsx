import React, { useState, useEffect } from "react";
import api from "../../../utils/api";
import { Plus, Edit, Trash2, Eye, EyeOff } from "lucide-react";

export default function ManageTestimonials() {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({ name: "", course: "", text: "", rating: 5, isVisible: true });
  const [photo, setPhoto] = useState(null);

  const fetchTestimonials = async () => {
    try { const res = await api.get("/admin/testimonials"); setTestimonials(res.data.testimonials); }
    catch (err) { console.error(err); }
    finally { setLoading(false); }
  };

  useEffect(() => { fetchTestimonials(); }, []);

  const resetForm = () => {
    setForm({ name: "", course: "", text: "", rating: 5, isVisible: true });
    setPhoto(null); setEditing(null); setShowForm(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    Object.keys(form).forEach(key => formData.append(key, form[key]));
    if (photo) formData.append("photo", photo);

    try {
      if (editing) await api.put(`/admin/testimonials/${editing._id}`, formData);
      else await api.post("/admin/testimonials", formData);
      fetchTestimonials(); resetForm();
    } catch (err) { alert("Failed to save"); }
  };

  const handleDelete = async (id) => {
    if (!confirm("Delete this testimonial?")) return;
    try { await api.delete(`/admin/testimonials/${id}`); fetchTestimonials(); }
    catch (err) { alert("Failed"); }
  };

  const handleToggle = async (id) => {
    try { await api.put(`/admin/testimonials/${id}/toggle-visibility`); fetchTestimonials(); }
    catch (err) { alert("Failed"); }
  };

  if (loading) return <div className="flex items-center justify-center h-64"><div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" /></div>;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-4">
        <h1 className="text-2xl font-bold text-slate-900">Manage Testimonials ({testimonials.length})</h1>
        <button onClick={() => setShowForm(true)} className="flex items-center gap-2 px-5 py-2.5 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition">
          <Plus size={18} /> Add Testimonial
        </button>
      </div>

      {showForm && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={resetForm}>
          <div className="bg-white rounded-2xl p-8 w-full max-w-xl max-h-[90vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
            <h2 className="text-xl font-bold mb-6">{editing ? "Edit Testimonial" : "Add Testimonial"}</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-slate-700 block mb-1">Name</label>
                  <input type="text" value={form.name} onChange={e => setForm({...form, name: e.target.value})} required className="w-full px-4 py-3 border rounded-xl" />
                </div>
                <div>
                  <label className="text-sm font-medium text-slate-700 block mb-1">Course Name</label>
                  <input type="text" value={form.course} onChange={e => setForm({...form, course: e.target.value})} required className="w-full px-4 py-3 border rounded-xl" />
                </div>
              </div>
              <div>
                <label className="text-sm font-medium text-slate-700 block mb-1">Review Text</label>
                <textarea rows={4} value={form.text} onChange={e => setForm({...form, text: e.target.value})} required className="w-full px-4 py-3 border rounded-xl resize-none" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-slate-700 block mb-1">Rating (1-5)</label>
                  <input type="number" min={1} max={5} value={form.rating} onChange={e => setForm({...form, rating: e.target.value})} className="w-full px-4 py-3 border rounded-xl" />
                </div>
                <div>
                  <label className="text-sm font-medium text-slate-700 block mb-1">Photo (Optional)</label>
                  <input type="file" accept="image/*" onChange={e => setPhoto(e.target.files[0])} className="w-full px-4 py-2 border rounded-xl" />
                </div>
              </div>
              <label className="flex items-center gap-2 cursor-pointer mt-2">
                <input type="checkbox" checked={form.isVisible} onChange={e => setForm({...form, isVisible: e.target.checked})} className="w-4 h-4" />
                <span>Visible on Website</span>
              </label>
              <div className="flex gap-3 pt-4">
                <button type="submit" className="px-6 py-3 bg-blue-600 text-white rounded-xl font-semibold">Save</button>
                <button type="button" onClick={resetForm} className="px-6 py-3 border rounded-xl">Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {testimonials.map(t => (
          <div key={t._id} className={`bg-white rounded-2xl p-6 border ${!t.isVisible && "opacity-60"}`}>
            <div className="flex justify-between items-start mb-4">
              <div className="flex gap-3 items-center">
                <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold overflow-hidden">
                  {t.photoUrl ? <img src={`http://localhost:8080${t.photoUrl}`} alt="" className="w-full h-full object-cover" /> : t.name.charAt(0)}
                </div>
                <div>
                  <h3 className="font-bold text-slate-900">{t.name}</h3>
                  <p className="text-xs text-slate-500">{t.course}</p>
                </div>
              </div>
              <div className="flex gap-1 text-amber-500 text-sm">{"★".repeat(t.rating)}</div>
            </div>
            <p className="text-slate-600 text-sm mb-4 line-clamp-3">"{t.text}"</p>
            <div className="flex items-center gap-2 pt-4 border-t border-slate-100">
              <button onClick={() => handleToggle(t._id)} className="p-2 hover:bg-slate-100 rounded-lg" title="Toggle Visibility">
                {t.isVisible ? <Eye size={16} className="text-slate-500" /> : <EyeOff size={16} className="text-slate-400" />}
              </button>
              <button onClick={() => { setEditing(t); setForm({ name: t.name, course: t.course, text: t.text, rating: t.rating, isVisible: t.isVisible }); setShowForm(true); }} className="p-2 hover:bg-slate-100 rounded-lg"><Edit size={16} className="text-blue-600" /></button>
              <button onClick={() => handleDelete(t._id)} className="p-2 hover:bg-red-50 rounded-lg ml-auto"><Trash2 size={16} className="text-red-500" /></button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
