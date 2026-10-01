import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, User, Phone, Mail, MapPin } from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import logoImg from "../../assets/logo1.png";

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
    { name: "Why Choose Us", path: "/why-choose-us" },
    { name: "Courses", path: "/course" },
    { name: "Contact Us", path: "/contact" },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-300 font-sans">
      {/* Top Info Bar */}
      <div className="bg-[#0b1e69] text-white text-xs py-2 px-6 border-b border-[#162a80]">
        <div className="max-w-7xl mx-auto flex flex-wrap justify-between items-center gap-4">
          <div className="flex items-center gap-6 text-slate-200">
            <span className="flex items-center gap-1.5">
              <Phone size={13} className="text-[#e56301]" />
              8438898767
            </span>
            <span className="hidden sm:flex items-center gap-1.5">
              <Mail size={13} className="text-[#e56301]" />
              gtceducationacademy@gmail.com
            </span>
            <span className="hidden md:flex items-center gap-1.5">
              <MapPin size={13} className="text-[#e56301]" />
              3/83 Belladhi KurumbaPalayam Theramplyam post Pogalur via KurumbaPalayam -641104
            </span>
          </div>
          <div className="flex items-center gap-3 text-[11px]">
            <span className="bg-[#e56301] text-white font-bold px-2 py-0.5 rounded text-[10px] uppercase tracking-wider">
              Admissions Open
            </span>
            <span className="hidden sm:inline text-slate-300">Join Skill-Based Training Today</span>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className={`bg-white transition-all duration-300 ${isScrolled ? "shadow-md py-2" : "shadow-sm py-3"}`}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-3 z-50">
              <img src={logoImg} alt="GTC Logo" className="h-12 md:h-16 lg:h-20 w-auto object-contain rounded-lg" />
            </Link>

            {/* Desktop Nav & CTA placed together */}
            <div className="hidden md:flex items-center gap-6 lg:gap-8">
              <nav className="flex items-center gap-6 lg:gap-8">
                {navLinks.map((link) => (
                  <Link
                    key={link.name}
                    to={link.path}
                    className={`font-semibold text-sm transition-colors relative py-1 ${
                      pathname === link.path
                        ? "text-[#e56301]"
                        : "text-[#0b1e69] hover:text-[#e56301]"
                    }`}
                  >
                    {link.name}
                    {pathname === link.path && (
                      <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#e56301] rounded-full" />
                    )}
                  </Link>
                ))}
              </nav>

              {user ? (
                <Link
                  to={user.role === "admin" ? "/admin/dashboard" : "/student/dashboard"}
                  className="flex items-center gap-2 px-5 py-2.5 bg-[#e56301] text-white rounded-full font-bold text-sm hover:bg-[#c75400] transition shadow-md shadow-orange-500/20 ml-2"
                >
                  <User size={16} />
                  Dashboard
                </Link>
              ) : (
                <Link
                  to="/register"
                  className="px-5 py-2.5 bg-[#e56301] text-white rounded-full font-bold text-sm hover:bg-[#c75400] transition shadow-md shadow-orange-500/20 ml-2"
                >
                  Get Started
                </Link>
              )}
            </div>

            {/* Mobile Menu Toggle */}
            <button
              className="md:hidden z-50 p-2 text-[#0b1e69]"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X size={26} /> : <Menu size={26} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav */}
      <div
        className={`fixed inset-0 bg-white z-40 transition-transform duration-300 md:hidden ${
          mobileMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex flex-col items-center justify-center min-h-screen gap-8 p-6 pt-24">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              onClick={() => setMobileMenuOpen(false)}
              className={`text-2xl font-bold ${
                pathname === link.path ? "text-[#e56301]" : "text-[#0b1e69]"
              }`}
            >
              {link.name}
            </Link>
          ))}
          <div className="w-full h-px bg-slate-100 my-2" />
          {user ? (
            <Link
              to={user.role === "admin" ? "/admin/dashboard" : "/student/dashboard"}
              onClick={() => setMobileMenuOpen(false)}
              className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-[#e56301] text-white rounded-2xl font-semibold text-lg"
            >
              <User size={20} />
              Go to Dashboard
            </Link>
          ) : (
            <Link
              to="/register"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full py-4 text-center bg-[#e56301] text-white rounded-2xl font-bold text-lg shadow-lg shadow-orange-500/20"
            >
              Get Started
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}