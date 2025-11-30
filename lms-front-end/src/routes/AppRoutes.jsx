// src/routes/AppRoutes.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Trang chung
import HomePage from "../pages/HomePage";

// Login
import LoginLMS from "../pages/login/LoginLMS";
import LoginAdmin from "../pages/login/LoginAdmin";

// Admin & Tutor
import AdminPage from "../pages/admin/AdminPage";
import TutorPage from "../pages/tutor/TutorPage";

// Mentee – core
import Dashboard from "../pages/mentee/Dashboard";
import CoursePage from "../pages/mentee/CoursePage";
import CourseDetailPage from "../pages/mentee/CourseDetailPage";
import CourseSessionPage from "../pages/mentee/CourseSessionPage";
import SessionForumPage from "../pages/mentee/SessionForumPage";
import SessionForumDetailPage from "../pages/mentee/SessionForumDetailPage";
import MessagesPage from "../pages/mentee/MessagesPage";
import NotificationPage from "../pages/mentee/NotificationPage";
import FeedbackPage from "../pages/mentee/FeedbackPage";

// Mentee – Quiz
import QuizOverviewPage from "../pages/mentee/QuizOverviewPage";
import QuizDoPage from "../pages/mentee/QuizDoPage";
import QuizDonePage from "../pages/mentee/QuizDonePage";

// Mentee – Đăng ký & lịch học
import RegisterCoursesPage from "../pages/mentee/RegisterCoursesPage";
import RegisteredCoursesPage from "../pages/mentee/RegisteredCoursesPage";
import CancelRegistrationPage from "../pages/mentee/CancelRegistrationPage";
import SchedulePage from "../pages/mentee/SchedulePage";

// User
import UserPage from "../pages/user/UserPage";

// Layout chung sau khi login
import MainLayout from "../layouts/MainLayout";

// Protected route & chiêu sinh
import ProtectedRoute from "../components/ProtectedRoute";
import CourseEnrollment from "../pages/tutor/CourseEnrollment";

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        {/* Trang chủ (welcome + chọn đăng nhập) */}
        <Route path="/" element={<HomePage />} />

        {/* Login riêng */}
        <Route path="/login-lms" element={<LoginLMS />} />
        <Route path="/login-admin" element={<LoginAdmin />} />

        {/* Tutor dùng layout riêng, không đi qua MainLayout */}
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/tutor" element={<TutorPage />} />

        {/* Các route sau khi đăng nhập sử dụng MainLayout */}
        <Route element={<MainLayout />}>
          {/* Admin */}

          {/* Tutor – Chiêu sinh khóa học (bảo vệ bằng ProtectedRoute) */}
          <Route
            path="/tutor/chieu-sinh"
            element={
              <ProtectedRoute role="TUTOR">
                <CourseEnrollment />
              </ProtectedRoute>
            }
          />

          {/* Mentee – Dashboard */}
          <Route path="/mentee" element={<Dashboard />} />

          {/* Mentee – Khóa học của tôi */}
          <Route path="/mentee/courses" element={<CoursePage />} />
          <Route
            path="/mentee/courses/:courseId"
            element={<CourseDetailPage />}
          />
          <Route
            path="/mentee/courses/:courseId/sessions/:sessionId"
            element={<CourseSessionPage />}
          />
          <Route
            path="/mentee/courses/:courseId/sessions/:sessionId/forum"
            element={<SessionForumPage />}
          />
          <Route
            path="/mentee/courses/:courseId/sessions/:sessionId/forum/:topicId"
            element={<SessionForumDetailPage />}
          />

          {/* Mentee – Quiz */}
          <Route
            path="/mentee/courses/:courseId/quizzes/:quizId"
            element={<QuizOverviewPage />}
          />
          <Route
            path="/mentee/courses/:courseId/quizzes/:quizId/do"
            element={<QuizDoPage />}
          />
          <Route
            path="/mentee/courses/:courseId/quizzes/:quizId/done"
            element={<QuizDonePage />}
          />

          {/* Mentee – Đăng ký môn học & lịch học */}
          <Route path="/mentee/register" element={<RegisterCoursesPage />} />
          <Route
            path="/mentee/registered-courses"
            element={<RegisteredCoursesPage />}
          />
          <Route
            path="/mentee/cancel-registration"
            element={<CancelRegistrationPage />}
          />
          <Route path="/mentee/schedule" element={<SchedulePage />} />

          {/* Mentee – các trang khác */}
          <Route path="/mentee/messages" element={<MessagesPage />} />
          <Route
            path="/mentee/notifications"
            element={<NotificationPage />}
          />
          <Route path="/mentee/feedback" element={<FeedbackPage />} />

          {/* User */}
          <Route path="/user" element={<UserPage />} />
        </Route>

        {/* 404 đơn giản */}
        <Route path="*" element={<div>404 - Không tìm thấy trang</div>} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
