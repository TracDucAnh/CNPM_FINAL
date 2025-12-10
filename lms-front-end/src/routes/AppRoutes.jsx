import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Trang chung
import HomePage from "../pages/HomePage";

// Login
import LoginLMS from "../pages/login/LoginLMS";
import LoginAdmin from "../pages/login/LoginAdmin";

// Admin & Tutor (Giao diện Full Screen)
import AdminPage from "../pages/admin/AdminPage";
import TutorPage from "../pages/tutor/TutorPage";

// Mentee (Giao diện Full Screen Mới)
// Lưu ý: Import MenteePage thay vì Dashboard
import MenteePage from "../pages/mentee/MenteePage"; 

// User Profile
import UserPage from "../pages/user/UserPage";

// Layout chung (Nếu dùng cho các trang khác)
import MainLayout from "../layouts/MainLayout";

// Protected route & chiêu sinh (Giữ nguyên nếu có)
import ProtectedRoute from "../components/ProtectedRoute";
import CourseEnrollment from "../pages/tutor/CourseEnrollment";

// Các trang con của Mentee (Vẫn giữ lại để routing hoạt động nếu cần truy cập trực tiếp)
import CoursePage from "../pages/mentee/CoursePage";
import CourseDetailPage from "../pages/mentee/CourseDetailPage";
import CourseSessionPage from "../pages/mentee/CourseSessionPage";
import SessionForumPage from "../pages/mentee/SessionForumPage";
import SessionForumDetailPage from "../pages/mentee/SessionForumDetailPage";
import MessagesPage from "../pages/mentee/MessagesPage";
import NotificationPage from "../pages/mentee/NotificationPage";
import FeedbackPage from "../pages/mentee/FeedbackPage";
import QuizOverviewPage from "../pages/mentee/QuizOverviewPage";
import QuizDoPage from "../pages/mentee/QuizDoPage";
import QuizDonePage from "../pages/mentee/QuizDonePage";
import RegisterCoursesPage from "../pages/mentee/RegisterCoursesPage";
import RegisteredCoursesPage from "../pages/mentee/RegisteredCoursesPage";
import CancelRegistrationPage from "../pages/mentee/CancelRegistrationPage";
import SchedulePage from "../pages/mentee/SchedulePage";

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        {/* --- TRANG PUBLIC --- */}
        <Route path="/" element={<HomePage />} />
        <Route path="/login-lms" element={<LoginLMS />} />
        <Route path="/login-admin" element={<LoginAdmin />} />

        {/* --- CÁC TRANG FULL SCREEN (Tự quản lý Layout - KHÔNG DÙNG MainLayout) --- */}
        
        {/* Tutor Page */}
        <Route path="/tutor" element={<TutorPage />} />
        <Route
            path="/tutor/chieu-sinh"
            element={
              <ProtectedRoute role="TUTOR">
                <CourseEnrollment />
              </ProtectedRoute>
            }
          />
        
        {/* Admin Page */}
        <Route path="/admin" element={<AdminPage />} />

        {/* Mentee Page (TRANG CHỦ MỚI CỦA MENTEE) */}
        {/* Đưa ra ngoài MainLayout để hiển thị Full Screen header riêng */}
        <Route path="/mentee" element={<MenteePage />} />

        {/* --- CÁC TRANG CON CẦN LAYOUT CHUNG (Header/Sidebar cũ) --- */}
        {/* Nếu bạn muốn các trang con (như chi tiết khóa học) vẫn dùng layout cũ thì để ở đây.
            Nếu muốn chuyển hết sang style mới thì cần update từng trang. */}
        <Route element={<MainLayout />}>
          
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

          {/* Mentee – Đăng ký & lịch học */}
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