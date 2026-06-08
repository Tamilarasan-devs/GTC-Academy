import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X, GraduationCap } from "lucide-react";

export default function Header() {
    const [isOpen, setIsOpen] = useState(false);

    const navLinks = [
        { name: "Home", href: "/" },
        { name: "About", href: "/about" },
        { name: "Course", href: "/course" },
        { name: "Contact", href: "/contact" },
    ];

    return (
        <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-lg border-b border-slate-200">
            <div className="max-w-7xl mx-auto px-6">
                <div className="flex items-center justify-between h-20">
                    {/* Logo */}
                    <div className="flex items-center gap-3">
                        <div className="bg-blue-600 p-2 rounded-xl">
                            <GraduationCap className="text-white" size={24} />
                        </div>

                        <div>
                            <h1 className="font-bold text-xl text-slate-900">
                                GTC Education Academy
                            </h1>
                            <p className="text-xs text-slate-500">
                                Training Division of GTC Solutions
                            </p>
                        </div>
                    </div>

                    {/* Desktop Menu */}
                    <nav className="hidden md:flex items-center gap-8">
                        {navLinks.map((item) => (
                            <Link
                                key={item.name}
                                to={item.href}
                                className="text-slate-700 font-medium hover:text-blue-600 transition-colors duration-300"
                            >
                                {item.name}
                            </Link>
                        ))}

                        <Link
                            to="/contact"
                            className="bg-blue-600 text-white px-5 py-2.5 rounded-xl hover:bg-blue-700 transition-all duration-300 shadow-md"
                        >
                            Enquire Now
                        </Link>
                    </nav>

                    {/* Mobile Menu Button */}
                    <button
                        className="md:hidden"
                        onClick={() => setIsOpen(!isOpen)}
                    >
                        {isOpen ? (
                            <X size={28} className="text-slate-800" />
                        ) : (
                            <Menu size={28} className="text-slate-800" />
                        )}
                    </button>
                </div>

                {/* Mobile Menu */}
                {isOpen && (
                    <div className="md:hidden py-5 border-t border-slate-200">
                        <div className="flex flex-col gap-4">
                            {navLinks.map((item) => (
                                <Link
                                    key={item.name}
                                    to={item.href}
                                    className="text-slate-700 font-medium hover:text-blue-600"
                                    onClick={() => setIsOpen(false)}
                                >
                                    {item.name}
                                </Link>
                            ))}

                            <Link
                                to="/contact"
                                className="bg-blue-600 text-white text-center py-3 rounded-xl hover:bg-blue-700"
                                onClick={() => setIsOpen(false)}
                            >
                                Enquire Now
                            </Link>
                        </div>
                    </div>
                )}
            </div>
        </header>
    );
}