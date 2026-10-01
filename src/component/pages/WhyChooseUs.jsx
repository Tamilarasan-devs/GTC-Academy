import React from "react";
import { Link } from "react-router-dom";
import { IndianRupee, Users, Flag, Network, ArrowRight, CheckCircle, Star, Trophy, Target, ShieldCheck, ArrowUpRight, PlayCircle } from "lucide-react";

export default function WhyChooseUs() {
  return (
    <div className="bg-[#fafafc] min-h-screen font-sans selection:bg-[#e56301] selection:text-white">
      
      {/* 1. ULTRA-MODERN HERO SECTION */}
      <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-32 overflow-hidden bg-[#071344]">
        {/* Background Gradients */}
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-gradient-to-br from-[#162a80] to-[#e56301]/20 blur-[150px] rounded-full translate-x-1/3 -translate-y-1/4 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-gradient-to-tr from-[#0b1e69] to-[#071344] blur-[100px] rounded-full -translate-x-1/2 translate-y-1/2 pointer-events-none" />

        <div className="max-w-7xl mx-auto px-6 relative z-10 flex flex-col lg:flex-row items-center gap-16">
          {/* Left: Text Content */}
          <div className="flex-1 text-left">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold tracking-widest uppercase mb-8 bg-white/10 text-white border border-white/20 shadow-xl backdrop-blur-sm">
              <Star size={14} className="text-[#ffb076]" /> Beyond Traditional Education
            </div>
            
            <h1 className="text-5xl lg:text-7xl font-black text-white mb-8 leading-[1.1] tracking-tight">
              We Don't Just Teach.<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#e56301] to-[#ffb076]">We Transform.</span>
            </h1>
            
            <p className="text-lg text-slate-300 max-w-xl leading-relaxed mb-10 font-light border-l-2 border-[#e56301] pl-6">
              Step into an ecosystem where academic knowledge seamlessly merges with corporate reality. Our mission is to engineer industry-ready professionals.
            </p>

            <div className="flex flex-wrap items-center gap-6">
              <Link to="/register" className="flex items-center gap-2 px-8 py-4 bg-[#e56301] text-white rounded-full font-bold text-lg hover:bg-white hover:text-[#e56301] transition-all duration-300 shadow-[0_0_40px_rgba(229,99,1,0.4)] group">
                Join the Academy
                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <button className="flex items-center gap-3 px-6 py-4 text-white font-semibold hover:text-[#ffb076] transition-colors group">
                <PlayCircle size={28} className="text-[#e56301] group-hover:scale-110 transition-transform" />
                Watch Our Story
              </button>
            </div>
          </div>

          {/* Right: Floating Stats Composition */}
          <div className="flex-1 w-full relative h-[400px] lg:h-[500px]">
            {/* Stat Card 1 */}
            <div className="absolute top-10 right-10 lg:right-0 bg-white/10 backdrop-blur-md border border-white/20 p-6 rounded-3xl w-64 shadow-2xl animate-[float_6s_ease-in-out_infinite]">
              <Trophy size={32} className="text-[#ffb076] mb-4" />
              <h3 className="text-4xl font-black text-white mb-1">10+</h3>
              <p className="text-slate-300 text-sm uppercase tracking-widest font-bold">Years of Legacy</p>
            </div>
            
            {/* Stat Card 2 */}
            <div className="absolute bottom-10 left-10 lg:left-0 bg-gradient-to-br from-[#e56301] to-[#c75400] p-6 rounded-3xl w-64 shadow-[0_20px_50px_rgba(229,99,1,0.5)] animate-[float_8s_ease-in-out_infinite_reverse]">
              <Target size={32} className="text-white mb-4" />
              <h3 className="text-4xl font-black text-white mb-1">100%</h3>
              <p className="text-orange-100 text-sm uppercase tracking-widest font-bold">Practical Approach</p>
            </div>

            {/* Stat Card 3 */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white text-[#071344] p-6 rounded-3xl w-72 shadow-2xl z-20">
              <ShieldCheck size={32} className="text-[#0b1e69] mb-4" />
              <h3 className="text-4xl font-black text-[#0b1e69] mb-1">500+</h3>
              <p className="text-slate-500 text-sm uppercase tracking-widest font-bold">Successful Careers</p>
              <div className="mt-4 pt-4 border-t border-slate-100 flex -space-x-3">
                {[1,2,3,4].map(i => (
                  <div key={i} className="w-10 h-10 rounded-full border-2 border-white bg-slate-200" />
                ))}
                <div className="w-10 h-10 rounded-full border-2 border-white bg-slate-100 flex items-center justify-center text-xs font-bold text-slate-500">+</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. BENTO BOX HIGHLIGHTS GRID */}
      <section className="max-w-7xl mx-auto px-6 py-32">
        <div className="mb-16 flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div className="max-w-2xl">
            <span className="text-[#e56301] font-bold tracking-widest uppercase text-sm mb-4 block">The GTC Advantage</span>
            <h2 className="text-4xl md:text-5xl font-black text-[#071344] tracking-tight">An ecosystem built for your absolute success.</h2>
          </div>
          <p className="text-slate-500 max-w-sm text-lg border-l-2 border-slate-200 pl-4">
            We don't do generic. Every aspect of our academy is engineered to give you a massive edge in the corporate world.
          </p>
        </div>

        {/* CSS Grid Bento Box */}
        <div className="grid grid-cols-1 md:grid-cols-3 md:grid-rows-2 gap-6 auto-rows-[250px]">
          
          {/* Card 1: Wide */}
          <div className="md:col-span-2 bg-[#0b1e69] rounded-[2rem] p-10 relative overflow-hidden group hover:shadow-2xl transition-all duration-500">
            <div className="absolute right-0 bottom-0 w-64 h-64 bg-white/5 rounded-full blur-[40px] group-hover:scale-150 transition-transform duration-700" />
            <div className="relative z-10 h-full flex flex-col justify-between">
              <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center backdrop-blur-sm">
                <Network size={32} className="text-white" />
              </div>
              <div>
                <h3 className="text-3xl font-black text-white mb-3">Industry-Integrated Network</h3>
                <p className="text-slate-300 max-w-md text-lg">Unrivaled corporate tie-ups ensuring you learn exactly what the market demands right now.</p>
              </div>
            </div>
          </div>

          {/* Card 2: Tall */}
          <div className="md:row-span-2 bg-white rounded-[2rem] p-10 border border-slate-100 shadow-lg relative group hover:shadow-[0_20px_50px_rgba(229,99,1,0.15)] transition-all duration-500 overflow-hidden flex flex-col">
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-orange-50/50" />
            <div className="relative z-10 flex-1 flex flex-col">
              <div className="flex justify-between items-start mb-12">
                <div className="w-16 h-16 bg-orange-100 rounded-2xl flex items-center justify-center text-[#e56301]">
                  <Users size={32} />
                </div>
                <ArrowUpRight size={28} className="text-slate-300 group-hover:text-[#e56301] transition-colors" />
              </div>
              <h3 className="text-3xl font-black text-[#071344] mb-4 mt-auto">Elite Mentorship</h3>
              <p className="text-slate-500 text-lg mb-8">Guided by veterans with over a decade of real corporate battlefield experience.</p>
              
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 mt-auto">
                <div className="flex items-center gap-3">
                  <CheckCircle size={20} className="text-[#e56301]" />
                  <span className="font-bold text-slate-700">1-on-1 Guidance</span>
                </div>
              </div>
            </div>
          </div>

          {/* Card 3: Standard */}
          <div className="bg-[#e56301] rounded-[2rem] p-10 relative overflow-hidden group hover:shadow-2xl transition-all duration-500">
            <div className="absolute -right-10 -top-10 text-white/10 rotate-12 group-hover:rotate-0 transition-transform duration-700">
              <IndianRupee size={200} />
            </div>
            <div className="relative z-10 h-full flex flex-col justify-between">
              <h3 className="text-2xl font-black text-white mb-2">Unbeatable Value</h3>
              <p className="text-orange-100 font-medium text-lg">Premium education scaled for every ambitious Indian student.</p>
            </div>
          </div>

          {/* Card 4: Standard */}
          <div className="bg-[#071344] rounded-[2rem] p-10 relative overflow-hidden group hover:shadow-2xl transition-all duration-500">
            <div className="absolute left-0 bottom-0 w-full h-full bg-gradient-to-tr from-[#162a80] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="relative z-10 h-full flex flex-col justify-between">
              <Flag size={32} className="text-[#ffb076] mb-4" />
              <div>
                <h3 className="text-2xl font-black text-white mb-2">100% India Centric</h3>
                <p className="text-slate-300 text-base">GST, Tally, and regional compliances mastered perfectly.</p>
              </div>
            </div>
          </div>

        </div>
      </section>



      {/* 4. MASSIVE FLOATING CTA */}
      <section className="py-32 relative bg-[#fafafc]">
        <div className="max-w-5xl mx-auto px-6 relative z-10">
          <div className="bg-[#071344] rounded-[3rem] p-12 md:p-20 text-center relative overflow-hidden shadow-2xl border border-blue-900/50">
            {/* BG Patterns */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-20 pointer-events-none">
              <div className="absolute -top-24 -left-24 w-96 h-96 border-[40px] border-white/10 rounded-full" />
              <div className="absolute -bottom-24 -right-24 w-96 h-96 border-[40px] border-[#e56301]/20 rounded-full" />
            </div>

            <div className="relative z-10">
              <h2 className="text-5xl md:text-6xl font-black text-white mb-8 tracking-tight">Your Career,<br />Accelerated.</h2>
              <p className="text-slate-300 text-xl md:text-2xl mb-12 max-w-2xl mx-auto font-light">
                Stop waiting for opportunities. Create them. Master GST, Tally Prime, and SAP with us.
              </p>
              
              <Link
                to="/register"
                className="inline-flex items-center justify-center gap-3 px-12 py-6 bg-white text-[#071344] rounded-full font-black text-xl hover:bg-[#e56301] hover:text-white transition-all duration-300 shadow-2xl hover:shadow-orange-500/50 hover:-translate-y-2 group"
              >
                Start Learning Now
                <ArrowRight size={24} className="group-hover:translate-x-2 transition-transform" />
              </Link>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
