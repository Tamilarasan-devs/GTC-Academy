import React from "react";
import {
  ArrowRight,
  GraduationCap,
  BookOpen,
  Users,
  TrendingUp,
  CheckCircle2,
} from "lucide-react";

export default function Home() {
  return (
    <div className="bg-slate-50 overflow-hidden">
      {/* HERO SECTION */}
      <section className="relative bg-slate-950 text-white">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 via-indigo-600/20 to-cyan-500/20" />

        <div className="relative max-w-7xl mx-auto px-6 py-28">
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 backdrop-blur-xl text-sm">
            <GraduationCap size={18} />
            GTC Education Academy
          </span>

          <h1 className="mt-8 text-5xl md:text-7xl font-bold leading-tight">
            Learn Accounting &
            <span className="text-blue-400 block">
              Build Your Career
            </span>
          </h1>

          <p className="mt-8 text-lg md:text-xl text-slate-300 max-w-3xl">
            Practical training in Accounting, GST, Tally Prime, Income Tax,
            Payroll & Advanced Excel with real-time business experience.
          </p>

          <div className="flex flex-wrap gap-4 mt-10">
            <a
              href="/course"
              className="px-8 py-4 bg-blue-600 hover:bg-blue-700 rounded-2xl font-semibold flex items-center gap-2 transition"
            >
              Explore Courses <ArrowRight size={18} />
            </a>

            <a
              href="/contact"
              className="px-8 py-4 border border-white/20 rounded-2xl backdrop-blur-xl hover:bg-white/10 transition"
            >
              Contact Us
            </a>
          </div>

          {/* STATS */}
          <div className="grid md:grid-cols-4 gap-6 mt-20">
            {[
              ["6+", "Professional Courses"],
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

      {/* ABOUT SHORT SECTION */}
      <section className="py-28">
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <span className="text-blue-600 font-semibold uppercase tracking-wider">
              About Us
            </span>

            <h2 className="text-5xl font-bold mt-4">
              Bridging Education & Industry
            </h2>

            <p className="text-slate-600 mt-6 text-lg leading-relaxed">
              GTC Education Academy is the training division of GTC Solutions
              focused on transforming students into industry-ready accounting
              professionals through practical learning and real business
              exposure.
            </p>

            <div className="mt-8 space-y-4">
              {[
                "Real-time Accounting Training",
                "GST & Taxation Practical Knowledge",
                "Job-Oriented Curriculum",
                "Placement Assistance",
              ].map((item) => (
                <div key={item} className="flex gap-3">
                  <CheckCircle2 className="text-green-500" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-gradient-to-br from-blue-600 to-indigo-700 text-white rounded-[40px] p-10">
            <BookOpen size={42} />

            <h3 className="text-3xl font-bold mt-6">
              Industry-Focused Learning
            </h3>

            <p className="mt-4 text-blue-100">
              Learn with real business cases, accounting software, GST filings,
              payroll systems, and financial reporting.
            </p>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="bg-white py-28">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <span className="text-blue-600 font-semibold uppercase tracking-wider">
            Why Choose Us
          </span>

          <h2 className="text-5xl font-bold mt-4">
            Build Skills That Matter
          </h2>

          <div className="grid md:grid-cols-3 gap-8 mt-16">
            {[
              {
                icon: <BookOpen size={32} />,
                title: "Practical Training",
                desc: "Hands-on accounting and GST practice.",
              },
              {
                icon: <Users size={32} />,
                title: "Expert Trainers",
                desc: "Learn from industry professionals.",
              },
              {
                icon: <TrendingUp size={32} />,
                title: "Career Growth",
                desc: "Job-ready skills for real opportunities.",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="bg-slate-50 rounded-[32px] p-10 border hover:-translate-y-2 transition"
              >
                <div className="text-blue-600 mb-6 flex justify-center">
                  {item.icon}
                </div>

                <h3 className="text-xl font-bold mb-3">
                  {item.title}
                </h3>

                <p className="text-slate-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="py-28">
        <div className="max-w-5xl mx-auto px-6">
          <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white rounded-[40px] p-16 text-center">
            <h2 className="text-5xl font-bold">
              Start Your Accounting Career Today
            </h2>

            <p className="mt-6 text-blue-100 text-lg">
              Join GTC Education Academy and become industry-ready with
              practical training.
            </p>

            <div className="mt-10 flex flex-wrap justify-center gap-4">
              <a
                href="/course"
                className="px-8 py-4 bg-white text-blue-700 rounded-2xl font-semibold"
              >
                Explore Courses
              </a>

              <a
                href="/contact"
                className="px-8 py-4 border border-white/30 rounded-2xl"
              >
                Contact Now
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}