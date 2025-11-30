// src/pages/mentee/Dashboard.jsx
import React from "react";
// Định nghĩa màu chủ đạo mới
const PRIMARY_COLOR = "#1F4E79";

export default function Dashboard() {
  const stats = [
    {
      label: "Khóa học đã đăng ký",
      value: 95,
      // Đổi sang màu nền nhẹ
      bg: "bg-[#e5f0f9]", 
      iconBg: PRIMARY_COLOR,
      iconText: "ĐK", // Ký hiệu thay thế icon: Khóa Đã Đăng Ký
    },
    {
      label: "Khóa học đang học",
      value: 6,
      bg: "bg-[#e7f9e5]", 
      iconBg: PRIMARY_COLOR,
      iconText: "ĐH", // Ký hiệu thay thế icon: Khóa Đang Học
    },
    {
      label: "Khóa học đã hoàn thành",
      value: 89,
      bg: "bg-[#f9e9e5]", 
      iconBg: PRIMARY_COLOR,
      iconText: "HT", // Ký hiệu thay thế icon: Khóa Hoàn Thành
    },
  ];

  const recentCourses = [
    {
      title: "Công Nghệ Phần Mềm",
      code: "CO3001",
      teacher: "Lê Đình Thuận",
      term: "251",
      classCode: "L01",
      img: "/images/cnpm.png",
    },
    {
      title: "Lập Trình Nâng Cao",
      code: "CO2039",
      teacher: "Lê Đình Thuận",
      term: "251",
      classCode: "L02",
      img: "https://images.pexels.com/photos/1181675/pexels-photo-1181675.jpeg",
    },
    {
      title: "Nhập Môn Điện Toán",
      code: "CO1005",
      teacher: "Vương Bá Thịnh",
      term: "251",
      classCode: "L03",
      img: "/images/nmdt.png",
    },
  ];

  // Logic chuyển hướng cho khóa học (giả định)
  const handleCourseClick = (courseCode) => {
    // Thay đổi thành logic chuyển hướng thực tế của bạn
    // navigate(`/mentee/courses/${courseCode}`); 
    console.log(`Chuyển đến khóa học: ${courseCode}`);
  };

  return (
    <div className="max-w-6xl mx-auto px-6 py-6">
      
      {/* Tổng quan */}
      <section className="mb-8">
        {/* Tiêu đề - Đã đổi màu sang PRIMARY_COLOR */}
        <h2 style={{ color: PRIMARY_COLOR }} className="text-xl md:text-2xl font-semibold mb-4">
          Tổng quan
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {stats.map((item, idx) => (
            <div
              key={idx}
              className={`${item.bg} rounded-xl px-4 py-4 flex items-center gap-3 shadow-md border border-gray-100`}
            >
              {/* Vị trí thay thế icon bằng text/ký hiệu đơn giản */}
              <div 
                style={{ backgroundColor: item.iconBg }}
                className="w-10 h-10 rounded-lg flex items-center justify-center text-xs font-bold text-white shadow-md"
              >
                {item.iconText} {/* Sử dụng ký hiệu thay thế */}
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-800">
                  {item.value}
                </p>
                <p className="text-xs md:text-sm text-gray-600">
                  {item.label}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <hr className="my-8 border-gray-200" />
      
      {/* Các khóa học gần đây */}
      <section>
        <div className="flex items-center justify-between mb-4">
          {/* Tiêu đề - Đã đổi màu sang PRIMARY_COLOR */}
          <h2 style={{ color: PRIMARY_COLOR }} className="text-xl md:text-2xl font-semibold">
            Các khóa học gần đây
          </h2>
          {/* Nút điều hướng - Giữ nguyên không icon */}
          <div className="flex gap-2">
            <button 
              className="w-8 h-8 rounded-md border border-gray-300 flex items-center justify-center text-sm text-gray-600 hover:bg-gray-100 transition"
            >
              ←
            </button>
            <button 
              className="w-8 h-8 rounded-md border border-gray-300 flex items-center justify-center text-sm text-gray-600 hover:bg-gray-100 transition"
            >
              →
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {recentCourses.map((course, idx) => (
            <div
              key={idx}
              onClick={() => handleCourseClick(course.code)} 
              className="bg-white rounded-2xl shadow-lg overflow-hidden flex flex-col cursor-pointer transition transform hover:scale-[1.02]"
            >
              <div className="h-40 w-full overflow-hidden">
                <img
                  src={course.img}
                  alt={course.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-4 flex-1 flex flex-col justify-between">
                <div className="space-y-1 text-sm">
                  <p className="font-bold text-gray-800 text-base">
                    {course.title}
                  </p>
                  <p className="text-gray-600 text-xs">
                    Mã môn: {course.code}
                  </p>
                  <p className="text-gray-600 text-xs">
                    Giảng viên: {course.teacher}
                  </p>
                  <p className="text-gray-600 text-xs">
                    Học kỳ: {course.term}
                  </p>
                  <p className="text-gray-600 text-xs">
                    Mã lớp: {course.classCode}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}