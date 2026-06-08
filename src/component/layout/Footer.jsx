import React from "react";
import {
    GraduationCap,
    MapPin,
    Phone,
    Mail,
} from "lucide-react";

import {
    FaFacebookF,
    FaInstagram,
    FaLinkedinIn,
    FaYoutube,
} from "react-icons/fa";

export default function Footer() {
    return (
        <footer className="bg-slate-950 text-white">
            <div className="max-w-7xl mx-auto px-6 py-20">
                <div className="grid lg:grid-cols-4 gap-12">

                    {/* BRAND SECTION */}
                    <div className="lg:col-span-2">
                        <div className="flex items-center gap-3">
                            <div className="bg-blue-600 p-3 rounded-2xl">
                                <GraduationCap size={28} />
                            </div>

                            <div>
                                <h2 className="text-2xl font-bold">
                                    GTC Education Academy
                                </h2>
                                <p className="text-slate-400 text-sm">
                                    Training Division of GTC Solutions
                                </p>
                            </div>
                        </div>

                        <p className="mt-6 text-slate-400 leading-relaxed max-w-lg">
                            Transforming students into accounting professionals through
                            practical learning, industry expertise, and real-time training
                            in Accounting, GST, Tally Prime, Income Tax, Payroll, and Excel.
                        </p>

                        {/* SOCIAL ICONS */}
                        <div className="flex gap-4 mt-8">
                            <a
                                href="#"
                                className="w-11 h-11 flex items-center justify-center rounded-xl bg-white/5 border border-white/10 hover:bg-blue-600 transition"
                            >
                                <FaFacebookF />
                            </a>

                            <a
                                href="#"
                                className="w-11 h-11 flex items-center justify-center rounded-xl bg-white/5 border border-white/10 hover:bg-pink-600 transition"
                            >
                                <FaInstagram />
                            </a>

                            <a
                                href="#"
                                className="w-11 h-11 flex items-center justify-center rounded-xl bg-white/5 border border-white/10 hover:bg-blue-700 transition"
                            >
                                <FaLinkedinIn />
                            </a>

                            <a
                                href="#"
                                className="w-11 h-11 flex items-center justify-center rounded-xl bg-white/5 border border-white/10 hover:bg-red-600 transition"
                            >
                                <FaYoutube />
                            </a>
                        </div>
                    </div>

                    {/* QUICK LINKS */}
                    <div>
                        <h3 className="text-lg font-semibold mb-6">Quick Links</h3>

                        <ul className="space-y-4 text-slate-400">
                            <li><a href="/" className="hover:text-white">Home</a></li>
                            <li><a href="/about" className="hover:text-white">About</a></li>
                            <li><a href="/course" className="hover:text-white">Courses</a></li>
                            <li><a href="/contact" className="hover:text-white">Contact</a></li>
                        </ul>
                    </div>

                    {/* CONTACT INFO */}
                    <div>
                        <h3 className="text-lg font-semibold mb-6">Contact</h3>

                        <div className="space-y-5 text-slate-400">
                            <div className="flex gap-3">
                                <MapPin className="text-blue-400 mt-1" size={18} />
                                <p>
                                    Kurumbapalayam Road, Kurumbapalayam Nagar, Coimbatore,
                                    Tamil Nadu - 641104
                                </p>
                            </div>

                            <div className="flex gap-3">
                                <Phone className="text-blue-400" size={18} />
                                <p>+91 XXXXX XXXXX</p>
                            </div>

                            <div className="flex gap-3">
                                <Mail className="text-blue-400" size={18} />
                                <p>info@gtceducationacademy.com</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* BOTTOM BAR */}
                <div className="border-t border-white/10 mt-16 pt-8 text-center md:flex md:justify-between md:text-left">
                    <p className="text-slate-500 text-sm">
                        © {new Date().getFullYear()} GTC Education Academy. All Rights Reserved.
                    </p>

                    <p className="text-slate-500 text-sm mt-3 md:mt-0">
                        Designed with ❤️ for Accounting Professionals
                    </p>
                </div>
            </div>
        </footer>
    );
}