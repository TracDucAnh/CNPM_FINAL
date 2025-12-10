// src/pages/mentee/MenteePage.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { LogOut, Wrench } from "lucide-react";

// Import Dashboard Component
import { MenteeDashboard } from "./MenteeDashboard";

// Import các trang chức năng thực tế
import RegisterCoursesPage from "./RegisterCoursesPage";
import SchedulePage from "./SchedulePage";
import NotificationPage from "./NotificationPage";
import FeedbackPage from "./FeedbackPage";

// Component hiển thị cho các chức năng đang phát triển
const ComingSoon = ({ title }) => (
  <div className="flex flex-col items-center justify-center h-[400px] text-gray-500">
    <div className="bg-gray-100 p-6 rounded-full mb-4">
      <Wrench className="w-12 h-12 text-blue-800" />
    </div>
    <h3 className="text-xl font-bold text-gray-700 mb-2">Chức năng {title}</h3>
    <p className="text-gray-500">Tính năng này đang được phát triển và sẽ sớm ra mắt.</p>
    <button 
      onClick={() => window.history.back()} // Hoặc set state về dashboard
      className="mt-6 px-4 py-2 text-blue-600 hover:bg-blue-50 rounded-md transition"
    >
      Quay lại trang chủ
    </button>
  </div>
);

// Placeholder cho Tài liệu (nếu chưa có trang riêng)
const MenteeDocuments = () => <ComingSoon title="Truy cập tài liệu" />;
// Placeholder cho Đánh giá hệ thống
const MenteeSystemEvaluation = () => <ComingSoon title="Đánh giá hệ thống" />;

const PRIMARY_COLOR = "#1F4E79";

export default function MenteePage() {
  const [currentPage, setCurrentPage] = useState("dashboard");
  const navigate = useNavigate();

  // Mock user info
  const mockUser = {
    name: localStorage.getItem("name") || "Yến Nhi",
    email: localStorage.getItem("username") || "mentee@example.com",
  };

  const handleNavigate = (page) => {
    if (page === "logout") {
      localStorage.clear();
      navigate("/login-lms");
      return;
    }
    setCurrentPage(page);
  };

  // Render nội dung theo menu -> Gọi các Component thực tế
  const renderContent = () => {
    switch (currentPage) {
      case "dashboard":
        return <MenteeDashboard user={mockUser} onNavigate={handleNavigate} />;
      case "registration":
        return <RegisterCoursesPage />; // Trang đăng ký thật
      case "documents":
        return <MenteeDocuments />;     // Placeholder
      case "schedule":
        return <SchedulePage />;        // Trang lịch học thật
      case "course-eval":
        return <FeedbackPage />;        // Trang đánh giá/feedback thật
      case "notifications":
        return <NotificationPage />;    // Trang thông báo thật
      case "system-eval":
        return <MenteeSystemEvaluation />; // Placeholder
      default:
        return <MenteeDashboard user={mockUser} onNavigate={handleNavigate} />;
    }
  };

  // Tiêu đề trang thay đổi động
  const getPageTitle = () => {
    switch (currentPage) {
      case "dashboard": return "TRANG CHỦ";
      case "registration": return "ĐĂNG KÝ KHÓA HỌC";
      case "documents": return "TÀI LIỆU HỌC TẬP";
      case "schedule": return "LỊCH HẸN";
      case "course-eval": return "ĐÁNH GIÁ KHÓA HỌC";
      case "notifications": return "THÔNG BÁO";
      case "system-eval": return "ĐÁNH GIÁ HỆ THỐNG";
      default: return "TRANG CHỦ";
    }
  };

  return (
    <div className="h-screen bg-gray-50 flex flex-col font-sans overflow-hidden">
      
      {/* === HEADER (Full Width) === */}
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

      {/* === MAIN BODY === */}
      <main className="flex-1 w-full p-4 md:p-6 overflow-hidden flex flex-col relative z-0">
        
        {/* Content Container (White Box) */}
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
                {getPageTitle()}
             </span>
          </div>

          {/* Scrollable Content Area */}
          <div className="flex-1 w-full overflow-y-auto relative bg-white scroll-smooth">
             
             {/* Nút Back (Luôn hiển thị khi không ở Dashboard để dễ điều hướng) */}
             {currentPage !== "dashboard" && (
                <div className="sticky top-0 bg-white/95 backdrop-blur-sm z-10 px-4 py-2 border-b border-gray-100">
                  <button 
                    onClick={() => setCurrentPage("dashboard")}
                    className="flex items-center text-blue-800 font-semibold text-sm hover:underline"
                  >
                    ‹ Quay lại Trang chủ
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