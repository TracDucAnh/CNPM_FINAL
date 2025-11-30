import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
// Import các component quản lý mới
import UserManage from "./UserManage";
import CourseManage from "./CourseManage";

// Định nghĩa màu chủ đạo
const PRIMARY_COLOR = "#1F4E79";

// DỮ LIỆU MOCK (Hardcoded data) - Đã đổi tên Giảng viên thành Tutor
const MOCK_STATS = [
  { label: "Tổng số Tutor", value: 35, bg: "bg-[#e5f0f9]", text: "GV" },
  { label: "Tổng số Học sinh", value: 1245, bg: "bg-[#e7f9e5]", text: "HS" },
  { label: "Tổng số Khóa học", value: 48, bg: "bg-[#f9e9e5]", text: "KH" },
  { label: "Môn học đang mở", value: 12, bg: "bg-[#fff7e5]", text: "MƠ" },
];

// DỮ LIỆU TUTOR ĐÃ CẬP NHẬT (Thêm danh sách classes)
const MOCK_TUTORS = [
  { id: 1, name: "Phạm Văn Thành", email: "thanh.pv@lms.edu", courses: 4, status: "Active", classes: ["MT101-L01", "MT101-L02", "GT201-L01", "KT305-L01"] },
  { id: 2, name: "Nguyễn Thị Hoa", email: "hoa.nt@lms.edu", courses: 5, status: "Active", classes: ["GT201-L02", "KT305-L02"] },
  { id: 3, name: "Lê Minh Trí", email: "tri.lm@lms.edu", courses: 2, status: "Inactive", classes: ["MT101-L03"] },
];

const MOCK_STUDENTS = [
  { id: 101, name: "Trần Văn Luận", major: "Khoa học MT", courses: 6 },
  { id: 102, name: "Đào Thị Thu", major: "Kỹ thuật PM", courses: 5 },
  { id: 103, name: "Vũ Đình Nam", major: "Điện tử", courses: 4 },
];

// DỮ LIỆU KHÓA HỌC ĐÃ CẬP NHẬT (Thêm numClasses)
const MOCK_COURSES = [
  { id: "MT101", name: "Nhập môn Điện toán", teacher: "P.V.Thành", teacherId: 1, students: 50, numClasses: 3 },
  { id: "GT201", name: "Giải tích 2", teacher: "N.T.Hoa", teacherId: 2, students: 48, numClasses: 2 },
  { id: "KT305", name: "Cấu trúc dữ liệu", teacher: "L.M.Trí", teacherId: 3, students: 52, numClasses: 2 },
];

// Component Dashboard (Tổng quan)
const AdminDashboard = () => (
  <div className="space-y-8">
    <h2 className="text-2xl font-bold" style={{ color: PRIMARY_COLOR }}>Tổng quan Quản trị</h2>
    
    {/* Stats Cards */}
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {MOCK_STATS.map((item, idx) => (
        <div
          key={idx}
          className={`${item.bg} rounded-xl px-4 py-4 flex flex-col items-start gap-1 shadow-md border border-gray-100`}
        >
          {/* Vị trí thay thế icon bằng text/ký hiệu đơn giản */}
          <div 
            style={{ backgroundColor: PRIMARY_COLOR }}
            className="w-10 h-10 rounded-lg flex items-center justify-center text-xs font-bold text-white shadow-md mb-2"
          >
            {item.text} 
          </div>
          <p className="text-2xl font-bold text-gray-800">
            {item.value}
          </p>
          <p className="text-xs md:text-sm text-gray-600">
            {item.label}
          </p>
        </div>
      ))}
    </div>

    {/* Các bảng quản lý chính */}
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      
      {/* 1. Tutor gần đây */}
      <Card title="Tutor mới/gần đây" data={MOCK_TUTORS} type="tutor" />

      {/* 2. Khóa học mới nhất */}
      <Card title="Khóa học đang hoạt động" data={MOCK_COURSES} type="course" />
      
      {/* 3. Học sinh gần đây */}
      <Card title="Học sinh mới đăng ký" data={MOCK_STUDENTS} type="student" />

    </div>
  </div>
);

