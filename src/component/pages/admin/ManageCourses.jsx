import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import api from "../../../utils/api";
import { Plus, Edit, Trash2, Eye, EyeOff, BookOpen, Search, ChevronRight } from "lucide-react";

export default function ManageCourses() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingCourse, setEditingCourse] = useState(null);
  const [search, setSearch] = useState("");
  const [form, setForm] = useState({
    title: "", category: "Finance & Taxation", description: "", shortDescription: "",
    price: "", discountPrice: "", validity: 365, features: "", isFeatured: false,
  });

  const fetchCourses = async () => {
    try { const res = await api.get("/admin/courses"); setCourses(res.data.courses); }
    catch (err) { console.error(err); }
    finally { setLoading(false); }
  };

  useEffect(() => { fetchCourses(); }, []);

  const resetForm = () => {
    setForm({ title: "", category: "Finance & Taxation", description: "", shortDescription: "", price: "", discountPrice: "", validity: 365, features: "", isFeatured: false });
    setEditingCourse(null);
    setShowForm(false);
  };

  const handleEdit = (course) => {
    setEditingCourse(course);
    setForm({
      title: course.title, category: course.category, description: course.description,
      shortDescription: course.shortDescription, price: course.price, discountPrice: course.discountPrice || "",
      validity: course.validity, features: course.features?.join(", ") || "", isFeatured: course.isFeatured,
    });
    setShowForm(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = { ...form, features: JSON.stringify(form.features.split(",").map(f => f.trim()).filter(Boolean)) };
      if (editingCourse) {
        await api.put(`/admin/courses/${editingCourse._id}`, data);
      } else {
        await api.post("/admin/courses", data);
      }
      fetchCourses();
      resetForm();
    } catch (err) { alert(err.response?.data?.message || "Failed"); }
  };

  const handleDelete = async (id) => {
    if (!confirm("Delete this course? This will also delete all chapters.")) return;
    try { await api.delete(`/admin/courses/${id}`); fetchCourses(); }
    catch (err) { alert("Failed to delete"); }
  };

  const handleTogglePublish = async (id) => {
    try { await api.put(`/admin/courses/${id}/toggle-publish`); fetchCourses(); }
    catch (err) { alert("Failed"); }
  };

  const filtered = courses.filter(c => c.title.toLowerCase().includes(search.toLowerCase()));

  if (loading) return <div className="flex items-center justify-center h-64"><div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" /></div>;

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-slate-100 shadow-[0_4px_20px_rgba(0,0,0,0.02)]">
        <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Manage Courses <span className="text-slate-400 text-lg font-medium">({courses.length})</span></h1>
        
        <div className="flex items-center gap-4 flex-wrap sm:flex-nowrap w-full sm:w-auto">
          <div className="relative w-full sm:w-64">
            <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
            <input type="text" value={search} onChange={e => setSearch(e.target.value)} placeholder="Search courses..."
              className="w-full pl-11 pr-4 py-2.5 border border-slate-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#e56301] bg-slate-50 focus:bg-white transition shadow-inner text-sm" />
          </div>
          
          <button onClick={() => { resetForm(); setShowForm(true); }} className="flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-[#e56301] to-[#ff8c3a] text-white rounded-xl font-bold shadow-lg shadow-orange-500/20 hover:scale-105 transition-all w-full sm:w-auto justify-center">
            <Plus size={18} /> Add Course
          </button>
        </div>
      </div>

      {/* Form Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto" onClick={resetForm}>
          <div className="bg-white rounded-3xl p-8 w-full max-w-3xl my-8 shadow-[0_8px_30px_rgba(0,0,0,0.12)] transform transition-all" onClick={e => e.stopPropagation()}>
            <h2 className="text-2xl font-bold mb-8 text-slate-900">{editingCourse ? "Edit Course" : "Add New Course"}</h2>
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid md:grid-cols-2 gap-5">
                <div>
                  <label className="text-sm font-semibold text-slate-700 block mb-2">Title</label>
                  <input type="text" value={form.title} onChange={e => setForm({...form, title: e.target.value})} required
                    className="w-full px-5 py-3.5 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#e56301] bg-slate-50 focus:bg-white transition" />
                </div>
                <div>
                  <label className="text-sm font-semibold text-slate-700 block mb-2">Category</label>
                  <select value={form.category} onChange={e => setForm({...form, category: e.target.value})}
                    className="w-full px-5 py-3.5 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#e56301] bg-slate-50 focus:bg-white transition">
                    <option>Finance & Taxation</option>
                    <option>Professional Courses</option>
                    <option>Language Courses</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="text-sm font-semibold text-slate-700 block mb-2">Short Description</label>
                <input type="text" value={form.shortDescription} onChange={e => setForm({...form, shortDescription: e.target.value})}
                  className="w-full px-5 py-3.5 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#e56301] bg-slate-50 focus:bg-white transition" />
              </div>
              <div>
                <label className="text-sm font-semibold text-slate-700 block mb-2">Full Description</label>
                <textarea rows={4} value={form.description} onChange={e => setForm({...form, description: e.target.value})} required
                  className="w-full px-5 py-3.5 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#e56301] bg-slate-50 focus:bg-white transition resize-none" />
              </div>
              <div className="grid md:grid-cols-3 gap-5">
                <div>
                  <label className="text-sm font-semibold text-slate-700 block mb-2">Price (₹)</label>
                  <input type="number" value={form.price} onChange={e => setForm({...form, price: e.target.value})} required
                    className="w-full px-5 py-3.5 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#e56301] bg-slate-50 focus:bg-white transition" />
                </div>
                <div>
                  <label className="text-sm font-semibold text-slate-700 block mb-2">Discount Price (₹)</label>
                  <input type="number" value={form.discountPrice} onChange={e => setForm({...form, discountPrice: e.target.value})}
                    className="w-full px-5 py-3.5 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#e56301] bg-slate-50 focus:bg-white transition" />
                </div>
                <div>
                  <label className="text-sm font-semibold text-slate-700 block mb-2">Validity (days)</label>
                  <input type="number" value={form.validity} onChange={e => setForm({...form, validity: e.target.value})}
                    className="w-full px-5 py-3.5 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#e56301] bg-slate-50 focus:bg-white transition" />
                </div>
              </div>
              <div>
                <label className="text-sm font-semibold text-slate-700 block mb-2">Features (comma separated)</label>
                <input type="text" value={form.features} onChange={e => setForm({...form, features: e.target.value})} placeholder="Feature 1, Feature 2..."
                  className="w-full px-5 py-3.5 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#e56301] bg-slate-50 focus:bg-white transition" />
              </div>
              <label className="flex items-center gap-3 cursor-pointer pt-2">
                <input type="checkbox" checked={form.isFeatured} onChange={e => setForm({...form, isFeatured: e.target.checked})} className="w-5 h-5 rounded text-[#e56301] focus:ring-[#e56301]" />
                <span className="text-sm font-bold text-slate-700">Mark as Featured Course</span>
              </label>
              <div className="flex gap-4 pt-6 mt-6 border-t border-slate-100">
                <button type="submit" className="px-8 py-3.5 bg-[#0b1e69] text-white rounded-xl font-bold shadow-lg hover:bg-[#071344] transition-all">
                  {editingCourse ? "Update Course" : "Create Course"}
                </button>
                <button type="button" onClick={resetForm} className="px-8 py-3.5 border border-slate-200 rounded-xl font-bold text-slate-600 hover:bg-slate-50 transition">Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Course Table */}
      {/* Course Table */}
      <div className="bg-white rounded-3xl border border-slate-100 shadow-[0_4px_20px_rgba(0,0,0,0.02)] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50/80 border-b border-slate-100">
                <th className="px-6 py-5 text-xs font-bold text-slate-500 uppercase tracking-wider">Course</th>
                <th className="px-6 py-5 text-xs font-bold text-slate-500 uppercase tracking-wider">Category</th>
                <th className="px-6 py-5 text-xs font-bold text-slate-500 uppercase tracking-wider">Price</th>
                <th className="px-6 py-5 text-xs font-bold text-slate-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-5 text-xs font-bold text-slate-500 uppercase tracking-wider">Chapters</th>
                <th className="px-6 py-5 text-xs font-bold text-slate-500 uppercase tracking-wider text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.map((course) => (
                <tr key={course._id} className="hover:bg-slate-50/50 transition-colors">
                  <td className="px-6 py-5">
                    <p className="font-bold text-slate-900">{course.title}</p>
                    {course.isFeatured && <span className="inline-block mt-1 px-2 py-0.5 bg-amber-50 text-amber-600 rounded text-[10px] font-bold uppercase tracking-wider">⭐ Featured</span>}
                  </td>
                  <td className="px-6 py-5"><span className="px-3 py-1 bg-slate-100 text-slate-600 rounded-lg text-xs font-semibold">{course.category}</span></td>
                  <td className="px-6 py-5">
                    <span className="font-bold text-slate-900">₹{course.discountPrice || course.price}</span>
                    {course.discountPrice > 0 && <span className="text-xs text-slate-400 line-through ml-2 font-medium">₹{course.price}</span>}
                  </td>
                  <td className="px-6 py-5">
                    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold ${course.isPublished ? "bg-green-50 text-green-700" : "bg-slate-100 text-slate-500"}`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${course.isPublished ? "bg-green-500" : "bg-slate-400"}`}></span>
                      {course.isPublished ? "Published" : "Draft"}
                    </span>
                  </td>
                  <td className="px-6 py-5">
                    <Link to={`/admin/courses/${course._id}/chapters`} className="inline-flex items-center gap-1 px-4 py-2 bg-blue-50 text-blue-600 hover:bg-blue-100 hover:text-blue-700 rounded-xl font-bold text-xs transition">
                      {course.totalChapters || 0} chapters <ChevronRight size={14} />
                    </Link>
                  </td>
                  <td className="px-6 py-5">
                    <div className="flex items-center justify-end gap-2">
                      <button onClick={() => handleTogglePublish(course._id)} className="p-2.5 rounded-xl hover:bg-slate-100 text-slate-400 hover:text-slate-700 transition" title={course.isPublished ? "Unpublish" : "Publish"}>
                        {course.isPublished ? <EyeOff size={18} /> : <Eye size={18} className="text-green-600" />}
                      </button>
                      <button onClick={() => handleEdit(course)} className="p-2.5 rounded-xl hover:bg-blue-50 text-slate-400 hover:text-blue-600 transition"><Edit size={18} /></button>
                      <button onClick={() => handleDelete(course._id)} className="p-2.5 rounded-xl hover:bg-red-50 text-slate-400 hover:text-red-500 transition"><Trash2 size={18} /></button>
                    </div>
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
