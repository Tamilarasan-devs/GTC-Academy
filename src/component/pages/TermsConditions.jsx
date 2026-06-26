import React from "react";
import { FileText } from "lucide-react";

export default function TermsConditions() {
  return (
    <div className="bg-slate-50 overflow-hidden">
      <section className="relative bg-slate-950 text-white">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 via-indigo-600/20 to-cyan-500/20" />
        <div className="relative max-w-7xl mx-auto px-6 py-24 text-center">
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 backdrop-blur-xl text-sm">
            <FileText size={18} /> Legal
          </span>
          <h1 className="mt-8 text-5xl md:text-6xl font-bold">Terms & Conditions</h1>
          <p className="mt-6 text-slate-300 text-lg">Last Updated: June 2026</p>
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-6 py-20">
        <div className="bg-white rounded-3xl p-10 md:p-14 border border-slate-100 shadow-sm space-y-10">
          <div>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">1. Acceptance of Terms</h2>
            <p className="text-slate-600 leading-relaxed">By accessing and using the GTC Education Academy website and services, you agree to be bound by these Terms and Conditions. If you do not agree with any part of these terms, please do not use our services.</p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">2. Account Registration</h2>
            <p className="text-slate-600 leading-relaxed">To access our courses, you must create a student account with accurate and complete information. You are responsible for maintaining the confidentiality of your login credentials. Each account is for individual use only and must not be shared with others.</p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">3. Course Enrollment</h2>
            <ul className="space-y-3 text-slate-600">
              <li className="flex gap-3"><span className="text-blue-600 font-bold">•</span>Course access is granted upon successful payment confirmation.</li>
              <li className="flex gap-3"><span className="text-blue-600 font-bold">•</span>Each course has a specific validity period as mentioned on the course page.</li>
              <li className="flex gap-3"><span className="text-blue-600 font-bold">•</span>Access expires automatically after the validity period unless renewed.</li>
              <li className="flex gap-3"><span className="text-blue-600 font-bold">•</span>Course content, pricing, and structure may be updated without prior notice.</li>
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">4. Payments</h2>
            <p className="text-slate-600 leading-relaxed">All payments are processed securely through Razorpay. Prices are listed in Indian Rupees (INR). Course fees are non-transferable. Payment confirmation is required before course access is granted.</p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">5. Intellectual Property</h2>
            <p className="text-slate-600 leading-relaxed">All course content, videos, PDF notes, materials, logos, and website content are the intellectual property of GTC Education Academy / GTC Solutions. Unauthorized reproduction, distribution, downloading, or sharing of course content is strictly prohibited and may result in legal action.</p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">6. Video Content</h2>
            <ul className="space-y-3 text-slate-600">
              <li className="flex gap-3"><span className="text-blue-600 font-bold">•</span>Videos are for streaming only and cannot be downloaded.</li>
              <li className="flex gap-3"><span className="text-blue-600 font-bold">•</span>Screen recording, sharing, or redistributing video content is prohibited.</li>
              <li className="flex gap-3"><span className="text-blue-600 font-bold">•</span>Access is limited to the enrolled student only.</li>
              <li className="flex gap-3"><span className="text-blue-600 font-bold">•</span>Violation may result in immediate account suspension without refund.</li>
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">7. Certificates</h2>
            <p className="text-slate-600 leading-relaxed">Certificates are issued upon successful completion of all course chapters. Certificates are for the enrolled student only and represent completion of our training program. The issuance of certificates is at the discretion of GTC Education Academy.</p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">8. Code of Conduct</h2>
            <p className="text-slate-600 leading-relaxed">Students are expected to maintain professional behavior. Any form of harassment, abuse, or inappropriate conduct towards faculty, staff, or fellow students will result in immediate termination of account and services without refund.</p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">9. Limitation of Liability</h2>
            <p className="text-slate-600 leading-relaxed">GTC Education Academy provides training and education services. We do not guarantee employment or specific outcomes. While we provide placement assistance, final employment decisions are made by employers. Our liability is limited to the course fees paid.</p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">10. Modifications</h2>
            <p className="text-slate-600 leading-relaxed">We reserve the right to modify these Terms and Conditions at any time. Changes will be effective immediately upon posting. Continued use of our services constitutes acceptance of the updated terms.</p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">11. Governing Law</h2>
            <p className="text-slate-600 leading-relaxed">These terms shall be governed by and interpreted in accordance with the laws of India. Any disputes shall be subject to the exclusive jurisdiction of the courts in Coimbatore, Tamil Nadu.</p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">12. Contact</h2>
            <div className="bg-slate-50 rounded-2xl p-6">
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
