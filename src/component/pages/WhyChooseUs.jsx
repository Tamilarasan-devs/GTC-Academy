import React from "react";
import { Link } from "react-router-dom";
import { IndianRupee, Users, Flag, Network, ArrowRight, CheckCircle2, Star } from "lucide-react";

export default function WhyChooseUs() {
  const highlights = [
    {
      id: 1,
      title: "Affordable Pricing",
      desc: "High-quality skill education that doesn’t break the bank. Made for every Indian student.",
      icon: IndianRupee,
      badge: "Value First",
      color: "bg-orange-50 text-[#e56301]",
    },
    {
      id: 2,
      title: "Top Mentors",
      desc: "Learn from industry experts across India who have been where you want to be.",
      icon: Users,
      badge: "10+ Yrs Exp",
      color: "bg-blue-50 text-[#0b1e69]",
    },
    {
      id: 3,
      title: "100% India Centric",
      desc: "Curriculum designed specifically for the Indian market and academic ecosystem.",
      icon: Flag,
      badge: "National Standard",
      color: "bg-orange-50 text-[#e56301]",
    },
    {
      id: 4,
      title: "Integrated Network",
      desc: "Strong connection with top-tier universities and companies for better opportunities.",
      icon: Network,
      badge: "Industry Connected",
      color: "bg-blue-50 text-[#0b1e69]",
    },
  ];

  return (
    <div className="bg-[#fff8f3]/30 min-h-screen font-sans">
      {/* Hero Banner */}
      <section className="bg-[#071344] text-white pt-28 pb-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-[#0b1e69] to-[#071344]" />
        <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold tracking-widest uppercase mb-6 bg-white/10 text-[#ffb076] border border-white/15">
            <Star size={13} className="text-[#e56301]" /> Why GTC Education Academy
          </span>
          <h1 className="text-4xl md:text-5xl font-extrabold mb-6 leading-tight">
            Empowering Every Student With <br />
            <span className="text-[#e56301]">Practical Skills</span>
          </h1>
          <p className="text-lg md:text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed">
            We are built with a single mission: to deliver industry-ready training, top-tier mentorship, and real career growth for students across India.
          </p>
        </div>
      </section>

      {/* Highlights Grid */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="text-center mb-16">
          <span className="text-[#e56301] font-bold tracking-widest uppercase text-xs mb-3 block">Our Core Pillars</span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-[#0b1e69]">What Sets Us Apart</h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {highlights.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.id}
                className="bg-white rounded-3xl p-8 border border-slate-100 shadow-md hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div className={`w-14 h-14 rounded-2xl ${item.color} flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform`}>
                      <Icon size={28} />
                    </div>
                    <span className="text-[11px] font-extrabold uppercase tracking-wider px-3 py-1 bg-slate-100 text-slate-700 rounded-full">
                      {item.badge}
                    </span>
                  </div>

                  <h3 className="text-xl font-black text-[#0b1e69] mb-3 group-hover:text-[#e56301] transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-slate-600 text-sm leading-relaxed mb-6">
                    {item.desc}
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-100 flex items-center text-xs font-bold text-[#0b1e69]">
                  <CheckCircle2 size={15} className="text-[#e56301] mr-1.5" /> Proven Career Impact
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* CTA Band */}
      <section className="bg-[#0b1e69] text-white py-16">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-black mb-4">Start Your Skill Journey Today</h2>
          <p className="text-slate-300 text-base md:text-lg mb-8 max-w-xl mx-auto">
            Join 50+ students gaining real-world skills with GST, Tally Prime, Income Tax, and SAP training.
          </p>
          <Link
            to="/register"
            className="inline-flex items-center gap-2 px-8 py-4 bg-[#e56301] hover:bg-[#c75400] text-white rounded-xl font-bold text-lg shadow-lg shadow-orange-500/20 transition-all hover:-translate-y-0.5"
          >
            Get Started Now <ArrowRight size={20} />
          </Link>
        </div>
      </section>
    </div>
  );
}
