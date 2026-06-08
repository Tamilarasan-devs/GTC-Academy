import React from "react";
import {
  Building2,
  GraduationCap,
  Target,
  Eye,
  Award,
  Briefcase,
  Users,
  TrendingUp,
  CheckCircle2,
} from "lucide-react";

export default function About() {
  const features = [
    {
      title: "Industry-Oriented Training",
      description:
        "Curriculum designed based on current industry requirements and employer expectations.",
    },
    {
      title: "Practical Learning",
      description:
        "Work on real-time accounting records, GST filings, payroll systems, and business transactions.",
    },
    {
      title: "Experienced Trainers",
      description:
        "Training delivered by accounting professionals with extensive industry experience.",
    },
    {
      title: "Placement Assistance",
      description:
        "Support in finding employment opportunities across accounting, finance, taxation, and administration.",
    },
    {
      title: "Updated Curriculum",
      description:
        "Courses updated regularly according to GST regulations, taxation laws, and accounting standards.",
    },
    {
      title: "Career Development",
      description:
        "Resume building, interview preparation, communication skills, and professional guidance.",
    },
  ];

  const missions = [
    "Deliver practical accounting education",
    "Create industry-ready professionals",
    "Provide affordable and quality training",
    "Bridge the gap between theory and practice",
    "Support career growth through placement assistance",
    "Build confidence through hands-on learning",
  ];

  return (
    <div className="bg-slate-50 overflow-hidden">
      {/* HERO */}
      <section className="relative bg-slate-950 text-white">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 via-indigo-600/20 to-cyan-500/20" />

        <div className="relative max-w-7xl mx-auto px-6 py-28">
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 backdrop-blur-xl">
            <GraduationCap size={18} />
            About GTC Education Academy
          </span>

          <h1 className="mt-8 text-5xl md:text-7xl font-bold leading-tight">
            Learn.
            <span className="text-blue-400"> Practice.</span>
            <br />
            Grow. Succeed.
          </h1>

          <p className="mt-8 text-xl text-slate-300 max-w-3xl">
            Transforming students, graduates, and professionals into skilled
            accounting and finance experts through practical, industry-focused
            training.
          </p>
        </div>
      </section>

      {/* GTC SOLUTIONS */}
      <section className="py-28">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <span className="text-blue-600 font-semibold uppercase tracking-wider">
                Parent Organization
              </span>

              <h2 className="text-5xl font-bold mt-4 mb-8">
                About GTC Solutions
              </h2>

              <p className="text-slate-600 leading-relaxed text-lg">
                GTC Solutions is a professional accounting and business
                consulting organization based in Coimbatore, Tamil Nadu. The
                company specializes in accounting, taxation, GST compliance,
                payroll management, bookkeeping, and financial advisory
                services.
              </p>

              <p className="text-slate-600 leading-relaxed text-lg mt-6">
                Serving businesses, startups, entrepreneurs, and professionals,
                GTC Solutions focuses on delivering practical and reliable
                financial solutions that support business growth and compliance.
              </p>
            </div>

            <div className="bg-white rounded-[40px] p-10 shadow-xl border border-slate-100">
              <Building2 size={50} className="text-blue-600" />

              <h3 className="text-3xl font-bold mt-6">
                Professional Accounting & Consulting
              </h3>

              <p className="text-slate-500 mt-4">
                Based in Kurumbapalayam, Coimbatore, serving businesses with
                accounting, taxation, compliance, payroll, and advisory
                services.
              </p>

              <div className="grid grid-cols-2 gap-4 mt-8">
                <div className="bg-slate-50 rounded-2xl p-4">
                  <h4 className="font-bold text-2xl">100%</h4>
                  <p className="text-slate-500 text-sm">
                    Practical Approach
                  </p>
                </div>

                <div className="bg-slate-50 rounded-2xl p-4">
                  <h4 className="font-bold text-2xl">Industry</h4>
                  <p className="text-slate-500 text-sm">Focused Services</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ACADEMY SECTION */}
      <section className="bg-white py-28">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <span className="text-blue-600 font-semibold uppercase tracking-wider">
            GTC Education Academy
          </span>

          <h2 className="text-5xl font-bold mt-4">
            Bridging the Gap Between
            <br />
            Education and Industry
          </h2>

          <p className="mt-8 text-lg text-slate-600 max-w-4xl mx-auto leading-relaxed">
            Established as the training and skill-development division of GTC
            Solutions, the academy focuses on transforming students into
            industry-ready accounting professionals through hands-on practical
            learning, real business projects, GST compliance training, taxation
            procedures, payroll management, and modern accounting software.
          </p>
        </div>
      </section>

      {/* VISION & MISSION */}
      <section className="py-28">
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-8">
          <div className="bg-gradient-to-br from-blue-600 to-indigo-700 text-white rounded-[40px] p-10">
            <Eye size={42} />

            <h3 className="text-3xl font-bold mt-6">Our Vision</h3>

            <p className="mt-6 text-blue-100 text-lg leading-relaxed">
              To become the most trusted accounting and finance training academy
              in South India by developing skilled professionals who contribute
              effectively to businesses, industries, and the economy.
            </p>
          </div>

          <div className="bg-slate-950 text-white rounded-[40px] p-10">
            <Target size={42} />

            <h3 className="text-3xl font-bold mt-6">Our Mission</h3>

            <div className="space-y-4 mt-8">
              {missions.map((item) => (
                <div key={item} className="flex gap-3">
                  <CheckCircle2
                    size={20}
                    className="text-green-400 mt-1"
                  />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* WHY CHOOSE US */}
      <section className="bg-white py-28">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <span className="text-blue-600 font-semibold uppercase tracking-wider">
              Why Choose Us
            </span>

            <h2 className="text-5xl font-bold mt-4">
              Why Students Choose GTC
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="group bg-slate-50 hover:bg-white border border-slate-200 rounded-[32px] p-8 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
              >
                <Award
                  className="text-blue-600 mb-5 group-hover:scale-110 transition"
                  size={34}
                />

                <h3 className="text-xl font-bold mb-4">
                  {feature.title}
                </h3>

                <p className="text-slate-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* VALUES */}
      <section className="py-28">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <span className="text-blue-600 font-semibold uppercase tracking-wider">
            Our Strength
          </span>

          <h2 className="text-5xl font-bold mt-4">
            Built on Professional Values
          </h2>

          <div className="grid md:grid-cols-4 gap-6 mt-16">
            {[
              {
                icon: <Briefcase size={28} />,
                title: "Professionalism",
              },
              {
                icon: <Users size={28} />,
                title: "Student Success",
              },
              {
                icon: <TrendingUp size={28} />,
                title: "Continuous Growth",
              },
              {
                icon: <Award size={28} />,
                title: "Excellence",
              },
            ].map((item, index) => (
              <div
                key={index}
                className="bg-white rounded-[32px] p-8 shadow-lg border border-slate-100"
              >
                <div className="text-blue-600 mb-5">{item.icon}</div>

                <h3 className="font-bold text-xl">{item.title}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="pb-24">
        <div className="max-w-5xl mx-auto px-6">
          <div className="rounded-[40px] bg-gradient-to-r from-blue-600 to-indigo-700 text-white p-16 text-center">
            <h2 className="text-5xl font-bold">
              Start Your Professional Journey
            </h2>

            <p className="mt-6 text-blue-100 text-lg">
              Gain practical accounting skills, industry knowledge, and career
              support to become a successful finance professional.
            </p>

            <button className="mt-8 px-8 py-4 bg-white text-blue-700 font-semibold rounded-2xl hover:scale-105 transition">
              Enquire Now
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}