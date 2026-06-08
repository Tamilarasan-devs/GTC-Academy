
import React from "react";
import {
  BookOpen,
  Calculator,
  FileText,
  Briefcase,
  BarChart3,
  ShieldCheck,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";

export default function Course() {
  const careers = [
    "Accountant",
    "Junior Accountant",
    "Senior Accountant",
    "GST Executive",
    "Tax Consultant",
    "Accounts Executive",
    "Payroll Executive",
    "Finance Executive",
    "Audit Assistant",
    "Tally Operator",
    "Office Administrator",
    "Accounts Manager",
  ];

  const values = [
    "Excellence",
    "Integrity",
    "Innovation",
    "Commitment",
    "Professionalism",
  ];

  const methodology = [
    "Classroom Training",
    "Practical Lab Sessions",
    "Real-Time Projects",
    "Case Studies",
    "Assessments",
    "Certification",
  ];

  return (
    <div className="bg-slate-50 text-slate-900 overflow-hidden">
      {/* HERO */}
      <section className="relative bg-slate-950 text-white">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 via-indigo-600/20 to-cyan-500/20" />

        <div className="relative max-w-7xl mx-auto px-6 py-28">
          <span className="inline-flex items-center px-4 py-2 rounded-full border border-white/20 bg-white/10 backdrop-blur-xl text-sm">
            Professional Accounting Training Institute
          </span>

          <h1 className="mt-8 text-5xl md:text-7xl font-bold leading-tight">
            Become an
            <span className="block text-blue-400">
              Industry Ready Accountant
            </span>
          </h1>

          <p className="mt-8 text-lg md:text-xl text-slate-300 max-w-3xl">
            Learn Accounting, Tally Prime, GST, Income Tax, Payroll and
            Advanced Excel through practical training, real business scenarios,
            and expert guidance.
          </p>

          <div className="flex flex-wrap gap-4 mt-10">
            <button className="px-8 py-4 bg-blue-600 hover:bg-blue-700 rounded-2xl font-semibold transition">
              Explore Courses
            </button>

            <button className="px-8 py-4 border border-white/20 rounded-2xl backdrop-blur-xl hover:bg-white/10 transition">
              Contact Us
            </button>
          </div>

          {/* Stats */}
          <div className="grid md:grid-cols-4 gap-6 mt-20">
            {[
              ["6+", "Professional Programs"],
              ["100%", "Practical Training"],
              ["Placement", "Support Available"],
              ["Industry", "Focused Curriculum"],
            ].map(([value, label]) => (
              <div
                key={label}
                className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-[28px] p-6"
              >
                <h3 className="text-3xl font-bold">{value}</h3>
                <p className="text-slate-400 mt-2">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* COURSES */}
      <section className="max-w-7xl mx-auto px-6 py-28">
        <div className="text-center mb-16">
          <span className="text-blue-600 font-semibold uppercase tracking-wider">
            Courses Offered
          </span>

          <h2 className="text-5xl font-bold mt-4">
            Learn In-Demand Finance Skills
          </h2>
        </div>

        <div className="grid lg:grid-cols-4 gap-6">
          {/* Large Card */}
          <div className="lg:col-span-2 lg:row-span-2 rounded-[36px] bg-gradient-to-br from-blue-600 to-indigo-700 text-white p-10">
            <BookOpen size={40} />

            <h3 className="text-3xl font-bold mt-8">
              Professional Accounting Program
            </h3>

            <p className="mt-4 text-blue-100">
              Complete accounting workflow from Journal Entries to Financial
              Statements and Final Accounts.
            </p>

            <div className="grid grid-cols-2 gap-3 mt-8">
              {[
                "Journal Entries",
                "Ledger",
                "Trial Balance",
                "Final Accounts",
                "Balance Sheet",
                "Bank Reconciliation",
              ].map((item) => (
                <div
                  key={item}
                  className="bg-white/10 rounded-xl px-4 py-3"
                >
                  {item}
                </div>
              ))}
            </div>
          </div>

          {/* Tally */}
          <div className="bg-white rounded-[32px] p-8 border border-slate-200 shadow-sm">
            <Calculator className="text-green-600" size={36} />
            <h3 className="font-bold text-2xl mt-5">Tally Prime</h3>
            <p className="mt-3 text-slate-500">
              GST, Inventory, Payroll, Banking & Reports.
            </p>
          </div>

          {/* GST */}
          <div className="bg-white rounded-[32px] p-8 border border-slate-200 shadow-sm">
            <FileText className="text-orange-500" size={36} />
            <h3 className="font-bold text-2xl mt-5">GST Professional</h3>
            <p className="mt-3 text-slate-500">
              Registration, Returns, E-Way Bills & Compliance.
            </p>
          </div>

          {/* Income Tax */}
          <div className="bg-slate-950 text-white rounded-[32px] p-8">
            <Briefcase size={36} />
            <h3 className="font-bold text-2xl mt-5">Income Tax</h3>
            <p className="mt-3 text-slate-400">
              Filing, TDS, Tax Planning & Business Taxation.
            </p>
          </div>

          {/* Payroll */}
          <div className="bg-white rounded-[32px] p-8 border border-slate-200">
            <ShieldCheck className="text-blue-600" size={36} />
            <h3 className="font-bold text-2xl mt-5">Payroll Management</h3>
            <p className="mt-3 text-slate-500">
              PF, ESI, Salary Processing & Compliance.
            </p>
          </div>

          {/* Excel */}
          <div className="bg-gradient-to-br from-emerald-500 to-green-600 text-white rounded-[32px] p-8">
            <BarChart3 size={36} />
            <h3 className="font-bold text-2xl mt-5">Advanced Excel</h3>
            <p className="mt-3 text-green-100">
              Dashboards, Pivot Tables, VLOOKUP & MIS Reporting.
            </p>
          </div>
        </div>
      </section>

      {/* LEARNING JOURNEY */}
      <section className="bg-white py-28">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="text-5xl font-bold text-center mb-20">
            Learning Methodology
          </h2>

          <div className="space-y-10">
            {methodology.map((item, index) => (
              <div key={item} className="flex gap-6">
                <div className="w-14 h-14 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold shrink-0">
                  {index + 1}
                </div>

                <div>
                  <h3 className="text-2xl font-semibold">{item}</h3>
                  <p className="text-slate-500 mt-2">
                    Practical and industry-oriented learning approach.
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHO CAN JOIN */}
      <section className="py-28">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-5xl font-bold text-center mb-16">
            Who Can Join?
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-6">
            {[
              "Students",
              "Graduates",
              "Working Professionals",
              "Entrepreneurs",
              "Job Seekers",
            ].map((item) => (
              <div
                key={item}
                className="bg-white rounded-[28px] p-8 border border-slate-200 text-center hover:-translate-y-2 transition"
              >
                <h3 className="font-semibold text-lg">{item}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PLACEMENT */}
      <section className="mx-6 rounded-[40px] bg-slate-950 text-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-10 py-24">
          <span className="text-blue-400 font-medium">
            Placement Support
          </span>

          <h2 className="text-5xl font-bold mt-4 max-w-3xl">
            We Don't Just Teach.
            <br />
            We Prepare You For Employment.
          </h2>

          <div className="grid md:grid-cols-5 gap-5 mt-14">
            {[
              "Resume Preparation",
              "Mock Interviews",
              "Soft Skills",
              "Job Referrals",
              "Career Counseling",
            ].map((item) => (
              <div
                key={item}
                className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-[24px] p-6"
              >
                {item}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CAREERS */}
      <section className="py-28">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-5xl font-bold text-center mb-14">
            Career Opportunities
          </h2>

          <div className="flex flex-wrap justify-center gap-4">
            {careers.map((career) => (
              <div
                key={career}
                className="px-6 py-3 rounded-full bg-white border border-slate-200 hover:bg-blue-600 hover:text-white transition"
              >
                {career}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* VALUES */}
      <section className="bg-white py-28">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h2 className="text-5xl font-bold">Our Values</h2>

          <div className="grid md:grid-cols-5 gap-6 mt-16">
            {values.map((value) => (
              <div key={value}>
                <div className="h-32 rounded-[32px] bg-gradient-to-br from-blue-50 to-indigo-100 hover:scale-105 transition duration-300" />
                <h3 className="mt-5 text-xl font-semibold">{value}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-28">
        <div className="max-w-5xl mx-auto px-6">
          <div className="rounded-[40px] bg-gradient-to-r from-blue-600 to-indigo-700 text-white text-center p-16">
            <h2 className="text-5xl font-bold">
              Start Your Accounting Career Today
            </h2>

            <p className="mt-5 text-blue-100 text-lg">
              Practical learning, expert guidance, and placement support.
            </p>

            <button className="mt-8 bg-white text-blue-700 px-8 py-4 rounded-2xl font-semibold inline-flex items-center gap-2">
              Enquire Now
              <ArrowRight size={18} />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}

