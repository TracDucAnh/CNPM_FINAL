// src/pages/tutor/TutorPage.jsx
import React, { useState } from "react";
// Import các component khác
import { TeacherDashboard } from "./TutorDashboard";
import { TeacherCourses } from "./TutorCourses";
import { TeacherAssignments } from "./TutorAssignments";
import { TeacherDocuments } from "./TutorDocuments";
import { TeacherStudents } from "./TutorStudents";
import { TeacherReports } from "./TutorReports";
import { useNavigate } from "react-router-dom";

const PRIMARY_COLOR = "#1F4E79";

export default function TutorPage() {
  const [currentPage, setCurrentPage] = useState("dashboard");
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navigate = useNavigate();

  // Lấy thông tin từ localStorage (sau khi login)
  const storedName = localStorage.getItem("name") || "Nguyễn Văn A";
  const storedRole = localStorage.getItem("role") || "TUTOR";

  const mockUser = {
    id: "teacher-1",
    name: storedName,
    email: localStorage.getItem("username") || "teacher@example.com",
    role: storedRole.toLowerCase(), // "teacher" hoặc "tutor"
  };

  const menuItems = [
    { id: "dashboard", label: "Tổng quan" },
    { id: "courses", label: "Lớp học" },
    { id: "assignments", label: "Bài tập" },
    { id: "documents", label: "Tài liệu" },
    { id: "students", label: "Sinh viên" },
    { id: "reports", label: "Báo cáo" },
    // Chiêu sinh khóa học dùng route riêng /tutor/chieu-sinh
    { id: "enrollment", label: "Chiêu sinh khóa học" },
  ];

  const handleNavigate = (page, data) => {
    if (page === "enrollment") {
      navigate("/tutor/chieu-sinh");
      return;
    }
    setCurrentPage(page);
    if (data?.courseId) {
      setSelectedCourse(data.courseId);
    }
    setMobileMenuOpen(false);
  };

  const renderCurrentPage = () => {
    switch (currentPage) {
      case "dashboard":
        return <TeacherDashboard user={mockUser} onNavigate={handleNavigate} />;
      case "courses":
        return <TeacherCourses user={mockUser} onNavigate={handleNavigate} />;
      case "assignments":
        return (
          <TeacherAssignments user={mockUser} onNavigate={handleNavigate} />
        );
      case "documents":
        return <TeacherDocuments user={mockUser} />;
      case "students":
        return <TeacherStudents user={mockUser} />;
      case "reports":
        return <TeacherReports user={mockUser} />;
      case "course-detail":
        return <div>Chi tiết khóa học - {selectedCourse}</div>;
      default:
        return <TeacherDashboard user={mockUser} onNavigate={handleNavigate} />;
    }
  };

  const getCurrentPageLabel = () => {
    const currentItem = menuItems.find((item) => item.id === currentPage);
    return currentItem ? currentItem.label : "Tổng quan";
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header style={{ backgroundColor: PRIMARY_COLOR }} className="shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo + tên hệ thống */}
            <div className="flex items-center space-x-3">
              <img
                className="h-12 w-auto"
                src="/images/logobachkhoa.png"
                alt="Logo Bách Khoa"
              />
              <h1 className="text-xl font-semibold text-white hidden sm:block">
                Hệ thống Quản lý Lớp học
              </h1>
            </div>

            {/* Menu Desktop */}
            <nav className="hidden md:flex items-center space-x-1">
              {menuItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleNavigate(item.id)}
                  className={`flex items-center space-x-1 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                    currentPage === item.id
                      ? "bg-white text-blue-800 border border-gray-100"
                      : "text-white hover:bg-[#346294]"
                  }`}
                  style={
                    currentPage !== item.id
                      ? { backgroundColor: PRIMARY_COLOR }
                      : {}
                  }
                >
                  <span>{item.label}</span>
                </button>
              ))}
            </nav>

            {/* User info + Mobile menu */}
            <div className="flex items-center space-x-4">
              {/* Mobile menu */}
              <div className="md:hidden relative">
                <button
                  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                  className="flex items-center space-x-1 px-3 py-2 rounded-md text-white hover:bg-[#346294] transition"
                >
                  <span className="text-sm font-medium">
                    {getCurrentPageLabel()}
                  </span>
                </button>

                {mobileMenuOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 border border-gray-200">
                    {menuItems.map((item) => (
                      <button
                        key={item.id}
                        onClick={() => handleNavigate(item.id)}
                        className={`flex items-center space-x-2 w-full px-4 py-2 text-sm text-left ${
                          currentPage === item.id
                            ? "bg-[#e5f0f9] text-gray-800 font-semibold"
                            : "text-gray-700 hover:bg-gray-50"
                        }`}
                      >
                        <span>{item.label}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Thông tin user */}
              <div className="flex items-center space-x-3">
                <span className="hidden sm:inline text-white text-sm">
                  Xin chào, {mockUser.name}
                </span>
                <div
                  className="w-8 h-8 bg-white rounded-full flex items-center justify-center text-sm font-medium"
                  style={{ color: PRIMARY_COLOR }}
                >
                  {mockUser.name.charAt(0)}
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="bg-white rounded-lg shadow-sm border">
          <div className="p-6">{renderCurrentPage()}</div>
        </div>
      </div>
    </div>
  );
}
