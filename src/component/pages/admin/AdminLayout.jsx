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
    <div className="min-h-screen bg-slate-50 flex font-sans selection:bg-[#e56301] selection:text-white">
      {sidebarOpen && <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 lg:hidden" onClick={() => setSidebarOpen(false)} />}

      {/* Sidebar */}
      <aside className={`fixed lg:sticky top-0 left-0 h-screen w-72 bg-[#071344] text-white z-50 flex flex-col transition-transform duration-300 shadow-[4px_0_24px_rgba(0,0,0,0.05)] ${sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}`}>
        <div className="p-6 border-b border-white/10 relative overflow-hidden">
          {/* Decorative element */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-[#e56301]/20 rounded-full blur-[40px] -translate-y-1/2 translate-x-1/2 pointer-events-none" />
          <Link to="/" className="flex items-center gap-3 relative z-10">
            <div className="bg-gradient-to-br from-[#e56301] to-[#ff8c3a] p-2 rounded-xl shadow-lg shadow-orange-500/20"><GraduationCap size={22} className="text-white" /></div>
            <div>
              <h1 className="font-bold text-lg tracking-tight">GTC Admin</h1>
              <p className="text-xs text-slate-300 font-medium">Management Panel</p>
            </div>
          </Link>
        </div>

        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          {menuItems.map((item) => {
            const active = location.pathname === item.path;
            return (
              <Link key={item.path} to={item.path} onClick={() => setSidebarOpen(false)}
                className={`flex items-center gap-3 px-4 py-3.5 rounded-xl transition-all duration-300 group relative overflow-hidden ${active ? "text-white shadow-lg shadow-orange-500/20 font-bold" : "text-slate-300 hover:text-white hover:bg-white/5 font-medium"}`}>
                {active && <div className="absolute inset-0 bg-gradient-to-r from-[#e56301] to-[#ff8c3a] opacity-100" />}
                <item.icon size={20} className={`relative z-10 ${active ? "text-white" : "text-slate-400 group-hover:text-[#e56301] transition-colors"}`} />
                <span className="relative z-10">{item.label}</span>
                {active && <ChevronRight size={16} className="ml-auto" />}
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-white/10 bg-[#040d30]">
          <div className="flex items-center gap-3 px-4 py-3 bg-white/5 rounded-2xl border border-white/10">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#e56301] to-[#ff8c3a] flex items-center justify-center font-bold text-sm shadow-md">A</div>
            <div className="flex-1 min-w-0">
              <p className="font-bold text-sm truncate">{user?.name}</p>
              <p className="text-xs text-slate-300">Administrator</p>
            </div>
          </div>
          <button onClick={handleLogout} className="w-full flex items-center gap-3 px-4 py-3 mt-2 rounded-xl text-slate-400 hover:bg-red-500/10 hover:text-red-400 transition">
            <LogOut size={20} /><span className="font-medium">Logout</span>
          </button>
        </div>
      </aside>

      <div className="flex-1 flex flex-col min-h-screen w-full lg:w-[calc(100%-18rem)]">
        <header className="sticky top-0 z-30 bg-white/70 backdrop-blur-xl border-b border-slate-200/50 px-8 py-5 flex items-center justify-between shadow-[0_4px_30px_rgba(0,0,0,0.02)]">
          <button onClick={() => setSidebarOpen(true)} className="lg:hidden p-2 -ml-2 rounded-xl hover:bg-slate-100 transition"><Menu size={24} className="text-slate-700" /></button>
          <h2 className="text-xl font-bold text-slate-800 hidden lg:block tracking-tight">
            {menuItems.find((i) => i.path === location.pathname)?.label || "Admin Panel"}
          </h2>
          <Link to="/" className="text-sm px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-full font-bold transition flex items-center gap-2">
            <ChevronRight size={16} className="rotate-180" /> Back to Website
          </Link>
        </header>
        <main className="flex-1 p-4 md:p-8 overflow-x-hidden"><Outlet /></main>
      </div>
    </div>
  );
}
