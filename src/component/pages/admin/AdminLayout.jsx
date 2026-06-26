import React, { useState } from "react";
import { Outlet, Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";
import {
  LayoutDashboard, BookOpen, Users, CreditCard, Award, MessageSquare,
  UserCheck, ClipboardList, LogOut, Menu, X, GraduationCap, ChevronRight, Settings,
} from "lucide-react";

const menuItems = [
  { path: "/admin/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { path: "/admin/courses", label: "Manage Courses", icon: BookOpen },
  { path: "/admin/students", label: "Students", icon: Users },
  { path: "/admin/enrollments", label: "Enrollments", icon: ClipboardList },
  { path: "/admin/payments", label: "Payments", icon: CreditCard },
  { path: "/admin/certificates", label: "Certificates", icon: Award },
  { path: "/admin/testimonials", label: "Testimonials", icon: MessageSquare },
  { path: "/admin/faculty", label: "Faculty", icon: UserCheck },
];

export default function AdminLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => { logout(); navigate("/"); };

  return (
    <div className="min-h-screen bg-slate-100 flex">
      {sidebarOpen && <div className="fixed inset-0 bg-black/50 z-40 lg:hidden" onClick={() => setSidebarOpen(false)} />}

      {/* Sidebar */}
      <aside className={`fixed lg:sticky top-0 left-0 h-screen w-72 bg-slate-900 text-white z-50 flex flex-col transition-transform duration-300 ${sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}`}>
        <div className="p-6 border-b border-white/10">
          <Link to="/" className="flex items-center gap-3">
            <div className="bg-blue-600 p-2 rounded-xl"><GraduationCap size={22} /></div>
            <div>
              <h1 className="font-bold text-lg">GTC Admin</h1>
              <p className="text-xs text-slate-400">Management Panel</p>
            </div>
          </Link>
        </div>

        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          {menuItems.map((item) => {
            const active = location.pathname === item.path;
            return (
              <Link key={item.path} to={item.path} onClick={() => setSidebarOpen(false)}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${active ? "bg-blue-600 text-white" : "text-slate-400 hover:bg-white/5 hover:text-white"}`}>
                <item.icon size={20} />
                <span className="font-medium">{item.label}</span>
                {active && <ChevronRight size={16} className="ml-auto" />}
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-white/10">
          <div className="flex items-center gap-3 px-4 py-3">
            <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center font-bold text-sm">A</div>
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-sm truncate">{user?.name}</p>
              <p className="text-xs text-slate-400">Administrator</p>
            </div>
          </div>
          <button onClick={handleLogout} className="w-full flex items-center gap-3 px-4 py-3 mt-2 rounded-xl text-slate-400 hover:bg-red-500/10 hover:text-red-400 transition">
            <LogOut size={20} /><span className="font-medium">Logout</span>
          </button>
        </div>
      </aside>

      <div className="flex-1 flex flex-col min-h-screen">
        <header className="sticky top-0 z-30 bg-white/80 backdrop-blur-xl border-b border-slate-200 px-6 py-4 flex items-center justify-between">
          <button onClick={() => setSidebarOpen(true)} className="lg:hidden"><Menu size={24} className="text-slate-700" /></button>
          <h2 className="text-lg font-semibold text-slate-800 hidden lg:block">
            {menuItems.find((i) => i.path === location.pathname)?.label || "Admin Panel"}
          </h2>
          <Link to="/" className="text-sm text-blue-600 hover:text-blue-700 font-medium">← Back to Website</Link>
        </header>
        <main className="flex-1 p-6"><Outlet /></main>
      </div>
    </div>
  );
}
