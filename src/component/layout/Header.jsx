import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { GraduationCap, Menu, X, User } from "lucide-react";
import { useAuth } from "../../context/AuthContext";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { pathname } = useLocation();
  const { user } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "About Us", path: "/about" },
    { name: "Courses", path: "/course" },
    { name: "Contact Us", path: "/contact" },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white shadow-sm py-4 transition-all duration-300 font-sans">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 z-50">
            <div className="bg-blue-600 p-2.5 rounded-xl flex items-center justify-center shadow-md shadow-blue-600/20">
              <GraduationCap className="text-white" size={24} />
            </div>
            <div className="flex flex-col justify-center">
              <span className="text-[10px] font-black tracking-widest text-blue-500 uppercase leading-none mt-1">
                ACADEMY
              </span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-10">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={`font-bold text-[15px] transition-colors ${
                  pathname === link.path
                    ? "text-blue-600"
                    : "text-slate-900 hover:text-blue-500"
                }`}
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* Desktop Auth */}
          <div className="hidden md:flex items-center gap-4">
            {user ? (
              <Link
                to={user.role === "admin" ? "/admin/dashboard" : "/student/dashboard"}
                className="flex items-center gap-2 px-6 py-2.5 bg-blue-600 text-white rounded-full font-bold text-sm hover:bg-blue-700 transition shadow-lg shadow-blue-600/30"
              >
                <User size={18} />
                Dashboard
              </Link>
            ) : (
              <>
                <Link
                  to="/login"
                  className="font-bold text-slate-400 hover:text-blue-600 transition-colors text-sm"
                >
                  Log in
                </Link>
                <Link
                  to="/register"
                  className="px-6 py-2.5 bg-blue-600 text-white rounded-full font-bold text-sm hover:bg-blue-700 transition shadow-lg shadow-blue-600/30"
                >
                  Register
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden z-50 p-2 text-slate-900"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      <div
        className={`fixed inset-0 bg-white z-40 transition-transform duration-300 md:hidden ${
          mobileMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex flex-col items-center justify-center min-h-screen gap-8 p-6">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              onClick={() => setMobileMenuOpen(false)}
              className={`text-2xl font-bold ${
                pathname === link.path ? "text-blue-600" : "text-slate-800"
              }`}
            >
              {link.name}
            </Link>
          ))}
          <div className="w-full h-px bg-slate-100 my-4" />
          {user ? (
            <Link
              to={user.role === "admin" ? "/admin/dashboard" : "/student/dashboard"}
              onClick={() => setMobileMenuOpen(false)}
              className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-blue-600 text-white rounded-2xl font-semibold text-lg"
            >
              <User size={20} />
              Go to Dashboard
            </Link>
          ) : (
            <div className="flex flex-col w-full gap-4">
              <Link
                to="/login"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full py-4 text-center border-2 border-slate-200 rounded-2xl font-bold text-slate-800 text-lg"
              >
                Log in
              </Link>
              <Link
                to="/register"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full py-4 text-center bg-blue-600 text-white rounded-2xl font-bold text-lg shadow-lg shadow-blue-600/30"
              >
                Register
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}