import React, { useState } from "react";
import { HelpCircle, ChevronDown, GraduationCap } from "lucide-react";

const faqs = [
  {
    category: "General",
    items: [
      { q: "What is GTC Education Academy?", a: "GTC Education Academy is the training division of GTC Solutions, focused on providing practical, industry-oriented accounting, finance, taxation, and language training to students, graduates, and working professionals in Coimbatore." },
      { q: "Where is GTC Education Academy located?", a: "We are located at Kurumbapalayam Road, Kurumbapalayam Nagar, Coimbatore, Tamil Nadu – 641104." },
      { q: "What are the batch timings?", a: "We offer flexible batch timings including morning (9 AM – 12 PM), afternoon (2 PM – 5 PM), and evening (6 PM – 8 PM) batches. Weekend batches are also available for working professionals." },
      { q: "Do you offer online classes?", a: "Yes! We offer recorded video courses that you can access anytime, anywhere on mobile or desktop. Our recorded courses include video lectures, PDF notes, and course completion certificates." },
    ],
  },
  {
    category: "Courses & Enrollment",
    items: [
      { q: "What courses do you offer?", a: "We offer courses in three categories: Finance & Taxation (Tally Prime, Zoho Books, GST, Income Tax, SAP FICO, TDS, TCS, ESI, PF), Professional Courses (CMA Foundation, Intermediate, Final), and Language Courses (Spoken English, Spoken Hindi)." },
      { q: "How do I enroll in a course?", a: "You can enroll by creating an account on our website, selecting your desired course, and completing the payment. Once payment is confirmed, you'll get instant access to the course materials." },
      { q: "Can I enroll in multiple courses?", a: "Yes, you can enroll in as many courses as you'd like. Each course has its own validity period and progress tracking." },
      { q: "What is the course validity?", a: "Course validity varies by course — typically 6 months to 1 year. You can check the specific validity on each course page. After expiry, you can extend your access." },
    ],
  },
  {
    category: "Payments",
    items: [
      { q: "What payment methods are accepted?", a: "We accept UPI, Debit Cards, Credit Cards, and Net Banking through our secure Razorpay payment gateway." },
      { q: "Is online payment secure?", a: "Yes, all payments are processed through Razorpay, which is PCI-DSS compliant and uses bank-grade encryption for all transactions." },
      { q: "Can I get a payment receipt?", a: "Yes, you can download payment receipts from your student dashboard under the 'Payment History' section." },
      { q: "Do you offer EMI options?", a: "EMI options are available through select credit cards at the time of payment via Razorpay." },
    ],
  },
  {
    category: "Certificates",
    items: [
      { q: "Will I receive a certificate after completing a course?", a: "Yes! Upon successful completion of a course, you will receive a digital certificate from GTC Education Academy that you can download from your dashboard." },
      { q: "Is the certificate recognized?", a: "Our certificates are recognized by employers in the accounting and finance industry. They validate your practical training and skills acquired during the course." },
      { q: "How do I get my certificate?", a: "Once you complete all video chapters in a course, your certificate will be issued automatically and available for download in your Student Dashboard." },
    ],
  },
  {
    category: "Technical Support",
    items: [
      { q: "I cannot access my course videos. What should I do?", a: "Please ensure you're logged in with the correct account. If the issue persists, check your course validity. For further assistance, contact us via WhatsApp or email." },
      { q: "Can I watch videos on mobile?", a: "Yes, our video player is fully responsive and works on all devices — mobile, tablet, and desktop." },
      { q: "Can I download the videos?", a: "Videos are streaming-only for security purposes. However, you can download PDF notes associated with each chapter." },
    ],
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggle = (key) => {
    setOpenIndex(openIndex === key ? null : key);
  };

  return (
    <div className="bg-slate-50 overflow-hidden">
      {/* Hero */}
      <section className="relative bg-slate-950 text-white">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 via-indigo-600/20 to-cyan-500/20" />
        <div className="relative max-w-7xl mx-auto px-6 py-24 text-center">
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 backdrop-blur-xl text-sm">
            <HelpCircle size={18} />
            Frequently Asked Questions
          </span>
          <h1 className="mt-8 text-5xl md:text-6xl font-bold">
            How Can We <span className="text-blue-400">Help You?</span>
          </h1>
          <p className="mt-6 text-xl text-slate-300 max-w-2xl mx-auto">
            Find answers to common questions about our courses, enrollment, payments, and more.
          </p>
        </div>
      </section>

      {/* FAQ Content */}
      <section className="max-w-4xl mx-auto px-6 py-20">
        {faqs.map((section, sectionIdx) => (
          <div key={section.category} className="mb-12">
            <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center text-sm font-bold">
                {sectionIdx + 1}
              </div>
              {section.category}
            </h2>

            <div className="space-y-3">
              {section.items.map((faq, idx) => {
                const key = `${sectionIdx}-${idx}`;
                const isOpen = openIndex === key;

                return (
                  <div
                    key={key}
                    className={`bg-white rounded-2xl border transition-all duration-300 ${isOpen ? 'border-blue-200 shadow-lg shadow-blue-100/50' : 'border-slate-200'}`}
                  >
                    <button
                      onClick={() => toggle(key)}
                      className="w-full flex items-center justify-between p-5 text-left"
                    >
                      <span className="font-semibold text-slate-800 pr-4">{faq.q}</span>
                      <ChevronDown
                        size={20}
                        className={`text-slate-400 shrink-0 transition-transform duration-300 ${isOpen ? 'rotate-180 text-blue-600' : ''}`}
                      />
                    </button>

                    <div
                      className={`overflow-hidden transition-all duration-300 ${isOpen ? 'max-h-96 pb-5' : 'max-h-0'}`}
                    >
                      <p className="px-5 text-slate-600 leading-relaxed">{faq.a}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </section>

      {/* Still have questions */}
      <section className="pb-24">
        <div className="max-w-4xl mx-auto px-6">
          <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white rounded-[32px] p-12 text-center">
            <GraduationCap size={42} className="mx-auto mb-4" />
            <h2 className="text-3xl font-bold">Still Have Questions?</h2>
            <p className="mt-4 text-blue-100 text-lg">
              Our team is here to help. Reach out via WhatsApp or visit our academy.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <a href="/contact" className="px-8 py-3 bg-white text-blue-700 font-semibold rounded-xl hover:scale-105 transition">
                Contact Us
              </a>
              <a href="https://wa.me/919876543210" target="_blank" rel="noopener noreferrer" className="px-8 py-3 border border-white/30 rounded-xl hover:bg-white/10 transition">
                WhatsApp Us
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
