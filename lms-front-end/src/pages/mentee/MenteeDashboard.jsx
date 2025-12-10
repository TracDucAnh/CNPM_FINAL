// src/pages/mentee/MenteeDashboard.jsx
import React from "react";
// Import Icons
import { 
  UserPlus,     // Đăng ký khóa học
  FileText,     // Truy cập tài liệu
  Calendar,     // Quản lý lịch hẹn
  MessageSquare,// Đánh giá khóa học
  Bell,         // Quản lý thông báo
  BarChart2     // Đánh giá hệ thống
} from "lucide-react";

export function MenteeDashboard({ user, onNavigate }) {
  
  // Bảo vệ: Nếu user chưa có dữ liệu, hiển thị loading hoặc giá trị mặc định
  const safeUser = user || { name: "Sinh viên" };

  // Cấu hình các nút chức năng theo Figma
  // Layout 2 cột: Left (Cột 1), Right (Cột 2)
  const dashboardItems = [
    // Row 1
    {
      id: "registration",
      label: "Đăng ký khóa học",
      icon: UserPlus,
      navTo: "registration"
    },
    {
      id: "documents",
      label: "Truy cập tài liệu",
      icon: FileText,
      navTo: "documents"
    },
    // Row 2
    {
      id: "schedule",
      label: "Quản lý lịch hẹn",
      icon: Calendar,
      navTo: "schedule"
    },
    {
      id: "course-eval",
      label: "Đánh giá khóa học",
      icon: MessageSquare,
      navTo: "course-eval"
    },
    // Row 3
    {
      id: "notifications",
      label: "Quản lý thông báo",
      icon: Bell,
      navTo: "notifications"
    },
    {
      id: "system-eval",
      label: "Đánh giá hệ thống",
      icon: BarChart2,
      navTo: "system-eval"
    }
  ];

  return (
    <div className="w-full h-full p-6 flex flex-col items-center">
      
      {/* Welcome text (optional, but good for UX) */}
      <div className="w-full max-w-[800px] mb-6 text-right text-gray-500 text-sm italic">
        SV: {safeUser.name}
      </div>

      {/* Grid Layout giả lập vị trí các Group */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-y-8 gap-x-16 max-w-[700px] w-full mt-4">
        
        {dashboardItems.map((item, index) => (
          <div 
            key={index}
            className="relative h-[68px] cursor-pointer group transition-transform hover:scale-105 select-none"
            onClick={() => onNavigate && onNavigate(item.navTo)}
          >
            {/* Dark Blue Box (Left Part) */}
            {/* Figma: Width ~126px - 140px */}
            <div 
              className="absolute left-0 top-0 bottom-0 w-[45%] bg-[#1F4E79] border-2 border-[#1F4E79] rounded-l-md z-0"
            />

            {/* Button Body (Light Blue - Right Part) */}
            {/* Figma: Background #0091FF */}
            <div 
              className="absolute left-[50px] top-0 bottom-0 right-0 bg-[#0091FF] border border-[#2C2C2C] rounded-lg z-10 flex items-center justify-center pl-10 pr-2 shadow-sm"
            >
              <span className="text-[#F5F5F5] font-normal text-[16px] leading-[100%] text-center uppercase tracking-wide">
                {item.label}
              </span>
            </div>

            {/* Icon Circle */}
            <div 
              className="absolute left-[15px] top-[10px] w-[48px] h-[48px] bg-white rounded-full z-20 flex items-center justify-center shadow-md border-2 border-gray-100"
            >
              <item.icon className="w-6 h-6 text-[#1F4E79]" />
            </div>
          </div>
        ))}

      </div>
    </div>
  );
}