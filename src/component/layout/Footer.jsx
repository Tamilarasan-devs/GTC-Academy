import React from "react";
import { Link } from "react-router-dom";
import { Mail, Phone, MapPin } from "lucide-react";
import logoImg from "../../assets/logo1.png";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#071344] text-white pt-20 pb-10 border-t border-[#162a80] relative overflow-hidden font-sans">
      {/* Decorative gradient */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[300px] bg-[#e56301]/10 blur-[140px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8 mb-16">
          {/* Brand Col */}
          <div className="lg:col-span-4 space-y-6">
            <Link to="/" className="inline-flex items-center gap-3">
              <img src={logoImg} alt="GTC Logo" className="h-16 w-auto object-contain rounded-lg bg-white p-2 shadow-md" />
            </Link>
            <p className="text-slate-300 leading-relaxed max-w-sm text-sm">
              Empowering careers with practical, skill-oriented training in finance, taxation, digital accounting, and professional software skills.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-[#e56301] transition shadow">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
              </a>
              <a href="https://www.instagram.com/g_t_c_solutions?stkn=MThvNzg0dGc3czc5Yw==" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-[#e56301] transition shadow">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-[#e56301] transition shadow">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-2">
            <h3 className="text-white font-bold text-base uppercase tracking-wider mb-6 border-b border-[#e56301]/40 pb-2 inline-block">Quick Links</h3>
            <ul className="space-y-3 text-sm">
              <li><Link to="/about" className="text-slate-300 hover:text-[#e56301] transition">About Us</Link></li>
              <li><Link to="/why-choose-us" className="text-slate-300 hover:text-[#e56301] transition">Why Choose Us</Link></li>
              <li><Link to="/course" className="text-slate-300 hover:text-[#e56301] transition">Our Courses</Link></li>
              <li><Link to="/contact" className="text-slate-300 hover:text-[#e56301] transition">Contact Us</Link></li>
              <li><Link to="/faq" className="text-slate-300 hover:text-[#e56301] transition">FAQ</Link></li>
            </ul>
          </div>

          {/* Legal */}
          <div className="lg:col-span-2">
            <h3 className="text-white font-bold text-base uppercase tracking-wider mb-6 border-b border-[#e56301]/40 pb-2 inline-block">Legal</h3>
            <ul className="space-y-3 text-sm">
              <li><Link to="/privacy" className="text-slate-300 hover:text-[#e56301] transition">Privacy Policy</Link></li>
              <li><Link to="/terms" className="text-slate-300 hover:text-[#e56301] transition">Terms & Conditions</Link></li>
              <li><Link to="/refund" className="text-slate-300 hover:text-[#e56301] transition">Refund Policy</Link></li>
              <li><Link to="/login" className="text-[#ffb076] hover:underline font-bold transition">Admin / Student Login</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="lg:col-span-4">
            <h3 className="text-white font-bold text-base uppercase tracking-wider mb-6 border-b border-[#e56301]/40 pb-2 inline-block">Contact Info</h3>
            <ul className="space-y-4 text-sm">
              <li className="flex items-start gap-3">
                <MapPin className="text-[#e56301] shrink-0 mt-1" size={18} />
                <span className="text-slate-300">3/83 Belladhi KurumbaPalayam Theramplyam post Pogalur via KurumbaPalayam -641104</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="text-[#e56301] shrink-0" size={18} />
                <a href="tel:+918438898767" className="text-slate-300 hover:text-[#e56301] transition">+91 84388 98767</a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="text-[#e56301] shrink-0" size={18} />
                <a href="mailto:gtceducationacademy@gmail.com" className="text-slate-300 hover:text-[#e56301] transition">gtceducationacademy@gmail.com</a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-slate-400 text-xs text-center md:text-left">
            &copy; {currentYear} GTC Education Academy. All rights reserved.
          </p>
          <div className="flex gap-3">
            <img src="https://upload.wikimedia.org/wikipedia/commons/e/e1/UPI-Logo-vector.svg" alt="UPI" className="h-5 opacity-70 bg-white px-2 py-0.5 rounded" />
            <img src="https://upload.wikimedia.org/wikipedia/commons/1/16/Former_Visa_%28company%29_logo.svg" alt="Visa" className="h-5 opacity-70 bg-white px-2 py-0.5 rounded" />
            <img src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg" alt="Mastercard" className="h-5 opacity-70 bg-white px-2 py-0.5 rounded" />
          </div>
        </div>
      </div>
    </footer>
  );
}