import React, { useState } from "react";

// Định nghĩa màu chủ đạo
const PRIMARY_COLOR = "#1F4E79";

// DỮ LIỆU MOCK (Cần định nghĩa lại để component chạy độc lập)
const MOCK_COURSES = [
  { id: "MT101", name: "Nhập môn Điện toán", teacher: "Phạm Văn Thành", students: 50, semester: "20241", classes: ["MT101-L01", "MT101-L02", "MT101-L03"] },
  { id: "GT201", name: "Giải tích 2", teacher: "Nguyễn Thị Hoa", students: 48, semester: "20241", classes: ["GT201-L01", "GT201-L02"] },
  { id: "KT305", name: "Cấu trúc dữ liệu", teacher: "Lê Minh Trí", students: 52, semester: "20242", classes: ["KT305-L01", "KT305-L02"] },
  { id: "NN401", name: "Tiếng Anh chuyên ngành", teacher: "Võ Hải Quý", students: 40, semester: "20242", classes: ["NN401-L01"] },
];


export default function CourseManage() {
  const [courses, setCourses] = useState(MOCK_COURSES);
  const [search, setSearch] = useState("");
  const [selectedCourse, setSelectedCourse] = useState(null); // State lưu khóa học được chọn
  
  const filteredCourses = courses.filter(course => 
    course.name.toLowerCase().includes(search.toLowerCase()) ||
    course.id.toLowerCase().includes(search.toLowerCase()) ||
    course.teacher.toLowerCase().includes(search.toLowerCase())
  );

  const handleAction = (courseId, action) => {
    console.log(`Thực hiện hành động ${action} cho khóa học ID: ${courseId}`);
    // Logic mock: Ví dụ xóa
    if (action === 'delete') {
        setCourses(prev => prev.filter(c => c.id !== courseId));
    }
  };
  
  const handleShowDetail = (course) => {
      setSelectedCourse(course);
  };

  return (
    <div className="space-y-6">
        <h2 className="text-2xl font-bold" style={{ color: PRIMARY_COLOR }}>Quản lý Khóa học</h2>
        
        <div className="flex flex-wrap items-center justify-between gap-4">
            {/* Thanh tìm kiếm và thêm mới */}
            <input 
              type="text"
              placeholder={`Tìm kiếm theo tên môn, mã môn hoặc giảng viên...`}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="border rounded-lg px-4 py-2 text-sm w-full md:w-1/3 outline-none focus:border-blue-500"
            />
            
            <div className="flex gap-2">
                <button 
                    className="px-4 py-2 text-sm font-medium rounded-lg text-white hover:opacity-90 transition"
                    style={{ backgroundColor: PRIMARY_COLOR }}
                >
                    Thêm Khóa học
                </button>
            </div>
        </div>

        {/* Bảng dữ liệu */}
        <div className="overflow-x-auto border rounded-lg">
            <table className="min-w-full text-sm divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr className="text-gray-600">
                  <th className="py-3 px-4 text-left font-semibold">Mã môn</th>
                  <th className="py-3 px-4 text-left font-semibold">Tên Khóa học</th>
                  <th className="py-3 px-4 text-left font-semibold">Tutor (GV)</th>
                  <th className="py-3 px-4 text-left font-semibold">Học kỳ</th>
                  <th className="py-3 px-4 text-left font-semibold">Số SV</th>
                  <th className="py-3 px-4 text-center font-semibold">Tác vụ</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredCourses.map((course) => (
                  <tr key={course.id} className="hover:bg-gray-50">
                    <td className="py-3 px-4 font-medium">{course.id}</td>
                    <td className="py-3 px-4">{course.name}</td>
                    <td className="py-3 px-4 text-xs text-gray-500">{course.teacher}</td>
                    <td className="py-3 px-4">{course.semester}</td>
                    <td className="py-3 px-4">{course.students}</td>
                    <td className="py-3 px-4 text-center space-x-2">
                      <button 
                          onClick={() => handleShowDetail(course)}
                          className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                      >
                          Chi tiết
                      </button>
                      <button 
                          onClick={() => handleAction(course.id, 'edit')}
                          className="text-gray-600 hover:text-gray-800 text-sm font-medium"
                      >
                          Sửa
                      </button>
                      <button 
                          onClick={() => handleAction(course.id, 'delete')}
                          className="text-red-600 hover:text-red-800 text-sm font-medium"
                      >
                          Xóa
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
        </div>

        {/* MODAL CHI TIẾT KHÓA HỌC */}
        {selectedCourse && (
            <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                <div className="bg-white rounded-xl shadow-2xl w-full max-w-md">
                    <div className="p-6">
                        <h3 className="text-xl font-bold mb-4" style={{ color: PRIMARY_COLOR }}>
                            Chi tiết Khóa học: {selectedCourse.id}
                        </h3>
                        
                        <div className="space-y-2 text-sm text-gray-700 border-b pb-4">
                            <p><strong>Tên khóa học:</strong> {selectedCourse.name}</p>
                            <p><strong>Tutor phụ trách:</strong> {selectedCourse.teacher}</p>
                            <p><strong>Học kỳ:</strong> {selectedCourse.semester}</p>
                            <p><strong>Tổng số sinh viên:</strong> {selectedCourse.students}</p>
                        </div>

                        <div className="pt-4">
                            <p className="font-semibold mb-2">Danh sách lớp học ({selectedCourse.classes.length}):</p>
                            <ul className="list-disc list-inside text-sm text-gray-600 max-h-24 overflow-y-auto pl-2">
                                {selectedCourse.classes.map(cls => <li key={cls} className="py-0.5">{cls}</li>)}
                            </ul>
                        </div>
                    </div>
                    <div className="flex justify-end p-4 border-t">
                        <button 
                            onClick={() => setSelectedCourse(null)}
                            className="px-4 py-2 text-sm rounded-lg border border-gray-300 hover:bg-gray-100"
                        >
                            Đóng
                        </button>
                    </div>
                </div>
            </div>
        )}
    </div>
  );
}