import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import api from "../../../utils/api";
import { Plus, Edit, Trash2, Upload, FileText, Film, ChevronLeft, BookOpen } from "lucide-react";

export default function ManageChapters() {
  const { courseId } = useParams();
  const [chapters, setChapters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({ title: "", duration: "", order: 0, isFree: false });

  const fetchChapters = async () => {
    try { const res = await api.get(`/admin/courses/${courseId}/chapters`); setChapters(res.data.chapters); }
    catch (err) { console.error(err); }
    finally { setLoading(false); }
  };

  useEffect(() => { fetchChapters(); }, [courseId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editing) { await api.put(`/admin/chapters/${editing._id}`, form); }
      else { await api.post(`/admin/courses/${courseId}/chapters`, form); }
      fetchChapters(); setShowForm(false); setEditing(null);
      setForm({ title: "", duration: "", order: 0, isFree: false });
    } catch (err) { alert("Failed"); }
  };

  const handleDelete = async (id) => {
    if (!confirm("Delete this chapter?")) return;
    try { await api.delete(`/admin/chapters/${id}`); fetchChapters(); }
    catch (err) { alert("Failed"); }
  };

  const handleVideoUpload = async (chapterId, file) => {
    const formData = new FormData();
    formData.append("video", file);
    try {
      await api.put(`/admin/chapters/${chapterId}/video`, formData, { headers: { "Content-Type": "multipart/form-data" } });
      fetchChapters();
    } catch (err) { alert("Upload failed"); }
  };

  const handlePdfUpload = async (chapterId, file) => {
    const formData = new FormData();
    formData.append("pdf", file);
    try {
      await api.put(`/admin/chapters/${chapterId}/pdf`, formData, { headers: { "Content-Type": "multipart/form-data" } });
      fetchChapters();
    } catch (err) { alert("Upload failed"); }
  };

  if (loading) return <div className="flex items-center justify-center h-64"><div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" /></div>;

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-slate-100 shadow-[0_4px_20px_rgba(0,0,0,0.02)]">
        <div className="flex items-center gap-4">
          <Link to="/admin/courses" className="p-2 hover:bg-slate-100 rounded-xl transition"><ChevronLeft size={20} /></Link>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Manage Chapters <span className="text-slate-400 text-lg font-medium">({chapters.length})</span></h1>
        </div>
        <button onClick={() => { setEditing(null); setForm({ title: "", duration: "", order: chapters.length, isFree: false }); setShowForm(true); }}
          className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#e56301] to-[#ff8c3a] text-white rounded-xl font-bold shadow-lg shadow-orange-500/20 hover:scale-105 transition-all">
          <Plus size={18} /> Add Chapter
        </button>
      </div>

      {showForm && (
        <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-[0_8px_30px_rgba(0,0,0,0.06)] transform transition-all duration-300">
          <h3 className="text-xl font-bold mb-6 text-slate-900">{editing ? "Edit Chapter" : "Add New Chapter"}</h3>
          <form onSubmit={handleSubmit} className="flex flex-wrap gap-4 items-end">
            <div className="flex-1 min-w-[200px]">
              <label className="text-sm font-semibold text-slate-700 block mb-2">Title</label>
              <input type="text" value={form.title} onChange={e => setForm({...form, title: e.target.value})} required
                className="w-full px-5 py-3.5 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#e56301] bg-slate-50 focus:bg-white transition" />
            </div>
            <div className="w-32">
              <label className="text-sm font-semibold text-slate-700 block mb-2">Duration</label>
              <input type="text" value={form.duration} onChange={e => setForm({...form, duration: e.target.value})} placeholder="e.g. 15 min"
                className="w-full px-5 py-3.5 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#e56301] bg-slate-50 focus:bg-white transition" />
            </div>
            <div className="w-24">
              <label className="text-sm font-semibold text-slate-700 block mb-2">Order</label>
              <input type="number" value={form.order} onChange={e => setForm({...form, order: parseInt(e.target.value)})}
                className="w-full px-5 py-3.5 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#e56301] bg-slate-50 focus:bg-white transition" />
            </div>
            <label className="flex items-center gap-2 pb-4 cursor-pointer">
              <input type="checkbox" checked={form.isFree} onChange={e => setForm({...form, isFree: e.target.checked})} className="w-5 h-5 rounded text-[#e56301] focus:ring-[#e56301]" />
              <span className="text-sm font-semibold text-slate-700">Free Preview</span>
            </label>
            <div className="flex gap-3 pb-1">
              <button type="submit" className="px-6 py-3.5 bg-[#0b1e69] text-white rounded-xl font-bold shadow-md hover:bg-[#071344] transition-all">Save</button>
              <button type="button" onClick={() => setShowForm(false)} className="px-6 py-3.5 border border-slate-200 rounded-xl hover:bg-slate-50 font-semibold transition">Cancel</button>
            </div>
          </form>
        </div>
      )}

      <div className="space-y-4">
        {chapters.map((chapter, idx) => (
          <div key={chapter._id} className="bg-white rounded-3xl p-5 border border-slate-100 shadow-[0_4px_20px_rgba(0,0,0,0.02)] flex flex-wrap items-center gap-5 hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
            <div className="w-12 h-12 rounded-2xl bg-[#0b1e69]/5 text-[#0b1e69] flex items-center justify-center font-black text-lg shrink-0">{idx + 1}</div>
            <div className="flex-1 min-w-[200px]">
              <h3 className="font-bold text-slate-900 text-lg">{chapter.title}</h3>
              <p className="text-sm text-slate-500 mt-0.5">{chapter.duration || "No duration set"} {chapter.isFree && <span className="inline-flex items-center gap-1 bg-green-50 text-green-700 px-2 py-0.5 rounded-md text-xs font-bold ml-2">FREE</span>}</p>
            </div>
            <div className="flex items-center gap-3 flex-wrap">
              {chapter.videoUrl ? (
                <span className="flex items-center gap-1.5 px-4 py-2 bg-green-50 border border-green-100 text-green-700 rounded-xl text-xs font-bold"><Film size={14} /> Video ✓</span>
              ) : (
                <label className="flex items-center gap-1.5 px-4 py-2 bg-[#0b1e69]/5 text-[#0b1e69] rounded-xl text-xs font-bold cursor-pointer hover:bg-[#0b1e69]/10 transition">
                  <Upload size={14} /> Video
                  <input type="file" accept="video/*" className="hidden" onChange={e => e.target.files[0] && handleVideoUpload(chapter._id, e.target.files[0])} />
                </label>
              )}
              {chapter.pdfNotes ? (
                <span className="flex items-center gap-1.5 px-4 py-2 bg-green-50 border border-green-100 text-green-700 rounded-xl text-xs font-bold"><FileText size={14} /> PDF ✓</span>
              ) : (
                <label className="flex items-center gap-1.5 px-4 py-2 bg-[#e56301]/5 text-[#e56301] rounded-xl text-xs font-bold cursor-pointer hover:bg-[#e56301]/10 transition">
                  <Upload size={14} /> PDF
                  <input type="file" accept=".pdf" className="hidden" onChange={e => e.target.files[0] && handlePdfUpload(chapter._id, e.target.files[0])} />
                </label>
              )}
              <div className="w-px h-8 bg-slate-200 mx-1 hidden sm:block"></div>
              <button onClick={() => { setEditing(chapter); setForm({ title: chapter.title, duration: chapter.duration, order: chapter.order, isFree: chapter.isFree }); setShowForm(true); }}
                className="p-2.5 rounded-xl text-slate-400 hover:text-blue-600 hover:bg-blue-50 transition"><Edit size={18} /></button>
              <button onClick={() => handleDelete(chapter._id)} className="p-2.5 rounded-xl text-slate-400 hover:text-red-500 hover:bg-red-50 transition"><Trash2 size={18} /></button>
            </div>
          </div>
        ))}
        {chapters.length === 0 && (
          <div className="bg-white rounded-3xl p-16 text-center border border-slate-100 shadow-[0_4px_20px_rgba(0,0,0,0.02)]">
            <div className="w-16 h-16 bg-slate-50 text-slate-300 rounded-full flex items-center justify-center mx-auto mb-4"><BookOpen size={32} /></div>
            <p className="text-slate-500 font-medium">No chapters yet. Add your first chapter!</p>
          </div>
        )}
      </div>
    </div>
  );
}
