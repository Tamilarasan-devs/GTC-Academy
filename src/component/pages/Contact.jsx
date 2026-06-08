import React from "react";
import { MapPin, GraduationCap, Phone, Mail } from "lucide-react";

export default function Contact() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 py-16 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-14">
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-100 text-blue-700 font-medium text-sm">
            <GraduationCap size={18} />
            GTC Education Academy
          </span>

          <h1 className="mt-6 text-4xl md:text-5xl font-bold text-slate-900">
            Contact Us
          </h1>

          <p className="mt-4 text-lg text-slate-600 max-w-3xl mx-auto leading-relaxed">
            Transforming Students into Accounting Professionals Through
            Practical Learning and Industry Expertise.
          </p>
        </div>

        {/* Contact Card */}
        <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-slate-100">
          <div className="grid lg:grid-cols-2">
            {/* Left Side */}
            <div className="bg-gradient-to-br from-blue-600 to-indigo-700 text-white p-10 lg:p-14">
              <h2 className="text-3xl font-bold mb-4">
                GTC Education Academy
              </h2>

              <p className="text-blue-100 mb-8">
                Training Division of GTC Solutions
              </p>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="bg-white/20 p-3 rounded-xl">
                    <MapPin size={22} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">Address</h3>
                    <p className="text-blue-100">
                      Kurumbapalayam Road,
                      <br />
                      Kurumbapalayam Nagar,
                      <br />
                      Coimbatore, Tamil Nadu – 641104
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="bg-white/20 p-3 rounded-xl">
                    <Phone size={22} />
                  </div>
                  <div>
                    <h3 className="font-semibold">Phone</h3>
                    <p className="text-blue-100">+91 XXXXX XXXXX</p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="bg-white/20 p-3 rounded-xl">
                    <Mail size={22} />
                  </div>
                  <div>
                    <h3 className="font-semibold">Email</h3>
                    <p className="text-blue-100">
                      info@gtceducationacademy.com
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Side */}
            <div className="p-10 lg:p-14">
              <h2 className="text-2xl font-bold text-slate-900 mb-2">
                Get In Touch
              </h2>

              <p className="text-slate-500 mb-8">
                Have questions about our accounting training programs? Send us
                a message and we'll get back to you shortly.
              </p>

              <form className="space-y-5">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    placeholder="Enter your name"
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Message
                  </label>
                  <textarea
                    rows="5"
                    placeholder="Write your message..."
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-blue-600 hover:bg-blue-700 transition-all text-white font-semibold py-3 rounded-xl shadow-lg shadow-blue-200"
                >
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* Footer Note */}
        <div className="text-center mt-10">
          <p className="text-slate-500 text-sm">
            © {new Date().getFullYear()} GTC Education Academy • Training
            Division of GTC Solutions
          </p>
        </div>
      </div>
    </div>
  );
}