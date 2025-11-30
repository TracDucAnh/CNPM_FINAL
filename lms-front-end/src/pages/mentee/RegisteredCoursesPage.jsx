import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const MOCK_REGISTERED = [
  {
    id: "L01",
    name: "Nhập môn điện toán",
    teacher: "Nguyễn Văn A",
    current: 50,
    max: 50,
  },
  {
    id: "L02",
    name: "Nhập môn điện toán",
    teacher: "Nguyễn Văn A",
    current: 52,
    max: 50,
  },
  {
    id: "L03",
    name: "Giải tích 1",
    teacher: "Võ H.H.Q",
    current: 49,
    max: 50,
  },
];

export default function RegisteredCoursesPage() {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const filtered = MOCK_REGISTERED.filter(
    (c) =>
      c.id.toLowerCase().includes(search.toLowerCase()) ||
      c.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="max-w-6xl mx-auto px-6 py-6">
      <h1 className="text-xl md:text-2xl font-semibold text-[#004196] mb-4">
        Danh sách môn học đã đăng ký
      </h1>

      {/* search + filter */}
      <div className="flex flex-wrap items-center gap-3 mb-4">
        <div className="relative flex-1 min-w-[200px]">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">
            🔍
          </span>
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Tìm kiếm"
            className="w-full border rounded-md pl-8 pr-3 py-2 text-sm"
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
              <th className="text-left px-4 py-3 font-medium">
                Số SV/ tối đa
              </th>
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
              </tr>
            ))}
          </tbody>
        </table>

        <div className="flex justify-center items-center py-3 text-xs gap-1">
          {[1, 2, 3].map((p) => (
            <button
              key={p}
              className={`w-6 h-6 rounded-sm border ${
                p === 2 ? "bg-[#0b6fe0] text-white" : "bg-white text-gray-700"
              }`}
            >
              {p}
            </button>
          ))}
        </div>
      </div>

      <div className="flex justify-end gap-3 mt-4 text-sm">
        <button
          onClick={() => navigate("/mentee/cancel-registration")}
          className="px-4 py-2 border rounded-md text-[#0b6fe0] border-[#0b6fe0]"
        >
          Hủy đăng ký
        </button>
        <button
          onClick={() => navigate("/mentee/register")}
          className="px-4 py-2 rounded-md bg-[#7b5cff] text-white"
        >
          Đăng ký mới
        </button>
      </div>
    </div>
  );
}
