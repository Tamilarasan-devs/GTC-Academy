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
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-slate-900">Manage Payments ({payments.length})</h1>

      <div className="relative max-w-md">
        <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
        <input type="text" value={search} onChange={e => setSearch(e.target.value)} placeholder="Search by student or payment ID..."
          className="w-full pl-11 pr-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white" />
      </div>

      <div className="bg-white rounded-2xl border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-slate-50 border-b">
                <th className="text-left px-6 py-4 text-sm font-semibold text-slate-600">Student</th>
                <th className="text-left px-6 py-4 text-sm font-semibold text-slate-600">Course</th>
                <th className="text-left px-6 py-4 text-sm font-semibold text-slate-600">Amount</th>
                <th className="text-left px-6 py-4 text-sm font-semibold text-slate-600">Status</th>
                <th className="text-left px-6 py-4 text-sm font-semibold text-slate-600">Date & ID</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((payment) => (
                <tr key={payment._id} className="border-b border-slate-100 hover:bg-slate-50">
                  <td className="px-6 py-4">
                    <p className="font-semibold text-slate-900">{payment.studentId?.name}</p>
                    <p className="text-xs text-slate-500">{payment.studentId?.email}</p>
                  </td>
                  <td className="px-6 py-4 font-medium text-slate-800">{payment.courseId?.title}</td>
                  <td className="px-6 py-4 font-bold text-slate-900">₹{payment.amount?.toLocaleString()}</td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-lg text-xs font-semibold ${
                      payment.status === "paid" ? "bg-green-100 text-green-700" :
                      payment.status === "failed" ? "bg-red-100 text-red-700" :
                      "bg-amber-100 text-amber-700"
                    }`}>
                      {payment.status === "paid" ? <CheckCircle2 size={12} /> : <XCircle size={12} />}
                      {payment.status.toUpperCase()}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-sm text-slate-500">{new Date(payment.createdAt).toLocaleDateString()}</p>
                    <p className="text-xs text-slate-400 font-mono mt-0.5">{payment.razorpayPaymentId || "-"}</p>
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
