// src/pages/tutor/TutorPage.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { LogOut } from "lucide-react";

// Import các component con
import { TeacherDashboard } from "./TutorDashboard";
import { TeacherCourses } from "./TutorCourses";
import { TeacherAssignments } from "./TutorAssignments";
import { TeacherDocuments } from "./TutorDocuments";
import { TeacherStudents } from "./TutorStudents";
import { TeacherReports } from "./TutorReports";

const PRIMARY_COLOR = "#1F4E79";

export default function TutorPage() {
  const [currentPage, setCurrentPage] = useState("dashboard");
  const [selectedCourse, setSelectedCourse] = useState(null);
  const navigate = useNavigate();

  // Mock user info
  const mockUser = {
    id: "teacher-1",
    name: localStorage.getItem("name") || "Yến Nhi",
    email: localStorage.getItem("username") || "tutor@example.com",
    role: "tutor",
  };

  const handleNavigate = (page, data) => {
    if (page === "enrollment") {
      navigate("/tutor/chieu-sinh");
      return;
    }
    if (page === "logout") {
      localStorage.clear();
      navigate("/login-lms");
      return;
    }
    setCurrentPage(page);
    if (data?.courseId) {
      setSelectedCourse(data.courseId);
    }
  };

  const renderContent = () => {
    switch (currentPage) {
      case "dashboard":
        return <TeacherDashboard user={mockUser} onNavigate={handleNavigate} />;
      case "courses":
        return <TeacherCourses user={mockUser} onNavigate={handleNavigate} />;
      case "assignments":
        return <TeacherAssignments user={mockUser} onNavigate={handleNavigate} />;
      case "documents":
        return <TeacherDocuments user={mockUser} />;
      case "students":
        return <TeacherStudents user={mockUser} />;
      case "reports":
        return <TeacherReports user={mockUser} />;
      case "course-detail":
        return (
          <div className="p-4">
            <button 
              onClick={() => setCurrentPage("courses")}
              className="mb-4 text-blue-600 underline font-medium hover:text-blue-800"
            >
              &larr; Quay lại danh sách
            </button>
            <h2 className="text-xl font-bold">Chi tiết khóa học {selectedCourse}</h2>
          </div>
        );
      default:
        return <TeacherDashboard user={mockUser} onNavigate={handleNavigate} />;
    }
  };

  const pageTitle = currentPage === "dashboard" ? "TRANG CHỦ" : 
                    currentPage === "courses" ? "QUẢN LÝ LỚP HỌC" :
                    currentPage === "assignments" ? "QUẢN LÝ BÀI TẬP" :
                    currentPage === "documents" ? "TÀI LIỆU" :
                    currentPage === "students" ? "SINH VIÊN" :
                    currentPage === "reports" ? "BÁO CÁO" : "CHI TIẾT";

  return (
    <div className="h-screen bg-gray-50 flex flex-col font-sans overflow-hidden">
      
      {/* === HEADER (Full Width, Fixed Top) === */}
      <header 
        className="w-full shrink-0 shadow-md z-50 relative"
        style={{ height: "64px", backgroundColor: PRIMARY_COLOR }}
      >
        <div className="w-full h-full px-4 md:px-8 flex items-center justify-between">
          
          {/* Left: Logo & School Name */}
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center overflow-hidden shadow-sm shrink-0">
               <img src="/images/logobachkhoa.png" alt="Logo" className="w-3/4 h-3/4 object-contain" />
            </div>
            
            <div className="hidden md:block text-white font-normal text-[13px] md:text-[14px] leading-tight uppercase">
              TRƯỜNG ĐẠI HỌC BÁCH KHOA - <br className="hidden lg:block"/> ĐẠI HỌC QUỐC GIA THÀNH PHỐ HỒ CHÍ MINH
            </div>
            {/* Mobile Name Short */}
            <div className="md:hidden text-white font-bold text-sm uppercase">
              HCMUT - LMS
            </div>
          </div>

          {/* Right: Logout Button */}
          <div 
            className="flex items-center gap-3 cursor-pointer opacity-90 hover:opacity-100 transition-opacity"
            onClick={() => handleNavigate("logout")}
          >
            <span className="text-white text-[14px] font-medium uppercase hidden sm:block">ĐĂNG XUẤT</span>
            <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-sm">
               <LogOut size={16} color={PRIMARY_COLOR} />
            </div>
          </div>
        </div>
      </header>

      {/* === MAIN BODY (Flexible) === */}
      <main className="flex-1 w-full p-4 md:p-6 overflow-hidden flex flex-col relative z-0">
        
        {/* Content Container (White Box) 
            Thay vì size cố định, ta dùng max-w-7xl để giới hạn độ rộng trên màn hình lớn 
            và h-full để lấp đầy chiều cao
        */}
        <div 
          className="w-full max-w-7xl mx-auto bg-white border-2 rounded-lg shadow-lg flex flex-col overflow-hidden h-full"
          style={{ borderColor: PRIMARY_COLOR }}
        >
          
          {/* Sub-Header (Page Title) */}
          <div 
            className="w-full flex items-center justify-center shrink-0"
            style={{ height: "44px", backgroundColor: PRIMARY_COLOR }}
          >
             <span className="text-white font-bold text-[18px] md:text-[20px] uppercase tracking-wide">
                {pageTitle}
             </span>
          </div>

          {/* Scrollable Content Area */}
          <div className="flex-1 w-full overflow-y-auto relative bg-white scroll-smooth">
             
             {/* Nút Back (Mobile/Tablet friendly) */}
             {currentPage !== "dashboard" && (
                <div className="sticky top-0 bg-white/95 backdrop-blur-sm z-10 px-4 py-2 border-b border-gray-100 md:hidden">
                  <button 
                    onClick={() => setCurrentPage("dashboard")}
                    className="flex items-center text-blue-800 font-semibold text-sm"
                  >
                    ‹ Trang chủ
                  </button>
                </div>
             )}
             
             {/* Render Dynamic Content */}
             <div className="h-full">
                {renderContent()}
             </div>
          </div>
        </div>

      </main>
    </div>
  );
}