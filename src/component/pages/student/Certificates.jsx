import React, { useState, useEffect } from "react";
import api from "../../../utils/api";
import { Award, Download } from "lucide-react";

export default function Certificates() {
  const [certificates, setCertificates] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCertificates = async () => {
      try {
        const res = await api.get("/certificates");
        setCertificates(res.data.certificates);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchCertificates();
  }, []);

  if (loading) {
    return <div className="flex items-center justify-center h-64"><div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" /></div>;
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-slate-900">My Certificates</h1>

      {certificates.length === 0 ? (
        <div className="bg-white rounded-2xl p-16 text-center border">
          <Award size={56} className="mx-auto text-slate-300 mb-4" />
          <h2 className="text-xl font-bold text-slate-700">No Certificates Yet</h2>
          <p className="text-slate-500 mt-2">Complete a course to earn your certificate!</p>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 gap-6">
          {certificates.map((cert) => (
            <div key={cert._id} className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm">
              <div className="flex items-start gap-4">
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center shrink-0">
                  <Award size={28} className="text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-slate-900">{cert.courseId?.title}</h3>
                  <p className="text-sm text-slate-500 mt-1">Certificate No: {cert.certificateNumber}</p>
                  <p className="text-sm text-slate-500">Issued: {new Date(cert.issuedDate).toLocaleDateString()}</p>
                </div>
              </div>

              <button className="w-full mt-4 flex items-center justify-center gap-2 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-medium transition text-sm">
                <Download size={16} /> Download Certificate
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
