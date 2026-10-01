import React, { useState } from "react";
import { Mail, Phone, MapPin, Send, Clock } from "lucide-react";
import api from "../../utils/api";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", subject: "", message: "" });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      await api.post("/contact", form);
      setSuccess(true);
      setForm({ name: "", email: "", phone: "", subject: "", message: "" });
    } catch (err) {
      setError("Failed to send message. Please try again or contact via WhatsApp.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-slate-50 min-h-screen">
      {/* Hero */}
      <section className="bg-[#071344] text-white pt-28 pb-20 relative overflow-hidden font-sans">
        <div className="absolute inset-0 bg-gradient-to-r from-[#0b1e69] to-[#071344]" />
        <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">
          <h1 className="text-5xl md:text-6xl font-black mb-6">Contact <span className="text-[#e56301]">Us</span></h1>
          <p className="text-xl text-slate-300 max-w-2xl mx-auto">
            Have questions about our courses? We're here to help you make the right choice for your career.
          </p>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 py-16 -mt-8 relative z-20 font-sans">
        <div className="grid lg:grid-cols-5 gap-12">
          {/* Contact Info */}
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-xl shadow-slate-200/50">
              <h2 className="text-2xl font-bold text-[#0b1e69] mb-8">Get in Touch</h2>

              <div className="space-y-8">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-orange-50 text-[#e56301] rounded-full flex items-center justify-center shrink-0">
                    <MapPin size={24} />
                  </div>
                  <div>
                    <h3 className="font-bold text-[#0b1e69] mb-1">Our Location</h3>
                    <p className="text-slate-600 leading-relaxed">
                      3/83 Belladhi KurumbaPalayam Theramplyam post Pogalur via KurumbaPalayam -641104
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-orange-50 text-[#e56301] rounded-full flex items-center justify-center shrink-0">
                    <Phone size={24} />
                  </div>
                  <div>
                    <h3 className="font-bold text-[#0b1e69] mb-1">Call / WhatsApp</h3>
                    <p className="text-slate-600 mb-1">8438898767</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-orange-50 text-[#e56301] rounded-full flex items-center justify-center shrink-0">
                    <Mail size={24} />
                  </div>
                  <div>
                    <h3 className="font-bold text-[#0b1e69] mb-1">Email Us</h3>
                    <p className="text-slate-600">gtceducationacademy@gmail.com</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 pt-6 border-t border-slate-100">
                  <div className="w-12 h-12 bg-slate-100 text-[#0b1e69] rounded-full flex items-center justify-center shrink-0">
                    <Clock size={24} />
                  </div>
                  <div>
                    <h3 className="font-bold text-[#0b1e69] mb-1">Working Hours</h3>
                    <p className="text-slate-600">Mon - Sat: 9:00 AM - 7:00 PM</p>
                    <p className="text-slate-600">Sunday: Closed</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-3xl p-10 border border-slate-100 shadow-xl shadow-slate-200/50">
              <h2 className="text-3xl font-bold text-[#0b1e69] mb-2">Send a Message</h2>
              <p className="text-slate-600 mb-8">Fill out the form below and we will get back to you within 24 hours.</p>

              {success ? (
                <div className="bg-orange-50 border border-orange-200 rounded-2xl p-8 text-center">
                  <div className="w-16 h-16 bg-[#e56301] text-white rounded-full flex items-center justify-center mx-auto mb-4">
                    <Send size={32} />
                  </div>
                  <h3 className="text-2xl font-bold text-[#0b1e69] mb-2">Message Sent!</h3>
                  <p className="text-slate-600">Thank you for reaching out. We will contact you shortly.</p>
                  <button onClick={() => setSuccess(false)} className="mt-6 px-6 py-2.5 bg-[#e56301] text-white rounded-xl font-bold">Send Another</button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  {error && <div className="p-4 bg-red-50 text-red-600 rounded-xl text-sm border border-red-100">{error}</div>}

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="text-sm font-semibold text-slate-700 block mb-2">Full Name</label>
                      <input type="text" required value={form.name} onChange={e => setForm({...form, name: e.target.value})} className="w-full px-5 py-4 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#e56301] bg-slate-50" placeholder="John Doe" />
                    </div>
                    <div>
                      <label className="text-sm font-semibold text-slate-700 block mb-2">Email Address</label>
                      <input type="email" required value={form.email} onChange={e => setForm({...form, email: e.target.value})} className="w-full px-5 py-4 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#e56301] bg-slate-50" placeholder="john@example.com" />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="text-sm font-semibold text-slate-700 block mb-2">Phone Number</label>
                      <input type="tel" required value={form.phone} onChange={e => setForm({...form, phone: e.target.value})} className="w-full px-5 py-4 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#e56301] bg-slate-50" placeholder="+91 xxxxx xxxxx" />
                    </div>
                    <div>
                      <label className="text-sm font-semibold text-slate-700 block mb-2">Subject</label>
                      <input type="text" required value={form.subject} onChange={e => setForm({...form, subject: e.target.value})} className="w-full px-5 py-4 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#e56301] bg-slate-50" placeholder="Course Inquiry" />
                    </div>
                  </div>

                  <div>
                    <label className="text-sm font-semibold text-slate-700 block mb-2">Message</label>
                    <textarea required rows={5} value={form.message} onChange={e => setForm({...form, message: e.target.value})} className="w-full px-5 py-4 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#e56301] bg-slate-50 resize-none" placeholder="How can we help you?" />
                  </div>

                  <button type="submit" disabled={loading} className="w-full py-4 bg-[#e56301] hover:bg-[#c75400] text-white rounded-xl font-bold text-lg transition-all shadow-lg shadow-orange-500/20 disabled:opacity-50">
                    {loading ? "Sending..." : "Send Message"}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Map */}
      <section className="h-[400px] w-full bg-slate-200 mt-10">
        <iframe
          src="https://maps.google.com/maps?q=GTC+SOLUTIONS,+Kurumbapalayam+Rd,+Kurumbapalayam+Nagar,+Tamil+Nadu+641104&output=embed"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Google Maps Location"
        />
      </section>
    </div>
  );
}