// Component Card dùng chung
const Card = ({ title, data, type }) => {
  const getDisplayData = (item) => {
    switch (type) {
      case 'tutor':
        // Hiển thị số lượng lớp đang quản lý
        return `${item.classes.length} lớp đang dạy | ${item.status}`;
      case 'course':
        // Hiển thị số lượng lớp được mở cho khóa học
        return `${item.teacher} (${item.numClasses} lớp) | ${item.students} SV`;
      case 'student':
        return `${item.major} | ${item.courses} khóa`;
      default:
        return '';
    }
  };

  const getStatusColor = (status) => {
      if (status === 'Active') return 'bg-green-100 text-green-700';
      if (status === 'Inactive') return 'bg-red-100 text-red-700';
      return 'bg-gray-100 text-gray-700';
  };

  const handleCardClick = (item) => {
    console.log(`--- XEM CHI TIẾT ${type.toUpperCase()} ---`);
    console.log("ID:", item.id);
    if (type === 'tutor') {
        console.log("Các lớp đang dạy:", item.classes.join(', '));
    } else if (type === 'course') {
        const tutor = MOCK_TUTORS.find(t => t.id === item.teacherId);
        console.log("Thông tin khóa học:", item);
        console.log("Thông tin Tutor:", tutor);
    } else {
        console.log("Thông tin:", item);
    }
    // Ở đây bạn có thể thêm logic chuyển trang thực tế, ví dụ:
    // navigate(`/admin/${type}/${item.id}`);
  };

  return (
    <div className="bg-white rounded-xl shadow-lg border border-gray-200">
      <div className="p-4 border-b">
        <h3 className="font-bold text-lg" style={{ color: PRIMARY_COLOR }}>{title}</h3>
      </div>
      <div className="p-4 space-y-3 max-h-96 overflow-y-auto">
        {data.slice(0, 5).map((item) => (
          <div 
            key={item.id} 
            className="p-3 rounded-lg hover:bg-gray-50 transition cursor-pointer border border-gray-100"
            onClick={() => handleCardClick(item)} // Gắn hàm click mới
          >
            <div className="flex justify-between items-start">
                <div className="text-sm">
                    <p className="font-semibold text-gray-800">{item.name || item.title}</p>
                    <p className="text-xs text-gray-500">{item.email || item.code}</p>
                    {/* Dữ liệu hiển thị chi tiết hơn */}
                    <p className="text-xs text-gray-600 mt-1">{getDisplayData(item)}</p>
                </div>
                {item.status && (
                    <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full ${getStatusColor(item.status)}`}>
                        {item.status === 'Active' ? 'Hoạt động' : 'Tạm dừng'}
                    </span>
                )}
            </div>
          </div>
        ))}
        {data.length > 5 && (
            <button className="w-full text-center text-sm text-blue-600 pt-2 hover:underline">
                Xem tất cả
            </button>
        )}
      </div>
    </div>
  );
};

// Main Component
export default function AdminPage() {
  const [activeTab, setActiveTab] = useState("dashboard"); // dashboard, users, courses
  const navigate = useNavigate(); // Sử dụng hook useNavigate

  const renderContent = () => {
    switch (activeTab) {
      case "dashboard":
        return <AdminDashboard />;
      case "users":
        return <UserManage />;
      case "courses":
        return <CourseManage />;
      default:
        return <AdminDashboard />;
    }
  };

  const tabs = [
    { id: "dashboard", label: "Tổng quan" },
    { id: "users", label: "Quản lý Người dùng" },
    { id: "courses", label: "Quản lý Khóa học" },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      
      {/* HEADER TOP BAR RIÊNG CHO ADMIN */}
      <header style={{ backgroundColor: PRIMARY_COLOR }} className="text-white shadow-md">
        <div className="max-w-7xl mx-auto flex items-center justify-between px-4 sm:px-6 lg:px-8 h-16">
          <div className="flex items-center space-x-3">
              <img
                className="h-12 w-auto" // Kích thước logo h-12 (48px)
                src="/images/logobachkhoa.png" // Đường dẫn logo
                alt="Logo Bách Khoa"
              />
              <h1 className="text-xl font-semibold text-white">
                Cổng Quản trị Hệ thống
              </h1>
          </div>
          {/* Thông tin Admin (mock) */}
          <div className="flex items-center space-x-3">
              <span className="text-white text-sm">
                Admin
              </span>
              <button 
                className="text-white hover:text-blue-300 text-sm font-medium transition"
                // CHỨC NĂNG: Điều hướng về Dashboard Admin
                onClick={() => setActiveTab("dashboard")} 
              >
                Tổng quan
              </button>
               {/* NÚT ĐĂNG XUẤT */}
              <button 
                className="text-white hover:text-red-300 text-sm font-medium ml-4 border-l border-white/50 pl-4 transition"
                // CHỨC NĂNG: Log out và quay về trang đăng nhập Admin
                onClick={() => navigate("/login-admin")} 
              >
                Đăng xuất
              </button>
          </div>
        </div>
      </header>
      {/* KẾT THÚC HEADER */}


      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Tiêu đề trang (di chuyển xuống dưới) */}
        <h1 className="text-3xl font-extrabold mb-6" style={{ color: PRIMARY_COLOR }}>
            Quản trị Hệ thống
        </h1>
        
        {/* Tab Navigation */}
        <div className="flex border-b border-gray-200 mb-6">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 text-sm font-medium transition-colors border-b-2 ${
                activeTab === tab.id
                  ? "border-b-4 font-bold text-gray-800"
                  : "border-transparent text-gray-500 hover:text-gray-700"
              }`}
              style={{ borderColor: activeTab === tab.id ? PRIMARY_COLOR : 'transparent' }}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Content Area */}
        <div className="bg-white rounded-lg shadow-xl p-6">
          {renderContent()}
        </div>
      </div>
    </div>
  );
}