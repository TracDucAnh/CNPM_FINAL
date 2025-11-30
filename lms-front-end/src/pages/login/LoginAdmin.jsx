// src/pages/login/LoginAdmin.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

// Định nghĩa màu chủ đạo
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

      // Chỉ cho phép tài khoản role = ADMIN
      if (role !== "ADMIN") {
        setError("Tài khoản này không có quyền quản trị viên.");
        return;
      }

      // Lưu thông tin vào localStorage
      localStorage.setItem("token", token);
      localStorage.setItem("role", role);
      localStorage.setItem("name", name);
      localStorage.setItem("username", u);

      // Điều hướng tới trang admin
      navigate("/tutor");
    } catch (err) {
      setError(
        err.response?.data?.error ||
          "Đăng nhập thất bại, vui lòng kiểm tra lại thông tin."
      );
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full p-8 bg-white rounded-lg shadow-xl space-y-8">
        {/* LOGO BÁCH KHOA Ở GIỮA */}
        <div className="flex justify-center mb-6">
          <img
            className="h-auto w-[300px] max-h-[300px]"
            src="/images/logobachkhoa.png"
            alt="Logo Bách Khoa"
          />
        </div>

        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Đăng nhập quản trị viên
          </h2>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-3 text-center">
            <p className="text-red-700 text-sm">{error}</p>
          </div>
        )}

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label
                htmlFor="username"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Tài khoản (email)
              </label>
              <input
                id="username"
                name="username"
                type="text"
                required
                className="appearance-none rounded-lg relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                placeholder="vd: admin@example.com"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Mật khẩu
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                className="appearance-none rounded-lg relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                placeholder="Nhập mật khẩu"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          <div className="space-y-2 pt-2">
            <button
              type="submit"
              style={{ backgroundColor: PRIMARY_COLOR }}
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#346294] transition"
            >
              Đăng nhập
            </button>
            <button
              type="button"
              onClick={() => navigate("/")}
              className="group relative w-full flex justify-center py-2 px-4 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition"
            >
              Quay lại
            </button>
          </div>
        </form>

        <div className="mt-4 text-xs text-gray-500">
          <div className="font-semibold mb-1">Tài khoản quản trị demo:</div>
          <div>admin@example.com / Admin@123</div>
        </div>
      </div>
    </div>
  );
}
