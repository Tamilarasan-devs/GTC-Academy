import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import api from "../../../utils/api";
import { BookOpen, PlayCircle, Clock } from "lucide-react";

export default function MyCourses() {
  const [enrollments, setEnrollments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await api.get("/student/my-courses");
        setEnrollments(res.data.enrollments);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchCourses();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (enrollments.length === 0) {
    return (
      <div className="bg-white rounded-2xl p-16 text-center border">
        <BookOpen size={56} className="mx-auto text-slate-300 mb-4" />
        <h2 className="text-2xl font-bold text-slate-700">No Courses Purchased Yet</h2>
        <p className="text-slate-500 mt-2">Start learning today!</p>
        <Link to="/course" className="inline-block mt-6 px-8 py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition">
          Explore Courses
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-slate-900">My Courses ({enrollments.length})</h1>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {enrollments.map((enrollment) => {
          const course = enrollment.courseId;
          const expired = new Date() > new Date(enrollment.expiryDate);

          return (
            <div key={enrollment._id} className={`bg-white rounded-2xl border overflow-hidden shadow-sm hover:shadow-lg transition ${expired ? "opacity-60" : ""}`}>
              <div className="h-40 bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center">
                <BookOpen size={48} className="text-white/50" />
              </div>

              <div className="p-6">
                <h3 className="font-bold text-lg text-slate-900 mb-2">{course?.title}</h3>

                <div className="mb-4">
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-slate-500">Progress</span>
                    <span className="font-semibold">{enrollment.progress?.percentage || 0}%</span>
                  </div>
                  <div className="w-full bg-slate-100 rounded-full h-2.5">
                    <div className="bg-blue-600 h-2.5 rounded-full transition-all" style={{ width: `${enrollment.progress?.percentage || 0}%` }} />
                  </div>
                </div>

                <div className="flex items-center gap-2 text-sm text-slate-500 mb-4">
                  <Clock size={14} />
                  {expired ? (
                    <span className="text-red-500 font-semibold">Expired</span>
                  ) : (
                    <span>Expires: {new Date(enrollment.expiryDate).toLocaleDateString()}</span>
                  )}
                </div>

                {enrollment.isCompleted ? (
                  <span className="inline-block px-4 py-2 bg-green-100 text-green-700 rounded-xl text-sm font-semibold">✓ Completed</span>
                ) : !expired ? (
                  <Link
                    to={`/student/course/${course?._id}`}
                    className="w-full flex items-center justify-center gap-2 py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition"
                  >
                    <PlayCircle size={18} /> Continue Learning
                  </Link>
                ) : (
                  <span className="inline-block px-4 py-2 bg-red-100 text-red-600 rounded-xl text-sm font-semibold">Access Expired</span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
