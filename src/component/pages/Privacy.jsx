import React from "react";
import { Shield } from "lucide-react";

export default function PrivacyPolicy() {
  return (
    <div className="bg-slate-50 overflow-hidden">
      <section className="relative bg-slate-950 text-white">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 via-indigo-600/20 to-cyan-500/20" />
        <div className="relative max-w-7xl mx-auto px-6 py-24 text-center">
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 backdrop-blur-xl text-sm">
            <Shield size={18} /> Legal
          </span>
          <h1 className="mt-8 text-5xl md:text-6xl font-bold">Privacy Policy</h1>
          <p className="mt-6 text-slate-300 text-lg">Last Updated: June 2026</p>
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-6 py-20">
        <div className="bg-white rounded-3xl p-10 md:p-14 border border-slate-100 shadow-sm space-y-10">
          <div>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">1. Introduction</h2>
            <p className="text-slate-600 leading-relaxed">GTC Education Academy ("we," "our," or "us"), a training division of GTC Solutions, is committed to protecting the privacy and personal data of our students, visitors, and users. This Privacy Policy explains how we collect, use, store, and protect your information when you use our website, courses, and services.</p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">2. Information We Collect</h2>
            <p className="text-slate-600 leading-relaxed mb-4">We may collect the following types of information:</p>
            <ul className="space-y-3 text-slate-600">
              <li className="flex gap-3"><span className="text-blue-600 font-bold">•</span><span><strong>Personal Information:</strong> Name, email address, phone number, and profile photo when you register an account.</span></li>
              <li className="flex gap-3"><span className="text-blue-600 font-bold">•</span><span><strong>Payment Information:</strong> Payment details processed securely through Razorpay. We do not store your card or bank details.</span></li>
              <li className="flex gap-3"><span className="text-blue-600 font-bold">•</span><span><strong>Usage Data:</strong> Course progress, video watch history, and learning activity for improving your experience.</span></li>
              <li className="flex gap-3"><span className="text-blue-600 font-bold">•</span><span><strong>Device Information:</strong> Browser type, IP address, and device type for security and analytics purposes.</span></li>
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">3. How We Use Your Information</h2>
            <ul className="space-y-3 text-slate-600">
              <li className="flex gap-3"><span className="text-blue-600 font-bold">•</span>To provide and maintain our educational services</li>
              <li className="flex gap-3"><span className="text-blue-600 font-bold">•</span>To process your course enrollments and payments</li>
              <li className="flex gap-3"><span className="text-blue-600 font-bold">•</span>To track your learning progress and issue certificates</li>
              <li className="flex gap-3"><span className="text-blue-600 font-bold">•</span>To communicate important updates about your courses</li>
              <li className="flex gap-3"><span className="text-blue-600 font-bold">•</span>To improve our course content and platform</li>
              <li className="flex gap-3"><span className="text-blue-600 font-bold">•</span>To provide customer support and respond to inquiries</li>
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">4. Data Sharing</h2>
            <p className="text-slate-600 leading-relaxed">We do not sell, trade, or rent your personal information to third parties. We may share information only with: payment processors (Razorpay) for transaction processing, and service providers who assist in operating our platform under strict confidentiality agreements.</p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">5. Data Security</h2>
            <p className="text-slate-600 leading-relaxed">We implement industry-standard security measures including encrypted data transmission (SSL/TLS), secure password storage using bcrypt hashing, JWT-based authentication, and access controls to protect your personal information from unauthorized access.</p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">6. Cookies</h2>
            <p className="text-slate-600 leading-relaxed">We use essential cookies and local storage to maintain your login session and remember your course progress. We do not use tracking cookies for advertising purposes.</p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">7. Your Rights</h2>
            <p className="text-slate-600 leading-relaxed">You have the right to access, update, or delete your personal information through your student dashboard. You can also contact us to request data deletion. We will respond to your request within 30 days.</p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">8. Contact Us</h2>
            <p className="text-slate-600 leading-relaxed">For privacy-related questions, please contact us at:</p>
            <div className="mt-4 bg-slate-50 rounded-2xl p-6">
              <p className="font-semibold text-slate-900">GTC Education Academy</p>
              <p className="text-slate-600">Email: info@gtceducationacademy.com</p>
              <p className="text-slate-600">Address: Kurumbapalayam Road, Coimbatore, Tamil Nadu – 641104</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
