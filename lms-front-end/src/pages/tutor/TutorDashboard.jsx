// TutorDashboard.jsx
import React from "react";
// Import icons đại diện (bạn có thể thay bằng file ảnh nếu muốn giống hệt Figma)
import { 
  Megaphone, // Quản lý thông báo
  Calendar,  // Quản lý lịch hẹn
  FileText,  // Truy cập tài liệu
  UserPlus,  // Chiêu sinh
  BarChart2, // Đánh giá hệ thống / Báo cáo
  Users      // Sinh viên (nếu cần thêm)
} from "lucide-react";

export function TeacherDashboard({ user, onNavigate }) {
  
  // Danh sách các nút chức năng theo Figma Groups
  // Mỗi item map với một Group trong CSS (vị trí tương đối sẽ được grid xử lý hoặc absolute nếu muốn pixel perfect)
  const dashboardItems = [
    {
      id: "enrollment", // Group 50
      label: "Chiêu sinh khóa học",
      icon: UserPlus,
      bgIcon: "bg-blue-100", // Placeholder cho background image icon
      color: "blue",
      navTo: "enrollment"
    },
    {
      id: "reports", // Group 42
      label: "Đánh giá hệ thống",
      icon: BarChart2,
      bgIcon: "bg-green-100",
      color: "green",
      navTo: "reports"
    },
    {
      id: "assignments", // Group 33 (Quản lý lịch hẹn -> tạm map sang Assignment/Schedule)
      label: "Quản lý lịch hẹn",
      icon: Calendar,
      bgIcon: "bg-purple-100",
      color: "purple",
      navTo: "assignments" // Hoặc tạo trang Schedule riêng
    },
    {
      id: "notifications", // Group 34
      label: "Quản lý thông báo",
      icon: Megaphone,
      bgIcon: "bg-yellow-100",
      color: "yellow",
      navTo: "dashboard" // Chưa có trang thông báo, giữ ở dashboard
    },
    {
      id: "documents", // Group 36
      label: "Truy cập tài liệu",
      icon: FileText,
      bgIcon: "bg-red-100",
      color: "red",
      navTo: "documents"
    },
    {
      id: "courses", // Thêm để đủ chức năng (Figma duplicate Group 37/42)
      label: "Quản lý lớp học",
      icon: Users,
      bgIcon: "bg-indigo-100",
      color: "indigo",
      navTo: "courses"
    }
  ];

  return (
    <div className="w-full h-full p-6 relative">
      
      {/* Grid Layout giả lập vị trí các Group */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-12 max-w-[600px] mx-auto mt-4">
        
        {dashboardItems.map((item, index) => (
          <div 
            key={index}
            className="relative h-[68px] cursor-pointer group transition-transform hover:scale-105"
            onClick={() => onNavigate(item.navTo)}
          >
            {/* Rectangle 12/10/13/14 (Dark Blue Box - Left) */}
            <div 
              className="absolute left-0 top-0 bottom-0 w-[140px] bg-[#1F4E79] border-2 border-[#1F4E79] rounded-l-md z-0"
            />

            {/* Button Body (Light Blue - Right) */}
            <div 
              className="absolute left-[60px] top-0 bottom-0 right-0 bg-[#0091FF] border border-[#2C2C2C] rounded-lg z-10 flex items-center justify-center pl-8 pr-2"
            >
              <span className="text-[#F5F5F5] font-normal text-[16px] leading-[100%] text-center">
                {item.label}
              </span>
            </div>

            {/* Avatar / Icon Circle */}
            <div 
              className="absolute left-[20px] top-[10px] w-[48px] h-[48px] bg-white rounded-full z-20 flex items-center justify-center shadow-md"
            >
              {/* Icon shape inside */}
              <item.icon className="w-6 h-6 text-[#1F4E79]" />
            </div>
          </div>
        ))}

      </div>

      {/* Trang trí thêm nếu cần */}
      <div className="absolute bottom-4 right-4 text-xs text-gray-400">
        GV: {user.name}
      </div>
    </div>
  );
}