import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";
import api from "../../../utils/api";
import { BookOpen, Award, TrendingUp, PlayCircle } from "lucide-react";

export default function StudentDashboard() {
  const { user } = useAuth();
  const [stats, setStats] = useState({ totalCourses: 0, completedCourses: 0, inProgressCourses: 0, enrollments: [] });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const res = await api.get("/student/dashboard");
        setStats(res.data);
      } catch (err) {
        console.error("Failed to fetch dashboard:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchDashboard();
  }, []);

  const statCards = [
    { label: "Enrolled Courses", value: stats.totalCourses, icon: BookOpen, color: "bg-blue-600", shadow: "shadow-blue-200" },
    { label: "In Progress", value: stats.inProgressCourses, icon: TrendingUp, color: "bg-amber-500", shadow: "shadow-amber-200" },
    { label: "Completed", value: stats.completedCourses, icon: Award, color: "bg-green-600", shadow: "shadow-green-200" },
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Welcome */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-2xl p-8 text-white">
        <h1 className="text-3xl font-bold">Welcome back, {user?.name?.split(" ")[0]}! 👋</h1>
        <p className="mt-2 text-blue-100">Continue your learning journey with GTC Education Academy.</p>
      </div>

      {/* Stats */}
      <div className="grid md:grid-cols-3 gap-6">
        {statCards.map((stat) => (
          <div key={stat.label} className={`bg-white rounded-2xl p-6 border border-slate-100 shadow-lg ${stat.shadow}`}>
            <div className={`w-12 h-12 ${stat.color} rounded-xl flex items-center justify-center mb-4`}>
              <stat.icon size={22} className="text-white" />
            </div>
            <h3 className="text-3xl font-bold text-slate-900">{stat.value}</h3>
            <p className="text-slate-500 mt-1">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Recent Courses */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-slate-900">My Courses</h2>
          <Link to="/student/my-courses" className="text-blue-600 hover:text-blue-700 font-medium text-sm">
            View All →
          </Link>
        </div>

        {stats.enrollments.length === 0 ? (
          <div className="bg-white rounded-2xl p-12 text-center border border-slate-100">
            <BookOpen size={48} className="mx-auto text-slate-300 mb-4" />
            <h3 className="text-xl font-semibold text-slate-700">No Courses Yet</h3>
            <p className="text-slate-500 mt-2">Explore our courses and start your learning journey!</p>
            <Link to="/course" className="inline-block mt-6 px-6 py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition">
              Browse Courses
            </Link>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {stats.enrollments.slice(0, 6).map((enrollment) => (
              <div key={enrollment._id} className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm hover:shadow-lg transition-all duration-300">
                <div className="flex items-start justify-between mb-4">
                  <h3 className="font-bold text-slate-900">{enrollment.courseId?.title}</h3>
                  {enrollment.isCompleted && (
                    <span className="px-2 py-1 bg-green-100 text-green-700 text-xs font-semibold rounded-lg">Completed</span>
                  )}
                </div>

                {/* Progress bar */}
                <div className="mb-4">
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-slate-500">Progress</span>
                    <span className="font-semibold text-slate-700">{enrollment.progress?.percentage || 0}%</span>
                  </div>
                  <div className="w-full bg-slate-100 rounded-full h-2">
                    <div
                      className="bg-blue-600 h-2 rounded-full transition-all duration-500"
                      style={{ width: `${enrollment.progress?.percentage || 0}%` }}
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-xs text-slate-400">
                    Expires: {new Date(enrollment.expiryDate).toLocaleDateString()}
                  </span>
                  <Link
                    to={`/student/course/${enrollment.courseId?._id}`}
                    className="flex items-center gap-1 text-blue-600 hover:text-blue-700 font-medium text-sm"
                  >
                    <PlayCircle size={16} /> Continue
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
