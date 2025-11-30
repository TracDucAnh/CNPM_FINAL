import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const MOCK_COURSES = [
  {
    id: "L01",
    name: "Nhập môn điện toán",
    teacher: "Nguyễn Văn A",
    current: 52,
    max: 50,
    status: "Đã đủ số lượng",
  },
  {
    id: "L02",
    name: "Nhập môn điện toán",
    teacher: "Nguyễn Văn A",
    current: 49,
    max: 50,
    status: "Còn chỗ",
  },
  {
    id: "L03",
    name: "Nhập môn điện toán",
    teacher: "Nguyễn Văn A",
    current: 45,
    max: 50,
    status: "Còn chỗ",
  },
  {
    id: "L04",
    name: "Giải tích 1",
    teacher: "Võ H.H.Q",
    current: 20,
    max: 50,
    status: "Đang mở đăng ký",
  },
  {
    id: "L05",
    name: "Giải tích 1",
    teacher: "Võ H.H.Q",
    current: 50,
    max: 50,
    status: "Đã đủ số lượng",
  },
];

function StatusBadge({ status }) {
  let base =
    "text-[11px] px-2 py-1 rounded-full border inline-flex items-center";
  if (status === "Đang mở đăng ký")
    return (
      <span className={`${base} bg-green-100 text-green-700 border-green-200`}>
        {status}
      </span>
    );
  if (status === "Còn chỗ")
    return (
      <span className={`${base} bg-orange-100 text-orange-700 border-orange-200`}>
        {status}
      </span>
    );
  if (status === "Đã đủ số lượng")
    return (
      <span className={`${base} bg-red-100 text-red-700 border-red-200`}>
        {status}
      </span>
    );
  return (
    <span className={`${base} bg-gray-100 text-gray-700 border-gray-200`}>
      {status}
    </span>
  );
}

export default function RegisterCoursesPage() {
  const [search, setSearch] = useState("");
  const [selectedIds, setSelectedIds] = useState([]);
  const [showSuccess, setShowSuccess] = useState(false);
  const navigate = useNavigate();

  const filtered = MOCK_COURSES.filter(
    (c) =>
      c.id.toLowerCase().includes(search.toLowerCase()) ||
      c.name.toLowerCase().includes(search.toLowerCase())
  );

  const toggleSelect = (id) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const handleRegister = () => {
    if (selectedIds.length === 0) return;
    setShowSuccess(true);
  };

  return (
    <div className="max-w-6xl mx-auto px-6 py-6">
      <h1 className="text-xl md:text-2xl font-semibold text-[#004196] mb-4">
        Đăng ký môn học
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

      {/* TABLE */}
      <div className="border rounded-lg overflow-hidden bg-white">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 text-gray-600">
            <tr>
              <th className="text-left px-4 py-3 font-medium">Mã lớp</th>
              <th className="text-left px-4 py-3 font-medium">Tên môn</th>
              <th className="text-left px-4 py-3 font-medium">Giảng viên</th>
              <th className="text-left px-4 py-3 font-medium">Số SV/ tối đa</th>
              <th className="text-left px-4 py-3 font-medium">Trạng thái</th>
              <th className="text-right px-4 py-3 font-medium" />
            </tr>
          </thead>
          <tbody>
            {filtered.map((c) => {
              const isSelected = selectedIds.includes(c.id);
              return (
                <tr key={c.id} className="border-t hover:bg-gray-50">
                  <td className="px-4 py-2">{c.id}</td>
                  <td className="px-4 py-2">{c.name}</td>
                  <td className="px-4 py-2">{c.teacher}</td>
                  <td className="px-4 py-2">
                    {c.current}/{c.max}
                  </td>
                  <td className="px-4 py-2">
                    <StatusBadge status={c.status} />
                  </td>
                  <td className="px-4 py-2 text-right">
                    <button
                      onClick={() => toggleSelect(c.id)}
                      className={`px-4 py-1 rounded-md text-xs text-white ${
                        isSelected
                          ? "bg-green-500 hover:bg-green-600"
                          : "bg-[#0b6fe0] hover:bg-[#004bb4]"
                      }`}
                    >
                      {isSelected ? "Đã chọn" : "Chọn"}
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>

        {/* phân trang đơn giản */}
        <div className="flex justify-center items-center py-3 text-xs gap-1">
          {[1, 2, 3, 4, 5].map((p) => (
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

      {/* Footer buttons */}
      <div className="flex justify-end gap-3 mt-4 text-sm">
        <button
          onClick={() => navigate("/mentee/registered-courses")}
          className="px-4 py-2 border rounded-md text-[#0b6fe0] border-[#0b6fe0]"
        >
          Hủy đăng ký
        </button>
        <button
          onClick={handleRegister}
          className="px-4 py-2 rounded-md bg-[#7b5cff] text-white"
        >
          Đăng ký
        </button>
      </div>

      {/* SUCCESS MODAL */}
      {showSuccess && (
        <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg px-8 py-6 w-full max-w-md text-center shadow-lg">
            <div className="text-4xl mb-3 text-green-500">✔</div>
            <p className="font-semibold mb-1">Đăng ký thành công</p>

            <div className="flex justify-center gap-3 mt-4 text-sm">
              <button
                onClick={() => navigate("/mentee/registered-courses")}
                className="px-4 py-2 border rounded-md text-[#0b6fe0] border-[#0b6fe0]"
              >
                Xem lại danh sách đăng ký
              </button>
              <button
                onClick={() => setShowSuccess(false)}
                className="px-4 py-2 rounded-md bg-[#0b6fe0] text-white"
              >
                Tiếp tục đăng ký
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
