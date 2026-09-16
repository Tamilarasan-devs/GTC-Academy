import React, { useState, useEffect } from "react";
import api from "../../../utils/api";
import { CheckCircle2, XCircle, Search } from "lucide-react";

export default function ManagePayments() {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  const fetchPayments = async () => {
    try {
      const res = await api.get("/admin/payments");
      setPayments(res.data.payments);
    } catch (err) { console.error(err); }
    finally { setLoading(false); }
  };

  useEffect(() => { fetchPayments(); }, []);

  const filtered = payments.filter(p =>
    p.studentId?.name?.toLowerCase().includes(search.toLowerCase()) ||
    p.razorpayPaymentId?.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) return <div className="flex items-center justify-center h-64"><div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" /></div>;

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-slate-100 shadow-[0_4px_20px_rgba(0,0,0,0.02)]">
        <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Manage Payments <span className="text-slate-400 text-lg font-medium">({payments.length})</span></h1>

        <div className="relative w-full md:max-w-md">
          <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
          <input type="text" value={search} onChange={e => setSearch(e.target.value)} placeholder="Search by student or payment ID..."
            className="w-full pl-11 pr-4 py-3 border border-slate-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#e56301] bg-slate-50 focus:bg-white transition shadow-inner" />
        </div>
      </div>

      <div className="bg-white rounded-3xl border border-slate-100 shadow-[0_4px_20px_rgba(0,0,0,0.02)] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50/80 border-b border-slate-100">
                <th className="px-6 py-5 text-xs font-bold text-slate-500 uppercase tracking-wider">Student</th>
                <th className="px-6 py-5 text-xs font-bold text-slate-500 uppercase tracking-wider">Course</th>
                <th className="px-6 py-5 text-xs font-bold text-slate-500 uppercase tracking-wider">Amount</th>
                <th className="px-6 py-5 text-xs font-bold text-slate-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-5 text-xs font-bold text-slate-500 uppercase tracking-wider text-right">Date & ID</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.map((payment) => (
                <tr key={payment._id} className="hover:bg-slate-50/50 transition-colors">
                  <td className="px-6 py-5">
                    <p className="font-bold text-slate-900">{payment.studentId?.name}</p>
                    <p className="text-xs font-medium text-slate-500 mt-0.5">{payment.studentId?.email}</p>
                  </td>
                  <td className="px-6 py-5 font-bold text-slate-800">{payment.courseId?.title}</td>
                  <td className="px-6 py-5 font-black text-[#0b1e69]">₹{payment.amount?.toLocaleString()}</td>
                  <td className="px-6 py-5">
                    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold ${
                      payment.status === "paid" ? "bg-green-50 text-green-700" :
                      payment.status === "failed" ? "bg-red-50 text-red-700" :
                      "bg-amber-50 text-amber-700"
                    }`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${
                        payment.status === "paid" ? "bg-green-500" :
                        payment.status === "failed" ? "bg-red-500" :
                        "bg-amber-500"
                      }`}></span>
                      {payment.status.toUpperCase()}
                    </span>
                  </td>
                  <td className="px-6 py-5 text-right">
                    <p className="text-sm font-medium text-slate-600">{new Date(payment.createdAt).toLocaleDateString()}</p>
                    <p className="text-[10px] text-slate-400 font-mono mt-1 bg-slate-50 inline-block px-1.5 py-0.5 rounded uppercase tracking-wider border border-slate-100">{payment.razorpayPaymentId || "-"}</p>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
