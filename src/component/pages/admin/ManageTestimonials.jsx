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
    <div className="space-y-8">
      <div className="flex flex-wrap items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-slate-100 shadow-[0_4px_20px_rgba(0,0,0,0.02)]">
        <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Manage Testimonials <span className="text-slate-400 text-lg font-medium">({testimonials.length})</span></h1>
        <button onClick={() => setShowForm(true)} className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#e56301] to-[#ff8c3a] text-white rounded-xl font-bold shadow-lg shadow-orange-500/20 hover:scale-105 transition-all">
          <Plus size={18} /> Add Testimonial
        </button>
      </div>

      {showForm && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto" onClick={resetForm}>
          <div className="bg-white rounded-3xl p-8 w-full max-w-xl my-8 shadow-[0_8px_30px_rgba(0,0,0,0.12)] transform transition-all" onClick={e => e.stopPropagation()}>
            <h2 className="text-2xl font-bold mb-8 text-slate-900">{editing ? "Edit Testimonial" : "Add Testimonial"}</h2>
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-2 gap-5">
                <div>
                  <label className="text-sm font-semibold text-slate-700 block mb-2">Name</label>
                  <input type="text" value={form.name} onChange={e => setForm({...form, name: e.target.value})} required className="w-full px-5 py-3.5 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#e56301] bg-slate-50 focus:bg-white transition" />
                </div>
                <div>
                  <label className="text-sm font-semibold text-slate-700 block mb-2">Course Name</label>
                  <input type="text" value={form.course} onChange={e => setForm({...form, course: e.target.value})} required className="w-full px-5 py-3.5 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#e56301] bg-slate-50 focus:bg-white transition" />
                </div>
              </div>
              <div>
                <label className="text-sm font-semibold text-slate-700 block mb-2">Review Text</label>
                <textarea rows={4} value={form.text} onChange={e => setForm({...form, text: e.target.value})} required className="w-full px-5 py-3.5 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#e56301] bg-slate-50 focus:bg-white transition resize-none" />
              </div>
              <div className="grid grid-cols-2 gap-5">
                <div>
                  <label className="text-sm font-semibold text-slate-700 block mb-2">Rating (1-5)</label>
                  <input type="number" min={1} max={5} value={form.rating} onChange={e => setForm({...form, rating: e.target.value})} className="w-full px-5 py-3.5 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#e56301] bg-slate-50 focus:bg-white transition" />
                </div>
                <div>
                  <label className="text-sm font-semibold text-slate-700 block mb-2">Photo (Optional)</label>
                  <input type="file" accept="image/*" onChange={e => setPhoto(e.target.files[0])} className="w-full px-5 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#e56301] bg-slate-50 transition" />
                </div>
              </div>
              <label className="flex items-center gap-3 cursor-pointer mt-2 pt-2">
                <input type="checkbox" checked={form.isVisible} onChange={e => setForm({...form, isVisible: e.target.checked})} className="w-5 h-5 rounded text-[#e56301] focus:ring-[#e56301]" />
                <span className="font-bold text-slate-700">Visible on Website</span>
              </label>
              <div className="flex gap-4 pt-6 mt-6 border-t border-slate-100">
                <button type="submit" className="px-8 py-3.5 bg-[#0b1e69] text-white rounded-xl font-bold shadow-lg hover:bg-[#071344] transition-all">Save Changes</button>
                <button type="button" onClick={resetForm} className="px-8 py-3.5 border border-slate-200 rounded-xl font-bold text-slate-600 hover:bg-slate-50 transition">Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {testimonials.map(t => (
          <div key={t._id} className={`bg-white rounded-3xl p-6 border border-slate-100 shadow-[0_8px_30px_rgba(0,0,0,0.04)] hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col group ${!t.isVisible && "opacity-60 grayscale-[0.5]"}`}>
            <div className="flex justify-between items-start mb-6">
              <div className="flex gap-4 items-center">
                <div className="w-14 h-14 rounded-2xl bg-[#0b1e69]/5 flex items-center justify-center text-[#0b1e69] font-black overflow-hidden shadow-inner text-xl">
                  {t.photoUrl ? <img src={`http://localhost:8080${t.photoUrl}`} alt="" className="w-full h-full object-cover" /> : t.name.charAt(0)}
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 leading-tight">{t.name}</h3>
                  <p className="text-xs font-semibold text-[#e56301] mt-1">{t.course}</p>
                </div>
              </div>
            </div>
            <div className="flex gap-1 text-amber-400 text-sm mb-4">{"★".repeat(t.rating)}</div>
            <p className="text-slate-600 text-sm leading-relaxed mb-6 line-clamp-4 flex-1">"{t.text}"</p>
            <div className="flex items-center gap-2 pt-4 border-t border-slate-100 mt-auto">
              <button onClick={() => handleToggle(t._id)} className="p-2.5 hover:bg-slate-100 rounded-xl transition" title="Toggle Visibility">
                {t.isVisible ? <Eye size={18} className="text-slate-400 hover:text-slate-600" /> : <EyeOff size={18} className="text-slate-400 hover:text-slate-600" />}
              </button>
              <button onClick={() => { setEditing(t); setForm({ name: t.name, course: t.course, text: t.text, rating: t.rating, isVisible: t.isVisible }); setShowForm(true); }} className="p-2.5 hover:bg-blue-50 rounded-xl transition ml-auto"><Edit size={18} className="text-slate-400 hover:text-blue-600" /></button>
              <button onClick={() => handleDelete(t._id)} className="p-2.5 hover:bg-red-50 rounded-xl transition"><Trash2 size={18} className="text-slate-400 hover:text-red-500" /></button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
