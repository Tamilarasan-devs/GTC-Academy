import React from "react";
import { Link } from "react-router-dom";
import { GraduationCap, Mail, Phone, MapPin } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-950 pt-20 pb-10 border-t border-slate-800 relative overflow-hidden">
      {/* Decorative gradient */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[300px] bg-blue-600/20 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8 mb-16">
          {/* Brand Col */}
          <div className="lg:col-span-4 space-y-6">
            <Link to="/" className="inline-flex items-center gap-3">
              <div className="bg-blue-600 p-2 rounded-xl">
                <GraduationCap className="text-white" size={28} />
              </div>
              <div>
                <h2 className="font-bold text-2xl text-white leading-tight">GTC Education</h2>
                <p className="text-[11px] uppercase tracking-[0.2em] font-semibold text-blue-400">Academy</p>
              </div>
            </Link>
            <p className="text-slate-400 leading-relaxed max-w-sm">
              Empowering careers with practical, industry-oriented training in finance, taxation, and professional skills.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-slate-300 hover:bg-blue-600 hover:text-white transition">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-slate-300 hover:bg-blue-600 hover:text-white transition">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-slate-300 hover:bg-blue-600 hover:text-white transition">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-slate-300 hover:bg-blue-600 hover:text-white transition">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path></svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-2">
            <h3 className="text-white font-semibold text-lg mb-6">Quick Links</h3>
            <ul className="space-y-4">
              <li><Link to="/about" className="text-slate-400 hover:text-blue-400 transition">About Us</Link></li>
              <li><Link to="/course" className="text-slate-400 hover:text-blue-400 transition">Our Courses</Link></li>
              <li><Link to="/contact" className="text-slate-400 hover:text-blue-400 transition">Contact Us</Link></li>
              <li><Link to="/faq" className="text-slate-400 hover:text-blue-400 transition">FAQ</Link></li>
            </ul>
          </div>

          {/* Legal */}
          <div className="lg:col-span-2">
            <h3 className="text-white font-semibold text-lg mb-6">Legal</h3>
            <ul className="space-y-4">
              <li><Link to="/privacy" className="text-slate-400 hover:text-blue-400 transition">Privacy Policy</Link></li>
              <li><Link to="/terms" className="text-slate-400 hover:text-blue-400 transition">Terms & Conditions</Link></li>
              <li><Link to="/refund" className="text-slate-400 hover:text-blue-400 transition">Refund Policy</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="lg:col-span-4">
            <h3 className="text-white font-semibold text-lg mb-6">Contact Info</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-4">
                <MapPin className="text-blue-500 shrink-0 mt-1" size={20} />
                <span className="text-slate-400">Kurumbapalayam Road, Kurumbapalayam Nagar, Coimbatore, Tamil Nadu – 641104</span>
              </li>
              <li className="flex items-center gap-4">
                <Phone className="text-blue-500 shrink-0" size={20} />
                <a href="tel:+910000000000" className="text-slate-400 hover:text-blue-400 transition">+91 00000 00000</a>
              </li>
              <li className="flex items-center gap-4">
                <Mail className="text-blue-500 shrink-0" size={20} />
                <a href="mailto:info@gtceducation.com" className="text-slate-400 hover:text-blue-400 transition">info@gtceducation.com</a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-slate-500 text-sm text-center md:text-left">
            &copy; {currentYear} GTC Education Academy (A division of GTC Solutions). All rights reserved.
          </p>
          <div className="flex gap-2">
            <img src="https://upload.wikimedia.org/wikipedia/commons/e/e1/UPI-Logo-vector.svg" alt="UPI" className="h-6 opacity-50" />
            <img src="https://upload.wikimedia.org/wikipedia/commons/1/16/Former_Visa_%28company%29_logo.svg" alt="Visa" className="h-6 opacity-50" />
            <img src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg" alt="Mastercard" className="h-6 opacity-50" />
          </div>
        </div>
      </div>
    </footer>
  );
}