import React from "react";
import { RotateCcw } from "lucide-react";

export default function RefundPolicy() {
  return (
    <div className="bg-slate-50 overflow-hidden">
      <section className="relative bg-slate-950 text-white">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 via-indigo-600/20 to-cyan-500/20" />
        <div className="relative max-w-7xl mx-auto px-6 py-24 text-center">
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 backdrop-blur-xl text-sm">
            <RotateCcw size={18} /> Policy
          </span>
          <h1 className="mt-8 text-5xl md:text-6xl font-bold">Refund Policy</h1>
          <p className="mt-6 text-slate-300 text-lg">Last Updated: June 2026</p>
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-6 py-20">
        <div className="bg-white rounded-3xl p-10 md:p-14 border border-slate-100 shadow-sm space-y-10">
          <div className="bg-amber-50 border border-amber-200 rounded-2xl p-6">
            <p className="text-amber-800 font-semibold text-lg">Important Notice</p>
            <p className="text-amber-700 mt-2">Please read this refund policy carefully before making any payment. By purchasing a course, you acknowledge and agree to this policy.</p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">1. Refund Eligibility</h2>
            <p className="text-slate-600 leading-relaxed mb-4">Refund requests are considered under the following conditions:</p>
            <ul className="space-y-3 text-slate-600">
              <li className="flex gap-3"><span className="text-green-600 font-bold">✓</span><strong>Within 7 days</strong> of purchase if no course videos have been accessed/viewed.</li>
              <li className="flex gap-3"><span className="text-green-600 font-bold">✓</span><strong>Technical Issues:</strong> If persistent technical problems prevent course access and our team cannot resolve them within 48 hours.</li>
              <li className="flex gap-3"><span className="text-green-600 font-bold">✓</span><strong>Duplicate Payment:</strong> If you are charged twice for the same course, the duplicate amount will be fully refunded.</li>
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">2. Non-Refundable Cases</h2>
            <ul className="space-y-3 text-slate-600">
              <li className="flex gap-3"><span className="text-red-500 font-bold">✗</span>After 7 days from the date of purchase.</li>
              <li className="flex gap-3"><span className="text-red-500 font-bold">✗</span>If any course video has been accessed or watched.</li>
              <li className="flex gap-3"><span className="text-red-500 font-bold">✗</span>If PDF notes have been downloaded.</li>
              <li className="flex gap-3"><span className="text-red-500 font-bold">✗</span>Change of mind after accessing course content.</li>
              <li className="flex gap-3"><span className="text-red-500 font-bold">✗</span>Promotional or discounted courses (unless otherwise stated).</li>
              <li className="flex gap-3"><span className="text-red-500 font-bold">✗</span>Account suspension due to terms violation.</li>
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">3. Refund Process</h2>
            <div className="space-y-4">
              <div className="flex gap-4 items-start">
                <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold shrink-0 text-sm">1</div>
                <div><p className="font-semibold text-slate-800">Submit Request</p><p className="text-slate-600">Email us at info@gtceducationacademy.com with your registered email, course name, payment ID, and reason for refund.</p></div>
              </div>
              <div className="flex gap-4 items-start">
                <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold shrink-0 text-sm">2</div>
                <div><p className="font-semibold text-slate-800">Review (2-3 Business Days)</p><p className="text-slate-600">Our team will review your request and verify eligibility based on the policy.</p></div>
              </div>
              <div className="flex gap-4 items-start">
                <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold shrink-0 text-sm">3</div>
                <div><p className="font-semibold text-slate-800">Processing (5-7 Business Days)</p><p className="text-slate-600">If approved, the refund will be processed to the original payment method within 5-7 business days.</p></div>
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">4. Course Transfer</h2>
            <p className="text-slate-600 leading-relaxed">Course enrollments are non-transferable. You cannot transfer your course access to another person. Each enrollment is tied to the registered student's account.</p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">5. Contact for Refunds</h2>
            <div className="bg-slate-50 rounded-2xl p-6">
              <p className="font-semibold text-slate-900">GTC Education Academy</p>
              <p className="text-slate-600">Email: info@gtceducationacademy.com</p>
              <p className="text-slate-600">Phone: +91 XXXXX XXXXX</p>
              <p className="text-slate-600 mt-2 text-sm">Response Time: Within 24-48 hours on business days</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
