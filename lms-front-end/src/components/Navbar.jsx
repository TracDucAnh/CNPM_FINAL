// src/components/Navbar.jsx
import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";

// Định nghĩa màu chủ đạo mới
const PRIMARY_COLOR = "#1F4E79";

export default function Navbar() {
  const navigate = useNavigate();

  const [openNotif, setOpenNotif] = useState(false);
  const [openUserMenu, setOpenUserMenu] = useState(false);
  const [openLangMenu, setOpenLangMenu] = useState(false);
  const [language, setLanguage] = useState("vi"); // "vi" | "en"

  const notifications = [
    { id: 1, title: "Nhắc nộp bài", time: "1 phút trước" },
    { id: 2, title: "Lịch học cập nhật", time: "5 phút trước" },
    { id: 3, title: "Điểm quiz 1", time: "1 giờ trước" },
    { id: 4, title: "Tin nhắn mới", time: "Hôm qua" },
    { id: 5, title: "Thông báo hệ thống", time: "2 ngày trước" },
  ];

  const handleSaveLanguage = () => {
    console.log("Saved language:", language);
    setOpenLangMenu(false);
  };

  return (
    <header style={{ backgroundColor: PRIMARY_COLOR }} className="text-white shadow-md">
      <div className="flex items-center justify-between px-6 h-14">
        
        {/* LOGO VÀ TÊN HỆ THỐNG */}
        <div className="flex items-center gap-3">
          <button
            className="cursor-pointer"
            onClick={() => navigate("/mentee")}
            title="Trang chủ"
          >
            {/* LOGO BÁCH KHOA (h-12 w-auto = 48px) */}
            <img
              className="h-9 w-auto" // Đã chỉnh về h-9 (36px) để gọn hơn trong navbar
              src="/images/logobachkhoa.png" 
              alt="Logo Bách Khoa"
            />
          </button>
          
          <span className="font-semibold text-sm md:text-base hidden sm:block">
            Hệ thống quản lý học tập
          </span>
        </div>

        {/* MENU CHÍNH (NAVIGATION LINKS) */}
        <nav className="hidden md:flex items-center gap-6 text-sm">
          {/* NavLink 1: Trang chủ */}
          <NavLink
            to="/mentee"
            end
            className={({ isActive }) =>
              `pb-1 ${
                isActive
                  ? "font-semibold border-b-2 border-white"
                  : "hover:border-b hover:border-white/60"
              }`
            }
          >
            Trang chủ
          </NavLink>

          {/* NavLink 2: Khóa học của tôi */}
          <NavLink
            to="/mentee/courses"
            className={({ isActive }) =>
              `pb-1 ${
                isActive
                  ? "font-semibold border-b-2 border-white"
                  : "hover:border-b hover:border-white/60"
              }`
            }
          >
            Khóa học của tôi
          </NavLink>

          {/* NavLink 3: Đăng ký môn học */}
          <NavLink
            to="/mentee/register"
            className={({ isActive }) =>
              `pb-1 ${
                isActive
                  ? "font-semibold border-b-2 border-white"
                  : "hover:border-b hover:border-white/60"
              }`
            }
          >
            Đăng ký môn học
          </NavLink>

          {/* NavLink 4: Lịch học */}
          <NavLink
            to="/mentee/schedule"
            className={({ isActive }) =>
              `pb-1 ${
                isActive
                  ? "font-semibold border-b-2 border-white"
                  : "hover:border-b hover:border-white/60"
              }`
            }
          >
            Lịch học
          </NavLink>
        </nav>

        {/* KHU VỰC BÊN PHẢI (CHỈ CHỨA TEXT/NÚT ĐƠN GIẢN) */}
        <div className="flex items-center gap-3 relative">
          
          {/* Tin nhắn */}
          <button
            className="text-xs font-medium px-2 py-1 rounded-md bg-white/10 hover:bg-white/20 transition"
            onClick={() => navigate("/mentee/messages")}
            title="Tin nhắn"
          >
            Tin nhắn
          </button>

          {/* Thông báo */}
          <div className="relative">
            <button
              className="text-xs font-medium px-2 py-1 rounded-md bg-white/10 hover:bg-white/20 relative transition"
              onClick={() => setOpenNotif((v) => !v)}
              title="Thông báo"
            >
              Thông báo
              <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-red-500 text-[10px] flex items-center justify-center">
                11
              </span>
            </button>

            {/* Dropdown thông báo */}
            {openNotif && (
              <div className="absolute right-0 mt-2 w-64 bg-white text-gray-800 rounded-lg shadow-lg z-40">
                <div className="px-3 py-2 border-b text-sm font-semibold">
                  Thông báo
                </div>
                <div className="max-h-72 overflow-y-auto">
                  {notifications.map((n) => (
                    <div
                      key={n.id}
                      className="px-3 py-2 text-xs border-b hover:bg-gray-50"
                    >
                      <div className="font-medium">{n.title}</div>
                      <div className="text-gray-500 text-[11px]">{n.time}</div>
                    </div>
                  ))}
                </div>
                <button
                  className="w-full text-center text-xs text-blue-600 py-2 hover:bg-gray-50"
                  onClick={() => {
                    setOpenNotif(false);
                    navigate("/mentee/notifications");
                  }}
                >
                  Xem tất cả
                </button>
              </div>
            )}
          </div>

          {/* Username + menu */}
          <div className="relative">
            <button
              className="flex items-center gap-2 bg-white/10 px-3 py-1 rounded-full text-xs md:text-sm hover:bg-white/20 transition"
              onClick={() => setOpenUserMenu((v) => !v)}
            >
              <span className="w-6 h-6 rounded-full bg-white/40 flex items-center justify-center text-[11px]">
                U
              </span>
              <span>Username</span>
            </button>

            {/* Dropdown user */}
            {openUserMenu && (
              <div className="absolute right-0 mt-2 w-52 bg-white text-gray-800 rounded-lg shadow-lg z-40 text-sm">
                
                {/* Hồ sơ */}
                <button
                  className="w-full text-left px-3 py-2 hover:bg-gray-50 transition"
                  onClick={() => {
                    setOpenUserMenu(false);
                    navigate("/user");
                  }}
                >
                  Hồ sơ
                </button>

                {/* Ngôn ngữ – submenu trong dropdown */}
                <div className="border-t border-gray-100">
                  <button
                    className="w-full flex items-center justify-between px-3 py-2 hover:bg-gray-50 transition"
                    onClick={() => setOpenLangMenu((v) => !v)}
                  >
                    <span>Ngôn ngữ</span>
                  </button>

                  {/* Dropdown Ngôn ngữ - Giữ nguyên */}
                  {openLangMenu && (
                    <div className="text-xs border-t border-gray-100">
                      <div className="px-3 pt-2 pb-1 text-[11px] text-gray-500">
                        Chọn ngôn ngữ
                      </div>
                      <button
                        className={`w-full text-left px-3 py-2 hover:bg-gray-50 ${
                          language === "vi"
                            ? "text-blue-600 font-medium"
                            : ""
                        }`}
                        onClick={() => setLanguage("vi")}
                      >
                        Tiếng Việt
                      </button>
                      <button
                        className={`w-full text-left px-3 py-2 hover:bg-gray-50 ${
                          language === "en"
                            ? "text-blue-600 font-medium"
                            : ""
                        }`}
                        onClick={() => setLanguage("en")}
                      >
                        English
                      </button>
                      <div className="px-3 py-2">
                        <button
                          className="w-full bg-blue-600 text-white rounded-md py-1 text-[11px] hover:bg-blue-700"
                          onClick={handleSaveLanguage}
                        >
                          Lưu
                        </button>
                      </div>
                    </div>
                  )}
                </div>

                {/* Đánh giá */}
                <button
                  className="w-full px-3 py-2 text-left hover:bg-gray-50 border-t border-gray-100 transition"
                  onClick={() => {
                    setOpenUserMenu(false);
                    navigate("/mentee/feedback");
                  }}
                >
                  Đánh giá
                </button>

                {/* Thoát */}
                <button
                  className="w-full text-left px-3 py-2 hover:bg-gray-50 border-t border-gray-100 text-red-600 transition"
                  onClick={() => {
                    setOpenUserMenu(false);
                    navigate("/login-lms");
                  }}
                >
                  <span>Thoát</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}