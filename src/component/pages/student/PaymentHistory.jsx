import React, { useState, useEffect } from "react";
import api from "../../../utils/api";
import { CreditCard, Download, CheckCircle2, XCircle } from "lucide-react";

export default function PaymentHistory() {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPayments = async () => {
      try {
        const res = await api.get("/payments/history");
        setPayments(res.data.payments);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchPayments();
  }, []);

  if (loading) {
    return <div className="flex items-center justify-center h-64"><div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" /></div>;
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-slate-900">Payment History</h1>

      {payments.length === 0 ? (
        <div className="bg-white rounded-2xl p-16 text-center border">
          <CreditCard size={56} className="mx-auto text-slate-300 mb-4" />
          <h2 className="text-xl font-bold text-slate-700">No Payments Yet</h2>
          <p className="text-slate-500 mt-2">Your payment history will appear here after you purchase a course.</p>
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-slate-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200">
                  <th className="text-left px-6 py-4 text-sm font-semibold text-slate-600">Course</th>
                  <th className="text-left px-6 py-4 text-sm font-semibold text-slate-600">Amount</th>
                  <th className="text-left px-6 py-4 text-sm font-semibold text-slate-600">Date</th>
                  <th className="text-left px-6 py-4 text-sm font-semibold text-slate-600">Status</th>
                  <th className="text-left px-6 py-4 text-sm font-semibold text-slate-600">Payment ID</th>
                </tr>
              </thead>
              <tbody>
                {payments.map((payment) => (
                  <tr key={payment._id} className="border-b border-slate-100 hover:bg-slate-50 transition">
                    <td className="px-6 py-4">
                      <span className="font-medium text-slate-900">{payment.courseId?.title || "N/A"}</span>
                    </td>
                    <td className="px-6 py-4 font-semibold text-slate-900">₹{payment.amount?.toLocaleString()}</td>
                    <td className="px-6 py-4 text-slate-500 text-sm">{new Date(payment.createdAt).toLocaleDateString()}</td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-lg text-xs font-semibold ${
                        payment.status === "paid" ? "bg-green-100 text-green-700" :
                        payment.status === "failed" ? "bg-red-100 text-red-700" :
                        "bg-amber-100 text-amber-700"
                      }`}>
                        {payment.status === "paid" ? <CheckCircle2 size={12} /> : <XCircle size={12} />}
                        {payment.status.charAt(0).toUpperCase() + payment.status.slice(1)}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-slate-400 text-xs font-mono">{payment.razorpayPaymentId || "-"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
