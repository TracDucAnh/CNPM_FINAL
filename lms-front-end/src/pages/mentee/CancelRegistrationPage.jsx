import React, { useState } from "react";
import { NavLink } from "react-router-dom";

// Định nghĩa mã màu chủ đạo mới
const PRIMARY_COLOR = "#1F4E79";

const MOCK_REGISTERED = [
  { id: "L01", name: "Nhập môn điện toán", teacher: "Nguyễn Văn A", current: 50, max: 50 },
  { id: "L02", name: "Nhập môn điện toán", teacher: "Nguyễn Văn A", current: 52, max: 50 },
  { id: "L03", name: "Giải tích 1", teacher: "Võ H.H.Q", current: 49, max: 50 },
];

export default function CancelRegistrationPage() {
  const [search, setSearch] = useState("");
  const [courses, setCourses] = useState(MOCK_REGISTERED);
  const [toCancel, setToCancel] = useState(null);

  const filtered = courses.filter(
    (c) =>
      c.id.toLowerCase().includes(search.toLowerCase()) ||
      c.name.toLowerCase().includes(search.toLowerCase())
  );

  const confirmCancel = () => {
    if (!toCancel) return;
    setCourses((prev) => prev.filter((c) => c.id !== toCancel.id));
    setToCancel(null);
  };

  return (
    <div className="min-h-screen bg-gray-50"> {/* Đổi nền trắng sang xám nhạt */}
      {/* TOP BAR - Màu chủ đạo mới */}
      <header style={{ backgroundColor: PRIMARY_COLOR }} className="text-white shadow-md">
        <div className="max-w-6xl mx-auto flex items-center justify-between px-6 py-3">
          
          {/* LOGO VÀ TIÊU ĐỀ - Đã thay icon bằng logobachkhoa.png */}
          <div className="flex items-center gap-3">
            <img
              className="h-9 w-auto" // Kích thước logo
              src="/images/logobachkhoa.png" // Đảm bảo đường dẫn này đúng
              alt="Logo Bách Khoa"
            />
            <span className="font-semibold text-sm md:text-base">
              Hệ thống quản lý học tập
            </span>
          </div>

          {/* Navigation - Không thay đổi */}
          <nav className="hidden md:flex items-center gap-6 text-sm">
            <NavLink to="/mentee" className="hover:border-b hover:border-white/60">
              Trang chủ
            </NavLink>
            <NavLink
              to="/mentee/courses"
              className="hover:border-b hover:border-white/60"
            >
              Khóa học của tôi
            </NavLink>
            <NavLink
              to="/mentee/register"
              className="hover:border-b hover:border-white/60"
            >
              Đăng ký môn học
            </NavLink>
            <NavLink
              to="/mentee/schedule"
              className="hover:border-b hover:border-white/60"
            >
              Lịch học
            </NavLink>
          </nav>

          {/* THÔNG BÁO VÀ USER - Đã loại bỏ icon chuông */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 bg-white/10 px-3 py-1 rounded-full text-xs md:text-sm">
              <span className="w-6 h-6 rounded-full bg-white/40 flex items-center justify-center text-[11px]">
                U
              </span>
              <span>Username</span>
            </div>
          </div>
          
        </div>
      </header>

      {/* CONTENT */}
      <main className="max-w-6xl mx-auto px-6 py-6">
        {/* Tiêu đề - Đã đổi màu */}
        <h1 style={{ color: PRIMARY_COLOR }} className="text-xl md:text-2xl font-semibold mb-4">
          Hủy đăng ký môn học
        </h1>

        {/* search + filter */}
        <div className="flex flex-wrap items-center gap-3 mb-4">
          <div className="relative flex-1 min-w-[200px]">
            {/* Đã loại bỏ icon kính lúp 🔍 */}
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Tìm kiếm"
              className="w-full border rounded-md pl-3 pr-3 py-2 text-sm" // Đã bỏ pl-8
            />
          </div>
          <button className="border rounded-md px-3 py-2 text-sm text-gray-600 flex items-center gap-1">
            Lọc ▾
          </button>
        </div>

        <div className="border rounded-lg overflow-hidden bg-white">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 text-gray-600">
              <tr>
                <th className="text-left px-4 py-3 font-medium">Mã lớp</th>
                <th className="text-left px-4 py-3 font-medium">Tên môn</th>
                <th className="text-left px-4 py-3 font-medium">Giảng viên</th>
                <th className="text-left px-4 py-3 font-medium">Số SV/ tối đa</th>
                <th className="text-center px-4 py-3 font-medium">Hủy đăng ký</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((c) => (
                <tr key={c.id} className="border-t hover:bg-gray-50">
                  <td className="px-4 py-2">{c.id}</td>
                  <td className="px-4 py-2">{c.name}</td>
                  <td className="px-4 py-2">{c.teacher}</td>
                  <td className="px-4 py-2">
                    {c.current}/{c.max}
                  </td>
                  <td className="px-4 py-2 text-center">
                    <button
                      onClick={() => setToCancel(c)}
                      className="text-red-600 hover:text-red-800 text-sm font-medium" // Đổi icon thùng rác thành chữ/text
                    >
                      Hủy
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Phân trang */}
          <div className="flex justify-center items-center py-3 text-xs gap-1">
            {[1, 2, 3].map((p) => (
              <button
                key={p}
                className={`w-6 h-6 rounded-sm border ${
                  p === 2 
                    ? `bg-[${PRIMARY_COLOR}] text-white` 
                    : "bg-white text-gray-700"
                }`}
                style={p === 2 ? { backgroundColor: PRIMARY_COLOR } : {}} // Áp dụng màu chủ đạo cho phân trang đang chọn
              >
                {p}
              </button>
            ))}
          </div>
        </div>
      </main>

      {/* CONFIRM MODAL */}
      {toCancel && (
        <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg px-6 py-5 w-full max-w-md text-center shadow-lg">
            {/* Đã loại bỏ icon ⚠ */}
            <p className="mb-4 text-sm font-semibold text-gray-700">
              Xác nhận hủy đăng ký
            </p>
            <p className="mb-4 text-sm">
              Bạn có chắc muốn hủy đăng ký môn học <b>{toCancel.name}</b>?
            </p>
            <div className="flex justify-center gap-3 text-sm">
              <button
                onClick={() => setToCancel(null)}
                className="px-4 py-2 border rounded-md text-gray-700 hover:bg-gray-50"
              >
                Không
              </button>
              <button
                onClick={confirmCancel}
                style={{ backgroundColor: PRIMARY_COLOR }}
                className="px-4 py-2 rounded-md text-white hover:opacity-90"
              >
                Có
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}