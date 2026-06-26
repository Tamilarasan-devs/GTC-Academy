import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import api from "../../../utils/api";
import { Plus, Edit, Trash2, Eye, EyeOff, BookOpen, Search } from "lucide-react";

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
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h1 className="text-2xl font-bold text-slate-900">Manage Courses ({courses.length})</h1>
        <button onClick={() => { resetForm(); setShowForm(true); }} className="flex items-center gap-2 px-5 py-2.5 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition">
          <Plus size={18} /> Add Course
        </button>
      </div>

      {/* Search */}
      <div className="relative max-w-md">
        <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
        <input type="text" value={search} onChange={e => setSearch(e.target.value)} placeholder="Search courses..."
          className="w-full pl-11 pr-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white" />
      </div>

      {/* Form Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={resetForm}>
          <div className="bg-white rounded-2xl p-8 w-full max-w-2xl max-h-[90vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
            <h2 className="text-xl font-bold mb-6">{editingCourse ? "Edit Course" : "Add New Course"}</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-slate-700 block mb-1">Title</label>
                  <input type="text" value={form.title} onChange={e => setForm({...form, title: e.target.value})} required
                    className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500" />
                </div>
                <div>
                  <label className="text-sm font-medium text-slate-700 block mb-1">Category</label>
                  <select value={form.category} onChange={e => setForm({...form, category: e.target.value})}
                    className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <option>Finance & Taxation</option>
                    <option>Professional Courses</option>
                    <option>Language Courses</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="text-sm font-medium text-slate-700 block mb-1">Short Description</label>
                <input type="text" value={form.shortDescription} onChange={e => setForm({...form, shortDescription: e.target.value})}
                  className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500" />
              </div>
              <div>
                <label className="text-sm font-medium text-slate-700 block mb-1">Full Description</label>
                <textarea rows={3} value={form.description} onChange={e => setForm({...form, description: e.target.value})} required
                  className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none" />
              </div>
              <div className="grid md:grid-cols-3 gap-4">
                <div>
                  <label className="text-sm font-medium text-slate-700 block mb-1">Price (₹)</label>
                  <input type="number" value={form.price} onChange={e => setForm({...form, price: e.target.value})} required
                    className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500" />
                </div>
                <div>
                  <label className="text-sm font-medium text-slate-700 block mb-1">Discount Price (₹)</label>
                  <input type="number" value={form.discountPrice} onChange={e => setForm({...form, discountPrice: e.target.value})}
                    className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500" />
                </div>
                <div>
                  <label className="text-sm font-medium text-slate-700 block mb-1">Validity (days)</label>
                  <input type="number" value={form.validity} onChange={e => setForm({...form, validity: e.target.value})}
                    className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500" />
                </div>
              </div>
              <div>
                <label className="text-sm font-medium text-slate-700 block mb-1">Features (comma separated)</label>
                <input type="text" value={form.features} onChange={e => setForm({...form, features: e.target.value})} placeholder="Feature 1, Feature 2..."
                  className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500" />
              </div>
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" checked={form.isFeatured} onChange={e => setForm({...form, isFeatured: e.target.checked})} className="w-4 h-4 rounded" />
                <span className="text-sm font-medium text-slate-700">Featured Course</span>
              </label>
              <div className="flex gap-3 pt-4">
                <button type="submit" className="px-6 py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition">
                  {editingCourse ? "Update Course" : "Create Course"}
                </button>
                <button type="button" onClick={resetForm} className="px-6 py-3 border border-slate-200 rounded-xl font-semibold hover:bg-slate-50 transition">Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Course Table */}
      <div className="bg-white rounded-2xl border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-slate-50 border-b">
                <th className="text-left px-6 py-4 text-sm font-semibold text-slate-600">Course</th>
                <th className="text-left px-6 py-4 text-sm font-semibold text-slate-600">Category</th>
                <th className="text-left px-6 py-4 text-sm font-semibold text-slate-600">Price</th>
                <th className="text-left px-6 py-4 text-sm font-semibold text-slate-600">Status</th>
                <th className="text-left px-6 py-4 text-sm font-semibold text-slate-600">Chapters</th>
                <th className="text-left px-6 py-4 text-sm font-semibold text-slate-600">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((course) => (
                <tr key={course._id} className="border-b border-slate-100 hover:bg-slate-50">
                  <td className="px-6 py-4">
                    <p className="font-semibold text-slate-900">{course.title}</p>
                    {course.isFeatured && <span className="text-xs text-amber-600 font-semibold">⭐ Featured</span>}
                  </td>
                  <td className="px-6 py-4"><span className="px-3 py-1 bg-slate-100 rounded-lg text-xs font-medium">{course.category}</span></td>
                  <td className="px-6 py-4">
                    <span className="font-semibold">₹{course.discountPrice || course.price}</span>
                    {course.discountPrice > 0 && <span className="text-xs text-slate-400 line-through ml-1">₹{course.price}</span>}
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-lg text-xs font-semibold ${course.isPublished ? "bg-green-100 text-green-700" : "bg-slate-100 text-slate-500"}`}>
                      {course.isPublished ? "Published" : "Draft"}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <Link to={`/admin/courses/${course._id}/chapters`} className="text-blue-600 hover:text-blue-700 font-medium text-sm">
                      {course.totalChapters || 0} chapters →
                    </Link>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <button onClick={() => handleTogglePublish(course._id)} className="p-2 rounded-lg hover:bg-slate-100 transition" title={course.isPublished ? "Unpublish" : "Publish"}>
                        {course.isPublished ? <EyeOff size={16} className="text-slate-500" /> : <Eye size={16} className="text-green-600" />}
                      </button>
                      <button onClick={() => handleEdit(course)} className="p-2 rounded-lg hover:bg-slate-100 transition"><Edit size={16} className="text-blue-600" /></button>
                      <button onClick={() => handleDelete(course._id)} className="p-2 rounded-lg hover:bg-red-50 transition"><Trash2 size={16} className="text-red-500" /></button>
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
