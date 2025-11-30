// src/pages/login/LoginLMS.jsx
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function LoginLMS() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErr("");

    try {
      const res = await axios.post("http://localhost:8080/api/auth/login", {
        username,
        password,
      });

      const { token, role, name, username: u } = res.data;

      // Lưu thông tin vào localStorage
      localStorage.setItem("token", token);
      localStorage.setItem("role", role);
      localStorage.setItem("name", name);
      localStorage.setItem("username", u);

      // Điều hướng theo role
      if (role === "ADMIN") {
        navigate("/admin");
      } else if (role === "TUTOR") {
        navigate("/tutor");
      } else {
        navigate("/mentee");
      }
    } catch (error) {
      setErr(
        error.response?.data?.error || "Đăng nhập thất bại, vui lòng thử lại."
      );
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm bg-white p-6 rounded-lg shadow-md"
      >
        <h2 className="text-xl font-semibold mb-4 text-center">
          Đăng nhập hệ thống LMS
        </h2>

        {err && (
          <div className="mb-3 text-sm text-red-600 border border-red-200 bg-red-50 px-3 py-2 rounded">
            {err}
          </div>
        )}

        <label className="block mb-2 text-sm font-medium text-gray-700">
          Tài khoản (email)
        </label>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full border rounded px-3 py-2 mb-4 text-sm"
          placeholder="vd: tutor@example.com"
        />

        <label className="block mb-2 text-sm font-medium text-gray-700">
          Mật khẩu
        </label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full border rounded px-3 py-2 mb-4 text-sm"
          placeholder="Nhập mật khẩu"
        />

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 rounded-md text-sm"
        >
          Đăng nhập
        </button>

        <div className="mt-4 text-xs text-gray-500">
          <div className="font-semibold mb-1">Tài khoản demo:</div>
          <div>Admin: admin@example.com / Admin@123</div>
          <div>Tutor: tutor@example.com / Tutor@123</div>
          <div>Mentee: mentee@example.com / Mentee@123</div>
        </div>
      </form>
    </div>
  );
}
