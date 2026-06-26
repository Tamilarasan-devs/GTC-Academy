import React from "react";
import { Routes, Route } from "react-router-dom";
import Header from "../layout/Header";
import Footer from "../layout/Footer";
import Home from "../pages/Home";
import About from "../pages/About";
import Course from "../pages/Course";
import Contact from "../pages/Contact";
import FAQ from "../pages/FAQ";
import PrivacyPolicy from "../pages/Privacy";
import TermsConditions from "../pages/TermsConditions";
import RefundPolicy from "../pages/RefundPolicy";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import { ProtectedRoute, AdminRoute } from "../common/ProtectedRoute";

// Student
import StudentLayout from "../pages/student/StudentLayout";
import StudentDashboard from "../pages/student/StudentDashboard";
import MyCourses from "../pages/student/MyCourses";
import CoursePlayer from "../pages/student/CoursePlayer";
import StudentProfile from "../pages/student/StudentProfile";
import PaymentHistory from "../pages/student/PaymentHistory";
import Certificates from "../pages/student/Certificates";

// Admin
import AdminLayout from "../pages/admin/AdminLayout";
import AdminDashboard from "../pages/admin/AdminDashboard";
import ManageCourses from "../pages/admin/ManageCourses";
import ManageChapters from "../pages/admin/ManageChapters";
import ManageStudents from "../pages/admin/ManageStudents";
import ManageEnrollments from "../pages/admin/ManageEnrollments";
import ManagePayments from "../pages/admin/ManagePayments";
import ManageCertificates from "../pages/admin/ManageCertificates";
import ManageTestimonials from "../pages/admin/ManageTestimonials";
import ManageFaculty from "../pages/admin/ManageFaculty";

function PublicLayout({ children }) {
  return (
    <>
      <Header />
      <main className="min-h-screen pt-[100px]">{children}</main>
      <Footer />
    </>
  );
}

export default function AppRoutes() {
  return (
    <Routes>
      {/* Public Pages */}
      <Route path="/" element={<PublicLayout><Home /></PublicLayout>} />
      <Route path="/about" element={<PublicLayout><About /></PublicLayout>} />
      <Route path="/course" element={<PublicLayout><Course /></PublicLayout>} />
      <Route path="/contact" element={<PublicLayout><Contact /></PublicLayout>} />
      <Route path="/faq" element={<PublicLayout><FAQ /></PublicLayout>} />
      <Route path="/privacy" element={<PublicLayout><PrivacyPolicy /></PublicLayout>} />
      <Route path="/terms" element={<PublicLayout><TermsConditions /></PublicLayout>} />
      <Route path="/refund" element={<PublicLayout><RefundPolicy /></PublicLayout>} />

      {/* Auth */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* Student Protected Routes */}
      <Route path="/student" element={<ProtectedRoute><StudentLayout /></ProtectedRoute>}>
        <Route path="dashboard" element={<StudentDashboard />} />
        <Route path="my-courses" element={<MyCourses />} />
        <Route path="course/:courseId" element={<CoursePlayer />} />
        <Route path="profile" element={<StudentProfile />} />
        <Route path="payments" element={<PaymentHistory />} />
        <Route path="certificates" element={<Certificates />} />
      </Route>

      {/* Admin Protected Routes */}
      <Route path="/admin" element={<AdminRoute><AdminLayout /></AdminRoute>}>
        <Route path="dashboard" element={<AdminDashboard />} />
        <Route path="courses" element={<ManageCourses />} />
        <Route path="courses/:courseId/chapters" element={<ManageChapters />} />
        <Route path="students" element={<ManageStudents />} />
        <Route path="enrollments" element={<ManageEnrollments />} />
        <Route path="payments" element={<ManagePayments />} />
        <Route path="certificates" element={<ManageCertificates />} />
        <Route path="testimonials" element={<ManageTestimonials />} />
        <Route path="faculty" element={<ManageFaculty />} />
      </Route>
    </Routes>
  );
}
