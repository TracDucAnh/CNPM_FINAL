// src/pages/login/LoginAdmin.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

// Màu chủ đạo
const PRIMARY_COLOR = "#1F4E79";

export default function LoginAdmin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await axios.post("http://localhost:8080/api/auth/login", {
        username,
        password,
      });

      const { token, role, name, username: u } = res.data;

      if (role !== "ADMIN") {
        setError("Tài khoản này không có quyền quản trị viên.");
        return;
      }

      localStorage.setItem("token", token);
      localStorage.setItem("role", role);
      localStorage.setItem("name", name);
      localStorage.setItem("username", u);

      navigate("/tutor"); // Hoặc /admin tùy cấu hình route
    } catch (err) {
      setError(
        err.response?.data?.error ||
          "Đăng nhập thất bại, vui lòng kiểm tra lại thông tin."
      );
    }
  };

  return (
    <div className="min-h-screen bg-[#FAFAFA] flex items-center justify-center font-sans">
      {/* Login Frame */}
      <div className="relative w-full max-w-[685px] h-auto min-h-[492px] bg-white shadow-lg rounded-none md:rounded-lg overflow-hidden flex flex-col">
        
        {/* Header Bar */}
        <div
          style={{ backgroundColor: PRIMARY_COLOR }}
          className="w-full h-[60px] flex items-center justify-between px-6 shrink-0"
        >
          <span className="text-white text-[14px] font-normal tracking-wider uppercase">
            Quản trị viên
          </span>
        </div>

        {/* Content */}
        <div className="flex-1 flex flex-col items-center justify-center p-6">
          
          <img
            src="/images/logobachkhoa.png"
            alt="Logo"
            className="h-16 w-auto mb-6 object-contain"
          />

          <h2 className="text-[#1E1E1E] text-lg font-semibold mb-4 uppercase">
            Cổng đăng nhập Admin
          </h2>

          {/* Form Box (Width 320px) */}
          <div className="w-[320px] bg-white border border-[#D9D9D9] rounded-[8px] p-[24px] flex flex-col gap-[24px]">
            
            <form onSubmit={handleSubmit} className="flex flex-col gap-[16px]">
              {error && (
                <div className="text-xs text-red-600 bg-red-50 p-2 border border-red-200 rounded">
                  {error}
                </div>
              )}

              {/* Username */}
              <div className="flex flex-col gap-[8px]">
                <label className="text-[#1E1E1E] text-[16px] leading-[140%] font-normal">
                  Tài khoản
                </label>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="admin@example.com"
                  className="w-full h-[40px] px-[16px] py-[12px] bg-white border border-[#D9D9D9] rounded-[8px] text-[16px] text-[#1E1E1E] placeholder-[#B3B3B3] focus:outline-none focus:border-[#1F4E79] focus:ring-1 focus:ring-[#1F4E79]"
                />
              </div>

              {/* Password */}
              <div className="flex flex-col gap-[8px]">
                <label className="text-[#1E1E1E] text-[16px] leading-[140%] font-normal">
                  Mật khẩu
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Nhập mật khẩu"
                  className="w-full h-[40px] px-[16px] py-[12px] bg-white border border-[#D9D9D9] rounded-[8px] text-[16px] text-[#1E1E1E] placeholder-[#B3B3B3] focus:outline-none focus:border-[#1F4E79] focus:ring-1 focus:ring-[#1F4E79]"
                />
              </div>

              {/* Button Group: Login + Back */}
              <div className="flex flex-col gap-3 mt-2">
                <button
                  type="submit"
                  style={{ backgroundColor: PRIMARY_COLOR }}
                  className="w-full h-[40px] rounded-[8px] flex items-center justify-center text-white font-normal text-[16px] hover:opacity-90 transition"
                >
                  Đăng nhập
                </button>

                <button
                  type="button"
                  onClick={() => navigate("/")}
                  className="w-full h-[40px] rounded-[8px] flex items-center justify-center bg-white border border-gray-300 text-gray-700 font-normal text-[16px] hover:bg-gray-50 transition"
                >
                  Quay lại
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}