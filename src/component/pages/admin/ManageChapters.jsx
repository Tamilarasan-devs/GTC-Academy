import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import api from "../../../utils/api";
import { Plus, Edit, Trash2, Upload, FileText, Film, ChevronLeft } from "lucide-react";

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
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link to="/admin/courses" className="p-2 hover:bg-slate-100 rounded-lg"><ChevronLeft size={20} /></Link>
        <h1 className="text-2xl font-bold text-slate-900 flex-1">Manage Chapters ({chapters.length})</h1>
        <button onClick={() => { setEditing(null); setForm({ title: "", duration: "", order: chapters.length, isFree: false }); setShowForm(true); }}
          className="flex items-center gap-2 px-5 py-2.5 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition">
          <Plus size={18} /> Add Chapter
        </button>
      </div>

      {showForm && (
        <div className="bg-white rounded-2xl p-6 border">
          <h3 className="font-bold mb-4">{editing ? "Edit Chapter" : "Add Chapter"}</h3>
          <form onSubmit={handleSubmit} className="flex flex-wrap gap-4 items-end">
            <div className="flex-1 min-w-[200px]">
              <label className="text-sm font-medium text-slate-700 block mb-1">Title</label>
              <input type="text" value={form.title} onChange={e => setForm({...form, title: e.target.value})} required
                className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
            <div className="w-32">
              <label className="text-sm font-medium text-slate-700 block mb-1">Duration</label>
              <input type="text" value={form.duration} onChange={e => setForm({...form, duration: e.target.value})} placeholder="e.g. 15 min"
                className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
            <div className="w-24">
              <label className="text-sm font-medium text-slate-700 block mb-1">Order</label>
              <input type="number" value={form.order} onChange={e => setForm({...form, order: parseInt(e.target.value)})}
                className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
            <label className="flex items-center gap-2 pb-3">
              <input type="checkbox" checked={form.isFree} onChange={e => setForm({...form, isFree: e.target.checked})} className="w-4 h-4" />
              <span className="text-sm">Free Preview</span>
            </label>
            <button type="submit" className="px-6 py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700">Save</button>
            <button type="button" onClick={() => setShowForm(false)} className="px-6 py-3 border rounded-xl hover:bg-slate-50">Cancel</button>
          </form>
        </div>
      )}

      <div className="space-y-3">
        {chapters.map((chapter, idx) => (
          <div key={chapter._id} className="bg-white rounded-2xl p-5 border flex flex-wrap items-center gap-4">
            <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold shrink-0">{idx + 1}</div>
            <div className="flex-1 min-w-[200px]">
              <h3 className="font-semibold text-slate-900">{chapter.title}</h3>
              <p className="text-sm text-slate-400">{chapter.duration || "No duration set"} {chapter.isFree && <span className="text-green-600 font-medium ml-2">• Free</span>}</p>
            </div>
            <div className="flex items-center gap-2 flex-wrap">
              {chapter.videoUrl ? (
                <span className="flex items-center gap-1 px-3 py-1 bg-green-100 text-green-700 rounded-lg text-xs font-medium"><Film size={12} /> Video ✓</span>
              ) : (
                <label className="flex items-center gap-1 px-3 py-1.5 bg-blue-50 text-blue-600 rounded-lg text-xs font-medium cursor-pointer hover:bg-blue-100 transition">
                  <Upload size={12} /> Upload Video
                  <input type="file" accept="video/*" className="hidden" onChange={e => e.target.files[0] && handleVideoUpload(chapter._id, e.target.files[0])} />
                </label>
              )}
              {chapter.pdfNotes ? (
                <span className="flex items-center gap-1 px-3 py-1 bg-green-100 text-green-700 rounded-lg text-xs font-medium"><FileText size={12} /> PDF ✓</span>
              ) : (
                <label className="flex items-center gap-1 px-3 py-1.5 bg-amber-50 text-amber-600 rounded-lg text-xs font-medium cursor-pointer hover:bg-amber-100 transition">
                  <Upload size={12} /> Upload PDF
                  <input type="file" accept=".pdf" className="hidden" onChange={e => e.target.files[0] && handlePdfUpload(chapter._id, e.target.files[0])} />
                </label>
              )}
              <button onClick={() => { setEditing(chapter); setForm({ title: chapter.title, duration: chapter.duration, order: chapter.order, isFree: chapter.isFree }); setShowForm(true); }}
                className="p-2 rounded-lg hover:bg-slate-100"><Edit size={16} className="text-blue-600" /></button>
              <button onClick={() => handleDelete(chapter._id)} className="p-2 rounded-lg hover:bg-red-50"><Trash2 size={16} className="text-red-500" /></button>
            </div>
          </div>
        ))}
        {chapters.length === 0 && <div className="bg-white rounded-2xl p-12 text-center border"><p className="text-slate-400">No chapters yet. Add your first chapter!</p></div>}
      </div>
    </div>
  );
}
