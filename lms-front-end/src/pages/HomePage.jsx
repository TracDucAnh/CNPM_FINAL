// src/pages/HomePage.jsx
import React from "react";
import { useNavigate } from "react-router-dom";

// Định nghĩa màu chủ đạo
const PRIMARY_COLOR = "#1F4E79";

export default function HomePage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        
        {/* LOGO BÁCH KHOA Ở GIỮA */}
        <div className="flex justify-center mb-6">
            <img
              className="h-auto w-[300px] max-h-[300px]" // Đặt kích thước 300px
              src="/images/logobachkhoa.png" // Đường dẫn logo
              alt="Logo Bách Khoa"
            />
        </div>
        
        {/* Phần giới thiệu LMS */}
        <div className="text-center">
          {/* Đã áp dụng màu chủ đạo cho tiêu đề */}
          <h1 style={{ color: PRIMARY_COLOR }} className="text-4xl font-bold mb-2">
            Chào mừng đến với LMS
          </h1>
        </div>

        {/* Phần đăng nhập */}
        <div>
          <h2 className="text-center text-2xl font-extrabold text-gray-900">
            Đăng nhập bằng tài khoản của bạn
          </h2>
        </div>

        <div className="mt-8 space-y-4">
          {/* Nút 1: Đăng nhập LMS - Đã áp dụng màu chủ đạo */}
          <button
            onClick={() => navigate("/login-lms")}
            style={{ backgroundColor: PRIMARY_COLOR }}
            className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#346294] transition"
          >
            <span className="flex flex-col items-center">
              <span className="font-bold">TÀI KHOẢN LMS</span>
              <span className="text-xs opacity-90">(LMS ACCOUNT)</span>
            </span>
          </button>

          {/* Nút 2: Đăng nhập Admin - Đã áp dụng màu chủ đạo */}
          <button
            onClick={() => navigate("/login-admin")}
            style={{ backgroundColor: PRIMARY_COLOR }}
            className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#346294] transition"
          >
            <span className="font-bold">QUẢN TRỊ VIÊN</span>
          </button>
        </div>
      </div>
    </div>
  );
}