// src/pages/mentee/CoursePage.jsx
import React, { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Search, SlidersHorizontal } from "lucide-react";

export default function CoursePage() {
  const [statusFilter, setStatusFilter] = useState("Tất cả");
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("latest");
  const [page, setPage] = useState(1);
  const pageSize = 6;

  const courses = [
    {
      id: 1,
      title: "Công Nghệ Phần Mềm",
      code: "CO3001",
      teacher: "Lê Đình Thuận",
      term: "251",
      classCode: "L01",
      status: "Đang học",
      endDate: "2025-12-15",
      img: "/images/cnpm.png",
    },
    {
      id: 2,
      title: "Lập Trình Nâng Cao",
      code: "CO2039",
      teacher: "Lê Đình Thuận",
      term: "251",
      classCode: "L02",
      status: "Đang học",
      endDate: "2025-12-01",
      img: "https://images.pexels.com/photos/1181675/pexels-photo-1181675.jpeg",
    },
    {
      id: 3,
      title: "Nhập Môn Điện Toán",
      code: "CO1005",
      teacher: "Vương Bá Thịnh",
      term: "251",
      classCode: "L03",
      status: "Đang học",
      endDate: "2025-05-20",
      img: "/images/nmdt.png",
    },
    {
      id: 4,
      title: "Giải Tích 1",
      code: "MT1003",
      teacher: "Lê Xuân Đại",
      term: "251",
      classCode: "L04",
      status: "Đang học",
      endDate: "2024-12-20",
      img: "/images/gt1.png",
    },
    {
      id: 5,
      title: "Giải Tích 2",
      code: "MT1005",
      teacher: "Nguyễn Thị Xuân Anh",
      term: "251",
      classCode: "L05",
      status: "Đang học",
      endDate: "2026-05-20",
      img: "/images/gt2.png",
    },
    {
      id: 6,
      title: "Đại Số Tuyến Tính",
      code: "MT1007",
      teacher: "Nguyễn Hữu Hiệp",
      term: "251",
      classCode: "L06",
      status: "Đang học",
      endDate: "2026-05-20",
      img: "/images/dstt.png",
    },
  ];

  const filtered = useMemo(() => {
    return courses
      .filter((c) => {
        const okStatus =
          statusFilter === "Tất cả" ? true : c.status === statusFilter;
        const kw = search.trim().toLowerCase();
        const okSearch =
          !kw ||
          c.title.toLowerCase().includes(kw) ||
          c.code.toLowerCase().includes(kw) ||
          c.teacher.toLowerCase().includes(kw);
        return okStatus && okSearch;
      })
      .sort((a, b) => {
        if (sortBy === "name") return a.title.localeCompare(b.title);
        if (sortBy === "teacher") return a.teacher.localeCompare(b.teacher);
        return new Date(b.endDate) - new Date(a.endDate); // latest
      });
  }, [statusFilter, search, sortBy]);

  const pageCount = Math.max(1, Math.ceil(filtered.length / pageSize));
  const currentPage = Math.min(page, pageCount);
  const pagedCourses = filtered.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const changePage = (p) => {
    if (p < 1 || p > pageCount) return;
    setPage(p);
  };

  return (
    <div className="bg-white">
      {/* PHẦN CONTENT – không còn header xanh ở đây nữa */}
      <main className="max-w-6xl mx-auto px-6 py-6">
        <h1 className="text-2xl md:text-3xl font-semibold text-[#004196] mb-6">
          Khóa học của tôi
        </h1>

        {/* filter + search + sort */}
        <div className="flex flex-wrap items-center gap-3 mb-6">
          <div>
            <select
              value={statusFilter}
              onChange={(e) => {
                setStatusFilter(e.target.value);
                setPage(1);
              }}
              className="border rounded-md px-4 py-2 text-sm bg-white min-w-[160px]"
            >
              <option value="Tất cả">Trạng thái</option>
              <option value="Tất cả">Tất cả</option>
              <option value="Đang học">Đang học</option>
              <option value="Đã hoàn thành">Đã hoàn thành</option>
              <option value="Chưa bắt đầu">Chưa bắt đầu</option>
            </select>
          </div>

          <div className="flex-1 min-w-[220px] max-w-md">
            <div className="flex items-center bg-white border rounded-full px-3 py-2 shadow-sm">
              <Search className="mr-2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Tìm kiếm"
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setPage(1);
                }}
                className="flex-1 bg-transparent outline-none text-sm"
              />
            </div>
          </div>

          <div className="flex items-center gap-2">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="border rounded-md px-4 py-2 text-sm bg-white"
            >
              <option value="latest">Sắp xếp theo thời gian mới nhất</option>
              <option value="name">Sắp xếp theo tên A → Z</option>
              <option value="teacher">Sắp xếp theo tên GV A → Z</option>
            </select>
            <button className="flex items-center gap-1 px-3 py-2 text-sm border rounded-md bg-white shadow-sm">
              <span>Sắp xếp</span>
              <SlidersHorizontal className="w-4 h-4 text-gray-500" />
            </button>
          </div>
        </div>

        {/* grid courses */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8">
          {pagedCourses.map((c) => (
            <Link
              key={c.id}
              to={`/mentee/courses/${c.id}`}
              className="bg-white rounded-2xl shadow-md overflow-hidden flex flex-col hover:-translate-y-0.5 hover:shadow-lg transition text-left"
            >
              <div className="h-40 w-full overflow-hidden">
                <img
                  src={c.img}
                  alt={c.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-4 flex-1 flex flex-col justify-between">
                <div className="space-y-1 text-sm">
                  <p className="font-medium text-gray-800">
                    {c.title} ({c.code}) -
                  </p>
                  <p className="text-gray-600">
                    [{c.teacher}] ({c.term}) -
                  </p>
                  <p className="text-gray-600">[{c.classCode}]</p>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* pagination */}
        <div className="flex justify-center items-center gap-2">
          <button
            onClick={() => changePage(currentPage - 1)}
            disabled={currentPage === 1}
            className="w-7 h-7 flex items-center justify-center text-xs border rounded-md text-gray-500 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-default"
          >
            {"<"}
          </button>
          {Array.from({ length: pageCount }).map((_, i) => {
            const p = i + 1;
            return (
              <button
                key={p}
                onClick={() => changePage(p)}
                className={`w-7 h-7 flex items-center justify-center text-xs rounded-md ${
                  p === currentPage
                    ? "bg-[#0b6fe0] text-white"
                    : "border border-gray-200 text-gray-700 hover:bg-gray-50"
                }`}
              >
                {p}
              </button>
            );
          })}
          <button
            onClick={() => changePage(currentPage + 1)}
            disabled={currentPage === pageCount}
            className="w-7 h-7 flex items-center justify-center text-xs border rounded-md text-gray-500 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-default"
          >
            {">"}
          </button>
        </div>
      </main>
    </div>
  );
}